import { Instagram, Linkedin, Facebook, Twitter, Youtube, Mail, Globe, ArrowUpRight, MapPin } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { TyDevLogo } from "./TyDevLogo";
import { LangToggle } from "./Navbar";

const socialList = [
  { Icon: Instagram, href: "https://www.instagram.com/tydev__/", label: "Instagram" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/ty-devs/", label: "LinkedIn" },
  { Icon: Facebook, href: "https://www.facebook.com/people/TY-DEV/61581507878160/", label: "Facebook" },
  { Icon: Twitter, href: "https://x.com/tydev__", label: "X" },
  { Icon: Youtube, href: "https://www.youtube.com/@TY-Dev", label: "YouTube" },
];

const EMAIL = "contact@ty-dev.site";
const SITE = "ty-dev.site";

export function Footer() {
  const { t, lang, setLang } = useI18n();

  return (
    <footer className="relative overflow-hidden border-t border-border/60 bg-[oklch(0.09_0.025_260)]">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 opacity-60"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, oklch(0.55 0.22 265 / 0.18), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black 30%, transparent 75%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        {/* CTA strip */}
        <div className="relative mb-16 rounded-2xl border border-border/70 bg-gradient-to-br from-[oklch(0.13_0.04_265)] to-[oklch(0.1_0.025_260)] px-8 py-10 md:px-12 md:py-12 overflow-hidden">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
            style={{ background: "oklch(0.55 0.22 265 / 0.35)" }}
          />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand mb-3">
                // {lang === "fr" ? "Prêt à construire" : "Ready to build"}
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-xl">
                {lang === "fr"
                  ? "Transformons votre vision en logiciel."
                  : "Let's turn your vision into shipped software."}
              </h3>
            </div>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 self-start md:self-auto rounded-full bg-brand px-6 py-3 text-sm font-medium text-white shadow-[0_0_40px_-10px_oklch(0.55_0.22_265)] transition-all hover:shadow-[0_0_60px_-5px_oklch(0.55_0.22_265)] hover:-translate-y-0.5"
            >
              {t.nav.cta}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-border/60">
          {/* Brand */}
          <div className="md:col-span-5">
            <TyDevLogo />
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>

            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-surface/40 group-hover:border-brand/60 group-hover:text-brand transition-colors">
                  <Mail size={13} />
                </span>
                <span className="font-mono text-[13px]">{EMAIL}</span>
              </a>
              <a
                href={`https://${SITE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-surface/40 group-hover:border-brand/60 group-hover:text-brand transition-colors">
                  <Globe size={13} />
                </span>
                <span className="font-mono text-[13px]">{SITE}</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border/70 bg-surface/40">
                  <MapPin size={13} />
                </span>
                <span className="font-mono text-[13px]">Sheridan, Wyoming · 🌍 Global</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <FooterColTitle>{t.footer.services}</FooterColTitle>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {t.services.items.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <a href="#services" className="hover:text-foreground transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <FooterColTitle>{t.footer.company}</FooterColTitle>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {t.footer.companyLinks.map((label, i) => {
                const hrefs = ["#about", "#portfolio", "#contact", "#"];
                return (
                  <li key={label}>
                    <a href={hrefs[i]} className="hover:text-foreground transition-colors">
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-2">
            <FooterColTitle>{t.footer.connect}</FooterColTitle>
            <div className="flex flex-wrap gap-2">
              {socialList.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-md bg-surface/40 border border-border/70 flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand/60 hover:bg-brand/5 transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <div className="mt-5">
              <LangToggle lang={lang} setLang={setLang} />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs font-mono text-muted-foreground">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <span>{t.footer.rights}</span>
            <span className="hidden md:inline opacity-40">·</span>
            <span className="opacity-70">{t.footer.made}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>{lang === "fr" ? "Disponible pour de nouveaux projets" : "Available for new projects"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/90 mb-5">
      {children}
    </h4>
  );
}
