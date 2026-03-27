-- ============================================================
-- GlamGo Demo Account Seed Script
-- Run this in Supabase Dashboard > SQL Editor AFTER creating
-- the 3 users in Authentication > Users.
--
-- Accounts to create first:
--   stylist.adaeze@glamgo.ng  |  GlamGo2026!
--   stylist.chioma@glamgo.ng  |  GlamGo2026!
--   demo.client@glamgo.ng     |  GlamGo2026!
-- ============================================================

DO $$
DECLARE
  adaeze_uid UUID;
  chioma_uid UUID;
  client_uid UUID;
  adaeze_profile_id UUID;
  chioma_profile_id UUID;
BEGIN

  -- 1. Get the UUIDs Supabase assigned (from auth.users)
  SELECT id INTO adaeze_uid FROM auth.users WHERE email = 'stylist.adaeze@glamgo.ng';
  SELECT id INTO chioma_uid  FROM auth.users WHERE email = 'stylist.chioma@glamgo.ng';
  SELECT id INTO client_uid  FROM auth.users WHERE email = 'demo.client@glamgo.ng';

  -- 2. Insert into public.users table (your app's user profile)
  INSERT INTO public.users (id, email, full_name, role, created_at)
  VALUES
    (adaeze_uid, 'stylist.adaeze@glamgo.ng', 'Adaeze Okonkwo', 'stylist', NOW()),
    (chioma_uid,  'stylist.chioma@glamgo.ng', 'Chioma Eze',     'stylist', NOW()),
    (client_uid,  'demo.client@glamgo.ng',    'Amina Bello',    'client',  NOW())
  ON CONFLICT (id) DO UPDATE
    SET full_name = EXCLUDED.full_name, role = EXCLUDED.role;

  -- 3. Create stylist profiles
  INSERT INTO stylist_profiles (
    user_id, bio, average_rating, total_reviews,
    service_mode, specialties, is_available
  ) VALUES (
    adaeze_uid,
    'Specializing in high-definition natural hair artistry and architectural braiding. My mission is to elevate the heritage of African styling into a modern, editorial luxury experience tailored uniquely to your silhouette.',
    4.8, 47, 'both',
    ARRAY['Braids', 'Cornrows', 'Natural Hair'],
    true
  )
  ON CONFLICT (user_id) DO NOTHING
  RETURNING id INTO adaeze_profile_id;

  -- Fetch profile ID if already exists
  IF adaeze_profile_id IS NULL THEN
    SELECT id INTO adaeze_profile_id FROM stylist_profiles WHERE user_id = adaeze_uid;
  END IF;

  INSERT INTO stylist_profiles (
    user_id, bio, average_rating, total_reviews,
    service_mode, specialties, is_available
  ) VALUES (
    chioma_uid,
    'Your go-to for flawless locs, twists, and goddess braids. Bringing luxury hair artistry to your doorstep with precision and care.',
    4.5, 28, 'mobile',
    ARRAY['Locs', 'Twists', 'Goddess Braids'],
    true
  )
  ON CONFLICT (user_id) DO NOTHING
  RETURNING id INTO chioma_profile_id;

  IF chioma_profile_id IS NULL THEN
    SELECT id INTO chioma_profile_id FROM stylist_profiles WHERE user_id = chioma_uid;
  END IF;

  -- 4. Link stylists to hairstyles (stylist_styles bridge table)
  -- Adaeze: Braids specialist
  INSERT INTO stylist_styles (stylist_id, hairstyle_id, stylist_price)
  VALUES
    (adaeze_profile_id, '6918b7de-fb7c-4b65-9f22-016aa612476b', 45000), -- Fulani Braids
    (adaeze_profile_id, '876692b9-1133-4ece-b074-b3a759cab920', 38000), -- Knotless Braids
    (adaeze_profile_id, '20512339-cc0d-43af-8275-f2ddee9e9d95', 42000), -- Knotless Braids With Curls
    (adaeze_profile_id, '0a8c1dc8-b6f6-4e95-b926-0c1e51d4fbd0', 25000), -- Alicia Keys With Beads
    (adaeze_profile_id, '6fe70579-28ce-40c8-b5a7-e2a951f25000', 20000)  -- Classic Shukwu
  ON CONFLICT DO NOTHING;

  -- Chioma: Locs & Twists specialist
  INSERT INTO stylist_styles (stylist_id, hairstyle_id, stylist_price)
  VALUES
    (chioma_profile_id, 'c9e936d9-8792-4481-a5ec-8f90d2ee5d45', 35000), -- Boho Locs
    (chioma_profile_id, '3b0a084e-8ac4-4e74-9308-1a19825cc1b6', 30000), -- Butterfly Locs
    (chioma_profile_id, '6fc31b71-f897-4d47-abb9-b7b85bb2558e', 22000), -- Jumbo Marley Twist
    (chioma_profile_id, '5ea1c150-1764-4a19-8439-0013a62426fb', 18000), -- Kinky Twist
    (chioma_profile_id, 'cbe5d317-e785-44fa-af9d-88a55cab8240', 25000)  -- Island Twist Braids
  ON CONFLICT DO NOTHING;

  RAISE NOTICE 'Done. Adaeze profile ID: %, Chioma profile ID: %', adaeze_profile_id, chioma_profile_id;

END $$;
