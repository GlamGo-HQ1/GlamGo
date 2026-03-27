'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { register } from '@/app/auth/actions'
import styles from './register.module.css'

export default function RegisterPage() {
  return <RegisterPageClient />
}

function RegisterPageClient() {
  const [role, setRole] = useState<'client' | 'stylist'>('client')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    // inject the role selected in this UI into the form
    formData.set('role', role)
    const result = await register(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>

      {/* ── LEFT: Hero Image Panel ── */}
      <section className={styles.imagePanel}>
        <Image
          src="/images/hairstyles/Braids/Fulani Braids/front.jpg"
          alt="GlamGo — Fulani Braids editorial"
          fill
          className={styles.heroImage}
          priority
        />
        <div className={styles.imageOverlay} />
        <div className={styles.imageOverlayTop} />

        {/* Logo */}
        <div className={styles.imageLogo}>GlamGo</div>

        {/* Footer copy */}
        <div className={styles.imageFooter}>
          <div className={styles.imageTag}>
            <span className={styles.imageTagLine} />
            <span className={styles.imageTagText}>GlamGo Moments</span>
          </div>
          <h2 className={styles.imageHeadline}>
            Elevate Your<br />
            <em>Visual Narrative</em>
          </h2>
          <p className={styles.imageSub}>
            Connect with world-class stylists or grow your creative practice through our high-performance styling engine.
          </p>
        </div>
      </section>

      {/* ── RIGHT: Console Panel ── */}
      <section className={styles.console}>
        <div className={styles.consoleHeader}>
          <span className={styles.consoleLabel}>System Access</span>
          <p className={styles.consoleTitle}>Create New Profile</p>
        </div>

        <div className={styles.consoleBody}>
          {error && <div className={styles.errorMsg}>{error}</div>}

          {/* Role Selector */}
          <div>
            <span className={styles.protocolLabel}>Select Protocol</span>
            <div className={styles.protocolGrid}>
              <button
                type="button"
                className={`${styles.protocolCard} ${role === 'client' ? styles.protocolCardActive : ''}`}
                onClick={() => setRole('client')}
              >
                <span className={styles.protocolIcon}>✨</span>
                <span className={styles.protocolCardLabel}>Seeker</span>
              </button>
              <button
                type="button"
                className={`${styles.protocolCard} ${role === 'stylist' ? styles.protocolCardActive : ''}`}
                onClick={() => setRole('stylist')}
              >
                <span className={styles.protocolIcon}>✂️</span>
                <span className={styles.protocolCardLabel}>Stylist</span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form action={handleSubmit} className={styles.formFields}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Full Identification</label>
              <input
                className={styles.fieldInput}
                name="full_name"
                placeholder="Entry Name..."
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Electronic Mail</label>
              <input
                className={styles.fieldInput}
                type="email"
                name="email"
                placeholder="network@address.com"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Mobile Uplink</label>
              <input
                className={styles.fieldInput}
                type="tel"
                name="phone"
                placeholder="+234 801 234 5678"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Secure Access Key</label>
              <input
                className={styles.fieldInput}
                type="password"
                name="password"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            <div className={styles.ctaSection}>
              <label className={styles.termsRow}>
                <input type="checkbox" className={styles.termsCheck} required />
                <span className={styles.termsText}>
                  I acknowledge the terms of the digital atelier &amp; privacy protocols.
                </span>
              </label>

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? 'Initializing...' : 'Initialize Profile'}
              </button>

              <p className={styles.signInLink}>
                Authorized personnel?{' '}
                <Link href="/auth/login">Sign In</Link>
              </p>
            </div>
          </form>
        </div>

        <footer className={styles.consoleFooter}>
          <div className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>Documentation</a>
            <a href="#" className={styles.footerLink}>Legal</a>
            <a href="#" className={styles.footerLink}>Status: Online</a>
          </div>
          <span className={styles.footerCopy}>© 2026 GlamGo Digital Atelier</span>
        </footer>
      </section>

    </div>
  )
}
