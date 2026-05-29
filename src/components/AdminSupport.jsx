import { useState } from 'react'
import { TICKET_STATUSES, TICKET_PRIORITIES, TICKET_CATEGORIES } from '../utils/tickets'

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })
}
function fmtDateTime(iso) {
  return new Date(iso).toLocaleString('en-GB', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })
}

const STATUS_STYLES = {
  'open':        { bg:'#eff6ff', color:'#3b82f6' },
  'in-progress': { bg:'#fefce8', color:'#ca8a04' },
  'resolved':    { bg:'#f0fdf4', color:'#16a34a' },
  'closed':      { bg:'#f8fafc', color:'#64748b' },
}
const PRIORITY_STYLES = {
  'low':    { bg:'#f8fafc', color:'#64748b' },
  'medium': { bg:'#eff6ff', color:'#3b82f6' },
  'high':   { bg:'#fff7ed', color:'#ea580c' },
  'urgent': { bg:'#fef2f2', color:'#dc2626' },
}

function StatusBadge({ s }) {
  const style = STATUS_STYLES[s] || STATUS_STYLES.open
  return <span style={{ background:style.bg, color:style.color, padding:'2px 10px', borderRadius:999, fontSize:'0.7rem', fontWeight:700, textTransform:'capitalize', whiteSpace:'nowrap' }}>{s}</span>
}
function PriorityBadge({ p }) {
  const style = PRIORITY_STYLES[p] || PRIORITY_STYLES.medium
  return <span style={{ background:style.bg, color:style.color, padding:'2px 10px', borderRadius:999, fontSize:'0.7rem', fontWeight:700, textTransform:'capitalize', whiteSpace:'nowrap' }}>{p}</span>
}

function exportTicketCSV(tickets) {
  const headers = ['ID','Name','Email','Category','Subject','Priority','Status','Created','Updated']
  const rows = tickets.map(t => [
    t.id, t.name, t.email, t.category,
    `"${t.subject?.replace(/"/g,'""')}"`,
    t.priority, t.status,
    new Date(t.createdAt).toLocaleString('en-GB'),
    new Date(t.updatedAt).toLocaleString('en-GB'),
  ])
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type:'text/csv' }))
  a.download = 'jabber-tickets.csv'
  a.click()
}

// ── Expanded Ticket Row ───────────────────────────────────────────────────────
function TicketDetail({ ticket, onUpdate, onAddNote, onClose }) {
  const [note, setNote]         = useState('')
  const [saving, setSaving]     = useState(false)
  const [status, setStatus]     = useState(ticket.status)
  const [priority, setPriority] = useState(ticket.priority)

  function handleStatusChange(e) {
    const val = e.target.value
    setStatus(val)
    onUpdate(ticket.id, { status: val })
  }
  function handlePriorityChange(e) {
    const val = e.target.value
    setPriority(val)
    onUpdate(ticket.id, { priority: val })
  }
  function submitNote(e) {
    e.preventDefault()
    if (!note.trim()) return
    setSaving(true)
    onAddNote(ticket.id, note.trim())
    setNote('')
    setSaving(false)
  }

  return (
    <div className="adm-ticket-detail">
      <div className="adm-td-header">
        <div className="adm-td-meta">
          <span className="adm-td-id">#{String(ticket.id).slice(-5)}</span>
          <span className="adm-td-category">{ticket.category}</span>
          <span className="adm-td-time">Opened {fmtDate(ticket.createdAt)}</span>
        </div>
        <button className="adm-td-close" onClick={onClose}>✕</button>
      </div>

      <h4 className="adm-td-subject">{ticket.subject}</h4>
      <div className="adm-td-from">From: <strong>{ticket.name}</strong> · <a href={`mailto:${ticket.email}`}>{ticket.email}</a></div>

      <div className="adm-td-controls">
        <div className="adm-td-control-group">
          <label>Status</label>
          <select value={status} onChange={handleStatusChange} className="adm-status-select" style={{ background: STATUS_STYLES[status]?.bg, color: STATUS_STYLES[status]?.color }}>
            {TICKET_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="adm-td-control-group">
          <label>Priority</label>
          <select value={priority} onChange={handlePriorityChange} className="adm-status-select" style={{ background: PRIORITY_STYLES[priority]?.bg, color: PRIORITY_STYLES[priority]?.color }}>
            {TICKET_PRIORITIES.map(p => <option key={p} value={p}>{p.charAt(0).toUpperCase()+p.slice(1)}</option>)}
          </select>
        </div>
        <div className="adm-td-control-group">
          <label>Last updated</label>
          <span className="adm-td-time">{fmtDateTime(ticket.updatedAt)}</span>
        </div>
      </div>

      <div className="adm-td-message">
        <div className="adm-td-msg-label">Message</div>
        <p>{ticket.message}</p>
      </div>

      {ticket.notes?.length > 0 && (
        <div className="adm-td-notes">
          <div className="adm-td-msg-label">Internal Notes ({ticket.notes.length})</div>
          {ticket.notes.map((n, i) => (
            <div key={i} className="adm-note-item">
              <p>{n.text}</p>
              <span className="adm-note-time">{fmtDateTime(n.addedAt)}</span>
            </div>
          ))}
        </div>
      )}

      <form className="adm-td-note-form" onSubmit={submitNote}>
        <textarea
          className="adm-note-input"
          placeholder="Add an internal note (visible to admins only)…"
          value={note}
          onChange={e => setNote(e.target.value)}
          rows={3}
        />
        <button type="submit" className="btn btn-primary" style={{ padding:'8px 18px', fontSize:'0.82rem' }} disabled={saving || !note.trim()}>
          Add Note
        </button>
      </form>
    </div>
  )
}

// ── Main AdminSupport Component ───────────────────────────────────────────────
export default function AdminSupport({ tickets, onUpdate, onAddNote, onRefresh }) {
  const [search,   setSearch]   = useState('')
  const [statusF,  setStatusF]  = useState('all')
  const [priorityF,setPriorityF]= useState('all')
  const [sortDir,  setSortDir]  = useState('desc')
  const [expanded, setExpanded] = useState(null)

  const open       = tickets.filter(t => t.status === 'open').length
  const inProgress = tickets.filter(t => t.status === 'in-progress').length
  const resolved   = tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length

  const filtered = tickets
    .filter(t => statusF   === 'all' || t.status   === statusF)
    .filter(t => priorityF === 'all' || t.priority === priorityF)
    .filter(t => {
      const q = search.toLowerCase()
      return !q || t.name?.toLowerCase().includes(q) || t.email?.toLowerCase().includes(q) || t.subject?.toLowerCase().includes(q) || t.category?.toLowerCase().includes(q)
    })
    .sort((a,b) => sortDir === 'desc'
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
    )

  function handleUpdate(id, patch) {
    onUpdate(id, patch)
    onRefresh()
  }
  function handleAddNote(id, text) {
    onAddNote(id, text)
    onRefresh()
  }

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h1 className="adm-page-title">Support Tickets</h1>
          <p className="adm-page-sub">{tickets.length} total · {open} open · {inProgress} in progress</p>
        </div>
        <button className="adm-btn-outline" onClick={() => exportTicketCSV(tickets)}>↓ Export CSV</button>
      </div>

      {/* KPI chips */}
      <div className="adm-ticket-kpis">
        <div className="adm-tkpi" style={{ borderColor:'#3b82f6' }}>
          <span className="adm-tkpi-val" style={{ color:'#3b82f6' }}>{open}</span>
          <span className="adm-tkpi-label">Open</span>
        </div>
        <div className="adm-tkpi" style={{ borderColor:'#ca8a04' }}>
          <span className="adm-tkpi-val" style={{ color:'#ca8a04' }}>{inProgress}</span>
          <span className="adm-tkpi-label">In Progress</span>
        </div>
        <div className="adm-tkpi" style={{ borderColor:'#16a34a' }}>
          <span className="adm-tkpi-val" style={{ color:'#16a34a' }}>{resolved}</span>
          <span className="adm-tkpi-label">Resolved / Closed</span>
        </div>
        <div className="adm-tkpi" style={{ borderColor:'#6366f1' }}>
          <span className="adm-tkpi-val" style={{ color:'#6366f1' }}>{tickets.length}</span>
          <span className="adm-tkpi-label">Total</span>
        </div>
      </div>

      <div className="adm-card">
        {/* Toolbar */}
        <div className="adm-toolbar" style={{ flexWrap:'wrap', gap:10 }}>
          <input className="adm-search" placeholder="Search name, email, subject…" value={search} onChange={e=>setSearch(e.target.value)} style={{ minWidth:200 }} />
          <div className="adm-filter-pills">
            <span className="adm-filter-label">Status:</span>
            {['all', ...TICKET_STATUSES].map(s => (
              <button key={s} className={`adm-filter-pill${statusF===s?' active':''}`} onClick={()=>setStatusF(s)}>
                {s === 'all' ? 'All' : s}
              </button>
            ))}
          </div>
          <div className="adm-filter-pills">
            <span className="adm-filter-label">Priority:</span>
            {['all', ...TICKET_PRIORITIES].map(p => (
              <button key={p} className={`adm-filter-pill${priorityF===p?' active':''}`} onClick={()=>setPriorityF(p)}>
                {p === 'all' ? 'All' : p}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <table className="adm-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>From</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th style={{cursor:'pointer'}} onClick={()=>setSortDir(d=>d==='desc'?'asc':'desc')}>
                Opened {sortDir==='desc'?'↓':'↑'}
              </th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ textAlign:'center', padding:'32px', color:'#94a3b8' }}>No tickets found</td></tr>
            )}
            {filtered.map(t => (
              <>
                <tr
                  key={t.id}
                  className={`adm-ticket-row${expanded === t.id ? ' expanded' : ''}`}
                  onClick={() => setExpanded(expanded === t.id ? null : t.id)}
                  style={{ cursor:'pointer' }}
                >
                  <td style={{ fontWeight:600, maxWidth:280 }}>
                    <span className="adm-td-expand">{expanded === t.id ? '▾' : '▸'}</span>
                    {t.subject}
                  </td>
                  <td>
                    <div style={{ fontWeight:600, fontSize:'0.85rem' }}>{t.name}</div>
                    <div className="adm-td-muted" style={{ fontSize:'0.78rem' }}>{t.email}</div>
                  </td>
                  <td className="adm-td-muted">{t.category}</td>
                  <td><PriorityBadge p={t.priority} /></td>
                  <td><StatusBadge s={t.status} /></td>
                  <td className="adm-td-muted">{fmtDate(t.createdAt)}</td>
                  <td>
                    {t.notes?.length > 0
                      ? <span style={{ background:'#f0fdf4', color:'#16a34a', padding:'2px 8px', borderRadius:999, fontSize:'0.72rem', fontWeight:700 }}>{t.notes.length}</span>
                      : <span style={{ color:'#cbd5e1', fontSize:'0.78rem' }}>—</span>
                    }
                  </td>
                </tr>
                {expanded === t.id && (
                  <tr key={`${t.id}-detail`} className="adm-ticket-detail-row">
                    <td colSpan={7} style={{ padding:0 }}>
                      <TicketDetail
                        ticket={t}
                        onUpdate={handleUpdate}
                        onAddNote={handleAddNote}
                        onClose={() => setExpanded(null)}
                      />
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
