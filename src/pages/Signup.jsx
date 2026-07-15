import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import GradientWave from '../components/GradientWave'
import { saveSignup } from '../utils/leads'
import { track } from '../utils/posthog'

export default function Signup() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', company:'', role:'', password:'' })
  const [terms, setTerms] = useState(false)
  function set(k) { return e => setForm(f=>({...f,[k]:e.target.value})) }
  function handleSubmit(e) {
    e.preventDefault()
    saveSignup({ firstName: form.firstName, lastName: form.lastName, email: form.email, company: form.company, role: form.role })
    track('signup_completed', { company: form.company, role: form.role })
    setSubmitted(true)
  }

  return (
    <>
    <SEO title="Get Early Access" canonical="/signup" noindex={true} />
    <div className="auth-split">

      {/* LEFT: brand panel */}
      <div className="auth-right">
        <div className="auth-right-content">
          <span className="hh-eyebrow" style={{marginBottom:20}}>Early access</span>
          <h2 className="auth-right-headline">Go live in<br />any language<br />in minutes.</h2>
          <p className="auth-right-sub">No interpreters. No expensive hardware. Connect your stream and reach a global audience instantly.</p>
          <ul className="auth-feat-list">
            <li className="auth-feat"><span className="auth-feat-dot" />Free Starter plan — no credit card</li>
            <li className="auth-feat"><span className="auth-feat-dot" />Works with any OBS / RTMP stream</li>
            <li className="auth-feat"><span className="auth-feat-dot" />Viewers pick their own language</li>
          </ul>
        </div>
        <GradientWave className="auth-wave" />
      </div>

      {/* RIGHT: Signup form */}
      <div className="auth-left">
        <div className="auth-left-inner">
          <Link to="/" className="auth-split-logo"><img src="/logo.png" alt="Yadia" /></Link>
          <h1 className="auth-title">Get early access</h1>
          <p className="auth-subtitle">Join hundreds of event organisers on the waitlist. Free to start — no credit card required.</p>

          <button className="btn-oauth" onClick={e=>e.preventDefault()}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign up with Google
          </button>

          <div className="auth-divider">or sign up with email</div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group"><label className="form-label" htmlFor="firstName">First name</label><input type="text" id="firstName" className="form-input" placeholder="Alex" required autoComplete="given-name" value={form.firstName} onChange={set('firstName')} disabled={submitted} /></div>
              <div className="form-group"><label className="form-label" htmlFor="lastName">Last name</label><input type="text" id="lastName" className="form-input" placeholder="Smith" required autoComplete="family-name" value={form.lastName} onChange={set('lastName')} disabled={submitted} /></div>
            </div>
            <div className="form-group"><label className="form-label" htmlFor="semail">Work email</label><input type="email" id="semail" className="form-input" placeholder="you@company.com" required autoComplete="email" value={form.email} onChange={set('email')} disabled={submitted} /></div>
            <div className="form-group"><label className="form-label" htmlFor="company">Company / Organisation</label><input type="text" id="company" className="form-input" placeholder="Acme Events Ltd" value={form.company} onChange={set('company')} disabled={submitted} /></div>
            <div className="form-group">
              <label className="form-label" htmlFor="role">Your role</label>
              <select id="role" className="form-input" value={form.role} onChange={set('role')} disabled={submitted}>
                <option value="">Select your role…</option>
                <option value="event-organiser">Event Organiser / Producer</option>
                <option value="av-tech">AV / Technical Director</option>
                <option value="broadcast">Broadcast / Media</option>
                <option value="developer">Developer / Engineer</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label" htmlFor="password">Password</label><input type="password" id="password" className="form-input" placeholder="At least 8 characters" required autoComplete="new-password" minLength="8" value={form.password} onChange={set('password')} disabled={submitted} /></div>
            <div className="form-checkbox-row">
              <input type="checkbox" id="terms" required checked={terms} onChange={e=>setTerms(e.target.checked)} disabled={submitted} />
              <label htmlFor="terms">I agree to Yadia's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></label>
            </div>
            <button type="submit" className="btn btn-primary auth-submit" disabled={submitted} style={submitted?{background:'#22c55e'}:{}}>{submitted ? "You're on the list! ✓" : 'Create account →'}</button>
          </form>

          <p className="auth-footer-link">Already have an account? <Link to="/login">Sign in</Link></p>
          <p className="auth-footer-link" style={{marginTop:8}}><Link to="/" style={{color:'#94a3b8',fontSize:'0.8rem'}}>← Back to Yadia</Link></p>
        </div>
      </div>

    </div>
    </>
  )
}
