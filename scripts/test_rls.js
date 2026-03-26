require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase
    .from('stylist_styles')
    .select(`
      stylist_price,
      stylist_profiles!inner (
        id,
        user_id,
        bio,
        users!inner (
          full_name,
          city
        )
      )
    `)
    .limit(1);
    
  console.log('With users join:', data, error);
  
  const { data: data2 } = await supabase
    .from('stylist_styles')
    .select(`
      stylist_price,
      stylist_profiles!inner (
        id,
        user_id,
        bio
      )
    `)
    .limit(1);
    
  console.log('Without users join:', data2);
}
test();
