import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { z } from 'zod'

const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(500).optional(),
})

/**
 * POST /api/reviews
 * Client submits a review for a completed booking.
 * One review per booking enforced by DB unique constraint on booking_id.
 */
export async function POST(req: Request) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = reviewSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  const { bookingId } = body as { bookingId: string }
  if (!bookingId) {
    return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 })
  }

  // Verify booking is completed and belongs to this client
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('id, client_id, stylist_id, status')
    .eq('id', bookingId)
    .eq('client_id', user.id)
    .eq('status', 'completed')
    .single()

  if (bookingError || !booking) {
    return NextResponse.json({ error: 'Booking not found or not completed' }, { status: 404 })
  }

  // Insert review (unique constraint on booking_id prevents duplicates)
  const { error: insertError } = await supabase
    .from('reviews')
    .insert({
      booking_id: bookingId,
      client_id: user.id,
      stylist_id: booking.stylist_id,
      rating: parsed.data.rating,
      comment: parsed.data.comment ?? null,
    })

  if (insertError) {
    if (insertError.code === '23505') {
      return NextResponse.json({ error: 'Review already submitted for this booking' }, { status: 409 })
    }
    console.error('[Review] Insert error:', insertError)
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }

  // Update stylist average rating
  const { data: allReviews } = await supabase
    .from('reviews')
    .select('rating')
    .eq('stylist_id', booking.stylist_id)

  if (allReviews && allReviews.length > 0) {
    const avg = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length
    await supabase
      .from('stylist_profiles')
      .update({
        average_rating: Math.round(avg * 10) / 10,
        total_reviews: allReviews.length,
      })
      .eq('id', booking.stylist_id)
  }

  return NextResponse.json({ success: true })
}
