import type { Metadata } from "next";
import { LegalContent } from "./LegalContent";

const legalBreadcrumbSchema = {
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
      name: "Mentions Légales",
      item: "https://ty-dev.site/legal",
    },
  ],
};

export const metadata: Metadata = {
  title: "Mentions Légales & Informations Juridiques — TY Dev LLC",
  description:
    "Informations légales, immatriculation et coordonnées officielles de l'agence TY Dev LLC.",
  alternates: {
    canonical: "https://ty-dev.site/legal",
  },
  openGraph: {
    title: "Mentions Légales & Informations Juridiques — TY Dev LLC",
    description:
      "Informations légales, immatriculation et coordonnées officielles de l'agence TY Dev LLC.",
    url: "https://ty-dev.site/legal",
    type: "website",
  },
};

export default function LegalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalBreadcrumbSchema) }}
      />
      <LegalContent />
    </>
  );
}
