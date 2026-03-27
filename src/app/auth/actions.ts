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
  const phone = formData.get('phone') as string

  const adminAuthClient = createAdminClient()

  // 1. Create user via Admin API to bypass email confirmation
  const { data: authData, error: authError } = await adminAuthClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (authError || !authData.user) {
    // If user already exists, authError might trigger. Return standard error.
    return { error: authError?.message || 'Failed to create account.' }
  }

  const userId = authData.user.id

  // 2. Insert into public 'users' table
  await adminAuthClient.from('users').insert({
    id: userId,
    email: email,
    full_name: fullName,
    phone: phone || null,
    role: role
  })

  // 3. Insert into 'stylist_profiles' if role is stylist
  if (role === 'stylist') {
    await adminAuthClient.from('stylist_profiles').insert({
      user_id: userId,
      bio: 'New stylist on GlamGo. Please complete your profile.',
      service_mode: 'salon',
      is_available: true,
      wallet_balance: 0
    })
  }

  // 4. Actually log the user into the browser session now that they exist
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    return { error: 'Account created, but automatic login failed: ' + signInError.message }
  }

  // 5. Redirect based on role
  revalidatePath('/', 'layout')
  const destination = role === 'stylist' ? '/dashboard/stylist' : '/dashboard/client'
  redirect(destination)
}

export async function logout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}
