'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import styles from './StoryReveal.module.css';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } 
  },
};

export const StoryReveal = () => {
  return (
    <section className={styles.story}>
      <motion.div 
        className={styles.inner}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 variants={itemVariants} className={styles.title}>Every Crown</motion.h2>
        <motion.h2 variants={itemVariants} className={styles.titleGold}>Has a Story</motion.h2>
        <motion.div variants={itemVariants} className={styles.gap} />
        <motion.p variants={itemVariants} className={styles.body}>
          We don&apos;t just show you hairstyles. We show you every angle, every
          detail — so you know exactly what you&apos;re choosing before you book.
        </motion.p>
      </motion.div>
    </section>
  );
};
