import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getDashboardBookings, getDashboardStats } from '@/lib/actions/dashboard'
import { getStylesForStylist } from '@/lib/actions/stylists'
import { PendingBookings } from './PendingBookings'
import { UpcomingBookings } from './UpcomingBookings'
import styles from './stylist-dashboard.module.css'

export const metadata = {
  title: 'Stylist Dashboard | GlamGo',
  description: 'Manage your appointments, verify bookings, and track your earnings.',
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
        <Link href="/dashboard/stylist/services" className={styles.portfolioLink}>
          Service Curation →
        </Link>
      </section>

      {/* New booking requests — Accept / Decline */}
      <PendingBookings bookings={pendingBookings} />

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
        <UpcomingBookings bookings={upcomingBookings} stylistId={stylistId} />

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
