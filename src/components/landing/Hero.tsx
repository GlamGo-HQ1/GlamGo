'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';

const HERO_STYLES = [
  {
    id: 'natural',
    name: 'Natural',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'braids',
    name: 'Braids',
    image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e1e6b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'silk-press',
    name: 'Silk Press',
    image: 'https://images.unsplash.com/photo-1611432579699-484f7990b127?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'short-cut',
    name: 'Short Cut',
    image: 'https://images.unsplash.com/photo-1588514532298-25088f723bba?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'locs',
    name: 'Locs',
    image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1000&auto=format&fit=crop'
  }
];

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. Scroll-linked Parallax (The Zoom-Through)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Background text scales up and fades
  const bgScale = useTransform(scrollYProgress, [0, 0.6], [1, 4]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4], [0.15, 0]);

  // Center portrait scales to fill viewport (the portal mask)
  const centerScale = useTransform(scrollYProgress, [0, 0.8], [1, 7]);
  
  // Dark overlay fades in at end to transition to Section 2
  const transitionMaskOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1]);

  // Flanking images drift outward and fade
  const leftX = useTransform(scrollYProgress, [0, 0.6], ['0%', '-150%']);
  const rightX = useTransform(scrollYProgress, [0, 0.6], ['0%', '150%']);
  const flankingOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Foreground UI fades quickly
  const foregroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // 2. Slot Machine Effect (Time-based Crossfade)
  // P2-3 FIX: Track whether hero is visible to pause the timer when off-screen
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [isInView, setIsInView] = useState(true);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setIsInView(latest < 0.92);
  });

  useEffect(() => {
    if (!isInView) return; // Don't run the timer when hero is scrolled past
    
    const interval = setInterval(() => {
      setCurrentStyleIndex((prev) => (prev + 1) % HERO_STYLES.length);
    }, 800);
    
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={containerRef} className={styles.heroContainer}>
      <div className={styles.stickyWrapper}>
        
        {/* LAYER 1: Background Typography */}
        <motion.div 
          className={styles.backgroundTextLayer}
          style={{ scale: bgScale, opacity: bgOpacity }}
        >
          <h1 className={styles.backgroundText}>YOUR HAIR</h1>
        </motion.div>

        {/* LAYER 2: The Images */}
        <div className={styles.imagesLayer}>
          
          {/* Left Flanking Image */}
          <motion.div 
            className={`${styles.flankingImage} ${styles.flankingImageLeft}`}
            style={{ x: leftX, opacity: flankingOpacity }}
          >
            <img 
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop" 
              alt="Hair styling detail" 
              className={styles.flankingImgElement}
            />
          </motion.div>

          {/* Center Portrait (The Zoom Mask) */}
          <motion.div 
            className={styles.centerPortrait}
            style={{ scale: centerScale }}
          >
            {/* The rapidly crossfading portraits */}
            <AnimatePresence mode="popLayout">
              <motion.img
                key={HERO_STYLES[currentStyleIndex].id}
                src={HERO_STYLES[currentStyleIndex].image}
                alt={HERO_STYLES[currentStyleIndex].name}
                className={styles.centerImgElement}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              />
            </AnimatePresence>

            {/* P3-3 FIX: Style label that crossfades with the portrait */}
            <div className={styles.styleLabel}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={HERO_STYLES[currentStyleIndex].id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {HERO_STYLES[currentStyleIndex].name}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* The final fade to black before next section */}
            <motion.div 
              className={styles.transitionMask}
              style={{ opacity: transitionMaskOpacity }}
            />
          </motion.div>

          {/* Right Flanking Image */}
          <motion.div 
            className={`${styles.flankingImage} ${styles.flankingImageRight}`}
            style={{ x: rightX, opacity: flankingOpacity }}
          >
            <img 
              src="https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=800&auto=format&fit=crop" 
              alt="Hair styling detail" 
              className={styles.flankingImgElement}
            />
          </motion.div>
        </div>

        {/* LAYER 3: Foreground UI */}
        <motion.div 
          className={styles.foregroundLayer}
          style={{ opacity: foregroundOpacity }}
        >
          <div className={styles.headerRow}>
            <div className={styles.logo}>GlamGo.</div>
            <button className={styles.bookButton}>Book Now</button>
          </div>
          <div className={styles.taglineWrapper}>
            <h2 className={styles.tagline}>Your Way.</h2>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
