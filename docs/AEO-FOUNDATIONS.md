# AEO Foundations — Solveek

Mental model for Answer Engine Optimization (AEO / GEO / LLMO), mapped to what this codebase already controls.

Source framing: AI answer engines (Google AI Overviews / AI Mode, ChatGPT, Perplexity, Copilot, Gemini, Claude) synthesize answers; citations are probabilistic, not fixed rankings.

## What AEO is here

| | SEO (already in progress) | AEO (this layer) |
| --- | --- | --- |
| Goal | Rank and earn clicks | Be mentioned / cited inside answers |
| Competition | Page vs keyword | Topic-wide coverage across fan-out sub-queries |
| Stability | Relatively stable | Same prompt ≠ same citations |
| Metric | Position, traffic | Mentions, citations, share of voice, brand recall |

AEO does **not** replace SEO. Strong technical SEO + real HTML + authority still feed live retrieval (RAG).

## Two levers

1. **Training data** — be mentioned credibly across the web over time (mostly marketing / PR; not this repo).
2. **Live retrieval** — when models search, our pages must be crawlable, factual, and topic-complete (this repo).

## Developer lane (this project)

| Foundation | Solveek status |
| --- | --- |
| Real HTML for crawlers (not empty CSR shell) | Done — Next.js SSR ([`CRAWLABILITY-PLAYBOOK.md`](./CRAWLABILITY-PLAYBOOK.md)) |
| robots allows AI crawlers | Done — explicit agents in `src/app/robots.ts` |
| `llms.txt` brand facts | Done — `public/llms.txt` |
| Unique meta + canonicals + sitemap | Done — SEO helpers + `sitemap.ts` |
| Structured data for machines | Done — JSON-LD `@graph` ([`JSON-LD.md`](./JSON-LD.md)) |
| Topic coverage (query fan-out) | Partial — Ecosystem / About / Work / Contact cover Build·Connect·Grow; deepen with content, not more thin pages |
| Consensus / unlinked brand mentions | Marketing lane — outreach, directories, YouTube, PR |
| Measuring AI visibility | Later track — GA4 referral patterns, Search Console, brand tools |

## Platforms differ

Do not treat “AI search” as one ranking. Overlap across AI Overviews, ChatGPT, and Perplexity is thin. Strong Google SEO helps AI Overviews + Perplexity most; ChatGPT leans publishers/media; AI Mode leans social/video.

## Three outcomes

1. Cited and linked (best for traffic)
2. Mentioned, not linked (brand recall; common)
3. Absent

Optimize for being the clear, citable source on Solveek’s own topics — not for inventing fake FAQ farms.

## What not to do in code

- Do not block GPTBot / Google-Extended / PerplexityBot / Claude bots unless product/legal requires it
- Do not invent clients, ratings, or addresses for schema or `llms.txt`
- Do not chase zero-volume fan-out “keywords” as a keyword list — cover the topic properly instead
- Do not abandon classic SEO for AEO theater

## Next guides in this track (when provided)

1. Seeing what AI actually searches (fan-out inspection)
2. Technical AEO deeper pass
3. Writing structure that gets cited
4. Measuring AI visibility

Until then: keep `llms.txt` facts fresh, ship real content updates on Ecosystem/About/Work, and maintain crawl/SSR health.
