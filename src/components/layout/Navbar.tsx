import React from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'
import { createClient } from '@/lib/supabase/server'
import { logout } from '@/app/auth/actions'

export async function Navbar() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  const user = session?.user ?? null

  return (
    <nav className={styles.topNav}>
      <Link href="/" className={styles.brand}>GlamGo</Link>

      <div className={styles.navLinks}>
        <Link href="/gallery" className={styles.navLink}>Gallery</Link>
        <Link href="/stylists" className={styles.navLink}>Stylists</Link>
        <Link href="/#editorial-grid" className={styles.navLink}>Services</Link>
        {user ? (
          <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
        ) : (
          <Link href="/auth/login" className={styles.navLink}>Book Now</Link>
        )}
      </div>

      <div className={styles.navIcons}>
        <Link href="/gallery" className={styles.iconBtn} aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </Link>
        {user ? (
          <>
            <Link href="/dashboard" className={styles.iconBtn} aria-label="Dashboard">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            </Link>
            <form action={logout} className={styles.logoutForm}>
              <button type="submit" className={styles.iconBtn} aria-label="Sign Out">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              </button>
            </form>
          </>
        ) : (
          <Link href="/auth/login" className={styles.iconBtn} aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
          </Link>
        )}
      </div>
    </nav>
  )
}
