import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Portfolio } from "@/components/site/Portfolio";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Testimonials } from "@/components/site/Testimonials";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio & Projets — TY Dev | Réalisations Clients" },
      {
        name: "description",
        content:
          "Découvrez une sélection de projets livrés par TY Dev — sites d'exception, plateformes SaaS et applications propulsées par l'intelligence artificielle.",
      },
      { name: "keywords", content: "portfolio web, projets saas, études de cas ia, réalisations agence web, ty dev" },
      { property: "og:title", content: "Portfolio & Projets — TY Dev | Réalisations Clients" },
      {
        property: "og:description",
        content:
          "Découvrez une sélection de projets livrés par TY Dev — sites d'exception, plateformes SaaS et applications IA.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ty-dev.site/portfolio" },
      { property: "og:image", content: "https://ty-dev.site/logo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://ty-dev.site/logo.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://ty-dev.site/portfolio" }],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow="// 03 — SELECTED WORK"
        crumb={t.nav.portfolio}
        title={lang === "fr" ? "Des projets réels," : "Real projects,"}
        accent={lang === "fr" ? "des résultats mesurables." : "measurable outcomes."}
        subtitle={
          lang === "fr"
            ? "Un aperçu des plateformes et expériences que nous avons livrées pour nos clients."
            : "A look at the platforms and experiences we've shipped for our clients."
        }
      />
      <Portfolio isPage={true} />
      <Testimonials />
      <CtaStrip />
    </>
  );
}
