import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Code2,
  Globe,
  Megaphone,
  Cog,
  ShoppingCart,
  Link2,
  Cloud,
  Bot,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Layers,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { ServiceItemData } from "@/data/servicesData";
import { useI18n } from "@/i18n/context";

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Globe,
  Megaphone,
  Cog,
  ShoppingCart,
  Link2,
  Cloud,
  Bot,
};

export function ServiceDetail({ service }: { service: ServiceItemData }) {
  const { lang, t } = useI18n();
  const IconComponent = iconMap[service.iconName] || Code2;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative overflow-hidden pt-28 md:pt-36 pb-24">
      {/* Background Ambient Lights */}
      <div
        className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-brand/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute top-1/3 -left-1/4 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-8 flex-wrap">
          <Link to="/" className="hover:text-brand transition-colors">
            Home
          </Link>
          <span className="text-muted-foreground/40">/</span>
          <Link to="/services" className="hover:text-brand transition-colors">
            Services
          </Link>
          <span className="text-muted-foreground/40">/</span>
          <span className="text-brand font-semibold">{service.title[lang]}</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand/40 bg-brand/10 text-brand font-mono text-xs uppercase tracking-[0.2em]">
              <span>{service.eyebrow[lang]}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08]">
              {service.title[lang]}
            </h1>

            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              {service.subtitle[lang]}
            </p>

            <p className="text-base text-muted-foreground/80 leading-relaxed">
              {service.heroDescription[lang]}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-brand text-white font-semibold rounded-full overflow-hidden transition-all shadow-[0_0_40px_-10px_oklch(0.55_0.22_265)] hover:shadow-[0_0_60px_-5px_oklch(0.55_0.22_265)] hover:bg-brand/90"
              >
                <span>{lang === "fr" ? "Demander une consultation" : "Schedule a Consultation"}</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Service Icon Banner Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative p-10 rounded-[36px] bg-gradient-to-br from-surface/80 to-background border border-brand/30 backdrop-blur-xl shadow-2xl overflow-hidden group">
              <div
                className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 80% 20%, oklch(0.6 0.22 265 / 0.25), transparent 60%)",
                }}
                aria-hidden
              />
              <div className="w-20 h-20 rounded-3xl bg-brand/20 border border-brand/50 flex items-center justify-center mb-8 shadow-inner">
                <IconComponent size={40} className="text-brand" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 text-foreground">
                {service.title[lang]}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                {service.overview[lang]}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/60 text-xs font-mono text-brand">
                <ShieldCheck size={16} />
                <span>{lang === "fr" ? "Garantie de qualité & IP 100% transférée" : "100% IP Ownership & Quality SLA"}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {service.metrics.map((m, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-surface/20 border border-border/50 backdrop-blur-md flex flex-col justify-between hover:border-brand/40 transition-colors"
            >
              <div className="font-display font-bold text-4xl lg:text-5xl text-brand mb-2">
                {m.value}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {m.label[lang]}
              </div>
            </div>
          ))}
        </div>

        {/* Key Benefits Section */}
        <div className="mb-24">
          <div className="max-w-2xl mb-12">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand mb-3">
              // {lang === "fr" ? "AVANTAGES CONCURRENTIELS" : "KEY BENEFITS"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {lang === "fr" ? "Pourquoi choisir cette approche ?" : "Why this architecture matters"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.keyBenefits.map((b, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-surface/30 border border-border/60 hover:border-brand/40 backdrop-blur-md transition-all space-y-4 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/30 flex items-center justify-center text-brand font-mono font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground">
                  {b.title[lang]}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {b.desc[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Features Grid */}
        <div className="mb-24 p-10 md:p-14 rounded-[36px] bg-gradient-to-br from-surface/40 to-background border border-border/60 backdrop-blur-xl">
          <div className="max-w-2xl mb-12">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand mb-3">
              // {lang === "fr" ? "SPÉCIFICATIONS TECHNIQUES" : "TECHNICAL SPECIFICATIONS"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {lang === "fr" ? "Fonctionnalités avancées incluses" : "Core Technical Capabilities"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.features.map((f, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-3">
                  <Zap size={18} className="text-brand" />
                  <h3 className="font-display font-semibold text-lg text-foreground">
                    {f.title[lang]}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                  {f.desc[lang]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-24 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand mb-3">
            // {lang === "fr" ? "STACK TECHNIQUE ÉPROUVÉE" : "PROVEN TECH STACK"}
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">
            {lang === "fr" ? "Technologies & Outils utilisés" : "Technologies We Leverage"}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="px-5 py-2.5 rounded-full border border-border/80 bg-surface/50 font-mono text-sm font-medium text-foreground hover:border-brand/50 hover:bg-brand/10 transition-all cursor-default shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Delivery Process */}
        <div className="mb-24">
          <div className="max-w-2xl mb-12">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand mb-3">
              // {lang === "fr" ? "MÉTHODOLOGIE DE LIVRAISON" : "DELIVERY METHODOLOGY"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              {lang === "fr" ? "Comment nous concrétisons votre projet" : "Step-by-Step Execution"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((p) => (
              <div
                key={p.step}
                className="p-8 rounded-3xl bg-surface/20 border border-border/50 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="font-mono font-bold text-3xl text-brand/40 mb-6">
                  {p.step}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {p.title[lang]}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {p.desc[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 p-10 md:p-14 rounded-[36px] bg-surface/30 border border-border/60">
          <div className="lg:col-span-5 space-y-4">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
              // {lang === "fr" ? "LIVRABLES GARANTIS" : "GUARANTEED DELIVERABLES"}
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground">
              {lang === "fr" ? "Ce que vous recevez à la livraison" : "What You Get Upon Delivery"}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lang === "fr"
                ? "Chaque projet est accompagné d'une documentation complète et d'une prise en main clé en main."
                : "Every engineering deliverable includes complete documentation and turnkey onboarding."}
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {service.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-background/60 border border-border/60"
              >
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-foreground">
                  {item[lang]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        {service.faq && service.faq.length > 0 && (
          <div className="max-w-4xl mx-auto mb-24">
            <div className="text-center mb-12">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand mb-3">
                // FAQ
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground">
                {lang === "fr" ? "Questions Fréquentes" : "Frequently Asked Questions"}
              </h2>
            </div>

            <div className="space-y-4">
              {service.faq.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-surface/30 border border-border/60 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-semibold text-lg text-foreground hover:text-brand transition-colors"
                    >
                      <span>{item.question[lang]}</span>
                      <ChevronDown
                        size={20}
                        className={`text-brand shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                        {item.answer[lang]}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
