'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from './GalleryPreview.module.css';

const GALLERY_ITEMS = [
  { id: 1, title: 'Knotless Braids', stylist: 'Sarah J.', img: 'https://images.unsplash.com/photo-1595959183082-7b570b7e1e6b?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Voluminous Silk Press', stylist: 'Elena M.', img: 'https://images.unsplash.com/photo-1611432579699-484f7990b127?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Goddess Locs', stylist: 'Nia T.', img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Textured Afro', stylist: 'Chloe B.', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: 'Blonde Highlights', stylist: 'Jessica R.', img: 'https://images.unsplash.com/photo-1588514532298-25088f723bba?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: 'Sleek Ponytail', stylist: 'Ashley C.', img: 'https://images.unsplash.com/photo-1595476108010-b4d1f10d5e43?q=80&w=800&auto=format&fit=crop' }
];

export const GalleryPreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // P3-6 FIX: Tightened scroll offset so animation only happens when section is prominently in view
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);

  const smoothX = useSpring(x, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className={styles.galleryContainer}>
      
      <div className={styles.header}>
        <h2 className={styles.heading}>The Gallery</h2>
        <p className={styles.subheading}>A glimpse of what&apos;s waiting for you.</p>
      </div>

      <div className={styles.reelWrapper}>
        <motion.div 
          className={styles.reelTrack}
          style={{ x: smoothX }}
        >
          {GALLERY_ITEMS.map((item, index) => {
            // P3-1: Calculate a static rotation for coverflow effect
            // Cards at edges are more rotated, center cards are flat
            const totalCards = GALLERY_ITEMS.length;
            const center = (totalCards - 1) / 2;
            const offset = index - center;
            const rotateY = offset * 8; // degrees per position from center

            return (
              <motion.div 
                key={item.id} 
                className={styles.galleryCard}
                style={{ 
                  rotateY: `${rotateY}deg`,
                  z: -Math.abs(offset) * 20 
                }}
                whileHover={{ rotateY: 0, z: 50, scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className={styles.cardImage} 
                  loading="lazy"
                />
                <div className={styles.cardOverlay}>
                  <div>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardSubtitle}>By {item.stylist}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

    </section>
  );
};
