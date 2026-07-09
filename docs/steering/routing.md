# Routing

## Router Configuration

The application uses **Vue Router 4** with **HTML5 History mode** (`createWebHistory`).

```typescript
// src/app/router.ts
export const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0, behavior: "smooth" };
  },
});
```

## Route Table

| Path | Name | Component | Meta Title |
|------|------|-----------|------------|
| `/` | `home` | `HomeView.vue` (lazy) | `Farhan Reninda — Portfolio` |
| `/:pathMatch(.*)*` | `not-found` | `NotFoundView.vue` (lazy) | `Halaman tidak ditemukan | Farhan Reninda` |

### Route Details

**Home (`/`)**
- Component: `@/components/HomeView.vue`
- Loaded via dynamic `import()` for code splitting
- Single-page scroll experience with 8 sections

**404 Catch-All (`/:pathMatch(.*)*`)**
- Component: `@/components/NotFoundView.vue`
- Loaded via dynamic `import()` for code splitting
- Displays 404 page with link back to home

## Navigation Model

### Primary Navigation: Hash Anchors
The site does **not** use route-based navigation. Instead, all navigation within the portfolio uses **hash anchor links** (`#section-id`) that scroll to sections on the same page.

```typescript
// AppHeader.vue — nav items are anchor links, not router-links
const navItems = [
  { id: "hello", label: "Hello" },
  { id: "projects", label: "Proyek" },
  { id: "skills", label: "Keahlian" },
  { id: "experience", label: "Pengalaman" },
  { id: "contact", label: "Kontak" },
];
```

Template pattern:
```html
<a :href="`#${item.id}`">{{ item.label }}</a>
```

### Section IDs

| Section ID | Component | Nav Label |
|------------|-----------|-----------|
| `#top` | HeroSection | (Brand logo link) |
| `#hello` | HelloSection | Hello |
| `#about` | AboutSection | — (not in nav) |
| `#skills` | SkillsSection | Keahlian |
| `#experience` | ExperienceSection | Pengalaman |
| `#projects` | ProjectsSection | Proyek |
| `#contact` | ContactSection | Kontak |

**Note:** `#about` exists as a section but is not included in the header navigation.

## Scroll Behavior

### Router-Level Scroll
```typescript
scrollBehavior(_to, _from, savedPosition) {
  return savedPosition || { top: 0, behavior: "smooth" };
}
```
- Restores saved position on browser back/forward
- Scrolls to top with smooth animation on new navigation

### Hash Scroll on Page Load
```typescript
// App.vue — onMounted
const hash = window.location.hash.replace("#", "");
if (hash) {
  const el = document.getElementById(hash);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
```

### Section Scroll Margin
```css
.section, section[id] {
  scroll-margin-top: 90px;
}
```
Prevents sections from being hidden under the sticky header.

## Post-Navigation Hook

```typescript
router.afterEach((to) => {
  const title = (to.meta?.title as string | undefined) ?? "Farhan Reninda — Portfolio";
  if (typeof document !== "undefined") document.title = title;
});
```
Updates `document.title` after every route change.

## Build Output Structure

After `vite build`, the `dist/` directory contains:

```
dist/
├── index.html
└── assets/
    ├── index-ChB3GX5o.css       (global styles)
    ├── index-uqtuSdEF.js        (main bundle)
    ├── HomeView-DenYfHiU.css    (lazy chunk styles)
    ├── HomeView-reuT-Jq0.js     (lazy chunk)
    ├── NotFoundView-FqH8l9W2.css
    └── NotFoundView-DT-rob_R.js
```

Each route's component is code-split into its own chunk.

## GitHub Pages Configuration

The site is deployed to `https://farhanreninda.github.io` with `base: "/"` in `vite.config.ts`. This means:
- All asset paths are absolute from `/`
- HTML5 History mode works correctly on GitHub Pages
- The 404 catch-all route handles direct URL access to non-existent paths on GitHub Pages
