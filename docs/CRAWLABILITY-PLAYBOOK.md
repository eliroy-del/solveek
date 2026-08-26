# Crawlability Playbook — Solveek (Next.js)

Date: 2026-08-26  
Live probe: `https://www.solveek.com` as Googlebot

## Phase 0 verdict: DONE — no empty-shell problem

| Check | Result |
| --- | --- |
| Stack | Next.js 16 App Router (SSR/SSG) |
| Empty `<div id="root">` | Not applicable (no Vite CSR shell) |
| Identical HTML across routes | **No** — distinct MD5 per route |
| Unique `<title>` | Home / About / Contact / Work all differ |
| Raw HTML word count | Home ~2010, About ~1355, Contact ~930, Work ~877 |
| `"use client"` on `page.tsx` | None |
| Vite prerender rebuild | **Not required** |

## Phase 1B hygiene (fixes applied)

Issues found on live HTML (pre-redeploy):

1. **Canonical / OG host wrong** — tags resolved to `https://solveek.vercel.app/...` because `metadataBase` fell back to `VERCEL_URL`.
2. **`llms.txt` 404** — latest SEO commit not yet live (or blocked); file exists in repo at `public/llms.txt`.
3. **Sitemap host** — live sitemap still listed `https://solveek.com` (no www); code now uses `SITE.url` = `https://www.solveek.com`.
4. **Home title** — missing brand suffix; now `absolute: SOLVEEK | Digital Growth Partner`.

Code fixes:

- Stop using `VERCEL_URL` for `metadataBase`
- Absolute canonicals + OG/Twitter image URLs via `SITE.url`
- Shared SEO helper already covers unique page metadata + Work JSON-LD

## Phase 2 shared hygiene status

| Item | Status |
| --- | --- |
| `app/robots.ts` | Present (disallows `/api/`, `/admin/`) |
| `app/sitemap.ts` | Present + work slugs |
| `public/llms.txt` | Present in repo |
| Per-route metadata | Home, About, Ecosystem, Work, Contact, Work/[slug] |
| JSON-LD | Organization + WebSite + Work breadcrumbs |
| `generateStaticParams` | Work/[slug] |

## Phase 3 — after Vercel redeploy + env

Set on Vercel:

```bash
NEXT_PUBLIC_SITE_URL=https://www.solveek.com
```

Then re-curl as Googlebot and confirm:

- Canonicals / `og:url` / `og:image` use `https://www.solveek.com`
- `/llms.txt` → 200
- `/sitemap.xml` locs use www
- Titles remain unique; HTML still content-rich

No Vite prerender / `react-helmet-async` work is needed for this project.
