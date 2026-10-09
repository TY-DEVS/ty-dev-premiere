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

// 10. Test Hreflang et Canonical dans __root.tsx
console.log("\n10. Test __root.tsx - Balises Hreflang et Canonical conformes Google");
assert(rootRouteContent.includes('{ rel: "canonical", href: "https://ty-dev.site" }'), "__root.tsx contient l'URL canonique");
assert(rootRouteContent.includes('{ rel: "alternate", hrefLang: "fr", href: "https://ty-dev.site" }'), "__root.tsx contient alternate fr");
assert(rootRouteContent.includes('{ rel: "alternate", hrefLang: "en", href: "https://ty-dev.site" }'), "__root.tsx contient alternate en");
assert(rootRouteContent.includes('{ rel: "alternate", hrefLang: "x-default", href: "https://ty-dev.site" }'), "__root.tsx contient alternate x-default");
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

console.log("\n=======================================================");
console.log(`Résultats : ${successes} succès, ${failures} échec(s)`);
console.log("=======================================================");

if (failures > 0) {
  process.exit(1);
} else {
  console.log("🎉 Toutes les optimisations SEO (Schémas, Hreflang, 404, Maillage, Images) sont 100% validées et conformes !\n");
  process.exit(0);
}
