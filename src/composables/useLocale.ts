import { computed, ref, watchEffect } from "vue";
import { localizedCv, siteCopy } from "@/data/cv";
import type { Locale } from "@/types/cv";

const STORAGE_KEY = "locale";

const isLocale = (value: string | null): value is Locale => value === "id" || value === "en";

const readInitialLocale = (): Locale => {
  if (typeof window === "undefined") return "id";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isLocale(stored) ? stored : "id";
};

const locale = ref<Locale>(readInitialLocale());
let syncInitialized = false;
let localeLeaveTimer: number | undefined;
let localeCleanupTimer: number | undefined;

const clearLocaleMotion = () => {
  if (typeof window === "undefined") return;
  window.clearTimeout(localeLeaveTimer);
  window.clearTimeout(localeCleanupTimer);
};

const removeLocaleMotionClasses = () => {
  document.documentElement.classList.remove("is-locale-changing", "is-locale-leaving", "is-locale-entering");
};

const runLocaleTransition = (nextLocale: Locale) => {
  if (typeof window === "undefined") {
    locale.value = nextLocale;
    return;
  }

  clearLocaleMotion();
  removeLocaleMotionClasses();
  document.documentElement.classList.add("is-locale-changing", "is-locale-leaving");

  localeLeaveTimer = window.setTimeout(() => {
    locale.value = nextLocale;
    document.documentElement.classList.remove("is-locale-leaving");
    document.documentElement.classList.add("is-locale-entering");

    localeCleanupTimer = window.setTimeout(() => {
      removeLocaleMotionClasses();
    }, 560);
  }, 150);
};

const ensureLocaleSync = () => {
  if (syncInitialized || typeof window === "undefined") return;
  syncInitialized = true;

  watchEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale.value);
    document.documentElement.setAttribute("lang", locale.value);
    document.documentElement.dataset.locale = locale.value;
  });
};

export const useLocale = () => {
  ensureLocaleSync();

  const currentCv = computed(() => localizedCv[locale.value]);
  const copy = computed(() => siteCopy[locale.value]);
  const isEnglish = computed(() => locale.value === "en");

  const setLocale = (value: Locale) => {
    if (locale.value === value) return;
    runLocaleTransition(value);
  };

  const toggleLocale = () => {
    setLocale(locale.value === "id" ? "en" : "id");
  };

  return {
    locale,
    currentCv,
    copy,
    isEnglish,
    setLocale,
    toggleLocale,
  };
};
