# System Flow

## Application Lifecycle

### 1. Boot Sequence

```
Browser loads index.html
  │
  ├─ Inline script: Hydrate theme from localStorage / prefers-color-scheme
  │   └─ Sets data-theme="light|dark" on <html>
  │
  ├─ Inline script: Parse URL query params (?theme=, ?noreveal=1)
  │
  └─ Load <script type="module" src="/src/app/main.ts">
        │
        ├─ createApp(App)
        ├─ app.use(createPinia())     ← installed but unused
        ├─ app.use(router)            ← Vue Router with HTML5 history
        ├─ app.use(createHead())      ← @unhead/vue for <head> meta
        └─ app.mount("#app")
              │
              ├─ App.vue setup:
              │   ├─ useHead() sets lang="id" + OG meta tags
              │   ├─ useTheme() takes over reactive theme management
              │   └─ onMounted: scroll to hash anchor if present
              │
              └─ Router resolves "/" → HomeView.vue (lazy import)
                    │
                    └─ HomeView setup:
                          ├─ useReveal() initializes IntersectionObserver
                          └─ Renders 8 section components in order
```

### 2. Theme Management Flow

```
User clicks ThemeToggle
  │
  └─ toggle() from useTheme()
        │
        ├─ Flip theme ref: "light" ↔ "dark"
        ├─ Persist to localStorage("theme")
        └─ watchEffect → applyTheme()
              │
              └─ document.documentElement.setAttribute("data-theme", value)
                    │
                    └─ CSS [data-theme="dark"] overrides all --color-* variables
                          └─ Every component re-paints via CSS custom properties
```

**Theme Resolution Priority:**
1. `localStorage("theme")` — explicit user choice
2. `prefers-color-scheme: dark` — OS-level preference
3. Fallback: `"light"`

### 3. Scroll-Spy Navigation Flow

```
User scrolls page
  │
  └─ window "scroll" event (passive listener)
        │
        └─ useActiveSection.compute() [via requestAnimationFrame]
              │
              ├─ For each section id in navItems:
              │   ├─ getBoundingClientRect()
              │   └─ If top - headerOffset <= 0 AND bottom > headerOffset → active
              │
              └─ Update active ref → AppHeader re-renders nav highlight
```

### 4. Reveal-on-Scroll Flow

```
Page loads → HomeView.onMounted()
  │
  └─ useReveal.setup(rootElement)
        │
        ├─ querySelectorAll(".reveal") inside root
        ├─ Create IntersectionObserver (rootMargin: 0px 0px -10% 0px, threshold: 0.12)
        └─ Observe each .reveal element
              │
              └─ When element enters viewport (isIntersecting = true):
                    ├─ Add class "is-visible"
                    ├─ CSS transition: opacity 0→1, translateY(28px→0)
                    └─ Unobserve element (one-time animation)
```

**Disabling Reveal:**
- Add `?noreveal=1` to URL → sets `data-noreveal="1"` on `<html>`
- CSS rule: `html[data-noreveal='1'] .reveal { opacity: 1; transform: none; }`
- Also respects `prefers-reduced-motion: reduce`

### 5. Section Rendering Flow

Each section component follows the same pattern:

```
SectionComponent.vue <script setup>
  │
  ├─ Import cv from @/data/cv
  ├─ Import types if needed
  ├─ Compute derived data (computed refs)
  └─ Template renders from cv data
        │
        ├─ Eyebrow badge (category label)
        ├─ Section title (h2)
        ├─ Lead paragraph (optional)
        ├─ Content cards/items from cv arrays
        └─ WatercolorBg (decorative background, optional)
```

### 6. Hash Navigation Flow

```
User clicks nav link (e.g., #projects)
  │
  ├─ Browser native scroll to #projects section
  │   └─ CSS scroll-margin-top: 90px prevents overlap with sticky header
  │
  └─ On page load with hash:
        └─ App.vue onMounted → getElementById(hash) → scrollIntoView({ behavior: "smooth" })
```

### 7. Data Flow Summary

```
src/types/cv.ts     (TypeScript interfaces)
       ▲
       │ types
       │
src/data/cv.ts      (Static data, single source of truth)
       │
       │ imports cv
       ▼
┌──────────────────────────────────────────┐
│  HeroSection      ← cv.profile           │
│  HelloSection     ← cv.profile.tagline   │
│  AboutSection     ← cv.profile.about     │
│  SkillsSection    ← cv.skills            │
│  ExperienceSection← cv.experiences       │
│  ProjectsSection  ← cv.projects          │
│  CertificatesSection← cv.certificates    │
│  ContactSection   ← cv.profile.social    │
│  AppHeader        ← cv.profile.name      │
│  AppFooter        ← cv.profile           │
└──────────────────────────────────────────┘
```

**Key Insight:** All data flows are **unidirectional and read-only**. There are no forms, no user-generated content, no mutations. The app is a pure presentation layer over static data.

### 8. Build & Deploy Flow

```
Developer pushes to main
  │
  └─ GitHub Actions: .github/workflows/deploy.yml
        │
        ├─ checkout → setup-node@20 → npm ci
        ├─ npm run build:
        │   ├─ vue-tsc --noEmit  (type checking)
        │   └─ vite build        (bundle to dist/)
        ├─ upload-pages-artifact (dist/)
        └─ deploy-pages@v4
              │
              └─ Live at https://farhanreninda.github.io
```
