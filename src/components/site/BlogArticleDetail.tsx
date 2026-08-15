import { useState } from "react";
import { ArrowLeft, Calendar, Share2, Tag, Check, Copy, Terminal, Info } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { type BlogPost } from "@/data/blogPosts";
import { Section } from "./Services";
import { ShareArticleModal } from "./ShareArticleModal";

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#080d1a] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)] font-mono text-xs text-left">
      {/* IDE Code Box Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[oklch(0.12_0.03_250)] border-b border-cyan-500/20 select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <div className="flex items-center gap-1.5 ml-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-bold tracking-widest text-cyan-300 uppercase bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              {language || "code"}
            </span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface/80 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 text-[11px] font-semibold transition-all duration-200 border border-cyan-500/20 hover:border-cyan-400"
          title="Copier le code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Copié !</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copier</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-5 overflow-x-auto text-cyan-100/90 leading-relaxed font-mono text-xs sm:text-sm bg-gradient-to-b from-[#080d1a] to-[#050811]">
        <pre className="m-0 p-0 bg-transparent border-0 font-mono">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
}

function RenderMarkdownContent({ content }: { content: string }) {
  // Split content into code block segments and text segments
  const parts = content.split(/(```[\s\S]*?```)/g);

  const renderInline = (text: string) => {
    const subParts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return subParts.map((part, pIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={pIdx} className="text-foreground font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={pIdx} className="text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-1.5 py-0.5 rounded font-mono text-xs">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const renderTable = (lines: string[], keyPrefix: string) => {
    const headerLine = lines[0];
    const bodyLines = lines.slice(2);

    const parseRow = (line: string) =>
      line
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell, idx, arr) => idx > 0 && idx < arr.length - 1);

    const headers = parseRow(headerLine);

    return (
      <div key={keyPrefix} className="my-8 overflow-x-auto rounded-2xl border border-cyan-500/30 bg-surface/40 backdrop-blur-md shadow-xl">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-cyan-500/30 bg-cyan-500/10">
              {headers.map((h, i) => (
                <th key={i} className="p-3.5 sm:p-4 font-mono font-bold text-cyan-300 uppercase tracking-wider text-xs">
                  {renderInline(h)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {bodyLines.map((rowLine, rIdx) => {
              const cells = parseRow(rowLine);
              return (
                <tr key={rIdx} className="hover:bg-cyan-500/5 transition-colors">
                  {cells.map((cell, cIdx) => (
                    <td key={cIdx} className="p-3.5 sm:p-4 text-muted-foreground/90 font-medium">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="prose prose-invert prose-cyan max-w-none">
      {parts.map((segment, sIdx) => {
        if (segment.startsWith("```") && segment.endsWith("```")) {
          const rawCode = segment.slice(3, -3);
          const firstNewLine = rawCode.indexOf("\n");
          const language = firstNewLine !== -1 ? rawCode.slice(0, firstNewLine).trim() : "";
          const code = firstNewLine !== -1 ? rawCode.slice(firstNewLine + 1) : rawCode;
          return <CodeBlock key={sIdx} code={code} language={language || "code"} />;
        }

        // Process text segment
        const lines = segment.split("\n");
        const elements: React.ReactNode[] = [];
        let tableBuffer: string[] = [];

        const flushTable = () => {
          if (tableBuffer.length >= 3) {
            elements.push(renderTable(tableBuffer, `table-${sIdx}-${elements.length}`));
          }
          tableBuffer = [];
        };

        lines.forEach((line, lIdx) => {
          const trimmed = line.trim();

          // Table line detection
          if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
            tableBuffer.push(trimmed);
            return;
          } else if (tableBuffer.length > 0) {
            flushTable();
          }

          if (trimmed.startsWith("## ")) {
            elements.push(
              <h2 key={`${sIdx}-${lIdx}`} className="font-display font-bold text-2xl sm:text-3xl text-cyan-300 mt-10 mb-5 pb-2 border-b border-cyan-500/20">
                {trimmed.replace("## ", "")}
              </h2>
            );
          } else if (trimmed.startsWith("### ")) {
            elements.push(
              <h3 key={`${sIdx}-${lIdx}`} className="font-display font-semibold text-xl sm:text-2xl text-foreground mt-8 mb-4">
                {trimmed.replace("### ", "")}
              </h3>
            );
          } else if (trimmed.startsWith("#### ")) {
            elements.push(
              <h4 key={`${sIdx}-${lIdx}`} className="font-display font-medium text-lg text-cyan-200 mt-6 mb-3">
                {trimmed.replace("#### ", "")}
              </h4>
            );
          } else if (trimmed.startsWith("- ")) {
            elements.push(
              <li key={`${sIdx}-${lIdx}`} className="text-muted-foreground/90 text-sm sm:text-base leading-relaxed ml-4 list-disc mb-2">
                {renderInline(trimmed.replace("- ", ""))}
              </li>
            );
          } else if (/^\d+\.\s*/.test(trimmed)) {
            elements.push(
              <li key={`${sIdx}-${lIdx}`} className="text-muted-foreground/90 text-sm sm:text-base leading-relaxed ml-4 list-decimal mb-2">
                {renderInline(trimmed.replace(/^\d+\.\s*/, ""))}
              </li>
            );
          } else if (trimmed.startsWith("> ")) {
            elements.push(
              <div key={`${sIdx}-${lIdx}`} className="my-6 p-4 rounded-2xl bg-cyan-500/10 border-l-4 border-cyan-400 text-cyan-200 text-sm flex items-start gap-3">
                <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>{renderInline(trimmed.replace("> ", ""))}</div>
              </div>
            );
          } else if (trimmed === "---") {
            elements.push(<hr key={`${sIdx}-${lIdx}`} className="my-8 border-cyan-500/20" />);
          } else if (trimmed !== "") {
            elements.push(
              <p key={`${sIdx}-${lIdx}`} className="text-muted-foreground/90 text-sm sm:text-base leading-relaxed mb-5">
                {renderInline(trimmed)}
              </p>
            );
          }
        });

        flushTable();

        return <div key={sIdx}>{elements}</div>;
      })}
    </div>
  );
}

export function BlogArticleDetail({ post }: { post: BlogPost }) {
  const { lang } = useI18n();
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Structured Data JSON-LD for single article
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[lang],
    description: post.summary[lang],
    image: post.image,
    datePublished: post.date.iso || "2026-08-15",
    dateModified: post.date.iso || "2026-08-15",
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "TY Dev",
      logo: {
        "@type": "ImageObject",
        url: "https://ty-dev.site/logo.jpg",
      },
    },
    mainEntityOfPage: {
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

      {/* Share Modal Component */}
      <ShareArticleModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        post={post}
        lang={lang}
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
              onClick={() => setIsShareOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-500 hover:text-slate-950 hover:scale-105 transition-all duration-300 shadow-md"
            >
              <Share2 className="w-4 h-4" />
              <span>
                {lang === "fr" ? "Partager l'article" : "Share Article"}
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
          <RenderMarkdownContent content={post.content[lang]} />

          {/* Article Footer Tags & Share Banner */}
          <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
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

            <button
              onClick={() => setIsShareOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_20px_oklch(0.75_0.18_200/0.3)] hover:scale-105"
            >
              <Share2 className="w-4 h-4" />
              <span>
                {lang === "fr" ? "Partager cet article" : "Share this Article"}
              </span>
            </button>
          </div>
        </div>
      </article>
    </Section>
  );
}

