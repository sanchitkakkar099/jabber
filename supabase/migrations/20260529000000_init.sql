-- ── Jabber: initial schema ────────────────────────────────────────────────────

-- Leads (CTA email captures)
CREATE TABLE IF NOT EXISTS leads (
  id           uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  email        text        NOT NULL,
  source       text        DEFAULT 'CTA',
  page         text        DEFAULT '/',
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_content  text,
  utm_term     text,
  status       text        DEFAULT 'new',
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "leads_insert" ON leads FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "leads_select" ON leads FOR SELECT TO anon USING (true);
CREATE POLICY "leads_update" ON leads FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Signups (full form submissions)
CREATE TABLE IF NOT EXISTS signups (
  id           uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name   text,
  last_name    text,
  email        text        NOT NULL,
  company      text,
  role         text,
  plan         text        DEFAULT 'Starter (Free Credits)',
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  utm_content  text,
  utm_term     text,
  status       text        DEFAULT 'waitlist',
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE signups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "signups_insert" ON signups FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "signups_select" ON signups FOR SELECT TO anon USING (true);
CREATE POLICY "signups_update" ON signups FOR UPDATE TO anon USING (true) WITH CHECK (true);

-- Support tickets
CREATE TABLE IF NOT EXISTS tickets (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name       text,
  email      text,
  category   text,
  priority   text        DEFAULT 'medium',
  subject    text,
  message    text,
  status     text        DEFAULT 'open',
  notes      jsonb       DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tickets_insert" ON tickets FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "tickets_select" ON tickets FOR SELECT TO anon USING (true);
CREATE POLICY "tickets_update" ON tickets FOR UPDATE TO anon USING (true) WITH CHECK (true);
