import { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { getRecaptchaSiteKeyFn, DEFAULT_RECAPTCHA_SITE_KEY } from "@/lib/captcha";
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

  const [siteKey, setSiteKey] = useState<string>(DEFAULT_RECAPTCHA_SITE_KEY);
  const [token, setToken] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>("");
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  const [isWidgetRendered, setIsWidgetRendered] = useState<boolean>(false);

  // 1. Récupération de la clé de site depuis le serveur
  useEffect(() => {
    let isMounted = true;
    getRecaptchaSiteKeyFn()
      .then((res) => {
        if (isMounted && res.siteKey) {
          setSiteKey(res.siteKey);
        }
      })
      .catch((err) => {
        console.warn("[reCAPTCHA] Utilisation de la clé de test:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Chargement du script officiel Google reCAPTCHA v2
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.grecaptcha && window.grecaptcha.render) {
      setIsScriptLoaded(true);
      return;
    }

    const scriptId = "google-recaptcha-v2-script";
    let existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!existingScript) {
      existingScript = document.createElement("script");
      existingScript.id = scriptId;
      existingScript.src = "https://www.google.com/recaptcha/api.js?onload=__onGoogleRecaptchaLoaded&render=explicit";
      existingScript.async = true;
      existingScript.defer = true;
      document.head.appendChild(existingScript);
    }

    window.__onGoogleRecaptchaLoaded = () => {
      setIsScriptLoaded(true);
    };

    // Vérification de sécurité si le script est déjà en cache
    const checkInterval = setInterval(() => {
      if (window.grecaptcha && window.grecaptcha.render) {
        setIsScriptLoaded(true);
        clearInterval(checkInterval);
      }
    }, 200);

    return () => {
      clearInterval(checkInterval);
    };
  }, []);

  // 3. Rendu du widget reCAPTCHA une fois le script et le DOM prêts
  useEffect(() => {
    if (!isScriptLoaded || !containerRef.current || isWidgetRendered || !siteKey) return;
    if (!window.grecaptcha || typeof window.grecaptcha.render !== "function") return;

    try {
      // Nettoyer l'intérieur du conteneur avant rendu
      containerRef.current.innerHTML = "";

      const id = window.grecaptcha.render(containerRef.current, {
        sitekey: siteKey,
        theme: "dark",
        size: "normal",
        callback: (newToken: string) => {
          setToken(newToken);
          if (onVerify) onVerify(newToken);
        },
        "expired-callback": () => {
          setToken("");
          if (onExpire) onExpire();
        },
        "error-callback": () => {
          setToken("");
          if (onExpire) onExpire();
        },
      });

      widgetIdRef.current = id;
      setIsWidgetRendered(true);
    } catch (e) {
      console.warn("[reCAPTCHA] Note de rendu du widget:", e);
    }
  }, [isScriptLoaded, siteKey, isWidgetRendered, onVerify, onExpire]);

  return (
    <div className={`relative my-2 ${className}`}>
      {/* Honeypot invisible : si rempli par un robot, la requête est rejetée */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: "0",
          opacity: 0,
          pointerEvents: "none",
          height: 0,
          width: 0,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <label htmlFor="recaptcha_hp_field">Ne pas remplir</label>
        <input
          id="recaptcha_hp_field"
          type="text"
          name="website_hp"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Jeton caché pour capture automatique via FormData */}
      <input type="hidden" name="recaptchaToken" value={token} />

      {/* Conteneur d'affichage officiel Google reCAPTCHA v2 */}
      <div className="relative flex items-center justify-start min-h-[78px] py-1">
        <div ref={containerRef} className="g-recaptcha" />

        {!isWidgetRendered && (
          <div className="flex items-center gap-2.5 text-xs text-muted-foreground font-mono px-2 py-3">
            <Loader2 size={16} className="animate-spin text-brand" />
            <span>
              {lang === "fr"
                ? "Chargement de la vérification Google..."
                : "Loading Google verification..."}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
