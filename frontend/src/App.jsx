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
{id:'classic',name:'Classic Professional',detail:'Clear and ATS-friendly',tag:'ATS FRIENDLY',color:'#896C6C',columns:1,photo:false,person:'ALEX MORGAN',role:'SOFTWARE DEVELOPER',email:'alex.morgan@email.com',skills:'JavaScript · React · SQL'},
{id:'modern',name:'Modern Sidebar',detail:'Bold, modern two-column style',tag:'POPULAR',color:'#34495e',columns:2,photo:true,person:'JAMIE WILSON',role:'MARKETING SPECIALIST',email:'jamie.w@email.com',skills:'Campaigns · SEO · Analytics'},
{id:'minimal',name:'Minimal',detail:'Simple, spacious and elegant',tag:'MINIMAL',color:'#b18a65',columns:1,photo:false,person:'TAYLOR LEE',role:'UX DESIGNER',email:'taylor.lee@email.com',skills:'Figma · Research · Prototyping'},
{id:'sage',name:'Sage Executive',detail:'Calm green executive look',tag:'EXECUTIVE',color:'#617b68',columns:2,photo:true,person:'MORGAN REED',role:'PROJECT MANAGER',email:'morgan.r@email.com',skills:'Leadership · Agile · Planning'},
{id:'ocean',name:'Ocean Blue',detail:'Trustworthy and structured',tag:'PROFESSIONAL',color:'#26718a',columns:1,photo:false,person:'JORDAN PARK',role:'DATA ANALYST',email:'jordan.p@email.com',skills:'Python · SQL · Power BI'},
{id:'terracotta',name:'Terracotta',detail:'Warm creative portfolio style',tag:'CREATIVE',color:'#c56d50',columns:2,photo:true,person:'RILEY SHAH',role:'GRAPHIC DESIGNER',email:'riley.s@email.com',skills:'Branding · Adobe · Layout'},
{id:'plum',name:'Plum Accent',detail:'Refined, distinctive headings',tag:'ELEGANT',color:'#79546f',columns:1,photo:false,person:'CASEY PATEL',role:'BUSINESS ANALYST',email:'casey.p@email.com',skills:'Research · Excel · Strategy'},
{id:'navy',name:'Navy Classic',detail:'Traditional corporate format',tag:'CORPORATE',color:'#263b58',columns:2,photo:false,person:'SAM RIVERA',role:'FINANCE ASSOCIATE',email:'sam.r@email.com',skills:'Forecasting · Excel · Reports'},
{id:'coral',name:'Coral Fresh',detail:'Bright and friendly presentation',tag:'FRESH',color:'#d66d72',columns:1,photo:true,person:'AVA THOMAS',role:'CONTENT WRITER',email:'ava.t@email.com',skills:'Writing · Editing · SEO'},
{id:'mono',name:'Monochrome',detail:'Black-and-white understated style',tag:'TIMELESS',color:'#343434',columns:1,photo:false,person:'NOAH BENNETT',role:'OPERATIONS COORDINATOR',email:'noah.b@email.com',skills:'Process · Logistics · Teams'},
{id:'editorial',name:'Editorial Split',detail:'Editorial-style split layout',tag:'EDITORIAL',color:'#8c5d46',columns:2,photo:true,person:'SKYLER JAMES',role:'EDITORIAL DESIGNER',email:'skyler.j@email.com',skills:'Typography · Layout · Design'},
{id:'academic',name:'Academic Scholar',detail:'Education and research focused',tag:'ACADEMIC',color:'#435b73',columns:1,photo:false,person:'PRIYA SHARMA',role:'RESEARCH ASSISTANT',email:'priya.s@email.com',skills:'Research · Writing · Analysis'},
{id:'bold',name:'Bold Header',detail:'Strong header with compact sections',tag:'BOLD',color:'#9a493d',columns:1,photo:false,person:'MAYA CLARK',role:'PRODUCT DESIGNER',email:'maya.c@email.com',skills:'Product · Figma · UX'},
{id:'timeline',name:'Career Timeline',detail:'Chronological experience layout',tag:'TIMELINE',color:'#53766e',columns:2,photo:false,person:'DEV PATEL',role:'PROJECT LEAD',email:'dev.p@email.com',skills:'Planning · Agile · Teams'},
{id:'compact',name:'Compact One Page',detail:'Space-efficient single-page format',tag:'COMPACT',color:'#6d6d6d',columns:1,photo:false,person:'EMMA WILSON',role:'BUSINESS ASSOCIATE',email:'emma.w@email.com',skills:'Operations · Excel · Reports'},
{id:'creative-grid',name:'Creative Grid',detail:'Asymmetric sections for creatives',tag:'CREATIVE',color:'#bd7659',columns:2,photo:true,person:'NOOR KHAN',role:'VISUAL ARTIST',email:'noor.k@email.com',skills:'Illustration · Branding · Art'},
{id:'executive-dark',name:'Executive Contrast',detail:'High-contrast executive layout',tag:'EXECUTIVE',color:'#303d4b',columns:2,photo:false,person:'ARJUN MEHTA',role:'OPERATIONS DIRECTOR',email:'arjun.m@email.com',skills:'Strategy · Leadership · Growth'},
{id:'soft-modern',name:'Soft Modern',detail:'Gentle typography and open spacing',tag:'MODERN',color:'#a66f73',columns:1,photo:true,person:'ISHA VERMA',role:'COMMUNICATIONS SPECIALIST',email:'isha.v@email.com',skills:'Writing · PR · Content'},
{id:'tech-stack',name:'Tech Stack',detail:'Skills-forward technical resume',tag:'TECH',color:'#426a83',columns:2,photo:false,person:'KABIR SINGH',role:'SOFTWARE ENGINEER',email:'kabir.s@email.com',skills:'Java · React · APIs'},
{id:'freelance',name:'Freelance Portfolio',detail:'Project-led creative portfolio',tag:'PORTFOLIO',color:'#8b6a48',columns:2,photo:true,person:'ZARA ALI',role:'FREELANCE CREATIVE',email:'zara.a@email.com',skills:'Clients · Campaigns · Design'},
{id:'top-banner',name:'Top Banner',detail:'Wide name banner with compact content',tag:'BANNER',color:'#285b55',columns:1,photo:false,person:'OLIVIA GREEN',role:'PEOPLE OPERATIONS',email:'olivia.g@email.com',skills:'People · Culture · Hiring'},
{id:'left-rail',name:'Left Rail',detail:'Narrow rail for skills and contact',tag:'LEFT RAIL',color:'#b47754',columns:2,photo:true,person:'ETHAN BROOKS',role:'UX RESEARCHER',email:'ethan.b@email.com',skills:'Interviews · Testing · Insights'},
{id:'right-rail',name:'Right Rail',detail:'Right-side skills panel with clear hierarchy',tag:'RIGHT RAIL',color:'#4f6382',columns:2,photo:false,person:'ANAYA DAS',role:'DATA SCIENTIST',email:'anaya.d@email.com',skills:'Python · ML · Statistics'},
{id:'centered-classic',name:'Centered Classic',detail:'Centered nameplate and balanced sections',tag:'CENTERED',color:'#75624f',columns:1,photo:false,person:'LUCAS MARTIN',role:'FINANCIAL ANALYST',email:'lucas.m@email.com',skills:'Forecasts · Excel · Reporting'},
{id:'split-header',name:'Split Header',detail:'Name and contact arranged on opposite sides',tag:'SPLIT HEADER',color:'#5d6c61',columns:1,photo:false,person:'MEERA IYER',role:'PROGRAM COORDINATOR',email:'meera.i@email.com',skills:'Planning · Outreach · Events'},
{id:'numbered-sections',name:'Numbered Sections',detail:'Structured sections with numbered markers',tag:'STRUCTURED',color:'#9a654c',columns:1,photo:false,person:'RYAN COLE',role:'SYSTEMS ANALYST',email:'ryan.c@email.com',skills:'Systems · SQL · Support'},
{id:'skill-bars',name:'Skills Spotlight',detail:'Prominent visual skills and compact profile',tag:'SKILLS FIRST',color:'#4e7c77',columns:2,photo:false,person:'SANA MIRZA',role:'FRONTEND DEVELOPER',email:'sana.m@email.com',skills:'React · CSS · Accessibility'},
{id:'profile-card',name:'Profile Card',detail:'Profile-led design with a strong identity block',tag:'PROFILE',color:'#b07b7b',columns:2,photo:true,person:'LEO FERNANDEZ',role:'PHOTOGRAPHER',email:'leo.f@email.com',skills:'Portraits · Editing · Lighting'},
{id:'serif-luxe',name:'Serif Luxe',detail:'Elegant serif typography and fine rules',tag:'SERIF',color:'#51443e',columns:1,photo:false,person:'AMARA JOSEPH',role:'COMMUNICATIONS LEAD',email:'amara.j@email.com',skills:'Editorial · Strategy · PR'},
{id:'tech-terminal',name:'Tech Terminal',detail:'Monospace accents for technical roles',tag:'TECHNICAL',color:'#2e5b66',columns:1,photo:false,person:'VIKRAM RAO',role:'BACKEND ENGINEER',email:'vikram.r@email.com',skills:'Node · APIs · Databases'},
{id:'project-led',name:'Project Showcase',detail:'Projects take priority over job history',tag:'PROJECT LED',color:'#7a6a91',columns:2,photo:false,person:'TARA KAPOOR',role:'PRODUCT BUILDER',email:'tara.k@email.com',skills:'Prototyping · Research · Launches'},
{id:'career-change',name:'Career Change',detail:'Transferable strengths lead the page',tag:'CAREER PIVOT',color:'#647c8a',columns:1,photo:false,person:'ADAM SCOTT',role:'ASPIRING PRODUCT MANAGER',email:'adam.s@email.com',skills:'Communication · Planning · Analysis'},
{id:'graduate',name:'Graduate Starter',detail:'Education and coursework near the top',tag:'GRADUATE',color:'#7b8c6a',columns:1,photo:false,person:'RIYA MALHOTRA',role:'COMPUTER SCIENCE STUDENT',email:'riya.m@email.com',skills:'C++ · Java · DSA'},
{id:'internship',name:'Internship Ready',detail:'Compact student profile and project highlights',tag:'INTERNSHIP',color:'#c18b55',columns:1,photo:true,person:'AARAV SHAH',role:'STUDENT DEVELOPER',email:'aarav.s@email.com',skills:'Git · React · Teamwork'},
{id:'consultant',name:'Consultant Brief',detail:'Outcome-focused summary and expertise blocks',tag:'CONSULTING',color:'#3e5968',columns:2,photo:false,person:'NINA THOMAS',role:'BUSINESS CONSULTANT',email:'nina.t@email.com',skills:'Operations · Change · Delivery'},
{id:'healthcare',name:'Healthcare Professional',detail:'Credential-first clinical layout',tag:'HEALTHCARE',color:'#47817b',columns:1,photo:false,person:'DR. KAVYA MENON',role:'CLINICAL ASSOCIATE',email:'kavya.m@email.com',skills:'Patient Care · Records · Safety'},
{id:'legal',name:'Legal Professional',detail:'Formal typography with credential sections',tag:'LEGAL',color:'#343f55',columns:1,photo:false,person:'ISHAN KHANNA',role:'LEGAL ASSOCIATE',email:'ishan.k@email.com',skills:'Research · Drafting · Compliance'},
{id:'sales',name:'Sales Achiever',detail:'Achievement-led summary and metrics',tag:'SALES',color:'#9c6547',columns:2,photo:true,person:'ELLA ROBERTS',role:'ACCOUNT EXECUTIVE',email:'ella.r@email.com',skills:'Growth · CRM · Negotiation'},
{id:'product-manager',name:'Product Manager',detail:'Strategy, launches and impact-led sections',tag:'PRODUCT',color:'#5c6f8c',columns:2,photo:false,person:'ROHAN GUPTA',role:'PRODUCT MANAGER',email:'rohan.g@email.com',skills:'Roadmaps · Metrics · Discovery'},
{id:'architect',name:'Architect Portfolio',detail:'Project thumbnails and design-led hierarchy',tag:'PORTFOLIO',color:'#947b63',columns:2,photo:true,person:'MIRA SETHI',role:'ARCHITECT',email:'mira.s@email.com',skills:'CAD · Modeling · Concepts'},
{id:'nonprofit',name:'Nonprofit & Impact',detail:'Mission, community and impact focused',tag:'IMPACT',color:'#67806d',columns:1,photo:false,person:'JAY WILLIAMS',role:'COMMUNITY PROGRAM LEAD',email:'jay.w@email.com',skills:'Outreach · Programs · Partnerships'},
{id:'international',name:'International CV',detail:'Formal CV with expanded credentials',tag:'CV STYLE',color:'#596578',columns:1,photo:false,person:'AISHA RAHMAN',role:'RESEARCH PROFESSIONAL',email:'aisha.r@email.com',skills:'Research · Languages · Publications'},
{id:'infographic',name:'Infographic Accent',detail:'Graphic section markers and visual rhythm',tag:'VISUAL',color:'#c36d55',columns:2,photo:true,person:'FINN PARKER',role:'DIGITAL MARKETER',email:'finn.p@email.com',skills:'Content · Analytics · SEO'},
{id:'dark-header',name:'Dark Header',detail:'Deep header block with light page body',tag:'CONTRAST',color:'#292f38',columns:1,photo:false,person:'SIMRAN KAUR',role:'FINANCE PROFESSIONAL',email:'simran.k@email.com',skills:'Budgeting · Audit · Analysis'},
{id:'soft-panels',name:'Soft Panel',detail:'Softly separated sections and gentle spacing',tag:'SOFT',color:'#9b817a',columns:2,photo:true,person:'MATEO SILVA',role:'CUSTOMER SUCCESS MANAGER',email:'mateo.s@email.com',skills:'Onboarding · Support · Retention'},
{id:'minimal-rule',name:'Fine Line Minimal',detail:'Thin rules and generous white space',tag:'MINIMAL',color:'#716b65',columns:1,photo:false,person:'CHLOE BROWN',role:'COPYWRITER',email:'chloe.b@email.com',skills:'Copy · Editing · Messaging'},
{id:'modern-stack',name:'Modern Stack',detail:'Stacked header with separated contact row',tag:'MODERN',color:'#466f80',columns:1,photo:false,person:'OMAR FAROOQ',role:'CLOUD ENGINEER',email:'omar.f@email.com',skills:'Cloud · Linux · DevOps'},
{id:'creative-asym',name:'Asymmetric Creative',detail:'Offset title and uneven content blocks',tag:'ASYMMETRIC',color:'#ad715f',columns:2,photo:true,person:'LILA FERN',role:'ART DIRECTOR',email:'lila.f@email.com',skills:'Art Direction · Brand · Concept'},
{id:'achievement',name:'Achievement First',detail:'Impact statements and results stand out',tag:'RESULTS',color:'#6d7e56',columns:1,photo:false,person:'NEEL SHARMA',role:'GROWTH SPECIALIST',email:'neel.s@email.com',skills:'Conversion · Testing · Growth'},
{id:'operations',name:'Operations Lead',detail:'Process, tools and delivery at a glance',tag:'OPERATIONS',color:'#5f6d76',columns:2,photo:false,person:'GRACE KIM',role:'OPERATIONS MANAGER',email:'grace.k@email.com',skills:'Workflow · Logistics · Quality'}
];
const templatePalettes = {
  classic:['#896C6C','#34495e','#26718a','#617b68','#c56d50','#79546f'],
  modern:['#34495e','#896C6C','#26718a','#617b68','#c56d50','#343434'],
  minimal:['#b18a65','#896C6C','#343434','#26718a','#c56d50','#617b68']
};
const defaultPalette = ['#896C6C','#34495e','#26718a','#617b68','#c56d50','#79546f'];

const loadSaved = () => {
  try { return JSON.parse(localStorage.getItem('resumeforge-resumes') || '[]'); } catch { return []; }
};

export default function App() {
  const [page, setPage] = useState(() => {
    const allowedPages = ['home', 'login', 'signup', 'about', 'templates', 'dashboard', 'start', 'experience', 'education', 'editor'];
    try {
      const savedPage = localStorage.getItem('resumeforge-current-page');
      const savedUser = JSON.parse(localStorage.getItem('resumeforge-user') || 'null');
      const protectedPages = ['templates', 'dashboard', 'start', 'experience', 'education', 'editor'];
      if (protectedPages.includes(savedPage) && !savedUser) return 'home';
      return allowedPages.includes(savedPage) ? savedPage : 'home';
    } catch { return 'home'; }
  });
  const [resume, setResume] = useState(starterResume);
  const [template, setTemplate] = useState('classic');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [isStudent, setIsStudent] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [headshotFilter, setHeadshotFilter] = useState('all');
  const [columnFilter, setColumnFilter] = useState('all');
  const [templateColors, setTemplateColors] = useState({});
  const [templateAccent, setTemplateAccent] = useState('#896C6C');
  const [saved, setSaved] = useState(loadSaved);
  const [resumeId, setResumeId] = useState(null);
  const [toast, setToast] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [section, setSection] = useState('personal');
  const [showHelp, setShowHelp] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirmPassword, setAuthConfirmPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('resumeforge-user') || 'null'); } catch { return null; }
  });

  useEffect(() => {
    localStorage.setItem('resumeforge-resumes', JSON.stringify(saved));
  }, [saved]);
  
  useEffect(() => {
    try {
      localStorage.setItem('resumeforge-current-page', page);
    } catch { /* Page persistence is optional when storage is unavailable. */ }
  }, [page]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };
  const openAuth = (mode) => { setAuthError(''); setAuthName(''); setAuthEmail(''); setAuthPassword(''); setAuthConfirmPassword(''); setPage(mode); setMobileMenu(false); };
  const submitAuth = (event) => {
    event.preventDefault();
    const email = authEmail.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setAuthError('Please enter a valid email address.'); return; }
    if (authPassword.length < 6) { setAuthError('Password must be at least 6 characters.'); return; }
    if (page === 'signup' && !authName.trim()) { setAuthError('Please enter your name.'); return; }
    if (page === 'signup' && authPassword !== authConfirmPassword) { setAuthError('Passwords do not match. Please try again.'); return; }
    const user = { name: authName.trim() || email.split('@')[0], email };
    localStorage.setItem('resumeforge-user', JSON.stringify(user));
    setCurrentUser(user); setAuthError(''); setPage('dashboard');
  };
  const signOut = () => {
    localStorage.removeItem('resumeforge-user');
    localStorage.setItem('resumeforge-current-page', 'home');
    setCurrentUser(null);
    setPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const startNew = (chosenTemplate = template, chosenColor = null) => {
    setResume(starterResume);
    setTemplate(chosenTemplate);
    setTemplateAccent(chosenColor || templates.find(item => item.id === chosenTemplate)?.color || '#896C6C');
    setResumeId(null);
    setSection('personal');
    setPage('editor');
  };
  const beginResume = () => {
    setResume(starterResume);
    setTemplate('classic');
    setResumeId(null);
    setSection('personal');
    setPage('start');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const createResumeEntry = () => {
    if (!currentUser) {
      openAuth('signup');
      return;
    }
    beginResume();
  };
  const update = (key, value) => setResume(current => ({ ...current, [key]: value }));
  const saveResume = () => {
    const id = resumeId || (globalThis.crypto?.randomUUID?.() ?? String(Date.now()));
    const item = { ...resume, id, template, templateAccent, updatedAt: new Date().toISOString() };
    setSaved(current => [item, ...current.filter(entry => entry.id !== id)]);
    setResumeId(id);
    notify('Resume saved on this device');
  };
  const openResume = (item) => {
    setResume({ ...starterResume, ...item });
    setTemplate(item.template || 'classic');
    setTemplateAccent(item.templateAccent || templates.find(t => t.id === (item.template || 'classic'))?.color || '#896C6C');
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
          <button className={page === 'about' ? 'nav-link active' : 'nav-link'} onClick={() => { setPage('about'); setMobileMenu(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>About us</button>
        </nav>
        <div className="top-actions">
          {!currentUser || page === 'home' || page === 'about'
            ? <><button className="button button-quiet button-small" onClick={() => openAuth('login')}>Log in</button><button className="button button-outline button-small" onClick={() => openAuth('signup')}>Sign up</button></>
            : <><button className="nav-link user-greeting" onClick={() => setPage('dashboard')}>Hi, {currentUser.name}</button><button className="button button-outline button-small" onClick={signOut}>Log out</button></>}
          <button className="button button-dark button-small" onClick={() => createResumeEntry()}>Create my resume <ArrowRight size={15} /></button>
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
              <button className="button button-dark" onClick={() => createResumeEntry()}>Create My Resume Now <ArrowRight size={17} /></button>
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
          <div className="template-carousel-window"><div className="template-carousel-track">{[...templates, ...templates].map((item, index) => <TemplateCard key={item.id+index} item={item} index={index} accent={templateColors[item.id] || item.color} palette={templatePalettes[item.id] || defaultPalette} onColorChange={(color) => setTemplateColors(current => ({...current,[item.id]:color}))} onChoose={(color) => startNew(item.id, color || templateColors[item.id] || item.color)} />)}</div></div>
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
          <div className="feature-showcase-bottom"><div><span className="eyebrow">READY FOR YOUR NEXT CHAPTER?</span><h3>Build a resume that opens doors.</h3></div><button className="button button-dark" onClick={() => createResumeEntry()}>Build My Resume Now <ArrowRight size={17}/></button></div>
        </section>
        <section className="ai-builder-section" id="ai-resume-builder">
          <div className="ai-builder-copy">
            <div className="eyebrow"><Sparkles size={14}/> YOUR IDEAS, BEAUTIFULLY WRITTEN</div>
            <h2>Our Free AI Resume Builder <span>Works Wherever You Do</span></h2>
            <p>Find the right words and automate your resume writing process with our free AI resume builder. Whether you’re working from your phone or laptop, our AI provides tailored suggestions to help you stand out.</p>
            <button className="button button-dark ai-builder-button" onClick={() => createResumeEntry()}>Try Resume Builder <ArrowRight size={17}/></button>
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
            <button className="button button-dark mobile-resume-cta" onClick={() => createResumeEntry()}>Create Resume from Phone <ArrowRight size={17}/></button>
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
            <button className="button button-dark expert-guidance-cta" onClick={() => createResumeEntry()}>Get Expert Guidance <ArrowRight size={17}/></button>
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
            <button className="button button-dark customize-cta" onClick={() => createResumeEntry()}>Customize My Resume Now <ArrowRight size={17}/></button>
            <div className="customize-mini-points"><span><Check size={14}/> Flexible layouts</span><span><Check size={14}/> Personal style</span><span><Check size={14}/> Live preview</span></div>
          </div>
        </section>
        <section className="import-resume-section" id="import-resume">
          <div className="import-resume-visual">
            <div className="import-resume-halo"></div>
            <div className="import-resume-device">
              <div className="import-device-top"><span></span><span></span><span></span><small>ResumeForge · Import</small></div>
              <div className="import-device-content">
                <div className="import-upload-icon"><FileText size={24}/><span><Check size={12}/></span></div>
                <h3>Your experience,<br/>ready for its next chapter.</h3>
                <p>Bring your existing resume into ResumeForge.</p>
                <div className="import-drop-zone"><div className="import-file-icon"><FileText size={21}/></div><strong>Jordan_Lee_Resume.pdf</strong><small>PDF document · 248 KB</small><div className="import-progress"><i></i></div><small className="import-complete"><Check size={12}/> Ready to customize</small></div>
                <div className="import-file-row"><span><FileText size={15}/></span><div><strong>Cover letter</strong><small>Match your resume's style</small></div><ArrowRight size={15}/></div>
              </div>
              <div className="import-device-footer"><Check size={13}/> Your draft stays yours</div>
            </div>
            <div className="import-floating-badge import-badge-pdf"><span><FileText size={17}/></span><div><strong>PDF ready</strong><small>Resume detected</small></div></div>
            <div className="import-floating-badge import-badge-device"><span><Smartphone size={17}/></span><div><strong>Import anywhere</strong><small>Phone, tablet or desktop</small></div></div>
            <div className="import-orbit-ring"></div>
          </div>
          <div className="import-resume-copy">
            <div className="eyebrow"><FileText size={14}/> PICK UP RIGHT WHERE YOU LEFT OFF</div>
            <h2>Import Your Resume <span>Without Interrupting Your Day</span></h2>
            <p>Already have a draft? Upload it to our platform in seconds from your preferred device — whether that’s a mobile phone, tablet, or work computer — and start customizing right away. Pair it with a matching cover letter template for a consistent, professional look.</p>
            <button className="button button-dark import-resume-cta" onClick={() => openAuth('signup')}>Import <ArrowRight size={17}/></button>
            <div className="import-resume-trust"><span><Check size={14}/> Your existing draft</span><span><Check size={14}/> Personalized design</span><span><Check size={14}/> Matching cover letter</span></div>
          </div>
        </section>
        <section className="dream-job-section" id="start-resume">
          <div className="dream-job-decoration dream-job-decoration-one"></div>
          <div className="dream-job-decoration dream-job-decoration-two"></div>
          <div className="dream-job-content">
            <span className="dream-job-eyebrow"><Sparkles size={14}/> ONE STEP CLOSER</span>
            <h2>Let’s Land Your <span>Dream Job</span> Together</h2>
            <div className="dream-job-divider"><i></i><Sparkles size={16}/><i></i></div>
            <h3>Let's make your next move count.</h3>
            <p>Your next opportunity deserves a resume you feel good about.</p>
            <button className="button dream-job-button" onClick={() => createResumeEntry()}>Start Your Resume Now <ArrowRight size={18}/></button>
            <div className="dream-job-footnote"><Check size={14}/> Your next chapter starts with one small step.</div>
          </div>
          <div className="dream-job-resume dream-job-resume-left"><div className="dream-job-paper"><div className="dream-job-paper-head"></div><i></i><i></i><b>EXPERIENCE</b><i></i><i className="short"></i><b>EDUCATION</b><i></i><i className="short"></i></div></div>
          <div className="dream-job-resume dream-job-resume-right"><div className="dream-job-mini-paper"><div className="dream-job-mini-avatar">JL</div><b>Jordan Lee</b><small>CREATIVE DEVELOPER</small><i></i><i></i><i className="short"></i><div className="dream-job-mini-skills"><span></span><span></span><span></span></div></div></div>
        </section>
      </main>}

      {page === 'about' && <main className="about-page">
        <section className="about-hero">
          <div className="about-hero-copy">
            <div className="eyebrow"><Sparkles size={14}/> A LITTLE ABOUT US</div>
            <h1>Your story deserves<br/><span>a great first page.</span></h1>
            <p>ResumeForge helps you turn your experience, skills, and ambitions into a resume that feels clear, confident, and truly yours.</p>
            <div className="about-hero-actions">
              <button className="button button-dark" onClick={() => createResumeEntry()}>Create my resume <ArrowRight size={16}/></button>
              <button className="button button-outline" onClick={() => currentUser ? setPage('templates') : openAuth('signup')}>Explore templates</button>
            </div>
            <div className="about-trust-points"><span><Check size={15}/> Simple to use</span><span><Check size={15}/> Easy to personalize</span><span><Check size={15}/> Your pace, your story</span></div>
          </div>
          <div className="about-hero-art" aria-label="Decorative resume illustration">
            <div className="about-art-orbit"></div>
            <div className="about-art-card about-art-card-back"><i></i><i className="short"></i><b>EXPERIENCE</b><i></i><i></i><b>EDUCATION</b><i className="short"></i></div>
            <div className="about-art-paper"><div className="about-art-avatar">AM</div><strong>Alex Morgan</strong><small>YOUR NEXT CHAPTER</small><div className="about-art-rule"></div><b>PROFILE</b><i></i><i></i><i className="short"></i><b>EXPERIENCE</b><i></i><i className="short"></i><b>SKILLS</b><div className="about-art-chips"><span>Creative</span><span>Focused</span></div></div>
            <div className="about-floating-note"><span><Check size={14}/></span><div><strong>Made to feel like you</strong><small>One step at a time</small></div></div>
          </div>
        </section>
        <section className="about-purpose">
          <div className="about-section-kicker">WHY WE’RE HERE</div>
          <h2>Job searching is a big step.<br/><span>Your resume shouldn’t make it harder.</span></h2>
          <p>We believe creating a resume should feel less overwhelming and more empowering. ResumeForge brings the essentials together in one calm, approachable space, so you can focus on what matters: showing people what you can do.</p>
        </section>
        <section className="about-values">
          <article className="about-value-card"><span className="about-value-number">01</span><div className="about-value-icon"><FileText size={21}/></div><h3>Clarity over clutter</h3><p>Thoughtful layouts help your skills and experience stand out without unnecessary distractions.</p></article>
          <article className="about-value-card"><span className="about-value-number">02</span><div className="about-value-icon"><Palette size={21}/></div><h3>Your story, your style</h3><p>Choose a template and personalize your resume so it reflects the professional you are becoming.</p></article>
          <article className="about-value-card"><span className="about-value-number">03</span><div className="about-value-icon"><WandSparkles size={21}/></div><h3>Progress made simpler</h3><p>Build section by section, preview as you go, and keep refining until it feels right.</p></article>
        </section>
        <section className="about-steps">
          <div><div className="eyebrow">A SIMPLE WAY FORWARD</div><h2>From blank page<br/><span>to ready for what’s next.</span></h2><p>No need to have every word figured out. Start with the basics and build from there.</p></div>
          <div className="about-step-list"><div><span>01</span><section><strong>Choose a template</strong><small>Start with a layout that suits your goals.</small></section></div><div><span>02</span><section><strong>Add your details</strong><small>Bring together your education, experience, skills, and projects.</small></section></div><div><span>03</span><section><strong>Review and refine</strong><small>See your resume update as you make changes, then save or print it.</small></section></div></div>
        </section>
        <section className="about-cta"><div><div className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</div><h2>Let’s make your experience shine.</h2><p>Start building a resume that feels clear, considered, and yours.</p></div><button className="button button-dark" onClick={() => createResumeEntry()}>Build my resume <ArrowRight size={16}/></button></section>
      </main>}
      {(page === 'login' || page === 'signup') && <main className="auth-page">
        <section className="auth-card">
          <div className="auth-brand-mark"><FileText size={22} /></div>
          <div className="eyebrow">{page === 'signup' ? 'YOUR NEXT CHAPTER STARTS HERE' : 'WELCOME BACK'}</div>
          <h1>{page === 'signup' ? 'Create your account.' : 'Good to see you again.'}</h1>
          <p className="auth-subtitle">{page === 'signup' ? 'Save your resume drafts and keep building towards your next opportunity.' : 'Log in to continue working on your resume.'}</p>
          <form className="auth-form" onSubmit={submitAuth}>
            {page === 'signup' && <label className="field-label">Full name<input autoComplete="name" value={authName} onChange={e => setAuthName(e.target.value)} placeholder="e.g. Alex Morgan" /></label>}
            <label className="field-label">Email address<input type="email" autoComplete="email" value={authEmail} onChange={e => setAuthEmail(e.target.value.trim())} placeholder="you@example.com" /></label>
            <label className="field-label">Password<input type="password" autoComplete={page === 'signup' ? 'new-password' : 'current-password'} value={authPassword} onChange={e => setAuthPassword(e.target.value)} placeholder="At least 6 characters" required minLength={6} /></label>
            {page === 'signup' && <label className="field-label">Confirm password<input type="password" autoComplete="new-password" value={authConfirmPassword} onChange={e => setAuthConfirmPassword(e.target.value)} placeholder="Re-enter your password" required minLength={6} /></label>}
            {authError && <p className="auth-error" role="alert">{authError}</p>}
            <button className="button button-dark auth-submit" type="submit">{page === 'signup' ? 'Create account' : 'Log in'} <ArrowRight size={16}/></button>
          </form>
          <p className="auth-switch">{page === 'signup' ? 'Already have an account?' : "Don't have an account?"} <button onClick={() => openAuth(page === 'signup' ? 'login' : 'signup')}>{page === 'signup' ? 'Log in' : 'Sign up'}</button></p>
          <p className="auth-note">Demo mode: your profile is saved only in this browser. Secure account authentication will be connected with the backend later.</p>
          <button className="auth-back" onClick={() => setPage('home')}><ArrowLeft size={15}/> Back to home</button>
        </section>
        <div className={page === 'signup' ? 'auth-side-note auth-side-signup' : 'auth-side-note auth-side-login'}>
          {page === 'signup' ? <>
            <span className="eyebrow">YOUR STORY, BEAUTIFULLY TOLD</span>
            <h2>Every great career starts with a first draft.</h2>
            <p>Create a resume that brings your skills, story, and ambition together.</p>
            <div className="signup-visual-board">
              <div className="signup-orbit signup-orbit-one"></div><div className="signup-orbit signup-orbit-two"></div>
              <div className="signup-note signup-note-top"><span>01</span><b>Your experience</b><i></i><i className="short"></i></div>
              <div className="signup-resume-sheet"><div className="signup-resume-head"><div className="signup-avatar">S</div><div><b>YOUR NAME</b><small>Creative professional</small></div></div><div className="signup-sheet-label"></div><i></i><i className="short"></i><div className="signup-sheet-label second"></div><i></i><i></i><i className="short"></i></div>
              <div className="signup-note signup-note-bottom"><span>02</span><b>Your next chapter</b><small>Starts here ✦</small></div>
            </div>
          </> : <>
            <span className="eyebrow">GOOD TO HAVE YOU BACK</span>
            <h2>Your next opportunity is still in reach.</h2>
            <p>Pick up where you left off and keep shaping your next move.</p>
            <div className="login-visual-board">
              <div className="login-dashboard-top"><span><i></i> RESUME WORKSPACE</span><b>•••</b></div>
              <div className="login-progress-card"><div className="login-progress-copy"><small>YOUR RESUME</small><b>Looking sharp.</b><span>Keep your momentum going.</span></div><div className="login-progress-ring"><b>85<small>%</small></b></div></div>
              <div className="login-task-card"><span className="login-task-check">✓</span><div><b>Experience added</b><small>Your story is taking shape</small></div><span className="login-task-status">DONE</span></div>
              <div className="login-task-card"><span className="login-task-check">✓</span><div><b>Skills & strengths</b><small>Ready for your next edit</small></div><span className="login-task-status">DONE</span></div>
              <div className="login-dashboard-footer"><span>✦</span> One step closer to your next chapter</div>
            </div>
          </>}
        </div>
      </main>}

      {page === 'start' && <main className="page-content start-resume-page">
        <section className="start-resume-heading">
          <div className="eyebrow"><Sparkles size={14}/> YOUR RESUME, YOUR NEXT CHAPTER</div>
          <h1>Easy as <span>1-2-3</span></h1>
          <p>A simple path from your experience to a resume you’re ready to share.</p>
        </section>
        <section className="start-steps" aria-label="How ResumeForge works">
          <article className="start-step"><span className="start-step-number">1</span><div className="start-step-icon"><LayoutTemplate size={23}/></div><h2>Select a template</h2><p>from our library of professional designs</p></article>
          <article className="start-step"><span className="start-step-number">2</span><div className="start-step-icon"><FileText size={23}/></div><h2>Build your resume</h2><p>with our industry-specific bullet points</p></article>
          <article className="start-step"><span className="start-step-number">3</span><div className="start-step-icon"><Download size={23}/></div><h2>Download</h2><p>in your desired format. You’re ready to apply!</p></article>
        </section>
        <section className="start-resume-actions"><button className="button button-dark" onClick={() => { setPage('experience'); window.scrollTo({top:0,behavior:'smooth'}); }}>Next <ArrowRight size={16}/></button></section>
      </main>}

      {page === 'experience' && <main className="page-content experience-page">
        <section className="experience-heading">
          <div className="eyebrow"><Sparkles size={14}/> LET'S FIND YOUR STARTING POINT</div>
          <h1>How long have you <span>been working?</span></h1>
          <p>We'll find the best templates for your experience level.</p>
        </section>
        <section className="experience-options" aria-label="Select your experience level">
          {[
            {value:'none',title:'No Experience',detail:'Starting out or still studying',icon:'✳'},
            {value:'under3',title:'Less than 3 years',detail:'Beginning your professional journey',icon:'↗'},
            {value:'3to5',title:'3-5 Years',detail:'Building your experience',icon:'▤'},
            {value:'5to10',title:'5-10 Years',detail:'Growing your career',icon:'✦'},
            {value:'10plus',title:'10+ Years',detail:'Bringing extensive experience',icon:'★'}
          ].map(option => <button type="button" key={option.value} className={experienceLevel === option.value ? 'experience-option selected' : 'experience-option'} onClick={() => { setExperienceLevel(option.value); setIsStudent(''); }} aria-pressed={experienceLevel === option.value}>
            <span className="experience-option-icon">{option.icon}</span><span className="experience-option-copy"><strong>{option.title}</strong><small>{option.detail}</small></span><span className="experience-option-radio">{experienceLevel === option.value ? '✓' : ''}</span>
          </button>)}
        </section>
        {experienceLevel && <section className="student-question" aria-label="Student status">
          <h2>Are you a student?</h2>
          <p>This helps us suggest resume layouts that fit your current stage.</p>
          <div className="student-options">
            <button type="button" className={isStudent === 'yes' ? 'student-option selected' : 'student-option'} aria-pressed={isStudent === 'yes'} onClick={() => { setIsStudent('yes'); setPage('education'); window.scrollTo({top:0,behavior:'smooth'}); }}><span className="student-option-radio">{isStudent === 'yes' ? '✓' : ''}</span>Yes</button>
            <button type="button" className={isStudent === 'no' ? 'student-option selected' : 'student-option'} aria-pressed={isStudent === 'no'} onClick={() => { setIsStudent('no'); setPage('templates'); window.scrollTo({top:0,behavior:'smooth'}); }}><span className="student-option-radio">{isStudent === 'no' ? '✓' : ''}</span>No</button>
          </div>
        </section>}
        <section className="experience-actions"><button className="button button-outline" onClick={() => { setPage('start'); window.scrollTo({top:0,behavior:'smooth'}); }}><ArrowLeft size={16}/> Back</button><button className="button button-dark" disabled={!experienceLevel || !isStudent} onClick={() => { setPage('templates'); window.scrollTo({top:0,behavior:'smooth'}); }}>Next <ArrowRight size={16}/></button></section>
      </main>}

      {page === 'education' && <main className="page-content education-page">
        <section className="experience-heading">
          <div className="eyebrow"><Sparkles size={14}/> YOUR EDUCATION JOURNEY</div>
          <h1>What education level are you <span>currently pursuing?</span></h1>
          <p>Select the highest level you are working toward so we can organize your resume correctly.</p>
        </section>
        <section className="education-options" aria-label="Select your education level">
          {[
            {value:'secondary',title:'Secondary School',detail:'High school or secondary education',icon:'▤'},
            {value:'vocational',title:'Vocational Certificate or Diploma',detail:'Career-focused training or certification',icon:'✳'},
            {value:'apprenticeship',title:'Apprenticeship or Internship Training',detail:'Practical, hands-on training',icon:'↗'},
            {value:'associates',title:'Associates',detail:'Associate degree or equivalent',icon:'▧'},
            {value:'bachelors',title:'Bachelors',detail:'Bachelor’s degree',icon:'⌂'},
            {value:'masters',title:'Masters',detail:'Master’s degree',icon:'✦'},
            {value:'doctorate',title:'Doctorate or Ph.D.',detail:'Doctoral-level study',icon:'★'}
          ].map(option => <button type="button" key={option.value} className={educationLevel === option.value ? 'education-option selected' : 'education-option'} onClick={() => setEducationLevel(option.value)} aria-pressed={educationLevel === option.value}>
            <span className="education-option-icon">{option.icon}</span><span className="education-option-copy"><strong>{option.title}</strong><small>{option.detail}</small></span><span className="experience-option-radio">{educationLevel === option.value ? '✓' : ''}</span>
          </button>)}
        </section>
        <section className="experience-actions"><button className="button button-outline" onClick={() => { setPage('experience'); setIsStudent(''); window.scrollTo({top:0,behavior:'smooth'}); }}><ArrowLeft size={16}/> Back</button><button className="button button-dark" disabled={!educationLevel} onClick={() => { setPage('templates'); window.scrollTo({top:0,behavior:'smooth'}); }}>Next <ArrowRight size={16}/></button></section>
      </main>}

      {page === 'templates' && <main className="page-content templates-browser"><div className="page-heading"><div className="eyebrow">CHOOSE YOUR STARTING POINT</div><h1>Find your <span>resume style.</span></h1><p>Explore 20 distinctive layouts, then make your favorite your own.</p></div><div className="templates-browser-layout"><aside className="template-filters"><div className="filters-title"><h2>Filters</h2><button type="button" onClick={() => { setHeadshotFilter('all'); setColumnFilter('all'); }}>Clear filters</button></div><div className="filter-group"><h3>Headshot</h3>{[{value:'with',label:'With photo'},{value:'without',label:'Without photo'}].map(option => <label key={option.value} className="filter-choice"><input type="radio" name="headshot" checked={headshotFilter===option.value} onChange={() => setHeadshotFilter(option.value)}/>{option.label}</label>)}</div><div className="filter-group"><h3>Columns</h3>{[{value:'1',label:'1 column'},{value:'2',label:'2 columns'}].map(option => <label key={option.value} className="filter-choice"><input type="radio" name="columns" checked={columnFilter===option.value} onChange={() => setColumnFilter(option.value)}/>{option.label}</label>)}</div></aside><section className="templates-results"><div className="templates-results-count">{templates.filter(item => (headshotFilter==='all' || (headshotFilter==='with' ? item.photo : !item.photo)) && (columnFilter==='all' || String(item.columns)===columnFilter)).length} resume templates</div><div className="template-grid template-grid-large">{templates.filter(item => (headshotFilter==='all' || (headshotFilter==='with' ? item.photo : !item.photo)) && (columnFilter==='all' || String(item.columns)===columnFilter)).map((item, index) => <TemplateCard key={item.id} item={item} index={index} onChoose={(color) => startNew(item.id, color || templateColors[item.id] || item.color)} />)}</div></section></div></main>}

      {page === 'dashboard' && <main className="page-content dashboard-page dashboard-redesign">
        <section className="welcome-hero">
          <div className="welcome-copy">
            <div className="eyebrow"><span className="eyebrow-dot"></span> YOUR NEXT CHAPTER STARTS HERE</div>
            <h1>Welcome back,<br/><span>{currentUser?.name || 'there'}.</span></h1>
            <p>Your experience has a story worth telling. Let’s turn it into a resume that feels like you — polished, professional, and ready for what’s next.</p>
            <div className="welcome-actions">
              <button className="button button-dark welcome-create" onClick={() => beginResume()}>Create My Resume <ArrowRight size={17}/></button>
              <button className="button button-outline" onClick={() => setPage('templates')}>Explore templates <LayoutTemplate size={16}/></button>
            </div>
            <div className="welcome-points"><span><Check size={14}/> Easy to customize</span><span><Check size={14}/> Print-ready layout</span></div>
          </div>
          <div className="welcome-art" aria-label="Resume preview illustration">
            <div className="welcome-orbit"></div>
            <div className="welcome-paper">
              <div className="welcome-paper-head"><div className="welcome-avatar">{(currentUser?.name || 'Alex Morgan').trim().split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase()}</div><div><b>{currentUser?.name || 'Alex Morgan'}</b><small>YOUR RESUME PREVIEW</small></div></div>
              <div className="welcome-paper-contact">{currentUser?.email || 'you@example.com'} · Your profile</div>
              <div className="welcome-paper-label">PROFILE</div><i></i><i className="short"></i>
              <div className="welcome-paper-label">EXPERIENCE</div><b className="welcome-paper-role">Frontend Developer</b><i></i><i></i><i className="short"></i>
              <div className="welcome-paper-label">EDUCATION</div><i></i><i className="short"></i>
              <div className="welcome-paper-label">SKILLS</div><div className="welcome-paper-skills"><span>React</span><span>JavaScript</span><span>CSS</span></div>
            </div>
            <div className="welcome-float welcome-float-top"><Sparkles size={15}/><span><b>Make it yours</b><small>Your story, your style</small></span></div>
            <div className="welcome-float welcome-float-bottom"><span className="welcome-float-check"><Check size={13}/></span><span><b>Looking professional</b><small>One step closer</small></span></div>
          </div>
        </section>
        <section className="dashboard-shortcuts">
          <button className="shortcut-card" onClick={() => beginResume()}><span className="shortcut-icon"><Plus size={20}/></span><span><b>Start from scratch</b><small>Build a resume step by step</small></span><ArrowRight size={17}/></button>
          <button className="shortcut-card" onClick={() => setPage('templates')}><span className="shortcut-icon shortcut-icon-cream"><LayoutTemplate size={20}/></span><span><b>Choose a template</b><small>Find a style that fits your goals</small></span><ArrowRight size={17}/></button>
          <div className="shortcut-card shortcut-static"><span className="shortcut-icon shortcut-icon-sage"><FileText size={20}/></span><span><b>{saved.length} saved {saved.length === 1 ? 'resume' : 'resumes'}</b><small>Your drafts stay on this device</small></span></div>
        </section>
        <section className="dashboard-saved-section">
          <div className="dashboard-heading"><div><div className="eyebrow">YOUR WORKSPACE</div><h2>My resumes<span>.</span></h2><p>Pick up where you left off, or start something new.</p></div>{saved.length > 0 && <button className="button button-outline" onClick={() => beginResume()}><Plus size={16}/> New resume</button>}</div>
          {saved.length === 0 ? <div className="empty-state"><div className="empty-icon"><FileText size={27} /></div><h2>Your first draft starts here.</h2><p>Create a resume and it will appear here, ready whenever you are.</p><button className="button button-dark" onClick={() => startNew()}>Create My Resume <ArrowRight size={16} /></button></div> : <div className="saved-grid">{saved.map(item => <div className="saved-card" key={item.id}><div className="saved-preview"><ResumePreview resume={item} template={item.template} /></div><div className="saved-info"><div><h3>{item.name || 'Untitled resume'}</h3><p>{item.role || 'Resume draft'}</p></div><button className="icon-button danger" onClick={() => deleteResume(item.id)} aria-label="Delete resume"><Trash2 size={16} /></button></div><button className="button button-outline full-width" onClick={() => openResume(item)}>Continue editing <ArrowRight size={15} /></button></div>)}</div>}
        </section>
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
          <section className="preview-panel"><div className="preview-heading no-print"><div><span className="live-dot"></span> LIVE PREVIEW</div><button className="preview-download" onClick={downloadResume}><Download size={15}/> Download <ChevronDown size={14}/></button></div><div className="resume-preview-wrap"><ResumePreview resume={resume} template={template} accent={templateAccent} /></div><p className="preview-tip no-print"><CircleHelp size={14}/> Tip: Keep your resume clear, concise, and relevant.</p></section>
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

function TemplateCard({ item, index, onChoose, accent, palette, onColorChange }) {
  return <article className="template-card"><button className="template-art resume-card-art" onClick={() => onChoose(accent)} aria-label={'Choose '+item.name+' template'} style={{'--resume-accent':accent}}>
    <div className={'mini-resume mini-'+item.id+' '+(item.columns===2?'mini-two-column':'mini-one-column')}>
      <div className="mini-resume-head">{item.photo && <div className="mini-headshot" aria-label="Photo placeholder"><UserRound size={16}/></div>}<div className="mini-person">{item.person || 'ALEX MORGAN'}</div><div className="mini-role">{item.role || 'SOFTWARE DEVELOPER'}</div><div className="mini-contact">{item.email || 'alex.morgan@email.com'} · LinkedIn</div></div>
      <div className="mini-resume-body"><div className="mini-section">PROFILE</div><p className="mini-copy">Motivated professional with hands-on experience, a thoughtful approach to problem solving, and a passion for continuous learning.</p>
      <div className="mini-section">EXPERIENCE</div><strong className="mini-job">Senior {item.role.split(' ').slice(-1)[0]}</strong><small className="mini-date">2023 — Present</small><div className="mini-line"></div><div className="mini-line medium"></div><div className="mini-line"></div>
      <div className="mini-section">EDUCATION</div><strong className="mini-job">Bachelor's Degree</strong><small className="mini-date">University · 2020–2024</small>
      <div className="mini-section">SKILLS</div><p className="mini-copy">{item.skills}</p></div>
    </div><span className="template-badge">{item.tag}</span><span className="template-hover">Use this template <ArrowRight size={14}/></span></button>
    <div className="template-meta"><div><h3>{item.name}</h3><p>{item.detail}</p></div><button className="round-arrow" onClick={() => onChoose(accent)} aria-label={'Use '+item.name}><ArrowRight size={17}/></button></div><div className="template-color-options" aria-label={'Colors for '+item.name}>{palette.map(color => <button key={color} type="button" className={'template-color-swatch'+(accent.toLowerCase()===color.toLowerCase()?' selected':'')} style={{backgroundColor:color}} aria-label={'Use color '+color} title={color} onClick={() => onColorChange(color)} /></div></article>;
}
function ResumePreview({ resume, template, accent }) {
  const skills = (resume.skills || '').split(',').map(s => s.trim()).filter(Boolean);
  return <article className={'resume-paper-live resume-'+(template || 'classic')} style={{'--resume-accent':accent || '#896C6C'}}>
    <div className="resume-live-header"><h1>{resume.name || 'Your Name'}</h1><p className="resume-live-role">{resume.role || 'Professional Title'}</p><div className="resume-live-contact">{[resume.email,resume.phone,resume.location].filter(Boolean).join('  ·  ')}</div></div>
    {resume.summary && <ResumeSection title="Profile"><p>{resume.summary}</p></ResumeSection>}
    {!!resume.experience?.filter(x=>x.title||x.company).length && <ResumeSection title="Experience">{resume.experience.filter(x=>x.title||x.company).map(x=><div className="resume-entry" key={x.id}><div className="resume-entry-head"><strong>{x.title}</strong><span>{x.dates}</span></div><div className="resume-entry-sub">{x.company}</div>{x.description && <p>{x.description}</p>}</div>)}</ResumeSection>}
    {!!resume.education?.filter(x=>x.degree||x.school).length && <ResumeSection title="Education">{resume.education.filter(x=>x.degree||x.school).map(x=><div className="resume-entry" key={x.id}><div className="resume-entry-head"><strong>{x.degree}</strong><span>{x.dates}</span></div><div className="resume-entry-sub">{x.school}</div>{x.description && <p>{x.description}</p>}</div>)}</ResumeSection>}
    {!!skills.length && <ResumeSection title="Skills"><div className="resume-skill-list">{skills.map(s=><span key={s}>{s}</span>)}</div></ResumeSection>}
    {!!resume.projects?.filter(x=>x.title).length && <ResumeSection title="Projects">{resume.projects.filter(x=>x.title).map(x=><div className="resume-entry" key={x.id}><strong>{x.title}</strong>{x.description && <p>{x.description}</p>}</div>)}</ResumeSection>}
  </article>;
}
function ResumeSection({ title, children }) { return <section className="resume-live-section"><h2>{title}</h2>{children}</section>; }