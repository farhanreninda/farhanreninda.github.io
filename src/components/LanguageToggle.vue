<script setup lang="ts">
import { useLocale } from "@/composables/useLocale";
import type { Locale } from "@/types/cv";

const { locale, copy, setLocale } = useLocale();

const options: { value: Locale; label: string }[] = [
  { value: "id", label: "ID" },
  { value: "en", label: "EN" },
];
</script>

<template>
  <div class="language-toggle" role="group" :aria-label="copy.language.label">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :class="{ 'is-active': locale === option.value }"
      :aria-pressed="locale === option.value"
      @click="setLocale(option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.language-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.18rem;
  padding: 0.18rem;
  border: 1px solid color-mix(in srgb, var(--color-border) 70%, transparent);
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-surface) 66%, transparent);
}
.language-toggle button {
  display: inline-grid;
  place-items: center;
  min-width: 2.05rem;
  min-height: 2rem;
  padding: 0 0.48rem;
  border: 0;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-text-muted);
  font: inherit;
  font-size: 0.72rem;
  font-weight: var(--weight-label);
  cursor: pointer;
  transition: color 0.22s var(--ease-out), background 0.22s var(--ease-out), transform 0.22s var(--ease-out);
}
.language-toggle button:hover {
  color: var(--color-text-strong);
  transform: translateY(-1px);
}
.language-toggle button.is-active {
  background: var(--color-accent-warm);
  color: var(--color-accent-contrast);
  box-shadow: 0 5px 12px -8px color-mix(in srgb, var(--color-accent-warm) 70%, transparent);
}
@media (max-width: 700px) {
  .language-toggle {
    justify-self: end;
  }
  .language-toggle button {
    min-width: 1.85rem;
    min-height: 1.9rem;
    font-size: 0.68rem;
  }
}
</style>
