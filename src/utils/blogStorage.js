import { posts as DEFAULT_POSTS } from '../data/posts'

const BLOG_KEY = 'jabber_blog'
const SEEDED   = 'jabber_blog_seeded'

function read() { try { return JSON.parse(localStorage.getItem(BLOG_KEY) || 'null') } catch { return null } }
function write(d) { localStorage.setItem(BLOG_KEY, JSON.stringify(d)) }

export function getBlogPosts() { return read() || DEFAULT_POSTS }

export function seedBlogPosts() {
  if (localStorage.getItem(SEEDED)) return
  write([...DEFAULT_POSTS])
  localStorage.setItem(SEEDED, '1')
}

export function saveBlogPost(post) {
  const all = getBlogPosts()
  const idx = all.findIndex(p => p.slug === post.slug)
  if (idx >= 0) { all[idx] = { ...post } } else { all.unshift({ ...post }) }
  write(all)
}

export function deleteBlogPost(slug) { write(getBlogPosts().filter(p => p.slug !== slug)) }

export function getRelatedBlogPosts(currentSlug, count = 3) {
  const all = getBlogPosts()
  const cur = all.find(p => p.slug === currentSlug)
  if (!cur) return all.slice(0, count)
  return [
    ...all.filter(p => p.slug !== currentSlug && p.category === cur.category),
    ...all.filter(p => p.slug !== currentSlug && p.category !== cur.category)
  ].slice(0, count)
}
