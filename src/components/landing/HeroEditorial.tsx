'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import styles from './HeroEditorial.module.css';

const HERO_IMAGE = '/images/hero-bg.png';

export const HeroEditorial = () => {
  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
      {/* Overlay */}
      <div className={styles.overlay} />

      {/* Top Nav */}
      <nav className={styles.topNav}>
        <div className={styles.brand}>GlamGo</div>

        <div className={styles.navLinks}>
          <Link href="/gallery" className={`${styles.navLink} ${styles.navLinkActive}`}>Stylists</Link>
          <Link href="/gallery" className={styles.navLink}>Services</Link>
          <Link href="/gallery" className={styles.navLink}>Gallery</Link>
          <Link href="/auth/login" className={styles.navLink}>Book Now</Link>
        </div>

        <div className={styles.navIcons}>
          <Link href="/auth/login" className={styles.iconBtn} aria-label="Log In">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </Link>
          <Link href="/auth/login" className={styles.iconBtn} aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
          </Link>
        </div>
      </nav>

      {/* Content — bottom-aligned, left half */}
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <h1 className={styles.heading}>
            <span>The Art</span>
            <span className={styles.gold}>of the</span>
            <span className={`${styles.italic} crown-glow`}>Crown</span>
          </h1>

          <p className={styles.sub}>
            Immerse yourself in high-fashion editorial hair artistry. A sanctuary for curated looks, precision cuts, and bespoke treatments.
          </p>

          <div className={styles.actions}>
            <Link href="/auth/register" className={styles.ctaPrimary}>START YOUR JOURNEY</Link>
            <Link href="/gallery" className={styles.ctaGhost}>VIEW LOOKBOOK</Link>
          </div>
        </div>

        {/* Right half — empty, image shows through */}
        <div className={styles.spacer} />
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollHint}>
        <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
};
