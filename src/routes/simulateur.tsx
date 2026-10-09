import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Simulator } from "@/components/site/Simulator";
import { Section } from "@/components/site/Services";
import { CtaStrip } from "@/components/site/CtaStrip";
import { useI18n } from "@/i18n/context";

const simulatorWebSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Simulateur de Devis Site Web & SaaS — TY Dev",
  "url": "https://ty-dev.site/simulateur",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "description": "Simulation et audit de faisabilité technique gratuit",
  },
  "description":
    "Calculateur interactif pour estimer le budget et les délais de développement de sites web vitrines, plateformes SaaS et applications métier sur-mesure.",
  "provider": {
    "@type": "Organization",
    "name": "TY Dev",
    "url": "https://ty-dev.site",
    "telephone": "+33 7 59 44 01 05",
    "email": "contact@ty-dev.site",
  },
};

const simulatorFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Cette estimation budgétaire est-elle contractuelle ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Cette estimation vous donne un ordre de grandeur réaliste basé sur nos projets récents. Après échange avec notre équipe d'ingénieurs (sous 24h), nous établissons un cahier des charges détaillé avec un devis au forfait ferme sans dépassement surprise.",
      },
    },
    {
      "@type": "Question",
      "name": "Comment s'organisent les paiements lors d'un projet ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Nous fonctionnons par jalons de livraison clairs : généralement 30% d'acompte au démarrage, 40% à la livraison de la version de test intermédiaire, et 30% au déploiement final en production après votre validation complète.",
      },
    },
    {
      "@type": "Question",
      "name": "Le code source m'appartient-il à 100% à la livraison ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Oui, sans aucune exception. Vous êtes propriétaire exclusif de l'intégralité du code source, des dépôts Git, de la documentation technique et des accès d'hébergement. Aucun frais caché ni licence propriétaire captive.",
      },
    },
    {
      "@type": "Question",
      "name": "Que se passe-t-il après le lancement en production ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text":
          "Chaque projet bénéficie d'une garantie de correction de bugs offerte pendant 30 jours. Nous proposons également des forfaits de maintenance évolutive et de support réactif avec nos ingénieurs disponibles sur WhatsApp et Slack.",
      },
    },
  ],
};

export const Route = createFileRoute("/simulateur")({
  head: () => ({
    meta: [
      {
        title: "Simulateur de Devis Site Web Vitrine & SaaS en 2 min | TY Dev",
      },
      {
        name: "description",
        content:
          "Estimez gratuitement le tarif et le délai de votre site web vitrine, application web ou plateforme SaaS. Chiffrage transparent dès 320 €, cadrage technique et devis sous 24h avec TY Dev.",
      },
      {
        name: "keywords",
        content:
          "simulateur devis site web, prix site internet vitrine, cout creation site vitrine, devis site web vitrine, simulateur devis saas, cout developpement application web, estimation budget site internet, ty-dev.site, ty-dev.fr, ty-dev.tech",
      },
      {
        property: "og:title",
        content: "Simulateur de Devis Site Web Vitrine & SaaS en 2 min | TY Dev",
      },
      {
        property: "og:description",
        content:
          "Calculez gratuitement l'estimation budgétaire et le délai de votre site web ou application en 4 étapes simples. Devis personnalisé sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ty-dev.site/simulateur" },
      { property: "og:image", content: "https://ty-dev.site/logo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Simulateur de Devis SaaS & Application Web en 2 min | TY Dev",
      },
      {
        name: "twitter:description",
        content:
          "Calculez gratuitement l'estimation budgétaire et le délai de votre projet tech en 4 étapes simples. Cadrage et réponse sous 24h.",
      },
      { name: "twitter:image", content: "https://ty-dev.site/logo.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://ty-dev.site/simulateur" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(simulatorWebSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(simulatorFaqSchema),
      },
    ],
  }),
  component: SimulatorPage,
});

function SimulatorPage() {
  const { lang } = useI18n();

  return (
    <>
      <PageHeader
        eyebrow="// 08 — SIMULATEUR DE DEVIS"
        crumb={lang === "fr" ? "Simulateur" : "Simulator"}
        title={lang === "fr" ? "Estimez le budget de votre" : "Calculate your"}
        accent={lang === "fr" ? "projet en 2 minutes." : "project estimate in 2 min."}
        subtitle={
          lang === "fr"
            ? "Configurez vos modules techniques, découvrez une fourchette budgétaire transparente et recevez un cadrage complet sous 24h."
            : "Select your architectural modules, explore transparent pricing tiers and receive technical scoping under 24h."
        }
      />

      <Section id="simulator-section" className="py-16 md:py-24">
        <Simulator />
      </Section>

      <CtaStrip />
    </>
  );
}
