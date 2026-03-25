import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getHairstyleById } from '@/lib/actions/hairstyles'
import { getStylistsForStyle } from '@/lib/actions/stylists'
import { StyleImageGallery } from '@/components/styles/StyleImageGallery'
import { StyleInfo } from '@/components/styles/StyleInfo'
import { StylistList } from '@/components/styles/StylistList'
import styles from './styles-detail.module.css'

interface StyleDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: StyleDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const hairstyle = await getHairstyleById(id)
  if (!hairstyle) return { title: 'Style Not Found | GlamGo' }

  return {
    title: `${hairstyle.name} | GlamGo`,
    description: hairstyle.description ?? `Explore ${hairstyle.name} on GlamGo — find available stylists and book your session.`,
  }
}

export default async function StyleDetailPage({ params }: StyleDetailPageProps) {
  const { id } = await params
  const [hairstyle, stylists] = await Promise.all([
    getHairstyleById(id),
    getStylistsForStyle(id),
  ])

  if (!hairstyle) {
    notFound()
  }

  const images = hairstyle.images ?? []

  return (
    <div className={styles.page}>
      {/* Left: Sticky image column */}
      <div className={styles.imageColumn}>
        <StyleImageGallery images={images} styleName={hairstyle.name} />
      </div>

      {/* Right: Scrollable content */}
      <div className={styles.contentColumn}>
        <Link href="/gallery" className={styles.backLink}>
          ← Back to Gallery
        </Link>

        <StyleInfo hairstyle={hairstyle} />

        <StylistList stylists={stylists} hairstyleId={id} />
      </div>

      {/* Mobile floating CTA */}
      <div className={styles.mobileCta}>
        <button className={styles.ctaButton}>
          Instant Booking
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>
      </div>
    </div>
  )
}
