/**
 * Final Catalog Seed Script
 * Clears all dummy hairstyles and re-seeds with the real generated_catalog.json
 * Maps GlamGo DB categories to the category names in the catalog.
 */
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const catalog = require('./generated_catalog.json');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Map from the catalog's long category names to the DB enum values
const CATEGORY_MAP = {
  'Braids': 'braids',
  'Locs (Dreads & Faux Locs)': 'locs',
  'Twists': 'twists',
  'Weaving (Cornrows & Stitch Styles)': 'cornrows',
};

const TRENDING_NAMES = ['Knotless Braids', 'Boho Locs', 'Butterfly Locs', 'Stitch Braids', 'Fulani Braids'];

async function seed() {
  console.log('--- GlamGo Final Catalog Seed ---');

  // 1. Delete all existing dummy hairstyles (this cascades to stylist_styles)
  console.log('Clearing old hairstyle data...');
  const { error: delError } = await supabase.from('hairstyles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delError) {
    console.error('Error clearing hairstyles:', delError.message);
    return;
  }
  console.log('Old data cleared.');

  // 2. Insert all real hairstyles from the catalog
  const rows = catalog.map(item => ({
    name: item.name,
    category: CATEGORY_MAP[item.category] || 'braids',
    description: item.description,
    images: item.images,
    price_min: item.price_min,
    price_max: item.price_max,
    duration_hrs: item.duration_hrs || 4,
    is_trending: TRENDING_NAMES.includes(item.name),
  }));

  console.log(`Inserting ${rows.length} hairstyles...`);
  const { data: inserted, error: insertError } = await supabase
    .from('hairstyles')
    .insert(rows)
    .select('id, name');

  if (insertError) {
    console.error('Error inserting hairstyles:', insertError.message);
    return;
  }

  console.log(`✅ Inserted ${inserted.length} hairstyles successfully!`);
  inserted.forEach(h => console.log(`  • ${h.name}`));

  // 3. Re-link the existing test stylists to the new hairstyles
  console.log('\nFetching existing test stylists to re-link...');
  const { data: stylists } = await supabase.from('stylist_profiles').select('id');

  if (!stylists || stylists.length === 0) {
    console.log('No test stylists found to re-link. Run seed_glamgo.js first to create them.');
    return;
  }

  const links = [];
  inserted.forEach((hairstyle, i) => {
    // Rotate through the available stylists and assign each style to at least 1
    const stylist = stylists[i % stylists.length];
    links.push({ stylist_id: stylist.id, hairstyle_id: hairstyle.id });
  });

  const { error: linkError } = await supabase.from('stylist_styles').insert(links);
  if (linkError) {
    console.error('Error re-linking stylists:', linkError.message);
  } else {
    console.log(`✅ Linked ${links.length} hairstyle-stylist connections!`);
  }

  console.log('\n--- SEED COMPLETE ---');
  console.log('The gallery will now show your real hairstyle images!');
}

seed();
