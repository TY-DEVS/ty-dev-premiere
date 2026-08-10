import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, MonitorPlay } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { Section, SectionHeader } from "./Services";

export function Demos({ isPage = false }: { isPage?: boolean }) {
  const { t } = useI18n();
  const [showAll, setShowAll] = useState(isPage);
  const demosData = (t as any).demos || {
    title: "Démos & Maquettes Interactives",
    subtitle: "Explorez nos exemples de sites et applications prêts à être personnalisés.",
    viewDemo: "Tester la Démo",
    items: [],
  };

  const displayedItems = showAll ? demosData.items : demosData.items.slice(0, 4);

  return (
    <Section id="demos">
      <SectionHeader title={demosData.title} subtitle={demosData.subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
        <AnimatePresence>
          {displayedItems.map((p: any, i: number) => (
            <motion.a
              key={p.url + i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl md:rounded-[32px] bg-gradient-to-br from-[oklch(0.09_0.03_250)] to-[oklch(0.06_0.02_250)] border border-cyan-500/20 transition-all duration-700 hover:border-cyan-400/60 hover:shadow-[0_20px_80px_-20px_oklch(0.75_0.18_200/0.3)] backdrop-blur-md"
            >
              {/* Internal Cyan Ambient Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_50%_0%,oklch(0.75_0.18_200/0.2),transparent_70%)] pointer-events-none z-0" />

              {/* Media Thumbnail Preview */}
              {p.image && (
                <div className="relative aspect-video sm:aspect-[16/10] w-full overflow-hidden border-b border-cyan-500/20 bg-surface/50 shrink-0 z-10 group">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover object-top opacity-90 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-100 select-none pointer-events-none"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_30px_oklch(0_0_0/0.5)] pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0.02_250)] via-transparent to-transparent opacity-85" />

                  {/* Top Live Demo Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] uppercase tracking-widest font-semibold backdrop-blur-md shadow-lg">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                    </span>
                    <span>Live Demo</span>
                  </div>
                </div>
              )}

              {/* Content Area */}
              <div className="relative flex flex-col justify-between flex-grow p-6 sm:p-8 z-10">
                <div className="relative z-10">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] uppercase tracking-widest font-semibold">
                      <Sparkles className="w-3 h-3" />
                      {p.service}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70 border border-border/60 rounded-full px-3 py-1 backdrop-blur-sm">
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
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}
