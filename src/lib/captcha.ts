import { createServerFn } from "@tanstack/react-start";

// Clés officielles Google reCAPTCHA v2 (avec fallback clés de test Google documentées)
export const GOOGLE_TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
export const GOOGLE_TEST_SECRET_KEY = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";

export function getRecaptchaSiteKey(): string {
  return (process.env.RECAPTCHA_SITE_KEY || GOOGLE_TEST_SITE_KEY).trim();
}

export function getRecaptchaSecretKey(): string {
  return (process.env.RECAPTCHA_SECRET_KEY || GOOGLE_TEST_SECRET_KEY).trim();
}

export interface VerifyRecaptchaParams {
  token?: string | null;
  honeypot?: string | null;
  remoteIp?: string | null;
  secretKey?: string;
}

export interface VerifyRecaptchaResult {
  valid: boolean;
  reason?: string;
  hostname?: string;
}

/**
 * Valide le jeton Google reCAPTCHA v2 auprès des serveurs officiels de Google
 */
export async function verifyGoogleRecaptcha(params: VerifyRecaptchaParams): Promise<VerifyRecaptchaResult> {
  const { token, honeypot, remoteIp, secretKey = getRecaptchaSecretKey() } = params;

  // 1. Couche Honeypot invisible : si rempli, c'est un bot automatisé
  if (honeypot && String(honeypot).trim().length > 0) {
    console.warn("[reCAPTCHA Shield] Honeypot déclenché - rejet automatique du bot.");
    return { valid: false, reason: "Détection de soumission automatisée (honeypot)." };
  }

  // 2. Vérification de la présence du jeton reCAPTCHA
  const cleanToken = (token || "").trim();
  if (!cleanToken) {
    return {
      valid: false,
      reason: "Veuillez cocher la case Google 'Je ne suis pas un robot' avant de valider.",
    };
  }

  try {
    const postData = new URLSearchParams({
      secret: secretKey,
      response: cleanToken,
    });

    if (remoteIp) {
      postData.append("remoteip", remoteIp);
    }

    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: postData.toString(),
    });

    if (!response.ok) {
      console.error(`[reCAPTCHA] Erreur HTTP Google API: ${response.status}`);
      return {
        valid: false,
        reason: "Impossible de joindre le serveur de vérification Google reCAPTCHA.",
      };
    }

    const data = (await response.json()) as {
      success: boolean;
      challenge_ts?: string;
      hostname?: string;
      "error-codes"?: string[];
    };

    if (data.success) {
      return {
        valid: true,
        hostname: data.hostname,
      };
    }

    console.warn("[reCAPTCHA] Échec de validation Google:", data["error-codes"]);
    return {
      valid: false,
      reason: "La validation Google reCAPTCHA a échoué. Veuillez cocher à nouveau la case.",
    };
  } catch (error: any) {
    console.error("[reCAPTCHA] Exception lors de l'appel Google:", error);
    return {
      valid: false,
      reason: "Erreur de communication avec le service Google reCAPTCHA.",
    };
  }
}

/**
 * Server Function pour transmettre la clé de site publique au composant client
 */
export const getRecaptchaSiteKeyFn = createServerFn({ method: "GET" }).handler(async () => {
  return {
    siteKey: getRecaptchaSiteKey(),
  };
});
