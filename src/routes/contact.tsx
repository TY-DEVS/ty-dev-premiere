import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Contact } from "@/components/site/Contact";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TY Dev" },
      {
        name: "description",
        content:
          "Start a project with TY Dev. Reach us at contact@ty-dev.fr — replies within 24 hours.",
      },
      { property: "og:title", content: "Contact — TY Dev" },
      {
        property: "og:description",
        content:
          "Start a project with TY Dev. Reach us at contact@ty-dev.fr — replies within 24 hours.",
      },
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
