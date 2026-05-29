const TICKETS_KEY  = 'jabber_tickets'
const T_SEEDED_KEY = 'jabber_tickets_seeded'

export const TICKET_STATUSES    = ['open', 'in-progress', 'resolved', 'closed']
export const TICKET_PRIORITIES  = ['low', 'medium', 'high', 'urgent']
export const TICKET_CATEGORIES  = ['Technical', 'Billing', 'General', 'Feature Request', 'Bug Report']

function read()         { try { return JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]') } catch { return [] } }
function write(data)    { localStorage.setItem(TICKETS_KEY, JSON.stringify(data)) }

export function saveTicket({ name, email, category, subject, message, priority = 'medium' }) {
  const tickets = read()
  tickets.unshift({
    id: Date.now(),
    name, email, category, subject, message,
    priority,
    status: 'open',
    notes: [],
    createdAt:  new Date().toISOString(),
    updatedAt:  new Date().toISOString(),
  })
  write(tickets)
}

export function getTickets() { return read() }

export function updateTicket(id, patch) {
  write(read().map(t => t.id === id ? { ...t, ...patch, updatedAt: new Date().toISOString() } : t))
}

export function addTicketNote(id, text) {
  write(read().map(t => {
    if (t.id !== id) return t
    return { ...t, notes: [...(t.notes || []), { text, addedAt: new Date().toISOString() }], updatedAt: new Date().toISOString() }
  }))
}

// ── Demo seed ─────────────────────────────────────────────────────────────────
export function seedTickets() {
  if (localStorage.getItem(T_SEEDED_KEY)) return
  const now = Date.now()
  const day = 86400000
  write([
    { id: now-1, name:'Arjun Kumar',    email:'arjun.k@techconfasia.com', category:'Technical',       subject:'Stream drops after ~20 minutes', message:'Hi, I\'ve been testing with OBS and my stream disconnects from Jabber after about 20 minutes. RTMP logs show a "connection reset" error. This happens on every attempt. Please help!', priority:'high',   status:'open',        notes:[], createdAt: new Date(now-1*day).toISOString(), updatedAt: new Date(now-1*day).toISOString() },
    { id: now-2, name:'Sofia Martinez', email:'sofia.m@euromedia.eu',     category:'Billing',          subject:'Question about free credit usage', message:'I signed up and got the $100 free credits. Can you tell me the exact per-minute rate so I can plan my first event? I want to make sure I don\'t run out mid-stream.', priority:'medium', status:'in-progress',  notes:[{ text:'Sent pricing breakdown email. Per-minute rate is $1.40/min for up to 100 viewers with 2 languages.', addedAt: new Date(now-1*day).toISOString() }], createdAt: new Date(now-2*day).toISOString(), updatedAt: new Date(now-1*day).toISOString() },
    { id: now-3, name:'Ben Harper',     email:'ben.h@streamdev.io',       category:'Feature Request',  subject:'API webhook for transcript export', message:'Is there a way to get a webhook callback with the full transcript after an event ends? We\'d love to automatically archive translated transcripts in our CMS.', priority:'low',    status:'open',        notes:[], createdAt: new Date(now-4*day).toISOString(), updatedAt: new Date(now-4*day).toISOString() },
    { id: now-4, name:'Lena Bauer',     email:'lena.b@conftech.de',       category:'Technical',       subject:'Arabic translation quality issues', message:'Arabic translations sound robotic and sometimes incorrect. Other languages (EN, FR, DE) work great. Wondering if Arabic TTS model is different?', priority:'medium', status:'resolved',     notes:[{ text:'Escalated to AI team. Arabic TTS uses a different voice model — improved version deploying next week.', addedAt: new Date(now-2*day).toISOString() }], createdAt: new Date(now-7*day).toISOString(), updatedAt: new Date(now-2*day).toISOString() },
    { id: now-5, name:'Isabel Costa',   email:'isabel.c@mediacorp.br',    category:'General',          subject:'Can we white-label the viewer page?', message:'We are a media company and want to offer Jabber-powered translation under our own brand. Is white-labelling or iframe embedding of the viewer page possible on Pro?', priority:'medium', status:'open',        notes:[], createdAt: new Date(now-9*day).toISOString(), updatedAt: new Date(now-9*day).toISOString() },
  ])
  localStorage.setItem(T_SEEDED_KEY, '1')
}
