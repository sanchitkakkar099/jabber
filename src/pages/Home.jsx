import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import SEO from '../components/SEO'
import { saveLead } from '../utils/leads'

const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Jabber?',
      acceptedAnswer: { '@type': 'Answer', text: 'Jabber is a real-time AI translation platform for live events. It connects to any RTMP stream (such as OBS) and delivers simultaneous transcription, translation, and voice synthesis in 10+ languages to your viewers — with under 2 seconds of end-to-end latency. No interpreters or dedicated hardware required.' }
    },
    {
      '@type': 'Question',
      name: 'How does Jabber work?',
      acceptedAnswer: { '@type': 'Answer', text: 'Point your OBS or encoder RTMP stream at Jabber. Jabber\'s AI transcribes the speech in real time, fans out translations to all enabled languages simultaneously, and pushes synchronised captions and audio to every viewer via WebSocket. Each viewer chooses their own language. Setup takes under 10 minutes.' }
    },
    {
      '@type': 'Question',
      name: 'What languages does Jabber support?',
      acceptedAnswer: { '@type': 'Answer', text: 'Jabber supports 10+ languages at launch including English, Spanish, French, German, Portuguese, Japanese, Chinese (Simplified), Arabic, Hindi, Korean, Italian, Russian, Dutch, Turkish, and Swedish. More languages are being added continuously.' }
    },
    {
      '@type': 'Question',
      name: 'How much does Jabber cost?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every new account gets $100 worth of free credits — enough to run 1 event for 1 hour with up to 100 viewers in 2 languages. No credit card required. Paid plans unlock more hours, languages, and scale.' }
    },
    {
      '@type': 'Question',
      name: 'What is the translation latency?',
      acceptedAnswer: { '@type': 'Answer', text: 'Jabber delivers end-to-end translation — from speech input to translated captions and audio reaching viewers — in under 2 seconds. AI transcription alone has under 500ms delay.' }
    },
    {
      '@type': 'Question',
      name: 'Does Jabber work with OBS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Jabber works with any RTMP-compatible software or hardware encoder, including OBS Studio, vMix, Wirecast, and dedicated hardware encoders. You simply point your RTMP output at your Jabber stream key — no plugins or additional software required.' }
    },
    {
      '@type': 'Question',
      name: 'Is there a free plan?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every new account gets $100 worth of free credits — enough to run 1 event for 1 hour with up to 100 viewers in 2 languages. No credit card required.' }
    },
    {
      '@type': 'Question',
      name: 'What events is Jabber best suited for?',
      acceptedAnswer: { '@type': 'Answer', text: 'Jabber is ideal for international conferences, corporate town halls, live sports broadcasts, religious ceremonies, online education and webinars, and product launches. Any live event where the audience speaks more than one language benefits from Jabber.' }
    }
  ]
}

const translations = {
  en: [
    '"Welcome to the Global Tech Summit 2026. Today we gather from over forty nations to discuss the future of technology and global connectivity..."',
    '"Our first panel will focus on AI and its transformative impact on industries worldwide. We are excited to welcome our keynote speakers..."',
    '"The theme of this summit is Bridging Worlds — connecting technology, culture, and people across every border..."',
  ],
  es: [
    '"Bienvenidos a la Cumbre Global de Tecnología 2026. Hoy nos reunimos de más de cuarenta naciones para discutir el futuro de la tecnología..."',
    '"Nuestro primer panel se centrará en la IA y su impacto transformador en industrias de todo el mundo..."',
    '"El tema de esta cumbre es Conectar Mundos — uniendo tecnología, cultura y personas a través de todas las fronteras..."',
  ],
  fr: [
    '"Bienvenue au Sommet Mondial de la Technologie 2026. Aujourd\'hui, nous nous réunissons de plus de quarante nations pour discuter de l\'avenir de la technologie..."',
    '"Notre premier panel se concentrera sur l\'IA et son impact transformateur sur les industries du monde entier..."',
    '"Le thème de ce sommet est Relier les Mondes — unir la technologie, la culture et les personnes au-delà de toutes les frontières..."',
  ],
  de: [
    '"Willkommen beim Weltweiten Tech-Gipfel 2026. Heute versammeln wir uns aus über vierzig Nationen, um über die Zukunft der Technologie zu sprechen..."',
    '"Unser erstes Panel konzentriert sich auf KI und ihre transformative Wirkung auf Branchen weltweit..."',
    '"Das Thema dieses Gipfels ist Welten verbinden — Technologie, Kultur und Menschen über alle Grenzen hinweg vereinen..."',
  ],
}
const langLabels = { en: 'English (Original)', es: 'Spanish · Translated', fr: 'French · Translated', de: 'German · Translated' }

export default function Home() {
  useScrollReveal()
  const canvasRef = useRef(null)
  const waveformRef = useRef(null)
  const [currentLang, setCurrentLang] = useState('en')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [captionVisible, setCaptionVisible] = useState(true)
  const [viewers, setViewers] = useState(4827)
  const [ctaEmail, setCtaEmail] = useState('')
  const [ctaSubmitted, setCtaSubmitted] = useState(false)
  const [ctaError, setCtaError] = useState(false)

  // Typewriter effect
  const TYPE_PHRASES = ['reach the world.', 'go multilingual.', 'hit go.']
  const [typedWord, setTypedWord] = useState('')
  const [typeIdx, setTypeIdx] = useState(0)
  const [typeDeleting, setTypeDeleting] = useState(false)

  useEffect(() => {
    const current = TYPE_PHRASES[typeIdx]
    let timer
    if (!typeDeleting && typedWord === current) {
      timer = setTimeout(() => setTypeDeleting(true), 2400)
    } else if (typeDeleting && typedWord === '') {
      setTypeDeleting(false)
      setTypeIdx(i => (i + 1) % TYPE_PHRASES.length)
    } else {
      timer = setTimeout(() => {
        setTypedWord(typeDeleting
          ? current.slice(0, typedWord.length - 1)
          : current.slice(0, typedWord.length + 1)
        )
      }, typeDeleting ? 55 : 85)
    }
    return () => clearTimeout(timer)
  }, [typedWord, typeDeleting, typeIdx])

  // Canvas particle network
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const hero = canvas.closest('.hero')
    const ctx = canvas.getContext('2d')
    let particles = [], W, H, raf

    function Particle() {
      this.x = Math.random() * W; this.y = Math.random() * H
      this.vx = (Math.random() - 0.5) * 0.3; this.vy = (Math.random() - 0.5) * 0.3
      this.r = Math.random() * 1.8 + 0.4; this.a = Math.random() * 0.45 + 0.08
      this.hue = Math.random() > 0.5 ? '79,70,229' : '139,92,246'
    }
    Particle.prototype.update = function () {
      this.x += this.vx; this.y += this.vy
      if (this.x < 0 || this.x > W) this.vx *= -1
      if (this.y < 0 || this.y > H) this.vy *= -1
    }

    function setSize() { W = canvas.width = hero.offsetWidth; H = canvas.height = hero.offsetHeight }
    function build() { setSize(); const n = Math.max(30, Math.min(Math.floor(W / 16), 80)); particles = Array.from({ length: n }, () => new Particle()) }
    const MAX_D = 155, MAX_D2 = MAX_D * MAX_D
    function frame() {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]; const dx = a.x - b.x, dy = a.y - b.y; const d2 = dx * dx + dy * dy
          if (d2 < MAX_D2) { const alpha = (1 - Math.sqrt(d2) / MAX_D) * 0.13; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `rgba(79,70,229,${alpha})`; ctx.lineWidth = 0.75; ctx.stroke() }
        }
      }
      particles.forEach(p => { p.update(); ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(${p.hue},${p.a})`; ctx.fill() })
      raf = requestAnimationFrame(frame)
    }
    build(); frame()
    let resizeT
    const onResize = () => { clearTimeout(resizeT); resizeT = setTimeout(() => { cancelAnimationFrame(raf); build(); frame() }, 220) }
    window.addEventListener('resize', onResize, { passive: true })
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  // Waveform bars
  useEffect(() => {
    const el = waveformRef.current
    if (!el || el.childElementCount > 0) return
    const BAR_COUNT = 32
    for (let i = 0; i < BAR_COUNT; i++) {
      const bar = document.createElement('div'); bar.className = 'wbar'
      const mid = (BAR_COUNT - 1) / 2; const dist = Math.abs(i - mid) / mid
      const maxH = Math.round(10 + (1 - dist * 0.75) * 26)
      bar.style.setProperty('--max-h', maxH + 'px')
      bar.style.setProperty('--dur', (0.5 + Math.random() * 0.7).toFixed(2) + 's')
      bar.style.setProperty('--dly', (i * 0.055).toFixed(2) + 's')
      el.appendChild(bar)
    }
  }, [])

  // Auto-cycle phrases
  useEffect(() => {
    const t = setInterval(() => setPhraseIdx(i => (i + 1) % translations[currentLang].length), 4500)
    return () => clearInterval(t)
  }, [currentLang])

  // Viewer count animation
  useEffect(() => {
    const t = setInterval(() => setViewers(v => Math.max(4650, Math.min(5200, v + Math.floor(Math.random() * 7) - 3))), 2800)
    return () => clearInterval(t)
  }, [])

  function selectLang(lang) {
    setCaptionVisible(false)
    setTimeout(() => { setCurrentLang(lang); setPhraseIdx(0); setCaptionVisible(true) }, 200)
  }

  function handleCTASubmit() {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ctaEmail.trim())
    if (!valid) { setCtaError(true); setTimeout(() => setCtaError(false), 1800); return }
    saveLead({ email: ctaEmail.trim(), source: 'Hero CTA', page: '/' })
    setCtaSubmitted(true)
  }

  return (
    <>
      <SEO
        canonical="/"
        description="No interpreters. No hardware. Jabber translates your live stream into 10+ languages simultaneously with under 2-second latency. Free plan available — no credit card required."
        schema={HOME_SCHEMA}
      />
      {/* HERO */}
      <section className="hero" id="home">
        <canvas id="heroCanvas" ref={canvasRef} aria-hidden="true" />
        <div className="hero-bg-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />
        <div className="hero-orb hero-orb-3" aria-hidden="true" />
        {['EN','ES','FR','DE','JA','ZH','AR','PT','HI','KO','IT','RU','NL','TR','SV'].map((l,i) => (
          <div key={l} className={`lang-pill lp-${i+1}`} aria-hidden="true">{l}</div>
        ))}
        <div className="container hero-container">
          <div className="hero-left">
            <div className="hero-badge"><span className="pulse-dot" />Enterprise-Grade Infrastructure · Real-Time AI</div>
            <h1 className="hero-headline">
              No interpreters.<br />No hardware. Just<br />
              <span className="text-gradient">{typedWord}<span className="blink-cursor">|</span></span>
            </h1>
            <p className="hero-desc">Jabber delivers real-time transcription, translation, and audio to thousands of viewers — each in the language they choose. Serverless. Instant. Near-zero cost.</p>
            <div className="hero-btns">
              <Link to="/signup" className="btn btn-primary btn-lg">Get Early Access</Link>
              <Link to="/how-it-works" className="btn btn-ghost btn-lg">See how it works →</Link>
            </div>
            <div className="hero-checks">
              {['Serverless','Zero idle cost','Scales to thousands'].map(t => (
                <span key={t} className="check-item">
                  <svg className="check-icon" viewBox="0 0 16 16"><path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Player mockup */}
          <div className="hero-right">
            <div className="mockup-wrap">
              <div className="mockup-glow" aria-hidden="true" />
              <div className="float-card fc-1" aria-hidden="true"><span className="fc-lang">ES</span><span className="fc-text">"Bienvenidos al cumbre global..."</span></div>
              <div className="float-card fc-2" aria-hidden="true"><span className="fc-lang">FR</span><span className="fc-text">"Bienvenue au sommet mondial..."</span></div>
              <div className="player-card">
                <div className="player-header">
                  <div className="ph-brand">
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2C5.58 2 2 5.13 2 9C2 11.38 3.28 13.47 5.24 14.78L4.5 18L8.09 16.18C8.7 16.32 9.34 16.4 10 16.4C14.42 16.4 18 13.27 18 9.4C18 5.53 14.42 2 10 2Z" fill="#818CF8"/></svg>
                    <span>jabber</span>
                  </div>
                  <div className="live-pill"><span className="live-dot-red" />LIVE</div>
                  <div className="ph-viewers">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="2.8" stroke="#64748b" strokeWidth="1.5"/><path d="M2 14c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <span>{viewers.toLocaleString()}</span>
                  </div>
                </div>
                <div className="player-event-name">Global Tech Summit 2026</div>
                <div className="waveform-container"><div className="waveform" ref={waveformRef} /></div>
                <div className="lang-tabs-row">
                  {['en','es','fr','de'].map(l => (
                    <button key={l} className={`ltab${currentLang === l ? ' active' : ''}`} onClick={() => selectLang(l)}>{l.toUpperCase()}</button>
                  ))}
                  <button className="ltab ltab-more">+8</button>
                </div>
                <div className="caption-box">
                  <p className="caption-text" style={{ opacity: captionVisible ? 1 : 0, transition: 'opacity 0.2s' }}>{translations[currentLang][phraseIdx]}</p>
                  <div className="caption-meta">
                    <span className="cm-lang">{langLabels[currentLang]}</span>
                    <span className="cm-latency">⚡ 1.2s</span>
                  </div>
                </div>
                <div className="player-footer">
                  <button className="audio-btn">🔊 Audio On</button>
                  <div className="viewer-langs"><span>ES&nbsp;47</span><span>FR&nbsp;38</span><span>DE&nbsp;23</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="stats-strip">
        <div className="container">
          <div className="stats-row">
            <div className="stat"><div className="stat-number">&lt;&nbsp;2s</div><div className="stat-label">End-to-End Latency</div></div>
            <div className="stat-rule" />
            <div className="stat"><div className="stat-number">10+</div><div className="stat-label">Languages Supported</div></div>
            <div className="stat-rule" />
            <div className="stat"><div className="stat-number">∞</div><div className="stat-label">Concurrent Viewers</div></div>
            <div className="stat-rule" />
            <div className="stat"><div className="stat-number">$0</div><div className="stat-label">Idle Cost</div></div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="container">
          <div className="section-tag-wrap"><span className="section-tag">Features</span></div>
          <h2 className="section-title">Everything your global event needs</h2>
          <p className="section-desc">A complete real-time translation pipeline. Fully managed. Fully serverless.</p>
          <div className="features-grid">
            {[
              { color:'fi-blue', title:'Real-Time Transcription', desc:'AI-powered speech-to-text with automatic language detection and optional PII redaction. Interim and final transcripts delivered in real time.', icon:<><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0014 0"/><line x1="12" y1="17" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></> },
              { color:'fi-violet', title:'Parallel Translation', desc:'Transcripts fan out to 10+ languages simultaneously — zero sequential delay. Extend to new languages without touching a line of code.', icon:<><circle cx="5" cy="12" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 11.5l10-4.5M7 12h10M7 12.5l10 4.5"/></> },
              { color:'fi-cyan', title:'Voice Synthesis (TTS)', desc:'Natural-sounding audio synthesised in every target language. Every viewer hears a native voice — not robotic text-to-speech.', icon:<><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></> },
              { color:'fi-indigo', title:'Edge WebSocket Delivery', desc:'Translations pushed to millions of WebSocket connections globally. Session state maintained at the edge for zero-latency, personalised delivery.', icon:<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/> },
              { color:'fi-green', title:'Auto Scale to Zero', desc:'Containers spin up the moment you go LIVE, shut down completely when you stop. Your idle cost is literally $0. No reserved capacity wasted.', icon:<><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></> },
              { color:'fi-orange', title:'Viewer Language Control', desc:'Each viewer picks their preferred language via browser or app. They receive synchronized captions and audio — personalized, in real-time.', icon:<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></> },
            ].map(f => (
              <div key={f.title} className="feat-card reveal">
                <div className={`feat-icon-wrap ${f.color}`}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg>
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how-it-works">
        <div className="container">
          <div className="section-tag-wrap"><span className="section-tag">How It Works</span></div>
          <h2 className="section-title">Live in three steps</h2>
          <p className="section-desc">From your encoder to every viewer's screen — in seconds.</p>
          <div className="steps-row">
            <div className="step reveal">
              <div className="step-num">01</div>
              <div className="step-icon-box"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
              <h3>Broadcast Your Event</h3>
              <p>Stream with OBS or any RTMP encoder. Jabber's live ingest layer picks it up and triggers the entire pipeline automatically — no configuration needed.</p>
            </div>
            <div className="step-connector"><svg viewBox="0 0 80 20" fill="none" preserveAspectRatio="none"><path d="M0 10 Q20 2 40 10 Q60 18 80 10" stroke="#C7D2FE" strokeWidth="2" fill="none" strokeDasharray="4 3"/></svg></div>
            <div className="step reveal">
              <div className="step-num">02</div>
              <div className="step-icon-box"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
              <h3>AI Processes in Real Time</h3>
              <p>Jabber transcribes audio, detects language, translates into all configured languages, and synthesizes audio — all in parallel, in seconds.</p>
            </div>
            <div className="step-connector"><svg viewBox="0 0 80 20" fill="none" preserveAspectRatio="none"><path d="M0 10 Q20 2 40 10 Q60 18 80 10" stroke="#C7D2FE" strokeWidth="2" fill="none" strokeDasharray="4 3"/></svg></div>
            <div className="step reveal">
              <div className="step-num">03</div>
              <div className="step-icon-box"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
              <h3>Viewers Pick Their Language</h3>
              <p>Audience connects via browser or app. Each viewer selects their language and instantly receives synchronized captions and audio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="usecases-section" id="use-cases">
        <div className="container">
          <div className="section-tag-wrap"><span className="section-tag">Use Cases</span></div>
          <h2 className="section-title">Built for every global event</h2>
          <p className="section-desc">From intimate corporate calls to stadium-scale broadcasts.</p>
          <div className="uc-grid">
            {[
              { emoji:'🌐', title:'International Conferences', desc:'Give every delegate their native language in real time. No interpreter booths, no headsets — just a link.', tag:'Most Popular', featured:true },
              { emoji:'🏟️', title:'Live Sports Broadcasts', desc:"Commentary in every market's language, live. Engage global fanbases without localization teams." },
              { emoji:'🏢', title:'Corporate Town Halls', desc:'Connect your global workforce. Every employee hears leadership in their own language, in real time.' },
              { emoji:'⛪', title:'Religious & Cultural Events', desc:'Broadcast ceremonies and cultural events to diaspora communities worldwide. No barriers.' },
              { emoji:'🎓', title:'Online Education & Webinars', desc:"Every lecture, lesson, and Q&A in the learner's first language. Global reach, local feel." },
            ].map(u => (
              <div key={u.title} className={`uc-card${u.featured ? ' uc-featured' : ''} reveal`}>
                <div className="uc-stripe" /><div className="uc-emoji">{u.emoji}</div>
                <h3>{u.title}</h3><p>{u.desc}</p>
                {u.tag && <span className="uc-tag">{u.tag}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH / INFRASTRUCTURE */}
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

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <div className="section-tag-wrap"><span className="section-tag">FAQ</span></div>
          <h2 className="section-title">Common questions</h2>
          <div className="faq-grid">
            {[
              { q:'What is Jabber?', a:'Jabber is a real-time AI translation platform for live events. It connects to any RTMP stream and delivers simultaneous translation in 10+ languages to your viewers — with under 2 seconds of end-to-end latency. No interpreters or dedicated hardware required.' },
              { q:'Does it work with OBS?', a:'Yes. Jabber works with any RTMP-compatible encoder — OBS Studio, vMix, Wirecast, or hardware encoders. Just point your RTMP output at your Jabber stream key. Setup takes under 10 minutes.' },
              { q:'What languages are supported?', a:'10+ languages at launch: English, Spanish, French, German, Portuguese, Japanese, Chinese, Arabic, Hindi, Korean, Italian, Russian, Dutch, Turkish, and Swedish. More are added continuously.' },
              { q:'Is there a free plan?', a:'Yes. Every new account gets $100 worth of free credits — enough to run 1 event for 1 hour with up to 100 viewers in 2 languages. No credit card required.' },
              { q:'How low is the latency?', a:'Under 2 seconds end-to-end — from speech input to translated captions and audio reaching your viewers. AI transcription alone is under 500ms.' },
              { q:'How does billing work?', a:'Jabber uses a pay-as-you-go model billed per minute of active streaming. Your idle cost is literally $0 — containers spin up when you go live and shut down the moment you stop.' },
            ].map(({ q, a }) => (
              <div key={q} className="faq-item reveal">
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="get-started">
        <div className="cta-glow" aria-hidden="true" />
        <div className="container cta-inner">
          <div className="cta-badge">Early Access</div>
          <h2>Ready to go global?</h2>
          <p>Join the waitlist. We'll reach out with setup details within 24 hours.</p>
          <div className="cta-form">
            <input
              type="email" placeholder="you@company.com" className="cta-input"
              value={ctaEmail} onChange={e => setCtaEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCTASubmit()}
              style={ctaError ? { borderColor:'#f87171' } : {}}
              disabled={ctaSubmitted}
            />
            <button
              className="btn btn-white btn-lg"
              onClick={handleCTASubmit}
              disabled={ctaSubmitted}
              style={ctaSubmitted ? { background:'#22c55e', color:'#fff' } : {}}
            >
              {ctaSubmitted ? "✓ You're on the list!" : 'Get Early Access →'}
            </button>
          </div>
          <p className="cta-note">No credit card required · Free to get started · Cancel anytime</p>
        </div>
      </section>
    </>
  )
}
