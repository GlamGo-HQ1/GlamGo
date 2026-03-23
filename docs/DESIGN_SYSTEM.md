# GlamGo — Design System

Ground truth for every UI element. If it's visual, it follows this file.

---

## 1. Color Tokens

### Backgrounds

```
--bg-primary:    #0A0A0F     /* Page background */
--bg-surface:    #141419     /* Cards, panels */
--bg-elevated:   #1E1E26     /* Hover cards, active states */
--bg-overlay:    rgba(0,0,0,0.6)  /* Modal backdrop */
```

### Text

```
--text-primary:   #F5F0EB    /* Headlines, primary */
--text-secondary: #9A9A9A    /* Body, descriptions */
--text-muted:     #6B6B6B    /* Captions, metadata */
--text-inverse:   #0A0A0F    /* Text on light surfaces */
```

### Accent

```
--accent-primary:  #C9A96E   /* CTAs, active states */
--accent-hover:    #D4B97E   /* Hover on accent */
--accent-secondary:#B76E79   /* Secondary highlights */
```

### Feedback

```
--success:  #22C55E
--warning:  #F59E0B
--error:    #EF4444
--info:     #3B82F6
```

### Glass

```
--glass-bg:      rgba(255,255,255,0.05)
--glass-border:  rgba(255,255,255,0.10)
--glass-blur:    12px
```

### Gradients

```
--gradient-hero:   linear-gradient(135deg, #1A0B2E 0%, #0F1624 50%, #0A0A0F 100%)
--gradient-card:   linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7) 100%)
--gradient-accent: linear-gradient(135deg, #C9A96E 0%, #B76E79 100%)
```

---

## 2. Typography

### Font Stack

```
--font-display: 'Playfair Display', Georgia, serif
--font-body:    'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif
```

### Scale

| Token | Size | Line Height | Weight | Font | Usage |
|-------|------|-------------|--------|------|-------|
| `display-xl` | 56px / 3.5rem | 1.1 | 700 | Display | Landing hero headline |
| `display-lg` | 40px / 2.5rem | 1.15 | 700 | Display | Section headlines |
| `heading-1` | 32px / 2rem | 1.2 | 600 | Display | Page titles |
| `heading-2` | 24px / 1.5rem | 1.25 | 600 | Display | Section headers |
| `heading-3` | 20px / 1.25rem | 1.3 | 600 | Display | Card titles |
| `body-lg` | 18px / 1.125rem | 1.6 | 400 | Body | Feature descriptions |
| `body` | 16px / 1rem | 1.5 | 400 | Body | Standard body text |
| `body-sm` | 14px / 0.875rem | 1.5 | 400 | Body | Secondary info |
| `caption` | 12px / 0.75rem | 1.4 | 500 | Body | Labels, metadata |
| `label` | 12px / 0.75rem | 1 | 500 | Body | ALL-CAPS labels, `letter-spacing: 0.1em` |

### Mobile Adjustments

- `display-xl` → 36px
- `display-lg` → 28px
- `heading-1` → 24px
- `heading-2` → 20px

---

## 3. Spacing

Base unit: **4px**

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight gaps (icon + label) |
| `space-2` | 8px | Inline spacing |
| `space-3` | 12px | Compact card padding |
| `space-4` | 16px | Standard padding |
| `space-5` | 20px | Card padding |
| `space-6` | 24px | Section gaps |
| `space-8` | 32px | Between components |
| `space-10` | 40px | Section vertical spacing |
| `space-12` | 48px | Large section gaps |
| `space-16` | 64px | Page section separation |
| `space-20` | 80px | Hero vertical padding |

---

## 4. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 8px | Buttons, pills, inputs |
| `radius-md` | 12px | Small cards, chips |
| `radius-lg` | 16px | Standard cards |
| `radius-xl` | 24px | Large cards, modals |
| `radius-full` | 9999px | Avatars, circular elements |

---

## 5. Shadows

```
--shadow-sm:   0 1px 2px rgba(0,0,0,0.3)
--shadow-md:   0 4px 12px rgba(0,0,0,0.4)
--shadow-lg:   0 8px 24px rgba(0,0,0,0.5)
--shadow-glow:  0 0 20px rgba(201,169,110,0.15)   /* Gold accent glow */
```

---

## 6. Component Patterns

### Glass Card

```css
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
}
```

Tailwind: `bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl`

### Hairstyle Card

- Aspect ratio: 3:4 (portrait)
- Border radius: `radius-lg` (16px)
- Ken Burns animation on image
- Dark gradient overlay at bottom 40%
- Text overlay: style name (heading-3) + price (caption)
- Hover: scale(1.02) + shadow-glow

```css
.hairstyle-card img {
  animation: kenBurns 6s ease-in-out infinite alternate;
}
@keyframes kenBurns {
  0%   { transform: scale(1) translate(0, 0); }
  100% { transform: scale(1.08) translate(-1%, -1%); }
}
```

### Primary Button

```css
.btn-primary {
  background: var(--accent-primary);
  color: var(--text-inverse);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 16px;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}
.btn-primary:hover {
  background: var(--accent-hover);
  box-shadow: var(--shadow-glow);
}
```

### Secondary Button (Ghost)

```css
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--glass-border);
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  background: var(--glass-bg);
  border-color: var(--accent-primary);
}
```

### Category Pill

```css
.pill {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}
.pill--active {
  background: var(--accent-primary);
  color: var(--text-inverse);
  border-color: var(--accent-primary);
}
```

### Input Field

```css
.input {
  background: var(--bg-surface);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  color: var(--text-primary);
  font-size: 16px;
  transition: border-color 0.2s ease;
}
.input:focus {
  border-color: var(--accent-primary);
  outline: none;
  box-shadow: 0 0 0 2px rgba(201,169,110,0.2);
}
```

### Modal / Overlay

```css
.modal-backdrop {
  background: var(--bg-overlay);
  backdrop-filter: blur(8px);
}
.modal-content {
  background: var(--bg-surface);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}
```

---

## 7. Motion

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| **Micro** | 150ms | ease-out | Button hover, pill toggle |
| **Standard** | 200ms | ease-in-out | Card hover, input focus |
| **Entrance** | 400ms | cubic-bezier(0.16, 1, 0.3, 1) | Scroll reveals, card entrance |
| **Page** | 500ms | cubic-bezier(0.65, 0, 0.35, 1) | Route transitions |
| **Shared element** | 600ms | spring(1, 80, 10) | `layoutId` gallery → detail |
| **Ken Burns** | 6000ms | ease-in-out | Gallery card image animation |

### Framer Motion Presets

```js
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
};

const cardHover = {
  whileHover: { scale: 1.02 },
  transition: { type: "spring", stiffness: 300, damping: 20 }
};
```

---

## 8. Image Standards

| Context | Aspect | Quality | Format | Placeholder |
|---------|--------|---------|--------|-------------|
| Gallery card | 3:4 | 75 | WebP | blur |
| Detail hero | 16:9 | 85 | WebP | blur |
| 360° frames | 1:1 | 75 | WebP | none (preload first frame) |
| Avatar | 1:1 | 75 | WebP | solid `bg-surface` |
| Hero background | 16:9 | 80 | WebP | gradient fallback |

All images: `object-fit: cover`, delivered via `next/image`.

---

## 9. Breakpoints

| Token | Value | Target |
|-------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |

**Mobile-first**: all base styles target phones. Use `@media (min-width)` to scale up.

---

## 10. Accessibility (Non-Negotiable)

- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text
- Focus outlines: 2px solid `--accent-primary` with 2px offset
- All interactive elements must be keyboard-navigable
- Images: meaningful `alt` text (not "image-1.jpg")
- Motion: respect `prefers-reduced-motion` — disable Ken Burns + transitions
- Touch targets: minimum 44×44px on mobile
