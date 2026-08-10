import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { About } from "@/components/site/About";
import { TechStack } from "@/components/site/TechStack";
import { CtaStrip } from "@/components/site/CtaStrip";
import { useI18n } from "@/i18n/context";
import { Team } from "@/components/site/Team";
import { Testimonials } from "@/components/site/Testimonials";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — TY Dev" },
      {
        name: "description",
        content:
          "Meet TY Dev — an independent software & AI agency engineering scalable platforms for modern businesses.",
      },
      { property: "og:title", content: "About — TY Dev" },
      {
        property: "og:description",
        content:
          "Meet TY Dev — an independent software & AI agency engineering scalable platforms for modern businesses.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow="// 01 — ABOUT"
        crumb={t.nav.about}
        title={lang === "fr" ? "Une agence indépendante," : "An independent agency,"}
        accent={lang === "fr" ? "obsédée par l'exécution." : "obsessed with execution."}
        subtitle={
          lang === "fr"
            ? "Nous concevons des systèmes logiciels et IA sur mesure pour les entreprises ambitieuses — de l'architecture au déploiement."
            : "We design custom software and AI systems for ambitious businesses — from architecture to deployment."
        }
      />
      <About />
      <Team />
      <TechStack />
      <Testimonials />
      <CtaStrip />
    </>
  );
}
