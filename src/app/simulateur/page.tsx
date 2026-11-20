import type { Metadata } from "next";
import { SimulatorContent } from "./SimulatorContent";

const simulatorWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Simulateur de Devis Site Web & SaaS — TY Dev",
  url: "https://ty-dev.site/simulateur",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  browserRequirements: "Requires JavaScript. Requires HTML5.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    description: "Simulation et audit de faisabilité technique gratuit",
  },
  description:
    "Calculateur interactif pour estimer le budget et les délais de développement de sites web vitrines, plateformes SaaS et applications métier sur-mesure.",
  provider: {
    "@type": "Organization",
    name: "TY Dev",
    url: "https://ty-dev.site",
    telephone: "+33 7 59 44 01 05",
    email: "contact@ty-dev.site",
  },
};

const simulatorBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://ty-dev.site",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Simulateur de Devis",
      item: "https://ty-dev.site/simulateur",
    },
  ],
};

const simulatorFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Cette estimation budgétaire est-elle contractuelle ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Cette estimation vous donne un ordre de grandeur réaliste basé sur nos projets récents. Après échange avec notre équipe d'ingénieurs (sous 24h), nous établissons un cahier des charges détaillé avec un devis au forfait ferme sans dépassement surprise.",
      },
    },
    {
      "@type": "Question",
      name: "Comment s'organisent les paiements lors d'un projet ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous fonctionnons par jalons de livraison clairs : généralement 30% d'acompte au démarrage, 40% à la livraison de la version de test intermédiaire, et 30% au déploiement final en production après votre validation complète.",
      },
    },
    {
      "@type": "Question",
      name: "Le code source m'appartient-il à 100% à la livraison ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, sans aucune exception. Vous êtes propriétaire exclusif de l'intégralité du code source, des dépôts Git, de la documentation technique et des accès d'hébergement. Aucun frais caché ni licence propriétaire captive.",
      },
    },
    {
      "@type": "Question",
      name: "Que se passe-t-il après le lancement en production ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Chaque projet bénéficie d'une garantie de correction de bugs offerte pendant 30 jours. Nous proposons également des forfaits de maintenance évolutive et de support réactif avec nos ingénieurs disponibles sur WhatsApp et Slack.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Simulateur de Devis Site Web Vitrine & SaaS en 2 min | TY Dev",
  description:
    "Estimez gratuitement le tarif et le délai de votre site web vitrine, application web ou plateforme SaaS. Chiffrage transparent dès 320 €, cadrage technique et devis sous 24h avec TY Dev.",
  keywords: [
    "simulateur devis site web",
    "prix site internet vitrine",
    "cout creation site vitrine",
    "devis site web vitrine",
    "simulateur devis saas",
    "cout developpement application web",
    "estimation budget site internet",
    "ty-dev.site",
    "ty-dev.fr",
    "ty-dev.tech",
  ],
  alternates: {
    canonical: "https://ty-dev.site/simulateur",
  },
  openGraph: {
    title: "Simulateur de Devis Site Web Vitrine & SaaS en 2 min | TY Dev",
    description:
      "Calculez gratuitement l'estimation budgétaire et le délai de votre site web ou application en 4 étapes simples. Devis personnalisé sous 24h.",
    url: "https://ty-dev.site/simulateur",
    images: [{ url: "/logo.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simulateur de Devis SaaS & Application Web en 2 min | TY Dev",
    description:
      "Calculez gratuitement l'estimation budgétaire et le délai de votre projet tech en 4 étapes simples. Cadrage et réponse sous 24h.",
    images: ["/logo.jpg"],
  },
};

export default function SimulatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(simulatorBreadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(simulatorWebSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(simulatorFaqSchema) }}
      />
      <SimulatorContent />
    </>
  );
}
