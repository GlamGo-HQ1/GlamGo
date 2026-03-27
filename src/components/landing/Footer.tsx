import Link from 'next/link'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand column */}
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brand}>GlamGo</Link>
          <p className={styles.tagline}>
            Nigeria&apos;s premier platform connecting clients with
            verified, editorial-grade hairstylists.
          </p>
          <div className={styles.contact}>
            <span>Lagos, Nigeria</span>
            <span>hello@glamgo.ng</span>
          </div>
          <div className={styles.socials}>
            <a href="#" aria-label="Twitter" className={styles.socialIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className={styles.socialIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="#" aria-label="Email" className={styles.socialIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Platform</h4>
          <Link href="/gallery" className={styles.footerLink}>Gallery</Link>
          <Link href="/stylists" className={styles.footerLink}>Stylists</Link>
          <Link href="/#editorial-grid" className={styles.footerLink}>Services</Link>
          <Link href="/#faq" className={styles.footerLink}>FAQ</Link>
        </div>

        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Company</h4>
          <Link href="#" className={styles.footerLink}>About Us</Link>
          <Link href="#" className={styles.footerLink}>Careers</Link>
          <Link href="#" className={styles.footerLink}>Blog</Link>
          <Link href="#" className={styles.footerLink}>Contact</Link>
        </div>

        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Legal</h4>
          <Link href="#" className={styles.footerLink}>Privacy Policy</Link>
          <Link href="#" className={styles.footerLink}>Terms of Service</Link>
          <Link href="#" className={styles.footerLink}>Cookie Policy</Link>
        </div>
      </div>

      {/* Trust badges */}
      <div className={styles.trustBar}>
        <div className={styles.trustItems}>
          <div className={styles.trustItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>Bank-level Security</span>
          </div>
          <div className={styles.trustItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>256-bit Encryption</span>
          </div>
          <div className={styles.trustItem}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <span>Verified Stylists</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} GlamGo. All rights reserved.</p>
      </div>
    </footer>
  )
}
