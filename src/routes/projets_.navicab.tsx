import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
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
  TrendingUp,
  BarChart3,
  Clock,
  Calculator,
  MessageCircle,
  XCircle,
} from "lucide-react";
import { useI18n } from "@/i18n/context";
import { CtaStrip } from "@/components/site/CtaStrip";

const navicabCaseStudySchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "NaviCab — Étude de Cas & Architecture SaaS de Dispatch Taxi en Île-de-France",
  description:
    "Découvrez comment TY Dev a co-développé l'infrastructure SaaS NaviCab : dispatch radar en direct, 5 portails web et mobiles, télémétrie GPS et automatisation financière.",
  image: "https://ty-dev.site/portfolio/navicab-hero.webp",
  author: {
    "@type": "Organization",
    name: "TY Dev",
    url: "https://ty-dev.site",
  },
  publisher: {
    "@type": "Organization",
    name: "TY Dev",
    logo: {
      "@type": "ImageObject",
      url: "https://ty-dev.site/logo.jpg",
    },
  },
  about: [
    {
      "@type": "SoftwareApplication",
      name: "NaviCab SaaS Platform",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android (PWA)",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
      },
    },
  ],
  datePublished: "2026-02-15",
  dateModified: "2026-10-08",
  inLanguage: ["fr", "en"],
  mainEntityOfPage: "https://ty-dev.site/projets/navicab",
};

const navicabBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://ty-dev.site/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Portfolio",
      item: "https://ty-dev.site/portfolio",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Étude de Cas NaviCab",
      item: "https://ty-dev.site/projets/navicab",
    },
  ],
};

const navicabFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quelle est l'architecture technique de la plateforme SaaS NaviCab conçue par TY Dev ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "NaviCab repose sur une architecture distribuée intégrant un algorithme radar de dispatch sub-2s, une télémétrie GPS haute fréquence, 5 portails spécialisés (Chauffeurs PWA, Dispatch Web, Clients, Entreprises B2B, Conciergeries d'hôtels) et un module financier conforme Factur-X et LeTaxi.",
      },
    },
    {
      "@type": "Question",
      name: "Comment TY Dev garantit-il la haute disponibilité (99.99%) du dispatching taxi ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Par une redondance multi-fournisseurs de cartographie (Mapbox avec bascule automatique sur OpenStreetMap), des requêtes géospatiales optimisées sous PostGIS et un cluster Cloud résilient opérant sans interruption 24h/24 et 7j/7.",
      },
    },
    {
      "@type": "Question",
      name: "Les entreprises et conciergeries d'hôtels disposent-elles d'outils dédiés ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Un portail B2B hôtellerie permet la réservation d'un taxi officiel en 1 clic pour leurs clients, avec suivi en temps réel de l'approche du chauffeur et facturation mensuelle consolidée dématérialisée.",
      },
    },
    {
      "@type": "Question",
      name: "Le code source et la propriété intellectuelle appartiennent-ils au client ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Chez TY Dev, 100% de la propriété intellectuelle du code, des designs et de l'architecture logicielle est cédée au client sans licence récurrente ni dépendance propriétaire.",
      },
    },
  ],
};

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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(navicabCaseStudySchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(navicabBreadcrumbSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(navicabFaqSchema),
      },
    ],
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center mb-16 md:mb-24">
          {/* Left Column: Text & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center space-y-5 sm:space-y-6"
          >
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05]">
                {c.title}
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-foreground/85 font-medium tracking-tight leading-snug">
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

          {/* Right Column: Desktop Showcase Window Mockup - Full natural proportions, NO crop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 xl:col-span-7 w-full flex justify-center"
          >
            <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-border/80 bg-[oklch(0.08_0.02_260)] shadow-[0_25px_80px_-20px_rgba(0,0,0,0.7)] group hover:border-brand/40 transition-all duration-500">
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

              {/* Real desktop screenshot - Full width & auto height, completely uncropped */}
              <a
                href="https://navicab.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden group select-none bg-black"
              >
                <img
                  src="/portfolio/navicab-hero.webp"
                  alt="Interface officielle de la plateforme SaaS NaviCab sur navicab.fr"
                  className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.01]"
                  loading="eager"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
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

        {/* KPI & ROI Metrics Strip */}
        <section className="my-16">
          <div className="max-w-3xl mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <TrendingUp size={13} />
              <span>{lang === "fr" ? "Impact Opérationnel & ROI" : "Operational Impact & ROI"}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {lang === "fr"
                ? "Résultats chiffrés en production continue"
                : "Measurable production benchmarks"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {[
              {
                metric: "< 2s",
                label: lang === "fr" ? "Dispatching Radar" : "Radar Dispatch",
                detail: lang === "fr" ? "Attribution automatique de course" : "Sub-second ride assignment",
                color: "text-brand",
              },
              {
                metric: "99.99%",
                label: lang === "fr" ? "Uptime Opérationnel" : "Platform Uptime",
                detail: lang === "fr" ? "Exploitation 24/7 sans interruption" : "Zero downtime telemetry",
                color: "text-emerald-400",
              },
              {
                metric: "5",
                label: lang === "fr" ? "Portails Interconnectés" : "Active Portals",
                detail: lang === "fr" ? "Web & PWA temps réel" : "Real-time web & PWA apps",
                color: "text-cyan-400",
              },
              {
                metric: "-45%",
                label: lang === "fr" ? "Temps de Gestion" : "Manual Overhead",
                detail: lang === "fr" ? "Automatisation du dispatch" : "Drastic labor reduction",
                color: "text-amber-400",
              },
              {
                metric: "100%",
                label: lang === "fr" ? "Factur-X & CPAM" : "Factur-X Compliance",
                detail: lang === "fr" ? "Facturation automatisée" : "Automated B2B invoices",
                color: "text-purple-400",
              },
            ].map((kpi, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-surface/50 border border-border/70 backdrop-blur-sm flex flex-col justify-between hover:border-brand/40 transition-colors"
              >
                <div>
                  <div className={`font-display font-extrabold text-3xl sm:text-4xl ${kpi.color} mb-1`}>
                    {kpi.metric}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-foreground">
                    {kpi.label}
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed border-t border-border/40 pt-2">
                  {kpi.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Problem vs Solution: Avant / Après */}
        <section className="my-20">
          <div className="max-w-3xl mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/25 text-brand font-mono text-xs uppercase tracking-wider font-semibold">
              <BarChart3 size={13} />
              <span>{lang === "fr" ? "Défi Métier & Solution Ingénierie" : "Challenge vs Engineering Solution"}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {lang === "fr"
                ? "La transformation digitale de NaviCab par TY Dev"
                : "NaviCab digital transformation engineered by TY Dev"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Colonne Avant */}
            <div className="p-7 sm:p-8 rounded-3xl bg-surface/30 border border-red-500/20 space-y-4">
              <div className="flex items-center gap-2.5 text-red-400">
                <XCircle size={20} />
                <h3 className="font-display font-bold text-lg sm:text-xl text-foreground">
                  {lang === "fr" ? "Avant l'intervention TY Dev" : "Before TY Dev Engineering"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {lang === "fr"
                  ? "Une gestion opérationnelle reposant sur des méthodes manuelles, générant des ralentissements et des pertes d'opportunités de courses."
                  : "Operational reliance on manual processes causing delays, booking friction, and missed revenue."}
              </p>
              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-muted-foreground">
                {[
                  lang === "fr"
                    ? "Dispatch téléphonique saturé aux heures de pointe et week-ends."
                    : "Phone dispatch bottleneck during morning & weekend peak hours.",
                  lang === "fr"
                    ? "Suivi approximatif de la position des chauffeurs et retards d'assignation."
                    : "Imprecise driver tracking leading to suboptimal pickup times.",
                  lang === "fr"
                    ? "Calculs manuels des forfaits aéroports et risques d'erreurs tarifaires."
                    : "Manual fare calculations with potential pricing discrepancy risks.",
                  lang === "fr"
                    ? "Absence d'interface dédiée pour les conciergeries d'hôtels et entreprises B2B."
                    : "No dedicated booking portal for luxury hotel concierges and corporate accounts.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne Après */}
            <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-brand/15 via-surface/60 to-surface/40 border border-brand/40 shadow-xl space-y-4">
              <div className="flex items-center gap-2.5 text-brand">
                <CheckCircle2 size={20} className="text-emerald-400" />
                <h3 className="font-display font-bold text-lg sm:text-xl text-foreground">
                  {lang === "fr" ? "Avec l'infrastructure TY Dev" : "With TY Dev Infrastructure"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {lang === "fr"
                  ? "Une plateforme SaaS distribuée, temps réel et hautement résiliente, conçue pour opérer 24/7 sans aucune défaillance."
                  : "A distributed, mission-critical real-time SaaS engine engineered to run 24/7 with zero operational friction."}
              </p>
              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-foreground">
                {[
                  lang === "fr"
                    ? "Moteur radar PostGIS dispatchant les courses en moins de 2 secondes."
                    : "Sub-2s radar matching assigning rides to nearest available taxi.",
                  lang === "fr"
                    ? "Télémétrie GPS haute fréquence avec double bascule Mapbox / OpenStreetMap (99.99% uptime)."
                    : "High-frequency GPS telemetry with dual Mapbox/OSM automatic failover.",
                  lang === "fr"
                    ? "Barème préfectoral calculé automatiquement et facturation électronique Factur-X."
                    : "Automated prefecture tariff calculation and 1-click Factur-X invoice generation.",
                  lang === "fr"
                    ? "Portail B2B hôtellerie permettant de commander un taxi officiel en 1 clic avec facturation mensuelle."
                    : "Dedicated hotel concierge portal allowing 1-click booking with unified billing.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

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

        {/* Bridge to Simulator & Conversion */}
        <section className="my-16 sm:my-20 p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-surface/50 border border-brand/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-mono font-semibold">
                <Calculator size={13} />
                <span>{lang === "fr" ? "Simulateur Interactif en Ligne" : "Online Interactive Simulator"}</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {lang === "fr"
                  ? "Inspiré par NaviCab ? Chiffrez votre propre projet sur-mesure"
                  : "Inspired by NaviCab? Estimate your custom project in minutes"}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {lang === "fr"
                  ? "Plateforme SaaS, dispatch temps réel, application mobile ou refonte de portail : calculez un budget réaliste transparent en moins de 2 minutes sans engagement."
                  : "SaaS platform, real-time dispatch, mobile app or enterprise portal: calculate a transparent realistic budget in under 2 minutes with zero commitment."}
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-muted-foreground pt-1">
                <span className="flex items-center gap-1.5 text-brand">
                  <CheckCircle2 size={13} />
                  {lang === "fr" ? "Chiffrage transparent" : "Transparent pricing"}
                </span>
                <span className="flex items-center gap-1.5 text-brand">
                  <CheckCircle2 size={13} />
                  {lang === "fr" ? "Code source 100% à vous" : "100% full code ownership"}
                </span>
                <span className="flex items-center gap-1.5 text-brand">
                  <CheckCircle2 size={13} />
                  {lang === "fr" ? "Consultation offerte sous 24h" : "Free 24h consultation"}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              <Link
                to="/simulateur"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-brand text-primary-foreground font-semibold shadow-lg shadow-brand/25 hover:bg-brand/90 hover:-translate-y-0.5 transition-all text-center"
              >
                <Calculator size={18} />
                <span>{lang === "fr" ? "Calculer mon devis en 2 min" : "Calculate My Quote in 2 min"}</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/33759440105?text=Bonjour%20TY%20Dev,%20j'ai%20vu%20l'%C3%A9tude%20de%20cas%20NaviCab%20et%20je%20souhaite%20un%20devis%20pour%20mon%20projet."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-foreground font-semibold hover:-translate-y-0.5 transition-all text-center text-sm"
              >
                <MessageCircle size={17} className="text-[#25D366]" />
                <span>{lang === "fr" ? "Échanger sur WhatsApp direct" : "Chat on Direct WhatsApp"}</span>
              </a>
            </div>
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
