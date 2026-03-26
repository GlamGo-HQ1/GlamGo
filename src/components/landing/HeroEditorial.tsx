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
