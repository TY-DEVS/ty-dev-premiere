import React from "react";
import {
  Monitor,
  Layers,
  Code2,
  Store,
  Workflow,
  Building2,
} from "lucide-react";

export interface ProjectType {
  id: string;
  icon: React.ElementType;
  title: { fr: string; en: string };
  desc: { fr: string; en: string };
  badge: { fr: string; en: string };
  isWebsite?: boolean;
  isLargeProject?: boolean;
  minBase: number;
  maxBase: number;
}

export const projectTypes: ProjectType[] = [
  {
    id: "site-vitrine",
    icon: Monitor,
    title: { fr: "Site Web Vitrine & Entreprise", en: "Showcase & Business Website" },
    desc: {
      fr: "Site vitrine sur-mesure pour présenter vos services, rassurer vos clients et recevoir des demandes de devis.",
      en: "Custom showcase website to present your business and generate qualified leads.",
    },
    badge: { fr: "Dès 320 €", en: "From 320 €" },
    isWebsite: true,
    minBase: 320,
    maxBase: 420,
  },
  {
    id: "ecommerce-b2b",
    icon: Store,
    title: { fr: "Boutique en Ligne / E-Commerce", en: "E-Commerce Online Store" },
    desc: {
      fr: "Vente en ligne avec catalogue, panier, paiement sécurisé par carte bancaire et gestion des commandes.",
      en: "Online store with cart, secure card payments and effortless order management.",
    },
    badge: { fr: "Dès 690 €", en: "From 690 €" },
    minBase: 690,
    maxBase: 1150,
  },
  {
    id: "automation-workflows",
    icon: Workflow,
    title: { fr: "Automatisations & Outils Métiers", en: "Automations & Workflow Tools" },
    desc: {
      fr: "Connectez vos outils et supprimez les tâches manuelles : emails automatiques, formulaires et synchronisation.",
      en: "Connect tools and automate manual work: automated emails, data sync and pipelines.",
    },
    badge: { fr: "Dès 350 €", en: "From 350 €" },
    minBase: 350,
    maxBase: 590,
  },
  {
    id: "custom-web",
    icon: Code2,
    title: { fr: "Application Web & Espace Client", en: "Custom Web App & Client Portal" },
    desc: {
      fr: "Portail sécurisé pour vos clients ou vos collaborateurs avec gestion de dossiers et documents.",
      en: "Secure portal for clients or teams with custom files and records management.",
    },
    badge: { fr: "Dès 990 €", en: "From 990 €" },
    minBase: 990,
    maxBase: 1650,
  },
  {
    id: "saas-platform",
    icon: Layers,
    title: { fr: "Plateforme SaaS (Logiciel Web)", en: "SaaS Platform & Cloud Software" },
    desc: {
      fr: "Logiciel complet avec abonnements récurrents Stripe, espaces membres et fonctionnalités avancées.",
      en: "Subscription cloud software with Stripe billing, accounts and data dashboards.",
    },
    badge: { fr: "Dès 1 490 €", en: "From 1,490 €" },
    minBase: 1490,
    maxBase: 2390,
  },
  {
    id: "grand-projet",
    icon: Building2,
    title: { fr: "Grand Projet & Architecture Complexe", en: "Large Scale & Complex Architecture" },
    desc: {
      fr: "Écosystème multi-portails, dispatch temps réel, fort trafic ou plateforme d'envergure sur-mesure.",
      en: "Multi-portal ecosystem, real-time dispatch, high concurrency or bespoke enterprise platform.",
    },
    badge: { fr: "Sur Devis & Cadrage", en: "Custom Discovery" },
    isLargeProject: true,
    minBase: 0,
    maxBase: 0,
  },
];

export interface PageTier {
  id: string;
  name: { fr: string; en: string };
  pagesDetail: { fr: string; en: string };
  extraCost: number;
  weeks: string;
}

export const pageTiers: PageTier[] = [
  {
    id: "1-page",
    name: { fr: "1 Page (Site One-Page / Landing Page)", en: "1 Page (One-Page / Landing Page)" },
    pagesDetail: {
      fr: "Idéal pour débuter : page unique claire avec présentation de votre offre, coordonnées et formulaire direct.",
      en: "Perfect starting setup: single high-converting page with offer, contact info and lead form.",
    },
    extraCost: 0,
    weeks: "3 à 5 jours",
  },
  {
    id: "3-5-pages",
    name: { fr: "3 à 5 Pages (Site Vitrine Standard)", en: "3 to 5 Pages (Standard Business Site)" },
    pagesDetail: {
      fr: "Le format le plus populaire : Accueil, Services détaillés, À Propos, Contact & Mentions légales.",
      en: "Most popular format: Home, Services, About Us, Contact & Legal Notices.",
    },
    extraCost: 140,
    weeks: "1 semaine",
  },
  {
    id: "6-10-pages",
    name: { fr: "6 à 10 Pages (Site Entreprise Complet & SEO)", en: "6 to 10 Pages (Full SEO Business Site)" },
    pagesDetail: {
      fr: "Idéal pour être bien référencé : une page dédiée par prestation, galerie de réalisations, équipe et blog.",
      en: "Great for Google ranking: dedicated service pages, case studies, team and blog.",
    },
    extraCost: 280,
    weeks: "1 à 2 semaines",
  },
  {
    id: "10-plus-pages",
    name: { fr: "Plus de 10 Pages (Grand Portail PME)", en: "10+ Pages (Large Enterprise Portal)" },
    pagesDetail: {
      fr: "Structure complète pour entreprise établie : multilingue, nombreuses pages de cas clients et actualités.",
      en: "Full architecture for established brands: multilingual, extensive case studies and content.",
    },
    extraCost: 450,
    weeks: "2 à 3 semaines",
  },
];

export interface FeatureModule {
  id: string;
  name: { fr: string; en: string };
  desc: { fr: string; en: string };
  cost: number;
}

export const showcaseModules: FeatureModule[] = [
  {
    id: "seo-speed",
    name: { fr: "Référencement Google (SEO) & Vitesse Rapide", en: "Google SEO & Ultra-Fast Loading" },
    desc: {
      fr: "Optimisation pour être visible sur les moteurs de recherche et s'afficher instantanément sur mobile.",
      en: "Search engine optimization and instant mobile loading speed.",
    },
    cost: 50,
  },
  {
    id: "interactive-form",
    name: { fr: "Formulaire de Contact & Devis Interactif", en: "Contact & Quote Request Form" },
    desc: {
      fr: "Vos clients vous écrivent facilement et vous recevez les demandes immédiatement par email.",
      en: "Visitors send inquiries directly and you receive immediate email notifications.",
    },
    cost: 30,
  },
  {
    id: "blog-cms",
    name: { fr: "Espace Blog & Actualités Dynamique", en: "Dynamic Blog & News Section" },
    desc: {
      fr: "Publiez facilement des articles pour partager vos nouveautés et attirer des clients réguliers.",
      en: "Publish articles and updates to attract organic visitors from search engines.",
    },
    cost: 80,
  },
  {
    id: "modern-design-effects",
    name: { fr: "Design Moderne & Animations Fluides", en: "Modern Aesthetics & Smooth Animations" },
    desc: {
      fr: "Mise en page soignée, effets interactifs élégants et confort de lecture optimal sur smartphone.",
      en: "Polished design, interactive hover effects and modern branding.",
    },
    cost: 40,
  },
  {
    id: "multilingual-fr-en",
    name: { fr: "Site Bilingue (Français & Anglais)", en: "Bilingual Setup (French & English)" },
    desc: {
      fr: "Bouton pour changer de langue en un clic afin de toucher des clients internationaux.",
      en: "1-click language switcher to reach international clients.",
    },
    cost: 60,
  },
  {
    id: "appointment-booking",
    name: { fr: "Prise de Rendez-vous en Ligne & WhatsApp", en: "Online Booking & Direct WhatsApp" },
    desc: {
      fr: "Lien Calendly pour réserver un créneau et bouton WhatsApp direct pour discuter immédiatement.",
      en: "Direct Calendly booking calendar and instant WhatsApp button.",
    },
    cost: 30,
  },
  {
    id: "reviews-testimonials",
    name: { fr: "Section Avis Clients & Témoignages", en: "Client Reviews & Social Proof" },
    desc: {
      fr: "Affichez vos retours clients et étoiles de notation pour inspirer confiance aux visiteurs.",
      en: "Showcase customer ratings and testimonials to build instant trust.",
    },
    cost: 25,
  },
  {
    id: "compliance-security",
    name: { fr: "Sécurité SSL (HTTPS) & Conformité RGPD", en: "SSL Security & GDPR Privacy" },
    desc: {
      fr: "Cadenas de sécurité sur votre adresse de site et bandeau de consentement aux cookies conforme.",
      en: "HTTPS padlock certificate and legal GDPR cookies consent notice.",
    },
    cost: 25,
  },
];

export const softwareModules: FeatureModule[] = [
  {
    id: "auth-users",
    name: { fr: "Espace Membres & Connexion Sécurisée", en: "User Accounts & Secure Login" },
    desc: {
      fr: "Inscription, connexion par email ou Google, mot de passe oublié et profils utilisateurs.",
      en: "Registration, email or Google login, password recovery and profiles.",
    },
    cost: 110,
  },
  {
    id: "stripe-payments",
    name: { fr: "Paiement par Carte & Abonnements (Stripe)", en: "Card Payments & Subscriptions" },
    desc: {
      fr: "Paiement sécurisé en ligne par carte bancaire, prélèvements mensuels et gestion des reçus.",
      en: "Secure debit/credit card checkout, monthly subscriptions and receipts.",
    },
    cost: 140,
  },
  {
    id: "admin-dashboard",
    name: { fr: "Tableau de Bord & Statistiques Clés", en: "Dashboard & Key Statistics" },
    desc: {
      fr: "Visualisation claire de vos utilisateurs, de vos ventes et de vos indicateurs d'activité.",
      en: "Clear overview of your customers, revenue and real-time activity metrics.",
    },
    cost: 120,
  },
  {
    id: "auto-notifications",
    name: { fr: "Envoi d'Emails & Alertes Automatiques", en: "Automated Emails & Notifications" },
    desc: {
      fr: "Emails de confirmation, rappels automatiques et alertes par notification.",
      en: "Welcome emails, automated event alerts and transaction notifications.",
    },
    cost: 60,
  },
  {
    id: "external-sync",
    name: { fr: "Connexion à vos Outils (CRM, Excel, APIs)", en: "Integrations (CRM, Excel, APIs)" },
    desc: {
      fr: "Liez votre application à vos logiciels habituels pour éviter toute double saisie manuelle.",
      en: "Connect your software to your existing tools to avoid manual copy-pasting.",
    },
    cost: 130,
  },
  {
    id: "pdf-generator",
    name: { fr: "Génération de Devis & Factures PDF", en: "PDF Invoices & Documents Export" },
    desc: {
      fr: "Création automatique de documents PDF personnalisés avec votre logo en un clic.",
      en: "1-click generation of branded PDF invoices and summaries.",
    },
    cost: 70,
  },
  {
    id: "instant-search",
    name: { fr: "Recherche Rapide & Filtres Avancés", en: "Fast Search & Advanced Filters" },
    desc: {
      fr: "Trouvez n'importe quelle fiche ou information instantanément parmi vos données.",
      en: "Instantly search and filter records with multi-criteria search.",
    },
    cost: 50,
  },
  {
    id: "interactive-map",
    name: { fr: "Carte Interactive & Géolocalisation", en: "Interactive Map & Geolocation" },
    desc: {
      fr: "Affichage de repères sur une carte géographique, adresses et zones d'intervention.",
      en: "Interactive map pins, addresses and coverage areas.",
    },
    cost: 120,
  },
];

export const enterpriseModules: FeatureModule[] = [
  {
    id: "multi-portals",
    name: { fr: "Écosystème Multi-Portails & Rôles Avancés", en: "Multi-Portal Ecosystem & RBAC Roles" },
    desc: {
      fr: "Plusieurs interfaces distinctes synchronisées (ex: Admin, Chauffeurs/Agents, Clients B2B, Hôtels).",
      en: "Multiple interconnected interfaces (e.g. Admin, Field Agents, B2B Clients, Partner Portals).",
    },
    cost: 0,
  },
  {
    id: "realtime-websockets",
    name: { fr: "Dispatch Algorithmique & Flux Temps Réel", en: "Real-Time Telemetry & Algorithmic Dispatch" },
    desc: {
      fr: "Télémétrie GPS en direct, WebSockets sub-seconde et règles d'assignation intelligentes.",
      en: "Live GPS telemetry, sub-second WebSockets, and proximity assignment rules.",
    },
    cost: 0,
  },
  {
    id: "high-scale-cloud",
    name: { fr: "Haute Disponibilité Cloud (SLA 99.99%)", en: "High-Availability Cloud Clustering" },
    desc: {
      fr: "Cluster répliqué, cache Redis distribué, backups instantanés et tolérance aux pannes.",
      en: "Distributed database replication, Redis caching, multi-node clustering and disaster recovery.",
    },
    cost: 0,
  },
  {
    id: "ai-enterprise-agents",
    name: { fr: "Agents IA Autonomes & Modèles Métiers", en: "Autonomous AI Agents & Vector Pipelines" },
    desc: {
      fr: "Traitement intelligent des données d'entreprise, parsing de documents et automatisation avancée.",
      en: "Enterprise RAG, smart document processing, and autonomous workflow automation.",
    },
    cost: 0,
  },
  {
    id: "erp-accounting-api",
    name: { fr: "Facturation Complexe, Factur-X & ERP", en: "Enterprise Billing, Factur-X & ERP" },
    desc: {
      fr: "Génération de factures électroniques légales, prélèvements SEPA et connecteurs ERP sur-mesure.",
      en: "Automated electronic invoicing, SEPA direct debits, and bi-directional ERP connectors.",
    },
    cost: 0,
  },
  {
    id: "sovereign-security",
    name: { fr: "Sécurité Renforcée, Audit Logs & Hébergement UE", en: "Enterprise Security, Audit Trails & EU Cloud" },
    desc: {
      fr: "Chiffrement bout en bout, traçabilité des accès, SSO d'entreprise et hébergement souverain.",
      en: "End-to-end encryption, immutable audit trails, enterprise SSO, and sovereign EU data residency.",
    },
    cost: 0,
  },
];

export interface SpeedOption {
  id: string;
  title: { fr: string; en: string };
  badge: { fr: string; en: string };
  desc: { fr: string; en: string };
  multiplier: number;
}

export const websiteSpeeds: SpeedOption[] = [
  {
    id: "standard",
    title: { fr: "Cadence Standard Recommandée", en: "Standard Delivery" },
    badge: { fr: "Délai normal", en: "Standard pace" },
    desc: {
      fr: "Rythme équilibré avec révisions, tests sur mobile et mise en ligne sereine.",
      en: "Balanced delivery with reviews, mobile testing and seamless launch.",
    },
    multiplier: 1.0,
  },
  {
    id: "express",
    title: { fr: "Lancement Express Accéléré", en: "Express Fast-Track" },
    badge: { fr: "Prioritaire (+10%)", en: "Priority (+10%)" },
    desc: {
      fr: "Développement en priorité absolue pour mettre votre site en ligne plus rapidement.",
      en: "Top developer priority to launch your project as fast as possible.",
    },
    multiplier: 1.1,
  },
];

export const softwareSpeeds: SpeedOption[] = [
  {
    id: "standard",
    title: { fr: "Cadence Standard Recommandée", en: "Standard Production Pace" },
    badge: { fr: "Délai normal", en: "Standard pace" },
    desc: {
      fr: "Développement itératif avec tests, validations intermédiaires et déploiement soigné.",
      en: "Steady sprints with testing phases, intermediate feedback and deployment.",
    },
    multiplier: 1.0,
  },
  {
    id: "express",
    title: { fr: "Sprint Express Accéléré", en: "Fast-Track Sprint" },
    badge: { fr: "Prioritaire (+15%)", en: "Priority (+15%)" },
    desc: {
      fr: "Mobilisation immédiate de nos développeurs pour livrer votre produit en un temps record.",
      en: "Immediate team focus to ship your working product in record time.",
    },
    multiplier: 1.15,
  },
];

export const enterpriseSpeeds: SpeedOption[] = [
  {
    id: "standard",
    title: { fr: "Cadrage & Roadmap en Sprints Dédiés", en: "Dedicated Sprint Engineering" },
    badge: { fr: "Cadrage sous 24h", en: "24h scoping" },
    desc: {
      fr: "Étude d'architecture complète, spécifications techniques et livraisons par jalons itératifs.",
      en: "Full architecture scoping, technical specifications, and milestone-based deliveries.",
    },
    multiplier: 1.0,
  },
  {
    id: "express",
    title: { fr: "Mobilisation Squad Dédiée Prioritaire", en: "Priority Engineering Squad" },
    badge: { fr: "Squad dédiée", en: "Dedicated squad" },
    desc: {
      fr: "Ingénieurs TY Dev mobilisés en priorité absolue pour concevoir et lancer votre infrastructure.",
      en: "Dedicated senior engineering team mobilized exclusively for an accelerated launch.",
    },
    multiplier: 1.0,
  },
];

export const simulatorFaq = [
  {
    q: {
      fr: "Cette estimation budgétaire est-elle contractuelle ?",
      en: "Is this price estimate legally binding?",
    },
    a: {
      fr: "Cette estimation vous donne un ordre de grandeur réaliste et transparent basé sur nos réalisations. Après échange avec notre équipe d'ingénieurs (sous 24h), nous établissons un cahier des charges détaillé avec un devis au forfait ferme sans dépassement surprise.",
      en: "This simulator provides a realistic, transparent pricing range based on our production deliveries. Following a technical discovery call (within 24h), we provide a fixed-price contract with zero surprise overages.",
    },
  },
  {
    q: {
      fr: "Comment s'organisent les paiements lors d'un projet ?",
      en: "How are project payments structured?",
    },
    a: {
      fr: "Nous fonctionnons par jalons de livraison clairs : généralement 30% d'acompte au démarrage, 40% à la livraison de la version de test intermédiaire, et 30% au déploiement final en production après votre validation complète.",
      en: "We work with clear delivery milestones: typically 30% upon project kickoff, 40% at beta delivery, and 30% upon final production deployment after your approval.",
    },
  },
  {
    q: {
      fr: "Le code source m'appartient-il à 100% à la livraison ?",
      en: "Do I own 100% of the intellectual property?",
    },
    a: {
      fr: "Oui, sans aucune exception. Vous êtes propriétaire exclusif de l'intégralité du code source, des dépôts Git, de la documentation technique et des accès d'hébergement. Aucun abonnement caché ni licence propriétaire captive.",
      en: "Yes, 100% without exception. You obtain full IP ownership of all repositories, documentation, and cloud infrastructure with zero vendor lock-in.",
    },
  },
  {
    q: {
      fr: "Que se passe-t-il après le lancement en ligne ?",
      en: "What happens after the launch?",
    },
    a: {
      fr: "Chaque projet bénéficie d'une garantie de correction de bugs offerte pendant 30 jours. Nous proposons également des forfaits de maintenance évolutive et de support réactif avec nos ingénieurs disponibles en direct sur WhatsApp et e-mail.",
      en: "Every delivery includes 30 days of free bug-fix warranty. We also provide ongoing maintenance and retainer plans with direct WhatsApp/email engineering access.",
    },
  },
];
