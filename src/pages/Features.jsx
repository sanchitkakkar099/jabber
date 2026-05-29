import { Link } from 'react-router-dom'
import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

const features = [
  { color:'fi-blue', title:'Real-Time Transcription', desc:'AI-powered speech-to-text with automatic language detection and optional PII redaction. Interim and final transcripts delivered in real time with <500ms delay. Supports accents and technical vocabulary out of the box.' },
  { color:'fi-violet', title:'Parallel Translation', desc:'Transcripts fan out to 10+ languages simultaneously — zero sequential delay. Built on state-of-the-art neural translation models tuned for live speech. Extend to new languages without touching a line of code.' },
  { color:'fi-cyan', title:'Voice Synthesis (TTS)', desc:'Natural-sounding audio synthesised in every target language using neural voice models. Every viewer hears a native voice — not robotic text-to-speech. Multiple voice styles available per language.' },
  { color:'fi-indigo', title:'Edge WebSocket Delivery', desc:'Translations pushed to millions of persistent WebSocket connections globally. Session state maintained at the edge for zero-latency, personalised delivery. No polling. No dropped captions.' },
  { color:'fi-green', title:'Auto Scale to Zero', desc:'Containers spin up the moment you go LIVE, shut down completely when you stop. Your idle cost is literally $0. No reserved capacity wasted. Pay only for what you use, billed per minute of active streaming.' },
  { color:'fi-orange', title:'Viewer Language Control', desc:'Each viewer picks their preferred language via browser or app. They receive synchronised captions and audio — personalised, in real-time. Language can be changed mid-session with zero interruption.' },
  { color:'fi-blue', title:'Organiser Dashboard', desc:'Real-time event analytics, viewer counts per language, latency monitoring, and translation quality scores. Manage live events, configure languages, and view billing — all in one place.' },
  { color:'fi-violet', title:'Enterprise Security', desc:'End-to-end encrypted audio streams. SOC 2 Type II compliant infrastructure. Optional PII redaction in transcripts. GDPR-ready data handling with configurable data residency options.' },
  { color:'fi-green', title:'Developer API', desc:'Fully documented REST and WebSocket APIs. Webhook support for stream events. SDKs for Web, iOS, and Android. Embed Jabber directly into your own event platform or app in minutes.' },
]

export default function Features() {
  useScrollReveal()
  const [ctaEmail, setCtaEmail] = useState('')
  const [ctaSubmitted, setCtaSubmitted] = useState(false)
  const [ctaError, setCtaError] = useState(false)

  function handleCTA() {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ctaEmail.trim())
    if (!valid) { setCtaError(true); setTimeout(() => setCtaError(false), 1800); return }
    setCtaSubmitted(true)
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="section-tag-wrap"><span className="section-tag">Features</span></div>
          <h1>Everything your global event needs</h1>
          <p>A complete real-time translation pipeline. Fully managed. Fully serverless. From your encoder to every viewer's ear — in under two seconds.</p>
          <div className="page-hero-cta">
            <Link to="/signup" className="btn btn-primary btn-lg">Get Early Access</Link>
            <Link to="/how-it-works" className="btn btn-ghost btn-lg">See how it works →</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map(f => (
              <div key={f.title} className="feat-card reveal">
                <div className={`feat-icon-wrap ${f.color}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {f.color === 'fi-blue' && f.title === 'Real-Time Transcription' && <><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0014 0"/><line x1="12" y1="17" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></>}
                    {f.title === 'Parallel Translation' && <><circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 11.5l10-4.5M7 12h10M7 12.5l10 4.5"/></>}
                    {f.title === 'Voice Synthesis (TTS)' && <><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></>}
                    {f.title === 'Edge WebSocket Delivery' && <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>}
                    {f.title === 'Auto Scale to Zero' && <><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></>}
                    {f.title === 'Viewer Language Control' && <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>}
                    {f.title === 'Organiser Dashboard' && <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></>}
                    {f.title === 'Enterprise Security' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>}
                    {f.title === 'Developer API' && <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>}
                  </svg>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tech-section">
        <div className="container">
          <div className="tech-inner">
            <div className="tech-left reveal">
              <div className="section-tag-wrap" style={{ justifyContent:'flex-start' }}><span className="section-tag">Infrastructure</span></div>
              <h2 className="section-title" style={{ textAlign:'left', maxWidth:420, marginBottom:16 }}>Enterprise infrastructure, built for real-time scale</h2>
              <p className="tech-intro">Serverless by design — Jabber runs on purpose-built enterprise infrastructure optimised for ultra-low-latency audio processing, real-time translation, and global edge delivery.</p>
              <ul className="tech-list">
                {[['Live Ingest Layer','High-throughput stream ingestion at any scale'],['AI Transcription','Real-time speech-to-text with automatic language detection'],['Neural Translation','Parallel multi-language translation in milliseconds'],['Voice Synthesis','Natural-sounding audio in every supported language'],['Edge Delivery Network','Global WebSocket delivery to millions of simultaneous viewers']].map(([b,d]) => (
                  <li key={b}><span className="tl-badge">{b}</span><span className="tl-desc">{d}</span></li>
                ))}
              </ul>
            </div>
            <div className="tech-right reveal">
              <div className="pipeline-card">
                <div className="pipe-label-top">Live Pipeline</div>
                <div className="pipeline-visual">
                  <div className="pv-col"><div className="pv-node pv-gray">OBS</div><div className="pv-sublabel">Encoder</div></div>
                  <div className="pv-arrow-col">→</div>
                  <div className="pv-col"><div className="pv-node pv-indigo">Ingest</div><div className="pv-sublabel">Live Layer</div></div>
                  <div className="pv-arrow-col">→</div>
                  <div className="pv-col pv-stack-col">
                    <div className="pv-node pv-small pv-indigo">Transcribe</div>
                    <div className="pv-node pv-small pv-indigo">Translate</div>
                    <div className="pv-node pv-small pv-indigo">Synthesise</div>
                    <div className="pv-sublabel">AI Core</div>
                  </div>
                  <div className="pv-arrow-col">→</div>
                  <div className="pv-col"><div className="pv-node pv-indigo">Edge&nbsp;CDN</div><div className="pv-sublabel">Deliver</div></div>
                  <div className="pv-arrow-col">→</div>
                  <div className="pv-col"><div className="pv-node pv-gray">Viewers</div><div className="pv-sublabel">∞ scale</div></div>
                </div>
                <div className="tech-tags">
                  {['Event-Driven','Serverless','Auto-Scaling','Zero Idle Cost','Multi-Language'].map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-glow" aria-hidden="true" />
        <div className="container cta-inner">
          <div className="cta-badge">Early Access</div>
          <h2>Ready to go global?</h2>
          <p>Join the waitlist. We'll reach out with setup details within 24 hours.</p>
          <div className="cta-form">
            <input type="email" placeholder="you@company.com" className="cta-input" value={ctaEmail} onChange={e => setCtaEmail(e.target.value)} onKeyDown={e => e.key==='Enter'&&handleCTA()} style={ctaError?{borderColor:'#f87171'}:{}} disabled={ctaSubmitted} />
            <button className="btn btn-white btn-lg" onClick={handleCTA} disabled={ctaSubmitted} style={ctaSubmitted?{background:'#22c55e',color:'#fff'}:{}}>{ctaSubmitted?"✓ You're on the list!":'Get Early Access →'}</button>
          </div>
          <p className="cta-note">No credit card required · Free to get started · Cancel anytime</p>
        </div>
      </section>
    </>
  )
}
