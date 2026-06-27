import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/i18n/context";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { Services } from "@/components/site/Services";
import { Portfolio } from "@/components/site/Portfolio";
import { WhyUs } from "@/components/site/WhyUs";
import { TechStack } from "@/components/site/TechStack";
import { Process } from "@/components/site/Process";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

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
    <I18nProvider>
      <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Services />
          <Portfolio />
          <WhyUs />
          <TechStack />
          <Process />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </I18nProvider>
  );
}
