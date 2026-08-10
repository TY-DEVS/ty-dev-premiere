import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Portfolio } from "@/components/site/Portfolio";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Testimonials } from "@/components/site/Testimonials";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — TY Dev" },
      {
        name: "description",
        content:
          "Selected work from TY Dev — premium websites, SaaS platforms, and AI-driven applications shipped for clients worldwide.",
      },
      { property: "og:title", content: "Portfolio — TY Dev" },
      {
        property: "og:description",
        content:
          "Selected work from TY Dev — premium websites, SaaS platforms, and AI-driven applications shipped for clients worldwide.",
      },
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
