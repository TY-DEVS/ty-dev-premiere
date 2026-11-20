import type { Metadata } from "next";
import { DemosContent } from "./DemosContent";

const demosBreadcrumbSchema = {
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
      name: "Démos & Maquettes",
      item: "https://ty-dev.site/demos",
    },
  ],
};

export const metadata: Metadata = {
  title: "Démos & Maquettes Interactives — TY Dev | Agence Web & SaaS",
  description:
    "Découvrez nos démos interactives et maquettes de sites vitrines, plateformes SaaS, réservations en ligne et e-commerce développées sur-mesure par TY Dev.",
  keywords: [
    "démos interactives",
    "maquettes web",
    "templates SaaS",
    "site vitrine sur-mesure",
    "location voiture",
    "detailing auto",
    "conciergerie VIP",
    "agence web TY Dev",
  ],
  alternates: {
    canonical: "https://ty-dev.site/demos",
  },
  openGraph: {
    title: "Démos & Maquettes Interactives — TY Dev | Agence Web & SaaS",
    description:
      "Découvrez nos démos interactives et maquettes de sites vitrines, plateformes SaaS, réservations en ligne et e-commerce développées sur-mesure par TY Dev.",
    url: "https://ty-dev.site/demos",
    images: [{ url: "/logo.jpg" }],
  },
};

export default function DemosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(demosBreadcrumbSchema) }}
      />
      <DemosContent />
    </>
  );
}
