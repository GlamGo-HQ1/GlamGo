'use server'

import { createClient } from '@/lib/supabase/server'

export interface DashboardBooking {
  id: string
  appointment_date: string
  time_slot: string
  client_address: string | null
  status: string
  payment_status: string
  amount: number
  confirmation_code: string
  created_at: string
  style_name: string
  style_image: string | null
  counterpart_name: string
  counterpart_avatar: string | null
}

export interface DashboardStats {
  totalBookings: number
  upcomingCount: number
  completedCount: number
  totalRevenue: number
}

/**
 * Fetch bookings for the current user's dashboard.
 * Automatically determines if the user is a client or stylist.
 */
export async function getDashboardBookings(
  role: 'client' | 'stylist',
  userId: string,
  status?: string
): Promise<DashboardBooking[]> {
  const supabase = createClient()

  const filterColumn = role === 'client' ? 'client_id' : 'stylist_id'

  let query = supabase
    .from('bookings')
    .select(`
      id,
      appointment_date,
      time_slot,
      client_address,
      status,
      payment_status,
      amount,
      confirmation_code,
      created_at,
      hairstyles!inner ( name, images ),
      stylist_profiles!inner (
        users!inner ( full_name, avatar_url )
      ),
      users!bookings_client_id_fkey ( full_name, avatar_url )
    `)
    .eq(filterColumn, userId)
    .order('appointment_date', { ascending: true })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching dashboard bookings:', error)
    return []
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((row: any) => {
    const style = row.hairstyles
    const stylistUser = row.stylist_profiles?.users
    const clientUser = row.users

    return {
      id: row.id,
      appointment_date: row.appointment_date,
      time_slot: row.time_slot,
      client_address: row.client_address,
      status: row.status,
      payment_status: row.payment_status,
      amount: row.amount,
      confirmation_code: row.confirmation_code,
      created_at: row.created_at,
      style_name: style?.name ?? 'Unknown Style',
      style_image: style?.images?.[0] ?? null,
      // For client: show stylist name. For stylist: show client name.
      counterpart_name: role === 'client'
        ? (stylistUser?.full_name ?? 'Unknown Stylist')
        : (clientUser?.full_name ?? 'Unknown Client'),
      counterpart_avatar: role === 'client'
        ? (stylistUser?.avatar_url ?? null)
        : (clientUser?.avatar_url ?? null),
    }
  })
}

/**
 * Get dashboard stats for a user.
 */
export async function getDashboardStats(
  role: 'client' | 'stylist',
  userId: string
): Promise<DashboardStats> {
  const supabase = createClient()
  const filterColumn = role === 'client' ? 'client_id' : 'stylist_id'

  const { data, error } = await supabase
    .from('bookings')
    .select('id, status, amount')
    .eq(filterColumn, userId)

  if (error || !data) {
    return { totalBookings: 0, upcomingCount: 0, completedCount: 0, totalRevenue: 0 }
  }

  return {
    totalBookings: data.length,
    upcomingCount: data.filter(b => b.status === 'pending' || b.status === 'confirmed').length,
    completedCount: data.filter(b => b.status === 'completed').length,
    totalRevenue: data
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + (b.amount ?? 0), 0),
  }
}

/**
 * Verify a booking code (stylist side).
 * Marks the booking as completed and payment as paid.
 */
export async function verifyBookingCode(
  code: string,
  stylistId: string
): Promise<{ success: boolean; error?: string; bookingId?: string }> {
  const supabase = createClient()

  // Find booking with this code assigned to this stylist
  const { data: booking, error: findError } = await supabase
    .from('bookings')
    .select('id, status')
    .eq('confirmation_code', code)
    .eq('stylist_id', stylistId)
    .eq('status', 'confirmed')
    .single()

  if (findError || !booking) {
    return { success: false, error: 'Invalid code or booking not found' }
  }

  // Transition to in_progress — client must confirm "Service Rendered" to complete & release escrow
  const { error: updateError } = await supabase
    .from('bookings')
    .update({ status: 'in_progress' })
    .eq('id', booking.id)

  if (updateError) {
    return { success: false, error: 'Failed to verify booking' }
  }

  return { success: true, bookingId: booking.id }
}
