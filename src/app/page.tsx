import type { Metadata } from "next";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { About } from "@/components/site/About";
import { Portfolio } from "@/components/site/Portfolio";
import { NaviCabSpotlight } from "@/components/site/NaviCabSpotlight";
import { Demos } from "@/components/site/Demos";
import { Testimonials } from "@/components/site/Testimonials";
import { WhyUs } from "@/components/site/WhyUs";
import { TechStack } from "@/components/site/TechStack";
import { Process } from "@/components/site/Process";
import { CtaStrip } from "@/components/site/CtaStrip";

const agencyFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quels types de projets développe l'agence TY Dev ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TY Dev conçoit des plateformes SaaS B2B, des applications web sur-mesure haute performance, des agents intelligents d'IA et des systèmes d'automatisation complexes pour des startups et entreprises à forte exigence technique.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le délai moyen de livraison d'un MVP ou d'une plateforme web ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un MVP SaaS ou une application web métier est généralement conçu et déployé en production entre 3 et 8 semaines selon la complexité fonctionnelle et les intégrations d'API requises.",
      },
    },
    {
      "@type": "Question",
      name: "Le code source développé m'appartient-il à 100% ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Dès la livraison finale et la validation de chaque jalon, l'intégralité du code source, de la propriété intellectuelle et des accès aux infrastructures Cloud est transférée à votre entreprise sans abonnement captif.",
      },
    },
    {
      "@type": "Question",
      name: "Comment obtenir une estimation budgétaire pour mon projet ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vous pouvez utiliser notre simulateur de devis interactif en ligne sur /simulateur pour obtenir une première estimation transparente, ou nous contacter directement via WhatsApp ou notre formulaire pour un cadrage technique sous 24h.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "TY Dev — Agence SaaS, Applications Web & Agents IA | Devis Sous 24h",
  description:
    "Création de plateformes SaaS sur-mesure, agents et automatisations IA, applications web réactives. Audit technique et devis gratuit sous 24h avec l'agence TY Dev.",
  alternates: {
    canonical: "https://ty-dev.site/",
  },
  openGraph: {
    title: "TY Dev — Agence SaaS, Applications Web & Agents IA | Devis Sous 24h",
    description:
      "Création de plateformes SaaS sur-mesure, agents et automatisations IA, applications web réactives. Audit technique et devis gratuit sous 24h avec l'agence TY Dev.",
    url: "https://ty-dev.site/",
    images: [{ url: "/logo.jpg" }],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agencyFaqSchema) }}
      />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <NaviCabSpotlight />
      <Testimonials />
      <Demos />
      <WhyUs />
      <TechStack />
      <Process />
      <CtaStrip />
    </>
  );
}
