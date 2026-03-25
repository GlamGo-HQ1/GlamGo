import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

/**
 * PATCH /api/bookings/[id]/complete
 * Client marks "Service Rendered" → booking completed → funds released to stylist wallet
 *
 * Uses admin client for wallet_balance update (needs to update stylist_profiles, different row owner).
 */
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Verify client owns this booking
  const { data: booking, error: fetchError } = await supabase
    .from('bookings')
    .select('id, client_id, stylist_id, amount, status')
    .eq('id', params.id)
    .eq('client_id', user.id)
    .eq('status', 'in_progress')
    .single()

  if (fetchError || !booking) {
    return NextResponse.json({ error: 'Booking not found or not in progress' }, { status: 404 })
  }

  // Step 1: Mark booking as completed
  const { error: completeError } = await supabase
    .from('bookings')
    .update({ status: 'completed' })
    .eq('id', params.id)

  if (completeError) {
    console.error('[Complete Booking] Failed to update booking:', completeError)
    return NextResponse.json({ error: 'Failed to complete booking' }, { status: 500 })
  }

  // Step 2: Release funds to stylist wallet (admin client needed — different row owner)
  const admin = createAdminClient()
  const { data: stylistProfile, error: profileError } = await admin
    .from('stylist_profiles')
    .select('id, wallet_balance')
    .eq('id', booking.stylist_id)
    .single()

  if (!profileError && stylistProfile) {
    const newBalance = (stylistProfile.wallet_balance ?? 0) + booking.amount
    await admin
      .from('stylist_profiles')
      .update({ wallet_balance: newBalance })
      .eq('id', booking.stylist_id)
  }

  return NextResponse.json({ success: true, bookingId: params.id })
}
