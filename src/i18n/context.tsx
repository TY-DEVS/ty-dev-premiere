'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { translations, type Lang, type Dict } from "./translations";
import { resolveTenantByHostname, type TenantId } from "@/config/tenants";

type DomainTarget = TenantId;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  domainTarget: DomainTarget;
};

const I18nContext = createContext<Ctx | null>(null);

function getInitialLang(): Lang {
  if (typeof window !== "undefined") {
    // 1. Si l'utilisateur a explicitement choisi une langue, la respecter
    const saved = localStorage.getItem("tydev_lang");
    if (saved === "fr" || saved === "en") {
      return saved;
    }

    // 2. Détection par domaine (Multi-Domaines Ciblée)
    const host = window.location.hostname.toLowerCase();
    const tenant = resolveTenantByHostname(host);
    return tenant.defaultLang;
  }

  // Par défaut en français pour le SSR
  return "fr";
}

export function I18nProvider({
  children,
  initialLang = "fr",
  initialDomainTarget = "site",
}: {
  children: ReactNode;
  initialLang?: Lang;
  initialDomainTarget?: DomainTarget;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [domainTarget, setDomainTarget] = useState<DomainTarget>(initialDomainTarget);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tenant = resolveTenantByHostname(window.location.hostname);
      setDomainTarget(tenant.id);

      // Si l'utilisateur a une préférence explicite sauvegardée, la respecter
      const saved = localStorage.getItem("tydev_lang");
      if (saved === "fr" || saved === "en") {
        setLangState(saved);
        if (typeof document !== "undefined") {
          document.documentElement.lang = saved;
        }
      } else {
        const initial = tenant.defaultLang;
        setLangState(initial);
        if (typeof document !== "undefined") {
          document.documentElement.lang = initial;
        }
      }
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("tydev_lang", l);
      document.cookie = `tydev_lang=${l}; path=/; max-age=31536000; SameSite=Lax`;
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
