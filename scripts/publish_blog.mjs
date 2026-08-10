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
  { name: 'Moutia Ben Yahia', role: 'CEO', avatar: '/team/moutiabenyahia.png' },
  { name: 'Mohamed Yassine Ben Yaala', role: 'CO-FOUNDER', avatar: '/team/mohamedyassinbenyaala.jfif' },
  { name: 'Amine Ben Ammar', role: 'CO-FOUNDER', avatar: '/team/aminebenamamr.jpg' },
  { name: 'Mohamed Ben Khemis', role: 'DEVOPS ENGINEER', avatar: '/team/mohamedbenkhemis.jfif' },
  { name: 'Mohamed Ben Yahia', role: 'FULL STACK DEVELOPER', avatar: '/team/mohamedbenyahia.jpg' },
];

// 2. High-Quality Royalty-Free Technical Image Pool (30 Unique Images - NO AI IMAGES)
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
  const year = date.getFullYear();

  return {
    fr: `${day} ${monthsFr[monthIdx]} ${year}`,
    en: `${monthsEn[monthIdx]} ${day}, ${year}`,
  };
}

// Published Article Generator / Inserter
export function publishArticle({ titleFr, titleEn, summaryFr, summaryEn, category, image, tags, contentFr, contentEn, token }) {
  if (token && token !== secretToken) {
    throw new Error('❌ Invalid authentication token. Permission denied.');
  }

  const blogPostsFile = path.join(rootDir, 'src', 'data', 'blogPosts.ts');
  let fileContent = fs.readFileSync(blogPostsFile, 'utf-8');

  // Count existing posts to calculate rotation indices
  const postMatches = [...fileContent.matchAll(/id:\s*["']([^"']+)["']/g)];
  const existingCount = postMatches.length;

  // Determine rotated author and image
  const author = teamAuthors[existingCount % teamAuthors.length];
  const selectedImage = image || imagePool[existingCount % imagePool.length];

  const slug = titleFr
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

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

  const newPostObjectString = `\n  ${JSON.stringify(newPost, null, 4).replace(/"([^"]+)":/g, '$1:')},`;
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

// Pre-configured Daily Article Library (Category-rotated, Modern 2026 Topics + Occasional AI Integration)
const dailyArticlesLibrary = [
  {
    titleFr: "Intégration d'Agents IA & LLM dans les SaaS : Automatiser les Workflows Métiers en 2026",
    titleEn: "Integrating AI Agents & LLMs in SaaS: Automating Business Workflows in 2026",
    summaryFr: "Comment connecter vos bases de données aux modèles d'IA (RAG, Function Calling, LangChain) pour décupler la valeur apportée à vos utilisateurs.",
    summaryEn: "How to connect enterprise databases to AI models (RAG, Function Calling) to multiply end-user value.",
    category: "IA & Automatisation",
    tags: ["IA", "LLM", "SaaS", "Automation", "RAG"],
    contentFr: `\n## L'IA Générative Intégrée au Cœur des Logiciels\n\nEn 2026, l'intégration de capacités d'IA au sein des plateformes SaaS ne se limite plus à un simple chatbot basique...\n\n### Architectures RAG (Retrieval-Augmented Generation) :\n- Indexation vectorielle des données clients (Pinecone / Pgvector).\n- Réponses ultra-précises basées sur la documentation propre à l'entreprise.\n- Confidentialité des données garantie sans ré-entraînement des modèles.\n`,
    contentEn: `\n## Embedded Generative AI in Core SaaS Platforms\n\nIntegrating AI capabilities into SaaS platforms extends far beyond simple chatbots...\n\n### RAG Architectures:\n- Vector indexing of customer data.\n- Grounded, accurate answers based on internal documentation.\n- Zero data leaks with privacy compliance.\n`,
  },
  {
    titleFr: "GraphQL vs REST API : Quelle Stratégie Adopter pour Vos Applications Web en 2026 ?",
    titleEn: "GraphQL vs REST API: Which Strategy to Adopt for Web Apps in 2026?",
    summaryFr: "Comparatif technique approfondie sur la gestion du sur-chargement de données, le requêtage typé et les performances des APIs d'entreprise.",
    summaryEn: "Technical benchmark on data over-fetching, strongly typed queries, and enterprise API performance.",
    category: "Engineering & API",
    tags: ["GraphQL", "REST", "APIs", "Backend", "Performance"],
    contentFr: `\n## GraphQL vs REST : Le Débat des Architectes en 2026\n\nLe choix du protocole de communication d'APIs impacte directement la réactivité de l'application...\n\n### Quand choisir GraphQL ?\n- Applications mobiles complexes avec bandes passantes réduites.\n- Tableaux de bord multi-données nécessitant un requêtage dynamique.\n`,
    contentEn: `\n## GraphQL vs REST: The Architects' Choice\n\nAPI architecture dictates network performance and client query complexity...\n\n### When to choose GraphQL?\n- Complex mobile apps with constrained bandwidth.\n- Multi-widget dashboards demanding dynamic data fetching.\n`,
  },
];

// Command Line Interface Execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const tokenArg = args.find(a => a.startsWith('--token='))?.split('=')[1];

  if (args.includes('--publish-next') || args.includes('--auto-daily')) {
    const blogPostsFile = path.join(rootDir, 'src', 'data', 'blogPosts.ts');
    const fileContent = fs.readFileSync(blogPostsFile, 'utf-8');
    const postMatches = [...fileContent.matchAll(/id:\s*["']([^"']+)["']/g)];
    const libraryIndex = postMatches.length % dailyArticlesLibrary.length;
    const articleToPublish = dailyArticlesLibrary[libraryIndex];

    publishArticle({
      ...articleToPublish,
      token: tokenArg || secretToken,
    });
  } else {
    console.log(`ℹ️ Usage: node scripts/publish_blog.mjs --publish-next [--token=${secretToken}]`);
  }
}
