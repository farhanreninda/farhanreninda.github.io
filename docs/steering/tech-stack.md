# Tech Stack

## Core Framework

| Technology | Version | Purpose |
|---|---|---|
| **Vue 3** | ^3.5.13 | Reactive UI framework (Composition API with `<script setup>`) |
| **TypeScript** | ~5.6.3 | Static type checking |
| **Vite** | ^5.4.11 | Dev server + build tool |

## Routing & Meta

| Technology | Version | Purpose |
|---|---|---|
| **Vue Router** | ^4.4.5 | Client-side routing (HTML5 history mode) |
| **@unhead/vue** | ^1.7.2 | Reactive `<head>` management (title, meta, OG tags) |

## State & Utilities

| Technology | Version | Purpose |
|---|---|---|
| **Pinia** | ^2.2.6 | State management (installed but **currently unused**) |
| **@vueuse/core** | ^11.3.0 | Composition API utilities (installed, available for use) |

## Build & Dev Tools

| Technology | Version | Purpose |
|---|---|---|
| **@vitejs/plugin-vue** | ^5.2.1 | Vue SFC support for Vite |
| **vue-tsc** | ^2.1.10 | Vue-aware TypeScript compiler for type checking |
| **@types/node** | ^22.10.1 | Node.js type definitions |

## Deployment

| Technology | Version | Purpose |
|---|---|---|
| **gh-pages** | ^6.2.0 | CLI tool for deploying to GitHub Pages |
| **GitHub Actions** | — | CI/CD pipeline for automated deployment |

## Language & Syntax

### Vue 3 — Composition API (`<script setup>`)
Every component uses `<script setup lang="ts">` syntax. No Options API anywhere.

```vue
<script setup lang="ts">
import { computed } from "vue";
import { cv } from "@/data/cv";
// All logic defined here, no setup() function needed
</script>
```

### TypeScript — Strict Mode
- `"strict": true`
- `"noUnusedLocals": true`
- `"noUnusedParameters": true`
- `"noFallthroughCasesInSwitch": true`

### Path Alias
- `@` maps to `src/` via `tsconfig.app.json` paths and `vite.config.ts` aliases.

```typescript
import { cv } from "@/data/cv";
import type { Cv } from "@/types/cv";
```

## CSS Approach

### No CSS Framework
The project uses **pure CSS** with no framework (no Tailwind, no Bootstrap, no UnoCSS).

### Design Token System
All visual values are CSS custom properties defined in `src/styles/main.css`:

```css
:root {
  --color-bg: #ffffff;
  --color-teal: #1f7080;
  --radius-lg: 22px;
  --font-sans: "Inter", "Plus Jakarta Sans", ...;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Scoped Styles
Every Vue component uses `<style scoped>` — no global component styles leak.

### Color Function
Modern CSS `color-mix(in srgb, ...)` is used extensively for dynamic transparency and color blending.

## Browser APIs Used

| API | Where | Purpose |
|---|---|---|
| `localStorage` | `useTheme.ts`, `index.html` | Persist theme preference |
| `matchMedia` | `useTheme.ts`, `index.html` | Detect OS dark mode |
| `IntersectionObserver` | `useReveal.ts` | Scroll-triggered reveal animations |
| `getBoundingClientRect` | `useActiveSection.ts` | Scroll-spy for nav highlighting |
| `requestAnimationFrame` | `useActiveSection.ts` | Throttled scroll computation |

## What is NOT in the Stack

- ❌ No CSS framework (Tailwind, Bootstrap, etc.)
- ❌ No server-side rendering (Nuxt, SSR)
- ❌ No backend / API (Express, etc.)
- ❌ No database
- ❌ No authentication
- ❌ No testing framework (Vitest, Jest, Cypress)
- ❌ No linter/formatter configured (ESLint, Prettier)
- ❌ No monorepo tooling
- ❌ No i18n library (content is hardcoded in Indonesian)
- ❌ No image optimization pipeline
- ❌ No Storybook or component documentation
