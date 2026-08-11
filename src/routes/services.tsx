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
      { title: "Nos Services — TY Dev | Développement SaaS, IA & Cloud" },
      {
        name: "description",
        content:
          "SaaS sur-mesure, automatisations IA, applications web, e-commerce, intégrations d'APIs et infrastructure Cloud — ingénierie de bout en bout par TY Dev.",
      },
      { name: "keywords", content: "services saas, développement ia, intégration api, architecture cloud, react vite, devops" },
      { property: "og:title", content: "Nos Services — TY Dev | Développement SaaS, IA & Cloud" },
      {
        property: "og:description",
        content:
          "SaaS sur-mesure, automatisations IA, applications web, e-commerce, intégrations d'APIs et infrastructure Cloud.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ty-dev.site/services" },
      { property: "og:image", content: "https://ty-dev.site/logo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://ty-dev.site/logo.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://ty-dev.site/services" }],
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
