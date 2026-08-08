-- SOLVEEK CMS schema
create extension if not exists "pgcrypto";

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_title text not null default '',
  description text not null default '',
  long_description text not null default '',
  icon text not null default 'Layers',
  image text not null default '',
  features text[] not null default '{}',
  benefits text[] not null default '{}',
  featured boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.industries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  icon text not null default 'Layers',
  image text not null default '',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  industry text not null default '',
  location text not null default '',
  challenge text not null default '',
  solution text not null default '',
  results text[] not null default '{}',
  image text not null default '',
  gallery text[] not null default '{}',
  featured boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  category text not null default 'General',
  author text not null default 'SOLVEEK',
  date date not null default current_date,
  read_time text not null default '5 min',
  image text not null default '',
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text not null default 'General',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  company text not null default '',
  quote text not null,
  rating int not null default 5 check (rating between 1 and 5),
  image text not null default '',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.stats (
  id uuid primary key default gen_random_uuid(),
  value numeric not null,
  suffix text not null default '',
  label text not null,
  decimals int not null default 0,
  sort_order int not null default 0,
  published boolean not null default true
);

create table if not exists public.process_steps (
  id uuid primary key default gen_random_uuid(),
  step int not null unique,
  title text not null,
  description text not null default '',
  published boolean not null default true
);

create table if not exists public.timeline (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  title text not null,
  description text not null default '',
  sort_order int not null default 0,
  published boolean not null default true
);

create table if not exists public.offices (
  id uuid primary key default gen_random_uuid(),
  city text not null,
  country text not null,
  address text not null default '',
  phone text not null default '',
  email text not null default '',
  sort_order int not null default 0,
  published boolean not null default true
);

create table if not exists public.why_choose (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  icon text not null default 'Sparkles',
  sort_order int not null default 0,
  published boolean not null default true
);

create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  phone text,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  phone text,
  service text,
  budget text,
  timeline text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.services enable row level security;
alter table public.industries enable row level security;
alter table public.projects enable row level security;
alter table public.insights enable row level security;
alter table public.faqs enable row level security;
alter table public.testimonials enable row level security;
alter table public.stats enable row level security;
alter table public.process_steps enable row level security;
alter table public.timeline enable row level security;
alter table public.offices enable row level security;
alter table public.why_choose enable row level security;
alter table public.site_content enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.quote_requests enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Public read for published content
create policy "Public read services" on public.services for select using (published = true);
create policy "Public read industries" on public.industries for select using (published = true);
create policy "Public read projects" on public.projects for select using (published = true);
create policy "Public read insights" on public.insights for select using (published = true);
create policy "Public read faqs" on public.faqs for select using (published = true);
create policy "Public read testimonials" on public.testimonials for select using (published = true);
create policy "Public read stats" on public.stats for select using (published = true);
create policy "Public read process_steps" on public.process_steps for select using (published = true);
create policy "Public read timeline" on public.timeline for select using (published = true);
create policy "Public read offices" on public.offices for select using (published = true);
create policy "Public read why_choose" on public.why_choose for select using (published = true);
create policy "Public read site_content" on public.site_content for select using (true);

-- Anyone can submit forms
create policy "Public insert contact" on public.contact_submissions for insert with check (true);
create policy "Public insert quotes" on public.quote_requests for insert with check (true);
create policy "Public insert newsletter" on public.newsletter_subscribers for insert with check (true);
