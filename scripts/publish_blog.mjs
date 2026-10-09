import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Load environment variables if .env exists
const envPath = path.join(rootDir, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*["']?(.*?)["']?\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2];
    }
  }
}

const secretToken = process.env.BLOG_ADMIN_TOKEN || 'tydev_blog_admin_secret_key_2026';

// 1. Team Authors Pool (Rotates dynamically across posts)
const teamAuthors = [
  { name: 'Moutia Ben Yahia', role: 'CEO', avatar: '/team/moutiabenyahia.webp' },
  { name: 'Mohamed Yassine Ben Yaala', role: 'CO-FOUNDER', avatar: '/team/mohamedyassinbenyaala.webp' },
  { name: 'Amine Ben Ammar', role: 'CO-FOUNDER', avatar: '/team/aminebenamamr.webp' },
  { name: 'Mohamed Ben Khemis', role: 'DEVOPS ENGINEER', avatar: '/team/mohamedbenkhemis.webp' },
  { name: 'Mohamed Ben Yahia', role: 'FULL STACK DEVELOPER', avatar: '/team/mohamedbenyahia.webp' },
];

// 2. High-Quality Royalty-Free Technical Image Pool (Unsplash Tech/Engineering)
const imagePool = [
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526374870839-e155464bb9b2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80',
];

function getFormattedDates(date = new Date()) {
  const monthsFr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const day = String(date.getDate()).padStart(2, '0');
  const monthIdx = date.getMonth();
  const monthNum = String(monthIdx + 1).padStart(2, '0');
  const year = date.getFullYear();

  return {
    fr: `${day} ${monthsFr[monthIdx]} ${year}`,
    en: `${monthsEn[monthIdx]} ${day}, ${year}`,
    iso: `${year}-${monthNum}-${day}`,
  };
}

// Generate a clean SEO-friendly slug
export function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\uFFFD/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Published Article Generator / Inserter
export function publishArticle({ titleFr, titleEn, summaryFr, summaryEn, category, image, tags, contentFr, contentEn, token, author: customAuthor }) {
  if (token && token !== secretToken) {
    throw new Error('❌ Invalid authentication token. Permission denied.');
  }

  const blogPostsFile = path.join(rootDir, 'src', 'data', 'blogPosts.ts');
  let fileContent = fs.readFileSync(blogPostsFile, 'utf-8');

  // Accurately count all existing posts (both "id": and id:)
  const postMatches = [...fileContent.matchAll(/(?:"id"|id)\s*:\s*["']([^"']+)["']/g)];
  const existingCount = postMatches.length;

  // Extract all existing slugs to prevent duplicates
  const existingSlugs = new Set([...fileContent.matchAll(/(?:"slug"|slug)\s*:\s*["']([^"']+)["']/g)].map(m => m[1]));

  const slug = generateSlug(titleFr);

  if (existingSlugs.has(slug)) {
    console.warn(`⚠️ Article with slug "${slug}" already exists! Skipping to protect SEO rankings.`);
    return null;
  }

  // Determine rotated author and image
  const author = customAuthor || teamAuthors[existingCount % teamAuthors.length];
  const selectedImage = image || imagePool[existingCount % imagePool.length];
  const dates = getFormattedDates();

  const newPost = {
    id: slug,
    slug,
    title: { fr: titleFr, en: titleEn },
    summary: { fr: summaryFr, en: summaryEn },
    category,
    date: dates,
    author,
    image: selectedImage,
    tags: tags || ['Tech', 'Engineering', 'Web'],
    content: { fr: contentFr, en: contentEn },
  };

  // Insert at beginning of blogPosts array
  const arrayStartMarker = 'export const blogPosts: BlogPost[] = [';
  if (!fileContent.includes(arrayStartMarker)) {
    throw new Error('Could not locate blogPosts array in blogPosts.ts');
  }

  const newPostObjectString = `\n  ${JSON.stringify(newPost, null, 4).replace(/^(\s*)"([a-zA-Z_$][a-zA-Z0-9_$]*)"\s*:/gm, '$1$2:')},`;
  fileContent = fileContent.replace(arrayStartMarker, `${arrayStartMarker}${newPostObjectString}`);

  fs.writeFileSync(blogPostsFile, fileContent, 'utf-8');
  console.log(`✅ Successfully published new article: "${titleFr}" (${slug})`);
  console.log(`👤 Author assigned (rotation #${existingCount}): ${author.name} (${author.role})`);
  console.log(`📂 Category assigned: ${category}`);
  console.log(`🖼️ Image assigned (rotation #${existingCount}): ${selectedImage}`);

  // Automatically update sitemap.xml
  try {
    execSync('node scripts/generate_sitemap.mjs', { cwd: rootDir, stdio: 'inherit' });
  } catch (e) {
    console.error('Warning: sitemap regeneration failed:', e);
  }

  return newPost;
}

// 3. Pre-configured Library of 10 Distinct Cutting-Edge Tech Topics for 2026
// Optimized for agency topical authority, internal linking, and search intent.
export const dailyArticlesLibrary = [
  {
    titleFr: "Model Context Protocol (MCP) & Agents IA : Standardiser l'Architecture d'Outils en 2026",
    titleEn: "Model Context Protocol (MCP) & AI Agents: Standardizing Enterprise Tool Architecture in 2026",
    summaryFr: "Comment le standard ouvert MCP révolutionne l'intégration d'agents autonomes dans vos logiciels en remplaçant les connecteurs propriétaires par un protocole JSON-RPC unifié.",
    summaryEn: "How the open-standard MCP revolutionizes autonomous AI agents integration by replacing bespoke API connectors with unified JSON-RPC protocols.",
    category: "IA & Automatisation",
    tags: ["MCP", "IA", "Agents Autonomes", "LLM", "API", "SaaS"],
    contentFr: `
## L'Avènement du Standard Model Context Protocol (MCP)

Jusqu'à récemment, connecter un Large Language Model (LLM) aux données internes d'une entreprise nécessitait de développer des adaptateurs d'API sur-mesure pour chaque outil (bases de données, CRM, dépôts Git, serveurs de fichiers). Avec l'émergence du **Model Context Protocol (MCP)**, l'industrie logicielle adopte enfin une interface unifiée.

Pour notre agence spécialisée en [intégration d'agents IA et LLM](/services/integration-ia-llm), MCP représente une avancée majeure pour concevoir des systèmes intelligents modulaires, sécurisés et maintenables.

---

### 1. Pourquoi MCP Remplace le Function Calling Isolé

Le Function Calling traditionnel oblige chaque modèle à connaître la spécification de chaque API cliente. Le protocole MCP inverse cette dépendance grâce à une architecture client-serveur standardisée :

- **Protocole Transport Neutre** : Communication bidirectionnelle via JSON-RPC 2.0 (stdio pour les outils locaux, SSE / WebSockets pour les services cloud distants).
- **Primitives Découplées** :
  - *Resources* : Documents et états contextuels en lecture seule.
  - *Tools* : Fonctions exécutables par le modèle avec confirmation de permissions.
  - *Prompts* : Modèles de requêtes préconfigurés partagés entre agents.
- **Sécurité et Isolation** : Chaque serveur MCP opère dans son propre périmètre de privilèges (RBAC), éliminant les risques de compromission globale du système.

\`\`\`typescript
// Exemple de serveur MCP minimal en TypeScript pour exposer un outil de requête sécurisée
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server({
  name: "tydev-data-mcp",
  version: "1.0.0",
}, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "query_business_kpis",
    description: "Récupère les métriques de revenus et conversions SaaS",
    inputSchema: {
      type: "object",
      properties: { period: { type: "string", enum: ["7d", "30d", "90d"] } },
      required: ["period"]
    }
  }]
}));

const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

---

### 2. Intégration dans les Applications SaaS Multi-Tenants

Dans le cadre du [développement SaaS sur-mesure](/services/saas-sur-mesure), l'intégration de serveurs MCP permet aux utilisateurs finaux de brancher leurs propres agents IA sur leurs données d'entreprise sans exposer les clés d'API sensibles ni risquer des fuites multi-tenants.

1. **Isolation par Organisation** : Chaque requête MCP passe par un middleware validant le tenant ID et le token d'accès.
2. **Audit & Traçabilité** : Chaque appel d'outil par l'agent est journalisé avec ses paramètres d'entrée et sa latence.
3. **Mise en Cache Sémantique** : Les réponses fréquentes sont mises en cache sur Redis pour réduire les coûts d'inférence.

---

### Conclusion & Prochaines Étapes

Le Model Context Protocol s'impose comme le socle des architectures logicielles pilotées par l'IA. Si vous souhaitez intégrer des agents autonomes et des workflows MCP dans vos applications, [contactez notre équipe d'ingénieurs TY Dev](/contact) pour une étude d'architecture personnalisée.
`,
    contentEn: `
## The Rise of the Model Context Protocol (MCP)

Until recently, connecting a Large Language Model to proprietary enterprise data required bespoke API integrations for every tool. With the arrival of **Model Context Protocol (MCP)**, the software industry finally benefits from a unified, open protocol.

At TY Dev, our team specializing in [AI & LLM Integration](/services/integration-ia-llm) leverages MCP to deliver modular, secure, and production-ready agentic architectures.

---

### 1. Why MCP Surpasses Isolated Function Calling

Traditional function calling tightly couples prompts with external API shapes. MCP decouples tool execution via JSON-RPC 2.0 over standard transports (stdio, SSE, WebSockets):

- **Neutral Transports**: Standardized bi-directional RPC communications.
- **Composable Primitives**: Dedicated abstractions for Resources, Tools, and System Prompts.
- **Strict Sandboxing**: Granular RBAC scopes ensuring sensitive credentials never leak into prompt contexts.

---

### Conclusion

MCP is setting the baseline for the agentic software era. Learn how we can empower your platforms with autonomous agents by checking our [Custom SaaS Engineering](/services/saas-sur-mesure) solutions or [reaching out to our engineers](/contact).
`
  },
  {
    titleFr: "TanStack Start vs Next.js 15 : Pourquoi l'Écosystème Fullstack Évolue vers Vite en 2026",
    titleEn: "TanStack Start vs Next.js 15: Why the Fullstack Ecosystem is Moving to Vite in 2026",
    summaryFr: "Analyse comparative d'architecture : gestion des Server Functions, typage TypeScript de bout en bout, temps de build et autonomie d'hébergement sans vendor lock-in.",
    summaryEn: "Comparative architectural benchmark: typesafe Server Functions, end-to-end TypeScript safety, compilation speed, and host-agnostic deployments without vendor lock-in.",
    category: "Software Architecture",
    tags: ["TanStack Start", "Next.js", "React 19", "Vite", "SSR", "Performance"],
    contentFr: `
## La Mutation du Paysage Fullstack React

Pendant plusieurs années, Next.js s'est imposé comme le choix par défaut pour développer des applications web React. Cependant, en 2026, l'introduction de **TanStack Start** propulsé par **Vite** et **Nitro** redéfinit les attentes des équipes d'ingénierie en quête de performance, de simplicité et de liberté d'infrastructure.

Pour notre agence spécialisée dans les [applications web et PWA haute performance](/services/applications-web-pwa), ce changement d'architecture offre des gains concrets en vitesse de développement et en fiabilité de production.

---

### 1. Pourquoi Vite & TanStack Router Transforment l'Expérience Développeur

La force de TanStack Start repose sur la synergie entre trois briques majeures :

1. **Vite en Moteur de Build Unique** : Élimination des conflits de bundling entre client et serveur grâce à l'écosystème Rollup/Esbuild ultra-rapide.
2. **Typage Strict et Autocomplétion Totale** : Grâce à \`@tanstack/react-router\`, chaque paramètre d'URL, query search et loader bénéficie d'un typage TypeScript inféré à 100%. Aucune faute de frappe n'est possible au runtime.
3. **Moteur Serveur Nitro Universel** : L'application peut être déployée en un clic sur Node.js, Cloudflare Workers, AWS Lambda ou Docker sans modifier une seule ligne de code.

\`\`\`typescript
// Exemple de Server Function TanStack Start 100% typesafe
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getOrganizationMetrics = createServerFn({ method: "GET" })
  .validator(z.object({ orgId: z.string().uuid() }))
  .handler(async ({ data }) => {
    // Exécution exclusive côté serveur avec accès direct à la base de données
    const metrics = await db.organizations.findMetrics(data.orgId);
    return metrics;
  });
\`\`\`

---

### 2. Comparatif de Performance & Déploiement

| Critère | TanStack Start (Vite + Nitro) | Next.js 15 (Turbopack) |
|---|---|---|
| **Temps de démarrage Dev** | < 300 ms (HMR instantané) | 1.8 s - 4.2 s |
| **Poids du runtime client** | Minimal (~45 KB) | Plus volumineux (~90 KB) |
| **Portabilité d'hébergement** | 100% Agnostique (Nitro) | Fortement orienté Vercel |
| **Sécurité des routes** | Typage statique compile-time | Validation manuelle ou middleware |

---

### Conclusion pour vos Projets d'Entreprise

Pour concevoir des logiciels [SaaS sur-mesure](/services/saas-sur-mesure) ou des tableaux de bord interactifs complexes, TanStack Start apporte une robustesse inégalée. Découvrez notre savoir-faire d'architecture ou [échangez avec nos experts TY Dev](/contact) pour migrer vos applications existantes.
`,
    contentEn: `
## The Shifting Fullstack React Paradigm

Next.js has long dominated React server-side rendering. However, in 2026, **TanStack Start**—powered by **Vite** and **Nitro**—is becoming the preferred choice for performance-critical SaaS architectures.

At TY Dev, our focus on [High-Performance Web Apps & PWAs](/services/applications-web-pwa) drives us to leverage Vite's sub-millisecond HMR and strictly typesafe routing.

---

### Key Advantages of TanStack Start
- **100% Typesafe Routing**: Route params and search schemas are checked at compile time.
- **Universal Deployment**: Run natively across Node.js, Cloudflare Workers, or AWS Lambda via Nitro.
- **Zero Vendor Lock-in**: Independent from proprietary hosting cloud platforms.

Discover our [Custom SaaS Development](/services/saas-sur-mesure) services or [contact our technical team](/contact) to discuss your software architecture.
`
  },
  {
    titleFr: "DeepSeek-R1 & LLMs Open Source en Entreprise : Déploiement Local, vLLM & Souveraineté",
    titleEn: "DeepSeek-R1 & Enterprise Open Source LLMs: Local Deployment, vLLM & Sovereignty",
    summaryFr: "Guide pratique pour héberger et exécuter des modèles de raisonnement open source sur serveurs privés, optimiser l'inférence avec vLLM et garantir la conformité RGPD.",
    summaryEn: "Hands-on guide to deploying open-source reasoning models on private clusters with vLLM, maximizing throughput, and achieving strict GDPR data sovereignty.",
    category: "IA & Automatisation",
    tags: ["DeepSeek", "LLM", "OpenSource", "vLLM", "Souverainete", "DevOps"],
    contentFr: `
## La Révolution des Modèles de Raisonnement Open Source

L'apparition de modèles ouverts ultra-performants tels que **DeepSeek-R1** et **Llama 3.3** bouleverse l'économie de l'Intelligence Artificielle. Les entreprises ne sont plus contraintes d'envoyer leurs données financières, médicales ou stratégiques vers des API propriétaires fermées.

Dans le cadre de nos offres d'[intégration d'agents IA](/services/integration-ia-llm) et d'[infrastructure cloud et DevOps](/services/devops-cloud-infrastructure), nous accompagnons les organisations dans le déploiement sécurisé de modèles d'IA sur leurs propres infrastructures.

---

### 1. Pourquoi le Déploiement Local Devient Incontournable en 2026

- **Souveraineté des Données & Conformité RGPD** : Aucune donnée client ne transite par des serveurs tiers situés hors de l'Union Européenne.
- **Contrôle Total des Coûts (FinOps)** : Remplacement de factures d'API tokens exponentielles par des coûts de GPU dédiés prédictibles.
- **Latence Constante & Zéro Rate-Limiting** : Priorité absolue donnée aux requêtes internes de votre entreprise.

---

### 2. Stack Technique de Déploiement avec vLLM & Docker

Le moteur d'inférence **vLLM** est la référence industrielle grâce à sa gestion révolutionnaire de la mémoire via l'algorithme *PagedAttention* :

\`\`\`yaml
# Exemple de docker-compose pour déployer DeepSeek-R1 avec vLLM
version: '3.8'

services:
  vllm-engine:
    image: vllm/vllm-openai:latest
    runtime: nvidia
    environment:
      - HUGGING_FACE_HUB_TOKEN=\${HF_TOKEN}
    command: >
      --model deepseek-ai/DeepSeek-R1-Distill-Qwen-32B
      --tensor-parallel-size 2
      --gpu-memory-utilization 0.90
      --max-model-len 16384
      --enforce-eager
    ports:
      - "8000:8000"
    volumes:
      - /data/models:/root/.cache/huggingface
\`\`\`

---

### Conclusion

Le déploiement de modèles de raisonnement open source offre aux entreprises un avantage concurrentiel décisif. [Prenez contact avec nos spécialistes en infrastructure](/contact) pour auditer vos besoins et déployer votre propre cluster IA souverain.
`,
    contentEn: `
## The Open-Source Reasoning Revolution

With high-performing open weights like **DeepSeek-R1**, enterprises are taking back control of their AI workloads without relying on proprietary, opaque third-party APIs.

At TY Dev, we help companies build sovereign AI clusters through our [AI & LLM Services](/services/integration-ia-llm) and [DevOps & Cloud Infrastructure](/services/devops-cloud-infrastructure).

---

### Highlights
- **100% Data Sovereignty**: Compliant with European GDPR standards.
- **Predictable FinOps Costs**: Fixed GPU reservations replace unpredictable API token invoices.
- **High Throughput**: vLLM PagedAttention maximizes concurrent batching efficiency.

[Reach out to our cloud engineers](/contact) to architect your self-hosted AI pipeline.
`
  },
  {
    titleFr: "Edge Computing & Cloudflare Workers : Exécuter des SaaS au Plus Près des Utilisateurs",
    titleEn: "Edge Computing & Cloudflare Workers: Running SaaS at Sub-10ms Latency",
    summaryFr: "Comment décentraliser vos API et vos bases de données relationnelles sur le réseau Edge pour diviser vos temps de réponse par cinq à l'échelle mondiale.",
    summaryEn: "How to decentralize SaaS APIs and relational databases across global edge networks, cutting latency by 5x worldwide.",
    category: "DevOps & Cloud",
    tags: ["Edge Computing", "Cloudflare Workers", "D1", "Serverless", "Performance"],
    contentFr: `
## L'Évolution du Serverless vers le Réseau Edge

Les architectures cloud traditionnelles concentrent la logique métier dans des centres de données centralisés (par exemple Paris, Francfort ou Virginie). Pour un utilisateur situé sur un autre continent, le trajet réseau (Round-Trip Time) engendre des dizaines de millisecondes de latence incompressible.

L'**Edge Computing** via **Cloudflare Workers**, **Fastly** ou **Vercel Edge** résout ce goulot d'étranglement en exécutant votre code sur des centaines de points de présence (PoP) situés à moins de 20 millisecondes de chaque internaute.

Chez TY Dev, nous concevons des [infrastructures cloud résilientes](/services/devops-cloud-infrastructure) pour propulser vos services au niveau des standards mondiaux.

---

### 1. V8 Isolates vs Conteneurs Docker Traditionnels

Contrairement aux conteneurs ou aux fonctions AWS Lambda nécessitant des cold-starts de 200ms à 2s, les Edge Workers s'exécutent au sein d'**Isolats V8** :

- **Démarrage à Froid Nul (< 5ms)** : Disponibilité instantanée de l'environnement de calcul.
- **Empreinte Mémoire Réduite** : Des milliers d'isolats partagent le même processus système en toute étanchéité.
- **Bases de Données Edge-Native** : Connexion directe avec des bases distribuées comme **Cloudflare D1** (SQLite global répliqué) ou **Turso**.

---

### 2. Exemple de Middleware d'Authentification Edge

\`\`\`typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Validation du token JWT au niveau de l'Edge sans appel serveur central
    const token = authHeader.substring(7);
    const isValid = await verifyJwtAtEdge(token, env.JWT_SECRET);

    if (!isValid) {
      return new Response(JSON.stringify({ error: "Invalid Token" }), { status: 403 });
    }

    return fetch(request);
  }
};
\`\`\`

---

### Conclusion

L'Edge Computing est l'arme absolue pour garantir une réactivité sub-seconde sur vos produits SaaS internationaux. Explorez nos services d'[intégration d'API et webhooks](/services/integration-apis-webhooks) ou [contactez notre équipe](/contact) pour accélérer vos plateformes.
`,
    contentEn: `
## Moving from Serverless to Global Edge Networks

Traditional data centers concentrate computation in a few regions, creating geographic latency bottlenecks. **Edge Computing** executes lightweight server functions across hundreds of global PoPs, delivering sub-10ms user experiences.

At TY Dev, we architect modern platforms using our [Cloud & DevOps Services](/services/devops-cloud-infrastructure) and [API Integration Expertise](/services/integration-apis-webhooks).

---

### Edge Highlights
- **Zero Cold Starts**: V8 isolates boot in under 5 milliseconds.
- **Distributed Edge Databases**: Query global SQLite clusters via Cloudflare D1 and Turso.
- **Worldwide CDN Integration**: Edge caching eliminates redundant backend queries.

[Contact our engineers](/contact) to design your edge-native architecture.
`
  },
  {
    titleFr: "Bases Vectorielles à Grande Échelle : Qdrant, Pgvector ou Milvus pour le RAG Entreprise ?",
    titleEn: "Vector Databases at Scale: Qdrant, Pgvector or Milvus for Enterprise RAG?",
    summaryFr: "Benchmark comparatif d'indexation vectorielle : latence HNSW, filtrage multi-tenant, passage à l'échelle sur 10M+ embeddings et recommandations d'ingénierie.",
    summaryEn: "Comparative vector indexing benchmark: HNSW latency, multi-tenant payload filtering, scaling past 10M+ embeddings, and production architecture guidance.",
    category: "Bases de Données",
    tags: ["VectorDB", "Qdrant", "Pgvector", "Milvus", "RAG", "IA"],
    contentFr: `
## Le Défi de la Recherche Vectorielle à Haute Fréquence

Dans une architecture RAG (Retrieval-Augmented Generation), la vitesse de réponse dépend directement de la capacité de la base de données vectorielle à exécuter des recherches de similarité cosinus ou distance euclidienne sur des millions de vecteurs de grande dimension (ex: 1536 ou 3072 dimensions).

Choisir la mauvaise technologie peut dégrader les temps de réponse de plusieurs secondes. Notre équipe d'[intégration IA & LLM](/services/integration-ia-llm) vous aide à faire le bon choix technologique.

---

### 1. Benchmark des Trois Géants du Vector Search

1. **Pgvector (Extension PostgreSQL)** :
   - *Forces* : Évite d'ajouter une nouvelle brique d'infrastructure ; permet de joindre des données relationnelles classiques et vectorielles dans une seule requête SQL transactionnelle.
   - *Limites* : Performances moindres au-delà de 2 millions d'embeddings lors de fortes concurrences.
2. **Qdrant (Moteur Vectoriel Écrit en Rust)** :
   - *Forces* : Vitesse d'exécution exceptionnelle, filtrage par payload (mots-clés, tenant_id) intégré nativement dans l'index HNSW.
   - *Idéal pour* : Les SaaS multi-tenants avec des millions d'utilisateurs.
3. **Milvus (Architecture Distribuée Découplée)** :
   - *Forces* : Conçu pour les volumes colossaux (100M+ vecteurs) avec scalabilité horizontale indépendante des nœuds de calcul et de stockage.

---

### 2. Exemple d'Interrogation Filtrée avec Qdrant en TypeScript

\`\`\`typescript
import { QdrantClient } from "@qdrant/js-client-rest";

const client = new QdrantClient({ url: process.env.QDRANT_URL, apiKey: process.env.QDRANT_KEY });

export async function searchEnterpriseDocs(vector: number[], tenantId: string) {
  return await client.search("enterprise_knowledge", {
    vector,
    limit: 5,
    filter: {
      must: [
        { key: "tenant_id", match: { value: tenantId } },
        { key: "access_level", match: { value: "confidential" } }
      ]
    }
  });
}
\`\`\`

---

### Conclusion

Pour débuter avec simplicité, **Pgvector** est parfait. Pour une application SaaS à grande échelle exigeant une latence sub-10ms, **Qdrant** est notre recommandation numéro un. [Découvrez nos offres SaaS sur-mesure](/services/saas-sur-mesure) ou [parlez-en directement à nos développeurs](/contact).
`,
    contentEn: `
## Scaling High-Frequency Vector Retrieval

Fast, reliable RAG systems demand dedicated vector indexing capable of querying multi-dimensional embeddings with minimal latency.

Our team at TY Dev delivers robust vector search pipelines through our [AI & LLM Services](/services/integration-ia-llm) and [Custom SaaS Engineering](/services/saas-sur-mesure).

---

### Comparison Summary
- **Pgvector**: Perfect for combining relational data and embeddings in a single ACID store.
- **Qdrant**: Blazing-fast Rust engine with first-class payload filtering for multi-tenant SaaS.
- **Milvus**: Distributed infrastructure tailored for hundreds of millions of embeddings.

[Get in touch with our team](/contact) to evaluate your vector storage architecture.
`
  },
  {
    titleFr: "Passkeys & WebAuthn en TypeScript : Supprimer les Mots de Passe dans vos Applications SaaS",
    titleEn: "Passkeys & WebAuthn in TypeScript: Eliminating Passwords in Modern SaaS Applications",
    summaryFr: "Implémentation complète de l'authentification FIDO2 passwordless : cryptographie asymétrique, support biométrique (Touch ID, Face ID) et réduction de l'abandon utilisateur.",
    summaryEn: "Complete FIDO2 passwordless auth implementation: asymmetric cryptography, biometric validation (Face ID, Touch ID), and drastically lower onboarding drop-off.",
    category: "Sécurité & Auth",
    tags: ["Cybersécurité", "Passkeys", "WebAuthn", "TypeScript", "SaaS", "Authentification"],
    contentFr: `
## La Fin de l'Ère des Mots de Passe

Plus de 80% des failles de sécurité proviennent d'identifiants volés ou réutilisés. En 2026, l'adoption des **Passkeys** fondées sur le standard ouvert **WebAuthn / FIDO2** s'impose comme la référence absolue en matière de sécurité logicielle et de confort utilisateur.

Dans nos développements de [plateformes SaaS sécurisées](/services/saas-sur-mesure), le support des Passkeys permet une connexion instantanée en une seconde via biométrie sans aucun mot de passe à mémoriser.

---

### 1. Fonctionnement Cryptographique de WebAuthn

Le mécanisme repose sur une paire de clés asymétriques :
- **Clé Privée** : Générée et stockée de manière inviolable dans l'enclave sécurisée de l'appareil de l'utilisateur (Secure Enclave Apple, TPM Windows, puce Titan Android). Elle ne quitte jamais l'appareil.
- **Clé Publique** : Envoyée et enregistrée sur le serveur de votre application SaaS.
- **Zéro Phishing Possible** : La signature cryptographique inclut le domaine d'origine du site web, rendant les faux sites clones totalement inopérants.

---

### 2. Exemple de Flux Backend avec \`@simplewebauthn\`

\`\`\`typescript
import { generateRegistrationOptions, verifyRegistrationResponse } from "@simplewebauthn/server";

// 1. Émission du challenge cryptographique
export async function createPasskeyOptions(user: User) {
  return generateRegistrationOptions({
    rpName: "TY Dev SaaS Platform",
    rpID: "ty-dev.site",
    userID: user.id,
    userName: user.email,
    attestationType: "none",
    authenticatorSelection: {
      residentKey: "required",
      userVerification: "preferred",
    },
  });
}
\`\`\`

---

### Conclusion

Intégrer les Passkeys augmente la conversion à l'inscription de plus de **25%** tout en éliminant les coûts de réinitialisation de mots de passe. Pour sécuriser vos systèmes, consultez nos services d'[intégration d'API](/services/integration-apis-webhooks) ou [échangez avec nos experts TY Dev](/contact).
`,
    contentEn: `
## Retiring Passwords with WebAuthn

Over 80% of data breaches involve compromised credentials. Modern SaaS platforms adopt **Passkeys (FIDO2 / WebAuthn)** for frictionless biometric authentication.

Through our [Secure SaaS Development](/services/saas-sur-mesure) and [API Integration Capabilities](/services/integration-apis-webhooks), TY Dev implements passwordless flows that boost registration conversions.

---

### Key Architectural Benefits
- **Zero Phishing Vulnerabilities**: Private keys remain sealed inside device Secure Enclaves.
- **Instant Biometric Sign-in**: Face ID or fingerprint replaces SMS 2FA codes.
- **Frictionless Onboarding**: Drastically reduced support tickets for forgotten passwords.

[Contact our engineers](/contact) to implement WebAuthn into your products.
`
  },
  {
    titleFr: "Architectures Événementielles Résilientes : RabbitMQ, Redis Streams & BullMQ pour Traitements Asynchrones",
    titleEn: "Resilient Event-Driven Architectures: RabbitMQ, Redis Streams & BullMQ for Async Jobs",
    summaryFr: "Comment découpler les requêtes HTTP, gérer les pics de charge soudains et garantir la livraison de messages avec retries exponentiels et Dead Letter Queues.",
    summaryEn: "How to decouple synchronous HTTP endpoints, absorb traffic spikes, and guarantee zero message loss using exponential backoff retries and DLQs.",
    category: "Software Architecture",
    tags: ["Event-Driven", "RabbitMQ", "Redis Streams", "BullMQ", "Microservices", "Queues"],
    contentFr: `
## Découpler le Traitement Synchrone du Flux Utilisateur

Dans une application web de production, bloquer un utilisateur pendant l'envoi d'e-mails, la génération de PDF lourds ou l'appel à des API tierces est une erreur critique d'architecture. Si l'un des services externes ralentit ou tombe en panne, toute votre plateforme subit un effet domino d'indisponibilité.

Pour remédier à cela, l'**architecture événementielle (Event-Driven)** permet de différer les calculs en arrière-plan via des files d'attente (Queues) résilientes.

C'est une spécialité centrale de nos offres d'[intégration d'API & webhooks](/services/integration-apis-webhooks) et d'[automatisation de processus métiers](/services/automatisation-processus-metiers).

---

### 1. Quand Choisir BullMQ vs RabbitMQ vs Apache Kafka ?

- **BullMQ + Redis** : Parfait pour les applications Node.js / TypeScript. Léger, facile à déployer, supporte le monitoring en temps réel, les tâches planifiées (cron) et les priorités.
- **RabbitMQ (AMQP)** : La référence pour le routage complexe multi-langages avec des topologies d'échange avancées (Direct, Topic, Fanout).
- **Apache Kafka** : Indispensable uniquement pour le streaming d'événements à très haut volume (des dizaines de milliers d'événements par seconde).

---

### 2. Exemple de Worker Résilient avec BullMQ

\`\`\`typescript
import { Worker, Queue } from "bullmq";

const redisConnection = { host: "localhost", port: 6379 };
export const emailQueue = new Queue("emailProcessing", { connection: redisConnection });

const worker = new Worker("emailProcessing", async (job) => {
  console.log(\`Traitement de la tâche \${job.id} : envoi d'email à \${job.data.to}\`);
  await sendTransactionEmail(job.data);
}, {
  connection: redisConnection,
  concurrency: 5,
  limiter: { max: 50, duration: 1000 }, // Protection contre le rate-limiting
});

worker.on("failed", (job, err) => {
  console.error(\`Échec tâche \${job?.id} après tentatives : \${err.message}\`);
});
\`\`\`

---

### Conclusion

Une architecture événementielle bien orchestrée garantit un temps de réponse HTTP inférieur à 100ms et une tolérance totale aux pannes. Découvrez nos [services SaaS sur-mesure](/services/saas-sur-mesure) ou [prenez contact avec l'équipe TY Dev](/contact) pour concevoir vos pipelines asynchrones.
`,
    contentEn: `
## Decoupling Heavy Processing with Event Queues

Blocking client HTTP requests for background jobs such as email dispatches or document exports introduces serious scalability bottlenecks.

Through our [API Integration & Webhooks](/services/integration-apis-webhooks) and [Business Workflow Automation](/services/automatisation-processus-metiers), TY Dev implements resilient background queues with zero data loss.

---

### Queue Selection Matrix
- **BullMQ / Redis**: Ideal for TypeScript backends requiring job priorities and scheduled crons.
- **RabbitMQ**: Enterprise standard for complex routing exchanges and multi-language services.
- **Kafka**: Purpose-built for massive event-streaming throughput.

[Reach out to our engineering team](/contact) to scale your async processing.
`
  },
  {
    titleFr: "Révolution de l'Outillage Web : Pourquoi Rust, Biome et Oxlint Remplacent ESLint et Prettier",
    titleEn: "Web Tooling Revolution: Why Rust, Biome and Oxlint are Replacing ESLint and Prettier",
    summaryFr: "Analyse de la transition vers les outils d'ingénierie compilés en Rust : temps de CI/CD divisés par dix, configuration unifiée et suppression de la dette technique.",
    summaryEn: "Analysis of the shift towards Rust-powered web toolchains: 10x faster CI/CD pipelines, single unified configuration, and eliminated tooling technical debt.",
    category: "DevOps & Cloud",
    tags: ["Tooling", "Rust", "Biome", "Oxlint", "TypeScript", "Performance"],
    contentFr: `
## La Fin de la Lenteur dans les Toolchains JavaScript

Depuis plus d'une décennie, les développeurs web composent avec un empilement complexe d'outils Node.js : ESLint pour le linting, Prettier pour le formatage, Babel pour la transpilation. Sur de grands monorepos, exécuter une simple passe de vérification de code pouvait paralyser les machines pendant plusieurs minutes.

En 2026, l'arrivée d'outils natifs écrits en **Rust** comme **Biome** et **Oxlint** transforme radicalement la productivité des équipes d'ingénierie.

Pour notre agence axée sur les [pipelines DevOps et CI/CD](/services/devops-cloud-infrastructure), ces outils représentent une réduction massive de l'empreinte carbone et du temps d'attente des développeurs.

---

### 1. Pourquoi Biome s'Impose face au Couple ESLint + Prettier

- **Vitesse Époustouflante (x25 à x40 plus rapide)** : Capable de vérifier et formater des milliers de fichiers en moins de 300 millisecondes.
- **Unification Parfaite** : Un seul binaire, un seul fichier de configuration (\`biome.json\`), zéro conflit de règles entre le formateur et le linter.
- **Zéro Dépendance Node.js** : Évite d'installer des centaines de sous-dépendances \`npm\` vulnérables aux attaques de chaîne d'approvisionnement (Supply Chain Attacks).

\`\`\`json
// Exemple de configuration épurée biome.json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": { "noUnusedVariables": "error" }
    }
  }
}
\`\`\`

---

### Conclusion

Moderniser son outillage de développement est le moyen le plus rapide d'accélérer les livraisons en production. Découvrez comment nous optimisons vos [applications web et PWA](/services/applications-web-pwa) ou [contactez notre équipe technique](/contact).
`,
    contentEn: `
## Upgrading Web Toolchains with Native Rust Speed

Traditional Node.js linting stacks struggle on large codebases. Modern Rust tools like **Biome** and **Oxlint** offer 25x faster execution and unified formatting without dependency bloat.

Through our [DevOps & Cloud Pipelines](/services/devops-cloud-infrastructure) and [Web App Optimization](/services/applications-web-pwa), TY Dev builds lightning-fast development pipelines.

---

### Highlights
- **Sub-Second Linting**: Format and lint thousands of files in under 300ms.
- **Unified Configuration**: Single \`biome.json\` eliminates conflicting rules.
- **Zero Supply-Chain Risk**: Standalone native binary without hundreds of unvetted packages.

[Talk with our developers](/contact) to modernize your continuous integration workflow.
`
  },
  {
    titleFr: "FinOps SaaS : Réduire de 50% la Facture AWS et GCP sans Risque de Disponibilité",
    titleEn: "SaaS FinOps: Slashing AWS & GCP Cloud Invoices by 50% Without Availability Risks",
    summaryFr: "Stratégies d'ingénierie financière cloud : instances Spot, autoscaling prédictif, compression des flux réseau et élimination des ressources dormantes.",
    summaryEn: "Cloud financial engineering tactics: Spot instances, predictive autoscaling, network traffic compression, and eliminating idle cloud assets.",
    category: "DevOps & Cloud",
    tags: ["FinOps", "AWS", "GCP", "Kubernetes", "CostOptimization", "Cloud"],
    contentFr: `
## Maîtriser l'Explosion des Coûts Cloud en Phase de Croissance

Lorsqu'un produit SaaS gagne en traction, la facture d'hébergement cloud a tendance à croître plus vite que le chiffre d'affaires si aucune gouvernance n'est instaurée. Surprovisionnement de mémoire, bases de données non dimensionnées, transferts de données inter-régions inutiles : le gaspillage financier moyen est estimé à **35%** chez les éditeurs logiciels.

La discipline du **FinOps (Financial Operations)** allie ingénierie logicielle et gestion financière pour maximiser chaque euro investi dans le cloud.

C'est l'un des piliers de notre accompagnement en [gestion d'infrastructure cloud](/services/devops-cloud-infrastructure).

---

### 1. Leviers Techniques d'Économie Immédiate

1. **Adoption Stratégique des Instances Spot avec Graceful Shutdown** : Réduction jusqu'à 80% du coût des nœuds de calcul Kubernetes pour les traitements asynchrones tolérants aux pannes.
2. **Optimisation des Transferts Egress & Compression HTTP** : Activation systématique de Zstandard / Brotli pour diviser la bande passante par deux.
3. **Autoscaling Prédictif avec KEDA** : Ajustement automatique du nombre de pods en fonction du nombre de messages en attente plutôt que de l'utilisation CPU brute.

---

### Conclusion

Le FinOps ne consiste pas à brider les performances, mais à éliminer le gaspillage pour réinvestir dans l'innovation. Pour réaliser un audit complet de vos infrastructures, explorez nos services de [développement SaaS sur-mesure](/services/saas-sur-mesure) ou [planifiez un audit avec TY Dev](/contact).
`,
    contentEn: `
## Taming Cloud Costs for High-Growth SaaS

Without strict FinOps practices, cloud infrastructure costs quickly outpace revenue growth. Over-provisioned databases, uncompressed egress bandwidth, and idle staging clusters cause massive financial waste.

At TY Dev, our [Cloud Infrastructure & DevOps Team](/services/devops-cloud-infrastructure) helps SaaS businesses slash cloud bills while enhancing system availability.

---

### Strategic Tactics
- **Kubernetes Spot Instances**: Up to 80% discount for fault-tolerant workers.
- **Brotli / Zstandard Compression**: Drastically cuts outgoing network transfer costs.
- **Predictive KEDA Autoscaling**: Scales containers based on business events rather than reactive CPU thresholds.

[Schedule a cloud optimization review with our team](/contact).
`
  },
  {
    titleFr: "WebAssembly (Wasm) dans le Navigateur : Exécuter des Traitements Lourds Côté Client sans Serveur",
    titleEn: "In-Browser WebAssembly (Wasm): Running Heavy Compute Tasks Client-Side Zero Server Cost",
    summaryFr: "Comment déporter le traitement d'images, de vidéos et de cryptographie directement sur la machine de l'utilisateur avec Rust et WebAssembly.",
    summaryEn: "How to offload image processing, video rendering, and heavy cryptography to the client browser using Rust and WebAssembly.",
    category: "Software Architecture",
    tags: ["WebAssembly", "Wasm", "Rust", "Frontend", "Performance", "Web"],
    contentFr: `
## Transformer le Navigateur en Moteur de Calcul Haute Performance

Traditionnellement, lorsqu'une application web doit traiter un fichier volumineux (redimensionnement d'images 4K, parsing de fichiers PDF de 500 pages, compression ZIP), le fichier est envoyé sur un serveur backend, traité, puis renvoyé au client. Ce flux génère d'importants coûts de bande passante, de serveurs de calcul et introduit des délais d'attente pour l'utilisateur.

Avec **WebAssembly (Wasm)**, les langages compilés tels que **Rust** ou **C++** s'exécutent directement dans le moteur du navigateur à une vitesse proche du code natif.

Dans nos créations d'[applications web et PWA innovantes](/services/applications-web-pwa), cette approche offre une réactivité instantanée et une confidentialité totale des données.

---

### 1. Avantages Stratégiques du Calcul Côté Client

- **Coût Serveur Zéro pour l'Éditeur** : La puissance de calcul de l'ordinateur ou du smartphone de l'utilisateur est exploitée gratuitement.
- **Confidentialité Totale (Zero-Knowledge)** : Les fichiers sensibles ne quittent jamais le navigateur, garantissant une conformité réglementaire absolue.
- **Fonctionnement Hors-Ligne (Offline-First)** : L'application continue de fonctionner même en cas de coupure de connexion internet.

\`\`\`rust
// Exemple de fonction Rust compilée en WebAssembly pour le traitement rapide d'image
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn apply_grayscale(pixels: &mut [u8]) {
    for chunk in pixels.chunks_exact_mut(4) {
        let r = chunk[0] as u32;
        let g = chunk[1] as u32;
        let b = chunk[2] as u32;
        let gray = ((r * 77 + g * 150 + b * 29) >> 8) as u8;
        chunk[0] = gray;
        chunk[1] = gray;
        chunk[2] = gray;
    }
}
\`\`\`

---

### Conclusion

WebAssembly ouvre des opportunités inédites pour bâtir des logiciels SaaS puissants, économiques et ultra-réactifs. Venez découvrir nos réalisations ou [contactez les ingénieurs TY Dev](/contact) pour intégrer WebAssembly dans vos plateformes.
`,
    contentEn: `
## Supercharging Client-Side Compute with WebAssembly

Sending heavy compute tasks (video transcoding, large document indexing, image parsing) to backend servers incurs significant bandwidth and compute bills. **WebAssembly (Wasm)** executes compiled Rust or C++ code directly inside the user's browser at near-native speeds.

Through our [Modern Web Apps & PWAs](/services/applications-web-pwa), TY Dev designs zero-server-cost architectures with instant responsiveness.

---

### Core Strengths
- **Zero Server Compute Costs**: Offloads CPU-intensive tasks to end-user hardware.
- **Absolute Privacy**: Sensitive documents never leave the client device.
- **Offline Reliability**: Native-grade execution even without internet connectivity.

[Connect with our engineering team](/contact) to explore WebAssembly for your platform.
`
  }
];

// 4. AI-Powered Dynamic Generator with Explicit Anti-Repetition Prompting
async function generateAIArticle(existingTitles = []) {
  const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.GROQ_API_KEY || process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;

  console.log('🤖 AI API Key detected! Generating brand new AI technical article with anti-repetition filter...');

  const excludedTopics = existingTitles.slice(0, 25).map(t => `- "${t}"`).join('\n');

  const prompt = `You are a Principal Software Architect at TY-DEV agency (specializing in SaaS, AI Agents, Cloud, DevOps, React, Vite, TanStack, Web Performance).
Your mission is to generate a brand-new, cutting-edge technical engineering article focusing strictly on NEW 2026 TECHNOLOGY TRENDS.

CRITICAL ANTI-REPETITION RULE:
The following topics have ALREADY been published. You are STRICTLY FORBIDDEN from repeating or duplicating any of them:
${excludedTopics}

Choose a fresh, advanced, and trending 2026 software engineering topic that hasn't been covered yet (e.g. Bun 2.0 vs Node 24 runtime benchmarks, Passkeys WebAuthn passwordless auth, Kubernetes GitOps with ArgoCD, Edge AI with ONNX Web in browser, GraphQL Federation vs tRPC microservices, Serverless Postgres with Neon branching, Playwright E2E testing strategies, DevSecOps OWASP API Top 10, Vector search Qdrant vs pgvector).

IMPORTANT FOR AGENCY SEO & INTERNAL LINKING:
In the French content ("contentFr"), naturally incorporate at least 2 markdown links pointing to TY Dev service pages:
- [développement SaaS sur-mesure](/services/saas-sur-mesure)
- [intégration d'agents IA et LLM](/services/integration-ia-llm)
- [infrastructure cloud et DevOps](/services/devops-cloud-infrastructure)
- [applications web et PWA](/services/applications-web-pwa)
- [optimisation SEO et performance web](/services/seo-et-marketing-digital)
- [contactez notre équipe TY Dev](/contact)

Respond strictly in valid JSON format with NO markdown wrapper outside the JSON object:
{
  "titleFr": "Titre professionnel et captivant en français",
  "titleEn": "Engaging professional title in English",
  "summaryFr": "Résumé concis de 2 phrases en français",
  "summaryEn": "Concise 2-sentence summary in English",
  "category": "Software Architecture",
  "tags": ["Tech", "Engineering", "Web"],
  "contentFr": "Contenu complet au format Markdown avec sections (##), sous-sections (###), exemples de code et liens internes",
  "contentEn": "Full content in Markdown format in English with headers (##), subheaders (###), code snippets and architectural advice"
}`;

  try {
    let jsonResult = null;

    if (process.env.OPENAI_API_KEY || process.env.GROQ_API_KEY || process.env.OPENROUTER_API_KEY) {
      const endpoint = process.env.GROQ_API_KEY
        ? 'https://api.groq.com/openai/v1/chat/completions'
        : (process.env.OPENROUTER_API_KEY ? 'https://openrouter.ai/api/v1/chat/completions' : 'https://api.openai.com/v1/chat/completions');
      const model = process.env.GROQ_API_KEY
        ? 'llama-3.3-70b-versatile'
        : (process.env.OPENROUTER_API_KEY ? 'meta-llama/llama-3.3-70b-instruct' : 'gpt-4o-mini');

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
        }),
      });

      const data = await response.json();
      const rawText = data.choices?.[0]?.message?.content;
      if (rawText) jsonResult = JSON.parse(rawText);
    } else if (process.env.GEMINI_API_KEY) {
      const geminiModels = ['gemini-2.5-flash', 'gemini-2.5-pro'];
      for (const model of geminiModels) {
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: 'application/json' }
            }),
          });
          const data = await response.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            jsonResult = JSON.parse(rawText);
            console.log(`🤖 Successfully generated article using ${model}`);
            break;
          }
        } catch (e) {
          console.warn(`Model ${model} issue: ${e.message}, trying next...`);
        }
      }
    }

    if (jsonResult && jsonResult.titleFr && jsonResult.contentFr) {
      console.log(`✨ AI Article Generated: "${jsonResult.titleFr}"`);
      return jsonResult;
    }
  } catch (err) {
    console.warn('⚠️ AI generation issue, falling back to curated library:', err.message);
  }
  return null;
}

// 5. Command Line Interface Execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const tokenArg = args.find(a => a.startsWith('--token='))?.split('=')[1];

  if (args.includes('--publish-next') || args.includes('--auto-daily')) {
    (async () => {
      const blogPostsFile = path.join(rootDir, 'src', 'data', 'blogPosts.ts');
      const fileContent = fs.readFileSync(blogPostsFile, 'utf-8');
      
      // Robust slug and title extraction
      const existingSlugs = new Set([...fileContent.matchAll(/(?:"slug"|slug)\s*:\s*["']([^"']+)["']/g)].map(m => m[1]));
      const existingTitles = [...fileContent.matchAll(/(?:"title"|title)\s*:\s*\{\s*[\r\n\s]*(?:"fr"|fr)\s*:\s*["']([^"'\r\n]+)["']/g)].map(m => m[1]);

      console.log(`📊 Found ${existingSlugs.size} existing published articles. Checking for non-duplicate topics...`);

      // Attempt AI Generation if API key is provided
      const aiArticle = await generateAIArticle(existingTitles);

      let articleToPublish = aiArticle;

      if (!articleToPublish) {
        // Filter out ANY article that has already been published
        const available = dailyArticlesLibrary.filter(item => {
          const slugCandidate = generateSlug(item.titleFr);
          return !existingSlugs.has(slugCandidate);
        });

        if (available.length === 0) {
          console.warn('⚠️ All 10 pre-configured library articles have been published! Please add an AI API key (GEMINI_API_KEY, GROQ_API_KEY, OPENAI_API_KEY) in .env to generate new topics dynamically without limit.');
          process.exit(0);
        }

        console.log(`🎯 Found ${available.length} available novel topics in library. Selecting next topic: "${available[0].titleFr}"`);
        articleToPublish = available[0];
      }

      publishArticle({
        ...articleToPublish,
        token: tokenArg || secretToken,
      });
    })();
  } else {
    console.log(`ℹ️ Usage: node scripts/publish_blog.mjs --publish-next [--token=${secretToken}]`);
  }
}
