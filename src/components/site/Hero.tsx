import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { useI18n } from "@/i18n/context";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="home"
      className="relative flex items-center overflow-hidden pt-32 pb-20 md:pt-36 md:pb-28 lg:min-h-[100svh]"
    >
      {/* Layered background */}
      <div className="absolute inset-0 mesh-bg animate-mesh" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.6 0.22 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.6 0.22 265) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 75%)",
        }}
        aria-hidden
      />
      {/* Glow orb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.28, 0.42, 0.28] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.22 265 / 0.4), transparent 60%)",
        }}
        aria-hidden
      />

      <Particles />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
              className="inline-flex items-center gap-2 mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
            >
              <span className="h-px w-8 bg-brand" />
              <span className="text-brand">TY/DEV</span>
              <span className="opacity-50">— EST. 2025</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease }}
              className="font-display font-bold text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem] tracking-tight leading-[1.02] mb-6"
            >
              {t.hero.title1}
              <span className="text-gradient-brand">{t.hero.titleAccent}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.38, ease }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 mb-10"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand text-primary-foreground font-medium shadow-[0_0_40px_oklch(0.6_0.22_265/0.4)] transition-all duration-300 hover:shadow-[0_0_60px_oklch(0.6_0.22_265/0.7)] hover:-translate-y-0.5"
              >
                {t.hero.cta1}
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-border bg-surface/30 backdrop-blur-md text-foreground font-medium transition-all duration-300 hover:border-brand/50 hover:bg-surface/60"
              >
                {t.hero.cta2}
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.7, ease }}
              className="font-mono text-[11px] sm:text-xs text-muted-foreground/80"
            >
              {t.hero.trust}
            </motion.p>
          </div>

          {/* Right — code terminal visual */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.45, ease }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <TerminalMock />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Subtle scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1, ease }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/60 uppercase">Scroll</span>
        <span className="relative h-8 w-px bg-border overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-brand"
            animate={{ y: [-12, 32] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function TerminalMock() {
  return (
    <div className="relative">
      {/* Glow */}
      <div
        className="absolute -inset-6 rounded-3xl opacity-60 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, oklch(0.6 0.22 265 / 0.5), transparent 60%), radial-gradient(circle at 70% 70%, oklch(0.82 0.16 220 / 0.3), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative rounded-2xl bg-[oklch(0.1_0.025_260)]/95 border border-border backdrop-blur-xl shadow-[0_30px_80px_-20px_oklch(0_0_0/0.6)] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface/40">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.6_0.18_25)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.75_0.15_85)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[oklch(0.7_0.18_145)]" />
          </div>
          <div className="font-mono text-[11px] text-muted-foreground">~/ty-dev/scale.ts</div>
          <div className="w-10" />
        </div>
        {/* Code body */}
        <div className="p-5 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-relaxed">
          <CodeLine n={1}>
            <span className="text-[oklch(0.7_0.18_300)]">const</span>{" "}
            <span className="text-cyan">tyDev</span> ={" "}
            <span className="text-muted-foreground">{"{"}</span>
          </CodeLine>
          <CodeLine n={2}>
            {"  "}
            <span className="text-brand">mission</span>:{" "}
            <span className="text-[oklch(0.78_0.14_140)]">'scale_your_business'</span>,
          </CodeLine>
          <CodeLine n={3}>
            {"  "}
            <span className="text-brand">stack</span>:{" "}
            <span className="text-muted-foreground">[</span>
            <span className="text-[oklch(0.78_0.14_140)]">'react'</span>,{" "}
            <span className="text-[oklch(0.78_0.14_140)]">'next'</span>,{" "}
            <span className="text-[oklch(0.78_0.14_140)]">'ai'</span>
            <span className="text-muted-foreground">]</span>,
          </CodeLine>
          <CodeLine n={4}>
            {"  "}
            <span className="text-brand">build</span>:{" "}
            <span className="text-[oklch(0.7_0.18_300)]">async</span>{" "}
            <span className="text-muted-foreground">()</span> {"=>"}{" "}
            <span className="text-muted-foreground">{"{"}</span>
          </CodeLine>
          <CodeLine n={5}>
            {"    "}
            <span className="text-[oklch(0.7_0.18_300)]">return</span>{" "}
            <span className="text-cyan">await</span>{" "}
            <span className="text-foreground">ship</span>
            <span className="text-muted-foreground">(</span>
            <span className="text-[oklch(0.78_0.14_140)]">'production'</span>
            <span className="text-muted-foreground">)</span>;
          </CodeLine>
          <CodeLine n={6}>
            {"  "}
            <span className="text-muted-foreground">{"}"}</span>,
          </CodeLine>
          <CodeLine n={7}>
            <span className="text-muted-foreground">{"}"}</span>;
          </CodeLine>
          <CodeLine n={8}>
            <span className="text-muted-foreground/60">{"// "}</span>
            <span className="text-muted-foreground/60">deploy → live in 4 weeks</span>
            <motion.span
              className="inline-block w-1.5 h-3.5 bg-brand ml-1 align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </CodeLine>
        </div>
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-surface/40 font-mono text-[10px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.7_0.18_145)] pulse-dot" />
            BUILD PASSING
          </div>
          <div>TypeScript · UTF-8</div>
        </div>
      </div>

      {/* Floating badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease }}
        className="absolute -bottom-5 -left-3 sm:-left-6 px-3 py-2 rounded-xl bg-surface border border-border backdrop-blur-md shadow-xl flex items-center gap-2"
      >
        <div className="w-7 h-7 rounded-lg bg-brand/15 border border-brand/30 flex items-center justify-center text-brand">
          <Zap size={13} strokeWidth={2.5} />
        </div>
        <div>
          <div className="font-mono text-[10px] text-muted-foreground">LATENCY</div>
          <div className="font-display text-xs font-bold">&lt; 100ms</div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease }}
        className="absolute -top-4 -right-2 sm:-right-5 px-3 py-2 rounded-xl bg-surface border border-border backdrop-blur-md shadow-xl"
      >
        <div className="font-mono text-[10px] text-muted-foreground">UPTIME</div>
        <div className="font-display text-xs font-bold text-cyan">99.99%</div>
      </motion.div>
    </div>
  );
}

function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex">
      <span className="select-none text-muted-foreground/40 w-6 text-right pr-3 shrink-0">{n}</span>
      <span className="whitespace-pre">{children}</span>
    </div>
  );
}

function Particles() {
  const dots = Array.from({ length: 12 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const delay = (i % 6) * 0.5;
        const size = 1 + (i % 2);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-brand/60"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
            animate={{ opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: 6 + (i % 4), repeat: Infinity, delay, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
}
