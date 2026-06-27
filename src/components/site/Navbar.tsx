import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { TyDevLogo } from "./TyDevLogo";

type NavItem = { to: "/" | "/about" | "/services" | "/portfolio" | "/contact"; label: string };

export function Navbar() {
  const { lang, setLang, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const navItems: NavItem[] = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/services", label: t.nav.services },
    { to: "/portfolio", label: t.nav.portfolio },
    { to: "/contact", label: t.nav.contact },
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
          <Link to="/" aria-label="TY Dev home" className="shrink-0">
            <TyDevLogo />
          </Link>

          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-border/60 bg-surface/30 backdrop-blur-md px-2 py-1.5">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: true }}
                className="relative px-3.5 py-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-surface/60 data-[status=active]:text-foreground data-[status=active]:bg-surface/70"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden sm:block">
              <LangToggle lang={lang} setLang={setLang} />
            </div>
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand text-primary-foreground text-sm font-medium transition-all hover:shadow-[0_0_30px_oklch(0.6_0.22_265/0.5)] hover:-translate-y-0.5"
            >
              {t.nav.cta}
            </Link>
            <button
              className="lg:hidden text-foreground p-2 rounded-lg border border-border/60 bg-surface/40 backdrop-blur-md hover:bg-surface/70 transition-colors"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileDrawer
        open={open}
        onClose={() => setOpen(false)}
        navItems={navItems}
        lang={lang}
        setLang={setLang}
        cta={t.nav.cta}
      />
    </>
  );
}

function MobileDrawer({
  open,
  onClose,
  navItems,
  lang,
  setLang,
  cta,
}: {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  lang: "en" | "fr";
  setLang: (l: "en" | "fr") => void;
  cta: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-md lg:hidden"
            aria-hidden
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.5 }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-[88vw] max-w-[360px] lg:hidden flex flex-col bg-[oklch(0.1_0.025_260)]/95 backdrop-blur-2xl border-l border-border/60 shadow-[0_0_60px_-10px_oklch(0_0_0/0.6)]"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div
              className="pointer-events-none absolute -top-32 -right-20 w-80 h-80 rounded-full blur-3xl opacity-40"
              style={{
                background: "radial-gradient(circle, oklch(0.6 0.22 265 / 0.4), transparent 70%)",
              }}
              aria-hidden
            />

            <div className="relative flex items-center justify-between px-6 py-5 border-b border-border/50">
              <TyDevLogo />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded-lg border border-border/60 bg-surface/40 hover:bg-surface/70 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="relative flex-1 overflow-y-auto px-3 py-6">
              <div className="px-3 mb-2 font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground/70">
                // {lang === "fr" ? "Navigation" : "Navigate"}
              </div>
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={item.to}
                      onClick={onClose}
                      activeOptions={{ exact: true }}
                      className="group flex items-center justify-between gap-3 px-3 py-3.5 rounded-lg hover:bg-surface/50 transition-colors data-[status=active]:bg-surface/60"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-muted-foreground/60 w-6">
                          0{i + 1}
                        </span>
                        <span className="font-display text-lg text-foreground group-hover:text-brand transition-colors group-data-[status=active]:text-brand">
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-muted-foreground/50 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="px-3 mt-6"
              >
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full bg-brand text-primary-foreground font-medium shadow-[0_0_40px_oklch(0.6_0.22_265/0.4)] transition-all hover:shadow-[0_0_60px_oklch(0.6_0.22_265/0.7)]"
                >
                  {cta}
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </nav>

            <div className="relative border-t border-border/50 px-6 py-4 flex items-center justify-between">
              <LangToggle lang={lang} setLang={setLang} />
              <span className="font-mono text-[10px] text-muted-foreground/60">
                © {new Date().getFullYear()} TY Dev
              </span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
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
