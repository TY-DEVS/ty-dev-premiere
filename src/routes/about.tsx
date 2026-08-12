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
      { title: "À Propos — TY Dev | Agence Indépendante d'Ingénierie Logicielle" },
      {
        name: "description",
        content:
          "Rencontrez l'équipe TY Dev — agence indépendante spécialisée dans la création de systèmes logiciels robustes et d'applications IA pour entreprises ambitieuses.",
      },
      { name: "keywords", content: "à propos ty dev, équipe agence web, ingénieurs saas, experts ia, devops france" },
      { property: "og:title", content: "À Propos — TY Dev | Agence Indépendante d'Ingénierie Logicielle" },
      {
        property: "og:description",
        content:
          "Rencontrez l'équipe TY Dev — agence indépendante spécialisée dans la création de systèmes logiciels et d'IA.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ty-dev.site/about" },
      { property: "og:image", content: "https://ty-dev.site/logo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://ty-dev.site/logo.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://ty-dev.site/about" }],
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
