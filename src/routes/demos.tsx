import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Demos } from "@/components/site/Demos";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Testimonials } from "@/components/site/Testimonials";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/demos")({
  head: () => ({
    meta: [
      { title: "Démos & Maquettes Interactives — TY Dev" },
      {
        name: "description",
        content:
          "Explore interactive live demos and website templates crafted by TY Dev — ready to customize for your business.",
      },
      { property: "og:title", content: "Démos & Maquettes Interactives — TY Dev" },
      {
        property: "og:description",
        content:
          "Explore interactive live demos and website templates crafted by TY Dev — ready to customize for your business.",
      },
    ],
    links: [{ rel: "canonical", href: "/demos" }],
  }),
  component: DemosPage,
});

function DemosPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow="// 04 — DEMOS & TEMPLATES"
        crumb={(t.nav as any).demos || "Démos"}
        title={lang === "fr" ? "Démos interactives," : "Interactive live demos,"}
        accent={lang === "fr" ? "prêtes à personnaliser." : "ready to customize."}
        subtitle={
          lang === "fr"
            ? "Explorez nos exemples de sites et plateformes conçus pour booster votre activité en quelques jours."
            : "Explore live demo platforms and templates crafted to elevate your business in days."
        }
      />
      <Demos isPage={true} />
      <Testimonials />
      <CtaStrip />
    </>
  );
}
