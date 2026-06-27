import { motion } from "framer-motion";
import { useI18n } from "@/i18n/context";
import { Section } from "./Services";

export function About() {
  const { t } = useI18n();
  return (
    <Section id="about">
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="absolute inset-0 mesh-bg opacity-40 blur-3xl" aria-hidden />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="font-mono text-xs uppercase tracking-wider text-brand mb-4">
            // ABOUT
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
            {t.about.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">{t.about.body}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {t.about.badges.map((b, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                className="px-4 py-2 rounded-full bg-surface/60 border border-border font-mono text-xs"
              >
                {b}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
