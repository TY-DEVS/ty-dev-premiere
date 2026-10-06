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
  Sparkles,
  Zap,
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
      {/* Ambient background gradients */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-brand/10 rounded-full blur-[180px] pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground mb-8">
          <Link
            to="/"
            className="hover:text-brand transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft size={13} />
            <span>{c.backToHome}</span>
          </Link>
          <span>/</span>
          <Link to="/portfolio" className="hover:text-brand transition-colors">
            {c.backToPortfolio}
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">NaviCab</span>
        </div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-4xl"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/25 text-brand font-mono text-xs uppercase tracking-wider font-semibold">
              <Sparkles size={13} />
              {c.badge}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              navicab.fr · Live
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            {c.title} —{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand via-purple-300 to-indigo-200">
              {c.tagline}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {c.summary}
          </p>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://navicab.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-brand text-primary-foreground font-semibold shadow-lg shadow-brand/25 hover:bg-brand/90 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>{c.cta.visitSite}</span>
              <ArrowUpRight size={17} />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-surface/80 border border-border/70 text-foreground font-semibold hover:border-brand/40 hover:bg-surface transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>{c.cta.button}</span>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 my-16">
          {c.stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-surface/40 border border-border/60 backdrop-blur-sm shadow-sm hover:border-brand/30 transition-colors"
            >
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand to-indigo-300">
                  {s.value}
                </span>
              </div>
              <div className="font-mono text-xs sm:text-sm text-muted-foreground mt-2 font-medium">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Showcase Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden border border-border/80 bg-surface/90 shadow-2xl my-16 group"
        >
          {/* Mac-style browser bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[oklch(0.06_0.02_260)] border-b border-border/60">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-surface border border-border/50 text-xs font-mono text-muted-foreground">
              <Globe size={12} className="text-brand" />
              <span className="text-foreground/90 font-medium">https://navicab.fr</span>
            </div>
            <div className="w-12" />
          </div>
          <img
            src="/portfolio/navicab-hero.webp"
            alt="Interface officielle de la plateforme SaaS NaviCab"
            className="w-full h-auto object-cover"
          />
        </motion.div>

        {/* Project Overview & Partnership Breakdown */}
        <div className="max-w-4xl mx-auto my-20 p-8 sm:p-12 rounded-3xl bg-surface/30 border border-border/60 space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            {c.overview.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground/90 leading-relaxed">
            {c.overview.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/40">
            <div className="p-4 rounded-2xl bg-surface/60 border border-border/50">
              <span className="font-mono text-[11px] uppercase tracking-wider text-brand font-semibold block mb-1">
                {lang === "fr" ? "Société Partenaire" : "Partner Company"}
              </span>
              <p className="text-xs sm:text-sm font-medium text-foreground">
                {lang === "fr"
                  ? "NaviCab — Société de taxis officiels et conventionnés CPAM"
                  : "NaviCab — Official taxi fleet & CPAM medical transport"}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-surface/60 border border-border/50">
              <span className="font-mono text-[11px] uppercase tracking-wider text-brand font-semibold block mb-1">
                {lang === "fr" ? "Ingénierie TY Dev" : "TY Dev Engineering"}
              </span>
              <p className="text-xs sm:text-sm font-medium text-foreground">
                {lang === "fr"
                  ? "Architecture SaaS, 5 portails web/mobiles, dispatch radar et API"
                  : "SaaS architecture, 5 portals/apps, radar dispatch & billing"}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-surface/60 border border-border/50">
              <span className="font-mono text-[11px] uppercase tracking-wider text-brand font-semibold block mb-1">
                {lang === "fr" ? "Statut Opérationnel" : "Operational Status"}
              </span>
              <p className="text-xs sm:text-sm font-medium text-foreground">
                {lang === "fr"
                  ? "En production 24/7 sur navicab.fr (Île-de-France & Aéroports)"
                  : "Live 24/7 on navicab.fr (Paris Area & Airports)"}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile-First Section with real mobile captures */}
        <section className="my-24">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/25 text-brand font-mono text-xs uppercase tracking-wider font-semibold">
              <Smartphone size={13} />
              <span>Mobile-First Experience</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              {c.mobileSection.title}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {c.mobileSection.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto items-center">
            {/* Phone Mockup 1: Booking Flow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-full max-w-[340px] rounded-[48px] p-3.5 bg-gradient-to-b from-border/80 via-border/40 to-border/80 border border-border shadow-[0_25px_80px_-20px_oklch(0.6_0.22_265/0.25)]">
                {/* Dynamic island / notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20" />
                <div className="overflow-hidden rounded-[38px] bg-black border border-white/10 aspect-[390/844]">
                  <img
                    src="/portfolio/navicab-mobile-hero.webp"
                    alt="Application mobile NaviCab - Réservation et estimation en direct"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="font-mono text-xs text-muted-foreground mt-4 text-center">
                {lang === "fr"
                  ? "Réservation instantanée & estimation de tarif"
                  : "Instant booking flow & real-time rate calculator"}
              </p>
            </motion.div>

            {/* Phone Mockup 2: Fleet & Vehicle selection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-full max-w-[340px] rounded-[48px] p-3.5 bg-gradient-to-b from-border/80 via-border/40 to-border/80 border border-border shadow-[0_25px_80px_-20px_oklch(0.6_0.22_265/0.25)]">
                {/* Dynamic island / notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20" />
                <div className="overflow-hidden rounded-[38px] bg-black border border-white/10 aspect-[390/844]">
                  <img
                    src="/portfolio/navicab-mobile-fleet.webp"
                    alt="Application mobile NaviCab - Flotte de taxis et sélection de véhicule"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="font-mono text-xs text-muted-foreground mt-4 text-center">
                {lang === "fr"
                  ? "Sélection de gamme & berlines écologiques"
                  : "Eco-friendly fleet & vehicle class selection"}
              </p>
            </motion.div>
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
                  <div className="font-display text-lg font-bold text-foreground mb-3 flex items-center justify-between">
                    <span>{item.title}</span>
                  </div>
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
