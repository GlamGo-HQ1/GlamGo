'use client'

import { useState } from 'react'
import styles from './RoleSelector.module.css'

export function RoleSelector({ onChange }: { onChange: (role: 'client' | 'stylist') => void }) {
  const [role, setRole] = useState<'client' | 'stylist'>('client')

  const selectRole = (newRole: 'client' | 'stylist') => {
    setRole(newRole)
    onChange(newRole)
  }

  return (
    <div className={styles.grid}>
      <button
        type="button"
        onClick={() => selectRole('client')}
        className={`${styles.card} ${role === 'client' ? styles.cardActive : ''}`}
      >
        <div className={styles.iconWrap}>
          <span className={styles.icon}>✨</span>
        </div>
        <span className={styles.cardLabel}>I&apos;m looking for a stylist</span>
        <div className={styles.indicator} />
      </button>

      <button
        type="button"
        onClick={() => selectRole('stylist')}
        className={`${styles.card} ${role === 'stylist' ? styles.cardActive : ''}`}
      >
        <div className={styles.iconWrap}>
          <span className={styles.icon}>✂️</span>
        </div>
        <span className={styles.cardLabel}>I&apos;m a stylist</span>
        <div className={styles.indicator} />
      </button>

      <input type="hidden" name="role" value={role} />
    </div>
  )
}
