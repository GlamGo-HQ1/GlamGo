'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Constants } from '@/lib/database.types'
import styles from './CategoryFilter.module.css'

const CATEGORIES = ['all', ...Constants.public.Enums.hairstyle_category] as const

function formatCategory(cat: string): string {
  if (cat === 'all') return 'All'
  return cat.charAt(0).toUpperCase() + cat.slice(1)
}

export function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') ?? 'all'

  function handleClick(category: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (category === 'all') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    router.push(`/gallery?${params.toString()}`)
  }

  return (
    <section className={styles.filterSection}>
      <div className={styles.filterRow}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`${styles.pill} ${activeCategory === cat ? styles.active : ''}`}
            onClick={() => handleClick(cat)}
          >
            {formatCategory(cat)}
          </button>
        ))}
      </div>
    </section>
  )
}
