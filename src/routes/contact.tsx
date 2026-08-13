import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Contact } from "@/components/site/Contact";
import { Testimonials } from "@/components/site/Testimonials";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contactez-nous — TY Dev | Devis & Consultation Projet" },
      {
        name: "description",
        content:
          "Lancez votre projet web, SaaS ou IA avec TY Dev. Écrivez-nous à contact@ty-dev.site — réponse et analyse sous 24 heures.",
      },
      { name: "keywords", content: "contact ty dev, devis projet web, devis saas, devis ia, contact@ty-dev.site" },
      { property: "og:title", content: "Contactez-nous — TY Dev | Devis & Consultation Projet" },
      {
        property: "og:description",
        content:
          "Lancez votre projet web, SaaS ou IA avec TY Dev. Contactez notre équipe d'ingénieurs sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ty-dev.site/contact" },
      { property: "og:image", content: "https://ty-dev.site/logo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://ty-dev.site/logo.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://ty-dev.site/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow="// 07 — CONTACT"
        crumb={t.nav.contact}
        title={lang === "fr" ? "Parlons de votre" : "Let's talk about your"}
        accent={lang === "fr" ? "prochain projet." : "next project."}
        subtitle={
          lang === "fr"
            ? "Décrivez votre vision — nous revenons vers vous sous 24 heures avec une première analyse."
            : "Tell us about your vision — we'll come back within 24 hours with an initial analysis."
        }
      />
      <Contact />
      <Testimonials />
    </>
  );
}
