# SOLVEEK

Premium digital solutions website for **SOLVEEK** — *We bring great ideas to life.*

SOLVEEK offers IT solutions including website design, social media management, e-commerce, SaaS products, branding, UX, and digital growth systems.

Built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, GSAP, Shadcn UI, React Hook Form, and Zod.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint

## Pages

- `/` Home
- `/about` About
- `/services` + `/services/[slug]` Services
- `/industries` Solutions by industry
- `/projects` + `/projects/[slug]` Case studies
- `/careers` Careers
- `/insights` + `/insights/[slug]` Insights
- `/faqs` FAQs
- `/contact` Contact
- `/quote` Quote request

## Stack notes

- Brand colors and typography are defined in `src/app/globals.css`
- Content models live in `src/constants/` for easy CMS migration later
- Forms post to `/api/contact`, `/api/quote`, and `/api/newsletter` with Zod validation, honeypot fields, and basic rate limiting
- Security headers are applied in `src/middleware.ts`
- SEO includes metadata, Open Graph, robots.txt, sitemap.xml, and Organization JSON-LD

## Deploy

Optimized for Vercel. Set `SITE.url` in `src/constants/site.ts` to your production domain before launch.
