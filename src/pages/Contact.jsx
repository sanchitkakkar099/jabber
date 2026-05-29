import { useState } from 'react'
import useScrollReveal from '../hooks/useScrollReveal'

export default function Contact() {
  useScrollReveal()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ firstName:'', lastName:'', email:'', company:'', subject:'', message:'' })
  function set(k) { return e => setForm(f=>({...f,[k]:e.target.value})) }
  function handleSubmit(e) { e.preventDefault(); setSubmitted(true) }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="section-tag-wrap"><span className="section-tag">Contact</span></div>
          <h1>Get in touch</h1>
          <p>Join the early access waitlist, ask a question, or talk to us about enterprise requirements. We reply within 24 hours.</p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-inner">
            <div className="contact-info-col reveal">
              <h3>We'd love to hear from you</h3>
              <p>Whether you're planning your first multilingual event or evaluating Jabber for enterprise deployment, we're happy to answer questions, offer a demo, or help you get set up.</p>
              <div className="contact-detail">
                <div className="cd-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                <span>hello@jabber.ai</span>
              </div>
              <div className="contact-detail">
                <div className="cd-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
                <span>Remote-first — Global</span>
              </div>
              <div className="contact-detail">
                <div className="cd-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                <span>Response time: within 24 hours</span>
              </div>
              <div style={{marginTop:32}}>
                <div className="section-tag-wrap" style={{justifyContent:'flex-start',marginBottom:14}}><span className="section-tag">Enterprise</span></div>
                <p style={{fontSize:'0.875rem',color:'var(--slate-500)',lineHeight:1.65}}>Need a demo, custom pricing, or a proof-of-concept for your organisation? Our sales team works with event companies, media groups, and enterprises. We'll get back to you same day.</p>
              </div>
            </div>

            <div className="contact-form-card reveal">
              <h3>Send us a message</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group"><label className="form-label" htmlFor="firstName">First name</label><input type="text" id="firstName" className="form-input" placeholder="Alex" required value={form.firstName} onChange={set('firstName')} disabled={submitted} /></div>
                  <div className="form-group"><label className="form-label" htmlFor="lastName">Last name</label><input type="text" id="lastName" className="form-input" placeholder="Smith" required value={form.lastName} onChange={set('lastName')} disabled={submitted} /></div>
                </div>
                <div className="form-group"><label className="form-label" htmlFor="cemail">Work email</label><input type="email" id="cemail" className="form-input" placeholder="you@company.com" required value={form.email} onChange={set('email')} disabled={submitted} /></div>
                <div className="form-group"><label className="form-label" htmlFor="company">Company / Organisation</label><input type="text" id="company" className="form-input" placeholder="Acme Events Ltd" value={form.company} onChange={set('company')} disabled={submitted} /></div>
                <div className="form-group">
                  <label className="form-label" htmlFor="subject">What can we help with?</label>
                  <select id="subject" className="form-input" value={form.subject} onChange={set('subject')} disabled={submitted}>
                    <option value="">Select a topic…</option>
                    <option value="early-access">Join early access waitlist</option>
                    <option value="demo">Request a demo</option>
                    <option value="enterprise">Enterprise / custom pricing</option>
                    <option value="technical">Technical question</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group"><label className="form-label" htmlFor="message">Message</label><textarea id="message" className="form-input" rows="4" placeholder="Tell us about your event or question…" style={{resize:'vertical'}} value={form.message} onChange={set('message')} disabled={submitted} /></div>
                <button type="submit" className="btn btn-primary contact-submit" disabled={submitted} style={submitted?{background:'#22c55e'}:{}}>{submitted ? '✓ Message sent!' : 'Send message'}</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="section-tag-wrap"><span className="section-tag">FAQ</span></div>
          <h2 className="section-title">Quick answers</h2>
          <div className="faq-grid">
            {[
              ['How quickly can I get started?','Once on the early access list, we typically onboard new users within 24 hours. Setup for your first event takes under 10 minutes.'],
              ['Do you offer a free trial?','Yes. Our Starter plan is free with no credit card required. It includes 5 hours of streaming per month with up to 3 languages and 100 viewers.'],
              ['Can I see a live demo?','Absolutely. Book a 30-minute demo call with our team and we\'ll walk you through the product live, including a real translation demo.'],
              ['Do you have a partner or reseller programme?','We\'re actively building our partner network. If you run an event production company or AV integration business, reach out to discuss partnership opportunities.'],
            ].map(([q,a]) => (
              <div key={q} className="faq-item reveal"><h4>{q}</h4><p>{a}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
