import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Globe,
  Layers,
  MapPin,
  Radio,
  ShieldCheck,
  Smartphone,
  Tablet,
  Monitor,
  Zap,
  Car,
  Code2,
  Activity,
  Users,
  Building2,
  Sliders,
} from "lucide-react";
import { useI18n } from "@/i18n/context";
import { CtaStrip } from "@/components/site/CtaStrip";

export const Route = createFileRoute("/projets_/navicab")({
  head: () => ({
    meta: [
      {
        title: "NaviCab — Étude de Cas & Architecture SaaS de Dispatch Taxi | TY Dev",
      },
      {
        name: "description",
        content:
          "Découvrez comment TY Dev a co-développé l'infrastructure SaaS NaviCab : dispatch radar en direct, 5 portails web et mobiles, télémétrie GPS et automatisation financière.",
      },
      {
        name: "keywords",
        content:
          "navicab, etude de cas saas, dispatch taxi, developpement web, ty dev, architecture logicielle, letaxi, cpam, factur-x",
      },
      {
        property: "og:title",
        content: "NaviCab — Étude de Cas & Architecture SaaS de Dispatch Taxi | TY Dev",
      },
      {
        property: "og:description",
        content:
          "Plateforme SaaS de dispatch taxi en Île-de-France co-développée avec TY Dev. 5 portails, dispatch radar temps réel, facturation Factur-X et conformité LeTaxi.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://ty-dev.site/projets/navicab" },
      { property: "og:image", content: "https://ty-dev.site/portfolio/navicab-hero.webp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://ty-dev.site/portfolio/navicab-hero.webp" },
    ],
    links: [{ rel: "canonical", href: "https://ty-dev.site/projets/navicab" }],
  }),
  component: NaviCabCaseStudyPage,
});

function NaviCabCaseStudyPage() {
  const { t, lang } = useI18n();
  const c = t.navicabCaseStudy;

  return (
    <div className="relative min-h-screen bg-background text-foreground pt-28 md:pt-36 pb-24 overflow-hidden">
      {/* Ambient background glow — single subtle brand tint */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/8 rounded-full blur-[160px] pointer-events-none"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-10">
          <Link
            to="/"
            className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft size={13} />
            <span>{c.backToHome}</span>
          </Link>
          <span className="text-border">/</span>
          <Link to="/portfolio" className="hover:text-foreground transition-colors">
            {c.backToPortfolio}
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground font-semibold px-2 py-0.5 rounded-md bg-surface/80 border border-border/60">
            NaviCab
          </span>
        </div>

        {/* Hero Section: 2 Columns (Text on Left, Browser Mockup on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center mb-16 md:mb-24">
          {/* Left Column: Text & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-5 sm:space-y-6"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-mono font-medium tracking-wide w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                <span>{lang === "fr" ? "Étude de Cas · Architecture SaaS" : "Case Study · SaaS Architecture"}</span>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
                {c.title}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-foreground/80 font-medium tracking-tight leading-snug">
                {c.tagline}
              </p>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground/85 leading-relaxed max-w-xl">
              {c.summary}
            </p>

            {/* Quick Action Links: 100% Fully Responsive */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="https://navicab.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-brand text-primary-foreground text-sm font-semibold shadow-lg shadow-brand/25 hover:bg-brand/90 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{c.cta.visitSite}</span>
                <ArrowUpRight size={16} />
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-surface/80 border border-border/80 text-foreground text-sm font-semibold hover:border-brand/40 hover:bg-surface transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{c.cta.button}</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Desktop Showcase Window Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 w-full flex justify-center"
          >
            <div className="relative w-full max-w-xl lg:max-w-none rounded-2xl md:rounded-3xl overflow-hidden border border-border/80 bg-[oklch(0.08_0.02_260)] shadow-[0_25px_80px_-20px_rgba(0,0,0,0.7)] group hover:border-brand/40 transition-all duration-500">
              {/* Mac-style browser bar with centered navicab.fr */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-[oklch(0.06_0.02_260)] border-b border-border/60 select-none">
                <div className="flex items-center gap-1.5 sm:gap-2 w-14">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1 rounded-md bg-surface/90 border border-border/60 text-[11px] sm:text-xs font-mono text-muted-foreground/90">
                  <Globe size={11} className="text-brand" />
                  <span className="text-foreground/90 font-medium">navicab.fr</span>
                </div>
                <div className="w-14" />
              </div>

              {/* Real desktop screenshot */}
              <a
                href="https://navicab.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden group select-none aspect-[16/10] bg-surface"
              >
                <img
                  src="/portfolio/navicab-hero.webp"
                  alt="Interface officielle de la plateforme SaaS NaviCab sur navicab.fr"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="eager"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/45 backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand text-primary-foreground text-xs font-semibold shadow-xl">
                    <span>{lang === "fr" ? "Visiter navicab.fr" : "Visit navicab.fr"}</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Project Overview & Partnership Breakdown */}
        <div className="max-w-5xl mx-auto my-20 p-8 sm:p-12 rounded-3xl bg-surface/40 border border-border/70 backdrop-blur-sm space-y-8">
          <div className="space-y-3">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              {c.overview.title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground/90 leading-relaxed">
              {c.overview.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-border/40">
            <div className="p-5 rounded-2xl bg-surface/70 border border-border/60 hover:border-brand/30 transition-colors">
              <div className="flex items-center gap-2.5 text-brand mb-2">
                <Car size={18} />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                  {lang === "fr" ? "Société Partenaire" : "Partner Company"}
                </span>
              </div>
              <p className="text-sm font-medium text-foreground leading-snug">
                {lang === "fr"
                  ? "NaviCab — Société de taxis officiels et conventionnés CPAM en Île-de-France."
                  : "NaviCab — Official taxi fleet & CPAM medical transport operator."}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface/70 border border-border/60 hover:border-brand/30 transition-colors">
              <div className="flex items-center gap-2.5 text-brand mb-2">
                <Code2 size={18} />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                  {lang === "fr" ? "Ingénierie TY Dev" : "TY Dev Engineering"}
                </span>
              </div>
              <p className="text-sm font-medium text-foreground leading-snug">
                {lang === "fr"
                  ? "Architecture SaaS, 5 portails web/mobiles, dispatch radar et facturation automatisée."
                  : "SaaS architecture, 5 portals/apps, sub-2s radar dispatch & automated billing."}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-surface/70 border border-border/60 hover:border-brand/30 transition-colors">
              <div className="flex items-center gap-2.5 text-brand mb-2">
                <Activity size={18} />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">
                  {lang === "fr" ? "Déploiement Opérationnel" : "Operational Status"}
                </span>
              </div>
              <p className="text-sm font-medium text-foreground leading-snug">
                {lang === "fr"
                  ? "En production continue 24/7 sur navicab.fr (Île-de-France & Aéroports)."
                  : "Live 24/7 on navicab.fr across Île-de-France and Paris airports."}
              </p>
            </div>
          </div>
        </div>

        {/* Fully Responsive Architecture Section (Replaces heavy images) */}
        <section className="my-24">
          <div className="p-8 sm:p-12 md:p-14 rounded-3xl bg-gradient-to-br from-surface/70 via-surface/40 to-surface/60 border border-border/70 shadow-xl relative overflow-hidden">
            <div
              className="absolute -top-24 -right-24 w-80 h-80 bg-brand/10 rounded-full blur-[100px] pointer-events-none"
              aria-hidden
            />
            <div className="relative z-10 max-w-3xl mb-12 space-y-3">
              <span className="font-mono text-xs text-brand font-semibold tracking-wider uppercase">
                {c.responsiveSection.eyebrow}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {c.responsiveSection.title}
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                {c.responsiveSection.subtitle}
              </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.responsiveSection.features.map((feat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-6 sm:p-7 rounded-2xl bg-surface/60 border border-border/60 hover:border-brand/40 transition-all hover:bg-surface/80"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-4">
                    {idx === 0 && <Smartphone size={20} />}
                    {idx === 1 && <Tablet size={20} />}
                    {idx === 2 && <Monitor size={20} />}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 Dedicated Portals */}
        <section className="my-24">
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/25 text-brand font-mono text-xs uppercase tracking-wider font-semibold">
              <Layers size={13} />
              <span>Multi-Portal Ecosystem</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {c.portals.title}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {c.portals.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.portals.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-surface/80 to-surface/30 border border-border/70 hover:border-brand/40 transition-all hover:shadow-[0_15px_50px_-15px_oklch(0.6_0.22_265/0.2)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-4">
                    {idx === 0 && <Users size={19} />}
                    {idx === 1 && <Car size={19} />}
                    {idx === 2 && <Radio size={19} />}
                    {idx === 3 && <Building2 size={19} />}
                    {idx === 4 && <Sliders size={19} />}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/40 flex items-center gap-2 text-xs font-mono text-brand">
                  <CheckCircle2 size={13} />
                  <span>
                    {lang === "fr" ? "Opérationnel en production" : "Active in production"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technical Architecture & Challenges */}
        <section className="my-24">
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/25 text-brand font-mono text-xs uppercase tracking-wider font-semibold">
              <Cpu size={13} />
              <span>TY Dev Engineering</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {c.techPillars.title}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {c.techPillars.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.techPillars.items.map((p, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-surface/50 border border-border/70 hover:border-brand/40 transition-all space-y-3"
              >
                <div className="flex items-center gap-3 text-brand">
                  {idx === 0 && <Radio size={20} />}
                  {idx === 1 && <MapPin size={20} />}
                  {idx === 2 && <Zap size={20} />}
                  {idx === 3 && <ShieldCheck size={20} />}
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                    {p.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed pl-8">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final Project CTA Strip */}
        <div className="my-20 p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[oklch(0.08_0.025_260)] via-brand/10 to-[oklch(0.06_0.02_260)] border border-border/80 text-center max-w-4xl mx-auto space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {c.cta.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {c.cta.subtitle}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-brand text-primary-foreground font-semibold shadow-xl shadow-brand/30 hover:bg-brand/90 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>{c.cta.button}</span>
              <ArrowUpRight size={18} />
            </Link>
            <a
              href="https://navicab.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-surface/80 border border-border/70 text-foreground font-semibold hover:border-brand/40 hover:bg-surface transition-all duration-300"
            >
              <span>{c.cta.visitSite}</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

      </div>

      <CtaStrip />
    </div>
  );
}
