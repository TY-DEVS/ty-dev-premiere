import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, BookOpen, Radio, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Section, SectionHeader } from "./Services";
import { getDynamicBlogPosts } from "@/data/blogPosts";
import { TechWatchFeed } from "./TechWatchFeed";

const POSTS_PER_PAGE = 6;

export function Blog({ isPage = false }: { isPage?: boolean }) {
  const { lang } = useI18n();
  const [activeTab, setActiveTab] = useState<"articles" | "live">("articles");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Dynamically rotated posts for today
  const blogPosts = useMemo(() => getDynamicBlogPosts(), []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogPosts.map((p) => p.category)));
    return lang === "fr"
      ? [{ id: "all", label: "Tous les sujets" }, ...cats.map((c) => ({ id: c, label: c }))]
      : [{ id: "all", label: "All Topics" }, ...cats.map((c) => ({ id: c, label: c }))];
  }, [lang, blogPosts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return blogPosts;
    return blogPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory, blogPosts]);

  // Reset to page 1 on category/tab change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeTab]);

  const featuredPost = blogPosts[0];

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = useMemo(() => {
    if (!isPage) return filteredPosts.slice(0, 3);
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage, isPage]);

  // SEO JSON-LD Structured Data for Blog
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "TY Dev Tech Blog & Insights",
    "description": "Articles techniques, guides d'architecture logicielle, SEO web, design systems et cybersécurité publiés par l'agence TY Dev.",
    "url": "https://ty-dev.site/blog",
    "blogPost": blogPosts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title[lang],
      "description": post.summary[lang],
      "datePublished": post.date.iso || "2026-08-13",
      "author": {
        "@type": "Person",
        "name": post.author.name,
      },
      "image": post.image,
      "url": `https://ty-dev.site/blog/${post.slug}`,
    })),
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const blogElem = document.getElementById("blog");
    if (blogElem) {
      blogElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section id="blog" className={isPage ? "!py-4 md:!py-10" : ""}>
      {/* Inject SEO JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {!isPage && (
        <SectionHeader
          title={
            lang === "fr" ? "Blog & Engineering Insights" : "Tech Blog & Engineering Insights"
          }
          subtitle={
            lang === "fr"
              ? "Analyses techniques, guides d'architecture SaaS, optimisation SEO et bonnes pratiques de développement web."
              : "Technical deep-dives, SaaS architecture guides, SEO performance, and software engineering best practices."
          }
        />
      )}

      {/* Modern Top Mode Switcher (Articles TY Dev vs Veille Tech Live) */}
      <div className={`${isPage ? "mt-0 md:mt-2" : "mt-6 md:mt-10"} flex flex-col items-center w-full px-2 sm:px-4`}>
        <div className="w-full max-w-sm sm:w-auto inline-flex items-center p-1 sm:p-1.5 rounded-2xl bg-surface/80 border border-cyan-500/20 backdrop-blur-xl shadow-2xl">
          <button
            onClick={() => setActiveTab("articles")}
            className={`flex-1 sm:flex-initial relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
              activeTab === "articles"
                ? "text-slate-950 font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeTab === "articles" && (
              <motion.div
                layoutId="activeBlogTab"
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-xl shadow-[0_0_20px_oklch(0.75_0.18_200/0.4)] z-0"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>{lang === "fr" ? "Articles TY Dev" : "TY Dev Articles"}</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab("live")}
            className={`flex-1 sm:flex-initial relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
              activeTab === "live"
                ? "text-slate-950 font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {activeTab === "live" && (
              <motion.div
                layoutId="activeBlogTab"
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300 rounded-xl shadow-[0_0_20px_oklch(0.75_0.18_200/0.4)] z-0"
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              <Radio className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 animate-pulse ${activeTab === "live" ? "text-slate-950" : "text-cyan-400"}`} />
              <span>{lang === "fr" ? "Veille Tech Live" : "Live Tech Watch"}</span>
            </span>
          </button>
        </div>

        {/* Sub-Category Minimalist Filter Line (Only shown for Articles) */}
        {activeTab === "articles" && (
          <div className="mt-4 sm:mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-6 border-b border-border/40 pb-4 max-w-4xl w-full">
            {categories.map((c) => {
              const isSelected = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`relative py-2 px-3 text-xs sm:text-sm font-medium transition-colors ${
                    isSelected ? "text-cyan-300 font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{c.label}</span>
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-300 shadow-[0_0_10px_oklch(0.75_0.18_200/0.8)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Render Content */}
      {activeTab === "live" ? (
        <TechWatchFeed />
      ) : (
        <>
          {/* Featured Article Card (Shown on page 1 when 'all' is active on Blog page) */}
          {isPage && activeCategory === "all" && currentPage === 1 && featuredPost && (
            <div className="mt-12">
              <Link
                to="/blog/$slug"
                params={{ slug: featuredPost.slug }}
                className="group relative flex flex-col lg:flex-row overflow-hidden rounded-3xl md:rounded-[36px] bg-gradient-to-br from-[oklch(0.1_0.03_250)] to-[oklch(0.06_0.02_250)] border border-cyan-500/30 hover:border-cyan-400/70 transition-all duration-700 hover:shadow-[0_25px_90px_-20px_oklch(0.75_0.18_200/0.35)] backdrop-blur-md"
              >
                {/* Image Area */}
                <div className="relative lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-cyan-500/20">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0.02_250)] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-xs font-mono font-bold uppercase tracking-wider shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
                    <span>{lang === "fr" ? "Publication du jour" : "Article of the Day"}</span>
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-8 sm:p-10 lg:w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="font-mono text-xs uppercase tracking-widest text-cyan-300 border border-cyan-500/30 bg-cyan-500/10 rounded-full px-3.5 py-1 font-semibold">
                        {featuredPost.category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {featuredPost.date[lang]}
                      </span>
                    </div>

                    <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground group-hover:text-cyan-300 transition-colors leading-tight mb-4">
                      {featuredPost.title[lang]}
                    </h2>

                    <p className="text-sm sm:text-base text-muted-foreground/80 leading-relaxed mb-6">
                      {featuredPost.summary[lang]}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-border/40 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-9 h-9 rounded-full border border-cyan-500/40 object-cover"
                      />
                      <div>
                        <p className="text-xs font-semibold text-foreground">
                          {featuredPost.author.name}
                        </p>
                        <p className="text-[10px] text-cyan-300 font-mono font-semibold tracking-wider uppercase">
                          {featuredPost.author.role}
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500 text-cyan-300 group-hover:text-slate-950 font-semibold text-xs transition-all duration-300 shadow-sm">
                      <span>{lang === "fr" ? "Lire l'article" : "Read Article"}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Grid of Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <AnimatePresence mode="popLayout">
              {paginatedPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                  className="h-full"
                >
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="group relative flex flex-col h-full overflow-hidden rounded-3xl bg-gradient-to-br from-[oklch(0.09_0.03_250)] to-[oklch(0.06_0.02_250)] border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-700 hover:shadow-[0_20px_80px_-20px_oklch(0.75_0.18_200/0.3)] backdrop-blur-md"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative aspect-video w-full overflow-hidden border-b border-cyan-500/20 bg-surface/50 shrink-0">
                      <img
                        src={post.image}
                        alt={post.title[lang]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 select-none pointer-events-none"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.06_0.02_250)] via-transparent to-transparent opacity-85" />
                    </div>

                    {/* Content Area */}
                    <div className="relative flex flex-col justify-between flex-grow p-6 sm:p-7">
                      <div>
                        {/* Badges */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300 border border-cyan-500/30 bg-cyan-500/10 rounded-full px-3 py-0.5 font-semibold">
                            {post.category}
                          </span>
                          <span className="text-[11px] text-muted-foreground/70 flex items-center gap-1 font-mono">
                            <Calendar className="w-3 h-3 text-cyan-400" />
                            {post.date[lang]}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display font-semibold text-xl text-foreground mb-3 group-hover:text-cyan-300 transition-colors leading-snug line-clamp-2">
                          {post.title[lang]}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-muted-foreground/80 leading-relaxed line-clamp-3 mb-6">
                          {post.summary[lang]}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="pt-4 border-t border-border/40 flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-7 h-7 rounded-full border border-cyan-500/30 object-cover"
                          />
                          <div>
                            <p className="text-xs font-semibold text-foreground truncate max-w-[130px]">
                              {post.author.name}
                            </p>
                            <p className="text-[9px] text-cyan-300 font-mono font-semibold uppercase tracking-wider">
                              {post.author.role}
                            </p>
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-1.5 text-xs text-cyan-400 font-semibold group-hover:text-cyan-300 transition-colors">
                          <span>{lang === "fr" ? "Lire" : "Read"}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination Controls (Only on Blog page if totalPages > 1) */}
          {isPage && totalPages > 1 && (
            <div className="mt-14 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2.5 rounded-xl bg-surface/60 border border-border/60 text-foreground hover:border-cyan-400 hover:text-cyan-300 disabled:opacity-40 disabled:hover:border-border/60 disabled:hover:text-foreground transition-all"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-xl font-mono text-xs font-semibold transition-all ${
                    currentPage === page
                      ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_oklch(0.75_0.18_200/0.4)]"
                      : "bg-surface/50 border border-border/60 text-muted-foreground hover:text-foreground hover:border-cyan-500/40"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2.5 rounded-xl bg-surface/60 border border-border/60 text-foreground hover:border-cyan-400 hover:text-cyan-300 disabled:opacity-40 disabled:hover:border-border/60 disabled:hover:text-foreground transition-all"
                aria-label="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}

      {/* Button to view full Blog on home page preview */}
      {!isPage && (
        <div className="mt-16 flex justify-center">
          <Link
            to="/blog"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-surface/40 border border-border/80 text-foreground font-semibold shadow-[0_10px_30px_-10px_oklch(0.6_0.22_265/0.2)] hover:bg-cyan-500 hover:border-cyan-400 hover:text-slate-950 hover:shadow-[0_15px_40px_-10px_oklch(0.75_0.18_200/0.4)] transition-all duration-300 hover:-translate-y-1"
          >
            <span>{lang === "fr" ? "Voir tous nos articles" : "Explore All Tech Articles"}</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </Section>
  );
}
