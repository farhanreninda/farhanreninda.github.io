<script setup lang="ts">
import { cv } from "@/data/cv";
</script>

<template>
  <section id="skills" class="skills-section reveal">
    <div class="section-frame skills-layout">
      <header class="section-head reveal reveal-delay-1">
        <div class="section-copy">
          <span class="eyebrow">Keahlian</span>
          <h2 class="section-title">Keahlian teknis untuk membangun aplikasi Android.</h2>
          <p class="lead">Teknologi yang saya gunakan untuk merancang fitur, menghubungkan API, mengelola data, dan menjaga proses pengembangan tetap rapi.</p>
        </div>
      </header>

      <div class="skills-showcase reveal reveal-delay-2">
        <div class="skill-board">
          <article
            v-for="(group, idx) in cv.skills"
            :key="group.category"
            class="skill-card reveal"
            :class="`reveal-delay-${(idx % 5) + 1}`"
          >
            <header>
              <h3>{{ group.category }}</h3>
            </header>
            <p>{{ group.description }}</p>
            <ul>
              <li v-for="skill in group.items" :key="skill.name">{{ skill.name }}</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  position: relative;
  height: 100svh;
  min-height: 720px;
  padding: 5.75rem 0 1rem;
  overflow: hidden;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--color-accent-warm) 5%, transparent), transparent 38%),
    var(--color-bg);
}
.skills-layout {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  height: 100%;
  gap: 1rem;
  align-content: stretch;
}
.section-head {
  max-width: 820px;
}
.section-copy {
  display: grid;
  align-content: start;
  justify-items: start;
}
.section-title {
  max-width: 760px;
  margin: 0.75rem 0 0;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: clamp(1.26rem, 1.75vw, 1.72rem);
  line-height: 1.08;
  letter-spacing: 0;
}
.lead {
  max-width: 760px;
  margin: 0.65rem 0 0;
  color: var(--color-text-muted);
  font-size: 0.88rem;
  line-height: 1.5;
}
.skills-showcase {
  min-height: 0;
  padding: 0.95rem;
  border: 1px solid color-mix(in srgb, var(--color-border) 80%, transparent);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--color-surface) 72%, transparent), color-mix(in srgb, var(--color-bg) 34%, transparent)),
    color-mix(in srgb, var(--color-surface) 66%, transparent);
  box-shadow: var(--color-shadow-sm);
}
.skill-board {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: minmax(0, 1fr);
  gap: 1rem;
  height: 100%;
}
.skill-card {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 0.85rem;
  min-height: 0;
  padding: 1rem 1.05rem 1.05rem;
  border: 1px solid color-mix(in srgb, var(--color-border) 78%, transparent);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--color-accent-warm) 7%, transparent), transparent 62%),
    color-mix(in srgb, var(--color-surface) 74%, transparent);
  box-shadow: var(--color-shadow-sm);
  position: relative;
  overflow: hidden;
}
.skill-card::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 5px;
  background: linear-gradient(180deg, var(--color-accent-warm), color-mix(in srgb, var(--color-accent-warm) 8%, transparent));
  opacity: 0.72;
  pointer-events: none;
}
.skill-card header {
  display: grid;
  align-items: start;
}
.skill-card h3 {
  margin: 0;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: 1rem;
  line-height: 1.14;
}
.skill-card p {
  max-width: 92%;
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  line-height: 1.5;
}
.skill-card ul {
  display: flex;
  flex-wrap: wrap;
  align-content: end;
  align-self: end;
  gap: 0.48rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.skill-card li {
  padding: 0.46rem 0.72rem;
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-bg) 66%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-border) 70%, transparent);
  color: var(--color-text);
  font-size: 0.78rem;
  font-weight: 800;
  position: relative;
  z-index: 1;
}
@media (max-width: 980px) {
  .skills-section {
    height: auto;
    min-height: 100svh;
    overflow: visible;
  }
  .skill-board {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  .skill-card {
    min-height: 150px;
  }
}
@media (max-width: 640px) {
  .skills-section {
    padding: 5rem 0 2.5rem;
  }
  .skills-layout {
    height: auto;
  }
  .skills-showcase {
    padding: 0.75rem;
  }
}
@media (max-height: 760px) and (min-width: 981px) {
  .skills-section {
    height: auto;
    min-height: 100svh;
    overflow: visible;
  }
  .skills-layout {
    height: auto;
  }
  .skill-card {
    min-height: 170px;
  }
}
</style>
