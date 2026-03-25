import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * PATCH /api/bookings/[id]/accept
 * Stylist accepts a pending booking → status becomes 'confirmed'
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

  // Verify the booking belongs to this stylist
  const { data: stylistProfile } = await supabase
    .from('stylist_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!stylistProfile) {
    return NextResponse.json({ error: 'Not a stylist account' }, { status: 403 })
  }

  const { error } = await supabase
    .from('bookings')
    .update({ status: 'confirmed' })
    .eq('id', params.id)
    .eq('stylist_id', stylistProfile.id)
    .eq('status', 'pending')

  if (error) {
    console.error('[Accept Booking] DB error:', error)
    return NextResponse.json({ error: 'Failed to accept booking' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
