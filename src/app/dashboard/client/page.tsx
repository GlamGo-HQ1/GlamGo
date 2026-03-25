import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getDashboardBookings } from '@/lib/actions/dashboard'
import { ServiceRenderedButton } from './ServiceRenderedButton'
import styles from './client-dashboard.module.css'

export const metadata = {
  title: 'My Bookings | GlamGo',
  description: 'View your upcoming and past appointments on GlamGo.',
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-NG', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatTimeSlot(slot: string): string {
  const map: Record<string, string> = {
    morning: '10:00 AM',
    afternoon: '2:00 PM',
    evening: '5:00 PM',
  }
  return map[slot] ?? slot
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount)
}

export default async function ClientDashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user name
  const { data: userData } = await supabase
    .from('users')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  if (userData?.role === 'stylist') {
    redirect('/dashboard/stylist')
  }

  const firstName = userData?.full_name?.split(' ')[0] ?? 'there'

  const [upcomingBookings, inProgressBookings, pastBookings] = await Promise.all([
    getDashboardBookings('client', user.id, 'confirmed'),
    getDashboardBookings('client', user.id, 'in_progress'),
    getDashboardBookings('client', user.id, 'completed'),
  ])

  const featuredBooking = inProgressBookings[0] ?? upcomingBookings[0]

  return (
    <div className={styles.page}>
      <div className={styles.greeting}>
        <h1 className={styles.greetingName}>My Bookings</h1>
        <p className={styles.greetingSub}>Welcome back, {firstName}</p>
      </div>

      {featuredBooking ? (
        <div className={styles.mainGrid}>
          {/* Featured upcoming booking */}
          <div className={styles.featuredCard}>
            <div className={styles.featuredImage}>
              {featuredBooking.style_image && (
                <Image
                  src={featuredBooking.style_image}
                  alt={featuredBooking.style_name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.featuredImg}
                />
              )}
              <div className={styles.featuredGradient} />
              <span className={`${styles.statusBadge} ${styles.statusConfirmed}`}>
                Confirmed
              </span>
            </div>
            <div className={styles.featuredContent}>
              <div>
                <div className={styles.featuredMeta}>
                  <div>
                    <p className={styles.featuredDate}>
                      {formatDate(featuredBooking.appointment_date)} &bull; {formatTimeSlot(featuredBooking.time_slot)}
                    </p>
                    <h2 className={styles.featuredTitle}>{featuredBooking.style_name}</h2>
                  </div>
                  <div className={styles.codeBox}>
                    <p className={styles.codeLabel}>Check-in Code</p>
                    <p className={styles.codeValue}>{featuredBooking.confirmation_code}</p>
                  </div>
                </div>

                <div className={styles.stylistRow}>
                  {featuredBooking.counterpart_avatar && (
                    <div className={styles.stylistAvatar}>
                      <Image
                        src={featuredBooking.counterpart_avatar}
                        alt={featuredBooking.counterpart_name}
                        fill
                        sizes="48px"
                        className={styles.stylistAvi}
                      />
                    </div>
                  )}
                  <div>
                    <p className={styles.stylistLabel}>Lead Stylist</p>
                    <p className={styles.stylistName}>{featuredBooking.counterpart_name}</p>
                  </div>
                </div>
              </div>

              <div className={styles.actionRow}>
                {featuredBooking.status === 'in_progress' ? (
                  <ServiceRenderedButton bookingId={featuredBooking.id} />
                ) : (
                  <button className={styles.rescheduleBtn}>Reschedule</button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.detailsCard}>
              <h3 className={styles.detailsHeading}>Booking Details</h3>
              <div className={styles.detailsList}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Total Price</span>
                  <span className={styles.detailValueAccent}>
                    {formatPrice(featuredBooking.amount)}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Status</span>
                  <span className={styles.detailValue}>{featuredBooking.status}</span>
                </div>
                {featuredBooking.client_address && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Location</span>
                    <span className={styles.detailValue}>{featuredBooking.client_address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyText}>No upcoming bookings</p>
          <p className={styles.emptySubtext}>
            <Link href="/gallery" style={{ color: 'var(--accent-primary)' }}>
              Browse the gallery
            </Link>{' '}
            to discover your next look
          </p>
        </div>
      )}

      {/* Past bookings */}
      {pastBookings.length > 0 && (
        <div className={styles.pastSection}>
          <h3 className={styles.pastHeading}>Recent Masterpieces</h3>
          <div className={styles.pastGrid}>
            {pastBookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className={styles.pastCard}>
                <div className={styles.pastImage}>
                  {booking.style_image && (
                    <Image
                      src={booking.style_image}
                      alt={booking.style_name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={styles.pastImg}
                    />
                  )}
                  <span className={styles.completedBadge}>Completed</span>
                </div>
                <div className={styles.pastContent}>
                  <h4 className={styles.pastTitle}>{booking.style_name}</h4>
                  <div className={styles.pastFooter}>
                    <span className={styles.pastDate}>{formatDate(booking.appointment_date)}</span>
                    <span className={styles.rebookLink}>Rebook</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
