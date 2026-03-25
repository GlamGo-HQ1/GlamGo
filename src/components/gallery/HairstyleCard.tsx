import Image from 'next/image'
import Link from 'next/link'
import type { Hairstyle } from '@/lib/actions/hairstyles'
import styles from './HairstyleCard.module.css'

interface HairstyleCardProps {
  hairstyle: Hairstyle
}

function formatPrice(min: number | null, max: number | null): string {
  const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  if (min && max) {
    return `${formatter.format(min)} - ${formatter.format(max)}`
  }
  if (min) return `From ${formatter.format(min)}`
  if (max) return `Up to ${formatter.format(max)}`
  return 'Price on request'
}

function formatDuration(hrs: number | null): string {
  if (!hrs) return ''
  if (hrs < 1) return `~${Math.round(hrs * 60)} mins`
  return `~${hrs} hrs`
}

export function HairstyleCard({ hairstyle }: HairstyleCardProps) {
  const imageUrl = hairstyle.images?.[0] ?? '/placeholder-style.jpg'

  return (
    <Link href={`/styles/${hairstyle.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt={hairstyle.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
        />
        {hairstyle.is_trending && (
          <span className={styles.trendingBadge}>Trending</span>
        )}
      </div>
      <div className={styles.overlay}>
        <h3 className={styles.name}>{hairstyle.name}</h3>
        <div className={styles.meta}>
          <span className={styles.price}>
            {formatPrice(hairstyle.price_min, hairstyle.price_max)}
          </span>
          {hairstyle.duration_hrs && (
            <div className={styles.duration}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {formatDuration(hairstyle.duration_hrs)}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
