export type TenantId = "fr" | "tech" | "site";

export interface TenantConfig {
  id: TenantId;
  domain: string;
  brandName: string;
  defaultLang: "fr" | "en";
  allowedLangs: ("fr" | "en")[];
  currency: "EUR" | "USD";
  currencySymbol: string;
  contact: {
    email: string;
    whatsappNumber: string;
    whatsappDisplay: string;
    whatsappDefaultText: string;
    phoneDisplay: string;
    receivers: string[];
  };
  seo: {
    canonicalBase: string;
    siteTitle: string;
    description: string;
  };
}

export const TENANTS: Record<TenantId, TenantConfig> = {
  fr: {
    id: "fr",
    domain: "ty-dev.fr",
    brandName: "TY Dev France",
    defaultLang: "fr",
    allowedLangs: ["fr", "en"],
    currency: "EUR",
    currencySymbol: "€",
    contact: {
      email: "contact@ty-dev.fr",
      whatsappNumber: "33768474745", // Ligne directe commerciale Raouf (France)
      whatsappDisplay: "+33 7 68 47 47 45",
      whatsappDefaultText: "Bonjour TY Dev France, je souhaite discuter d'un projet web / SaaS.",
      phoneDisplay: "+33 7 68 47 47 45",
      receivers: [
        "contact@ty-dev.fr",
        "webmarketpro77@gmail.com", // Email direct de Raouf
        "benyaalamedyassine24@gmail.com",
        "amine.benammar17@gmail.com",
      ],
    },
    seo: {
      canonicalBase: "https://ty-dev.fr",
      siteTitle: "TY Dev France — Agence SaaS, Applications Web & Automatisation IA",
      description:
        "Agence d'ingénierie logicielle en France. Conception de plateformes SaaS sur-mesure, applications web haute performance et agents IA.",
    },
  },

  tech: {
    id: "tech",
    domain: "ty-dev.tech",
    brandName: "TY Dev Global",
    defaultLang: "en",
    allowedLangs: ["en", "fr"],
    currency: "USD",
    currencySymbol: "$",
    contact: {
      email: "contact@ty-dev.tech",
      whatsappNumber: "33759440105", // Ligne Mohamed Yassine Ben Yaala (CEO / Tech Lead)
      whatsappDisplay: "+33 7 59 44 01 05",
      whatsappDefaultText: "Hello TY Dev, I would like to discuss a SaaS, Web App or Cloud Engineering project.",
      phoneDisplay: "+33 7 59 44 01 05",
      receivers: [
        "contact@ty-dev.tech",
        "benyaalamedyassine24@gmail.com",
        "amine.benammar17@gmail.com",
      ],
    },
    seo: {
      canonicalBase: "https://ty-dev.tech",
      siteTitle: "TY Dev — High-Performance SaaS & AI Engineering",
      description:
        "Global software engineering firm specialized in bespoke multi-tenant SaaS, distributed architectures, and autonomous AI agents.",
    },
  },

  site: {
    id: "site",
    domain: "ty-dev.site",
    brandName: "TY Dev Global",
    defaultLang: "en",
    allowedLangs: ["en", "fr"],
    currency: "USD",
    currencySymbol: "$",
    contact: {
      email: "contact@ty-dev.site",
      whatsappNumber: "33759440105", // Ligne Mohamed Yassine Ben Yaala (CEO / Tech Lead)
      whatsappDisplay: "+33 7 59 44 01 05",
      whatsappDefaultText: "Hello TY Dev, I would like to discuss a SaaS, Web App or Cloud Engineering project.",
      phoneDisplay: "+33 7 59 44 01 05",
      receivers: [
        "contact@ty-dev.site",
        "benyaalamedyassine24@gmail.com",
        "amine.benammar17@gmail.com",
      ],
    },
    seo: {
      canonicalBase: "https://ty-dev.site",
      siteTitle: "TY Dev — High-Performance SaaS & AI Engineering",
      description:
        "Global software engineering firm specialized in bespoke multi-tenant SaaS, distributed architectures, and autonomous AI agents.",
    },
  },
};

export const DEFAULT_TENANT = TENANTS.site;

export function isStagingEnvironment(hostname?: string | null): boolean {
  if (typeof process !== "undefined" && process.env) {
    if (
      process.env.APP_ENV === "staging" ||
      process.env.NEXT_PUBLIC_APP_ENV === "staging"
    ) {
      return true;
    }
  }
  if (hostname && hostname.toLowerCase().startsWith("staging.")) {
    return true;
  }
  return false;
}

export function resolveTenantByHostname(hostname?: string | null): TenantConfig {
  const isStaging = isStagingEnvironment(hostname);
  let baseTenant = DEFAULT_TENANT;

  if (hostname) {
    const lower = hostname.toLowerCase();
    if (lower.includes("ty-dev.fr")) {
      baseTenant = TENANTS.fr;
    } else if (lower.includes("ty-dev.tech")) {
      baseTenant = TENANTS.tech;
    } else if (lower.includes("ty-dev.site")) {
      baseTenant = TENANTS.site;
    }
  }

  if (isStaging) {
    const stagingDomain = `staging.${baseTenant.domain}`;
    return {
      ...baseTenant,
      domain: stagingDomain,
      seo: {
        ...baseTenant.seo,
        canonicalBase: `https://${stagingDomain}`,
        siteTitle: `[STAGING] ${baseTenant.seo.siteTitle}`,
      },
    };
  }

  return baseTenant;
}
