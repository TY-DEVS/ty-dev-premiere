import { motion } from "framer-motion";
import { Zap, Shield, Bot, Globe2 } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { Section } from "./Services";

const icons = [Zap, Shield, Bot, Globe2];

export function WhyUs() {
  const { t } = useI18n();
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-xs uppercase tracking-wider text-brand mb-4">
            // TY DEV
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {t.why.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{t.why.body}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.why.features.map((f, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-6 rounded-2xl bg-surface/40 border border-border backdrop-blur-sm transition-all hover:border-brand/50 hover:bg-surface/70"
              >
                <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/30 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-brand" />
                </div>
                <h3 className="font-display font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
