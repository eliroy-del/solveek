-- Hide services no longer offered in the menu / services page
update public.services
set published = false,
    featured = false,
    updated_at = now()
where slug in (
  'saas-products',
  'cloud-devops',
  'ui-ux-design',
  'custom-software',
  'mobile-apps',
  'digital-marketing'
);

update public.services
set featured = true,
    updated_at = now()
where slug in (
  'website-design',
  'social-media-management',
  'ecommerce',
  'branding-identity'
);

update public.site_content
set value = '["Website Design","Social Media","E-commerce","Branding","SEO & Content","Maintenance & Support"]'::jsonb,
    updated_at = now()
where key = 'trust_items';
