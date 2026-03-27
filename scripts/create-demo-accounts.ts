import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

// Create Supabase admin client
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

const accounts = [
  { email: 'stylist.adaeze@glamgo.ng', password: 'GlamGo2026!', user_metadata: { name: 'Adaeze Okonkwo' } },
  { email: 'stylist.chioma@glamgo.ng', password: 'GlamGo2026!', user_metadata: { name: 'Chioma Eze' } },
  { email: 'demo.client@glamgo.ng', password: 'GlamGo2026!', user_metadata: { name: 'Amina Bello' } }
]

async function run() {
  console.log('--- Creating Demo Accounts in Supabase Auth ---\\n')
  for (const acc of accounts) {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: acc.email,
      password: acc.password,
      email_confirm: true,
      user_metadata: acc.user_metadata
    })

    if (error) {
      if (error.status === 422 || error.message.includes('already exists')) {
        console.log(`[SKIPPED] ${acc.email} already exists`)
      } else {
        console.error(`[ERROR] Failed creating ${acc.email}:`, error.message)
      }
    } else {
      console.log(`[CREATED] ${acc.email} (ID: ${data.user.id})`)
    }
  }
  console.log('\\n--- Demo Accounts verified ---')
}

run()
