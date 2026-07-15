import { useState } from 'react'
import { saveBlogPost, deleteBlogPost, getBlogPosts } from '../utils/blogStorage'

const CATEGORIES = ['Industry', 'Technical', 'Guide', 'Strategy', 'Use Case', 'Tutorial', 'Technology', 'Events']

const TODAY = new Date().toISOString().slice(0, 10)

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const PROMPT_TEMPLATE = (topic) => `Write a blog post for Yadia (a real-time AI translation platform for live events) about: ${topic}

Return ONLY valid JSON in this exact format:
{
  "title": "...",
  "excerpt": "one paragraph summary under 200 chars",
  "category": "one of: Industry | Technical | Guide | Strategy | Use Case",
  "author": "Yadia Team",
  "readTime": "X min read",
  "image": "https://images.unsplash.com/photo-XXXXXXXXXX?w=1200&h=630&fit=crop&auto=format&q=80",
  "content": "<h2>...</h2><p>...</p>..."
}

Content should be 600-900 words, use <h2> for section headings, <p> for paragraphs, <ul>/<li> for lists, <strong> for emphasis. Write in a professional but approachable tone. Focus on practical value for event organisers.`

const EMPTY_FORM = {
  title: '',
  slug: '',
  category: 'Industry',
  author: 'Yadia Team',
  date: TODAY,
  readTime: '',
  image: '',
  excerpt: '',
  content: '',
}

export default function AdminBlogEditor({ onRefresh }) {
  const [posts, setPosts] = useState(getBlogPosts())
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null) // null = not editing, {} = new/edit form
  const [form, setForm] = useState(EMPTY_FORM)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [claudeOpen, setClaudeOpen] = useState(false)
  const [claudeTopic, setClaudeTopic] = useState('')
  const [claudePaste, setClaudePaste] = useState('')
  const [copied, setCopied] = useState(false)

  function reload() {
    setPosts(getBlogPosts())
    if (onRefresh) onRefresh()
  }

  function startNew() {
    setForm({ ...EMPTY_FORM, date: TODAY })
    setEditing('new')
    setClaudeOpen(false)
    setClaudePaste('')
  }

  function startEdit(post) {
    setForm({ ...post })
    setEditing(post.slug)
    setClaudeOpen(false)
    setClaudePaste('')
  }

  function cancelEdit() {
    setEditing(null)
    setForm(EMPTY_FORM)
    setDeleteConfirm(null)
  }

  function handleFormChange(field, value) {
    setForm(prev => {
      const next = { ...prev, [field]: value }
      if (field === 'title' && (editing === 'new' || prev.slug === slugify(prev.title))) {
        next.slug = slugify(value)
      }
      return next
    })
  }

  function handleSave(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.slug.trim()) return
    saveBlogPost({ ...form })
    reload()
    cancelEdit()
  }

  function handleDelete(slug) {
    deleteBlogPost(slug)
    reload()
    setDeleteConfirm(null)
    if (editing === slug) cancelEdit()
  }

  function copyPrompt() {
    const prompt = PROMPT_TEMPLATE(claudeTopic || '[TOPIC]')
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function applyClaudeResponse() {
    try {
      const json = JSON.parse(claudePaste.trim())
      const title = json.title || form.title
      setForm(prev => ({
        ...prev,
        title: json.title || prev.title,
        slug: editing === 'new' ? slugify(title) : prev.slug,
        category: json.category || prev.category,
        author: json.author || prev.author,
        readTime: json.readTime || prev.readTime,
        image: json.image || prev.image,
        excerpt: json.excerpt || prev.excerpt,
        content: json.content || prev.content,
      }))
      setClaudePaste('')
      setClaudeOpen(false)
    } catch {
      alert('Could not parse JSON. Make sure you pasted only the JSON block from Claude.')
    }
  }

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.author || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* List header */}
      <div className="adm-blog-list-header">
        <input
          className="adm-search"
          placeholder="Search posts…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 280 }}
        />
        <button className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }} onClick={startNew}>
          + New Post
        </button>
      </div>

      {/* Table */}
      <div className="adm-card">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>No posts found</td></tr>
            )}
            {filtered.map(p => (
              <tr key={p.slug}>
                <td style={{ fontWeight: 600, maxWidth: 320 }}>{p.title}</td>
                <td className="adm-td-muted">{p.category}</td>
                <td className="adm-td-muted">{p.date}</td>
                <td className="adm-td-muted">{p.author}</td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="adm-btn-mini" onClick={() => startEdit(p)}>Edit</button>
                    <button
                      className="adm-btn-mini"
                      style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fecaca' }}
                      onClick={() => setDeleteConfirm(p.slug)}
                    >
                      Delete
                    </button>
                  </div>
                  {deleteConfirm === p.slug && (
                    <div className="adm-delete-confirm">
                      <p>Delete "{p.title}"? This cannot be undone.</p>
                      <button
                        className="btn btn-primary"
                        style={{ background: '#ef4444', padding: '6px 14px', fontSize: '0.8rem' }}
                        onClick={() => handleDelete(p.slug)}
                      >
                        Confirm Delete
                      </button>
                      <button
                        className="adm-btn-outline"
                        style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                        onClick={() => setDeleteConfirm(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit / New form */}
      {editing !== null && (
        <form className="adm-blog-form" onSubmit={handleSave}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>
              {editing === 'new' ? 'New Post' : 'Edit Post'}
            </h3>
            <button type="button" className="adm-btn-outline" style={{ padding: '5px 12px', fontSize: '0.8rem' }} onClick={cancelEdit}>
              Cancel
            </button>
          </div>

          {/* Row 1: Title */}
          <div className="adm-blog-form-group">
            <label>Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => handleFormChange('title', e.target.value)}
              required
              placeholder="Blog post title"
            />
          </div>

          {/* Row 2: Slug + Category */}
          <div className="adm-blog-form-row">
            <div className="adm-blog-form-group">
              <label>Slug *</label>
              <input
                type="text"
                value={form.slug}
                onChange={e => handleFormChange('slug', e.target.value)}
                required
                placeholder="url-friendly-slug"
              />
            </div>
            <div className="adm-blog-form-group">
              <label>Category</label>
              <select
                value={form.category}
                onChange={e => handleFormChange('category', e.target.value)}
                style={{ padding: '9px 12px', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: '0.875rem', fontFamily: 'inherit', background: '#fff' }}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Row 3: Author + Date */}
          <div className="adm-blog-form-row">
            <div className="adm-blog-form-group">
              <label>Author</label>
              <input
                type="text"
                value={form.author}
                onChange={e => handleFormChange('author', e.target.value)}
                placeholder="Yadia Team"
              />
            </div>
            <div className="adm-blog-form-group">
              <label>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={e => handleFormChange('date', e.target.value)}
              />
            </div>
          </div>

          {/* Row 4: Read Time + Image URL */}
          <div className="adm-blog-form-row">
            <div className="adm-blog-form-group">
              <label>Read Time</label>
              <input
                type="text"
                value={form.readTime}
                onChange={e => handleFormChange('readTime', e.target.value)}
                placeholder="6 min read"
              />
            </div>
            <div className="adm-blog-form-group">
              <label>Image URL</label>
              <input
                type="text"
                value={form.image}
                onChange={e => handleFormChange('image', e.target.value)}
                placeholder="https://images.unsplash.com/..."
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="adm-blog-form-group">
            <label>Excerpt</label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={e => handleFormChange('excerpt', e.target.value)}
              placeholder="One paragraph summary…"
            />
          </div>

          {/* Content */}
          <div className="adm-blog-form-group">
            <label>Content (HTML)</label>
            <textarea
              rows={16}
              value={form.content}
              onChange={e => handleFormChange('content', e.target.value)}
              placeholder="<h2>Section heading</h2><p>Paragraph text…</p>"
            />
          </div>

          <div className="adm-blog-form-actions">
            <button type="submit" className="btn btn-primary" style={{ padding: '9px 22px', fontSize: '0.875rem' }}>
              Save Post
            </button>
            <button type="button" className="adm-btn-outline" style={{ padding: '9px 16px', fontSize: '0.875rem' }} onClick={cancelEdit}>
              Cancel
            </button>
          </div>

          {/* Claude prompt section */}
          <div className="adm-claude-section">
            <div className="adm-claude-header" onClick={() => setClaudeOpen(o => !o)}>
              <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>✨ Generate with Claude</span>
              <span style={{ fontSize: '0.75rem', color: '#7c3aed' }}>{claudeOpen ? '▲ Collapse' : '▼ Expand'}</span>
            </div>
            {claudeOpen && (
              <div className="adm-claude-body">
                <div className="adm-claude-row">
                  <input
                    type="text"
                    className="adm-search"
                    style={{ flex: 1 }}
                    placeholder="Blog topic (e.g. 'how to run a multilingual conference')"
                    value={claudeTopic}
                    onChange={e => setClaudeTopic(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ padding: '8px 16px', fontSize: '0.82rem', flexShrink: 0 }}
                    onClick={copyPrompt}
                  >
                    {copied ? '✓ Copied!' : 'Copy Prompt'}
                  </button>
                </div>
                <div className="adm-claude-prompt-box">{PROMPT_TEMPLATE(claudeTopic || '[TOPIC]')}</div>
                <div className="adm-blog-form-group">
                  <label>Paste Claude Response (JSON)</label>
                  <textarea
                    rows={6}
                    value={claudePaste}
                    onChange={e => setClaudePaste(e.target.value)}
                    placeholder={'{\n  "title": "...",\n  "content": "..."\n}'}
                    style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: '8px 18px', fontSize: '0.82rem', background: '#7c3aed' }}
                  onClick={applyClaudeResponse}
                  disabled={!claudePaste.trim()}
                >
                  Apply to Form
                </button>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
