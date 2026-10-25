import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown, ArrowLeft, ArrowRight, Check, ChevronDown, CircleHelp,
  Download, FileText, LayoutTemplate, Menu, Plus, Sparkles, Trash2,
  UserRound, WandSparkles, X
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
  { id: 'classic', name: 'Classic', detail: 'Clean, professional, timeless', tag: 'ATS FRIENDLY' },
  { id: 'modern', name: 'Modern', detail: 'Confident headings and clean lines', tag: 'POPULAR' },
  { id: 'minimal', name: 'Minimal', detail: 'Simple layout with room to breathe', tag: 'SIMPLE' }
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
          <button className={page === 'templates' ? 'nav-link active' : 'nav-link'} onClick={() => { setPage('templates'); setMobileMenu(false); }}>Templates</button>
          <button className={page === 'dashboard' ? 'nav-link active' : 'nav-link'} onClick={() => { setPage('dashboard'); setMobileMenu(false); }}>My resumes</button>
          <button className="nav-link" onClick={() => setShowHelp(true)}>How it works</button>
        </nav>
        <div className="top-actions">
          {currentUser ? <><button className="nav-link user-greeting" onClick={() => setPage('dashboard')}>Hi, {currentUser.name}</button><button className="button button-outline button-small" onClick={signOut}>Log out</button></> : <><button className="button button-quiet button-small" onClick={() => openAuth('login')}>Log in</button><button className="button button-outline button-small" onClick={() => openAuth('signup')}>Sign up</button></>}
          <button className="button button-dark button-small" onClick={() => startNew()}>Create my resume <ArrowRight size={15} /></button>
        </div>
      </header>

      {page === 'home' && <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot"></span> YOUR NEXT CHAPTER STARTS HERE</div>
            <h1>Your experience.<br /><span>Your next opportunity.</span></h1>
            <p className="hero-description">Create a resume that tells your story clearly. Thoughtful templates, a simple editor, and a polished result — all in one place.</p>
            <div className="hero-buttons">
              <button className="button button-dark" onClick={() => setPage('templates')}>Build my resume <ArrowRight size={17} /></button>
              <button className="button button-quiet" onClick={() => setPage('templates')}><LayoutTemplate size={17} /> Explore templates</button>
            </div>
            <div className="hero-proof"><div className="proof-avatars"><span>S</span><span>R</span><span>A</span></div><div><strong>A better way to get started</strong><small>Simple, focused, and made for you</small></div></div>
          </div>
          <div className="hero-visual">
            <div className="visual-note note-top"><Sparkles size={15} /> Made to stand out</div>
            <div className="resume-paper">
              <div className="paper-topline"></div>
              <div className="paper-name">Alex Morgan</div><div className="paper-role">PRODUCT DESIGNER</div>
              <div className="paper-contact">alex.morgan@email.com&nbsp; · &nbsp;New York, NY</div>
              <div className="paper-rule"></div>
              <div className="paper-section-title">PROFILE</div><div className="paper-line long"></div><div className="paper-line medium"></div><div className="paper-line short"></div>
              <div className="paper-section-title">EXPERIENCE</div><div className="paper-bold">Senior Product Designer</div><div className="paper-line long"></div><div className="paper-line long"></div><div className="paper-line medium"></div>
              <div className="paper-bold">Product Designer · Studio North</div><div className="paper-line long"></div><div className="paper-line medium"></div>
              <div className="paper-section-title">EDUCATION</div><div className="paper-bold">B.A. Design & Visual Arts</div><div className="paper-line medium"></div>
              <div className="paper-section-title">SKILLS</div><div className="paper-skills"><span>Product strategy</span><span>Prototyping</span><span>Research</span><span>Figma</span></div>
            </div>
            <div className="visual-note note-bottom"><span className="check-circle"><Check size={12} /></span> Your story, beautifully told</div>
            <div className="visual-sparkle sparkle-one">✳</div><div className="visual-sparkle sparkle-two">✳</div>
          </div>
        </section>
        <section className="trust-strip"><span>DESIGNED FOR THE NEXT STEP</span><div><Check size={15} /> Clean layouts</div><div><Check size={15} /> Easy to customize</div><div><Check size={15} /> Print-ready resumes</div></section>
        <section className="home-templates section-wrap">
          <div className="section-heading"><div><div className="eyebrow">A GOOD FIRST IMPRESSION</div><h2>A style that feels like you.</h2><p>Start with a layout. Make every detail your own.</p></div><button className="text-link" onClick={() => setPage('templates')}>View all templates <ArrowRight size={16} /></button></div>
          <div className="template-grid">{templates.map((item, index) => <TemplateCard key={item.id} item={item} index={index} onChoose={() => startNew(item.id)} />)}</div>
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
  return <article className="template-card"><button className="template-art" onClick={onChoose} aria-label={'Choose '+item.name+' template'}><div className={'mini-resume mini-'+item.id}><div className="mini-head"></div><div className="mini-title"></div><div className="mini-subtitle"></div><div className="mini-line"></div><div className="mini-line medium"></div><div className="mini-section"></div><div className="mini-line"></div><div className="mini-line short"></div><div className="mini-section"></div><div className="mini-line"></div><div className="mini-line medium"></div><div className="mini-section"></div><div className="mini-line short"></div></div><span className="template-badge">{item.tag}</span><span className="template-hover">Use this template <ArrowRight size={14}/></span></button><div className="template-meta"><div><h3>{item.name}</h3><p>{item.detail}</p></div><button className="round-arrow" onClick={onChoose} aria-label={'Use '+item.name}><ArrowRight size={17}/></button></div></article>;
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