'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { Variants } from 'framer-motion';
import styles from './BookingFlow.module.css';

const STEPS = [
  {
    num: '1',
    title: 'Browse Styles',
    desc: 'See every angle before you commit.',
    align: 'center' as const,
  },
  {
    num: '2',
    title: 'Find Your\nStylist',
    desc: 'Verified stylists near you — salon or mobile.',
    align: 'right' as const,
  },
  {
    num: '3',
    title: 'Book Instantly',
    desc: 'Pick your time. No back-and-forth.',
    align: 'center' as const,
    cta: 'Secure your slot',
  },
  {
    num: '4',
    title: 'Pay Securely',
    desc: 'Protected checkout. Powered by Interswitch.',
    align: 'left' as const,
    star: true,
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } 
  }
};

export const BookingFlow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Gold SVG Path */}
      <svg className={styles.goldPath} fill="none" viewBox="0 0 1440 4000" xmlns="http://www.w3.org/2000/svg">
        <motion.path
          d="M720 0V450 C720 450 720 750 350 750 C-20 750 -20 300 350 300 C720 300 720 750 720 750 L720 1100 L1350 1400 L150 1400 L1300 2200 L720 2800 L100 3600 C100 3600 -100 3800 150 3950 C400 4100 650 3950 650 3700 C650 3450 400 3200 150 3450"
          stroke="#C9A96E"
          strokeDasharray="6 6"
          strokeWidth="1.5"
          style={{ pathLength }}
        />
      </svg>

      {STEPS.map((step) => (
        <motion.section
          key={step.num}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          className={`${styles.step} ${styles[`align${step.align.charAt(0).toUpperCase()}${step.align.slice(1)}`]}`}
        >
          <div className={styles.stepInner}>
            <span className={`text-mask-number ${styles.maskNum}`}>{step.num}</span>

            {step.star && <div className="star-four-pointed" style={{ marginBottom: '4rem', transform: 'scale(1.5)' }} />}

            <h2 className={styles.stepTitle}>{step.title}</h2>
            <p className={styles.stepDesc}>{step.desc}</p>

            {step.cta && (
              <div className={styles.ctaRow}>
                <span className={styles.ctaText}>{step.cta}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            )}
          </div>
        </motion.section>
      ))}
    </div>
  );
};
