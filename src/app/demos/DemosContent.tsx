'use client';

import { PageHeader } from "@/components/site/PageHeader";
import { Demos } from "@/components/site/Demos";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Testimonials } from "@/components/site/Testimonials";
import { useI18n } from "@/i18n/context";

export function DemosContent() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow="// 04 — DEMOS & TEMPLATES"
        crumb={(t.nav as Record<string, string>).demos || "Démos"}
        title={lang === "fr" ? "Démos interactives," : "Interactive demos,"}
        accent={lang === "fr" ? "prêtes à personnaliser." : "ready to customize."}
        subtitle={
          lang === "fr"
            ? "Explorez nos exemples de sites et plateformes conçus pour booster votre activité en quelques jours."
            : "Explore demo platforms and templates crafted to elevate your business in days."
        }
      />
      <Demos isPage={true} />
      <Testimonials />
      <CtaStrip />
    </>
  );
}
