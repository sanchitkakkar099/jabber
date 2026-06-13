import DashLayout, { PageHead, Icon } from '../../components/DashLayout'

const LANGS = [
  { code: 'EN', name: 'English', acc: '99%', on: true },
  { code: 'ES', name: 'Spanish', acc: '98%', on: true },
  { code: 'FR', name: 'French', acc: '98%', on: true },
  { code: 'DE', name: 'German', acc: '97%', on: true },
  { code: 'JA', name: 'Japanese', acc: '96%', on: true },
  { code: 'ZH', name: 'Chinese', acc: '96%', on: true },
  { code: 'PT', name: 'Portuguese', acc: '97%', on: true },
  { code: 'AR', name: 'Arabic', acc: '95%', on: true },
  { code: 'HI', name: 'Hindi', acc: '95%', on: true },
  { code: 'KO', name: 'Korean', acc: '96%', on: false },
  { code: 'IT', name: 'Italian', acc: '98%', on: false },
  { code: 'RU', name: 'Russian', acc: '95%', on: false },
  { code: 'NL', name: 'Dutch', acc: '97%', on: false },
  { code: 'TR', name: 'Turkish', acc: '94%', on: false },
  { code: 'SV', name: 'Swedish', acc: '97%', on: false },
]

export default function Languages() {
  return (
    <DashLayout title="Languages">
      <PageHead eyebrow="Workspace" title="Languages" sub="Choose which languages your events translate into. 9 of 10 enabled on Starter.">
        <button className="dash-ghost-btn">Manage defaults</button>
      </PageHead>

      <div className="dash-statline">
        <div className="dash-card dash-statbox"><span className="dash-statbox-num">50+</span><span className="dash-statbox-lbl">available languages</span></div>
        <div className="dash-card dash-statbox"><span className="dash-statbox-num">9</span><span className="dash-statbox-lbl">enabled</span></div>
        <div className="dash-card dash-statbox"><span className="dash-statbox-num">96.8%</span><span className="dash-statbox-lbl">avg accuracy</span></div>
      </div>

      <div className="dash-langgrid">
        {LANGS.map(l => (
          <div className={`dash-card dash-langcard${l.on ? ' on' : ''}`} key={l.code}>
            <span className="dash-langcode">{l.code}</span>
            <div className="dash-langinfo">
              <strong>{l.name}</strong>
              <span>{l.acc} accuracy</span>
            </div>
            <span className={`dash-toggle${l.on ? ' on' : ''}`}><span /></span>
          </div>
        ))}
      </div>
    </DashLayout>
  )
}
