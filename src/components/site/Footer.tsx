import {
  Instagram,
  Linkedin,
  Facebook,
  Youtube,
  Mail,
  Clock,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { TyDevLogo } from "./TyDevLogo";

function XIcon({ size = 15, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialList = [
  { Icon: Instagram, href: "https://www.instagram.com/tydev__/", label: "Instagram" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/ty-devs/", label: "LinkedIn" },
  {
    Icon: Facebook,
    href: "https://www.facebook.com/people/TY-DEV/61581507878160/",
    label: "Facebook",
  },
  { Icon: XIcon, href: "https://x.com/tydev__", label: "X" },
  { Icon: Youtube, href: "https://www.youtube.com/@TY-Dev", label: "YouTube" },
];

const EMAIL = "contact@ty-dev.site";
const SITE = "ty-dev.site";

export function Footer() {
  const { t, lang, setLang } = useI18n();

  return (
    <footer className="relative bg-[oklch(0.06_0.02_260)] px-4 md:px-8 lg:px-12 pt-12 pb-12">
      <div className="mx-auto w-full max-w-7xl rounded-3xl overflow-hidden border border-border/60 bg-[oklch(0.08_0.025_260)] text-muted-foreground">
        {/* CTA Top Bar */}
        <div className="relative border-b border-border/60 p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 bg-gradient-to-br from-[oklch(0.08_0.025_260)] to-[oklch(0.11_0.04_265)] overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{ background: "oklch(0.55 0.22 265 / 0.35)" }}
          />
          <div className="relative max-w-xl text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground font-display leading-tight mb-3 tracking-tight">
              {lang === "fr" ? (
                <>
                  Prêt à passer à l'<span className="text-brand">échelle</span> ?
                </>
              ) : (
                <>
                  Ready to scale your <span className="text-brand">digital presence</span>?
                </>
              )}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {lang === "fr"
                ? "Concevons ensemble des solutions à haute performance."
                : "Let's craft high-performance solutions together."}
            </p>
          </div>
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-brand text-white font-semibold rounded-full overflow-hidden transition-all hover:pr-12 shadow-[0_0_40px_-10px_oklch(0.55_0.22_265)] hover:shadow-[0_0_60px_-5px_oklch(0.55_0.22_265)]"
          >
            <span className="relative z-10">{t.nav.cta}</span>
            <ArrowRight
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all"
            />
          </Link>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12 p-8 md:p-12 border-b border-border/60">
          {/* Brand Column */}
          <div className="space-y-6">
            <TyDevLogo />
            <p className="text-sm leading-relaxed">{t.footer.tagline}</p>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-brand">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {lang === "fr" ? "Disponible pour de nouveaux projets" : "Available for new projects"}
            </div>
          </div>

          {/* Services */}
          <div>
            <FooterColTitle>{t.footer.services}</FooterColTitle>
            <ul className="space-y-4 text-sm">
              {t.services.items.slice(0, 5).map((s) => (
                <li key={s.title}>
                  <Link to="/services" className="hover:text-brand transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <FooterColTitle>{t.footer.company}</FooterColTitle>
            <ul className="space-y-3.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-brand transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-brand transition-colors">
                  {t.nav.portfolio}
                </Link>
              </li>
              <li>
                <Link to="/demos" className="hover:text-brand transition-colors">
                  {t.nav.demos}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-brand transition-colors">
                  {(t.nav as any).faq || "FAQ"}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-brand transition-colors">
                  {t.nav.blog}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <FooterColTitle>{t.footer.connect}</FooterColTitle>
            <div className="space-y-4">
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-3 text-sm hover:text-foreground transition-colors"
              >
                <Mail size={15} className="text-muted-foreground/70" />
                <span className="font-mono text-[13px]">{EMAIL}</span>
              </a>
              <div className="flex items-center gap-3 text-sm">
                <Clock size={15} className="text-muted-foreground/70" />
                <span className="font-mono text-[13px]">{t.footer.hours}</span>
              </div>
              <div className="flex items-center gap-3 pt-2">
                {socialList.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full border border-border/70 flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand/60 hover:bg-brand/5 transition-all"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-6 bg-[oklch(0.05_0.015_260)]">
          <div className="flex items-center gap-4 md:gap-6 text-xs font-mono text-muted-foreground/80 flex-wrap justify-center">
            <span className="uppercase tracking-[0.16em]">{t.footer.rights}</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex bg-[oklch(0.1_0.025_260)] p-1 rounded-lg border border-border/70">
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${
                  lang === "en"
                    ? "text-white bg-[oklch(0.15_0.04_260)] shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("fr")}
                className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${
                  lang === "fr"
                    ? "text-white bg-[oklch(0.15_0.04_260)] shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                FR
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-foreground font-semibold mb-6 uppercase tracking-[0.16em] text-xs font-mono">
      {children}
    </h4>
  );
}
