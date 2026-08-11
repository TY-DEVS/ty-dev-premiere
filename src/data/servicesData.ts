export interface ServiceItemData {
  slug: string;
  iconName: string;
  title: { fr: string; en: string };
  eyebrow: { fr: string; en: string };
  subtitle: { fr: string; en: string };
  heroDescription: { fr: string; en: string };
  metrics: Array<{ value: string; label: { fr: string; en: string } }>;
  overview: { fr: string; en: string };
  keyBenefits: Array<{ title: { fr: string; en: string }; desc: { fr: string; en: string } }>;
  features: Array<{ title: { fr: string; en: string }; desc: { fr: string; en: string } }>;
  techStack: string[];
  process: Array<{ step: string; title: { fr: string; en: string }; desc: { fr: string; en: string } }>;
  deliverables: Array<{ fr: string; en: string }>;
  faq: Array<{ question: { fr: string; en: string }; answer: { fr: string; en: string } }>;
}

export const servicesData: ServiceItemData[] = [
  {
    slug: "saas-sur-mesure",
    iconName: "Code2",
    title: {
      fr: "Développement SaaS Sur-Mesure",
      en: "Custom SaaS Development",
    },
    eyebrow: {
      fr: "// ARCHITECTURE SOFTWARE & SAAS",
      en: "// SOFTWARE & SAAS ARCHITECTURE",
    },
    subtitle: {
      fr: "Conception et ingénierie de plateformes SaaS multi-tenants scalables, sécurisées et prêtes pour une forte croissance.",
      en: "Engineering scalable, multi-tenant SaaS platforms built for high-throughput enterprise growth.",
    },
    heroDescription: {
      fr: "Nous concevons des logiciels SaaS d'exception capables d'encaisser des millions de requêtes, d'intégrer des systèmes de facturation récurrente Stripe idempotents, et d'offrir une expérience utilisateur fluide sub-100ms.",
      en: "We architect premium SaaS products engineered to handle millions of queries, execute seamless recurring Stripe billing, and deliver sub-100ms user responsiveness.",
    },
    metrics: [
      { value: "< 100ms", label: { fr: "Temps de réponse API moyen", en: "Average API response latency" } },
      { value: "99.99%", label: { fr: "Disponibilité Uptime cible", en: "Target Uptime SLA" } },
      { value: "100%", label: { fr: "Isolation multi-tenant sécurisée", en: "Multi-tenant data isolation" } },
    ],
    overview: {
      fr: "Transformer une idée logicielle en un produit SaaS rentable nécessite une architecture technique irréprochable. Chez TY Dev, nous gérons l'ensemble du cycle de développement : de la modélisation de la base de données relationnelle (PostgreSQL) jusqu'au déploiement continu zero-downtime.",
      en: "Transforming a software vision into a profitable SaaS product requires an uncompromised technical baseline. At TY Dev, we manage the full lifecycle: from relational database modeling (PostgreSQL) to zero-downtime CI/CD deployment.",
    },
    keyBenefits: [
      {
        title: { fr: "Architecture Multi-Tenant Résiliente", en: "Resilient Multi-Tenant Architecture" },
        desc: {
          fr: "Isolation stricte des données clients par organisation avec Row Level Security (RLS) et rôles dynamiques RBAC.",
          en: "Strict tenant data segregation with Row Level Security (RLS) and granular Role-Based Access Control (RBAC).",
        },
      },
      {
        title: { fr: "Monétisation & Facturation Stripe", en: "Stripe Monetization & Subscriptions" },
        desc: {
          fr: "Gestion des abonnements, webhooks idempotents, relances automatiques dunning et calcul de TVA automatique.",
          en: "Subscription lifecycles, idempotent webhooks, dunning churn prevention, and automated Stripe Tax calculation.",
        },
      },
      {
        title: { fr: "Tableaux de Bord & Analytique en Temps Réel", en: "Real-Time Dashboards & Analytics" },
        desc: {
          fr: "Interfaces réactives avec visualisations graphiques avancées pour offrir un contrôle total à vos utilisateurs.",
          en: "Responsive interfaces featuring dynamic charting and data visualization for complete user operational control.",
        },
      },
    ],
    features: [
      {
        title: { fr: "Authentification & Sécurité OWASP", en: "Authentication & OWASP Standards" },
        desc: {
          fr: "Gestion des sessions via cookies HttpOnly sécurisés, OAuth2 (Google/GitHub/Microsoft) et double authentification (MFA).",
          en: "Session state management via HttpOnly cookies, OAuth2 SSO, and multi-factor authentication (MFA).",
        },
      },
      {
        title: { fr: "APIs REST & GraphQL Performantes", en: "High-Throughput REST & GraphQL APIs" },
        desc: {
          fr: "Endpoints validés par schémas Zod avec rate-limiting Redis pour prévenir toute surcharge des serveurs.",
          en: "Strict Zod schema validation backed by Redis token-bucket rate-limiting to prevent server exhaustion.",
        },
      },
      {
        title: { fr: "Base de Données & Caching Avancé", en: "Advanced Database Caching" },
        desc: {
          fr: "Base PostgreSQL optimisée avec indexation B-Tree/GIN et couche de cache Redis sub-milliseconde.",
          en: "PostgreSQL relational cluster with B-Tree/GIN indexes paired with a sub-millisecond Redis caching layer.",
        },
      },
    ],
    techStack: ["React 19", "TypeScript", "Vite", "TanStack Router", "Node.js", "PostgreSQL", "Redis", "Stripe API", "Docker"],
    process: [
      { step: "01", title: { fr: "Cadrage & Architecture", en: "Scope & Architecture" }, desc: { fr: "Spécification des schémas de données, flux utilisateurs et modèle de facturation.", en: "Definition of database schemas, user personas, and subscription tiers." } },
      { step: "02", title: { fr: "Prototypage UI/UX", en: "UI/UX Design Tokens" }, desc: { fr: "Création des maquettes interactives sous le design system TY Dev.", en: "Interactive wireframes built upon our battle-tested glassmorphism design system." } },
      { step: "03", title: { fr: "Développement & Tests", en: "Core Development & QA" }, desc: { fr: "Codage modulaire TypeScript, tests d'intégration et intégration Stripe.", en: "Modular TypeScript engineering, integration testing, and Stripe integration." } },
      { step: "04", title: { fr: "Déploiement & Monitoring", en: "CI/CD Deployment" }, desc: { fr: "Mise en production zero-downtime et surveillance en temps réel.", en: "Zero-downtime production deployment with continuous telemetry logging." } },
    ],
    deliverables: [
      { fr: "Code source complet avec droits d'auteur exclusifs", en: "Full production source code with 100% IP ownership" },
      { fr: "Architecture Multi-tenant & Système de facturation Stripe", en: "Production multi-tenant backend & Stripe billing engine" },
      { fr: "Pipeline CI/CD avec hébergement Cloud automatisé", en: "Automated GitHub Actions CI/CD deployment pipeline" },
      { fr: "Documentation technique API & guide d'administration", en: "Comprehensive API technical documentation & admin manual" },
    ],
    faq: [
      {
        question: { fr: "Combien de temps faut-il pour développer une version Beta d'un SaaS ?", en: "How long does it take to build an MVP SaaS?" },
        answer: { fr: "Selon la complexité fonctionnelle, une version de production complète est généralement livrée entre 4 et 8 semaines.", en: "Depending on scope complexity, a production-grade MVP is shipped within 4 to 8 weeks." },
      },
      {
        question: { fr: "Suis-je propriétaire à 100% du code source ?", en: "Do I own 100% of the intellectual property?" },
        answer: { fr: "Oui, vous obtenez l'entière propriété intellectuelle et les droits exclusifs sur l'ensemble du code source développé.", en: "Yes, you own 100% of the IP, repositories, and software rights upon delivery." },
      },
    ],
  },
  {
    slug: "applications-web-pwa",
    iconName: "Globe",
    title: {
      fr: "Applications Web & PWA Haute Performance",
      en: "Web Applications & Progressive Web Apps (PWA)",
    },
    eyebrow: {
      fr: "// FRONTEND ENGINEERING & PWA",
      en: "// FRONTEND ENGINEERING & PWA",
    },
    subtitle: {
      fr: "Développement d'applications web ultra-rapides, réactives et installables sur mobile sans passer par les commissions des stores.",
      en: "Engineering sub-second, highly responsive web apps installable on mobile without app store friction.",
    },
    heroDescription: {
      fr: "Bénéficiez de la puissance du web moderne : des temps de chargement instantanés (score Lighthouse 100/100), une prise en charge du mode hors-ligne via Service Workers, et des notifications push natives sur smartphone.",
      en: "Unlock modern web capabilities: instantaneous page renders (100/100 Lighthouse scores), offline-first functionality via Service Workers, and native push notifications.",
    },
    metrics: [
      { value: "100/100", label: { fr: "Score moyen Lighthouse", en: "Lighthouse Performance Score" } },
      { value: "< 1.2s", label: { fr: "Largest Contentful Paint (LCP)", en: "Largest Contentful Paint (LCP)" } },
      { value: "60 FPS", label: { fr: "Micro-animations fluides", en: "Fluid UI Animations" } },
    ],
    overview: {
      fr: "Les consommateurs et entreprises attendent des applications web une réactivité équivalente à celle d'une application native iOS ou Android. Nos PWA combinent les performances exceptionnelles de React & Vite avec le confort d'installation mobile en un clic.",
      en: "Users demand web apps that perform with native iOS/Android fluidity. Our PWAs fuse the speed of React & Vite with instant home-screen mobile installation.",
    },
    keyBenefits: [
      {
        title: { fr: "Économies de 60% sur le Coût Mobile", en: "60% Savings on Mobile Development" },
        desc: { fr: "Une seule base de code TypeScript s'exécute sur desktop, iPhone et smartphones Android.", en: "A unified TypeScript codebase runs seamlessly across desktop, iOS, and Android." },
      },
      {
        title: { fr: "Zéro Commission App Store", en: "Zero App Store Commissions" },
        desc: { fr: "Installation directe sur l'écran d'accueil sans dépendre des validations ou frais de 30% d'Apple et Google.", en: "Direct home screen installation bypassing the 30% store fees and approval review delays." },
      },
      {
        title: { fr: "Notifications Push & Mode Hors-ligne", en: "Push Notifications & Offline Support" },
        desc: { fr: "Service Workers intelligents pour synchroniser les données et réengager vos utilisateurs par notifications.", en: "Service Workers for offline caching and high-engagement native mobile push notifications." },
      },
    ],
    features: [
      {
        title: { fr: "Code Splitting & Lazy Loading", en: "Code Splitting & Lazy Loading" },
        desc: { fr: "Division du bundle JS par route pour ne charger que le code strictement nécessaire.", en: "Dynamic route splitting ensuring minimal initial JavaScript payload delivery." },
      },
      {
        title: { fr: "Design Responsif & Touch UI", en: "Mobile-First Touch Responsiveness" },
        desc: { fr: "Interfaces pensées pour les gestes tactiles mobiles avec transitions fluides sous Framer Motion.", en: "Gesture-driven touch interfaces enhanced by smooth Framer Motion animations." },
      },
      {
        title: { fr: "SEO & Core Web Vitals Optimisés", en: "Core Web Vitals SEO Engineering" },
        desc: { fr: "Respect strict des normes INP, LCP et CLS pour truster les premières places sur Google.", en: "Optimized INP, LCP, and CLS scores designed for top search engine positioning." },
      },
    ],
    techStack: ["React", "TypeScript", "Vite", "TailwindCSS", "Framer Motion", "Workbox", "PWA WebManifest"],
    process: [
      { step: "01", title: { fr: "UX Design & Maquettage", en: "UX Wireframing" }, desc: { fr: "Conception de parcours fluides axés sur la vitesse et la conversion.", en: "Designing high-conversion mobile-first user journeys." } },
      { step: "02", title: { fr: "Développement Frontend", en: "Frontend Engineering" }, desc: { fr: "Intégration composant par composant avec animations 60fps.", en: "Component-driven development with 60fps animations." } },
      { step: "03", title: { fr: "Configuration Service Workers", en: "Service Worker Caching" }, desc: { fr: "Mise en place de la mise en cache hors-ligne et du manifest PWA.", en: "Configuring offline precaching and PWA webmanifest assets." } },
      { step: "04", title: { fr: "Audit Lighthouse & Déploiement", en: "Lighthouse Audit & Launch" }, desc: { fr: "Validation des critères de performance et mise en ligne.", en: "Testing CWV parameters and instant global deployment." } },
    ],
    deliverables: [
      { fr: "Application Web & PWA installable sur iOS et Android", en: "Production Progressive Web App installable on mobile & desktop" },
      { fr: "Score de performance Lighthouse garanti > 95/100", en: "Guaranteed Lighthouse performance score > 95/100" },
      { fr: "Service Workers d'arrière-plan et gestion push notifications", en: "Service Workers for offline caching & push notifications" },
      { fr: "Audit d'accessibilité et de conformité mobile", en: "Full accessibility & mobile UX validation report" },
    ],
    faq: [
      {
        question: { fr: "Les PWA fonctionnent-elles sur iPhone (iOS) ?", en: "Do PWAs work seamlessly on iPhones (iOS)?" },
        answer: { fr: "Oui ! Apple prend nativement en charge l'installation des PWA sur l'écran d'accueil Safari ainsi que les notifications push iOS.", en: "Yes! Apple natively supports PWA home screen installation via Safari along with push notifications." },
      },
    ],
  },
  {
    slug: "seo-et-marketing-digital",
    iconName: "Megaphone",
    title: {
      fr: "Optimisation SEO & Marketing Digital",
      en: "SEO Optimization & Digital Growth",
    },
    eyebrow: {
      fr: "// RÉFÉRENCEMENT UNIVERSEL & GEO",
      en: "// SEARCH & GENERATIVE ENGINE OPTIMIZATION",
    },
    subtitle: {
      fr: "Propulsez votre visibilité organique sur Google et les moteurs d'intelligence artificielle (ChatGPT, Perplexity, Gemini).",
      en: "Dominate Google search results and AI-driven generative engines (ChatGPT, Perplexity, Gemini).",
    },
    heroDescription: {
      fr: "Le SEO moderne a évolué. Nous combinons l'optimisation technique (Core Web Vitals, Schema.org), la création de contenus sémantiques haute autorité et l'optimisation GEO (Generative Engine Optimization) pour faire de votre marque la référence absolue.",
      en: "Modern SEO extends beyond classic keywords. We merge technical performance (Core Web Vitals, Schema.org), semantic content hubs, and GEO strategies to position your brand as the leading authority.",
    },
    metrics: [
      { value: "+ 300%", label: { fr: "Hausse moyenne du trafic organique", en: "Average organic search growth" } },
      { value: "#1", label: { fr: "Positionnement ciblé sur mots-clés stratégiques", en: "Target position on high-intent terms" } },
      { value: "100%", label: { fr: "Citations valides par ChatGPT & Perplexity", en: "Generative AI engine indexing" } },
    ],
    overview: {
      fr: "Acquérir des clients de manière prévisible sans dépenser indéfiniment en publicité payante nécessite une stratégie de référencement éprouvée. Nous réalisons des audits complets et mettons en œuvre les meilleures pratiques d'ingénierie SEO.",
      en: "Acquiring customers organically without escalating ad spend demands a battle-tested search strategy. We run rigorous multi-layer audits and deploy advanced technical SEO frameworks.",
    },
    keyBenefits: [
      {
        title: { fr: "Dominance Google & SERP Rich Snippets", en: "Google Dominance & Rich Snippets" },
        desc: { fr: "Optimisation on-page et injection de schémas JSON-LD pour afficher étoiles, FAQ et avis directement dans Google.", en: "On-page engineering and JSON-LD schema injection for rich Google search listings." },
      },
      {
        title: { fr: "Référencement par l'IA (GEO - Generative Engine)", en: "AI Generative Engine Optimization (GEO)" },
        desc: { fr: "Mise en conformité llms.txt et structuration sémantique des passages pour être recommandé par ChatGPT et Perplexity.", en: "LLMS.txt integration and passage-level optimization for ChatGPT and Perplexity citations." },
      },
      {
        title: { fr: "Core Web Vitals & Vitesse de Rendu", en: "Core Web Vitals Speed Engineering" },
        desc: { fr: "Optimisation de l'INP, du LCP et du CLS pour maximiser la note de qualité accordée par les algorithmes.", en: "Fine-tuning INP, LCP, and CLS parameters to secure Google's top quality score bracket." },
      },
    ],
    features: [
      {
        title: { fr: "Audit Technique & Crawlabilité", en: "Technical Crawl Audit" },
        desc: { fr: "Analyse approfondie des sitemaps, robots.txt, balises hreflang et erreurs d'indexation.", en: "Deep analysis of sitemaps, robots.txt, hreflang directives, and indexability blockers." },
      },
      {
        title: { fr: "Cocon Sémantique & Topic Clusters", en: "Topic Cluster Content Strategy" },
        desc: { fr: "Architecture de contenus pilier et sous-articles interconnectés pour verrouiller votre thématique.", en: "Structuring hub-and-spoke content architectures to establish domain topical authority." },
      },
      {
        title: { fr: "SEO International & Multi-Régions", en: "International Multi-Region SEO" },
        desc: { fr: "Ciblage géographique et linguistique pour séduire des prospects en Europe, Amérique et Asie.", en: "Geographic targeting tags for capturing customers across Europe, Americas, and Asia." },
      },
    ],
    techStack: ["Schema.org", "JSON-LD", "PageSpeed Insights", "DataForSEO", "Google Search Console", "LLMS.txt"],
    process: [
      { step: "01", title: { fr: "Audit SEO Approfondi", en: "Deep SEO Audit" }, desc: { fr: "Analyse technique, sémantique et de la concurrence.", en: "Comprehensive technical, content, and competitor benchmark." } },
      { step: "02", title: { fr: "Stratégie Mots-Clés & GEO", en: "Keyword & GEO Strategy" }, desc: { fr: "Identification des requêtes à forte intention de conversion.", en: "Identifying high-intent search queries and AI indexing targets." } },
      { step: "03", title: { fr: "Optimisation Code & Meta", en: "On-Page & Schema Integration" }, desc: { fr: "Injection des balises meta, canoniques et schémas JSON-LD.", en: "Deploying Schema.org markup, meta tags, and canonical structures." } },
      { step: "04", title: { fr: "Suivi & Rapports Mensuels", en: "Tracking & Analytics" }, desc: { fr: "Mesure du positionnement, trafic et ajustements continus.", en: "Monitoring SERP rankings, organic conversions, and growth metrics." } },
    ],
    deliverables: [
      { fr: "Audit SEO complet avec plan d'action priorisé", en: "Full multi-category SEO audit with prioritized action plan" },
      { fr: "Intégration des schémas Schema.org / JSON-LD personnalisés", en: "Implementation of custom JSON-LD Schema.org structured data" },
      { fr: "Fichier LLMS.txt et optimisation pour moteurs IA", en: "LLMS.txt deployment for ChatGPT & AI engine visibility" },
      { fr: "Tableau de bord de suivi du positionnement Google", en: "Live SERP position & organic traffic analytics dashboard" },
    ],
    faq: [
      {
        question: { fr: "Au bout de combien de temps voit-on les résultats SEO ?", en: "How long does it take to see tangible SEO results?" },
        answer: { fr: "Les premières améliorations techniques se reflètent en 2 à 4 semaines, tandis que le gain de positions majeures s'établit sur 2 à 4 mois.", en: "Technical improvements yield ranking index updates within 2–4 weeks, with full topical authority establishing over 2–4 months." },
      },
    ],
  },
  {
    slug: "automatisation-processus-metiers",
    iconName: "Cog",
    title: {
      fr: "Automatisation des Processus Métiers",
      en: "Business Process Automation",
    },
    eyebrow: {
      fr: "// WORKFLOW AUTOMATION & INTEGRATION",
      en: "// WORKFLOW AUTOMATION & INTEGRATION",
    },
    subtitle: {
      fr: "Éliminez les tâches répétitives, connectez vos outils et faites gagner des centaines d'heures de travail à vos équipes.",
      en: "Eliminate repetitive tasks, bridge operational software, and reclaim hundreds of working hours.",
    },
    heroDescription: {
      fr: "Nous concevons des workflows automatisés sur-mesure capables de faire communiquer vos CRM, bases de données, outils de paiement et messageries en temps réel avec une tolérance zéro pour l'erreur.",
      en: "We design resilient automated workflows that orchestrate CRMs, databases, payment gateways, and messaging platforms in real time with zero margin for error.",
    },
    metrics: [
      { value: "70%", label: { fr: "Réduction moyenne des tâches manuelles", en: "Average manual task reduction" } },
      { value: "0", label: { fr: "Erreurs de saisie manuelle", en: "Manual data entry errors" } },
      { value: "24/7", label: { fr: "Exécution des workflows en continu", en: "Continuous workflow operation" } },
    ],
    overview: {
      fr: "Dans une entreprise en croissance, la perte de temps liée à la saisie manuelle et au transfert de fichiers d'un outil à un autre freine la rentabilité. Nos solutions d'automatisation transforment vos processus complexes en flux de travail fluides.",
      en: "In a scaling enterprise, manual data copy-pasting throttles productivity and profit margins. Our automation architectures convert complex operations into frictionless digital pipelines.",
    },
    keyBenefits: [
      {
        title: { fr: "Gain de Temps & Productivité", en: "Productivity & Time Savings" },
        desc: { fr: "Vos collaborateurs se concentrent sur les tâches à forte valeur ajoutée pendant que les workflows gèrent la routine.", en: "Your team focuses on strategic growth while automated engines handle recurring operations." },
      },
      {
        title: { fr: "Synchronisation de Données Réglée comme une Horloge", en: "Clockwork Data Synchronization" },
        desc: { fr: "Mise à jour instantanée de vos données clients, factures et stocks sur l'ensemble de votre écosystème logiciel.", en: "Instant synchronization of client records, invoices, and inventory across software stacks." },
      },
      {
        title: { fr: "Tolérance aux Pannes & Exponential Backoff", en: "Fault-Tolerant Retry Policies" },
        desc: { fr: "Gestion des erreurs réseau et files d'attente (Queues) pour garantir qu'aucune donnée ne soit jamais perdue.", en: "Message queues featuring exponential backoff retries to guarantee zero data loss during network blips." },
      },
    ],
    features: [
      {
        title: { fr: "Workflows Asynchrones & Webhooks", en: "Async Workflows & Webhooks" },
        desc: { fr: "Reception et traitement idempotent des événements en temps réel via des serveurs Node.js haute vitesse.", en: "Idempotency-enforced event processing via high-speed Node.js servers." },
      },
      {
        title: { fr: "Intégration CRM & ERP", en: "CRM & ERP Integration" },
        desc: { fr: "Connexion directe avec HubSpot, Salesforce, Notion, Airtable, Stripe et QuickBooks.", en: "Native connectors for HubSpot, Salesforce, Notion, Airtable, Stripe, and ERP systems." },
      },
      {
        title: { fr: "Alerting & Tracing en Temps Réel", en: "Real-Time Tracing & Alerts" },
        desc: { fr: "Notifications instantanées sur Slack/Teams en cas d'anomalie avec journalisation centralisée.", en: "Instant Slack/Teams alerts with telemetry logging in case of third-party API issues." },
      },
    ],
    techStack: ["Node.js", "Express", "BullMQ", "Redis", "Webhooks", "REST APIs", "Make/n8n", "PostgreSQL"],
    process: [
      { step: "01", title: { fr: "Cartographie des Flux", en: "Workflow Mapping" }, desc: { fr: "Analyse des goulots d'étranglement et identification des automatisations clés.", en: "Mapping operational bottlenecks and identifying high-ROI automations." } },
      { step: "02", title: { fr: "Conception de l'Architecture", en: "Architecture Blueprint" }, desc: { fr: "Spécification des déclencheurs, filtres et mécanismes de sécurité.", en: "Designing event triggers, data transformations, and retry guards." } },
      { step: "03", title: { fr: "Développement & Connexion APIs", en: "API Integration & Testing" }, desc: { fr: "Codage des scripts de synchronisation et tests d'idempotence.", en: "Developing synchronization scripts with idempotency guarantees." } },
      { step: "04", title: { fr: "Mise en Service & Surveillance", en: "Live Deployment & Telemetry" }, desc: { fr: "Déploiement avec monitoring 24/7 de l'exécution des tâches.", en: "Deploying automation engines with 24/7 background telemetry." } },
    ],
    deliverables: [
      { fr: "Moteurs d'automatisation d'arrière-plan haute disponibilité", en: "High-availability automated background processing engines" },
      { fr: "Connecteurs d'APIs sécurisés avec gestion des réessais", en: "Secure API connectors built with exponential backoff retries" },
      { fr: "Système d'alertes en temps réel sur Slack / Email", en: "Real-time Slack / Email monitoring & exception alerting system" },
      { fr: "Schéma d'architecture des flux et manuel opérationnel", en: "Visual workflow architecture diagram & maintenance playbook" },
    ],
    faq: [
      {
        question: { fr: "Que se passe-t-il si l'une des APIs tierces tombe en panne ?", en: "What happens if a third-party API experiences downtime?" },
        answer: { fr: "Nos workflows utilisent des files d'attente sécurisées (Queues) qui mettent en pause la tâche et retentent automatiquement jusqu'au rétablissement du service.", en: "Our engines utilize persistent message queues (BullMQ/Redis) that pause execution and automatically retry without data loss." },
      },
    ],
  },
  {
    slug: "e-commerce-et-integrations",
    iconName: "ShoppingCart",
    title: {
      fr: "Plateformes E-Commerce & Stripe",
      en: "E-Commerce Platforms & Stripe Integration",
    },
    eyebrow: {
      fr: "// HIGH-CONVERSION E-COMMERCE",
      en: "// HIGH-CONVERSION E-COMMERCE",
    },
    subtitle: {
      fr: "Boutiques en ligne sur-mesure ultra-rapides avec tunnels de conversion optimisés et gestion des paiements sécurisés.",
      en: "Engineering high-converting online stores with sub-second page speeds and seamless checkout flows.",
    },
    heroDescription: {
      fr: "Transformez vos visiteurs en acheteurs fidèles grâce à des architectures e-commerce modernes : vitesse de chargement instantanée, tunnels de paiement Stripe sans friction et gestion automatisée des commandes.",
      en: "Convert store traffic into loyal customers using headless e-commerce architectures: instant page loads, frictionless Stripe checkouts, and automated fulfillment.",
    },
    metrics: [
      { value: "3.5x", label: { fr: "Augmentation du taux de conversion", en: "Conversion rate multiplier" } },
      { value: "sub-1s", label: { fr: "Temps de chargement des fiches produits", en: "Product page load speed" } },
      { value: "100%", label: { fr: "Conformité PCI-DSS & Sécurité Stripe", en: "PCI-DSS compliance standard" } },
    ],
    overview: {
      fr: "Un retard de 1 seconde sur une fiche produit e-commerce entraîne une baisse de 7% du chiffre d'affaires. Nos plateformes e-commerce combinent des designs immersifs, une mise en cache avancée et des paiements mondiaux sécurisés.",
      en: "A 1-second delay on an e-commerce product page slashes sales by 7%. Our e-commerce platforms blend immersive UI design, advance caching, and secure worldwide payment infrastructure.",
    },
    keyBenefits: [
      {
        title: { fr: "Tunnel de Paiement Stripe Optimisé", en: "Optimized Stripe Checkout Flow" },
        desc: { fr: "Prise en charge d'Apple Pay, Google Pay, Klarna et cartes bancaires avec validation 3D Secure v2.", en: "Apple Pay, Google Pay, Klarna, and credit card checkouts with 3D Secure v2 protection." },
      },
      {
        title: { fr: "Fiches Produits Immersives & Rapides", en: "Sub-Second Product Experience" },
        desc: { fr: "Galeries d'images optimisées WebP/AVIF, déclinaisons instantanées et gestion des stocks en temps réel.", en: "Optimized WebP/AVIF media, instant variant switching, and real-time inventory sync." },
      },
      {
        title: { fr: "Automatisation de la Gestion des Commandes", en: "Automated Order Fulfillment" },
        desc: { fr: "Envoi automatique des factures PDF, notifications de livraison et synchronisation des stocks.", en: "Automated PDF invoicing, shipping tracking webhooks, and stock adjustments." },
      },
    ],
    features: [
      {
        title: { fr: "Paiements Multi-Devises & Stripe Tax", en: "Multi-Currency & Stripe Tax" },
        desc: { fr: "Gestion des devises mondiales et calcul automatique des taxes locales selon le pays de l'acheteur.", en: "Global currency conversion and automated VAT/sales tax calculations via Stripe Tax." },
      },
      {
        title: { fr: "Panier Réactif & Offres Upsell", en: "Reactive Cart & Dynamic Upsells" },
        desc: { fr: "Panier glissant (Slide-over Cart) avec suggestions de produits complémentaires pour augmenter le panier moyen.", en: "Slide-over mini-cart featuring AI-driven cross-selling suggestions to elevate Average Order Value." },
      },
      {
        title: { fr: "SEO E-Commerce & Product Schema", en: "E-Commerce SEO & Product Schema" },
        desc: { fr: "Balisage Schema.org `Product` & `Offer` pour afficher prix, avis et disponibilité directement sur Google.", en: "Structured `Product` & `Offer` JSON-LD schemas displaying price and stock availability on Google." },
      },
    ],
    techStack: ["React", "TypeScript", "Vite", "Stripe Checkout", "TailwindCSS", "Node.js", "PostgreSQL"],
    process: [
      { step: "01", title: { fr: "UX Commerce & Parcours", en: "Commerce UX Mapping" }, desc: { fr: "Conception du tunnel d'achat sans friction.", en: "Designing frictionless product discovery and checkout flows." } },
      { step: "02", title: { fr: "Intégration Catalogue & Stripe", en: "Catalog & Stripe Integration" }, desc: { fr: "Configuration des produits, devises et clés Stripe.", en: "Setting up product variants, multi-currency, and Stripe API keys." } },
      { step: "03", title: { fr: "Tests de Paiement & Webhooks", en: "Webhook & Security QA" }, desc: { fr: "Validation des transactions et de la sécurité PCI-DSS.", en: "Testing live payment scenarios, webhook idempotency, and PCI safety." } },
      { step: "04", title: { fr: "Lancement & Suivi Ventes", en: "Launch & Analytics" }, desc: { fr: "Mise en ligne avec suivi analytique du taux de conversion.", en: "Store release with real-time conversion tracking telemetry." } },
    ],
    deliverables: [
      { fr: "Boutique E-Commerce clé en main avec paiement Stripe", en: "Turnkey E-Commerce platform with integrated Stripe checkout" },
      { fr: "Gestionnaire de catalogue produits et commandes", en: "Comprehensive product catalog & order management interface" },
      { fr: "Balisage Schema.org Product pour le référencement Google", en: "Product & Offer JSON-LD schema integration for Google Search" },
      { fr: "Guide d'administration et gestion des expéditions", en: "Full store manager user manual & order fulfillment guide" },
    ],
    faq: [
      {
        question: { fr: "Les données bancaires des clients sont-elles sécurisées ?", en: "Is customer card payment data fully secure?" },
        answer: { fr: "Absolument. Aucune donnée bancaire ne transite par vos serveurs : les paiements sont directement délégués à l'infrastructure Stripe certifiée PCI-DSS Niveau 1.", en: "Yes. Card details never touch your servers; checkouts are handled by Stripe's certified PCI-DSS Level 1 infrastructure." },
      },
    ],
  },
  {
    slug: "integration-apis-webhooks",
    iconName: "Link2",
    title: {
      fr: "Intégration d'APIs & Webhooks",
      en: "API Integration & Webhook Architecture",
    },
    eyebrow: {
      fr: "// SYSTEM INTEROPERABILITY",
      en: "// SYSTEM INTEROPERABILITY",
    },
    subtitle: {
      fr: "Faites communiquer l'ensemble de vos logiciels et APIs tierces au sein d'un écosystème unique et résilient.",
      en: "Unify disparate software systems and third-party APIs into one resilient enterprise ecosystem.",
    },
    heroDescription: {
      fr: "Nous développons des connecteurs d'APIs personnalisés (REST, GraphQL, gRPC) et des récepteurs de webhooks idempotents pour garantir des échanges de données instantanés et sécurisés entre vos applications.",
      en: "We craft custom API bridges (REST, GraphQL, gRPC) and idempotency-protected webhook processors to guarantee instantaneous, rock-solid data exchange across platforms.",
    },
    metrics: [
      { value: "< 50ms", label: { fr: "Temps de traitement d'un Webhook", en: "Webhook processing latency" } },
      { value: "100%", label: { fr: "Garantie d'idempotence des requêtes", en: "Enforced idempotency rating" } },
      { value: "24/7", label: { fr: "Surveillance de la disponibilité des APIs", en: "Continuous API uptime monitoring" } },
    ],
    overview: {
      fr: "Les systèmes d'information modernes reposent sur la combinaison d'APIs spécialisées. Notre expertise en ingénierie d'intégration vous assure des liaisons stables, capables de résister aux sauts de version et aux pannes des fournisseurs tiers.",
      en: "Modern digital architectures rely on interconnecting specialized APIs. Our integration expertise ensures stable API bridges that withstand third-party API deprecations and network drops.",
    },
    keyBenefits: [
      {
        title: { fr: "Garantie d'Idempotence Absolue", en: "Absolute Idempotency Enforcement" },
        desc: { fr: "Chaque webhook reçu est consigné et vérifié pour éviter toute double transaction ou doublon de donnée.", en: "Every incoming webhook payload is logged and validated to prevent duplicate processing." },
      },
      {
        title: { fr: "Validation Stricte par Schémas Zod", en: "Strict Zod Schema Validation" },
        desc: { fr: "Contrôle rigoureux de la structure des données d'entrée avant d'autoriser l'écriture en base de données.", en: "Rigorously validating payload shapes prior to executing database write operations." },
      },
      {
        title: { fr: "Gestion des Limites de Débit (Rate Limiting)", en: "Intelligent Rate Limit Throttling" },
        desc: { fr: "Adaptation dynamique du rythme des appels API pour respecter les quotas des fournisseurs distants.", en: "Dynamically pacing outgoing API requests to adhere strictly to third-party vendor rate limits." },
      },
    ],
    features: [
      {
        title: { fr: "Architecture Orientée Événements (EDA)", en: "Event-Driven Architecture (EDA)" },
        desc: { fr: "Déclenchement réactif des actions métier dès réception d'une notification d'événement.", en: "Triggering business workflows real-time upon event notification arrival." },
      },
      {
        title: { fr: "Authentification Sécurisée (HMAC & JWT)", en: "Secure HMAC Signature Verification" },
        desc: { fr: "Vérification cryptographique de la signature des webhooks pour éliminer les requêtes malveillantes.", en: "Cryptographic signature validation verifying sender authenticity before processing." },
      },
      {
        title: { fr: "Transformations de Données en Vol", en: "On-the-Fly Payload Transformation" },
        desc: { fr: "Conversion et nettoyage automatique des formats de données (JSON, XML, CSV).", en: "Automating real-time data format translation between JSON, XML, and legacy schemas." },
      },
    ],
    techStack: ["Node.js", "TypeScript", "Express", "REST APIs", "GraphQL", "Zod", "Crypto HMAC", "PostgreSQL"],
    process: [
      { step: "01", title: { fr: "Analyse des Schémas API", en: "API Specs Analysis" }, desc: { fr: "Étude des documentations Swagger/OpenAPI et des méthodes d'authentification.", en: "Reviewing Swagger/OpenAPI docs and authentication standards." } },
      { step: "02", title: { fr: "Conception des Middleware", en: "Middleware Engineering" }, desc: { fr: "Développement des handlers de validation et de signature HMAC.", en: "Developing validation logic and cryptographic signature verification." } },
      { step: "03", title: { fr: "Tests d'Échelle & Simulation", en: "Stress Testing & Mocking" }, desc: { fr: "Simulation de fortes charges et de ruptures de réseau pour valider les réessais.", en: "Simulating peak payloads and network disruptions to verify retry guards." } },
      { step: "04", title: { fr: "Déploiement & Telemetry", en: "Deployment & Observability" }, desc: { fr: "Mise en ligne avec tableaux de bord de surveillance du trafic API.", en: "Production launch backed by real-time API traffic monitoring dashboards." } },
    ],
    deliverables: [
      { fr: "Connecteur d'API modulaire avec validation Zod", en: "Production API integration module with strict Zod schema validation" },
      { fr: "Serveur de réception de Webhooks avec vérification HMAC", en: "Idempotent Webhook ingestion endpoint featuring HMAC verification" },
      { fr: "Suite de tests automatisés et mock de requêtes", en: "Automated unit test suite and mock payload suite" },
      { fr: "Documentation Swagger / OpenAPI de vos endpoints", en: "Complete Swagger / OpenAPI technical documentation specification" },
    ],
    faq: [
      {
        question: { fr: "Comment vérifiez-vous l'authenticité d'un webhook entrant ?", en: "How do you verify incoming webhook payload authenticity?" },
        answer: { fr: "Nous vérifions la signature cryptographique (HMAC SHA-256) fournie dans l'entête HTTP avec votre clé secrète avant d'exécuter la moindre action.", en: "We validate the cryptographic signature (HMAC SHA-256) present in HTTP headers against your secret key prior to processing." },
      },
    ],
  },
  {
    slug: "devops-cloud-infrastructure",
    iconName: "Cloud",
    title: {
      fr: "DevOps & Infrastructure Cloud",
      en: "DevOps & Cloud Infrastructure",
    },
    eyebrow: {
      fr: "// CLOUD ARCHITECTURE & DEVOPS",
      en: "// CLOUD ARCHITECTURE & DEVOPS",
    },
    subtitle: {
      fr: "Conception d'architectures Cloud hautement disponibles, conteneurisées et automatisées par pipelines CI/CD.",
      en: "Designing highly available, containerized cloud infrastructure powered by automated CI/CD pipelines.",
    },
    heroDescription: {
      fr: "Éliminez les pannes de serveur et les déploiements manuels risqués. Nous mettons en place des infrastructures Cloud résilientes avec scalabilité automatique, conteneurisation Docker et pipelines GitHub Actions zero-downtime.",
      en: "Eliminate server outages and risky manual releases. We engineer resilient cloud environments with auto-scaling, Docker containerization, and zero-downtime GitHub Actions pipelines.",
    },
    metrics: [
      { value: "99.99%", label: { fr: "Taux de disponibilité réseau cible", en: "Target network uptime SLA" } },
      { value: "0 sec", label: { fr: "Temps d'arrêt lors d'une mise à jour", en: "Downtime during production updates" } },
      { value: "100%", label: { fr: "Déploiements automatisés par CI/CD", en: "Automated CI/CD release rate" } },
    ],
    overview: {
      fr: "L'excellence opérationnelle d'une application dépend de la stabilité de son infrastructure. Chez TY Dev, nous appliquons les principes de l'Infrastructure as Code (IaC) et du DevSecOps pour sécuriser vos environnements de production.",
      en: "Software stability relies directly on cloud infrastructure engineering. At TY Dev, we enforce Infrastructure as Code (IaC) and DevSecOps best practices to harden your production environments.",
    },
    keyBenefits: [
      {
        title: { fr: "Déploiements Zero-Downtime", en: "Zero-Downtime Releases" },
        desc: { fr: "Mises à jour transparentes pour vos utilisateurs grâce aux déploiements progressifs (Blue-Green / Canary).", en: "Seamless production updates via progressive Blue/Green and Canary deployment pipelines." },
      },
      {
        title: { fr: "Pipelines CI/CD Automatisés", en: "Automated CI/CD Pipelines" },
        desc: { fr: "Vérification automatique des types TypeScript, linting, tests unitaires et build Docker à chaque commit.", en: "Automated TypeScript typechecks, linting, test suites, and Docker builds on every push." },
      },
      {
        title: { fr: "Scalabilité Automatique & Gestion des Coûts", en: "Auto-Scaling & Cloud Cost Governance" },
        desc: { fr: "Ajustement dynamique des ressources serveurs en fonction du trafic pour éviter le gaspillage budgétaire.", en: "Dynamic server capacity scaling during traffic spikes ensuring optimal cloud budget spend." },
      },
    ],
    features: [
      {
        title: { fr: "Conteneurisation Docker & Orchestration", en: "Docker Containerization & Orchestration" },
        desc: { fr: "Isolation parfaite des applications dans des conteneurs légers et facilement réplicables.", en: "Packaging applications into isolated, deterministic, and lightweight Docker images." },
      },
      {
        title: { fr: "Monitoring & Tracing en Temps Réel", en: "Real-Time Observability & Monitoring" },
        desc: { fr: "Supervision des métriques serveurs (CPU, RAM, latence DB) avec alertes instantanées en cas de pic.", en: "Live tracking of system metrics (CPU, RAM, DB latency) paired with automated incident alerts." },
      },
      {
        title: { fr: "Sécurité & Certificats SSL Automatiques", en: "Security Hardening & TLS Encryption" },
        desc: { fr: "Mise en place d'entêtes de sécurité HTTP stricts (CSP, HSTS) et renouvellement automatique des certificats SSL.", en: "Deploying strict HTTP security headers (CSP, HSTS) and automated TLS certificate renewal." },
      },
    ],
    techStack: ["Docker", "GitHub Actions", "Nginx", "PostgreSQL", "Redis", "Linux Server", "Nitro", "Cloudflare"],
    process: [
      { step: "01", title: { fr: "Audit Infrastructure", en: "Infrastructure Audit" }, desc: { fr: "Analyse des performances serveurs et des failles de sécurité.", en: "Benchmarking server performance and identifying security gaps." } },
      { step: "02", title: { fr: "Conteneurisation Docker", en: "Docker Containerizing" }, desc: { fr: "Création des Dockerfiles optimisés multi-stage builds.", en: "Creating optimized multi-stage build Dockerfiles." } },
      { step: "03", title: { fr: "Configuration Pipeline CI/CD", en: "CI/CD Pipeline Setup" }, desc: { fr: "Automatisation des tests et des déploiements sous GitHub Actions.", en: "Configuring automated testing and release actions in GitHub." } },
      { step: "04", title: { fr: "Monitoring & Alerting", en: "Observability Launch" }, desc: { fr: "Mise en place de la télémétrie d'arrière-plan et des alertes.", en: "Deploying system telemetry and automated incident alerts." } },
    ],
    deliverables: [
      { fr: "Architecture Cloud conteneurisée prête pour la production", en: "Production-ready containerized cloud infrastructure architecture" },
      { fr: "Fichiers de configuration GitHub Actions CI/CD automatisés", en: "Fully automated GitHub Actions CI/CD workflow definitions" },
      { fr: "Certificats SSL/TLS et configuration des entêtes de sécurité", en: "Automated SSL/TLS certificate pipeline & HTTP security headers" },
      { fr: "Documentation d'exploitation et procédures de sauvegarde DB", en: "Infrastructure runbook & automated database backup procedures" },
    ],
    faq: [
      {
        question: { fr: "Garantissez-vous des déploiements sans coupure de service ?", en: "Do you guarantee zero-downtime releases?" },
        answer: { fr: "Oui ! Nos stratégies de déploiement basculent le trafic vers les nouveaux conteneurs uniquement une fois que leur état de santé est validé.", en: "Yes! Traffic transitions to new containers only after health checks confirm zero initialization errors." },
      },
    ],
  },
  {
    slug: "integration-ia-llm",
    iconName: "Bot",
    title: {
      fr: "Agents IA & Solutions LLM",
      en: "AI Agents & Applied LLM Solutions",
    },
    eyebrow: {
      fr: "// ARTIFICIAL INTELLIGENCE & LLM",
      en: "// ARTIFICIAL INTELLIGENCE & LLM",
    },
    subtitle: {
      fr: "Intégrez des agents d'intelligence artificielle autonomes, la recherche vectorielle RAG et des fonctionnalités LLM au cœur de vos logiciels.",
      en: "Integrate autonomous AI agents, RAG vector search, and custom LLM workflows into your software ecosystem.",
    },
    heroDescription: {
      fr: "Transformez vos données d'entreprise en valeur stratégique. Nous concevons des architectures RAG (Retrieval-Augmented Generation) sous Pgvector, des agents autonomes avec Function Calling et des assistants intelligents ultra-sécurisés.",
      en: "Convert enterprise data assets into strategic advantage. We engineer Pgvector RAG (Retrieval-Augmented Generation) systems, autonomous agents with Function Calling, and secure internal AI tools.",
    },
    metrics: [
      { value: "Sub-10ms", label: { fr: "Recherche de similitude vectorielle", en: "Vector similarity lookup latency" } },
      { value: "- 60%", label: { fr: "Réduction du temps de traitement métier", en: "Reduction in manual ops duration" } },
      { value: "100%", label: { fr: "Isolation multi-tenant des embeddings", en: "Multi-tenant vector data isolation" } },
    ],
    overview: {
      fr: "En 2026, l’IA ne se résume plus à un simple chatbot basique. Elle devient le moteur décisionnel de vos applications. Nous intégrons les modèles les plus performants (OpenAI GPT-4o, Claude 3.5 Sonnet, Gemini Pro) directement connectés à vos bases de données.",
      en: "In 2026, AI extends far beyond simple chat widgets. It forms the core decision engine of software platforms. We integrate leading models (GPT-4o, Claude 3.5 Sonnet, Gemini Pro) seamlessly connected to your enterprise data.",
    },
    keyBenefits: [
      {
        title: { fr: "Architecture RAG (Retrieval-Augmented Generation)", en: "RAG (Retrieval-Augmented Generation) Architecture" },
        desc: { fr: "Fournissez des réponses basées à 100% sur vos documents et bases de données sans ré-entraîner les modèles.", en: "Deliver context-grounded AI responses based 100% on your internal records without costly fine-tuning." },
      },
      {
        title: { fr: "Agents Autonomes & Function Calling", en: "Autonomous Agents & Function Calling" },
        desc: { fr: "Permettez à l'IA d'exécuter des actions concrètes : création de factures, envoi d'e-mails, requêtes DB.", en: "Enable AI models to execute direct actions: database queries, invoice generation, and external API calls." },
      },
      {
        title: { fr: "Sécurité & Protection contre le Prompt Injection", en: "Prompt Injection Defense & Security" },
        desc: { fr: "Filtrage strict des entrées utilisateurs et isolation hermétique des embeddings entre vos clients.", en: "Rigorously sanitizing user prompts and maintaining strict multi-tenant vector data boundaries." },
      },
    ],
    features: [
      {
        title: { fr: "Stockage Vectoriel Pgvector & Pinecone", en: "Pgvector & Pinecone Vector Storage" },
        desc: { fr: "Indexation haute dimension de vos documents pour des recherches sémantiques sub-10ms.", en: "High-dimensional document embedding indexing for sub-10ms semantic similarity queries." },
      },
      {
        title: { fr: "Parsing d'Intention & Zod Schemas", en: "Intent Parsing & Zod Validation" },
        desc: { fr: "Validation rigoureuse des réponses générées par les LLM pour garantir une sortie JSON exploitable.", en: "Strict JSON Schema & Zod output validation ensuring reliable downstream programmatic execution." },
      },
      {
        title: { fr: "Gouvernance des Coûts API", en: "API Token Cost Governance" },
        desc: { fr: "Suivi en temps réel de la consommation de jetons et limitation de débit par utilisateur.", en: "Real-time token usage telemetry and per-tier rate limiting to prevent API bill overruns." },
      },
    ],
    techStack: ["OpenAI API", "Claude API", "Pgvector", "LangChain/LlamaIndex", "TypeScript", "Node.js", "Zod", "PostgreSQL"],
    process: [
      { step: "01", title: { fr: "Audit des Données & Cas d'Usage", en: "Data Audit & Use-Cases" }, desc: { fr: "Identification des flux de données à vectoriser et des outils à connecter.", en: "Identifying candidate datasets for embeddings and function tools." } },
      { step: "02", title: { fr: "Pipeline de Vectorisation RAG", en: "RAG Embedding Pipeline" }, desc: { fr: "Découpage (chunking) et indexation vectorielle dans PostgreSQL / Pgvector.", en: "Text chunking and vector indexing inside PostgreSQL / Pgvector." } },
      { step: "03", title: { fr: "Codage des Agents & Tools", en: "Agent & Tool Engineering" }, desc: { fr: "Développement des fonctions Function Calling et de la logique métier.", en: "Developing Function Calling handlers and system prompt guards." } },
      { step: "04", title: { fr: "Validation Sécurité & Launch", en: "Security Verification & Launch" }, desc: { fr: "Tests de pénétration des prompts et mise en ligne sécurisée.", en: "Adversarial prompt testing and secure production launch." } },
    ],
    deliverables: [
      { fr: "Moteur d'agent IA fonctionnel avec Function Calling", en: "Production AI Agent engine with custom Function Calling tools" },
      { fr: "Pipeline RAG de vectorisation de documents sous Pgvector", en: "Pgvector document embedding & retrieval-augmented pipeline" },
      { fr: "Système de protection contre le Prompt Injection", en: "Prompt Injection defense layer & input sanitization suite" },
      { fr: "Documentation d'intégration et suivi du coût des tokens", en: "Technical integration guide & token cost telemetry dashboard" },
    ],
    faq: [
      {
        question: { fr: "Mes données d'entreprise servent-elles à entraîner les modèles publics ?", en: "Are my internal company data used to train public LLM models?" },
        answer: { fr: "Non. Nous utilisons les APIs d'entreprise (OpenAI Enterprise / Anthropic Commercial) dont les clauses garantissent qu'aucune donnée n'est conservée ni utilisée pour le ré-entraînement.", en: "No. We utilize commercial enterprise API endpoints (OpenAI Enterprise / Anthropic API) with zero data retention clauses." },
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceItemData | undefined {
  return servicesData.find((s) => s.slug === slug);
}
