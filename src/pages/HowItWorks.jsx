import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import SEO from '../components/SEO'
import { saveLead } from '../utils/leads'
import { track } from '../utils/posthog'

export default function HowItWorks() {
  useScrollReveal()
  const [ctaEmail, setCtaEmail] = useState('')
  const [ctaSubmitted, setCtaSubmitted] = useState(false)
  const [ctaError, setCtaError] = useState(false)
  function handleCTA() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ctaEmail.trim())) { setCtaError(true); setTimeout(()=>setCtaError(false),1800); return }
    saveLead({ email: ctaEmail.trim(), source: 'How It Works CTA', page: '/how-it-works' })
    track('lead_captured', { source: 'How It Works CTA', page: '/how-it-works' })
    setCtaSubmitted(true)
  }

  return (
    <>
      <SEO
        title="How It Works — Live Translation in 3 Steps"
        description="Connect your OBS stream, Yadia transcribes and translates in real time, viewers pick their language. From encoder to global audience in under 2 seconds. Setup in 10 minutes."
        canonical="/how-it-works"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to set up real-time live translation with Yadia',
          description: 'Three steps to make your live event multilingual using Yadia',
          step: [
            { '@type': 'HowToStep', position: 1, name: 'Connect your stream', text: 'Point your OBS or encoder RTMP output at your Yadia stream key. No plugins or additional software required.' },
            { '@type': 'HowToStep', position: 2, name: 'Yadia processes it', text: 'AI transcribes speech in real time, fans out translations to all enabled languages simultaneously using neural models.' },
            { '@type': 'HowToStep', position: 3, name: 'Viewers choose their language', text: 'Share a single viewer link. Each attendee picks their preferred language and receives synchronised captions and audio.' }
          ],
          totalTime: 'PT10M'
        }}
      />
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="section-tag-wrap"><span className="section-tag">How It Works</span></div>
          <h1>Live in three steps</h1>
          <p>From your encoder to every viewer's screen — in under two seconds. No dedicated hardware. No interpreter teams. Just Yadia.</p>
        </div>
      </section>

      <section className="how-section" style={{ borderTop:'none' }}>
        <div className="container">
          <div className="steps-row">
            <div className="step reveal">
              <div className="step-num">01</div>
              <div className="step-icon-box"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
              <h3>Broadcast Your Event</h3>
              <p>Stream with OBS, vMix, or any RTMP encoder. Yadia's live ingest layer picks it up and triggers the entire pipeline automatically — no configuration needed per event.</p>
            </div>
            <div className="step-connector"><svg viewBox="0 0 80 20" fill="none" preserveAspectRatio="none"><path d="M0 10 Q20 2 40 10 Q60 18 80 10" stroke="#C7D2FE" strokeWidth="2" fill="none" strokeDasharray="4 3"/></svg></div>
            <div className="step reveal">
              <div className="step-num">02</div>
              <div className="step-icon-box"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
              <h3>AI Processes in Real Time</h3>
              <p>Yadia transcribes audio, detects language, translates into all configured languages, and synthesises audio — all in parallel, in seconds. The whole AI pipeline runs end-to-end in under 1.5 seconds.</p>
            </div>
            <div className="step-connector"><svg viewBox="0 0 80 20" fill="none" preserveAspectRatio="none"><path d="M0 10 Q20 2 40 10 Q60 18 80 10" stroke="#C7D2FE" strokeWidth="2" fill="none" strokeDasharray="4 3"/></svg></div>
            <div className="step reveal">
              <div className="step-num">03</div>
              <div className="step-icon-box"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
              <h3>Viewers Pick Their Language</h3>
              <p>Audience connects via browser or app. Each viewer selects their language and instantly receives synchronised captions and audio. Language can be switched mid-stream without reconnecting.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tech-section">
        <div className="container">
          <div className="tech-inner">
            <div className="tech-left reveal">
              <div className="section-tag-wrap" style={{justifyContent:'flex-start'}}><span className="section-tag">Pipeline Detail</span></div>
              <h2 className="section-title" style={{textAlign:'left',maxWidth:420,marginBottom:16}}>Under the hood</h2>
              <p className="tech-intro">Every millisecond counts in live translation. Here's exactly what happens between your microphone and your viewer's ears.</p>
              <ul className="tech-list">
                {[['0–200ms','Audio captured, segmented, and delivered to ingest layer'],['200–700ms','Speech-to-text transcription with interim results'],['700–1100ms','Parallel neural translation into all target languages'],['1100–1500ms','Voice synthesis and audio rendering per language'],['1500–2000ms','Edge delivery to viewer WebSocket connections globally']].map(([b,d])=>(
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
                  {['Event-Driven','Serverless','Auto-Scaling','Zero Idle Cost'].map(t=><span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="integration-section">
        <div className="container">
          <div className="section-tag-wrap"><span className="section-tag">Integrations</span></div>
          <h2 className="section-title">Works with your existing setup</h2>
          <p className="section-desc">No new hardware required. Yadia connects to your existing broadcast workflow.</p>
          <div className="integration-grid">
            {[
              { tag:'Encoder', title:'OBS Studio', desc:'Stream directly from OBS using a custom RTMP endpoint. Works with all OBS versions. Setup takes under 5 minutes — just paste your stream key and go.' },
              { tag:'Encoder', title:'Any RTMP Source', desc:'Supports any encoder that outputs RTMP — vMix, Wirecast, hardware encoders, and more. If it streams, Yadia can translate it.' },
              { tag:'Viewer', title:'Browser & Mobile', desc:'Viewers join via a shareable link in any browser — no app download required. Native iOS and Android SDKs available for embedded experiences.' },
              { tag:'Platform', title:'REST & WebSocket API', desc:'Full API access to manage events, configure languages, and receive real-time transcripts programmatically. Webhook support for event lifecycle notifications.' },
              { tag:'Analytics', title:'Dashboard & Webhooks', desc:'Real-time viewer counts, language breakdowns, latency metrics, and quality scores. Export data via webhooks to your own analytics stack.' },
              { tag:'Enterprise', title:'SSO & Custom Domains', desc:'Integrate with your existing identity provider via SAML or OIDC. Serve viewer experiences from your own domain with custom branding.' },
            ].map(c => (
              <div key={c.title} className="integration-card reveal">
                <span className="int-tag">{c.tag}</span>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="section-tag-wrap"><span className="section-tag">FAQ</span></div>
          <h2 className="section-title">Common questions</h2>
          <div className="faq-grid">
            {[
              ['What encoders are supported?','Any encoder that outputs RTMP works with Yadia — OBS Studio, vMix, Wirecast, hardware encoders, and cloud-based broadcast tools.'],
              ['How do viewers access the translations?','You share a link. Viewers open it in any browser, select their language, and immediately receive synchronised captions and audio. No app install needed.'],
              ['What is the actual end-to-end latency?','Typically under 2 seconds from your microphone to the viewer\'s speaker. This includes transcription, translation, synthesis, and global delivery.'],
              ['Can I add languages after an event starts?','Yes. Languages can be enabled or disabled from the organiser dashboard during a live event with no interruption to existing viewers.'],
              ['Does Yadia work for pre-recorded events?','Yadia is optimised for live streaming, but supports simulated live and on-demand replay with the same translation quality.'],
              ['How does billing work?','You are billed per minute of active streaming, per language enabled. There is no charge when your event is not live. See the Pricing page for full details.'],
            ].map(([q,a]) => (
              <div key={q} className="faq-item reveal"><h4>{q}</h4><p>{a}</p></div>
            ))}
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
            <input type="email" placeholder="you@company.com" className="cta-input" value={ctaEmail} onChange={e=>setCtaEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleCTA()} style={ctaError?{borderColor:'#f87171'}:{}} disabled={ctaSubmitted} />
            <button className="btn btn-white btn-lg" onClick={handleCTA} disabled={ctaSubmitted} style={ctaSubmitted?{background:'#22c55e',color:'#fff'}:{}}>{ctaSubmitted?"✓ You're on the list!":'Get Early Access →'}</button>
          </div>
          <p className="cta-note">No credit card required · Free to get started · Cancel anytime</p>
        </div>
      </section>
    </>
  )
}
