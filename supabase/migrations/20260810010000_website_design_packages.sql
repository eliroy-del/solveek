-- Website design packages for /services/website-design
insert into public.site_content (key, value)
values (
  'website_design_packages',
  '[
    {
      "name": "Starter",
      "tagline": "Launch with clarity",
      "price": "GHS 8,500",
      "priceNote": "from",
      "description": "A focused marketing site for brands that need a credible online presence fast.",
      "features": [
        "Up to 5 pages",
        "Mobile-responsive design",
        "Basic CMS for updates",
        "Contact form + WhatsApp CTA",
        "SEO essentials & analytics",
        "2 revision rounds"
      ],
      "cta": "Choose Starter",
      "highlighted": false
    },
    {
      "name": "Business",
      "tagline": "Grow with a conversion system",
      "price": "GHS 18,500",
      "priceNote": "from",
      "description": "A full business website with stronger storytelling, lead capture, and performance polish.",
      "features": [
        "Up to 12 pages",
        "Custom UI direction",
        "CMS with structured content",
        "Lead capture & quote flows",
        "Blog or resources section",
        "Performance & accessibility pass",
        "3 revision rounds",
        "30 days post-launch support"
      ],
      "cta": "Choose Business",
      "highlighted": true
    },
    {
      "name": "Premium",
      "tagline": "Design systems that scale",
      "price": "GHS 35,000",
      "priceNote": "from",
      "description": "A premium web product experience for ambitious brands that need depth, motion, and flexibility.",
      "features": [
        "Unlimited key pages in scope",
        "Custom design system",
        "Advanced interactions & motion",
        "CMS workflows for your team",
        "Integrations (CRM, payments, booking)",
        "CRO-ready page architecture",
        "Priority delivery support",
        "60 days post-launch support"
      ],
      "cta": "Choose Premium",
      "highlighted": false
    }
  ]'::jsonb
)
on conflict (key) do update
set value = excluded.value,
    updated_at = now();
