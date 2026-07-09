# AGENTS.md — AI Steering File

> **This file is the entry point for any AI agent starting a new session on this repository.**
> Read this file first, then read the referenced steering files below for full context.

## Project Identity

- **Name:** farhanreninda-portfolio
- **Type:** Personal portfolio website (single-page application)
- **Owner:** Farhan Reninda Budiansyah
- **Language:** Indonesian (Bahasa Indonesia) for all user-facing content
- **Deployment:** GitHub Pages at `https://farhanreninda.github.io`

## Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (Vite)
npm run build        # Type-check + production build
npm run preview      # Preview production build locally
npm run deploy       # Build + deploy to gh-pages branch
```

## Memory Protocol — MANDATORY

> **Every agent session MUST follow the memory protocol below.**
> This ensures context persistence across sessions and prevents repeated mistakes.

### Step 0: Auto-Load Memory (FIRST THING)
Before reading steering files or doing ANY work:
1. Read `memory.md` in the project root
2. Review the **Decision Log** for past decisions
3. Review the **Session History** for recent context
4. Review the **Known Context** for persistent project knowledge
5. Acknowledge loaded context before proceeding

### Step 1: Auto-Write After Important Tasks
After completing any significant task (feature, refactor, bug fix, config change, architecture decision):
1. Append a new row to the **Decision Log** table in `memory.md`
2. Format: `| YYYY-MM-DD | [task] | [decision] | [reason] |`
3. This must be done BEFORE moving to the next task

### Step 2: Session Summary (End of Session)
Before ending the session (or when work is paused):
1. Append a new entry to **Session History** in `memory.md`
2. Include: what was done, key decisions, technical debt, pending tasks
3. Update **Known Context** if any persistent information has changed

### Step 3: "Close Session" Trigger
When the user types **"Close Session"**:
1. **IMMEDIATELY** write the final session summary to `memory.md`
2. Do NOT start any new task after this trigger
3. Confirm to user that memory has been saved
4. Then close/end the session

### Memory File Location
- File: `memory.md` (project root)
- Tracked by git: **YES** (do NOT add to .gitignore)
- Language: Indonesian (Bahasa Indonesia)

---
## Steering Files — REQUIRED READING

Before writing or modifying any code, **read ALL of the following files** in this order:

| # | File | What It Covers |
|---|------|---------------|
| 1 | [docs/steering/architecture.md](docs/steering/architecture.md) | High-level architecture, module breakdown, data layer, dependency graph |
| 2 | [docs/steering/system-flow.md](docs/steering/system-flow.md) | Boot sequence, theme flow, scroll-spy, reveal-on-scroll, data flow, deploy pipeline |
| 3 | [docs/steering/tech-stack.md](docs/steering/tech-stack.md) | All dependencies, frameworks, CSS approach, browser APIs, what is NOT in the stack |
| 4 | [docs/steering/routing.md](docs/steering/routing.md) | Vue Router config, route table, hash navigation, scroll behavior, code splitting |
| 5 | [docs/steering/design-system.md](docs/steering/design-system.md) | Color tokens, typography, spacing, component patterns, animations, accessibility, responsive breakpoints |

## Repository Structure

```
farhanreninda.github.io/
+-- index.html                          # HTML shell with theme hydration scripts
+-- package.json                        # Dependencies and scripts
+-- vite.config.ts                      # Vite config (Vue plugin, @ alias, base: "/")
+-- tsconfig.json                       # TypeScript project references
+-- tsconfig.app.json                   # App TS config (strict, path aliases)
+-- tsconfig.node.json                  # Node TS config (for vite.config.ts)
+-- env.d.ts                            # Vite client types + .vue module declaration
+-- memory.md                          # AI persistent memory (auto-load/auto-write)
+-- .gitignore
+-- .github/
¦   +-- workflows/
¦       +-- deploy.yml                  # GitHub Actions CI/CD ? GitHub Pages
+-- src/
¦   +-- app/
¦   ¦   +-- main.ts                     # App entry: createApp + plugins
¦   ¦   +-- App.vue                     # Root component (Header + RouterView + Footer)
¦   ¦   +-- router.ts                   # Vue Router: 2 routes (home + 404)
¦   +-- components/
¦   ¦   +-- HomeView.vue                # Page view composing 8 sections
¦   ¦   +-- NotFoundView.vue            # 404 page
¦   ¦   +-- HeroSection.vue             # Hero with SVG doodles
¦   ¦   +-- HelloSection.vue            # Intro with portrait photo
¦   ¦   +-- AboutSection.vue            # About me card
¦   ¦   +-- SkillsSection.vue           # Skills with progress bars
¦   ¦   +-- ExperienceSection.vue       # Timeline (work/internship/org)
¦   ¦   +-- ProjectsSection.vue         # Project cards with thumbnails
¦   ¦   +-- CertificatesSection.vue     # Certificates + education
¦   ¦   +-- ContactSection.vue          # WhatsApp, email, CV download
¦   ¦   +-- AppHeader.vue               # Sticky header with nav + theme toggle
¦   ¦   +-- AppFooter.vue               # Footer with links
¦   ¦   +-- ThemeToggle.vue             # Dark/light mode button
¦   ¦   +-- WatercolorBg.vue            # Decorative SVG background
¦   +-- composables/
¦   ¦   +-- useTheme.ts                 # Reactive theme with localStorage
¦   ¦   +-- useActiveSection.ts         # Scroll-spy for nav highlighting
¦   ¦   +-- useReveal.ts               # IntersectionObserver reveal animation
¦   +-- data/
¦   ¦   +-- cv.ts                       # ALL portfolio content (single source of truth)
¦   +-- types/
¦   ¦   +-- cv.ts                       # TypeScript interfaces for CV data
¦   +-- styles/
¦       +-- main.css                    # Global CSS with all design tokens
+-- docs/
    +-- steering/                       # AI steering documentation
        +-- architecture.md
        +-- system-flow.md
        +-- tech-stack.md
        +-- routing.md
        +-- design-system.md
```

## Coding Conventions

### File Naming
- Components: `PascalCase.vue` (e.g., `HeroSection.vue`)
- Composables: `camelCase.ts` with `use` prefix (e.g., `useTheme.ts`)
- Data files: `camelCase.ts` (e.g., `cv.ts`)
- Types: `camelCase.ts` (e.g., `cv.ts` in `src/types/`)
- Styles: `kebab-case.css` (e.g., `main.css`)

### Vue SFC Convention
- Always use `<script setup lang="ts">`
- Always use `<style scoped>`
- Import order: Vue ? composables ? data ? components
- All component logic inside `<script setup>`, no `setup()` function

### TypeScript Convention
- Strict mode enabled
- Path alias `@/*` ? `src/*`
- Interfaces exported from `src/types/`
- Data typed via interfaces, no `any`

### CSS Convention
- No CSS framework — pure CSS custom properties only
- Design tokens defined in `:root` and `[data-theme="dark"]`
- Use `color-mix(in srgb, ...)` for dynamic transparency
- `--font-sans` for body, `--font-display` for headings
- `--ease-out` as the primary animation easing

### Data Convention
- **All content** lives in `src/data/cv.ts`
- Components import `cv` and render — they never hardcode content
- To update portfolio content: edit `src/data/cv.ts` only
- TypeScript interfaces in `src/types/cv.ts` enforce data shape

## Key Technical Facts

1. **Single-page app** with only 2 routes: home (`/`) and 404 catch-all
2. **Hash-based navigation** within the home page (not router-links)
3. **No backend, no API, no database** — purely static
4. **Pinia is installed but unused** — no state management needed
5. **Theme is hydrated before Vue mounts** via inline script in `index.html`
6. **Reveal animations** use IntersectionObserver, can be disabled via `?noreveal=1`
7. **All sections** use `scroll-margin-top: 90px` for sticky header clearance
8. **Build output** is code-split: HomeView and NotFoundView are separate lazy chunks
9. **Deploy** is automated via GitHub Actions on push to `main`

## What NOT to Do

- ? Do not add a CSS framework — the design token system is intentional
- ? Do not convert to Nuxt/SSR — this is a deliberate static SPA
- ? Do not add router-links for section navigation — hash anchors are by design
- ? Do not move content out of `src/data/cv.ts` into components
- ? Do not remove `<style scoped>` from components
- ? Do not remove the inline theme hydration script from `index.html`
- ? Do not change the `base: "/"` in `vite.config.ts` (required for GitHub Pages root)
