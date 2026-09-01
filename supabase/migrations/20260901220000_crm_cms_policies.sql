-- Allow CRM staff to manage public website CMS tables
do $$
declare
  t text;
begin
  foreach t in array array[
    'services',
    'industries',
    'projects',
    'insights',
    'faqs',
    'testimonials',
    'stats',
    'process_steps',
    'timeline',
    'offices',
    'why_choose',
    'site_content'
  ]
  loop
    execute format('drop policy if exists crm_staff_select_%I on public.%I', t, t);
    execute format(
      'create policy crm_staff_select_%I on public.%I for select to authenticated using (public.crm_is_staff())',
      t, t
    );
    execute format('drop policy if exists crm_staff_insert_%I on public.%I', t, t);
    execute format(
      'create policy crm_staff_insert_%I on public.%I for insert to authenticated with check (public.crm_is_staff())',
      t, t
    );
    execute format('drop policy if exists crm_staff_update_%I on public.%I', t, t);
    execute format(
      'create policy crm_staff_update_%I on public.%I for update to authenticated using (public.crm_is_staff()) with check (public.crm_is_staff())',
      t, t
    );
    execute format('drop policy if exists crm_staff_delete_%I on public.%I', t, t);
    execute format(
      'create policy crm_staff_delete_%I on public.%I for delete to authenticated using (public.crm_is_staff())',
      t, t
    );
  end loop;
end $$;
