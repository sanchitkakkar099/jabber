import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'
import SEO from '../components/SEO'

const cases = [
  { emoji:'🌐', title:'International Conferences', featured:true, tag:'Most Popular',
    desc:'Give every delegate their native language in real time. No interpreter booths, no headsets, no logistics nightmare — just a link. Yadia lets conference organizers offer 10+ languages simultaneously without any additional on-site infrastructure.',
    bullets:['No interpreter booths or equipment rental','Delegates join from anywhere via browser','Language selection mid-session','Full captions + audio translation'] },
  { emoji:'🏟️', title:'Live Sports Broadcasts',
    desc:"Commentary in every market's language, live. Engage global fanbases without localization teams or dubbing delays. Broadcast the same feed to audiences in dozens of countries, each hearing commentary in their own language.",
    bullets:['Real-time commentary translation','Massive concurrent viewer support','No dubbing studios or turnaround time','Works with existing OTT infrastructure'] },
  { emoji:'🏢', title:'Corporate Town Halls',
    desc:'Connect your global workforce. Every employee hears leadership in their own language, in real time. Run a single all-hands from HQ and have it translated simultaneously for your teams in Europe, Asia, and Latin America.',
    bullets:['Single stream, every office covered','Integrates with your video conferencing','Inclusive messaging for global teams','Transcript export for records'] },
  { emoji:'⛪', title:'Religious & Cultural Events',
    desc:'Broadcast ceremonies and cultural events to diaspora communities worldwide. No language barriers. Connect your community across continents, ensuring every member can follow services, ceremonies, and cultural programs in their first language.',
    bullets:['Reach diaspora communities globally','Respectful, accurate religious translations','Simple viewer link sharing','Free tier suitable for smaller communities'] },
  { emoji:'🎓', title:'Online Education & Webinars',
    desc:"Every lecture, lesson, and Q&A in the learner's first language. Global reach, local feel. Educators and course creators can expand their audience to non-English speakers without re-recording, dubbing, or hiring translators.",
    bullets:['Expand reach to new language markets','Live Q&A translation included','Caption export for accessibility compliance','No re-recording or post-production'] },
  { emoji:'🎙️', title:'Product Launches & Press Events',
    desc:'Make your product announcements accessible to global press and customers from day one. Live-translate keynotes, announcements, and press briefings so international media can cover your launch in real time, in their language.',
    bullets:['Global press coverage from day one','Simultaneous multi-language launch','No regional broadcast delay','Branded viewer experience'] },
]

export default function UseCases() {
  useScrollReveal()
  const [ctaEmail, setCtaEmail] = useState('')
  const [ctaSubmitted, setCtaSubmitted] = useState(false)
  const [ctaError, setCtaError] = useState(false)
  function handleCTA() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ctaEmail.trim())) { setCtaError(true); setTimeout(()=>setCtaError(false),1800); return }
    setCtaSubmitted(true)
  }

  return (
    <>
      <SEO
        title="Use Cases — Conferences, Town Halls, Sports, Worship & More"
        description="Yadia powers multilingual live events across conferences, corporate town halls, live sports, religious ceremonies, webinars, and press launches. Any live stream, every language."
        canonical="/use-cases"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Yadia Use Cases',
          description: 'Industries and event types that benefit from real-time live translation',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'International Conferences', description: 'Give every delegate their native language in real time — no interpreter booths or equipment' },
            { '@type': 'ListItem', position: 2, name: 'Live Sports Broadcasts', description: 'Commentary in every market language, live, for global fanbases' },
            { '@type': 'ListItem', position: 3, name: 'Corporate Town Halls', description: 'Connect your global workforce — every employee hears leadership in their own language' },
            { '@type': 'ListItem', position: 4, name: 'Religious & Cultural Events', description: 'Broadcast ceremonies to diaspora communities worldwide without language barriers' },
            { '@type': 'ListItem', position: 5, name: 'Online Education & Webinars', description: 'Every lecture in the learner\'s first language — expand reach without re-recording' },
            { '@type': 'ListItem', position: 6, name: 'Product Launches & Press Events', description: 'Live-translate announcements to global press and customers from day one' }
          ]
        }}
      />
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="section-tag-wrap"><span className="section-tag">Use Cases</span></div>
          <h1>Built for every global event</h1>
          <p>From intimate corporate calls to stadium-scale broadcasts, Yadia makes every event accessible to every viewer — in their own language.</p>
        </div>
      </section>

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

      <section className="uc-expanded">
        <div className="container">
          <div className="uc-expanded-grid">
            {cases.map(c => (
              <div key={c.title} className={`uc-expanded-card${c.featured ? ' featured' : ''} reveal`}>
                <div className="uc-stripe" />
                <div className="uc-emoji">{c.emoji}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <div className="uc-bullets">
                  {c.bullets.map(b => <div key={b} className="uc-bullet">{b}</div>)}
                </div>
                {c.tag && <span className="uc-tag" style={{marginTop:16}}>{c.tag}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-glow" aria-hidden="true" />
        <div className="container cta-inner">
          <div className="cta-badge">Early Access</div>
          <h2>What's your event?</h2>
          <p>Whatever you're broadcasting, we can translate it. Join the waitlist and we'll set you up within 24 hours.</p>
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
