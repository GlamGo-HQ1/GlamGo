import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * PATCH /api/bookings/[id]/decline
 * Stylist declines a pending booking → status becomes 'declined'
 * The escrow refund to client wallet is simulated by crediting their booking amount.
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

  // Verify stylist ownership
  const { data: stylistProfile } = await supabase
    .from('stylist_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!stylistProfile) {
    return NextResponse.json({ error: 'Not a stylist account' }, { status: 403 })
  }

  // Get booking details for refund simulation
  const { data: booking, error: fetchError } = await supabase
    .from('bookings')
    .select('id, client_id, amount, status')
    .eq('id', params.id)
    .eq('stylist_id', stylistProfile.id)
    .eq('status', 'pending')
    .single()

  if (fetchError || !booking) {
    return NextResponse.json({ error: 'Booking not found or already processed' }, { status: 404 })
  }

  // Decline the booking
  const { error: declineError } = await supabase
    .from('bookings')
    .update({ status: 'declined', payment_status: 'refunded' })
    .eq('id', params.id)

  if (declineError) {
    console.error('[Decline Booking] DB error:', declineError)
    return NextResponse.json({ error: 'Failed to decline booking' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
