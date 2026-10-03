<script setup lang="ts">
import { computed, inject, ref } from 'vue';
import { mediaContextKey } from './mediaContext';
import { mediaUrl } from './api';
import { isSafeUrl } from './schema';
import AdminIcon from './AdminIcon.vue';
const props = defineProps<{ modelValue: string; kind: 'image' | 'video' | 'document' | 'all'; label: string }>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();
const context = inject(mediaContextKey);
const mode = ref('link');
const file = ref<File | null>(null);
const input = ref<HTMLInputElement | null>(null);
const busy = ref(false);
const error = ref('');
const accept = computed(() => props.kind === 'image' ? 'image/png,image/jpeg,image/webp,image/gif' : props.kind === 'video' ? 'video/mp4,video/webm' : props.kind === 'document' ? 'application/pdf' : 'image/png,image/jpeg,image/webp,image/gif,application/pdf,video/mp4,video/webm');
const assets = computed(() => (context?.assets.value || []).filter(item => props.kind === 'all' || (props.kind === 'document' ? item.mime === 'application/pdf' : item.mime.startsWith(props.kind + '/'))));
const selected = computed(() => context?.assets.value.find(item => item.url === props.modelValue));
const image = computed(() => selected.value?.mime.startsWith('image/') || /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(props.modelValue));
const video = computed(() => selected.value?.mime.startsWith('video/') || /\.(mp4|webm)(\?.*)?$/i.test(props.modelValue));
async function upload() {
  if (!file.value || !context || busy.value) return;
  busy.value = true; error.value = '';
  try { const item = await context.upload(file.value); emit('update:modelValue', item.url); file.value = null; if (input.value) input.value.value = ''; mode.value = 'gallery'; }
  catch (cause) { error.value = cause instanceof Error ? cause.message : 'Unggahan gagal'; }
  finally { busy.value = false; }
}
</script>
<template>
  <div class="asset-picker">
    <div class="source-options" :aria-label="'Sumber ' + label">
      <button v-for="option in [{ id: 'gallery', label: 'Galeri', icon: 'media' }, { id: 'file', label: 'File perangkat', icon: 'save' }, { id: 'link', label: 'Link', icon: 'external' }]" :key="option.id" type="button" :aria-pressed="mode === option.id" @click="mode = option.id"><AdminIcon :name="option.icon" />{{ option.label }}</button>
    </div>
    <select v-if="mode === 'gallery'" :aria-label="'Pilih ' + label + ' dari galeri'" :value="modelValue" @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"><option value="">Pilih aset tersimpan</option><option v-if="modelValue && !assets.some(item => item.url === modelValue)" :value="modelValue">URL saat ini</option><option v-for="item in assets" :key="item.id" :value="item.url">{{ item.name }}</option></select>
    <div v-else-if="mode === 'file'" class="file-source"><input ref="input" type="file" :accept="accept" :aria-label="'File ' + label" :disabled="busy" @change="file = ($event.target as HTMLInputElement).files?.[0] || null" /><small>Gambar, video MP4/WebM, atau dokumen PDF sesuai field. Maksimal 10 MB.</small><button type="button" :disabled="!file || busy" @click="upload">{{ busy ? 'Mengunggah…' : 'Unggah dan pilih' }}</button></div>
    <input v-else :value="modelValue" :aria-label="'Link ' + label" placeholder="https://… atau /path/aset" maxlength="20000" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <p v-if="modelValue && !isSafeUrl(modelValue)" class="error">Gunakan link http(s) atau path lokal yang valid.</p>
    <template v-if="modelValue && isSafeUrl(modelValue)"><img v-if="image" :src="mediaUrl(modelValue)" :alt="'Preview ' + label" /><video v-else-if="video" :src="mediaUrl(modelValue)" controls preload="metadata" /><a v-else :href="mediaUrl(modelValue)" target="_blank" rel="noopener">Buka {{ label }} <AdminIcon name="external" /></a></template>
  </div>
</template>
<style scoped>
.asset-picker { display: grid; gap: 8px; min-width: 0; }
.source-options { display: flex; flex-wrap: wrap; gap: 4px; }
button, input, select { font: inherit; font-size: 12px; color: var(--cms-text); background: var(--cms-input); border: 1px solid var(--cms-border); border-radius: 6px; min-height: 36px; padding: 8px 10px; }
button { cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
button[aria-pressed='true'] { background: var(--cms-accent-soft); color: var(--cms-highlight); border-color: var(--cms-highlight); }
button:disabled { opacity: .5; cursor: default; }
input, select { width: 100%; min-width: 0; }
.file-source { display: grid; gap: 8px; justify-items: start; }
small { color: var(--cms-muted); font-size: 11px; }
img, video { width: 100%; max-height: 180px; object-fit: contain; border-radius: 6px; background: var(--cms-input); }
a { color: var(--cms-highlight); display: inline-flex; align-items: center; gap: 4px; overflow-wrap: anywhere; }
.error { margin: 0; color: var(--cms-danger); font-size: 12px; }
button:focus-visible, input:focus-visible, select:focus-visible { outline: 2px solid var(--cms-highlight); outline-offset: 2px; }
@media (max-width: 650px) { button, input, select { min-height: 44px; } input, select { font-size: 16px; } }
</style>
