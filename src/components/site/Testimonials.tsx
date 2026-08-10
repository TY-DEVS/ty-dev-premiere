import { Instagram, ExternalLink, CheckCircle2, MessageSquareQuote } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { Section, SectionHeader } from "./Services";

export function Testimonials() {
  const { t } = useI18n();
  const { testimonials } = t;

  // Duplicate items array to ensure a seamless 100% infinite scroll loop
  const duplicatedItems = [...testimonials.items, ...testimonials.items];

  return (
    <Section id="testimonials" className="overflow-hidden">
      {/* Inline styles for butter-smooth infinite marquee with pause-on-hover */}
      <style>{`
        @keyframes infinite-marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: infinite-marquee 40s linear infinite;
          will-change: transform;
        }
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand/10 rounded-full blur-[160px] pointer-events-none"
        aria-hidden
      />

      <SectionHeader title={testimonials.title} subtitle={testimonials.subtitle} />

      {/* Horizontal Carousel Container with Side Gradient Fade Masks */}
      <div className="relative mt-12 -mx-6 lg:-mx-10 px-6 lg:px-10 marquee-container">
        {/* Left & Right Gradient Shadows */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

        {/* Marquee Track */}
        <div className="overflow-hidden py-3">
          <div className="marquee-track gap-5">
            {duplicatedItems.map((item, index: number) => (
              <div
                key={index}
                className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 group relative flex flex-col justify-between p-6 md:p-7 rounded-2xl md:rounded-[28px] bg-gradient-to-br from-[oklch(0.08_0.025_260)] to-[oklch(0.05_0.015_260)] border border-border/50 transition-all duration-500 hover:border-brand/40 hover:shadow-[0_16px_60px_-15px_oklch(0.6_0.22_265/0.25)] backdrop-blur-md"
              >
                {/* Internal Hover Glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl md:rounded-[28px]"
                  style={{
                    background:
                      "radial-gradient(circle at 100% 0%, oklch(0.6 0.22 265 / 0.15), transparent 70%)",
                  }}
                  aria-hidden
                />

                <div className="relative z-10">
                  {/* Top Bar: Quote Icon & Instagram Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-2 rounded-xl bg-brand/10 border border-brand/20 text-brand group-hover:bg-brand/20 transition-colors">
                      <MessageSquareQuote className="w-4 h-4 text-cyan-400" />
                    </div>

                    <a
                      href={item.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-cyan-400 bg-surface/50 hover:bg-surface border border-border/60 hover:border-brand/40 px-2.5 py-1 rounded-full transition-all duration-300"
                    >
                      <Instagram className="w-3 h-3 text-pink-400" />
                      <span>Instagram</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-cyan-400" />
                    </a>
                  </div>

                  {/* Quote Text */}
                  <p className="text-foreground/90 text-sm sm:text-[15px] leading-relaxed italic mb-6 font-sans min-h-[3.8rem]">
                    "{item.quote}"
                  </p>
                </div>

                {/* Card Footer / Project & Client Info */}
                <div className="pt-5 border-t border-border/50 flex items-center justify-between mt-auto relative z-10">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h4 className="font-semibold text-foreground text-xs sm:text-sm tracking-wide">{item.author}</h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                    </div>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] sm:text-xs text-brand hover:text-cyan-400 transition-colors font-mono tracking-tight"
                    >
                      {item.project}
                    </a>
                  </div>

                  {/* Direct Link Button */}
                  <a
                    href={item.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:text-cyan-400 bg-brand/10 hover:bg-brand/20 border border-brand/20 px-2.5 py-1 rounded-full transition-all duration-300"
                  >
                    <span>Post</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
