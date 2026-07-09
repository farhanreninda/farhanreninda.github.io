<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import { useHead } from "@unhead/vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { useTheme } from "@/composables/useTheme";

useHead({
  htmlAttrs: { lang: "id" },
  meta: [
    { name: "description", content: "Portofolio Farhan Reninda Budiansyah — Android Developer & Backend Developer." },
    { property: "og:title", content: "Farhan Reninda — Portfolio" },
    { property: "og:description", content: "Android Developer (Kotlin) & Backend Developer (Laravel)." },
    { property: "og:type", content: "website" },
  ],
});

useTheme();

onMounted(async () => {
  await nextTick();
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
</script>

<template>
  <a class="skip-link" href="#main">Lewati ke konten</a>
  <AppHeader />
  <main id="main">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </main>
  <AppFooter />
</template>

<style scoped>
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--color-accent);
  color: #fff;
  padding: 0.5rem 1rem;
  z-index: 100;
  border-radius: 0 0 0.5rem 0;
}
.skip-link:focus {
  left: 0;
}

</style>
