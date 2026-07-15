import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SEO from './SEO'

/* Shared shell for all /dashboard/* pages (design mock — no functionality). */

export function Icon({ name }) {
  const p = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    live: <><circle cx="12" cy="12" r="3"/><path d="M5 5a10 10 0 000 14M19 5a10 10 0 010 14"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 010 18 15 15 0 010-18z"/></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></>,
    film: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v16M16 4v16"/></>,
    text: <><path d="M4 6h16M4 12h16M4 18h10"/></>,
    users: <><circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0112 0M17 5a3 3 0 010 6M21 20a5 5 0 00-3-4.5"/></>,
    card: <><rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/></>,
    cog: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>,
    bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    play: <path d="M6 4l14 8-14 8V4z"/>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></>,
    copy: <><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 012-2h10"/></>,
    download: <><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></>,
    check: <path d="M4 12l5 5L20 6"/>,
    key: <><circle cx="8" cy="15" r="4"/><path d="M11 12l8-8 3 3-3 3-2-2"/></>,
  }
  return <svg {...p}>{paths[name]}</svg>
}

const NAV = [
  { group: 'Workspace', items: [
    { icon: 'grid', label: 'Overview', to: '/dashboard' },
    { icon: 'live', label: 'Live events', to: '/dashboard/events', badge: '1' },
    { icon: 'globe', label: 'Languages', to: '/dashboard/languages' },
    { icon: 'chart', label: 'Analytics', to: '/dashboard/analytics' },
  ]},
  { group: 'Library', items: [
    { icon: 'film', label: 'Recordings', to: '/dashboard/recordings' },
    { icon: 'text', label: 'Transcripts', to: '/dashboard/transcripts' },
  ]},
  { group: 'Account', items: [
    { icon: 'users', label: 'Team', to: '/dashboard/team' },
    { icon: 'card', label: 'Billing', to: '/dashboard/billing' },
    { icon: 'cog', label: 'Settings', to: '/dashboard/settings' },
  ]},
]

export default function DashLayout({ title, children }) {
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()

  return (
    <div className={`dash${collapsed ? ' dash-collapsed' : ''}`}>
      <SEO title={title || 'Console'} canonical="/dashboard" noindex={true} />

      <aside className="dash-side">
        <div className="dash-brand">
          <Link to="/" className="dash-brand-logo"><img src="/logo-mark.png" alt="Yadia" /></Link>
          <span className="dash-brand-badge">Console</span>
        </div>
        <nav className="dash-nav">
          {NAV.map(g => (
            <div className="dash-nav-group" key={g.group}>
              <div className="dash-nav-label">{g.group}</div>
              {g.items.map(it => (
                <Link key={it.label} to={it.to} className={`dash-nav-item${pathname === it.to ? ' active' : ''}`}>
                  <span className="dash-nav-ic"><Icon name={it.icon} /></span>
                  <span className="dash-nav-txt">{it.label}</span>
                  {it.badge && <span className="dash-nav-badge">{it.badge}</span>}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="dash-upgrade">
          <div className="dash-upgrade-glow grad-blue" aria-hidden="true" />
          <div className="dash-upgrade-in">
            <strong>You’re on Starter</strong>
            <p>Unlock unlimited languages & 4K delivery.</p>
            <Link to="/dashboard/billing" className="btn btn-primary btn-sm">Upgrade</Link>
          </div>
        </div>
        <div className="dash-user">
          <span className="dash-avatar" />
          <div className="dash-user-meta"><strong>Alex Morgan</strong><span>SummitLive</span></div>
        </div>
      </aside>

      <div className="dash-main">
        <header className="dash-top">
          <button className="dash-burger" onClick={() => setCollapsed(c => !c)} aria-label="Toggle sidebar">
            <span /><span /><span />
          </button>
          <div className="dash-search">
            <Icon name="search" />
            <input placeholder="Search events, languages, recordings…" />
            <kbd>⌘K</kbd>
          </div>
          <div className="dash-top-actions">
            <button className="dash-icon-btn" aria-label="Notifications"><span className="dash-dot" /><Icon name="live" /></button>
            <button className="btn btn-primary btn-sm dash-golive"><span className="dash-live-dot" /> Go live</button>
            <span className="dash-avatar dash-avatar-sm" />
          </div>
        </header>
        <div className="dash-scroll">{children}</div>
      </div>
    </div>
  )
}

/* Small shared bits */
export function PageHead({ eyebrow, title, sub, children }) {
  return (
    <div className="dash-pagehead">
      <div>
        {eyebrow && <span className="hh-eyebrow">{eyebrow}</span>}
        <h1 className="dash-pagetitle">{title}</h1>
        {sub && <p className="dash-pagesub">{sub}</p>}
      </div>
      {children && <div className="dash-pagehead-actions">{children}</div>}
    </div>
  )
}
