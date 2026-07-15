import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'
import SEO from '../components/SEO'
import { getBlogPosts, getRelatedBlogPosts } from '../utils/blogStorage'
import { track } from '../utils/posthog'

export default function BlogPost() {
  useScrollReveal()
  const { slug } = useParams()
  const posts = getBlogPosts()
  const post = posts.find(p => p.slug === slug)

  useEffect(() => {
    if (post) track('blog_post_viewed', { slug: post.slug, title: post.title, category: post.category })
  }, [post?.slug])

  if (!post) {
    return (
      <div className="not-found-wrap">
        <h1>Post not found</h1>
        <p>The article you're looking for doesn't exist or has been moved.</p>
        <Link to="/blog" className="btn btn-primary">← Back to Blog</Link>
      </div>
    )
  }

  const related = getRelatedBlogPosts(post.slug, 3)

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'Yadia', url: 'https://jabber-production.up.railway.app', logo: 'https://jabber-production.up.railway.app/logo.png' },
    url: `https://jabber-production.up.railway.app/blog/${post.slug}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://jabber-production.up.railway.app/blog/${post.slug}` }
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        ogImage={post.image}
        schema={articleSchema}
      />

      <div className="blog-post-wrap">
        {/* Back link */}
        <div className="container">
          <Link to="/blog" className="blog-back-link">← Back to Blog</Link>
        </div>

        {/* Header */}
        <div className="blog-post-header container">
          <span className="blog-cat-pill">{post.category}</span>
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <span>{post.author}</span>
            <span className="meta-dot">·</span>
            <span>{new Date(post.date).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}</span>
            <span className="meta-dot">·</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Featured image */}
        <div className="container">
          <img
            src={post.image}
            alt={post.title}
            className="blog-post-featured"
          />
        </div>

        {/* Article body */}
        <div className="blog-post-body container">
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* CTA */}
        <section className="blog-post-cta">
          <div className="container blog-post-cta-inner">
            <h2>Ready to go multilingual?</h2>
            <p>Set up real-time translation for your next live event in under 10 minutes. Free to start — no credit card required.</p>
            <Link to="/signup" className="btn btn-primary btn-lg">Get Early Access →</Link>
          </div>
        </section>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="related-section">
            <div className="container">
              <h2 className="related-title">More from the blog</h2>
              <div className="related-grid">
                {related.map(p => (
                  <Link to={`/blog/${p.slug}`} key={p.slug} className="blog-card">
                    <div className="blog-card-img-wrap">
                      <img src={p.image} alt={p.title} loading="lazy" />
                    </div>
                    <div className="blog-card-body">
                      <span className="blog-cat-pill">{p.category}</span>
                      <h3 className="blog-card-title">{p.title}</h3>
                      <div className="blog-card-meta">
                        <span>{new Date(p.date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</span>
                        <span>·</span>
                        <span>{p.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
