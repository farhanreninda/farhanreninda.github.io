<script setup lang="ts">
import { computed, ref } from "vue";
import { emptyValue, type FieldSchema } from "./schema";
import { mediaUrl } from "./api";
import type { MediaItem } from "./types";
import { confirmAction } from "./confirmation";
import AssetPicker from "./AssetPicker.vue";
import AdminIcon from "./AdminIcon.vue";

const props = defineProps<{ modelValue: unknown; schema: FieldSchema; path: string; media: MediaItem[]; experienceType?: string }>();
const emit = defineEmits<{ "update:modelValue": [value: unknown] }>();
const record = computed(() => (props.modelValue ?? {}) as Record<string, unknown>);
const items = computed(() => (props.modelValue ?? []) as unknown[]);
const textValue = computed(() => typeof props.modelValue === "string" ? props.modelValue : "");
const dragIndex = ref<number | null>(null);
const dropIndex = ref<number | null>(null);
const reorderNotice = ref("");
const search = ref("");
const category = ref("");
const isProjects = computed(() => props.path.endsWith('.projects'));
const isSkills = computed(() => props.path.endsWith('.skills'));
const isExperiences = computed(() => props.path.endsWith('.experiences'));
const chipList = computed(() => props.schema.label === 'Daftar skill' || props.schema.label === 'Teknologi');
const objectFields = computed(() => Object.fromEntries(Object.entries(props.schema.fields || {}).filter(([key]) => !(key === 'items' && /\.skills\.\d+$/.test(props.path)))));
const projectOptions: Record<string, { icon: string; description: string }> = {
  badge: { icon: 'verified', description: 'Label singkat pada kartu proyek.' },
  tech: { icon: 'code', description: 'Teknologi yang digunakan untuk membangun proyek.' },
  demoUrl: { icon: 'play_circle', description: 'Tambahkan video dari galeri, file, atau tautan.' },
  playUrl: { icon: 'shop', description: 'Tautan aplikasi yang tersedia di Google Play.' },
  link: { icon: 'link', description: 'Tautan website, repository, atau halaman proyek.' },
  thumbnail: { icon: 'image', description: 'Gambar utama pada kartu proyek.' },
  images: { icon: 'perm_media', description: 'Screenshot dan gambar pendukung proyek.' },
};
const projectColumns = [['name', 'category', 'period', 'badge', 'description', 'tech', 'demoUrl', 'playUrl', 'link'], ['thumbnail', 'images']];
function toggleDetails(event: Event) {
  const details = (event.currentTarget as HTMLElement).closest('.entry')?.querySelector('details');
  if (details) details.open = !details.open;
}
const categories = computed(() => [...new Set(items.value.map(item => String((item as Record<string, unknown>).category || '')))].filter(Boolean));
const experienceLabels: Record<string, string> = { work: "Pekerjaan", internship: "Magang", organization: "Organisasi" };
const experienceIcons: Record<string, string> = { work: "work", internship: "school", organization: "groups" };
const experienceLabel = computed(() => experienceLabels[props.experienceType || ""] || "Pengalaman Profesional");
const shownEntries = computed(() => items.value.flatMap((item, index) => visible(item) ? [{ item, index }] : []));
function addItem() {
  const item = emptyValue(props.schema.item!);
  if (props.experienceType && item && typeof item === "object") Object.assign(item, { type: props.experienceType });
  emit("update:modelValue", [...items.value, item]);
}
function visible(item: unknown) {
  if (props.experienceType) return (item as Record<string, unknown>).type === props.experienceType;
  if (!isProjects.value) return true;
  const entry = item as Record<string, unknown>;
  return (!category.value || entry.category === category.value) && JSON.stringify(item).toLowerCase().includes(search.value.toLowerCase());
}
function itemMeta(value: unknown): string {
  if (!value || typeof value !== 'object') return '';
  const item = value as Record<string, unknown>;
  if (isSkills.value) return String(item.description || '');
  if (isExperiences.value) return [item.role, [item.start, item.end].filter(Boolean).join(' - '), item.location].filter(Boolean).join(' · ');
  return String(item.period || item.category || '');
}
function itemTags(value: unknown): string[] {
  if (!value || typeof value !== 'object') return [];
  const item = value as Record<string, unknown>;
  if (Array.isArray(item.tech)) return item.tech.filter((tag): tag is string => typeof tag === 'string').slice(0, 4);
  if (Array.isArray(item.items)) return [`${item.items.length} Skill`];
  return [];
}
const multiline = computed(() => props.schema.format === undefined && !props.schema.options && (/deskripsi|paragraf|uraian|ringkasan|catatan|lead|description|headline|title/i.test(props.schema.label) || textValue.value.length > 100));
const assetKind = computed(() => /Video demo/.test(props.schema.label) ? 'video' : /File CV/.test(props.schema.label) ? 'document' : /Thumbnail|Gambar|Foto profil|Favicon/.test(props.schema.label) ? 'image' : null);
const image = computed(() => props.schema.format === "url" && (props.media.some(item => item.url === textValue.value && item.mime.startsWith("image/")) || /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(textValue.value)));

function updateObject(key: string, value: unknown) {
  const next = { ...record.value };
  if (value === undefined) delete next[key];
  else next[key] = value;
  emit("update:modelValue", next);
}
function updateItem(index: number, value: unknown) {
  const next = [...items.value]; next[index] = value;
  emit("update:modelValue", next);
}
function move(index: number, direction: number) {
  if (props.experienceType) {
    const indices = shownEntries.value.map(entry => entry.index);
    const target = indices[indices.indexOf(index) + direction];
    if (target !== undefined) moveTo(index, target);
  } else moveTo(index, index + direction);
}
function moveTo(index: number, target: number) {
  if (target < 0 || target >= items.value.length || target === index) return;
  const next = [...items.value];
  if (props.experienceType) {
    const indices = shownEntries.value.map(entry => entry.index);
    const from = indices.indexOf(index), to = indices.indexOf(target);
    if (from < 0 || to < 0) return;
    const group = indices.map(position => next[position]);
    group.splice(to, 0, group.splice(from, 1)[0]);
    indices.forEach((position, order) => { next[position] = group[order]; });
  } else {
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
  }
  emit("update:modelValue", next);
  reorderNotice.value = `Item dipindahkan ke urutan ${props.experienceType ? shownEntries.value.findIndex(entry => entry.index === target) + 1 : target + 1}.`;
}
function startDrag(event: PointerEvent, index: number) {
  if (event.button !== 0) return;
  const handle = event.currentTarget as HTMLButtonElement;
  handle.focus();
  handle.setPointerCapture(event.pointerId);
  dragIndex.value = index;
  dropIndex.value = index;
}
function updateDrag(event: PointerEvent) {
  if (dragIndex.value === null) return;
  const list = (event.currentTarget as HTMLElement).closest(".array-editor");
  const rows = list?.querySelectorAll<HTMLElement>(":scope > .entry");
  if (!rows) return;
  rows.forEach(row => {
    const bounds = row.getBoundingClientRect();
    if (event.clientY >= bounds.top && event.clientY <= bounds.bottom) dropIndex.value = Number(row.dataset.itemIndex);
  });
}
function endDrag() {
  if (dragIndex.value !== null && dropIndex.value !== null) moveTo(dragIndex.value, dropIndex.value);
  cancelDrag();
}
function cancelDrag() {
  dragIndex.value = null;
  dropIndex.value = null;
}
async function remove(index: number) {
  if (await confirmAction("Hapus item ini dari draft? Perubahan diterapkan setelah disimpan.")) emit("update:modelValue", items.value.filter((_, position) => position !== index));
}
function caption(value: unknown, index: number) {
  if (typeof value === "string") return value || `${props.schema.item?.label} ${index + 1}`;
  const item = value as Record<string, unknown>;
  return String(item.name || item.category || item.company || item.school || item.title || `${props.schema.item?.label} ${index + 1}`);
}
</script>

<template>
  <div v-if="schema.kind === 'text'" class="field">
    <label :for="path">{{ schema.label }}<span v-if="schema.requiredText"> *</span></label>
    <AssetPicker v-if="assetKind" :model-value="textValue" :kind="assetKind" :label="schema.label" @update:model-value="emit('update:modelValue', $event)" />
    <select v-else-if="schema.options" :id="path" :value="textValue" @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)">
      <option v-for="option in schema.options" :key="option" :value="option">{{ schema.label === 'Jenis' ? experienceLabels[option] || option : option }}</option>
    </select>
    <div v-else-if="schema.format === 'color'" class="color-control"><input type="color" :aria-label="'Pilih warna ' + schema.label" :value="/^#[0-9a-f]{6}/i.test(textValue) ? textValue.slice(0, 7) : '#ffffff'" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" /><input :id="path" :value="textValue" maxlength="9" placeholder="#ffffff" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" /></div>
    <textarea v-else-if="multiline" :id="path" :value="textValue" rows="3" :required="schema.requiredText" maxlength="20000" @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)" />
    <input v-else :id="path" :value="textValue" :type="schema.format === 'email' ? 'email' : 'text'" :required="schema.requiredText" :list="schema.format === 'url' ? `${path}-media` : undefined" maxlength="20000" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    <template v-if="schema.format === 'url' && !assetKind">
      <datalist :id="`${path}-media`"><option v-for="item in media" :key="item.id" :value="item.url">{{ item.name }}</option></datalist>
      <img v-if="image && textValue" :src="mediaUrl(textValue)" :alt="`Preview ${schema.label}`" class="asset-preview" />
    </template>
  </div>
  <fieldset v-else-if="schema.kind === 'object' && schema.fields?.name && schema.fields?.images" class="object-editor project-fields">
    <div v-for="(column, index) in projectColumns" :key="index" class="project-column">
      <h3 class="project-section-title"><AdminIcon :name="index === 0 ? 'projects' : 'media'" />{{ index === 0 ? 'Informasi Proyek' : 'Media Proyek' }}</h3>
      <div v-for="key in column" :key="key" :class="{ 'full-width': !['category', 'period'].includes(key), 'project-option': schema.fields![key].optional }">
        <label v-if="schema.fields![key].optional" class="project-option-header">
          <span class="option-icon"><AdminIcon :name="projectOptions[key]?.icon || 'settings'" /></span>
          <span class="option-caption"><strong>{{ schema.fields![key].label }}</strong><small>{{ projectOptions[key]?.description }}</small></span>
          <span class="option-switch"><input type="checkbox" :aria-label="'Gunakan ' + schema.fields![key].label" :checked="record[key] !== undefined" @change="updateObject(key, ($event.target as HTMLInputElement).checked ? emptyValue(schema.fields![key]) : undefined)" /><span class="switch-track" aria-hidden="true"></span></span>
        </label>
        <div v-if="!schema.fields![key].optional || record[key] !== undefined" :class="{ 'project-option-body': schema.fields![key].optional }"><FieldEditor :model-value="record[key]" :schema="schema.fields![key]" :path="`${path}.${key}`" :media="media" @update:model-value="updateObject(key, $event)" /></div>
      </div>
    </div>
  </fieldset>
  <fieldset v-else-if="schema.kind === 'object'" class="object-editor" :class="{ 'skill-fields': schema.label === 'Grup keahlian' }">
    <legend>{{ schema.label }}</legend>
    <div class="field-grid">
      <div v-for="(field, key) in objectFields" :key="key" :class="{ 'full-width': field.kind !== 'text' }">
        <label v-if="field.optional" class="optional-control">
          <input type="checkbox" :checked="record[key] !== undefined" @change="updateObject(String(key), ($event.target as HTMLInputElement).checked ? emptyValue(field) : undefined)" />
          Gunakan {{ field.label }}
        </label>
        <FieldEditor v-if="!field.optional || record[key] !== undefined" :model-value="record[key]" :schema="field" :path="`${path}.${key}`" :media="media" @update:model-value="updateObject(String(key), $event)" />
      </div>
    </div>
  </fieldset>
  <fieldset v-else-if="chipList" class="chip-editor">
    <legend>{{ schema.label }}</legend>
    <div class="chip-list"><span v-for="(item, index) in items" :key="index" class="editable-chip"><input :aria-label="`${schema.item?.label} ${index + 1}`" :value="typeof item === 'string' ? item : (item as Record<string, unknown>).name" :style="{ width: `${Math.min(25, Math.max(5, String(typeof item === 'string' ? item : (item as Record<string, unknown>).name).length + 1))}ch` }" maxlength="20000" @input="updateItem(index, schema.item?.kind === 'text' ? ($event.target as HTMLInputElement).value : { ...(item as Record<string, unknown>), name: ($event.target as HTMLInputElement).value })" /><button type="button" :aria-label="`Hapus ${caption(item, index)}`" @click="remove(index)"><AdminIcon name="close" /></button></span><button type="button" class="add-chip" :disabled="items.length >= 200" @click="addItem"><AdminIcon name="plus" />Tambah {{ schema.item?.label }}</button></div>
  </fieldset>
  <fieldset v-else class="array-editor" :class="{ 'collection-editor': isProjects || isSkills || isExperiences, 'skills-editor': isSkills }">
    <legend><AdminIcon v-if="experienceType" :name="experienceIcons[experienceType]" />{{ isProjects ? 'Daftar Proyek' : isSkills ? 'Grup Keahlian' : isExperiences ? experienceLabel : schema.label }} ({{ experienceType ? shownEntries.length : items.length }})</legend>
    <div v-if="isProjects" class="list-toolbar"><label><AdminIcon name="search" /><input v-model="search" aria-label="Cari proyek atau teknologi" placeholder="Cari proyek atau teknologi..." /></label><select v-model="category" aria-label="Filter kategori proyek"><option value="">Semua</option><option v-for="option in categories" :key="option" :value="option">{{ option }}</option></select><button type="button" class="add-item" :disabled="items.length >= 200" @click="addItem"><AdminIcon name="plus" />Tambah Proyek Baru</button></div>
    <button v-if="isSkills || isExperiences" type="button" class="add-item-top" :disabled="items.length >= 200" @click="addItem"><AdminIcon name="plus" />Tambah {{ isSkills ? 'Grup Keahlian' : experienceType ? experienceLabel : 'Pengalaman' }}</button>
    <p v-if="experienceType ? !shownEntries.length : !items.length" class="empty">Belum ada item. Tambahkan untuk mulai mengisi.</p>
    <p class="sr-only" role="status">{{ reorderNotice }}</p>
    <p v-if="isProjects && items.length && !items.some(visible)" class="empty">Tidak ada proyek yang sesuai pencarian.</p>
    <div v-for="{ item, index } in shownEntries" :data-item-index="index" :key="index" class="entry" :class="{ 'is-dragging': dragIndex === index, 'drop-target': dragIndex !== null && dropIndex === index && dragIndex !== index }">
      <details :open="(schema.item?.kind === 'text' && schema.item.format !== 'url') || (isProjects && index === 0)">
        <summary><span v-if="isProjects || isSkills || isExperiences" class="entry-symbol"><AdminIcon :name="isProjects ? 'projects' : isSkills ? 'code' : experienceIcons[(item as Record<string, unknown>).type as string] || 'experiences'" /></span><span class="entry-caption"><strong>{{ isProjects ? `${index + 1}. ` : schema.item?.kind === 'text' ? `${schema.item.label} ${index + 1}` : '' }}{{ schema.item?.kind !== 'text' ? caption(item, index) : '' }}</strong><small v-if="itemMeta(item)">{{ itemMeta(item) }}</small></span><span v-if="itemTags(item).length" class="entry-tags"><span v-for="tag in itemTags(item)" :key="tag">{{ tag }}</span></span><AdminIcon name="expand_more" class="disclosure-icon" />      <span class="row-actions">
        <button type="button" class="drag-handle" :disabled="shownEntries.length < 2" :aria-label="`Geser ${caption(item, index)}`" title="Seret untuk mengubah urutan, atau gunakan tombol panah atas/bawah" @click.stop.prevent @pointerdown.stop.prevent="startDrag($event, index)" @pointermove="updateDrag" @pointerup="endDrag" @pointercancel="cancelDrag" @keydown.up.prevent="move(index, -1)" @keydown.down.prevent="move(index, 1)" @keydown.esc="cancelDrag"><AdminIcon name="grip" /></button>
        <button v-if="isProjects || isSkills || isExperiences" type="button" :aria-label="`Edit ${caption(item, index)}`" title="Edit item" @click.stop.prevent="toggleDetails"><AdminIcon name="edit" /></button>
        <button type="button" class="danger" :aria-label="`Hapus ${caption(item, index)}`" title="Hapus item" @click.stop.prevent="remove(index)"><AdminIcon name="trash" /></button>
      </span></summary>
        <FieldEditor :model-value="item" :schema="schema.item!" :path="`${path}.${index}`" :media="media" @update:model-value="updateItem(index, $event)" />
      </details>
      <div v-if="isSkills" class="group-skills"><FieldEditor :model-value="(item as Record<string, unknown>).items" :schema="schema.item!.fields!.items" :path="`${path}.${index}.items`" :media="media" @update:model-value="updateItem(index, { ...(item as Record<string, unknown>), items: $event })" /></div>

    </div>
    <div v-if="isProjects && items.length < 200" class="new-project"><span class="entry-symbol"><AdminIcon name="projects" /></span><h3>Tambah Proyek Baru</h3><p>Daftarkan karya atau aplikasi terbaru ke portfolio. Urutan otomatis ditambahkan pada urutan terakhir.</p><button type="button" @click="addItem">Buat Entri Proyek</button></div>
    <button v-else-if="items.length < 200 && !isSkills && !isExperiences" type="button" @click="addItem">Tambah {{ schema.item?.label }}</button>
  </fieldset>
</template>

<style scoped>
fieldset { border: 0; padding: 0; margin: 0; min-width: 0; }
legend { font: 600 18px/26px var(--cms-heading); margin-bottom: 16px; color: var(--cms-text); }
.field-grid { align-items: start; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 20px; }
.color-control { display: flex; gap: 8px; }
.color-control input[type="color"] { width: 44px; padding: 4px; flex: 0 0 auto; cursor: pointer; }
.color-control input:not([type="color"]) { min-width: 0; }
.full-width { grid-column: 1 / -1; }
.skill-fields > .field-grid { grid-template-columns: 1fr; }
.field { display: grid; gap: 6px; min-width: 0; }
label { font: 500 11px/16px var(--cms-heading); color: var(--cms-muted); }
input, textarea, select { width: 100%; min-height: 44px; padding: 10px 12px; border: 1px solid var(--cms-border); border-radius: 6px; background: var(--cms-input); color: var(--cms-text); font: inherit; font-size: 13px; }
textarea { resize: vertical; line-height: 21px; }
input:focus-visible, textarea:focus-visible, select:focus-visible, summary:focus-visible, button:focus-visible { outline: 2px solid var(--cms-highlight); outline-offset: 3px; box-shadow: none; }
small, .empty { color: var(--cms-muted); font-size: 12px; }
.optional-control { display: flex; gap: 8px; align-items: center; min-height: 36px; margin-bottom: 6px; }
.optional-control input { width: 32px; min-height: 18px; height: 18px; accent-color: var(--cms-accent); }
.object-editor, .array-editor { margin-bottom: 16px; }
.entry { position: relative; border: 1px solid var(--cms-line); margin-bottom: 12px; padding: 12px 16px; border-radius: 8px; background: var(--cms-surface); min-width: 0; }
.entry.is-dragging { opacity: .65; }
.entry.drop-target { outline: 2px solid var(--cms-highlight); outline-offset: 2px; }
.entry > details > summary { display: flex; gap: 8px; align-items: center; }
summary { cursor: pointer; min-height: 44px; padding: 8px 0; font: 600 13px/20px var(--cms-heading); overflow-wrap: anywhere; }
.entry-caption strong { font-weight: 600; }
.entry-caption { min-width: 0; flex: 1; }
.disclosure-icon { flex: 0 0 auto; color: var(--cms-muted); }
details[open] > summary > .disclosure-icon { transform: rotate(180deg); }
summary::-webkit-details-marker { display: none; }
.collection-editor .entry-caption strong { font-size: 18px; line-height: 24px; }

.entry-caption small { display: block; font: 400 11px/18px 'CMS Inter', sans-serif; margin-top: 3px; }
.entry-tags { align-self: center; flex: 0 0 auto; display: flex; gap: 5px; flex-wrap: wrap; margin-top: 0; }
.entry-tags > span { white-space: nowrap; padding: 1px 5px; background: var(--cms-accent-soft); border: 1px solid #3b82f64d; color: var(--cms-highlight); border-radius: 4px; font: 500 10px/14px var(--cms-heading); }
.entry-symbol { display: inline-flex; color: var(--cms-highlight); background: var(--cms-accent-soft); border: 1px solid #3b82f64d; border-radius: 6px; padding: 10px; flex: 0 0 auto; }
details[open] > .object-editor, details[open] > .field { margin-top: 8px; }
.row-actions { display: inline-flex; flex: 0 0 auto; gap: 4px; align-items: center; }
.row-actions button { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; padding: 0; border: 0; background: var(--cms-raised); }
.row-actions button:hover:not(:disabled) { background: var(--cms-line); }
.drag-handle { cursor: grab; touch-action: none; color: var(--cms-muted); }
.drag-handle:active { cursor: grabbing; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
button { min-height: 36px; padding: 8px 12px; font: 500 12px/18px var(--cms-heading); background: var(--cms-raised); border: 1px solid var(--cms-line); border-radius: 6px; color: var(--cms-text); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 5px; }
button:hover { border-color: var(--cms-highlight); }
button:disabled { cursor: default; opacity: .5; }
.danger { color: var(--cms-danger); }
.asset-preview { max-width: 220px; max-height: 160px; object-fit: contain; border-radius: 8px; }
.collection-editor > .entry { padding: 12px 16px; }
.collection-editor > .entry > details > summary { display: flex; align-items: center; gap: 12px; min-height: 60px; list-style: none; }

.collection-editor > .entry > details > summary::-webkit-details-marker { display: none; }

.collection-editor > .entry > details > .object-editor { padding-top: 12px; margin-top: 8px; border-top: 1px solid var(--cms-line); }
.collection-editor > .entry > details > .object-editor > legend { display: none; }
.group-skills { border-top: 1px solid var(--cms-line); padding-top: 12px; margin-top: 12px; }
.group-skills :deep(legend) { display: none; }
.chip-editor { margin-bottom: 16px; }
.chip-editor > legend { font-size: 11px; line-height: 16px; color: var(--cms-muted); margin-bottom: 8px; }
.chip-list { display: flex; flex-wrap: wrap; gap: 6px; }
.editable-chip { display: inline-flex; align-items: center; padding: 0 4px 0 8px; background: var(--cms-accent-soft); border: 1px solid #3b82f64d; border-radius: 6px; max-width: 100%; }
.editable-chip input { padding: 4px 0; border: 0; background: transparent; min-height: 28px; font-size: 11px; max-width: calc(100% - 28px); }
.editable-chip button { padding: 4px; min-height: 28px; border: 0; background: transparent; color: var(--cms-highlight); }
.editable-chip button .material-icon { font-size: 14px; }
.add-chip { padding: 4px 8px; min-height: 30px; border-color: #3b82f64d; color: var(--cms-highlight); background: var(--cms-accent-soft); font-size: 11px; }
.list-toolbar { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.list-toolbar label { display: flex; align-items: center; flex: 1; min-width: 160px; position: relative; margin: 0; }
.list-toolbar label .material-icon { position: absolute; left: 10px; }
.list-toolbar input { padding-left: 36px; }
.list-toolbar select { width: 180px; }
.add-item { background: #2563eb; color: white; border-color: #3b82f6; }
.add-item-top { float: right; margin-top: -44px; margin-bottom: 12px; background: var(--cms-accent-soft); color: var(--cms-highlight); border-color: #3b82f64d; }
.new-project { text-align: center; padding: 32px 20px; border: 1px solid #3b82f64d; border-radius: 12px; }
.new-project h3 { font: 600 20px/28px var(--cms-heading); margin: 12px 0 4px; }
.new-project p { max-width: 55ch; margin: 0 auto 16px; font-size: 12px; color: var(--cms-muted); }
.project-section-title { grid-column: 1 / -1; margin: 0; display: flex; gap: 8px; align-items: center; font: 600 16px/24px var(--cms-heading); }
.project-section-title .material-icon { color: var(--cms-highlight); }
.project-option { border: 1px solid var(--cms-line); border-radius: 8px; background: var(--cms-input); overflow: hidden; }
.project-option-header { display: flex; align-items: center; gap: 12px; padding: 16px; margin: 0; cursor: pointer; min-height: 76px; }
.option-icon { display: inline-flex; padding: 8px; border-radius: 6px; background: var(--cms-accent-soft); color: var(--cms-highlight); }
.option-caption { flex: 1; min-width: 0; }
.option-caption strong { display: block; color: var(--cms-text); font: 600 13px/20px var(--cms-heading); }
.option-caption small { display: block; margin-top: 3px; font: 400 12px/18px var(--cms-heading); }
.option-switch { position: relative; display: inline-flex; flex: 0 0 40px; width: 40px; height: 24px; }
.option-switch input { position: absolute; inset: -10px -2px; width: 44px; height: 44px; min-height: 44px; margin: 0; padding: 0; opacity: 0; cursor: pointer; }
.switch-track { width: 40px; height: 24px; border-radius: 14px; background: var(--cms-muted); pointer-events: none; }
.switch-track::before { content: ''; display: block; width: 18px; height: 18px; border-radius: 50%; margin: 3px; background: #fff; }
.option-switch input:checked + .switch-track { background: var(--cms-accent); }
.option-switch input:checked + .switch-track::before { transform: translateX(16px); }
.option-switch input:focus-visible + .switch-track { outline: 2px solid var(--cms-highlight); outline-offset: 4px; }
.project-option-body { padding: 16px; border-top: 1px solid var(--cms-line); }
.project-option-body :deep(fieldset:last-child) { margin-bottom: 0; }
.project-fields { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); gap: 24px; }
.project-column { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; align-content: start; min-width: 0; }
.project-column :deep(.asset-preview) { width: 100%; max-width: none; max-height: 220px; object-fit: cover; }
@media (max-width: 950px) { .project-fields { grid-template-columns: 1fr; } }
@media (max-width: 650px) {
  .entry > details > summary { flex-wrap: wrap; }
  .entry-caption { flex-basis: 100%; }
  .entry-tags { margin-left: auto; }
  .disclosure-icon { margin-left: auto; }
  .entry-tags + .disclosure-icon { margin-left: 0; }
  .row-actions { margin-left: 0; }
  
  .collection-editor .entry-caption { flex-basis: calc(100% - 48px); }
  .add-item-top { float: none; margin: 0 0 16px; }
  .field-grid, .project-column { grid-template-columns: 1fr; }
  .entry { padding: 12px; }
  input, textarea, select { min-height: 44px; font-size: 16px; }
  .row-actions button { width: 44px; height: 44px; }
  .collection-editor > .entry > details > summary { gap: 8px; align-items: center; }
  .entry-symbol { padding: 6px; }
  
  .editable-chip input { font-size: 14px; min-height: 40px; }
  .editable-chip button { min-height: 40px; }
  .add-chip { min-height: 44px; }
}
</style>
