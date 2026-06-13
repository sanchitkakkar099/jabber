import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import SEO from '../components/SEO'

export default function About() {
  useScrollReveal()
  return (
    <>
      <SEO
        title="About — Language Shouldn't Be a Barrier to Connection"
        description="Jabber was built to make every live event accessible in any language. Learn about our mission, team values, and why we believe real-time AI translation changes global communication."
        canonical="/about"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Jabber',
          description: 'Jabber is building infrastructure to make every live event accessible to everyone, everywhere, in their own language — instantly.',
          url: 'https://jabber-production.up.railway.app/about',
          mainEntity: {
            '@type': 'Organization',
            name: 'Jabber',
            description: 'Real-time AI translation SaaS for live events',
            url: 'https://jabber-production.up.railway.app',
            foundingDate: '2025',
            mission: 'Make language a non-issue for live events, so organisers can focus on the content and viewers can focus on the experience.'
          }
        }}
      />
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="section-tag-wrap"><span className="section-tag">About Jabber</span></div>
          <h1>Language shouldn't be a barrier to connection</h1>
          <p>We're building the infrastructure to make every live event accessible to everyone, everywhere, in their own language — instantly.</p>
        </div>
      </section>

      <section className="mission-section">
        <div className="container">
          <div className="mission-inner">
            <div className="mission-text reveal">
              <h2>Our mission</h2>
              <p>Every year, billions of people miss out on live events — conferences, ceremonies, broadcasts, town halls — simply because they don't speak the primary language. Traditional interpretation is expensive, logistically complex, and doesn't scale to the internet.</p>
              <p>We built Jabber to change that. Using the latest AI for transcription, translation, and voice synthesis, we deliver real-time multilingual access to any live stream — at a fraction of the cost of traditional solutions, with none of the infrastructure overhead.</p>
              <p>Our goal is simple: make language a non-issue for live events, so organisers can focus on the content and viewers can focus on the experience.</p>
              <Link to="/signup" className="btn btn-primary" style={{marginTop:8}}>Join early access</Link>
            </div>
            <div className="mission-visual reveal">
              <div className="mission-stat-big">10+</div>
              <div className="mission-stat-label">Languages supported at launch</div>
              <div className="mv-divider" />
              <div className="mission-stat-big">&lt; 2s</div>
              <div className="mission-stat-label">End-to-end translation latency</div>
              <div className="mv-divider" />
              <div className="mission-stat-big">$0</div>
              <div className="mission-stat-label">Cost when you're not live</div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <div className="section-tag-wrap"><span className="section-tag">Our Values</span></div>
          <h2 className="section-title">What we believe</h2>
          <p className="section-desc">These principles guide every decision we make — from product design to infrastructure choices.</p>
          <div className="values-grid">
            {[
              { icon:'⚡', title:'Speed is accessibility', desc:'A translation that arrives 5 seconds late might as well not exist. We obsess over latency because every millisecond matters when you\'re following a live conversation.' },
              { icon:'🌍', title:'Global by default', desc:'We design for the world, not a single market. Every feature we build is tested across languages, regions, and cultural contexts before it ships.' },
              { icon:'🔓', title:'Accessible pricing', desc:'Language access shouldn\'t be a luxury. We price Jabber to be within reach for non-profits, educational institutions, and community organisations — not just enterprises.' },
              { icon:'🔒', title:'Privacy by design', desc:'Live events often involve sensitive content. We build privacy protections in from the start — encrypted streams, optional PII redaction, and configurable data retention.' },
              { icon:'🛠️', title:'Builders first', desc:'We build for the event organisers and developers who use Jabber every day. Our API is a first-class product, not an afterthought. Documentation is part of the feature.' },
              { icon:'📈', title:'Honest about AI', desc:'AI translation isn\'t perfect. We show quality scores, flag uncertainty, and continuously improve our models. We won\'t oversell what the technology can do today.' },
            ].map(v => (
              <div key={v.title} className="value-card reveal">
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <div className="section-tag-wrap"><span className="section-tag">The Team</span></div>
          <h2 className="section-title">Built by people who care about language</h2>
          <p className="section-desc">We're a small team with deep experience in real-time infrastructure, AI, and live events.</p>
          <div className="team-grid">
            {[
              { initials:'AK', name:'Arjun Kapoor', role:'Co-founder & CEO', bio:'Former VP Engineering at a global events company. Spent 10 years frustrated by the cost of live interpretation.' },
              { initials:'ML', name:'Maya Lin', role:'Co-founder & CTO', bio:'ML researcher and systems engineer. Previously built real-time infrastructure at scale for two unicorn startups.' },
              { initials:'SP', name:'Sofia Petrov', role:'Head of AI', bio:'PhD in computational linguistics. Fluent in 5 languages. Has trained translation models used by millions daily.' },
              { initials:'JO', name:'James Osei', role:'Head of Product', bio:'Product leader with a background in broadcast media. Has produced live events for audiences of 500,000+.' },
            ].map(t => (
              <div key={t.name} className="team-card reveal">
                <div className="team-avatar">{t.initials}</div>
                <h4>{t.name}</h4>
                <div className="team-role">{t.role}</div>
                <p className="team-bio">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-glow" aria-hidden="true" />
        <div className="container cta-inner">
          <div className="cta-badge">We're hiring</div>
          <h2>Join us in breaking language barriers</h2>
          <p>We're a small team solving a big problem. If that excites you, we'd love to talk.</p>
          <div className="page-hero-cta" style={{marginTop:0}}>
            <Link to="/signup" className="btn btn-white btn-lg">Get early access</Link>
            <Link to="/contact" className="btn btn-lg" style={{color:'rgba(255,255,255,0.8)',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:8}}>Contact us →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
