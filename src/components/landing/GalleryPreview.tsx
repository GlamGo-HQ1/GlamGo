'use client';

import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import styles from './GalleryPreview.module.css';

const VIDEOS = [
  '/videos/Digital_Model_Hairstyle_Reveal.mp4',
  '/videos/Generating_Hair_Video_Prompts.mp4',
  '/videos/Generating_Video_Prompts_For_Hair.mp4',
  '/videos/Generating_Video_Prompts_for_Hair_Showcase.mp4',
  '/videos/Realistic_Braids_Video_Generation (1).mp4',
  '/videos/Realistic_Braids_Video_Generation.mp4',
];

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export const GalleryPreview = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  /* ── 3D Coverflow: rotate cards based on distance from center ── */
  const applyCoverflow = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;

    cardsRef.current.forEach((card) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;

      /* Distance from the visual center, normalized to -1 ... 1 */
      const offset = (cardCenterX - centerX) / (containerRect.width / 2);
      const clamped = Math.max(-1, Math.min(1, offset));

      /* Max rotation: 35 degrees at the edges */
      const rotateY = clamped * -35;
      /* Slight scale reduction at edges */
      const scale = 1 - Math.abs(clamped) * 0.08;
      /* Push edges back on Z axis */
      const translateZ = -Math.abs(clamped) * 60;

      card.style.transform = `perspective(1200px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`;
    });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    /* Apply on scroll */
    container.addEventListener('scroll', applyCoverflow, { passive: true });
    /* Apply on load + resize */
    applyCoverflow();
    window.addEventListener('resize', applyCoverflow);

    return () => {
      container.removeEventListener('scroll', applyCoverflow);
      window.removeEventListener('resize', applyCoverflow);
    };
  }, [applyCoverflow]);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -340, behavior: 'smooth' });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' });
  };

  return (
    <div className={`${styles.wrapper} spotlight-radial`}>
      {/* Header */}
      <motion.section
        className={styles.header}
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className={styles.headerInner}>
          <span className={styles.volumeTag}>Curated Volume I</span>
          <h2 className={styles.heading}>
            The <span className={styles.headingItalic}>Curator&apos;s</span><br />Choice
          </h2>
          <div className={styles.quoteCol}>
            <p className={styles.quote}>
              &quot;Style is not about following trends; it is about the structural integrity of one&apos;s own identity.&quot;
            </p>
          </div>
        </div>
      </motion.section>

      {/* Horizontal Coverflow Track */}
      <section className={styles.trackSection}>
        {/* Scroll arrows */}
        <button className={`${styles.scrollArrow} ${styles.scrollArrowLeft}`} onClick={scrollLeft} aria-label="Scroll left">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <button className={`${styles.scrollArrow} ${styles.scrollArrowRight}`} onClick={scrollRight} aria-label="Scroll right">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>

        <motion.div
          className={styles.track}
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {VIDEOS.map((src, i) => (
            <motion.div
              key={i}
              className={styles.exhibit}
              variants={cardVariants}
              ref={(el) => { cardsRef.current[i] = el; }}
            >
              <div className={styles.videoWrap}>
                <video
                  src={src}
                  className={styles.exhibitVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className={styles.videoFade} />
                <span className={styles.cardIndex}>{String(i + 1).padStart(2, '0')}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};
