import type { Metadata } from "next";
import { NaviCabCaseStudyClient } from "./NaviCabCaseStudyClient";

const navicabCaseStudySchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "NaviCab — Étude de Cas & Architecture SaaS de Dispatch Taxi en Île-de-France",
  description:
    "Découvrez comment TY Dev a co-développé l'infrastructure SaaS NaviCab : dispatch radar en direct, 5 portails web et mobiles, télémétrie GPS et automatisation financière.",
  image: "https://ty-dev.site/portfolio/navicab-hero.webp",
  author: {
    "@type": "Organization",
    name: "TY Dev",
    url: "https://ty-dev.site",
  },
  publisher: {
    "@type": "Organization",
    name: "TY Dev",
    logo: {
      "@type": "ImageObject",
      url: "https://ty-dev.site/logo.jpg",
    },
  },
  about: [
    {
      "@type": "SoftwareApplication",
      name: "NaviCab SaaS Platform",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android (PWA)",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
    },
  ],
  datePublished: "2026-02-15",
  dateModified: "2026-10-08",
  inLanguage: ["fr", "en"],
  mainEntityOfPage: "https://ty-dev.site/projets/navicab",
};

const navicabBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://ty-dev.site/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Portfolio",
      item: "https://ty-dev.site/portfolio",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Étude de Cas NaviCab",
      item: "https://ty-dev.site/projets/navicab",
    },
  ],
};

const navicabFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelle est l'architecture technique de la plateforme SaaS NaviCab conçue par TY Dev ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NaviCab repose sur une architecture distribuée intégrant un algorithme radar de dispatch sub-2s, une télémétrie GPS haute fréquence, 5 portails spécialisés (Chauffeurs PWA, Dispatch Web, Clients, Entreprises B2B, Conciergeries d'hôtels) et un module financier conforme Factur-X et LeTaxi.",
      },
    },
    {
      "@type": "Question",
      name: "Comment TY Dev garantit-il la haute disponibilité (99.99%) du dispatching taxi ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Par une redondance multi-fournisseurs de cartographie (Mapbox avec bascule automatique sur OpenStreetMap), des requêtes géospatiales optimisées sous PostGIS et un cluster Cloud résilient opérant sans interruption 24h/24 et 7j/7.",
      },
    },
    {
      "@type": "Question",
      name: "Les entreprises et conciergeries d'hôtels disposent-elles d'outils dédiés ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Un portail B2B hôtellerie permet la réservation d'un taxi officiel en 1 clic pour leurs clients, avec suivi en temps réel de l'approche du chauffeur et facturation mensuelle consolidée dématérialisée.",
      },
    },
    {
      "@type": "Question",
      name: "Le code source et la propriété intellectuelle appartiennent-ils au client ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Chez TY Dev, 100% de la propriété intellectuelle du code, des designs et de l'architecture logicielle est cédée au client sans licence récurrente ni dépendance propriétaire.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "NaviCab — Étude de Cas & Architecture SaaS de Dispatch Taxi | TY Dev",
  description:
    "Découvrez comment TY Dev a co-développé l'infrastructure SaaS NaviCab : dispatch radar en direct, 5 portails web et mobiles, télémétrie GPS et automatisation financière.",
  keywords: [
    "navicab",
    "etude de cas saas",
    "dispatch taxi",
    "developpement web",
    "ty dev",
    "architecture logicielle",
    "letaxi",
    "cpam",
    "factur-x",
  ],
  alternates: {
    canonical: "https://ty-dev.site/projets/navicab",
  },
  openGraph: {
    title: "NaviCab — Étude de Cas & Architecture SaaS de Dispatch Taxi | TY Dev",
    description:
      "Plateforme SaaS de dispatch taxi en Île-de-France co-développée avec TY Dev. 5 portails, dispatch radar temps réel, facturation Factur-X et conformité LeTaxi.",
    type: "article",
    url: "https://ty-dev.site/projets/navicab",
    images: [{ url: "/portfolio/navicab-hero.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NaviCab — Étude de Cas & Architecture SaaS de Dispatch Taxi | TY Dev",
    description:
      "Plateforme SaaS de dispatch taxi en Île-de-France co-développée avec TY Dev. 5 portails, dispatch radar temps réel, facturation Factur-X et conformité LeTaxi.",
    images: ["/portfolio/navicab-hero.webp"],
  },
};

export default function NaviCabCaseStudyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navicabCaseStudySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navicabBreadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navicabFaqSchema) }}
      />
      <NaviCabCaseStudyClient />
    </>
  );
}
