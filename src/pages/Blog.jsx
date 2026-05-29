import { useState } from 'react'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import SEO from '../components/SEO'
import { getBlogPosts } from '../utils/blogStorage'

function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="blog-card reveal">
      <div className="blog-card-img-wrap">
        <img src={post.image} alt={post.title} loading="lazy" />
      </div>
      <div className="blog-card-body">
        <span className="blog-cat-pill">{post.category}</span>
        <h2 className="blog-card-title">{post.title}</h2>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <div className="blog-card-meta">
          <span>{post.author}</span>
          <span>·</span>
          <span>{new Date(post.date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  )
}

export default function Blog() {
  useScrollReveal()
  const posts = getBlogPosts()
  const CATEGORIES = ['All', ...Array.from(new Set(posts.map(p => p.category)))]
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? posts : posts.filter(p => p.category === active)

  return (
    <>
      <SEO
        title="Blog — Insights on Live Translation, AI & Global Events"
        description="Guides, explainers, and industry insights from the Jabber team — covering real-time AI translation, live event production, and multilingual audience engagement."
        canonical="/blog"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Jabber Blog',
          description: 'Insights on live translation, AI, and global events from the Jabber team',
          url: 'https://jabber.live/blog',
          publisher: { '@type': 'Organization', name: 'Jabber', url: 'https://jabber.live' }
        }}
      />

      <section className="page-hero">
        <div className="container page-hero-inner">
          <div className="section-tag-wrap"><span className="section-tag">Blog</span></div>
          <h1>Insights & Guides</h1>
          <p>Real-time translation, live event production, and the future of multilingual audiences — from the team building Jabber.</p>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">

          {/* Category filter */}
          <div className="blog-filter-row">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-pill${active === cat ? ' active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="blog-grid">
            {filtered.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
