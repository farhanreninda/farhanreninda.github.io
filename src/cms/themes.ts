import type { PortfolioDocument, ThemeConfig } from "./types";

export const naturalTheme: ThemeConfig = {
  id: "natural",
  name: "Portfolio Natural",
  light: {
    "--color-bg": "#f5f7fb",
    "--color-bg-soft": "#eef2f8",
    "--color-surface": "#ffffff",
    "--color-surface-elev": "#e8edf5",
    "--color-border": "#cdd6e4",
    "--color-text": "#334155",
    "--color-text-strong": "#0f172a",
    "--color-text-muted": "#52627a",
    "--color-accent": "#0056cf",
    "--color-accent-strong": "#003f99",
    "--color-accent-contrast": "#ffffff",
    "--color-teal": "#006a91",
    "--font-sans": '"Portfolio Geist", sans-serif',
    "--font-display": '"CMS Plus Jakarta Sans", sans-serif',
  },
  dark: {
    "--color-bg": "#0f131d",
    "--color-bg-soft": "#0a0e18",
    "--color-surface": "#131722",
    "--color-surface-elev": "#21283a",
    "--color-border": "#273046",
    "--color-text": "#c2c6d8",
    "--color-text-strong": "#dfe2f1",
    "--color-text-muted": "#94a3b8",
    "--color-accent": "#3b82f6",
    "--color-accent-strong": "#7bd0ff",
    "--color-accent-contrast": "#ffffff",
    "--color-teal": "#38bdf8",
    "--font-sans": '"Portfolio Geist", sans-serif',
    "--font-display": '"CMS Plus Jakarta Sans", sans-serif',
  },
};

export const isBuiltInTheme = (id: string) =>
  id === "existing" || id === "natural";

// Older CMS documents keep their content and active theme when the new layout is added.
export function withBuiltInThemes(data: PortfolioDocument): PortfolioDocument {
  return {
    ...data,
    themes: [
      ...data.themes.map((theme) =>
        theme.id === "existing"
          ? { ...theme, name: "Portfolio Original" }
          : theme,
      ),
      ...(data.themes.some((theme) => theme.id === "natural")
        ? []
        : [structuredClone(naturalTheme)]),
    ],
  };
}
