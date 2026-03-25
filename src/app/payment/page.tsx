import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getBookingById } from '@/lib/actions/bookings'
import { PaymentSummary } from '@/components/booking/PaymentSummary'

interface PaymentPageProps {
  searchParams: Promise<{ bookingId?: string }>
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const { bookingId } = await searchParams

  if (!bookingId) redirect('/dashboard')

  // Auth guard
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // Fetch & validate booking
  const booking = await getBookingById(bookingId)
  if (!booking) redirect('/dashboard')

  // Ownership check
  const bookingRecord = booking as Record<string, unknown>
  if (bookingRecord.client_id && bookingRecord.client_id !== user.id) {
    redirect('/dashboard')
  }

  // Already paid → skip to confirmation
  if (booking.payment_status === 'paid') {
    redirect(`/booking/confirm/${bookingId}`)
  }

  // Safely extract nested Supabase join fields
  const hairstyles = booking.hairstyles as unknown as Record<string, unknown> | null
  const stylistProfiles = booking.stylist_profiles as unknown as Record<string, unknown> | null
  const styleName = (hairstyles?.name as string) ?? 'Unknown Style'
  const stylistUsers = stylistProfiles?.users as unknown as Record<string, unknown> | null
  const stylistName = (stylistUsers?.full_name as string) ?? 'Unknown Stylist'

  return (
    <main style={{ padding: '120px 20px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <PaymentSummary
        bookingId={booking.id}
        styleName={styleName}
        stylistName={stylistName}
        appointmentDate={booking.appointment_date}
        timeSlot={booking.time_slot}
        amount={booking.amount}
      />
    </main>
  )
}
