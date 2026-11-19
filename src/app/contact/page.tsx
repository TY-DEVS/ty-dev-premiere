import type { Metadata } from "next";
import { ContactContent } from "./ContactContent";

const contactFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Sous quel délai TY Dev répond-il à une demande de devis ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Toute demande transmise via notre formulaire ou WhatsApp direct fait l'objet d'un retour et d'une analyse de faisabilité technique sous 24 heures ouvrées, accompagnée d'une première estimation budgétaire transparente.",
      },
    },
    {
      "@type": "Question",
      name: "Mon projet et mes idées sont-ils protégés par un accord de confidentialité (NDA) ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Nous signons systématiquement un accord de confidentialité bilatéral (NDA) avant tout partage de code source, de logique métier ou de cahier des charges sensible afin de protéger intégralement votre propriété intellectuelle.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le modèle de tarification de l'agence TY Dev ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous fonctionnons principalement au forfait fixe et garanti avec calendrier de livrables validé en amont. Pour les projets évolutifs ou les plateformes complexes, nous proposons des forfaits au sprint ou une régie d'ingénieurs dédiée.",
      },
    },
    {
      "@type": "Question",
      name: "Proposez-vous un accompagnement et une maintenance après la mise en ligne ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolument. Chaque projet livré bénéficie d'une garantie de conformité de 30 jours offerte, ainsi que de contrats d'infogérance Cloud, maintenance préventive et évolutive 24/7 selon vos besoins opérationnels.",
      },
    },
  ],
};

const contactBreadcrumbSchema = {
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
      name: "Contact & Devis",
      item: "https://ty-dev.site/contact",
    },
  ],
};

export const metadata: Metadata = {
  title: "Demander un Devis & Consultation Gratuite sous 24h — TY Dev",
  description:
    "Parlez de votre projet SaaS, web ou IA avec l'équipe d'ingénieurs TY Dev. Analyse de faisabilité et estimation budgétaire gratuites sous 24h. Contactez contact@ty-dev.site.",
  keywords: [
    "contact ty dev",
    "devis saas gratuit",
    "devis developpement web",
    "devis agence ia",
    "contact@ty-dev.site",
    "ty-dev.fr",
    "ty-dev.tech",
  ],
  alternates: {
    canonical: "https://ty-dev.site/contact",
  },
  openGraph: {
    title: "Demander un Devis & Consultation Gratuite sous 24h — TY Dev",
    description:
      "Parlez de votre projet SaaS, web ou IA avec l'équipe d'ingénieurs TY Dev. Analyse de faisabilité et estimation budgétaire gratuites sous 24h.",
    url: "https://ty-dev.site/contact",
    images: [{ url: "/logo.jpg" }],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactBreadcrumbSchema) }}
      />
      <ContactContent />
    </>
  );
}
