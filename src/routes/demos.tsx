import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Demos } from "@/components/site/Demos";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Testimonials } from "@/components/site/Testimonials";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/demos")({
  head: () => ({
    meta: [
      { title: "Démos & Maquettes Interactives — TY Dev | Agence Web & SaaS" },
      {
        name: "description",
        content:
          "Découvrez 39 démos interactives et maquettes de sites vitrines, plateformes SaaS, réservations en ligne et e-commerce développées sur-mesure par TY Dev.",
      },
      {
        name: "keywords",
        content:
          "démos interactives, maquettes web, templates SaaS, site vitrine sur-mesure, location voiture, detailing auto, conciergerie VIP, agence web TY Dev",
      },
      { property: "og:title", content: "Démos & Maquettes Interactives — TY Dev | Agence Web & SaaS" },
      {
        property: "og:description",
        content:
          "Découvrez 39 démos interactives et maquettes de sites vitrines, plateformes SaaS, réservations en ligne et e-commerce développées sur-mesure par TY Dev.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/demos" },
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
