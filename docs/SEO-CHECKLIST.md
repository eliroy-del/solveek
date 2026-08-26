# Solveek SEO Implementation Checklist

Canonical domain: **https://www.solveek.com**

This checklist maps the SEO How-To Guide to what is implemented in this Next.js App Router site. Prefer the native Metadata API over `react-helmet`.

## Critical production env

```bash
NEXT_PUBLIC_SITE_URL=https://www.solveek.com
```

Do **not** rely on `VERCEL_URL` for SEO. Without the env above, canonicals and OG images can resolve to `*.vercel.app` and split ranking/share signals.

See also:
- [`CRAWLABILITY-PLAYBOOK.md`](./CRAWLABILITY-PLAYBOOK.md) — Phase 0: SSR OK; no Vite prerender needed
- [`AEO-FOUNDATIONS.md`](./AEO-FOUNDATIONS.md) — how AI answer engines cite content
- [`AEO-FAN-OUT.md`](./AEO-FAN-OUT.md) — inspect ChatGPT/Claude search fan-out for Solveek money queries
- [`GA4.md`](./GA4.md) — analytics + consent
- [`JSON-LD.md`](./JSON-LD.md) — structured data map

## Done in code

| Item | Location |
| --- | --- |
| HTTPS / canonical www URL | `SITE.url`, `metadataBase` |
| Unique titles + descriptions | `createPageMetadata` on Home, About, Ecosystem, Work, Contact, Work/[slug] |
| Open Graph + Twitter cards | Root layout + page helper + `/opengraph-image` |
| Robots meta (`index,follow` + googleBot previews) | `src/app/layout.tsx`, `src/lib/seo.ts` |
| Canonical URLs | Per-page `alternates.canonical` |
| `robots.txt` | `src/app/robots.ts` → `/robots.txt` |
| `sitemap.xml` | `src/app/sitemap.ts` → `/sitemap.xml` |
| `llms.txt` | `public/llms.txt` |
| Organization + WebSite JSON-LD | `StructuredData` `@graph` in root layout |
| Breadcrumb + WebPage JSON-LD | About, Ecosystem, Work, Contact |
| CreativeWork + Service catalog | Work/[slug], Ecosystem capabilities |
| Favicon / apple / manifest | `public/*`, layout icons |
| CSP allowing GA4 wildcards | `src/middleware.ts` |
| GA4 (`@next/third-parties`) + Web Vitals | `src/components/analytics/*` |
| Analytics consent (Reject = no load) | Consent Mode v2 + banner |
| Legacy URL redirects | `next.config.ts` |
| Image formats (AVIF/WebP) | `next.config.ts` |

## Your one-time ops setup

1. **Set production env vars** (Vercel):
   - `NEXT_PUBLIC_SITE_URL=https://www.solveek.com`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=…` (optional HTML-tag method)
2. **Google Search Console**
   - Prefer a **Domain** property for `solveek.com` (covers www + apex) via DNS TXT
   - Or URL-prefix `https://www.solveek.com`
   - Submit sitemap path: `sitemap.xml`
3. **GA4**
   - Create property → Measurement ID → paste into env → redeploy
   - Confirm Realtime + no CSP errors in DevTools
4. **After deploy**, inspect key URLs in Search Console (Home, Contact, Work) and Request Indexing sparingly

## Ongoing monitoring

- Weekly: crawl / indexing issues in Search Console
- Monthly: Core Web Vitals (LCP &lt; 2.5s, INP &lt; 200ms, CLS &lt; 0.1)
- Quarterly: title/description CTR, internal links, broken links
- When facts change: update `public/llms.txt` “Last updated” date

## Do not copy from the generic guide

- Do **not** use `react-helmet` — this app uses Next.js `Metadata`
- Do **not** add `Crawl-delay` (ignored by Google; slows other bots unnecessarily)
- Do **not** invent street addresses or fake metrics in schema
- Do **not** index thin legacy routes — they already redirect

## Quick verify URLs

- https://www.solveek.com/robots.txt
- https://www.solveek.com/sitemap.xml
- https://www.solveek.com/llms.txt
- https://www.solveek.com/og.png
- https://www.solveek.com/opengraph-image
