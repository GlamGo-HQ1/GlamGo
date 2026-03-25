'use client';

import Link from 'next/link';
import styles from './MobileBottomNav.module.css';

export const MobileBottomNav = () => {
  return (
    <footer className={styles.bar}>
      <div className={styles.inner}>
        <Link href="/" className={`${styles.tab} ${styles.tabActive}`} aria-label="Explore">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.1L12 16.3l-6.3 4.4 2.3-7.1-6-4.4h7.6z"/></svg>
        </Link>
        <Link href="/gallery" className={styles.tab} aria-label="Gallery">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15l5-5 4 4 4-4 5 5"/></svg>
        </Link>
        <Link href="/auth/login" className={styles.tab} aria-label="Bookmarks">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </Link>
        <Link href="/auth/login" className={styles.tab} aria-label="Profile">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
        </Link>
      </div>
    </footer>
  );
};
