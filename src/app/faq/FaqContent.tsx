'use client';

import { PageHeader } from "@/components/site/PageHeader";
import { Faq } from "@/components/site/Faq";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Testimonials } from "@/components/site/Testimonials";
import { useI18n } from "@/i18n/context";

export function FaqContent() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow="// 05 — FOIRE AUX QUESTIONS"
        crumb={(t.nav as Record<string, string>).faq || "FAQ"}
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
