'use client';

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import styles from './HeroEditorial.module.css';

const HERO_IMAGE = '/images/hero-bg.png';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.21, 0.47, 0.32, 0.98]
    } 
  },
};

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { delay: 1.5, duration: 1.2 } 
  },
};

export const HeroEditorial = () => {
  return (
    <section className={styles.hero} style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
      {/* Overlay */}
      <div className={styles.overlay} />



      {/* Content — bottom-aligned, left half */}
      <div className={styles.content}>
        <motion.div 
          className={styles.textBlock}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className={styles.heading}>
            <motion.span variants={itemVariants}>The Art</motion.span>
            <motion.span variants={itemVariants} className={styles.gold}>of the</motion.span>
            <motion.span variants={itemVariants} className={`${styles.italic} crown-glow`}>Crown</motion.span>
          </h1>

          <motion.p className={styles.sub} variants={itemVariants}>
            Immerse yourself in high-fashion editorial hair artistry. A sanctuary for curated looks, precision cuts, and bespoke treatments.
          </motion.p>

          <motion.div className={styles.actions} variants={itemVariants}>
            <Link href="/auth/register" className={styles.ctaPrimary}>START YOUR JOURNEY</Link>
            <Link href="/gallery" className={styles.ctaGhost}>VIEW LOOKBOOK</Link>
          </motion.div>
        </motion.div>

        {/* Right half — empty, image shows through */}
        <div className={styles.spacer} />
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className={styles.scrollHint}
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
      >
        <span className={styles.scrollText}>SCROLL TO EXPLORE</span>
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  );
};
