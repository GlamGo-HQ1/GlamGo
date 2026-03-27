'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import styles from './EditorialGrid.module.css';

/* ── Static grid images (surrounding tiles) ── */
const GRID_IMAGES = [
  '/images/hairstyles/Twists/Island twist braids/front.jpg',
  '/images/hairstyles/Locs (Dreads & Faux Locs)/Boho Locs/_Based_on_the_202603261239.jpg',
  '/images/hairstyles/Twists/Island twist braids/_Based_on_the_202603261608.png',
  '/images/hairstyles/Braids/Lemonade Braids/front.jpg',
  '/images/hairstyles/Weaving (Cornrows & Stitch Styles)/shukwu with Bond/front.jpg',
  '/images/hairstyles/Weaving (Cornrows & Stitch Styles)/Bald Braids/front.jpg',
];

/* ── Center crossfade portraits (side/back views only) ── */
const CENTER_PORTRAITS = [
  {
    src: '/images/hairstyles/Braids/Fulani Braids/_Based_on_the_202603260828.jpg',
    label: 'Fulani Braids — Side Profile',
  },
  {
    src: '/images/hairstyles/Braids/Knotless Braids/Based_on_the_202603260711.jpg',
    label: 'Knotless Braids — Back View',
  },
  {
    src: '/images/hairstyles/Locs (Dreads & Faux Locs)/Boho Locs/_Based_on_the_202603261234.jpg',
    label: 'Boho Locs — Back View',
  },
  {
    src: '/images/hairstyles/Twists/Island twist braids/_Based_on_the_202603261333.jpg',
    label: 'Island Twists — Top View',
  },
];

/* ── Animation variants ── */
const tileVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/* ── Reusable tile image ── */
const GridImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className={styles.imgWrap}>
    <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" className={styles.tileImg} />
  </div>
);

/* ── Main Component ── */
export const EditorialGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  /* Auto-crossfade every 2.5 seconds */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CENTER_PORTRAITS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const goNext = () => setActiveIndex((prev) => (prev + 1) % CENTER_PORTRAITS.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + CENTER_PORTRAITS.length) % CENTER_PORTRAITS.length);

  return (
    <section className={styles.section} id="editorial-grid">
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {/* LEFT COLUMN */}
        <motion.div variants={tileVariants} className={styles.col}>
          <div className={`editorial-grid-box ${styles.boxTall}`}>
            <GridImage src={GRID_IMAGES[0]} alt="Island Twist Braids Front View" />
            <div className={styles.diagLine} />
          </div>
          <div className={`editorial-grid-box ${styles.boxShort}`}>
            <GridImage src={GRID_IMAGES[1]} alt="Boho Locs Side View" />
            <div className={styles.goldBar} />
          </div>
        </motion.div>

        {/* CENTER COLUMN — Focal Point with Crossfade */}
        <motion.div variants={tileVariants} className={styles.col}>
          <div className={`editorial-grid-box ${styles.boxCenter}`}>
            {/* Crossfading portrait stack */}
            <div className={styles.portraitStack}>
              <AnimatePresence>
                <motion.div
                  key={activeIndex}
                  className={styles.portraitSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <Image
                    src={CENTER_PORTRAITS[activeIndex].src}
                    alt={CENTER_PORTRAITS[activeIndex].label}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className={styles.tileImg}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Overlay UI */}
            <div className={styles.navBtns}>
              <button className={styles.arrowBtn} aria-label="Previous" onClick={goPrev}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
              <button className={styles.arrowBtn} aria-label="Next" onClick={goNext}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>
            <span className={styles.counter}>
              {CENTER_PORTRAITS[activeIndex].label.toUpperCase()}
            </span>
            <div className={styles.crossLines}>
              <div className={styles.crossLine1} />
              <div className={styles.crossLine2} />
            </div>
          </div>
          <div className={`editorial-grid-box ${styles.boxBottom}`}>
            <GridImage src={GRID_IMAGES[2]} alt="Island Twists Top View" />
            <div className={styles.gradientLine} />
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <motion.div variants={tileVariants} className={styles.col}>
          <div className={`editorial-grid-box ${styles.boxSmall}`}>
            <GridImage src={GRID_IMAGES[3]} alt="Lemonade Braids Front View" />
            <span className={styles.refLabel}>REF. 001</span>
          </div>
          <div className={`editorial-grid-box ${styles.boxSmall}`}>
            <GridImage src={GRID_IMAGES[4]} alt="Shukwu With Bond Front View" />
            <div className={styles.circleDecor} />
          </div>
          <div className={`editorial-grid-box ${styles.boxSmall}`}>
            <GridImage src={GRID_IMAGES[5]} alt="Bald Braids Back Form" />
            <div className={styles.bottomFade} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
