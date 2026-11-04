import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173,https://resumeforge-iota-five.vercel.app')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Origin is not allowed by CORS'));
  }
}));
app.use(express.json({ limit: '8mb' }));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  profile: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Resume = mongoose.models.Resume || mongoose.model('Resume', resumeSchema);

const requireDatabase = (_req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Database is not connected yet. Please try again shortly.' });
  }
  next();
};

const createToken = userId => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ message: 'Please log in to continue.' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch {
    return res.status(401).json({ message: 'Your session has expired. Please log in again.' });
  }
};

const publicUser = user => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  profile: user.profile || {}
});

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'ResumeForge API is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.post('/api/auth/signup', requireDatabase, async (req, res) => {
  try {
    const name = String(req.body.name || '').trim();
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    if (!name || !email || password.length < 6) {
      return res.status(400).json({ message: 'Please provide your name, a valid email and a password of at least 6 characters.' });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'An account with this email already exists. Please log in.' });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash, profile: { fullName: name, email } });
    return res.status(201).json({ token: createToken(user._id.toString()), user: publicUser(user) });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Could not create your account. Please try again.' });
  }
});

app.post('/api/auth/login', requireDatabase, async (req, res) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const user = await User.findOne({ email }).select('+passwordHash');
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }
    return res.json({ token: createToken(user._id.toString()), user: publicUser(user) });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Could not log in. Please try again.' });
  }
});

app.get('/api/auth/me', requireDatabase, requireAuth, async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: 'Account not found.' });
  return res.json({ user: publicUser(user) });
});

app.put('/api/profile', requireDatabase, requireAuth, async (req, res) => {
  try {
    const profile = req.body || {};
    const updates = { profile };
    if (typeof profile.fullName === 'string' && profile.fullName.trim()) updates.name = profile.fullName.trim();
    if (typeof profile.email === 'string' && profile.email.trim()) updates.email = profile.email.trim().toLowerCase();
    const user = await User.findByIdAndUpdate(req.userId, { $set: updates }, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'Account not found.' });
    return res.json({ user: publicUser(user) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'This email is already linked to another account.' });
    console.error('Profile update error:', error);
    return res.status(500).json({ message: 'Could not save your profile.' });
  }
});

app.get('/api/resumes', requireDatabase, requireAuth, async (req, res) => {
  const documents = await Resume.find({ user: req.userId }).sort({ updatedAt: -1 });
  const resumes = documents.map(document => ({
    ...document.data,
    id: document._id.toString(),
    updatedAt: document.updatedAt.toISOString()
  }));
  return res.json({ resumes });
});

app.post('/api/resumes', requireDatabase, requireAuth, async (req, res) => {
  try {
    const { id, ...data } = req.body || {};
    let document;
    if (id && mongoose.isValidObjectId(id)) {
      document = await Resume.findOneAndUpdate(
        { _id: id, user: req.userId },
        { $set: { data } },
        { new: true, runValidators: true }
      );
      if (!document) return res.status(404).json({ message: 'Resume not found in your account.' });
    } else {
      document = await Resume.create({ user: req.userId, data });
    }
    return res.status(200).json({
      resume: { ...document.data, id: document._id.toString(), updatedAt: document.updatedAt.toISOString() }
    });
  } catch (error) {
    console.error('Resume save error:', error);
    return res.status(500).json({ message: 'Could not save this resume.' });
  }
});

app.delete('/api/resumes/:id', requireDatabase, requireAuth, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid resume ID.' });
  const deleted = await Resume.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!deleted) return res.status(404).json({ message: 'Resume not found in your account.' });
  return res.json({ success: true });
});

app.listen(PORT, () => {
  console.log('ResumeForge API listening on port ' + PORT);
});

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(error => console.error('MongoDB connection failed:', error.message));
} else {
  console.warn('MONGODB_URI is missing. Set it in the backend environment variables.');
}

if (!process.env.JWT_SECRET) {
  console.warn('JWT_SECRET is missing. Set a long random secret in the backend environment variables.');
}
