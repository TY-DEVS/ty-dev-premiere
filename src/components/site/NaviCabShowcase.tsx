import { motion } from "framer-motion";
import { ArrowUpRight, Layers, Radio, CreditCard, ShieldCheck, CheckCircle2, MapPin, ExternalLink } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { Section } from "./Services";

export function NaviCabShowcase() {
  const { t, lang } = useI18n();
  const data = (t as any).navicabShowcase;
  if (!data) return null;

  const icons = [Layers, Radio, CreditCard, ShieldCheck];

  return (
    <Section id="navicab-case-study" className="relative overflow-hidden !py-16 md:!py-24">
      {/* Background Ambience Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-amber-500/10 via-brand/5 to-transparent rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10">
        {/* Main Showcase Container */}
        <div className="relative rounded-[32px] md:rounded-[40px] border border-amber-500/20 bg-gradient-to-b from-[oklch(0.09_0.03_260)] via-[oklch(0.06_0.02_260)] to-[oklch(0.04_0.015_260)] p-6 sm:p-8 md:p-12 lg:p-14 shadow-[0_30px_100px_-30px_oklch(0.6_0.22_265/0.2)] overflow-hidden">
          
          {/* Subtle Top Gradient Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

          {/* Header Row: Eyebrow + Live Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400/90 font-semibold">
                {data.eyebrow}
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>{data.badge}</span>
            </div>
          </div>

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Information & Architecture */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-4">
                  {data.title}
                </h2>
                
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                  {data.subtitle}
                </p>

                {/* 4 Core Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {data.features.map((feat: any, idx: number) => {
                    const Icon = icons[idx] || CheckCircle2;
                    return (
                      <div
                        key={idx}
                        className="p-4 sm:p-5 rounded-2xl bg-surface/40 border border-border/60 backdrop-blur-md transition-all duration-300 hover:border-amber-500/40 hover:bg-surface/70 group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-amber-500/20 transition-all">
                            <Icon size={18} />
                          </div>
                          <h4 className="font-display font-semibold text-foreground text-sm sm:text-base leading-snug">
                            {feat.title}
                          </h4>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground/85 leading-relaxed pl-12">
                          {feat.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  {data.techTags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono bg-white/[0.03] border border-white/10 text-muted-foreground/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Link Button */}
              <div className="pt-2">
                <a
                  href="https://navicab.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-display font-bold text-sm sm:text-base shadow-[0_15px_35px_-10px_rgba(245,158,11,0.4)] hover:shadow-[0_20px_45px_-10px_rgba(245,158,11,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span>{data.liveSite}</span>
                  <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>

            {/* Right Column: Visual Mockup Showcase */}
            <div className="lg:col-span-5">
              <a
                href="https://navicab.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative rounded-2xl md:rounded-3xl overflow-hidden border border-border/60 bg-[oklch(0.04_0.015_260)] shadow-2xl transition-all duration-500 hover:border-amber-500/50 hover:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.25)]"
              >
                {/* Visual Preview */}
                <div className="relative aspect-[16/10] sm:aspect-video lg:aspect-[4/3] w-full overflow-hidden bg-surface/80">
                  <img
                    src="/portfolio/navicab.fr_.webp"
                    alt="NaviCab Platform Showcase"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.04_0.015_260)] via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Action Badge */}
                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface/90 border border-white/20 text-foreground text-xs font-mono backdrop-blur-md transition-all duration-300 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-500">
                    <span>navicab.fr</span>
                    <ExternalLink size={14} />
                  </div>
                </div>

                {/* Bottom Bar Highlight */}
                <div className="p-4 sm:p-5 bg-surface/40 border-t border-border/40 backdrop-blur-md flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-amber-400" />
                    <span className="font-mono text-[11px] sm:text-xs text-foreground/90 font-medium">Île-de-France & Aéroports Paris</span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] text-amber-400/90 font-semibold tracking-wider uppercase">
                    Homologué LeTaxi
                  </span>
                </div>
              </a>
            </div>

          </div>
        </div>
      </div>
    </Section>
  );
}
