'use client';

import { PageHeader } from "@/components/site/PageHeader";
import { Contact } from "@/components/site/Contact";
import { Testimonials } from "@/components/site/Testimonials";
import { useI18n } from "@/i18n/context";

export function ContactContent() {
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
