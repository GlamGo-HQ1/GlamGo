'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import styles from './GalleryHero.module.css'

export function GalleryHero() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentQuery = searchParams.get('q') ?? ''

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('q') as string
    const params = new URLSearchParams(searchParams.toString())
    
    if (query) {
      params.set('q', query)
    } else {
      params.delete('q')
    }
    // Keep existing category filter
    router.push(`/gallery?${params.toString()}`)
  }

  return (
    <section className={styles.hero}>
      <h1 className={styles.headline}>
        Find Your <span className={styles.accent}>Next Look</span>
      </h1>
      <div className={styles.divider} />
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <span className={styles.searchIcon}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <input
          type="text"
          name="q"
          defaultValue={currentQuery}
          className={styles.searchInput}
          placeholder="Search braids, locs, cornrows..."
        />
      </form>
    </section>
  )
}
