import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getStylistById, getStylesForStylist, getReviewsForStylist } from '@/lib/actions/stylists'
import { StylistHeader } from '@/components/stylists/StylistHeader'
import { StylistPortfolio } from '@/components/stylists/StylistPortfolio'
import { StylistStyles } from '@/components/stylists/StylistStyles'
import { StylistReviews } from '@/components/stylists/StylistReviews'
import styles from './stylist-profile.module.css'

interface StylistProfilePageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: StylistProfilePageProps): Promise<Metadata> {
  const { id } = await params
  const stylist = await getStylistById(id)
  if (!stylist) return { title: 'Stylist Not Found | GlamGo' }

  return {
    title: `${stylist.full_name} | GlamGo`,
    description: stylist.bio ?? `View ${stylist.full_name}'s portfolio, services, and reviews on GlamGo.`,
  }
}

export default async function StylistProfilePage({ params }: StylistProfilePageProps) {
  const { id } = await params
  const [stylist, stylistStyles, reviews] = await Promise.all([
    getStylistById(id),
    getStylesForStylist(id),
    getReviewsForStylist(id),
  ])

  if (!stylist) {
    notFound()
  }

  const portfolioImages = stylist.portfolio_images ?? []

  return (
    <div className={styles.page}>
      <StylistHeader stylist={stylist} />

      <div className={styles.mainGrid}>
        {/* Left: Portfolio */}
        <StylistPortfolio images={portfolioImages} stylistName={stylist.full_name} />

        {/* Right: Services + Reviews */}
        <div className={styles.rightCol}>
          <StylistStyles stylistStyles={stylistStyles} stylistId={id} />
          <StylistReviews reviews={reviews} />
        </div>
      </div>

      {/* Sticky CTA */}
      <div className={styles.stickyCta}>
        <div className={styles.ctaInner}>
          <button className={styles.ctaButton}>
            Book {stylist.full_name.split(' ')[0]}
          </button>
        </div>
      </div>
    </div>
  )
}
