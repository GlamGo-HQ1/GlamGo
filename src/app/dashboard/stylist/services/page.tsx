import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import {
  getGlobalCatalog,
  getStylistClaimedIds,
  getStylistProfileId,
} from '@/lib/actions/stylist-dashboard'
import { ServiceClaimGrid } from '@/components/stylists/ServiceClaimGrid'
import { EvidenceGallery } from '@/components/stylists/EvidenceGallery'
import styles from './services.module.css'

export const metadata = {
  title: 'Service Curation | GlamGo Stylist',
  description: 'Manage your evidence gallery and claim global hairstyles to offer your clients.',
}

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

  const [catalog, claimedIds, profileData] = await Promise.all([
    getGlobalCatalog(),
    getStylistClaimedIds(stylistProfileId),
    supabase
      .from('stylist_profiles')
      .select('portfolio_images')
      .eq('id', stylistProfileId)
      .single()
  ])

  const dbImages = profileData.data?.portfolio_images || []
  const initialImages = dbImages.map((url: string) => ({
    src: url,
    label: 'Portfolio Upload',
    date: 'Recent'
  }))



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
          <span className={styles.headBadge}>{initialImages.length} Photos</span>
        </div>

        <EvidenceGallery initialImages={initialImages} />
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
            <Link href={`/stylists/${stylistProfileId}`} className={styles.ctaSecondary}>
              Preview Profile
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
