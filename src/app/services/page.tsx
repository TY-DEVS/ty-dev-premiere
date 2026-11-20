import type { Metadata } from "next";
import { ServicesContent } from "./ServicesContent";
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

export const metadata: Metadata = {
  title: "Services Ingénierie Web, SaaS & IA Sur-Mesure | Devis 24h — TY Dev",
  description:
    "Développement de plateformes SaaS, intégration d'agents IA, applications web ultra-rapides et Cloud DevOps. Cadrage d'architecture et chiffrage offert sous 24h.",
  keywords: [
    "services saas",
    "agence saas france",
    "developpement ia entreprise",
    "agent ia llm",
    "api integration",
    "architecture cloud devops",
    "ty-dev.fr",
    "ty-dev.tech",
  ],
  alternates: {
    canonical: "https://ty-dev.site/services",
  },
  openGraph: {
    title: "Services Ingénierie Web, SaaS & IA Sur-Mesure | Devis 24h — TY Dev",
    description:
      "Développement de plateformes SaaS, intégration d'agents IA, applications web ultra-rapides et Cloud DevOps. Cadrage d'architecture et chiffrage offert sous 24h.",
    url: "https://ty-dev.site/services",
    images: [{ url: "/logo.jpg" }],
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesBreadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesAggregateSchema) }}
      />
      <ServicesContent />
    </>
  );
}
