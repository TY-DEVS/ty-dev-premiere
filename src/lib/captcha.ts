import { createServerFn } from "@tanstack/react-start";
import crypto from "node:crypto";

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || "tydev_anti_bot_shield_2026_super_secure_key";
const MIN_SUBMISSION_TIME_MS = 1800; // Humain met au moins 1.8s
const MAX_TOKEN_AGE_MS = 15 * 60 * 1000; // Valide 15 minutes max

export interface CaptchaChallenge {
  question: string;
  token: string;
  lang: "fr" | "en";
}

/**
 * Calcule l'empreinte HMAC SHA-256 du timestamp et de la réponse
 */
export function generateCaptchaHash(timestamp: number, answer: number | string, secret: string = CAPTCHA_SECRET): string {
  const payload = `${timestamp}:${String(answer).trim().toLowerCase()}`;
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

/**
 * Génère un challenge arithmétique simple et adapté aux humains
 */
export function createChallenge(lang: "fr" | "en" = "fr"): { question: string; answer: number; token: string } {
  const operations = ["+", "-"] as const;
  const op = operations[Math.floor(Math.random() * operations.length)];

  let a = 0;
  let b = 0;
  let answer = 0;

  if (op === "+") {
    a = Math.floor(Math.random() * 8) + 2; // 2 à 9
    b = Math.floor(Math.random() * 8) + 1; // 1 à 8
    answer = a + b;
  } else {
    a = Math.floor(Math.random() * 9) + 7; // 7 à 15
    b = Math.floor(Math.random() * 5) + 1; // 1 à 5
    answer = a - b;
  }

  const timestamp = Date.now();
  const hash = generateCaptchaHash(timestamp, answer);
  const token = `${timestamp}.${hash}`;

  const question =
    lang === "fr"
      ? `Sécurité : Combien font ${a} ${op} ${b} ?`
      : `Security check: What is ${a} ${op} ${b} ?`;

  return { question, answer, token };
}

/**
 * Valide un challenge captcha côté serveur
 */
export function verifyCaptchaSolution(params: {
  userAnswer?: string | number | null;
  token?: string | null;
  honeypot?: string | null;
  secret?: string;
  currentTime?: number;
}): { valid: boolean; reason?: string } {
  const { userAnswer, token, honeypot, secret = CAPTCHA_SECRET, currentTime = Date.now() } = params;

  // 1. Contrôle Honeypot (le champ doit être rigoureusement vide)
  if (honeypot && String(honeypot).trim().length > 0) {
    return { valid: false, reason: "Honeypot déclenché (détection robot)." };
  }

  // 2. Vérification présence du token et de la réponse
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return { valid: false, reason: "Jeton de sécurité captcha manquant ou invalide." };
  }

  if (userAnswer === undefined || userAnswer === null || String(userAnswer).trim() === "") {
    return { valid: false, reason: "Veuillez répondre au calcul de sécurité captcha." };
  }

  const [timeStr, expectedHash] = token.split(".");
  const timestamp = Number(timeStr);

  if (isNaN(timestamp) || !expectedHash) {
    return { valid: false, reason: "Format de jeton captcha altéré." };
  }

  // 3. Contrôle du temps minimum (anti-soumission instantanée des robots)
  const elapsedTime = currentTime - timestamp;
  if (elapsedTime < MIN_SUBMISSION_TIME_MS) {
    return { valid: false, reason: "Soumission trop rapide (détection robot)." };
  }

  // 4. Contrôle d'expiration du token (15 minutes max)
  if (elapsedTime > MAX_TOKEN_AGE_MS) {
    return { valid: false, reason: "Le jeton captcha a expiré. Veuillez rafraîchir le calcul." };
  }

  // 5. Calcul et comparaison sécurisée du hash
  const computedHash = generateCaptchaHash(timestamp, userAnswer, secret);

  const hashBuffer = Buffer.from(computedHash, "hex");
  const expectedBuffer = Buffer.from(expectedHash, "hex");

  if (hashBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(hashBuffer, expectedBuffer)) {
    return { valid: false, reason: "Réponse au calcul de sécurité incorrecte. Veuillez réessayer." };
  }

  return { valid: true };
}

/**
 * Server Function pour récupérer un nouveau challenge depuis le client
 */
export const getCaptchaChallengeFn = createServerFn({ method: "GET" })
  .validator((data?: { lang?: "fr" | "en" }) => data)
  .handler(async (ctx) => {
    const lang = ctx.data?.lang || "fr";
    const challenge = createChallenge(lang);
    return {
      question: challenge.question,
      token: challenge.token,
      lang,
    };
  });
