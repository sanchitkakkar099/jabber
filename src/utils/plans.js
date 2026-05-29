const PLANS_KEY = 'jabber_plans'

export const DEFAULT_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    priceDisplay: 'Free',
    priceSuffix: '',
    priceNote: '$100 in credits on sign-up',
    showCurrency: false,
    desc: 'No credit card required. Get $100 in free credits the moment you sign up — enough to run your first multilingual event today.',
    ctaText: 'Get started free',
    ctaLink: '/signup',
    ctaStyle: 'ghost',
    badge: '',
    featured: false,
    features: [
      { text: 'Up to 100 concurrent viewers', yes: true },
      { text: '2 languages per event', yes: true },
      { text: 'Captions & audio translation', yes: true },
      { text: '1 hr event · covers ~1 event', yes: true },
      { text: 'Custom branding', yes: false },
      { text: 'API access', yes: false },
      { text: 'Priority support', yes: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    priceDisplay: '299',
    priceSuffix: '/ month',
    showCurrency: true,
    desc: 'For regular events and growing organisations that need reliability and scale.',
    ctaText: 'Get started',
    ctaLink: '/signup',
    ctaStyle: 'solid',
    badge: 'Most Popular',
    featured: true,
    features: [
      { text: 'Up to 5,000 concurrent viewers', yes: true },
      { text: '10+ languages per event', yes: true },
      { text: 'Captions & audio translation', yes: true },
      { text: 'Unlimited streaming hours', yes: true },
      { text: 'Custom branding', yes: true },
      { text: 'Full API access', yes: true },
      { text: 'Dedicated SLA', yes: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    priceDisplay: 'Custom',
    priceSuffix: '',
    showCurrency: false,
    desc: 'For large-scale events, media companies, and organisations with custom requirements.',
    ctaText: 'Contact sales',
    ctaLink: '/contact',
    ctaStyle: 'outline',
    badge: '',
    featured: false,
    features: [
      { text: 'Unlimited concurrent viewers', yes: true },
      { text: 'All languages supported', yes: true },
      { text: 'Custom voice models', yes: true },
      { text: 'Dedicated infrastructure', yes: true },
      { text: 'SSO & custom domain', yes: true },
      { text: '99.99% uptime SLA', yes: true },
      { text: 'Dedicated account manager', yes: true },
    ],
  },
]

function read() { try { return JSON.parse(localStorage.getItem(PLANS_KEY) || 'null') } catch { return null } }
function write(d) { localStorage.setItem(PLANS_KEY, JSON.stringify(d)) }

export function getPlans() { return read() || DEFAULT_PLANS }
export function savePlan(updated) { write(getPlans().map(p => p.id === updated.id ? { ...updated } : p)) }
export function resetPlans() { localStorage.removeItem(PLANS_KEY) }
