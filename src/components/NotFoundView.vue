<script setup lang="ts">
import { useHead } from "@unhead/vue";
useHead({ title: "Halaman tidak ditemukan" });
</script>

<template>
  <section class="not-found">
    <div class="section-frame nf-inner">
      <p class="nf-code reveal reveal-delay-1">404</p>
      <h1 class="nf-title reveal reveal-delay-2">Halaman tidak ditemukan</h1>
      <p class="nf-lead reveal reveal-delay-3">
        Maaf, halaman yang kamu cari tidak ada. Coba kembali ke beranda.
      </p>
      <a class="button reveal reveal-delay-4" href="#top">Kembali ke Beranda</a>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  padding: 6rem 0;
  min-height: 60vh;
  display: grid;
  align-items: center;
  background: linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-soft) 100%);
}
.nf-inner {
  text-align: center;
  max-width: 560px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  justify-items: center;
}
.nf-code {
  font-family: var(--font-display);
  font-size: clamp(4rem, 12vw, 7rem);
  font-weight: 900;
  margin: 0;
  background: linear-gradient(135deg, var(--color-teal), var(--color-sky-deep));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
}
.nf-title {
  margin: 0;
  font-size: clamp(1.4rem, 3vw, 1.8rem);
  font-family: var(--font-display);
  color: var(--color-text-strong);
}
.nf-lead {
  color: var(--color-text-muted);
  margin: 0 0 0.5rem;
}
</style>