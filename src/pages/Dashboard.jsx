import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import GradientWave from '../components/GradientWave'

/* ───────────────────────────────────────────────────────────────────────────
   USER DASHBOARD — design mock only (static data, no functionality).
   Same aesthetic as the marketing site: white canvas, thin serif display,
   blue/amber gradients, glass cards, black pills.
   ─────────────────────────────────────────────────────────────────────────── */

const NAV = [
  { group: 'Workspace', items: [
    { icon: 'grid', label: 'Overview', active: true },
    { icon: 'live', label: 'Live events', badge: '1' },
    { icon: 'globe', label: 'Languages' },
    { icon: 'chart', label: 'Analytics' },
  ]},
  { group: 'Library', items: [
    { icon: 'film', label: 'Recordings' },
    { icon: 'text', label: 'Transcripts' },
  ]},
  { group: 'Account', items: [
    { icon: 'users', label: 'Team' },
    { icon: 'card', label: 'Billing' },
    { icon: 'cog', label: 'Settings' },
  ]},
]

const KPIS = [
  { label: 'Live viewers', value: '4,827', delta: '+12.4%', up: true, grad: 'grad-blue', spark: 'M0,26 8,22 16,24 24,16 32,18 40,10 48,12 56,6 64,9 72,3', icon: 'eye' },
  { label: 'Active languages', value: '9', delta: '+2', up: true, grad: 'grad-green', spark: 'M0,28 8,26 16,27 24,22 32,24 40,18 48,20 56,14 64,15 72,11', icon: 'globe' },
  { label: 'Avg latency', value: '1.2s', delta: '-0.3s', up: true, grad: 'grad-peach', spark: 'M0,8 8,12 16,10 24,16 32,14 40,20 48,18 56,22 64,21 72,26', icon: 'bolt' },
  { label: 'Minutes this month', value: '3,240', sub: 'of 5,000', delta: '65%', up: false, grad: 'grad-blue', spark: 'M0,24 8,22 16,20 24,18 32,16 40,15 48,13 56,11 64,9 72,7', icon: 'clock' },
]

const LANGS = [
  { code: 'ES', name: 'Spanish', pct: 32, n: '1,544', c: '#155dfc' },
  { code: 'FR', name: 'French', pct: 24, n: '1,158', c: '#5b8dfb' },
  { code: 'DE', name: 'German', pct: 18, n: '869', c: '#e9a23b' },
  { code: 'JA', name: 'Japanese', pct: 14, n: '676', c: '#36a06a' },
  { code: 'PT', name: 'Portuguese', pct: 12, n: '580', c: '#9bc0ff' },
]

const EVENTS = [
  { name: 'Global Tech Summit — Keynote', status: 'Live', langs: 9, viewers: '4,827', dur: '01:12:40' },
  { name: 'Q2 All-Hands Town Hall', status: 'Scheduled', langs: 5, viewers: '—', dur: 'Today, 16:00' },
  { name: 'Product Launch · Orbit', status: 'Ended', langs: 7, viewers: '8,210', dur: '00:54:18' },
  { name: 'Investor Briefing 2026', status: 'Ended', langs: 4, viewers: '1,902', dur: '00:38:05' },
  { name: 'Worship Service — Sunday', status: 'Ended', langs: 6, viewers: '3,455', dur: '01:30:22' },
]

function Icon({ name }) {
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
  }
  return <svg {...p}>{paths[name]}</svg>
}

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`dash${collapsed ? ' dash-collapsed' : ''}`}>
      <SEO title="Console" canonical="/dashboard" noindex={true} />

      {/* SIDEBAR */}
      <aside className="dash-side">
        <div className="dash-brand">
          <Link to="/" className="dash-brand-logo"><img src="/logo.png" alt="Zabber" /></Link>
          <span className="dash-brand-badge">Console</span>
        </div>
        <nav className="dash-nav">
          {NAV.map(g => (
            <div className="dash-nav-group" key={g.group}>
              <div className="dash-nav-label">{g.group}</div>
              {g.items.map(it => (
                <button key={it.label} className={`dash-nav-item${it.active ? ' active' : ''}`}>
                  <span className="dash-nav-ic"><Icon name={it.icon} /></span>
                  <span className="dash-nav-txt">{it.label}</span>
                  {it.badge && <span className="dash-nav-badge">{it.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="dash-upgrade">
          <div className="dash-upgrade-glow grad-blue" aria-hidden="true" />
          <div className="dash-upgrade-in">
            <strong>You’re on Starter</strong>
            <p>Unlock unlimited languages & 4K delivery.</p>
            <button className="btn btn-primary btn-sm">Upgrade</button>
          </div>
        </div>
        <div className="dash-user">
          <span className="dash-avatar" />
          <div className="dash-user-meta"><strong>Alex Morgan</strong><span>SummitLive</span></div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="dash-main">
        {/* TOPBAR */}
        <header className="dash-top">
          <button className="dash-burger" onClick={() => setCollapsed(c => !c)} aria-label="Toggle sidebar">
            <span /><span /><span />
          </button>
          <div className="dash-search">
            <Icon name="text" />
            <input placeholder="Search events, languages, recordings…" />
            <kbd>⌘K</kbd>
          </div>
          <div className="dash-top-actions">
            <button className="dash-icon-btn" aria-label="Notifications"><span className="dash-dot" /><Icon name="live" /></button>
            <button className="btn btn-primary btn-sm dash-golive"><span className="dash-live-dot" /> Go live</button>
            <span className="dash-avatar dash-avatar-sm" />
          </div>
        </header>

        <div className="dash-scroll">
          {/* WELCOME BANNER */}
          <section className="dash-hero">
            <GradientWave className="dash-hero-wave" />
            <div className="dash-hero-in">
              <div>
                <span className="hh-eyebrow">Wednesday · 13 June</span>
                <h1 className="dash-hero-title">Good morning, Alex</h1>
                <p className="dash-hero-sub">You have <strong>1 event live</strong> reaching <strong>4,827 viewers</strong> across 9 languages right now.</p>
              </div>
              <div className="dash-hero-actions">
                <button className="btn btn-primary"><span className="dash-live-dot" /> Open live console</button>
                <button className="dash-ghost-btn">View report</button>
              </div>
            </div>
          </section>

          {/* KPI ROW */}
          <section className="dash-kpis">
            {KPIS.map(k => (
              <div className="dash-card dash-kpi" key={k.label}>
                <div className="dash-kpi-top">
                  <span className={`dash-kpi-ic ${k.grad}`}><Icon name={k.icon} /></span>
                  <span className={`dash-chip${k.up ? ' up' : ''}`}>{k.delta}</span>
                </div>
                <div className="dash-kpi-val">{k.value}{k.sub && <span className="dash-kpi-sub"> {k.sub}</span>}</div>
                <div className="dash-kpi-label">{k.label}</div>
                <svg className="dash-spark" viewBox="0 0 72 30" preserveAspectRatio="none" fill="none">
                  <polyline points={k.spark.replace(/M/g,'').replace(/,/g,' ')} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            ))}
          </section>

          {/* MAIN GRID */}
          <section className="dash-grid">
            {/* Left column */}
            <div className="dash-col">
              {/* Viewers over time */}
              <div className="dash-card">
                <div className="dash-card-head">
                  <div><h3 className="dash-card-title">Viewers over time</h3><span className="dash-card-note">Last 24 hours · live</span></div>
                  <div className="dash-seg"><button className="on">24h</button><button>7d</button><button>30d</button></div>
                </div>
                <div className="dash-chart">
                  <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="dash-area">
                    <defs>
                      <linearGradient id="areaB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#155dfc" stopOpacity="0.35"/>
                        <stop offset="100%" stopColor="#155dfc" stopOpacity="0"/>
                      </linearGradient>
                      <linearGradient id="areaA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e9a23b" stopOpacity="0.28"/>
                        <stop offset="100%" stopColor="#e9a23b" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d="M0,160 C60,150 90,120 150,118 C210,116 240,90 300,70 C360,52 390,80 450,60 C510,42 540,30 600,36 L600,200 L0,200 Z" fill="url(#areaB)"/>
                    <path d="M0,160 C60,150 90,120 150,118 C210,116 240,90 300,70 C360,52 390,80 450,60 C510,42 540,30 600,36" fill="none" stroke="#155dfc" strokeWidth="2.5"/>
                    <path d="M0,180 C60,176 90,165 150,168 C210,170 240,150 300,140 C360,130 390,148 450,138 C510,128 540,120 600,124 L600,200 L0,200 Z" fill="url(#areaA)"/>
                    <path d="M0,180 C60,176 90,165 150,168 C210,170 240,150 300,140 C360,130 390,148 450,138 C510,128 540,120 600,124" fill="none" stroke="#e9a23b" strokeWidth="2.5"/>
                  </svg>
                  <div className="dash-chart-x"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span></div>
                </div>
                <div className="dash-legend">
                  <span><i style={{background:'#155dfc'}} />Total viewers</span>
                  <span><i style={{background:'#e9a23b'}} />Translated streams</span>
                </div>
              </div>

              {/* Recent events */}
              <div className="dash-card">
                <div className="dash-card-head">
                  <h3 className="dash-card-title">Recent events</h3>
                  <button className="dash-ghost-btn dash-ghost-sm">View all</button>
                </div>
                <table className="dash-table">
                  <thead><tr><th>Event</th><th>Status</th><th>Languages</th><th>Viewers</th><th>Duration</th></tr></thead>
                  <tbody>
                    {EVENTS.map(e => (
                      <tr key={e.name}>
                        <td className="dash-td-name">{e.name}</td>
                        <td><span className={`dash-status dash-status-${e.status.toLowerCase()}`}>{e.status === 'Live' && <span className="dash-live-dot" />}{e.status}</span></td>
                        <td>{e.langs}</td>
                        <td>{e.viewers}</td>
                        <td className="dash-td-muted">{e.dur}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right column */}
            <div className="dash-col">
              {/* Live now */}
              <div className="dash-card dash-live-card">
                <div className="dash-live-visual grad-blue">
                  <span className="dash-live-badge"><span className="dash-live-dot" /> LIVE</span>
                  <div className="dash-live-wave"><GradientWave /></div>
                </div>
                <div className="dash-live-body">
                  <h3 className="dash-card-title">Global Tech Summit — Keynote</h3>
                  <div className="dash-live-tabs">
                    {['EN','ES','FR','DE','JA','+5'].map((t,i) => <span key={t} className={`dash-tab${i===0?' on':''}`}>{t}</span>)}
                  </div>
                  <div className="dash-live-stats">
                    <div><span className="dash-mini-num">4,827</span><span className="dash-mini-lbl">viewers</span></div>
                    <div><span className="dash-mini-num">1.2s</span><span className="dash-mini-lbl">latency</span></div>
                    <div><span className="dash-mini-num">9</span><span className="dash-mini-lbl">languages</span></div>
                  </div>
                </div>
              </div>

              {/* Viewers by language */}
              <div className="dash-card">
                <h3 className="dash-card-title">Viewers by language</h3>
                <div className="dash-langs">
                  {LANGS.map(l => (
                    <div className="dash-lang" key={l.code}>
                      <div className="dash-lang-top"><span className="dash-lang-name"><b>{l.code}</b> {l.name}</span><span className="dash-lang-n">{l.n}</span></div>
                      <div className="dash-lang-bar"><span style={{ width: l.pct + '%', background: l.c }} /></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plan usage */}
              <div className="dash-card dash-usage">
                <div className="dash-card-head"><h3 className="dash-card-title">Plan usage</h3><span className="dash-chip">Starter</span></div>
                <div className="dash-ring">
                  <svg viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="var(--slate-200)" strokeWidth="12"/>
                    <circle cx="60" cy="60" r="50" fill="none" stroke="url(#ring)" strokeWidth="12" strokeLinecap="round" strokeDasharray="314" strokeDashoffset="110" transform="rotate(-90 60 60)"/>
                    <defs><linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#155dfc"/><stop offset="100%" stopColor="#e9a23b"/></linearGradient></defs>
                  </svg>
                  <div className="dash-ring-c"><span className="dash-ring-num">65%</span><span className="dash-ring-lbl">used</span></div>
                </div>
                <div className="dash-usage-rows">
                  <div><span>Streaming minutes</span><b>3,240 / 5,000</b></div>
                  <div><span>Languages</span><b>9 / 10</b></div>
                </div>
                <button className="btn btn-primary btn-sm dash-block">Upgrade plan</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
