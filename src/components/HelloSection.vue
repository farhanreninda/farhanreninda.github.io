<script setup lang="ts">
import { useLocale } from "@/composables/useLocale";
import WatercolorBg from "./WatercolorBg.vue";

const { currentCv, copy } = useLocale();
</script>

<template>
  <section id="hello" class="hello reveal">
    <WatercolorBg />
    <div class="section-frame hello-grid">
      <div class="hello-text">
        <span class="eyebrow reveal">{{ copy.about.eyebrow }}</span>
        <h2 class="hello-title reveal">
          <span class="accent">{{ currentCv.profile.name }}</span>
          <small>{{ currentCv.profile.title }}</small>
        </h2>
        <p class="lead reveal">
          {{ currentCv.profile.tagline }}
        </p>
      </div>

      <div class="hello-portrait reveal">
        <div class="portrait-frame">
          <img src="/profile/portrait.jpg" :alt="currentCv.profile.name" loading="lazy" />
        </div>
        <div class="portrait-reflection" aria-hidden="true"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hello {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 8rem 0 2rem;
  background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-soft) 100%);
}
.hello::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 80% 20%, var(--color-sky) 0%, transparent 55%);
  opacity: 0.18;
  z-index: -1;
}

.hello-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 3.5rem;
  align-items: center;
}

.hello-text {
  max-width: 640px;
  display: grid;
  gap: 0.5rem;
}
.hello-text .eyebrow { justify-self: start; }

.hello-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.5vw, 3rem);
  line-height: 1.12;
  margin: 0.2rem 0 0.4rem;
  color: var(--color-text-strong);
  letter-spacing: -0.02em;
  font-weight: var(--weight-heading);
}
.hello-title .accent {
  display: block;
  color: var(--color-teal);
  background: linear-gradient(135deg, var(--color-teal), var(--color-sky-deep));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hello-title small {
  display: block;
  margin-top: 0.4rem;
  color: var(--color-text-muted);
  font-size: 0.48em;
  font-weight: var(--weight-strong);
  line-height: 1.3;
}


.hello-portrait {
  position: relative;
  display: grid;
  justify-items: center;
}
.portrait-frame {
  width: min(200px, 70%);
  aspect-ratio: 3 / 4;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 25px 50px -20px rgba(15, 58, 82, 0.45);
  border: 6px solid var(--color-surface);
  background: var(--color-bg-soft);
  transform: rotate(2deg);
  transition: transform 0.6s var(--ease-out), box-shadow 0.6s var(--ease-out);
}
.portrait-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.1) contrast(1.02);
  transition: transform 0.8s var(--ease-out), filter 0.6s var(--ease-out);
}
.hello-portrait:hover .portrait-frame {
  transform: rotate(0deg) translateY(-4px);
  box-shadow: 0 30px 60px -22px rgba(15, 58, 82, 0.55);
}
.hello-portrait:hover .portrait-frame img { transform: scale(1.04); filter: grayscale(0) contrast(1.05); }

.portrait-reflection {
  width: min(200px, 70%);
  aspect-ratio: 3 / 4;
  margin-top: 8px;
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, transparent, var(--color-bg-soft));
  filter: blur(8px);
  opacity: 0.35;
  transform: scaleY(0.4) translateY(-6px);
  transform-origin: top;
}

@media (max-width: 800px) {
  .hello-grid { grid-template-columns: 1fr; text-align: center; gap: 2rem; }
  .hello-text { max-width: none; margin: 0 auto; }
  .hello-text .eyebrow { justify-self: center; }
  
  .hello-portrait { order: -1; }
  .portrait-frame { transform: rotate(0deg); }
}
</style>
