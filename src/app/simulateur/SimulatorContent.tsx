'use client';

import { PageHeader } from "@/components/site/PageHeader";
import { Simulator } from "@/components/site/Simulator";
import { Section } from "@/components/site/Services";
import { CtaStrip } from "@/components/site/CtaStrip";
import { useI18n } from "@/i18n/context";

export function SimulatorContent() {
  const { lang } = useI18n();

  return (
    <>
      <PageHeader
        eyebrow="// 08 — SIMULATEUR DE DEVIS"
        crumb={lang === "fr" ? "Simulateur" : "Simulator"}
        title={lang === "fr" ? "Estimez le budget de votre" : "Calculate your"}
        accent={lang === "fr" ? "projet en 2 minutes." : "project estimate in 2 min."}
        subtitle={
          lang === "fr"
            ? "Configurez vos modules techniques, découvrez une fourchette budgétaire transparente et recevez un cadrage complet sous 24h."
            : "Select your architectural modules, explore transparent pricing tiers and receive technical scoping under 24h."
        }
      />

      <Section id="simulator-section" className="py-16 md:py-24">
        <Simulator />
      </Section>

      <CtaStrip />
    </>
  );
}
