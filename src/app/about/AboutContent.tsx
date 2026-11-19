'use client';

import { useEffect } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { About } from "@/components/site/About";
import { TechStack } from "@/components/site/TechStack";
import { CtaStrip } from "@/components/site/CtaStrip";
import { useI18n } from "@/i18n/context";
import { Team } from "@/components/site/Team";
import { Testimonials } from "@/components/site/Testimonials";

export function AboutContent() {
  const { t, lang } = useI18n();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#team") {
      setTimeout(() => {
        const teamEl = document.getElementById("team");
        if (teamEl) {
          teamEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="// 01 — ABOUT"
        crumb={t.nav.about}
        title={lang === "fr" ? "Une agence indépendante," : "An independent agency,"}
        accent={lang === "fr" ? "obsédée par l'exécution." : "obsessed with execution."}
        subtitle={
          lang === "fr"
            ? "Nous concevons des systèmes logiciels et IA sur mesure pour les entreprises ambitieuses — de l'architecture au déploiement."
            : "We design custom software and AI systems for ambitious businesses — from architecture to deployment."
        }
      />
      <About />
      <Team />
      <TechStack />
      <Testimonials />
      <CtaStrip />
    </>
  );
}
