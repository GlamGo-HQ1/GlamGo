import { HeroEditorial } from "@/components/landing/HeroEditorial";
import { StoryReveal } from "@/components/landing/StoryReveal";
import { EditorialGrid } from "@/components/landing/EditorialGrid";
import { BookingFlow } from "@/components/landing/BookingFlow";
import { GalleryPreview } from "@/components/landing/GalleryPreview";
import { CommissionCTA } from "@/components/landing/CommissionCTA";
import { MobileBottomNav } from "@/components/landing/MobileBottomNav";

export default function LandingPage() {
  return (
    <>
      {/* S1: Hero — The Art of the Crown */}
      <HeroEditorial />

      {/* S2: Story — Every Crown Has a Story */}
      <StoryReveal />

      {/* S3: Editorial Mosaic Grid */}
      <EditorialGrid />

      {/* S4: Booking Flow — 4 Full-Viewport Steps */}
      <BookingFlow />

      {/* S5: Gallery — The Curator's Choice */}
      <GalleryPreview />

      {/* S6: CTA — Commission Your Vision */}
      <CommissionCTA />

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />
    </>
  );
}
