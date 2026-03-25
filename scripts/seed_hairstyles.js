// scripts/seed_hairstyles.js
// Run via: node scripts/seed_hairstyles.js
// Note: This script requires connecting to the database. Adjust the client setup for Supabase/Prisma as needed.

const initStyles = [
  // Braids
  {
    name: 'Knotless braids',
    category: 'braids',
    description: 'Lightweight knotless braids with natural movement.',
    images: ['/images/hairstyles/braids/knotless-1.jpg', '/images/hairstyles/braids/knotless-side.jpg'],
    price_min: 25000,
    price_max: 45000,
    duration_hrs: 4.5,
    is_trending: true
  },
  {
    name: 'Lemonade braids',
    category: 'braids',
    description: 'Side-swept cornrows inspired by Beyoncé.',
    images: ['/images/hairstyles/braids/lemonade-1.jpg'],
    price_min: 20000,
    price_max: 35000,
    duration_hrs: 3.5,
    is_trending: false
  },
  // Weaving
  {
    name: 'Stitch braids',
    category: 'weaving',
    description: 'Precision-parted horizontal line cornrows.',
    images: ['/images/hairstyles/weaving/stitch-1.jpg'],
    price_min: 15000,
    price_max: 30000,
    duration_hrs: 2.5,
    is_trending: true
  },
  // Twists
  {
    name: 'Passion Twist',
    category: 'twists',
    description: 'Silky, curly texture two-strand twists.',
    images: ['/images/hairstyles/twists/passion-1.jpg'],
    price_min: 25000,
    price_max: 40000,
    duration_hrs: 4.0,
    is_trending: true
  },
  // Locs
  {
    name: 'Boho locs',
    category: 'locs',
    description: 'Distressed locs with curly stray pieces.',
    images: ['/images/hairstyles/locs/boho-1.jpg'],
    price_min: 30000,
    price_max: 55000,
    duration_hrs: 6.0,
    is_trending: true
  }
];

// Example abstract seeder logic
async function seedHairstyles() {
  console.log("Starting hairstyle catalog seed...");
  try {
    // 1. Initialize your DB client here (e.g. Supabase or Prisma)
    // const supabase = createClient(URL, KEY);
    
    // 2. Loop and Insert
    /* 
    for (const style of initStyles) {
      const { data, error } = await supabase.from('hairstyles').insert(style);
      if (error) console.error(`Error inserting ${style.name}:`, error);
      else console.log(`✓ Inserted ${style.name}`);
    }
    */
    
    console.log("Seed complete! (Note: DB connection logic needs to be uncommented and configured).");
  } catch(error) {
    console.error("Seed failed:", error);
  }
}

seedHairstyles();
