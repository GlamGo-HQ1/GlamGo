import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getStylistById, getStylesForStylist, getReviewsForStylist } from '@/lib/actions/stylists'
import { StylistHeader } from '@/components/stylists/StylistHeader'
import { StylistPortfolio } from '@/components/stylists/StylistPortfolio'
import { StylistReviews } from '@/components/stylists/StylistReviews'
import { StylistStyles } from '@/components/stylists/StylistStyles'
import styles from './stylist-profile.module.css'
import Link from 'next/link'

interface StylistProfilePageProps {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
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

export default async function StylistProfilePage({ params, searchParams }: StylistProfilePageProps) {
  const { id } = await params
  const resolvedSearchParams = await searchParams
  const styleId = typeof resolvedSearchParams?.styleId === 'string' ? resolvedSearchParams.styleId : null

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
          <div id="services">
            <StylistStyles stylistStyles={stylistStyles} stylistId={id} />
          </div>
          <StylistReviews reviews={reviews} />
        </div>
      </div>

      {/* Sticky CTA */}
      <div className={styles.stickyCta}>
        <div className={styles.ctaInner}>
          {styleId ? (
            <Link href={`/booking/${styleId}/${id}`} className={styles.ctaButton}>
              Book Session Now →
            </Link>
          ) : (
            <a href="#services" className={styles.ctaButton}>
              Book {stylist.full_name.split(' ')[0]} ↓
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
