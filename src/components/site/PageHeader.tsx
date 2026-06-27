import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function PageHeader({
  eyebrow,
  title,
  accent,
  subtitle,
  crumb,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  subtitle?: string;
  crumb: string;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24 border-b border-border/60">
      {/* Background layers */}
      <div className="absolute inset-0 mesh-bg opacity-70" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.6 0.22 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.6 0.22 265) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 30% 40%, black 30%, transparent 75%)",
        }}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-24 w-[640px] h-[640px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.6 0.22 265 / 0.35), transparent 60%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-8"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <ChevronRight size={12} className="opacity-50" />
          <span className="text-brand">{crumb}</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-8 bg-brand" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
            {eyebrow}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] max-w-4xl"
        >
          {title}
          {accent && (
            <>
              {" "}
              <span className="text-gradient-brand">{accent}</span>
            </>
          )}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
