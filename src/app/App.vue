<script setup lang="ts">
import { onMounted, nextTick } from "vue";
import { useHead } from "@unhead/vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import ScrollTopButton from "@/components/ScrollTopButton.vue";
import { useTheme } from "@/composables/useTheme";
import { useLocale } from "@/composables/useLocale";

const { locale, copy } = useLocale();

useHead({
  title: () => copy.value.app.ogTitle,
  htmlAttrs: { lang: () => locale.value },
  meta: [
    { name: "description", content: () => copy.value.app.description },
    { property: "og:title", content: () => copy.value.app.ogTitle },
    { property: "og:description", content: () => copy.value.app.ogDescription },
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
  <a class="skip-link" href="#main">{{ copy.app.skip }}</a>
  <AppHeader />
  <main id="main">
    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </main>
  <ScrollTopButton />
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
