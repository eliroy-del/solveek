# Environment Variables & Secrets Audit — Solveek

Date: 2026-08-26  
Guide: *Environment Variables and API Keys*  
Rule: findings refer to **variable names only** — no secret values printed.

## Executive verdict

**No hardcoded secret credentials found in source.**  
**No `NEXT_PUBLIC_` secret mis-scoping found.**  
**`.env*` is gitignored; only `src/.env.example` is tracked.**

Gaps are hygiene (incomplete example file, no agent ignore), not an active leak of a secret into the client bundle.

## Classification of env vars the code reads

| Variable | Kind | Where used | OK? |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Publishable | Client + server Supabase | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Publishable (RLS-gated) | Client + server | Yes — must stay anon, never service role |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret** | `createServiceClient()` / `scripts/seed.mjs` only | Yes — no `NEXT_PUBLIC_` |
| `NEXT_PUBLIC_SITE_URL` | Public config | SEO / CORS | Yes |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Publishable | GA4 | Yes |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Publishable | Search Console meta | Yes |
| `INTERNAL_API_SECRET` | **Secret** | `verifyInternalSecret()` | Yes — no public prefix; fail closed if unset |
| `VERCEL_URL` | Platform-injected | CORS allowlist helper | Yes |
| `NODE_ENV` | Runtime | Analytics gate | Yes |

## Prompt checklist

### 1. Hardcoded secrets in source

**Finding:** None. Keys are read via `process.env.*`. No `sk_live` / PEM / literal service-role JWT in `src/` or scripts.

### 2. Secrets behind `NEXT_PUBLIC_` / client exposure

**Finding:** None. Service role and internal secret are unprefixed.

**Publishable `NEXT_PUBLIC_` values that *will* appear in the browser (expected):**

- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — identifies project; dangerous only if RLS is wrong (inserts are intentional for forms; no public SELECT on leads).
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — expected for GA.
- Site URL / verification — config, not credentials.

**Client bundle scan (`.next/static`):** no `sk_live` / `sk_test` / long JWT / private-key PEM matches in this workspace build.

### 3. `.gitignore` and git history

- `.gitignore` includes `.env*` with exceptions for `.env.example`.
- Tracked env-like file: `src/.env.example` only.
- Git history additions under `.env*`: **create of `src/.env.example` only** (no committed live `.env` file detected).

### 4. `.env.example` completeness

**Gap:** `src/.env.example` was missing Supabase variable **names** the code requires:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server/seed only)

(Addressed in follow-up hygiene commit if applied with this audit.)

### 5. Blast radius (if exposed)

| Secret | If a stranger held it |
| --- | --- |
| `SUPABASE_SERVICE_ROLE_KEY` | Bypass RLS; read/write all tables including lead submissions |
| `INTERNAL_API_SECRET` | Call future internal side-effect routes as if they were the backend |
| Anon key | Only what RLS allows (today: public inserts + published CMS reads) |

**Rotate?** No evidence in this audit that a secret was committed or shipped in the client. No rotation forced by this pass. If a live `.env` was ever pasted into chat or a screenshot, rotate that specific key in the provider dashboard.

## Other gaps (non-leak)

| Item | Status |
| --- | --- |
| `.cursorignore` for `.env*` | Missing at audit time |
| Agent instruction “never print secrets” | Not in `AGENTS.md` beyond Next.js note |
| Vercel Sensitive checkbox | Ops: mark `SUPABASE_SERVICE_ROLE_KEY` and `INTERNAL_API_SECRET` Sensitive |
| `createServiceClient` | Defined but unused by App Router APIs (good); seed script only |

## Re-check command (safe)

```bash
npm run build
# Inspect client output only; do not paste matches into chat if values appear:
rg -l 'sk_live|sk_test|-----BEGIN' .next/static || true
```
