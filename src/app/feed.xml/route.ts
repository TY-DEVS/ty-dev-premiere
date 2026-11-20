import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/keystatic";

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllBlogPosts();
  const siteUrl = "https://ty-dev.site";

  const escapeXml = (unsafe: string) =>
    unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

  const rssItems = posts
    .slice(0, 30)
    .map((post) => {
      const pubDate = post.date.iso
        ? new Date(post.date.iso).toUTCString()
        : new Date().toUTCString();

      return `
    <item>
      <title>${escapeXml(post.title.fr)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.summary.fr)}</description>
      <category>${escapeXml(post.category)}</category>
      <author>contact@ty-dev.site (${escapeXml(post.author.name)})</author>
    </item>`;
    })
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TY Dev Tech Blog &amp; Insights</title>
    <link>${siteUrl}/blog</link>
    <description>Articles techniques, guides d'architecture logicielle, développement SaaS moderne et automatisation IA par TY Dev.</description>
    <language>fr-FR</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rss.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
