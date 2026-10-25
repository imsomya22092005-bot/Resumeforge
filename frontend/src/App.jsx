import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowRight, Check, ChevronDown, CircleHelp,
  Download, FileText, LayoutTemplate, Menu, Palette, Plus, Sparkles, Trash2,
  UserRound, WandSparkles, Smartphone, X
} from 'lucide-react';

const starterResume = {
  name: 'Your Name',
  role: 'Aspiring Software Developer',
  email: 'you@example.com',
  phone: '+91 98765 43210',
  location: 'India',
  summary: 'Curious and motivated professional who enjoys solving problems, learning new technologies, and building thoughtful digital experiences.',
  experience: [{ id: 1, title: 'Your Job Title', company: 'Company Name', dates: '2024 — Present', description: 'Describe your impact, responsibilities, and the skills you used.' }],
  education: [{ id: 2, degree: 'Your Degree', school: 'University Name', dates: '2022 — 2026', description: 'Relevant coursework, achievements, or activities.' }],
  skills: 'JavaScript, React, HTML, CSS, Communication',
  projects: [{ id: 3, title: 'Featured Project', description: 'What you built, how you built it, and the result.' }]
};
const templates = [
{id:'classic',name:'Classic Professional',detail:'Clear and ATS-friendly',tag:'ATS FRIENDLY',color:'#896C6C',person:'ALEX MORGAN',role:'SOFTWARE DEVELOPER',email:'alex.morgan@email.com',skills:'JavaScript · React · SQL'},
{id:'modern',name:'Modern Sidebar',detail:'Bold, modern two-column style',tag:'POPULAR',color:'#34495e',person:'JAMIE WILSON',role:'MARKETING SPECIALIST',email:'jamie.w@email.com',skills:'Campaigns · SEO · Analytics'},
{id:'minimal',name:'Minimal',detail:'Simple, spacious and elegant',tag:'MINIMAL',color:'#b18a65',person:'TAYLOR LEE',role:'UX DESIGNER',email:'taylor.lee@email.com',skills:'Figma · Research · Prototyping'},
{id:'sage',name:'Sage Executive',detail:'Calm green executive look',tag:'EXECUTIVE',color:'#617b68',person:'MORGAN REED',role:'PROJECT MANAGER',email:'morgan.r@email.com',skills:'Leadership · Agile · Planning'},
{id:'ocean',name:'Ocean Blue',detail:'Trustworthy and structured',tag:'PROFESSIONAL',color:'#26718a',person:'JORDAN PARK',role:'DATA ANALYST',email:'jordan.p@email.com',skills:'Python · SQL · Power BI'},
{id:'terracotta',name:'Terracotta',detail:'Warm creative portfolio style',tag:'CREATIVE',color:'#c56d50',person:'RILEY SHAH',role:'GRAPHIC DESIGNER',email:'riley.s@email.com',skills:'Branding · Adobe · Layout'},
{id:'plum',name:'Plum Accent',detail:'Refined, distinctive headings',tag:'ELEGANT',color:'#79546f',person:'CASEY PATEL',role:'BUSINESS ANALYST',email:'casey.p@email.com',skills:'Research · Excel · Strategy'},
{id:'navy',name:'Navy Classic',detail:'Traditional corporate format',tag:'CORPORATE',color:'#263b58',person:'SAM RIVERA',role:'FINANCE ASSOCIATE',email:'sam.r@email.com',skills:'Forecasting · Excel · Reports'},
{id:'coral',name:'Coral Fresh',detail:'Bright and friendly presentation',tag:'FRESH',color:'#d66d72',person:'AVA THOMAS',role:'CONTENT WRITER',email:'ava.t@email.com',skills:'Writing · Editing · SEO'},
{id:'mono',name:'Monochrome',detail:'Black-and-white understated style',tag:'TIMELESS',color:'#343434',person:'NOAH BENNETT',role:'OPERATIONS COORDINATOR',email:'noah.b@email.com',skills:'Process · Logistics · Teams'}
];
const loadSaved = () => {
  try { return JSON.parse(localStorage.getItem('resumeforge-resumes') || '[]'); } catch { return []; }
};

export default function App() {
  const [page, setPage] = useState('home');
  const [resume, setResume] = useState(starterResume);
  const [template, setTemplate] = useState('classic');
  const [saved, setSaved] = useState(loadSaved);
  const [resumeId, setResumeId] = useState(null);
  const [toast, setToast] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [section, setSection] = useState('personal');
  const [showHelp, setShowHelp] = useState(false);
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('resumeforge-user') || 'null'); } catch { return null; }
  });

  useEffect(() => {
    localStorage.setItem('resumeforge-resumes', JSON.stringify(saved));
  }, [saved]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };
  const openAuth = (mode) => { setAuthError(''); setAuthName(''); setAuthEmail(''); setAuthPassword(''); setPage(mode); setMobileMenu(false); };
  const submitAuth = (event) => {
    event.preventDefault();
    const email = authEmail.trim().toLowerCase();
    if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) { setAuthError('Please enter a valid email address.'); return; }
    if (authPassword.length < 6) { setAuthError('Password must be at least 6 characters.'); return; }
    if (page === 'signup' && !authName.trim()) { setAuthError('Please enter your name.'); return; }
    const user = { name: authName.trim() || email.split('@')[0], email };
    localStorage.setItem('resumeforge-user', JSON.stringify(user));
    setCurrentUser(user); setAuthError(''); setPage('dashboard');
  };
  const signOut = () => { localStorage.removeItem('resumeforge-user'); setCurrentUser(null); setPage('home'); };
  const startNew = (chosenTemplate = template) => {
    setResume(starterResume);
    setTemplate(chosenTemplate);
    setResumeId(null);
    setSection('personal');
    setPage('editor');
  };
  const update = (key, value) => setResume(current => ({ ...current, [key]: value }));
  const saveResume = () => {
    const id = resumeId || (globalThis.crypto?.randomUUID?.() ?? String(Date.now()));
    const item = { ...resume, id, template, updatedAt: new Date().toISOString() };
    setSaved(current => [item, ...current.filter(entry => entry.id !== id)]);
    setResumeId(id);
    notify('Resume saved on this device');
  };
  const openResume = (item) => {
    setResume({ ...starterResume, ...item });
    setTemplate(item.template || 'classic');
    setResumeId(item.id);
    setSection('personal');
    setPage('editor');
  };
  const deleteResume = (id) => {
    setSaved(current => current.filter(item => item.id !== id));
    notify('Resume deleted');
  };
  const downloadResume = () => {
    window.print();
  };
  const updateListItem = (key, id, field, value) => {
    update(key, resume[key].map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  const addListItem = (key, item) => update(key, [...resume[key], { ...item, id: Date.now() }]);
  const removeListItem = (key, id) => update(key, resume[key].filter(item => item.id !== id));

  return (
    <div className="app-shell">
      <header className="topbar no-print">
        <button className="brand" onClick={() => setPage('home')} aria-label="ResumeForge home">
          <span className="brand-mark"><FileText size={19} /></span><span>resume<span className="brand-light">forge</span><i>.</i></span>
        </button>
        <button className="mobile-menu" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu"><Menu /></button>
        <nav className={mobileMenu ? 'nav-links open' : 'nav-links'}>
          <button className="nav-link" onClick={() => { setPage('home'); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenu(false); }}>Features</button>
          <button className={page === 'templates' ? 'nav-link active' : 'nav-link'} onClick={() => { setPage('templates'); setMobileMenu(false); }}>Resume Templates</button>
          <button className="nav-link" onClick={() => { setPage('home'); document.getElementById('why-resumeforge')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenu(false); }}>Why ResumeForge</button>
          <button className="nav-link" onClick={() => { setPage('home'); document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenu(false); }}>About us</button>
        </nav>
        <div className="top-actions">
          {currentUser ? <><button className="nav-link user-greeting" onClick={() => setPage('dashboard')}>Hi, {currentUser.name}</button><button className="button button-outline button-small" onClick={signOut}>Log out</button></> : <><button className="button button-quiet button-small" onClick={() => openAuth('login')}>Log in</button><button className="button button-outline button-small" onClick={() => openAuth('signup')}>Sign up</button></>}
          <button className="button button-dark button-small" onClick={() => startNew()}>Create my resume <ArrowRight size={15} /></button>
        </div>
      </header>

      {page === 'home' && <main>
        <section className="hero">
          <div className="hero-visual" aria-label="Animated resume preview">
            <div className="visual-note note-top"><Sparkles size={15} /> Make your first impression count</div>
            <div className="resume-paper animated-resume">
              <div className="paper-topline"></div>
              <div className="paper-name">Alex Morgan</div><div className="paper-role">PROFESSIONAL PROFILE</div>
              <div className="paper-contact">alex.morgan@email.com · Your City</div><div className="paper-rule"></div>
              <div className="paper-section-title">PROFILE</div><div className="paper-line long"></div><div className="paper-line medium"></div><div className="paper-line short"></div>
              <div className="paper-section-title">EXPERIENCE</div><div className="paper-bold">Your latest role</div><div className="paper-line long"></div><div className="paper-line medium"></div><div className="paper-line long"></div>
              <div className="paper-section-title">EDUCATION</div><div className="paper-bold">Your qualification</div><div className="paper-line medium"></div>
              <div className="paper-section-title">SKILLS</div><div className="paper-skills"><span>Creative</span><span>Organized</span><span>Problem solving</span></div>
            </div>
            <div className="floating-template floating-template-one"><div className="float-line"></div><div className="float-line short"></div><div className="float-line"></div><div className="float-line medium"></div></div>
            <div className="floating-template floating-template-two"><span>✓</span><div><strong>Resume ready</strong><small>Looking good!</small></div></div>
            <div className="visual-note note-bottom"><span className="check-circle"><Check size={12} /></span> Your story, beautifully told</div>
            <div className="visual-sparkle sparkle-one">✳</div><div className="visual-sparkle sparkle-two">✳</div>
          </div>
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot"></span> YOUR NEXT CHAPTER STARTS HERE</div>
            <h1>The Best Online<br /><span>Resume Builder</span></h1>
            <p className="hero-description">Easily create a resume from any device with our best-in-class resume builder platform.</p>
            <div className="hero-buttons">
              <button className="button button-dark" onClick={() => startNew()}>Create My Resume Now <ArrowRight size={17} /></button>
              <button className="button button-outline" onClick={() => notify('Import Resume will be available in the next phase.')}>Import Resume</button>
            </div>
            <div className="hero-stats">
              <div><strong><span>↑</span> 38%</strong><small>more interviews</small></div>
              <div><strong><span>↑</span> 23%</strong><small>more likely to<br/> get a job offer</small></div>
            </div>
          </div>
        </section>
        <section className="trust-strip"><span>DESIGNED FOR THE NEXT STEP</span><div><Check size={15} /> Clean layouts</div><div><Check size={15} /> Easy to customize</div><div><Check size={15} /> Print-ready resumes</div></section>
        <section className="home-intro-copy" id="about-us">
          <p>Our online resume builder makes it simple to create a professional resume from your phone, laptop, or tablet using 30+ customizable resume templates — anytime, anywhere.</p>
          <p>Create a resume using our <button className="inline-text-link" onClick={() => notify('AI resume suggestions are coming soon.')}>AI resume builder</button> feature, plus take advantage of expert suggestions, a built-in resume editor, and customizable modern and professional resume templates. <button className="inline-text-link" onClick={() => setPage('templates')}>Free users</button> have access to our easy-to-use resume creator and TXT file downloads.</p>
        </section>
        <section className="home-templates section-wrap" id="features">
          <div className="template-section-title"><div className="eyebrow">FIND YOUR PERFECT LOOK</div><h2>Pick From 500+ Free Resume Templates<br className="desktop-break" /> and Build Your Resume in Minutes</h2><p>Explore different styles and find the one that feels like you.</p></div>
          <div className="template-carousel-window"><div className="template-carousel-track">{[...templates, ...templates].map((item, index) => <TemplateCard key={item.id+index} item={item} index={index} onChoose={() => startNew(item.id)} />)}</div></div>
          <div className="see-all-templates"><button className="button button-outline" onClick={() => window.open('https://www.resumebuilder.com/resume-templates/', '_blank', 'noopener,noreferrer')}>See All Resume Templates <ArrowRight size={16} /></button></div>
        </section>
        <section className="why-section feature-showcase" id="why-resumeforge">
          <div className="feature-showcase-heading"><div className="eyebrow"><Sparkles size={14}/> THE RESUMEFORGE ADVANTAGE</div><h2>Get hired <span>36% faster</span> with our feature-packed and easy-to-use resume builder app</h2><p>Everything you need to turn your experience into a confident next step.</p></div>
          <div className="feature-showcase-grid">
            <article className="feature-tile feature-tile-large"><div className="feature-icon"><WandSparkles size={22}/></div><span className="feature-number">01 / CREATE</span><h3>Powerful resume builder</h3><p>Use our potent creation tools and expert guidance to create the perfect resume for your next job application.</p><div className="feature-decoration"><FileText size={76}/><Sparkles size={20}/></div></article>
            <article className="feature-tile"><div className="feature-icon"><LayoutTemplate size={22}/></div><span className="feature-number">02 / CHOOSE</span><h3>Professional templates</h3><p>Choose from 25+ applicant tracking systems (ATS)-friendly modern and professional templates.</p></article>
            <article className="feature-tile"><div className="feature-icon"><Sparkles size={22}/></div><span className="feature-number">03 / PERSONALIZE</span><h3>Customize fonts and colors</h3><p>Select custom <a href="https://www.resumebuilder.com/career-center/best-font-for-resume/" target="_blank" rel="noreferrer">fonts</a> and colors on any resume template.</p></article>
            <article className="feature-tile"><div className="feature-icon"><FileText size={22}/></div><span className="feature-number">04 / EXPLORE</span><h3>Free resume examples</h3><p>Use our more than 500 resume examples and templates to see what a great resume looks like in your field.</p></article>
            <article className="feature-tile"><div className="feature-icon"><Check size={22}/></div><span className="feature-number">05 / STAND OUT</span><h3>ATS-friendly templates</h3><p>Sail through <a href="https://www.resumebuilder.com/career-center/applicant-tracking-system-tools-for-job-seekers/" target="_blank" rel="noreferrer">applicant tracking systems</a> with resume templates that appeal to both machines and humans.</p></article>
            <article className="feature-tile feature-tile-wide"><div className="feature-icon"><CircleHelp size={22}/></div><span className="feature-number">06 / GET GUIDANCE</span><h3>Expert tips and guidance</h3><p>Get help every step of the way as you build your resume with expert tips and suggested phrases.</p><div className="feature-quote">“Make your experience easy to understand, and your strengths easy to remember.”</div></article>
          </div>
          <div className="feature-showcase-bottom"><div><span className="eyebrow">READY FOR YOUR NEXT CHAPTER?</span><h3>Build a resume that opens doors.</h3></div><button className="button button-dark" onClick={() => startNew()}>Build My Resume Now <ArrowRight size={17}/></button></div>
        </section>
        <section className="ai-builder-section" id="ai-resume-builder">
          <div className="ai-builder-copy">
            <div className="eyebrow"><Sparkles size={14}/> YOUR IDEAS, BEAUTIFULLY WRITTEN</div>
            <h2>Our Free AI Resume Builder <span>Works Wherever You Do</span></h2>
            <p>Find the right words and automate your resume writing process with our free AI resume builder. Whether you’re working from your phone or laptop, our AI provides tailored suggestions to help you stand out.</p>
            <button className="button button-dark ai-builder-button" onClick={() => startNew()}>Try Resume Builder <ArrowRight size={17}/></button>
            <div className="ai-builder-note"><span><Check size={14}/></span> Build at your pace, from any device</div>
          </div>
          <div className="ai-resume-visual" aria-label="Decorative resume preview illustration">
            <div className="ai-orbit ai-orbit-one"></div><div className="ai-orbit ai-orbit-two"></div>
            <div className="ai-float-chip ai-chip-top"><Sparkles size={15}/> AI writing suggestions</div>
            <div className="ai-resume-paper">
              <div className="ai-paper-top"><div className="ai-avatar">AM</div><div><strong>Alex Morgan</strong><span>PRODUCT DESIGNER</span></div><div className="ai-paper-mark"><FileText size={17}/></div></div>
              <div className="ai-paper-contact">alex.morgan@email.com&nbsp; · &nbsp;New York, NY&nbsp; · &nbsp;LinkedIn</div>
              <div className="ai-paper-section">PROFILE</div><p className="ai-paper-copy">Creative product designer focused on thoughtful, accessible digital experiences and user-centered solutions.</p>
              <div className="ai-paper-section">EXPERIENCE</div><div className="ai-paper-job"><strong>Product Designer</strong><span>2022 — Present</span></div><p className="ai-paper-copy">Led product improvements across web experiences, partnering with engineering and research teams.</p><div className="ai-paper-line"></div><div className="ai-paper-line short"></div>
              <div className="ai-paper-section">EDUCATION</div><div className="ai-paper-job"><strong>B.A. Design & Technology</strong><span>2018 — 2022</span></div>
              <div className="ai-paper-section">CORE SKILLS</div><div className="ai-skill-row"><span>Product strategy</span><span>Figma</span><span>Prototyping</span></div>
            </div>
            <div className="ai-float-chip ai-chip-bottom"><span className="ai-chip-check"><Check size={13}/></span> Resume ready to refine</div>
          </div>
        </section>
        <section className="mobile-resume-section" id="mobile-resume">
          <div className="mobile-resume-visual">
            <div className="mobile-gradient-orb"></div>
            <div className="mobile-phone">
              <div className="phone-speaker"></div>
              <div className="phone-screen">
                <div className="phone-appbar"><span className="phone-brand-mark">R.</span><span>ResumeForge</span><span className="phone-menu">•••</span></div>
                <div className="phone-resume">
                  <div className="phone-resume-head"><strong>Alex Morgan</strong><span>PRODUCT DESIGNER</span><small>alex.morgan@email.com · LinkedIn</small></div>
                  <div className="phone-resume-body"><b>PROFILE</b><p>Creative designer passionate about clear, accessible digital experiences.</p><b>EXPERIENCE</b><strong>Product Designer</strong><small>2022 — Present</small><i></i><i className="phone-line-short"></i><b>EDUCATION</b><strong>B.A. Design & Technology</strong><b>KEY SKILLS</b><div className="phone-tags"><span>Figma</span><span>UX</span><span>Research</span></div></div>
                </div>
                <div className="phone-bottom-button">Preview resume <ArrowRight size={12}/></div>
              </div>
            </div>
            <div className="mobile-float-card mobile-float-ready"><span><Check size={13}/></span> Ready to share</div>
            <div className="mobile-float-card mobile-float-device"><Smartphone size={15}/> Fits your screen</div>
            <div className="mobile-floating-dot"></div>
          </div>
          <div className="mobile-resume-copy">
            <div className="eyebrow"><Smartphone size={14}/> MADE FOR EVERY SCREEN</div>
            <h2>Mobile-Friendly Resume Generator <span>You Can Use Anywhere</span></h2>
            <p>Create a professional resume in minutes with our AI-powered, fully responsive tool. Enter your details — such as work experience, skills, and career goals — from your smartphone, tablet, or desktop browser, and instantly generate a polished, ATS-friendly resume that’s ready to send.</p>
            <button className="button button-dark mobile-resume-cta" onClick={() => startNew()}>Create Resume from Phone <ArrowRight size={17}/></button>
            <div className="mobile-resume-trust"><span><Check size={14}/></span> Phone, tablet and desktop friendly</div>
          </div>
        </section>
        <section className="expert-guidance-section" id="expert-guidance">
          <div className="expert-guidance-visual">
            <div className="expert-guidance-glow"></div>
            <div className="expert-dashboard">
              <div className="expert-dashboard-top"><span className="expert-brand-dot">R.</span><strong>ResumeForge</strong><span className="expert-dots">•••</span></div>
              <div className="expert-dashboard-layout">
                <aside className="expert-sidebar"><span>⌂ &nbsp; Home</span><span>▤ &nbsp; Templates</span><span className="expert-side-active">✧ &nbsp; Expert Tips</span><span>▧ &nbsp; My Resumes</span></aside>
                <div className="expert-main"><small>YOUR CAREER TOOLKIT</small><h3>Resume examples</h3><p>Find inspiration for your next opportunity.</p>
                  <div className="expert-search">⌕ &nbsp; Search your dream role...</div>
                  <div className="expert-example"><span className="expert-example-icon">⌘</span><div><strong>Software Engineer</strong><small>Skills, impact & technical projects</small></div><ArrowRight size={14}/></div>
                  <div className="expert-example"><span className="expert-example-icon blush">✎</span><div><strong>Marketing Specialist</strong><small>Achievements & campaign results</small></div><ArrowRight size={14}/></div>
                  <div className="expert-example"><span className="expert-example-icon sage">▥</span><div><strong>Product Designer</strong><small>Portfolio, process & outcomes</small></div><ArrowRight size={14}/></div>
                  <div className="expert-tip-card"><span><Sparkles size={14}/></span><div><strong>Expert tip</strong><small>Show impact with clear, specific achievements.</small></div></div>
                </div>
              </div>
            </div>
            <div className="expert-floating-note expert-note-one"><span><Check size={13}/></span><div><strong>Expert examples</strong><small>Made for your career path</small></div></div>
            <div className="expert-floating-note expert-note-two"><Sparkles size={15}/><div><strong>Make it stand out</strong><small>Tips for stronger resumes</small></div></div>
            <div className="expert-orbit"></div>
          </div>
          <div className="expert-guidance-copy">
            <div className="eyebrow"><Sparkles size={14}/> EXPERT INSIGHTS, REAL RESULTS</div>
            <h2>Expert Resume Tips <span>— Even on the Go</span></h2>
            <p>Access <a href="https://www.resumebuilder.com/resume-examples/" target="_blank" rel="noreferrer">job-specific resume examples</a> written by certified professionals, no matter where you are. Edit your resume during your commute, while waiting for an interview, or from the comfort of your home without losing any features.</p>
            <button className="button button-dark expert-guidance-cta" onClick={() => startNew()}>Get Expert Guidance <ArrowRight size={17}/></button>
            <div className="expert-guidance-benefits"><div><span><FileText size={17}/></span><small>Job-Specific<br/>Examples</small></div><div><span><Sparkles size={17}/></span><small>Professional<br/>Guidance</small></div><div><span><Smartphone size={17}/></span><small>Edit Anywhere,<br/>Anytime</small></div></div>
          </div>
        </section>
        <section className="customize-section" id="customize-resume">
          <div className="customize-visual">
            <div className="customize-glow"></div>
            <div className="customize-editor-card">
              <div className="customize-editor-top"><span className="customize-mark">R.</span><strong>ResumeForge Studio</strong><span className="customize-live-dot"></span><small>Live preview</small></div>
              <div className="customize-editor-content">
                <div className="customize-controls"><strong>Make it yours</strong><small>DESIGN SETTINGS</small><label>Font style</label><div className="customize-select">Modern Sans <span>⌄</span></div><label>Accent color</label><div className="customize-swatches"><i></i><i></i><i></i><i></i></div><label>Page layout</label><div className="customize-layouts"><span className="active"><i></i><i></i></span><span><i></i><i></i></span><span><i></i><i></i></span></div><div className="customize-slider-label">Section spacing <b>Comfortable</b></div><div className="customize-slider"><i></i></div><div className="customize-save"><Check size={12}/> Changes saved</div></div>
                <div className="customize-paper"><div className="customize-paper-head"><strong>Jordan Lee</strong><small>CREATIVE DEVELOPER</small><span>jordan.lee@email.com · Portfolio</span></div><div className="customize-paper-body"><b>PROFILE</b><p>Creative developer blending thoughtful design with clean, accessible code.</p><b>EXPERIENCE</b><strong>Frontend Developer</strong><small>2023 — Present</small><i></i><i className="short"></i><b>EDUCATION</b><strong>B.Sc. Computer Science</strong><b>SKILLS</b><div className="customize-skill-pills"><span>React</span><span>UI Design</span><span>CSS</span></div></div></div>
              </div>
              <div className="customize-editor-footer"><span><Check size={12}/> ATS-friendly structure</span><span>100% yours</span></div>
            </div>
            <div className="customize-float customize-float-one"><span>Aa</span><div><strong>Modern typography</strong><small>Choose your style</small></div></div>
            <div className="customize-float customize-float-two"><span className="customize-color-icon"><Palette size={15}/></span><div><strong>Your colors</strong><small>Match your personality</small></div></div>
          </div>
          <div className="customize-copy">
            <div className="eyebrow"><Palette size={14}/> YOUR STYLE, YOUR STORY</div>
            <h2>Custom Resume Maker <span>That Fits Your Lifestyle</span></h2>
            <p>Quickly change your resume's font styles, colors, and layout on any screen — from a small phone display to a large desktop monitor. Browse our <a href="https://www.resumebuilder.com/resume-templates/" target="_blank" rel="noreferrer">resume templates</a> to start customizing your design and making it stand out.</p>
            <button className="button button-dark customize-cta" onClick={() => startNew()}>Customize My Resume Now <ArrowRight size={17}/></button>
            <div className="customize-mini-points"><span><Check size={14}/> Flexible layouts</span><span><Check size={14}/> Personal style</span><span><Check size={14}/> Live preview</span></div>
          </div>
        </section>
        <section className="bottom-cta"><div><span className="eyebrow">ONE STEP CLOSER</span><h2>Let's make your next move count.</h2><p>Your next opportunity deserves a resume you feel good about.</p></div><button className="button button-light" onClick={() => setPage('templates')}>Get started <ArrowRight size={17} /></button></section>
      </main>}

      {(page === 'login' || page === 'signup') && <main className="auth-page">
        <section className="auth-card">
          <div className="auth-brand-mark"><FileText size={22} /></div>
          <div className="eyebrow">{page === 'signup' ? 'YOUR NEXT CHAPTER STARTS HERE' : 'WELCOME BACK'}</div>
          <h1>{page === 'signup' ? 'Create your account.' : 'Good to see you again.'}</h1>
          <p className="auth-subtitle">{page === 'signup' ? 'Save your resume drafts and keep building towards your next opportunity.' : 'Log in to continue working on your resume.'}</p>
          <form className="auth-form" onSubmit={submitAuth}>
            {page === 'signup' && <label className="field-label">Full name<input autoComplete="name" value={authName} onChange={e => setAuthName(e.target.value)} placeholder="e.g. Alex Morgan" /></label>}
            <label className="field-label">Email address<input type="email" autoComplete="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} placeholder="you@example.com" /></label>
            <label className="field-label">Password<input type="password" autoComplete={page === 'signup' ? 'new-password' : 'current-password'} value={authPassword} onChange={e => setAuthPassword(e.target.value)} placeholder="At least 6 characters" /></label>
            {authError && <p className="auth-error" role="alert">{authError}</p>}
            <button className="button button-dark auth-submit" type="submit">{page === 'signup' ? 'Create account' : 'Log in'} <ArrowRight size={16}/></button>
          </form>
          <p className="auth-switch">{page === 'signup' ? 'Already have an account?' : "Don't have an account?"} <button onClick={() => openAuth(page === 'signup' ? 'login' : 'signup')}>{page === 'signup' ? 'Log in' : 'Sign up'}</button></p>
          <p className="auth-note">Demo mode: your profile is saved only in this browser. Secure account authentication will be connected with the backend later.</p>
          <button className="auth-back" onClick={() => setPage('home')}><ArrowLeft size={15}/> Back to home</button>
        </section>
        <div className="auth-side-note"><span className="eyebrow">MAKE YOUR NEXT MOVE COUNT</span><h2>A resume that feels like you.</h2><p>Clear, thoughtful, and ready for what's next.</p><div className="auth-mini-paper"><div className="mini-paper-title"></div><div className="mini-paper-line"></div><div className="mini-paper-line short"></div><div className="mini-paper-heading"></div><div className="mini-paper-line"></div><div className="mini-paper-line"></div><div className="mini-paper-heading"></div><div className="mini-paper-line short"></div></div></div>
      </main>}

      {page === 'templates' && <main className="page-content"><div className="page-heading"><div className="eyebrow">CHOOSE YOUR STARTING POINT</div><h1>Find your <span>resume style.</span></h1><p>Pick a clean layout, then make it your own in the editor.</p></div><div className="template-grid template-grid-large">{templates.map((item, index) => <TemplateCard key={item.id} item={item} index={index} onChoose={() => startNew(item.id)} />)}</div></main>}

      {page === 'dashboard' && <main className="page-content dashboard-page"><div className="dashboard-heading"><div><div className="eyebrow">YOUR WORKSPACE</div><h1>My resumes<span>.</span></h1><p>Pick up where you left off, or start fresh.</p></div><button className="button button-dark" onClick={() => setPage('templates')}><Plus size={17} /> New resume</button></div>
        {saved.length === 0 ? <div className="empty-state"><div className="empty-icon"><FileText size={27} /></div><h2>Your next opportunity starts with a first draft.</h2><p>Your saved resumes will live here, ready whenever you are.</p><button className="button button-dark" onClick={() => setPage('templates')}>Create your first resume <ArrowRight size={16} /></button></div> : <div className="saved-grid">{saved.map(item => <div className="saved-card" key={item.id}><div className="saved-preview"><ResumePreview resume={item} template={item.template} /></div><div className="saved-info"><div><h3>{item.name || 'Untitled resume'}</h3><p>{item.role || 'Resume draft'}</p></div><button className="icon-button danger" onClick={() => deleteResume(item.id)} aria-label="Delete resume"><Trash2 size={16} /></button></div><button className="button button-outline full-width" onClick={() => openResume(item)}>Continue editing <ArrowRight size={15} /></button></div>)}</div>}
      </main>}

      {page === 'editor' && <main className="editor-page">
        <div className="editor-toolbar no-print"><button className="back-button" onClick={() => setPage('dashboard')}><ArrowLeft size={16} /> My resumes</button><div className="save-status"><span className="status-dot"></span> Saved on this device when you click Save</div><div className="toolbar-actions"><button className="button button-outline button-small" onClick={saveResume}>Save draft</button><button className="button button-dark button-small" onClick={downloadResume}><Download size={15} /> Download PDF</button></div></div>
        <div className="editor-layout">
          <section className="editor-panel no-print"><div className="editor-panel-heading"><div><div className="eyebrow">RESUME BUILDER</div><h2>Build your story.</h2></div><span className="step-count">01 <span>/ 05</span></span></div>
            <div className="section-tabs">{[['personal','Personal'],['summary','Summary'],['experience','Experience'],['education','Education'],['skills','Skills'],['projects','Projects']].map(([id,label]) => <button key={id} className={section === id ? 'section-tab selected' : 'section-tab'} onClick={() => setSection(id)}>{label}{section === id && <span></span>}</button>)}</div>
            <div className="editor-form">
              {section === 'personal' && <><div className="form-intro"><h3>Let's start with you.</h3><p>Share the best way for an employer to reach you.</p></div><Field label="Full name" value={resume.name} onChange={v => update('name',v)} placeholder="e.g. Alex Morgan" /><Field label="Professional title" value={resume.role} onChange={v => update('role',v)} placeholder="e.g. Frontend Developer" /><div className="field-row"><Field label="Email address" value={resume.email} onChange={v => update('email',v)} placeholder="you@email.com" /><Field label="Phone" value={resume.phone} onChange={v => update('phone',v)} placeholder="+91 ..." /></div><Field label="Location" value={resume.location} onChange={v => update('location',v)} placeholder="City, Country" /></>}
              {section === 'summary' && <><div className="form-intro"><h3>Your professional summary.</h3><p>A few lines that tell employers what you bring.</p></div><label className="field-label">Summary<textarea rows="7" value={resume.summary} onChange={e => update('summary',e.target.value)} placeholder="Write a short introduction..." /></label><button className="suggestion-button" onClick={() => notify('Writing suggestions can be added in the next phase.')}><WandSparkles size={16} /> Help me improve this <span>Coming soon</span></button></>}
              {section === 'experience' && <><div className="form-intro"><h3>Experience that matters.</h3><p>Include jobs, internships, and relevant work.</p></div>{resume.experience.map(item => <div className="repeat-card" key={item.id}><button className="remove-item" onClick={() => removeListItem('experience',item.id)} aria-label="Remove experience"><Trash2 size={15}/></button><Field label="Job title" value={item.title} onChange={v => updateListItem('experience',item.id,'title',v)} /><Field label="Company" value={item.company} onChange={v => updateListItem('experience',item.id,'company',v)} /><Field label="Dates" value={item.dates} onChange={v => updateListItem('experience',item.id,'dates',v)} /><Field label="Description" value={item.description} onChange={v => updateListItem('experience',item.id,'description',v)} multiline /></div>)}<button className="add-item" onClick={() => addListItem('experience',{title:'',company:'',dates:'',description:''})}><Plus size={16}/> Add experience</button></>}
              {section === 'education' && <><div className="form-intro"><h3>Learning & education.</h3><p>Show the education that supports your goals.</p></div>{resume.education.map(item => <div className="repeat-card" key={item.id}><button className="remove-item" onClick={() => removeListItem('education',item.id)} aria-label="Remove education"><Trash2 size={15}/></button><Field label="Degree / qualification" value={item.degree} onChange={v => updateListItem('education',item.id,'degree',v)} /><Field label="School / university" value={item.school} onChange={v => updateListItem('education',item.id,'school',v)} /><Field label="Dates" value={item.dates} onChange={v => updateListItem('education',item.id,'dates',v)} /><Field label="Details" value={item.description} onChange={v => updateListItem('education',item.id,'description',v)} multiline /></div>)}<button className="add-item" onClick={() => addListItem('education',{degree:'',school:'',dates:'',description:''})}><Plus size={16}/> Add education</button></>}
              {section === 'skills' && <><div className="form-intro"><h3>What are you good at?</h3><p>Separate your skills with commas.</p></div><label className="field-label">Skills<textarea rows="5" value={resume.skills} onChange={e => update('skills',e.target.value)} placeholder="React, Project management, ..." /></label><div className="skill-chips">{resume.skills.split(',').map(s => s.trim()).filter(Boolean).map(skill => <span key={skill}>{skill}</span>)}</div></>}
              {section === 'projects' && <><div className="form-intro"><h3>Show what you've made.</h3><p>Projects are a great way to demonstrate your skills.</p></div>{resume.projects.map(item => <div className="repeat-card" key={item.id}><button className="remove-item" onClick={() => removeListItem('projects',item.id)} aria-label="Remove project"><Trash2 size={15}/></button><Field label="Project name" value={item.title} onChange={v => updateListItem('projects',item.id,'title',v)} /><Field label="What did you build?" value={item.description} onChange={v => updateListItem('projects',item.id,'description',v)} multiline /></div>)}<button className="add-item" onClick={() => addListItem('projects',{title:'',description:''})}><Plus size={16}/> Add project</button></>}
            </div>
            <div className="editor-bottom"><span>Changes show up in your preview instantly.</span><button className="button button-dark" onClick={() => { const sections=['personal','summary','experience','education','skills','projects']; const next=sections[(sections.indexOf(section)+1)%sections.length]; setSection(next); }}>{section === 'projects' ? 'Back to personal' : 'Next section'} <ArrowRight size={15}/></button></div>
          </section>
          <section className="preview-panel"><div className="preview-heading no-print"><div><span className="live-dot"></span> LIVE PREVIEW</div><button className="preview-download" onClick={downloadResume}><Download size={15}/> Download <ChevronDown size={14}/></button></div><div className="resume-preview-wrap"><ResumePreview resume={resume} template={template} /></div><p className="preview-tip no-print"><CircleHelp size={14}/> Tip: Keep your resume clear, concise, and relevant.</p></section>
        </div>
      </main>}

      {showHelp && <div className="modal-backdrop no-print" onClick={() => setShowHelp(false)}><div className="help-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setShowHelp(false)}><X size={18}/></button><div className="modal-icon"><Sparkles size={21}/></div><h2>Simple by design.</h2><p>Choose a template, add your experience, and see your resume take shape as you type.</p><div className="help-step"><span>01</span><div><strong>Choose a layout</strong><small>Start with a style that fits you.</small></div></div><div className="help-step"><span>02</span><div><strong>Tell your story</strong><small>Fill in your details and projects.</small></div></div><div className="help-step"><span>03</span><div><strong>Save or download</strong><small>Keep a draft or print to PDF.</small></div></div><button className="button button-dark full-width" onClick={() => { setShowHelp(false); setPage('templates'); }}>Let's get started <ArrowRight size={16}/></button></div></div>}
      {toast && <div className="toast no-print"><Check size={17}/>{toast}</div>}
      <footer className="site-footer no-print"><button className="brand footer-brand" onClick={() => setPage('home')}><span className="brand-mark"><FileText size={16}/></span><span>resume<span className="brand-light">forge</span><i>.</i></span></button><span>Make your next chapter count.</span><span>© {new Date().getFullYear()} ResumeForge</span></footer>
    </div>
  );
}

function Field({ label, value, onChange, placeholder = '', multiline = false }) {
  return <label className="field-label">{label}{multiline ? <textarea rows="4" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} /> : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />}</label>;
}

function TemplateCard({ item, index, onChoose }) {
  return <article className="template-card"><button className="template-art resume-card-art" onClick={onChoose} aria-label={'Choose '+item.name+' template'} style={{'--resume-accent':item.color}}>
    <div className={'mini-resume mini-'+item.id}>
      <div className="mini-resume-head"><div className="mini-person">{item.person || 'ALEX MORGAN'}</div><div className="mini-role">{item.role || 'SOFTWARE DEVELOPER'}</div><div className="mini-contact">{item.email || 'alex.morgan@email.com'} · LinkedIn</div></div>
      <div className="mini-resume-body"><div className="mini-section">PROFILE</div><p className="mini-copy">Motivated professional with hands-on experience, a thoughtful approach to problem solving, and a passion for continuous learning.</p>
      <div className="mini-section">EXPERIENCE</div><strong className="mini-job">Senior {item.role.split(' ').slice(-1)[0]}</strong><small className="mini-date">2023 — Present</small><div className="mini-line"></div><div className="mini-line medium"></div><div className="mini-line"></div>
      <div className="mini-section">EDUCATION</div><strong className="mini-job">Bachelor's Degree</strong><small className="mini-date">University · 2020–2024</small>
      <div className="mini-section">SKILLS</div><p className="mini-copy">{item.skills}</p></div>
    </div><span className="template-badge">{item.tag}</span><span className="template-hover">Use this template <ArrowRight size={14}/></span></button>
    <div className="template-meta"><div><h3>{item.name}</h3><p>{item.detail}</p></div><button className="round-arrow" onClick={onChoose} aria-label={'Use '+item.name}><ArrowRight size={17}/></button></div></article>;
}
function ResumePreview({ resume, template }) {
  const skills = (resume.skills || '').split(',').map(s => s.trim()).filter(Boolean);
  return <article className={'resume-paper-live resume-'+(template || 'classic')}>
    <div className="resume-live-header"><h1>{resume.name || 'Your Name'}</h1><p className="resume-live-role">{resume.role || 'Professional Title'}</p><div className="resume-live-contact">{[resume.email,resume.phone,resume.location].filter(Boolean).join('  ·  ')}</div></div>
    {resume.summary && <ResumeSection title="Profile"><p>{resume.summary}</p></ResumeSection>}
    {!!resume.experience?.filter(x=>x.title||x.company).length && <ResumeSection title="Experience">{resume.experience.filter(x=>x.title||x.company).map(x=><div className="resume-entry" key={x.id}><div className="resume-entry-head"><strong>{x.title}</strong><span>{x.dates}</span></div><div className="resume-entry-sub">{x.company}</div>{x.description && <p>{x.description}</p>}</div>)}</ResumeSection>}
    {!!resume.education?.filter(x=>x.degree||x.school).length && <ResumeSection title="Education">{resume.education.filter(x=>x.degree||x.school).map(x=><div className="resume-entry" key={x.id}><div className="resume-entry-head"><strong>{x.degree}</strong><span>{x.dates}</span></div><div className="resume-entry-sub">{x.school}</div>{x.description && <p>{x.description}</p>}</div>)}</ResumeSection>}
    {!!skills.length && <ResumeSection title="Skills"><div className="resume-skill-list">{skills.map(s=><span key={s}>{s}</span>)}</div></ResumeSection>}
    {!!resume.projects?.filter(x=>x.title).length && <ResumeSection title="Projects">{resume.projects.filter(x=>x.title).map(x=><div className="resume-entry" key={x.id}><strong>{x.title}</strong>{x.description && <p>{x.description}</p>}</div>)}</ResumeSection>}
  </article>;
}
function ResumeSection({ title, children }) { return <section className="resume-live-section"><h2>{title}</h2>{children}</section>; }