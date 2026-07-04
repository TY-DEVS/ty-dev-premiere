import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Contact } from "@/components/site/Contact";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TY Dev Tunisie | Devis Gratuit Djerba, Tunis" },
      {
        name: "description",
        content:
          "Contactez TY Dev pour votre projet web en Tunisie. Devis gratuit sous 24h. Agence à Djerba, Tunis. Tél: +216 52 949 272 | Email: contact@ty-dev.tech",
      },
      {
        name: "keywords",
        content: "contact agence web tunisie, devis site internet djerba, contact développeur web tunis, agence digitale tunisie contact",
      },
      { property: "og:title", content: "Contact TY Dev — Agence Web Tunisie" },
      {
        property: "og:description",
        content:
          "Démarrez votre projet web avec TY Dev. Réponse sous 24h. WhatsApp: +216 52 949 272",
      },
      { property: "og:url", content: "https://ty-dev.tech/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow="// 04 — CONTACT"
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
    </>
  );
}
