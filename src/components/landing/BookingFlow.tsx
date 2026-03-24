'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
import styles from './BookingFlow.module.css';

const STEPS = [
  {
    num: "1",
    title: "Browse Styles",
    desc: "See every angle before you commit.",
    mockup: "Style Grid"
  },
  {
    num: "2",
    title: "Find Your Stylist",
    desc: "Verified stylists near you — salon or mobile.",
    mockup: "Map & Stylist Cards"
  },
  {
    num: "3",
    title: "Book Instantly",
    desc: "Pick your time. No back-and-forth.",
    mockup: "Calendar Picker"
  },
  {
    num: "4",
    title: "Pay Securely",
    desc: "Protected checkout. Pay when you're satisfied.",
    mockup: "Checkout Screen"
  }
];

export const BookingFlow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className={styles.bookingContainer}>
      
      <div className={styles.headingWrapper}>
        <h3 className={styles.subheading}>How It Works</h3>
        <h2 className={styles.heading}>The smoothest route to flawless hair.</h2>
      </div>

      {/* P2-4 FIX: SVG is now absolutely positioned OUTSIDE the grid, so it 
          doesn't interfere with nth-child selectors on the step cards. */}
      <div className={styles.timelineWrapper}>
        
        {/* The SVG Line (absolutely positioned, not in the grid) */}
        <div className={styles.svgWrapper}>
          <svg 
            className={styles.svgLine} 
            viewBox="0 0 100 1000" 
            preserveAspectRatio="none"
          >
            {/* Background dotted line */}
            <path 
              className={styles.pathBg}
              d="M50,0 C10,100 90,200 50,300 C10,400 90,500 50,600 C10,700 90,800 50,900 L50,1000"
              vectorEffect="non-scaling-stroke"
            />
            {/* P3-2 FIX: Dramatic snaking path that visibly curves left-to-right */}
            <motion.path 
              className={styles.pathDraw}
              d="M50,0 C10,100 90,200 50,300 C10,400 90,500 50,600 C10,700 90,800 50,900 L50,1000"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: smoothProgress }}
            />
          </svg>
        </div>

        {/* The Steps Grid (only card children, no SVG mixed in) */}
        <div className={styles.timelineGrid}>
          {STEPS.map((step, idx) => {
            const triggerPoint = (idx + 1) / STEPS.length;
            return (
              <Card 
                key={step.num}
                step={step}
                progress={smoothProgress}
                activateAt={triggerPoint}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};

const Card = ({ step, progress, activateAt }: { step: typeof STEPS[number]; progress: MotionValue<number>; activateAt: number }) => {
  const opacity = useTransform(progress, [activateAt - 0.25, activateAt], [0.5, 1]);
  const y = useTransform(progress, [activateAt - 0.25, activateAt], [20, 0]);
  const borderColor = useTransform(
    progress, 
    [activateAt - 0.25, activateAt], 
    ['rgba(255, 255, 255, 0.1)', 'rgba(201, 169, 110, 0.3)']
  );

  return (
    <motion.div 
      className={styles.stepCard}
      style={{ opacity, y, borderColor, borderWidth: 1, borderStyle: 'solid' }}
    >
      <div className={styles.stepNumber}>{step.num}</div>
      <h3 className={styles.stepTitle}>{step.title}</h3>
      <p className={styles.stepDesc}>{step.desc}</p>
      <div className={styles.mockupImage}>
        <span className={styles.mockupLabel}>{step.mockup}</span>
      </div>
    </motion.div>
  );
};
