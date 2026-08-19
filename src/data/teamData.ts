export interface ExperienceItem {
  period: string;
  role: { fr: string; en: string };
  company: string;
  location?: string;
  description: { fr: string; en: string };
  technologies: string[];
  references?: string[];
}

export interface EducationItem {
  period: string;
  degree: { fr: string; en: string };
  institution: string;
  location?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  id?: string;
  url?: string;
}

export interface SkillCategory {
  category: { fr: string; en: string };
  skills: string[];
}

export interface TeamMemberProfile {
  slug: string;
  firstName: string;
  lastName: string;
  role: { fr: string; en: string };
  tagline: { fr: string; en: string };
  bio: { fr: string; en: string };
  image: string;
  imagePosition?: string;
  linkedin?: string;
  email?: string;
  location?: string;
  educationLevel?: { fr: string; en: string };
  certifications?: CertificationItem[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategory[];
  languages?: string[];
  quote?: { fr: string; en: string };
}

export const teamMembersData: Record<string, TeamMemberProfile> = {
  "yassine-ben-yaala": {
    slug: "yassine-ben-yaala",
    firstName: "Mohamed Yassine",
    lastName: "Ben Yaala",
    role: {
      fr: "CEO & Développeur Full Stack",
      en: "CEO & Full Stack Developer",
    },
    tagline: {
      fr: "Ingénieur logiciel spécialisé dans la conception d'applications web modernes et de solutions SaaS haute performance.",
      en: "Software engineer specialized in crafting modern web applications and high-performance SaaS platforms.",
    },
    bio: {
      fr: "Fondateur et CEO de TY Dev, passionné par l'architecture logicielle, le développement d'applications d'entreprise et les technologies web de pointe. J'accompagne les entreprises et startups dans la numérisation de leurs processus et le déploiement de produits digitaux sur mesure.",
      en: "Founder and CEO of TY Dev, passionate about software architecture, enterprise application development, and cutting-edge web technologies. I help businesses and startups digitize operations and deploy custom digital products.",
    },
    image: "/team/mohamedyassinbenyaala.jfif",
    linkedin: "https://www.linkedin.com/in/mohamed-yassine-ben-yaala-508539209/",
    email: "benyaalamedyassine24@gmail.com",
    location: "Tunisie / France",
    educationLevel: {
      fr: "Bac +5 (Master)",
      en: "Bac +5 (Master's Degree)",
    },
    languages: ["Français", "Anglais", "Arabe"],
    quote: {
      fr: "L'excellence logicielle réside dans la clarté de l'architecture, la simplicité du code et l'impact utilisateur.",
      en: "Software excellence lies in clean architecture, code simplicity, and user impact.",
    },
    experiences: [
      {
        period: "2025 – Présent",
        role: {
          fr: "CEO & Développeur Full Stack",
          en: "CEO & Full Stack Developer",
        },
        company: "LLC TY Dev",
        description: {
          fr: "Conception et développement de sites web, plateformes SaaS et solutions web sur mesure pour différents secteurs d'activité.",
          en: "Design and development of custom websites, SaaS platforms, and tailor-made web solutions across various industries.",
        },
        technologies: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
        references: ["ty-dev.site", "ty-dev.fr", "ty-dev.tech"],
      },
      {
        period: "Mars 2025 – Juin 2025",
        role: {
          fr: "Stage de fin d'études - Développeur Full Stack",
          en: "End-of-Studies Intern - Full Stack Developer",
        },
        company: "LA CAVE DE MONEY",
        location: "France",
        description: {
          fr: "Conception et développement d'une plateforme complète de gestion des stocks, des ventes et d'une boutique en ligne pour un magasin d'alimentation.",
          en: "Design and development of a full-fledged inventory management, sales tracking, and e-commerce platform for a food retail business.",
        },
        technologies: ["MongoDB", "Express.js", "React", "Node.js", "Tailwind CSS"],
      },
      {
        period: "Fév. 2023 – Juin 2023",
        role: {
          fr: "Stage de fin d'études - Développeur Web & Mobile",
          en: "End-of-Studies Intern - Web & Mobile Developer",
        },
        company: "OCTA-HUB",
        location: "Tunisie",
        description: {
          fr: "Création d'une plateforme web d'administration et d'une application mobile pour la gestion globale d'un centre de formation.",
          en: "Development of an administrative web platform and a mobile app for complete training center management.",
        },
        technologies: ["Laravel", "Ionic", "PHP", "MySQL"],
      },
    ],
    education: [
      {
        period: "2023 – 2025",
        degree: {
          fr: "Master Professionnel en Ingénierie des Logiciels et des Connaissances",
          en: "Master's Degree in Software and Knowledge Engineering",
        },
        institution: "Institut Supérieur de l'Informatique de Médenine (ISIMED)",
      },
      {
        period: "2020 – 2023",
        degree: {
          fr: "Licence en Informatique de Gestion (Parcours Business Intelligence)",
          en: "Bachelor's Degree in Business Information Systems (BI Specialization)",
        },
        institution: "Institut Supérieur d'Informatique de Mahdia (ISIMA)",
      },
      {
        period: "2019 – 2020",
        degree: {
          fr: "Baccalauréat Sciences de l'Informatique",
          en: "High School Diploma in Computer Science",
        },
        institution: "Lycée El May",
        location: "Tunisie",
      },
    ],
    skillCategories: [
      {
        category: { fr: "Langages de programmation", en: "Programming Languages" },
        skills: ["JavaScript", "TypeScript", "Python", "Java", "C", "PHP"],
      },
      {
        category: { fr: "Front-End", en: "Front-End Development" },
        skills: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Material UI"],
      },
      {
        category: { fr: "Back-End & API", en: "Back-End & API Development" },
        skills: ["Node.js", "Express.js", "Laravel", "REST APIs"],
      },
      {
        category: { fr: "Bases de données", en: "Databases & Storage" },
        skills: ["MongoDB", "MySQL"],
      },
    ],
  },

  "moutia-ben-yahia": {
    slug: "moutia-ben-yahia",
    firstName: "Moutia",
    lastName: "Ben Yahia",
    role: {
      fr: "Fondateur & CEO | Ingénieur Full Stack & IA",
      en: "Founder & CEO | Full Stack & AI Engineer",
    },
    tagline: {
      fr: "Fondateur & CEO de TY Dev, Ingénieur Full Stack & IA spécialisé dans l'architecture logicielle, la recherche sémantique et la Data Science.",
      en: "Founder & CEO of TY Dev, Full Stack & AI Engineer specialized in software architecture, semantic search, and Data Science.",
    },
    bio: {
      fr: "Fondateur et CEO de TY Dev avec 3+ ans d'expérience dans le développement de plateformes web/mobile et l'ingénierie IA. Spécialisé dans l'intégration d'algorithmes de recherche sémantique & vectorielle (PostgreSQL pgvector, Ollama), l'analyse de données (Business Intelligence & Data Science) et la création d'architectures d'entreprise performantes.",
      en: "Founder & CEO of TY Dev with 3+ years of experience building web/mobile platforms and AI engineering. Specialized in semantic & vector search integration (PostgreSQL pgvector, Ollama), data analytics (Business Intelligence & Data Science), and designing high-performance enterprise architectures.",
    },
    image: "/team/moutiabenyahia.png",
    linkedin: "https://www.linkedin.com/in/moutia-ben-yahia/?locale=fr",
    email: "benyahia.moutie@gmail.com",
    location: "Djerba, Tunisie",
    educationLevel: {
      fr: "Bac +5 (Master Data Science)",
      en: "Bac +5 (Master's in Data Science)",
    },
    languages: ["Français", "Anglais", "Arabe"],
    quote: {
      fr: "Innover en combinant l'intelligence artificielle générative et des architectures d'entreprise durables et performantes.",
      en: "Innovating by combining generative AI with sustainable, high-performance enterprise software architectures.",
    },
    experiences: [
      {
        period: "Oct. 2025 – Présent",
        role: {
          fr: "Fondateur & CEO",
          en: "Founder & CEO",
        },
        company: "LLC TY Dev",
        location: "Djerba, Tunisie",
        description: {
          fr: "Direction générale, stratégie digitale, gestion de projets et architecture technique des solutions web & IA sur mesure pour clients internationaux.",
          en: "Executive leadership, digital strategy, project management, and technical architecture for custom web & AI solutions.",
        },
        technologies: ["Leadership", "Software Architecture", "Full Stack", "Artificial Intelligence", "Management"],
        references: ["ty-dev.site", "ty-dev.fr", "ty-dev.tech"],
      },
      {
        period: "Juil. 2023 – Présent",
        role: {
          fr: "Ingénieur Full Stack & IA Freelance",
          en: "Freelance Full Stack & AI Engineer",
        },
        company: "Self-Employed",
        location: "Djerba, Tunisie",
        description: {
          fr: "Conception et réalisation d'applications web & mobiles sur mesure, intégration de modèles d'IA générative, pipelines de traitement de données et bases de données MongoDB/PostgreSQL.",
          en: "Design and development of custom web & mobile applications, generative AI integration, data processing pipelines, and MongoDB/PostgreSQL database management.",
        },
        technologies: ["Python", "MongoDB", "React", "Node.js", "AI", "PostgreSQL"],
      },
      {
        period: "Fév. 2025 – Août 2025",
        role: {
          fr: "Ingénieur ML / IA (Stage)",
          en: "ML / AI Engineer (Intern)",
        },
        company: "AWEL",
        location: "Djerba, Tunisie (Hybride)",
        description: {
          fr: "Développement et intégration d'un système de recherche avancé dans les ERP/CRM (.NET Core 9, PostgreSQL). Migration SQL Server vers PostgreSQL. Implémentation de 4 stratégies de recherche (Full-text, Fuzzy, Sémantique via Ollama & all-MiniLM, Hybride) avec les extensions pgvector, btree_gin, unaccent et pg_trgm.",
          en: "Developed advanced ERP/CRM search system (.NET Core 9, PostgreSQL). Migrated database from SQL Server to PostgreSQL. Implemented 4 search strategies (Full-text, Fuzzy, Semantic via Ollama & all-MiniLM, Hybrid) using pgvector, btree_gin, unaccent, and pg_trgm extensions.",
        },
        technologies: [".NET Core 9", "PostgreSQL", "pgvector", "Ollama", "all-MiniLM", "Semantic Search", "Hybrid Search", "Python"],
      },
      {
        period: "Juil. 2024 – Janv. 2025",
        role: {
          fr: "Développeur Web Full Stack",
          en: "Full Stack Web Developer",
        },
        company: "ABBK PhysicsWorks | SOLIDWORKS & 3DEXPERIENCE",
        location: "Djerba, Tunisie",
        description: {
          fr: "Architecture MySQL & Laravel 11. Refonte complète du site emworks.com avec Laravel 11 (Blade, Alpine.js) et stratégie SEO. Développement d'un dashboard SPA avec Vue.js & TypeScript. Extraction/migration de données avec Python (Pandas, NumPy) et web scraping automatisé (BeautifulSoup).",
          en: "Architected MySQL & Laravel 11 database. Developed emworks.com with Laravel 11, Blade, Alpine.js & SEO optimization. Built SPA dashboard using Vue.js & TypeScript. Data migration via Python (Pandas, NumPy) and automated scraping (BeautifulSoup).",
        },
        technologies: ["Laravel 11", "Vue.js", "TypeScript", "MySQL", "Alpine.js", "Pandas", "NumPy", "BeautifulSoup", "SEO"],
        references: ["emworks.com"],
      },
      {
        period: "Fév. 2023 – Mai 2023",
        role: {
          fr: "Développeur Flutter (Stage PFE)",
          en: "Flutter Developer (Graduation Intern)",
        },
        company: "Solvers Technologies (Offshore IT)",
        location: "Djerba, Tunisie",
        description: {
          fr: "Développement de modules Flutter pour un MVP ERP & CRM mobile. Création d'une application commerciale Android pour smartphones & tablettes (support portrait & paysage) selon les méthodologies Agile & Waterfall.",
          en: "Developed Flutter modules for MVP ERP & CRM mobile app. Built commercial Android app supporting smartphones & tablets with portrait/landscape modes using Agile & Waterfall methodologies.",
        },
        technologies: ["Flutter", "Dart", "Android", "Mobile ERP/CRM", "Agile", "Waterfall"],
      },
      {
        period: "Juil. 2021 – Oct. 2022",
        role: {
          fr: "Développeur Web PHP & Front-End",
          en: "PHP & Front-End Web Developer",
        },
        company: "Self-Employed",
        location: "Djerba, Tunisie",
        description: {
          fr: "Refonte et modernisation d'une plateforme de recrutement pour le monde arabe (transition MPA vers SPA, développement d'APIs REST, intégration UI/UX avec Bootstrap, JavaScript & jQuery).",
          en: "Upgrade and modernization of an Arabic job search platform (transition MPA to SPA, REST API development, interactive UI/UX with Bootstrap, JavaScript & jQuery).",
        },
        technologies: ["PHP", "REST APIs", "JavaScript", "jQuery", "Bootstrap", "CSS", "SPA"],
      },
    ],
    education: [
      {
        period: "2023 – 2025",
        degree: {
          fr: "Master en Business Analytics et Data Science",
          en: "Master's Degree in Business Analytics and Data Science",
        },
        institution: "Université Virtuelle de Tunis (UVT)",
      },
      {
        period: "2020 – 2023",
        degree: {
          fr: "Licence en Informatique de Gestion (Spécialité Business Intelligence) — Mention Très Bien",
          en: "Bachelor's Degree in Business Computing (BI Specialization) — Distinction Very Good",
        },
        institution: "Institut Supérieur d'Informatique de Mahdia (ISIMA)",
      },
      {
        period: "2019 – 2020",
        degree: {
          fr: "Baccalauréat Économie & Gestion",
          en: "High School Diploma in Economics & Management",
        },
        institution: "Lycée Djerba",
      },
    ],
    skillCategories: [
      {
        category: { fr: "Intelligence Artificielle & Data", en: "Artificial Intelligence & Data" },
        skills: ["Machine Learning", "Recherche Sémantique", "pgvector", "Ollama", "Business Analytics", "Data Warehousing", "Data Science", "Pandas", "NumPy"],
      },
      {
        category: { fr: "Langages & Frameworks", en: "Languages & Frameworks" },
        skills: ["Python", "C#", ".NET Core 9", "PHP", "Laravel 11", "TypeScript", "JavaScript", "Dart", "Flutter"],
      },
      {
        category: { fr: "Front-End & UI/UX", en: "Front-End & UI/UX" },
        skills: ["React", "Vue.js", "Alpine.js", "Tailwind CSS", "Bootstrap", "jQuery", "HTML5/CSS3"],
      },
      {
        category: { fr: "Bases de données & Architecture", en: "Databases & Architecture" },
        skills: ["PostgreSQL", "MySQL", "MongoDB", "SQL Server", "REST APIs", "Software Architecture", "Web Scraping"],
      },
    ],
  },

  "amine-ben-ammar": {
    slug: "amine-ben-ammar",
    firstName: "Amine",
    lastName: "Ben Ammar",
    role: {
      fr: "Co-Fondateur | Développeur Full Stack",
      en: "Co-Founder | Full Stack Developer",
    },
    tagline: {
      fr: "Co-fondateur & Développeur Full Stack chez TY Dev, spécialisé dans la conception de plateformes SaaS e-commerce et l'architecture web d'entreprise.",
      en: "Co-founder & Full Stack Developer at TY Dev, specializing in SaaS e-commerce platforms and enterprise web architecture.",
    },
    bio: {
      fr: "Co-fondateur chez TY Dev, apportant son expertise technique et fonctionnelle en ingénierie logicielle et développement Full Stack. Diplômé en Informatique de Gestion (spécialité Business Intelligence) avec Mention Très Bien, il conçoit des plateformes SaaS e-commerce performantes, modulaires, hautement sécurisées et optimisées pour la croissance des entreprises.",
      en: "Co-founder at TY Dev, bringing technical and domain expertise in software engineering and Full Stack development. Graduated in Business Computing (BI Specialization) with Distinction Very Good, he designs scalable, modular, highly secure e-commerce SaaS platforms optimized for business growth.",
    },
    image: "/team/aminebenamamr.jpg",
    imagePosition: "object-[50%_15%]",
    linkedin: "https://www.linkedin.com/",
    email: "amine.benammar17@gmail.com",
    location: "Djerba, Tunisie",
    educationLevel: {
      fr: "Bac +3 (Licence Informatique)",
      en: "Bac +3 (Bachelor's Degree in Business Computing)",
    },
    languages: ["Français", "Anglais", "Arabe"],
    quote: {
      fr: "Concevoir des plateformes SaaS modulaires, sécurisées et optimisées pour propulser la croissance des entreprises.",
      en: "Designing modular, secure, and growth-oriented SaaS platforms to empower modern businesses.",
    },
    experiences: [
      {
        period: "2025 – Présent",
        role: {
          fr: "Co-Fondateur & Développeur Full Stack",
          en: "Co-Founder & Full Stack Developer",
        },
        company: "LLC TY Dev",
        location: "Djerba, Tunisie",
        description: {
          fr: "Co-fondateur de TY Dev. Conception et développement d'applications web d'entreprise, architectures SaaS modernes, systèmes e-commerce sur mesure et intégration d'APIs high-performance.",
          en: "Co-founder at TY Dev. Design and development of enterprise web applications, modern SaaS architectures, custom e-commerce systems, and high-performance API integrations.",
        },
        technologies: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
        references: ["ty-dev.site", "ty-dev.fr", "ty-dev.tech"],
      },
      {
        period: "Fév. 2023 – Juin 2023",
        role: {
          fr: "Développeur Full Stack (Stage PFE)",
          en: "Full Stack Developer (Graduation Intern)",
        },
        company: "AZ DEV PLUS",
        location: "Tunisie",
        description: {
          fr: "Conception et développement d'une plateforme SaaS e-commerce complète. Architecture de la base de données, gestion du catalogue produits, intégration des passerelles de paiement et création d'un tableau de bord d'administration dynamique.",
          en: "Design and development of an end-to-end e-commerce SaaS platform. Database architecture, product catalog management, payment gateway integration, and dynamic admin dashboard.",
        },
        technologies: ["React", "Node.js", "Express.js", "MongoDB", "REST APIs", "SaaS Architecture", "Tailwind CSS"],
      },
    ],
    education: [
      {
        period: "2020 – 2023",
        degree: {
          fr: "Licence en Informatique de Gestion (Spécialité Business Intelligence) — Mention Très Bien",
          en: "Bachelor's Degree in Business Computing (BI Specialization) — Distinction Very Good",
        },
        institution: "Institut Supérieur d'Informatique de Mahdia (ISIMA)",
      },
      {
        period: "2019 – 2020",
        degree: {
          fr: "Baccalauréat Économie & Gestion",
          en: "High School Diploma in Economics & Management",
        },
        institution: "Lycée Djerba",
      },
    ],
    skillCategories: [
      {
        category: { fr: "Front-End & UI/UX", en: "Front-End & UI/UX" },
        skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5/CSS3", "Tailwind CSS"],
      },
      {
        category: { fr: "Back-End & SaaS", en: "Back-End & SaaS" },
        skills: ["Node.js", "Express.js", "REST APIs", "Architecture SaaS", "E-Commerce Systems"],
      },
      {
        category: { fr: "Bases de données & BI", en: "Databases & BI" },
        skills: ["MongoDB", "MySQL", "Business Intelligence", "Data Modeling"],
      },
      {
        category: { fr: "Outils & Méthodes", en: "Tools & Methods" },
        skills: ["Git", "GitHub", "Agile", "VS Code"],
      },
    ],
  },

  "mohamed-ben-khemis": {
    slug: "mohamed-ben-khemis",
    firstName: "Mohamed",
    lastName: "Ben Khemis",
    role: {
      fr: "Site Reliability Engineer | Cloud Platform Engineer",
      en: "Site Reliability Engineer | Cloud Platform Engineer",
    },
    tagline: {
      fr: "Ingénieur SRE certifié CKAD spécialisé dans la conception et l'exploitation d'infrastructures Cloud Native & Kubernetes (AWS, GCP).",
      en: "CKAD-certified SRE & Cloud Platform Engineer specializing in designing and operating large-scale Cloud Native & Kubernetes platforms (AWS, GCP).",
    },
    bio: {
      fr: "Ingénieur SRE avec 5+ ans d'expérience dans l'architecture multi-cloud, les plateformes Kubernetes avec accélération GPU pour l'IA/LLM, l'automatisation GitOps et le déploiement massif d'environnements cloud. Contributeur aux projets SaaS à fort trafic (Takiacademy ~400K utilisateurs, Messaggera ~50K utilisateurs) et aux logiciels open-source tels que Kubeflow.",
      en: "Site Reliability Engineer with 5+ years of experience building multi-cloud architectures, GPU-enabled Kubernetes platforms for AI/LLM workloads, GitOps automation, and high-scale cloud environments. Contributor to high-traffic SaaS products (Takiacademy ~400K users, Messaggera ~50K users) and open-source projects including Kubeflow.",
    },
    image: "/team/mohamedbenkhemis.jfif",
    linkedin: "https://www.linkedin.com/in/benkhemis/?locale=fr",
    email: "khemis.mb@gmail.com",
    location: "Paris, France",
    educationLevel: {
      fr: "Bac +3 (Licence Informatique)",
      en: "Bac +3 (Bachelor's Degree in Computer Science)",
    },
    languages: ["Français", "Anglais", "Arabe"],
    quote: {
      fr: "Automatisation, résilience et haute disponibilité pour des infrastructures Cloud-Native fluides et évolutives.",
      en: "Automation, resilience, and high availability for seamless, scalable Cloud-Native infrastructure.",
    },
    certifications: [
      {
        title: "Certified Kubernetes Application Developer (CKAD)",
        issuer: "Linux Foundation",
        id: "LF-rd30qu1ywb",
      },
    ],
    experiences: [
      {
        period: "Oct. 2022 – Présent",
        role: {
          fr: "Site Reliability Engineer | Cloud Platform Engineer",
          en: "Site Reliability Engineer | Cloud Platform Engineer",
        },
        company: "Gomydesk",
        location: "California, USA (Remote)",
        description: {
          fr: "Conception et exploitation de clusters Kubernetes avec support GPU (GKE/EKS) permettant de déployer +1000 bureaux cloud en < 60s. Réduction de 33% des coûts cloud via Kubecost. Implémentation de pipelines CI/CD GitOps (ArgoCD), stack d'observabilité complète (Prometheus, Grafana, Loki, Alloy, Faro) et scripts d'automatisation Bash/Python.",
          en: "Designed and operated GPU-enabled Kubernetes (GKE/EKS) clusters (deploying 1000+ desktops in < 60s). Reduced cloud costs by 33% using Kubecost. Implemented GitOps CI/CD (ArgoCD), full observability stack (Prometheus, Grafana, Loki, Alloy, Faro), and Bash/Python automation.",
        },
        technologies: [
          "Kubernetes",
          "GKE",
          "EKS",
          "ArgoCD",
          "Kubecost",
          "Prometheus",
          "Grafana",
          "Loki",
          "Alloy",
          "Faro",
          "Python",
          "Bash",
        ],
      },
      {
        period: "Oct. 2024 – Déc. 2025",
        role: {
          fr: "Site Reliability Engineer | Cloud Platform Engineer",
          en: "Site Reliability Engineer | Cloud Platform Engineer",
        },
        company: "Serveden",
        location: "California, USA (Remote)",
        description: {
          fr: "Conception et gestion de clusters Amazon EKS optimisés pour les charges IA/LLM. Déploiement de l'opérateur NVIDIA GPU pour l'accélération matérielle sur Kubernetes. Mise en place de la stack d'observabilité (Prometheus, Grafana, Loki, Tempo, Faro) et développement d'une API d'automatisation du cycle de vie des clusters EKS.",
          en: "Designed and managed Amazon EKS clusters optimized for AI/LLM workloads. Deployed NVIDIA GPU Operator for GPU-accelerated workloads on Kubernetes. Implemented full observability stack (Prometheus, Grafana, Loki, Tempo, Faro) and built automated K8s cluster lifecycle API.",
        },
        technologies: [
          "Amazon EKS",
          "NVIDIA GPU Operator",
          "Kubernetes",
          "Prometheus",
          "Grafana",
          "Loki",
          "Tempo",
          "Faro",
          "Python",
          "Terraform",
        ],
      },
      {
        period: "Oct. 2020 – Oct. 2021",
        role: {
          fr: "Backend & Platform Engineer",
          en: "Backend & Platform Engineer",
        },
        company: "Takiacademy",
        location: "Sousse, Tunisie",
        description: {
          fr: "Conception et développement de l'architecture complète du MVP de Messaggera (50K+ utilisateurs). Contribution à la plateforme d'apprentissage TakiAcademy (400K+ utilisateurs) en améliorant la fiabilité, le monitoring et les systèmes temps réel (Socket.IO). Déploiement des serveurs Jenkins & GitLab CI.",
          en: "Designed and built end-to-end MVP for Messaggera (50K+ users). Contributed to TakiAcademy platform (400K+ users), improving reliability, monitoring, real-time systems (Socket.IO), and deploying Jenkins & GitLab CI servers.",
        },
        technologies: [
          "Node.js",
          "Socket.IO",
          "Jenkins",
          "GitLab CI",
          "Monitoring",
          "Backend",
        ],
      },
    ],
    education: [
      {
        period: "2020",
        degree: {
          fr: "Bachelor Degree in Computer Science (Licence en Informatique)",
          en: "Bachelor's Degree in Computer Science",
        },
        institution: "Horizon School of Digital Technologies",
      },
    ],
    skillCategories: [
      {
        category: { fr: "Langages & Développement", en: "Languages & Development" },
        skills: ["Go", "Python", "Node.js", "Bash", "REST APIs", "gRPC", "React", "React Native"],
      },
      {
        category: { fr: "Cloud & Kubernetes", en: "Cloud & Kubernetes" },
        skills: ["Docker", "Kubernetes", "Amazon EKS", "GKE", "AKS", "Helm", "Istio", "AWS", "GCP", "Azure", "CloudWatch"],
      },
      {
        category: { fr: "Observabilité & SRE", en: "Observability & SRE" },
        skills: ["Prometheus", "Grafana", "Loki", "Tempo", "Faro", "Alerting", "Incident Management", "SLO/SLI"],
      },
      {
        category: { fr: "Infrastructure & Automation", en: "Infrastructure & Automation" },
        skills: ["Terraform", "Terragrunt", "GitHub Actions", "GitLab CI", "Jenkins", "ArgoCD", "FluxCD", "CI/CD", "Linux", "Flagsmith"],
      },
    ],
  },

  "mohamed-ben-yahia": {
    slug: "mohamed-ben-yahia",
    firstName: "Mohamed",
    lastName: "Ben Yahia",
    role: {
      fr: "Développeur Full Stack & Web Mobile",
      en: "Full Stack & Mobile Developer",
    },
    tagline: {
      fr: "Développeur Full Stack & Web Mobile chez TY Dev, spécialisé dans la création d'applications web interactives et d'interfaces utilisateur modernes.",
      en: "Full Stack & Mobile Developer at TY Dev, specialized in crafting interactive web apps and modern user interfaces.",
    },
    bio: {
      fr: "Développeur Full Stack passionné par l'ingénierie web et le développement d'applications réactives chez TY Dev. Étudiant en Licence d'Informatique à la Faculté des Sciences (FSG), il combine une solide formation scientifique avec la maîtrise des technologies modernes (React, TypeScript, Node.js, Express, MongoDB).",
      en: "Full Stack developer passionate about web engineering and responsive app development at TY Dev. Computer Science student at the Faculty of Sciences (FSG), combining solid academic knowledge with modern web stack mastery (React, TypeScript, Node.js, Express, MongoDB).",
    },
    image: "/team/mohamedbenyahia.jpg",
    linkedin: "https://www.linkedin.com/in/mohamd-ben-yahia-4685ab207/",
    email: "benyahiamohamd@gmail.com",
    location: "Djerba, Tunisie",
    educationLevel: {
      fr: "Bac +3 (Licence Informatique)",
      en: "Bac +3 (Bachelor's Degree in Computer Science)",
    },
    languages: ["Français", "Anglais", "Arabe"],
    quote: {
      fr: "Créer des interfaces réactives et intuitives qui offrent une expérience utilisateur fluide et captivante.",
      en: "Crafting intuitive and responsive user interfaces that deliver seamless digital experiences.",
    },
    experiences: [
      {
        period: "2025 – Présent",
        role: {
          fr: "Développeur Full Stack & Mobile",
          en: "Full Stack & Mobile Developer",
        },
        company: "LLC TY Dev",
        location: "Djerba, Tunisie",
        description: {
          fr: "Conception et développement de fonctionnalités web et mobiles interactives pour les projets TY Dev. Intégration de maquettes UI/UX réactives, développement d'APIs REST modulaires et optimisation des performances front-end.",
          en: "Design and development of interactive web and mobile features for TY Dev projects. Responsive UI/UX implementation, modular REST API development, and front-end performance optimization.",
        },
        technologies: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
        references: ["ty-dev.site", "ty-dev.fr", "ty-dev.tech"],
      },
      {
        period: "2023 – 2025",
        role: {
          fr: "Développeur Web & Mobile (Projets Académiques)",
          en: "Web & Mobile Developer (Academic Projects)",
        },
        company: "Faculté des Sciences (FSG)",
        location: "Tunisie",
        description: {
          fr: "Réalisation d'applications web full stack et de prototypes mobiles. Modélisation de bases de données relationnelles (MySQL) et NoSQL (MongoDB), création de tableaux de bord et intégration d'APIs externes.",
          en: "Development of full stack web applications and mobile prototypes. Relational (MySQL) and NoSQL (MongoDB) database modeling, dashboard creation, and third-party API integration.",
        },
        technologies: ["JavaScript", "React", "Node.js", "PHP", "MySQL", "MongoDB", "HTML5/CSS3"],
      },
    ],
    education: [
      {
        period: "2023 – 2026",
        degree: {
          fr: "Licence en Informatique (FSG)",
          en: "Bachelor's Degree in Computer Science (FSG)",
        },
        institution: "Faculté des Sciences (FSG)",
        location: "Tunisie",
      },
      {
        period: "2022 – 2023",
        degree: {
          fr: "Baccalauréat Sciences de l'Informatique",
          en: "High School Diploma in Computer Science",
        },
        institution: "Lycée Djerba",
        location: "Djerba, Tunisie",
      },
    ],
    skillCategories: [
      {
        category: { fr: "Front-End & Mobile", en: "Front-End & Mobile" },
        skills: ["React", "TypeScript", "JavaScript", "HTML5/CSS3", "Tailwind CSS", "Responsive Design"],
      },
      {
        category: { fr: "Back-End & APIs", en: "Back-End & APIs" },
        skills: ["Node.js", "Express.js", "PHP", "REST APIs"],
      },
      {
        category: { fr: "Bases de données", en: "Databases" },
        skills: ["MongoDB", "MySQL", "PostgreSQL"],
      },
      {
        category: { fr: "Outils de développement", en: "Development Tools" },
        skills: ["Git", "GitHub", "VS Code", "Postman"],
      },
    ],
  },
};
