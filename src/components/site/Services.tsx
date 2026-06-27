import { motion } from "framer-motion";
import {
  Code2, Globe, Bot, Cog, ShoppingCart, Link2, Cloud, LayoutDashboard,
} from "lucide-react";
import { useI18n } from "@/i18n/context";

const icons = [Code2, Globe, Bot, Cog, ShoppingCart, Link2, Cloud, LayoutDashboard];

export function Services() {
  const { t } = useI18n();
  return (
    <Section id="services">
      <SectionHeader title={t.services.title} subtitle={t.services.subtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
        {t.services.items.map((s, i) => {
          const Icon = icons[i];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
              className="group relative p-6 rounded-2xl bg-surface/40 border border-border backdrop-blur-sm transition-all duration-500 hover:border-brand/50 hover:bg-surface/70 hover:-translate-y-1 hover:shadow-[0_0_40px_oklch(0.6_0.22_265/0.2)]"
            >
              <div className="absolute left-0 top-6 bottom-6 w-[2px] bg-brand opacity-0 group-hover:opacity-100 transition-opacity rounded-r" />
              <div className="w-11 h-11 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center mb-5 transition-all group-hover:bg-brand/20 group-hover:shadow-[0_0_20px_oklch(0.6_0.22_265/0.4)]">
                <Icon size={20} className="text-brand" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

export function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">{children}</div>
    </section>
  );
}

export function SectionHeader({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl"
    >
      {eyebrow && (
        <div className="font-mono text-xs uppercase tracking-wider text-brand mb-4">{eyebrow}</div>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && <p className="text-muted-foreground text-lg">{subtitle}</p>}
    </motion.div>
  );
}
