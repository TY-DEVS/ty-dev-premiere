import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Lang, type Dict } from "./translations";

type DomainTarget = "fr" | "tech" | "site";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  domainTarget: DomainTarget;
};

const I18nContext = createContext<Ctx | null>(null);

function detectDomainTarget(): DomainTarget {
  if (typeof window !== "undefined") {
    const host = window.location.hostname.toLowerCase();
    if (host.includes("ty-dev.fr")) return "fr";
    if (host.includes("ty-dev.tech")) return "tech";
  }
  return "site";
}

function getInitialLang(): Lang {
  if (typeof window !== "undefined") {
    // 1. Si l'utilisateur a explicitement choisi une langue, la respecter
    const saved = localStorage.getItem("tydev_lang");
    if (saved === "fr" || saved === "en") {
      return saved;
    }

    // 2. Détection par domaine (Option A Multi-Domaines Ciblée)
    const host = window.location.hostname.toLowerCase();
    if (host.includes("ty-dev.fr")) {
      return "fr"; // Ciblage Marché France & Francophone
    }
    if (host.includes("ty-dev.tech")) {
      return "en"; // Ciblage International & Marché Tech Anglophone
    }

    // 3. Sur ty-dev.site ou localhost, détecter la langue du navigateur
    if (navigator.language && navigator.language.toLowerCase().startsWith("en")) {
      return "en";
    }
  }

  // Par défaut en français pour le domaine principal
  return "fr";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const [domainTarget, setDomainTarget] = useState<DomainTarget>("site");

  useEffect(() => {
    const detected = detectDomainTarget();
    setDomainTarget(detected);

    const initial = getInitialLang();
    setLangState(initial);
    if (typeof document !== "undefined") {
      document.documentElement.lang = initial;
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("tydev_lang", l);
      document.documentElement.lang = l;
    }
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang], domainTarget }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
