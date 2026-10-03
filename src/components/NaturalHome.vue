<script setup lang="ts">
import { computed, ref } from "vue";
import { useLocale } from "@/composables/useLocale";
import { usePortfolio } from "@/composables/usePortfolio";
import ProjectsSection from "./ProjectsSection.vue";
import { navigateNatural } from "./naturalNavigation";

const { currentCv: cv, copy, locale } = useLocale();
const copyStatus = ref('');
async function copyEmail() {
  try {
    await navigator.clipboard.writeText(cv.value.profile.social.email);
    copyStatus.value = locale.value === 'id' ? 'Email disalin' : 'Email copied';
  } catch {
    copyStatus.value = locale.value === 'id' ? 'Pilih alamat email untuk menyalin.' : 'Select the email address to copy.';
  }
}
const { settings } = usePortfolio();
const currentRole = computed(() =>
  cv.value.experiences.find((item) =>
    ["Sekarang", "Present"].includes(item.end),
  ),
);
const groups = computed(() =>
  [
    { type: "work", copy: copy.value.experience.groups.work, icon: "work" },
    {
      type: "internship",
      copy: copy.value.experience.groups.project,
      icon: "terminal",
    },
    {
      type: "organization",
      copy: copy.value.experience.groups.organization,
      icon: "groups",
    },
  ].map((group) => ({
    ...group,
    items: cv.value.experiences.filter((item) => item.type === group.type),
  })),
);
const waHref = computed(() =>
  cv.value.profile.social.whatsapp
    ? `https://wa.me/${cv.value.profile.social.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(copy.value.contact.whatsappMessage)}`
    : "",
);
const emailHref = computed(
  () =>
    `mailto:${cv.value.profile.social.email}?subject=${encodeURIComponent(copy.value.contact.emailSubject)}`,
);
const icons = ["phone_android", "dns", "database", "terminal"];
const educationGpa = computed(() => cv.value.educations.find(item => item.gpa)?.gpa);
</script>

<template>
  <div class="natural-home" @click="navigateNatural">
    <section id="top" class="natural-hero">
      <div class="hero-copy">
        <span class="natural-badge hero-badge"><i /><span class="natural-icon" aria-hidden="true">waving_hand</span><span>Portfolio {{ cv.profile.title }}</span><strong>{{ locale === 'id' ? 'Terbuka untuk Peluang Baru' : 'Open to New Opportunities' }}</strong></span>
        <h1>{{ copy.hero.headline }}</h1>
        <p class="natural-lead">{{ cv.profile.tagline }}</p>
        <div class="natural-links">
          <a class="natural-button primary" href="#projects"
            >{{ locale === 'id' ? 'Lihat Proyek Pilihan' : 'View Selected Projects' }} <span class="natural-icon" aria-hidden="true">arrow_downward</span></a
          >
          <a
            v-if="cv.profile.social.cvUrl"
            class="natural-button"
            :href="cv.profile.social.cvUrl"
            :download="settings.cvDownloadName"
            ><span class="natural-icon" aria-hidden="true">download</span
            >{{ locale === 'id' ? 'Unduh Resume / CV' : 'Download Resume / CV' }}</a
          >
          <div class="hero-social-links">
          <a
            v-if="cv.profile.social.github"
            class="icon-link"
            :href="cv.profile.social.github"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="copy.contact.actions.github.title"
            ><span class="natural-icon" aria-hidden="true">code</span></a
          >
          <a
            v-if="cv.profile.social.linkedin"
            class="icon-link"
            :href="cv.profile.social.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="copy.contact.actions.linkedin.title"
            ><span class="natural-icon" aria-hidden="true"
              >business_center</span
            ></a
          >
          <a
            v-if="waHref"
            class="icon-link"
            :href="waHref"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="copy.contact.actions.whatsapp.title"
            ><span class="natural-icon" aria-hidden="true">chat</span></a
          >
          </div>
        </div>
        <div class="proof-grid">
          <div>
            <strong>{{
              cv.experiences.filter((item) => item.type === "work").length
            }}</strong
            ><span>{{ copy.experience.groups.work.title }}</span>
          </div>
          <div>
            <strong>{{ cv.projects.length }}</strong
            ><span>{{ locale === 'id' ? 'Produk & Klien' : 'Products & Clients' }}</span>
          </div>
          <div v-if="educationGpa">
            <strong>{{ educationGpa.split(' ')[0] }}</strong
            ><span>{{ copy.education.gpaLabel }}</span>
          </div>
        </div>
      </div>
      <article class="developer-card">
        <div class="editor-bar">
          <span class="editor-dots" aria-hidden="true"><i /><i /><i /></span
          ><span>DeveloperProfile.kt</span
          ><span v-if="currentRole" class="natural-badge developer-status"><i />{{ copy.experience.currentBadge }}</span>
        </div>
        <div class="developer-identity">
          <div class="developer-portrait">
            <img :src="settings.portraitUrl" :alt="cv.profile.name" />
            <i v-if="currentRole" aria-hidden="true" />
          </div>
          <div>
            <h2>{{ cv.profile.name }}</h2>
            <strong>{{ cv.profile.title }}</strong>
            <p v-if="currentRole"><span class="natural-icon" aria-hidden="true">business</span>{{ currentRole.company }}</p>
          </div>
        </div>
        <div class="profile-code">
          <div><em>val</em> profile = Developer {</div>
          <div>
            &nbsp; name = <span>{{ JSON.stringify(cv.profile.name) }}</span>
          </div>
          <div>
            &nbsp; role = <span>{{ JSON.stringify(cv.profile.title) }}</span>
          </div>
          <div>
            &nbsp; base =
            <span>{{ JSON.stringify(cv.profile.social.location) }}</span>
          </div>
          <div>}</div>
        </div>
        <div class="developer-meta">
          <span
            ><span class="natural-icon" aria-hidden="true">location_on</span
            >{{ cv.profile.social.location }}</span
          ><span v-if="cv.educations[0]"
            ><span class="natural-icon" aria-hidden="true">school</span
            >{{ cv.educations[0].school }}</span
          >
        </div>
      </article>
    </section>

    <section id="about" class="natural-section">
      <header class="natural-section-head">
        <span class="natural-eyebrow">{{ copy.about.eyebrow }}</span>
        <h2>{{ copy.about.title }}</h2>
      </header>
      <div class="about-grid">
        <article class="natural-panel workflow">
          <span class="natural-badge">{{ copy.about.workflowLabel }}</span>
          <p v-for="paragraph in cv.profile.about" :key="paragraph">
            {{ paragraph }}
          </p>
          <div class="focus-grid">
            <div v-for="(focus, index) in cv.profile.aboutFocus" :key="index">
              <span class="natural-icon" aria-hidden="true">{{
                ["assignment_turned_in", "sync_alt", "build_circle"][index % 3]
              }}</span>
              <h3>{{ focus.title }}</h3>
              <p>{{ focus.description }}</p>
            </div>
          </div>
        </article>
        <aside class="context-stack">
          <article v-if="currentRole" class="natural-panel context-role">
            <small>{{ copy.about.currentPosition }}</small>
            <h3>{{ currentRole.role }}</h3>
            <p>{{ currentRole.company }}</p>
            <span>{{ currentRole.start }} · {{ currentRole.end }}</span>
          </article>
          <article v-if="cv.educations[0]" class="natural-panel">
            <small>{{ copy.about.education }}</small>
            <h3>{{ cv.educations[0].school }}</h3>
            <p>{{ cv.educations[0].major }}</p>
            <span v-if="cv.educations[1]">{{ cv.educations[1].major }} · {{ cv.educations[1].school }}</span>
            <span v-else>{{ cv.educations[0].period }}</span>
          </article>
          <article class="natural-panel context-location">
            <div>
            <small>{{ copy.about.domicile }}</small>
            <h3>{{ cv.profile.social.location.split(',').slice(0, -1).join(',') || cv.profile.social.location }}</h3>
            <p v-if="cv.profile.social.location.includes(',')">{{ cv.profile.social.location.split(',').at(-1)?.trim() }}</p>
            </div>
            <span class="natural-icon" aria-hidden="true">location_on</span>
          </article>
        </aside>
      </div>
    </section>

    <section id="skills" class="natural-section">
      <header class="natural-section-head">
        <span class="natural-eyebrow">{{ copy.skills.eyebrow }}</span>
        <h2>{{ copy.skills.title }}</h2>
        <p>{{ copy.skills.lead }}</p>
      </header>
      <div class="skill-grid">
        <article
          v-for="(group, index) in cv.skills"
          :key="index"
          class="natural-panel"
        >
          <header>
            <span class="natural-icon" aria-hidden="true">{{
              icons[index % icons.length]
            }}</span>
            <h3>{{ group.category }}</h3>
          </header>
          <p>{{ group.description }}</p>
          <ul class="natural-chips">
            <li v-for="skill in group.items" :key="skill.name">
              {{ skill.name }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section id="experience" class="natural-section">
      <header class="natural-section-head">
        <span class="natural-eyebrow">{{ copy.experience.eyebrow }}</span>
        <h2>{{ copy.experience.title }}</h2>
        <p>{{ copy.experience.lead }}</p>
      </header>
      <div
        v-for="group in groups.filter((group) => group.items.length)"
        :key="group.type"
        class="experience-group"
        :class="group.type"
      >
        <h3 class="group-heading">
          <span class="natural-icon" aria-hidden="true">{{ group.icon }}</span
          >{{ group.copy.title }}
        </h3>
        <div class="experience-grid">
          <article
            v-for="(item, index) in group.items"
            :key="index"
            class="natural-panel experience-card"
          >
            <div>
              <div class="experience-meta"><span class="period">{{ item.start }} – {{ item.end }}</span><small v-if="['Sekarang', 'Present'].includes(item.end)" class="natural-badge">{{ copy.experience.currentBadge }}</small></div>
              <h3>{{ item.company }}</h3>
              <strong>{{ item.role }}</strong>
              <p v-if="item.location">{{ item.location }}</p>
            </div>
            <ul>
              <li v-for="bullet in item.bullets" :key="bullet">{{ bullet }}</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <ProjectsSection class="natural-projects" filterable />

    <section id="education" class="natural-section academic-grid">
      <div>
        <header class="natural-section-head">
          <span class="natural-eyebrow">{{ copy.education.eyebrow }}</span>
          <h2>{{ copy.education.title }}</h2>
        </header>
        <div class="academic-list">
          <article
            v-for="(item, index) in cv.educations"
            :key="index"
            class="natural-panel academic-card"
          >
            <span class="natural-icon" aria-hidden="true">{{ /\b(SMK|SMA|vocational|high school)\b/i.test(item.school) ? 'apartment' : 'school' }}</span>
            <div>
              <h3>{{ item.school }}</h3>
              <strong>{{ item.major }}</strong>
              <p v-if="item.note">{{ item.note }}</p>
              <small
                >{{ item.period
                }}<template v-if="item.gpa">
                  · {{ copy.education.gpaLabel }} {{ item.gpa }}</template
                ></small
              >
            </div>
          </article>
        </div>
      </div>
      <div>
        <header class="natural-section-head">
          <span class="natural-eyebrow">{{ copy.education.certificates }}</span>
          <h2>{{ copy.education.certificates }}</h2>
        </header>
        <div class="natural-panel certificate-list">
          <article v-for="(item, index) in cv.certificates" :key="index">
            <span class="natural-icon" aria-hidden="true">verified</span>
            <div>
              <h3>{{ item.name }}</h3>
              <small>{{ item.issuer }} · {{ item.period }}</small>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="contact" class="natural-section natural-panel contact-grid">
      <header class="natural-section-head">
        <span class="natural-eyebrow">{{ copy.contact.eyebrow }}</span>
        <h2>{{ copy.contact.title }}</h2>
        <p>{{ copy.contact.lead }}</p>
      </header>
      <div class="contact-links">
        <div class="contact-email-row"><a :href="emailHref"
          ><span class="natural-icon" aria-hidden="true">mail</span>
          <div>
            <small>{{ copy.contact.actions.email.label }}</small
            ><strong>{{ cv.profile.social.email }}</strong>
          </div>
          </a><button type="button" class="copy-email" @click="copyEmail"><span class="natural-icon" aria-hidden="true">content_copy</span>{{ locale === 'id' ? 'Salin' : 'Copy' }}</button></div>
        <span v-if="copyStatus" class="copy-status" role="status">{{ copyStatus }}</span>
        <a
          v-if="waHref"
          :href="waHref"
          target="_blank"
          rel="noopener noreferrer"
          ><span class="natural-icon" aria-hidden="true">chat</span>
          <div>
            <small>{{ copy.contact.actions.whatsapp.label }}</small
            ><strong>{{ cv.profile.social.phone }}</strong>
          </div>
          <span aria-hidden="true">↗</span></a
        >
        <div class="contact-social">
          <a
            v-if="cv.profile.social.linkedin"
            :href="cv.profile.social.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            ><span class="natural-icon" aria-hidden="true">business_center</span>{{ copy.contact.actions.linkedin.title }}</a
          ><a
            v-if="cv.profile.social.github"
            :href="cv.profile.social.github"
            target="_blank"
            rel="noopener noreferrer"
            ><span class="natural-icon" aria-hidden="true">code</span>{{ copy.contact.actions.github.title }}</a
          >
        </div>
      </div>
    </section>
    <footer class="natural-footer">
      <div>
        <div class="footer-identity"><strong>{{ cv.profile.name }}</strong><span>{{ cv.profile.title }}</span></div>
        <small class="footer-location"><i />{{ cv.profile.social.location }}</small>
      </div>
      <nav :aria-label="copy.nav.top">
        <h3>{{ locale === 'id' ? 'Navigasi cepat' : 'Quick navigation' }}</h3>
        <a
          v-for="id in [
            'top',
            'skills',
            'experience',
            'projects',
            'education',
            'contact',
          ] as const"
          :key="id"
          :href="'#' + id"
          >{{ copy.nav[id] }}</a
        >
      </nav>
      <div class="footer-connections">
        <h3>Resume</h3>
        <a v-if="cv.profile.social.cvUrl" class="footer-cv" :href="cv.profile.social.cvUrl" :download="settings.cvDownloadName"><span class="natural-icon" aria-hidden="true">download</span>{{ copy.contact.actions.cv.title }}</a>
      </div>
      <div class="footer-bottom"><small>© {{ new Date().getFullYear() }} {{ cv.profile.name }}</small></div>
    </footer>
  </div>
</template>

<style scoped src="../styles/natural-home.css"></style>
