import type { Hairstyle } from '@/lib/actions/hairstyles'
import styles from './StyleInfo.module.css'

interface StyleInfoProps {
  hairstyle: Hairstyle
}

function formatPrice(min: number | null, max: number | null): string {
  const fmt = (v: number) => new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(v)

  if (min && max) return `${fmt(min)} — ${fmt(max)}`
  if (min) return `From ${fmt(min)}`
  if (max) return `Up to ${fmt(max)}`
  return 'Price on request'
}

function formatDuration(hrs: number | null): string {
  if (!hrs) return 'Duration varies'
  if (hrs < 1) return `~${Math.round(hrs * 60)} Minutes`
  return `~${hrs} Hours`
}

export function StyleInfo({ hairstyle }: StyleInfoProps) {
  return (
    <section className={styles.section}>
      <div className={styles.tags}>
        <span className={styles.categoryTag}>{hairstyle.category}</span>
      </div>

      <h1 className={styles.title}>{hairstyle.name}</h1>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Price Range</span>
          <span className={styles.metricValue}>
            {formatPrice(hairstyle.price_min, hairstyle.price_max)}
          </span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Duration</span>
          <span className={styles.metricValue}>
            {formatDuration(hairstyle.duration_hrs)}
          </span>
        </div>
      </div>

      {hairstyle.description && (
        <p className={styles.description}>{hairstyle.description}</p>
      )}
    </section>
  )
}
