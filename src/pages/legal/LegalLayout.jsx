import SEO from '../../components/SEO'

/* Shared layout for legal/policy pages: page-hero + narrow prose body. */
export default function LegalLayout({ title, updated, description, canonical, children }) {
  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="section-tag-wrap"><span className="section-tag">Legal</span></div>
          <h1>{title}</h1>
          {updated && <p>Last updated: {updated}</p>}
        </div>
      </section>
      <section className="legal-section">
        <article className="legal-body prose">{children}</article>
      </section>
    </>
  )
}
