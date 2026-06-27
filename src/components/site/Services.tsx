import { motion } from "framer-motion";
import { Code2, Globe, Bot, Cog, ShoppingCart, Link2, Cloud, LayoutDashboard, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/context";

const icons = [Code2, Globe, Bot, Cog, ShoppingCart, Link2, Cloud, LayoutDashboard];

export function Services() {
  const { t } = useI18n();
  return (
    <Section id="services" className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[150px] pointer-events-none" aria-hidden />
      
      <SectionHeader
        eyebrow="// EXPERTISE"
        title={t.services.title}
        subtitle={t.services.subtitle}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-16 md:mt-20 relative z-10">
        {t.services.items.map((s, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1, ease: "easeOut" }}
              className="group relative p-8 rounded-[32px] bg-surface/30 border border-border/50 backdrop-blur-md transition-all duration-700 hover:bg-surface/60 hover:border-brand/40 hover:-translate-y-2 hover:shadow-[0_20px_80px_-20px_oklch(0.6_0.22_265/0.25)] flex flex-col overflow-hidden"
            >
              {/* Internal Hover Glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at 100% 0%, oklch(0.6 0.22 265 / 0.15), transparent 70%)",
                }}
                aria-hidden
              />
              
              {/* Giant watermark icon */}
              <Icon 
                className="absolute -right-6 -bottom-6 w-48 h-48 text-foreground/[0.02] group-hover:text-brand/[0.04] group-hover:scale-110 transition-all duration-1000 -rotate-12 pointer-events-none" 
              />

              <div className="relative flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-surface to-background border border-border/80 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-brand/50 transition-all duration-500 z-10">
                  <Icon size={24} className="text-brand/80 group-hover:text-brand transition-colors" />
                </div>
                <div className="font-mono text-[10px] text-muted-foreground/40 group-hover:text-brand/50 transition-colors z-10">
                  0{i + 1}
                </div>
              </div>
              
              <h3 className="relative font-display font-semibold text-xl mb-3 leading-tight group-hover:text-foreground transition-colors z-10">
                {s.title}
              </h3>
              
              <p className="relative text-sm text-muted-foreground leading-relaxed flex-grow z-10">
                {s.desc}
              </p>

              {/* Decorative Arrow */}
              <div className="relative mt-8 flex items-center gap-2 text-brand/0 group-hover:text-brand transition-colors duration-500 z-10">
                <div className="h-px w-0 group-hover:w-8 bg-brand transition-all duration-500" />
                <ArrowUpRight size={16} className="-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-24 md:py-32 lg:py-40 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">{children}</div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  center,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={center ? "max-w-2xl mx-auto text-center" : "max-w-2xl"}
    >
      {eyebrow && (
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand mb-4">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.05]">
        {title}
      </h2>
      {subtitle && <p className="text-muted-foreground text-base md:text-lg">{subtitle}</p>}
    </motion.div>
  );
}
