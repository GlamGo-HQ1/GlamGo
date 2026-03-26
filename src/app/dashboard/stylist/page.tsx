import { redirect } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { getDashboardBookings, getDashboardStats } from '@/lib/actions/dashboard'
import { getStylesForStylist } from '@/lib/actions/stylists'
import { BookingCodeInput } from './BookingCodeInput'
import { PendingBookings } from './PendingBookings'
import styles from './stylist-dashboard.module.css'

export const metadata = {
  title: 'Stylist Dashboard | GlamGo',
  description: 'Manage your appointments, verify bookings, and track your earnings.',
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

export default async function StylistDashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get user info and stylist profile
  const { data: userData } = await supabase
    .from('users')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  if (userData?.role !== 'stylist') {
    redirect('/dashboard/client')
  }

  const firstName = userData?.full_name?.split(' ')[0] ?? 'Stylist'

  // Get stylist profile ID
  const { data: stylistProfile } = await supabase
    .from('stylist_profiles')
    .select('id')
    .eq('user_id', user.id)
    .single()

  const stylistId = stylistProfile?.id ?? ''

  const [pendingBookings, upcomingBookings, stats, stylistStyles] = await Promise.all([
    getDashboardBookings('stylist', stylistId, 'pending'),
    getDashboardBookings('stylist', stylistId, 'confirmed'),
    getDashboardStats('stylist', stylistId),
    stylistId ? getStylesForStylist(stylistId) : Promise.resolve([]),
  ])

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div>
          <h1 className={styles.heroTitle}>Welcome back, {firstName}</h1>
          <p className={styles.heroSub}>Your salon is curated and ready for today&apos;s excellence.</p>
        </div>
      </section>

      {/* New booking requests — Accept / Decline */}
      <PendingBookings bookings={pendingBookings} />

      {/* Booking code verification */}
      <BookingCodeInput stylistId={stylistId} />

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Revenue MTD</span>
          <p className={styles.statValueAccent}>{formatPrice(stats.totalRevenue)}</p>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Experiences Delivered</span>
          <p className={styles.statValue}>{stats.completedCount}</p>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Current Portfolio</span>
          <p className={styles.statValue}>{stylistStyles.length}</p>
        </div>
      </div>

      {/* Main grid */}
      <div className={styles.mainGrid}>
        {/* Left: Upcoming appointments */}
        <div>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Upcoming Appointments</h2>
          </div>

          {upcomingBookings.length === 0 ? (
            <div className={styles.emptyState}>
              <svg className={styles.emptyIcon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <p className={styles.emptyText}>No upcoming appointments yet</p>
              <p className={styles.emptyHint}>When clients book your services, their appointments will appear here.</p>
            </div>
          ) : (
            <div className={styles.appointmentList}>
              {upcomingBookings.map((booking, index) => (
                <div key={booking.id} className={styles.appointmentCard}>
                  <div className={styles.clientAvatar}>
                    {booking.counterpart_avatar ? (
                      <Image
                        src={booking.counterpart_avatar}
                        alt={booking.counterpart_name}
                        fill
                        sizes="56px"
                        className={styles.clientImg}
                      />
                    ) : (
                      <div className={styles.clientPlaceholder}>
                        {booking.counterpart_name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className={styles.appointmentInfo}>
                    <p className={styles.clientName}>{booking.counterpart_name}</p>
                    <p className={styles.appointmentStyle}>{booking.style_name}</p>
                    <div className={styles.appointmentMeta}>
                      <span>{formatDate(booking.appointment_date)}</span>
                      <span>{formatTimeSlot(booking.time_slot)}</span>
                    </div>
                  </div>
                  {index === 0 ? (
                    <button className={styles.startBtn}>Start Service</button>
                  ) : (
                    <button className={styles.upcomingBtn}>Upcoming</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Services */}
        <div>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Services</h2>
          </div>

          {stylistStyles.length === 0 ? (
            <div className={styles.emptyState}>
              <svg className={styles.emptyIcon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
              </svg>
              <p className={styles.emptyText}>No services listed yet</p>
              <p className={styles.emptyHint}>Your hairstyle services and pricing will be displayed here once configured.</p>
            </div>
          ) : (
            <div className={styles.servicesList}>
              {stylistStyles.map((style) => (
                <div key={style.id} className={styles.serviceItem}>
                  <div className={styles.serviceLeft}>
                    <div>
                      <p className={styles.serviceName}>{style.hairstyle_name}</p>
                      <p className={styles.servicePrice}>
                        {formatPrice(style.stylist_price ?? style.hairstyle_price_min ?? 0)}
                      </p>
                    </div>
                  </div>
                  <button className={styles.editBtn}>Edit</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
