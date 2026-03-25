import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getHairstyles, type HairstyleCategory } from '@/lib/actions/hairstyles'
import { GalleryHero } from '@/components/gallery/GalleryHero'
import { CategoryFilter } from '@/components/gallery/CategoryFilter'
import { HairstyleGrid } from '@/components/gallery/HairstyleGrid'
import styles from './gallery.module.css'

export const metadata: Metadata = {
  title: 'Gallery | GlamGo',
  description: 'Explore our curated collection of stunning hairstyles. From braids to locs, find your next look.',
}

interface GalleryPageProps {
  searchParams: Promise<{ category?: string; q?: string }>
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams
  const category = params.category as HairstyleCategory | undefined
  const search = params.q

  const hairstyles = await getHairstyles(category, search)

  return (
    <div className={styles.page}>
      <Suspense>
        <GalleryHero />
      </Suspense>
      <Suspense>
        <CategoryFilter />
      </Suspense>
      <HairstyleGrid hairstyles={hairstyles} />
    </div>
  )
}
