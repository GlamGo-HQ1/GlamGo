import { Hero } from "@/components/landing/Hero";
import { StoryReveal } from "@/components/landing/StoryReveal";
import { BookingFlow } from "@/components/landing/BookingFlow";
import { GalleryPreview } from "@/components/landing/GalleryPreview";
import { ValueProps } from "@/components/landing/ValueProps";

export default function LandingPage() {
  return (
    <>
      {/* 
        Section 1: The Hero (The Hook)
        B+A Hybrid: Zoom-Through Mask + High-Speed Portrait Crossfade 
      */}
      <Hero />
      
      {/* 
        Section 2: The Story Reveal
        Word-by-word scroll-scrub opacity reveal
      */}
      <StoryReveal />

      {/* 
        Section 3: The Booking Journey
        Self-drawing SVG line with staggered mockups 
      */}
      <BookingFlow />

      {/* 
        Section 4: The Gallery Sneak Peek
        Horizontal scrolling coverflow reel 
      */}
      <GalleryPreview />

      {/* 
        Section 5: The Closer (Value Props)
        Glassmorphic feature cards with staggered reveal
      */}
      <ValueProps />
    </>
  );
}
