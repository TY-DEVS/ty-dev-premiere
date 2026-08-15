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
const today = new Date().toISOString().split('T')[0];

// Static pages
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/services', priority: '0.9', changefreq: 'weekly' },
  { url: '/portfolio', priority: '0.9', changefreq: 'weekly' },
  { url: '/demos', priority: '0.9', changefreq: 'daily' },
  { url: '/blog', priority: '0.95', changefreq: 'daily' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.8', changefreq: 'monthly' },
];

// Service pages
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

async function generateSitemap() {
  const blogPostsFile = path.join(rootDir, 'src', 'data', 'blogPosts.ts');
  const content = fs.readFileSync(blogPostsFile, 'utf-8');

  // Extract blog posts array with exact publication dates (Jour J)
  let blogPosts = [];
  try {
    const marker = 'export const blogPosts: BlogPost[] = ';
    const startIdx = content.indexOf(marker);
    if (startIdx !== -1) {
      const arrayStart = startIdx + marker.length;
      const arrayEnd = content.lastIndexOf('];');
      if (arrayStart !== -1 && arrayEnd !== -1) {
        const jsonText = content.slice(arrayStart, arrayEnd + 1);
        blogPosts = JSON.parse(jsonText.trim());
      }
    }
  } catch (err) {
    console.warn('Fallback parsing for blogPosts in sitemap generator:', err.message);
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
  xml += `        xsi:schemaLocation="http://www.sitemap.org/schemas/sitemap/0.9 http://www.sitemap.org/schemas/sitemap/0.9/sitemap.xsd">\n`;

  // Add static routes
  for (const page of staticPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${domain}${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  // Add service landing pages
  for (const slug of serviceSlugs) {
    xml += `  <url>\n`;
    xml += `    <loc>${domain}/services/${slug}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.9</priority>\n`;
    xml += `  </url>\n`;
  }

  // Add blog posts with their EXACT publication date (Jour J de publication)
  for (const post of blogPosts) {
    const postLastMod = post.date?.iso || today;
    xml += `  <url>\n`;
    xml += `    <loc>${domain}/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${postLastMod}</lastmod>\n`;
    xml += `    <changefreq>daily</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  const outputPath = path.join(rootDir, 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log(`✅ Sitemap.xml generated successfully with ${staticPages.length + serviceSlugs.length + blogPosts.length} URLs at ${outputPath}`);
}

generateSitemap().catch(console.error);

