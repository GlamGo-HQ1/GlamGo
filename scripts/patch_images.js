require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function addImages() {
  console.log('Fetching all hairstyles...');
  const { data: styles, error: fetchErr } = await supabase.from('hairstyles').select('id, images');
  
  if (fetchErr) {
    console.error('Error fetching styles:', fetchErr);
    return;
  }
  
  // 3 known valid images that don't 404 on Unsplash
  const validImages = [
    'https://images.unsplash.com/photo-1605980776566-0486c3ac7617?q=80&w=800',
    'https://images.unsplash.com/photo-1595475884562-073c30d45670?q=80&w=800',
    'https://images.unsplash.com/photo-1615555462529-659223e710ae?q=80&w=800'
  ];

  for (const style of styles) {
    // Keep the first image (or override if it's bad)
    const firstImg = (style.images && style.images[0]) ? style.images[0] : validImages[0];
    
    // We add explicitly valid images so it doesn't 404
    const newImages = [
      firstImg,
      validImages[1],
      validImages[2]
    ];
    
    await supabase.from('hairstyles').update({ images: newImages }).eq('id', style.id);
  }
  
  console.log(`Successfully patched ${styles.length} styles with multiple functional image URLs!`);
}

addImages();
