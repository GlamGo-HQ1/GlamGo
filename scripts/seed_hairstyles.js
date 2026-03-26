// scripts/seed_hairstyles.js
// Run via: node scripts/seed_hairstyles.js
// Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local

const { createClient } = require('@supabase/supabase-js')
const { config } = require('dotenv')
const path = require('path')

// Load environment variables from .env.local
config({ path: path.resolve(__dirname, '..', '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// ─────────────────────────────────────────────
// Full curated hairstyle catalog (21 styles)
// Curator: Oyewole Oluwabukola Oghenerukevwe
// Enum values match DB: braids, weaves, twists, locs
// ─────────────────────────────────────────────
const hairstyles = [
  // ── BRAIDS (6) ──
  {
    name: 'Knotless Braids',
    category: 'braids',
    description: 'Lightweight knotless braids with natural movement. Pain-free and protective.',
    images: [],
    price_min: 25000,
    price_max: 45000,
    duration_hrs: 4.5,
    is_trending: true,
  },
  {
    name: 'Lemonade Braids',
    category: 'braids',
    description: 'Side-swept cornrows inspired by Beyoncé. Bold and statement-making.',
    images: [],
    price_min: 20000,
    price_max: 35000,
    duration_hrs: 3.5,
    is_trending: false,
  },
  {
    name: 'Fulani Braids',
    category: 'braids',
    description: 'Traditional tribal braids with unique parting and beads.',
    images: [],
    price_min: 20000,
    price_max: 40000,
    duration_hrs: 4.0,
    is_trending: false,
  },
  {
    name: 'Doll Braids',
    category: 'braids',
    description: 'Distinctive parted braids with curled ends.',
    images: [],
    price_min: 18000,
    price_max: 35000,
    duration_hrs: 3.5,
    is_trending: false,
  },
  {
    name: 'Layered Doll Braids',
    category: 'braids',
    description: 'Multi-length doll braids for voluminous styling.',
    images: [],
    price_min: 22000,
    price_max: 40000,
    duration_hrs: 4.0,
    is_trending: true,
  },
  {
    name: 'Tyla Braids',
    category: 'braids',
    description: 'Signature braided style inspired by Tyla. Trendy and modern.',
    images: [],
    price_min: 25000,
    price_max: 45000,
    duration_hrs: 4.5,
    is_trending: true,
  },

  // ── WEAVES (9) ── (DB enum: 'weaves', NOT 'weaving')
  {
    name: 'Patewo',
    category: 'weaves',
    description: 'Traditional Nigerian interlaced cornrow style.',
    images: [],
    price_min: 10000,
    price_max: 20000,
    duration_hrs: 2.0,
    is_trending: false,
  },
  {
    name: 'Bald Braids',
    category: 'weaves',
    description: 'Sleek, tight-to-scalp braided patterns.',
    images: [],
    price_min: 12000,
    price_max: 25000,
    duration_hrs: 2.5,
    is_trending: false,
  },
  {
    name: 'Classic Shukwu',
    category: 'weaves',
    description: 'Traditional gathered updo style.',
    images: [],
    price_min: 8000,
    price_max: 15000,
    duration_hrs: 1.5,
    is_trending: false,
  },
  {
    name: 'Shukwu with Base',
    category: 'weaves',
    description: 'Elevated updo with a structured base for added height.',
    images: [],
    price_min: 10000,
    price_max: 20000,
    duration_hrs: 2.0,
    is_trending: false,
  },
  {
    name: 'Celyn Braids',
    category: 'weaves',
    description: 'Intricate custom braided design.',
    images: [],
    price_min: 15000,
    price_max: 30000,
    duration_hrs: 3.0,
    is_trending: false,
  },
  {
    name: 'Zig Zag Braids',
    category: 'weaves',
    description: 'Cornrows featuring sharp zig-zag parts.',
    images: [],
    price_min: 15000,
    price_max: 28000,
    duration_hrs: 3.0,
    is_trending: false,
  },
  {
    name: 'Stitch Braids',
    category: 'weaves',
    description: 'Precision-parted horizontal line cornrows.',
    images: [],
    price_min: 15000,
    price_max: 30000,
    duration_hrs: 2.5,
    is_trending: true,
  },
  {
    name: 'Alicia Keys with Beads',
    category: 'weaves',
    description: 'Signature straight-back pattern with beaded ends.',
    images: [],
    price_min: 12000,
    price_max: 25000,
    duration_hrs: 2.5,
    is_trending: false,
  },
  {
    name: 'Alicia Keys without Beads',
    category: 'weaves',
    description: 'Classic straight-back pattern, clean ends.',
    images: [],
    price_min: 10000,
    price_max: 22000,
    duration_hrs: 2.0,
    is_trending: false,
  },

  // ── TWISTS (6) ──
  {
    name: 'Passion Twist',
    category: 'twists',
    description: 'Silky, curly texture two-strand twists.',
    images: [],
    price_min: 25000,
    price_max: 40000,
    duration_hrs: 4.0,
    is_trending: true,
  },
  {
    name: 'Micro Passion Twist',
    category: 'twists',
    description: 'Fine, detailed passion twists for a fuller look.',
    images: [],
    price_min: 30000,
    price_max: 50000,
    duration_hrs: 5.5,
    is_trending: false,
  },
  {
    name: 'Twist with Braiding Extension',
    category: 'twists',
    description: 'Durable twists reinforced with extensions for longevity.',
    images: [],
    price_min: 20000,
    price_max: 35000,
    duration_hrs: 3.5,
    is_trending: false,
  },
  {
    name: 'Jumbo Marley Twist',
    category: 'twists',
    description: 'Thick, textured traditional two-strand twists.',
    images: [],
    price_min: 18000,
    price_max: 30000,
    duration_hrs: 3.0,
    is_trending: false,
  },
  {
    name: 'Kinky Twist',
    category: 'twists',
    description: 'Short to medium natural-looking textured twists.',
    images: [],
    price_min: 20000,
    price_max: 35000,
    duration_hrs: 3.5,
    is_trending: false,
  },
  {
    name: 'Twist with Bantu Knots',
    category: 'twists',
    description: 'Creative half-twist, half-knotted styling.',
    images: [],
    price_min: 15000,
    price_max: 28000,
    duration_hrs: 3.0,
    is_trending: true,
  },

  // ── LOCS (3) ──
  {
    name: 'Soft Locs',
    category: 'locs',
    description: 'Lightweight, flexible faux locs for everyday wear.',
    images: [],
    price_min: 25000,
    price_max: 45000,
    duration_hrs: 5.0,
    is_trending: true,
  },
  {
    name: 'Boho Locs',
    category: 'locs',
    description: 'Distressed locs with curly stray pieces. Bohemian and free-spirited.',
    images: [],
    price_min: 30000,
    price_max: 55000,
    duration_hrs: 6.0,
    is_trending: true,
  },
  {
    name: 'Butterfly Locs',
    category: 'locs',
    description: 'Textured, looped faux locs with a distinctive wrapped finish.',
    images: [],
    price_min: 28000,
    price_max: 50000,
    duration_hrs: 5.5,
    is_trending: true,
  },
]

async function seedHairstyles() {
  console.log('🌱 Starting hairstyle catalog seed...\n')
  console.log(`   Target: ${supabaseUrl}`)
  console.log(`   Styles: ${hairstyles.length}\n`)

  // Clear existing hairstyles (cascade will clear stylist_styles too)
  console.log('🗑️  Clearing existing hairstyles...')
  const { error: deleteError } = await supabase
    .from('hairstyles')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // delete all rows

  if (deleteError) {
    console.error('❌ Failed to clear existing hairstyles:', deleteError.message)
    process.exit(1)
  }

  // Insert all styles
  let successCount = 0
  for (const style of hairstyles) {
    const { error } = await supabase.from('hairstyles').insert(style)
    if (error) {
      console.error(`   ❌ ${style.name}: ${error.message}`)
    } else {
      console.log(`   ✅ ${style.name}`)
      successCount++
    }
  }

  console.log(`\n🎉 Seed complete! ${successCount}/${hairstyles.length} styles inserted.`)

  if (successCount < hairstyles.length) {
    console.log('⚠️  Some styles failed — check errors above.')
    process.exit(1)
  }
}

seedHairstyles()
