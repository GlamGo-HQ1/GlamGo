import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Dashboard | GlamGo',
}

/**
 * /dashboard route — redirects to the correct dashboard based on user role.
 * If not authenticated, redirects to login.
 */
export default async function DashboardRedirect() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user role
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = userData?.role ?? 'client'

  if (role === 'stylist') {
    redirect('/dashboard/stylist')
  } else {
    redirect('/dashboard/client')
  }
}
