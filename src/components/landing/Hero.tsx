"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Hero.module.css";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// The categories listed in Handover
const HAIRSTYLES = [
  { id: "natural", label: "Natural Edge", src: "https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=2000&auto=format&fit=crop" },
  { id: "silk", label: "Silk Press", src: "https://images.unsplash.com/photo-1589255476380-4545b7fb6a02?q=80&w=2000&auto=format&fit=crop" },
  { id: "locs", label: "Locs", src: "https://images.unsplash.com/photo-1596550190729-23dc031cc20d?q=80&w=2000&auto=format&fit=crop" },
  { id: "braids", label: "Braids", src: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=2000&auto=format&fit=crop" },
  { id: "cuts", label: "Short Cuts", src: "https://images.unsplash.com/photo-1512407421160-b6f70cbac62a?q=80&w=2000&auto=format&fit=crop" },
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HAIRSTYLES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.backgroundContainer}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className={styles.backgroundImage}
          >
            <Image
              src={HAIRSTYLES[currentIndex].src}
              alt={HAIRSTYLES[currentIndex].label}
              fill
              priority
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className={styles.gradientOverlay} />
      
      <div className={styles.content}>
        <motion.h1 
          className={styles.headline}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Whatever your style is, <br />
          we have <AnimatePresence mode="wait">
            <motion.em
              key={HAIRSTYLES[currentIndex].id}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {HAIRSTYLES[currentIndex].label}
            </motion.em>
          </AnimatePresence>
        </motion.h1>
        
        <motion.p 
          className={styles.subtitle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          The premium destination for visual hair discovery and seamless booking. See every angle, find your perfect stylist, and step out feeling flawless.
        </motion.p>

        <motion.div 
          className={styles.actions}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/gallery" className="btn-primary">
            Explore All Styles
            <ArrowRight size={18} style={{ marginLeft: 8, display: "inline-block", verticalAlign: "middle" }} />
          </Link>
          <Link href="/auth/register" className="btn-secondary">
            Join the Waitlist
          </Link>
        </motion.div>
      </div>
      
      <div className={styles.styleIndicators}>
        {HAIRSTYLES.map((style, i) => (
          <div 
            key={style.id} 
            className={`${styles.indicator} ${i === currentIndex ? styles.active : ""}`}
            onClick={() => setCurrentIndex(i)}
          >
            <div className={styles.indicatorDot} />
            <span className={styles.indicatorText}>{style.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
