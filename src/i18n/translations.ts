export type Lang = "en" | "fr";

const en = {
  nav: {
    home: "Home",
    services: "Services",
    portfolio: "Portfolio",
    about: "About",
    contact: "Contact",
    cta: "Start a Project",
  },
  hero: {
    eyebrow: "AI-DRIVEN SOFTWARE AGENCY",
    title1: "We Build Software That ",
    titleAccent: "Scales.",
    subtitle:
      "Custom SaaS platforms, AI automation systems, and high-performance web applications — engineered for real business growth.",
    cta1: "Start a Project",
    cta2: "View Our Work",
    trust: "Trusted by businesses across France, Switzerland, the UK & worldwide.",
  },
  stats: [
    { value: 50, suffix: "+", label: "Projects Delivered" },
    { value: 3, suffix: "+", label: "Years Experience" },
    { value: 15, suffix: "+", label: "Technologies Mastered" },
    { value: 100, suffix: "%", label: "Client Satisfaction" },
  ],
  services: {
    title: "What We Build",
    subtitle: "End-to-end digital solutions — from architecture to deployment.",
    items: [
      { title: "Custom SaaS Development", desc: "Scalable multi-tenant platforms built for growth" },
      { title: "Web Applications", desc: "Modern, fast, and user-centric web experiences" },
      { title: "AI Automation", desc: "Intelligent systems that streamline your operations" },
      { title: "Business Automation", desc: "Workflow automation that saves time and reduces costs" },
      { title: "E-Commerce Platforms", desc: "High-converting stores with operational automation" },
      { title: "API & Integrations", desc: "Connecting your tools into one powerful ecosystem" },
      { title: "Cloud Infrastructure", desc: "Scalable, secure, and resilient cloud architectures" },
      { title: "Admin Dashboards", desc: "Custom panels and portals for full business control" },
    ],
  },
  portfolio: {
    title: "Our Work",
    subtitle: "Real projects. Real results.",
    viewProject: "View Project",
    more: "More projects coming soon — we're always building.",
    items: [
      {
        category: "Automotive · Prestige Transport",
        title: "AA Motors",
        desc: "Premium website for a French prestige vehicle transport and breakdown specialist. Serving clients across France and Europe — elegance, discretion, and security at the core.",
        url: "https://aa-motors.fr",
      },
      {
        category: "HVAC · Local Services",
        title: "Climabat.34",
        desc: "Modern website for a heating, air conditioning, and ventilation specialist — showcasing expertise and driving local client trust.",
        url: "https://climabat34.fr",
      },
      {
        category: "Premium Transport · VTC",
        title: "IC VTC 35",
        desc: "High-end website for a luxury VTC and premium transport service based in Rennes, France.",
        url: "https://icvtc35.fr",
      },
      {
        category: "Automotive · Premium Cleaning",
        title: "Ouzouri Car'Wash",
        desc: "Premium car wash website for a specialist in upscale automotive cleaning services in Lorient.",
        url: "https://ouzouri97carwash.fr",
      },
    ],
  },
  why: {
    title: "Why TY Dev?",
    body: "We don't just write code. We architect intelligent digital ecosystems that automate, scale, and perform — built around your real business objectives.",
    features: [
      { title: "Performance First", desc: "Sub-second load times, optimized for scale" },
      { title: "Security by Design", desc: "Built with enterprise-grade security principles" },
      { title: "AI-Native Approach", desc: "Automation and intelligence embedded from day one" },
      { title: "Global Standards", desc: "International clients, European quality, world-class delivery" },
    ],
  },
  tech: {
    title: "Our Tech Stack",
    subtitle: "The tools we use to build at scale.",
  },
  process: {
    title: "How We Work",
    subtitle: "A clear, structured process — from first call to final delivery.",
    steps: [
      { title: "Discovery", desc: "We understand your goals, constraints, and vision." },
      { title: "Architecture", desc: "We design the technical blueprint and define the roadmap." },
      { title: "Development", desc: "We build, test, and iterate in sprints with full transparency." },
      { title: "Launch & Scale", desc: "We deploy, monitor, and support your growth." },
    ],
  },
  about: {
    title: "About TY Dev",
    body: "TY Dev is a software development agency founded in 2025, headquartered in Sheridan, Wyoming, with a team operating globally. We specialize in custom software, SaaS platforms, AI automation, and modern web development — helping startups, e-commerce brands, and growing businesses build technology that scales. We combine engineering rigor, design precision, and automation-first thinking to deliver solutions that create real, measurable impact.",
    badges: ["Global Reach", "AI-Driven", "Automation First", "Founded 2025"],
  },
  contact: {
    title: "Start Your Project",
    subtitle: "Tell us about your idea. We'll respond within 24 hours.",
    form: {
      name: "Full Name",
      email: "Email",
      phone: "Phone (optional)",
      type: "Project Type",
      typeOptions: ["SaaS Platform", "Web Application", "AI Automation", "E-Commerce", "Other"],
      budget: "Budget Range",
      budgetOptions: ["< €5K", "€5K–€15K", "€15K–€50K", "€50K+"],
      desc: "Project Description",
      descPlaceholder: "Tell us about your project...",
      submit: "Send Message",
      note: "🔒 Your information is confidential and never shared.",
      success: "Message sent — we'll be in touch within 24 hours.",
    },
  },
  footer: {
    tagline: "Engineering the future of digital business.",
    services: "Services",
    company: "Company",
    connect: "Connect",
    companyLinks: ["About", "Portfolio", "Contact", "Blog (coming soon)"],
    rights: "© 2026 TY Dev. All rights reserved.",
    made: "Made with precision.",
  },
};

const fr: typeof en = {
  nav: {
    home: "Accueil",
    services: "Services",
    portfolio: "Réalisations",
    about: "À Propos",
    contact: "Contact",
    cta: "Démarrer un Projet",
  },
  hero: {
    eyebrow: "AGENCE LOGICIELLE IA",
    title1: "Nous Créons des Logiciels qui ",
    titleAccent: "Évoluent.",
    subtitle:
      "Plateformes SaaS, automatisation IA et applications web haute performance — conçues pour une vraie croissance.",
    cta1: "Démarrer un Projet",
    cta2: "Voir Nos Projets",
    trust: "Reconnus par des entreprises en France, en Suisse, au Royaume-Uni et à l'international.",
  },
  stats: [
    { value: 50, suffix: "+", label: "Projets Livrés" },
    { value: 3, suffix: "+", label: "Ans d'Expérience" },
    { value: 15, suffix: "+", label: "Technologies Maîtrisées" },
    { value: 100, suffix: "%", label: "Satisfaction Client" },
  ],
  services: {
    title: "Ce Que Nous Créons",
    subtitle: "Solutions digitales complètes — de l'architecture au déploiement.",
    items: [
      { title: "Développement SaaS", desc: "Plateformes multi-tenants scalables pour la croissance" },
      { title: "Applications Web", desc: "Expériences web modernes, rapides et centrées utilisateur" },
      { title: "Automatisation IA", desc: "Systèmes intelligents qui optimisent vos opérations" },
      { title: "Automatisation Business", desc: "Workflows automatisés qui économisent temps et coûts" },
      { title: "Plateformes E-Commerce", desc: "Boutiques performantes avec automatisation opérationnelle" },
      { title: "API & Intégrations", desc: "Connecter vos outils en un écosystème puissant" },
      { title: "Infrastructure Cloud", desc: "Architectures cloud scalables, sécurisées et résilientes" },
      { title: "Dashboards Admin", desc: "Panneaux et portails sur mesure pour piloter votre business" },
    ],
  },
  portfolio: {
    title: "Nos Réalisations",
    subtitle: "Des projets concrets. Des résultats réels.",
    viewProject: "Voir le Projet",
    more: "D'autres projets arrivent — nous créons en permanence.",
    items: [
      {
        category: "Automobile · Transport Prestige",
        title: "AA Motors",
        desc: "Site premium pour un spécialiste du transport et dépannage de véhicules de prestige. Interventions en France et en Europe — élégance, discrétion et sécurité.",
        url: "https://aa-motors.fr",
      },
      {
        category: "CVC · Services Locaux",
        title: "Climabat.34",
        desc: "Site moderne pour un spécialiste du chauffage, climatisation et ventilation — valoriser l'image et renforcer la confiance client.",
        url: "https://climabat34.fr",
      },
      {
        category: "Transport Premium · VTC",
        title: "IC VTC 35",
        desc: "Site haut de gamme pour un service VTC premium basé à Rennes.",
        url: "https://icvtc35.fr",
      },
      {
        category: "Automobile · Nettoyage Premium",
        title: "Ouzouri Car'Wash",
        desc: "Site premium pour un spécialiste du nettoyage automobile haut de gamme à Lorient.",
        url: "https://ouzouri97carwash.fr",
      },
    ],
  },
  why: {
    title: "Pourquoi TY Dev ?",
    body: "Nous ne nous contentons pas d'écrire du code. Nous architecturons des écosystèmes numériques intelligents qui automatisent, scalent et performent — centrés sur vos objectifs business réels.",
    features: [
      { title: "Performance d'Abord", desc: "Temps de chargement sous la seconde, optimisé pour scaler" },
      { title: "Sécurité Native", desc: "Conçu avec des principes de sécurité enterprise" },
      { title: "Approche AI-Native", desc: "Automatisation et intelligence intégrées dès le jour un" },
      { title: "Standards Mondiaux", desc: "Clients internationaux, qualité européenne, livraison de classe mondiale" },
    ],
  },
  tech: {
    title: "Notre Stack Technique",
    subtitle: "Les outils que nous utilisons pour bâtir à grande échelle.",
  },
  process: {
    title: "Notre Méthode",
    subtitle: "Un processus clair et structuré — du premier appel à la livraison finale.",
    steps: [
      { title: "Découverte", desc: "Nous comprenons vos objectifs, contraintes et vision." },
      { title: "Architecture", desc: "Nous concevons le blueprint technique et la roadmap." },
      { title: "Développement", desc: "Nous construisons, testons et itérons en sprints transparents." },
      { title: "Lancement & Scale", desc: "Nous déployons, surveillons et accompagnons votre croissance." },
    ],
  },
  about: {
    title: "À Propos de TY Dev",
    body: "TY Dev est une agence de développement logiciel fondée en 2025, basée à Sheridan, Wyoming, avec une équipe qui opère à l'international. Nous sommes spécialisés dans le logiciel sur mesure, les plateformes SaaS, l'automatisation IA et le développement web moderne — accompagnant startups, marques e-commerce et entreprises en croissance pour créer des technologies qui scalent.",
    badges: ["Portée Mondiale", "IA-Driven", "Automatisation d'Abord", "Fondée en 2025"],
  },
  contact: {
    title: "Démarrez Votre Projet",
    subtitle: "Parlez-nous de votre projet. Nous répondons sous 24h.",
    form: {
      name: "Nom Complet",
      email: "Email",
      phone: "Téléphone (optionnel)",
      type: "Type de Projet",
      typeOptions: ["Plateforme SaaS", "Application Web", "Automatisation IA", "E-Commerce", "Autre"],
      budget: "Budget",
      budgetOptions: ["< 5K€", "5K€–15K€", "15K€–50K€", "50K€+"],
      desc: "Description du Projet",
      descPlaceholder: "Parlez-nous de votre projet...",
      submit: "Envoyer le Message",
      note: "🔒 Vos informations sont confidentielles et jamais partagées.",
      success: "Message envoyé — nous revenons vers vous sous 24h.",
    },
  },
  footer: {
    tagline: "Nous façonnons l'avenir du business numérique.",
    services: "Services",
    company: "Entreprise",
    connect: "Réseaux",
    companyLinks: ["À Propos", "Réalisations", "Contact", "Blog (bientôt)"],
    rights: "© 2026 TY Dev. Tous droits réservés.",
    made: "Conçu avec précision.",
  },
};

export type Dict = typeof en;
export const translations: Record<Lang, Dict> = { en, fr };
