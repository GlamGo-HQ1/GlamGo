import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import {
  getGlobalCatalog,
  getStylistClaimedIds,
  getStylistProfileId,
} from '@/lib/actions/stylist-dashboard'
import { ServiceClaimGrid } from '@/components/stylists/ServiceClaimGrid'
import styles from './services.module.css'

export const metadata = {
  title: 'Service Curation | GlamGo Stylist',
  description: 'Manage your evidence gallery and claim global hairstyles to offer your clients.',
}

// Masonry evidence images sourced from our own public gallery
const EVIDENCE_IMAGES = [
  {
    src: '/images/hairstyles/Braids/Fulani Braids/front.jpg',
    label: 'Fulani Heritage',
    date: '2d ago',
  },
  {
    src: '/images/hairstyles/Braids/Knotless Braids/Based_on_the_202603260711.jpg',
    label: 'Knotless Artistry',
    date: '5d ago',
  },
  {
    src: '/images/hairstyles/Braids/Knotless Braids/front.jpg',
    label: 'Clean Knotless',
    date: '1w ago',
  },
  {
    src: '/images/hairstyles/Braids/Lemonade Braids/front.jpg',
    label: 'Lemonade Flow',
    date: '2w ago',
  },
]

export default async function ServiceCurationPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  // Verify this user is a stylist
  const { data: userData } = await supabase
    .from('users')
    .select('full_name, role')
    .eq('id', user.id)
    .single()

  if (userData?.role !== 'stylist') redirect('/dashboard/client')

  const stylistProfileId = await getStylistProfileId(user.id)
  if (!stylistProfileId) redirect('/dashboard/stylist')

  const [catalog, claimedIds] = await Promise.all([
    getGlobalCatalog(),
    getStylistClaimedIds(stylistProfileId),
  ])



  return (
    <div className={styles.page}>

      {/* ── Hero Header ── */}
      <header className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.heroLabel}>Atelier Workspace</span>
          <h1 className={styles.heroTitle}>
            Service <em>Curation</em>
          </h1>
          <p className={styles.heroSub}>
            Refine your digital presence by managing your evidence gallery and selecting global trends to offer your clientele.
          </p>
        </div>
        <div className={styles.heroRight}>
          <p className={styles.heroMetaLabel}>Portfolio Strength</p>
          <p className={styles.heroMetaValue}>
            {claimedIds.length > 10 ? 'High Excellence' : claimedIds.length > 4 ? 'Growing' : 'Starting Out'}
          </p>
        </div>
      </header>

      {/* ── Section 1: Evidence Gallery ── */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>My Evidence Gallery</h2>
          <div className={styles.headDivider} />
          <span className={styles.headBadge}>{EVIDENCE_IMAGES.length} Photos</span>
        </div>

        <div className={styles.masonry}>
          {/* Upload dropzone */}
          <div className={styles.uploadZone}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
            </svg>
            <span className={styles.uploadLabel}>Upload New Evidence</span>
            <span className={styles.uploadHint}>JPG or MP4 (Max 50MB)</span>
          </div>

          {/* Gallery images */}
          {EVIDENCE_IMAGES.map((img) => (
            <div key={img.src} className={styles.galleryItem}>
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.galleryImg}
              />
              <div className={styles.galleryOverlay}>
                <p className={styles.galleryLabel}>{img.label}</p>
                <span className={styles.galleryDate}>{img.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 2: Claim Global Services ── */}
      <section className={styles.claimSection}>
        <div className={styles.claimSectionInner}>
          <div className={styles.claimHead}>
            <div>
              <h2 className={styles.claimTitle}>
                Claim Global <em>Services</em>
              </h2>
              <p className={styles.claimSub}>
                Expand your repertoire by claiming trending styles from the GlamGo catalog. Set your price for each expertise.
              </p>
            </div>
          </div>

          <ServiceClaimGrid
            hairstyles={catalog}
            claimedIds={claimedIds}
            stylistProfileId={stylistProfileId}
          />
        </div>
      </section>

      {/* ── Section 3: Publish CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaPanel}>
          <h2 className={styles.ctaTitle}>
            Ready to go <span className={styles.ctaHighlight}>live</span>?
          </h2>
          <p className={styles.ctaSub}>
            Your updated portfolio and service list will be visible to clients across the GlamGo network instantly.
          </p>
          <div className={styles.ctaButtons}>
            <Link href={`/dashboard/stylist`} className={styles.ctaPrimary}>
              Back to Dashboard
            </Link>
            <Link href={`/stylists`} className={styles.ctaSecondary}>
              Preview Profile
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
