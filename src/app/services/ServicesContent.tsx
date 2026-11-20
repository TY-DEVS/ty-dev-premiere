'use client';

import { PageHeader } from "@/components/site/PageHeader";
import { Services } from "@/components/site/Services";
import { Process } from "@/components/site/Process";
import { TechStack } from "@/components/site/TechStack";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Testimonials } from "@/components/site/Testimonials";
import { useI18n } from "@/i18n/context";

export function ServicesContent() {
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
            ? "Du MVP express à l'infrastructure d'entreprise distribuée : nous concevons des plateformes robustes prêtes à scaler."
            : "From rapid MVP to enterprise-scale distributed systems: we engineer solid platforms built to scale."
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
