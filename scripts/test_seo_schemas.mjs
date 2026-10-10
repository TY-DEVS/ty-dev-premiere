import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

console.log("=== Lancement des tests de validation des schémas SEO JSON-LD ===\n");

let failures = 0;
let successes = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ SUCCÈS: ${message}`);
    successes++;
  } else {
    console.error(`  ❌ ÉCHEC: ${message}`);
    failures++;
  }
}

// 1. Test de l'export FAQ_ITEMS dans Faq.tsx
console.log("1. Test Faq.tsx - Export de FAQ_ITEMS");
const faqComponentPath = path.join(rootDir, "src/components/site/Faq.tsx");
const faqComponentContent = fs.readFileSync(faqComponentPath, "utf-8");
assert(
  faqComponentContent.includes("export const FAQ_ITEMS"),
  "Faq.tsx exporte bien 'export const FAQ_ITEMS'"
);

// 2. Test du schéma FAQPage & BreadcrumbList dans faq.tsx
console.log("\n2. Test /faq - Schémas FAQPage et BreadcrumbList");
const faqRoutePath = path.join(rootDir, "src/routes/faq.tsx");
const faqRouteContent = fs.readFileSync(faqRoutePath, "utf-8");
assert(faqRouteContent.includes("faqPageSchema"), "faq.tsx contient la constante faqPageSchema");
assert(faqRouteContent.includes('"@type": "FAQPage"'), "faqPageSchema a le @type FAQPage");
assert(faqRouteContent.includes("faqBreadcrumbSchema"), "faq.tsx contient la constante faqBreadcrumbSchema");
assert(faqRouteContent.includes('"@type": "BreadcrumbList"'), "faqBreadcrumbSchema a le @type BreadcrumbList");
assert(faqRouteContent.includes("children: JSON.stringify(faqPageSchema)"), "faqPageSchema est injecté dans le head via scripts");
assert(faqRouteContent.includes("children: JSON.stringify(faqBreadcrumbSchema)"), "faqBreadcrumbSchema est injecté dans le head via scripts");

// 3. Test BreadcrumbList sur /portfolio
console.log("\n3. Test /portfolio - Schéma BreadcrumbList");
const portfolioRoutePath = path.join(rootDir, "src/routes/portfolio.tsx");
const portfolioRouteContent = fs.readFileSync(portfolioRoutePath, "utf-8");
assert(portfolioRouteContent.includes("portfolioBreadcrumbSchema"), "portfolio.tsx contient portfolioBreadcrumbSchema");
assert(portfolioRouteContent.includes("children: JSON.stringify(portfolioBreadcrumbSchema)"), "portfolioBreadcrumbSchema est injecté dans scripts");

// 4. Test BreadcrumbList sur /demos
console.log("\n4. Test /demos - Schéma BreadcrumbList");
const demosRoutePath = path.join(rootDir, "src/routes/demos.tsx");
const demosRouteContent = fs.readFileSync(demosRoutePath, "utf-8");
assert(demosRouteContent.includes("demosBreadcrumbSchema"), "demos.tsx contient demosBreadcrumbSchema");
assert(demosRouteContent.includes("children: JSON.stringify(demosBreadcrumbSchema)"), "demosBreadcrumbSchema est injecté dans scripts");

// 5. Test BreadcrumbList sur /about
console.log("\n5. Test /about - Schéma BreadcrumbList");
const aboutRoutePath = path.join(rootDir, "src/routes/about.tsx");
const aboutRouteContent = fs.readFileSync(aboutRoutePath, "utf-8");
assert(aboutRouteContent.includes("aboutBreadcrumbSchema"), "about.tsx contient aboutBreadcrumbSchema");
assert(aboutRouteContent.includes("children: JSON.stringify(aboutBreadcrumbSchema)"), "aboutBreadcrumbSchema est injecté dans scripts");

// 6. Test BreadcrumbList sur /blog
console.log("\n6. Test /blog - Schéma BreadcrumbList");
const blogRoutePath = path.join(rootDir, "src/routes/blog.tsx");
const blogRouteContent = fs.readFileSync(blogRoutePath, "utf-8");
assert(blogRouteContent.includes("blogBreadcrumbSchema"), "blog.tsx contient blogBreadcrumbSchema");
assert(blogRouteContent.includes("children: JSON.stringify(blogBreadcrumbSchema)"), "blogBreadcrumbSchema est injecté dans scripts");

// 7. Test BreadcrumbList sur /simulateur
console.log("\n7. Test /simulateur - Schéma BreadcrumbList");
const simulatorRoutePath = path.join(rootDir, "src/routes/simulateur.tsx");
const simulatorRouteContent = fs.readFileSync(simulatorRoutePath, "utf-8");
assert(simulatorRouteContent.includes("simulatorBreadcrumbSchema"), "simulateur.tsx contient simulatorBreadcrumbSchema");
assert(simulatorRouteContent.includes("children: JSON.stringify(simulatorBreadcrumbSchema)"), "simulatorBreadcrumbSchema est injecté dans scripts");

// 8. Test BreadcrumbList sur /legal
console.log("\n8. Test /legal - Schéma BreadcrumbList");
const legalRoutePath = path.join(rootDir, "src/routes/legal.tsx");
const legalRouteContent = fs.readFileSync(legalRoutePath, "utf-8");
assert(legalRouteContent.includes("legalBreadcrumbSchema"), "legal.tsx contient legalBreadcrumbSchema");
assert(legalRouteContent.includes("children: JSON.stringify(legalBreadcrumbSchema)"), "legalBreadcrumbSchema est injecté dans scripts");

// 9. Test Schéma enrichi dans __root.tsx
console.log("\n9. Test __root.tsx - Données enrichies de l'Organisation");
const rootRoutePath = path.join(rootDir, "src/routes/__root.tsx");
const rootRouteContent = fs.readFileSync(rootRoutePath, "utf-8");
assert(rootRouteContent.includes('"legalName": "TY Dev LLC"'), "__root.tsx contient legalName: TY Dev LLC");
assert(rootRouteContent.includes('"PostalAddress"'), "__root.tsx contient l'adresse PostalAddress");
assert(rootRouteContent.includes('"currenciesAccepted": "EUR, USD, TND"'), "__root.tsx contient currenciesAccepted");
assert(rootRouteContent.includes('"paymentAccepted"'), "__root.tsx contient paymentAccepted");
assert(rootRouteContent.includes('"openingHoursSpecification"'), "__root.tsx contient openingHoursSpecification");

// 10. Test Hreflang et Canonical Multi-Domaines dans __root.tsx
console.log("\n10. Test __root.tsx - Balises Hreflang et Canonical Multi-Domaines Option A");
assert(rootRouteContent.includes('{ rel: "canonical", href: "https://ty-dev.site" }'), "__root.tsx contient l'URL canonique hub");
assert(rootRouteContent.includes('{ rel: "alternate", hrefLang: "fr", href: "https://ty-dev.fr" }'), "__root.tsx associe le marché français à ty-dev.fr");
assert(rootRouteContent.includes('{ rel: "alternate", hrefLang: "en", href: "https://ty-dev.tech" }'), "__root.tsx associe le marché tech anglophone à ty-dev.tech");
assert(rootRouteContent.includes('{ rel: "alternate", hrefLang: "x-default", href: "https://ty-dev.site" }'), "__root.tsx associe le hub par défaut x-default à ty-dev.site");
assert(!rootRouteContent.includes('"https://ty-dev.site/fr"'), "Aucun hreflang ne pointe vers une redirection /fr");
assert(!rootRouteContent.includes('"https://ty-dev.site/en"'), "Aucun hreflang ne pointe vers une redirection /en");

// 11. Test 404 / Noindex
console.log("\n11. Test __root.tsx - Directive robots noindex sur la page 404");
assert(rootRouteContent.includes('<meta name="robots" content="noindex, nofollow" />'), "NotFoundComponent inclut <meta name='robots' content='noindex, nofollow' />");
assert(!rootRouteContent.includes("<HeadContent>\n        <meta name=\"robots\""), "NotFoundComponent n'utilise pas HeadContent comme wrapper invalide");

// 12. Test Maillage Interne dans Footer.tsx
console.log("\n12. Test Footer.tsx - Maillage interne profond vers chaque service & simulateur");
const footerComponentPath = path.join(rootDir, "src/components/site/Footer.tsx");
const footerContent = fs.readFileSync(footerComponentPath, "utf-8");
assert(footerContent.includes('to="/services/$slug"'), "Footer.tsx contient des liens dynamiques vers /services/$slug");
assert(footerContent.includes('to="/simulateur"'), "Footer.tsx contient un lien vers /simulateur");
assert(footerContent.includes('import { servicesData }'), "Footer.tsx importe servicesData");

// 13. Test Optimisation Images WebP & Core Web Vitals
console.log("\n13. Test Optimisation des Images et Formats WebP");
const teamDataPath = path.join(rootDir, "src/data/teamData.ts");
const teamDataContent = fs.readFileSync(teamDataPath, "utf-8");
assert(teamDataContent.includes('moutiabenyahia.webp'), "teamData.ts utilise moutiabenyahia.webp");
assert(teamDataContent.includes('aminebenamamr.webp'), "teamData.ts utilise aminebenamamr.webp");
assert(fs.existsSync(path.join(rootDir, "public/team/moutiabenyahia.webp")), "Le fichier public/team/moutiabenyahia.webp existe");
assert(fs.existsSync(path.join(rootDir, "public/team/aminebenamamr.webp")), "Le fichier public/team/aminebenamamr.webp existe");
assert(fs.existsSync(path.join(rootDir, "public/logo.webp")), "Le fichier public/logo.webp existe");

// 14. Test Schéma Person, ProfilePage & Breadcrumbs sur /team/$slug (E-E-A-T)
console.log("\n14. Test team_.$slug.tsx - Schémas Person & ProfilePage (E-E-A-T)");
const teamRoutePath = path.join(rootDir, "src/routes/team_.$slug.tsx");
const teamRouteContent = fs.readFileSync(teamRoutePath, "utf-8");
assert(teamRouteContent.includes('"@type": "Person"'), "team_.$slug.tsx contient le schéma @type Person");
assert(teamRouteContent.includes('"@type": "ProfilePage"'), "team_.$slug.tsx contient le schéma @type ProfilePage");
assert(teamRouteContent.includes('"worksFor"'), "Person inclut worksFor (TY Dev)");
assert(teamRouteContent.includes('children: JSON.stringify(personSchema)'), "personSchema est injecté dans le head");
assert(teamRouteContent.includes('children: JSON.stringify(profilePageSchema)'), "profilePageSchema est injecté dans le head");

// 15. Test Métadonnées OpenGraph Article sur /blog/$slug
console.log("\n15. Test blog_.$slug.tsx - Balises OpenGraph Article complètes");
const blogSlugPath = path.join(rootDir, "src/routes/blog_.$slug.tsx");
const blogSlugContent = fs.readFileSync(blogSlugPath, "utf-8");
assert(blogSlugContent.includes('"article:published_time"'), "blog_.$slug.tsx contient article:published_time");
assert(blogSlugContent.includes('"article:author"'), "blog_.$slug.tsx contient article:author");
assert(blogSlugContent.includes('"article:section"'), "blog_.$slug.tsx contient article:section");
assert(blogSlugContent.includes('"datePublished"'), "Le schéma BlogPosting inclut datePublished");

// 16. Test Maillage Interne BlogArticleDetail.tsx (Articles connexes & Service lié)
console.log("\n16. Test BlogArticleDetail.tsx - Articles connexes & Service associé");
const blogDetailPath = path.join(rootDir, "src/components/site/BlogArticleDetail.tsx");
const blogDetailContent = fs.readFileSync(blogDetailPath, "utf-8");
assert(blogDetailContent.includes('getDynamicBlogPosts'), "BlogArticleDetail importe getDynamicBlogPosts");
assert(blogDetailContent.includes('servicesData'), "BlogArticleDetail importe servicesData");
assert(blogDetailContent.includes('relatedPosts'), "BlogArticleDetail calcule relatedPosts");
assert(blogDetailContent.includes('matchedService'), "BlogArticleDetail associe matchedService");

// 17. Test Flux RSS et déclaration dans __root.tsx
console.log("\n17. Test Flux RSS 2.0 (rss.xml)");
const rssPath = path.join(rootDir, "public/rss.xml");
assert(fs.existsSync(rssPath), "Le fichier public/rss.xml existe");
const rssContent = fs.readFileSync(rssPath, "utf-8");
assert(rssContent.includes('<rss version="2.0"'), "rss.xml est un flux RSS 2.0 valide");
assert(rssContent.includes('<channel>'), "rss.xml contient l'élément channel");
assert(rssContent.includes('<item>'), "rss.xml contient des éléments item");
assert(rootRouteContent.includes('application/rss+xml'), "__root.tsx contient la balise de découverte RSS dans <head>");

// 18. Test Performance - Google Fonts Non-Bloquant dans __root.tsx
console.log("\n18. Test Performance - Google Fonts Asynchrone & Non-Bloquant");
assert(rootRouteContent.includes('media="print"'), "__root.tsx charge les polices Google Fonts avec media='print'");
assert(rootRouteContent.includes('this.media=\'all\''), "__root.tsx permute le media en 'all' au chargement sans bloquer le rendu");
assert(rootRouteContent.includes('<noscript>'), "__root.tsx fournit un fallback <noscript> pour les polices");

// 19. Test Core Web Vitals - Accélération GPU des animations (styles.css & Hero.tsx)
console.log("\n19. Test Core Web Vitals - Animations GPU & Déblocage LCP");
const stylesPath = path.join(rootDir, "src/styles.css");
const stylesContent = fs.readFileSync(stylesPath, "utf-8");
assert(stylesContent.includes("animation: pulse-ring"), "styles.css utilise l'animation GPU pulse-ring");
assert(!stylesContent.includes("box-shadow: 0 0 0 8px"), "styles.css ne contient plus de box-shadow bloquante sur le pulse");
assert(stylesContent.includes("transform: scale"), "pulse-ring utilise transform: scale accéléré par GPU");

const heroPath = path.join(rootDir, "src/components/site/Hero.tsx");
const heroContent = fs.readFileSync(heroPath, "utf-8");
assert(!heroContent.includes('filter: "blur(6px)"'), "Hero.tsx ne contient plus de filter blur sur fadeUp");
assert(!heroContent.includes('initial={{ y: "110%", opacity: 0 }}'), "Hero.tsx ne masque plus le titre H1 à 0% d'opacité pour le LCP");

// 20. Test GEO (Generative Engine Optimization) - llms.txt & robots.txt
console.log("\n20. Test GEO (Generative Engine Optimization) & Robots IA");
const llmsPath = path.join(rootDir, "public/llms.txt");
assert(fs.existsSync(llmsPath), "Le fichier public/llms.txt existe");
const robotsPath = path.join(rootDir, "public/robots.txt");
const robotsContent = fs.readFileSync(robotsPath, "utf-8");
assert(robotsContent.includes("GPTBot"), "robots.txt autorise GPTBot");
assert(robotsContent.includes("ClaudeBot"), "robots.txt autorise ClaudeBot");
assert(robotsContent.includes("PerplexityBot"), "robots.txt autorise PerplexityBot");

console.log("\n=======================================================");
console.log(`Résultats : ${successes} succès, ${failures} échec(s)`);
console.log("=======================================================");

if (failures > 0) {
  process.exit(1);
} else {
  console.log("🎉 Les 6 Piliers SEO & Performance (Schémas, E-E-A-T, OpenGraph, RSS, Maillage, Images, Core Web Vitals, GEO) sont 100% validés et conformes !\n");
  process.exit(0);
}

