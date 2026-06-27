import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useI18n } from "@/i18n/context";

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Animated mesh background */}
      <div className="absolute inset-0 mesh-bg animate-mesh" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.6 0.22 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.6 0.22 265) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
        aria-hidden
      />
      {/* Particle dots */}
      <Particles />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface/40 backdrop-blur-md font-mono text-[11px] tracking-wider text-muted-foreground mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand pulse-dot" />
          {t.hero.eyebrow}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] mb-6"
        >
          {t.hero.title1}
          <span className="text-gradient-brand">{t.hero.titleAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand text-primary-foreground font-medium shadow-[0_0_40px_oklch(0.6_0.22_265/0.4)] transition-all hover:shadow-[0_0_60px_oklch(0.6_0.22_265/0.7)] hover:-translate-y-0.5"
          >
            {t.hero.cta1}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border bg-surface/30 backdrop-blur-md text-foreground font-medium transition-all hover:border-brand/50 hover:bg-surface/60"
          >
            {t.hero.cta2}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-mono text-xs text-muted-foreground/80"
        >
          {t.hero.trust}
        </motion.p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-arrow">
        <ArrowDown size={20} className="text-muted-foreground" />
      </div>
    </section>
  );
}

function Particles() {
  const dots = Array.from({ length: 30 });
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 10) * 0.3;
        const size = 1 + (i % 3);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-brand"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 4 + (i % 5), repeat: Infinity, delay }}
          />
        );
      })}
    </div>
  );
}
