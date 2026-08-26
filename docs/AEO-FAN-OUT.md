# Seeing What AI Actually Searches — Solveek Playbook

Hands-on method to read ChatGPT (and Claude) **query fan-out**: the real sub-queries behind “searching the web”. Use these as a **topic coverage checklist**, not a keyword list.

Validated pattern (ChatGPT ~5.6 era): look for `search_model_queries` in DevTools global search — not only the `conversation` stream handoff.

## Why Solveek should do this

One money prompt (e.g. “digital growth partner Ghana”) expands into ~9–11 synthetic searches. If our site never covers the subtopics those queries imply, we lose citation probability even with perfect technical SEO.

## Method (ChatGPT)

**Browser:** Chrome, Edge, Brave, Arc, or Firefox — not Safari (no all-responses search).

1. Open [ChatGPT](https://chatgpt.com) → DevTools → **Network**.
2. Ask a prompt that forces live search, e.g.  
   `search the web for the best digital growth partner for SMEs in Accra Ghana 2026`.
3. Ignore treating `conversation` alone as the full story (often a stream handoff).
4. Global search responses: **Cmd+Option+F** (Mac) / **Ctrl+Shift+F** → search `search_model_queries`.
5. Copy the array at `metadata.search_model_queries.queries`.

**Claude:** search strings usually appear in the UI. In network traffic they show up as `web_search` / `server_tool_use` with `input.query`.

## Caveats

- Exact strings change between runs — look for **patterns** across 2–3 attempts.
- Queries are mostly zero search volume — optimize for **topics**, not literal phrasing.
- Field names can change; if `search_model_queries` vanishes, search for nearby keys (`queries`, `web_search`).

## Solveek money prompts (run these)

Paste each with an explicit “search the web …” prefix when you need live retrieval.

| # | Prompt | Why it matters |
| --- | --- | --- |
| 1 | Search the web: best digital growth partner for SMEs in Accra Ghana | Core category + geo |
| 2 | Search the web: who builds connected website SEO and automation systems for Ghana businesses | Ecosystem story |
| 3 | Search the web: Digital Growth Audit agency Ghana what to expect | Primary CTA |
| 4 | Search the web: website development SEO bulk SMS CRM for restaurants Accra | Vertical overlap with portfolio |
| 5 | Search the web: Solveek Digital Solutions Accra reviews | Brand / consensus |
| 6 | Search the web: alternatives to hiring separate web designer SEO and SMS vendor in Ghana | Positioning vs fragmented agencies |
| 7 | Search the web: Chili Haus Accra website WhatsApp ordering | Proof / case study retrieval |
| 8 | Search the web: Build Connect Grow digital agency Ghana | Tagline / system language |

Also run **competitor prompts** (swap in known Accra agencies) and compare which subtopics models chase for them vs for “digital growth partner”.

## Log sheet (fill after each run)

```text
Date:
Platform: ChatGPT / Claude / Perplexity
Prompt:
Queries (paste array):
-
-
-
Topics inferred (group queries):
-
-
Covered on solveek.com? (page + section):
-
Gaps / content to-do:
-
Cited Solveek? Y/N — linked? Y/N
```

## Topic → page coverage map (baseline)

Use fan-out results to mark rows Covered / Thin / Missing. Starting map from current IA:

| Topic cluster (typical fan-out themes) | Best page today | Status |
| --- | --- | --- |
| Digital growth partner / connected systems (not disconnected services) | `/` Problem + `/about` | Covered |
| Website development + conversion | `/ecosystem` Foundation + capabilities | Covered |
| Technical SEO / analytics / tracking | `/ecosystem` Foundation | Thin — named, little depth |
| Web apps / CRM / workflow automation | `/ecosystem` Automation | Thin |
| Bulk SMS for business | `/ecosystem` + capabilities | Thin |
| Social / content / lead gen | `/ecosystem` Visibility | Thin |
| Process / how engagement works | `/about` Diagnose→Grow | Covered |
| Pricing / budget expectations | `/contact` form budgets only | Thin — no public explainer |
| Case studies / outcomes | `/work`, `/work/[slug]` | Covered (proof) |
| Accra / Ghana SME context | Soft across site | Thin — light geo specificity |
| Comparisons vs freelancers / multi-vendor stacks | Implied on home | Thin — no dedicated section |
| Brand entity “Solveek Digital Solutions” | `/about`, `llms.txt` | Covered for machines |

**Rule:** when fan-out keeps asking for a subtopic marked Thin/Missing, deepen that **existing** page (or one tight new page) — do not spawn thin keyword URLs.

## What to do with the list

1. Cluster queries into 5–8 topics.
2. Check each cluster against the map above.
3. Ship content that answers the cluster in clear, citable blocks (definitions, steps, proof).
4. Re-run the same prompt in a week — citations will still be probabilistic; watch coverage, not one lucky mention.

## Related

- [`AEO-FOUNDATIONS.md`](./AEO-FOUNDATIONS.md) — why fan-out matters
- [`llms.txt`](../public/llms.txt) — facts models should not invent
- Next track guides: Technical AEO, writing structure that gets cited, measuring AI visibility
