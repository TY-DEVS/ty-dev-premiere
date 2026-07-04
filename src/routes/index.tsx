import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { About } from "@/components/site/About";
import { Portfolio } from "@/components/site/Portfolio";
import { WhyUs } from "@/components/site/WhyUs";
import { TechStack } from "@/components/site/TechStack";
import { Process } from "@/components/site/Process";
import { CtaStrip } from "@/components/site/CtaStrip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TY Dev — Agence Web Tunisie | Développement Sites Internet Djerba, Tunis" },
      {
        name: "description",
        content:
          "Agence de développement web professionnelle en Tunisie. Création de sites internet, applications web, e-commerce et solutions IA à Djerba, Tunis, Sfax et partout en Tunisie. Devis gratuit +216 52 949 272",
      },
      {
        name: "keywords",
        content:
          "agence web tunisie, développement web djerba, création site internet tunis, agence digitale djerba, site web professionnel tunisie, développeur web tunis, création site e-commerce tunisie, application web tunisie, agence web djerba, développement logiciel tunisie, site vitrine tunisie, refonte site web tunisie",
      },
      { property: "og:title", content: "TY Dev — Agence Web & Développement en Tunisie | Djerba, Tunis" },
      {
        property: "og:description",
        content:
          "Votre partenaire web en Tunisie. Sites internet professionnels, e-commerce, applications SaaS et IA. Présents à Djerba, Tunis et toute la Tunisie. Contact: contact@ty-dev.tech",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ty-dev.tech" },
      { property: "og:locale", content: "fr_TN" },
      { name: "geo.region", content: "TN-11;TN-23" },
      { name: "geo.placename", content: "Djerba, Tunis" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <WhyUs />
      <TechStack />
      <Process />
      <CtaStrip />
    </>
  );
}
