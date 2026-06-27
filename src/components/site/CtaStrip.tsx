import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";

export function CtaStrip() {
  const { t, lang } = useI18n();
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 mesh-bg opacity-50"
      />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl border border-border/60 bg-gradient-to-br from-[oklch(0.09_0.025_260)] to-[oklch(0.12_0.045_265)] p-10 md:p-14 overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute -top-32 -right-24 w-96 h-96 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, oklch(0.6 0.22 265 / 0.4), transparent 60%)" }}
          />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand mb-4">
                // {lang === "fr" ? "Prochain projet" : "Next project"}
              </div>
              <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                {lang === "fr" ? (
                  <>Construisons quelque chose <span className="text-gradient-brand">d'exceptionnel</span>.</>
                ) : (
                  <>Let's build something <span className="text-gradient-brand">exceptional</span>.</>
                )}
              </h3>
              <p className="mt-4 text-muted-foreground md:text-lg">
                {lang === "fr"
                  ? "Réponse sous 24h. Audit gratuit de votre projet."
                  : "Reply within 24h. Free project audit."}
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand text-primary-foreground font-medium shadow-[0_0_40px_oklch(0.6_0.22_265/0.4)] transition-all hover:shadow-[0_0_60px_oklch(0.6_0.22_265/0.7)] hover:-translate-y-0.5 whitespace-nowrap"
            >
              {t.nav.cta}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
