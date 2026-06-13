import DashLayout, { PageHead, Icon } from '../../components/DashLayout'

const MEMBERS = [
  { name: 'Alex Morgan', email: 'alex@summitlive.com', role: 'Owner', active: 'Now', you: true },
  { name: 'Priya Nair', email: 'priya@summitlive.com', role: 'Admin', active: '2h ago' },
  { name: 'Daniel Vasquez', email: 'daniel@summitlive.com', role: 'Producer', active: 'Yesterday' },
  { name: 'Mei Chen', email: 'mei@summitlive.com', role: 'Producer', active: '3d ago' },
  { name: 'Tom Becker', email: 'tom@summitlive.com', role: 'Viewer', active: '1w ago', pending: true },
]
const roleClass = r => ({ Owner: 'r-owner', Admin: 'r-admin', Producer: 'r-prod', Viewer: 'r-view' }[r])

export default function Team() {
  return (
    <DashLayout title="Team">
      <PageHead eyebrow="Account" title="Team" sub="Invite teammates and manage what they can do.">
        <button className="btn btn-primary"><Icon name="plus" /> Invite member</button>
      </PageHead>

      <div className="dash-statline">
        <div className="dash-card dash-statbox"><span className="dash-statbox-num">5</span><span className="dash-statbox-lbl">members</span></div>
        <div className="dash-card dash-statbox"><span className="dash-statbox-num">1</span><span className="dash-statbox-lbl">pending invite</span></div>
        <div className="dash-card dash-statbox"><span className="dash-statbox-num">3</span><span className="dash-statbox-lbl">seats left</span></div>
      </div>

      <div className="dash-card">
        <table className="dash-table dash-team-table">
          <thead><tr><th>Member</th><th>Role</th><th>Last active</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {MEMBERS.map(m => (
              <tr key={m.email}>
                <td>
                  <div className="dash-member">
                    <span className="dash-avatar dash-avatar-sm" />
                    <div><strong>{m.name}{m.you && <span className="dash-you">You</span>}</strong><span>{m.email}</span></div>
                  </div>
                </td>
                <td><span className={`dash-role ${roleClass(m.role)}`}>{m.role}</span></td>
                <td className="dash-td-muted">{m.active}</td>
                <td>{m.pending ? <span className="dash-status dash-status-scheduled">Pending</span> : <span className="dash-status dash-status-live" style={{ color: '#36a06a', background: 'rgba(54,160,106,0.12)' }}>Active</span>}</td>
                <td className="dash-td-muted dash-dots">···</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashLayout>
  )
}
