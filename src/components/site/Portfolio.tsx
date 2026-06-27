import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { Section, SectionHeader } from "./Services";

export function Portfolio() {
  const { t } = useI18n();
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? t.portfolio.items : t.portfolio.items.slice(0, 4);

  return (
    <Section id="portfolio">
      <SectionHeader title={t.portfolio.title} subtitle={t.portfolio.subtitle} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
        {displayedItems.map((p, i) => (
          <motion.a
            key={p.url}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl md:rounded-[32px] bg-gradient-to-br from-[oklch(0.08_0.025_260)] to-[oklch(0.05_0.015_260)] border border-border/50 transition-all duration-700 hover:border-brand/40 hover:shadow-[0_20px_80px_-20px_oklch(0.6_0.22_265/0.3)]"
          >
            {/* Ambient Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_0%,oklch(0.6_0.22_265/0.15),transparent_70%)] pointer-events-none z-0" />

            {/* Top Media Area (Only if image exists) */}
            {(p as any).image && (
              <div className="relative aspect-video sm:aspect-[16/10] w-full overflow-hidden border-b border-border/50 bg-surface/50 shrink-0 z-10 group">
                <img
                  src={(p as any).image}
                  alt={p.title}
                  className="w-full h-full object-cover object-top opacity-90 transition-opacity duration-1000 group-hover:opacity-100 select-none pointer-events-none"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 shadow-[inset_0_0_30px_oklch(0_0_0/0.4)] pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.05_0.015_260)] via-transparent to-transparent opacity-80" />
              </div>
            )}

            {/* Bottom Content Area */}
            <div className={`relative flex flex-col justify-between flex-grow p-6 sm:p-8 md:p-10 z-10 ${!(p as any).image ? 'min-h-[380px] md:min-h-[420px]' : ''}`}>
              
              {/* Typography Monogram (Only if NO image) */}
              {!(p as any).image && (
                <div className="pointer-events-none absolute -right-6 -bottom-12 md:-right-8 md:-bottom-16 select-none font-display text-[180px] md:text-[240px] font-bold leading-none tracking-tighter text-foreground/[0.03] transition-colors duration-700 group-hover:text-brand/[0.05] z-0">
                  {p.title.substring(0, 2).toUpperCase()}
                </div>
              )}

              {/* Top Content: Badges */}
              <div className="relative flex flex-wrap items-center gap-2 sm:gap-3 z-10">
                <span className="inline-flex px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand font-mono text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold backdrop-blur-sm">
                  {p.service}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground/60 border border-border/50 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 backdrop-blur-sm">
                  {p.category}
                </span>
              </div>

              {/* Bottom Content: Title & Desc */}
              <div className="relative mt-auto pt-16 md:pt-20 z-10">
                <h3 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 sm:mb-5 transition-colors group-hover:text-brand flex items-start sm:items-center justify-between gap-4 leading-tight">
                  {p.title}
                  <span className="flex shrink-0 h-10 w-10 sm:h-12 sm:w-12 mt-1 sm:mt-0 items-center justify-center rounded-full bg-surface/50 border border-border/80 text-foreground backdrop-blur-md transition-all duration-500 group-hover:bg-brand group-hover:text-primary-foreground group-hover:border-brand group-hover:rotate-45">
                    <ArrowUpRight size={20} className="sm:hidden" />
                    <ArrowUpRight size={22} className="hidden sm:block" />
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed max-w-md">
                  {p.desc}
                </p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
      
      {!showAll && t.portfolio.items.length > 4 && (
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setShowAll(true)}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-surface/40 border border-border/80 text-foreground font-semibold shadow-[0_10px_30px_-10px_oklch(0.6_0.22_265/0.2)] hover:bg-brand hover:border-brand hover:text-white hover:shadow-[0_15px_40px_-10px_oklch(0.6_0.22_265/0.4)] transition-all duration-300 hover:-translate-y-1"
          >
            {(t.portfolio as any).viewAll || "Voir tous les projets"}
            <ArrowDown size={18} className="transition-transform duration-300 group-hover:translate-y-1" />
          </button>
        </div>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm text-muted-foreground mt-10 font-mono"
      >
        {t.portfolio.more}
      </motion.p>
    </Section>
  );
}
