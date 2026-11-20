import type { Metadata } from "next";
import { FaqContent } from "./FaqContent";

const faqBreadcrumbSchema = {
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
      name: "Foire Aux Questions",
      item: "https://ty-dev.site/faq",
    },
  ],
};

export const metadata: Metadata = {
  title: "Foire Aux Questions & Réponses — TY Dev | Agence Web & SaaS",
  description:
    "Toutes les réponses à vos questions sur nos services de développement SaaS, applications web, tarifs, délais, optimisation SEO et automatisation IA par TY Dev.",
  keywords: [
    "FAQ ty dev",
    "questions frequentes saas",
    "tarif devis web",
    "delai developpement",
    "seo google",
    "automatisation ia",
    "agence logicielle",
  ],
  alternates: {
    canonical: "https://ty-dev.site/faq",
  },
  openGraph: {
    title: "Foire Aux Questions & Réponses — TY Dev | Agence Web & SaaS",
    description:
      "Toutes les réponses à vos questions sur nos services de développement SaaS, applications web, tarifs, délais, optimisation SEO et automatisation IA par TY Dev.",
    url: "https://ty-dev.site/faq",
    images: [{ url: "/logo.jpg" }],
  },
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqBreadcrumbSchema) }}
      />
      <FaqContent />
    </>
  );
}
