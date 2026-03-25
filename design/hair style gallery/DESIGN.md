# High-End Editorial Design System: Visual Guidelines & Specification

## 1. Overview & Creative North Star: "The Digital Atelier"
This design system is not a utility; it is a premium concierge. Our Creative North Star is **"The Digital Atelier"**—an experience that mimics the hushed, exclusive atmosphere of a high-end fashion house. 

To achieve this, we move away from the "boxy" nature of standard apps. We embrace **intentional asymmetry**, where images may bleed off-edge or overlap semi-transparent containers. We utilize high-contrast typography scales to create a rhythmic, editorial flow, ensuring the interface feels like a curated lookbook rather than a database.

---

## 2. Color Strategy & Tonal Depth
Our palette is rooted in a deep, nocturnal foundation, punctuated by metallic light.

### Palette Roles
*   **Primary (`#e6c487` / `#c9a96e`):** Our Warm Gold. Use this for high-intent actions and brand moments.
*   **Secondary (`#ffb2bc` / `#733641`):** Our Rose Gold. Use for accents, soft highlights, or to denote "trending" premium services.
*   **Surface (`#131318`):** The canvas. A near-black that provides more depth than pure `#000000`.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit 1px solid borders for sectioning. Use background shifts instead.
*   A section sitting on `surface` should transition to `surface-container-low` to define its boundary. 
*   Separation is achieved through **negative space** (see Spacing Scale) or **tonal nesting**.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of frosted glass.
1.  **Base Layer:** `surface` (#131318).
2.  **Section Layer:** `surface-container-low` (#1b1b20) for large structural areas.
3.  **Component Layer:** `surface-container` (#1f1f25) for primary cards or modules.
4.  **Interaction Layer:** `surface-container-highest` (#35343a) for hovered states or elevated overlays.

### The "Glass & Gradient" Rule
Standard flat colors feel static. To inject "soul," use **Glassmorphism**:
*   **Floating Elements:** Use `surface-variant` at 60% opacity with a `20px` backdrop-blur.
*   **Signature Gradients:** For CTAs, transition from `primary` (#e6c487) to `primary-container` (#c9a96e) at a 135° angle to mimic the sheen of real gold.

---

## 3. Typography: Editorial Authority
We pair the timeless authority of a serif with the functional clarity of a modern sans-serif.

*   **Display & Headlines (Noto Serif):** Used to command attention. High-contrast sizing (e.g., `display-lg` at 3.5rem) should be used for hero statements. Tighten letter-spacing slightly (-0.02em) for a more "locked-in" fashion feel.
*   **Body & Labels (Manrope):** A clean, geometric sans-serif for readability. Use `body-md` (0.875rem) for most descriptions to maintain a sense of delicate elegance.
*   **The Contrast Rule:** Never use Serif for functional labels. Serif is for "storytelling"; Sans-serif is for "utility."

---

## 4. Elevation & Depth: Tonal Layering
In a premium dark theme, traditional drop shadows often look "dirty." We use light and transparency to define height.

*   **The Layering Principle:** Achieve lift by stacking surface tiers. A `surface-container-lowest` card placed on a `surface-container` background creates a "sunken" premium feel.
*   **Ambient Shadows:** For floating modals, use a shadow color tinted with `on-surface` (#e4e1e9) at 4% opacity with a `40px` blur. It should feel like a soft glow, not a shadow.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` (#4d463a) at **15% opacity**. It should be barely felt, only sensed.
*   **Glassmorphism:** Use `surface-bright` with 40% opacity for navigation bars to allow the rich editorial photography of hairstyles to peek through as the user scrolls.

---

## 5. Signature Components

### Buttons (The "Jewelry" of the UI)
*   **Primary:** Gradient fill (Primary to Primary-Container). Roundedness: `md` (0.375rem). No border. Text is `on-primary` (Deep Amber).
*   **Secondary:** Ghost style. `Ghost Border` (Outline-variant at 20%) with `primary` text.
*   **Tertiary:** All caps `label-md` with 2px letter spacing. No container.

### Editorial Cards
*   **Style:** No borders. No dividers.
*   **Structure:** Image-led. Use `surface-container-low` for the card base. 
*   **Spacing:** Use `spacing-6` (2rem) for internal padding to give the content "room to breathe."

### Input Fields
*   **State:** Underline-only or subtle `surface-container-highest` background. 
*   **Focus:** Transition the underline from `outline-variant` to `primary` (Gold).

### Signature Component: The "Stylist Spotlight"
A specialized horizontal scroll component using `surface-variant` glassmorphism cards that overlap a background image of the stylist's work, creating a 3D layered effect.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetry:** Place a heading at `spacing-10` from the left, but keep the body text at `spacing-16` to create an editorial "staircase" effect.
*   **Embrace the Dark:** Keep 90% of the UI in the `surface` and `surface-container` range. Gold is a reward, use it sparingly.
*   **Image Quality:** Only use high-resolution, high-fashion photography. The UI is designed to frame the art, not compete with it.

### Don’t:
*   **Don't Use Dividers:** Never use a horizontal line to separate list items. Use `spacing-4` or a subtle background shift to `surface-container-low`.
*   **Don't Use Pure White:** `on-surface` (#e4e1e9) is a soft grey-white. Pure white (#FFFFFF) will "vibrate" painfully against the near-black background.
*   **Don't Round Everything:** Avoid the "bubbly" look. Use `md` (0.375rem) for cards and `full` only for small chips/tags.

---

## 7. Spacing Scale (Key Values)
*   **Micro-spacing (1-2):** For icon-to-text relationships.
*   **Layout Spacing (6-8):** For internal card padding.
*   **Section Spacing (16-24):** To separate major editorial stories/sections. This extreme white space is what defines the "Luxury" feel.