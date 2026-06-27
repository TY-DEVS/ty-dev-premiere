import { motion, type Variants } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";


const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease },
  },
};

function WordReveal({
  text,
  className = "",
  delayStart = 0,
}: {
  text: string;
  className?: string;
  delayStart?: number;
}) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className="inline-block overflow-hidden align-bottom pb-[0.08em]"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 0.85, delay: delayStart + i * 0.08, ease }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}



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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 mb-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
            >
              <motion.span
                className="h-px bg-brand block"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.9, delay: 0.2, ease }}
              />
              <span className="text-brand">TY/DEV</span>
              <span className="opacity-50">— EST. 2025</span>
            </motion.div>

            <h1 className="font-display font-bold text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem] tracking-tight leading-[1.02] mb-6">
              <WordReveal text={t.hero.title1.trim()} />{" "}
              <WordReveal
                text={t.hero.titleAccent}
                className="text-gradient-brand"
                delayStart={(t.hero.title1.trim().split(/\s+/).length) * 0.08}
              />
            </h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 mb-10"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand text-primary-foreground font-medium shadow-[0_0_40px_oklch(0.6_0.22_265/0.4)] transition-all duration-300 hover:shadow-[0_0_60px_oklch(0.6_0.22_265/0.7)] hover:-translate-y-0.5"
              >
                {t.hero.cta1}
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-border bg-surface/30 backdrop-blur-md text-foreground font-medium transition-all duration-300 hover:border-brand/50 hover:bg-surface/60"
              >
                {t.hero.cta2}
              </Link>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="font-mono text-[11px] sm:text-xs text-muted-foreground/80"
            >
              {t.hero.trust}
            </motion.p>
          </motion.div>

          {/* Right — code terminal visual */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.6, ease }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <TerminalMock />
            </motion.div>
          </motion.div>

        </div>
      </div>



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
