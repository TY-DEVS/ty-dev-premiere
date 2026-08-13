import { useState } from "react";
import { type BlogPost } from "@/data/blogPosts";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Share2, Copy, Check, ExternalLink, Download, Sparkles } from "lucide-react";
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

const InstagramIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.65 13.75 5.65c1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.23 0-1.62.77-1.62 1.56V12h2.73l-.44 3h-2.29v6.8c4.56-.93 8-4.96 8-9.8z" />
  </svg>
);

export function ShareArticleModal({ isOpen, onClose, post, lang }: ShareArticleModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  const getArticleUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
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

  // 📸 Generate & Download Instagram Story Graphic (1080x1920)
  const downloadStoryGraphic = async () => {
    setIsGeneratingStory(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1. Dark Luxury Background Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1920);
      bgGrad.addColorStop(0, "#030712");
      bgGrad.addColorStop(0.5, "#0f172a");
      bgGrad.addColorStop(1, "#030712");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1920);

      // Radial Glow
      const glow = ctx.createRadialGradient(540, 600, 50, 540, 600, 700);
      glow.addColorStop(0, "rgba(6, 182, 212, 0.35)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 1080, 1920);

      // 2. Main Card Container
      const cardX = 80;
      const cardY = 280;
      const cardW = 920;
      const cardH = 1360;

      ctx.fillStyle = "rgba(15, 23, 42, 0.92)";
      ctx.strokeStyle = "rgba(6, 182, 212, 0.4)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 48);
      ctx.fill();
      ctx.stroke();

      // 3. Header Branding in Story Card
      ctx.fillStyle = "#67e8f9";
      ctx.font = "bold 26px sans-serif";
      ctx.fillText("TY DEV — ENGINEERING & TECH BLOG", cardX + 50, cardY + 80);

      // 4. Image inside Card
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = post.image;
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });

      const imgY = cardY + 120;
      const imgH = 480;
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(cardX + 40, imgY, cardW - 80, imgH, 32);
      ctx.clip();
      if (img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, cardX + 40, imgY, cardW - 80, imgH);
      } else {
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(cardX + 40, imgY, cardW - 80, imgH);
      }
      ctx.restore();

      // 5. Category Badge Pill
      const catY = imgY + imgH + 40;
      ctx.fillStyle = "rgba(6, 182, 212, 0.2)";
      ctx.strokeStyle = "rgba(6, 182, 212, 0.6)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cardX + 40, catY, 340, 52, 26);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#67e8f9";
      ctx.font = "bold 22px sans-serif";
      ctx.fillText(post.category.toUpperCase(), cardX + 65, catY + 34);

      // 6. Title (Multi-line)
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 44px sans-serif";
      const words = titleText.split(" ");
      let line = "";
      let lineY = catY + 120;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > cardW - 100 && n > 0) {
          ctx.fillText(line, cardX + 40, lineY);
          line = words[n] + " ";
          lineY += 60;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, cardX + 40, lineY);

      // 7. Footer Sticker Callout
      const stickerY = cardY + cardH - 140;
      ctx.fillStyle = "#06b6d4";
      ctx.beginPath();
      ctx.roundRect(cardX + 40, stickerY, cardW - 80, 80, 24);
      ctx.fill();

      ctx.fillStyle = "#030712";
      ctx.font = "bold 28px sans-serif";
      ctx.fillText("🔗 LIEN EN BIO / TY-DEV.SITE", cardX + 80, stickerY + 50);

      // 8. Download PNG
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = `story-badge-tydev-${post.slug}.png`;
      a.href = dataUrl;
      a.click();

      toast.success(
        lang === "fr"
          ? "🖼️ Visuel de Story téléchargé ! Publiez-le dans votre Story Instagram."
          : "🖼️ Story graphic downloaded! Post it into your Instagram Story."
      );
    } catch (err) {
      console.error("Story image download error:", err);
    } finally {
      setIsGeneratingStory(false);
    }
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

  const shareInstagram = async () => {
    // 1. Download visual story badge
    await downloadStoryGraphic();

    // 2. Copy short story sticker link
    const shortStoryText = `🔥 Nouvel article TY Dev :\n"${titleText}"\n\n🔗 ${articleUrl}`;
    navigator.clipboard.writeText(shortStoryText);

    // 3. Open Instagram Story camera
    setTimeout(() => {
      window.open("https://www.instagram.com/create/story/", "_blank");
    }, 500);
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

        {/* 4 Premium Network Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 mb-5 w-full min-w-0">
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
              X (Twitter)
            </span>
            <span className="text-[9px] text-muted-foreground mt-0.5 font-mono truncate max-w-full hidden sm:block">
              Instant Tweet
            </span>
          </button>

          {/* Instagram */}
          <button
            onClick={shareInstagram}
            className="group relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-surface/40 border border-border/60 hover:border-pink-500 hover:bg-pink-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(236,72,153,0.3)] min-w-0"
          >
            <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white transition-all duration-300 mb-2 shadow-md group-hover:scale-110">
              <InstagramIcon />
            </div>
            <span className="font-display font-bold text-xs text-foreground group-hover:text-pink-400 transition-colors truncate max-w-full">
              Instagram
            </span>
            <span className="text-[9px] text-muted-foreground mt-0.5 font-mono truncate max-w-full hidden sm:block">
              Story & Badge
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

        {/* Story Graphic Instant Download Button */}
        <div className="mb-5">
          <button
            onClick={downloadStoryGraphic}
            disabled={isGeneratingStory}
            className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-500/40 text-pink-300 hover:text-white hover:border-pink-400 hover:bg-pink-500/30 transition-all duration-300 font-semibold text-xs flex items-center justify-center gap-2 shadow-md"
          >
            <Download className="w-4 h-4 text-pink-400" />
            <span>
              {isGeneratingStory
                ? lang === "fr"
                  ? "Génération du Visuel..."
                  : "Generating Story Graphic..."
                : lang === "fr"
                ? "Télécharger le Visuel de l'Article (Format Story 9:16)"
                : "Download Story Visual Badge (9:16 Format)"}
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
