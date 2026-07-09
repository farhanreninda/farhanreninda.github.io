<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";

const { theme, toggle } = useTheme();
const isDark = () => theme.value === "dark";
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="isDark() ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'"
    :aria-pressed="isDark()"
    @click="toggle"
  >
    <span v-if="isDark()" aria-hidden="true">🌙</span>
    <span v-else aria-hidden="true">☀️</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}
.theme-toggle:hover {
  background: var(--color-bg-soft);
  transform: translateY(-1px);
}
</style>