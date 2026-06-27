import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/i18n/context";
import { TyDevLogo } from "./TyDevLogo";

const sections = ["home", "services", "portfolio", "about", "contact"] as const;

export function Navbar() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "services", label: t.nav.services },
    { id: "portfolio", label: t.nav.portfolio },
    { id: "about", label: t.nav.about },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-background/75 border-b border-border/60 shadow-[0_8px_30px_-12px_oklch(0_0_0/0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-18 flex items-center justify-between py-4">
          <a href="#home" aria-label="TY Dev home" className="shrink-0">
            <TyDevLogo />
          </a>

          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-border/60 bg-surface/30 backdrop-blur-md px-2 py-1.5">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="relative px-3.5 py-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-surface/60"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <LangToggle lang={lang} setLang={setLang} />
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand text-primary-foreground text-sm font-medium transition-all hover:shadow-[0_0_30px_oklch(0.6_0.22_265/0.5)] hover:-translate-y-0.5"
            >
              {t.nav.cta}
            </a>
            <button
              className="lg:hidden text-foreground p-1.5 rounded-md hover:bg-surface/60 transition-colors"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-8 mt-12 font-display text-3xl">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="hover:text-brand transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-4 px-6 py-3 rounded-full bg-brand text-primary-foreground text-base"
              >
                {t.nav.cta}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function LangToggle({
  lang,
  setLang,
}: {
  lang: "en" | "fr";
  setLang: (l: "en" | "fr") => void;
}) {
  return (
    <div className="relative flex items-center bg-surface/60 border border-border rounded-full p-1 text-xs font-mono">
      {(["en", "fr"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`relative z-10 px-3 py-1 rounded-full transition-colors ${
            lang === l ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
          {lang === l && (
            <motion.div
              layoutId="lang-pill"
              className="absolute inset-0 bg-brand rounded-full -z-10"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
