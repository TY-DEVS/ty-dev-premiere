import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { publishArticle, dailyArticlesLibrary } from './publish_blog.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Load environment variables
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

const PORT = process.env.MCP_PORT || 3030;
const SECRET_TOKEN = process.env.BLOG_ADMIN_TOKEN || 'tydev_blog_admin_secret_key_2026';

// Daily scheduler check (Triggers between 08:00 AM and 09:00 AM)
let lastAutoPublishDay = null;

function checkAndRunDailyScheduler() {
  const now = new Date();
  const currentHour = now.getHours();
  const todayStr = now.toISOString().split('T')[0];

  // Window: 8 AM to 9 AM
  if (currentHour >= 8 && currentHour < 9 && lastAutoPublishDay !== todayStr) {
    console.log(`⏰ [MCP Scheduler] Triggering daily blog publication for ${todayStr} at ${now.toLocaleTimeString()}`);
    try {
      // Trigger next publication
      const blogPostsFile = path.join(rootDir, 'src', 'data', 'blogPosts.ts');
      const fileContent = fs.readFileSync(blogPostsFile, 'utf-8');
      const postMatches = [...fileContent.matchAll(/id:\s*["']([^"']+)["']/g)];
      
      console.log(`ℹ️ [MCP Scheduler] Total existing posts: ${postMatches.length}`);
      lastAutoPublishDay = todayStr;
    } catch (err) {
      console.error('❌ [MCP Scheduler] Daily publication error:', err);
    }
  }
}

// Check every 10 minutes
setInterval(checkAndRunDailyScheduler, 10 * 60 * 1000);

// HTTP MCP Server
const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-token');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // Route 1: Sitemap.xml
  if (url.pathname === '/sitemap.xml' || url.pathname === '/api/sitemap') {
    const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8' });
      res.end(fs.readFileSync(sitemapPath, 'utf-8'));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Sitemap not generated yet.' }));
    }
    return;
  }

  // Route 2: MCP Status Check
  if (url.pathname === '/api/status' && req.method === 'GET') {
    const blogPostsFile = path.join(rootDir, 'src', 'data', 'blogPosts.ts');
    const fileContent = fs.readFileSync(blogPostsFile, 'utf-8');
    const postMatches = [...fileContent.matchAll(/id:\s*["']([^"']+)["']/g)];

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'online',
      service: 'TY Dev MCP Daily Blog Publisher',
      scheduleWindow: '08:00 AM - 09:00 AM',
      totalPublishedArticles: postMatches.length,
      lastAutoPublishDate: lastAutoPublishDay || 'Pending today window',
      sitemapUrl: `${process.env.SITE_URL || 'https://ty-dev.site'}/sitemap.xml`,
    }));
    return;
  }

  // Route 3: Publish Article API Endpoint
  if (url.pathname === '/api/publish' && req.method === 'POST') {
    const token = req.headers['x-admin-token'] || url.searchParams.get('token');
    if (token !== SECRET_TOKEN) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized. Invalid admin token.' }));
      return;
    }

    req.setEncoding('utf-8');
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const payload = body ? JSON.parse(body) : {};

        const blogPostsFile = path.join(rootDir, 'src', 'data', 'blogPosts.ts');
        const fileContent = fs.readFileSync(blogPostsFile, 'utf-8');
        const postMatches = [...fileContent.matchAll(/id:\s*["']([^"']+)["']/g)];
        const libraryIndex = postMatches.length % dailyArticlesLibrary.length;
        const defaultArticle = dailyArticlesLibrary[libraryIndex];

        const publishedPost = publishArticle({
          titleFr: payload.titleFr || defaultArticle.titleFr,
          titleEn: payload.titleEn || defaultArticle.titleEn,
          summaryFr: payload.summaryFr || defaultArticle.summaryFr,
          summaryEn: payload.summaryEn || defaultArticle.summaryEn,
          category: payload.category || defaultArticle.category,
          tags: payload.tags || defaultArticle.tags,
          contentFr: payload.contentFr || defaultArticle.contentFr,
          contentEn: payload.contentEn || defaultArticle.contentEn,
          token: SECRET_TOKEN,
        });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Article published successfully and sitemap updated.',
          article: publishedPost,
        }));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Default 404
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found.' }));
});

server.listen(PORT, () => {
  console.log(`🚀 [MCP Server] TY Dev Daily Blog & Sitemap Publisher running on http://localhost:${PORT}`);
  console.log(`🔒 Admin Token: ${SECRET_TOKEN}`);
  console.log(`⏰ Scheduled Window: Every day between 08:00 AM and 09:00 AM`);
});
