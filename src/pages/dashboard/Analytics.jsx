import DashLayout, { PageHead, Icon } from '../../components/DashLayout'

const KPIS = [
  { label: 'Total viewers', value: '128.4k', delta: '+18%', grad: 'grad-blue', icon: 'eye' },
  { label: 'Watch time', value: '9,210h', delta: '+11%', grad: 'grad-green', icon: 'clock' },
  { label: 'Avg engagement', value: '74%', delta: '+4%', grad: 'grad-peach', icon: 'chart' },
  { label: 'Drop-off', value: '12%', delta: '-2%', grad: 'grad-blue', icon: 'bolt' },
]
const REGIONS = [
  { name: 'Europe', pct: 38, c: '#155dfc' },
  { name: 'North America', pct: 27, c: '#5b8dfb' },
  { name: 'Asia Pacific', pct: 21, c: '#e9a23b' },
  { name: 'Latin America', pct: 9, c: '#36a06a' },
  { name: 'Middle East', pct: 5, c: '#9bc0ff' },
]
const BARS = [42, 58, 47, 70, 63, 81, 75, 90, 84, 96, 88, 72]

export default function Analytics() {
  return (
    <DashLayout title="Analytics">
      <PageHead eyebrow="Workspace" title="Analytics" sub="Audience, engagement and language performance across all events.">
        <button className="dash-ghost-btn">Last 30 days</button>
        <button className="btn btn-primary"><Icon name="download" /> Export</button>
      </PageHead>

      <section className="dash-kpis">
        {KPIS.map(k => (
          <div className="dash-card dash-kpi" key={k.label}>
            <div className="dash-kpi-top"><span className={`dash-kpi-ic ${k.grad}`}><Icon name={k.icon} /></span><span className="dash-chip up">{k.delta}</span></div>
            <div className="dash-kpi-val">{k.value}</div>
            <div className="dash-kpi-label">{k.label}</div>
          </div>
        ))}
      </section>

      <section className="dash-grid">
        <div className="dash-col">
          <div className="dash-card">
            <div className="dash-card-head"><div><h3 className="dash-card-title">Viewers over time</h3><span className="dash-card-note">Last 30 days</span></div><div className="dash-seg"><button>24h</button><button>7d</button><button className="on">30d</button></div></div>
            <div className="dash-chart">
              <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="dash-area">
                <defs><linearGradient id="aa" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#155dfc" stopOpacity="0.32"/><stop offset="100%" stopColor="#155dfc" stopOpacity="0"/></linearGradient></defs>
                <path d="M0,170 C50,160 80,140 120,130 C170,118 210,150 260,120 C320,84 360,100 410,70 C470,40 520,60 600,30 L600,200 L0,200 Z" fill="url(#aa)"/>
                <path d="M0,170 C50,160 80,140 120,130 C170,118 210,150 260,120 C320,84 360,100 410,70 C470,40 520,60 600,30" fill="none" stroke="#155dfc" strokeWidth="2.5"/>
              </svg>
              <div className="dash-chart-x"><span>Wk 1</span><span>Wk 2</span><span>Wk 3</span><span>Wk 4</span></div>
            </div>
          </div>

          <div className="dash-card">
            <h3 className="dash-card-title">Sessions per day</h3>
            <div className="dash-bars">
              {BARS.map((b, i) => <div key={i} className="dash-bar" style={{ height: b + '%' }} />)}
            </div>
          </div>
        </div>

        <div className="dash-col">
          <div className="dash-card">
            <h3 className="dash-card-title">Viewers by region</h3>
            <div className="dash-langs">
              {REGIONS.map(r => (
                <div className="dash-lang" key={r.name}>
                  <div className="dash-lang-top"><span className="dash-lang-name">{r.name}</span><span className="dash-lang-n">{r.pct}%</span></div>
                  <div className="dash-lang-bar"><span style={{ width: r.pct + '%', background: r.c }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="dash-card">
            <h3 className="dash-card-title">Top events</h3>
            <table className="dash-table">
              <tbody>
                <tr><td className="dash-td-name">Product Launch · Orbit</td><td className="dash-td-muted">8,210</td></tr>
                <tr><td className="dash-td-name">Global Tech Summit</td><td className="dash-td-muted">4,827</td></tr>
                <tr><td className="dash-td-name">Worship Service</td><td className="dash-td-muted">3,455</td></tr>
                <tr><td className="dash-td-name">Investor Briefing</td><td className="dash-td-muted">1,902</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </DashLayout>
  )
}
