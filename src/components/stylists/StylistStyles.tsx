import Link from 'next/link'
import type { StyleForStylist } from '@/lib/actions/stylists'
import styles from './StylistStyles.module.css'

interface StylistStylesProps {
  stylistStyles: StyleForStylist[]
  stylistId: string
}

function formatPrice(price: number | null): string {
  if (!price) return 'Price on request'
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price)
}

function formatDuration(hrs: number | null): string {
  if (!hrs) return ''
  if (hrs < 1) return `${Math.round(hrs * 60)} Minutes`
  return `${hrs} Hours`
}

export function StylistStyles({ stylistStyles, stylistId }: StylistStylesProps) {
  if (stylistStyles.length === 0) {
    return (
      <div className={styles.section}>
        <h2 className={styles.heading}>Signature Services</h2>
        <p className={styles.empty}>No services listed yet</p>
      </div>
    )
  }

  return (
    <div className={styles.section}>
      <h2 className={styles.heading}>Signature Services</h2>
      <div className={styles.list}>
        {stylistStyles.map((style) => (
          <Link
            key={style.id}
            href={`/booking/${style.hairstyle_id}/${stylistId}`}
            className={styles.row}
          >
            <div className={styles.rowInfo}>
              <h4 className={styles.styleName}>{style.hairstyle_name}</h4>
              {style.hairstyle_duration && (
                <p className={styles.duration}>
                  {formatDuration(style.hairstyle_duration)}
                </p>
              )}
            </div>
            <span className={styles.price}>
              {formatPrice(style.stylist_price ?? style.hairstyle_price_min)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
