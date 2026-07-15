import DashLayout, { PageHead, Icon } from '../../components/DashLayout'

const KEYS = [
  { name: 'Production', key: 'jb_live_••••••••••••3f9a', created: '12 Mar 2026' },
  { name: 'Staging', key: 'jb_test_••••••••••••a21c', created: '04 May 2026' },
]

export default function Settings() {
  return (
    <DashLayout title="Settings">
      <PageHead eyebrow="Account" title="Settings" sub="Manage your profile, stream and developer access." />

      <div className="dash-settings">
        <aside className="dash-settabs">
          {['Profile', 'Stream', 'Notifications', 'API keys', 'Danger zone'].map((t, i) => (
            <button key={t} className={`dash-settab${i === 1 ? ' on' : ''}`}>{t}</button>
          ))}
        </aside>

        <div className="dash-setmain">
          {/* Profile */}
          <div className="dash-card">
            <h3 className="dash-card-title">Profile</h3>
            <div className="dash-form">
              <div className="dash-field"><label>Full name</label><input className="dash-input" defaultValue="Alex Morgan" /></div>
              <div className="dash-field"><label>Work email</label><input className="dash-input" defaultValue="alex@summitlive.com" /></div>
              <div className="dash-field"><label>Organisation</label><input className="dash-input" defaultValue="SummitLive" /></div>
              <div className="dash-field"><label>Default language</label><select className="dash-input"><option>English</option><option>Spanish</option></select></div>
            </div>
          </div>

          {/* Stream */}
          <div className="dash-card">
            <h3 className="dash-card-title">Stream</h3>
            <div className="dash-form">
              <div className="dash-field dash-field-full"><label>Ingest URL</label>
                <div className="dash-copyrow"><input className="dash-input" readOnly value="rtmp://ingest.yadia.ai/live" /><button className="dash-copy-btn"><Icon name="copy" /></button></div>
              </div>
              <div className="dash-field dash-field-full"><label>Stream key</label>
                <div className="dash-copyrow"><input className="dash-input" readOnly value="jb_sk_••••••••••••••••7d2e" /><button className="dash-copy-btn"><Icon name="copy" /></button></div>
              </div>
              <div className="dash-field"><label>Region</label><select className="dash-input"><option>US West</option><option>EU Central</option><option>Asia Pacific</option></select></div>
              <div className="dash-field"><label>Default latency mode</label><select className="dash-input"><option>Ultra-low (&lt; 2s)</option><option>Balanced</option></select></div>
              <div className="dash-toggle-row"><div><strong>Auto-record events</strong><span>Save a replay of every broadcast.</span></div><span className="dash-toggle on"><span /></span></div>
              <div className="dash-toggle-row"><div><strong>Auto-publish captions</strong><span>Make transcripts available after each event.</span></div><span className="dash-toggle on"><span /></span></div>
            </div>
          </div>

          {/* API keys */}
          <div className="dash-card">
            <div className="dash-card-head"><h3 className="dash-card-title">API keys</h3><button className="btn btn-primary btn-sm"><Icon name="key" /> New key</button></div>
            <table className="dash-table">
              <thead><tr><th>Name</th><th>Key</th><th>Created</th><th></th></tr></thead>
              <tbody>
                {KEYS.map(k => (
                  <tr key={k.name}><td className="dash-td-name">{k.name}</td><td className="dash-mono">{k.key}</td><td className="dash-td-muted">{k.created}</td><td className="dash-td-muted dash-dots">···</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="dash-saverow"><button className="dash-ghost-btn">Cancel</button><button className="btn btn-primary">Save changes</button></div>
        </div>
      </div>
    </DashLayout>
  )
}
