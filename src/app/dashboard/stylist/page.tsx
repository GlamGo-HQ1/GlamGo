import { redirect } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { getDashboardBookings, getDashboardStats } from '@/lib/actions/dashboard'
import { getStylesForStylist } from '@/lib/actions/stylists'
import { BookingCodeInput } from './BookingCodeInput'
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

  const [upcomingBookings, stats, stylistStyles] = await Promise.all([
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
              No upcoming appointments
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
              No services listed yet
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
