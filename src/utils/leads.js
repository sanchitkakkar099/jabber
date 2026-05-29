import { getUTM } from './utm'
import { supabase } from './supabase'

// ── localStorage fallback keys ─────────────────────────────────────────────────
const LEADS_KEY   = 'jabber_leads'
const SIGNUPS_KEY = 'jabber_signups'
const SEEDED_KEY  = 'jabber_seeded'

function lsRead(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] }
}
function lsWrite(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

// ── Row → UI shape mappers ─────────────────────────────────────────────────────
function rowToLead(row) {
  return {
    id:     row.id,
    email:  row.email,
    source: row.source  || 'CTA',
    page:   row.page    || '/',
    utm: {
      utm_source:   row.utm_source   || '',
      utm_medium:   row.utm_medium   || '',
      utm_campaign: row.utm_campaign || '',
      utm_content:  row.utm_content  || '',
      utm_term:     row.utm_term     || '',
    },
    date:   row.created_at,
    status: row.status  || 'new',
  }
}

function rowToSignup(row) {
  return {
    id:        row.id,
    firstName: row.first_name || '',
    lastName:  row.last_name  || '',
    email:     row.email,
    company:   row.company    || '—',
    role:      row.role       || '—',
    plan:      row.plan       || 'Starter (Free Credits)',
    utm: {
      utm_source:   row.utm_source   || '',
      utm_medium:   row.utm_medium   || '',
      utm_campaign: row.utm_campaign || '',
      utm_content:  row.utm_content  || '',
      utm_term:     row.utm_term     || '',
    },
    date:   row.created_at,
    status: row.status || 'waitlist',
  }
}

// ── Leads ─────────────────────────────────────────────────────────────────────
export async function saveLead({ email, source = 'CTA', page = '/' }) {
  const utm = getUTM()
  if (supabase) {
    const { error } = await supabase.from('leads').insert({
      email, source, page,
      utm_source:   utm.utm_source   || null,
      utm_medium:   utm.utm_medium   || null,
      utm_campaign: utm.utm_campaign || null,
      utm_content:  utm.utm_content  || null,
      utm_term:     utm.utm_term     || null,
    })
    if (error) console.error('saveLead:', error.message)
  } else {
    const leads = lsRead(LEADS_KEY)
    if (leads.find(l => l.email === email)) return
    leads.unshift({ id: Date.now(), email, source, page, utm, date: new Date().toISOString(), status: 'new' })
    lsWrite(LEADS_KEY, leads)
  }
}

export async function getLeads() {
  if (supabase) {
    const { data, error } = await supabase
      .from('leads').select('*').order('created_at', { ascending: false })
    if (error) { console.error('getLeads:', error.message); return [] }
    return (data || []).map(rowToLead)
  }
  return lsRead(LEADS_KEY)
}

export async function updateLeadStatus(id, status) {
  if (supabase) {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id)
    if (error) console.error('updateLeadStatus:', error.message)
  } else {
    lsWrite(LEADS_KEY, lsRead(LEADS_KEY).map(l => l.id === id ? { ...l, status } : l))
  }
}

// ── Signups ───────────────────────────────────────────────────────────────────
export async function saveSignup({ firstName, lastName, email, company, role }) {
  const utm = getUTM()
  if (supabase) {
    const { error } = await supabase.from('signups').insert({
      first_name: firstName,
      last_name:  lastName,
      email,
      company:    company || null,
      role:       role    || null,
      plan:       'Starter (Free Credits)',
      utm_source:   utm.utm_source   || null,
      utm_medium:   utm.utm_medium   || null,
      utm_campaign: utm.utm_campaign || null,
      utm_content:  utm.utm_content  || null,
      utm_term:     utm.utm_term     || null,
    })
    if (error) console.error('saveSignup:', error.message)
  } else {
    const signups = lsRead(SIGNUPS_KEY)
    if (signups.find(s => s.email === email)) return
    signups.unshift({
      id: Date.now(), firstName, lastName, email,
      company: company || '—', role: role || '—',
      plan: 'Starter (Free Credits)',
      utm, date: new Date().toISOString(), status: 'waitlist'
    })
    lsWrite(SIGNUPS_KEY, signups)
  }
}

export async function getSignups() {
  if (supabase) {
    const { data, error } = await supabase
      .from('signups').select('*').order('created_at', { ascending: false })
    if (error) { console.error('getSignups:', error.message); return [] }
    return (data || []).map(rowToSignup)
  }
  return lsRead(SIGNUPS_KEY)
}

export async function updateSignupStatus(id, status) {
  if (supabase) {
    const { error } = await supabase.from('signups').update({ status }).eq('id', id)
    if (error) console.error('updateSignupStatus:', error.message)
  } else {
    lsWrite(SIGNUPS_KEY, lsRead(SIGNUPS_KEY).map(s => s.id === id ? { ...s, status } : s))
  }
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

// ── Seed demo data ────────────────────────────────────────────────────────────
export async function seedDemoData() {
  // When Supabase is connected we never seed — the DB should only contain real data
  if (supabase) return

  // localStorage demo mode only
  const now = Date.now()
  const day = 86400000
  if (localStorage.getItem(SEEDED_KEY)) return
  const demoLeads = [
    { id: now-1,  email:'sarah.chen@globalconf.io',  source:'Hero CTA',     page:'/',             utm:{ utm_source:'google',   utm_medium:'cpc',     utm_campaign:'brand-search'    }, date:new Date(now-1*day).toISOString(),  status:'contacted'  },
    { id: now-2,  email:'marco.b@euromedia.eu',      source:'Hero CTA',     page:'/',             utm:{ utm_source:'linkedin', utm_medium:'social',  utm_campaign:'event-organizers' }, date:new Date(now-2*day).toISOString(),  status:'new'        },
    { id: now-3,  email:'priya.nair@techsummit.in',  source:'Pricing CTA',  page:'/pricing',      utm:{ utm_source:'google',   utm_medium:'cpc',     utm_campaign:'brand-search'    }, date:new Date(now-2*day).toISOString(),  status:'new'        },
    { id: now-4,  email:'james.o@broadcastuk.co.uk', source:'Features CTA', page:'/features',     utm:{ utm_source:'twitter',  utm_medium:'social',  utm_campaign:'product-launch'  }, date:new Date(now-3*day).toISOString(),  status:'interested' },
    { id: now-5,  email:'anika.s@worshiptech.org',   source:'Hero CTA',     page:'/',             utm:{},                                                                              date:new Date(now-4*day).toISOString(),  status:'contacted'  },
    { id: now-6,  email:'luca.m@sportsmedia.it',     source:'How It Works', page:'/how-it-works', utm:{ utm_source:'google',   utm_medium:'organic', utm_campaign:''               }, date:new Date(now-5*day).toISOString(),  status:'new'        },
    { id: now-7,  email:'fatima.z@confhub.ae',       source:'Hero CTA',     page:'/',             utm:{ utm_source:'linkedin', utm_medium:'social',  utm_campaign:'event-organizers' }, date:new Date(now-6*day).toISOString(),  status:'new'        },
    { id: now-8,  email:'alex.r@unibroadcast.edu',   source:'Blog CTA',     page:'/blog',         utm:{},                                                                              date:new Date(now-7*day).toISOString(),  status:'interested' },
    { id: now-9,  email:'nina.k@events.de',          source:'Pricing CTA',  page:'/pricing',      utm:{ utm_source:'google',   utm_medium:'cpc',     utm_campaign:'competitor'      }, date:new Date(now-9*day).toISOString(),  status:'new'        },
    { id: now-10, email:'carlos.v@latinconf.mx',     source:'Hero CTA',     page:'/',             utm:{ utm_source:'twitter',  utm_medium:'social',  utm_campaign:'product-launch'  }, date:new Date(now-11*day).toISOString(), status:'contacted'  },
    { id: now-11, email:'yuki.t@eventstech.jp',      source:'Features CTA', page:'/features',     utm:{},                                                                              date:new Date(now-13*day).toISOString(), status:'new'        },
    { id: now-12, email:'helen.f@ngoconnect.org',    source:'Use Cases',    page:'/use-cases',    utm:{ utm_source:'referral', utm_medium:'referral', utm_campaign:''               }, date:new Date(now-15*day).toISOString(), status:'interested' },
    { id: now-13, email:'david.p@mediapro.fr',       source:'Blog CTA',     page:'/blog',         utm:{ utm_source:'linkedin', utm_medium:'social',  utm_campaign:'content'         }, date:new Date(now-18*day).toISOString(), status:'new'        },
    { id: now-14, email:'riya.g@startupconf.co',     source:'Hero CTA',     page:'/',             utm:{ utm_source:'google',   utm_medium:'cpc',     utm_campaign:'brand-search'    }, date:new Date(now-20*day).toISOString(), status:'contacted'  },
    { id: now-15, email:'tom.w@hybridevents.io',     source:'Pricing CTA',  page:'/pricing',      utm:{},                                                                              date:new Date(now-23*day).toISOString(), status:'new'        },
  ]
  const demoSignups = [
    { id: now-101, firstName:'Sofia',     lastName:'Martinez', email:'sofia.m@euromedia.eu',     company:'EuroMedia Group',      role:'event-organiser', plan:'Starter (Free Credits)', utm:{ utm_source:'linkedin', utm_medium:'social', utm_campaign:'event-organizers' }, date: new Date(now-1*day).toISOString(),  status:'waitlist'   },
    { id: now-102, firstName:'Arjun',     lastName:'Kumar',    email:'arjun.k@techconfasia.com', company:'TechConf Asia',         role:'av-tech',         plan:'Starter (Free Credits)', utm:{ utm_source:'google',   utm_medium:'cpc',   utm_campaign:'brand-search'     }, date: new Date(now-3*day).toISOString(),  status:'waitlist'   },
    { id: now-103, firstName:'Mei',       lastName:'Zhang',    email:'mei.z@globalevents.cn',    company:'Global Events Co.',     role:'broadcast',       plan:'Starter (Free Credits)', utm:{},                                                                              date: new Date(now-5*day).toISOString(),  status:'interested' },
    { id: now-104, firstName:'Ben',       lastName:'Harper',   email:'ben.h@streamdev.io',       company:'StreamDev',             role:'developer',       plan:'Starter (Free Credits)', utm:{},                                                                              date: new Date(now-7*day).toISOString(),  status:'waitlist'   },
    { id: now-105, firstName:'Lena',      lastName:'Bauer',    email:'lena.b@conftech.de',       company:'ConfTech GmbH',         role:'event-organiser', plan:'Starter (Free Credits)', utm:{ utm_source:'google',   utm_medium:'cpc',   utm_campaign:'competitor'       }, date: new Date(now-9*day).toISOString(),  status:'interested' },
    { id: now-106, firstName:'Oluwaseun', lastName:'Adeyemi',  email:'seun.a@africaconf.ng',     company:'Africa Conf',           role:'other',           plan:'Starter (Free Credits)', utm:{},                                                                              date: new Date(now-12*day).toISOString(), status:'waitlist'   },
    { id: now-107, firstName:'Isabel',    lastName:'Costa',    email:'isabel.c@mediacorp.br',    company:'MediaCorp Brasil',      role:'broadcast',       plan:'Starter (Free Credits)', utm:{},                                                                              date: new Date(now-16*day).toISOString(), status:'waitlist'   },
    { id: now-108, firstName:'James',     lastName:'OBrien',   email:'james.ob@churchtech.ie',   company:'ChurchTech Ireland',    role:'other',           plan:'Starter (Free Credits)', utm:{},                                                                              date: new Date(now-21*day).toISOString(), status:'interested' },
  ]
  lsWrite(LEADS_KEY,   demoLeads)
  lsWrite(SIGNUPS_KEY, demoSignups)
  localStorage.setItem(SEEDED_KEY, '1')
}
