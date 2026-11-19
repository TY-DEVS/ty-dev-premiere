import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

const aboutBreadcrumbSchema = {
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
      name: "À Propos",
      item: "https://ty-dev.site/about",
    },
  ],
};

export const metadata: Metadata = {
  title: "À Propos — TY Dev | Agence Indépendante d'Ingénierie Logicielle",
  description:
    "Rencontrez l'équipe TY Dev — agence indépendante spécialisée dans la création de systèmes logiciels robustes et d'applications IA pour entreprises ambitieuses.",
  keywords: [
    "à propos ty dev",
    "équipe agence web",
    "ingénieurs saas",
    "experts ia",
    "devops france",
  ],
  alternates: {
    canonical: "https://ty-dev.site/about",
  },
  openGraph: {
    title: "À Propos — TY Dev | Agence Indépendante d'Ingénierie Logicielle",
    description:
      "Rencontrez l'équipe TY Dev — agence indépendante spécialisée dans la création de systèmes logiciels et d'IA.",
    url: "https://ty-dev.site/about",
    images: [{ url: "/logo.jpg" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutBreadcrumbSchema) }}
      />
      <AboutContent />
    </>
  );
}
