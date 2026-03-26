-- =============================================================
-- GlamGo — Phase 8: Client Hair Profile + Security Hardening
-- Migration: 005_phase8_hair_profile.sql
-- =============================================================

-- 1. Add client_hair_details JSONB column to bookings
--    Stores: { condition, myLength, styleLength }
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS client_hair_details jsonb DEFAULT '{}'::jsonb;

-- 2. Security hardening — fix mutable search_path on DB functions
-- (Flagged by Supabase linter: function_search_path_mutable)

CREATE OR REPLACE FUNCTION update_stylist_rating()
RETURNS trigger AS $$
BEGIN
  UPDATE stylist_profiles
  SET
    average_rating = (
      SELECT coalesce(round(avg(rating)::numeric, 2), 0)
      FROM reviews
      WHERE stylist_id = new.stylist_id
    ),
    total_reviews = (
      SELECT count(*)
      FROM reviews
      WHERE stylist_id = new.stylist_id
    ),
    updated_at = now()
  WHERE id = new.stylist_id;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql SET search_path = public;
