import { motion } from "framer-motion";
import { useI18n } from "@/i18n/context";
import { Section } from "./Services";
import { Globe, Cpu, Zap, Calendar } from "lucide-react";

export function About() {
  const { t } = useI18n();
  
  // Mapping icons to badges by index
  const icons = [Globe, Cpu, Zap, Calendar];

  return (
    <Section id="about" className="overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" aria-hidden />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
          
          {/* Left Column: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-brand" />
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
                // THE AGENCY
              </div>
            </div>
            
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
              {t.about.title}
            </h2>
            
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
              {t.about.body}
            </p>
          </motion.div>

          {/* Right Column: Bento Grid for Badges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="grid grid-cols-2 gap-4 sm:gap-6"
          >
            {t.about.badges.map((b, i) => {
              const Icon = icons[i] || Zap;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="group relative p-6 sm:p-8 rounded-[24px] bg-surface/40 border border-border/50 hover:bg-surface/80 hover:border-brand/40 transition-all duration-500 flex flex-col justify-center items-center text-center overflow-hidden"
                >
                  {/* Subtle Hover Glow inside card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="w-12 h-12 rounded-2xl bg-background border border-border/60 shadow-lg flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-brand/30 transition-transform duration-500">
                    <Icon className="text-brand/80 group-hover:text-brand transition-colors" size={24} strokeWidth={1.5} />
                  </div>
                  
                  <span className="font-display text-sm sm:text-base font-semibold text-foreground/90 group-hover:text-foreground transition-colors">
                    {b}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </Section>
  );
}
