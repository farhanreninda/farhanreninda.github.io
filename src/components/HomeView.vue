<script setup lang="ts">
import { onMounted, ref } from "vue";
import HeroSection from "./HeroSection.vue";
import AboutSection from "./AboutSection.vue";
import SkillsSection from "./SkillsSection.vue";
import ExperienceSection from "./ExperienceSection.vue";
import ProjectsSection from "./ProjectsSection.vue";
import CertificatesSection from "./CertificatesSection.vue";
import ContactSection from "./ContactSection.vue";
import { useReveal } from "@/composables/useReveal";

const root = ref<HTMLElement | null>(null);
const { setup } = useReveal();

onMounted(() => {
  if (root.value) setup(root.value);
});
</script>

<template>
  <div ref="root" class="home">
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
