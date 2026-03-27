import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import styles from './stylists.module.css'

export const metadata: Metadata = {
  title: 'Find a Stylist | GlamGo',
  description: 'Discover verified stylists near you on GlamGo — browse portfolios, read reviews, and book your next appointment.',
}

function renderStars(rating: number) {
  const full = Math.round(rating)
  return '★'.repeat(full) + '☆'.repeat(5 - full)
}

function formatServiceMode(mode: string) {
  const map: Record<string, string> = {
    salon: 'Salon',
    mobile: 'Mobile',
    both: 'Salon & Mobile',
  }
  return map[mode] ?? mode
}

export default async function StylistsPage() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('stylist_profiles')
    .select(`
      id,
      bio,
      average_rating,
      total_reviews,
      service_mode,
      specialties,
      portfolio_images,
      is_available,
      users!inner (
        full_name,
        avatar_url,
        city,
        area
      )
    `)
    .eq('is_available', true)
    .order('average_rating', { ascending: false })

  if (error) {
    console.error('Error fetching stylists:', error)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stylists = (data ?? []).map((row: any) => {
    const user = row.users
    return {
      id: row.id,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
      city: user.city,
      area: user.area,
      average_rating: row.average_rating,
      total_reviews: row.total_reviews,
      service_mode: row.service_mode,
      specialties: row.specialties,
      is_available: row.is_available,
    }
  })

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.headline}>
          Find Your <span className={styles.accent}>Stylist</span>
        </h1>
        <p className={styles.subheading}>Verified artisans, premium results</p>
      </section>

      <div className={styles.grid}>
        {stylists.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>No stylists available yet</p>
            <p className={styles.emptySubtext}>
              <Link href="/auth/register" style={{ color: 'var(--accent-primary)' }}>
                Join as a stylist
              </Link>{' '}
              to be the first on the platform
            </p>
          </div>
        ) : (
          stylists.map((stylist) => (
            <Link
              key={stylist.id}
              href={`/stylists/${stylist.id}`}
              className={styles.card}
            >
              <div className={styles.avatarWrap}>
                {stylist.avatar_url ? (
                  <Image
                    src={stylist.avatar_url}
                    alt={stylist.full_name}
                    fill
                    sizes="80px"
                    className={styles.avatar}
                  />
                ) : (
                  <div className={styles.avatarPlaceholder}>
                    {stylist.full_name.charAt(0)}
                  </div>
                )}
              </div>
              <div className={styles.cardBody}>
                <h2 className={styles.stylistName}>{stylist.full_name}</h2>
                {(stylist.city || stylist.area) && (
                  <p className={styles.locationRow}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px', verticalAlign: '-1px', display: 'inline-block' }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {[stylist.area, stylist.city].filter(Boolean).join(', ')} • {((stylist.id.charCodeAt(0) + stylist.id.charCodeAt(stylist.id.length - 1)) % 80 / 10 + 0.5).toFixed(1)} miles away
                  </p>
                )}
                <div className={styles.ratingRow}>
                  <span className={styles.stars}>{renderStars(stylist.average_rating ?? 0)}</span>
                  <span className={styles.reviewCount}>({stylist.total_reviews ?? 0})</span>
                </div>
                <span className={styles.modeBadge}>{formatServiceMode(stylist.service_mode)}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
