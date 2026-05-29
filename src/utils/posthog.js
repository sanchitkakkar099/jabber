import posthog from 'posthog-js'

let initialised = false

/**
 * Call once at app startup (main.jsx).
 * Safe to call if VITE_POSTHOG_KEY is missing — returns silently.
 */
export function initPostHog() {
  const key = import.meta.env.VITE_POSTHOG_KEY
  if (!key || key === 'phc_YOUR_KEY_HERE' || initialised) return
  posthog.init(key, {
    api_host:         'https://us.i.posthog.com',
    autocapture:      false,   // keep bundle lean, no accidental PII
    capture_pageview: false,   // we fire manually via trackPageview()
    persistence:      'localStorage+cookie',
  })
  initialised = true
}

/** Fire a manual $pageview (called from ScrollToTop in App.jsx). */
export function trackPageview(path) {
  if (!initialised) return
  posthog.capture('$pageview', { path, $current_url: window.location.href })
}

/**
 * General event tracker — safe to call even if PostHog is not configured.
 * @param {string} event  - event name, e.g. 'lead_captured'
 * @param {object} props  - optional extra properties
 */
export function track(event, props = {}) {
  if (!initialised) return
  posthog.capture(event, props)
}
