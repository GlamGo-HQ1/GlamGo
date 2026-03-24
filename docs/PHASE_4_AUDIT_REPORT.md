# Phase 4 Landing Page — Comprehensive Audit Report

**Date:** March 24, 2026  
**Auditor:** Anti-Gravity Systems Review  
**Scope:** Full implementation audit of Phase 4 landing page against strategy documents, design system, and award-level quality standards  
**Status:** Pre-execution review — no changes made

---

## Executive Summary

| Metric | Score | Notes |
|--------|-------|-------|
| **Overall Readiness** | 74/100 | Solid foundation, not yet award-level |
| **Design Intent Alignment** | 8/10 | Vision is understood, execution gaps exist |
| **Execution Stability** | 6/10 | Build blockers and runtime errors present |
| **Motion/Animation Quality** | 6.5/10 | Architecture correct, key effects missing |
| **Spec Compliance** | 7/10 | Several deviations from documentation |

**Bottom Line:** The bones are correct. The section architecture matches the strategy. The visual instincts are strong. But there are **build blockers that must be fixed first**, followed by **critical visual bugs**, then **missing premium features** that separate "good" from "award-winning."

---

## Files Reviewed

### Strategy & Documentation
- `docs/PHASE_4_LANDING_STRATEGY.md` — Primary strategy document
- `docs/implementation_plan.md` — Build specifications
- `docs/LANDING_COPY.md` — Approved copywriting
- `docs/VISUAL_DIRECTION.md` — Design law and color system
- `docs/DESIGN_SYSTEM.md` — Token definitions
- `docs/DESIGN_REFERENCES.md` — Reference websites and techniques

### Implementation Files
- `src/app/page.tsx` — Landing page composition
- `src/app/layout.tsx` — Root layout with providers
- `src/app/globals.css` — Global styles and design tokens
- `src/components/landing/Hero.tsx` + `Hero.module.css`
- `src/components/landing/StoryReveal.tsx` + `StoryReveal.module.css`
- `src/components/landing/BookingFlow.tsx` + `BookingFlow.module.css`
- `src/components/landing/GalleryPreview.tsx` + `GalleryPreview.module.css`
- `src/components/landing/ValueProps.tsx` + `ValueProps.module.css`
- `src/components/layout/SmoothScroll.tsx`
- `src/components/layout/Navbar.tsx`

---

## Priority Classification

| Priority | Definition | Action Required |
|----------|------------|-----------------|
| **P0** | Build blocker — code will not compile | Fix immediately |
| **P1** | Runtime error — feature crashes or 404s | Fix before any testing |
| **P2** | Visual bug — breaks the intended effect | Fix before placeholder replacement |
| **P3** | Missing feature — spec calls for it, not implemented | Fix for award-level quality |
| **P4** | Polish/best practice — improves quality and professionalism | Fix if time permits |

---

## P0 — Build Blockers

These must be fixed first. Nothing else matters if the build fails.

### P0-1: Framer Motion TypeScript Typing Issue
**File:** `src/components/landing/ValueProps.tsx`  
**Issue:** There is a TypeScript compilation error related to Framer Motion typings. The `variants` prop or animation configuration may have type mismatches with TypeScript 6.0.2.  
**Action:** Check the exact error with `npm run build`, then fix the typing. May require explicit type annotations on variant objects or updating Framer Motion types.

### P0-2: Missing Export — `logout` Function
**File:** `src/components/layout/Navbar.tsx` imports `logout`  
**Source:** `src/app/auth/actions.ts`  
**Issue:** The `logout` function is imported in Navbar but not exported from the auth actions file. This will cause a build failure.  
**Action:** Either export `logout` from `src/app/auth/actions.ts`, or remove the import and logout button from Navbar if auth is not yet implemented.

---

## P1 — Runtime Errors

These will cause crashes or broken navigation after the build succeeds.

### P1-1: Missing Route — `/gallery`
**File:** `src/components/layout/Navbar.tsx`  
**Issue:** Navbar contains a link to `/gallery`, but this route does not exist in the `src/app/` directory. Clicking it will show a 404 page.  
**Action:** Either create `src/app/gallery/page.tsx` as a placeholder, or change the Navbar link to `/#gallery` (anchor link to the Gallery Preview section), or remove the link entirely for now.

### P1-2: Missing CSS Token — `--space-32`
**File:** `src/components/landing/ValueProps.module.css`  
**Issue:** The CSS uses `var(--space-32)` for bottom padding, but this token is not defined in `globals.css`. The spacing scale stops at `--space-20` (80px).  
**Action:** Either add `--space-32: 128px;` to the `:root` block in `globals.css`, or change the value to use an existing token like `--space-20`.

---

## P2 — Critical Visual Bugs

These break the intended visual experience and must be fixed before replacing placeholders with real content.

### P2-1: Duplicate Header/Navbar Collision
**Files:** `src/app/layout.tsx`, `src/components/landing/Hero.tsx`  
**Issue:** The root layout renders a global `<Navbar>` component with the GlamGo logo and navigation. But the Hero component ALSO renders its own header row with a logo (`GlamGo.`) and a "Book Now" button. On page load, users will see TWO headers stacked.  
**Visual Impact:** Breaks the premium first impression. Looks like a bug.  
**Action Options:**
1. **Option A (Recommended):** Make the global Navbar transparent/hidden on the landing page, and let Hero's built-in header be the only visible one. Use a prop or route check.
2. **Option B:** Remove Hero's internal header entirely and rely on the global Navbar.
3. **Option C:** Merge them — make the global Navbar the scroll-aware version that fades with the Hero.

### P2-2: Hero Zoom-Mask Overflow Clipping
**Files:** `src/components/landing/Hero.tsx`, `Hero.module.css`  
**Issue:** The intended effect is for the center portrait to scale up (7x) and act as a "portal" that consumes the screen as the user scrolls — creating a zoom-through tunnel effect. However, `.stickyWrapper` has `overflow: hidden`, which clips the scaled image to the viewport bounds. The image scales but never visually expands beyond its container.  
**Visual Impact:** The zoom-through "Obsidian Assembly" effect is degraded. The image gets bigger inside its box but doesn't create the immersive tunnel feeling.  
**Severity Clarification:** This is not "fully broken" — the image still scales and the crossfade still works. But the signature "zoom into the image" moment is significantly weakened.  
**Action:** Change `.stickyWrapper` to `overflow: visible`, OR refactor the zoom effect to use `clip-path: inset()` animation instead of scale transform, which gives more control over the reveal boundaries.

### P2-3: Hero Crossfade Timer Runs Forever
**File:** `src/components/landing/Hero.tsx`  
**Issue:** The `setInterval` that cycles through hairstyle images (every 800ms) runs indefinitely, even after the user has scrolled past the Hero into Section 2. This causes unnecessary React re-renders, DOM node creation/destruction via AnimatePresence, and repaints on an off-screen section.  
**Performance Impact:** Wastes CPU/GPU cycles. Could cause jank on lower-end devices.  
**Action:** Add a scroll-progress check to pause the interval when `scrollYProgress > 0.9`, or use an IntersectionObserver to pause when Hero leaves the viewport entirely.

### P2-4: BookingFlow CSS Grid Child Count Bug
**File:** `src/components/landing/BookingFlow.module.css`  
**Issue:** The CSS uses `:nth-child(odd)` and `:nth-child(even)` selectors to alternate step cards between left and right columns on desktop. However, the `.svgWrapper` div is also a child of `.timelineGrid`, which throws off the count. The first "odd" child is actually the SVG wrapper, not a step card.  
**Visual Impact:** Desktop layout will be misaligned — cards won't alternate correctly.  
**Action:** Either move the SVG wrapper outside the grid (position it absolutely relative to the container), or use a more specific selector like `.stepCard:nth-of-type(odd)` instead of `:nth-child(odd)`.

---

## P3 — Missing Features

These are explicitly specified in the strategy documents but not implemented. Required for award-level quality.

### P3-1: Gallery Missing 3D Coverflow Effect
**File:** `src/components/landing/GalleryPreview.tsx`, `GalleryPreview.module.css`  
**Spec Reference:** `implementation_plan.md` — "3D Coverflow effect"  
**Issue:** The CSS declares `perspective: 1000px` on the wrapper and `transform-style: preserve-3d` on the track, but no actual `rotateY` transform is applied to individual cards. The gallery is a flat horizontal scroll with no depth or curve.  
**Expected Behavior:** Cards should rotate on the Y-axis based on their distance from the viewport center — cards on the left rotate slightly right, cards on the right rotate slightly left, creating a curved "coverflow" appearance like iTunes album art.  
**Action:** Calculate each card's distance from viewport center using `useMotionValue` and `useTransform`, then apply a `rotateY` value (e.g., -15deg to +15deg) based on that distance.

### P3-2: Booking SVG Path Too Simple
**File:** `src/components/landing/BookingFlow.tsx`  
**Spec Reference:** `PHASE_4_LANDING_STRATEGY.md` — "Self-drawing gold SVG path" inspired by GetQuoti  
**Issue:** The current SVG path `M50,0 Q80,250 50,500 T50,1000` is a single vertical S-curve that only moves between x=20 and x=80 within a viewBox of 100 units. On a 1200px container, this wiggle is nearly imperceptible — it looks like a straight vertical line.  
**Expected Behavior:** The path should dramatically snake from left column to right column and back, weaving between the step cards with organic curves.  
**Action:** Redesign the path to span the full width (x=10 to x=90) with multiple dramatic curves. Consider making it responsive — simpler path on mobile, dramatic snake on desktop.

### P3-3: Missing Style Labels in Hero Crossfade
**File:** `src/components/landing/Hero.tsx`  
**Spec Reference:** `LANDING_COPY.md` — "Crossfade labels: Natural · Silk Press · Locs · Braids · Short Cuts · Twists"  
**Issue:** The portrait images crossfade correctly, but there is no visible label showing which hairstyle is currently displayed. The Apple AirPods reference shows the color name updating as the product color changes.  
**Expected Behavior:** A text label (e.g., "Natural", "Silk Press") should appear and crossfade in sync with the portrait images, showing users what style they're looking at.  
**Action:** Add a text element that displays `HERO_STYLES[currentStyleIndex].name` with the same AnimatePresence crossfade animation as the images.

### P3-4: StoryReveal Uses Wrong Font
**Files:** `src/components/landing/StoryReveal.tsx`, `StoryReveal.module.css`  
**Spec Reference:** `PHASE_4_LANDING_STRATEGY.md` — implies body copy uses DM Sans  
**Issue:** The CSS uses `font-family: var(--font-display)` (Playfair Display, a serif) for the story text. The design system reserves Playfair for headlines, while body/narrative text should use DM Sans for contrast and readability.  
**Action:** Change `.storyText` font-family to `var(--font-body)`.

### P3-5: No Ken Burns Animation on Gallery Images
**File:** `src/components/landing/GalleryPreview.tsx`, `GalleryPreview.module.css`  
**Spec Reference:** `VISUAL_DIRECTION.md` — "Ken Burns motion on gallery images", `DESIGN_SYSTEM.md` — "Ken Burns: 6000ms"  
**Issue:** Gallery card images have a simple `scale(1.05)` on hover, but no Ken Burns effect (slow continuous zoom/pan that gives images a cinematic, living quality).  
**Expected Behavior:** Images should have a subtle, slow zoom animation running continuously (not just on hover), creating the "breathing" effect seen on luxury editorial sites.  
**Action:** Add a CSS animation or Framer Motion animation that slowly scales images from 1.0 to 1.05 over 6 seconds, alternating with a slight position shift.

### P3-6: Gallery Scroll Range Too Aggressive
**File:** `src/components/landing/GalleryPreview.tsx`  
**Issue:** The horizontal scroll is mapped to `offset: ['start end', 'end start']`, meaning the gallery starts moving as soon as any part enters the viewport and continues until it fully leaves. This causes the gallery to animate while barely visible.  
**Expected Behavior:** The scroll-to-horizontal-movement should only activate when the section is meaningfully in view.  
**Action:** Tighten the offset to something like `['start 0.8', 'end 0.2']` so the animation happens while the section is prominently visible.

### P3-7: Story Section Scroll Distance Too Short
**File:** `src/components/landing/StoryReveal.module.css`  
**Issue:** The container is `min-height: 150vh`, which may feel rushed for the word-by-word reveal. Reference implementations (Nikola Radeski) use longer scroll distances for a more luxurious, contemplative pace.  
**Action:** Consider increasing to `200vh` or `250vh` and test the feel.

---

## P4 — Polish & Best Practices

These improve quality and professionalism but are lower priority than functional fixes.

### P4-1: Use `next/image` Instead of `<img>`
**Files:** `Hero.tsx`, `GalleryPreview.tsx`  
**Issue:** Raw `<img>` tags are used for all images. Next.js provides an optimized `<Image>` component that handles lazy loading, responsive sizing, and format optimization automatically.  
**Impact:** Affects Lighthouse performance scores (LCP), which judges may check. Also a signal of Next.js best practices.  
**Action:** Replace `<img>` with `next/image` for all images. Use `fill` prop with `object-fit: cover` for the current layout patterns.

### P4-2: Add Reduced-Motion Support
**Files:** All animation components  
**Issue:** No `prefers-reduced-motion` media query handling. Users with vestibular disorders or motion sensitivity preferences set in their OS will experience all animations at full intensity.  
**Impact:** Accessibility gap. Also a quality signal for judges who check a11y.  
**Action:** Add a CSS media query or React hook that checks `prefers-reduced-motion: reduce` and disables or minimizes animations for those users.

### P4-3: Missing Film Grain Overlay
**Spec Reference:** `VISUAL_DIRECTION.md` — "Film grain overlay (3% opacity)"  
**Issue:** The cinematic film grain texture is not implemented. This is a subtle but important detail for the "dark luxury editorial" aesthetic.  
**Action:** Add a global overlay div with a film grain texture (SVG noise filter or PNG texture) at 3% opacity, positioned fixed over the entire page with `pointer-events: none`.

### P4-4: Clean Up Unused Imports
**File:** `src/components/landing/GalleryPreview.tsx`  
**Issue:** `useState`, `useEffect`, and `useMotionValue` are imported but never used. This is sloppy for a hackathon submission where judges may review code.  
**Action:** Remove unused imports.

### P4-5: Update Lenis Package
**File:** `package.json`  
**Issue:** Using `@studio-freight/react-lenis` v0.0.47, which is an older package name. The library has been renamed to `lenis` with `@studio-freight/lenis` deprecated.  
**Impact:** May see deprecation warnings. Future maintenance concern.  
**Action:** Consider updating to `lenis/react` if time permits, but this is low priority.

### P4-6: Misleading Grab Cursor on Gallery
**File:** `GalleryPreview.module.css`  
**Issue:** The gallery track has `cursor: grab` and `cursor: grabbing` on active, implying drag-to-scroll functionality. But no drag interaction is implemented — the gallery only moves via vertical scroll.  
**Impact:** Misleading UX affordance.  
**Action:** Either implement drag-to-scroll with Framer Motion's `useDragControls`, or remove the grab cursor styling.

---

## What's Working Well

Credit where due — these elements are solid and should be preserved:

1. **Section architecture is correct** — The 5-section flow (Hero → Story → Booking → Gallery → ValueProps) matches the strategy exactly.

2. **Lenis smooth scroll configuration** — `lerp: 0.08, duration: 1.2` creates the heavy, editorial scroll feel specified. This is tuned correctly.

3. **Hero parallax math is sound** — The scroll offsets, transform ranges, and layer timing are reasonable. The flanking image drift, background text scale, and foreground fade all have correct relative timing.

4. **StoryReveal word-splitting logic is elegant** — The per-word `useTransform` binding to scroll progress is the correct architectural approach. The gold highlight on "GlamGo" and "vision." is a nice touch.

5. **ValueProps is the most polished section** — Staggered reveal animation, glassmorphic cards with proper `backdrop-filter`, good Lucide icon usage, responsive grid. This section is closest to production quality.

6. **Design token discipline** — CSS consistently uses global variables (`--bg-primary`, `--accent-primary`, `--space-8`, etc.) with no hardcoded values outside the token system. This is professional.

7. **Strong visual instincts** — The builder clearly understands the "dark luxury editorial" vision. The taste is there; the execution just needs tightening.

---

## Execution Order

### Phase A: Unblock the Build (Do First)
1. Fix P0-1: Framer Motion typing issue
2. Fix P0-2: Export `logout` or remove import
3. Fix P1-1: Add `/gallery` route or fix link
4. Fix P1-2: Add `--space-32` token

### Phase B: Fix Visual Bugs (Do Second)
5. Fix P2-1: Resolve navbar duplication
6. Fix P2-2: Refine Hero overflow/zoom-mask
7. Fix P2-3: Pause crossfade timer when off-screen
8. Fix P2-4: Fix BookingFlow grid selectors

### Phase C: Add Missing Features (Do Third)
9. Fix P3-1: Implement Gallery 3D Coverflow
10. Fix P3-2: Redesign Booking SVG path
11. Fix P3-3: Add Hero style labels
12. Fix P3-4: Change StoryReveal to DM Sans
13. Fix P3-5: Add Ken Burns to Gallery
14. Fix P3-6: Tighten Gallery scroll range
15. Fix P3-7: Increase StoryReveal height

### Phase D: Polish (If Time Permits)
16. Fix P4-1: Migrate to `next/image`
17. Fix P4-2: Add reduced-motion support
18. Fix P4-3: Add film grain overlay
19. Fix P4-4: Remove unused imports
20. Fix P4-5: Update Lenis package
21. Fix P4-6: Fix or remove grab cursor

---

## Reference Files for Implementation

When fixing these issues, refer to:

| Document | Purpose |
|----------|---------|
| `docs/PHASE_4_LANDING_STRATEGY.md` | Section-by-section requirements and reference sites |
| `docs/VISUAL_DIRECTION.md` | Color system, typography, motion language |
| `docs/DESIGN_SYSTEM.md` | Token definitions, component patterns, motion presets |
| `docs/LANDING_COPY.md` | Exact text content for each section |
| `docs/DESIGN_REFERENCES.md` | Visual references (Obsidian, GetQuoti, Fabletics, etc.) |

---

## Final Notes

The current implementation is **75% of the way to award-level quality**. The architecture is correct, the vision is understood, and the visual taste is strong. What's missing is:

1. **Build stability** — P0/P1 issues must be resolved first
2. **Effect fidelity** — The signature moments (zoom-mask, coverflow, SVG path) need refinement
3. **Spec compliance** — Small deviations from the documented design (fonts, labels, tokens)
4. **Polish details** — Film grain, Ken Burns, reduced-motion

The risk is not creativity — the risk is execution reliability. Fix the blockers, tighten the effects, and this landing page can absolutely hit the premium standard required.

---

**End of Audit Report**
