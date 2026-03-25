'use client'

import styles from './booking.module.css'

export type ServiceType = 'salon' | 'home'

interface ServiceTypeToggleProps {
  value: ServiceType
  onChange: (value: ServiceType) => void
  stylistServiceMode: 'salon' | 'mobile' | 'both'
}

export function ServiceTypeToggle({ 
  value, 
  onChange, 
  stylistServiceMode 
}: ServiceTypeToggleProps) {
  const canSalon = stylistServiceMode === 'salon' || stylistServiceMode === 'both'
  const canMobile = stylistServiceMode === 'mobile' || stylistServiceMode === 'both'

  return (
    <div className={styles.serviceTypeSection}>
      <span className={styles.sectionLabel}>Service Type</span>
      <div className={styles.toggleContainer}>
        <button
          type="button"
          className={`${styles.toggleOption} ${value === 'salon' ? styles.toggleActive : ''}`}
          onClick={() => onChange('salon')}
          disabled={!canSalon}
          aria-pressed={value === 'salon'}
        >
          Salon Visit
        </button>
        <button
          type="button"
          className={`${styles.toggleOption} ${value === 'home' ? styles.toggleActive : ''}`}
          onClick={() => onChange('home')}
          disabled={!canMobile}
          aria-pressed={value === 'home'}
        >
          Home Service
        </button>
      </div>
    </div>
  )
}
