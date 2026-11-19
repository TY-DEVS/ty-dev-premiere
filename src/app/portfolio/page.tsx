import type { Metadata } from "next";
import { PortfolioContent } from "./PortfolioContent";

const portfolioBreadcrumbSchema = {
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
      name: "Portfolio & Réalisations",
      item: "https://ty-dev.site/portfolio",
    },
  ],
};

export const metadata: Metadata = {
  title: "Réalisations & Études de Cas SaaS, Web et IA — Portfolio TY Dev",
  description:
    "Explorez nos projets concrets : applications SaaS rentables, plateformes web sur-mesure et automatisations IA livrées par l'équipe d'ingénieurs TY Dev.",
  keywords: [
    "portfolio agence web",
    "réalisations saas",
    "études de cas ia",
    "developpement web sur mesure",
    "ty dev portfolio",
    "ty-dev.fr",
    "ty-dev.tech",
  ],
  alternates: {
    canonical: "https://ty-dev.site/portfolio",
  },
  openGraph: {
    title: "Réalisations & Études de Cas SaaS, Web et IA — Portfolio TY Dev",
    description:
      "Explorez nos projets concrets : applications SaaS rentables, plateformes web sur-mesure et automatisations IA livrées par l'équipe d'ingénieurs TY Dev.",
    url: "https://ty-dev.site/portfolio",
    images: [{ url: "/logo.jpg" }],
  },
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioBreadcrumbSchema) }}
      />
      <PortfolioContent />
    </>
  );
}
