# Google Analytics 4 (Next.js 16)

Uses official `@next/third-parties/google` with Consent Mode v2.

## Setup

1. Create a GA4 property → copy Measurement ID (`G-XXXXXXXXXX`)
2. Set on Vercel (production only recommended):

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://www.solveek.com
```

3. Redeploy

## Behaviour

| Environment | Behaviour |
| --- | --- |
| `development` | GA never mounts; Web Vitals log to console |
| Production + no Accept | Consent default `denied`; no GA script / cookies |
| Production + Accept | GA mounts; Consent Mode updates to `granted` |
| Reject | Choice saved; GA stays unloaded |

## Files

- `src/lib/analytics.ts` — `sendGAEvent` helpers + Web Vitals
- `src/components/analytics/google-analytics.tsx`
- `src/components/analytics/web-vitals.tsx`
- `src/components/analytics/consent-provider.tsx`
- `src/components/analytics/cookie-consent-banner.tsx`
- Footer → **Cookie settings** resets choice

## Verify

1. Dev: Network filter `gtag` / `google-analytics` → no requests
2. Prod: Accept → Realtime in GA4; Reject → zero analytics requests
3. Audit form success → `generate_lead` event
