# Design System

## Overview

The design system is built on **pure CSS custom properties** defined in `src/styles/main.css`. There is no CSS framework. Every visual token is a CSS variable, enabling seamless light/dark theme switching and consistent styling.

## Color System

### Semantic Color Tokens

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--color-bg` | `#ffffff` | `#06121a` | Page background |
| `--color-bg-soft` | `#f4fbfb` | `#0a1a23` | Subtle background sections |
| `--color-surface` | `#ffffff` | `#0d1f29` | Card surfaces |
| `--color-surface-elev` | `#ffffff` | `#112733` | Elevated surfaces |
| `--color-border` | `#d9ecef` | `#1c3441` | Borders and dividers |
| `--color-text` | `#0f3a52` | `#e6f3f7` | Default text |
| `--color-text-strong` | `#0a2a3c` | `#ffffff` | Headings, emphasis |
| `--color-text-muted` | `#4f7383` | `#92b4c0` | Secondary text |

### Brand Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--color-navy` | `#0f3a52` | `#cfe6ee` | Dark text / outlines |
| `--color-teal` | `#1f7080` | `#6fc6d4` | Primary accent |
| `--color-teal-soft` | `#2f8c9d` | `#92d6e1` | Softer teal |
| `--color-sky` | `#9fd3e6` | `#2e5d6a` | Secondary accent |
| `--color-sky-deep` | `#74b8cf` | `#244a55` | Deeper sky |
| `--color-mint` | `#c9e9d2` | `#1c3a3f` | Green accent |
| `--color-cream` | `#f7fbf6` | `#0c1a20` | Warm background |

### Decorative Blob Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--color-blob-1` | `#9fd3e6` | `#163947` | Watercolor blob A |
| `--color-blob-2` | `#c9e9d2` | `#143832` | Watercolor blob B |
| `--color-blob-3` | `#b6dfe6` | `#133542` | Watercolor blob C |
| `--color-blob-4` | `#d4ecdf` | `#103a35` | Watercolor blob D |

### Accent System

```css
--color-accent: var(--color-teal);         /* Primary interactive elements */
--color-accent-strong: #155764;            /* Hover state (light), #b6e6ee (dark) */
```

### Gradient Patterns

Used extensively for brand mark, nav active states, and decorative elements:

```css
/* Primary gradient */
linear-gradient(135deg, var(--color-teal), var(--color-sky))

/* Deeper gradient */
linear-gradient(135deg, var(--color-teal), var(--color-sky-deep))

/* Text gradient (used on headings) */
background: linear-gradient(135deg, var(--color-teal), var(--color-sky-deep));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Shadow Tokens

| Token | Usage |
|-------|-------|
| `--color-shadow-sm` | Cards at rest: `0 2px 8px -4px rgba(15, 58, 82, 0.18)` |
| `--color-shadow-md` | Cards on hover, elevated elements |
| `--color-shadow-lg` | Cards on deep hover, hero illustrations |
| `--color-glow` | Focus ring: `0 0 0 4px rgba(31, 112, 128, 0.18)` |

## Typography

### Font Stacks

```css
--font-sans: "Inter", "Plus Jakarta Sans", "Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif;
--font-display: "Plus Jakarta Sans", "Inter", "Segoe UI", system-ui, sans-serif;
```

- **`--font-sans`**: Body text, default for `html, body`
- **`--font-display`**: Headings, brand, section titles, nav items

### Type Scale

| Element | Size | Weight | Font |
|---------|------|--------|------|
| Hero Name (`h1`) | `clamp(2.7rem, 6vw, 5rem)` | 800 | `--font-display` |
| Hello Title (`h2`) | `clamp(2rem, 4.5vw, 3rem)` | 800 | `--font-display` |
| Section Title (`h2`) | `clamp(1.5rem, 2.5vw, 2rem)` | 800 | `--font-display` |
| Card Title (`h3`) | `1.1rem` — `1.2rem` | 700 | `--font-display` |
| Body text | `1.02rem` — `1.05rem` | 400–500 | `--font-sans` |
| Small/muted | `0.85rem` — `0.95rem` | 500–600 | `--font-sans` |
| Tags/badges | `0.72rem` — `0.85rem` | 600–700 | `--font-sans` |

### Line Height & Spacing
- Body: `line-height: 1.65`
- Headings: `line-height: 1.02` — `1.12`
- Letter spacing on headings: `-0.02em` to `-0.03em`

## Spacing & Layout

### Radius System

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `8px` | Small elements, tags |
| `--radius-md` | `14px` | Medium cards |
| `--radius-lg` | `22px` | Large cards, project cards |
| `--radius-pill` | `999px` | Buttons, badges, nav pills |

### Max Width

```css
--max-width: 1280px;
```

Applied via `.section-frame` on all sections.

### Responsive Padding

```css
padding: 0 clamp(1.25rem, 4vw, 3.5rem);
```

Adapts horizontal padding fluidly from mobile to desktop.

## Component Patterns

### Eyebrow Badge
```css
.eyebrow {
  padding: 0.4rem 0.9rem;
  border: 1.5px solid var(--color-teal);
  border-radius: var(--radius-pill);
  color: var(--color-teal);
  font-size: 0.85rem;
  font-weight: 600;
  background: var(--color-surface);
}
```

### Buttons

**Primary (`.button`)**
```css
background: var(--color-teal);
color: #ffffff;
border-radius: var(--radius-pill);
padding: 0.75rem 1.4rem;
```

**Secondary (`.button.secondary`)**
```css
background: var(--color-surface);
color: var(--color-text);
border: 1.5px solid var(--color-border);
```

### Cards (`.card`)
```css
background: var(--color-surface);
border: 1px solid var(--color-border);
border-radius: var(--radius-lg);
padding: 1.5rem;
box-shadow: var(--color-shadow-sm);
```

Hover state: `translateY(-4px)` + `shadow-lg` + teal border accent.

### Tags (`.tag`)
```css
padding: 0.25rem 0.6rem;
border-radius: var(--radius-pill);
background: var(--color-bg-soft);
font-size: 0.8rem;
border: 1px solid var(--color-border);
```

## Animation & Motion

### Easing Functions

```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);     /* Decelerate — primary */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);  /* Symmetric — for loops */
```

### Reveal Animation

```css
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

Staggered delays: `.reveal-delay-1` through `.reveal-delay-5` (0.08s increments).

### Blob Drift Animations

Three keyframe animations (`drift-a`, `drift-b`, `drift-c`) provide subtle movement to watercolor background blobs:
- `drift-a`: 14s cycle, moves 20px right + 15px up
- `drift-b`: 18s cycle, moves 25px left + 20px down
- `drift-c`: 22s cycle, moves 15px right + 25px down

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

## Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| `max-width: 800px` | Tablet/mobile — single-column layouts, hide illustrations |
| `max-width: 700px` | Small mobile — compact nav, hide brand name |
| `max-width: 480px` | Extra small — stacked meta grids, tighter padding |

## Decorative Elements

### WatercolorBg Component
A reusable decorative component (`WatercolorBg.vue`) that renders:
- **3 SVG blobs** with radial gradients (positioned top-left, bottom-right, mid-center)
- **2 dot-splash patterns** (top-right, bottom-left corners)
- **1 scribble SVG** (bottom-right)

All decorative elements use `aria-hidden="true"` and `pointer-events: none`.

### SVG Doodle Illustrations
The hero section includes hand-drawn SVG doodles of a monitor and phone, using brand colors and stroke styles.

## Accessibility Patterns

| Pattern | Implementation |
|---------|---------------|
| Skip link | `.skip-link` — visible on focus, jumps to `#main` |
| Focus ring | `var(--color-glow)` on `:focus-visible` for links and buttons |
| ARIA labels | On nav, buttons, contact links |
| Color contrast | Text colors designed against their respective backgrounds |
| Screen reader text | `aria-hidden="true"` on decorative SVGs and doodles |
| Semantic HTML | `<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`, `<article>` |
| Lang attribute | `lang="id"` (Indonesian) set on `<html>` |
