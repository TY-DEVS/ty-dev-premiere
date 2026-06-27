import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { Section, SectionHeader } from "./Services";

export function Portfolio() {
  const { t } = useI18n();
  return (
    <Section id="portfolio">
      <SectionHeader title={t.portfolio.title} subtitle={t.portfolio.subtitle} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14">
        {t.portfolio.items.map((p, i) => (
          <motion.a
            key={p.url}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-surface/40 border border-border backdrop-blur-sm transition-all duration-500 hover:border-brand/50 hover:shadow-[0_0_50px_oklch(0.6_0.22_265/0.25)]"
          >
            {/* Mockup area */}
            <div className="relative h-56 overflow-hidden border-b border-border">
              <div className="absolute inset-0 mesh-bg opacity-60" />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(oklch(0.6 0.22 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.6 0.22 265) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="font-display text-5xl font-bold text-gradient-brand opacity-90">
                  {p.title}
                </div>
              </div>
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand text-primary-foreground font-medium">
                  {t.portfolio.viewProject} <ArrowUpRight size={16} />
                </div>
              </div>
              <div className="absolute top-4 left-4 flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-foreground/20" />
              </div>
            </div>

            <div className="p-6">
              <div className="font-mono text-[11px] uppercase tracking-wider text-brand mb-2">
                {p.category}
              </div>
              <h3 className="font-display font-bold text-2xl mb-2 flex items-center gap-2">
                {p.title}
                <ArrowUpRight size={18} className="text-muted-foreground transition-all group-hover:text-brand group-hover:translate-x-1 group-hover:-translate-y-1" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.desc}</p>
              <div className="font-mono text-xs text-muted-foreground/70">
                {p.url.replace("https://", "")}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
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
