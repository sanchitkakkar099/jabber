import GradientWave from '../components/GradientWave'
import DashLayout, { Icon } from '../components/DashLayout'

const KPIS = [
  { label: 'Live viewers', value: '4,827', delta: '+12.4%', up: true, grad: 'grad-blue', spark: '0 26 8 22 16 24 24 16 32 18 40 10 48 12 56 6 64 9 72 3', icon: 'eye' },
  { label: 'Active languages', value: '9', delta: '+2', up: true, grad: 'grad-green', spark: '0 28 8 26 16 27 24 22 32 24 40 18 48 20 56 14 64 15 72 11', icon: 'globe' },
  { label: 'Avg latency', value: '1.2s', delta: '-0.3s', up: true, grad: 'grad-peach', spark: '0 8 8 12 16 10 24 16 32 14 40 20 48 18 56 22 64 21 72 26', icon: 'bolt' },
  { label: 'Minutes this month', value: '3,240', sub: 'of 5,000', delta: '65%', up: false, grad: 'grad-blue', spark: '0 24 8 22 16 20 24 18 32 16 40 15 48 13 56 11 64 9 72 7', icon: 'clock' },
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

export default function Dashboard() {
  return (
    <DashLayout title="Overview">
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
              <polyline points={k.spark} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ))}
      </section>

      {/* MAIN GRID */}
      <section className="dash-grid">
        <div className="dash-col">
          <div className="dash-card">
            <div className="dash-card-head">
              <div><h3 className="dash-card-title">Viewers over time</h3><span className="dash-card-note">Last 24 hours · live</span></div>
              <div className="dash-seg"><button className="on">24h</button><button>7d</button><button>30d</button></div>
            </div>
            <div className="dash-chart">
              <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="dash-area">
                <defs>
                  <linearGradient id="areaB" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#155dfc" stopOpacity="0.35"/><stop offset="100%" stopColor="#155dfc" stopOpacity="0"/></linearGradient>
                  <linearGradient id="areaA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e9a23b" stopOpacity="0.28"/><stop offset="100%" stopColor="#e9a23b" stopOpacity="0"/></linearGradient>
                </defs>
                <path d="M0,160 C60,150 90,120 150,118 C210,116 240,90 300,70 C360,52 390,80 450,60 C510,42 540,30 600,36 L600,200 L0,200 Z" fill="url(#areaB)"/>
                <path d="M0,160 C60,150 90,120 150,118 C210,116 240,90 300,70 C360,52 390,80 450,60 C510,42 540,30 600,36" fill="none" stroke="#155dfc" strokeWidth="2.5"/>
                <path d="M0,180 C60,176 90,165 150,168 C210,170 240,150 300,140 C360,130 390,148 450,138 C510,128 540,120 600,124 L600,200 L0,200 Z" fill="url(#areaA)"/>
                <path d="M0,180 C60,176 90,165 150,168 C210,170 240,150 300,140 C360,130 390,148 450,138 C510,128 540,120 600,124" fill="none" stroke="#e9a23b" strokeWidth="2.5"/>
              </svg>
              <div className="dash-chart-x"><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span></div>
            </div>
            <div className="dash-legend"><span><i style={{background:'#155dfc'}} />Total viewers</span><span><i style={{background:'#e9a23b'}} />Translated streams</span></div>
          </div>

          <div className="dash-card">
            <div className="dash-card-head"><h3 className="dash-card-title">Recent events</h3><button className="dash-ghost-btn dash-ghost-sm">View all</button></div>
            <table className="dash-table">
              <thead><tr><th>Event</th><th>Status</th><th>Languages</th><th>Viewers</th><th>Duration</th></tr></thead>
              <tbody>
                {EVENTS.map(e => (
                  <tr key={e.name}>
                    <td className="dash-td-name">{e.name}</td>
                    <td><span className={`dash-status dash-status-${e.status.toLowerCase()}`}>{e.status === 'Live' && <span className="dash-live-dot" />}{e.status}</span></td>
                    <td>{e.langs}</td><td>{e.viewers}</td><td className="dash-td-muted">{e.dur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dash-col">
          <div className="dash-card dash-live-card">
            <div className="dash-live-visual grad-blue">
              <span className="dash-live-badge"><span className="dash-live-dot" /> LIVE</span>
              <div className="dash-live-wave"><GradientWave /></div>
            </div>
            <div className="dash-live-body">
              <h3 className="dash-card-title">Global Tech Summit — Keynote</h3>
              <div className="dash-live-tabs">{['EN','ES','FR','DE','JA','+5'].map((t,i) => <span key={t} className={`dash-tab${i===0?' on':''}`}>{t}</span>)}</div>
              <div className="dash-live-stats">
                <div><span className="dash-mini-num">4,827</span><span className="dash-mini-lbl">viewers</span></div>
                <div><span className="dash-mini-num">1.2s</span><span className="dash-mini-lbl">latency</span></div>
                <div><span className="dash-mini-num">9</span><span className="dash-mini-lbl">languages</span></div>
              </div>
            </div>
          </div>

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
            <div className="dash-usage-rows"><div><span>Streaming minutes</span><b>3,240 / 5,000</b></div><div><span>Languages</span><b>9 / 10</b></div></div>
            <button className="btn btn-primary btn-sm dash-block">Upgrade plan</button>
          </div>
        </div>
      </section>
    </DashLayout>
  )
}
