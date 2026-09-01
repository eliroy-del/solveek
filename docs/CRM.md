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

## Website intake

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
