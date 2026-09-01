# Solveek CRM Architecture

Internal Digital Growth Operations Platform for Solveek.

Public site: Build. Connect. Grow.
CRM: make that journey operational.

## Stack decisions

| Area | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 App Router | Existing site |
| Database | Supabase Postgres | Already in production |
| ORM | None (Supabase client + SQL) | Match existing CMS pattern |
| Auth | Supabase Auth + `@supabase/ssr` | Mature, invite-only |
| UI | Existing Tailwind + shadcn | Brand continuity |
| Forms | Zod + react-hook-form | Already used |
| Email | Resend | Already wired |
| Currency | GHS (GH₵) default | Ghana operations |

Do not introduce Prisma unless product requirements change.

## Route map

```text
/crm/login                 Public auth
/crm                       Dashboard (protected)
/crm/leads
/crm/leads/[id]
/crm/contacts
/crm/companies
/crm/opportunities
/crm/pipeline
/crm/activities
/crm/audits
/crm/clients
/crm/projects
/crm/tasks
/crm/services
/crm/reports
/crm/settings
```

Public marketing routes stay unchanged. CRM data is never exposed publicly.

## Table namespace

All CRM tables use the `crm_` prefix so they do not collide with CMS tables such as `projects` and `insights`.

## Roles (V1)

- `super_admin` full access
- `admin` CRM + settings
- `sales` leads, opportunities, audits, proposals, activities
- `project_manager` clients, projects, tasks
- `marketing` leads, sources, reporting (read/write limited)
- `viewer` read-only

Permissions are enforced in server queries and server actions, not only in the UI.

## Website → CRM intake

```text
Public form
  → validation / rate limit / sanitize
  → contact_submissions or quote_requests (legacy archive)
  → crm_ingest_* (service role)
       find/create company + contact
       create/update lead
       create audit when applicable
       create activity
       notify Resend + crm_notifications
```

Duplicate matching order: email, then phone, then company + email.

## Money

Monetary amounts use `numeric(14,2)`. Weighted pipeline is a forecast estimate, never treated as guaranteed revenue.

## Em dash policy

CRM UI copy must not use em dashes (—). Use commas, periods, or colons instead.

## Phased delivery

1. Schema + RLS + seed sources/services
2. Auth + CRM shell
3. Dashboard, leads, contacts, companies, activities
4. Audits + opportunities + pipeline
5. Clients, projects, tasks, services
6. Form integration + reports
7. Proposals, roadmaps, documents (next)

## Security boundary

- Anon role: public CMS read + public form inserts only
- Authenticated CRM users: CRM tables per RLS
- Service role: intake, seed, admin scripts only (server)
