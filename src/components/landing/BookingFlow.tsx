'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from './BookingFlow.module.css';

const STEPS = [
  {
    num: "1",
    title: "Browse Styles",
    desc: "See every angle before you commit.",
    mockup: "Fake UI: Style Grid"
  },
  {
    num: "2",
    title: "Find Your Stylist",
    desc: "Verified stylists near you — salon or mobile.",
    mockup: "Fake UI: Map & Stylist Cards"
  },
  {
    num: "3",
    title: "Book Instantly",
    desc: "Pick your time. No back-and-forth.",
    mockup: "Fake UI: Calendar Picker"
  },
  {
    num: "4",
    title: "Pay Securely",
    desc: "Protected checkout. Pay when you're satisfied.",
    mockup: "Fake UI: Checkout Screen"
  }
];

export const BookingFlow = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll through the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  // Smooth out the drawing animation so it doesn't jerk if user stops scrolling abruptly
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

      <div className={styles.timelineGrid}>
        
        {/* The SVG Line that draws itself */}
        <div className={styles.svgWrapper}>
          <svg 
            className={styles.svgLine} 
            viewBox="0 0 100 1000" 
            preserveAspectRatio="none"
          >
            {/* Background dotted line */}
            <path 
              className={styles.pathBg}
              d="M50,0 Q80,250 50,500 T50,1000" 
              vectorEffect="non-scaling-stroke"
            />
            {/* The actual drawing "gold" line */}
            <motion.path 
              className={styles.pathDraw}
              d="M50,0 Q80,250 50,500 T50,1000" 
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: smoothProgress }}
            />
          </svg>
        </div>

        {/* The Steps */}
        {STEPS.map((step, idx) => {
          // Since there are 4 steps, each "activates" roughly at 0.25, 0.5, 0.75, 1
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
    </section>
  );
};

// Sub-component to handle card highlight state based on scroll
const Card = ({ step, progress, activateAt }: any) => {
  // If scroll progress is close to or past this card's trigger point, it becomes active
  // We use useTransform to create a boolean 1 or 0 essentially, then apply class
  // Since framer-motion values are live, we can just use a motion.div to react to the raw progress 
  // or use state, but binding style is more performant.
  
  // We want opacity [0.5 -> 1] as progress reaches [activateAt - 0.2, activateAt]
  const opacity = useTransform(progress, [activateAt - 0.25, activateAt], [0.5, 1]);
  const y = useTransform(progress, [activateAt - 0.25, activateAt], [0, -8]);
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
        {step.mockup}
      </div>
    </motion.div>
  );
};
