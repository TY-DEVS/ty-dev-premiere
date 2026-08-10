import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, ArrowDown, MonitorPlay } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Section, SectionHeader } from "./Services";

export function Demos({ isPage = false }: { isPage?: boolean }) {
  const { t, lang } = useI18n();
  const [showAll, setShowAll] = useState(false);

  const demosData = (t as any).demos || {
    title: "Démos & Maquettes Interactives",
    subtitle: "Explorez nos exemples de sites et applications prêts à être personnalisés.",
    viewDemo: "Tester la Démo",
    viewAll: "Voir toutes les démos",
    items: [],
  };

  const limit = isPage ? 6 : 4;
  const displayedItems = showAll ? demosData.items : demosData.items.slice(0, limit);

  // SEO JSON-LD Structured Data for Demos
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Démos & Maquettes Interactives TY Dev",
    "description": "Catalogue de démonstrations interactives et templates SaaS développés par TY Dev.",
    "itemListElement": demosData.items.map((item: any, idx: number) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "SoftwareApplication",
        "name": item.title,
        "applicationCategory": item.category,
        "operatingSystem": "Web Browser",
        "url": item.url,
        "description": item.desc,
        "image": `https://ty-dev.site${item.image}`,
      },
    })),
  };

  return (
    <Section id="demos">
      {/* Inject SEO JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <SectionHeader title={demosData.title} subtitle={demosData.subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <AnimatePresence>
          {displayedItems.map((p: any, i: number) => (
            <motion.article
              key={p.url + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className="h-full"
            >
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} — ${p.service} (${p.category})`}
                title={`${p.title} — Tester la démo en direct sur demo.ty-dev.site`}
                className="group relative flex flex-col h-full overflow-hidden rounded-3xl md:rounded-[32px] bg-gradient-to-br from-[oklch(0.09_0.03_250)] to-[oklch(0.06_0.02_250)] border border-cyan-500/20 transition-all duration-700 hover:border-cyan-400/60 hover:shadow-[0_20px_80px_-20px_oklch(0.75_0.18_200/0.3)] backdrop-blur-md"
              >
                {/* Internal Cyan Ambient Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_0%,oklch(0.75_0.18_200/0.2),transparent_70%)] pointer-events-none z-0" />

                {/* Media Thumbnail Preview */}
                {p.image && (
                  <div className="relative aspect-video sm:aspect-[16/10] w-full overflow-hidden border-b border-cyan-500/20 bg-surface/50 shrink-0 z-10 group">
                    <img
                      src={p.image}
                      alt={`Démo interactive ${p.title} - ${p.category} développée par TY Dev`}
                      className="w-full h-full object-cover object-top opacity-90 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-100 select-none pointer-events-none"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 shadow-[inset_0_0_30px_oklch(0_0_0/0.5)] pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0.02_250)] via-transparent to-transparent opacity-85" />
                  </div>
                )}

                {/* Content Area */}
                <div className="relative flex flex-col justify-between flex-grow p-6 sm:p-8 z-10">
                  <div className="relative z-10">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300 border border-cyan-500/30 bg-cyan-500/10 rounded-full px-3.5 py-1 backdrop-blur-sm font-semibold">
                        {p.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-semibold text-2xl sm:text-3xl text-foreground mb-3 transition-colors group-hover:text-cyan-300 flex items-center justify-between gap-3 leading-tight">
                      <span>{p.title}</span>
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground/80 leading-relaxed mb-6">
                      {p.desc}
                    </p>
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-4 border-t border-border/40 flex items-center justify-between mt-auto relative z-10">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-medium">
                      <MonitorPlay className="w-4 h-4 text-cyan-400" />
                      <span>demo.ty-dev.site</span>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-semibold text-xs transition-all duration-300 group-hover:scale-105 shadow-sm">
                      <span>{demosData.viewDemo || "Tester la Démo"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {!showAll && demosData.items.length > limit && (
        <div className="mt-16 flex justify-center">
          {isPage ? (
            <button
              onClick={() => setShowAll(true)}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-surface/40 border border-border/80 text-foreground font-semibold shadow-[0_10px_30px_-10px_oklch(0.6_0.22_265/0.2)] hover:bg-cyan-500 hover:border-cyan-400 hover:text-slate-950 hover:shadow-[0_15px_40px_-10px_oklch(0.75_0.18_200/0.4)] transition-all duration-300 hover:-translate-y-1"
            >
              {demosData.viewAll || "Voir toutes les démos"}
              <ArrowDown size={18} className="transition-transform duration-300 group-hover:translate-y-1" />
            </button>
          ) : (
            <Link
              to="/demos"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-surface/40 border border-border/80 text-foreground font-semibold shadow-[0_10px_30px_-10px_oklch(0.6_0.22_265/0.2)] hover:bg-cyan-500 hover:border-cyan-400 hover:text-slate-950 hover:shadow-[0_15px_40px_-10px_oklch(0.75_0.18_200/0.4)] transition-all duration-300 hover:-translate-y-1"
            >
              {demosData.viewAll || "Voir toutes les démos"}
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      )}
    </Section>
  );
}
