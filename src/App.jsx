import { useEffect, useRef, useState } from 'react'
import { footerColumns, learningPhases, navItems, resourceLinks, stats, testimonials } from './data/content'
import { subscribeToNewsletter } from './services/newsletter'
import { Carousel } from './components/Carousel'
import { InternshipExplorer } from './components/InternshipExplorer'
import { validateEmail } from './lib/validation'

function Logo({ compact = false }) {
  return <a className="logo" href="/" aria-label="Internee.pk home"><span className="logo-mark" aria-hidden="true"><i /><i /><i /></span><span className="logo-text">Internee<span>.pk</span></span>{!compact && <span className="logo-caption">CAREER STARTS HERE</span>}</a>
}

function Arrow() { return <span aria-hidden="true">↗</span> }

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const resourceRef = useRef(null)

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && (setResourcesOpen(false), setMobileOpen(false))
    const onClick = (event) => resourceRef.current && !resourceRef.current.contains(event.target) && setResourcesOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick) }
  }, [])

  const closeMobile = () => { setMobileOpen(false); setResourcesOpen(false) }
  return <header className="site-header">
    <div className="container header-inner">
      <Logo />
      <nav className={`desktop-nav ${mobileOpen ? 'mobile-nav-open' : ''}`} aria-label="Primary navigation">
        {navItems.map((item) => <a key={item.label} href={item.href} onClick={closeMobile}>{item.label}</a>)}
        <div className="resource-menu" ref={resourceRef}>
          <button className="nav-trigger" type="button" aria-expanded={resourcesOpen} aria-haspopup="true" onClick={() => setResourcesOpen((value) => !value)}>Resources <span className="chevron" aria-hidden="true">⌄</span></button>
          {resourcesOpen && <div className="dropdown" role="menu">{resourceLinks.map((item) => <a key={item.label} role="menuitem" href={item.href} onClick={closeMobile}>{item.label}</a>)}</div>}
        </div>
        <span className="nav-divider" aria-hidden="true" />
        <a className="nav-login" href="/login" onClick={closeMobile}>Sign in</a>
        <a className="button button-small" href="/dashboard" onClick={closeMobile}>Get started <Arrow /></a>
      </nav>
      <button className="menu-toggle" type="button" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}><span /><span /><span /></button>
    </div>
  </header>
}

function HeroVisual() {
  return <div className="hero-visual" aria-label="A preview of the Internee learning dashboard">
    <div className="visual-glow" />
    <div className="visual-window">
      <div className="window-top"><span className="window-dots"><i /><i /><i /></span><span className="window-path">internee.pk / dashboard</span><span className="window-menu">•••</span></div>
      <div className="window-body">
        <div className="window-sidebar"><span className="side-active" /><span /><span /><span /><span /></div>
        <div className="window-content"><div className="window-kicker">YOUR LEARNING PATH <b>● ON TRACK</b></div><h3>Build proof.<br /><em>Not just promises.</em></h3><div className="window-progress"><div><span>Web development internship</span><b>72%</b></div><div className="progress-track"><i style={{ width: '72%' }} /></div></div><div className="window-cards"><span>04 <small>projects</small></span><span>01 <small>certificate</small></span><span>06 <small>skills verified</small></span></div><a href="#internships" className="window-link">Continue learning <Arrow /></a></div>
      </div>
    </div>
    <div className="floating-badge badge-top"><span>✦</span><div><b>Certificate ready</b><small>View your achievement</small></div></div>
    <div className="floating-badge badge-bottom"><span className="mini-avatar">AK</span><div><b>+1 project shipped</b><small>Keep the momentum</small></div></div>
  </div>
}

function SectionHeading({ eyebrow, title, text, align = 'left' }) { return <div className={`section-heading align-${align}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div> }

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const submit = async (event) => {
    event.preventDefault()
    const validationMessage = validateEmail(email)
    if (validationMessage) { setStatus('error'); setMessage(validationMessage); return }
    setStatus('loading'); setMessage('')
    try { await subscribeToNewsletter(email); setStatus('success'); setMessage('You’re on the list. Watch your inbox for useful career notes.') } catch { setStatus('error'); setMessage('Something went wrong. Please try again.') }
  }
  return <form className="newsletter-form" onSubmit={submit} noValidate><label htmlFor="newsletter-email">Get practical career notes in your inbox</label><div className="newsletter-row"><input id="newsletter-email" type="email" autoComplete="email" placeholder="Enter your email" value={email} onChange={(event) => { setEmail(event.target.value); if (status !== 'idle') setStatus('idle') }} aria-invalid={status === 'error'} aria-describedby="newsletter-message" /><button className="button" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Joining…' : 'Join the list'} <Arrow /></button></div><p id="newsletter-message" className={`form-message ${status}`} aria-live="polite">{message || 'No spam. Just opportunities, new resources, and honest advice.'}</p></form>
}

function TestimonialSlide({ item }) {
  return <div className="testimonial-card"><div className="quote-mark">“</div><blockquote>{item.quote}</blockquote><div className="testimonial-person"><div className="person-avatar">{item.initials}</div><div><strong>{item.name}</strong><span>{item.location} <b>★★★★★</b></span></div></div><a className="text-link" href="/userprofile">Read more learner stories <Arrow /></a></div>
}

function App() {
  return <div className="app-shell"><Header /><main>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><div className="announcement"><span className="announcement-dot" /> New internships are open <a href="#internships">Explore roles <Arrow /></a></div><h1>Build skills.<br /><span>Build your future.</span></h1><p className="hero-lede">Practical internships for ambitious people ready to stop waiting and start building work they’re proud to show.</p><div className="hero-actions"><a className="button" href="/jobs">Find your internship <Arrow /></a><a className="text-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a></div><div className="hero-proof"><div className="avatar-stack"><span>AK</span><span>MH</span><span>SR</span><span>+</span></div><div><strong>15,000+ learners</strong><small>started their career journey</small></div></div></div><HeroVisual /></div></section>

    <section className="trust-strip" aria-label="Trusted by learners and teams"><div className="container trust-inner"><span className="trust-label">Built for momentum</span><div className="trust-logos"><span>◉ <b>Code<span>Labs</span></b></span><span>◒ <b>tech<span>verse</span></b></span><span>◈ <b>dev<span>circle</span></b></span><span>✦ <b>future<span>works</span></b></span><span>⌁ <b>Design<span>Hub</span></b></span></div></div></section>

    <section className="section internships-section" id="internships"><div className="container"><div className="section-heading-row"><SectionHeading eyebrow="Find your path" title="Learn by doing real work." text="Choose a track that matches where you want to go. Every internship is built around practice, feedback, and proof." /><a className="text-link desktop-only" href="/jobs">View all opportunities <Arrow /></a></div><InternshipExplorer /><a className="button button-light mobile-only" href="/jobs">View all opportunities <Arrow /></a></div></section>

    <section className="section proof-section" id="why-internee"><div className="container proof-grid"><div className="proof-copy"><span className="eyebrow">Why Internee.pk</span><h2>Career confidence is built one project at a time.</h2><p>Move from “I’m interested” to “I’ve done this.” We give you the structure, support, and signal to make your next opportunity easier to reach.</p><a className="button button-light" href="/about">Why learners choose us <Arrow /></a></div><div className="stats-grid">{stats.map((stat) => <div className="stat-card" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}<div className="stat-note"><span className="note-icon">↗</span><p><b>Progress you can point to.</b><br />Every task becomes part of your story.</p></div></div></div></section>

    <section className="section portal-section"><div className="container portal-grid"><div className="portal-art"><div className="portal-ring ring-one" /><div className="portal-ring ring-two" /><div className="portal-core"><span>✦</span><b>Task<br />Portal</b></div><span className="portal-chip chip-one">01 &nbsp;Brief</span><span className="portal-chip chip-two">02 &nbsp;Build</span><span className="portal-chip chip-three">03 &nbsp;Submit</span></div><div className="portal-copy"><span className="eyebrow">More than a course</span><h2>Turn learning into something you can show.</h2><p>Get clear tasks, thoughtful feedback, and a finish line. The Task Portal keeps your learning focused on the work that creates momentum.</p><ul className="check-list"><li><span>✓</span> Real-world briefs, not busywork</li><li><span>✓</span> A clear path from first task to final project</li><li><span>✓</span> Certificates that reflect what you actually built</li></ul><a className="button" href="/dashboard">Explore the Task Portal <Arrow /></a></div></div></section>

    <section className="section journey-section"><div className="container"><SectionHeading eyebrow="Your learning journey" title="A simple rhythm that keeps you moving." align="center" /><div className="journey-grid">{learningPhases.map((phase) => <article className="journey-card" key={phase.number}><span className="phase-number">{phase.number}</span><div className="phase-line" /><h3>{phase.title}</h3><p>{phase.text}</p></article>)}</div></div></section>

    <section className="section pathways-section"><div className="container pathway-grid"><article className="pathway-card pathway-dark"><div><span className="eyebrow">For instructors</span><h2>Teach what you know.<br /><em>Shape who’s next.</em></h2><p>Share your expertise with motivated learners and make your knowledge part of someone’s breakthrough.</p><a className="button button-light" href="/dashboard">Start teaching <Arrow /></a></div><div className="pathway-orbit">✦</div></article><article className="pathway-card pathway-green"><span className="eyebrow">Career tools</span><h2>Make your next move with more clarity.</h2><div className="tool-list"><span>AI resume building <Arrow /></span><span>Cover letter creation <Arrow /></span><span>Interview preparation <Arrow /></span><span>Industry insights <Arrow /></span></div><a className="text-link dark-link" href="/dashboard">Explore career tools <Arrow /></a></article></div></section>

    <section className="section process-section" id="how-it-works"><div className="container"><div className="section-heading-row"><SectionHeading eyebrow="How it works" title="Start small. Go further." text="Your first step into the industry doesn’t need to be complicated." /></div><div className="process-grid"><article><span>01</span><h3>Sign up & choose a domain</h3><p>Pick a direction that feels exciting and useful for your future.</p></article><article><span>02</span><h3>Complete your application</h3><p>Learn the fundamentals, build your projects, and get feedback as you go.</p></article><article><span>03</span><h3>Earn your certificate</h3><p>Finish with work you can share and a signal that says you’re ready.</p></article></div></div></section>

    <section className="section testimonial-section"><div className="container"><Carousel items={testimonials} renderItem={(item) => <TestimonialSlide item={item} />} label="Learner testimonials" /></div></section>

    <section className="newsletter-section"><div className="container newsletter-inner"><div><span className="eyebrow">Stay in the loop</span><h2>Useful things for your next step.</h2><p>New internships, career resources, and practical advice — only what’s worth your time.</p></div><Newsletter /></div></section>
  </main><footer className="site-footer"><div className="container footer-top"><div className="footer-brand"><Logo compact /><p>Practical beginnings.<br />Real career momentum.</p><div className="social-links"><a href="https://www.linkedin.com/company/internee-pk/" aria-label="LinkedIn">in</a><a href="https://www.instagram.com/internee.pk/" aria-label="Instagram">◎</a><a href="https://twitter.com/interneepk" aria-label="Twitter">𝕏</a></div></div>{footerColumns.map((column) => <div className="footer-column" key={column.title}><h3>{column.title}</h3>{column.links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}</div>)}<div className="footer-cta"><span>Ready to get moving?</span><a className="button button-small" href="/jobs">Find an internship <Arrow /></a></div></div><div className="container footer-bottom"><span>© 2024 Internee.pk. Built for the next step.</span><span>Made with intention in Pakistan.</span></div></footer></div>
}

export default App
