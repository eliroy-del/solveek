# IDOR / Object-Level Authorization Audit — Solveek

Date: 2026-08-26  
Guide: *Authorization and IDOR: "Authenticated" Is Not "Authorized"*  
Scope: report only (no code changes in this pass)

## Executive verdict

**No classic IDOR surface found.** Solveek is a marketing site with public lead forms and public CMS pages. There are:

- No authenticated session-gated APIs
- No `app/api/**/[id]/route.ts` (or `:id`) handlers
- No `DELETE` / `PATCH` / `PUT` API routes
- No ownership/assignment data model for end users
- No Redis / object-ID user caches

The IDOR bug pattern (“logged in → mutate any ID”) cannot occur until you add user-owned resources with dynamic-ID mutation routes.

## Inventory

### API routes

| Route | Methods | Takes object ID? | Auth | Object-level auth | Notes |
| --- | --- | --- | --- | --- | --- |
| `/api/audit` | POST, OPTIONS | No | Public | N/A | Insert-only lead capture |
| `/api/contact` | POST, OPTIONS | No | Public | N/A | Insert-only |
| `/api/quote` | POST, OPTIONS | No | Public | N/A | Insert-only |
| `/api/newsletter` | POST, OPTIONS | No | Public | N/A | Upsert by email (subscriber’s own address) |

Newsletter `upsert` on `email` is **not** IDOR: the caller supplies the email they want to subscribe; they cannot update another row keyed by a secret ID they don’t know beyond guessing emails (spam risk, covered by rate limit / honeypot — not cross-tenant document access).

### Dynamic page routes (public reads)

| Route | Behavior | IDOR? |
| --- | --- | --- |
| `/work/[slug]` | Public case study via CMS `getProjectBySlug` | No — intentionally public published content |
| `/projects/[slug]` | Redirects to `/work/:slug` | No |
| `/services/[slug]` | Redirects to `/ecosystem` | No |
| `/insights/[slug]` | Redirects to `/` | No |

Public slugs for published marketing content are not an authorization bug.

### Mutations against the database

All API mutations are `insert` / `upsert` only. Grep found **zero** `.delete(` / authenticated `.update(` on object IDs in `src/`.

### Caching

No `redis` / `cache.get` / object-ID keyed private caches in app code.

### Access-control helpers

None required today (no logged-in user object graph). When that appears, add a single `assertObjectAccess`-style helper before any `[id]` read/write/delete — see guide.

## Checklist (guide)

| Check | Result |
| --- | --- |
| Routes with `:id` / `[id]` have auth **and** object-level check | N/A — no such API routes |
| DELETE / PATCH audited first | N/A — none exist |
| Shared object-access helper | N/A — create when first user-owned resource ships |
| Cache keys include userId for gated content | N/A — no such cache |
| Auth before cache read | N/A |
| Top 5 sensitive object types articulated | See below |
| Non-guessable IDs | CMS uses slugs (public); submission tables use DB-generated IDs with **no public SELECT** RLS |

## Five sensitive object types (when/if they exist)

| Object | What must prove access today | Status |
| --- | --- | --- |
| Contact / audit submissions | Staff-only via Supabase dashboard / future admin; **no public SELECT policy** | Safe from web IDOR |
| Quote requests | Same | Safe |
| Newsletter subscribers | Same | Safe |
| CMS projects / insights | Public if `published`; not user-private | Intentional |
| Future “client portal” docs/invoices | Would need ownership or assignment row + shared helper | Not built |

## Findings list

**No gate-1-without-gate-2 IDOR findings** in current API surface.

Related non-IDOR notes (already covered in endpoint auth audit):

1. Public POSTs are unauthenticated by design — compensate with Zod, sanitize, honeypot, CORS, rate limit ([`ENDPOINT-AUTH-AUDIT.md`](./ENDPOINT-AUTH-AUDIT.md)).
2. RLS allows public `INSERT` on lead tables; do not add public `SELECT`/`UPDATE`/`DELETE` policies without object-level (or admin-only) checks.

## When this audit must be re-run

Re-audit immediately if you add any of:

- `app/api/**/[id]/route.ts` with GET/PATCH/DELETE
- Client login / Supabase Auth for a portal
- Admin APIs that load a submission by ID using only `getUser()` without role/ownership checks
- Signed URL or thumbnail caches keyed only on object ID

## Prompt residual

Per guide: report only — **no code changes** in this pass. No fix required until an `[id]` mutation route exists.
