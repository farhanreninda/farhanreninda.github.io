import { ref, watchEffect } from "vue";

export type Theme = "light" | "dark";
const STORAGE_KEY = "theme";

const theme = ref<Theme>(initialTheme());

function initialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(value: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", value);
}

watchEffect(() => applyTheme(theme.value));

export function useTheme() {
  function toggle() {
    theme.value = theme.value === "dark" ? "light" : "dark";
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, theme.value);
    }
  }
  return { theme, toggle };
}
