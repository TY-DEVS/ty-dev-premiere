import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { About } from "@/components/site/About";
import { TechStack } from "@/components/site/TechStack";
import { CtaStrip } from "@/components/site/CtaStrip";
import { useI18n } from "@/i18n/context";
import { Team } from "@/components/site/Team";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "À Propos — TY Dev | Agence Web Tunisie, Djerba, Tunis" },
      {
        name: "description",
        content:
          "TY Dev, votre agence de développement web et IA en Tunisie. Basés à Djerba, nous accompagnons entreprises tunisiennes dans leur transformation digitale.",
      },
      {
        name: "keywords",
        content: "agence web tunisie, développement web djerba, agence digitale tunis, transformation digitale tunisie, équipe web tunisie",
      },
      { property: "og:title", content: "À Propos de TY Dev — Agence Web Tunisie" },
      {
        property: "og:description",
        content:
          "Agence tunisienne spécialisée en développement web et solutions digitales. Présents à Djerba et Tunis.",
      },
      { property: "og:url", content: "https://ty-dev.tech/about" },
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
      <CtaStrip />
    </>
  );
}
