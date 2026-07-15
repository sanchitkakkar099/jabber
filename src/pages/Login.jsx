import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import GradientWave from '../components/GradientWave'

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
    <>
    <SEO title="Sign In" canonical="/login" noindex={true} />
    <div className="auth-split">

      {/* LEFT: brand panel */}
      <div className="auth-right">
        <div className="auth-right-content">
          <h2 className="auth-right-headline">Your events.<br />Every language.<br />Zero friction.</h2>
          <p className="auth-right-sub">Deliver multilingual live experiences with sub-2-second latency — no interpreters, no hardware.</p>
          <ul className="auth-feat-list">
            <li className="auth-feat"><span className="auth-feat-dot" />Under 2s end-to-end latency</li>
            <li className="auth-feat"><span className="auth-feat-dot" />50+ languages, no interpreters</li>
            <li className="auth-feat"><span className="auth-feat-dot" />Pay only when you’re live</li>
          </ul>
        </div>
        <GradientWave className="auth-wave" />
      </div>

      {/* RIGHT: Login form */}
      <div className="auth-left">
        <div className="auth-left-inner">
          <Link to="/" className="auth-split-logo"><img src="/logo.png" alt="Yadia" /></Link>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your Yadia account</p>

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
          <p className="auth-footer-link" style={{marginTop:8}}><Link to="/" style={{color:'#94a3b8',fontSize:'0.8rem'}}>← Back to Yadia</Link></p>
        </div>
      </div>

    </div>
    </>
  )
}
