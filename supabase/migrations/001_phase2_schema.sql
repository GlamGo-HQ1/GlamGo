-- =============================================================
-- GlamGo — Phase 2: Full Database Schema
-- Migration: 001_phase2_schema.sql
-- =============================================================

-- CLEANUP FOR IDEMPOTENCY
drop trigger if exists on_review_inserted on reviews;
drop trigger if exists set_users_updated_at on users;
drop trigger if exists set_stylist_profiles_updated_at on stylist_profiles;
drop trigger if exists set_bookings_updated_at on bookings;

drop function if exists update_stylist_rating cascade;
drop function if exists set_updated_at cascade;

drop table if exists reviews cascade;
drop table if exists bookings cascade;
drop table if exists stylist_styles cascade;
drop table if exists hairstyles cascade;
drop table if exists stylist_profiles cascade;
drop table if exists "users" cascade;

drop type if exists user_role cascade;
drop type if exists service_mode cascade;
drop type if exists hairstyle_category cascade;
drop type if exists booking_status cascade;
drop type if exists payment_status cascade;

-- ─────────────────────────────────────────────
-- ENUMS
-- ─────────────────────────────────────────────
create type user_role as enum ('client', 'stylist');
create type service_mode as enum ('salon', 'mobile', 'both');
create type hairstyle_category as enum (
  'braids', 'cornrows', 'locs', 'weaves', 'wigs',
  'natural', 'twists', 'crochet', 'updos'
);
create type booking_status as enum (
  'pending', 'confirmed', 'in_progress',
  'completed', 'cancelled', 'declined'
);
create type payment_status as enum (
  'unpaid', 'paid', 'refunded'
);

-- ─────────────────────────────────────────────
-- TABLE: users
-- ─────────────────────────────────────────────
create table users (
  id           uuid primary key references auth.users(id) on delete cascade,
  email        text not null unique,
  full_name    text not null,
  phone        text,
  role         user_role not null default 'client',
  avatar_url   text,
  city         text,
  area         text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- TABLE: stylist_profiles
-- ─────────────────────────────────────────────
create table stylist_profiles (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null unique references users(id) on delete cascade,
  bio              text,
  average_rating   numeric(3,2) not null default 0.00,
  total_reviews    integer not null default 0,
  service_mode     service_mode not null default 'salon',
  service_area     text[] default '{}',
  specialties      text[] default '{}',
  portfolio_images text[] default '{}',
  is_available     boolean not null default true,
  wallet_balance   numeric(12,2) not null default 0.00,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- TABLE: hairstyles
-- ─────────────────────────────────────────────
create table hairstyles (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  category     hairstyle_category not null,
  description  text,
  images       text[] default '{}',
  price_min    numeric(10,2),
  price_max    numeric(10,2),
  duration_hrs numeric(4,1),
  is_trending  boolean not null default false,
  created_at   timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- TABLE: stylist_styles (junction)
-- ─────────────────────────────────────────────
create table stylist_styles (
  id               uuid primary key default gen_random_uuid(),
  stylist_id       uuid not null references stylist_profiles(id) on delete cascade,
  hairstyle_id     uuid not null references hairstyles(id) on delete cascade,
  stylist_price    numeric(10,2),
  portfolio_images text[] default '{}',
  created_at       timestamptz not null default now(),
  unique(stylist_id, hairstyle_id)
);

-- ─────────────────────────────────────────────
-- TABLE: bookings
-- ─────────────────────────────────────────────
create table bookings (
  id                  uuid primary key default gen_random_uuid(),
  client_id           uuid not null references users(id) on delete restrict,
  stylist_id          uuid not null references stylist_profiles(id) on delete restrict,
  style_id            uuid not null references hairstyles(id) on delete restrict,
  appointment_date    date not null,
  time_slot           text not null,
  client_address      text,
  status              booking_status not null default 'pending',
  payment_status      payment_status not null default 'unpaid',
  amount              numeric(10,2),
  interswitch_ref     text unique,
  confirmation_code   char(4),
  notes               text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ─────────────────────────────────────────────
-- TABLE: reviews
-- ─────────────────────────────────────────────
create table reviews (
  id          uuid primary key default gen_random_uuid(),
  booking_id  uuid not null unique references bookings(id) on delete cascade,
  client_id   uuid not null references users(id) on delete cascade,
  stylist_id  uuid not null references stylist_profiles(id) on delete cascade,
  rating      smallint not null check (rating >= 1 and rating <= 5),
  comment     text,
  created_at  timestamptz not null default now()
);

-- =============================================================
-- INDEXES
-- =============================================================
create index idx_hairstyles_category          on hairstyles(category);
create index idx_hairstyles_trending          on hairstyles(is_trending) where is_trending = true;
create index idx_stylist_profiles_available   on stylist_profiles(is_available, average_rating desc);
create index idx_stylist_styles_stylist       on stylist_styles(stylist_id);
create index idx_stylist_styles_hairstyle     on stylist_styles(hairstyle_id);
create index idx_bookings_client              on bookings(client_id, created_at desc);
create index idx_bookings_stylist             on bookings(stylist_id, created_at desc);
create index idx_bookings_status             on bookings(status);
create index idx_reviews_stylist              on reviews(stylist_id, created_at desc);

-- =============================================================
-- TRIGGER: Auto-update stylist average_rating on new review
-- =============================================================
create or replace function update_stylist_rating()
returns trigger as $$
begin
  update stylist_profiles
  set
    average_rating = (
      select coalesce(round(avg(rating)::numeric, 2), 0) 
      from reviews 
      where stylist_id = new.stylist_id
    ),
    total_reviews = (
      select count(*) 
      from reviews 
      where stylist_id = new.stylist_id
    ),
    updated_at = now()
  where id = new.stylist_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_review_inserted
  after insert on reviews
  for each row execute function update_stylist_rating();

-- =============================================================
-- TRIGGER: Auto-update updated_at timestamps
-- =============================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_users_updated_at
  before update on users
  for each row execute function set_updated_at();

create trigger set_stylist_profiles_updated_at
  before update on stylist_profiles
  for each row execute function set_updated_at();

create trigger set_bookings_updated_at
  before update on bookings
  for each row execute function set_updated_at();

-- =============================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================
alter table users enable row level security;
alter table stylist_profiles enable row level security;
alter table hairstyles enable row level security;
alter table stylist_styles enable row level security;
alter table bookings enable row level security;
alter table reviews enable row level security;

create policy "hairstyles: public read" on hairstyles for select using (true);
create policy "stylist_profiles: public read" on stylist_profiles for select using (true);
create policy "stylist_profiles: owner update" on stylist_profiles for update using (user_id = auth.uid());
create policy "stylist_styles: public read" on stylist_styles for select using (true);
create policy "stylist_styles: stylist insert" on stylist_styles for insert with check (stylist_id in (select id from stylist_profiles where user_id = auth.uid()));
create policy "stylist_styles: stylist update" on stylist_styles for update using (stylist_id in (select id from stylist_profiles where user_id = auth.uid()));
create policy "users: owner read" on users for select using (id = auth.uid());
create policy "users: owner update" on users for update using (id = auth.uid());
create policy "users: owner insert" on users for insert with check (id = auth.uid());
create policy "bookings: client read own" on bookings for select using (client_id = auth.uid());
create policy "bookings: stylist read own" on bookings for select using (stylist_id in (select id from stylist_profiles where user_id = auth.uid()));
create policy "bookings: client insert" on bookings for insert with check (client_id = auth.uid());
create policy "bookings: client update" on bookings for update using (client_id = auth.uid());
create policy "bookings: stylist update" on bookings for update using (stylist_id in (select id from stylist_profiles where user_id = auth.uid()));
create policy "bookings: parties delete" on bookings for delete using (client_id = auth.uid() or stylist_id in (select id from stylist_profiles where user_id = auth.uid()));
create policy "reviews: authenticated read" on reviews for select using (auth.role() = 'authenticated');
create policy "reviews: client insert" on reviews for insert with check (client_id = auth.uid() and booking_id in (select id from bookings where client_id = auth.uid() and status = 'completed'));
create policy "reviews: client update" on reviews for update using (client_id = auth.uid());
create policy "reviews: client delete" on reviews for delete using (client_id = auth.uid());
