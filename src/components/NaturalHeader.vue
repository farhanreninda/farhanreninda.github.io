<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import NaturalActionIcon from "./NaturalActionIcon.vue";
import { useLocale } from "@/composables/useLocale";
import { useTheme } from "@/composables/useTheme";
import { useActiveSection } from "@/composables/useActiveSection";
import { navigateNatural } from "./naturalNavigation";
const ids = [
  "top",
  "skills",
  "experience",
  "projects",
  "education",
  "contact",
] as const;
const { currentCv: cv, copy, locale, setLocale } = useLocale();
const { theme, toggle } = useTheme();
const header = ref<HTMLElement | null>(null);
const menuOpen = ref(false);
function handleNavigation(event: MouseEvent) {
  if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  if (!(event.target as Element).closest('a[href^="#"]')) return;
  event.preventDefault();
  menuOpen.value = false;
  void nextTick(() => navigateNatural(event));
}
const { active } = useActiveSection(
  [...ids],
  () => (window.innerHeight + (header.value?.getBoundingClientRect().bottom || 80)) / 2,
);
const email = computed(() => "mailto:" + cv.value.profile.social.email);
</script>
<template>
  <header ref="header" class="natural-header" @click="handleNavigation">
    <a class="brand" href="#top"
      ><span class="brand-mark">{{ cv.profile.name.charAt(0) }}</span>
      <div>
        <strong>{{ cv.profile.name.split(' ').slice(0, 2).join(' ') }}</strong
        ><small>{{ cv.profile.title }}</small>
      </div></a
    >
    <button class="mobile-menu" :aria-expanded="menuOpen" aria-controls="natural-navigation" @click="menuOpen = !menuOpen"><NaturalActionIcon :name="menuOpen ? 'close' : 'menu'" />Menu</button>
    <nav id="natural-navigation" :class="{ 'is-open': menuOpen }" :aria-label="copy.nav.top">
      <a
        v-for="id in ids"
        :key="id"
        :href="'#' + id"
        :class="{ active: active === id }"
        >{{ copy.nav[id] }}</a
      >
    </nav>
    <div class="header-actions">
      <div class="languages" :aria-label="copy.language.label">
        <button
          v-for="value in ['id', 'en'] as const"
          :key="value"
          :aria-pressed="locale === value"
          @click="setLocale(value)"
        >
          {{ value.toUpperCase() }}
        </button>
      </div>
      <button
        class="mode"
        :aria-label="theme === 'dark' ? copy.theme.light : copy.theme.dark"
        @click="toggle"
      >
        <NaturalActionIcon :name="theme === 'dark' ? 'light_mode' : 'dark_mode'" /></button
      ><a class="send" :href="email"
        ><span class="natural-icon" aria-hidden="true">send</span
        ><span>{{ copy.contact.actions.email.title }}</span></a
      ><a class="mode" href="/admin/" aria-label="Admin"
        ><NaturalActionIcon name="person" /></a
      >
    </div>
  </header>
</template>
<style scoped>
.natural-header {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  z-index: 100;
  max-width: 1280px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  font: 500 13px var(--font-sans);
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text-strong);
  flex-shrink: 0;
}
.brand-mark {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  background: var(--color-surface-elev);
  color: var(--color-accent);
  border-radius: var(--radius-sm);
}
.brand small {
  display: block;
  color: var(--color-text-muted);
  font-size: 11px;
}
.mobile-menu { display: none; }
nav {
  display: flex;
  padding: 4px;
  gap: 2px;
  background: var(--color-bg-soft);
  border-radius: var(--radius-md);
}
nav a {
  padding: 8px 10px;
  min-height: 36px;
  color: var(--color-text-muted);
  border-radius: var(--radius-sm);
}
nav a:hover {
  background: color-mix(in srgb, var(--color-surface-elev) 65%, transparent);
  color: var(--color-text-strong);
  text-decoration: none;
}
nav a.active {
  background: var(--color-surface-elev);
  color: var(--color-text-strong);
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.languages {
  display: flex;
  padding: 3px;
  gap: 2px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-bg-soft);
}
.languages button,
.mode {
  border: 1px solid var(--color-border);
  background: var(--color-bg-soft);
  color: var(--color-text);
  cursor: pointer;
  border-radius: var(--radius-sm);
}
.languages button {
  padding: 4px 9px;
  min-height: 28px;
  border: 0;
  border-radius: var(--radius-pill);
  background: transparent;
  font-size: 12px;
  font-weight: 600;
}
.languages button[aria-pressed="true"] {
  color: var(--color-text-strong);
  background: var(--color-surface-elev);
  box-shadow: 0 1px 4px #0002;
}
.mode {
  display: grid;
  place-items: center;
  min-width: 44px;
  min-height: 44px;
  border-radius: 50%;
}
.mode[href] {
  color: var(--color-teal);
  background: color-mix(in srgb, var(--color-accent) 12%, var(--color-surface));
  border-color: color-mix(in srgb, var(--color-accent) 35%, var(--color-border));
}
.send {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 9px 12px;
  border-radius: var(--radius-sm);
  background: #006bfd;
  color: #fff;
  min-height: 44px;
  padding-inline: 16px;
  font-weight: 600;
  box-shadow: 0 3px 10px #006bfd24;
}
.header-actions :is(a, button) {
  transition: background-color 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
}
.header-actions :is(a, button):hover {
  border-color: var(--color-teal);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--color-teal) 15%, transparent);
  text-decoration: none;
}
.send:hover {
  background: #075ad1;
}
.natural-header :is(a, button):focus-visible {
  outline: 2px solid var(--color-teal);
  outline-offset: 3px;
}
.natural-icon {
  font-family: "Material Symbols Outlined";
  font-size: 18px;
  line-height: 1;
}
@media (max-width: 1100px) {
  .natural-header {
    flex-wrap: wrap;
  }
  nav {
    order: 3;
    width: 100%;
    justify-content: center;
  }
}
@media (max-width: 700px) {
  .natural-header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    width: calc(100% - 24px);
    padding: 10px;
    gap: 8px;
  }
  .brand {
    font-size: 12px;
  }
  .brand small {
    max-width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .send {
    display: none;
  }
  .brand-mark {
    display: grid;
    flex: 0 0 30px;
    width: 30px;
    height: 34px;
  }
  .brand { gap: 6px; }
  .mobile-menu { display: flex; align-items: center; justify-content: center; gap: 8px; order: 3; grid-column: 1 / -1; width: 100%; min-height: 44px; border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-bg-soft); color: var(--color-text-strong); font: inherit; cursor: pointer; }
  nav { display: none; grid-column: 1 / -1; order: 4; grid-template-columns: repeat(3, minmax(0, 1fr)); }
  nav.is-open { display: grid; }
  nav::-webkit-scrollbar {
    display: none;
  }
  nav a {
    min-height: 44px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    padding: 8px;
  }
  .mode {
    width: 44px;
    height: 44px;
    padding: 0;
    flex: 0 0 44px;
  }
  .languages button { min-width: 32px; }
  .brand { min-width: 0; flex-shrink: 1; }
  .brand strong { display: block; }
  .brand > div { min-width: 0; }
  .brand small { max-width: 100%; }
  .header-actions {
    gap: 4px;
  }
}
@media (max-width: 360px) { .brand { font-size: 11px; } .brand small { font-size: 10px; } }
</style>
