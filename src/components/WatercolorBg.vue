<script setup lang="ts">
withDefaults(defineProps<{ variant?: "page" | "card" }>(), { variant: "page" });
</script>

<template>
  <div :class="['watercolor', `watercolor--${variant}`]" aria-hidden="true">
    <!-- Big blob top-left -->
    <svg class="blob blob--a" viewBox="0 0 600 600" preserveAspectRatio="none">
      <defs>
        <radialGradient id="gradA" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--color-blob-1)" stop-opacity="0.85" />
          <stop offset="70%" stop-color="var(--color-blob-1)" stop-opacity="0.4" />
          <stop offset="100%" stop-color="var(--color-blob-1)" stop-opacity="0" />
        </radialGradient>
      </defs>
      <path
        fill="url(#gradA)"
        d="M420,320 C470,400 380,520 270,500 C150,478 60,400 80,290 C100,180 230,90 340,130 C440,165 370,240 420,320 Z"
      />
    </svg>

    <!-- Mint blob bottom-right -->
    <svg class="blob blob--b" viewBox="0 0 600 600" preserveAspectRatio="none">
      <defs>
        <radialGradient id="gradB" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--color-blob-2)" stop-opacity="0.9" />
          <stop offset="80%" stop-color="var(--color-blob-2)" stop-opacity="0" />
        </radialGradient>
      </defs>
      <path
        fill="url(#gradB)"
        d="M120,140 C220,60 420,100 480,220 C540,340 460,460 320,470 C200,478 60,420 60,310 C60,240 60,200 120,140 Z"
      />
    </svg>

    <!-- Light cyan blob mid -->
    <svg class="blob blob--c" viewBox="0 0 600 600" preserveAspectRatio="none">
      <defs>
        <radialGradient id="gradC" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="var(--color-blob-3)" stop-opacity="0.7" />
          <stop offset="100%" stop-color="var(--color-blob-3)" stop-opacity="0" />
        </radialGradient>
      </defs>
      <path
        fill="url(#gradC)"
        d="M300,80 C420,80 540,180 540,300 C540,420 420,540 300,520 C200,500 60,440 80,300 C100,180 180,80 300,80 Z"
      />
    </svg>

    <!-- Dotted splash top-right -->
    <svg class="dots dots--tr" viewBox="0 0 200 200">
      <g fill="var(--color-teal)">
        <circle cx="20" cy="20" r="2.5" opacity="0.55" />
        <circle cx="40" cy="35" r="3" opacity="0.7" />
        <circle cx="60" cy="15" r="2" opacity="0.5" />
        <circle cx="80" cy="40" r="4" opacity="0.75" />
        <circle cx="100" cy="20" r="2" opacity="0.6" />
        <circle cx="120" cy="50" r="3" opacity="0.7" />
        <circle cx="140" cy="25" r="2" opacity="0.55" />
        <circle cx="160" cy="45" r="3.5" opacity="0.8" />
        <circle cx="180" cy="20" r="2" opacity="0.5" />
        <circle cx="30" cy="65" r="3" opacity="0.65" />
        <circle cx="60" cy="80" r="2.5" opacity="0.6" />
        <circle cx="90" cy="70" r="2" opacity="0.5" />
        <circle cx="120" cy="85" r="3" opacity="0.7" />
        <circle cx="150" cy="80" r="2.5" opacity="0.6" />
        <circle cx="50" cy="110" r="2" opacity="0.5" />
        <circle cx="85" cy="120" r="3" opacity="0.65" />
        <circle cx="130" cy="110" r="2" opacity="0.55" />
        <circle cx="170" cy="120" r="2" opacity="0.5" />
        <circle cx="40" cy="150" r="2.5" opacity="0.6" />
        <circle cx="80" cy="160" r="2" opacity="0.5" />
        <circle cx="140" cy="155" r="2" opacity="0.55" />
        <circle cx="180" cy="160" r="2" opacity="0.5" />
      </g>
    </svg>

    <!-- Dotted splash bottom-left -->
    <svg class="dots dots--bl" viewBox="0 0 200 200">
      <g fill="var(--color-teal)">
        <circle cx="30" cy="170" r="3" opacity="0.7" />
        <circle cx="60" cy="155" r="2.5" opacity="0.6" />
        <circle cx="100" cy="175" r="4" opacity="0.8" />
        <circle cx="140" cy="160" r="2" opacity="0.55" />
        <circle cx="170" cy="180" r="3" opacity="0.7" />
        <circle cx="40" cy="140" r="2" opacity="0.5" />
        <circle cx="80" cy="130" r="2.5" opacity="0.6" />
        <circle cx="120" cy="135" r="3" opacity="0.7" />
        <circle cx="160" cy="140" r="2" opacity="0.55" />
        <circle cx="20" cy="100" r="2" opacity="0.5" />
        <circle cx="50" cy="100" r="3" opacity="0.65" />
        <circle cx="90" cy="95" r="2" opacity="0.55" />
        <circle cx="130" cy="100" r="2.5" opacity="0.6" />
        <circle cx="170" cy="100" r="2" opacity="0.5" />
        <circle cx="30" cy="70" r="2" opacity="0.5" />
        <circle cx="70" cy="65" r="2.5" opacity="0.6" />
        <circle cx="110" cy="70" r="2" opacity="0.55" />
        <circle cx="150" cy="60" r="2" opacity="0.5" />
      </g>
    </svg>

    <!-- Scribble bottom-right -->
    <svg class="scribble" viewBox="0 0 320 140">
      <path
        d="M10,30 C40,80 0,110 30,120 M30,30 C50,90 10,120 50,120 M50,30 C70,90 30,120 70,120 M70,30 C90,90 50,120 90,120 M90,30 C110,90 70,120 110,120 M110,30 C130,90 90,120 130,120"
        fill="none"
        stroke="var(--color-teal)"
        stroke-width="2.2"
        stroke-linecap="round"
        opacity="0.7"
      />
    </svg>
  </div>
</template>

<style scoped>
.watercolor {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}
.watercolor--card {
  border-radius: inherit;
}

.blob {
  position: absolute;
  width: 60%;
  max-width: 720px;
  filter: blur(0.5px);
  opacity: 0.95;
}
.blob--a {
  top: -10%;
  left: -10%;
  animation: drift-a 14s ease-in-out infinite;
}
.blob--b {
  bottom: -15%;
  right: -10%;
  width: 55%;
  animation: drift-b 18s ease-in-out infinite;
}
.blob--c {
  top: 35%;
  left: 30%;
  width: 40%;
  opacity: 0.55;
  animation: drift-c 22s ease-in-out infinite;
}

.dots {
  position: absolute;
  width: 180px;
  height: 180px;
}
.dots--tr {
  top: -20px;
  right: -20px;
}
.dots--bl {
  bottom: -10px;
  left: -20px;
}

.scribble {
  position: absolute;
  bottom: 4%;
  right: 6%;
  width: 220px;
  height: 100px;
  opacity: 0.8;
}
</style>