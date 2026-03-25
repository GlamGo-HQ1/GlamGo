import type { StylistForStyle } from '@/lib/actions/stylists'
import { StylistCard } from '@/components/stylists/StylistCard'
import styles from './StylistList.module.css'

interface StylistListProps {
  stylists: StylistForStyle[]
  hairstyleId: string
}

export function StylistList({ stylists, hairstyleId }: StylistListProps) {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Available Stylists</h2>
      </div>
      {stylists.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>No stylists offer this style yet</p>
          <p className={styles.emptySubtext}>Check back soon as new stylists join our platform</p>
        </div>
      ) : (
        <div className={styles.list}>
          {stylists.map((stylist) => (
            <StylistCard
              key={stylist.id}
              stylist={stylist}
              hairstyleId={hairstyleId}
            />
          ))}
        </div>
      )}
    </section>
  )
}
