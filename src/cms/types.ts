import type { Cv, Locale } from "../types/cv";
import type { siteCopy } from "../data/cv";

export type SiteCopy = typeof siteCopy.id;
export interface ThemeConfig {
  id: string;
  name: string;
  light: Record<string, string>;
  dark: Record<string, string>;
}
export interface PortfolioDocument {
  localizedCv: Record<Locale, Cv>;
  siteCopy: Record<Locale, SiteCopy>;
  settings: {
    portraitUrl: string;
    brandMark: string;
    cvDownloadName: string;
    faviconUrl: string;
    themeColor: string;
  };
  themes: ThemeConfig[];
  activeThemeId: string;
}
export interface ContentResponse { data: PortfolioDocument; revision: number }
export interface AdminSession { csrfToken: string; login?: string }
export interface MediaItem { id: string; name: string; url: string; mime: string; size: number; source: "existing" | "upload" }
