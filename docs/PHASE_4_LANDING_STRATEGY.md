# 🚀 Phase 4: Landing Page Strategy & Synthesis

> **Written by:** Anti-Gravity
> **Date:** 2026-03-24
> **Status:** ✅ APPROVED — Hero: B+A Hybrid. Waitlist: Cut. Booking SVG: Yes. Building now.

---

## What I Scraped & Observed

I visually browsed all 4 of your reference websites. Here is what I pulled from each:

### 1. Obsidian Assembly (`obsidianassembly.com`)

- **The Hero Composition:** On load, you see massive serif typography ("Nothing Shown First") layered BEHIND a 3D obsidian rock centerpiece. Two floating image panels (luxury interiors) flank the rock on both sides, tilted at slight angles. The warm beige/earthy background gives a gallery feel.
- **The Scroll-Zoom Transition (THE KEY EFFECT):** As you scroll, three things happen simultaneously:
  1. The rock **scales up dramatically** — growing from center-screen to consuming the entire viewport.
  2. The background text ("Nothing Shown First") **also scales up** until the letters are so large they become abstract shapes, then disappear off-screen.
  3. The flanking image panels move at a **different speed** (parallax) — they drift apart and fade as the rock consumes the center.
  4. The rock eventually becomes so large it acts as a **dark mask** that swallows the warm beige hero and transitions into a **pure black background** ("Explore Places / Not Everything") — a completely different section with a dark gallery slider.
- **The Scroll Weight:** Extremely heavy, buttery-smooth scroll (GSAP ScrollSmoother or Lenis). Nothing snaps. Everything has physical inertia and deceleration.
- **The Multi-Layer Depth:** At least 4 parallax layers moving at different speeds: background text → rock → flanking images → foreground UI (nav, buttons).
- **What we take:** The zoom-mask transition concept (a central element scaling up to consume the screen and reveal a new section), the heavy scroll weight, and the multi-layer parallax depth. This directly informs Hero Option B below.

### 2. Tiwis (`tiwis.fr/en`)

- **The Zoom Effect:** This is what you described — as you scroll toward a word or section, it scales UP (zooms in). When you scroll past it, it scales back DOWN. It creates a "passing through" feeling.
- **The Technical Implementation:** They use GSAP ScrollTrigger with CSS `clipPath: inset()` animations. Images start cropped (30% inset) and expand to full frame as they enter viewport.
- **The Flow:** Sections don't just appear and stack. They emerge, breathe, and recede as you move through them.
- **What we take:** The zoom/scale-on-proximity effect for our headline or brand name. As you scroll into the hero area, "GlamGo" or the headline physically grows, then settles.

### 3. GetQuoti (`getquoti.ai`)

- **The Booking Flow:** This is the KEY find. They have a section on a vibrant purple background with a **thick, white, organic SVG path** that "snakes" left-to-right, then right-to-left through 4 booking steps. The line DRAWS ITSELF as you scroll, connecting each step visually.
- **The 4 Steps:** Find booking link → Get instant pricing → Book into schedule → Show up ready to work. Each step has a phone/interface mockup beside it.
- **The Technique:** The line is an SVG `stroke-dasharray` + `stroke-dashoffset` animation triggered by scroll position. No videos needed — it's pure CSS/SVG animation with static mockup images.
- **What we take:** This exact pattern for our booking/logistics section. We do NOT need videos. We use a self-drawing SVG path line that snakes through our own GlamGo booking steps, with small static UI mockups at each stop.

### 4. Fourmula (`fourmula.ai`)

- **The Asymmetric Grid:** Multiple media elements (images and short auto-playing videos) floating at different sizes with parallax depth. They aren't locked to a grid — they feel "scattered" but intentionally composed.
- **The Direction Line:** A thin, persistent vertical white line runs through the center of their "How It Works" section. Background colors change dramatically at each step (orange → teal → purple → red) but the line stays constant — the "thread" connecting the journey.
- **The Steps Section:** Uses sticky positioning — the left side stays fixed while the right side scrolls through feature cards.
- **What we take:** The asymmetric floating media concept for the gallery preview section. Also, the direction-line concept reinforces the Quoti approach — both sites prove that an animated path/line is the right way to show a process flow.

---

## The Synthesized Landing Page: Section by Section

Here is the proposed flow from top to bottom. Every section maps to a reference.

### Section 1: THE HERO — "The Zoom-Through Reveal" (B+A Hybrid) ✅

*Inspired by: Obsidian Assembly zoom-mask + Apple AirPods Max color cycling*

**The Concept:** Two animation systems layered together — scroll controls the zoom, a timer controls the crossfade.

- You land on a dark section (#0A0A0F). The screen shows three layers:
  - **Background layer:** Massive Playfair Display serif text — "YOUR HAIR" — filling 70% of the viewport in muted off-white at 20% opacity.
  - **Center layer:** A large, beautifully framed portrait, positioned center-screen. Two smaller flanking images (different hairstyles) sit tilted on each side.
  - **Foreground layer:** A small tagline ("Your Way") and the GlamGo logo.
- **The Scroll Animation (from Option B):** As you scroll down, all three layers react at different speeds (parallax):
  1. The background text **scales up** dramatically — letters become abstract shapes and drift off-screen.
  2. The center portrait **scales up** — growing until it fills the entire viewport, acting as a natural mask/transition.
  3. The flanking images drift apart and fade.
  4. Once the center image has consumed the screen, it dissolves into the dark background of Section 2.
- **The Crossfade Animation (from Option A):** While the zoom is happening, the center portrait **rapidly crossfades** through 5-6 different hairstyles (Natural → Braids → Locs → Silk Press → Short Cut) at ~600-800ms intervals. The effect is like a "slot machine" of styles — mesmerizing and inclusive.
- **The Result:** By the time the image fills the viewport, the user has subconsciously seen every style category. The inclusivity message lands without reading a word.

---

### Section 2: THE STORY (Scroll-Scrub Text Reveal)

*Inspired by: Nikola Radeski (`nikolaradeski.com`)*

- After the hero, a full-width section with generous vertical padding.
- A paragraph of our core narrative is displayed in large DM Sans text, fully muted/faded.
- As the user scrolls, each word turns from muted grey → bright white → bold, one by one, like someone is highlighting it in real-time.
- The text itself: *"You already know who you want to be. You can see her. The hair, the confidence, the walk. GlamGo is here to bring her to life — safely, beautifully, from the stylist who truly understands your vision."*
- **No videos needed.** Pure CSS/JS scroll tracking.
- **Why it works:** Forces the user to actually read the message. The animation pulls their eyes along every word. It's emotionally powerful and technically impressive without being overwhelming.

---

### Section 3: THE BOOKING JOURNEY (The Self-Drawing Path)

*Inspired by: GetQuoti.ai snaking SVG path + Fourmula.ai direction line*

This is where we prove GlamGo is a **real software ecosystem**, not just a gallery. No videos required.

- A dark section with a thick, gold, organic SVG line that draws itself as you scroll. The line snakes through 3-4 steps:
  1. **"Browse Styles"** — Small mockup of the gallery grid. Caption: *"Explore every angle before you commit."*
  2. **"Find Your Stylist"** — Small mockup showing a map pin + stylist cards. Caption: *"Verified stylists near you — salon or mobile."*
  3. **"Book Instantly"** — Small mockup of a calendar/date picker. Caption: *"Pick your time. No back-and-forth."*
  4. **"Pay Securely"** — Small mockup showing an Interswitch checkout badge. Caption: *"Protected escrow. Pay only when you're satisfied."*
- The SVG line is gold (`#C9A96E`) on our dark background — on-brand.
- Each mockup can be a simple static illustration or a styled `div` that LOOKS like a UI card. No videos, no screen recordings needed.
- **Why it works:** This directly addresses your feedback about showing the logistics and booking. Judges see instantly that this is a functional booking platform with payment integration. The self-drawing line makes it visually memorable.

---

### Section 4: THE GALLERY SNEAK PEEK (Curved Reel Carousel)

*Inspired by: Fabletics video reel*

- Horizontal scroll section of looping short video/image cards showing hair in motion.
- Cards have 3D Coverflow-like curve behavior — when hovered, they pop up and arc.
- If we don't have video, we use high-quality still images with a subtle Ken Burns (zoom/pan) effect to simulate motion.
- **This section stays** as originally planned. It gives the visual "alive" feeling to the gallery.

---

### Section 5: FEATURE VALUE PROPS (The Closer)

- 3-4 glass cards highlighting core differentiators:
  - "See Every Angle" — the gallery
  - "Verified Stylists" — trust/safety
  - "Salon or Home" — flexibility
  - "Secure Payments" — Interswitch escrow
- These are simple and clean. They reinforce the Booking Journey section with bite-sized takeaways.

---

## Scroll & Motion Language (The "Feel")

This applies across ALL sections:

| Technique | Source | Application |
|-----------|--------|-------------|
| Heavy smooth scroll (Lenis) | Obsidian, Tiwis | Global — the entire page feels weighted and cinematic |
| Scroll-linked zoom/scale | Obsidian, Tiwis | Hero zoom-mask transition |
| Rapid crossfade (AnimatePresence) | Apple AirPods | Hero portrait cycling (layered on top of zoom) |
| Self-drawing SVG path | GetQuoti | Section 3 booking journey line |
| Parallax depth layers | Obsidian, Fourmula | Hero 3-layer depth + Gallery cards |
| Word-by-word text reveal | Nikola Radeski | Section 2 narrative |
| ClipPath inset reveals | Tiwis | Image sections expanding as they enter viewport |

---

## Decisions Locked ✅

| Decision | Choice |
|----------|--------|
| Hero Section | B+A Hybrid (Zoom-Through + Rapid Crossfade) |
| Section 2 (Story) | Scroll-scrub word-by-word text reveal |
| Section 3 (Booking) | Self-drawing gold SVG path with static mockups |
| Section 4 (Gallery) | Curved reel carousel with Ken Burns fallback |
| Section 5 (Value Props) | Glassmorphic feature cards (The Closer) |
| Mobile Waitlist | ❌ Cut |
