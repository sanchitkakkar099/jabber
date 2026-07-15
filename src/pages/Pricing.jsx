import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import SEO from '../components/SEO'
import { track } from '../utils/posthog'
import { getPlans } from '../utils/plans'

const CheckYes = () => <svg className="pf-icon yes" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
const CheckNo = () => <svg className="pf-icon no" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>

export default function Pricing() {
  useScrollReveal()
  const [plans, setPlans] = useState(getPlans())

  useEffect(() => {
    track('pricing_page_viewed')
    function onFocus() { setPlans(getPlans()) }
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [])
  return (
    <>
      <SEO
        title="Pricing — Free Starter, Pro & Enterprise Plans"
        description="Yadia pricing: free Starter plan (no credit card), Pro at $299/month, and Enterprise with custom pricing. Pay only when you're live — $0 idle cost."
        canonical="/pricing"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'Does Yadia have a free plan?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every new account gets $100 worth of free credits — enough to run 1 event for 1 hour with up to 100 viewers in 2 languages. No credit card required.' } },
            { '@type': 'Question', name: 'How much does the Pro plan cost?', acceptedAnswer: { '@type': 'Answer', text: 'The Pro plan costs $299 per month and includes up to 5,000 concurrent viewers, 10+ languages per event, unlimited streaming hours, custom branding, and full API access.' } },
            { '@type': 'Question', name: 'How does Yadia billing work?', acceptedAnswer: { '@type': 'Answer', text: 'Yadia charges per minute of active streaming. There is $0 idle cost — you only pay when your event is live. No reserved capacity, no wasted spend.' } },
            { '@type': 'Question', name: 'Is there an Enterprise plan?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Yadia Enterprise offers unlimited concurrent viewers, unlimited languages, a dedicated SLA, custom voice models, on-premise deployment options, and 24/7 priority support. Contact Yadia for custom pricing.' } }
          ]
        }}
      />
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="section-tag-wrap"><span className="section-tag">Pricing</span></div>
          <h1>Simple, transparent pricing</h1>
          <p>Pay only when you're live. Zero idle cost. Scale from a single event to stadium-size broadcasts — without changing plans.</p>
        </div>
      </section>

      <section className="pricing-section">
        <div className="container">
          <div className="pricing-grid">
            {plans.map(p => (
              <div key={p.id} className={`pricing-card reveal${p.featured ? ' featured' : ''}`}>
                {p.badge && <div className="pricing-badge">{p.badge}</div>}
                <div className="pricing-tier">{p.name}</div>
                <div className="pricing-price">
                  {p.showCurrency && <span className="price-currency">$</span>}
                  <span className="price-amount">{p.priceDisplay}</span>
                  {p.priceSuffix && <span className="price-period">&nbsp;{p.priceSuffix}</span>}
                </div>
                {p.priceNote && (
                  <div className="pricing-price-note">{p.priceNote}</div>
                )}
                <div className="pricing-desc">{p.desc}</div>
                <hr className="pricing-divider" />
                <ul className="pricing-features">
                  {p.features.map(f => (
                    <li key={f.text} className={f.yes ? 'pf-item' : 'pf-item muted'}>
                      {f.yes ? <CheckYes /> : <CheckNo />}{f.text}
                    </li>
                  ))}
                </ul>
                <Link
                  to={p.ctaLink}
                  className={`pricing-cta${p.ctaStyle === 'ghost' ? ' pricing-cta-ghost' : p.ctaStyle === 'solid' ? ' pricing-cta-solid' : ' pricing-cta-outline'}`}
                >
                  {p.ctaText}
                </Link>
              </div>
            ))}
          </div>

          {/* COMPARISON TABLE */}
          <div className="pricing-compare reveal">
            <div className="compare-title">Full feature comparison</div>
            <div className="compare-wrap">
              <table className="compare-table">
                <thead>
                  <tr><th style={{width:'40%'}}>Feature</th><th>Starter</th><th>Pro</th><th>Enterprise</th></tr>
                </thead>
                <tbody>
                  <tr className="section-row"><td colSpan="4">Capacity</td></tr>
                  <tr><td>Concurrent viewers</td><td>100</td><td>5,000</td><td className="check-custom">Unlimited</td></tr>
                  <tr><td>Languages per event</td><td>3</td><td>10+</td><td className="check-custom">All</td></tr>
                  <tr><td>Streaming hours / month</td><td>5 hrs</td><td className="check-custom">Unlimited</td><td className="check-custom">Unlimited</td></tr>
                  <tr className="section-row"><td colSpan="4">Translation</td></tr>
                  <tr><td>Real-time captions</td><td className="check-yes">✓</td><td className="check-yes">✓</td><td className="check-yes">✓</td></tr>
                  <tr><td>Audio translation (TTS)</td><td className="check-yes">✓</td><td className="check-yes">✓</td><td className="check-yes">✓</td></tr>
                  <tr><td>Custom voice models</td><td className="check-no">—</td><td className="check-no">—</td><td className="check-yes">✓</td></tr>
                  <tr><td>PII redaction</td><td className="check-no">—</td><td className="check-yes">✓</td><td className="check-yes">✓</td></tr>
                  <tr className="section-row"><td colSpan="4">Platform</td></tr>
                  <tr><td>Organiser dashboard</td><td className="check-yes">✓</td><td className="check-yes">✓</td><td className="check-yes">✓</td></tr>
                  <tr><td>Custom branding</td><td className="check-no">—</td><td className="check-yes">✓</td><td className="check-yes">✓</td></tr>
                  <tr><td>REST &amp; WebSocket API</td><td className="check-no">—</td><td className="check-yes">✓</td><td className="check-yes">✓</td></tr>
                  <tr><td>SSO / SAML</td><td className="check-no">—</td><td className="check-no">—</td><td className="check-yes">✓</td></tr>
                  <tr><td>Custom domain</td><td className="check-no">—</td><td className="check-no">—</td><td className="check-yes">✓</td></tr>
                  <tr className="section-row"><td colSpan="4">Support</td></tr>
                  <tr><td>Email support</td><td className="check-yes">✓</td><td className="check-yes">✓</td><td className="check-yes">✓</td></tr>
                  <tr><td>Priority support</td><td className="check-no">—</td><td className="check-yes">✓</td><td className="check-yes">✓</td></tr>
                  <tr><td>Dedicated account manager</td><td className="check-no">—</td><td className="check-no">—</td><td className="check-yes">✓</td></tr>
                  <tr><td>Uptime SLA</td><td className="check-no">—</td><td className="check-custom">99.9%</td><td className="check-custom">99.99%</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="section-tag-wrap"><span className="section-tag">FAQ</span></div>
          <h2 className="section-title">Pricing questions</h2>
          <div className="faq-grid">
            {[
              ['How exactly is usage billed?','New accounts get $100 in free credits — enough for 1 event, 1 hour, 100 viewers, 2 languages. Once credits are used, Pro plans unlock unlimited streaming. Enterprise pricing is negotiated based on volume.'],
              ['Is there really zero idle cost?','Yes. Your plan includes a monthly allotment of streaming hours. When you\'re not live, nothing is running and nothing is billed. You pay for active translation, not capacity.'],
              ['Can I switch plans mid-event?','Plans can be upgraded at any time and take effect immediately. Downgrading takes effect at the start of your next billing cycle.'],
              ['What happens if I exceed my viewer limit?','New viewers above your plan limit will see a waiting state. You can upgrade instantly from the dashboard to accommodate additional viewers without interrupting existing ones.'],
              ['Do you offer non-profit or academic discounts?','Yes. Non-profits, academic institutions, and registered charities receive 40% off Pro plans. Contact us with proof of status to apply the discount.'],
              ['What payment methods are accepted?','We accept all major credit and debit cards, and offer invoice-based billing for Enterprise customers. Annual plans receive a 20% discount.'],
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
          <h2>Start for free today</h2>
          <p>No credit card required. Go live in minutes.</p>
          <div className="page-hero-cta" style={{marginTop:0}}>
            <Link to="/signup" className="btn btn-white btn-lg">Create free account</Link>
            <Link to="/contact" className="btn btn-lg" style={{color:'rgba(255,255,255,0.8)',background:'rgba(255,255,255,0.1)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:8}}>Talk to sales →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
