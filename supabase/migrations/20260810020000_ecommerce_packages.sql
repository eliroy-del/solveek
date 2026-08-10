-- E-commerce packages for /services/ecommerce
insert into public.site_content (key, value)
values (
  'ecommerce_packages',
  '[
    {
      "name": "Starter",
      "tagline": "Open your store",
      "price": "GHS 6,000",
      "priceNote": "from",
      "description": "A clean storefront for brands ready to sell a focused catalog online.",
      "features": [
        "Up to 25 products",
        "Mobile-ready storefront",
        "Product pages & cart",
        "Payment gateway setup",
        "Order notification emails",
        "Basic inventory tracking",
        "2 revision rounds"
      ],
      "cta": "Choose Starter",
      "highlighted": false
    },
    {
      "name": "Business",
      "tagline": "Sell with confidence",
      "price": "GHS 10,000",
      "priceNote": "from",
      "description": "A conversion-focused store with richer merchandising and smoother checkout.",
      "features": [
        "Up to 150 products",
        "Custom storefront design",
        "Collections & filters",
        "Optimized checkout flow",
        "Discounts & promo codes",
        "Shipping rules setup",
        "Analytics & conversion tracking",
        "3 revision rounds",
        "30 days post-launch support"
      ],
      "cta": "Choose Business",
      "highlighted": true
    },
    {
      "name": "Premium",
      "tagline": "Scale your commerce system",
      "price": "GHS 18,000",
      "priceNote": "from",
      "description": "An advanced commerce experience for growing brands that need depth and automation.",
      "features": [
        "Unlimited products in scope",
        "Custom design system",
        "Advanced product options & variants",
        "CRM / email marketing integrations",
        "Abandoned cart recovery",
        "Multi-payment & delivery options",
        "CRO-ready landing templates",
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
