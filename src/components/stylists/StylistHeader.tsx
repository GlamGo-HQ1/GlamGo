import Image from 'next/image'
import type { StylistWithUser } from '@/lib/actions/stylists'
import styles from './StylistHeader.module.css'

interface StylistHeaderProps {
  stylist: StylistWithUser
}

function formatServiceMode(mode: string): string {
  if (mode === 'both') return 'Salon & Mobile'
  if (mode === 'mobile') return 'Comes to you'
  return 'Salon-based'
}

function getStylistTier(rating: number, reviews: number): { label: string; className: string } {
  if (rating >= 4.5 && reviews >= 30) return { label: 'Elite', className: styles.tierElite }
  if (rating >= 4.0 && reviews >= 10) return { label: 'Pro', className: styles.tierPro }
  return { label: 'Rising', className: styles.tierRising }
}

export function StylistHeader({ stylist }: StylistHeaderProps) {
  const tier = getStylistTier(stylist.average_rating, stylist.total_reviews)

  return (
    <header className={styles.header}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatarRing}>
          {stylist.avatar_url ? (
            <Image
              src={stylist.avatar_url}
              alt={stylist.full_name}
              fill
              sizes="256px"
              className={styles.avatarImage}
              priority
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              {stylist.full_name.charAt(0)}
            </div>
          )}
        </div>
        {/* Tier badge — overlaid on avatar, matching design spec */}
        <div className={`${styles.tierBadge} ${tier.className}`}>
          {tier.label}
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.nameRow}>
          <h1 className={styles.name}>{stylist.full_name}</h1>
          <div className={styles.ratingBadge}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent-primary)" stroke="var(--accent-primary)" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className={styles.ratingNum}>{stylist.average_rating.toFixed(1)}</span>
            <span className={styles.reviewCount}>({stylist.total_reviews} Reviews)</span>
          </div>
        </div>

        {stylist.bio && (
          <p className={styles.bio}>{stylist.bio}</p>
        )}

        {stylist.specialties && stylist.specialties.length > 0 && (
          <div className={styles.specialties}>
            {stylist.specialties.map((spec) => (
              <span key={spec} className={styles.specialtyTag}>{spec}</span>
            ))}
          </div>
        )}

        <div className={styles.serviceMode}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>{formatServiceMode(stylist.service_mode)}</span>
        </div>
      </div>
    </header>
  )
}
