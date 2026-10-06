import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Layers, ShieldCheck, Globe, ExternalLink } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { Section } from "./Services";

const pillarIcons = [Zap, Layers, ShieldCheck];

export function NaviCabSpotlight() {
  const { t } = useI18n();

  return (
    <Section id="spotlight" className="relative py-16 md:py-24 overflow-hidden scroll-mt-28">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-brand/5 rounded-full blur-[160px] pointer-events-none"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl md:rounded-[36px] bg-gradient-to-br from-[oklch(0.085_0.025_260)] via-[oklch(0.065_0.02_260)] to-[oklch(0.05_0.015_260)] border border-border/70 shadow-[0_25px_90px_-20px_oklch(0.6_0.22_265/0.2)] transition-all duration-500 hover:border-brand/40"
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(var(--foreground)_1px,transparent_1px)] [background-size:16px_16px]"
          aria-hidden
        />

        <div className="relative z-10 p-8 sm:p-10 md:p-12 lg:p-14 space-y-10">
          {/* Header Row: Badge & Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/50 pb-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/25 text-brand font-mono text-[11px] uppercase tracking-wider font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
                </span>
                {t.spotlight.badge}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] tracking-wide">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t.spotlight.liveStatus}
              </span>
            </div>

            <a
              href="https://navicab.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-brand transition-colors"
            >
              <span>navicab.fr</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Main 2-Column Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Project Narrative & Scale */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-tight">
                  {t.spotlight.title}
                </h3>
                <p className="text-base text-brand/90 mt-2 font-medium">
                  {t.spotlight.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-muted-foreground/85 leading-relaxed">
                {t.spotlight.description}
              </p>

              {/* 3 Pillars: Compact & High Impact */}
              <div className="space-y-3 pt-2">
                {t.spotlight.pillars.map((p, idx) => {
                  const Icon = pillarIcons[idx] || Zap;
                  return (
                    <div
                      key={idx}
                      className="group/p flex items-start gap-3.5 p-3.5 rounded-2xl bg-surface/60 border border-border/50 transition-all hover:bg-surface/90 hover:border-brand/30"
                    >
                      <div className="p-2 rounded-xl bg-brand/10 text-brand shrink-0 group-hover/p:bg-brand group-hover/p:text-primary-foreground transition-colors">
                        <Icon size={16} />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-sm font-semibold text-foreground tracking-tight">
                          {p.title}
                        </div>
                        <p className="text-xs text-muted-foreground/80 leading-relaxed">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <a
                  href="https://navicab.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-brand text-primary-foreground font-semibold shadow-[0_10px_35px_-10px_oklch(0.6_0.22_265/0.4)] hover:bg-brand/90 hover:shadow-[0_15px_45px_-10px_oklch(0.6_0.22_265/0.6)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span>{t.spotlight.cta}</span>
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>

            {/* Right: Authentic & Crisp Hero Section Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-full rounded-2xl overflow-hidden border border-border/80 bg-surface/95 shadow-2xl group transition-all duration-500 hover:border-brand/50 hover:shadow-[0_25px_80px_-20px_oklch(0.6_0.22_265/0.35)]"
              >
                {/* Browser top chrome */}
                <div className="flex items-center justify-between px-4 py-3 bg-[oklch(0.06_0.02_260)] border-b border-border/60">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-surface/90 border border-border/50 text-[11px] font-mono text-muted-foreground/90">
                    <Globe size={11} className="text-brand" />
                    <span className="text-foreground/80 font-medium">https://navicab.fr</span>
                  </div>
                  <div className="w-8" />
                </div>

                {/* Crystal clear Hero Screenshot */}
                <a
                  href="https://navicab.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative overflow-hidden bg-surface select-none group"
                >
                  <img
                    src="/portfolio/navicab-hero.webp"
                    alt="NaviCab Hero Section - Plateforme SaaS Officielle"
                    className="w-full h-auto object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Subtle hover overlay only on mouse hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand text-primary-foreground text-xs font-semibold shadow-2xl">
                      Ouvrir navicab.fr en direct <ArrowUpRight size={14} />
                    </span>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
