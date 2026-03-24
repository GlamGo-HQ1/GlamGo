'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './StoryReveal.module.css';

const storyText = "You already know who you want to be. You can see her. The hair, the confidence, the walk. GlamGo brings her to life — from the stylist who truly understands your vision.";

/**
 * A sub-component that maps a specific slice of the scroll progress to its opacity.
 */
const Word = ({ 
  children, 
  progress, 
  range 
}: { 
  children: React.ReactNode; 
  progress: any; 
  range: [number, number] 
}) => {
  // As scrollYProgress goes from range[0] to range[1], opacity goes from 0.15 to 1
  const opacity = useTransform(progress, range, [0.15, 1]);
  
  // Highlight words related to the final value prop
  const isHighlight = children === 'GlamGo' || children === 'vision.';
  
  return (
    <motion.span 
      className={`${styles.word} ${isHighlight ? styles.goldHighlight : ''}`}
      style={{ opacity }}
    >
      {children}
    </motion.span>
  );
};

export const StoryReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start fading in words when the top of the container hits the middle of the screen
    // Finish when the bottom of the container hits the bottom of the screen
    offset: ['start center', 'end end']
  });

  const words = storyText.split(' ');

  return (
    <section ref={containerRef} className={styles.storyContainer}>
      <div className={styles.stickyTextLayer}>
        <p className={styles.storyText}>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            
            return (
              <Word 
                key={i} 
                progress={scrollYProgress} 
                range={[start, end]}
              >
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
};
