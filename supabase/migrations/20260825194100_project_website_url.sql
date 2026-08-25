-- Optional live project URL for portfolio case studies
alter table public.projects
  add column if not exists website_url text not null default '';
