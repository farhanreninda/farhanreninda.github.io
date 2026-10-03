<script setup lang="ts">
import type { Profile } from "@/types/cv";
import { computed } from 'vue';
import type { MediaItem } from "./types";
import { cvSchema, validateField } from "./schema";
import { mediaUrl } from "./api";
import FieldEditor from "./FieldEditor.vue";
import AdminIcon from "./AdminIcon.vue";

const props = defineProps<{ modelValue: Profile; locale: string; media: MediaItem[]; portraitUrl: string; dirty: boolean; busy: boolean }>();
const emit = defineEmits<{ 'update:modelValue': [value: Profile]; save: []; reset: [] }>();
const fields = cvSchema.fields!.profile.fields!;
const valid = computed(() => validateField(props.modelValue, cvSchema.fields!.profile).length === 0);
function update(key: keyof Profile, value: unknown) {
  emit('update:modelValue', { ...props.modelValue, [key]: value });
}
</script>

<template>
  <div class="profile-grid">
    <div class="profile-column">
      <section class="profile-panel">
        <header><span class="panel-icon"><AdminIcon name="profile" /></span><div><h2>Informasi Utama & Biodata</h2><p>Data esensial yang muncul di profil dan header website.</p></div></header>
        <div class="bio-fields">
          <FieldEditor v-for="key in ['name', 'title', 'tagline'] as const" :key="key" :model-value="modelValue[key]" :schema="fields[key]" :path="`${locale}.profile.${key}`" :media="media" @update:model-value="update(key, $event)" />
        </div>
      </section>
      <section class="profile-panel">
        <header><span class="panel-icon"><AdminIcon name="quote" /></span><div><h2>Tentang Saya (Paragraf Narasi)</h2><p>Atur alur perkenalan diri dengan urutan fleksibel.</p></div><small>{{ modelValue.about.length }} Paragraf</small></header>
        <FieldEditor :model-value="modelValue.about" :schema="fields.about" :path="`${locale}.profile.about`" :media="media" @update:model-value="update('about', $event)" />
      </section>
      <section class="profile-panel">
        <header><span class="panel-icon"><AdminIcon name="focus" /></span><div><h2>Fokus Kerja</h2><p>Pilar utama pekerjaan yang ditonjolkan.</p></div></header>
        <FieldEditor :model-value="modelValue.aboutFocus" :schema="fields.aboutFocus" :path="`${locale}.profile.aboutFocus`" :media="media" @update:model-value="update('aboutFocus', $event)" />
      </section>
    </div>
    <div class="profile-column">
      <section class="profile-panel">
        <header><span class="panel-icon"><AdminIcon name="contact" /></span><div><h2>Kontak & Saluran Publik</h2><p>Kontrol kanal komunikasi yang dapat diakses publik.</p></div></header>
        <FieldEditor :model-value="modelValue.social" :schema="fields.social" :path="`${locale}.profile.social`" :media="media" @update:model-value="update('social', $event)" />
      </section>
      <section class="profile-panel">
        <header><div><h2>Pratinjau Widget Realtime</h2><p>Mengikuti perubahan draft Anda.</p></div></header>
        <div class="profile-widget">
          <div class="widget-identity"><img :src="mediaUrl(portraitUrl)" alt="Foto profil portfolio" /><div><h3>{{ modelValue.name }}</h3><p>{{ modelValue.title }}</p></div></div>
          <blockquote>{{ modelValue.tagline }}</blockquote>
          <footer><span><AdminIcon name="location" />{{ modelValue.social.location }}</span><a href="/" target="_blank" rel="noopener">Lihat Web <AdminIcon name="external" /></a></footer>
        </div>
      </section>
    </div>
    <footer class="profile-save-bar"><span class="panel-icon"><AdminIcon :name="valid ? 'check' : 'edit'" /></span><div><strong>{{ valid ? 'Validasi Formulir Siap' : 'Periksa Formulir' }}</strong><p>{{ valid ? 'Semua bidang wajib telah lengkap.' : 'Lengkapi bidang wajib sebelum menyimpan.' }}</p></div><button type="button" class="cancel-edit" :disabled="!dirty || busy" @click="emit('reset')"><AdminIcon name="close" />Batalkan edit</button><button type="button" class="apply-button" :disabled="!dirty || busy || !valid" @click="emit('save')"><AdminIcon name="check" />Terapkan Perubahan</button></footer>
  </div>
</template>

<style scoped>
.profile-grid { display: grid; grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr); gap: 24px; align-items: start; }
.profile-column { display: grid; gap: 24px; min-width: 0; }
.profile-panel { background: var(--cms-raised); padding: 24px; border-radius: 12px; min-width: 0; }
header { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
header > div { flex: 1; min-width: 0; }
header h2 { font: 600 20px/28px var(--cms-heading); margin: 0; letter-spacing: -0.02em; }
header p { color: var(--cms-muted); font-size: 12px; margin: 3px 0 0; }
header small { color: var(--cms-muted); font-size: 11px; }
.panel-icon { display: flex; padding: 8px; color: var(--cms-highlight); background: var(--cms-accent-soft); border-radius: 6px; }
.bio-fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.bio-fields > :last-child { grid-column: 1 / -1; }
.profile-panel :deep(.array-editor > legend), .profile-panel :deep(.object-editor > legend) { display: none; }
.profile-panel :deep(.field-grid) { grid-template-columns: 1fr; }
.profile-panel :deep(.field-grid > div:has(.optional-control)) { padding: 0; }
.profile-panel :deep(.optional-control) { flex-direction: row-reverse; justify-content: space-between; font-size: 12px; color: var(--cms-text); }
.profile-panel :deep(.optional-control input) { appearance: none; position: relative; width: 36px; min-height: 20px; height: 20px; border: 0; border-radius: 999px; background: var(--cms-line); padding: 2px; flex: 0 0 auto; cursor: pointer; }
.profile-panel :deep(.optional-control input::before) { content: ''; position: absolute; left: 2px; top: 2px; width: 16px; height: 16px; border-radius: 50%; background: #fff; }
.profile-panel :deep(.optional-control input:checked) { background: #2563eb; }
.profile-panel :deep(.optional-control input:checked::before) { left: 18px; }
.profile-panel :deep(.array-editor) { margin-bottom: 0; }
.profile-widget { padding: 20px; border-radius: 12px; background: var(--cms-input); }
.widget-identity { display: flex; gap: 12px; align-items: center; }
.widget-identity img { width: 52px; height: 52px; border-radius: 50%; object-fit: cover; }
.widget-identity h3 { font: 600 18px/24px var(--cms-heading); margin: 0; }
.widget-identity p { font-size: 12px; color: var(--cms-muted); margin: 4px 0 0; }
blockquote { padding: 12px; margin: 20px 0; background: var(--cms-surface); border-radius: 6px; font-size: 13px; font-style: italic; color: var(--cms-muted); }
footer, footer span, footer a { display: flex; align-items: center; gap: 6px; }
footer { justify-content: space-between; flex-wrap: wrap; font-size: 11px; }
footer a { color: var(--cms-highlight); text-decoration: none; min-height: 44px; }
.profile-save-bar { grid-column: 1 / -1; gap: 12px; padding: 16px; background: var(--cms-raised); border-radius: 12px; font-size: 12px; }
.profile-save-bar > div { flex: 1; }
.profile-save-bar p { margin: 4px 0 0; color: var(--cms-muted); }
.profile-save-bar button { min-height: 36px; border: 1px solid var(--cms-line); border-radius: 8px; padding: 8px 16px; background: var(--cms-surface); color: var(--cms-text); font: 600 12px/18px var(--cms-heading); cursor: pointer; }
.profile-save-bar button:disabled { opacity: .55; cursor: default; }
.profile-save-bar .apply-button { background: #2563eb; color: white; display: flex; gap: 6px; align-items: center; }
.profile-save-bar button:focus-visible { outline: 2px solid var(--cms-highlight); outline-offset: 3px; }
@media (max-width: 1100px) { .profile-grid { grid-template-columns: 1fr; } }
@media (max-width: 600px) { .profile-panel { padding: 16px; } .bio-fields { grid-template-columns: 1fr; } header small { display: none; } }
.cancel-edit { color: var(--cms-danger); border-color: color-mix(in srgb, var(--cms-danger) 55%, var(--cms-line)); background: color-mix(in srgb, var(--cms-danger) 10%, var(--cms-surface)); }
.cancel-edit:hover:not(:disabled) { border-color: var(--cms-danger); background: color-mix(in srgb, var(--cms-danger) 18%, var(--cms-surface)); }
</style>
