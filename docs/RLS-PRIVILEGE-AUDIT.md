# RLS & Privilege Escalation Audit — Solveek

Date: 2026-08-26  
Guide: *Database RLS and Privilege Escalation: The UI Is Not the Security Boundary*  
Mode: **report only** (no schema changes applied in this pass)

Live DB inspected via Supabase SQL (`pg_policies`, `information_schema`).

## Executive verdict

**The classic bug does not apply today:** there is no `profiles` / user-auth table and **no privilege columns** (`is_admin`, `role` as access control, `tier`, `credit_balance`, `stripe_customer_id`).

The only `role` column is `testimonials.role` (job title copy, e.g. “Founder”) — not an authorization flag.

There is **no admin UI**, no MFA, and no client-side “admin route” pretending to be security.

RLS policies **are version-controlled** in `supabase/migrations/20260808210000_solveek_cms.sql` and match live `pg_policies`.

## Prompt checklist

### 1. Privileged columns + UPDATE policies

| Check | Result |
| --- | --- |
| Tables with `is_admin` / staff / tier / balance / stripe | **None** |
| UPDATE RLS policies | **None** on any public table |
| Could a user `UPDATE … SET is_admin = true` on their row? | **N/A** — no such column or auth users table |

**Live UPDATE policies:** empty set (only SELECT on CMS + INSERT on lead tables).

### 2. Policies checked into the repo

| Source | Status |
| --- | --- |
| `supabase/migrations/20260808210000_solveek_cms.sql` | Contains `CREATE POLICY` for all current tables |
| Live `pg_policies` | Aligns with migration (SELECT published CMS; INSERT-only leads; `site_content` SELECT `true`) |

Not dashboard-only. Good.

### 3. MFA / second factor

**N/A** — no auth / OTP / MFA flows in the app.

### 4. Admin-only UI vs server checks

| Item | Status |
| --- | --- |
| `<AdminRoute>` / role-gated UI | Not present (`/admin` only appears in `robots` disallow) |
| Server admin APIs | Not present |

No false-confidence UI guard over a writable privilege column.

## Current RLS shape (live)

| Table group | Policies |
| --- | --- |
| CMS (`services`, `projects`, …) | `SELECT` where `published = true` (except `site_content`: SELECT `true`) |
| `contact_submissions`, `quote_requests`, `newsletter_subscribers` | `INSERT` with check `true` only — **no SELECT/UPDATE/DELETE policies** |

With RLS enabled and **no** UPDATE/DELETE/SELECT policy on lead tables, those commands are **denied** for `anon` / `authenticated` even if table GRANTs exist (Postgres default-deny for missing policy).

## Finding (defense-in-depth, not active escalation)

**Table privileges:** `anon` and `authenticated` currently hold broad table privileges including `UPDATE`, `DELETE`, `TRUNCATE` on CMS and lead tables (Supabase default grants).

**Why it is not exploitable right now:** RLS has no matching UPDATE/DELETE policies, so those commands fail at the policy layer.

**Why it still matters:** If someone later adds a careless `CREATE POLICY … FOR UPDATE USING (true)` (or “users can update own row” on a future `profiles` table with `is_admin`), the GRANT is already wide open — privilege escalation becomes one bad policy away.

**Recommended fix (when you ask to apply):**

```sql
-- Example direction: tighten grants; keep CMS write path on service_role only
REVOKE UPDATE, DELETE, TRUNCATE ON ALL TABLES IN SCHEMA public FROM anon, authenticated;
-- Re-GRANT only what public forms need:
GRANT INSERT ON public.contact_submissions, public.quote_requests, public.newsletter_subscribers TO anon, authenticated;
GRANT SELECT ON /* published CMS tables */ TO anon, authenticated;
-- Prefer column-level grants if a future profiles table has mixed self-serve + privileged columns
```

Also for a future `profiles.is_admin`: never put it on a self-UPDATEable table without `REVOKE UPDATE (is_admin)` / separate `user_roles` table writable only via service role.

## Newsletter upsert note

`/api/newsletter` uses `upsert`. INSERT is allowed by RLS; conflict **UPDATE** is not (no UPDATE policy). Re-subscribing an existing email may error at the DB layer — product quirk, not privilege escalation. Fix later with insert-only + ignore duplicates, or a narrow UPDATE policy on `email` only if needed.

## Checklist (guide)

- [x] No privilege column left self-writable via row-only UPDATE (no such columns)
- [x] RLS policies in repo migrations
- [x] No admin UI mistaken for security boundary
- [x] MFA N/A
- [ ] Optional harden: REVOKE broad UPDATE/DELETE/TRUNCATE from `anon`/`authenticated` (recommended follow-up)

## Re-audit triggers

Re-run this audit when you add:

- Supabase Auth + `profiles` / `user_roles`
- Any `is_admin` / `role` authorization column
- Dashboard-only policies not mirrored in migrations
- Client-side admin panels
