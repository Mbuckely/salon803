-- Create private storage bucket for application resumes
insert into storage.buckets (id, name, public)
values ('applications', 'applications', false);

-- Create applications table
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  inserted_at timestamptz default now(),
  full_name text not null,
  email text not null,
  phone text,
  availability text,
  social text,
  message text,
  resume_path text
);

-- Enable RLS
alter table public.applications enable row level security;

-- Block direct client inserts; submissions will go through Edge Function with service role
create policy "no_client_insert"
on public.applications
for insert
to anon, authenticated
with check (false);

-- Storage policies for applications bucket
-- Only service role can upload (via edge function)
create policy "Service role can upload applications"
on storage.objects
for insert
to service_role
with check (bucket_id = 'applications');

create policy "Service role can read applications"
on storage.objects
for select
to service_role
using (bucket_id = 'applications');