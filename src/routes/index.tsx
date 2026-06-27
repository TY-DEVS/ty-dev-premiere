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
      { title: "TY Dev — AI & Software Development Agency" },
      {
        name: "description",
        content:
          "Custom SaaS platforms, AI automation, and high-performance web applications. Engineered for real business growth.",
      },
      { property: "og:title", content: "TY Dev — AI & Software Development Agency" },
      {
        property: "og:description",
        content:
          "Custom SaaS platforms, AI automation, and high-performance web applications. Engineered for real business growth.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <WhyUs />
      <TechStack />
      <Process />
      <CtaStrip />
    </>
  );
}
