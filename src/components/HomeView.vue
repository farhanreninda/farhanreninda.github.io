<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import HeroSection from "./HeroSection.vue";
import AboutSection from "./AboutSection.vue";
import SkillsSection from "./SkillsSection.vue";
import ExperienceSection from "./ExperienceSection.vue";
import ProjectsSection from "./ProjectsSection.vue";
import CertificatesSection from "./CertificatesSection.vue";
import ContactSection from "./ContactSection.vue";
import NaturalHome from "./NaturalHome.vue";
import { useLocale } from "@/composables/useLocale";
import { useReveal } from "@/composables/useReveal";
import { usePortfolio } from "@/composables/usePortfolio";

const root = ref<HTMLElement | null>(null);
const { setup } = useReveal();
const { locale } = useLocale();
const { revision, natural } = usePortfolio();

const refreshReveal = async () => {
  await nextTick();
  if (root.value) setup(root.value);
};

onMounted(() => {
  void refreshReveal();
});

watch([locale, revision, natural], () => {
  void refreshReveal();
});
</script>

<template>
  <NaturalHome v-if="natural" />
  <div v-else ref="root" class="home">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <ProjectsSection />
    <CertificatesSection />
    <ContactSection />
  </div>
</template>

<style scoped>
.home {
  display: grid;
  gap: 0;
}
</style>
