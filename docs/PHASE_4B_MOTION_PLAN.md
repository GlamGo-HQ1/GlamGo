# Phase 4B: Motion & Interactions Implementation Plan

**Status:** Ready for implementation  
**Prerequisites:** Phase 4A (static editorial design) COMPLETE  
**Dependencies:** `framer-motion@12.38.0`, `@studio-freight/react-lenis@0.0.47` (both installed)

---

## Overview

Phase 4B adds scroll-driven animations to the static landing page components. The goal is subtle, editorial-quality motion that enhances the luxury aesthetic without overwhelming it.

**Design Principle:** Motion should feel like turning pages in a high-end magazine — deliberate, smooth, and purposeful.

---

## Implementation Order (Complexity: Low → High)

| Step | Component | Complexity | Est. Time |
|------|-----------|------------|-----------|
| 1 | StoryReveal — fade-in on scroll | Low | 15 min |
| 2 | HeroEditorial — parallax + text entrance | Low | 20 min |
| 3 | GalleryPreview — card hover effects | Low | 15 min |
| 4 | BookingFlow — SVG path draw + card stagger | Medium | 30 min |
| 5 | GalleryPreview — horizontal scroll track | Medium | 25 min |
| 6 | CommissionCTA — entrance animation | Low | 10 min |

**Total estimated time:** ~2 hours

---

## Step 1: StoryReveal — Fade-In on Scroll

**File:** `src/components/landing/StoryReveal.tsx`

### What to build
- Section fades in as it enters viewport
- Text elements stagger in with slight Y offset
- Gold text ("Has a Story") has delayed entrance

### Implementation
```tsx
"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
```

**Animations:**
- Container: `opacity: 0 → 1`, `y: 40 → 0` over 0.8s
- Title lines: stagger 0.15s delay each
- Body text: 0.4s delay after titles

### Reduced motion
- Wrap in `@media (prefers-reduced-motion: no-preference)` check
- Fallback: instant visibility, no transforms

---

## Step 2: HeroEditorial — Parallax + Text Entrance

**File:** `src/components/landing/HeroEditorial.tsx`

### What to build
- Background image parallax (subtle, 10-15% speed difference)
- Text content fades in on page load (not scroll)
- Scroll indicator pulses gently

### Implementation
```tsx
import { motion, useScroll, useTransform } from "framer-motion";
```

**Animations:**
- Background: `translateY: 0 → -15%` as page scrolls down (parallax)
- Heading: fade in + slide up on mount (0.6s, stagger each line 0.1s)
- CTA buttons: fade in after heading (0.3s delay)
- Scroll indicator: subtle pulse animation (CSS keyframes, infinite)

### Reduced motion
- Disable parallax
- Instant text visibility

---

## Step 3: GalleryPreview — Card Hover Effects

**File:** `src/components/landing/GalleryPreview.tsx`

### What to build
- Exhibit cards lift on hover (scale + shadow)
- Image reveals color on hover (grayscale → color)
- "Explore Piece" text slides in

### Implementation
```tsx
import { motion } from "framer-motion";
```

**Animations:**
- Card hover: `scale: 1 → 1.02`, `y: 0 → -8px` over 0.3s ease-out
- Image: `grayscale(1) → grayscale(0)` on hover
- Explore text: `opacity: 0.6 → 1`, `x: -4 → 0`

### Reduced motion
- No scale/translate transforms
- Keep color transition (accessibility-safe)

---

## Step 4: BookingFlow — SVG Path Draw + Card Stagger

**File:** `src/components/landing/BookingFlow.tsx`

### What to build
- Gold SVG path draws as user scrolls through section
- Step cards fade in and slide up as their portion of path completes
- Numbers have subtle glow pulse when active

### Implementation (from MOTION_ARCHIVE.md)
```tsx
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
```

**SVG Path Animation:**
- Track scroll progress through 4000px container
- `pathLength`: `0 → 1` driven by `scrollYProgress`
- Use `useSpring({ stiffness: 100, damping: 30 })` for smoothness

**Card Stagger:**
- Card 1 activates at 25% scroll
- Card 2 activates at 50% scroll
- Card 3 activates at 75% scroll
- Card 4 activates at 100% scroll

Each card:
- `opacity: 0.5 → 1`
- `y: 20px → 0`
- Border glow: `rgba(255,255,255,0.1) → rgba(201,169,110,0.3)`

### Reduced motion
- Path visible immediately (no draw animation)
- Cards visible immediately

---

## Step 5: GalleryPreview — Horizontal Scroll Track (Optional)

**File:** `src/components/landing/GalleryPreview.tsx`

### What to build
- Exhibit section scrolls horizontally as user scrolls vertically
- Creates "coverflow" gallery effect

### Implementation (from MOTION_ARCHIVE.md)
```tsx
import { useScroll, useTransform, useSpring } from "framer-motion";
```

**Track Animation:**
- Scroll offset: `['start 0.8', 'end 0.2']`
- `x`: `['0%', '-40%']` driven by smoothProgress
- Spring: `stiffness: 100, damping: 30`

### Consideration
This is more complex and may conflict with the current grid layout. **Evaluate after Steps 1-4 are complete.** May skip if current static layout looks better.

---

## Step 6: CommissionCTA — Entrance Animation

**File:** `src/components/landing/CommissionCTA.tsx`

### What to build
- Section fades in on scroll
- "Commission Your Vision" text has subtle entrance
- CTA button has hover glow effect

### Implementation
```tsx
import { motion, useInView } from "framer-motion";
```

**Animations:**
- Container: `opacity: 0 → 1` over 0.6s when in view
- Button hover: gold glow intensifies

---

## Shared Utilities

Create a shared motion config file for consistency:

**File:** `src/lib/motion.ts`

```typescript
// Shared animation configs for Phase 4B

export const MOTION_CONFIG = {
  // Reduced motion check
  prefersReducedMotion: typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false,

  // Standard easings
  easeOut: [0.16, 1, 0.3, 1],
  easeInOut: [0.65, 0, 0.35, 1],

  // Durations
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,

  // Spring configs
  smooth: { stiffness: 100, damping: 30 },
  snappy: { stiffness: 300, damping: 30 },
};

export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
```

---

## Testing Checklist

After each step:
- [ ] `npm run build` passes
- [ ] No hydration errors in dev console
- [ ] Animation smooth at 60fps (check Performance tab)
- [ ] `prefers-reduced-motion` fallback works
- [ ] Mobile touch scrolling still smooth (Lenis integration)

---

## Commit Strategy

One commit per step:
1. `feat(landing): add scroll fade animation to StoryReveal`
2. `feat(landing): add parallax and entrance animations to HeroEditorial`
3. `feat(landing): add hover effects to GalleryPreview cards`
4. `feat(landing): add SVG path draw and card stagger to BookingFlow`
5. `feat(landing): add horizontal scroll to GalleryPreview` (if implemented)
6. `feat(landing): add entrance animation to CommissionCTA`

Final:
7. `feat(landing): add shared motion utilities`

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/lib/motion.ts` | NEW — shared motion config |
| `src/components/landing/StoryReveal.tsx` | Add scroll-triggered fade |
| `src/components/landing/HeroEditorial.tsx` | Add parallax + entrance |
| `src/components/landing/GalleryPreview.tsx` | Add hover + optional horizontal scroll |
| `src/components/landing/BookingFlow.tsx` | Add path draw + card stagger |
| `src/components/landing/CommissionCTA.tsx` | Add entrance animation |

---

## Decision Log

| Decision | Rationale |
|----------|-----------|
| Skip HeroGalleryTransition (1+6 orbital) | Stitch design uses single hero image, not 7-image orbital. Archive spec preserved but not applicable. |
| Start with simple fades | Build confidence with low-complexity animations before tackling scroll-driven path |
| Use Framer Motion exclusively | Already installed, well-documented, handles SSR hydration correctly |
| Keep Lenis for smooth scroll | Already integrated in layout, provides smooth wheel behavior |

---

*Plan created: 2026-03-25*  
*Ready to begin Step 1: StoryReveal*
