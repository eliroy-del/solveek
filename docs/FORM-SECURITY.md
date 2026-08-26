# Form Validation & Security — Solveek

Defence-in-depth for all public forms (audit, contact, newsletter, quote).

Also see [`ENDPOINT-AUTH-AUDIT.md`](./ENDPOINT-AUTH-AUDIT.md) for who may call each API route.

## Stack

| Layer | Implementation |
| --- | --- |
| Frontend Zod | `src/lib/validation.ts` + react-hook-form |
| XSS sanitize | `src/lib/sanitize.ts` (`xss` package) |
| Server re-validate | Same schemas in `src/app/api/*/route.ts` |
| CORS | `src/lib/api-security.ts` — whitelist origins only |
| Rate limit | Existing `src/lib/rate-limit.ts` |
| Honeypot | `honeypot` (audit) / `website` (others) |

## Phone rules

Ghana-first (`+233` / `0XX…`), with room for international lengths. Not UK validation from the generic template.

## Checklist

- [x] `zod` + `xss` installed
- [x] Shared schemas for all forms
- [x] Sanitize strings before submit and before DB insert
- [x] Field-level API error payloads (`errors`)
- [x] CORS allowlist (`www.solveek.com`, apex, localhost, Vercel URL)
- [x] Rate limiting retained
- [x] Honeypots retained
- [x] Submit buttons disabled while submitting
