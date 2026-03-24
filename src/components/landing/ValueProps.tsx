'use client';

import { motion } from 'framer-motion';
import { Focus, ShieldCheck, MapPin, Lock } from 'lucide-react';
import styles from './ValueProps.module.css';

const PROPS = [
  {
    icon: <Focus size={28} strokeWidth={1.5} />,
    title: 'See Every Angle',
    desc: '360° views and high-res video galleries so you know exactly what you’re getting before you book.'
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    title: 'Verified Stylists',
    desc: 'Every artist on GlamGo passes a rigorous vetting process. Real reviews from real clients only.'
  },
  {
    icon: <MapPin size={28} strokeWidth={1.5} />,
    title: 'Salon or Home',
    desc: 'Step into a luxury salon environment or request a mobile stylist to your living room. Your call.'
  },
  {
    icon: <Lock size={28} strokeWidth={1.5} />,
    title: 'Secure Payments',
    desc: 'Powered by Interswitch. Your funds are held securely and only released when you are fully satisfied.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const ValueProps = () => {
  return (
    <section className={styles.valuePropsContainer}>
      
      {/* Subtle background glow */}
      <div className={styles.bgGlow} />

      <div className={styles.contentWrapper}>
        <div className={styles.headingWrapper}>
          <h2 className={styles.heading}>The GlamGo Standard</h2>
          <p className={styles.subheading}>
            We handle the uncertainty, so you can focus on the result.
          </p>
        </div>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {PROPS.map((prop, index) => (
            <motion.div 
              key={index} 
              className={styles.card}
              variants={cardVariants}
            >
              <div className={styles.iconWrapper}>
                {prop.icon}
              </div>
              <h3 className={styles.cardTitle}>{prop.title}</h3>
              <p className={styles.cardDesc}>{prop.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};
