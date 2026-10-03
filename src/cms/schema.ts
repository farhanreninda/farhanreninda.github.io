export type FieldSchema = {
  kind: "text" | "object" | "array";
  label: string;
  optional?: boolean;
  requiredText?: boolean;
  format?: "url" | "email" | "date" | "color";
  options?: string[];
  fields?: Record<string, FieldSchema>;
  item?: FieldSchema;
};
const text = (label: string, extra: Partial<FieldSchema> = {}): FieldSchema => ({ kind: "text", label, ...extra });
const required = (label: string) => text(label, { requiredText: true });
const object = (label: string, fields: Record<string, FieldSchema>): FieldSchema => ({ kind: "object", label, fields });
const array = (label: string, item: FieldSchema, optional = false): FieldSchema => ({ kind: "array", label, item, optional });
const url = (label: string, optional = false) => text(label, { format: "url", optional });

export const cvSchema = object("Portfolio", {
  profile: object("Profil dan kontak", {
    name: required("Nama"), title: required("Profesi"), tagline: text("Ringkasan profil"),
    about: array("Tentang saya", text("Paragraf")),
    aboutFocus: array("Fokus kerja", object("Fokus", { label: required("Label"), title: required("Judul"), description: text("Deskripsi") })),
    social: object("Kontak", {
      email: text("Email", { format: "email", requiredText: true }), phone: required("Nomor telepon"),
      whatsapp: text("WhatsApp (kode negara dan angka)", { optional: true }), linkedin: url("LinkedIn"),
      github: url("GitHub", true), location: required("Lokasi"), cvUrl: url("File CV", true),
    }),
  }),
  skills: array("Keahlian", object("Grup keahlian", {
    category: required("Kategori"), description: text("Deskripsi"), items: array("Daftar skill", object("Skill", { name: required("Nama skill") })),
  })),
  experiences: array("Pengalaman", object("Pengalaman", {
    type: text("Jenis", { options: ["work", "internship", "organization"] }), role: required("Jabatan"),
    company: required("Perusahaan / organisasi"), location: text("Lokasi", { optional: true }),
    start: text("Mulai (contoh: Februari 2023)", { format: "date" }),
    end: text("Selesai (atau Sekarang / Present)", { format: "date" }), bullets: array("Uraian pekerjaan", text("Uraian")),
  })),
  projects: array("Proyek", object("Proyek", {
    name: required("Nama proyek"), category: required("Kategori"), badge: required("Badge"), period: text("Periode"),
    description: text("Deskripsi"), tech: array("Teknologi", text("Teknologi"), true),
    thumbnail: url("Thumbnail", true), images: array("Galeri", url("Gambar"), true),
    demoUrl: url("Video demo", true), playUrl: url("Play Store", true), link: url("Tautan proyek", true),
  })),
  certificates: array("Sertifikasi", object("Sertifikat", { name: required("Nama"), issuer: required("Penerbit"), period: text("Periode") })),
  educations: array("Pendidikan", object("Pendidikan", {
    school: required("Institusi"), major: required("Jurusan"), period: text("Periode"),
    gpa: text("IPK", { optional: true }), note: text("Catatan", { optional: true }),
  })),
});

export const settingsSchema = object("Pengaturan umum", {
  portraitUrl: url("Foto profil"), brandMark: required("Inisial merek"), cvDownloadName: required("Nama unduhan CV"),
  faviconUrl: url("Favicon"), themeColor: text("Warna browser", { format: "color" }),
});

export const colorTokens = [
  "--color-bg", "--color-bg-soft", "--color-surface", "--color-surface-elev", "--color-border",
  "--color-text", "--color-text-strong", "--color-text-muted", "--color-navy", "--color-teal",
  "--color-teal-soft", "--color-sky", "--color-sky-deep", "--color-accent-warm", "--color-mint",
  "--color-cream", "--color-blob-1", "--color-blob-2", "--color-blob-3", "--color-blob-4",
  "--color-accent", "--color-accent-strong", "--color-accent-contrast",
];
export const fontChoices = ["system-ui, sans-serif", '"Segoe UI", sans-serif', "Georgia, serif"];
const tokenLabels: Record<string, string> = {
  "--color-bg": "Latar utama",
  "--color-bg-soft": "Latar sekunder",
  "--color-surface": "Permukaan panel",
  "--color-surface-elev": "Permukaan tambahan",
  "--color-border": "Garis pembatas",
  "--color-text": "Teks utama",
  "--color-text-strong": "Teks judul",
  "--color-text-muted": "Teks sekunder",
  "--color-navy": "Warna navy",
  "--color-teal": "Warna teal",
  "--color-teal-soft": "Teal lembut",
  "--color-sky": "Warna sky",
  "--color-sky-deep": "Sky gelap",
  "--color-accent-warm": "Aksen hangat",
  "--color-mint": "Warna mint",
  "--color-cream": "Warna cream",
  "--color-blob-1": "Dekorasi pertama",
  "--color-blob-2": "Dekorasi kedua",
  "--color-blob-3": "Dekorasi ketiga",
  "--color-blob-4": "Dekorasi keempat",
  "--color-accent": "Aksen utama",
  "--color-accent-strong": "Aksen tegas",
  "--color-accent-contrast": "Teks pada aksen",
  "--font-sans": "Font isi",
  "--font-display": "Font judul"
};
const tokenSchema = object("Token", Object.fromEntries([
  ...colorTokens.map(key => [key, text(tokenLabels[key], { optional: true, format: "color" })] as const),
  ...["--font-sans", "--font-display"].map(key => [key, text(tokenLabels[key], { optional: true, options: fontChoices })] as const),
]));
export const themeSchema = object("Tema", {
  id: required("ID"), name: required("Nama tema"), light: tokenSchema, dark: tokenSchema,
});

const textGroup = (label: string, keys: string[]) => object(label, Object.fromEntries(keys.map(key => [key, text(key)])));
export const copySchema = object("Teks website", {
  language: textGroup("Bahasa", ["label", "current"]),
  nav: textGroup("Navigasi", ["top", "skills", "experience", "projects", "education", "contact"]),
  app: textGroup("Metadata", ["skip", "description", "ogTitle", "ogDescription"]),
  theme: textGroup("Tombol mode", ["light", "dark"]),
  hero: textGroup("Hero", ["kicker", "headline"]),
  about: textGroup("Tentang saya", ["eyebrow", "title", "workflowLabel", "currentPosition", "education", "domicile"]),
  skills: textGroup("Keahlian", ["eyebrow", "title", "lead"]),
  experience: object("Pengalaman", {
    ...textGroup("", ["eyebrow", "title", "lead", "currentBadge"]).fields,
    groups: object("Kelompok", Object.fromEntries(["work", "project", "organization"].map(key => [key, textGroup(key, ["title", "description"])]))),
  }),
  projects: textGroup("Proyek", ["eyebrow", "title", "lead", "techLabel", "action", "close", "previous", "next", "imageAlt", "imageDots", "showImage", "demo", "openPlayStore", "openWebsite", "openProject"]),
  education: textGroup("Pendidikan", ["eyebrow", "title", "formal", "certificates", "gpaLabel"]),
  contact: object("Kontak", {
    ...textGroup("", ["eyebrow", "title", "lead", "actionLabel", "whatsappMessage", "emailSubject"]).fields,
    actions: object("Tombol kontak", Object.fromEntries(["email", "whatsapp", "linkedin", "github", "cv"].map(key => [key, textGroup(key, ["label", "title", "detail"])]))),
  }),
  scrollTop: textGroup("Kembali ke atas", ["label"]),
  notFound: textGroup("Halaman 404", ["title", "lead", "button"]),
});

export function emptyValue(schema: FieldSchema): unknown {
  if (schema.kind === "text") return schema.options?.[0] ?? "";
  if (schema.kind === "array") return [];
  return Object.fromEntries(Object.entries(schema.fields ?? {}).filter(([, field]) => !field.optional).map(([key, field]) => [key, emptyValue(field)]));
}

export function isSafeUrl(value: string): boolean {
  if (value === "") return true;
  if (/[\u0000-\u0020\\]/.test(value)) return false;
  if (value.startsWith("/") && !value.startsWith("//")) {
    try { return !decodeURIComponent(value).split(/[/?#]/).some(part => part === ".." || part === "."); }
    catch { return false; }
  }
  try { const parsed = new URL(value); return ["https:", "http:"].includes(parsed.protocol) && !parsed.username && !parsed.password; }
  catch { return false; }
}

export function validateField(value: unknown, schema: FieldSchema, path = schema.label): string[] {
  if (value === undefined && schema.optional) return [];
  const bad = (message: string) => [`${path}: ${message}`];
  if (schema.kind === "text") {
    if (typeof value !== "string" || value.length > 20000) return bad("harus berupa teks, maksimal 20.000 karakter");
    if (schema.requiredText && !value.trim()) return bad("wajib diisi");
    if (schema.options && !schema.options.includes(value)) return bad("pilihan tidak valid");
    if (schema.format === "url" && !isSafeUrl(value)) return bad("gunakan URL http(s) atau path lokal yang valid");
    if (schema.format === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return bad("email tidak valid");
    if (schema.format === "color" && !/^#[\da-f]{6}([\da-f]{2})?$/i.test(value)) return bad("gunakan warna hex 6 atau 8 digit");
    if (schema.format === "date" && !/^(Sekarang|Present|(?:Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember|January|February|March|May|June|July|August|October|December) [12]\d{3})$/.test(value)) return bad("gunakan nama bulan dan tahun, atau Sekarang / Present");
    return [];
  }
  if (schema.kind === "array") {
    if (!Array.isArray(value) || value.length > 200) return bad("harus berupa daftar, maksimal 200 item");
    return value.flatMap((child, index) => validateField(child, schema.item!, `${path}[${index + 1}]`));
  }
  if (value === null || typeof value !== "object" || Array.isArray(value)) return bad("harus berupa objek");
  const record = value as Record<string, unknown>;
  const fields = schema.fields ?? {};
  return [
    ...Object.keys(record).filter(key => !Object.hasOwn(fields, key)).map(key => `${path}.${key}: field tidak dikenal`),
    ...Object.entries(fields).flatMap(([key, field]) => validateField(record[key], field, `${path}.${key}`)),
  ];
}

export function validateDocument(value: unknown, copySchema: FieldSchema): string[] {
  const documentSchema = object("Portfolio", {
    localizedCv: object("Bahasa", { id: cvSchema, en: cvSchema }),
    siteCopy: object("Teks", { id: copySchema, en: copySchema }),
    settings: settingsSchema, themes: array("Tema", themeSchema), activeThemeId: required("Tema aktif"),
  });
  const errors = validateField(value, documentSchema);
  if (errors.length) return errors;
  const doc = value as { themes: { id: string; light: object; dark: object }[]; activeThemeId: string };
  const base = doc.themes.find(theme => theme.id === "existing");
  if (!base || Object.keys(base.light).length || Object.keys(base.dark).length) errors.push("Tema existing wajib ada dan tidak dapat diberi override");
  if (new Set(doc.themes.map(theme => theme.id)).size !== doc.themes.length) errors.push("ID tema harus unik");
  if (!doc.themes.some(theme => theme.id === doc.activeThemeId)) errors.push("Tema aktif tidak ditemukan");
  return errors;
}
