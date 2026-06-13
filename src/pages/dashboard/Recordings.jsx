import DashLayout, { PageHead, Icon } from '../../components/DashLayout'

const RECS = [
  { name: 'Global Tech Summit — Keynote', grad: 'grad-blue', dur: '1:12:40', date: '13 Jun 2026', langs: 9, views: '4.8k' },
  { name: 'Product Launch · Orbit', grad: 'grad-peach', dur: '0:54:18', date: '11 Jun 2026', langs: 7, views: '8.2k' },
  { name: 'Investor Briefing 2026', grad: 'grad-green', dur: '0:38:05', date: '08 Jun 2026', langs: 4, views: '1.9k' },
  { name: 'Worship Service — Sunday', grad: 'grad-blue', dur: '1:30:22', date: '05 Jun 2026', langs: 6, views: '3.4k' },
  { name: 'Designathon Kickoff', grad: 'grad-peach', dur: '0:26:11', date: '02 Jun 2026', langs: 5, views: '1.1k' },
  { name: 'May All-Hands', grad: 'grad-green', dur: '0:44:50', date: '28 May 2026', langs: 5, views: '2.7k' },
]

export default function Recordings() {
  return (
    <DashLayout title="Recordings">
      <PageHead eyebrow="Library" title="Recordings" sub="Replay any past event with captions and translated audio in every language.">
        <div className="dash-search dash-search-inline"><Icon name="search" /><input placeholder="Search recordings…" /></div>
      </PageHead>

      <div className="dash-recgrid">
        {RECS.map(r => (
          <div className="dash-card dash-rec" key={r.name}>
            <div className={`dash-rec-thumb ${r.grad}`}>
              <button className="dash-play"><Icon name="play" /></button>
              <span className="dash-rec-dur">{r.dur}</span>
            </div>
            <div className="dash-rec-body">
              <h3 className="dash-event-title">{r.name}</h3>
              <p className="dash-event-date">{r.date}</p>
              <div className="dash-event-meta"><span><Icon name="globe" /> {r.langs}</span><span><Icon name="eye" /> {r.views}</span></div>
            </div>
          </div>
        ))}
      </div>
    </DashLayout>
  )
}
