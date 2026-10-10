import { useState, useEffect } from "react";
import { ShieldCheck, RefreshCw, Lock, Sparkles } from "lucide-react";
import { getCaptchaChallengeFn } from "@/lib/captcha";
import { useI18n } from "@/i18n/context";

interface AntiBotCaptchaProps {
  onCaptchaChange?: (data: { answer: string; token: string; honeypot: string }) => void;
  className?: string;
  required?: boolean;
}

export function AntiBotCaptcha({
  onCaptchaChange,
  className = "",
  required = true,
}: AntiBotCaptchaProps) {
  const { lang } = useI18n();
  const [question, setQuestion] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const loadChallenge = async () => {
    setIsLoading(true);
    try {
      const challenge = await getCaptchaChallengeFn({ data: { lang } });
      setQuestion(challenge.question);
      setToken(challenge.token);
      setAnswer("");
      if (onCaptchaChange) {
        onCaptchaChange({ answer: "", token: challenge.token, honeypot });
      }
    } catch (err) {
      console.error("[Captcha] Erreur de chargement du challenge:", err);
      // Fallback gracieux si l'appel API échoue
      setQuestion(
        lang === "fr"
          ? "Sécurité : Combien font 4 + 3 ?"
          : "Security check: What is 4 + 3 ?"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadChallenge();
  }, [lang]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAnswer(val);
    setHasInteracted(true);
    if (onCaptchaChange) {
      onCaptchaChange({ answer: val, token, honeypot });
    }
  };

  const handleHoneypotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHoneypot(val);
    if (onCaptchaChange) {
      onCaptchaChange({ answer, token, honeypot: val });
    }
  };

  return (
    <div
      className={`relative p-4 sm:p-5 rounded-2xl bg-surface/40 border border-border/60 hover:border-brand/40 transition-all duration-300 backdrop-blur-sm ${className}`}
    >
      {/* Honeypot invisible pour les robots : AUCUN humain ne doit le remplir */}
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
        <label htmlFor="company_website_hp">Ne pas remplir ce champ</label>
        <input
          id="company_website_hp"
          type="text"
          name="website_hp"
          value={honeypot}
          onChange={handleHoneypotChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Champs cachés pour soumission native par FormData */}
      <input type="hidden" name="captchaToken" value={token} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand/15 border border-brand/30 flex items-center justify-center text-brand shrink-0">
            {hasInteracted && answer.trim().length > 0 ? (
              <ShieldCheck size={16} className="text-emerald-400" />
            ) : (
              <Lock size={16} />
            )}
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-brand flex items-center gap-1.5 font-semibold">
              <span>// {lang === "fr" ? "VÉRIFICATION ANTI-BOT" : "ANTI-BOT VERIFICATION"}</span>
              <Sparkles size={11} className="text-amber-400" />
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {lang === "fr"
                ? "Protection sécurisée contre les spams automatisés"
                : "Secure protection against automated spam"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={loadChallenge}
          disabled={isLoading}
          aria-label={lang === "fr" ? "Générer un autre calcul" : "Generate another challenge"}
          title={lang === "fr" ? "Changer de question" : "Change challenge"}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-brand transition-colors p-1.5 rounded-lg hover:bg-surface/60 self-start sm:self-auto"
        >
          <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
          <span className="hidden sm:inline font-mono text-[11px]">
            {lang === "fr" ? "Autre calcul" : "New check"}
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        <div className="sm:col-span-2">
          <label
            htmlFor="captchaAnswer"
            className="block text-xs font-medium text-foreground mb-1 font-mono"
          >
            {isLoading ? (
              <span className="text-muted-foreground animate-pulse">
                {lang === "fr" ? "Génération du calcul de sécurité..." : "Generating security check..."}
              </span>
            ) : (
              question || (lang === "fr" ? "Sécurité : Combien font 4 + 3 ?" : "Security check: 4 + 3 = ?")
            )}
          </label>
        </div>

        <div className="sm:col-span-1">
          <input
            id="captchaAnswer"
            type="text"
            name="captchaAnswer"
            required={required}
            value={answer}
            onChange={handleAnswerChange}
            placeholder={lang === "fr" ? "Votre résultat" : "Your answer"}
            inputMode="numeric"
            autoComplete="off"
            className="w-full px-3.5 py-2.5 rounded-xl bg-background/80 border border-border/80 focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none text-foreground text-sm font-mono transition-all duration-200 placeholder:text-muted-foreground/40 text-center sm:text-left"
          />
        </div>
      </div>
    </div>
  );
}
