# Architecture

## Overview

**farhanreninda.github.io** is a **single-page portfolio website** for Farhan Reninda Budiansyah — an Android Developer & Backend Developer. It is a purely static, client-side application with no server-side rendering, no database, and no API backend. The entire site is a one-page scroll experience built around structured CV data.

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    index.html                        │
│  (theme hydration, URL param parsing, mount point)  │
└──────────────────────┬──────────────────────────────┘
                       │
          ┌────────────▼────────────┐
          │     src/app/main.ts     │
          │  createApp(App)         │
          │  + Pinia + Router + Head│
          └────────────┬────────────┘
                       │
     ┌─────────────────▼──────────────────┐
     │          src/app/App.vue            │
     │  ┌─────────────────────────────┐    │
     │  │ AppHeader (sticky nav)      │    │
     │  ├─────────────────────────────┤    │
     │  │ <RouterView>                │    │
     │  │   ├─ HomeView.vue           │    │
     │  │   │   ├─ HeroSection        │    │
     │  │   │   ├─ HelloSection       │    │
     │  │   │   ├─ AboutSection       │    │
     │  │   │   ├─ SkillsSection      │    │
     │  │   │   ├─ ExperienceSection  │    │
     │  │   │   ├─ ProjectsSection    │    │
     │  │   │   ├─ CertificatesSection│    │
     │  │   │   └─ ContactSection     │    │
     │  │   └─ NotFoundView.vue       │    │
     │  ├─────────────────────────────┤    │
     │  │ AppFooter                   │    │
     │  └─────────────────────────────┘    │
     └─────────────────────────────────────┘
```

## Data Layer

All portfolio content is **centralized in a single typed data file**:

```
src/data/cv.ts  ──exports──►  cv: Cv  (typed via src/types/cv.ts)
```

Every section component imports `cv` from `@/data/cv` and renders content from this single source of truth. This means:
- **No API calls** — all data is bundled at build time.
- **No store/state management** in practice — Pinia is installed but unused.
- **Content updates** require only editing `src/data/cv.ts`.

## Module Breakdown

| Layer | Directory | Responsibility |
|-------|-----------|----------------|
| **App Shell** | `src/app/` | App entry (`main.ts`), root component (`App.vue`), router config (`router.ts`) |
| **Components** | `src/components/` | All UI components (views + section components + shared) |
| **Composables** | `src/composables/` | Reusable logic: theme management, scroll-spy, reveal-on-scroll |
| **Data** | `src/data/` | Static CV/portfolio content |
| **Types** | `src/types/` | TypeScript interfaces for CV data |
| **Styles** | `src/styles/` | Global CSS with design tokens (custom properties) |

## Key Architectural Decisions

### 1. Single-File Data Source
All portfolio data lives in `src/data/cv.ts`, typed by `src/types/cv.ts`. This makes content updates trivial — no need to touch components.

### 2. Section-Per-Component Pattern
`HomeView.vue` is a pure composition layer that imports 8 section components in order. Each section is a self-contained `.vue` SFC with its own `<script setup>`, `<template>`, and `<style scoped>`.

### 3. No Build-Time Content Processing
Unlike frameworks such as Astro or Next.js, there is no MDX, no content collections, no static generation per page. Vite bundles everything into a single SPA.

### 4. Lazy-Loaded Routes
Both routes (`HomeView` and `NotFoundView`) use dynamic `import()` for code splitting. Vite produces separate chunks for each.

### 5. Theme Hydration Strategy
Theme is hydrated **before Vue mounts** via an inline `<script>` in `index.html` to prevent FOUC (Flash of Unstyled Content). The composable `useTheme` then takes over reactively.

### 6. Progressive Enhancement for Scroll Animations
The `useReveal` composable uses `IntersectionObserver` with CSS class toggling (`.reveal` → `.is-visible`). A `data-noreveal` URL parameter can disable animations entirely.

## Build & Deploy Pipeline

```
Source → vue-tsc (type check) → Vite (bundle) → dist/ → GitHub Pages
```

- **CI/CD**: GitHub Actions workflow (`.github/workflows/deploy.yml`)
- **Trigger**: Push to `main` branch
- **Environment**: GitHub Pages (static hosting)
- **Build command**: `vue-tsc --noEmit && vite build`

## File Dependency Graph

```
index.html
  └── src/app/main.ts
        ├── src/styles/main.css
        ├── src/app/App.vue
        │     ├── src/components/AppHeader.vue
        │     │     ├── src/components/ThemeToggle.vue
        │     │     ├── src/composables/useActiveSection.ts
        │     │     └── src/composables/useTheme.ts
        │     ├── src/components/AppFooter.vue
        │     └── src/app/router.ts
        │           ├── src/components/HomeView.vue
        │           │     ├── HeroSection.vue  ──► WatercolorBg.vue
        │           │     ├── HelloSection.vue  ──► WatercolorBg.vue
        │           │     ├── AboutSection.vue  ──► WatercolorBg.vue
        │           │     ├── SkillsSection.vue
        │           │     ├── ExperienceSection.vue
        │           │     ├── ProjectsSection.vue ──► WatercolorBg.vue
        │           │     ├── CertificatesSection.vue
        │           │     └── ContactSection.vue ──► WatercolorBg.vue
        │           └── src/components/NotFoundView.vue
        └── src/data/cv.ts  ──► src/types/cv.ts
```
