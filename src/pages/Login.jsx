import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="auth-split">
      {/* LEFT: Login form */}
      <div className="auth-left">
        <div className="auth-left-inner">
          <Link to="/" className="auth-split-logo"><img src="/logo.png" alt="Jabber" /></Link>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your Jabber account</p>

          <button className="btn-oauth" onClick={e => e.preventDefault()}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <div className="auth-divider">or sign in with email</div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email address</label>
              <input type="email" id="email" className="form-input" placeholder="you@company.com" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input type="password" id="password" className="form-input" placeholder="••••••••" required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} />
              <a className="form-forgot" href="#" onClick={e=>e.preventDefault()}>Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in →'}</button>
          </form>

          <p className="auth-footer-link">Don't have an account? <Link to="/signup">Sign up free</Link></p>
        </div>
      </div>

      {/* RIGHT: Event showcase */}
      <div className="auth-right">
        <div className="auth-right-content">
          <h2 className="auth-right-headline">Your events.<br /><span className="text-gradient">Every language.</span><br />Zero friction.</h2>
          <p className="auth-right-sub">Join thousands of event organisers delivering multilingual live experiences with sub-2-second translation latency.</p>

          <div className="auth-features">
            <div className="auth-feature">
              <div className="auth-feature-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
              <div className="auth-feature-text"><h4>Under 2s end-to-end latency</h4><p>Transcription, translation, and voice synthesis delivered in real time.</p></div>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
              <div className="auth-feature-text"><h4>10+ languages at launch</h4><p>Serve global audiences without hiring a single interpreter.</p></div>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
              <div className="auth-feature-text"><h4>Pay only when you're live</h4><p>Usage-based pricing. $0 when your event isn't streaming.</p></div>
            </div>
          </div>

          <div className="auth-stats">
            <div className="auth-stat"><div className="auth-stat-num">10+</div><div className="auth-stat-label">Languages</div></div>
            <div className="auth-stat"><div className="auth-stat-num">&lt;2s</div><div className="auth-stat-label">Latency</div></div>
            <div className="auth-stat"><div className="auth-stat-num">500+</div><div className="auth-stat-label">Events run</div></div>
          </div>

          <div className="amp-wrap">
            <div className="amp-header">
              <span className="amp-brand">Jabber Live</span>
              <span style={{display:'flex',alignItems:'center',gap:5,fontSize:'0.68rem',color:'#22c55e',fontWeight:700}}>
                <span style={{width:6,height:6,borderRadius:'50%',background:'#22c55e',display:'inline-block'}} /> LIVE
              </span>
            </div>
            <div className="amp-event-name">Global Tech Summit 2026 — Keynote</div>
            <div className="amp-langs">
              <span className="amp-lchip">EN</span><span className="amp-lchip">ES</span><span className="amp-lchip">FR</span><span className="amp-lchip">DE</span><span className="amp-lchip off">+7</span>
            </div>
            <div className="amp-caption">"...and this is why real-time multilingual access changes everything for global audiences attending live events..."</div>
            <div className="amp-meta"><span className="amp-lang-active">Translating: English → Spanish</span><span className="amp-latency">1.4s latency</span></div>
          </div>

          <div className="auth-quote">
            <p>"Jabber let us reach 4× more attendees at our last conference. Setup took 8 minutes."</p>
            <cite>— Arjun K., Head of Events, TechConf Asia</cite>
          </div>
        </div>
      </div>
    </div>
  )
}
