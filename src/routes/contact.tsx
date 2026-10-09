import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Contact } from "@/components/site/Contact";
import { Testimonials } from "@/components/site/Testimonials";
import { useI18n } from "@/i18n/context";

const contactFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Sous quel délai TY Dev répond-il à une demande de devis ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Toute demande transmise via notre formulaire ou WhatsApp direct fait l'objet d'un retour et d'une analyse de faisabilité technique sous 24 heures ouvrées, accompagnée d'une première estimation budgétaire transparente.",
      },
    },
    {
      "@type": "Question",
      name: "Mon projet et mes idées sont-ils protégés par un accord de confidentialité (NDA) ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Nous signons systématiquement un accord de confidentialité bilatéral (NDA) avant tout partage de code source, de logique métier ou de cahier des charges sensible afin de protéger intégralement votre propriété intellectuelle.",
      },
    },
    {
      "@type": "Question",
      name: "Quel est le modèle de tarification de l'agence TY Dev ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nous fonctionnons principalement au forfait fixe et garanti avec calendrier de livrables validé en amont. Pour les projets évolutifs ou les plateformes complexes, nous proposons des forfaits au sprint ou une régie d'ingénieurs dédiée.",
      },
    },
    {
      "@type": "Question",
      name: "Proposez-vous un accompagnement et une maintenance après la mise en ligne ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolument. Chaque projet livré bénéficie d'une garantie de conformité de 30 jours offerte, ainsi que de contrats d'infogérance Cloud, maintenance préventive et évolutive 24/7 selon vos besoins opérationnels.",
      },
    },
  ],
};

const contactBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://ty-dev.site/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Contact & Devis",
      item: "https://ty-dev.site/contact",
    },
  ],
};

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Demander un Devis & Consultation Gratuite sous 24h — TY Dev" },
      {
        name: "description",
        content:
          "Parlez de votre projet SaaS, web ou IA avec l'équipe d'ingénieurs TY Dev. Analyse de faisabilité et estimation budgétaire gratuites sous 24h. Contactez contact@ty-dev.site.",
      },
      { name: "keywords", content: "contact ty dev, devis saas gratuit, devis developpement web, devis agence ia, contact@ty-dev.site, ty-dev.fr, ty-dev.tech" },
      { property: "og:title", content: "Demander un Devis & Consultation Gratuite sous 24h — TY Dev" },
      {
        property: "og:description",
        content:
          "Parlez de votre projet SaaS, web ou IA avec l'équipe d'ingénieurs TY Dev. Analyse de faisabilité et estimation budgétaire gratuites sous 24h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ty-dev.site/contact" },
      { property: "og:image", content: "https://ty-dev.site/logo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Demander un Devis & Consultation Gratuite sous 24h — TY Dev" },
      {
        name: "twitter:description",
        content:
          "Parlez de votre projet SaaS, web ou IA avec l'équipe d'ingénieurs TY Dev. Analyse de faisabilité et estimation budgétaire gratuites sous 24h.",
      },
      { name: "twitter:image", content: "https://ty-dev.site/logo.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://ty-dev.site/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(contactFaqSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(contactBreadcrumbSchema),
      },
    ],
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
