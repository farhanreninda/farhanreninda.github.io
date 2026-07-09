import { onMounted, onBeforeUnmount, ref } from "vue";

/**
 * Returns the id of the section currently in view, just below the sticky header.
 * A section is considered "active" when its top edge is at or above the header
 * offset line and its bottom is still below that line.
 */
export function useActiveSection(ids: string[], headerOffset = 80) {
  const active = ref<string>(ids[0] ?? "");
  let raf = 0;

  const compute = () => {
    let bestId = active.value;
    // Pick the last section whose top is <= headerOffset (i.e. already scrolled past it).
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top - headerOffset <= 0 && rect.bottom > headerOffset) {
        bestId = id;
      }
    }
    // If none matched (we are still above the first section), keep the first id active.
    if (!ids.includes(bestId)) bestId = ids[0] ?? "";
    active.value = bestId;
  };

  const onScroll = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(compute);
  };

  onMounted(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Initial computation + a small delay so layout has settled.
    compute();
    setTimeout(compute, 80);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    cancelAnimationFrame(raf);
  });

  return { active };
}