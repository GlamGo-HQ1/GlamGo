import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateTransactionReference, getInterswitchToken } from '@/lib/interswitch'

export async function POST(req: Request) {
  try {
    const { bookingId } = await req.json()
    if (!bookingId) {
      return NextResponse.json({ error: 'bookingId is required' }, { status: 400 })
    }

    const supabase = createClient()

    // 1. Verify user is logged in
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Fetch booking with client info via the auth user's profile
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .select('id, amount, client_id, payment_status')
      .eq('id', bookingId)
      .single()

    if (dbError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    // 3. Authorization: only the booking owner can pay
    if (booking.client_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // 4. Idempotency: reject if already paid
    if (booking.payment_status === 'paid') {
      return NextResponse.json({ error: 'Already paid' }, { status: 400 })
    }

    // 5. Validate our Interswitch credentials work (pre-flight)
    await getInterswitchToken()

    // 6. Generate a unique transaction reference
    const transactionRef = generateTransactionReference()

    // 7. Persist the txn ref so we can match webhooks later
    await supabase
      .from('bookings')
      .update({ notes: transactionRef })
      .eq('id', bookingId)

    // 8. Get customer info for the checkout form
    const { data: profile } = await supabase
      .from('users')
      .select('full_name, email')
      .eq('id', user.id)
      .single()

    return NextResponse.json({
      success: true,
      transactionRef,
      bookingId: booking.id,
      amountKobo: Math.round(booking.amount * 100),
      customerEmail: profile?.email || user.email,
      customerName: profile?.full_name || 'GlamGo Client',
    })

  } catch (error) {
    console.error('[Payment Initiate] Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
