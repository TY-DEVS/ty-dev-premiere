'use client';

import Link from "next/link";
import { BarChart3, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { Portfolio } from "@/components/site/Portfolio";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Testimonials } from "@/components/site/Testimonials";
import { useI18n } from "@/i18n/context";

export function PortfolioContent() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow="// 03 — SELECTED WORK"
        crumb={t.nav.portfolio}
        title={lang === "fr" ? "Des projets réels," : "Real projects,"}
        accent={lang === "fr" ? "des résultats mesurables." : "measurable outcomes."}
        subtitle={
          lang === "fr"
            ? "Un aperçu des plateformes et expériences que nous avons livrées pour nos clients."
            : "A look at the platforms and experiences we've shipped for our clients."
        }
      />

      {/* Featured Case Study Hero Banner */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 -mt-6 mb-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-brand/15 via-surface/60 to-surface/40 border border-brand/40 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/15 border border-brand/30 text-brand font-mono text-xs uppercase tracking-wider font-semibold">
                <BarChart3 size={13} />
                <span>
                  {lang === "fr"
                    ? "Étude de Cas Phare • ROI & Ingénierie"
                    : "Featured Case Study • ROI & Engineering"}
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                NaviCab — Dispatch Taxi & Plateforme SaaS en Île-de-France
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {lang === "fr"
                  ? "Architecture complète sub-seconde : dispatch radar en direct < 2s, 5 portails synchronisés, télémétrie GPS et facturation automatisée conforme Factur-X."
                  : "Full-stack sub-second architecture: < 2s live radar dispatch, 5 synchronized portals, GPS telemetry, and automated Factur-X compliant billing."}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="px-3 py-1 rounded-xl bg-surface/80 border border-border/70 text-xs font-mono text-brand">
                  &lt; 2s Dispatch
                </span>
                <span className="px-3 py-1 rounded-xl bg-surface/80 border border-border/70 text-xs font-mono text-brand">
                  5 Portails Unifiés
                </span>
                <span className="px-3 py-1 rounded-xl bg-surface/80 border border-border/70 text-xs font-mono text-brand">
                  -45% Gestion Admin
                </span>
              </div>
              <div className="pt-2">
                <Link
                  href="/projets/navicab"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand text-primary-foreground font-semibold text-sm shadow-lg shadow-brand/25 hover:bg-brand/90 hover:-translate-y-0.5 transition-all"
                >
                  <span>
                    {lang === "fr"
                      ? "Consulter l'étude de cas détaillée"
                      : "View Detailed Case Study"}
                  </span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Link
                href="/projets/navicab"
                className="block relative rounded-2xl overflow-hidden border border-border/80 bg-surface/90 shadow-2xl group transition-all duration-300 hover:border-brand/40"
              >
                <img
                  src="/portfolio/navicab-hero.webp"
                  alt="Étude de cas NaviCab"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="px-4 py-2 rounded-xl bg-brand text-primary-foreground font-medium text-xs">
                    {lang === "fr" ? "Explorer NaviCab" : "Explore NaviCab"}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Portfolio isPage={true} />
      <Testimonials />
      <CtaStrip />
    </>
  );
}
