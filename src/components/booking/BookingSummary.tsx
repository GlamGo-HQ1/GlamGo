'use client'

import Image from 'next/image'
import styles from './booking.module.css'

interface BookingSummaryProps {
  style: {
    id: string
    name: string
    images: string[] | null
  }
  stylist: {
    id: string
    full_name: string
    avatar_url: string | null
    service_mode: 'salon' | 'mobile' | 'both'
  }
  price: number
}

export function BookingSummary({ style, stylist, price }: BookingSummaryProps) {
  const styleImage = style.images?.[0] || '/placeholder-style.jpg'
  const avatarUrl = stylist.avatar_url || '/placeholder-avatar.jpg'
  
  const serviceModeLabel = {
    salon: 'Salon Only',
    mobile: 'Mobile Only',
    both: 'Salon & Mobile Available'
  }[stylist.service_mode]

  return (
    <header className={styles.summaryHeader}>
      {/* Style Image */}
      <div className={styles.styleImageWrapper}>
        <Image
          src={styleImage}
          alt={style.name}
          fill
          className={styles.styleImage}
          sizes="(max-width: 768px) 100vw, 192px"
          priority
        />
      </div>

      {/* Info Section */}
      <div className={styles.summaryInfo}>
        <div className={styles.reservationDetails}>
          <span className={styles.detailsLabel}>Reservation Details</span>
          <h1 className={styles.styleName}>{style.name}</h1>
          <p className={styles.stylePrice}>₦{price.toLocaleString()}</p>
        </div>

        {/* Stylist Card */}
        <div className={styles.stylistMiniCard}>
          <div className={styles.stylistAvatarWrapper}>
            <Image
              src={avatarUrl}
              alt={stylist.full_name}
              width={48}
              height={48}
              className={styles.stylistAvatar}
            />
          </div>
          <div className={styles.stylistMiniInfo}>
            <span className={styles.stylistLabel}>Stylist</span>
            <p className={styles.stylistName}>{stylist.full_name}</p>
            <span className={styles.serviceModeBadge}>{serviceModeLabel}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
