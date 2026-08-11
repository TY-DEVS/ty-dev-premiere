import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { About } from "@/components/site/About";
import { Portfolio } from "@/components/site/Portfolio";
import { Demos } from "@/components/site/Demos";
import { Testimonials } from "@/components/site/Testimonials";
import { WhyUs } from "@/components/site/WhyUs";
import { TechStack } from "@/components/site/TechStack";
import { Process } from "@/components/site/Process";
import { CtaStrip } from "@/components/site/CtaStrip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TY Dev — Agence de Développement Web, SaaS & Agents IA" },
      {
        name: "description",
        content:
          "Création de plateformes SaaS sur-mesure, agents et automatisations IA, applications web réactives. Une ingénierie taillée pour la croissance.",
      },
      { name: "keywords", content: "agence web, agence ia, saas france, développement web, react, vite, devops, tanstack" },
      { property: "og:title", content: "TY Dev — Agence de Développement Web, SaaS & Agents IA" },
      {
        property: "og:description",
        content:
          "Création de plateformes SaaS sur-mesure, agents et automatisations IA, applications web réactives. Une ingénierie taillée pour la croissance.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ty-dev.site/" },
      { property: "og:image", content: "https://ty-dev.site/logo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://ty-dev.site/logo.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://ty-dev.site/" }],
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
      <Testimonials />
      <Demos />
      <WhyUs />
      <TechStack />
      <Process />
      <CtaStrip />
    </>
  );
}
