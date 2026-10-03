<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ApiError, mediaUrl, request } from "./api";
import { githubMode, githubRepo, githubBranch, loginGithub, oauthUrl } from "./github";
import { copySchema, cvSchema, themeSchema, validateDocument, validateField } from "./schema";
import type { AdminSession, ContentResponse, MediaItem, PortfolioDocument, ThemeConfig } from "./types";
import type { Cv, Locale } from "@/types/cv";
import { setPortfolio } from "@/composables/usePortfolio";
import { useTheme } from "@/composables/useTheme";
import FieldEditor from "./FieldEditor.vue";
import AdminIcon from "./AdminIcon.vue";
import ProfileEditor from "./ProfileEditor.vue";
import "./fonts.css";
import IdentityEditor from "./IdentityEditor.vue";
import { mediaContextKey } from "./mediaContext";
import { answerConfirmation, confirmationMessage, confirmAction } from "./confirmation";

const sections = [
  { id: "overview", label: "Ringkasan" }, { id: "profile", label: "Profil & Kontak" },
  { id: "skills", label: "Keahlian" }, { id: "experiences", label: "Pengalaman" },
  { id: "projects", label: "Proyek" }, { id: "educations", label: "Pendidikan" },
  { id: "certificates", label: "Sertifikasi" },
  { id: "settings", label: "Identitas Website" }, { id: "themes", label: "Tema & Tampilan" },
];
const navigationGroups = [
  { label: "Konten", items: sections.slice(0, 7) },
  { label: "Website", items: sections.slice(7) },
];
const route = useRoute();
const router = useRouter();
const section = computed(() => sections.find(item => item.id === route.query.section) ?? sections[0]);
const session = ref<AdminSession | null>(null);
const saved = ref<ContentResponse | null>(null);
const draft = ref<PortfolioDocument | null>(null);
const media = ref<MediaItem[]>([]);
const locale = ref<Locale>("id");
const loading = ref(true);
const busy = ref(false);
const error = ref("");
const details = ref<string[]>([]);
const notice = ref("");
const magicWord = ref("");
const menuOpen = ref(false);
const themeId = ref("existing");
const preview = ref<HTMLDialogElement | null>(null);
const diffPreview = ref<HTMLDialogElement | null>(null);
const confirmation = ref<HTMLDialogElement | null>(null);
watch(confirmationMessage, message => {
  if (message) confirmation.value?.showModal();
  else confirmation.value?.close();
});
const previewFrame = ref<HTMLIFrameElement | null>(null);
const { theme, toggle } = useTheme();
const dirty = computed(() => Boolean(draft.value && saved.value && JSON.stringify(draft.value) !== JSON.stringify(saved.value.data)));
const activeEditor = computed(() => {
  const id = section.value.id;
  if (Object.hasOwn(cvSchema.fields!, id)) return { value: draft.value?.localizedCv[locale.value][id as keyof Cv], schema: cvSchema.fields![id] };
  return null;
});
const baseThemeColors: Record<'light' | 'dark', Record<string, string>> = {
  light: { '--color-bg': '#f8fbfa', '--color-surface': '#ffffff', '--color-text': '#3f5557', '--color-teal': '#266d78' },
  dark: { '--color-bg': '#181922', '--color-surface': '#242633', '--color-text': '#dfddd6', '--color-teal': '#8acbd2' },
};
function sampleColor(mode: 'light' | 'dark', token: string) { return selectedTheme.value?.[mode][token] || baseThemeColors[mode][token]; }
const selectedTheme = computed(() => draft.value?.themes.find(item => item.id === themeId.value));
const currentProfile = computed(() => draft.value?.localizedCv[locale.value].profile);
const totalItems = computed(() => counts.value.reduce((total, item) => total + item.count, 0));
const pageDescription = computed(() => ({
  overview: 'Kelola seluruh konten portfolio developer dalam satu ruang kerja terpusat.',
  profile: 'Konfigurasi representasi profesional, resume digital, metadata bio, serta endpoint kontak publik.',
  skills: 'Kelola kategori dan daftar keahlian. Seret pegangan untuk mengubah urutan.',
  experiences: 'Kelola riwayat pekerjaan, magang, dan organisasi. Seret pegangan untuk mengubah urutan.',
  settings: 'Atur foto profil, identitas browser, dan nama dokumen CV.',
  themes: 'Kelola tema portfolio, warna, dan tipografi. Preview perubahan sebelum disimpan.',
  projects: 'Ubah data proyek, lalu simpan untuk memperbarui portfolio. Urutan daftar mengikuti urutan tampil pada portfolio.',
}[section.value.id] || 'Ubah data, lalu simpan untuk memperbarui portfolio.'));
function updateProfile(value: Cv['profile']) {
  if (draft.value) draft.value.localizedCv[locale.value].profile = value;
}
const counts = computed(() => {
  const cv = saved.value?.data.localizedCv[locale.value];
  return cv ? [
    { id: "projects", label: "Proyek", count: cv.projects.length },
    { id: "skills", label: "Skill", count: cv.skills.reduce((total, group) => total + group.items.length, 0) },
    { id: "experiences", label: "Pengalaman", count: cv.experiences.length },
    { id: "educations", label: "Pendidikan", count: cv.educations.length },
    { id: "certificates", label: "Sertifikasi", count: cv.certificates.length },
  ] : [];
});

function showError(cause: unknown) {
  error.value = cause instanceof Error ? cause.message : "Permintaan gagal. Coba lagi.";
  details.value = cause instanceof ApiError ? cause.details : [];
  if (cause instanceof ApiError && cause.status === 401) session.value = null;
}
async function run(action: () => Promise<void>) {
  busy.value = true; error.value = ""; details.value = []; notice.value = "";
  try { await action(); } catch (cause) { showError(cause); } finally { busy.value = false; }
}
async function loadData() {
  const content = await request<ContentResponse>("/admin/content");
  const assets = await request<MediaItem[]>("/admin/media");
  saved.value = content;
  draft.value = structuredClone(content.data);
  media.value = assets;
  if (!draft.value.themes.some(item => item.id === themeId.value)) themeId.value = "existing";
}
onMounted(async () => {
  try { session.value = await request<AdminSession>("/admin/session"); await loadData(); }
  catch (cause) { if (!(cause instanceof ApiError && cause.status === 401)) showError(cause); }
  finally { loading.value = false; }
});
watch(() => route.query.section, () => { document.getElementById("cms-main")?.scrollTo({ top: 0 }); });
function navigate(id: string) {
  void router.replace({ query: { section: id } }); menuOpen.value = false;
}
function updateEditor(value: unknown) {
  if (!draft.value) return;
  if (section.value.id === "settings") draft.value.settings = value as PortfolioDocument["settings"];
  else Object.assign(draft.value.localizedCv[locale.value], { [section.value.id]: value });
}
async function unlock() {
  await run(async () => {
    session.value = githubMode ? await loginGithub() : await request<AdminSession>("/admin/unlock", { method: "POST", body: JSON.stringify({ magicWord: magicWord.value }) });
    magicWord.value = "";
    await loadData();
  });
}
async function logout() {
  if (dirty.value && !await confirmAction("Keluar dan buang perubahan draft yang belum disimpan?")) return;
  await run(async () => {
    await request("/admin/logout", { method: "POST" }, session.value!);
    session.value = null; saved.value = null; draft.value = null; media.value = []; magicWord.value = "";
  });
}
async function save() {
  if (!draft.value || !saved.value) return;
  const errors = validateDocument(draft.value, copySchema);
  if (errors.length) { error.value = "Periksa data yang diisi"; details.value = errors; return; }
  await run(async () => {
    const content = await request<ContentResponse>("/admin/content", { method: "PUT", body: JSON.stringify({ data: draft.value, revision: saved.value!.revision }) }, session.value!);
    saved.value = content;
    draft.value = structuredClone(content.data);
    setPortfolio(content);
    notice.value = githubMode ? "Perubahan tersimpan di GitHub. Portfolio publik diperbarui setelah deploy GitHub Pages selesai." : "Perubahan tersimpan dan sudah tersedia di portfolio publik.";
  });
}
async function reloadData() {
  if (dirty.value && !await confirmAction("Muat ulang dan buang perubahan draft yang belum disimpan?")) return;
  await run(loadData);
}
function newTheme() {
  const id = crypto.randomUUID();
  draft.value!.themes.push({ id, name: "", light: {}, dark: {} });
  themeId.value = id;
}
async function removeTheme() {
  if (themeId.value === "existing") return;
  if (!await confirmAction("Hapus tema ini dari draft?")) return;
  if (draft.value!.activeThemeId === themeId.value) draft.value!.activeThemeId = "existing";
  draft.value!.themes = draft.value!.themes.filter(item => item.id !== themeId.value);
  themeId.value = "existing";
}
function openPreview() {
  const errors = validateField(selectedTheme.value, themeSchema);
  if (errors.length) { error.value = "Lengkapi konfigurasi tema sebelum preview"; details.value = errors; return; }
  preview.value!.showModal();
  previewFrame.value!.src = "/?cms-preview=1&noreveal=1";
}
function sendPreview() {
  if (selectedTheme.value) previewFrame.value?.contentWindow?.postMessage({ type: "portfolio-theme-preview", theme: JSON.parse(JSON.stringify(selectedTheme.value)) }, location.origin);
}
const previewReady = (event: MessageEvent) => {
  if (event.origin === location.origin && event.source === previewFrame.value?.contentWindow && event.data?.type === "portfolio-preview-ready") sendPreview();
};
window.addEventListener("message", previewReady);
function updateThemeMode(mode: "light" | "dark", value: unknown) {
  if (selectedTheme.value && themeId.value !== "existing") selectedTheme.value[mode] = value as ThemeConfig["light"];
}
async function uploadAsset(file: File): Promise<MediaItem> {
  if (file.size > 10 * 1024 * 1024) throw new Error("Ukuran file maksimal 10 MB");
  const item = await request<MediaItem>("/admin/media", { method: "POST", body: file, headers: { "Content-Type": file.type, "X-File-Name": encodeURIComponent(file.name) } }, session.value!);
  media.value.unshift(item);
  notice.value = "File diunggah ke galeri. Simpan konten untuk menerapkan URL pilihan.";
  return item;
}
provide(mediaContextKey, { assets: media, upload: uploadAsset });
const beforeUnload = (event: BeforeUnloadEvent) => { if (dirty.value) { event.preventDefault(); event.returnValue = ""; } };
window.addEventListener("beforeunload", beforeUnload);
onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", beforeUnload);
  window.removeEventListener("message", previewReady);
  answerConfirmation(false);
});
</script>

<template>
  <div class="cms-shell" :class="{ 'cms-dark': theme === 'dark', 'cms-authenticated': !!session && !loading }">
    <p v-if="loading" class="loading" role="status">Memeriksa sesi admin…</p>
    <div v-else-if="!session" class="login-page">
      <header class="login-header">
        <a class="login-brand" href="/"><AdminIcon name="terminal" />Portfolio CMS</a>
        <button class="login-theme" type="button" :aria-label="theme === 'dark' ? 'Mode terang' : 'Mode gelap'" :title="theme === 'dark' ? 'Mode terang' : 'Mode gelap'" @click="toggle"><AdminIcon :name="theme === 'dark' ? 'sun' : 'moon'" /></button>
      </header>
      <form class="login-form" @submit.prevent="unlock">
        <span class="access-icon"><AdminIcon name="lock" /></span>
        <h1>Buka akses admin</h1>
        <p>{{ githubMode ? 'Masuk dengan akun GitHub yang memiliki akses ke repository portfolio.' : 'Masukkan magic word untuk mengelola portfolio.' }}</p>
        <div v-if="githubMode" class="github-repository"><AdminIcon name="code" /><span>{{ githubRepo }}</span><span class="login-branch">{{ githubBranch }}</span></div>
        <p v-if="githubMode && !oauthUrl" class="login-setup" role="status">Login GitHub belum tersedia. Pengelola perlu menyelesaikan konfigurasi akses.</p>
        <label v-if="!githubMode" for="admin-magic-word">Magic word</label>
        <input v-if="!githubMode" id="admin-magic-word" v-model="magicWord" type="password" autocomplete="current-password" required maxlength="128" />
        <p v-if="error" role="alert" class="error-message">{{ error }}</p>
        <button class="primary login-submit" :disabled="busy || (githubMode && !oauthUrl)" type="submit"><svg v-if="githubMode" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /></svg>{{ busy ? 'Memeriksa…' : githubMode ? 'Masuk dengan GitHub' : 'Buka admin' }}<AdminIcon name="arrow" /></button>
        <a class="login-back" href="/"><AdminIcon name="arrow_back" />Kembali ke portfolio</a>
      </form>
      <footer class="login-footer">{{ githubMode ? 'Akses melalui GitHub' : 'Pengelolaan portfolio' }}</footer>
    </div>
    <template v-else>
      <a class="cms-skip" href="#cms-main">Lewati navigasi</a>
      <header class="cms-topbar">
        <div class="workbench-label"><AdminIcon name="lock" />Akses Admin</div>
        <div class="topbar-actions">
          <a href="/" target="_blank" rel="noopener"><AdminIcon name="external" />Lihat portfolio</a>
          <button type="button" :aria-label="theme === 'dark' ? 'Mode terang' : 'Mode gelap'" :title="theme === 'dark' ? 'Mode terang' : 'Mode gelap'" @click="toggle"><AdminIcon :name="theme === 'dark' ? 'moon' : 'sun'" /></button>
          <div class="access-status"><span class="admin-avatar"><AdminIcon name="profile" /></span><div><strong>{{ saved?.data.localizedCv[locale].profile.name }}</strong><small>{{ githubMode ? session?.login : 'Pengelola Portfolio' }}</small></div></div>
          <button type="button" class="exit-button" aria-label="Keluar" title="Keluar" :disabled="busy" @click="logout"><AdminIcon name="exit" /></button>
        </div>
      </header>
      <div class="cms-layout">
        <aside class="cms-sidebar">
          <a href="/" class="sidebar-brand"><span class="brand-symbol"><AdminIcon name="terminal" /></span><div><strong>Portfolio <span class="cms-badge">CMS</span></strong><small><span class="status-dot"></span> Ruang kerja aktif</small></div></a>
          <button type="button" class="menu-toggle" :aria-expanded="menuOpen" aria-controls="cms-navigation" @click="menuOpen = !menuOpen">Menu pengelolaan</button>
          <nav id="cms-navigation" :class="{ 'menu-open': menuOpen }" aria-label="Pengelolaan portfolio">
            <div v-for="group in navigationGroups" :key="group.label" class="navigation-group">
              <p>{{ group.label }}</p>
              <button v-for="item in group.items" :key="item.id" type="button" :aria-current="section.id === item.id ? 'page' : undefined" @click="navigate(item.id)"><AdminIcon :name="item.id" />{{ item.label }}</button>
            </div>
          </nav>
          <div class="sidebar-status"><div><strong>Status CMS <span>Revisi {{ saved?.revision }}</span></strong><small><span class="status-dot"></span>{{ dirty ? 'Draft belum disimpan' : 'Konten tersimpan' }}</small></div></div>
        </aside>
        <main id="cms-main" class="cms-main" :class="{ 'projects-page': section.id === 'projects' }">
          <div class="page-heading">
            <div class="page-title"><h1>{{ section.label }}</h1><p class="page-description">{{ pageDescription }}</p></div>
            <div class="page-tools">
            <label class="locale-control"><AdminIcon name="copy" /><span>Bahasa:</span>
              <select v-model="locale" aria-label="Bahasa konten"><option value="id">Indonesia</option><option value="en">English</option></select>
            </label>
            <div class="save-actions">
              <button type="button" :disabled="busy" @click="reloadData"><AdminIcon name="refresh" />Muat ulang data</button>
              <div class="publication-actions"><button v-if="dirty" type="button" class="cancel-edit" :disabled="busy" @click="reloadData"><AdminIcon name="close" />Batalkan edit</button><button type="button" class="primary" :disabled="busy || !dirty" @click="save"><AdminIcon name="save" />{{ busy ? 'Memproses…' : 'Simpan dan publikasikan' }}</button></div>
            </div>
            </div>
          </div>
          <div class="save-bar">
            <AdminIcon :name="dirty ? 'copy' : 'check'" /><p>{{ dirty ? 'Ada perubahan draft yang belum disimpan.' : `Data tersimpan · revisi ${saved?.revision ?? 'belum tersedia'}` }}</p><span v-if="!dirty" class="save-bar-locale">{{ locale === 'id' ? 'Indonesia' : 'English' }}</span><button v-if="section.id === 'profile'" type="button" @click="diffPreview?.showModal()"><AdminIcon name="copy" />Diff Preview</button>
          </div>
          <div v-if="error" class="error-message" role="alert"><p>{{ error }}</p><ul v-if="details.length"><li v-for="detail in details" :key="detail">{{ detail }}</li></ul></div>
          <p v-if="notice" class="notice" role="status">{{ notice }}</p>
          <p v-if="!draft" role="status">Data belum tersedia. Gunakan Muat ulang data untuk mencoba lagi.</p>
          <template v-else>
            <section v-if="section.id === 'overview'" class="overview">
              <div class="overview-intro">
                <article class="profile-summary">
                  <div class="summary-identity"><img :src="mediaUrl(saved?.data.settings.portraitUrl || '')" alt="Foto profil portfolio" /><div><h2>{{ saved?.data.localizedCv[locale].profile.name }}</h2><div class="summary-meta"><span class="profile-role"><AdminIcon name="terminal" />{{ saved?.data.localizedCv[locale].profile.title }}</span><span><AdminIcon name="location" />{{ saved?.data.localizedCv[locale].profile.social.location }}</span></div></div></div>
                  <div class="summary-bio"><h3>Bio & Profil Aktif ({{ locale.toUpperCase() }})</h3><p>{{ saved?.data.localizedCv[locale].profile.tagline }}</p></div>
                  <div class="profile-summary-footer"><div class="summary-tags"><span v-for="skill in saved?.data.localizedCv[locale].skills[0]?.items.slice(0, 2)" :key="skill.name"><AdminIcon name="code" />{{ skill.name }}</span></div><button type="button" @click="navigate('profile')">Edit Profil & Data Pribadi<AdminIcon name="arrow" /></button></div>
                </article>
                <aside class="quick-actions">
                  <h2><AdminIcon name="skills" />Pintasan Editor <small>Akses Cepat</small></h2>
                  <button type="button" @click="navigate('projects')"><span class="quick-icon"><AdminIcon name="projects" /></span><span><strong>Kelola proyek</strong><small>Deskripsi, teknologi, dan galeri</small></span><AdminIcon name="arrow" /></button>
                  <button type="button" @click="navigate('settings')"><span class="quick-icon"><AdminIcon name="profile" /></span><span><strong>Identitas Website</strong><small>Foto profil, favicon, dan dokumen CV</small></span><AdminIcon name="arrow" /></button>
                  <button type="button" @click="navigate('themes')"><span class="quick-icon"><AdminIcon name="themes" /></span><span><strong>Tema & tampilan</strong><small>Konfigurasi dan preview tema</small></span><AdminIcon name="arrow" /></button>
                </aside>
              </div>
              <div class="overview-heading"><div><h2>Koleksi Portfolio</h2><p>Ringkasan konten portfolio yang tersimpan</p></div><span class="cms-badge">Total {{ totalItems }} Item</span></div>
              <dl class="counts"><div v-for="item in counts" :key="item.id"><dt>{{ item.label }}<span class="collection-icon"><AdminIcon :name="item.id" /></span></dt><dd>{{ item.count }}<small>{{ item.id === 'skills' ? 'skill' : 'entri' }}</small></dd><p>{{ { projects: 'Karya dan aplikasi', skills: 'Kategori stack', experiences: 'Karier & kontribusi tim', educations: 'Formal & vokasi', certificates: 'Sertifikat portfolio' }[item.id] }}</p><button type="button" @click="navigate(item.id)">Kelola {{ item.label.toLowerCase() }}<AdminIcon name="arrow" /></button></div></dl>
              <div class="overview-note"><span class="note-icon"><AdminIcon name="copy" /></span><div><h3>Konten dalam dua bahasa terintegrasi</h3><p>Pilih Indonesia atau English untuk mengelola versi masing-masing secara terpisah. Semua perubahan disimpan di database CMS.</p></div></div>
            </section>
            <ProfileEditor v-else-if="section.id === 'profile' && currentProfile" :key="locale" :model-value="currentProfile" :locale="locale" :media="media" :portrait-url="draft.settings.portraitUrl" :dirty="dirty" :busy="busy" @update:model-value="updateProfile" @save="save" @reset="reloadData" />
            <form v-else-if="activeEditor" class="editor-panel" @submit.prevent="save">
              
              <div v-if="section.id === 'experiences'" class="experience-groups"><section v-for="type in ['work', 'internship', 'organization']" :key="type" :aria-label="{ work: 'Pekerjaan', internship: 'Magang', organization: 'Organisasi' }[type]"><FieldEditor :key="`${type}-${locale}`" :model-value="activeEditor.value" :schema="activeEditor.schema" :path="`${locale}.experiences`" :media="media" :experience-type="type" @update:model-value="updateEditor" /></section></div>
              <FieldEditor v-else :key="`${section.id}-${locale}`" :model-value="activeEditor.value" :schema="activeEditor.schema" :path="`${locale}.${section.id}`" :media="media" @update:model-value="updateEditor" />
            </form>
            <IdentityEditor v-else-if="section.id === 'settings'" :model-value="draft.settings" :media="media" @update:model-value="updateEditor" />
            <section v-else-if="section.id === 'themes'" class="theme-workspace">
              <div class="theme-toolbar"><label for="theme-select">Tema portfolio<select id="theme-select" v-model="themeId"><option v-for="item in draft.themes" :key="item.id" :value="item.id">{{ item.name || 'Tema belum diberi nama' }}{{ item.id === draft.activeThemeId ? ' (aktif)' : '' }}</option></select></label><button type="button" @click="newTheme"><AdminIcon name="plus" />Tambah tema</button></div>
              <template v-if="selectedTheme">
                <article class="theme-card"><header><span class="theme-card-icon"><AdminIcon name="themes" /></span><div><h2>{{ selectedTheme.name || 'Tema Baru' }}</h2><p>{{ themeId === 'existing' ? 'Desain portfolio asli. Buat tema baru untuk menyesuaikan warna dan font.' : 'Konfigurasi tema pilihan. Nilai kosong mengikuti desain portfolio asli.' }}</p></div><span class="cms-badge">{{ draft.activeThemeId === themeId ? 'Aktif' : 'Belum aktif' }}</span></header>
                  <div class="theme-mode-previews"><div v-for="mode in ['light', 'dark'] as const" :key="mode" class="theme-sample" :class="mode" :style="{ background: sampleColor(mode, '--color-bg'), color: sampleColor(mode, '--color-text'), fontFamily: selectedTheme[mode]['--font-sans'] }"><small>{{ mode === 'light' ? 'Mode Terang' : 'Mode Gelap' }}</small><strong>{{ currentProfile?.name }}</strong><span>{{ currentProfile?.title }}</span><div class="theme-swatches"><i v-for="token in ['--color-bg', '--color-surface', '--color-text', '--color-teal']" :key="token" :style="{ background: sampleColor(mode, token) }" /></div></div></div>
                  <div class="theme-actions"><button type="button" @click="openPreview"><AdminIcon name="external" />Preview tema</button><button type="button" class="primary" :disabled="draft.activeThemeId === themeId" @click="draft.activeThemeId = themeId"><AdminIcon name="check" />{{ draft.activeThemeId === themeId ? 'Tema aktif' : 'Jadikan tema aktif' }}</button><button v-if="themeId !== 'existing'" class="danger" type="button" @click="removeTheme"><AdminIcon name="trash" />Hapus tema</button></div>
                </article>
                <section v-if="themeId !== 'existing'" class="theme-config"><label for="theme-name">Nama tema</label><input id="theme-name" v-model="selectedTheme.name" required maxlength="200" /><details v-for="mode in ['light', 'dark'] as const" :key="mode" class="theme-mode"><summary><AdminIcon :name="mode === 'light' ? 'sun' : 'moon'" /><span>{{ mode === 'light' ? 'Warna & Font Mode Terang' : 'Warna & Font Mode Gelap' }}</span><AdminIcon name="expand_more" /></summary><FieldEditor :model-value="selectedTheme[mode]" :schema="themeSchema.fields![mode]" :path="'theme.' + mode" :media="[]" @update:model-value="updateThemeMode(mode, $event)" /></details></section>
                <p class="theme-save-hint">Perubahan konfigurasi dan tema aktif diterapkan setelah Simpan dan publikasikan.</p>
              </template>
            </section>
          </template>
        </main>
      </div>
      <dialog ref="preview" class="theme-preview"><div class="preview-heading"><h2>Preview tema</h2><button type="button" @click="preview?.close()">Tutup preview</button></div><iframe ref="previewFrame" title="Preview tema portfolio" @load="sendPreview" /></dialog>
      <dialog ref="diffPreview" class="diff-preview" aria-labelledby="diff-title"><div class="preview-heading"><h2 id="diff-title">Perbandingan Profil</h2><button type="button" @click="diffPreview?.close()">Tutup perbandingan</button></div><div class="diff-columns"><section><h3>Data tersimpan</h3><pre>{{ JSON.stringify(saved?.data.localizedCv[locale].profile, null, 2) }}</pre></section><section><h3>Draft saat ini</h3><pre>{{ JSON.stringify(currentProfile, null, 2) }}</pre></section></div></dialog>
      <dialog ref="confirmation" class="confirmation-dialog" aria-labelledby="confirmation-title" @cancel="answerConfirmation(false)">
        <h2 id="confirmation-title">Konfirmasi perubahan</h2>
        <p>{{ confirmationMessage }}</p>
        <div class="save-actions"><button type="button" autofocus @click="answerConfirmation(false)">Batal</button><button type="button" class="primary" @click="answerConfirmation(true)">Lanjutkan</button></div>
      </dialog>
    </template>
  </div>
</template>

<style scoped src="./admin.css"></style>
