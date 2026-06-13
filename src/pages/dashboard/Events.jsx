import DashLayout, { PageHead, Icon } from '../../components/DashLayout'
import GradientWave from '../../components/GradientWave'

const EVENTS = [
  { name: 'Global Tech Summit — Keynote', status: 'Live', grad: 'grad-blue', date: 'Now · started 1h ago', langs: 9, viewers: '4,827' },
  { name: 'Q2 All-Hands Town Hall', status: 'Scheduled', grad: 'grad-green', date: 'Today · 16:00', langs: 5, viewers: '—' },
  { name: 'Designathon Closing Ceremony', status: 'Scheduled', grad: 'grad-peach', date: 'Tomorrow · 18:30', langs: 6, viewers: '—' },
  { name: 'Product Launch · Orbit', status: 'Ended', grad: 'grad-peach', date: '11 Jun · 54 min', langs: 7, viewers: '8,210' },
  { name: 'Investor Briefing 2026', status: 'Ended', grad: 'grad-blue', date: '08 Jun · 38 min', langs: 4, viewers: '1,902' },
  { name: 'Worship Service — Sunday', status: 'Ended', grad: 'grad-green', date: '05 Jun · 90 min', langs: 6, viewers: '3,455' },
]

export default function Events() {
  return (
    <DashLayout title="Live events">
      <PageHead eyebrow="Workspace" title="Live events" sub="Create, schedule and monitor your multilingual broadcasts.">
        <button className="btn btn-primary"><Icon name="plus" /> New event</button>
      </PageHead>

      <div className="dash-tabs">
        {['All', 'Live', 'Scheduled', 'Ended'].map((t, i) => <button key={t} className={`dash-tab-pill${i === 0 ? ' on' : ''}`}>{t}</button>)}
      </div>

      <div className="dash-eventgrid">
        {EVENTS.map(e => (
          <div className="dash-card dash-event" key={e.name}>
            <div className={`dash-event-thumb ${e.grad}`}>
              {e.status === 'Live' && <span className="dash-live-badge"><span className="dash-live-dot" /> LIVE</span>}
              <div className="dash-event-wave"><GradientWave /></div>
            </div>
            <div className="dash-event-body">
              <span className={`dash-status dash-status-${e.status.toLowerCase()}`}>{e.status}</span>
              <h3 className="dash-event-title">{e.name}</h3>
              <p className="dash-event-date">{e.date}</p>
              <div className="dash-event-meta">
                <span><Icon name="globe" /> {e.langs} languages</span>
                <span><Icon name="eye" /> {e.viewers}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashLayout>
  )
}
