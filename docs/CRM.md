# Solveek CRM

Internal Digital Growth Operations Platform at `/crm`.

## Stack

- Next.js App Router
- Supabase Auth + Postgres (`crm_*` tables)
- Resend for lead notifications
- Existing Solveek brand tokens

See `docs/CRM-ARCHITECTURE.md` for the full model.

## First admin user

1. In Supabase Dashboard → Authentication → Users → Invite / Add user with email + password.
2. The `crm_profiles` row is created automatically (role defaults to `viewer`).
3. Promote yourself:

```sql
update public.crm_profiles
set role = 'super_admin', is_active = true
where email = 'you@example.com';
```

4. Sign in at `/crm/login`.

## Website content module

Editors with roles `super_admin`, `admin`, or `marketing` can manage live site content at `/crm/content`.

Supported types:

- Work / projects
- Blog / insights
- Services
- FAQs
- Testimonials
- Stats
- Process steps
- Timeline
- Offices
- Why Choose
- Site blocks (`site_content` JSON packages and trust items)

Draft types stay off the public site until **Publish**. Site blocks save immediately because the public site reads them without a draft flag.

Hardcoded marketing copy in `src/constants/brand.ts` is not editable here yet.

Public `/api/audit` and `/api/contact` still write legacy submission tables, then call `ingestWebsiteLead()` (service role) to create/update:

- company
- contact
- lead
- audit (audit form only)
- activity
- in-app notifications for admin/sales roles

## Security

- `/crm/*` requires auth (middleware + server `requireCrmUser`)
- CRM tables: RLS for authenticated staff only
- Public anon has no CRM access
- `/crm/` is disallowed in `robots.ts`

## Em dash policy

CRM UI copy avoids em dashes.
