insert into public.site_content (key, value)
values
  ('brand_values', '[
    {"title":"Clarity","description":"We simplify complexity so teams and customers know what to do next."},
    {"title":"Craft","description":"Details matter. Visual quality, motion, and performance are non-negotiable."},
    {"title":"Momentum","description":"We ship thoughtfully and iterate with evidence, not guesswork."},
    {"title":"Partnership","description":"We operate as an extension of your team, accountable to outcomes."}
  ]'::jsonb),
  ('about_highlights', '["Solving complex digital problems","We guarantee trusted delivery","Experts across design & technology"]'::jsonb),
  ('trust_items', '["Website Design","Social Media","E-commerce","SaaS Products","UI/UX Design","Branding","Digital Marketing","Cloud & DevOps"]'::jsonb)
on conflict (key) do update
set value = excluded.value,
    updated_at = now();

update public.services
set featured = true
where slug in ('website-design','social-media-management','ecommerce','saas-products');

update public.services
set featured = false
where slug not in ('website-design','social-media-management','ecommerce','saas-products');
