# Solveek JSON-LD Structured Data

Next.js App Router implementation aligned with Google’s structured data gallery.
Guide reference: https://developers.google.com/search/docs/appearance/structured-data/search-gallery

## Pattern

- Component: `src/components/seo/structured-data.tsx`
- Helpers: `src/lib/seo.ts`
- Global schemas in `src/app/layout.tsx` via a single `@graph` block
- Page schemas via `<StructuredData data={[...]} />` on each route

No `react-helmet-async` — schemas are server-rendered in the HTML source.

## Schema map

| Page | Schemas |
| --- | --- |
| All pages (layout) | Organization + ProfessionalService, WebSite |
| About | WebPage, BreadcrumbList |
| Ecosystem | WebPage, BreadcrumbList, ItemList (capabilities as Service) |
| Work | WebPage, BreadcrumbList |
| Work/[slug] | BreadcrumbList, CreativeWork |
| Contact | WebPage, BreadcrumbList, Service (Digital Growth Audit) |

## Intentionally omitted

| Schema | Why |
| --- | --- |
| SearchAction on WebSite | No on-site search |
| LocalBusiness | No public street address to claim |
| FAQPage | No live FAQ page (legacy `/faqs` redirects) |
| Article / BlogPosting | No blog |
| SoftwareApplication / Product | Not a SaaS product site; service catalog instead |
| AggregateRating | No verified public ratings |

## Validate after deploy

1. [Rich Results Test](https://search.google.com/test/rich-results) — Home, About, Ecosystem, Work, Contact, a work detail
2. [Schema Markup Validator](https://validator.schema.org/)
3. Search Console → Enhancements / URL Inspection
