<script setup lang="ts">
import { computed } from "vue";
import { cv } from "@/data/cv";

interface ContactAction {
  label: string;
  title: string;
  detail: string;
  href: string;
  external?: boolean;
  download?: string;
  variant: "primary" | "secondary" | "ghost" | "wide";
}

const waNumber = computed(() => (cv.profile.social.whatsapp || "62895332536530").replace(/\D/g, ""));
const waMessage = encodeURIComponent("Halo Farhan, saya ingin berdiskusi mengenai project, kolaborasi, atau peluang kerja.");
const waHref = computed(() => `https://wa.me/${waNumber.value}?text=${waMessage}`);
const emailSubject = encodeURIComponent("Diskusi project, kolaborasi, atau peluang kerja");
const emailHref = computed(() => `mailto:${cv.profile.social.email}?subject=${emailSubject}`);
const cvHref = computed(() => cv.profile.social.cvUrl || "/CV.pdf");
const githubHref = computed(() => cv.profile.social.github || "https://github.com/farhanreninda");

const contactActions = computed<ContactAction[]>(() => [
  {
    label: "Email",
    title: "Kirim Email",
    detail: cv.profile.social.email,
    href: emailHref.value,
    variant: "wide",
  },
  {
    label: "WhatsApp",
    title: "Chat WhatsApp",
    detail: cv.profile.social.phone,
    href: waHref.value,
    external: true,
    variant: "primary",
  },
  {
    label: "LinkedIn",
    title: "Buka LinkedIn",
    detail: "Profil profesional",
    href: cv.profile.social.linkedin,
    external: true,
    variant: "secondary",
  },
  {
    label: "GitHub",
    title: "Buka GitHub",
    detail: "Repository dan project",
    href: githubHref.value,
    external: true,
    variant: "secondary",
  },
  {
    label: "CV",
    title: "Unduh CV",
    detail: "Curriculum Vitae PDF",
    href: cvHref.value,
    download: "CV-Farhan-Reninda-Budiansyah.pdf",
    variant: "ghost",
  },
]);
</script>

<template>
  <section id="contact" class="contact-section reveal">
    <div class="section-frame contact-layout">
      <header class="contact-copy reveal reveal-delay-1">
        <span class="eyebrow">Kontak</span>
        <h2>Terbuka untuk diskusi project, kolaborasi, atau peluang kerja.</h2>
        <p>Saya siap membahas kebutuhan aplikasi, integrasi sistem, dan pengembangan produk dengan komunikasi yang jelas dan responsif.</p>
      </header>

      <article class="contact-card reveal reveal-delay-2">
        <div class="contact-actions" aria-label="Aksi kontak">
          <a
            v-for="item in contactActions"
            :key="item.label"
            class="contact-action"
            :class="`is-${item.variant}`"
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener noreferrer' : undefined"
            :download="item.download"
          >
            <span>{{ item.label }}</span>
            <strong>{{ item.title }}</strong>
            <em>{{ item.detail }}</em>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  min-height: 100svh;
  display: grid;
  align-items: center;
  padding: 6rem 0 3.5rem;
  background:
    radial-gradient(circle at 15% 10%, color-mix(in srgb, var(--color-accent-warm) 17%, transparent) 0%, transparent 30%),
    linear-gradient(135deg, color-mix(in srgb, var(--color-surface) 78%, transparent), var(--color-bg));
}
.contact-layout {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(330px, 0.72fr);
  gap: clamp(1.4rem, 4vw, 3.5rem);
  align-items: center;
}
.contact-copy {
  display: grid;
  justify-items: start;
}
.contact-copy h2 {
  max-width: 760px;
  margin: 1rem 0 0;
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3.45vw, 3.55rem);
  line-height: 1;
  letter-spacing: 0;
}
.contact-copy p {
  max-width: 640px;
  margin: 1rem 0 0;
  color: var(--color-text-muted);
  font-size: 0.98rem;
  line-height: 1.65;
}
.contact-card {
  padding: 1rem;
  border: 1px solid color-mix(in srgb, var(--color-border) 78%, transparent);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--color-accent-warm) 8%, transparent), transparent 66%),
    color-mix(in srgb, var(--color-surface) 88%, transparent);
  box-shadow: var(--color-shadow-sm);
}
.contact-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}
.contact-action {
  display: grid;
  align-content: space-between;
  min-height: 8rem;
  gap: 0.65rem;
  padding: 1rem;
  border: 1px solid color-mix(in srgb, var(--color-border) 62%, transparent);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-bg) 34%, transparent);
  color: var(--color-text-strong);
  overflow: hidden;
  transition: transform 0.25s var(--ease-out), border-color 0.25s var(--ease-out), background 0.25s var(--ease-out);
}
.contact-action:hover {
  transform: translateY(-2px);
  text-decoration: none;
  border-color: color-mix(in srgb, var(--color-accent-warm) 48%, var(--color-border));
  background: color-mix(in srgb, var(--color-surface-elev) 72%, transparent);
}
.contact-action span {
  color: var(--color-accent-warm);
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
}
.contact-action strong {
  color: var(--color-text-strong);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 900;
  line-height: 1.2;
}
.contact-action em {
  color: var(--color-text-muted);
  max-width: 100%;
  white-space: nowrap;
  font-size: clamp(0.68rem, 0.78vw, 0.76rem);
  font-style: normal;
  font-weight: 800;
  line-height: 1.4;
}
.contact-action.is-primary {
  background: var(--color-accent-warm);
  color: var(--color-accent-contrast);
  border-color: var(--color-accent-warm);
}
.contact-action.is-primary span,
.contact-action.is-primary strong,
.contact-action.is-primary em {
  color: var(--color-accent-contrast);
}
.contact-action.is-ghost {
  background:
    linear-gradient(135deg, color-mix(in srgb, var(--color-accent-warm) 12%, transparent), transparent 70%),
    color-mix(in srgb, var(--color-bg) 44%, transparent);
}
.contact-action.is-wide {
  grid-column: 1 / -1;
  min-height: 5.8rem;
}
@media (max-width: 920px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .contact-section {
    padding: 5rem 0 2.75rem;
  }
  .contact-actions {
    grid-template-columns: 1fr;
  }
  .contact-action.is-wide {
    grid-column: auto;
  }
}
</style>
