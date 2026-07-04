import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { TechStack } from "@/components/site/TechStack";
import { CtaStrip } from "@/components/site/CtaStrip";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services Web & IA — TY Dev Tunisie | Djerba, Tunis" },
      {
        name: "description",
        content:
          "Services de développement web en Tunisie : création sites internet, applications web, e-commerce, automatisation IA. Agence digitale à Djerba, Tunis. Devis gratuit.",
      },
      {
        name: "keywords",
        content: "services web tunisie, création site internet djerba, développement web tunis, agence digitale tunisie, e-commerce tunisie, application web tunisie, automatisation ia tunisie",
      },
      { property: "og:title", content: "Services Développement Web — TY Dev Tunisie" },
      {
        property: "og:description",
        content:
          "Solutions web complètes en Tunisie : sites vitrine, e-commerce, applications SaaS et automatisation IA. Contact: +216 52 949 272",
      },
      { property: "og:url", content: "https://ty-dev.tech/services" },
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
      <CtaStrip />
    </>
  );
}
