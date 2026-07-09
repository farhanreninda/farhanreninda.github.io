<script setup lang="ts">
import { computed } from "vue";
import { cv } from "@/data/cv";

const currentWork = computed(() => cv.experiences.find((item) => item.type === "work"));
const currentEducation = computed(() => cv.educations.find((item) => item.period === "Sedang Berjalan") || cv.educations[0]);
</script>

<template>
  <section id="about" class="about-section reveal">
    <div class="section-frame about-layout">
      <header class="about-heading reveal reveal-delay-1">
        <span class="eyebrow">Tentang Saya</span>
        <h2 class="section-title">Membangun aplikasi Android yang rapi, stabil, dan mudah dipakai.</h2>
      </header>

      <div class="about-content reveal reveal-delay-2">
        <article class="story-card">
          <div class="story-copy">
            <p v-for="(paragraph, idx) in cv.profile.about" :key="idx">
              {{ paragraph }}
            </p>
          </div>
          <ul class="workflow-list" aria-label="Fokus kerja">
            <li v-for="focus in cv.profile.aboutFocus" :key="focus.label">
              <span>{{ focus.label }}</span>
              <strong>{{ focus.title }}</strong>
              <small>{{ focus.description }}</small>
            </li>
          </ul>
        </article>

        <aside class="about-panel reveal reveal-delay-3">
          <div v-if="currentWork" class="panel-item featured">
            <span>Posisi Saat Ini</span>
            <strong>{{ currentWork.role }}</strong>
            <small>{{ currentWork.company }}</small>
          </div>

          <div v-if="currentEducation" class="panel-item">
            <span>Pendidikan Saat Ini</span>
            <strong>{{ currentEducation.school }}</strong>
            <small>{{ currentEducation.major }}</small>
          </div>

          <div class="panel-item">
            <span>Domisili</span>
            <strong>{{ cv.profile.social.location }}</strong>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  position: relative;
  min-height: 100svh;
  padding: 6rem 0 3rem;
  background:
    radial-gradient(circle at 86% 20%, color-mix(in srgb, var(--color-accent-warm) 10%, transparent), transparent 26%),
    var(--color-surface);
}
.about-layout {
  display: grid;
  min-height: calc(100svh - 9rem);
  gap: 1.1rem;
  align-content: center;
}
.about-heading {
  max-width: 880px;
}
.about-heading .section-title {
  margin: 0.8rem 0 0;
  max-width: 720px;
  font-size: clamp(1.55rem, 2.55vw, 2.45rem);
  line-height: 1.08;
  letter-spacing: 0;
}
.about-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 0.48fr);
  gap: 1rem;
  align-items: stretch;
}
.story-card,
.about-panel {
  border: 1px solid color-mix(in srgb, var(--color-border) 82%, transparent);
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--color-bg) 78%, transparent);
  box-shadow: var(--color-shadow-sm);
}
.story-card {
  display: grid;
  gap: 1rem;
  padding: clamp(1rem, 2vw, 1.35rem);
}
.story-copy {
  display: grid;
  gap: 0.45rem;
}
.story-card p {
  max-width: 780px;
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  line-height: 1.58;
}
.story-card p:first-child {
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 700;
}
.workflow-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.workflow-list li {
  display: grid;
  gap: 0.25rem;
  min-height: 112px;
  padding: 0.85rem;
  border-radius: var(--radius-md);
  background:
    linear-gradient(150deg, color-mix(in srgb, var(--color-accent-warm) 12%, transparent), transparent 72%),
    color-mix(in srgb, var(--color-surface) 62%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-accent-warm) 22%, var(--color-border));
}
.workflow-list span {
  color: var(--color-accent-warm);
  font-size: 0.72rem;
  font-weight: 900;
}
.workflow-list strong {
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: 0.98rem;
}
.workflow-list small {
  color: var(--color-text-muted);
  font-size: 0.78rem;
  line-height: 1.45;
}
.about-panel {
  display: grid;
  gap: 0.75rem;
  padding: 0.95rem;
}
.panel-item {
  display: grid;
  gap: 0.25rem;
  padding: 0.78rem 0.9rem;
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-surface) 64%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-border) 76%, transparent);
}
.panel-item.featured {
  background: color-mix(in srgb, var(--color-accent-warm) 14%, var(--color-surface));
  border-color: color-mix(in srgb, var(--color-accent-warm) 38%, var(--color-border));
}
.panel-item span {
  color: var(--color-accent-warm);
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
}
.panel-item strong {
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: 1rem;
  line-height: 1.25;
}
.panel-item small {
  color: var(--color-text-muted);
  font-size: 0.86rem;
  line-height: 1.45;
}
@media (max-width: 900px) {
  .about-content { grid-template-columns: 1fr; }
}
@media (max-width: 680px) {
  .workflow-list { grid-template-columns: 1fr; }
}
</style>
