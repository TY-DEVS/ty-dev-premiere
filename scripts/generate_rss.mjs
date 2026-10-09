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
const domain = (envDomain || 'https://ty-dev.site').replace(/\/+$/, '');

function formatRFC822Date(dateStr) {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toUTCString();
    }
  } catch (e) {
    // Fallback
  }
  return new Date().toUTCString();
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function generateRss() {
  const blogPostsFile = path.join(rootDir, 'src', 'data', 'blogPosts.ts');
  const content = fs.readFileSync(blogPostsFile, 'utf-8');

  const startIndex = content.indexOf('export const blogPosts: BlogPost[] = [');
  if (startIndex === -1) {
    throw new Error('Impossible de localiser la constante blogPosts dans blogPosts.ts');
  }

  const arrayStart = content.indexOf('[', startIndex);
  const arrayEnd = content.lastIndexOf('];');
  const code = 'return ' + content.substring(arrayStart, arrayEnd + 1);
  const fn = new Function(code);
  const posts = fn();

  const nowRFC = new Date().toUTCString();

  let rss = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  rss += `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">\n`;
  rss += `  <channel>\n`;
  rss += `    <title>TY Dev — Blog &amp; Actualités Ingénierie Logicielle, SaaS &amp; IA</title>\n`;
  rss += `    <link>${domain}/blog</link>\n`;
  rss += `    <description>Articles techniques, guides d'architecture SaaS, développement web haute performance et intégration d'agents IA par TY Dev.</description>\n`;
  rss += `    <language>fr</language>\n`;
  rss += `    <lastBuildDate>${nowRFC}</lastBuildDate>\n`;
  rss += `    <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml" />\n`;
  rss += `    <image>\n`;
  rss += `      <url>${domain}/logo.jpg</url>\n`;
  rss += `      <title>TY Dev</title>\n`;
  rss += `      <link>${domain}</link>\n`;
  rss += `    </image>\n`;

  for (const post of posts) {
    const postUrl = `${domain}/blog/${post.slug}`;
    const titleFr = post.title?.fr || post.title?.en || 'Article TY Dev';
    const summaryFr = post.summary?.fr || post.summary?.en || '';
    const pubDate = formatRFC822Date(post.date?.iso || post.date?.fr);
    const authorName = post.author?.name || 'TY Dev Team';
    const category = post.category || 'Tech';

    rss += `    <item>\n`;
    rss += `      <title><![CDATA[${titleFr}]]></title>\n`;
    rss += `      <link>${postUrl}</link>\n`;
    rss += `      <guid isPermaLink="true">${postUrl}</guid>\n`;
    rss += `      <description><![CDATA[${summaryFr}]]></description>\n`;
    rss += `      <pubDate>${pubDate}</pubDate>\n`;
    rss += `      <category><![CDATA[${category}]]></category>\n`;
    rss += `      <dc:creator><![CDATA[${authorName}]]></dc:creator>\n`;
    if (post.image) {
      rss += `      <enclosure url="${escapeXml(post.image)}" type="image/jpeg" />\n`;
    }
    rss += `    </item>\n`;
  }

  rss += `  </channel>\n`;
  rss += `</rss>\n`;

  const outputPath = path.join(rootDir, 'public', 'rss.xml');
  fs.writeFileSync(outputPath, rss, 'utf-8');
  console.log(`✅ Flux RSS 2.0 généré avec succès (${posts.length} articles) à l'emplacement : ${outputPath}`);
}

generateRss().catch((err) => {
  console.error('❌ Erreur lors de la génération du flux RSS :', err);
  process.exit(1);
});
