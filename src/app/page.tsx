import { Hero } from "@/components/landing/Hero";

export default function LandingPage() {
  return (
    <>
      {/* 
        Section 1: Hero (The Style Switcher)
        Crossfading portraits highlighting "Whatever your style is, we have it"
      */}
      <Hero />
      
      {/* 
        Additional sections to come:
        - Section 2: Scroll-Scrub Text Reveal (The Story)
        - Section 3: The 360 Feature Video Section
        - Section 4: The Curved Reel Carousel
        - Section 5: Logistics & Booking / App Preview Waitlist (Overlapping 3 videos effect)
        - Section 6: Feature Cards 
      */}
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>More sections loading...</p>
      </div>
    </>
  );
}
