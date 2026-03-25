# MOTION ARCHIVE — Phase 4 Scroll Animations
**Status:** Safely stored. DO NOT DELETE. Re-apply in Phase 4 — Layer 3.

These motion specs were stripped during the Progressive Enhancement static pass.
Re-apply them after the visual design (colors, layout, typography) is fully approved.

---

## Section 1: HeroGalleryTransition (The 1+6 Orbital Engine)
**File:** `src/components/landing/HeroGalleryTransition.tsx`
**Container height:** `400vh` (sticky scroll timeline)

### Scroll Math
```
scrollYProgress → 0 to 1 over 400vh
```

**Center Node (Flicker Card):**
- `centerScale`: `[0, 0.4, 0.6, 0.85]` → `[1, 3.5, 3.5, 0]`
- `centerOpacity`: `[0.75, 0.85]` → `[1, 0]`

**Image Flicker (scroll-driven, NOT interval):**
- `flickerDriver`: progresses through frames `[0, 1, 2, 0, 1]` at scroll `[0, 0.05, 0.1, 0.15, 0.2]`

**Orbital Progress:**
- `orbitalProgress`: `[0, 0.3]` → `[0, 1]`

**6 Orbital Node Positions (start → end on scroll):**
| Node | startX | endX | startZ | endZ | rotY |
|---|---|---|---|---|---|
| 0 | -30vw | -120vw | -300 | -900 | -45 |
| 1 | 0 | 0 | -420 | -1000 | 0 |
| 2 | 30vw | 120vw | -300 | -900 | 45 |
| 3 | -26vw | -100vw | 100 | 450 | -30 |
| 4 | 0 | 0 | -420 | -1000 | 0 |
| 5 | 26vw | 100vw | 100 | 450 | 30 |

Nodes 1 and 4 also have Y translation: `[startY, endY]` = `[-20vh, -70vh]` and `[20vh, 70vh]`.

**Wrapper Fade-out:**
- `wrapperOpacity`: `[0.8, 0.95]` → `[1, 0]`

**Text Overlay Fade-out:**
- `textOpacity`: `[0, 0.15]` → `[1, 0]`
- `textY`: `[0, 0.15]` → `[0px, -50px]`

**Perspective:** `2000px` on `.stickyWrapper`
**Transform style:** `preserve-3d` on `.scene`

---

## Section 2: BookingFlow (Scroll-Path-Draw + Card Stagger)
**File:** `src/components/landing/BookingFlow.tsx`
**Scroll offset:** `['start center', 'end center']`

**SVG Path (animated):**
```svg
d="M50,0 C10,100 90,200 50,300 C10,400 90,500 50,600 C10,700 90,800 50,900 L50,1000"
```
- `pathLength` driven by `smoothProgress` (useSpring stiffness:100, damping:30)

**Card Animation (per card, staggered by idx):**
- `activateAt = (idx + 1) / 4` → [0.25, 0.5, 0.75, 1.0]
- `opacity`: `[activateAt - 0.25, activateAt]` → `[0.5, 1]`
- `y`: `[activateAt - 0.25, activateAt]` → `[20px, 0px]`
- `borderColor`: `rgba(255,255,255,0.1)` → `rgba(201,169,110,0.3)` (gold glow on scroll)

---

## Section 3: StoryReveal (Word-by-Word Opacity Cascade)
**File:** `src/components/landing/StoryReveal.tsx`
**Scroll offset:** `['start center', 'end end']`

**Story text:** `"You already know who you want to be. You can see her. The hair, the confidence, the walk. GlamGo brings her to life — from the stylist who truly understands your vision."`

**Per-word animation:**
- Each word mapped to a range `[i/total, (i+1)/total]`
- `opacity`: `[0.15, 1]` over that range
- Words `'GlamGo'` and `'vision.'` get `.goldHighlight` class

---

## Section 4: GalleryPreview (Horizontal Coverflow Scroll)
**File:** `src/components/landing/GalleryPreview.tsx`
**Scroll offset:** `['start 0.8', 'end 0.2']`

**Horizontal track:**
- `x`: `['0%', '-40%']` driven by smoothProgress
- Spring: stiffness:100, damping:30

**Per-card Coverflow (static, not scroll-driven):**
- `rotateY = (index - center) * 8` degrees
- `z = -Math.abs(offset) * 20`
- **Hover:** `{ rotateY: 0, z: 50, scale: 1.05 }` in `0.4s`

---

## Section 5: GalleryEntrance (Transition Gateway)
**Status:** Placeholder — not fully built yet. Build as Layer 3.
**Intent:** Scroll-driven entrance where "See the Possibilities" text fades in, then 6 images pop up from below as user scrolls from BookingFlow into GalleryPreview.

---
*Archive created: 2026-03-24. Restore these specs in the Layer 3 motion pass.*
