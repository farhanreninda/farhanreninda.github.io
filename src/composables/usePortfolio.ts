import { computed, shallowRef } from "vue";
import { mediaUrl, request } from "@/cms/api";
import { copySchema, validateDocument, validateField, themeSchema } from "@/cms/schema";
import type { ContentResponse, PortfolioDocument, ThemeConfig } from "@/cms/types";
import { withBuiltInThemes } from "@/cms/themes";

export const portfolio = shallowRef<ContentResponse>();
const displayedThemeId = shallowRef('existing');
let refreshing: Promise<void> | undefined;

function applyThemeConfig(theme: ThemeConfig) {
  displayedThemeId.value = theme.id;
  document.documentElement.dataset.portfolioTheme = theme.id === 'natural' ? 'natural' : 'original';
  const existing = document.getElementById("cms-theme-tokens");
  existing?.remove();
  if (!Object.keys(theme.light).length && !Object.keys(theme.dark).length) return;
  const style = document.createElement("style");
  style.id = "cms-theme-tokens";
  style.textContent = (["light", "dark"] as const).map(mode => `:root[data-theme="${mode}"]{${Object.entries(theme[mode]).map(([key, value]) => `${key}:${value}`).join(";")}}`).join("\n");
  document.head.append(style);
}

function resolveUploads(value: unknown): unknown {
  if (typeof value === "string") return mediaUrl(value);
  if (Array.isArray(value)) return value.map(resolveUploads);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, resolveUploads(child)]));
  return value;
}

export function setPortfolio(content: ContentResponse) {
  const errors = validateDocument(content.data, copySchema);
  if (errors.length) throw new Error("Data portfolio tidak valid");
  const data = withBuiltInThemes(content.data);
  portfolio.value = { ...content, data: resolveUploads(data) as PortfolioDocument };
  const params = new URLSearchParams(location.search);
  const previewId = params.get('cms-preview') === '1' ? params.get('portfolio-theme') : null;
  applyThemeConfig(data.themes.find(theme => theme.id === (previewId || data.activeThemeId)) || data.themes.find(theme => theme.id === data.activeThemeId)!);
  document.querySelector<HTMLLinkElement>('link[rel="icon"]')?.setAttribute("href", mediaUrl(content.data.settings.faviconUrl));
  document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute("content", content.data.settings.themeColor);
}

export function loadPortfolio() {
  if (refreshing) return refreshing;
  refreshing = request<ContentResponse>("/content").then(content => {
    if (portfolio.value?.revision !== content.revision) setPortfolio(content);
  }).finally(() => { refreshing = undefined; });
  return refreshing;
}

export function setupPortfolioRefresh() {
  const refresh = () => { if (document.visibilityState === "visible") void loadPortfolio().catch(() => {}); };
  window.addEventListener("focus", refresh);
  window.setInterval(refresh, 60000);
  if (new URLSearchParams(location.search).get("cms-preview") === "1") {
    window.addEventListener("message", event => {
      if (event.origin !== location.origin || event.source !== window.parent || event.data?.type !== "portfolio-theme-preview") return;
      if (!validateField(event.data.theme, themeSchema).length) applyThemeConfig(event.data.theme);
    });
    window.parent.postMessage({ type: "portfolio-preview-ready" }, location.origin);
  }
}

export const usePortfolio = () => ({
  natural: computed(() => displayedThemeId.value === 'natural'),
  settings: computed(() => portfolio.value!.data.settings),
  revision: computed(() => portfolio.value!.revision),
});
