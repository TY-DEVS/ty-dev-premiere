import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Code2, Globe, Megaphone, Cog, ShoppingCart, Link2, Cloud, Bot, ArrowUpRight, Truck, Building2, Store, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n/context";

const icons = [Code2, Globe, Megaphone, Cog, ShoppingCart, Link2, Cloud, Bot];
const serviceSlugs = [
  "saas-sur-mesure",
  "applications-web-pwa",
  "seo-et-marketing-digital",
  "automatisation-processus-metiers",
  "e-commerce-et-integrations",
  "integration-apis-webhooks",
  "devops-cloud-infrastructure",
  "integration-ia-llm",
];

const verticalSolutions = [
  {
    slug: "saas-transport-logistique",
    Icon: Truck,
    badge: { fr: "Transport & Mobilité", en: "Transport & Mobility" },
    title: {
      fr: "SaaS Transport, Logistique & Dispatching VTC",
      en: "Logistics & Fleet Dispatching SaaS",
    },
    desc: {
      fr: "Télémétrie GPS en temps réel, assignation automatisée des courses, application chauffeur réactive et portail B2B donneurs d'ordres.",
      en: "Real-time GPS tracking, algorithmic driver dispatch, mobile web apps, and enterprise corporate accounts.",
    },
    metric: { value: "< 50ms", label: { fr: "Latence GPS", en: "GPS Latency" } },
  },
  {
    slug: "saas-immobilier-conciergerie",
    Icon: Building2,
    badge: { fr: "PropTech & Conciergerie", en: "PropTech & Concierge" },
    title: {
      fr: "SaaS Immobilier, Conciergerie & Services Terrain",
      en: "Real Estate & Concierge SaaS",
    },
    desc: {
      fr: "Synchronisation multi-plateformes iCal, planning des prestataires d'entretien, états des lieux numériques et encaissements Stripe.",
      en: "Two-way iCal calendar sync, maintenance dispatching, mobile check-in reports, and automated deposit management.",
    },
    metric: { value: "-75%", label: { fr: "Temps admin", en: "Admin Time" } },
  },
  {
    slug: "saas-e-commerce-b2b",
    Icon: Store,
    badge: { fr: "Wholesale & B2B", en: "Wholesale & B2B" },
    title: {
      fr: "Plateforme SaaS E-Commerce B2B & Grossistes",
      en: "B2B E-Commerce & Wholesale Portals",
    },
    desc: {
      fr: "Portails de commande grossistes, grilles tarifaires négociées par client, paiements différés et synchronisation ERP temps réel.",
      en: "Private client ordering, contracted tiered pricing, net payment terms, and live two-way ERP stock synchronization.",
    },
    metric: { value: "x4", label: { fr: "Rapidité commandes", en: "Order Speed" } },
  },
];

export function Services() {
  const { t, lang } = useI18n();
  return (
    <Section id="services" className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[150px] pointer-events-none" aria-hidden />
      
      <SectionHeader
        eyebrow="// EXPERTISE"
        title={t.services.title}
        subtitle={t.services.subtitle}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mt-16 md:mt-20 relative z-10">
        {t.services.items.map((s, i) => {
          const Icon = icons[i];
          const slug = serviceSlugs[i] || serviceSlugs[0];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.1, ease: "easeOut" }}
            >
              <Link
                to="/services/$slug"
                params={{ slug }}
                className="group relative p-8 rounded-[32px] bg-surface/30 border border-border/50 backdrop-blur-md transition-all duration-700 hover:bg-surface/60 hover:border-brand/40 hover:-translate-y-2 hover:shadow-[0_20px_80px_-20px_oklch(0.6_0.22_265/0.25)] flex flex-col overflow-hidden h-full cursor-pointer"
              >
                {/* Internal Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle at 100% 0%, oklch(0.6 0.22 265 / 0.15), transparent 70%)",
                  }}
                  aria-hidden
                />
                
                {/* Giant watermark icon */}
                <Icon 
                  className="absolute -right-6 -bottom-6 w-48 h-48 text-foreground/[0.02] group-hover:text-brand/[0.04] group-hover:scale-110 transition-all duration-1000 -rotate-12 pointer-events-none" 
                />

                <div className="relative flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-surface to-background border border-border/80 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:border-brand/50 transition-all duration-500 z-10">
                    <Icon size={24} className="text-brand/80 group-hover:text-brand transition-colors" />
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground/40 group-hover:text-brand/50 transition-colors z-10">
                    0{i + 1}
                  </div>
                </div>
                
                <h3 className="relative font-display font-semibold text-xl mb-3 leading-tight group-hover:text-foreground transition-colors z-10">
                  {s.title}
                </h3>
                
                <p className="relative text-sm text-muted-foreground leading-relaxed flex-grow z-10">
                  {s.desc}
                </p>

                {/* Decorative Arrow */}
                <div className="relative mt-8 flex items-center gap-2 text-brand/70 group-hover:text-brand transition-colors duration-500 z-10 font-mono text-xs">
                  <span>{lang === "fr" ? "Découvrir le service" : "Explore service"}</span>
                  <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Vertical Industry Solutions Section (Programmatic / Vertical SEO) */}
      <div className="mt-28 md:mt-36 pt-16 border-t border-border/40 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              {lang === "fr" ? (
                <>
                  Architectures SaaS conçues pour{" "}
                  <span className="text-gradient-brand">votre industrie</span>.
                </>
              ) : (
                <>
                  Vertical SaaS engineered for{" "}
                  <span className="text-gradient-brand">your industry</span>.
                </>
              )}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            {lang === "fr"
              ? "Des plateformes spécialisées, pensées pour les contraintes métiers réelles et inspirées de nos réalisations en production."
              : "Specialized platforms designed for real-world operational workflows and proven by our live production case studies."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {verticalSolutions.map((vert, idx) => {
            const VertIcon = vert.Icon;
            return (
              <motion.div
                key={vert.slug}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  to="/services/$slug"
                  params={{ slug: vert.slug }}
                  className="group relative p-8 rounded-[28px] bg-gradient-to-b from-surface/40 to-surface/10 border border-brand/20 hover:border-brand/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_-15px_oklch(0.6_0.22_265/0.25)] flex flex-col justify-between h-full overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-brand/10 border border-brand/30 flex items-center justify-center text-brand group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all duration-300">
                        <VertIcon size={22} />
                      </div>
                      <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-brand/15 text-brand border border-brand/25 font-semibold">
                        {vert.badge[lang]}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-lg mb-2 text-foreground group-hover:text-brand transition-colors">
                      {vert.title[lang]}
                    </h4>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                      {vert.desc[lang]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/40 flex items-center justify-between">
                    <div>
                      <div className="font-mono font-bold text-base text-foreground">
                        {vert.metric.value}
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground uppercase">
                        {vert.metric.label[lang]}
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand group-hover:translate-x-1 transition-transform">
                      <span>{lang === "fr" ? "Voir l'architecture" : "View architecture"}</span>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-24 md:py-32 lg:py-40 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">{children}</div>
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  center,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={center ? "max-w-2xl mx-auto text-center" : "max-w-2xl"}
    >
      {eyebrow && (
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand mb-4">
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.05]">
        {title}
      </h2>
      {subtitle && <p className="text-muted-foreground text-base md:text-lg">{subtitle}</p>}
    </motion.div>
  );
}
