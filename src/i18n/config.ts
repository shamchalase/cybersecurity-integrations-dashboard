"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import hi from "./locales/hi.json";
import mr from "./locales/mr.json";

export const defaultNS = "translation";
export const resources = {
  en: { translation: en },
  hi: { translation: hi },
  mr: { translation: mr }
} as const;

export type SupportedLanguage = keyof typeof resources;

// Initialize i18next only once
if (!i18n.isInitialized) {
  const initialLang =
    typeof window !== "undefined"
      ? (localStorage.getItem("metron-language") as SupportedLanguage) || "en"
      : "en";

  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: initialLang,
      fallbackLng: "en",
      defaultNS,
      interpolation: {
        escapeValue: false, // React already protects against XSS
        prefix: "{",
        suffix: "}"
      },
      react: {
        useSuspense: false
      }
    });
}

export default i18n;

