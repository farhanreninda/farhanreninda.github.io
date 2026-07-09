<script setup lang="ts">
import { cv } from "@/data/cv";
</script>

<template>
  <section id="education" class="credentials-section reveal">
    <div class="section-frame credentials-layout">
      <header class="section-head reveal reveal-delay-1">
        <span class="eyebrow">Pendidikan</span>
        <h2 class="section-title">Riwayat pendidikan dan sertifikasi pendukung.</h2>
      </header>

      <div class="credentials-board">
        <article class="education-panel reveal reveal-delay-2">
          <div class="panel-head">
            <span>Pendidikan Formal</span>
          </div>

          <ol class="education-list">
            <li v-for="edu in cv.educations" :key="edu.school">
              <div class="edu-content">
                <h3>{{ edu.school }}</h3>
                <p class="major">{{ edu.major }}</p>
                <p v-if="edu.gpa" class="edu-detail">IPK {{ edu.gpa }}</p>
                <p v-if="edu.note" class="note">{{ edu.note }}</p>
              </div>
            </li>
          </ol>
        </article>

        <aside class="certificate-panel reveal reveal-delay-3">
          <div class="panel-head">
            <span>Sertifikasi</span>
          </div>

          <ul class="certificate-list">
            <li v-for="cert in cv.certificates" :key="cert.name">
              <span>{{ cert.period }}</span>
              <h3>{{ cert.name }}</h3>
              <p>{{ cert.issuer }}</p>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.credentials-section {
  min-height: 100svh;
  display: grid;
  align-items: center;
  padding: 7rem 0 2.75rem;
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--color-accent-warm) 5%, transparent), transparent 46%),
    var(--color-surface);
}
.credentials-layout {
  display: grid;
  gap: 1.05rem;
}
.section-head {
  display: grid;
  max-width: 820px;
  justify-items: start;
}
.section-title {
  max-width: 660px;
  margin: 0.75rem 0 0;
  font-size: clamp(1.35rem, 2vw, 2.05rem);
  line-height: 1.08;
  letter-spacing: 0;
}
.credentials-board {
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(300px, 0.82fr);
  gap: 1.05rem;
  align-items: start;
}
.education-panel,
.certificate-panel {
  border: 1px solid color-mix(in srgb, var(--color-border) 78%, transparent);
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--color-bg) 78%, transparent);
  box-shadow: var(--color-shadow-sm);
}
.education-panel {
  padding: 1.05rem;
}
.certificate-panel {
  padding: 1.05rem;
  background:
    linear-gradient(150deg, color-mix(in srgb, var(--color-accent-warm) 9%, transparent), transparent 72%),
    color-mix(in srgb, var(--color-bg) 78%, transparent);
}
.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.85rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 72%, transparent);
}
.panel-head span {
  color: var(--color-accent-warm);
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: 900;
}
.education-list,
.certificate-list {
  display: grid;
  gap: 0.72rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.education-list li {
  display: grid;
  align-items: start;
  gap: 1rem;
  padding: 0.9rem;
  border: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-surface) 72%, transparent);
}
.edu-content {
  display: grid;
  gap: 0.3rem;
}
.education-list h3,
.certificate-list h3 {
  margin: 0;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: 1rem;
  line-height: 1.2;
}
.major,
.edu-detail,
.note,
.certificate-list p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.82rem;
  line-height: 1.45;
}
.edu-detail {
  color: var(--color-text);
  font-size: 0.78rem;
  font-weight: 800;
}
.note {
  max-width: 700px;
}
.certificate-list li {
  display: grid;
  gap: 0.35rem;
  padding: 0.95rem;
  border: 1px solid color-mix(in srgb, var(--color-border) 62%, transparent);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-surface) 72%, transparent);
}
.certificate-list span {
  color: var(--color-accent-warm);
  font-size: 0.72rem;
  font-weight: 900;
}
@media (max-width: 920px) {
  .credentials-board {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .credentials-section {
    padding: 5rem 0 2.75rem;
  }
}
</style>
