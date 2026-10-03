<script setup lang="ts">
import type { PortfolioDocument, MediaItem } from './types';
import { settingsSchema } from './schema';
import FieldEditor from './FieldEditor.vue';
import AdminIcon from './AdminIcon.vue';
const props = defineProps<{ modelValue: PortfolioDocument['settings']; media: MediaItem[] }>();
const emit = defineEmits<{ 'update:modelValue': [value: PortfolioDocument['settings']] }>();
function update(key: keyof PortfolioDocument['settings'], value: unknown) { emit('update:modelValue', { ...props.modelValue, [key]: value }); }
const groups = [
  { title: 'Foto Profil', description: 'Foto yang ditampilkan pada portfolio.', icon: 'profile', keys: ['portraitUrl'] as const },
  { title: 'Identitas Website', description: 'Inisial, favicon, dan warna browser.', icon: 'settings', keys: ['brandMark', 'faviconUrl', 'themeColor'] as const },
  { title: 'Dokumen CV', description: 'Nama file saat pengunjung mengunduh CV. File CV dipilih pada Profil & Kontak.', icon: 'educations', keys: ['cvDownloadName'] as const },
];
</script>
<template><div class="identity-grid"><section v-for="group in groups" :key="group.title" class="identity-panel"><header><AdminIcon :name="group.icon" /><div><h2>{{ group.title }}</h2><p>{{ group.description }}</p></div></header><div class="identity-fields"><FieldEditor v-for="key in group.keys" :key="key" :schema="settingsSchema.fields![key]" :model-value="modelValue[key]" :path="'settings.' + key" :media="media" @update:model-value="update(key, $event)" /></div></section></div></template>
<style scoped>
.identity-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; align-items: start; }
.identity-panel { padding: 24px; border: 1px solid var(--cms-line); border-radius: 12px; background: var(--cms-surface); min-width: 0; }
.identity-panel:first-child { grid-row: span 2; }
header { display: flex; align-items: start; gap: 12px; margin-bottom: 20px; }
header > .material-icon { padding: 8px; background: var(--cms-accent-soft); color: var(--cms-highlight); border-radius: 8px; }
h2 { font: 600 20px/28px var(--cms-heading); margin: 0; }
p { margin: 4px 0 0; font-size: 13px; color: var(--cms-muted); }
.identity-fields { display: grid; gap: 20px; }
.identity-fields :deep(img) { max-height: 280px; }
.identity-panel:nth-child(2) :deep(img) { width: 64px; height: 64px; max-height: 64px; }
@media (max-width: 1050px) { .identity-grid { grid-template-columns: 1fr; } .identity-panel:first-child { grid-row: auto; } }
@media (max-width: 650px) { .identity-panel { padding: 16px; } }
</style>
