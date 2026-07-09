<script setup lang="ts">
import { computed, ref } from "vue";
import { cv } from "@/data/cv";
import type { Project } from "@/types/cv";

const selectedProject = ref<Project | null>(null);
const selectedImageIndex = ref(0);

const openProject = (project: Project) => {
  selectedImageIndex.value = 0;
  selectedProject.value = project;
};

const closeProject = () => {
  selectedProject.value = null;
  selectedImageIndex.value = 0;
};

const selectedProjectImages = computed(() => {
  const project = selectedProject.value;
  if (!project) return [];
  const images = project.images ?? [];
  const gallery = project.thumbnail ? [project.thumbnail, ...images] : images;
  return Array.from(new Set(gallery));
});

const activeProjectImage = computed(() => selectedProjectImages.value[selectedImageIndex.value] || "");

const isMobileProjectImage = computed(() =>
  /\/projects\/sip\/detail-(09|10|11|12)\.png$/.test(activeProjectImage.value)
);

const hasPreviousProjectImage = computed(() => selectedImageIndex.value > 0);

const hasNextProjectImage = computed(() => selectedImageIndex.value < selectedProjectImages.value.length - 1);

const activeProjectImageAlt = computed(() => {
  if (!selectedProject.value) return "";
  return `Screenshot ${selectedProject.value.name} ${selectedImageIndex.value + 1}`;
});

const showProjectImage = (index: number) => {
  selectedImageIndex.value = index;
};

const showPreviousImage = () => {
  if (!hasPreviousProjectImage.value) return;
  selectedImageIndex.value -= 1;
};

const showNextImage = () => {
  if (!hasNextProjectImage.value) return;
  selectedImageIndex.value += 1;
};

const projectId = (project: Project) =>
  project.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const projectExternalLink = (project: Project) => project.playUrl || project.link || "";

const projectExternalLabel = (project: Project) => {
  if (project.playUrl) return "Buka Play Store";
  if (project.link && project.category.toLowerCase().includes("web")) return "Buka website";
  return "Buka tautan proyek";
};
</script>

<template>
  <section id="projects" class="projects-section reveal">
    <div class="section-frame">
      <header class="section-head reveal reveal-delay-1">
        <span class="eyebrow">Proyek</span>
        <div>
          <h2 class="section-title">Implementasi proyek dalam pengembangan aplikasi.</h2>
          <p class="lead">Kumpulan aplikasi yang merepresentasikan pengalaman saya dalam pengembangan mobile, pengelolaan data, integrasi sistem, dan penyelesaian kebutuhan operasional pengguna.</p>
        </div>
      </header>

      <ul class="project-grid">
        <li
          v-for="(project, idx) in cv.projects"
          :key="project.name"
          class="project-item reveal"
          :class="`reveal-delay-${(idx % 5) + 1}`"
        >
          <button class="project-card" type="button" @click="openProject(project)">
            <div class="project-media" v-if="project.thumbnail">
              <img :src="project.thumbnail" :alt="`Screenshot ${project.name}`" loading="lazy" />
            </div>
            <div class="project-body">
              <span class="project-badge">{{ project.badge }}</span>
              <h3>{{ project.name }}</h3>
              <p>{{ project.description }}</p>
              <div class="project-footer">
                <ul v-if="project.tech" class="tech-list" aria-label="Teknologi">
                  <li v-for="tech in project.tech" :key="tech">{{ tech }}</li>
                </ul>
                <span class="project-action">Lihat detail</span>
              </div>
            </div>
          </button>
        </li>
      </ul>

      <Teleport to="body">
        <Transition name="project-modal">
          <div
            v-if="selectedProject"
            class="project-modal"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="`project-title-${projectId(selectedProject)}`"
            @click.self="closeProject"
            @keydown.esc="closeProject"
            @keydown.left.prevent="showPreviousImage"
            @keydown.right.prevent="showNextImage"
          >
            <article class="project-detail" tabindex="-1">
              <button class="modal-close" type="button" aria-label="Tutup detail proyek" autofocus @click="closeProject">x</button>
              <div class="detail-media" :class="{ 'is-mobile-shot': isMobileProjectImage }" v-if="activeProjectImage">
                <Transition name="project-image" mode="out-in">
                  <img :key="activeProjectImage" :src="activeProjectImage" :alt="activeProjectImageAlt" />
                </Transition>
                <template v-if="selectedProjectImages.length > 1">
                  <button v-if="hasPreviousProjectImage" class="image-nav is-prev" type="button" aria-label="Gambar sebelumnya" @click="showPreviousImage">
                    <span aria-hidden="true">&lt;</span>
                  </button>
                  <button v-if="hasNextProjectImage" class="image-nav is-next" type="button" aria-label="Gambar berikutnya" @click="showNextImage">
                    <span aria-hidden="true">&gt;</span>
                  </button>
                  <span class="image-count">{{ selectedImageIndex + 1 }} / {{ selectedProjectImages.length }}</span>
                </template>
              </div>
              <div class="detail-content">
                <span class="project-badge">{{ selectedProject.badge }}</span>
                <h3 :id="`project-title-${projectId(selectedProject)}`">{{ selectedProject.name }}</h3>
                <p class="detail-category">{{ selectedProject.category }}</p>
                <p class="detail-description">{{ selectedProject.description }}</p>
                <ul v-if="selectedProject.tech" class="tech-list detail-tech" aria-label="Teknologi proyek">
                  <li v-for="tech in selectedProject.tech" :key="tech">{{ tech }}</li>
                </ul>
                <div class="detail-actions" v-if="selectedProject.demoUrl || projectExternalLink(selectedProject)">
                  <a v-if="selectedProject.demoUrl" :href="selectedProject.demoUrl" target="_blank" rel="noopener noreferrer">
                    Lihat video demo
                  </a>
                  <a v-if="projectExternalLink(selectedProject)" :href="projectExternalLink(selectedProject)" target="_blank" rel="noopener noreferrer">
                    {{ projectExternalLabel(selectedProject) }}
                  </a>
                </div>
                <div v-if="selectedProjectImages.length > 1" class="image-dots" aria-label="Daftar gambar proyek">
                  <button
                    v-for="(_, index) in selectedProjectImages"
                    :key="index"
                    type="button"
                    :class="{ 'is-active': selectedImageIndex === index }"
                    :aria-label="`Tampilkan gambar ${index + 1}`"
                    @click="showProjectImage(index)"
                  />
                </div>
              </div>
            </article>
          </div>
        </Transition>
      </Teleport>
    </div>
  </section>
</template>

<style scoped>
.projects-section {
  position: relative;
  min-height: 100svh;
  padding: 6rem 0 4rem;
  background: var(--color-bg);
}
.section-head {
  display: grid;
  max-width: 860px;
  gap: 0.85rem;
  align-items: start;
  margin-bottom: 2rem;
}
.section-head .eyebrow {
  justify-self: start;
}
.section-title {
  margin: 0;
  max-width: 760px;
  font-size: clamp(1.45rem, 2.35vw, 2.35rem);
  line-height: 1.08;
  letter-spacing: 0;
}
.lead {
  max-width: 780px;
  margin: 0.65rem 0 0;
  color: var(--color-text-muted);
  font-size: 0.92rem;
  line-height: 1.55;
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.project-item {
  min-width: 0;
}
.project-card {
  display: grid;
  grid-template-rows: 190px 1fr;
  width: 100%;
  height: 100%;
  min-height: 390px;
  padding: 0;
  text-align: left;
  font: inherit;
  color: inherit;
  cursor: pointer;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--color-shadow-sm);
  transition: transform 0.45s var(--ease-out), box-shadow 0.45s var(--ease-out), border-color 0.45s var(--ease-out);
}
.project-card:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--color-accent-warm) 72%, transparent);
  outline-offset: 4px;
}
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--color-shadow-lg);
  border-color: color-mix(in srgb, var(--color-accent-warm) 42%, var(--color-border));
}
.project-media {
  min-height: 190px;
  background: var(--color-surface-elev);
  overflow: hidden;
}
.project-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(0.94) contrast(1.03);
  transition: transform 0.7s var(--ease-out);
}
.project-card:hover img { transform: scale(1.04); }
.project-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.62rem;
  padding: 1.15rem;
}
.project-badge {
  justify-self: start;
  padding: 0.25rem 0.6rem;
  background: var(--color-accent-warm);
  color: var(--color-accent-contrast);
  border-radius: var(--radius-pill);
  font-size: 0.68rem;
  font-weight: 900;
  text-transform: uppercase;
}
.project-card h3 {
  margin: 0;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: 1.1rem;
  line-height: 1.15;
}
.project-card p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.88rem;
  line-height: 1.55;
}
.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.tech-list li {
  padding: 0.28rem 0.55rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-text);
  font-size: 0.72rem;
  font-weight: 800;
}
.project-action {
  justify-self: start;
  color: var(--color-text-strong);
  font-size: 0.88rem;
  font-weight: 900;
  border-bottom: 2px solid var(--color-accent-warm);
}
.project-footer {
  display: grid;
  align-content: end;
  gap: 0.7rem;
  width: 100%;
  min-height: 4.9rem;
  margin-top: auto;
}
.project-modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: clamp(1rem, 3vw, 2rem);
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--color-bg) 88%, transparent), color-mix(in srgb, var(--color-surface) 62%, transparent)),
    color-mix(in srgb, var(--color-bg) 78%, transparent);
  backdrop-filter: blur(18px);
}
.project-detail {
  position: relative;
  display: grid;
  grid-template-columns: minmax(320px, 1fr) minmax(300px, 0.75fr);
  align-items: stretch;
  gap: 0;
  width: min(1040px, 100%);
  max-height: min(90svh, 820px);
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-accent-warm) 24%, var(--color-border));
  border-radius: 2rem;
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--color-accent-warm) 6%, transparent), transparent 48%),
    var(--color-surface);
  box-shadow: 0 28px 90px color-mix(in srgb, #000 38%, transparent);
  transform-origin: center;
}
.modal-close {
  position: absolute;
  top: 1.1rem;
  right: 1.1rem;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 2.35rem;
  height: 2.35rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-bg) 78%, transparent);
  color: var(--color-text-strong);
  font-size: 1.45rem;
  line-height: 1;
  cursor: pointer;
  transition: transform 0.25s var(--ease-out), background 0.25s var(--ease-out), border-color 0.25s var(--ease-out);
}
.modal-close:hover {
  transform: scale(1.04);
  border-color: color-mix(in srgb, var(--color-accent-warm) 45%, var(--color-border));
  background: color-mix(in srgb, var(--color-surface-elev) 88%, transparent);
}
.detail-media {
  position: relative;
  display: grid;
  place-items: center;
  align-self: center;
  width: calc(100% - 2.2rem);
  height: min(68svh, 590px);
  min-height: 330px;
  padding: 0;
  margin: 1.1rem;
  overflow: hidden;
  border-radius: 1.45rem;
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--color-accent-warm) 10%, transparent), transparent 58%),
    color-mix(in srgb, var(--color-surface-elev) 80%, transparent);
}
.detail-media img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
  border-radius: 1.1rem;
  background: color-mix(in srgb, var(--color-bg) 92%, transparent);
}
.detail-media.is-mobile-shot {
  height: min(76svh, 690px);
  overflow: auto;
  place-items: start center;
  align-content: start;
  padding: 0.75rem 0;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: color-mix(in srgb, var(--color-accent-warm) 58%, transparent) transparent;
}
.detail-media.is-mobile-shot::-webkit-scrollbar {
  width: 0.45rem;
}
.detail-media.is-mobile-shot::-webkit-scrollbar-thumb {
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-accent-warm) 58%, transparent);
}
.detail-media.is-mobile-shot img {
  width: auto;
  height: auto;
  max-width: min(100%, 300px);
  max-height: none;
}
.image-nav {
  position: absolute;
  top: 50%;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 2.35rem;
  height: 2.35rem;
  border: 1px solid color-mix(in srgb, var(--color-border) 72%, transparent);
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-bg) 86%, transparent);
  color: var(--color-text-strong);
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
  transform: translateY(-50%);
  transition: transform 0.25s var(--ease-out), background 0.25s var(--ease-out), border-color 0.25s var(--ease-out);
}
.image-nav:hover {
  transform: translateY(-50%) scale(1.04);
  background: var(--color-accent-warm);
  color: var(--color-accent-contrast);
  border-color: var(--color-accent-warm);
}
.image-nav.is-prev {
  left: 0.8rem;
}
.image-nav.is-next {
  right: 0.8rem;
}
.image-count {
  position: absolute;
  right: 0.9rem;
  bottom: 0.85rem;
  z-index: 2;
  padding: 0.32rem 0.62rem;
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-bg) 86%, transparent);
  color: var(--color-text-strong);
  font-size: 0.72rem;
  font-weight: 900;
}
.detail-content {
  display: grid;
  align-content: center;
  gap: 0.8rem;
  max-height: min(86svh, 760px);
  overflow: auto;
  padding: 2.3rem;
  background: color-mix(in srgb, var(--color-surface) 84%, transparent);
}
.detail-content h3 {
  margin: 0;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: clamp(1.45rem, 2.4vw, 2.4rem);
  line-height: 1.05;
}
.detail-category,
.detail-description {
  margin: 0;
  color: var(--color-text-muted);
}
.detail-category {
  font-size: 0.82rem;
  font-weight: 900;
}
.detail-description {
  font-size: 0.96rem;
  line-height: 1.62;
}
.detail-tech {
  margin-top: 0.2rem;
}
.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 0.4rem;
}
.detail-actions a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.7rem;
  padding: 0.65rem 1rem;
  border-radius: var(--radius-pill);
  background: var(--color-accent-warm);
  color: var(--color-accent-contrast);
  font-size: 0.85rem;
  font-weight: 900;
}
.detail-actions a + a {
  background: color-mix(in srgb, var(--color-surface-elev) 74%, transparent);
  color: var(--color-text-strong);
  border: 1px solid var(--color-border);
}
.image-dots {
  display: flex;
  flex-wrap: wrap;
  gap: 0.38rem;
  margin-top: 0.1rem;
}
.image-dots button {
  width: 0.68rem;
  height: 0.68rem;
  padding: 0;
  border: 1px solid color-mix(in srgb, var(--color-border) 72%, transparent);
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-text-muted) 26%, transparent);
  cursor: pointer;
  transition: transform 0.22s var(--ease-out), background 0.22s var(--ease-out), width 0.22s var(--ease-out);
}
.image-dots button.is-active {
  width: 1.55rem;
  background: var(--color-accent-warm);
  border-color: var(--color-accent-warm);
}
.project-image-enter-active,
.project-image-leave-active {
  transition: opacity 0.22s var(--ease-out), transform 0.22s var(--ease-out);
}
.project-image-enter-from,
.project-image-leave-to {
  opacity: 0;
  transform: scale(0.985);
}
.project-modal-enter-active,
.project-modal-leave-active {
  transition: opacity 0.34s var(--ease-out), backdrop-filter 0.34s var(--ease-out);
}
.project-modal-enter-active .project-detail,
.project-modal-leave-active .project-detail {
  transition: opacity 0.34s var(--ease-out), transform 0.38s var(--ease-out);
}
.project-modal-enter-from,
.project-modal-leave-to {
  opacity: 0;
  backdrop-filter: blur(0);
}
.project-modal-enter-from .project-detail,
.project-modal-leave-to .project-detail {
  opacity: 0;
  transform: translateY(18px) scale(0.97);
}
@media (max-width: 980px) {
  .project-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .project-detail { grid-template-columns: 1fr; }
  .detail-media {
    width: calc(100% - 1.7rem);
    height: min(54svh, 470px);
    min-height: 260px;
    margin: 0.85rem;
  }
  .detail-media.is-mobile-shot {
    height: min(70svh, 650px);
  }
}
@media (max-width: 640px) {
  .project-grid { grid-template-columns: 1fr; }
  .project-modal {
    padding: 0.85rem;
  }
  .detail-media.is-mobile-shot {
    height: min(68svh, 610px);
  }
  .detail-media.is-mobile-shot img {
    max-width: min(100%, 285px);
  }
  .detail-content {
    padding: 1.35rem;
  }
}
</style>
