import { Instagram, Linkedin, Facebook, Twitter, Youtube } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { TyDevLogo } from "./TyDevLogo";
import { LangToggle } from "./Navbar";

const socialList = [
  { Icon: Instagram, href: "https://www.instagram.com/tydev__/" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/ty-devs/" },
  { Icon: Facebook, href: "https://www.facebook.com/people/TY-DEV/61581507878160/" },
  { Icon: Twitter, href: "https://x.com/tydev__" },
  { Icon: Youtube, href: "https://www.youtube.com/@TY-Dev" },
];

export function Footer() {
  const { t, lang, setLang } = useI18n();
  return (
    <footer className="relative border-t border-border bg-[oklch(0.11_0.03_260)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div className="lg:col-span-1">
            <TyDevLogo />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          <FooterCol title={t.footer.services}>
            {t.services.items.slice(0, 7).map((s) => (
              <li key={s.title}>
                <a href="#services" className="hover:text-foreground transition-colors">
                  {s.title}
                </a>
              </li>
            ))}
          </FooterCol>

          <FooterCol title={t.footer.company}>
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
          </FooterCol>

          <FooterCol title={t.footer.connect}>
            <li>
              <div className="flex gap-2">
                {socialList.map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-surface/60 border border-border flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand/60 transition-all"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </li>
            <li className="pt-3">
              <LangToggle lang={lang} setLang={setLang} />
            </li>
          </FooterCol>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-muted-foreground">
          <span>{t.footer.rights}</span>
          <span>{t.footer.made}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-mono text-xs uppercase tracking-wider text-foreground mb-4">{title}</h4>
      <ul className="space-y-2.5 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}
