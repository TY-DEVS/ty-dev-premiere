import { motion } from "framer-motion";
import { useI18n } from "@/i18n/context";
import { Section, SectionHeader } from "./Services";

export function Process() {
  const { t } = useI18n();
  return (
    <Section>
      <SectionHeader title={t.process.title} subtitle={t.process.subtitle} />
      <div className="relative mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
        {t.process.steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="relative group"
          >
            <div className="relative w-16 h-16 rounded-2xl bg-surface border border-brand/30 flex items-center justify-center mb-6 shadow-[0_0_30px_oklch(0.6_0.22_265/0.15)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_40px_oklch(0.6_0.22_265/0.4)] group-hover:bg-brand/10">
              <span className="font-mono text-brand text-lg font-bold">0{i + 1}</span>
            </div>
            <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
