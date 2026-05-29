const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
const UTM_KEY    = 'jabber_utm'

/**
 * Call on every page load. Reads UTM params from the current URL
 * and persists them in sessionStorage for the duration of the session.
 * Only overwrites if new UTM params are present (first-touch attribution).
 */
export function captureUTM() {
  const p    = new URLSearchParams(window.location.search)
  const found = {}
  let   any   = false
  for (const k of UTM_PARAMS) {
    if (p.has(k)) { found[k] = p.get(k); any = true }
  }
  // Only write if we actually found UTM params (preserve first-touch)
  if (any) sessionStorage.setItem(UTM_KEY, JSON.stringify(found))
}

/** Returns the current session's UTM data (or {} if none). */
export function getUTM() {
  try { return JSON.parse(sessionStorage.getItem(UTM_KEY) || '{}') } catch { return {} }
}

/** Human-readable label for a UTM record. */
export function utmLabel(utm) {
  if (!utm || !utm.utm_source) return 'Organic / Direct'
  const parts = [utm.utm_source, utm.utm_medium, utm.utm_campaign].filter(Boolean)
  return parts.join(' › ')
}
