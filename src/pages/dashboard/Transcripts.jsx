import DashLayout, { PageHead, Icon } from '../../components/DashLayout'

const LIST = [
  { name: 'Global Tech Summit — Keynote', date: '13 Jun', active: true },
  { name: 'Product Launch · Orbit', date: '11 Jun' },
  { name: 'Investor Briefing 2026', date: '08 Jun' },
  { name: 'Worship Service — Sunday', date: '05 Jun' },
  { name: 'May All-Hands', date: '28 May' },
]
const LINES = [
  { t: '00:00', s: 'Host', x: 'Welcome to the Global Tech Summit 2026. Today we gather from over forty nations.' },
  { t: '00:14', s: 'Host', x: 'Our theme this year is “Bridging Worlds” — connecting technology, culture and people.' },
  { t: '00:38', s: 'Speaker', x: 'Thank you. Real-time translation has fundamentally changed how we run global events.' },
  { t: '01:05', s: 'Speaker', x: 'Every attendee here is hearing me in their own language, with under two seconds of delay.' },
  { t: '01:30', s: 'Host', x: 'Let’s begin with our first panel on AI and its impact on industries worldwide.' },
]

export default function Transcripts() {
  return (
    <DashLayout title="Transcripts">
      <PageHead eyebrow="Library" title="Transcripts" sub="Full, searchable transcripts of every event in any language." />

      <div className="dash-transcript">
        <div className="dash-card dash-tr-list">
          {LIST.map(i => (
            <button key={i.name} className={`dash-tr-item${i.active ? ' on' : ''}`}>
              <span className="dash-tr-name">{i.name}</span>
              <span className="dash-tr-date">{i.date}</span>
            </button>
          ))}
        </div>

        <div className="dash-card dash-tr-reader">
          <div className="dash-card-head">
            <div><h3 className="dash-card-title">Global Tech Summit — Keynote</h3><span className="dash-card-note">13 Jun 2026 · 1:12:40</span></div>
            <button className="dash-ghost-btn dash-ghost-sm"><Icon name="download" /> Export</button>
          </div>
          <div className="dash-tr-langs">
            {['English', 'Spanish', 'French', 'German', 'Japanese'].map((l, i) => <span key={l} className={`dash-tab${i === 0 ? ' on' : ''}`}>{l}</span>)}
          </div>
          <div className="dash-tr-body">
            {LINES.map((l, i) => (
              <div className="dash-tr-line" key={i}>
                <span className="dash-tr-time">{l.t}</span>
                <div><span className="dash-tr-speaker">{l.s}</span><p>{l.x}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashLayout>
  )
}
