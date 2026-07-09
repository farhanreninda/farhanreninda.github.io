import { onMounted, onUnmounted } from "vue";

const observers = new WeakMap<Element, IntersectionObserver>();

/**
 * Adds the `.is-visible` class to elements with `.reveal` when they enter the viewport.
 * Use v-reveal on any element, optionally with a delay class (.reveal-delay-1 .. 5).
 */
export function useReveal() {
  let root: HTMLElement | null = null;

  function setup(rootEl: HTMLElement) {
    root = rootEl;
    const targets = rootEl.querySelectorAll<HTMLElement>(".reveal");
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    targets.forEach((el) => io.observe(el));
    observers.set(rootEl, io);
  }

  onMounted(() => {
    if (root) setup(root);
  });

  onUnmounted(() => {
    if (root) {
      const io = observers.get(root);
      if (io) io.disconnect();
    }
  });

  return { setup };
}