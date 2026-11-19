'use client';

import { PageHeader } from "@/components/site/PageHeader";
import { Blog } from "@/components/site/Blog";
import { CtaStrip } from "@/components/site/CtaStrip";
import { useI18n } from "@/i18n/context";
import type { BlogPost } from "@/data/blogPosts";

export function BlogContent({ posts }: { posts: BlogPost[] }) {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow="// 06 — BLOG & TECH INSIGHTS"
        crumb={(t.nav as Record<string, string>).blog || "Blog"}
        title={lang === "fr" ? "Expertise technique &" : "Technical expertise &"}
        accent={lang === "fr" ? "analyses d'ingénierie." : "engineering insights."}
        subtitle={
          lang === "fr"
            ? "Découvrez nos guides, retours d'expérience et meilleures pratiques pour concevoir des applications web & SaaS haute performance."
            : "Explore our in-depth guides, architectural benchmarks, and best practices for high-performance SaaS applications."
        }
      />
      <Blog isPage initialPosts={posts} />
      <CtaStrip />
    </>
  );
}
