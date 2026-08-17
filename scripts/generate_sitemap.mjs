import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

let envDomain = process.env.SITE_URL;
if (!envDomain) {
  try {
    const envContent = fs.readFileSync(path.join(rootDir, '.env'), 'utf-8');
    const match = envContent.match(/SITE_URL=["']?([^"'\r\n]+)["']?/);
    if (match) envDomain = match[1];
  } catch (e) {
    // Ignore error
  }
}
const domain = envDomain || 'https://ty-dev.site';

// Stable modification date for static pages to avoid misleading Google with fake daily lastmods
const STATIC_LASTMOD = '2026-08-15';

// Static pages
const staticPages = [
  { url: '/', lastmod: STATIC_LASTMOD, priority: '1.0', changefreq: 'weekly' },
  { url: '/services', lastmod: STATIC_LASTMOD, priority: '0.9', changefreq: 'weekly' },
  { url: '/portfolio', lastmod: STATIC_LASTMOD, priority: '0.9', changefreq: 'weekly' },
  { url: '/demos', lastmod: STATIC_LASTMOD, priority: '0.9', changefreq: 'weekly' },
  { url: '/blog', lastmod: STATIC_LASTMOD, priority: '0.95', changefreq: 'daily' },
  { url: '/about', lastmod: STATIC_LASTMOD, priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', lastmod: STATIC_LASTMOD, priority: '0.8', changefreq: 'monthly' },
];

// Service subpages
const serviceSlugs = [
  "saas-sur-mesure",
  "applications-web-pwa",
  "seo-et-marketing-digital",
  "automatisation-processus-metiers",
  "e-commerce-et-integrations",
  "integration-apis-webhooks",
  "devops-cloud-infrastructure",
  "integration-ia-llm",
];

function extractBlogPosts(fileContent) {
  const posts = [];
  const slugRegex = /["']?slug["']?\s*:\s*["']([^"']+)["']/g;
  const matches = [...fileContent.matchAll(slugRegex)];

  for (const match of matches) {
    const slug = match[1];
    const startIndex = match.index;
    const chunk = fileContent.slice(startIndex, startIndex + 800);
    const isoMatch = chunk.match(/["']?iso["']?\s*:\s*["']([^"']+)["']/);

    posts.push({
      slug,
      iso: isoMatch ? isoMatch[1] : STATIC_LASTMOD
    });
  }
  return posts;
}

async function generateSitemap() {
  const blogPostsFile = path.join(rootDir, 'src', 'data', 'blogPosts.ts');
  const content = fs.readFileSync(blogPostsFile, 'utf-8');

  // Robustly extract all blog posts and their exact publication dates
  const blogPosts = extractBlogPosts(content);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
  xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n`;

  // Add main static pages
  for (const page of staticPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${domain}${page.url}</loc>\n`;
    xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Add service landing subpages
  for (const slug of serviceSlugs) {
    xml += `  <url>\n`;
    xml += `    <loc>${domain}/services/${slug}</loc>\n`;
    xml += `    <lastmod>${STATIC_LASTMOD}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;
  }

  // Add all blog posts with their actual publication date
  for (const post of blogPosts) {
    xml += `  <url>\n`;
    xml += `    <loc>${domain}/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${post.iso}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  const outputPath = path.join(rootDir, 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log(`✅ Sitemap.xml generated successfully with ${staticPages.length + serviceSlugs.length + blogPosts.length} URLs (including ${blogPosts.length} blog articles) at ${outputPath}`);
}

generateSitemap().catch(console.error);


