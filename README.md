# Jabber — AI-Powered Live Translation Platform

> Real-time, AI-driven speech translation for live events, conferences, broadcasts, and worship services.

**Live site:** https://jabber-production.up.railway.app  
**Admin dashboard:** https://jabber-production.up.railway.app/admin

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Database Setup (Supabase)](#database-setup-supabase)
- [Admin Dashboard](#admin-dashboard)
- [Analytics (PostHog)](#analytics-posthog)
- [Deployment (Railway)](#deployment-railway)
- [Data Architecture](#data-architecture)
- [Pages & Routes](#pages--routes)

---

## Overview

Jabber is a marketing + admin website for an AI live-translation SaaS product. It includes:

- **Public marketing site** — landing page, features, pricing, how-it-works, use cases, blog, contact, and signup pages
- **Admin dashboard** (`/admin`) — password-protected panel to manage leads, signups, support tickets, blog posts, and pricing plans
- **PostgreSQL backend** — all user-submitted data (leads, signups, tickets) stored in Supabase with graceful localStorage fallback for offline/demo mode

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + React Router v6 |
| Build tool | Vite 5 |
| Database | Supabase (PostgreSQL, hosted) |
| Analytics | PostHog (privacy-first, 1M events/month free) |
| Deployment | Railway (Nixpacks → Node 20 + `serve`) |
| Styling | Plain CSS (`src/style.css`) |
| SEO | `react-helmet-async` |

---

## Project Structure

```
jabber/
├── public/                   # Static assets
├── src/
│   ├── components/
│   │   ├── AdminBlogEditor.jsx  # Rich blog post editor (admin)
│   │   ├── AdminSupport.jsx     # Support ticket manager (admin)
│   │   ├── Footer.jsx
│   │   ├── Nav.jsx
│   │   └── SEO.jsx              # Helmet wrapper for meta tags
│   ├── data/
│   │   └── posts.js             # Static blog post seed data
│   ├── hooks/
│   │   └── useScrollReveal.js   # Intersection Observer animation hook
│   ├── pages/
│   │   ├── Admin.jsx            # Full admin dashboard (auth-gated)
│   │   ├── Home.jsx
│   │   ├── Features.jsx
│   │   ├── Pricing.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── UseCases.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   ├── Signup.jsx
│   │   ├── Contact.jsx
│   │   ├── About.jsx
│   │   └── Login.jsx
│   ├── utils/
│   │   ├── supabase.js          # Supabase client init + isConnected()
│   │   ├── leads.js             # Lead + signup CRUD (Supabase / localStorage)
│   │   ├── tickets.js           # Ticket CRUD (Supabase / localStorage)
│   │   ├── blogStorage.js       # Blog post storage (localStorage only)
│   │   ├── plans.js             # Pricing plan storage (localStorage only)
│   │   ├── posthog.js           # PostHog init + track helpers
│   │   └── utm.js               # UTM parameter reader
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
├── supabase/
│   └── migrations/
│       └── 20260529000000_init.sql  # Full schema (leads, signups, tickets)
├── .env                      # Local env vars (git-ignored)
├── .env.example              # Template — copy to .env and fill in values
├── nixpacks.toml             # Railway build config (Node 20 + Vite)
├── railway.json              # Railway service config
├── vite.config.js
└── package.json
```

---

## Local Development

**Prerequisites:** Node 20+, npm

```bash
# 1. Clone the repo
git clone https://github.com/sanchitkakkar099/jabber.git
cd jabber

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your Supabase and PostHog keys (see below)

# 4. Start the dev server
npm run dev
# → http://localhost:5173
```

### Build for production

```bash
npm run build        # outputs to dist/
npm run preview      # preview the production build locally
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
# PostHog Analytics (optional but recommended)
# Get your key from https://app.posthog.com → Project Settings → Project API Key
VITE_POSTHOG_KEY=phc_YOUR_KEY_HERE

# Supabase PostgreSQL (required for real data storage)
# Get these from https://supabase.com → Project Settings → API
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
```

> **Important:** All `VITE_` variables are baked into the bundle at build time by Vite. After changing `.env`, restart `npm run dev` or rebuild.

> **Without Supabase configured:** The app runs in **Demo mode** — all data is stored in `localStorage` and pre-seeded with realistic demo records. The admin sidebar shows an amber `● Demo mode` chip.

> **With Supabase configured:** Data flows to PostgreSQL. Admin sidebar shows a green `● PostgreSQL` chip.

---

## Database Setup (Supabase)

### 1. Create a project
Go to [supabase.com](https://supabase.com) → New Project. Choose the free tier (500 MB storage, unlimited API calls).

### 2. Run the schema
Open the **SQL Editor** in your Supabase dashboard and paste the contents of `supabase/migrations/20260529000000_init.sql`, then click **Run**.

This creates three tables with Row Level Security enabled:

| Table | Purpose | Key columns |
|---|---|---|
| `leads` | Email captures from CTA forms | `email`, `source`, `page`, `utm_*`, `status` |
| `signups` | Full waitlist form submissions | `first_name`, `last_name`, `email`, `company`, `role`, `plan`, `utm_*`, `status` |
| `tickets` | Support ticket submissions | `name`, `email`, `category`, `priority`, `subject`, `message`, `status`, `notes` |

All three tables allow anonymous `INSERT`, `SELECT`, and `UPDATE` via the anon key (safe for a public-facing app — no user authentication required).

### 3. Get your credentials
**Project Settings → API:**
- **Project URL** → `VITE_SUPABASE_URL`
- **anon / public key** → `VITE_SUPABASE_ANON_KEY`

---

## Admin Dashboard

**URL:** `/admin`  
**Default password:** Set in `src/pages/Admin.jsx` → `ADMIN_PASS` constant

### Sections

| Section | Description |
|---|---|
| **Overview** | Live counts of leads, signups, tickets, and a conversion funnel |
| **Leads** | All email captures — status management (new / contacted / interested), CSV export, UTM attribution |
| **Signups** | Full waitlist submissions — status management, CSV export |
| **Support** | Ticket queue — priority/status/category filters, internal notes, full ticket history |
| **Blog** | Create, edit, and delete blog posts (stored in `localStorage`) |
| **Plans** | Edit pricing plan names, prices, features, and CTA copy (stored in `localStorage`) |

### Status values

**Leads / Signups:** `new` → `contacted` → `interested`  
**Tickets:** `open` → `in-progress` → `resolved` → `closed`

### Data modes

The admin dashboard automatically detects whether Supabase is configured:

- **PostgreSQL mode** — reads/writes to Supabase. Changes are visible from any browser/device instantly.
- **Demo mode** — reads/writes to the visitor's `localStorage`. Pre-seeded with 15 demo leads, 8 signups, and 5 tickets on first load.

---

## Analytics (PostHog)

Jabber uses [PostHog](https://posthog.com) for privacy-first product analytics.

- **Free tier:** 1 million events/month
- **No cookie banner required** (uses localStorage persistence, not third-party cookies)
- **Manual event tracking** — autocapture disabled to prevent accidental PII capture

### Events tracked

| Event | Trigger |
|---|---|
| `$pageview` | Every route change |
| `lead_captured` | CTA email form submission |
| `signup_submitted` | Waitlist form submission |
| `ticket_submitted` | Support form submission |

### PostHog setup
1. Create a free account at [app.posthog.com](https://app.posthog.com)
2. Create a project
3. Copy the **Project API Key** (starts with `phc_`)
4. Add it to `.env` as `VITE_POSTHOG_KEY`

---

## Deployment (Railway)

The project is deployed on [Railway](https://railway.app) using Nixpacks.

### How it builds

`nixpacks.toml` explicitly declares the build pipeline:

```toml
[phases.setup]
nixPkgs = ["nodejs_20"]

[phases.install]
cmds = ["npm ci"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm run start"   # serves dist/ via 'serve' on $PORT
```

### Deploy a new version

```bash
# Option 1 — push to GitHub (Railway auto-deploys on push to main)
git push origin main

# Option 2 — manual deploy via Railway CLI
railway link --project <PROJECT_ID> --environment production --service jabber
railway up --service jabber --detach
```

### Environment variables on Railway

Set these in **Railway → Project → Service → Variables:**

```
VITE_SUPABASE_URL       = https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY  = YOUR_ANON_KEY_HERE
VITE_POSTHOG_KEY        = phc_YOUR_KEY_HERE
```

> Railway bakes `VITE_` vars into the bundle during the `npm run build` phase, so they must be set **before** deploying, not after.

---

## Data Architecture

### Dual-mode data layer

All three data utilities (`leads.js`, `tickets.js`) follow a dual-mode pattern:

```
VITE_SUPABASE_URL set?
       │
  YES  ├──► Supabase PostgreSQL
       │      • INSERT / SELECT / UPDATE via REST API
       │      • Real-time, accessible from any device
       │
  NO   └──► localStorage fallback
             • JSON stored in browser storage
             • Auto-seeded with demo data on first visit
             • Resets on browser data clear
```

This means the app is fully functional without any backend configuration — useful for local development, demos, and staging previews.

### Optimistic UI updates

Status changes in the admin (lead status, ticket status, etc.) update React state immediately for a snappy feel, then persist to the database in the background. No full page refresh needed.

### Blog posts and pricing plans

These are intentionally **localStorage-only** — they are admin-managed content that does not need to be shared across devices in the current version.

---

## Pages & Routes

| Route | Component | Description |
|---|---|---|
| `/` | `Home.jsx` | Hero, features overview, CTA |
| `/features` | `Features.jsx` | Full feature breakdown |
| `/how-it-works` | `HowItWorks.jsx` | Step-by-step product explanation |
| `/use-cases` | `UseCases.jsx` | Vertical use cases (events, worship, sports…) |
| `/pricing` | `Pricing.jsx` | Pricing plans (loaded from localStorage via `plans.js`) |
| `/blog` | `Blog.jsx` | Blog index |
| `/blog/:slug` | `BlogPost.jsx` | Individual blog post |
| `/signup` | `Signup.jsx` | Waitlist / signup form |
| `/contact` | `Contact.jsx` | Support ticket submission form |
| `/about` | `About.jsx` | About page |
| `/admin` | `Admin.jsx` | Admin dashboard (password-gated) |

---

## License

Private — all rights reserved.
