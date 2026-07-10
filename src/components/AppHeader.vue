<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import LanguageToggle from "./LanguageToggle.vue";
import ThemeToggle from "./ThemeToggle.vue";
import { useActiveSection } from "@/composables/useActiveSection";
import { useLocale } from "@/composables/useLocale";

const navIds = ["top", "skills", "experience", "projects", "education", "contact"] as const;
const { currentCv, copy } = useLocale();
const navItems = computed(() => navIds.map((id) => ({ id, label: copy.value.nav[id] })));

const scrolled = ref(false);
const { active } = useActiveSection([...navIds], 80);

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 12;
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});

const headerClass = computed(() => ({ "is-scrolled": scrolled.value }));
const itemClass = (id: string) => ({ "is-active": active.value === id });

const scrollToSection = (id: string) => {
  const target = document.getElementById(id);
  if (!target) return;

  window.history.pushState(null, "", `#${id}`);
  window.scrollTo({
    top: target.offsetTop,
    behavior: "smooth",
  });
};
</script>

<template>
  <header class="app-header" :class="headerClass">
    <div class="header-inner">
      <a class="brand" href="#top" :aria-label="copy.nav.top + ' ' + currentCv.profile.name" @click.prevent="scrollToSection('top')">
        <span class="brand-mark">FR</span>
        <span class="brand-name">{{ currentCv.profile.name }}</span>
      </a>
      <div class="header-controls">
        <nav :aria-label="copy.nav.top">
          <ul class="nav-list">
            <li v-for="item in navItems" :key="item.id">
              <a :href="'#' + item.id" :class="itemClass(item.id)" @click.prevent="scrollToSection(item.id)">
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  width: calc(100% - 2rem);
  max-width: 1180px;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  background: color-mix(in srgb, var(--color-bg) 82%, transparent);
  backdrop-filter: saturate(180%) blur(16px);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
  border: 1px solid color-mix(in srgb, var(--color-border) 50%, transparent);
  border-radius: var(--radius-pill);
  box-shadow: var(--color-shadow-sm);
  transition: background 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out), padding 0.3s var(--ease-out);
}
.app-header.is-scrolled {
  background: color-mix(in srgb, var(--color-bg) 94%, transparent);
  box-shadow: 0 6px 20px -10px color-mix(in srgb, var(--color-navy) 35%, transparent);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  margin: 0 auto;
  padding: 0.45rem clamp(1rem, 3vw, 2rem);
  transition: padding 0.3s var(--ease-out);
}
.app-header.is-scrolled .header-inner {
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-strong);
  font-weight: var(--weight-strong);
  font-family: var(--font-display);
  font-size: 0.84rem;
  white-space: nowrap;
  transition: color 0.25s var(--ease-out), transform 0.25s var(--ease-out);
}
.brand:hover { color: var(--color-teal); text-decoration: none; transform: translateY(-1px); }
.brand-mark {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  background: var(--color-accent-warm);
  color: var(--color-accent-contrast);
  border-radius: 14px;
  font-size: 0.75rem;
  font-weight: var(--weight-heading);
  box-shadow: 0 4px 10px -4px rgba(31, 112, 128, 0.5);
  transition: transform 0.4s var(--ease-out);
}
.brand:hover .brand-mark { transform: rotate(-8deg) scale(1.05); }
.header-controls {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  min-width: 0;
  margin-left: auto;
}
.nav-list {
  display: flex;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0.2rem;
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-surface) 50%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent);
}
nav {
  min-width: 0;
}
.nav-list li { display: flex; }
.nav-list a {
  display: inline-flex;
  align-items: center;
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: 0.82rem;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-pill);
  position: relative;
  transition: color 0.25s var(--ease-out), background 0.25s var(--ease-out), transform 0.25s var(--ease-out);
}
.nav-list a::after { content: none; }
.nav-list a:hover {
  color: var(--color-text-strong);
  background: color-mix(in srgb, var(--color-bg-soft) 70%, transparent);
  text-decoration: none;
  transform: translateY(-1px);
}
.nav-list a.is-active {
  color: var(--color-accent-contrast);
  background: var(--color-accent-warm);
  box-shadow: 0 4px 10px -4px color-mix(in srgb, var(--color-accent-warm) 60%, transparent);
}
.nav-list a.is-active:hover {
  color: var(--color-accent-contrast);
  background: var(--color-accent-warm);
}
@media (max-width: 700px) {
  .app-header {
    width: calc(100% - 1rem);
    top: max(0.75rem, env(safe-area-inset-top));
    border-radius: 1.45rem;
  }
  .brand-name {
    display: none;
  }
  .header-inner {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: center;
    gap: 0.5rem;
    padding: 0.45rem;
  }
  .brand {
    min-width: 0;
    font-size: 0.78rem;
  }
  .brand-mark {
    width: 38px;
    height: 38px;
    border-radius: 16px;
  }
  .header-controls {
    grid-column: 2;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 0.38rem;
    width: 100%;
  }
  nav {
    grid-column: 1;
    width: 100%;
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    scrollbar-width: none;
    -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 1rem, #000 calc(100% - 1rem), transparent 100%);
    mask-image: linear-gradient(90deg, transparent 0, #000 1rem, #000 calc(100% - 1rem), transparent 100%);
  }
  nav::-webkit-scrollbar { display: none; }
  :deep(.language-toggle) {
    grid-column: 2;
  }
  :deep(.theme-toggle) {
    grid-column: 3;
    justify-self: end;
    width: 38px;
    height: 38px;
  }
  .nav-list {
    width: max-content;
    min-width: max-content;
    gap: 0.25rem;
    padding: 0.22rem;
    background: color-mix(in srgb, var(--color-surface) 66%, transparent);
  }
  .nav-list a {
    min-height: 2rem;
    font-size: 0.74rem;
    padding: 0.34rem 0.68rem;
  }
}
@media (max-width: 420px) {
  .header-controls {
    gap: 0.3rem;
  }
  .nav-list a {
    font-size: 0.72rem;
    padding-inline: 0.58rem;
  }
}
</style>
