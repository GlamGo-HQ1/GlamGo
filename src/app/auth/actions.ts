'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function login(formData: FormData) {
  const supabase = createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function register(formData: FormData) {
  const supabase = createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as 'client' | 'stylist' || 'client'
  const fullName = formData.get('full_name') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  if (data.user) {
    // Manually push to public tables bypassing RLS using the admin client
    const adminAuthClient = createAdminClient()
    
    await adminAuthClient.from('users').insert({
      id: data.user.id,
      email: data.user.email,
      full_name: fullName,
      role: role
    })

    if (role === 'stylist') {
      await adminAuthClient.from('stylist_profiles').insert({
        user_id: data.user.id,
        bio: 'New stylist on GlamGo. Please complete your profile.',
        service_mode: 'salon',
        is_available: false,
        wallet_balance: 0
      })
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
