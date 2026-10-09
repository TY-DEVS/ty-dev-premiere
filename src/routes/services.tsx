import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { TechStack } from "@/components/site/TechStack";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Testimonials } from "@/components/site/Testimonials";
import { useI18n } from "@/i18n/context";

import { getAggregateRatingSchema } from "@/data/reviewsData";

const servicesBreadcrumbSchema = {
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
      name: "Services",
      item: "https://ty-dev.site/services",
    },
  ],
};

const servicesAggregateSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Services Ingénierie Logicielle, SaaS & IA — TY Dev",
  serviceType: "Développement Logiciel & Architecture Cloud",
  provider: {
    "@type": "Organization",
    name: "TY Dev",
    url: "https://ty-dev.site",
    logo: "https://ty-dev.site/logo.jpg",
  },
  description:
    "Conception et déploiement de plateformes SaaS sur-mesure, agents IA d'automatisation, architectures web haute performance et maintenance cloud devops.",
  aggregateRating: getAggregateRatingSchema(),
};

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services Ingénierie Web, SaaS & IA Sur-Mesure | Devis 24h — TY Dev" },
      {
        name: "description",
        content:
          "Développement de plateformes SaaS, intégration d'agents IA, applications web ultra-rapides et Cloud DevOps. Cadrage d'architecture et chiffrage offert sous 24h.",
      },
      { name: "keywords", content: "services saas, agence saas france, developpement ia entreprise, agent ia llm, api integration, architecture cloud devops, ty-dev.fr, ty-dev.tech" },
      { property: "og:title", content: "Services Ingénierie Web, SaaS & IA Sur-Mesure | Devis 24h — TY Dev" },
      {
        property: "og:description",
        content:
          "Développement de plateformes SaaS, intégration d'agents IA, applications web ultra-rapides et Cloud DevOps. Cadrage d'architecture et chiffrage offert sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ty-dev.site/services" },
      { property: "og:image", content: "https://ty-dev.site/logo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Services Ingénierie Web, SaaS & IA Sur-Mesure | Devis 24h — TY Dev" },
      {
        name: "twitter:description",
        content:
          "Développement de plateformes SaaS, intégration d'agents IA, applications web ultra-rapides et Cloud DevOps. Cadrage d'architecture et chiffrage offert sous 24h.",
      },
      { name: "twitter:image", content: "https://ty-dev.site/logo.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://ty-dev.site/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(servicesBreadcrumbSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(servicesAggregateSchema),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow="// 02 — SERVICES"
        crumb={t.nav.services}
        title={lang === "fr" ? "Des solutions taillées pour" : "Engineering crafted for"}
        accent={lang === "fr" ? "la performance." : "real impact."}
        subtitle={
          lang === "fr"
            ? "De l'architecture cloud à l'IA appliquée, chaque service est conçu pour générer un retour mesurable."
            : "From cloud architecture to applied AI, every service is built to deliver measurable returns."
        }
      />
      <Services />
      <Process />
      <TechStack />
      <Testimonials />
      <CtaStrip />
    </>
  );
}
