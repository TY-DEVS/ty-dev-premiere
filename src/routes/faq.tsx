import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Faq } from "@/components/site/Faq";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Testimonials } from "@/components/site/Testimonials";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Foire Aux Questions & Réponses — TY Dev | Agence Web & SaaS" },
      {
        name: "description",
        content:
          "Toutes les réponses à vos questions sur nos services de développement SaaS, applications web, tarifs, délais, optimisation SEO et automatisation IA par TY Dev.",
      },
      {
        name: "keywords",
        content:
          "FAQ ty dev, questions frequentes saas, tarif devis web, delai developpement, seo google, automatisation ia, agence logicielle",
      },
      { property: "og:title", content: "Foire Aux Questions & Réponses — TY Dev | Agence Web & SaaS" },
      {
        property: "og:description",
        content:
          "Toutes les réponses à vos questions sur nos services de développement SaaS, applications web, tarifs, délais, optimisation SEO et automatisation IA par TY Dev.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ty-dev.site/faq" },
      { property: "og:image", content: "https://ty-dev.site/logo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://ty-dev.site/logo.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://ty-dev.site/faq" }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow="// 05 — FOIRE AUX QUESTIONS"
        crumb={(t.nav as any).faq || "FAQ"}
        title={lang === "fr" ? "Questions fréquentes &" : "Frequently asked questions &"}
        accent={lang === "fr" ? "réponses d'experts." : "expert answers."}
        subtitle={
          lang === "fr"
            ? "Retrouvez ici toutes les informations clés sur nos offres, nos méthodes d'ingénierie et nos engagements."
            : "Find key answers about our software engineering methodology, pricing, and services."
        }
      />
      <Faq isPage={true} />
      <Testimonials />
      <CtaStrip />
    </>
  );
}
