'use client';

import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { getRecaptchaSiteKey, DEFAULT_RECAPTCHA_SITE_KEY } from "@/lib/captcha";
import { useI18n } from "@/i18n/context";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      render: (
        container: HTMLElement | string,
        parameters: {
          sitekey: string;
          theme?: "dark" | "light";
          size?: "normal" | "compact";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => number;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
    __onGoogleRecaptchaLoaded?: () => void;
  }
}

interface GoogleReCaptchaProps {
  onVerify?: (token: string) => void;
  onExpire?: () => void;
  className?: string;
}

export function GoogleReCaptcha({
  onVerify,
  onExpire,
  className = "",
}: GoogleReCaptchaProps) {
  const { lang } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  const [siteKey, setSiteKey] = useState<string>(() => getRecaptchaSiteKey());
  const [token, setToken] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>("");
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const [isWidgetRendered, setIsWidgetRendered] = useState<boolean>(false);

  // 2. Chargement du script officiel Google reCAPTCHA v2
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.grecaptcha && typeof window.grecaptcha.render === "function") {
      setIsScriptLoaded(true);
      return;
    }

    const scriptId = "google-recaptcha-v2-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = `https://www.google.com/recaptcha/api.js?onload=__onGoogleRecaptchaLoaded&render=explicit&hl=${lang === "en" ? "en" : "fr"}`;
      script.async = true;
      script.defer = true;

      window.__onGoogleRecaptchaLoaded = () => {
        setIsScriptLoaded(true);
      };

      document.head.appendChild(script);
    } else {
      if (window.grecaptcha && typeof window.grecaptcha.render === "function") {
        setIsScriptLoaded(true);
      } else {
        window.__onGoogleRecaptchaLoaded = () => {
          setIsScriptLoaded(true);
        };
      }
    }
  }, [lang]);

  // 3. Rendu du widget reCAPTCHA
  useEffect(() => {
    if (!isScriptLoaded || !containerRef.current || !window.grecaptcha) return;
    if (isWidgetRendered) return;

    try {
      window.grecaptcha.ready(() => {
        if (!containerRef.current || isWidgetRendered) return;

        // Vider le conteneur avant rendu pour éviter doublons
        containerRef.current.innerHTML = "";

        const id = window.grecaptcha!.render(containerRef.current, {
          sitekey: siteKey,
          theme: "dark",
          size: "normal",
          callback: (receivedToken: string) => {
            setToken(receivedToken);
            if (onVerify) onVerify(receivedToken);
          },
          "expired-callback": () => {
            setToken("");
            if (onExpire) onExpire();
          },
          "error-callback": () => {
            console.error("[reCAPTCHA] Erreur lors de l'exécution du challenge.");
          },
        });

        widgetIdRef.current = id;
        setIsWidgetRendered(true);
      });
    } catch (e) {
      console.warn("[reCAPTCHA] Erreur lors de l'initialisation du widget:", e);
    }
  }, [isScriptLoaded, siteKey, onVerify, onExpire, isWidgetRendered]);

  return (
    <div className={`recaptcha-wrapper flex flex-col items-center justify-center my-4 ${className}`}>
      {/* Honeypot invisible pour stopper les bots primitifs sans token */}
      <input
        type="text"
        name="website_hp"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        style={{
          position: "absolute",
          opacity: 0,
          top: 0,
          left: 0,
          height: 0,
          width: 0,
          zIndex: -1,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Jeton caché pour intégration formulaire natif */}
      <input type="hidden" name="g-recaptcha-response" value={token} />

      {/* Conteneur d'affichage officiel Google */}
      <div className="relative min-h-[78px] min-w-[304px] flex items-center justify-center">
        {!isWidgetRendered && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 text-xs text-muted-foreground bg-surface/50 border border-border/50 px-4 py-3 rounded-lg">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <span>Chargement de la vérification Google...</span>
          </div>
        )}
        <div
          ref={containerRef}
          className={`min-h-[78px] min-w-[304px] flex items-center justify-center transition-opacity duration-300 ${!isWidgetRendered ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          style={{ minHeight: "78px", minWidth: "304px" }}
        />
      </div>

      <p className="text-[11px] text-muted-foreground/70 mt-2 text-center max-w-xs">
        {lang === "fr"
          ? "Ce site est protégé par Google reCAPTCHA v2 pour sécuriser vos demandes de devis."
          : "This site is protected by Google reCAPTCHA v2 to secure your quote requests."}
      </p>
    </div>
  );
}
