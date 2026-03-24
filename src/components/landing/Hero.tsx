'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';

// Using high-quality placeholder images of different hairstyles for the "Slot Machine" crossfade
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
  
  // 1. The Zoom-Through Math (Scroll Parallax)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Background Text scales up hugely and fades out
  const bgScale = useTransform(scrollYProgress, [0, 0.6], [1, 4]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4], [0.15, 0]);

  // Center Portrait scales up to consume the screen (acts as a mask)
  // Scaling by 7 ensures a 30vw element easily covers 100vw and 100vh
  const centerScale = useTransform(scrollYProgress, [0, 0.8], [1, 7]);
  
  // The dark overlay inside the portrait fades in at the very end of the scroll 
  // to transition smoothly into the dark background of Section 2
  const transitionMaskOpacity = useTransform(scrollYProgress, [0.75, 1], [0, 1]);

  // Flanking images drift outwards and fade
  const leftX = useTransform(scrollYProgress, [0, 0.6], ['0%', '-150%']);
  const rightX = useTransform(scrollYProgress, [0, 0.6], ['0%', '150%']);
  const flankingOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Foreground fades out relatively quickly so it doesn't block the visual
  const foregroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // 2. The Slot Machine Effect (Time-based Crossfade)
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);

  useEffect(() => {
    // Cycles very quickly (800ms) to create energy while zooming
    const interval = setInterval(() => {
      setCurrentStyleIndex((prev) => (prev + 1) % HERO_STYLES.length);
    }, 800);
    
    return () => clearInterval(interval);
  }, []);

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
