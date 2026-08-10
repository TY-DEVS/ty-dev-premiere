import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Portfolio } from "@/components/site/Portfolio";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Testimonials } from "@/components/site/Testimonials";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — TY Dev | Réalisations Web Tunisie, Djerba, Tunis" },
      {
        name: "description",
        content:
          "Découvrez nos réalisations web en Tunisie : sites vitrine, e-commerce, applications SaaS. Projets livrés pour clients à Djerba, Tunis et internationaux. Agence web tunisienne.",
      },
      {
        name: "keywords",
        content: "portfolio web tunisie, réalisations sites web djerba, projets web tunis, exemples sites internet tunisie, agence web portfolio tunisie",
      },
      { property: "og:title", content: "Portfolio TY Dev — Projets Web Tunisie" },
      {
        property: "og:description",
        content:
          "Nos réalisations web pour clients en Tunisie et à l'international. Sites professionnels, e-commerce et applications.",
      },
      { property: "og:url", content: "https://ty-dev.tech/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
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
