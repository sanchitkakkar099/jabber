import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getLeads, getSignups, updateLeadStatus, updateSignupStatus, exportCSV, seedDemoData } from '../utils/leads'

const ADMIN_PASS  = 'jabber@2026'
const SESSION_KEY = 'jabber_admin_auth'

// ── Mock analytics (static — replace with real analytics SDK later) ───────────
const WEEKLY_VIEWS = [
  { day:'Mon', views:234 }, { day:'Tue', views:312 }, { day:'Wed', views:287 },
  { day:'Thu', views:401 }, { day:'Fri', views:356 }, { day:'Sat', views:189 }, { day:'Sun', views:145 }
]
const SOURCES = [
  { label:'Organic Search', pct:42, color:'#6366f1' },
  { label:'Direct',         pct:28, color:'#8b5cf6' },
  { label:'Social',         pct:18, color:'#06b6d4' },
  { label:'Referral',       pct:12, color:'#22c55e' },
]
const TOP_PAGES = [
  { page:'/', title:'Home',         views:1847, conv:'4.8%' },
  { page:'/pricing',   title:'Pricing',      views:623,  conv:'7.2%' },
  { page:'/features',  title:'Features',     views:512,  conv:'3.1%' },
  { page:'/how-it-works', title:'How It Works', views:401, conv:'3.9%' },
  { page:'/blog',      title:'Blog',         views:298,  conv:'2.4%' },
  { page:'/use-cases', title:'Use Cases',    views:234,  conv:'1.8%' },
]
const BLOG_POSTS = [
  { title:'The Hidden Cost of Live Interpretation',          views:412, leads:18, conv:'4.4%' },
  { title:'How to Add Translation to Any OBS Stream',        views:381, leads:24, conv:'6.3%' },
  { title:'Why Sub-2-Second Latency Matters',                views:267, leads:9,  conv:'3.4%' },
  { title:'5 Events That Went Global with Multilingual Streaming', views:231, leads:11, conv:'4.8%' },
  { title:'Jabber vs. Traditional Interpretation',           views:198, leads:14, conv:'7.1%' },
  { title:'The Future of Live Events Is Multilingual',       views:176, leads:7,  conv:'4.0%' },
]
const FUNNEL = [
  { stage:'Website Visitors', n:1924, pct:100 },
  { stage:'CTA Interactions',  n:487,  pct:25  },
  { stage:'Email Captured',    n:203,  pct:11  },
  { stage:'Signed Up',         n:89,   pct:5   },
]

// ── Utilities ─────────────────────────────────────────────────────────────────
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })
}
function daysAgo(iso) {
  const d = Math.floor((Date.now() - new Date(iso)) / 86400000)
  if (d === 0) return 'Today'
  if (d === 1) return 'Yesterday'
  return `${d}d ago`
}
const STATUS_COLORS = {
  new:        { bg:'#eff6ff', color:'#3b82f6' },
  contacted:  { bg:'#f0fdf4', color:'#22c55e' },
  interested: { bg:'#fefce8', color:'#ca8a04' },
  waitlist:   { bg:'#f5f3ff', color:'#7c3aed' },
  converted:  { bg:'#f0fdf4', color:'#16a34a' },
  lost:       { bg:'#fef2f2', color:'#ef4444' },
}
function StatusBadge({ status }) {
  const s = STATUS_COLORS[status] || STATUS_COLORS.new
  return (
    <span style={{ background:s.bg, color:s.color, padding:'2px 10px', borderRadius:999, fontSize:'0.72rem', fontWeight:700, textTransform:'capitalize' }}>
      {status}
    </span>
  )
}

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const Icon = {
  overview:  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  leads:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  signups:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  analytics: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  blog:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  plans:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  email:     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 13.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 2.84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 10.1a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  signout:   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
}

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onAuth }) {
  const [pass, setPass]   = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  function attempt(e) {
    e.preventDefault()
    if (pass === ADMIN_PASS) { onAuth() }
    else {
      setError(true); setShake(true)
      setTimeout(() => { setError(false); setShake(false); setPass('') }, 1400)
    }
  }

  return (
    <div className="adm-login-bg">
      <div className={`adm-login-card${shake ? ' shake' : ''}`}>
        <img src="/logo.png" alt="Jabber" style={{ height:64, marginBottom:24, display:'block', margin:'0 auto 24px' }} />
        <h1 style={{ fontSize:'1.4rem', fontWeight:800, color:'#0f172a', marginBottom:6, textAlign:'center' }}>Admin Access</h1>
        <p style={{ fontSize:'0.85rem', color:'#64748b', textAlign:'center', marginBottom:28 }}>Enter your admin password to continue</p>
        <form onSubmit={attempt}>
          <input
            type="password"
            className="form-input"
            placeholder="Password"
            value={pass}
            onChange={e => setPass(e.target.value)}
            autoFocus
            style={error ? { borderColor:'#ef4444', background:'#fef2f2' } : {}}
          />
          {error && <p style={{ color:'#ef4444', fontSize:'0.8rem', marginTop:6 }}>Incorrect password</p>}
          <button type="submit" className="btn btn-primary" style={{ width:'100%', marginTop:16, padding:'12px' }}>
            Sign In →
          </button>
        </form>
        <p style={{ textAlign:'center', marginTop:20, fontSize:'0.78rem', color:'#94a3b8' }}>
          <Link to="/" style={{ color:'#6366f1' }}>← Back to Jabber</Link>
        </p>
      </div>
    </div>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key:'overview',  label:'Overview',   icon:'overview'  },
  { key:'leads',     label:'Leads',      icon:'leads'     },
  { key:'signups',   label:'Signups',    icon:'signups'   },
  { key:'analytics', label:'Analytics',  icon:'analytics' },
  { key:'blog',      label:'Blog',       icon:'blog'      },
  { key:'plans',     label:'Plans',      icon:'plans'     },
]
const COMING_SOON = [
  { label:'Email Sequences', icon:'email'  },
  { label:'Payments / MRR',  icon:'plans'  },
  { label:'Support Tickets', icon:'signups'},
]

function Sidebar({ active, setActive, onSignOut, counts }) {
  return (
    <aside className="adm-sidebar">
      <div className="adm-sidebar-logo">
        <img src="/logo.png" alt="Jabber" style={{ height:36, filter:'brightness(0) invert(1)' }} />
        <span className="adm-sidebar-badge">Admin</span>
      </div>

      <nav className="adm-nav">
        <div className="adm-nav-label">Main</div>
        {NAV_ITEMS.map(item => (
          <button
            key={item.key}
            className={`adm-nav-item${active === item.key ? ' active' : ''}`}
            onClick={() => setActive(item.key)}
          >
            <span className="adm-nav-icon">{Icon[item.icon]}</span>
            <span>{item.label}</span>
            {item.key === 'leads'   && counts.leads   > 0 && <span className="adm-nav-count">{counts.leads}</span>}
            {item.key === 'signups' && counts.signups > 0 && <span className="adm-nav-count">{counts.signups}</span>}
          </button>
        ))}

        <div className="adm-nav-label" style={{ marginTop:24 }}>Coming Soon</div>
        {COMING_SOON.map(item => (
          <div key={item.label} className="adm-nav-item adm-nav-disabled">
            <span className="adm-nav-icon">{Icon[item.icon]}</span>
            <span>{item.label}</span>
            <span className="adm-nav-soon">Soon</span>
          </div>
        ))}
      </nav>

      <div className="adm-sidebar-footer">
        <a href="https://jabber.live" target="_blank" rel="noreferrer" className="adm-nav-item" style={{ textDecoration:'none' }}>
          <span className="adm-nav-icon">{Icon.overview}</span>
          <span>View Site</span>
        </a>
        <button className="adm-nav-item" onClick={onSignOut} style={{ color:'#f87171' }}>
          <span className="adm-nav-icon" style={{ color:'#f87171' }}>{Icon.signout}</span>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

// ── KPI Card ─────────────────────────────────────────────────────────────────
function KPI({ label, value, sub, color = '#6366f1', icon }) {
  return (
    <div className="adm-kpi">
      <div className="adm-kpi-top">
        <span className="adm-kpi-label">{label}</span>
        <span className="adm-kpi-icon" style={{ background: color + '18', color }}>{icon}</span>
      </div>
      <div className="adm-kpi-value" style={{ color }}>{value}</div>
      {sub && <div className="adm-kpi-sub">{sub}</div>}
    </div>
  )
}

// ── Overview ─────────────────────────────────────────────────────────────────
function Overview({ leads, signups }) {
  const newLeads    = leads.filter(l => l.status === 'new').length
  const thisWeek    = leads.filter(l => (Date.now() - new Date(l.date)) < 7*86400000).length
  const convRate    = leads.length ? ((signups.length / leads.length) * 100).toFixed(1) : '0.0'
  const recent      = [...leads, ...signups.map(s => ({ ...s, email: s.email, source: 'Signup Form', isSignup: true }))]
    .sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 8)

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h1 className="adm-page-title">Overview</h1>
          <p className="adm-page-sub">Welcome back — here's what's happening with Jabber.</p>
        </div>
        <span className="adm-date">{new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</span>
      </div>

      {/* KPIs */}
      <div className="adm-kpi-grid">
        <KPI label="Total Leads"    value={leads.length}   sub={`${newLeads} new, uncontacted`} color="#6366f1"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
        />
        <KPI label="This Week"      value={thisWeek}       sub="leads in last 7 days"           color="#8b5cf6"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
        />
        <KPI label="Signups"        value={signups.length} sub="on waitlist"                    color="#06b6d4"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
        />
        <KPI label="Conversion Rate" value={`${convRate}%`} sub="leads → signups"               color="#22c55e"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
        />
      </div>

      {/* Funnel */}
      <div className="adm-card" style={{ marginBottom:24 }}>
        <h3 className="adm-card-title">Conversion Funnel <span className="adm-card-note">last 30 days · estimated</span></h3>
        <div className="adm-funnel">
          {FUNNEL.map((f, i) => (
            <div key={f.stage} className="adm-funnel-row">
              <div className="adm-funnel-label">
                <span>{f.stage}</span>
                <span className="adm-funnel-n">{f.n.toLocaleString()}</span>
              </div>
              <div className="adm-funnel-bar-bg">
                <div className="adm-funnel-bar" style={{ width:`${f.pct}%`, opacity: 1 - i*0.15 }} />
              </div>
              <span className="adm-funnel-pct">{f.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="adm-card">
        <h3 className="adm-card-title">Recent Activity</h3>
        <table className="adm-table">
          <thead><tr><th>Email</th><th>Type</th><th>Source</th><th>When</th><th>Status</th></tr></thead>
          <tbody>
            {recent.map(r => (
              <tr key={r.id}>
                <td className="adm-td-email">{r.email}</td>
                <td><span className="adm-type-badge" style={{ background: r.isSignup ? '#eff6ff' : '#f0fdf4', color: r.isSignup ? '#3b82f6' : '#16a34a' }}>{r.isSignup ? 'Signup' : 'Lead'}</span></td>
                <td className="adm-td-muted">{r.source}</td>
                <td className="adm-td-muted">{daysAgo(r.date)}</td>
                <td><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Suggestion banner */}
      <div className="adm-suggest">
        <div className="adm-suggest-icon">💡</div>
        <div>
          <strong>Suggestions to grow faster</strong>
          <ul className="adm-suggest-list">
            <li>Connect a <strong>Mailchimp or ConvertKit</strong> account to auto-enrol leads into an email sequence</li>
            <li>Add <strong>UTM parameters</strong> to your social/ad links to track which channels convert best</li>
            <li>Set up <strong>Zapier</strong> to ping a Slack channel every time a new lead or signup comes in</li>
            <li>Add a <strong>Calendly link</strong> to your contacted follow-up emails to book demo calls faster</li>
            <li>A/B test your hero CTA copy — "Get Early Access" vs "Start Free" vs "Try It Free"</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// ── Leads ─────────────────────────────────────────────────────────────────────
function LeadsSection({ leads, onStatusChange, onRefresh }) {
  const [search,  setSearch]  = useState('')
  const [filter,  setFilter]  = useState('all')
  const [sortDir, setSortDir] = useState('desc')

  const STATUSES = ['all','new','contacted','interested','converted','lost']

  const filtered = leads
    .filter(l => filter === 'all' || l.status === filter)
    .filter(l => l.email.toLowerCase().includes(search.toLowerCase()) || l.source.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => sortDir === 'desc' ? new Date(b.date)-new Date(a.date) : new Date(a.date)-new Date(b.date))

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h1 className="adm-page-title">Leads</h1>
          <p className="adm-page-sub">{leads.length} total · {leads.filter(l=>l.status==='new').length} new</p>
        </div>
        <button className="adm-btn-outline" onClick={() => exportCSV(leads, 'jabber-leads.csv')}>
          ↓ Export CSV
        </button>
      </div>

      <div className="adm-card">
        {/* Toolbar */}
        <div className="adm-toolbar">
          <input className="adm-search" placeholder="Search email or source…" value={search} onChange={e=>setSearch(e.target.value)} />
          <div className="adm-filter-pills">
            {STATUSES.map(s => (
              <button key={s} className={`adm-filter-pill${filter===s?' active':''}`} onClick={()=>setFilter(s)}>
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase()+s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <table className="adm-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Source</th>
              <th>Page</th>
              <th style={{cursor:'pointer'}} onClick={()=>setSortDir(d=>d==='desc'?'asc':'desc')}>
                Date {sortDir==='desc'?'↓':'↑'}
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign:'center', padding:'32px', color:'#94a3b8' }}>No leads found</td></tr>
            )}
            {filtered.map(l => (
              <tr key={l.id}>
                <td className="adm-td-email">{l.email}</td>
                <td className="adm-td-muted">{l.source}</td>
                <td className="adm-td-muted" style={{ fontFamily:'monospace', fontSize:'0.8rem' }}>{l.page}</td>
                <td className="adm-td-muted">{fmtDate(l.date)}</td>
                <td>
                  <select
                    value={l.status}
                    onChange={e => { onStatusChange(l.id, e.target.value); onRefresh() }}
                    className="adm-status-select"
                    style={{ background: STATUS_COLORS[l.status]?.bg, color: STATUS_COLORS[l.status]?.color }}
                  >
                    {['new','contacted','interested','converted','lost'].map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Signups ───────────────────────────────────────────────────────────────────
function SignupsSection({ signups, onStatusChange, onRefresh }) {
  const [search, setSearch] = useState('')
  const filtered = signups.filter(s =>
    `${s.firstName} ${s.lastName} ${s.email} ${s.company}`.toLowerCase().includes(search.toLowerCase())
  )
  const ROLE_LABELS = {
    'event-organiser':'Event Organiser','av-tech':'AV / Tech','broadcast':'Broadcast',
    'developer':'Developer','other':'Other','—':'—'
  }

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h1 className="adm-page-title">Signups</h1>
          <p className="adm-page-sub">{signups.length} accounts created · all on free credits</p>
        </div>
        <button className="adm-btn-outline" onClick={() => exportCSV(signups, 'jabber-signups.csv')}>
          ↓ Export CSV
        </button>
      </div>

      <div className="adm-card">
        <div className="adm-toolbar">
          <input className="adm-search" placeholder="Search name, email or company…" value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <table className="adm-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Company</th><th>Role</th><th>Plan</th><th>Signed Up</th><th>Status</th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign:'center', padding:'32px', color:'#94a3b8' }}>No signups yet</td></tr>
            )}
            {filtered.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight:600 }}>{s.firstName} {s.lastName}</td>
                <td className="adm-td-email">{s.email}</td>
                <td className="adm-td-muted">{s.company}</td>
                <td className="adm-td-muted">{ROLE_LABELS[s.role] || s.role}</td>
                <td><span style={{ background:'#f0fdf4', color:'#16a34a', padding:'2px 9px', borderRadius:999, fontSize:'0.72rem', fontWeight:700 }}>{s.plan}</span></td>
                <td className="adm-td-muted">{fmtDate(s.date)}</td>
                <td>
                  <select
                    value={s.status}
                    onChange={e => { onStatusChange(s.id, e.target.value); onRefresh() }}
                    className="adm-status-select"
                    style={{ background: STATUS_COLORS[s.status]?.bg, color: STATUS_COLORS[s.status]?.color }}
                  >
                    {['waitlist','contacted','interested','converted','lost'].map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Analytics ─────────────────────────────────────────────────────────────────
function AnalyticsSection() {
  const maxViews = Math.max(...WEEKLY_VIEWS.map(d => d.views))
  const totalViews = WEEKLY_VIEWS.reduce((s,d) => s+d.views, 0)

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h1 className="adm-page-title">Analytics</h1>
          <p className="adm-page-sub">Site performance overview · estimated figures</p>
        </div>
        <span className="adm-badge-note">Connect Google Analytics or Plausible for live data →</span>
      </div>

      <div className="adm-two-col">
        {/* Page views bar chart */}
        <div className="adm-card">
          <h3 className="adm-card-title">Page Views — This Week <span className="adm-card-note">{totalViews.toLocaleString()} total</span></h3>
          <div className="adm-bar-chart">
            {WEEKLY_VIEWS.map(d => (
              <div key={d.day} className="adm-bar-col">
                <span className="adm-bar-val">{d.views}</span>
                <div className="adm-bar" style={{ height:`${(d.views/maxViews)*140}px` }} />
                <span className="adm-bar-label">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic sources */}
        <div className="adm-card">
          <h3 className="adm-card-title">Traffic Sources</h3>
          <div className="adm-sources">
            {SOURCES.map(s => (
              <div key={s.label} className="adm-source-row">
                <div className="adm-source-meta">
                  <span className="adm-source-dot" style={{ background:s.color }} />
                  <span className="adm-source-label">{s.label}</span>
                  <span className="adm-source-pct">{s.pct}%</span>
                </div>
                <div className="adm-source-bar-bg">
                  <div className="adm-source-bar" style={{ width:`${s.pct}%`, background:s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top pages */}
      <div className="adm-card">
        <h3 className="adm-card-title">Top Pages</h3>
        <table className="adm-table">
          <thead><tr><th>Page</th><th>Views</th><th>Conversion</th></tr></thead>
          <tbody>
            {TOP_PAGES.map(p => (
              <tr key={p.page}>
                <td>
                  <span style={{ fontWeight:600 }}>{p.title}</span>
                  <span className="adm-td-muted" style={{ marginLeft:8, fontFamily:'monospace', fontSize:'0.78rem' }}>{p.page}</span>
                </td>
                <td style={{ fontWeight:600 }}>{p.views.toLocaleString()}</td>
                <td>
                  <span style={{ color:'#22c55e', fontWeight:700 }}>{p.conv}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Blog Performance ──────────────────────────────────────────────────────────
function BlogSection() {
  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h1 className="adm-page-title">Blog Performance</h1>
          <p className="adm-page-sub">Which posts are driving the most leads</p>
        </div>
        <Link to="/blog" target="_blank" className="adm-btn-outline">View Blog →</Link>
      </div>

      <div className="adm-card">
        <table className="adm-table">
          <thead><tr><th>Post</th><th>Views</th><th>Leads</th><th>Conv. Rate</th><th>Action</th></tr></thead>
          <tbody>
            {BLOG_POSTS.map(p => (
              <tr key={p.title}>
                <td style={{ fontWeight:600, maxWidth:340 }}>{p.title}</td>
                <td>{p.views}</td>
                <td style={{ fontWeight:700, color:'#6366f1' }}>{p.leads}</td>
                <td><span style={{ color:'#22c55e', fontWeight:700 }}>{p.conv}</span></td>
                <td><button className="adm-btn-mini">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="adm-suggest">
        <div className="adm-suggest-icon">📝</div>
        <div>
          <strong>Content ideas to boost SEO & leads</strong>
          <ul className="adm-suggest-list">
            <li>"Best real-time translation software for events 2026" — high-intent comparison keyword</li>
            <li>"How to stream in multiple languages on YouTube / Zoom" — discovery traffic</li>
            <li>Case study: "How [Client X] reached 4× more attendees with Jabber"</li>
            <li>Language-specific landing pages (e.g., /es, /fr) for non-English SEO</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// ── Plans ─────────────────────────────────────────────────────────────────────
function PlansSection({ signups }) {
  const PLAN_DATA = [
    { name:'Free Credits', count: signups.length, color:'#6366f1', mrr: 0 },
    { name:'Pro ($299/mo)', count: 0, color:'#8b5cf6', mrr: 0 },
    { name:'Enterprise', count: 0, color:'#06b6d4', mrr: 0 },
  ]
  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h1 className="adm-page-title">Plans & Revenue</h1>
          <p className="adm-page-sub">User plan distribution and MRR overview</p>
        </div>
      </div>

      <div className="adm-kpi-grid" style={{ gridTemplateColumns:'repeat(3,1fr)' }}>
        <KPI label="Total Users"   value={signups.length} sub="all on free credits"    color="#6366f1"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>}
        />
        <KPI label="Active MRR"    value="$0"             sub="payments not yet live"  color="#8b5cf6"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>}
        />
        <KPI label="Potential MRR" value={`$${signups.length * 299}`} sub="if all converted to Pro" color="#22c55e"
          icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
        />
      </div>

      <div className="adm-card">
        <h3 className="adm-card-title">Plan Distribution</h3>
        {PLAN_DATA.map(p => (
          <div key={p.name} className="adm-plan-row">
            <div className="adm-plan-name">
              <span className="adm-source-dot" style={{ background:p.color }} />
              {p.name}
            </div>
            <div className="adm-source-bar-bg" style={{ flex:1, margin:'0 16px' }}>
              <div className="adm-source-bar" style={{ width: signups.length ? `${(p.count/signups.length)*100}%` : '0%', background:p.color, minWidth: p.count > 0 ? 4 : 0 }} />
            </div>
            <span style={{ fontWeight:700, minWidth:24, textAlign:'right' }}>{p.count}</span>
          </div>
        ))}
      </div>

      <div className="adm-suggest">
        <div className="adm-suggest-icon">💰</div>
        <div>
          <strong>Steps to activate revenue</strong>
          <ul className="adm-suggest-list">
            <li>Integrate <strong>Stripe</strong> to handle Pro plan subscriptions and usage-based billing</li>
            <li>Add a <strong>upgrade prompt</strong> in the dashboard when free credits run out</li>
            <li>Send a <strong>day-5 follow-up email</strong> to free-credit users offering a Pro trial extension</li>
            <li>Add <strong>annual billing</strong> at 20% discount to improve cash flow and reduce churn</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

// ── Root Admin Component ──────────────────────────────────────────────────────
export default function Admin() {
  const [auth,    setAuth]    = useState(!!sessionStorage.getItem(SESSION_KEY))
  const [section, setSection] = useState('overview')
  const [leads,   setLeads]   = useState([])
  const [signups, setSignups] = useState([])

  useEffect(() => {
    seedDemoData()
    refresh()
  }, [])

  function refresh() {
    setLeads(getLeads())
    setSignups(getSignups())
  }

  function handleAuth()    { sessionStorage.setItem(SESSION_KEY, '1'); setAuth(true) }
  function handleSignOut() { sessionStorage.removeItem(SESSION_KEY);   setAuth(false) }

  if (!auth) return <LoginScreen onAuth={handleAuth} />

  const newLeads   = leads.filter(l => l.status === 'new').length
  const newSignups = signups.length

  return (
    <div className="adm-layout">
      <Sidebar
        active={section}
        setActive={setSection}
        onSignOut={handleSignOut}
        counts={{ leads: newLeads, signups: newSignups }}
      />
      <main className="adm-main">
        {section === 'overview'  && <Overview  leads={leads}   signups={signups} />}
        {section === 'leads'     && <LeadsSection leads={leads} onStatusChange={updateLeadStatus} onRefresh={refresh} />}
        {section === 'signups'   && <SignupsSection signups={signups} onStatusChange={updateSignupStatus} onRefresh={refresh} />}
        {section === 'analytics' && <AnalyticsSection />}
        {section === 'blog'      && <BlogSection />}
        {section === 'plans'     && <PlansSection signups={signups} />}
      </main>
    </div>
  )
}
