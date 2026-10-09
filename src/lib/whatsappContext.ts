export interface WhatsAppContextConfig {
  message: string;
  tooltip: string;
  badge?: string;
  ariaLabel: string;
}

export const OFFICIAL_WHATSAPP_PHONE = "33759440105";

export function getContextualWhatsAppConfig(
  pathname: string,
  lang: "fr" | "en" = "fr"
): WhatsAppContextConfig {
  const cleanPath = (pathname || "/").toLowerCase();

  // 1. Simulateur de Devis (/simulateur)
  if (cleanPath.startsWith("/simulateur")) {
    return {
      message:
        lang === "fr"
          ? "Bonjour TY Dev, j'utilise votre simulateur de devis en ligne et j'aimerais échanger directement avec vous sur mon estimation et mon cahier des charges."
          : "Hello TY Dev, I am using your online quote simulator and would like to discuss my project estimate and requirements with an engineer.",
      tooltip:
        lang === "fr"
          ? "Échanger sur mon estimation (WhatsApp)"
          : "Discuss my quote on WhatsApp",
      badge: lang === "fr" ? "Devis Express" : "Fast Quote",
      ariaLabel:
        lang === "fr"
          ? "Échanger sur mon devis en direct sur WhatsApp"
          : "Discuss project quote on WhatsApp",
    };
  }

  // 2. Article Spécifique : Coût MVP SaaS 2026
  if (cleanPath.includes("cout-mvp-saas")) {
    return {
      message:
        lang === "fr"
          ? "Bonjour Mohamed Yassine & TY Dev, j'ai lu votre guide complet sur le coût d'un MVP SaaS en 2026 et j'aimerais échanger sur la faisabilité et le budget de mon projet."
          : "Hello TY Dev, I read your complete 2026 SaaS MVP pricing guide and would like to discuss feasibility and budget for my project.",
      tooltip:
        lang === "fr"
          ? "Échanger sur mon MVP SaaS (WhatsApp)"
          : "Chat about my SaaS MVP",
      badge: lang === "fr" ? "Projet MVP" : "MVP Scoping",
      ariaLabel:
        lang === "fr"
          ? "Échanger sur mon projet MVP SaaS sur WhatsApp"
          : "Discuss SaaS MVP on WhatsApp",
    };
  }

  // 3. Article Spécifique : Agence France vs Offshore
  if (cleanPath.includes("agence-web-france-vs-offshore") || cleanPath.includes("offshore")) {
    return {
      message:
        lang === "fr"
          ? "Bonjour TY Dev, j'ai lu votre comparatif Agence France vs Offshore et je souhaite confier le développement de notre logiciel à votre équipe d'ingénieurs."
          : "Hello TY Dev, I read your France vs Offshore agency comparison and would like to entrust our software development to your team.",
      tooltip:
        lang === "fr"
          ? "Conseil cadrage tech (WhatsApp)"
          : "Technical scoping advice",
      ariaLabel:
        lang === "fr"
          ? "Demander un conseil tech sur WhatsApp"
          : "Request tech advice on WhatsApp",
    };
  }

  // 4. Blog Général (/blog ou autre article)
  if (cleanPath.startsWith("/blog")) {
    return {
      message:
        lang === "fr"
          ? "Bonjour TY Dev, j'ai lu votre publication technique sur votre blog et j'aimerais échanger avec un ingénieur concernant notre projet."
          : "Hello TY Dev, I read your technical article on your blog and would like to discuss our project with an engineer.",
      tooltip:
        lang === "fr"
          ? "Question sur un projet (WhatsApp)"
          : "Question about a project",
      ariaLabel:
        lang === "fr"
          ? "Poser une question technique sur WhatsApp"
          : "Ask a technical question on WhatsApp",
    };
  }

  // 5. Service Spécifique : Intégration IA & LLM
  if (cleanPath.includes("integration-ia-llm") || cleanPath.includes("ia")) {
    return {
      message:
        lang === "fr"
          ? "Bonjour l'équipe TY Dev, je m'intéresse à vos solutions d'intégration d'Agents IA, LLM et RAG pour automatiser nos processus métiers."
          : "Hello TY Dev team, I am interested in your AI Agents, LLM and RAG integration services to automate our workflows.",
      tooltip:
        lang === "fr"
          ? "Projet Agents IA & LLM (WhatsApp)"
          : "AI Agents & LLM Project",
      badge: "IA & RAG",
      ariaLabel:
        lang === "fr"
          ? "Échanger sur un projet d'agent IA sur WhatsApp"
          : "Discuss AI project on WhatsApp",
    };
  }

  // 6. Service Spécifique : SaaS Sur-Mesure
  if (cleanPath.includes("saas-sur-mesure")) {
    return {
      message:
        lang === "fr"
          ? "Bonjour TY Dev, je cherche une équipe d'ingénieurs pour concevoir et développer une plateforme SaaS sur-mesure (multi-tenancy, Stripe, haute disponibilité)."
          : "Hello TY Dev, I am looking for software architects to design and build a custom SaaS platform (multi-tenancy, Stripe, high availability).",
      tooltip:
        lang === "fr"
          ? "Cadrage SaaS sur-mesure (WhatsApp)"
          : "Custom SaaS Scoping",
      badge: "SaaS Pro",
      ariaLabel:
        lang === "fr"
          ? "Cadrer mon SaaS sur-mesure sur WhatsApp"
          : "Scope custom SaaS on WhatsApp",
    };
  }

  // 7. Service Spécifique : DevOps & Cloud Infrastructure
  if (cleanPath.includes("devops-cloud-infrastructure")) {
    return {
      message:
        lang === "fr"
          ? "Bonjour TY Dev, nous avons besoin d'un accompagnement DevOps & Cloud Infrastructure pour notre plateforme (Docker, Kubernetes, CI/CD, FinOps)."
          : "Hello TY Dev, we need DevOps & Cloud Infrastructure engineering support for our platform (Docker, Kubernetes, CI/CD, FinOps).",
      tooltip:
        lang === "fr"
          ? "Conseil DevOps & Cloud (WhatsApp)"
          : "DevOps & Cloud advice",
      ariaLabel:
        lang === "fr"
          ? "Conseil DevOps et Cloud sur WhatsApp"
          : "DevOps and Cloud consultation on WhatsApp",
    };
  }

  // 8. Étude de Cas Spécifique : NaviCab (/projets/navicab)
  if (cleanPath.includes("navicab")) {
    return {
      message:
        lang === "fr"
          ? "Bonjour TY Dev, j'ai analysé votre étude de cas NaviCab (dispatching temps réel et écosystème SaaS) et j'aimerais échanger sur un projet similaire."
          : "Hello TY Dev, I reviewed your NaviCab case study (real-time dispatch and SaaS ecosystem) and would like to discuss building a similar platform.",
      tooltip:
        lang === "fr"
          ? "Échanger sur le projet NaviCab"
          : "Discuss NaviCab project",
      badge: "Étude NaviCab",
      ariaLabel:
        lang === "fr"
          ? "Échanger sur le projet NaviCab sur WhatsApp"
          : "Discuss NaviCab project on WhatsApp",
    };
  }

  // 9. Service Spécifique : SaaS Transport & Dispatching
  if (cleanPath.includes("saas-transport-logistique")) {
    return {
      message:
        lang === "fr"
          ? "Bonjour TY Dev, j'ai découvert votre expertise en SaaS Transport & Dispatching et j'aimerais échanger sur la conception d'une solution de mobilité similaire."
          : "Hello TY Dev, I discovered your Transport & Dispatching SaaS expertise and would like to discuss building a mobility platform.",
      tooltip:
        lang === "fr"
          ? "Projet Mobilité & Transport (WhatsApp)"
          : "Mobility & Transport Project",
      ariaLabel:
        lang === "fr"
          ? "Échanger sur une solution de transport sur WhatsApp"
          : "Discuss transport solution on WhatsApp",
    };
  }

  // 9. Autres Services (/services)
  if (cleanPath.startsWith("/services")) {
    return {
      message:
        lang === "fr"
          ? "Bonjour TY Dev, j'ai découvert vos services d'ingénierie logicielle et j'aimerais échanger sur nos besoins techniques et délais."
          : "Hello TY Dev, I reviewed your software engineering services and would like to discuss our technical requirements and timeline.",
      tooltip:
        lang === "fr"
          ? "Discuter d'un service (WhatsApp)"
          : "Discuss a service on WhatsApp",
      ariaLabel:
        lang === "fr"
          ? "Échanger sur nos services d'ingénierie sur WhatsApp"
          : "Discuss engineering services on WhatsApp",
    };
  }

  // 10. Profils d'Équipe (/team/*)
  if (cleanPath.includes("yassine-ben-yaala")) {
    return {
      message:
        lang === "fr"
          ? "Bonjour Mohamed Yassine, j'ai consulté votre profil d'architecte logiciel sur TY Dev et j'aimerais échanger directement avec vous sur un projet."
          : "Hello Mohamed Yassine, I viewed your software architect profile on TY Dev and would like to chat directly with you about a project.",
      tooltip:
        lang === "fr"
          ? "Contacter Yassine (WhatsApp)"
          : "Chat with Yassine on WhatsApp",
      badge: "Direct CEO",
      ariaLabel:
        lang === "fr"
          ? "Contacter Mohamed Yassine Ben Yaala sur WhatsApp"
          : "Contact Mohamed Yassine on WhatsApp",
    };
  }

  if (cleanPath.startsWith("/team")) {
    return {
      message:
        lang === "fr"
          ? "Bonjour l'équipe TY Dev, j'ai consulté vos profils d'ingénieurs sur le site et j'aimerais échanger avec vous sur une opportunité de projet."
          : "Hello TY Dev team, I checked your engineering team profiles and would like to chat about a project opportunity.",
      tooltip:
        lang === "fr"
          ? "Contacter l'équipe (WhatsApp)"
          : "Chat with the team on WhatsApp",
      ariaLabel:
        lang === "fr"
          ? "Contacter l'équipe TY Dev sur WhatsApp"
          : "Contact the TY Dev team on WhatsApp",
    };
  }

  // 11. Page Portfolio & Projets (/portfolio)
  if (cleanPath.startsWith("/portfolio") || cleanPath.startsWith("/demos")) {
    return {
      message:
        lang === "fr"
          ? "Bonjour TY Dev, j'ai parcouru vos réalisations et études de cas, et j'aimerais échanger sur la faisabilité d'un projet équivalent."
          : "Hello TY Dev, I checked your portfolio and case studies, and would like to discuss feasibility for a similar project.",
      tooltip:
        lang === "fr"
          ? "Échanger sur un projet (WhatsApp)"
          : "Discuss a project on WhatsApp",
      ariaLabel:
        lang === "fr"
          ? "Échanger sur nos réalisations sur WhatsApp"
          : "Discuss portfolio projects on WhatsApp",
    };
  }

  // 12. Page Contact (/contact)
  if (cleanPath.startsWith("/contact")) {
    return {
      message:
        lang === "fr"
          ? "Bonjour TY Dev, je souhaite échanger directement avec vos ingénieurs pour cadrer notre projet et obtenir un devis rapide."
          : "Hello TY Dev, I would like to chat directly with your engineering team to scope our project and get a fast quote.",
      tooltip:
        lang === "fr"
          ? "Réponse directe sous 15 min"
          : "Fast reply under 15 min",
      badge: lang === "fr" ? "En ligne" : "Online",
      ariaLabel:
        lang === "fr"
          ? "Échanger en direct sur WhatsApp avec TY Dev"
          : "Chat directly on WhatsApp with TY Dev",
    };
  }

  // 13. Page d'Accueil & Fallback universel (/)
  return {
    message:
      lang === "fr"
        ? "Bonjour TY Dev, je visite votre site et j'aimerais échanger avec vous concernant un projet d'application web / SaaS."
        : "Hello TY Dev, I am visiting your website and would like to chat with you about a web / SaaS project.",
    tooltip:
      lang === "fr"
        ? "Discutons de votre projet (WhatsApp)"
        : "Let's chat about your project",
    ariaLabel:
      lang === "fr"
        ? "Contactez-nous directement sur WhatsApp"
        : "Contact us directly on WhatsApp",
  };
}

export function buildContextualWhatsAppUrl(
  pathname: string,
  lang: "fr" | "en" = "fr",
  phone: string = OFFICIAL_WHATSAPP_PHONE
): string {
  const config = getContextualWhatsAppConfig(pathname, lang);
  return `https://wa.me/${phone}?text=${encodeURIComponent(config.message)}`;
}
