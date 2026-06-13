import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import SEO from '../components/SEO'
import { saveLead } from '../utils/leads'
import { track } from '../utils/posthog'

const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How long does it take to set up?', acceptedAnswer: { '@type': 'Answer', text: 'Point your OBS or RTMP encoder at your Zabber stream key and you are live in under 10 minutes. No plugins, no dedicated hardware, no interpreters to schedule.' } },
    { '@type': 'Question', name: 'What languages does Zabber support?', acceptedAnswer: { '@type': 'Answer', text: 'Zabber runs in 50+ languages including English, Spanish, French, German, Portuguese, Japanese, Chinese, Arabic, Hindi, Korean and more, with new languages added continuously.' } },
    { '@type': 'Question', name: 'What is the translation latency?', acceptedAnswer: { '@type': 'Answer', text: 'Under 2 seconds end-to-end — from speech input to translated captions and audio reaching your viewers. Transcription alone is under 500ms.' } },
    { '@type': 'Question', name: 'Does it work with OBS?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Zabber works with any RTMP-compatible encoder — OBS Studio, vMix, Wirecast, or hardware encoders. Just point your RTMP output at your Zabber stream key.' } },
  ],
}

const TESTIMONIALS = [
  { quote: 'We ran our global summit in nine languages with zero interpreter booths. Attendees just picked their language and everything was captioned and voiced in real time.', name: 'Maya Okonkwo', role: 'Head of Events at SummitLive' },
  { quote: 'Zabber lets our broadcast reach markets we could never staff for. Latency is genuinely under two seconds — our audience doesn’t even notice it’s machine translation.', name: 'Daniel Vasquez', role: 'Production Lead at Orbit Media' },
  { quote: 'Setup took an afternoon. We pointed OBS at Zabber and our town halls are now understood by every employee, everywhere, in their own language.', name: 'Anette Lindqvist', role: 'Comms Director at Vexa' },
]

const FAQS = [
  { q: 'How long does it take to set up?', a: 'Point your OBS or RTMP encoder at your Zabber stream key and you are live in under 10 minutes. No plugins, no dedicated hardware, and no interpreters to schedule.' },
  { q: 'What languages does Zabber support?', a: '50+ languages at launch including English, Spanish, French, German, Portuguese, Japanese, Chinese, Arabic, Hindi, Korean, Italian, Russian, Dutch, Turkish and Swedish — with more added continuously.' },
  { q: 'How low is the latency?', a: 'Under 2 seconds end-to-end — from speech input to translated captions and audio reaching your viewers. AI transcription alone is under 500ms.' },
  { q: 'How are translations personalised per viewer?', a: 'Each viewer chooses their own language in the browser or app and instantly receives synchronised captions and native-sounding audio for that language.' },
  { q: 'What analytics are available?', a: 'You get live viewer counts by language, engagement and drop-off, full transcripts in every language, and exportable session reports.' },
  { q: 'Does it work with my existing stream?', a: 'Yes. Zabber accepts any RTMP source — OBS Studio, vMix, Wirecast, or hardware encoders — and fans out translation without changing your production setup.' },
]

const LOGOS = ['SummitLive', 'Orbit', 'Vexa', 'Lumen', 'NovaConf']

export default function Home() {
  useScrollReveal()
  const waveRef = useRef(null)
  const [openFaq, setOpenFaq] = useState(0)
  const [ti, setTi] = useState(0)
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  // Animated flowing gradient wave (blue + amber grainy ribbons)
  useEffect(() => {
    const canvas = waveRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf, t = 0, W, H
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    function resize() {
      const r = canvas.getBoundingClientRect()
      W = canvas.width = r.width * dpr
      H = canvas.height = r.height * dpr
    }
    const ribbons = [
      { amp: 0.16, freq: 1.1, speed: 0.6, y: 0.5, w: 0.22, c0: '#aac6ff', c1: '#5b8dfb' },
      { amp: 0.12, freq: 1.6, speed: -0.9, y: 0.55, w: 0.18, c0: '#f6d7ad', c1: '#e9a23b' },
      { amp: 0.2, freq: 0.8, speed: 0.45, y: 0.48, w: 0.14, c0: '#cfe0ff', c1: '#9bc0ff' },
    ]
    function draw() {
      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'multiply'
      ribbons.forEach((rb, i) => {
        const grad = ctx.createLinearGradient(0, 0, W, 0)
        grad.addColorStop(0, rb.c0); grad.addColorStop(0.5, rb.c1); grad.addColorStop(1, rb.c0)
        ctx.fillStyle = grad
        ctx.beginPath()
        const baseY = H * rb.y
        const band = H * rb.w
        ctx.moveTo(0, baseY)
        for (let x = 0; x <= W; x += 8) {
          const p = x / W
          const y = baseY + Math.sin(p * Math.PI * 2 * rb.freq + t * rb.speed + i) * H * rb.amp
          ctx.lineTo(x, y)
        }
        for (let x = W; x >= 0; x -= 8) {
          const p = x / W
          const y = baseY + band + Math.sin(p * Math.PI * 2 * rb.freq + t * rb.speed + i + 0.6) * H * rb.amp
          ctx.lineTo(x, y)
        }
        ctx.closePath()
        ctx.fill()
      })
      t += 0.005
      raf = requestAnimationFrame(draw)
    }
    resize(); draw()
    window.addEventListener('resize', resize, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  function submit() {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!ok) return
    saveLead({ email: email.trim(), source: 'Home — Try it on your stream', page: '/' })
    track('lead_captured', { source: 'Home hero', page: '/' })
    setDone(true)
  }

  const PillIcon = () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 8h3M11 8h3M8 2v3M8 11v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )

  return (
    <main className="hh">
      <SEO
        canonical="/"
        description="Zabber gives every viewer a translator. Real-time AI transcription, translation and voice for live events — in 50+ languages, under 2-second latency. No interpreters, no hardware."
        schema={HOME_SCHEMA}
      />

      {/* HERO */}
      <section className="hh-hero">
        <div className="hh-wrap hh-hero-inner">
          <h1 className="hh-h1 reveal">A translator for every viewer</h1>
          <p className="hh-lede reveal">AI transcription, translation &amp; voice — live, in every language, 24/7.</p>
          <div className="reveal">
            <Link to="/signup" className="btn btn-primary"><PillIcon /> See live demo</Link>
          </div>
        </div>
        <div className="hh-wrap">
          <div className="hh-wave"><canvas ref={waveRef} aria-hidden="true" /></div>
          <div className="hh-logos reveal">
            {LOGOS.map(l => <span key={l} className="hh-logo">{l}</span>)}
          </div>
        </div>
      </section>

      {/* STATS + QUOTE */}
      <section className="hh-wrap">
        <div className="hh-stats">
          <div className="reveal">
            <div className="hh-stat-num">98%</div>
            <div className="hh-stat-label">caption accuracy across supported languages</div>
          </div>
          <div className="reveal">
            <div className="hh-stat-num">&lt; 2s</div>
            <div className="hh-stat-label">end-to-end translation latency</div>
          </div>
          <div className="hh-quote-block reveal">
            <p>“Our audience finally hears every session in their own language, instantly. Zabber replaced an entire booth of interpreters for our international conference.”</p>
            <div className="hh-author">
              <span className="hh-avatar" />
              <div>
                <div className="hh-author-name">Maya Okonkwo</div>
                <div className="hh-author-role">Head of Events at SummitLive</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO PANEL */}
      <section className="hh-wrap hh-demo">
        <div className="hh-demo-panel">
          <div className="hh-demo-inner reveal">
            <span className="hh-eyebrow">Live demo</span>
            <h2 className="hh-h2">See Zabber in action</h2>
            <p className="hh-lede">Watch one stream become every language, in real time.</p>
            <Link to="/how-it-works" className="btn btn-primary"><PillIcon /> Start demo</Link>
          </div>
        </div>
      </section>

      {/* FEATURE BLOCKS */}
      <section className="hh-wrap hh-section">
        <div className="hh-sechead reveal">
          <h2 className="hh-h2">Translation across your entire broadcast</h2>
          <p className="hh-lede">Every live event has a language barrier. Zabber removes it — from the moment someone starts speaking to the moment a viewer hears it in their own tongue.</p>
        </div>

        {/* Q&A / transcription */}
        <div className="hh-feature">
          <div className="hh-feature-text reveal">
            <span className="hh-eyebrow hh-feature-eyebrow">Live transcription</span>
            <h3 className="hh-feature-title">Turn speech into text, instantly</h3>
            <div className="hh-sub-list">
              <div className="hh-sub-item"><div className="hh-sub-title">Real-time speech-to-text</div><div className="hh-sub-desc">Captures every speaker with automatic language detection and sub-500ms interim captions.</div></div>
              <div className="hh-sub-item"><div className="hh-sub-title">Speaker &amp; context aware</div><div className="hh-sub-desc">Keeps names, terminology and context consistent across an entire session.</div></div>
              <div className="hh-sub-item"><div className="hh-sub-title">Clean, broadcast-ready output</div><div className="hh-sub-desc">Punctuated, readable transcripts you can caption, archive, or repurpose.</div></div>
            </div>
          </div>
          <div className="hh-feature-visual grad-blue reveal">
            <div className="hh-mock">
              <div className="hh-bubble them">“Welcome to the Global Tech Summit…”</div>
              <div className="hh-bubble me">“Bienvenidos a la Cumbre Global…”</div>
              <div className="hh-mock-input">Live caption · EN → ES<span className="hh-mock-send">↑</span></div>
            </div>
          </div>
        </div>

        {/* Translation */}
        <div className="hh-feature reverse">
          <div className="hh-feature-text reveal">
            <span className="hh-eyebrow hh-feature-eyebrow">Parallel translation</span>
            <h3 className="hh-feature-title">Every language at once, in real time</h3>
            <div className="hh-sub-list">
              <div className="hh-sub-item"><div className="hh-sub-title">Fan out to 50+ languages</div><div className="hh-sub-desc">One stream is translated into every enabled language simultaneously — no sequential delay.</div></div>
              <div className="hh-sub-item"><div className="hh-sub-title">Add languages without code</div><div className="hh-sub-desc">Toggle a language on and it’s live for the next session. No re-engineering.</div></div>
              <div className="hh-sub-item"><div className="hh-sub-title">Context-preserving output</div><div className="hh-sub-desc">Neural translation that keeps meaning, tone and intent intact across languages.</div></div>
            </div>
          </div>
          <div className="hh-feature-visual grad-green reveal">
            <div className="hh-mock">
              <div className="hh-mock-tabs">
                <span className="hh-mock-tab on">EN</span><span className="hh-mock-tab">ES</span><span className="hh-mock-tab">FR</span><span className="hh-mock-tab">DE</span><span className="hh-mock-tab">JA</span><span className="hh-mock-tab">+45</span>
              </div>
              <div className="hh-mock-cap">“The future of global connectivity starts here.”</div>
            </div>
          </div>
        </div>

        {/* Voice & delivery */}
        <div className="hh-feature">
          <div className="hh-feature-text reveal">
            <span className="hh-eyebrow hh-feature-eyebrow">Voice &amp; delivery</span>
            <h3 className="hh-feature-title">Native-sounding audio to every viewer</h3>
            <div className="hh-sub-list">
              <div className="hh-sub-item"><div className="hh-sub-title">Neural voice synthesis</div><div className="hh-sub-desc">Every viewer hears a natural voice in their language — not robotic text-to-speech.</div></div>
              <div className="hh-sub-item"><div className="hh-sub-title">Per-viewer language control</div><div className="hh-sub-desc">Audiences pick their language in the browser and get synced captions and audio.</div></div>
              <div className="hh-sub-item"><div className="hh-sub-title">Edge delivery at any scale</div><div className="hh-sub-desc">Pushed over WebSockets to thousands of concurrent viewers worldwide.</div></div>
            </div>
          </div>
          <div className="hh-feature-visual grad-peach reveal">
            <div className="hh-mock">
              <div className="hh-mock-tabs"><span className="hh-mock-tab on">🔊 Audio on</span><span className="hh-mock-tab">FR · 38</span><span className="hh-mock-tab">DE · 23</span></div>
              <div className="hh-mock-cap">“Le thème de ce sommet est Relier les Mondes.”</div>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="hh-wrap hh-steps">
        <div className="hh-sechead reveal"><h2 className="hh-h2">Go live in minutes</h2></div>
        {[
          { n: '1.', t: 'Point your OBS or RTMP encoder at your Zabber stream key', v: 'Stream key · rtmp://live.zabber.io' },
          { n: '2.', t: 'Zabber spins up the pipeline — transcribe, translate, synthesise', v: 'Pipeline: Ingest → AI Core → Edge' },
          { n: '3.', t: 'Viewers open a link and pick their language', v: 'zabber.live/e/global-summit' },
        ].map(s => (
          <div className="hh-step" key={s.n}>
            <div className="reveal">
              <div className="hh-step-num">{s.n}</div>
              <div className="hh-step-title">{s.t}</div>
            </div>
            <div className="hh-step-visual grad-blue reveal"><div className="hh-mock"><div className="hh-mock-cap">{s.v}</div></div></div>
          </div>
        ))}
        <div className="hh-steps-foot reveal">
          <Link to="/signup" className="btn btn-primary"><PillIcon /> Get started</Link>
          <span className="hh-steps-note">Live in under 10 minutes — no hardware, no interpreters.</span>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="hh-wrap hh-statement reveal">
        <h2 className="hh-h2">Scale every event globally without hiring interpreters</h2>
        <p>Give every viewer a seat in their own language. Zabber is always on — and when a human touch is needed, you’ll know.</p>
      </section>

      {/* CREATE / TRY */}
      <section className="hh-wrap hh-create">
        <div className="hh-create-card">
          <div className="hh-create-inner reveal">
            <h2 className="hh-h2">Try it on your stream</h2>
            <div className="hh-orbs" aria-hidden="true">
              <span className="hh-orb-circle grad-peach" />
              <span className="hh-orb-circle grad-blue" />
              <span className="hh-orb-circle grad-green" />
            </div>
            <p className="hh-lede">No account needed. No cost. Get early access in minutes.</p>
            {done ? (
              <p style={{ marginTop: 18, color: 'var(--green-500)', fontWeight: 600 }}>✓ You’re on the list — we’ll be in touch.</p>
            ) : (
              <div className="hh-create-form">
                <input type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()} />
                <button className="btn btn-primary" onClick={submit}>Get early access</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="hh-wrap">
        <div className="hh-highlights">
          {[
            { c: 'grad-blue', t: 'Live 24/7', d: 'Always on for every broadcast, in every timezone.' },
            { c: 'grad-green', t: '50+ languages', d: 'Reach every market the moment you go live.' },
            { c: 'grad-peach', t: 'Personalised per viewer', d: 'Each viewer chooses their own language and voice.' },
          ].map(h => (
            <div className="hh-hl-card reveal" key={h.t}>
              <span className={`hh-hl-icon ${h.c}`} />
              <h3>{h.t}</h3>
              <p>{h.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="hh-wrap hh-tests">
        <span className="hh-eyebrow">What our customers say</span>
        <blockquote className="hh-quote reveal">“{TESTIMONIALS[ti].quote}”</blockquote>
        <div className="hh-tests-foot">
          <div className="hh-author">
            <span className="hh-avatar" />
            <div>
              <div className="hh-author-name">{TESTIMONIALS[ti].name}</div>
              <div className="hh-author-role">{TESTIMONIALS[ti].role}</div>
            </div>
          </div>
          <div className="hh-tests-nav">
            <button aria-label="Previous" onClick={() => setTi(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}>←</button>
            <button aria-label="Next" onClick={() => setTi(i => (i + 1) % TESTIMONIALS.length)}>→</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="hh-wrap hh-faq">
        <span className="hh-eyebrow">Frequently asked questions</span>
        <div>
          {FAQS.map((f, i) => (
            <div className={`hh-faq-item${openFaq === i ? ' open' : ''}`} key={f.q}>
              <button className="hh-faq-q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                {f.q}
                <span className="hh-faq-icon">+</span>
              </button>
              <div className="hh-faq-a" style={{ maxHeight: openFaq === i ? '320px' : '0' }}>
                <div className="hh-faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="hh-final">
        <div className="hh-final-blob l" aria-hidden="true" />
        <div className="hh-final-blob r" aria-hidden="true" />
        <h2 className="hh-h2 reveal">Give every viewer a seat in their own language</h2>
        <Link to="/contact" className="btn btn-primary reveal"><PillIcon /> Talk to us</Link>
      </section>
    </main>
  )
}
