import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Share2, Tag, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { type BlogPost } from "@/data/blogPosts";
import { Section } from "./Services";
import { useState } from "react";

export function BlogArticleDetail({ post }: { post: BlogPost }) {
  const { lang } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Structured Data JSON-LD for single article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title[lang],
    "description": post.summary[lang],
    "image": post.image,
    "datePublished": "2026-02-10",
    "dateModified": "2026-02-10",
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role,
    },
    "publisher": {
      "@type": "Organization",
      "name": "TY Dev",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ty-dev.site/tydev-logo.svg",
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ty-dev.site/blog/${post.slug}`,
    },
  };

  return (
    <Section id="article-detail" className="pt-28 pb-20">
      {/* Inject SEO JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Navigation Top Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 border border-cyan-500/20 text-cyan-300 text-xs font-semibold hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === "fr" ? "Retour à tous les articles" : "Back to All Articles"}</span>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto">
        {/* Header Metadata */}
        <header className="mb-10 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-300 border border-cyan-500/30 bg-cyan-500/10 rounded-full px-4 py-1 font-semibold">
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              {post.date[lang]}
            </span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight mb-6">
            {post.title[lang]}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground/90 leading-relaxed mb-8">
            {post.summary[lang]}
          </p>

          {/* Author Card & Share Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-surface/40 border border-border/60 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full border-2 border-cyan-500/40 object-cover"
              />
              <div>
                <h4 className="font-display font-semibold text-foreground text-sm">
                  {post.author.name}
                </h4>
                <p className="text-xs text-cyan-300 font-mono font-semibold tracking-wider uppercase">
                  {post.author.role}
                </p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>
                {copied
                  ? lang === "fr"
                    ? "Lien copié !"
                    : "Link Copied!"
                  : lang === "fr"
                  ? "Partager l'article"
                  : "Share Article"}
              </span>
            </button>
          </div>
        </header>

        {/* Hero Cover Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-cyan-500/20 mb-12 shadow-2xl">
          <img
            src={post.image}
            alt={post.title[lang]}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[oklch(0.09_0.03_250)] to-[oklch(0.06_0.02_250)] border border-cyan-500/20 backdrop-blur-md shadow-2xl">
          <div className="prose prose-invert prose-cyan max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-2xl prose-h2:text-cyan-300 prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:text-foreground prose-p:text-muted-foreground/90 prose-p:leading-relaxed prose-li:text-muted-foreground/90 prose-strong:text-foreground prose-code:text-cyan-300 prose-code:bg-surface/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded">
            {post.content[lang].split("\n").map((paragraph, idx) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={idx} className="font-display font-bold text-2xl text-cyan-300 mt-8 mb-4">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={idx} className="font-display font-semibold text-xl text-foreground mt-6 mb-3">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.startsWith("#### ")) {
                return (
                  <h4 key={idx} className="font-display font-medium text-lg text-cyan-200 mt-4 mb-2">
                    {paragraph.replace("#### ", "")}
                  </h4>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <li key={idx} className="text-muted-foreground/90 text-sm sm:text-base leading-relaxed ml-4 list-disc">
                    {paragraph.replace("- ", "")}
                  </li>
                );
              }
              if (paragraph.startsWith("1. ") || paragraph.startsWith("2. ") || paragraph.startsWith("3. ")) {
                return (
                  <li key={idx} className="text-muted-foreground/90 text-sm sm:text-base leading-relaxed ml-4 list-decimal">
                    {paragraph.replace(/^\d+\.\s*/, "")}
                  </li>
                );
              }
              if (paragraph.trim() === "---") {
                return <hr key={idx} className="my-8 border-cyan-500/20" />;
              }
              if (paragraph.trim() !== "") {
                return (
                  <p key={idx} className="text-muted-foreground/90 text-sm sm:text-base leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              }
              return null;
            })}
          </div>

          {/* Article Footer Tags */}
          <div className="mt-12 pt-6 border-t border-border/40 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground flex items-center gap-1 mr-2">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              Tags:
            </span>
            {post.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] px-3 py-1 rounded-full bg-surface/60 border border-border/50 text-muted-foreground"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Section>
  );
}
