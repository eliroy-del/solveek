# Browser-Aware Web Design Audit — Solveek

Date: 2026-08-26  
Guide: *Browser-Aware Web Design* (pipeline-aware rendering)  
Mode: **report only** (no code changes in this pass)

## Verdict

Main marketing pages are largely pipeline-friendly: heroes are **server-rendered**, LCP images use `priority` + `sizes="100vw"`, fonts use `display: "swap"`, GA loads only after consent, and most motion is `transform`/`opacity`. The biggest gaps are **LCP asset quality/priority competition**, **permanent `will-change` on full-bleed heroes**, a **spinner-only route loading state**, and **unused GSAP** still in the bundle surface.

---

## What’s already in good shape

| Area | Evidence |
| --- | --- |
| SSR first paint | `GrowthHero` is a server component; home/about/work/contact/ecosystem pages are async RSC with content in HTML |
| LCP image flag | `priority` on home (`growth-hero.tsx`), about/work/contact/ecosystem headers, `PageHero` |
| Responsive sizes | Hero headers use `sizes="100vw"`; work cards use breakpoints |
| Image formats | `next.config.ts` enables AVIF/WebP via `next/image` |
| Fonts | Manrope + Space Grotesk via `next/font` with `display: "swap"` |
| Analytics off critical path | Consent Mode `beforeInteractive` stub only; GA mounts after grant (`google-analytics.tsx`) |
| Motion primitives | `Reveal` uses opacity + `y` (compositor translate); reduced-motion handled in `globals.css` + Framer |
| Work loading shape | `WorkShowcaseSkeleton` reserves `aspect-[16/11]` |
| Data for home work | `getProjects()` on the server in `app/page.tsx` — not a post-hydration fetch |

---

## Findings (concrete issues + fixes)

### 1. Home LCP image is low-resolution for a full-viewport hero

**Where:** `public/images/hero-network.png` (734×415 PNG, ~191KB) used in `src/components/sections/growth-hero.tsx`  
**Issue:** Full-bleed `min-h-[92svh]` hero upscales a ~734px source on desktop → soft LCP and wasted decode work. Source is PNG, not an authored AVIF/WebP (Next can convert, but upscaling remains).  
**Fix:** Ship a ≥1600–2400px wide master (or responsive set), crop for mobile if needed, keep `priority` + `sizes="100vw"`. Prefer authored AVIF/WebP sources if you want to skip conversion cost.

### 2. Competing high-priority image: header logo

**Where:** `src/components/layout/logo.tsx` — `priority={size === "header"}` and `unoptimized`  
**Issue:** Logo races the real LCP hero for early bandwidth. `unoptimized` skips AVIF/WebP and responsive resizing.  
**Fix:** Drop `priority` on the logo (or set only when there is no page hero). Remove `unoptimized` unless SVG; use an SVG logo if possible.

### 3. No explicit LCP preload / `fetchpriority` beyond Next defaults

**Where:** Hero `Image` components use `priority` (Next maps this to high fetch priority + preload in many cases) but there is no documented `imagesrcset`/`imagesizes` preload for known heroes.  
**Issue:** Harder to guarantee the *exact* LCP candidate is fetched first when logo + fonts also compete.  
**Fix:** Keep a single high-priority asset per page (hero only). Optionally add a targeted `<link rel="preload" as="image" …>` in the page metadata head for `/` if Lighthouse still under-prioritizes.

### 4. Permanent `will-change: transform` on always-on hero animations

**Where:** `src/app/globals.css` — `.hero-network`, `.about-header-media`, `.work-header-media`, `.ecosystem-header-media`, `.contact-header-media`  
**Issue:** Guide: use `will-change` for known active elements, not forever. These full-bleed layers animate indefinitely → extra compositor layers / memory on every main page.  
**Fix:** Remove standing `will-change`, or apply only while animating (e.g. short intro then clear). Prefer a one-shot entrance over infinite drift on LCP media.

### 5. Infinite CSS drift on the LCP element itself

**Where:** Same classes as above; home LCP media is animated with `hero-network-drift` (scale + translate) for 28s loops.  
**Issue:** Animating the LCP image layer increases paint/composite cost during the critical window; also fights “mechanically boring” first paint.  
**Fix:** Static hero image (or opacity-only overlay pulse). Move Ken-Burns-style motion below the fold or after `requestIdleCallback` / first interaction.

### 6. Route loading UI is a spinner, not a layout skeleton

**Where:** `src/app/loading.tsx`  
**Issue:** Red flag from the guide: spinner → content appears → CLS / unstable navigation feel.  
**Fix:** Skeleton matching header + hero block heights (navy band ~`min-h-[40vh]` + text lines) so navigations keep approximate geometry.

### 7. `PageHero` wraps the H1 in client `Reveal` (opacity 0 until hydration/in-view)

**Where:** `src/components/ui/page-hero.tsx` → `Reveal` (`src/components/ui/reveal.tsx`) with `initial={{ opacity: 0, y }}`  
**Issue:** If used on a route’s first paint, headline can be invisible until JS runs — JS-dependent first screen. (Primary IA pages mostly use inline heroes without Reveal; still a hazard for any page using `PageHero`.)  
**Fix:** Don’t animate above-the-fold titles; start visible (`initial={false}` / no Reveal) for LCP text. Keep Reveal for below-fold sections only.

### 8. Legacy client hero still animates LCP with Framer `scale`

**Where:** `src/components/sections/hero.tsx` (client) — `motion.div` scales the priority image 1.06 → 1 over 8s  
**Issue:** Same class of problem as #5; also pulls Framer into that tree. Not on current home, but still in the tree for redirects/legacy.  
**Fix:** Delete unused hero or convert to static SSR like `GrowthHero`.

### 9. Site chrome forces client JS on every page

**Where:** `SiteShell` → client `Header`, `ScrollProgress`; root `ConsentProvider` wraps the tree  
**Issue:** Not a blank app shell (page HTML still SSR), but header interactivity + scroll listeners hydrate globally. `useScrollProgress` reads layout on every scroll (`scrollHeight`/`clientHeight`) — light thrashing risk on long pages.  
**Fix:** Split a server `HeaderChrome` (logo + nav links) from a small client island for mobile menu / scroll solid state. Throttle scroll progress with `requestAnimationFrame`.

### 10. Unused GSAP dependency

**Where:** `package.json` + `src/hooks/use-gsap-reveal.ts` — **no imports** of the hook elsewhere  
**Issue:** Dead weight in the dependency graph; easy to reintroduce scroll-driven opacity/y that duplicates Framer.  
**Fix:** Remove `gsap` and the unused hook unless you plan ScrollTrigger features.

### 11. SVG path-length / infinite pulse animations (below fold)

**Where:** `global-map.tsx`, `tracking-preview.tsx` — `pathLength` + `animate-ping` / scale loops  
**Issue:** Not transform/opacity-only; more expensive than compositor fades. Acceptable below fold if those pages stay secondary.  
**Fix:** Gate behind `IntersectionObserver` / play once; respect reduced motion (partially done). Prefer static map art on marketing pages you care about for INP.

### 12. No speculation rules for obvious next steps

**Where:** No `speculationrules` / intentional prefetch for `/contact` (primary CTA)  
**Issue:** Missed cheap win for landing → audit/contact.  
**Fix:** Add modest Speculation Rules (or Next `<Link prefetch>`) for `/contact` from home/about only — not sitewide.

### 13. Cookie banner pop-in after client ready

**Where:** `cookie-consent-banner.tsx` — returns null until `ready`  
**Issue:** Fixed overlay so main layout CLS is low, but late UI appears after hydration.  
**Fix:** Acceptable for consent UX; optional: reserve bottom padding when consent unknown via a tiny inline script reading `localStorage` before paint (tradeoff: complexity).

### 14. Decorative CSS `backgroundImage` sections without preload

**Where:** e.g. `process-methodology.tsx`, `audit-cta.tsx`, `services-grid.tsx`  
**Issue:** Background images aren’t first-class LCP candidates and can’t use `priority`/`fetchpriority` easily. Fine below fold; bad if ever used as the main visual.  
**Fix:** Keep as decoration only; never make the primary LCP a CSS background.

---

## Checklist (project status)

**First viewport**
- [x] One clear LCP candidate on home (hero network + display type)
- [ ] Hero source resolution adequate for desktop
- [x] Looks coherent before JS (GrowthHero SSR text + image)
- [x] Fonts swapped, not block-invisible forever
- [~] Primary image eager/`priority` — yes; competes with logo priority

**Layout**
- [x] Hero height reserved (`min-h-[92svh]` / section padding)
- [x] Work card aspect ratios
- [ ] Route `loading.tsx` matches final shape
- [x] Reduced motion CSS kill-switch

**Motion**
- [~] Mostly transform/opacity; pathLength exceptions
- [ ] `will-change` only while actively animating
- [x] Reduced-motion paths exist

**JavaScript**
- [x] GA deferred behind consent
- [~] Header/consent are client islands (acceptable, could shrink)
- [x] Main content not fetched only after hydration
- [ ] Drop unused GSAP

**Navigation & assets**
- [ ] Prefetch/prerender contact when CTA intent is clear
- [~] next/image AVIF/WebP — yes; logo `unoptimized` — no
- [ ] Higher-res / mobile-cropped hero set

---

## Suggested fix order

1. Higher-res hero (+ drop logo `priority` / `unoptimized`).  
2. Stop infinite `will-change` + LCP Ken Burns.  
3. Skeleton `loading.tsx`.  
4. Remove GSAP dead code.  
5. Optional: speculation rules for `/contact`; server-split header.
