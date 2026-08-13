import { useState } from "react";
import { type BlogPost } from "@/data/blogPosts";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Share2, Copy, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface ShareArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost;
  lang: "fr" | "en";
}

// Brand SVG Icons
const LinkedInIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.65 13.75 5.65c1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.23 0-1.62.77-1.62 1.56V12h2.73l-.44 3h-2.29v6.8c4.56-.93 8-4.96 8-9.8z" />
  </svg>
);

export function ShareArticleModal({ isOpen, onClose, post, lang }: ShareArticleModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  // Always build exact canonical link to the specific post slug
  const getArticleUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/blog/${post.slug}`;
    }
    return `https://ty-dev.site/blog/${post.slug}`;
  };

  const articleUrl = getArticleUrl();
  const titleText = post.title[lang];
  const summaryText = post.summary[lang];

  // Copy Direct Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopiedLink(true);
    toast.success(lang === "fr" ? "Lien copié dans le presse-papier !" : "Link copied to clipboard!");
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Popup helper
  const openShareWindow = (url: string) => {
    const width = 600;
    const height = 650;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      url,
      "share-window",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );
  };

  // Share Handlers
  const shareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      articleUrl
    )}`;
    openShareWindow(url);
  };

  const shareX = () => {
    const text = encodeURIComponent(`"${titleText}"\n\n${summaryText}`);
    const url = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
      articleUrl
    )}&via=tydev_tech&hashtags=${post.tags.slice(0, 3).join(",")}`;
    openShareWindow(url);
  };

  const shareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      articleUrl
    )}`;
    openShareWindow(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="!max-w-xl !w-[94vw] p-5 sm:p-7 flex flex-col gap-0 bg-[oklch(0.08_0.03_250)] border border-cyan-500/30 backdrop-blur-2xl shadow-[0_25px_100px_-15px_oklch(0.75_0.18_200/0.4)] rounded-3xl text-foreground overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-cyan-500/20">
          <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_oklch(0.75_0.18_200/0.2)] shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <DialogTitle className="font-display font-bold text-lg sm:text-xl text-foreground tracking-tight truncate">
              {lang === "fr" ? "Partager l'article" : "Share Article"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground/90 mt-0.5 font-medium truncate">
              {lang === "fr"
                ? "Choisissez un réseau pour publier cet article"
                : "Select a network to publish this article"}
            </DialogDescription>
          </div>
        </div>

        {/* Article Preview Box */}
        <div className="p-3 sm:p-4 rounded-2xl bg-surface/50 border border-cyan-500/20 flex gap-3.5 items-center mb-6 shadow-inner w-full min-w-0">
          <img
            src={post.image}
            alt={post.title[lang]}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-cyan-500/30 shadow-md"
          />
          <div className="flex-1 min-w-0 overflow-hidden">
            <span className="inline-block font-mono text-[9px] uppercase font-bold text-cyan-300 bg-cyan-500/15 border border-cyan-500/30 rounded-full px-2.5 py-0.5 mb-1 tracking-wider">
              {post.category}
            </span>
            <h4 className="font-display font-semibold text-xs sm:text-sm text-foreground truncate leading-snug">
              {post.title[lang]}
            </h4>
            <p className="text-[11px] text-muted-foreground/80 line-clamp-2 mt-0.5 leading-relaxed">
              {post.summary[lang]}
            </p>
          </div>
        </div>

        {/* 3 Premium Network Cards Grid: LinkedIn, X (Twitter), Facebook */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-6 w-full min-w-0">
          {/* LinkedIn */}
          <button
            onClick={shareLinkedIn}
            className="group relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-surface/40 border border-border/60 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_oklch(0.75_0.18_200/0.3)] min-w-0"
          >
            <div className="p-3 sm:p-3.5 rounded-2xl bg-[#0077b5]/20 text-[#0077b5] group-hover:bg-[#0077b5] group-hover:text-white transition-all duration-300 mb-2 shadow-md group-hover:scale-110">
              <LinkedInIcon />
            </div>
            <span className="font-display font-bold text-xs text-foreground group-hover:text-cyan-300 transition-colors truncate max-w-full">
              LinkedIn
            </span>
            <span className="text-[9px] text-muted-foreground mt-0.5 font-mono truncate max-w-full hidden sm:block">
              Pro Network
            </span>
          </button>

          {/* X (Twitter) */}
          <button
            onClick={shareX}
            className="group relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-surface/40 border border-border/60 hover:border-white/60 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.2)] min-w-0"
          >
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-all duration-300 mb-2 shadow-md group-hover:scale-110">
              <XIcon />
            </div>
            <span className="font-display font-bold text-xs text-foreground group-hover:text-white transition-colors truncate max-w-full">
              X
            </span>
            <span className="text-[9px] text-muted-foreground mt-0.5 font-mono truncate max-w-full hidden sm:block">
              Instant Tweet
            </span>
          </button>

          {/* Facebook */}
          <button
            onClick={shareFacebook}
            className="group relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-surface/40 border border-border/60 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.3)] min-w-0"
          >
            <div className="p-3 sm:p-3.5 rounded-2xl bg-[#1877f2]/20 text-[#1877f2] group-hover:bg-[#1877f2] group-hover:text-white transition-all duration-300 mb-2 shadow-md group-hover:scale-110">
              <FacebookIcon />
            </div>
            <span className="font-display font-bold text-xs text-foreground group-hover:text-blue-400 transition-colors truncate max-w-full">
              Facebook
            </span>
            <span className="text-[9px] text-muted-foreground mt-0.5 font-mono truncate max-w-full hidden sm:block">
              Feed Post
            </span>
          </button>
        </div>

        {/* Direct Link Field */}
        <div className="pt-4 border-t border-cyan-500/20 w-full min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
              {lang === "fr" ? "Lien direct de l'article" : "Direct Article Link"}
            </span>
            <ExternalLink className="w-3 h-3 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface/80 border border-cyan-500/30 focus-within:border-cyan-400 transition-colors w-full min-w-0">
            <input
              type="text"
              readOnly
              value={articleUrl}
              className="flex-1 bg-transparent px-3 py-1.5 text-xs text-muted-foreground font-mono focus:outline-none truncate min-w-0"
            />
            <button
              onClick={handleCopyLink}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-display transition-all duration-300 shrink-0 ${
                copiedLink
                  ? "bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  : "bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_15px_oklch(0.75_0.18_200/0.4)] hover:scale-105"
              }`}
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>{lang === "fr" ? "Copié !" : "Copied!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{lang === "fr" ? "Copier" : "Copy"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
