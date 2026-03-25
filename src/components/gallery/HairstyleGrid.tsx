import type { Hairstyle } from '@/lib/actions/hairstyles'
import { HairstyleCard } from './HairstyleCard'
import styles from './HairstyleGrid.module.css'

interface HairstyleGridProps {
  hairstyles: Hairstyle[]
}

export function HairstyleGrid({ hairstyles }: HairstyleGridProps) {
  if (hairstyles.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>No styles found</p>
        <p className={styles.emptySubtext}>Try a different category or search term</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {hairstyles.map((hairstyle) => (
        <HairstyleCard key={hairstyle.id} hairstyle={hairstyle} />
      ))}
    </div>
  )
}
