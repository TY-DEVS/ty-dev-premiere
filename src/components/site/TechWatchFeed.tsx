import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, RefreshCw, Heart, MessageSquare, Clock } from "lucide-react";
import { useI18n } from "@/i18n/context";

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  readable_publish_date: string;
  reading_time_minutes: number;
  public_reactions_count: number;
  comments_count: number;
  tag_list: string[];
  user: {
    name: string;
    profile_image: string;
  };
}

export function TechWatchFeed() {
  const { lang } = useI18n();
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTechNews = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("https://dev.to/api/articles?per_page=6&top=7");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechNews();
  }, []);

  return (
    <div className="mt-12">
      {/* Subheader Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-surface/50 border border-cyan-500/20 backdrop-blur-md mb-8">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <div>
            <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
              <span>{lang === "fr" ? "Veille Technologique & News IT en Direct" : "Live Tech Watch & Developer Feed"}</span>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {lang === "fr"
                ? "Flux agrégé en temps réel depuis les meilleures sources de développement web & ingénierie."
                : "Real-time aggregated developer news feed from top engineering & web sources."}
            </p>
          </div>
        </div>

        <button
          onClick={fetchTechNews}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>{lang === "fr" ? "Actualiser les Flux" : "Refresh Feed"}</span>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-80 rounded-3xl bg-surface/30 border border-border/40 animate-pulse p-6 flex flex-col justify-between"
            >
              <div className="w-full h-36 rounded-2xl bg-surface/60 mb-4" />
              <div className="w-3/4 h-5 rounded bg-surface/60 mb-2" />
              <div className="w-1/2 h-4 rounded bg-surface/60" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 p-8 rounded-3xl bg-surface/40 border border-border/50">
          <p className="text-sm text-muted-foreground mb-4">
            {lang === "fr"
              ? "Impossible de charger les flux de veille pour le moment."
              : "Unable to load live tech feed at this moment."}
          </p>
          <button
            onClick={fetchTechNews}
            className="px-6 py-2.5 rounded-full bg-cyan-500 text-slate-950 font-semibold text-xs"
          >
            {lang === "fr" ? "Réessayer" : "Try Again"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art, idx) => (
            <motion.a
              key={art.id}
              href={art.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[oklch(0.09_0.03_250)] to-[oklch(0.06_0.02_250)] border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-[0_15px_50px_-15px_oklch(0.75_0.18_200/0.35)] backdrop-blur-md p-6"
            >
              <div>
                {/* Cover Image fallback */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-surface/60 mb-5 border border-border/40">
                  <img
                    src={
                      art.cover_image ||
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
                    }
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {art.tag_list.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Author info */}
                <div className="flex items-center gap-2.5 mb-3">
                  <img
                    src={art.user.profile_image}
                    alt={art.user.name}
                    className="w-6 h-6 rounded-full border border-cyan-500/40"
                  />
                  <span className="text-xs text-muted-foreground font-medium truncate">
                    {art.user.name}
                  </span>
                  <span className="text-muted-foreground/40">•</span>
                  <span className="text-xs text-muted-foreground/70 font-mono">
                    {art.readable_publish_date}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-display font-semibold text-lg text-foreground mb-3 group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                  {art.title}
                </h4>

                {/* Description */}
                <p className="text-xs text-muted-foreground/80 line-clamp-3 leading-relaxed mb-6">
                  {art.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-border/40 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4 text-xs text-muted-foreground/70 font-mono">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-400" />
                    {art.public_reactions_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                    {art.comments_count}
                  </span>
                </div>

                <div className="p-2 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500 text-cyan-300 group-hover:text-slate-950 transition-all duration-300">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}
