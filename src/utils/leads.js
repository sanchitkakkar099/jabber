const LEADS_KEY    = 'jabber_leads'
const SIGNUPS_KEY  = 'jabber_signups'
const SEEDED_KEY   = 'jabber_seeded'

// ── Helpers ──────────────────────────────────────────────────────────────────
function read(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] }
}
function write(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

// ── Leads (CTA email captures) ───────────────────────────────────────────────
export function saveLead({ email, source = 'CTA', page = '/' }) {
  const leads = read(LEADS_KEY)
  if (leads.find(l => l.email === email)) return   // no duplicates
  leads.unshift({ id: Date.now(), email, source, page, date: new Date().toISOString(), status: 'new' })
  write(LEADS_KEY, leads)
}

export function getLeads() { return read(LEADS_KEY) }

export function updateLeadStatus(id, status) {
  write(LEADS_KEY, read(LEADS_KEY).map(l => l.id === id ? { ...l, status } : l))
}

// ── Signups (full form submissions) ──────────────────────────────────────────
export function saveSignup({ firstName, lastName, email, company, role }) {
  const signups = read(SIGNUPS_KEY)
  if (signups.find(s => s.email === email)) return
  signups.unshift({
    id: Date.now(),
    firstName, lastName, email,
    company: company || '—',
    role: role || '—',
    plan: 'Starter (Free Credits)',
    date: new Date().toISOString(),
    status: 'waitlist'
  })
  write(SIGNUPS_KEY, signups)
}

export function getSignups() { return read(SIGNUPS_KEY) }

export function updateSignupStatus(id, status) {
  write(SIGNUPS_KEY, read(SIGNUPS_KEY).map(s => s.id === id ? { ...s, status } : s))
}

// ── CSV Export ────────────────────────────────────────────────────────────────
export function exportCSV(data, filename) {
  if (!data.length) return
  const keys = Object.keys(data[0])
  const rows = [keys.join(','), ...data.map(r => keys.map(k => `"${(r[k] ?? '').toString().replace(/"/g, '""')}"`).join(','))]
  const blob = new Blob([rows.join('\n')], { type: 'text/csv' })
  const url  = URL.createObjectURL(blob)
  const a    = Object.assign(document.createElement('a'), { href: url, download: filename })
  a.click(); URL.revokeObjectURL(url)
}

// ── Seed demo data (runs once on first admin visit) ───────────────────────────
export function seedDemoData() {
  if (localStorage.getItem(SEEDED_KEY)) return
  const now = Date.now()
  const day = 86400000

  const demoLeads = [
    { id: now-1,    email: 'sarah.chen@globalconf.io',   source: 'Hero CTA',    page: '/',            date: new Date(now - 1*day).toISOString(),   status: 'contacted' },
    { id: now-2,    email: 'marco.b@euromedia.eu',       source: 'Hero CTA',    page: '/',            date: new Date(now - 2*day).toISOString(),   status: 'new' },
    { id: now-3,    email: 'priya.nair@techsummit.in',   source: 'Pricing CTA', page: '/pricing',     date: new Date(now - 2*day).toISOString(),   status: 'new' },
    { id: now-4,    email: 'james.o@broadcastuk.co.uk',  source: 'Features CTA',page: '/features',    date: new Date(now - 3*day).toISOString(),   status: 'interested' },
    { id: now-5,    email: 'anika.s@worshiptech.org',    source: 'Hero CTA',    page: '/',            date: new Date(now - 4*day).toISOString(),   status: 'contacted' },
    { id: now-6,    email: 'luca.m@sportsmedia.it',      source: 'How It Works',page: '/how-it-works',date: new Date(now - 5*day).toISOString(),   status: 'new' },
    { id: now-7,    email: 'fatima.z@confhub.ae',        source: 'Hero CTA',    page: '/',            date: new Date(now - 6*day).toISOString(),   status: 'new' },
    { id: now-8,    email: 'alex.r@unibroadcast.edu',    source: 'Blog CTA',    page: '/blog',        date: new Date(now - 7*day).toISOString(),   status: 'interested' },
    { id: now-9,    email: 'nina.k@events.de',           source: 'Pricing CTA', page: '/pricing',     date: new Date(now - 9*day).toISOString(),   status: 'new' },
    { id: now-10,   email: 'carlos.v@latinconf.mx',      source: 'Hero CTA',    page: '/',            date: new Date(now-11*day).toISOString(),   status: 'contacted' },
    { id: now-11,   email: 'yuki.t@eventstech.jp',       source: 'Features CTA',page: '/features',    date: new Date(now-13*day).toISOString(),   status: 'new' },
    { id: now-12,   email: 'helen.f@ngoconnect.org',     source: 'Use Cases',   page: '/use-cases',   date: new Date(now-15*day).toISOString(),   status: 'interested' },
    { id: now-13,   email: 'david.p@mediapro.fr',        source: 'Blog CTA',    page: '/blog',        date: new Date(now-18*day).toISOString(),   status: 'new' },
    { id: now-14,   email: 'riya.g@startupconf.co',      source: 'Hero CTA',    page: '/',            date: new Date(now-20*day).toISOString(),   status: 'contacted' },
    { id: now-15,   email: 'tom.w@hybridevents.io',      source: 'Pricing CTA', page: '/pricing',     date: new Date(now-23*day).toISOString(),   status: 'new' },
  ]

  const demoSignups = [
    { id: now-101, firstName:'Sofia',   lastName:'Martinez',  email:'sofia.m@euromedia.eu',     company:'EuroMedia Group',      role:'event-organiser', plan:'Starter (Free Credits)', date: new Date(now - 1*day).toISOString(),  status:'waitlist'  },
    { id: now-102, firstName:'Arjun',   lastName:'Kumar',     email:'arjun.k@techconfasia.com', company:'TechConf Asia',         role:'av-tech',         plan:'Starter (Free Credits)', date: new Date(now - 3*day).toISOString(),  status:'waitlist'  },
    { id: now-103, firstName:'Mei',     lastName:'Zhang',     email:'mei.z@globalevents.cn',    company:'Global Events Co.',     role:'broadcast',       plan:'Starter (Free Credits)', date: new Date(now - 5*day).toISOString(),  status:'interested'},
    { id: now-104, firstName:'Ben',     lastName:'Harper',    email:'ben.h@streamdev.io',       company:'StreamDev',             role:'developer',       plan:'Starter (Free Credits)', date: new Date(now - 7*day).toISOString(),  status:'waitlist'  },
    { id: now-105, firstName:'Lena',    lastName:'Bauer',     email:'lena.b@conftech.de',       company:'ConfTech GmbH',         role:'event-organiser', plan:'Starter (Free Credits)', date: new Date(now - 9*day).toISOString(),  status:'interested'},
    { id: now-106, firstName:'Oluwaseun',lastName:'Adeyemi',  email:'seun.a@africaconf.ng',     company:'Africa Conf',           role:'other',           plan:'Starter (Free Credits)', date: new Date(now-12*day).toISOString(),  status:'waitlist'  },
    { id: now-107, firstName:'Isabel',  lastName:'Costa',     email:'isabel.c@mediacorp.br',    company:'MediaCorp Brasil',      role:'broadcast',       plan:'Starter (Free Credits)', date: new Date(now-16*day).toISOString(),  status:'waitlist'  },
    { id: now-108, firstName:'James',   lastName:'O\'Brien',  email:'james.ob@churchtech.ie',   company:'ChurchTech Ireland',    role:'other',           plan:'Starter (Free Credits)', date: new Date(now-21*day).toISOString(),  status:'interested'},
  ]

  write(LEADS_KEY,   demoLeads)
  write(SIGNUPS_KEY, demoSignups)
  localStorage.setItem(SEEDED_KEY, '1')
}
