-- =============================================================
-- GlamGo — Phase 2: Storage Buckets & Policies
-- Migration: 003_phase2_storage.sql
-- =============================================================

insert into storage.buckets (id, name, public) values 
  ('portfolio', 'portfolio', true),
  ('hairstyle-images', 'hairstyle-images', true)
on conflict (id) do nothing;

-- Enable RLS on storage.objects if not already enabled
alter table storage.objects enable row level security;

-- Drop existing policies if running multiple times
drop policy if exists "public read portfolio" on storage.objects;
drop policy if exists "stylists insert portfolio" on storage.objects;
drop policy if exists "public read hairstyles" on storage.objects;
drop policy if exists "stylists insert hairstyles" on storage.objects;

-- Create Policies
create policy "public read portfolio" on storage.objects 
  for select using (bucket_id = 'portfolio');

create policy "stylists insert portfolio" on storage.objects 
  for insert with check (bucket_id = 'portfolio' and auth.role() = 'authenticated' and exists (select 1 from public.stylist_profiles where user_id = auth.uid()));

create policy "public read hairstyles" on storage.objects 
  for select using (bucket_id = 'hairstyle-images');

create policy "stylists insert hairstyles" on storage.objects 
  for insert with check (bucket_id = 'hairstyle-images' and auth.role() = 'authenticated' and exists (select 1 from public.stylist_profiles where user_id = auth.uid()));
