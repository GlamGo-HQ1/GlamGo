import Image from 'next/image'
import Link from 'next/link'
import type { StylistForStyle } from '@/lib/actions/stylists'
import styles from './StylistCard.module.css'

interface StylistCardProps {
  stylist: StylistForStyle
  styleId?: string
}

function formatServiceMode(mode: string): string[] {
  if (mode === 'both') return ['Salon', 'Mobile']
  return [mode.charAt(0).toUpperCase() + mode.slice(1)]
}

function formatPrice(price: number | null): string {
  if (!price) return 'Price on request'
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price)
}

export function StylistCard({ stylist, styleId }: StylistCardProps) {
  // Always navigate to the stylist's public profile so clients can view
  // portfolio, reviews, and services before deciding to book.
  // Add styleId to query params if this card is rendered in the context of a specific style
  const href = styleId 
    ? `/stylists/${stylist.id}?styleId=${styleId}`
    : `/stylists/${stylist.id}`

  const modes = formatServiceMode(stylist.service_mode)

  return (
    <Link href={href} className={styles.card}>
      <div className={styles.left}>
        <div className={styles.avatarWrapper}>
          {stylist.avatar_url ? (
            <Image
              src={stylist.avatar_url}
              alt={stylist.full_name}
              fill
              sizes="64px"
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {stylist.full_name.charAt(0)}
            </div>
          )}
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{stylist.full_name}</h3>
          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill={i <= Math.round(stylist.average_rating) ? 'var(--accent-primary)' : 'none'}
                  stroke="var(--accent-primary)"
                  strokeWidth="2"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className={styles.reviewCount}>{stylist.total_reviews} Reviews</span>
          </div>
          <div className={styles.modeBadges}>
            {modes.map((mode) => (
              <span key={mode} className={styles.modeBadge}>{mode}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <p className={styles.price}>{formatPrice(stylist.stylist_price)}</p>
        <span className={styles.bookLink}>Book Session</span>
      </div>
    </Link>
  )
}
