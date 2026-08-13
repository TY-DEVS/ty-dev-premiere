import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageSquare, ArrowRight, Sparkles, ShieldCheck, Zap, Code2, LineChart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Section, SectionHeader } from "./Services";

export interface FaqItem {
  id: string;
  category: "saas" | "pricing" | "seo" | "ai" | "support";
  categoryLabel: { fr: string; en: string };
  question: { fr: string; en: string };
  answer: { fr: string; en: string };
}

const FAQ_ITEMS: FaqItem[] = [
  // SaaS & Développement
  {
    id: "project-types",
    category: "saas",
    categoryLabel: { fr: "SaaS & Développement", en: "SaaS & Engineering" },
    question: {
      fr: "Quels types de projets informatiques et logiciels développez-vous ?",
      en: "What types of software projects do you engineer?",
    },
    answer: {
      fr: "Chez TY Dev, nous concevons aussi bien des projets de A à Z que la reprise et la finalisation de projets déjà en cours de développement. Nous sommes spécialisés dans les plateformes SaaS multi-locataires, les applications web métier complexes, les systèmes de réservation, les sites vitrines d'exception et les architectures E-Commerce automatisées.",
      en: "At TY Dev, we engineer custom software from scratch as well as take over and finalize projects already in progress. We specialize in multi-tenant SaaS platforms, complex enterprise web applications, booking engines, premium showcase sites, and automated e-commerce architectures.",
    },
  },
  {
    id: "project-takeover",
    category: "saas",
    categoryLabel: { fr: "SaaS & Développement", en: "SaaS & Engineering" },
    question: {
      fr: "Pouvez-vous reprendre, corriger et finaliser un projet ou une application déjà en cours ?",
      en: "Can you take over, audit, and finalize an existing or ongoing software project?",
    },
    answer: {
      fr: "Oui, absolument ! Nous intervenons régulièrement pour reprendre des projets en cours d'exécution, bloqués ou nécessitant un renfort technique. Nos ingénieurs effectuent un audit du code existant, éliminent la dette technique, renforcent la sécurité, ajoutent les fonctionnalités manquantes et mènent votre produit jusqu'à un lancement en production réussi.",
      en: "Yes, absolutely! We frequently step in to take over ongoing, stalled, or complex software projects. Our engineers audit existing codebases, eliminate technical debt, enhance security, implement missing features, and drive your product to a successful production launch.",
    },
  },
  {
    id: "tech-stack",
    category: "saas",
    categoryLabel: { fr: "SaaS & Développement", en: "SaaS & Engineering" },
    question: {
      fr: "Quelles sont les technologies et langages utilisés par vos ingénieurs ?",
      en: "What technology stack do your engineers use?",
    },
    answer: {
      fr: "Nous développons avec des langages et frameworks solides, éprouvés et évolutifs : TypeScript, React, Next.js, Node.js, Python, PHP, Go, PostgreSQL et MongoDB. Côté infrastructure et IA, nous nous appuyons sur AWS, Docker, Vercel, Stripe, ainsi que des API LLM avancées (OpenAI, Anthropic).",
      en: "We engineer using robust, proven, and scalable languages & frameworks: TypeScript, React, Next.js, Node.js, Python, PHP, Go, PostgreSQL, and MongoDB. On the infrastructure and AI front, we leverage AWS, Docker, Vercel, Stripe, and advanced LLM APIs (OpenAI, Anthropic).",
    },
  },
  {
    id: "custom-code",
    category: "saas",
    categoryLabel: { fr: "SaaS & Développement", en: "SaaS & Engineering" },
    question: {
      fr: "Le code source et la propriété intellectuelle m'appartiennent-ils ?",
      en: "Do I own 100% of the source code and intellectual property?",
    },
    answer: {
      fr: "Absolument. Dès la livraison finale du projet et le règlement effectué, 100% du code source, des dépôts Git, des droits de propriété intellectuelle et des accès aux serveurs vous sont intégralement transférés sans aucun abonnement captif.",
      en: "Absolutely. Upon final project delivery and settlement, 100% of the source code, Git repositories, IP rights, and infrastructure credentials are fully transferred to you with zero vendor lock-in.",
    },
  },

  // Tarifs & Délais
  {
    id: "pricing-model",
    category: "pricing",
    categoryLabel: { fr: "Tarifs & Délais", en: "Pricing & Timelines" },
    question: {
      fr: "Combien coûte le développement d'un site ou d'une application sur-mesure ?",
      en: "How much does a custom website or SaaS platform cost?",
    },
    answer: {
      fr: "Chaque projet est unique. Nos tarifs débutent généralement à partir de 1 500 € pour un site vitrine professionnel haute performance, entre 3 000 € et 7 000 € pour une application web ou plateforme métier complexe, et sur devis personnalisé pour les architectures SaaS d'envergure. Nous fournissons des devis détaillés et transparents sous 24h.",
      en: "Every project is bespoke. Rates typically start from €1,500 for a high-performance corporate showcase, between €3,000 and €7,000 for complex web apps or business platforms, and custom quotes for large-scale SaaS architectures. We deliver detailed, transparent proposals within 24 hours.",
    },
  },
  {
    id: "delivery-time",
    category: "pricing",
    categoryLabel: { fr: "Tarifs & Délais", en: "Pricing & Timelines" },
    question: {
      fr: "Quels sont les délais moyens de réalisation et de mise en ligne ?",
      en: "What are the average delivery timelines?",
    },
    answer: {
      fr: "Les délais varient selon le périmètre : un site vitrine premium ou une maquette démo est livré en 5 à 10 jours ouvrés. Une application web ou un produit SaaS complet prend entre 2 et 6 semaines avec des livraisons d'étapes régulières (sprints agiles).",
      en: "Timelines depend on scope: a premium showcase website or interactive demo is delivered in 5 to 10 business days. Full web applications or SaaS products take between 2 to 6 weeks with regular milestone sprints.",
    },
  },
  {
    id: "payment-terms",
    category: "pricing",
    categoryLabel: { fr: "Tarifs & Délais", en: "Pricing & Timelines" },
    question: {
      fr: "Quelles sont vos modalités de paiement ?",
      en: "What are your payment milestones?",
    },
    answer: {
      fr: "Nous pratiquons un paiement échelonné sécurisé : 40% d'acompte au lancement du projet, 30% après validation de la version Beta / prototypes interactifs, et 30% lors de la recette finale et mise en production.",
      en: "We offer structured milestone payments: 40% deposit at project kickoff, 30% upon approval of the interactive Beta build, and 30% upon final acceptance and production deployment.",
    },
  },

  // SEO & Marketing
  {
    id: "seo-optimization",
    category: "seo",
    categoryLabel: { fr: "SEO & Performance", en: "SEO & Performance" },
    question: {
      fr: "Vos créations web sont-elles optimisées pour le référencement Google (SEO) ?",
      en: "Are your platforms fully optimized for Google SEO & speed?",
    },
    answer: {
      fr: "Oui, le SEO technique et les Core Web Vitals font partie de nos priorités absolues. Tous nos sites bénéficient d'un score de vitesse 90+ sur PageSpeed Insights, de balises méta dynamiques, d'un sitemap XML automatique, de la mise en cache serveur et de l'intégration des données structurées Schema.org (JSON-LD).",
      en: "Yes, technical SEO and Core Web Vitals are embedded in our core engineering process. All platforms achieve 90+ speed scores on PageSpeed Insights, dynamic meta tags, automated XML sitemaps, server-side caching, and rich Schema.org JSON-LD structured data.",
    },
  },
  {
    id: "geo-ai-search",
    category: "seo",
    categoryLabel: { fr: "SEO & Performance", en: "SEO & Performance" },
    question: {
      fr: "Optimisez-vous également les sites pour les moteurs d'IA (GEO / ChatGPT / Perplexity) ?",
      en: "Do you optimize for AI search engines (GEO / ChatGPT / Perplexity)?",
    },
    answer: {
      fr: "Absolument. Nous mettons en œuvre des techniques de Generative Engine Optimization (GEO) : données structurées Schema.org poussées, fichiers llms.txt, rédaction sémantique en blocs de réponses concises et micro-contenus citables par Google AI Overviews et ChatGPT.",
      en: "Absolutely. We implement Generative Engine Optimization (GEO) best practices: robust Schema.org metadata, llms.txt endpoints, semantic Q&A passage structuring, and citable micro-content tailored for Google AI Overviews, ChatGPT Search, and Perplexity.",
    },
  },

  // Automatisation & IA
  {
    id: "ai-automation-usecases",
    category: "ai",
    categoryLabel: { fr: "IA & Automatisation", en: "AI & Automation" },
    question: {
      fr: "Comment l'Intelligence Artificielle peut-elle automatiser mes processus d'entreprise ?",
      en: "How can Artificial Intelligence automate my business workflows?",
    },
    answer: {
      fr: "Nous concevons des agents IA conversationnels pour le service client 24/7, des flux d'extraction automatique de documents (factures, devis, e-mails), de la génération automatique de contenus et la synchronisation intelligente entre votre CRM et vos outils métier.",
      en: "We build 24/7 conversational AI agents, automated document extraction pipelines (invoices, quotes, emails), automated content generation, and intelligent sync between your CRM and internal business tools.",
    },
  },

  // Support & Garanties
  {
    id: "post-launch-support",
    category: "support",
    categoryLabel: { fr: "Support & Garanties", en: "Support & Maintenance" },
    question: {
      fr: "Bénéficiez-vous d'une garantie et d'un support après le lancement ?",
      en: "Do you provide post-launch support and maintenance?",
    },
    answer: {
      fr: "Oui. Chaque projet inclut une garantie de 30 jours offerte couvrant la correction de tout bug éventuel. Nous proposons également des contrats de maintenance évolutive (Tierce Maintenance Applicative) avec suivi 24/7, sauvegardes quotidiennes et mises à jour de sécurité.",
      en: "Yes. Every project comes with a 30-day warranty covering any bug fixes. We also offer dedicated ongoing maintenance contracts featuring 24/7 uptime monitoring, daily backups, dependency updates, and feature enhancements.",
    },
  },
];

export function Faq({ isPage = false }: { isPage?: boolean }) {
  const { lang } = useI18n();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { id: "all", label: lang === "fr" ? "Toutes les questions" : "All Questions", Icon: HelpCircle },
    { id: "saas", label: lang === "fr" ? "SaaS & Développement" : "SaaS & Dev", Icon: Code2 },
    { id: "pricing", label: lang === "fr" ? "Tarifs & Délais" : "Pricing & Timeline", Icon: Zap },
    { id: "seo", label: lang === "fr" ? "SEO & Performance" : "SEO & Growth", Icon: LineChart },
    { id: "ai", label: lang === "fr" ? "IA & Automatisation" : "AI & Automation", Icon: Sparkles },
    { id: "support", label: lang === "fr" ? "Support & Garanties" : "Support & Warranty", Icon: ShieldCheck },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      return activeCategory === "all" || item.category === activeCategory;
    });
  }, [activeCategory]);

  // Schema.org FAQPage Structured Data JSON-LD
  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      "name": item.question[lang === "fr" ? "fr" : "en"],
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer[lang === "fr" ? "fr" : "en"],
      },
    })),
  };

  return (
    <Section id="faq">
      {/* Inject SEO JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />

      {!isPage && (
        <SectionHeader
          title={lang === "fr" ? "Foire Aux Questions" : "Frequently Asked Questions"}
          subtitle={
            lang === "fr"
              ? "Toutes les réponses à vos questions techniques, tarifaires et méthodologiques."
              : "Everything you need to know about our engineering process, pricing, and services."
          }
        />
      )}

      {/* Category Filter Container */}
      <div className="max-w-4xl mx-auto mt-10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map(({ id, label, Icon }) => {
            const isActive = activeCategory === id;
            return (
              <button
                key={id}
                onClick={() => setActiveCategory(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "bg-brand text-primary-foreground shadow-[0_0_20px_oklch(0.6_0.22_265/0.4)]"
                    : "bg-surface/50 border border-border/60 text-muted-foreground hover:text-foreground hover:bg-surface/80"
                }`}
              >
                <Icon size={14} className={isActive ? "text-primary-foreground" : "text-brand"} />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion Questions List */}
      <div className="max-w-4xl mx-auto mt-10 space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl border border-border/50 bg-surface/30">
            <HelpCircle size={40} className="mx-auto text-muted-foreground/40 mb-3" />
            <h3 className="text-lg font-semibold text-foreground">
              {lang === "fr" ? "Aucune question ne correspond à votre recherche" : "No questions matched your search"}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
              {lang === "fr"
                ? "Vous avez une question spécifique qui n'est pas répertoriée ? Écrivez-nous directement."
                : "Have a specific question not listed here? Get in touch with our engineering team."}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 mt-5 rounded-full bg-brand text-primary-foreground text-xs font-medium hover:shadow-lg transition-all"
            >
              {lang === "fr" ? "Poser une question" : "Ask us directly"}
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openItems[faq.id];
            const qText = faq.question[lang === "fr" ? "fr" : "en"];
            const aText = faq.answer[lang === "fr" ? "fr" : "en"];
            const catLabel = faq.categoryLabel[lang === "fr" ? "fr" : "en"];

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-brand/60 bg-surface/70 shadow-[0_4px_30px_-10px_oklch(0.6_0.22_265/0.25)]"
                    : "border-border/60 bg-surface/30 hover:border-border hover:bg-surface/50"
                }`}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none gap-4 group"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1 pr-2">
                    <span className="font-mono text-[10px] tracking-wider uppercase text-brand/80 bg-brand/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                      {catLabel}
                    </span>
                    <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-brand transition-colors font-display leading-snug">
                      {qText}
                    </h3>
                  </div>
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full border border-border/60 flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-brand text-primary-foreground border-brand" : "bg-surface/50 text-muted-foreground"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-6 pt-0 border-t border-border/40 text-sm md:text-base text-muted-foreground leading-relaxed">
                        <p className="mt-4">{aText}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Extra Question CTA Banner */}
      <div className="max-w-4xl mx-auto mt-16 p-8 rounded-3xl border border-border/60 bg-gradient-to-br from-surface/40 to-surface/80 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-brand/10 border border-brand/30 items-center justify-center text-brand shrink-0">
            <MessageSquare size={22} />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-foreground font-display">
              {lang === "fr" ? "Une question sans réponse ?" : "Have an unanswered question?"}
            </h4>
            <p className="text-sm text-muted-foreground mt-0.5">
              {lang === "fr"
                ? "Notre équipe d'ingénieurs est disponible pour analyser votre projet sous 24 heures."
                : "Our engineering team is ready to analyze your project within 24 hours."}
            </p>
          </div>
        </div>

        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-primary-foreground text-sm font-semibold transition-all hover:shadow-[0_0_30px_oklch(0.6_0.22_265/0.5)] shrink-0"
        >
          {lang === "fr" ? "Nous contacter" : "Contact Engineers"}
          <ArrowRight size={16} />
        </Link>
      </div>
    </Section>
  );
}
