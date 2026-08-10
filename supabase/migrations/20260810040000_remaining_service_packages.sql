-- Packages for social, branding, SEO, and maintenance service pages
insert into public.site_content (key, value)
values
  (
    'social_media_packages',
    '[
      {
        "name": "Starter",
        "tagline": "Show up consistently",
        "price": "GHS 2,500",
        "priceNote": "/month",
        "description": "A focused monthly rhythm for brands building presence on core channels.",
        "features": [
          "Up to 2 platforms",
          "8 posts per month",
          "Caption writing & scheduling",
          "Basic brand-aligned visuals",
          "Monthly performance summary"
        ],
        "cta": "Choose Starter",
        "highlighted": false
      },
      {
        "name": "Business",
        "tagline": "Grow with a content system",
        "price": "GHS 4,500",
        "priceNote": "/month",
        "description": "Strategy-led content and community management for brands ready to engage.",
        "features": [
          "Up to 3 platforms",
          "16 posts per month",
          "Content calendar & themes",
          "Community replies (business hours)",
          "Stories / short-form support",
          "Bi-weekly reporting"
        ],
        "cta": "Choose Business",
        "highlighted": true
      },
      {
        "name": "Premium",
        "tagline": "Run social as a growth engine",
        "price": "GHS 8,000",
        "priceNote": "/month",
        "description": "A full social operating system with creative depth and clear growth loops.",
        "features": [
          "Up to 5 platforms",
          "24+ posts per month",
          "Campaign planning & creative direction",
          "Community management",
          "Influencer / collab coordination",
          "Ads creative support",
          "Weekly reporting & recommendations"
        ],
        "cta": "Choose Premium",
        "highlighted": false
      }
    ]'::jsonb
  ),
  (
    'branding_packages',
    '[
      {
        "name": "Starter",
        "tagline": "A clear visual identity",
        "price": "GHS 3,000",
        "priceNote": "from",
        "description": "A focused brand foundation for new businesses and early-stage launches.",
        "features": [
          "Logo design (primary + mark)",
          "Color palette & typography",
          "Basic brand usage rules",
          "Social profile kit",
          "2 revision rounds"
        ],
        "cta": "Choose Starter",
        "highlighted": false
      },
      {
        "name": "Business",
        "tagline": "A brand kit your team can use",
        "price": "GHS 5,500",
        "priceNote": "from",
        "description": "A complete identity system for brands that need consistency across channels.",
        "features": [
          "Full logo suite",
          "Color, type, and spacing system",
          "Brand guidelines PDF",
          "Business card & letterhead",
          "Social templates",
          "3 revision rounds"
        ],
        "cta": "Choose Business",
        "highlighted": true
      },
      {
        "name": "Premium",
        "tagline": "A brand system that scales",
        "price": "GHS 10,000",
        "priceNote": "from",
        "description": "An expanded brand system with messaging and collateral for growth.",
        "features": [
          "Complete visual identity system",
          "Tone of voice & messaging pillars",
          "Extended guidelines & templates",
          "Launch collateral pack",
          "Presentation / pitch deck styling",
          "Brand workshop session",
          "Priority delivery support"
        ],
        "cta": "Choose Premium",
        "highlighted": false
      }
    ]'::jsonb
  ),
  (
    'seo_content_packages',
    '[
      {
        "name": "Starter",
        "tagline": "Get the foundations right",
        "price": "GHS 2,000",
        "priceNote": "/month",
        "description": "Technical and on-page essentials for sites that need stronger search visibility.",
        "features": [
          "Technical SEO audit",
          "On-page optimization for key pages",
          "Keyword research starter set",
          "Google Search Console setup",
          "Monthly progress report"
        ],
        "cta": "Choose Starter",
        "highlighted": false
      },
      {
        "name": "Business",
        "tagline": "Publish with intent",
        "price": "GHS 3,500",
        "priceNote": "/month",
        "description": "Ongoing SEO and content production that builds topical authority.",
        "features": [
          "Technical + content SEO roadmap",
          "4 SEO articles per month",
          "On-page optimization",
          "Internal linking improvements",
          "Competitor snapshot",
          "Monthly reporting"
        ],
        "cta": "Choose Business",
        "highlighted": true
      },
      {
        "name": "Premium",
        "tagline": "Compound organic growth",
        "price": "GHS 6,000",
        "priceNote": "/month",
        "description": "A fuller search and content system for brands competing for demand.",
        "features": [
          "Full SEO strategy & content calendar",
          "8 SEO articles per month",
          "Landing page copy support",
          "Technical SEO monitoring",
          "Schema & CRO recommendations",
          "Priority support & monthly workshop"
        ],
        "cta": "Choose Premium",
        "highlighted": false
      }
    ]'::jsonb
  ),
  (
    'maintenance_packages',
    '[
      {
        "name": "Starter",
        "tagline": "Stay secure and online",
        "price": "GHS 800",
        "priceNote": "/month",
        "description": "Essential care for websites that need reliable updates and monitoring.",
        "features": [
          "Uptime monitoring",
          "Core software updates",
          "Weekly backups",
          "Security patches",
          "Monthly health report"
        ],
        "cta": "Choose Starter",
        "highlighted": false
      },
      {
        "name": "Business",
        "tagline": "Keep improving after launch",
        "price": "GHS 1,500",
        "priceNote": "/month",
        "description": "Ongoing maintenance plus light improvements for active digital products.",
        "features": [
          "Everything in Starter",
          "Performance checks",
          "2 hours of minor updates",
          "Content / copy tweaks",
          "Priority email support",
          "Monthly recommendations"
        ],
        "cta": "Choose Business",
        "highlighted": true
      },
      {
        "name": "Premium",
        "tagline": "A retainer that ships",
        "price": "GHS 3,000",
        "priceNote": "/month",
        "description": "A proactive care plan for teams that want continuous iteration.",
        "features": [
          "Everything in Business",
          "8 hours of development / design",
          "Feature polish & A/B support",
          "Incident response priority",
          "Quarterly growth review",
          "Dedicated support channel"
        ],
        "cta": "Choose Premium",
        "highlighted": false
      }
    ]'::jsonb
  )
on conflict (key) do update
set value = excluded.value,
    updated_at = now();
