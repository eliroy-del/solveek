-- Solveek CRM V1 schema
-- Namespace: crm_* (avoids collision with CMS projects/insights)

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

do $$ begin
  create type public.crm_role as enum (
    'super_admin',
    'admin',
    'sales',
    'project_manager',
    'marketing',
    'viewer'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.crm_lead_status as enum (
    'new',
    'contacted',
    'qualified',
    'unqualified',
    'nurture',
    'converted',
    'lost'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.crm_opportunity_stage as enum (
    'new',
    'contacted',
    'qualified',
    'discovery',
    'audit',
    'roadmap',
    'proposal',
    'negotiation',
    'won',
    'lost'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.crm_audit_status as enum (
    'submitted',
    'reviewing',
    'scheduled',
    'in_progress',
    'completed',
    'roadmap_sent',
    'converted',
    'closed'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.crm_activity_type as enum (
    'call',
    'email',
    'whatsapp',
    'meeting',
    'note',
    'task',
    'follow_up',
    'audit',
    'proposal',
    'system'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.crm_activity_status as enum (
    'planned',
    'completed',
    'cancelled',
    'overdue'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.crm_ecosystem_layer as enum (
    'foundation',
    'automation',
    'visibility',
    'unsure'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.crm_pricing_type as enum (
    'one_time',
    'monthly',
    'quarterly',
    'annual',
    'usage_based',
    'custom'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.crm_project_status as enum (
    'planning',
    'in_progress',
    'review',
    'client_review',
    'blocked',
    'completed',
    'on_hold',
    'cancelled'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.crm_task_status as enum (
    'todo',
    'in_progress',
    'review',
    'completed',
    'blocked'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.crm_client_status as enum (
    'prospect',
    'active',
    'retained',
    'expansion',
    'at_risk',
    'churned'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.crm_retainer_status as enum (
    'active',
    'paused',
    'ending',
    'expired',
    'cancelled'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.crm_priority as enum (
    'critical',
    'high',
    'medium',
    'low'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.crm_proposal_status as enum (
    'draft',
    'ready',
    'sent',
    'viewed',
    'negotiation',
    'accepted',
    'rejected',
    'expired'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.crm_note_visibility as enum (
    'internal',
    'client_visible'
  );
exception when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------------------
-- Profiles (auth.users mirror)
-- ---------------------------------------------------------------------------

create table if not exists public.crm_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text not null default '',
  role public.crm_role not null default 'viewer',
  phone text,
  avatar_url text,
  timezone text not null default 'Africa/Accra',
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  deleted_by uuid references public.crm_profiles (id)
);

create index if not exists crm_profiles_role_idx on public.crm_profiles (role) where deleted_at is null;
create index if not exists crm_profiles_active_idx on public.crm_profiles (is_active) where deleted_at is null;

-- ---------------------------------------------------------------------------
-- Lookup / catalogue
-- ---------------------------------------------------------------------------

create table if not exists public.crm_lead_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text not null default '',
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  ecosystem_layer public.crm_ecosystem_layer not null default 'foundation',
  pricing_type public.crm_pricing_type not null default 'one_time',
  base_price numeric(14, 2),
  currency text not null default 'GHS',
  is_recurring boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  color text not null default '#1358FE',
  created_at timestamptz not null default now()
);

create table if not exists public.crm_templates (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  channel text not null default 'email',
  subject text not null default '',
  body text not null default '',
  variables text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_organization_settings (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Solveek',
  legal_name text not null default 'Solveek',
  email text not null default 'hello@solveek.com',
  phone text not null default '',
  address text not null default '',
  city text not null default 'Accra',
  country text not null default 'Ghana',
  timezone text not null default 'Africa/Accra',
  currency text not null default 'GHS',
  currency_symbol text not null default 'GH₵',
  logo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Companies / Contacts
-- ---------------------------------------------------------------------------

create table if not exists public.crm_companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text,
  website text,
  email text,
  phone text,
  address text,
  city text,
  country text not null default 'Ghana',
  company_size text,
  revenue_range text,
  source_id uuid references public.crm_lead_sources (id) on delete set null,
  owner_id uuid references public.crm_profiles (id) on delete set null,
  status text not null default 'active',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  deleted_by uuid references public.crm_profiles (id)
);

create index if not exists crm_companies_name_idx on public.crm_companies (lower(name)) where deleted_at is null;
create index if not exists crm_companies_owner_idx on public.crm_companies (owner_id) where deleted_at is null;

create table if not exists public.crm_contacts (
  id uuid primary key default gen_random_uuid(),
  first_name text not null default '',
  last_name text not null default '',
  email text,
  phone text,
  whatsapp text,
  position text,
  role_label text,
  company_id uuid references public.crm_companies (id) on delete set null,
  status text not null default 'active',
  source_id uuid references public.crm_lead_sources (id) on delete set null,
  owner_id uuid references public.crm_profiles (id) on delete set null,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  deleted_by uuid references public.crm_profiles (id),
  constraint crm_contacts_email_or_phone check (
    (email is not null and email <> '') or (phone is not null and phone <> '')
  )
);

create unique index if not exists crm_contacts_email_unique
  on public.crm_contacts (lower(email))
  where email is not null and email <> '' and deleted_at is null;
create index if not exists crm_contacts_phone_idx on public.crm_contacts (phone) where deleted_at is null;
create index if not exists crm_contacts_company_idx on public.crm_contacts (company_id) where deleted_at is null;

-- ---------------------------------------------------------------------------
-- Leads
-- ---------------------------------------------------------------------------

create table if not exists public.crm_leads (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid references public.crm_contacts (id) on delete set null,
  company_id uuid references public.crm_companies (id) on delete set null,
  first_name text not null default '',
  last_name text not null default '',
  email text,
  phone text,
  whatsapp text,
  website text,
  location text,
  industry text,
  company_name text,
  source_id uuid references public.crm_lead_sources (id) on delete set null,
  campaign text,
  referral text,
  landing_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  form_type text,
  status public.crm_lead_status not null default 'new',
  score int not null default 0 check (score between 0 and 100),
  score_breakdown jsonb not null default '[]'::jsonb,
  business_size text,
  estimated_budget text,
  timeline text,
  primary_need text,
  ecosystem_layer public.crm_ecosystem_layer,
  owner_id uuid references public.crm_profiles (id) on delete set null,
  internal_notes text not null default '',
  client_notes text not null default '',
  last_contacted_at timestamptz,
  next_follow_up_at timestamptz,
  last_activity_at timestamptz,
  interaction_count int not null default 0,
  converted_at timestamptz,
  legacy_submission_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  deleted_by uuid references public.crm_profiles (id)
);

create index if not exists crm_leads_status_idx on public.crm_leads (status) where deleted_at is null;
create index if not exists crm_leads_owner_idx on public.crm_leads (owner_id) where deleted_at is null;
create index if not exists crm_leads_created_idx on public.crm_leads (created_at desc) where deleted_at is null;
create index if not exists crm_leads_follow_up_idx on public.crm_leads (next_follow_up_at) where deleted_at is null;
create index if not exists crm_leads_email_idx on public.crm_leads (lower(email)) where deleted_at is null and email is not null;
create index if not exists crm_leads_source_idx on public.crm_leads (source_id) where deleted_at is null;

-- ---------------------------------------------------------------------------
-- Digital Growth Audits
-- ---------------------------------------------------------------------------

create table if not exists public.crm_audits (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.crm_leads (id) on delete set null,
  contact_id uuid references public.crm_contacts (id) on delete set null,
  company_id uuid references public.crm_companies (id) on delete set null,
  company_name text not null default '',
  contact_name text not null default '',
  email text,
  phone text,
  website text,
  industry text,
  business_size text,
  focus_area public.crm_ecosystem_layer,
  business_goals text not null default '',
  budget text,
  timeline text,
  status public.crm_audit_status not null default 'submitted',
  owner_id uuid references public.crm_profiles (id) on delete set null,
  foundation_score int check (foundation_score is null or foundation_score between 0 and 100),
  visibility_score int check (visibility_score is null or visibility_score between 0 and 100),
  automation_score int check (automation_score is null or automation_score between 0 and 100),
  overall_score int check (overall_score is null or overall_score between 0 and 100),
  executive_summary text not null default '',
  scheduled_at timestamptz,
  completed_at timestamptz,
  legacy_submission_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  deleted_by uuid references public.crm_profiles (id)
);

create index if not exists crm_audits_status_idx on public.crm_audits (status) where deleted_at is null;
create index if not exists crm_audits_lead_idx on public.crm_audits (lead_id) where deleted_at is null;
create index if not exists crm_audits_created_idx on public.crm_audits (created_at desc) where deleted_at is null;

create table if not exists public.crm_audit_assessments (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid not null references public.crm_audits (id) on delete cascade,
  category text not null,
  subcategory text not null,
  score int check (score is null or score between 0 and 100),
  severity public.crm_priority,
  finding text not null default '',
  recommendation text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists crm_audit_assessments_audit_idx on public.crm_audit_assessments (audit_id);

create table if not exists public.crm_roadmaps (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid references public.crm_audits (id) on delete set null,
  company_id uuid references public.crm_companies (id) on delete set null,
  lead_id uuid references public.crm_leads (id) on delete set null,
  title text not null default 'Solveek Growth Roadmap',
  summary text not null default '',
  owner_id uuid references public.crm_profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.crm_roadmap_items (
  id uuid primary key default gen_random_uuid(),
  roadmap_id uuid not null references public.crm_roadmaps (id) on delete cascade,
  priority public.crm_priority not null default 'medium',
  initiative text not null,
  ecosystem_layer public.crm_ecosystem_layer not null default 'foundation',
  estimated_effort text,
  recommended_timeline text,
  expected_objective text,
  dependencies text,
  status text not null default 'recommended',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Opportunities / Proposals
-- ---------------------------------------------------------------------------

create table if not exists public.crm_opportunities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company_id uuid references public.crm_companies (id) on delete set null,
  contact_id uuid references public.crm_contacts (id) on delete set null,
  lead_id uuid references public.crm_leads (id) on delete set null,
  audit_id uuid references public.crm_audits (id) on delete set null,
  roadmap_id uuid references public.crm_roadmaps (id) on delete set null,
  owner_id uuid references public.crm_profiles (id) on delete set null,
  source_id uuid references public.crm_lead_sources (id) on delete set null,
  service_id uuid references public.crm_services (id) on delete set null,
  ecosystem_layer public.crm_ecosystem_layer,
  estimated_value numeric(14, 2) not null default 0,
  currency text not null default 'GHS',
  probability int not null default 10 check (probability between 0 and 100),
  weighted_value numeric(14, 2) generated always as (round(estimated_value * probability / 100.0, 2)) stored,
  expected_close_date date,
  stage public.crm_opportunity_stage not null default 'new',
  next_action text,
  next_action_at timestamptz,
  notes text not null default '',
  won_at timestamptz,
  lost_at timestamptz,
  lost_reason text,
  stage_changed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  deleted_by uuid references public.crm_profiles (id)
);

create index if not exists crm_opportunities_stage_idx on public.crm_opportunities (stage) where deleted_at is null;
create index if not exists crm_opportunities_owner_idx on public.crm_opportunities (owner_id) where deleted_at is null;
create index if not exists crm_opportunities_close_idx on public.crm_opportunities (expected_close_date) where deleted_at is null;

create table if not exists public.crm_proposals (
  id uuid primary key default gen_random_uuid(),
  proposal_number text not null unique,
  opportunity_id uuid references public.crm_opportunities (id) on delete set null,
  company_id uuid references public.crm_companies (id) on delete set null,
  contact_id uuid references public.crm_contacts (id) on delete set null,
  owner_id uuid references public.crm_profiles (id) on delete set null,
  title text not null,
  scope text not null default '',
  price numeric(14, 2) not null default 0,
  discount numeric(14, 2) not null default 0,
  tax numeric(14, 2) not null default 0,
  total numeric(14, 2) not null default 0,
  currency text not null default 'GHS',
  valid_until date,
  status public.crm_proposal_status not null default 'draft',
  sent_at timestamptz,
  viewed_at timestamptz,
  accepted_at timestamptz,
  rejected_at timestamptz,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.crm_proposal_items (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.crm_proposals (id) on delete cascade,
  service_id uuid references public.crm_services (id) on delete set null,
  description text not null,
  quantity numeric(10, 2) not null default 1,
  unit_price numeric(14, 2) not null default 0,
  line_total numeric(14, 2) not null default 0,
  sort_order int not null default 0
);

-- ---------------------------------------------------------------------------
-- Clients / Delivery
-- ---------------------------------------------------------------------------

create table if not exists public.crm_clients (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.crm_companies (id) on delete restrict,
  primary_contact_id uuid references public.crm_contacts (id) on delete set null,
  owner_id uuid references public.crm_profiles (id) on delete set null,
  status public.crm_client_status not null default 'active',
  health_label text not null default 'healthy',
  health_notes text not null default '',
  total_value numeric(14, 2) not null default 0,
  currency text not null default 'GHS',
  won_from_opportunity_id uuid references public.crm_opportunities (id) on delete set null,
  converted_at timestamptz not null default now(),
  last_interaction_at timestamptz,
  next_follow_up_at timestamptz,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  deleted_by uuid references public.crm_profiles (id),
  unique (company_id)
);

create table if not exists public.crm_client_services (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.crm_clients (id) on delete cascade,
  service_id uuid not null references public.crm_services (id) on delete restrict,
  owner_id uuid references public.crm_profiles (id) on delete set null,
  start_date date,
  renewal_date date,
  billing_frequency public.crm_pricing_type not null default 'monthly',
  value numeric(14, 2) not null default 0,
  currency text not null default 'GHS',
  status public.crm_retainer_status not null default 'active',
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  client_id uuid not null references public.crm_clients (id) on delete restrict,
  company_id uuid references public.crm_companies (id) on delete set null,
  manager_id uuid references public.crm_profiles (id) on delete set null,
  service_id uuid references public.crm_services (id) on delete set null,
  opportunity_id uuid references public.crm_opportunities (id) on delete set null,
  start_date date,
  target_completion date,
  status public.crm_project_status not null default 'planning',
  budget numeric(14, 2),
  currency text not null default 'GHS',
  priority public.crm_priority not null default 'medium',
  description text not null default '',
  featured_for_website boolean not null default false,
  publish_status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  deleted_by uuid references public.crm_profiles (id)
);

create index if not exists crm_projects_status_idx on public.crm_projects (status) where deleted_at is null;
create index if not exists crm_projects_client_idx on public.crm_projects (client_id) where deleted_at is null;

create table if not exists public.crm_tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  project_id uuid references public.crm_projects (id) on delete cascade,
  client_id uuid references public.crm_clients (id) on delete set null,
  assignee_id uuid references public.crm_profiles (id) on delete set null,
  priority public.crm_priority not null default 'medium',
  due_date date,
  status public.crm_task_status not null default 'todo',
  checklist jsonb not null default '[]'::jsonb,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists crm_tasks_due_idx on public.crm_tasks (due_date) where deleted_at is null;
create index if not exists crm_tasks_assignee_idx on public.crm_tasks (assignee_id) where deleted_at is null;
create index if not exists crm_tasks_status_idx on public.crm_tasks (status) where deleted_at is null;

-- ---------------------------------------------------------------------------
-- Activities / Notes / Tags / Docs / Notifications / Audit log
-- ---------------------------------------------------------------------------

create table if not exists public.crm_activities (
  id uuid primary key default gen_random_uuid(),
  type public.crm_activity_type not null,
  subject text not null,
  description text not null default '',
  occurred_at timestamptz not null default now(),
  due_at timestamptz,
  owner_id uuid references public.crm_profiles (id) on delete set null,
  contact_id uuid references public.crm_contacts (id) on delete set null,
  company_id uuid references public.crm_companies (id) on delete set null,
  lead_id uuid references public.crm_leads (id) on delete set null,
  opportunity_id uuid references public.crm_opportunities (id) on delete set null,
  audit_id uuid references public.crm_audits (id) on delete set null,
  client_id uuid references public.crm_clients (id) on delete set null,
  project_id uuid references public.crm_projects (id) on delete set null,
  proposal_id uuid references public.crm_proposals (id) on delete set null,
  status public.crm_activity_status not null default 'completed',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists crm_activities_occurred_idx on public.crm_activities (occurred_at desc);
create index if not exists crm_activities_lead_idx on public.crm_activities (lead_id);
create index if not exists crm_activities_company_idx on public.crm_activities (company_id);
create index if not exists crm_activities_due_idx on public.crm_activities (due_at);
create index if not exists crm_activities_owner_idx on public.crm_activities (owner_id);

create table if not exists public.crm_notes (
  id uuid primary key default gen_random_uuid(),
  body text not null,
  visibility public.crm_note_visibility not null default 'internal',
  author_id uuid references public.crm_profiles (id) on delete set null,
  contact_id uuid references public.crm_contacts (id) on delete cascade,
  company_id uuid references public.crm_companies (id) on delete cascade,
  lead_id uuid references public.crm_leads (id) on delete cascade,
  opportunity_id uuid references public.crm_opportunities (id) on delete cascade,
  client_id uuid references public.crm_clients (id) on delete cascade,
  project_id uuid references public.crm_projects (id) on delete cascade,
  audit_id uuid references public.crm_audits (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.crm_entity_tags (
  id uuid primary key default gen_random_uuid(),
  tag_id uuid not null references public.crm_tags (id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  created_at timestamptz not null default now(),
  unique (tag_id, entity_type, entity_id)
);

create index if not exists crm_entity_tags_entity_idx on public.crm_entity_tags (entity_type, entity_id);

create table if not exists public.crm_documents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  file_path text not null,
  mime_type text,
  size_bytes bigint,
  entity_type text not null,
  entity_id uuid not null,
  uploaded_by uuid references public.crm_profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.crm_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.crm_profiles (id) on delete cascade,
  title text not null,
  body text not null default '',
  priority text not null default 'normal',
  entity_type text,
  entity_id uuid,
  href text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists crm_notifications_user_idx
  on public.crm_notifications (user_id, created_at desc);

create table if not exists public.crm_audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.crm_profiles (id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists crm_audit_logs_created_idx on public.crm_audit_logs (created_at desc);
create index if not exists crm_audit_logs_entity_idx on public.crm_audit_logs (entity_type, entity_id);

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.crm_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.crm_is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.crm_profiles p
    where p.id = auth.uid()
      and p.is_active = true
      and p.deleted_at is null
  );
$$;

create or replace function public.crm_has_role(roles public.crm_role[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.crm_profiles p
    where p.id = auth.uid()
      and p.is_active = true
      and p.deleted_at is null
      and p.role = any (roles)
  );
$$;

create or replace function public.crm_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.crm_profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data->>'role')::public.crm_role, 'viewer')
  )
  on conflict (id) do update
    set email = excluded.email,
        updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_crm on auth.users;
create trigger on_auth_user_created_crm
  after insert on auth.users
  for each row execute function public.crm_handle_new_user();

-- updated_at triggers
do $$
declare
  t text;
begin
  foreach t in array array[
    'crm_profiles',
    'crm_lead_sources',
    'crm_services',
    'crm_templates',
    'crm_organization_settings',
    'crm_companies',
    'crm_contacts',
    'crm_leads',
    'crm_audits',
    'crm_audit_assessments',
    'crm_roadmaps',
    'crm_roadmap_items',
    'crm_opportunities',
    'crm_proposals',
    'crm_clients',
    'crm_client_services',
    'crm_projects',
    'crm_tasks',
    'crm_activities',
    'crm_notes'
  ]
  loop
    execute format('drop trigger if exists %I_set_updated_at on public.%I', t, t);
    execute format(
      'create trigger %I_set_updated_at before update on public.%I for each row execute function public.crm_set_updated_at()',
      t, t
    );
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Seed catalogue data
-- ---------------------------------------------------------------------------

insert into public.crm_organization_settings (name)
select 'Solveek'
where not exists (select 1 from public.crm_organization_settings);

insert into public.crm_lead_sources (name, slug, sort_order) values
  ('Website', 'website', 10),
  ('Digital Growth Audit', 'digital-growth-audit', 20),
  ('Google', 'google', 30),
  ('LinkedIn', 'linkedin', 40),
  ('Instagram', 'instagram', 50),
  ('Facebook', 'facebook', 60),
  ('WhatsApp', 'whatsapp', 70),
  ('Referral', 'referral', 80),
  ('Email', 'email', 90),
  ('Direct', 'direct', 100),
  ('Event', 'event', 110),
  ('Partner', 'partner', 120),
  ('Other', 'other', 130)
on conflict (slug) do nothing;

insert into public.crm_services (name, slug, description, ecosystem_layer, pricing_type, is_recurring, sort_order) values
  ('Website Development', 'website-development', 'Custom websites and conversion infrastructure.', 'foundation', 'one_time', false, 10),
  ('Technical SEO', 'technical-seo', 'Technical search foundation and indexing health.', 'foundation', 'one_time', false, 20),
  ('Analytics Setup', 'analytics-setup', 'Measurement and conversion tracking.', 'foundation', 'one_time', false, 30),
  ('Conversion Infrastructure', 'conversion-infrastructure', 'Forms, funnels, and conversion paths.', 'foundation', 'one_time', false, 40),
  ('Web Applications', 'web-applications', 'Custom business applications.', 'automation', 'custom', false, 50),
  ('CRM Integration', 'crm-integration', 'Connect lead capture and customer systems.', 'automation', 'custom', false, 60),
  ('Bulk SMS', 'bulk-sms', 'SMS delivery and campaigns.', 'automation', 'usage_based', true, 70),
  ('Workflow Automation', 'workflow-automation', 'Process automation across tools.', 'automation', 'custom', false, 80),
  ('SEO Growth', 'seo-growth', 'Ongoing search growth program.', 'visibility', 'monthly', true, 90),
  ('Social Media Management', 'social-media-management', 'Ongoing social presence and content.', 'visibility', 'monthly', true, 100),
  ('Content Strategy', 'content-strategy', 'Content planning and production systems.', 'visibility', 'monthly', true, 110),
  ('Lead Generation', 'lead-generation', 'Paid and organic lead acquisition systems.', 'visibility', 'monthly', true, 120)
on conflict (slug) do nothing;

insert into public.crm_tags (name, slug, color) values
  ('High Value', 'high-value', '#1358FE'),
  ('Hot Lead', 'hot-lead', '#DC2626'),
  ('Website', 'website', '#070b14'),
  ('SEO', 'seo', '#0F766E'),
  ('Automation', 'automation', '#7C3AED'),
  ('Referral', 'referral', '#CA8A04'),
  ('Enterprise', 'enterprise', '#1E3A8A'),
  ('Ghana', 'ghana', '#059669')
on conflict (slug) do nothing;

insert into public.crm_templates (name, slug, channel, subject, body, variables) values
  (
    'Lead received',
    'lead-received',
    'email',
    'Thanks for contacting Solveek',
    'Hi {{firstName}},\n\nThanks for contacting Solveek. We received your message and will follow up shortly.\n\nBuild. Connect. Grow.\nSolveek',
    array['firstName', 'companyName', 'ownerName']
  ),
  (
    'Audit received',
    'audit-received',
    'email',
    'Your Digital Growth Audit request is received',
    'Hi {{firstName}},\n\nWe received your Digital Growth Audit request for {{companyName}}. Our team will review it and follow up with next steps.\n\nSolveek',
    array['firstName', 'companyName', 'auditDate', 'ownerName']
  ),
  (
    'Proposal ready',
    'proposal-ready',
    'email',
    'Your Solveek Growth Proposal is ready',
    'Hi {{firstName}},\n\nYour Solveek proposal {{proposalNumber}} for {{companyName}} is ready for review.\n\nSolveek',
    array['firstName', 'companyName', 'proposalNumber', 'ownerName']
  )
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.crm_profiles enable row level security;
alter table public.crm_lead_sources enable row level security;
alter table public.crm_services enable row level security;
alter table public.crm_tags enable row level security;
alter table public.crm_templates enable row level security;
alter table public.crm_organization_settings enable row level security;
alter table public.crm_companies enable row level security;
alter table public.crm_contacts enable row level security;
alter table public.crm_leads enable row level security;
alter table public.crm_audits enable row level security;
alter table public.crm_audit_assessments enable row level security;
alter table public.crm_roadmaps enable row level security;
alter table public.crm_roadmap_items enable row level security;
alter table public.crm_opportunities enable row level security;
alter table public.crm_proposals enable row level security;
alter table public.crm_proposal_items enable row level security;
alter table public.crm_clients enable row level security;
alter table public.crm_client_services enable row level security;
alter table public.crm_projects enable row level security;
alter table public.crm_tasks enable row level security;
alter table public.crm_activities enable row level security;
alter table public.crm_notes enable row level security;
alter table public.crm_entity_tags enable row level security;
alter table public.crm_documents enable row level security;
alter table public.crm_notifications enable row level security;
alter table public.crm_audit_logs enable row level security;

-- Profiles
drop policy if exists crm_profiles_select on public.crm_profiles;
create policy crm_profiles_select on public.crm_profiles
  for select to authenticated
  using (public.crm_is_staff());

drop policy if exists crm_profiles_update_self on public.crm_profiles;
create policy crm_profiles_update_self on public.crm_profiles
  for update to authenticated
  using (id = auth.uid() or public.crm_has_role(array['super_admin','admin']::public.crm_role[]))
  with check (id = auth.uid() or public.crm_has_role(array['super_admin','admin']::public.crm_role[]));

-- Generic staff read/write for operational tables
do $$
declare
  t text;
begin
  foreach t in array array[
    'crm_lead_sources',
    'crm_services',
    'crm_tags',
    'crm_templates',
    'crm_organization_settings',
    'crm_companies',
    'crm_contacts',
    'crm_leads',
    'crm_audits',
    'crm_audit_assessments',
    'crm_roadmaps',
    'crm_roadmap_items',
    'crm_opportunities',
    'crm_proposals',
    'crm_proposal_items',
    'crm_clients',
    'crm_client_services',
    'crm_projects',
    'crm_tasks',
    'crm_activities',
    'crm_notes',
    'crm_entity_tags',
    'crm_documents',
    'crm_audit_logs'
  ]
  loop
    execute format('drop policy if exists %I_staff_all on public.%I', t, t);
    execute format(
      'create policy %I_staff_all on public.%I for all to authenticated using (public.crm_is_staff()) with check (public.crm_is_staff())',
      t, t
    );
  end loop;
end $$;

drop policy if exists crm_notifications_own on public.crm_notifications;
create policy crm_notifications_own on public.crm_notifications
  for all to authenticated
  using (user_id = auth.uid() or public.crm_has_role(array['super_admin','admin']::public.crm_role[]))
  with check (user_id = auth.uid() or public.crm_has_role(array['super_admin','admin']::public.crm_role[]));

-- No anon access to CRM tables (service role bypasses RLS for intake)
