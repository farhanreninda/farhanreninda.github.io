<script setup lang="ts">
import { computed } from "vue";
import { useLocale } from "@/composables/useLocale";
import type { Experience } from "@/types/cv";

const { currentCv, copy, locale } = useLocale();
const workExperiences = computed(() => currentCv.value.experiences.filter((item) => item.type === "work"));
const projectExperiences = computed(() => currentCv.value.experiences.filter((item) => item.type === "internship"));
const organizationExperiences = computed(() => currentCv.value.experiences.filter((item) => item.type === "organization"));

const experienceGroups = computed(() => [
  {
    key: "work",
    title: copy.value.experience.groups.work.title,
    description: copy.value.experience.groups.work.description,
    items: workExperiences.value,
  },
  {
    key: "project",
    title: copy.value.experience.groups.project.title,
    description: copy.value.experience.groups.project.description,
    items: projectExperiences.value,
  },
  {
    key: "organization",
    title: copy.value.experience.groups.organization.title,
    description: copy.value.experience.groups.organization.description,
    items: organizationExperiences.value,
  },
]);

const monthMap: Record<string, number> = {
  Januari: 1,
  Februari: 2,
  Maret: 3,
  April: 4,
  Mei: 5,
  Juni: 6,
  Juli: 7,
  Agustus: 8,
  September: 9,
  Oktober: 10,
  November: 11,
  Desember: 12,
  January: 1,
  February: 2,
  March: 3,
  June: 6,
  May: 5,
  July: 7,
  August: 8,
  October: 10,
  December: 12,
};

const parsePeriod = (value: string) => {
  if (value === "Sekarang" || value === "Present") {
    const now = new Date();
    return { month: now.getMonth() + 1, year: now.getFullYear() };
  }

  const [monthName, yearText] = value.split(" ");
  return {
    month: monthMap[monthName] ?? 1,
    year: Number(yearText),
  };
};

const formatDuration = (experience: Experience) => {
  const start = parsePeriod(experience.start);
  const end = parsePeriod(experience.end);
  const monthDiff = (end.year - start.year) * 12 + end.month - start.month;
  const totalMonths = Math.max(1, monthDiff);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (locale.value === "en") {
    if (years && months) return `${years} yrs ${months} mos`;
    if (years) return `${years} yr${years > 1 ? "s" : ""}`;
    return `${months} mo${months > 1 ? "s" : ""}`;
  }

  if (years && months) return `${years} thn ${months} bln`;
  if (years) return `${years} thn`;
  return `${months} bln`;
};

const isCurrent = (experience: Experience) => experience.end === "Sekarang" || experience.end === "Present";
</script>

<template>
  <section id="experience" class="experience-section reveal">
    <div class="section-frame experience-layout">
      <header class="section-head reveal reveal-delay-1">
        <span class="eyebrow">{{ copy.experience.eyebrow }}</span>
        <h2 class="section-title">{{ copy.experience.title }}</h2>
        <p class="lead">{{ copy.experience.lead }}</p>
      </header>

      <div class="experience-board">
        <article
          v-for="(group, groupIndex) in experienceGroups"
          :key="group.title"
          class="experience-panel reveal"
          :class="[`is-${group.key}`, `reveal-delay-${groupIndex + 2}`]"
        >
          <header>
            <span>{{ group.title }}</span>
            <p>{{ group.description }}</p>
          </header>

          <ol>
            <li v-for="item in group.items" :key="`${item.company}-${item.start}`" :class="{ 'is-current': isCurrent(item) }">
              <div class="meta-line">
                <time>{{ item.start }} - {{ item.end }}</time>
                <div class="meta-badges">
                  <span class="duration-pill">{{ formatDuration(item) }}</span>
                  <span v-if="isCurrent(item)" class="current-badge">{{ copy.experience.currentBadge }}</span>
                </div>
              </div>
              <h3>{{ item.role }}</h3>
              <p class="company">{{ item.company }}</p>
              <ul class="description-list">
                <li v-for="bullet in item.bullets" :key="bullet">{{ bullet }}</li>
              </ul>
            </li>
          </ol>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience-section {
  position: relative;
  min-height: 100svh;
  padding: 5.75rem 0 3.25rem;
  background: var(--color-surface);
}
.experience-layout {
  display: grid;
  gap: 1.3rem;
}
.section-head {
  display: grid;
  max-width: 820px;
  justify-items: start;
}
.section-title {
  max-width: 680px;
  margin: 0.75rem 0 0;
  font-size: var(--text-section-heading);
  line-height: 1.08;
  letter-spacing: 0;
}
.lead {
  max-width: 760px;
  margin: 0.65rem 0 0;
  color: var(--color-text-muted);
  font-size: var(--text-section-lead);
  line-height: 1.5;
}
.experience-board {
  display: grid;
  gap: 1.2rem;
  padding: 1.05rem;
  border: 1px solid color-mix(in srgb, var(--color-border) 80%, transparent);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--color-accent-warm) 7%, transparent), transparent 42%),
    color-mix(in srgb, var(--color-bg) 24%, transparent);
  box-shadow: var(--color-shadow-sm);
}
.experience-panel {
  display: grid;
  align-content: start;
  padding: 1.1rem;
  border: 1px solid color-mix(in srgb, var(--color-border) 78%, transparent);
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--color-surface) 74%, transparent);
  overflow: hidden;
}
.experience-panel.is-work {
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--color-accent-warm) 6%, transparent), transparent 70%),
    color-mix(in srgb, var(--color-surface) 74%, transparent);
}
.experience-panel.is-organization {
  opacity: 0.94;
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--color-accent-warm) 4%, transparent), transparent 72%),
    color-mix(in srgb, var(--color-surface) 74%, transparent);
}
.experience-panel header {
  display: grid;
  gap: 0.45rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 72%, transparent);
}
.experience-panel header span {
  color: var(--color-accent-warm);
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: var(--weight-heading);
}
.experience-panel header p {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.82rem;
  line-height: 1.5;
}
.experience-panel > ol {
  display: grid;
  align-content: start;
  gap: 0.8rem;
  grid-auto-rows: 1fr;
  list-style: none;
  margin: 0;
  padding: 1rem 0 0;
}
.experience-panel.is-work > ol {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.experience-panel.is-project > ol {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.experience-panel.is-organization > ol {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: auto;
  align-items: start;
  gap: 0.85rem;
}
.experience-panel > ol > li {
  display: grid;
  align-content: start;
  padding: 0.95rem;
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-bg) 56%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-border) 58%, transparent);
}
.experience-panel.is-organization > ol > li {
  padding: 1rem;
  gap: 0.32rem;
}
.experience-panel > ol > li.is-current {
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--color-accent-warm) 16%, transparent), transparent 70%),
    color-mix(in srgb, var(--color-bg) 58%, transparent);
  border-color: color-mix(in srgb, var(--color-accent-warm) 55%, var(--color-border));
}
.meta-line {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.85rem;
  min-height: 1.75rem;
}
.meta-line time {
  display: block;
  color: var(--color-accent-warm);
  font-size: 0.72rem;
  font-weight: var(--weight-label);
  line-height: 1.4;
  overflow-wrap: anywhere;
}
.meta-badges {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.duration-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 1.55rem;
  padding: 0.22rem 0.52rem;
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--color-accent-warm) 12%, transparent);
  color: var(--color-text);
  font-size: 0.68rem;
  font-weight: var(--weight-label);
  white-space: nowrap;
}
.experience-panel h3 {
  margin: 0.62rem 0 0;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: var(--text-card-title);
  font-weight: var(--weight-heading);
  line-height: 1.2;
}
.experience-panel.is-organization h3 {
  font-size: 0.98rem;
  line-height: 1.32;
}
.experience-panel.is-organization .company,
.experience-panel.is-organization .meta-line time {
  font-size: 0.72rem;
}
.current-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 1.55rem;
  padding: 0.28rem 0.68rem;
  border-radius: var(--radius-pill);
  background: var(--color-accent-warm);
  color: var(--color-accent-contrast);
  font-size: 0.68rem;
  font-weight: var(--weight-label);
  white-space: nowrap;
}
.company {
  margin: 0.28rem 0 0;
  color: var(--color-text-muted);
  font-size: 0.82rem;
  font-weight: var(--weight-strong);
}
.description-list {
  display: grid;
  gap: 0.32rem;
  margin: 0.62rem 0 0;
  padding-left: 1rem;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  line-height: 1.52;
}
.description-list li {
  padding-left: 0.1rem;
}
.experience-panel.is-organization .description-list {
  margin-top: 0.52rem;
  font-size: 0.74rem;
  line-height: 1.45;
}
@media (max-width: 1020px) {
  .experience-panel.is-work > ol,
  .experience-panel.is-project > ol,
  .experience-panel.is-organization > ol {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 720px) {
  .experience-section {
    padding: 5rem 0 2.5rem;
  }
  .experience-board {
    padding: 0.75rem;
  }
  .meta-line {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
  .meta-badges {
    justify-content: flex-start;
  }
}
@media (max-height: 760px) and (min-width: 1021px) {
  .experience-section { padding-top: 5.25rem; }
}
</style>
