<script setup lang="ts">
import { useLocale } from "@/composables/useLocale";

const { currentCv } = useLocale();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-mark" aria-hidden="true">FR</span>
        <div>
          <strong>{{ currentCv.profile.name }}</strong>
          <p>{{ currentCv.profile.title }} · {{ currentCv.profile.social.location }}</p>
        </div>
      </div>
      <p class="footer-copy">© {{ year }}</p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--color-accent-warm) 10%, transparent), transparent 42%),
    var(--color-bg-soft);
  padding: 1.35rem 0;
  border-top: 1px solid color-mix(in srgb, var(--color-border) 76%, transparent);
}
.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  flex-wrap: wrap;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 3.5rem);
}
.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.footer-mark {
  display: inline-grid;
  place-items: center;
  width: 2.45rem;
  height: 2.45rem;
  border-radius: var(--radius-pill);
  background: var(--color-accent-warm);
  color: var(--color-accent-contrast);
  font-size: 0.78rem;
  font-weight: var(--weight-heading);
}
.footer-brand strong {
  display: block;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: 0.95rem;
  line-height: 1.25;
}
.footer-brand p,
.footer-copy {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.82rem;
  font-weight: var(--weight-strong);
}
.footer-copy {
  padding: 0.45rem 0.85rem;
  border: 1px solid color-mix(in srgb, var(--color-border) 62%, transparent);
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-bg) 36%, transparent);
}
@media (max-width: 640px) {
  .footer-inner {
    justify-content: center;
    text-align: center;
  }
  .footer-brand {
    justify-content: center;
  }
}
</style>
