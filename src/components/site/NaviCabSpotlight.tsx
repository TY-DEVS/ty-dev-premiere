import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Globe } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Section, SectionHeader } from "./Services";

export function NaviCabSpotlight() {
  const { t } = useI18n();

  return (
    <Section id="spotlight" className="relative py-16 md:py-24 overflow-hidden scroll-mt-28">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      {/* Section Header above the card */}
      <SectionHeader
        eyebrow={t.spotlight.sectionEyebrow}
        title={t.spotlight.sectionTitle}
        subtitle={t.spotlight.sectionSubtitle}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative mt-12 md:mt-16 overflow-hidden rounded-3xl md:rounded-[36px] bg-gradient-to-br from-[oklch(0.085_0.025_260)] via-[oklch(0.065_0.02_260)] to-[oklch(0.05_0.015_260)] border border-border/70 shadow-[0_20px_80px_-20px_oklch(0.6_0.22_265/0.2)] transition-all duration-500 hover:border-brand/40"
      >
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(var(--foreground)_1px,transparent_1px)] [background-size:16px_16px]"
          aria-hidden
        />
        {/* Subtle interior glow */}
        <div
          className="absolute -top-32 -right-32 w-80 h-80 bg-brand/10 rounded-full blur-[90px] pointer-events-none"
          aria-hidden
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-10 md:p-12 lg:p-14">
          {/* Left: Pure & direct narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{t.spotlight.badgeStatus}</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                {t.spotlight.title}
              </h3>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground/90 leading-relaxed max-w-xl">
              {t.spotlight.description}
            </p>

            {/* Action buttons: Prominent case study CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/projets/navicab"
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-brand text-primary-foreground font-semibold shadow-[0_10px_35px_-10px_oklch(0.6_0.22_265/0.4)] hover:bg-brand/90 hover:shadow-[0_15px_45px_-10px_oklch(0.6_0.22_265/0.6)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>{t.spotlight.caseStudyBtn}</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <a
                href="https://navicab.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-surface/80 border border-border/70 text-foreground text-sm font-medium hover:border-brand/40 hover:bg-surface transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>{t.spotlight.visitBtn}</span>
                <ArrowUpRight size={16} className="text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Right: Clean browser mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-border/80 bg-surface/90 shadow-2xl group transition-all duration-500 hover:border-brand/40 hover:shadow-[0_20px_60px_-20px_oklch(0.6_0.22_265/0.3)]"
            >
              {/* Browser window top bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[oklch(0.06_0.02_260)] border-b border-border/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-surface/80 border border-border/50 text-[11px] font-mono text-muted-foreground/80">
                  <Globe size={11} className="text-brand" />
                  <span>navicab.fr</span>
                </div>
                <div className="w-8" />
              </div>

              {/* Preview image */}
              <Link
                to="/projets/navicab"
                className="block relative overflow-hidden bg-surface select-none group"
              >
                <img
                  src="/portfolio/navicab-hero.webp"
                  alt="NaviCab - Plateforme SaaS de Dispatch Taxi"
                  className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand text-primary-foreground text-xs font-semibold shadow-xl">
                    Voir l'étude de cas complète <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
