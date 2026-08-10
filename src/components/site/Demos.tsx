import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, ArrowDown, MonitorPlay } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Section, SectionHeader } from "./Services";

function getItemFilterGroup(item: any): string {
  if (item.tag) return item.tag;
  const text = `${item.category || ""} ${item.title || ""} ${item.service || ""} ${item.desc || ""}`.toLowerCase();

  if (
    text.includes("location voiture") ||
    text.includes("location de voiture") ||
    text.includes("luxury car rental") ||
    text.includes("rental marketplace") ||
    text.includes("fleet") ||
    text.includes("amg lux") ||
    text.includes("drivehub")
  ) {
    return "rental";
  }
  if (
    text.includes("detailing") ||
    text.includes("lustrage") ||
    text.includes("ppf") ||
    text.includes("céramique") ||
    text.includes("car care") ||
    text.includes("pare-brise") ||
    text.includes("vitrage") ||
    text.includes("teintage") ||
    text.includes("étoilé") ||
    text.includes("etoile") ||
    text.includes("car staging") ||
    text.includes("glazone") ||
    text.includes("inside car") ||
    text.includes("magic clean") ||
    text.includes("sylvester") ||
    text.includes("lustra") ||
    text.includes("knights") ||
    text.includes("protech") ||
    text.includes("eclat auto") ||
    text.includes("id cars") ||
    text.includes("light luxury") ||
    text.includes("automoto") ||
    text.includes("azx")
  ) {
    return "detailing";
  }
  if (
    text.includes("concierg") ||
    text.includes("vip") ||
    text.includes("relocation") ||
    text.includes("chauffeur") ||
    text.includes("transfer") ||
    text.includes("gentleman")
  ) {
    return "conciergerie";
  }
  if (
    text.includes("nettoyage") ||
    text.includes("clean") ||
    text.includes("hygiène") ||
    text.includes("propreté") ||
    text.includes("entretien")
  ) {
    return "nettoyage";
  }
  if (
    text.includes("rénov") ||
    text.includes("bâtiment") ||
    text.includes("pierre") ||
    text.includes("stone") ||
    text.includes("jardin") ||
    text.includes("paysage") ||
    text.includes("habitat") ||
    text.includes("déco") ||
    text.includes("structiba")
  ) {
    return "batiment";
  }
  if (
    text.includes("boutique") ||
    text.includes("mode") ||
    text.includes("phone") ||
    text.includes("repair") ||
    text.includes("graphics") ||
    text.includes("branding") ||
    text.includes("e-commerce") ||
    text.includes("broker") ||
    text.includes("concession") ||
    text.includes("jrackz") ||
    text.includes("logistique") ||
    text.includes("autoliefern")
  ) {
    return "tech";
  }
  return "detailing";
}

export function Demos({ isPage = false }: { isPage?: boolean }) {
  const { t, lang } = useI18n();
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const demosData = (t as any).demos || {
    title: "Démos & Maquettes Interactives",
    subtitle: "Explorez nos exemples de sites et applications prêts à être personnalisés.",
    viewDemo: "Tester la Démo",
    viewAll: "Voir toutes les démos",
    items: [],
  };

  const filterOptions = useMemo(() => {
    return lang === "fr"
      ? [
          { id: "all", label: "Tous" },
          { id: "rental", label: "Location de Voiture" },
          { id: "detailing", label: "Detailing Auto" },
          { id: "conciergerie", label: "Conciergerie & VIP" },
          { id: "nettoyage", label: "Nettoyage & Entretien" },
          { id: "batiment", label: "Bâtiment & Rénovation" },
          { id: "tech", label: "E-Commerce & Tech" },
        ]
      : [
          { id: "all", label: "All" },
          { id: "rental", label: "Car Rental" },
          { id: "detailing", label: "Auto Detailing" },
          { id: "conciergerie", label: "Concierge & VIP" },
          { id: "nettoyage", label: "Cleaning & Maintenance" },
          { id: "batiment", label: "Building & Renovation" },
          { id: "tech", label: "E-Commerce & Tech" },
        ];
  }, [lang]);

  const counts = useMemo(() => {
    const res: Record<string, number> = {
      all: demosData.items.length,
      rental: 0,
      detailing: 0,
      conciergerie: 0,
      nettoyage: 0,
      batiment: 0,
      tech: 0,
    };
    demosData.items.forEach((item: any) => {
      const grp = getItemFilterGroup(item);
      if (res[grp] !== undefined) res[grp]++;
    });
    return res;
  }, [demosData.items]);

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return demosData.items;
    return demosData.items.filter((item: any) => getItemFilterGroup(item) === activeFilter);
  }, [demosData.items, activeFilter]);

  const limit = isPage ? 6 : 4;
  const displayedItems =
    showAll || activeFilter !== "all" ? filteredItems : filteredItems.slice(0, limit);

  return (
    <Section id="demos">
      <SectionHeader title={demosData.title} subtitle={demosData.subtitle} />

      {/* Category Filter Pills Bar - Optimized for Mobile & Desktop PC */}
      <div className="mt-10 relative max-w-full">
        <div className="flex items-center justify-start md:justify-center gap-2.5 sm:gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pb-3 pt-1 px-2 max-w-full scroll-smooth">
          {filterOptions.map((f) => {
            const isActive = activeFilter === f.id;
            const count = counts[f.id] || 0;
            return (
              <button
                key={f.id}
                onClick={() => {
                  setActiveFilter(f.id);
                }}
                className={`shrink-0 relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 backdrop-blur-md select-none ${
                  isActive
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_25px_oklch(0.75_0.18_200/0.4)] border border-cyan-400 font-bold scale-105"
                    : "bg-surface/50 text-muted-foreground hover:text-foreground border border-border/60 hover:border-cyan-500/40 hover:bg-surface/80"
                }`}
              >
                <span>{f.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                    isActive
                      ? "bg-slate-950/20 text-slate-950"
                      : "bg-background/80 text-muted-foreground/80 border border-border/40"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <AnimatePresence mode="popLayout">
          {displayedItems.map((p: any, i: number) => (
            <motion.a
              key={p.url + i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
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
            </motion.a>
          ))}
        </AnimatePresence>
      </div>

      {activeFilter === "all" && !showAll && demosData.items.length > limit && (
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
