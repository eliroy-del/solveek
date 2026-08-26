# Endpoint Auth Audit — Solveek

Date: 2026-08-26  
Guide: *Securing Endpoints: Stop Trusting Whoever Can Reach the URL*

## Inventory

| Route | Side effects | Session/JWT auth | Compensating controls |
| --- | --- | --- | --- |
| `POST /api/audit` | Insert `contact_submissions` | None (public lead form) | Zod, XSS sanitize, honeypot, CORS allowlist, IP rate limit |
| `POST /api/contact` | Insert `contact_submissions` | None (public lead form) | Same |
| `POST /api/quote` | Insert `quote_requests` | None (public lead form) | Same |
| `POST /api/newsletter` | Upsert `newsletter_subscribers` | None (public subscribe) | Same (tighter rate limit) |

No other API route handlers exist. No email-send, webhook, or admin mutation endpoints.

## Checklist results

### 1. Unauthenticated state-changing handlers

**Finding (expected):** All four POSTs are callable without a session.

**Exploit if left as open email/admin tools:** N/A — they do **not** send mail, call Stripe, or mutate user profiles. They only insert lead rows.

**Verdict:** Acceptable for a marketing site **if** spam/abuse controls stay in place. Do **not** add a public `/api/send-*-email` without `verifyInternalSecret` (helper added in `src/lib/internal-auth.ts`).

### 2. Body-supplied identity used for authorization

**Finding:** Handlers read `email` / `name` from the body and store them as the *submitter’s* contact details.

**Not a bug here:** There is no `userId`-driven `update` / impersonation path. Identity fields are payload data, not authorization.

**Flag if introduced later:** Any `profiles.update({ where: { id: body.userId } })` without a verified session.

### 3. Internal-only endpoints without shared secret

**Finding:** None today. No webhook → internal email hop.

**Prepared fix:** `verifyInternalSecret()` fails closed when `INTERNAL_API_SECRET` is missing. Use it on any future internal route.

### 4. Email header injection / CRLF

**Finding:** No raw `From:` / `Subject:` string construction in the repo.

**Hardening applied:** Schema rejects `\r`/`\n` on name, email, phone, subject; `sanitizeEmail` / `sanitizePhone` / `sanitizeHeaderValue` strip CRLF at the boundary for future mailers.

## Other notes

| Item | Status |
| --- | --- |
| Supabase client on APIs | Anon key + RLS `INSERT` policies (no public `SELECT` on submissions) |
| Service role on public routes | Not used |
| In-memory rate limit | Soft under multi-instance serverless — acceptable baseline; upgrade to Redis/Upstash if spam rises |
| Error leakage | Routes return generic `"Server error"`; details only `console.error` |

## Do not “fix” by locking public forms behind login

That would break the Digital Growth Audit funnel. Correct model:

1. Public lead endpoints → validation + sanitize + honeypot + CORS + rate limit (+ optional CAPTCHA later)
2. Internal side-effect endpoints → shared secret, fail closed
3. User/admin actions → verified session + server-side role check
