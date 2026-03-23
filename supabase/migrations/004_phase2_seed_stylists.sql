-- =============================================================
-- GlamGo — Phase 2: Stylist Seed Data
-- Migration: 004_phase2_seed_stylists.sql
-- =============================================================

-- NOTE: 
-- Because Supabase auth.users relies on encrypted passwords and system triggers,
-- testing users are created via the Supabase Admin API in JS rather than raw SQL.
-- 
-- The following represents the 3 stylist test profiles generated under Phase 2:

/*
INSERT INTO stylist_profiles (user_id, bio, service_mode, is_available) VALUES 
('UUID_1', 'Expert in knotless braids and locs with 5 years of salon experience.', 'salon', true),
('UUID_2', 'Mobile luxury hairstylist specializing in bridal hair and silk presses.', 'mobile', true),
('UUID_3', 'Your go-to for HD lace frontals and flawless weaves. Salon & home services available.', 'both', true);
*/
