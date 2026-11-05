"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n, { type SupportedLanguage } from "@/i18n/config";

export type Language = SupportedLanguage;

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  i18n: typeof i18n;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

function LanguageInnerProvider({ children }: { children: ReactNode }) {
  const { t: i18nT, i18n: i18nInstance } = useTranslation();
  const [currentLang, setCurrentLang] = useState<Language>(
    ((i18nInstance.language as Language) || "en")
  );

  useEffect(() => {
    const handleLanguageChanged = (lng: string) => {
      const validLng = (lng === "hi" || lng === "mr" ? lng : "en") as Language;
      setCurrentLang(validLng);
      if (typeof document !== "undefined") {
        document.documentElement.lang = validLng;
      }
    };

    i18nInstance.on("languageChanged", handleLanguageChanged);
    return () => {
      i18nInstance.off("languageChanged", handleLanguageChanged);
    };
  }, [i18nInstance]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("metron-language") as Language | null;
      if (saved && (saved === "en" || saved === "hi" || saved === "mr")) {
        if (i18nInstance.language !== saved) {
          i18nInstance.changeLanguage(saved);
        }
        document.documentElement.lang = saved;
      }
    }
  }, [i18nInstance]);

  const setLanguage = (nextLanguage: Language) => {
    i18nInstance.changeLanguage(nextLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem("metron-language", nextLanguage);
      document.documentElement.lang = nextLanguage;
    }
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    let result = i18nT(key, params as Record<string, unknown>);
    if (params && typeof result === "string" && result.includes("{")) {
      Object.entries(params).forEach(([pKey, pVal]) => {
        result = result.replace(new RegExp(`\\{${pKey}\\}`, "g"), String(pVal));
      });
    }
    return result;
  };

  return (
    <LanguageContext.Provider
      value={{
        language: currentLang,
        setLanguage,
        t,
        i18n: i18nInstance
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageInnerProvider>{children}</LanguageInnerProvider>
    </I18nextProvider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}

// Re-export i18n instance and useTranslation hook
export { i18n, useTranslation };
