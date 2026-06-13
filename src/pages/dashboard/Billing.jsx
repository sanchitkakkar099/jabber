import DashLayout, { PageHead, Icon } from '../../components/DashLayout'
import GradientWave from '../../components/GradientWave'

const INVOICES = [
  { id: 'INV-2026-006', date: '01 Jun 2026', amt: '$0.00', status: 'Paid' },
  { id: 'INV-2026-005', date: '01 May 2026', amt: '$0.00', status: 'Paid' },
  { id: 'INV-2026-004', date: '01 Apr 2026', amt: '$0.00', status: 'Paid' },
]
const PLANS = [
  { name: 'Starter', price: '$0', note: 'Current plan', current: true, feats: ['5,000 min / mo', '10 languages', '100 viewers'] },
  { name: 'Pro', price: '$299', note: 'Most popular', feats: ['Unlimited minutes', '50+ languages', '5,000 viewers'] },
  { name: 'Enterprise', price: 'Custom', note: 'For broadcasters', feats: ['Dedicated infra', 'SLA & SSO', 'Unlimited viewers'] },
]

export default function Billing() {
  return (
    <DashLayout title="Billing">
      <PageHead eyebrow="Account" title="Billing" sub="Manage your plan, payment method and invoices." />

      <section className="dash-grid">
        <div className="dash-col">
          <div className="dash-card dash-plan-card">
            <GradientWave className="dash-plan-wave" />
            <div className="dash-plan-in">
              <span className="hh-eyebrow">Current plan</span>
              <h2 className="dash-plan-name">Starter</h2>
              <p className="dash-plan-sub">Free forever · renews 1 Jul 2026</p>
              <div className="dash-usage-rows">
                <div><span>Streaming minutes</span><b>3,240 / 5,000</b></div>
                <div className="dash-lang-bar"><span style={{ width: '65%', background: 'linear-gradient(90deg,#155dfc,#e9a23b)' }} /></div>
                <div><span>Languages</span><b>9 / 10</b></div>
                <div className="dash-lang-bar"><span style={{ width: '90%', background: 'linear-gradient(90deg,#155dfc,#e9a23b)' }} /></div>
              </div>
            </div>
          </div>

          <div className="dash-card">
            <div className="dash-card-head"><h3 className="dash-card-title">Invoices</h3><button className="dash-ghost-btn dash-ghost-sm">View all</button></div>
            <table className="dash-table">
              <thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {INVOICES.map(i => (
                  <tr key={i.id}>
                    <td className="dash-td-name">{i.id}</td><td className="dash-td-muted">{i.date}</td><td>{i.amt}</td>
                    <td><span className="dash-status" style={{ color: '#36a06a', background: 'rgba(54,160,106,0.12)' }}>{i.status}</span></td>
                    <td className="dash-td-muted dash-dots"><Icon name="download" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dash-col">
          <div className="dash-card">
            <h3 className="dash-card-title">Payment method</h3>
            <div className="dash-pay">
              <span className="dash-pay-card"><Icon name="card" /></span>
              <div><strong>Visa ending 4242</strong><span>Expires 08 / 28</span></div>
              <button className="dash-ghost-btn dash-ghost-sm">Update</button>
            </div>
          </div>

          {PLANS.map(p => (
            <div className={`dash-card dash-planopt${p.current ? ' current' : ''}`} key={p.name}>
              <div className="dash-planopt-top">
                <div><strong>{p.name}</strong><span className="dash-planopt-note">{p.note}</span></div>
                <span className="dash-planopt-price">{p.price}</span>
              </div>
              <ul className="dash-planopt-feats">{p.feats.map(f => <li key={f}><Icon name="check" />{f}</li>)}</ul>
              <button className={`btn btn-sm dash-block ${p.current ? 'dash-ghost-btn' : 'btn-primary'}`}>{p.current ? 'Current plan' : `Choose ${p.name}`}</button>
            </div>
          ))}
        </div>
      </section>
    </DashLayout>
  )
}
