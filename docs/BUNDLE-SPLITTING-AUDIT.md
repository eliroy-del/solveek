# Ship Less JavaScript — Bundle / Code-Splitting Audit

Date: 2026-08-26  
Guide: *Ship Less JavaScript*  
Mode: **report only** — proposed diffs below; **not applied**

## Verdict

This is **not** a classic SPA “one App.tsx imports every page” failure. Next.js App Router **already route-splits** pages. Anonymous `/` does **not** download the audit form’s `react-hook-form` + zod chunk; `/contact` and `/quote` do.

The real cost is **shared layout client JS**: `Header` + `ScrollProgress` pull **Framer Motion (~39 KB gzip)** onto every marketing page, including the landing page that never animates its own sections with Framer. There is also **no `error.tsx` / ErrorBoundary**, and **zero `next/dynamic` usage**.

---

## Measured production build (baseline)

`npm run build` (Next 16.3 / Turbopack), 2026-08-26.

### Chunk inventory (all `.next/static/chunks/*.js`)

| Chunk (abbrev) | Raw | Gzip | Role (sniff) |
| --- | ---: | ---: | --- |
| `2m0uu…` | 223 KB | 71 KB | Framework / React runtime (rootMain) |
| `1fmybq…` | 156 KB | 43 KB | Framework (rootMain) |
| `0cz1d0…` | 110 KB | 39 KB | Polyfill |
| `3c8xx…` | 117 KB | **39 KB** | **Framer Motion** (shared) |
| `1udg…` | 111 KB | **32 KB** | **zod + form stack** (contact/quote only) |
| `18_m87…` | 38 KB | 13 KB | Layout client: Header, ScrollProgress, Consent |
| others | — | — | lucide slices, base-ui (faqs), tiny page glue |

**Anonymous home estimate (rootMain + polyfill + home client refs):** ~**242 KB gzip** JS.  
Of that, ~**39 KB gzip** is Framer Motion loaded because of site chrome — not because the home page sections need it.

**Contact extras vs home:** `1udg…` (~32 KB gz) + small form chunk — correct on-demand load. Route splitting is working for forms.

---

## 1. Router / entry: what is *not* lazy?

There is no `App.tsx` router. Entry is `src/app/layout.tsx` + per-route `page.tsx`.

| Location | Import style | Notes |
| --- | --- | --- |
| `src/app/layout.tsx` | Static: Consent*, GA*, SiteShell | Shared on every page |
| `src/components/layout/site-shell.tsx` | Static: Header, ScrollProgress, Footer | **Header + ScrollProgress are `"use client"` + Framer** |
| `src/app/page.tsx` | Static section imports | Server Components — OK for first paint |
| `src/app/contact/page.tsx` | Static `AuditForm` | Heavy libs, but **already in contact-only chunks** |
| `src/app/quote/page.tsx` | Static `QuoteForm`, `Reveal`, `PageHero` | Form chunk on-demand; Reveal → Framer (already shared) |
| Legacy `/services`, `/projects`, `/faqs`, `/insights` | Static `PageHero` / grids | Mostly redirected; still built |

**`next/dynamic` / `React.lazy` count in repo: 0.**

---

## 2. Heaviest dependencies (priority order)

| Weight | Dependency | Who pulls it onto first paint? | Flag |
| --- | --- | --- | --- |
| High | `framer-motion` | **Layout:** `header.tsx`, `scroll-progress.tsx` | Flag — every anonymous visit |
| High | `react-hook-form` + `@hookform/resolvers` + `zod` | `audit-form`, `quote-form`, unused newsletter form | OK route-split today; still worth `dynamic()` so contact shell can paint without waiting on the form island |
| Medium | `lucide-react` | Header + many components; `lib/icons.tsx` maps ~25 icons | Mostly tree-shaken per import; icon map file is a cluster if imported |
| Low / dead | `gsap` / `@gsap/react` | Only `use-gsap-reveal.ts` — **unused** | Remove from package.json |
| Not in client entry | `@supabase/supabase-js` | Server `lib/content` / API | Fine |

There is **no** calendar, charts, video editor, or admin dashboard in this repo — those guide examples don’t apply. The “heavy authenticated app” analogue here is **Framer on every page** and **form libs on contact**.

---

## 3. Error boundaries

| Check | Result |
| --- | --- |
| `error.tsx` / `global-error.tsx` | **Missing** |
| Custom `ErrorBoundary` component | **Missing** |
| Suspense without error boundary | Work page uses `<Suspense>` for `WorkList` only — **no** error UI |

A render throw in Header or any client island → blank / default Next recovery, not a branded fallback.

---

## 4. Vite `manualChunks`

N/A — Next.js App Router. Next/Turbopack already isolates large deps into separate chunks (`3c8xx` = motion, `1udg` = forms). Prefer **not importing heavy libs from the root layout** over manual chunk config.

---

## 5. Proposed changes (diff preview — do not apply yet)

Behavior and props unchanged; loading/bundling only.

### A. Biggest win — stop shipping Framer from the shell

Replace Framer mobile-menu / scroll bar with CSS + minimal React state so `3c8xx` (~39 KB gz) leaves the home graph.

Conceptual direction (not applied):

```tsx
// site-shell.tsx — keep Footer server; make Header CSS-only for open/close
// scroll-progress.tsx — CSS width via --progress + rAF, no framer-motion
```

Expected after: home client refs drop the motion chunk; home JS gzip down by roughly **~35–40 KB** (verify with rebuild).

### B. Contact — `next/dynamic` for the form island

```tsx
// src/app/contact/page.tsx (proposed)
import dynamic from "next/dynamic";

const AuditForm = dynamic(
  () =>
    import("@/components/forms/audit-form").then((m) => m.AuditForm),
  { loading: () => <div className="skeleton min-h-[28rem] rounded-xl" /> },
);

// ...rest of page unchanged; <AuditForm /> usage unchanged
```

Today the form is already out of the **home** bundle; this mainly improves **contact** progressive enhancement and documents the pattern.

Same pattern for `quote/page.tsx` → `QuoteForm`.

### C. Add route error UI

```tsx
// src/app/error.tsx (proposed)
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container-premium flex min-h-[50vh] flex-col items-center justify-center gap-4 pt-28 text-center">
      <h1 className="font-heading text-2xl text-navy">Something went wrong</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Please try again. If it keeps happening, email hello@solveek.com.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-royal px-4 py-2 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </div>
  );
}
```

### D. Remove dead GSAP

```diff
- "gsap": "^3.15.0",
- "@gsap/react": "^2.1.2",
```

Delete `src/hooks/use-gsap-reveal.ts`.

### E. What **not** to do

Do **not** wrap every App Router `page.tsx` in `React.lazy` — Next already splits by route. Lazy-loading entire RSC pages via client `lazy()` would fight the framework and hurt SSR.

---

## Checklist (project status)

**Audit**
- [x] Production build measured (gzip above)
- [x] Top-level route imports listed (App Router pages + layout)

**Split and guard**
- [~] Routes already split by Next; layout still eagerly pulls Framer
- [ ] `next/dynamic` for form islands (proposed)
- [ ] `error.tsx` (proposed)
- [ ] Isolate / remove Framer from shell (proposed)
- [x] Form vendor chunk already separate (contact/quote)

**Verify (after applying)**
- [ ] Rebuild; confirm `3c8xx` (motion) absent from home client-reference manifest
- [ ] Home gzip JS delta vs **242 KB** baseline
- [ ] Lighthouse unused-JS / TBT on `/`

---

## Bottom line

| Guide concern | Solveek status |
| --- | --- |
| Eager multi-page SPA router | **Not present** — App Router splits |
| Anonymous pays for admin/calendar | **N/A** — no such features |
| Anonymous pays for heavy shared UI libs | **Yes** — Framer via Header/ScrollProgress |
| Heavy page libs | Forms correctly contact/quote-only |
| Error boundaries | **Missing** |
| `lazy` / `dynamic` | **Unused** |

Say the word to apply A→D and re-measure entry/home gzip.
