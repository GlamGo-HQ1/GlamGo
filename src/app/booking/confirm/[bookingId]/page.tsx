import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

interface ConfirmPageProps {
  params: Promise<{ bookingId: string }>
}

export default async function BookingConfirmPage({ params }: ConfirmPageProps) {
  const { bookingId } = await params
  const supabase = createClient()

  // Auth guard — only the booking owner should see the confirmation code
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: booking } = await supabase
    .from('bookings')
    .select('id, amount, confirmation_code, client_id, hairstyles(name), stylist_profiles(users(full_name))')
    .eq('id', bookingId)
    .single()

  if (!booking) redirect('/dashboard')

  // Ownership guard
  if (booking.client_id !== user.id) redirect('/dashboard')

  const hairstyles = booking.hairstyles as unknown as Record<string, unknown> | null
  const stylistProfiles = booking.stylist_profiles as unknown as Record<string, unknown> | null
  const styleName = (hairstyles?.name as string) ?? 'your style'
  const stylistUsers = stylistProfiles?.users as unknown as Record<string, unknown> | null
  const stylistName = (stylistUsers?.full_name as string) ?? 'your stylist'

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', padding: '20px' }}>
      <div style={{
        background: 'var(--surface-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '48px',
        textAlign: 'center',
        maxWidth: '500px',
        width: '100%',
      }}>
        <div style={{
          width: '64px', height: '64px', background: 'rgba(52, 211, 153, 0.1)',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', marginBottom: '16px' }}>
          Booking Confirmed!
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
          Your appointment for <strong>{styleName}</strong> with <strong>{stylistName}</strong> is all set.
        </p>

        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px',
        }}>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Your 4-Digit Confirmation Code
          </p>
          <div style={{ fontSize: '3rem', fontWeight: '700', letterSpacing: '8px', color: 'var(--accent-gold)' }}>
            {booking.confirmation_code}
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '16px' }}>
            Show this code to your stylist to authorize payment release. Do not share it beforehand.
          </p>
        </div>

        <Link
          href="/dashboard"
          style={{
            display: 'block',
            width: '100%',
            padding: '16px',
            background: 'var(--accent-gold)',
            color: 'var(--bg-dark)',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'all 0.2s',
          }}
        >
          Go to My Dashboard
        </Link>
      </div>
    </main>
  )
}
