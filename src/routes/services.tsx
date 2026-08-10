import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { TechStack } from "@/components/site/TechStack";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Testimonials } from "@/components/site/Testimonials";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — TY Dev" },
      {
        name: "description",
        content:
          "Custom SaaS, AI automation, web applications, e-commerce, integrations, and cloud infrastructure — end-to-end engineering by TY Dev.",
      },
      { property: "og:title", content: "Services — TY Dev" },
      {
        property: "og:description",
        content:
          "Custom SaaS, AI automation, web applications, e-commerce, integrations, and cloud infrastructure — end-to-end engineering by TY Dev.",
      },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow="// 02 — SERVICES"
        crumb={t.nav.services}
        title={lang === "fr" ? "Des solutions taillées pour" : "Engineering crafted for"}
        accent={lang === "fr" ? "la performance." : "real impact."}
        subtitle={
          lang === "fr"
            ? "De l'architecture cloud à l'IA appliquée, chaque service est conçu pour générer un retour mesurable."
            : "From cloud architecture to applied AI, every service is built to deliver measurable returns."
        }
      />
      <Services />
      <Process />
      <TechStack />
      <Testimonials />
      <CtaStrip />
    </>
  );
}
