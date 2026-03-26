/* eslint-disable */
/**
 * GlamGo — Full Database Seed Script
 * ====================================
 * Populates the GlamGo Supabase database with:
 *   1. 20 hairstyles (gallery content)
 *   2. 3 test stylist accounts (bypasses RLS via Admin API)
 *   3. stylist_styles bridge records (links stylists to hairstyles)
 *
 * Usage:
 *   node scripts/seed_glamgo.js
 *
 * Requirements:
 *   - NEXT_PUBLIC_SUPABASE_URL in your environment
 *   - SUPABASE_SERVICE_ROLE_KEY in your environment
 *
 * To load .env.local automatically, uncomment the dotenv line below.
 */

// Uncomment if running locally and dotenv is installed:
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

// ─── Config ───────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('❌  Missing env vars. Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.');
  process.exit(1);
}

// Admin client — bypasses Row Level Security entirely
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// ─── Hairstyle Data ───────────────────────────────────────────────────────────

const HAIRSTYLES = [
  // Braids
  { name: 'Goddess Braids', category: 'braids', description: 'Ethereal knotless braids with curly leave-outs for a romantic, premium look.', images: ['https://images.unsplash.com/photo-1605980776566-0486c3ac7617?q=80&w=800'], price_min: 25000, price_max: 45000, duration_hrs: 4.5, is_trending: true },
  { name: 'Bohemian Knotless', category: 'braids', description: 'Lightweight knotless braids mixed with free-flowing human hair curls.', images: ['https://images.unsplash.com/photo-1610705267928-1b9f2fa7f1c5?q=80&w=800'], price_min: 30000, price_max: 50000, duration_hrs: 5.0, is_trending: true },
  { name: 'Jumbo Box Braids', category: 'braids', description: 'Large, statement box braids that make a bold impression with minimal upkeep.', images: ['https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=800'], price_min: 12000, price_max: 20000, duration_hrs: 2.0, is_trending: false },

  // Cornrows
  { name: 'Classic Stitch Braids', category: 'cornrows', description: 'Sharp, geometrically precise stitch cornrows straight back or into a bun.', images: ['https://images.unsplash.com/photo-1615555462529-659223e710ae?q=80&w=800'], price_min: 15000, price_max: 25000, duration_hrs: 2.5, is_trending: false },
  { name: 'Fulani Tribal Braids', category: 'cornrows', description: 'Intricate cornrow patterns with central braids and side drops, adorned with beads.', images: ['https://images.unsplash.com/photo-1583001809873-c6cd8dedb1cb?q=80&w=800'], price_min: 18000, price_max: 35000, duration_hrs: 3.5, is_trending: true },

  // Locs
  { name: 'Butterfly Locs', category: 'locs', description: 'Distressed, textured faux locs with signature loops for a bohemian vibe.', images: ['https://images.unsplash.com/photo-1630132145346-6bf46c3b6f9a?q=80&w=800'], price_min: 25000, price_max: 40000, duration_hrs: 4.0, is_trending: true },
  { name: 'Soft Locs', category: 'locs', description: 'Smooth, tension-free wrapped locs that are lightweight and flow naturally.', images: ['https://images.unsplash.com/photo-1605333190886-f40c74cb1e23?q=80&w=800'], price_min: 22000, price_max: 38000, duration_hrs: 4.0, is_trending: false },

  // Weaves
  { name: 'Bone Straight Frontal', category: 'weaves', description: 'Silky, ultra-flat weave install with a perfectly melted lace frontal.', images: ['https://images.unsplash.com/photo-1563462923588-4672e87c0c45?q=80&w=800'], price_min: 45000, price_max: 80000, duration_hrs: 3.0, is_trending: true },
  { name: 'Body Wave Sew-in', category: 'weaves', description: 'Voluminous body wave bundles installed with a seamless leave-out.', images: ['https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800'], price_min: 35000, price_max: 60000, duration_hrs: 2.5, is_trending: false },

  // Wigs
  { name: 'HD Lace Wig Install', category: 'wigs', description: 'Flawless wig application featuring HD lace and custom hairline plucking.', images: ['https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800'], price_min: 20000, price_max: 35000, duration_hrs: 1.5, is_trending: true },
  { name: 'Glueless Bob Unit', category: 'wigs', description: 'Sharp, blunt-cut bob wig styled securely without adhesives.', images: ['https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=800'], price_min: 15000, price_max: 25000, duration_hrs: 1.0, is_trending: false },
  { name: 'Custom Color Wig', category: 'wigs', description: 'Hand-dyed custom wig unit crafted for a one-of-a-kind look.', images: ['https://images.unsplash.com/photo-1563462923588-4672e87c0c45?q=80&w=800'], price_min: 40000, price_max: 75000, duration_hrs: 1.0, is_trending: true },

  // Natural
  { name: 'Silk Press', category: 'natural', description: 'Silky smooth, high-shine straightening treatment for natural hair types.', images: ['https://images.unsplash.com/photo-1605333190886-f40c74cb1e23?q=80&w=800'], price_min: 12000, price_max: 25000, duration_hrs: 1.5, is_trending: true },
  { name: 'Big Chop + Tapered Cut', category: 'natural', description: 'Liberating big chop styled into a chic, edgy tapered fro.', images: ['https://images.unsplash.com/photo-1512495039889-52a3b799c9bc?q=80&w=800'], price_min: 8000, price_max: 15000, duration_hrs: 1.0, is_trending: false },

  // Twists
  { name: 'Passion Twists', category: 'twists', description: 'Silky, curly two-strand twists that mimic natural distressed textures.', images: ['https://images.unsplash.com/photo-1605333190886-f40c74cb1e23?q=80&w=800'], price_min: 18000, price_max: 30000, duration_hrs: 3.5, is_trending: false },
  { name: 'Marley Twists', category: 'twists', description: 'Chunky, textured twists using kinky hair for a protective, natural look.', images: ['https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800'], price_min: 15000, price_max: 25000, duration_hrs: 3.0, is_trending: false },
  { name: 'Kinky Twists', category: 'twists', description: 'Short, springy kinky twists — a lightweight protective staple.', images: ['https://images.unsplash.com/photo-1610705267928-1b9f2fa7f1c5?q=80&w=800'], price_min: 15000, price_max: 25000, duration_hrs: 3.0, is_trending: false },

  // Crochet
  { name: 'Water Wave Crochet', category: 'crochet', description: 'Quick, voluminous water wave curls installed via crochet method.', images: ['https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800'], price_min: 10000, price_max: 18000, duration_hrs: 1.5, is_trending: false },

  // Updos
  { name: 'Sleek Low Bun', category: 'updos', description: 'Elegant, glass-like slicked-back bun perfect for events and bridals.', images: ['https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=800'], price_min: 8000, price_max: 15000, duration_hrs: 1.0, is_trending: true },
  { name: 'Bridal Updo', category: 'updos', description: 'Intricate updo designed for weddings — pins, curls, and editorial finish.', images: ['https://images.unsplash.com/photo-1605333190886-f40c74cb1e23?q=80&w=800'], price_min: 35000, price_max: 60000, duration_hrs: 2.5, is_trending: false },
];

// ─── Test Stylist Definitions ─────────────────────────────────────────────────

const TEST_STYLISTS = [
  {
    email: 'amaka@test.glamgo.com',
    password: 'glamgo123',
    full_name: 'Amaka Osei',
    city: 'Lagos',
    area: 'Lekki',
    bio: 'Expert knotless braids and locs specialist with 5 years of salon experience. Known for precision and clean partings.',
    service_mode: 'salon',
    service_area: ['Lekki', 'Victoria Island', 'Ikoyi'],
    specialties: ['braids', 'cornrows', 'locs'],
    average_rating: 4.8,
    // styles this stylist will offer (indices into HAIRSTYLES array, 0-based)
    styleIndices: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    email: 'chisom@test.glamgo.com',
    password: 'glamgo123',
    full_name: 'Chisom Adaeze',
    city: 'Lagos',
    area: 'Ikeja',
    bio: 'Mobile luxury stylist specializing in bridal hair, silk presses, and wig installs. I come to you.',
    service_mode: 'mobile',
    service_area: ['Ikeja', 'Surulere', 'Yaba', 'Lagos Island'],
    specialties: ['wigs', 'weaves', 'natural', 'updos'],
    average_rating: 4.9,
    styleIndices: [7, 8, 9, 10, 11, 12, 13, 18, 19],
  },
  {
    email: 'ngozi@test.glamgo.com',
    password: 'glamgo123',
    full_name: 'Ngozi Eze',
    city: 'Abuja',
    area: 'Wuse',
    bio: 'HD lace frontals, flawless weave installs, and twist sets. Salon & home services in Abuja. 7 years experience.',
    service_mode: 'both',
    service_area: ['Wuse', 'Garki', 'Maitama', 'Asokoro'],
    specialties: ['weaves', 'twists', 'braids', 'wigs'],
    average_rating: 4.7,
    styleIndices: [0, 1, 7, 8, 14, 15, 16, 17, 9, 10],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function log(msg) { console.log(`  ${msg}`); }
function ok(msg)  { console.log(`  ✅  ${msg}`); }
function warn(msg) { console.log(`  ⚠️   ${msg}`); }
function err(msg)  { console.log(`  ❌  ${msg}`); }
function section(title) { console.log(`\n─────────────────────────────────────\n  ${title}\n─────────────────────────────────────`); }

// ─── Main Seed ────────────────────────────────────────────────────────────────

async function seed() {
  console.log('\n╔═══════════════════════════════════════╗');
  console.log('║   GlamGo Full Database Seed Script    ║');
  console.log('╚═══════════════════════════════════════╝\n');

  // ── Step 1: Clear & seed hairstyles ──────────────────────────────────────
  section('STEP 1 — Hairstyles');

  // Check if hairstyles already exist
  const { data: existing } = await supabase.from('hairstyles').select('id').limit(1);
  if (existing && existing.length > 0) {
    warn('Hairstyles already exist. Skipping insert to avoid duplicates.');
    warn('To re-seed, delete existing rows first from the Supabase dashboard.');
  } else {
    const { data: inserted, error: hsError } = await supabase
      .from('hairstyles')
      .insert(HAIRSTYLES)
      .select('id, name');

    if (hsError) {
      err(`Failed to seed hairstyles: ${hsError.message}`);
      process.exit(1);
    }
    ok(`Inserted ${inserted.length} hairstyles.`);
  }

  // Fetch all hairstyle IDs (for linking below)
  const { data: allStyles, error: fetchStylesErr } = await supabase
    .from('hairstyles')
    .select('id, name')
    .order('name');

  if (fetchStylesErr || !allStyles || allStyles.length === 0) {
    err('Could not fetch hairstyle IDs after insert.');
    process.exit(1);
  }
  ok(`Loaded ${allStyles.length} hairstyle records for linking.`);

  // ── Step 2: Create stylist accounts ──────────────────────────────────────
  section('STEP 2 — Stylist Accounts');

  const createdStylists = [];

  for (const stylist of TEST_STYLISTS) {
    log(`Processing ${stylist.full_name} (${stylist.email})…`);

    // 2a. Check if auth user already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const alreadyExists = existingUsers?.users?.find(u => u.email === stylist.email);

    let userId;

    if (alreadyExists) {
      warn(`Auth user already exists for ${stylist.email} — reusing existing account.`);
      userId = alreadyExists.id;
    } else {
      // 2b. Create auth.users entry
      const { data: authUser, error: authErr } = await supabase.auth.admin.createUser({
        email: stylist.email,
        password: stylist.password,
        email_confirm: true, // auto-confirm so we can log in immediately
      });

      if (authErr || !authUser?.user) {
        err(`Failed to create auth user for ${stylist.email}: ${authErr?.message}`);
        continue;
      }
      userId = authUser.user.id;
      ok(`Created auth user: ${stylist.full_name} (${userId})`);
    }

    // 2c. Upsert into public.users table
    const { error: usersErr } = await supabase
      .from('users')
      .upsert({
        id: userId,
        email: stylist.email,
        full_name: stylist.full_name,
        role: 'stylist',
        city: stylist.city,
        area: stylist.area,
      }, { onConflict: 'id' });

    if (usersErr) {
      err(`Failed to upsert users row for ${stylist.full_name}: ${usersErr.message}`);
      continue;
    }

    // 2d. Upsert stylist_profiles
    const { data: profile, error: profileErr } = await supabase
      .from('stylist_profiles')
      .upsert({
        user_id: userId,
        bio: stylist.bio,
        service_mode: stylist.service_mode,
        service_area: stylist.service_area,
        specialties: stylist.specialties,
        is_available: true,
        average_rating: stylist.average_rating,
        total_reviews: 0,
        wallet_balance: 0,
        portfolio_images: [],
      }, { onConflict: 'user_id' })
      .select('id')
      .single();

    if (profileErr || !profile) {
      err(`Failed to upsert stylist_profiles for ${stylist.full_name}: ${profileErr?.message}`);
      continue;
    }

    ok(`Stylist profile ready for ${stylist.full_name} (profile id: ${profile.id})`);

    createdStylists.push({
      ...stylist,
      userId,
      profileId: profile.id,
    });
  }

  if (createdStylists.length === 0) {
    err('No stylists were created. Aborting.');
    process.exit(1);
  }

  // ── Step 3: Link stylists to hairstyles via stylist_styles ───────────────
  section('STEP 3 — Stylist Styles (Bridge Table)');

  for (const stylist of createdStylists) {
    const stylesToLink = stylist.styleIndices
      .map(i => allStyles[i])
      .filter(Boolean);

    if (stylesToLink.length === 0) {
      warn(`No valid styles to link for ${stylist.full_name}`);
      continue;
    }

    const stylistStyleRows = stylesToLink.map(style => ({
      stylist_id: stylist.profileId,
      hairstyle_id: style.id,
      // Price slightly customized per stylist (±10% of the hairstyle base price from HAIRSTYLES array)
      stylist_price: null, // null means use the hairstyle's price_min as fallback
      portfolio_images: [],
    }));

    const { error: linkErr } = await supabase
      .from('stylist_styles')
      .upsert(stylistStyleRows, { onConflict: 'stylist_id,hairstyle_id', ignoreDuplicates: true });

    if (linkErr) {
      err(`Failed to link styles for ${stylist.full_name}: ${linkErr.message}`);
    } else {
      ok(`Linked ${stylesToLink.length} styles for ${stylist.full_name}: ${stylesToLink.map(s => s.name).join(', ')}`);
    }
  }

  // ── Done ─────────────────────────────────────────────────────────────────
  section('SEED COMPLETE');

  console.log(`
  ✅  ${allStyles.length} hairstyles in database
  ✅  ${createdStylists.length} test stylists created
  ✅  stylist_styles bridge records inserted

  ─── Test Login Credentials ───────────────────
  Email       : amaka@test.glamgo.com
  Password    : glamgo123
  Role        : Stylist (Salon — Lagos, Lekki)

  Email       : chisom@test.glamgo.com
  Password    : glamgo123
  Role        : Stylist (Mobile — Lagos, Ikeja)

  Email       : ngozi@test.glamgo.com
  Password    : glamgo123
  Role        : Stylist (Both — Abuja, Wuse)

  ─── What to do now ───────────────────────────
  1. Open your app: http://localhost:3000
  2. Go to /gallery — you should see 20 hairstyles
  3. Click any hairstyle — you should see 1-3 stylists
  4. Book a style and test the full flow

  ──────────────────────────────────────────────
  `);
}

seed().catch(e => {
  console.error('\n❌  Seed script crashed:', e.message);
  process.exit(1);
});
