<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useLocale } from "@/composables/useLocale";

const visible = ref(false);
const { copy } = useLocale();

const updateVisibility = () => {
  visible.value = window.scrollY > 520;
};

const scrollToTop = () => {
  window.history.pushState(null, "", "#top");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateVisibility);
});
</script>

<template>
  <Transition name="scroll-top">
    <button
      v-show="visible"
      class="scroll-top-button"
      type="button"
      :aria-label="copy.scrollTop.label"
      @click="scrollToTop"
    >
      <span class="scroll-top-arrow" aria-hidden="true"></span>
    </button>
  </Transition>
</template>

<style scoped>
.scroll-top-button {
  position: fixed;
  right: max(1rem, env(safe-area-inset-right));
  bottom: max(1rem, env(safe-area-inset-bottom));
  z-index: 90;
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  padding: 0;
  border: 1px solid color-mix(in srgb, var(--color-accent-warm) 42%, var(--color-border));
  border-radius: 1.25rem;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--color-accent-warm) 22%, transparent), transparent 68%),
    color-mix(in srgb, var(--color-surface) 92%, transparent);
  color: var(--color-text-strong);
  box-shadow: var(--color-shadow-md);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  cursor: pointer;
  transition:
    transform 0.28s var(--ease-out),
    border-color 0.28s var(--ease-out),
    background 0.28s var(--ease-out),
    box-shadow 0.28s var(--ease-out);
}
.scroll-top-button:hover {
  transform: translateY(-4px) rotate(-2deg);
  border-color: var(--color-accent-warm);
  box-shadow: var(--color-shadow-lg);
}
.scroll-top-arrow {
  width: 0.72rem;
  height: 0.72rem;
  margin-top: 0.22rem;
  border-top: 2px solid currentColor;
  border-left: 2px solid currentColor;
  transform: rotate(45deg);
}
.scroll-top-enter-active,
.scroll-top-leave-active {
  transition: opacity 0.28s var(--ease-out), transform 0.28s var(--ease-out);
}
.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.96);
}
@media (max-width: 640px) {
  .scroll-top-button {
    right: 0.85rem;
    bottom: max(1.4rem, env(safe-area-inset-bottom));
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 1.1rem;
  }
}
</style>
