<script setup lang="ts">
import { computed } from "vue";
import { useLocale } from "@/composables/useLocale";

const { currentCv, copy } = useLocale();
const nameLines = computed(() => {
  const parts = currentCv.value.profile.name.split(" ");
  return [parts.slice(0, 2).join(" "), parts.slice(2).join(" ")];
});
</script>

<template>
  <section id="top" class="hero reveal">
    <div class="section-frame hero-frame">
      <div class="hero-copy">
        <p class="hero-kicker reveal">{{ copy.hero.kicker }}</p>
        <h1 class="hero-name reveal">
          <span v-for="line in nameLines" :key="line">{{ line }}</span>
        </h1>
        <div class="hero-intro reveal reveal-delay-1">
          <p class="intro-label">{{ currentCv.profile.title }}</p>
          <h2>{{ copy.hero.headline }}</h2>
          <p>{{ currentCv.profile.tagline }}</p>
        </div>
      </div>

      <div class="hero-visual reveal reveal-delay-2">
        <div class="visual-orbit" aria-hidden="true">
          <span class="orbit orbit-one"></span>
          <span class="orbit orbit-two"></span>
          <span class="orbit-dot dot-one"></span>
          <span class="orbit-dot dot-two"></span>
          <div class="portrait-frame">
            <img src="/profile/portrait.jpg" :alt="currentCv.profile.name" loading="eager" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: 100svh;
  display: grid;
  align-items: center;
  padding: 5.6rem 0 3rem;
  color: var(--color-text);
  background:
    radial-gradient(circle at 82% 34%, color-mix(in srgb, var(--color-accent-warm) 18%, transparent) 0%, transparent 28%),
    linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-soft) 100%);
}
.hero-frame {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(240px, 330px);
  gap: clamp(1.5rem, 3.5vw, 3rem);
  align-items: center;
}
.hero-copy {
  max-width: 780px;
}
.hero-kicker {
  margin: 0 0 0.85rem;
  color: var(--color-accent-warm);
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: var(--weight-label);
  letter-spacing: 0;
}
.hero-name {
  margin: 0;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 4.7vw, 4.45rem);
  font-weight: var(--weight-heading);
  line-height: 0.95;
  letter-spacing: 0;
}
.hero-name span {
  display: block;
}
.hero-intro {
  max-width: 560px;
  margin-top: 1.15rem;
  padding-left: 1rem;
  border-left: 3px solid var(--color-accent-warm);
}
.intro-label {
  margin: 0 0 0.5rem;
  color: var(--color-accent-warm);
  font-weight: var(--weight-label);
}
.hero-intro h2 {
  margin: 0;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2vw, 1.65rem);
  line-height: 1.16;
  letter-spacing: 0;
}
.hero-intro p:not(.intro-label) {
  margin: 0.85rem 0 0;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.75;
}
.hero-visual {
  justify-self: center;
  width: 100%;
}
.visual-orbit {
  position: relative;
  display: grid;
  place-items: center;
  min-height: 320px;
}
.orbit {
  position: absolute;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--color-accent-warm) 26%, transparent);
  pointer-events: none;
}
.orbit-one {
  width: clamp(250px, 28vw, 360px);
  aspect-ratio: 1;
  transform: rotate(-12deg);
}
.orbit-two {
  width: clamp(190px, 22vw, 285px);
  aspect-ratio: 1;
  border-color: color-mix(in srgb, var(--color-accent-warm) 42%, transparent);
  background: radial-gradient(circle, color-mix(in srgb, var(--color-accent-warm) 10%, transparent), transparent 62%);
}
.orbit-dot {
  position: absolute;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-accent-warm);
  box-shadow: 0 0 0 8px color-mix(in srgb, var(--color-accent-warm) 13%, transparent);
}
.dot-one {
  top: 18%;
  right: 18%;
}
.dot-two {
  bottom: 20%;
  left: 20%;
  width: 10px;
  height: 10px;
  opacity: 0.72;
}
.portrait-frame {
  position: relative;
  z-index: 2;
  width: clamp(150px, 17vw, 205px);
  aspect-ratio: 1;
  border-radius: 50%;
  padding: 0.45rem;
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--color-accent-warm) 42%, var(--color-surface)), var(--color-surface));
  border: 1px solid color-mix(in srgb, var(--color-accent-warm) 46%, var(--color-border));
  box-shadow: 0 24px 60px -34px color-mix(in srgb, var(--color-accent-warm) 70%, transparent);
}
.portrait-frame::after {
  content: "";
  position: absolute;
  inset: -0.8rem;
  border: 1px solid color-mix(in srgb, var(--color-accent-warm) 26%, transparent);
  border-radius: inherit;
  pointer-events: none;
}
.portrait-frame img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  object-fit: cover;
  object-position: top center;
  filter: saturate(0.96) contrast(1.04);
}
@media (prefers-reduced-motion: no-preference) {
  .orbit-one {
    animation: hero-orbit-drift 18s var(--ease-in-out) infinite;
  }
  .orbit-two {
    animation: hero-orbit-breathe 14s var(--ease-in-out) infinite;
  }
  .orbit-dot {
    animation: hero-dot-float 7s var(--ease-in-out) infinite;
  }
  .dot-two {
    animation-delay: -2.5s;
  }
}
@keyframes hero-orbit-drift {
  0%, 100% { transform: rotate(-12deg) scale(1); }
  50% { transform: rotate(-7deg) scale(1.025); }
}
@keyframes hero-orbit-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.035); }
}
@keyframes hero-dot-float {
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, -8px, 0); }
}
@media (max-width: 820px) {
  .hero {
    min-height: auto;
    padding: 6rem 0 3rem;
  }
  .hero-frame {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  .hero-copy {
    margin: 0 auto;
  }
  .hero-intro {
    margin-left: auto;
    margin-right: auto;
    padding-left: 0;
    padding-top: 1rem;
    border-left: 0;
    border-top: 3px solid var(--color-accent-warm);
  }
  .hero-visual {
    order: -1;
  }
}
</style>
