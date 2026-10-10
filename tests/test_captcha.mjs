import assert from "node:assert";
import crypto from "node:crypto";

// Test direct de la logique anti-bot et captcha
const CAPTCHA_SECRET = "tydev_anti_bot_shield_2026_super_secure_key";
const MIN_SUBMISSION_TIME_MS = 1800;
const MAX_TOKEN_AGE_MS = 15 * 60 * 1000;

function generateCaptchaHash(timestamp, answer, secret = CAPTCHA_SECRET) {
  const payload = `${timestamp}:${String(answer).trim().toLowerCase()}`;
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

function verifyCaptchaSolution(params) {
  const { userAnswer, token, honeypot, secret = CAPTCHA_SECRET, currentTime = Date.now() } = params;

  if (honeypot && String(honeypot).trim().length > 0) {
    return { valid: false, reason: "Honeypot déclenché (détection robot)." };
  }

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

  const elapsedTime = currentTime - timestamp;
  if (elapsedTime < MIN_SUBMISSION_TIME_MS) {
    return { valid: false, reason: "Soumission trop rapide (détection robot)." };
  }

  if (elapsedTime > MAX_TOKEN_AGE_MS) {
    return { valid: false, reason: "Le jeton captcha a expiré. Veuillez rafraîchir le calcul." };
  }

  const computedHash = generateCaptchaHash(timestamp, userAnswer, secret);
  const hashBuffer = Buffer.from(computedHash, "hex");
  const expectedBuffer = Buffer.from(expectedHash, "hex");

  if (hashBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(hashBuffer, expectedBuffer)) {
    return { valid: false, reason: "Réponse au calcul de sécurité incorrecte. Veuillez réessayer." };
  }

  return { valid: true };
}

console.log("=== Lancement de la suite de tests unitaires Captcha Anti-Bot TY Dev ===");

// 1. Test Soumission Légitime Humaine
{
  const now = Date.now();
  const timestamp = now - 3000; // 3 secondes après l'affichage
  const answer = 7;
  const token = `${timestamp}.${generateCaptchaHash(timestamp, answer)}`;

  const result = verifyCaptchaSolution({
    userAnswer: "7",
    token,
    honeypot: "",
    currentTime: now,
  });

  assert.strictEqual(result.valid, true, "Une soumission humaine valide doit être acceptée.");
  console.log("✅ Test 1 : Soumission humaine normale acceptée avec succès.");
}

// 2. Test Honeypot Déclenché (Robot qui remplit tous les inputs)
{
  const now = Date.now();
  const timestamp = now - 4000;
  const answer = 10;
  const token = `${timestamp}.${generateCaptchaHash(timestamp, answer)}`;

  const result = verifyCaptchaSolution({
    userAnswer: "10",
    token,
    honeypot: "https://spam-bot-link.ru",
    currentTime: now,
  });

  assert.strictEqual(result.valid, false, "Une soumission avec honeypot doit être bloquée.");
  assert.ok(result.reason.includes("Honeypot"), "Le motif doit mentionner le honeypot.");
  console.log("✅ Test 2 : Attaque bot via Honeypot bloquée avec succès.");
}

// 3. Test Soumission Instantanée Bot (< 1.8s)
{
  const now = Date.now();
  const timestamp = now - 300; // Seulement 300ms après
  const answer = 5;
  const token = `${timestamp}.${generateCaptchaHash(timestamp, answer)}`;

  const result = verifyCaptchaSolution({
    userAnswer: "5",
    token,
    honeypot: "",
    currentTime: now,
  });

  assert.strictEqual(result.valid, false, "Une soumission en moins de 1.8s doit être bloquée.");
  assert.ok(result.reason.includes("trop rapide"), "Le motif doit mentionner la soumission trop rapide.");
  console.log("✅ Test 3 : Soumission ultra-rapide (<1.8s) bloquée avec succès.");
}

// 4. Test Mauvaise Réponse au Calcul
{
  const now = Date.now();
  const timestamp = now - 5000;
  const answer = 9;
  const token = `${timestamp}.${generateCaptchaHash(timestamp, answer)}`;

  const result = verifyCaptchaSolution({
    userAnswer: "8", // Mauvaise réponse
    token,
    honeypot: "",
    currentTime: now,
  });

  assert.strictEqual(result.valid, false, "Une mauvaise réponse doit être rejetée.");
  assert.ok(result.reason.includes("incorrecte"), "Le motif doit mentionner une réponse incorrecte.");
  console.log("✅ Test 4 : Mauvaise réponse au calcul rejetée avec succès.");
}

// 5. Test Jeton Expiré (> 15 minutes)
{
  const now = Date.now();
  const timestamp = now - 20 * 60 * 1000; // 20 minutes
  const answer = 4;
  const token = `${timestamp}.${generateCaptchaHash(timestamp, answer)}`;

  const result = verifyCaptchaSolution({
    userAnswer: "4",
    token,
    honeypot: "",
    currentTime: now,
  });

  assert.strictEqual(result.valid, false, "Un jeton expiré doit être rejeté.");
  assert.ok(result.reason.includes("expiré"), "Le motif doit mentionner l'expiration.");
  console.log("✅ Test 5 : Jeton de plus de 15 minutes rejeté avec succès.");
}

// 6. Test Jeton Altéré / Falsifié (Tentative de bypass)
{
  const now = Date.now();
  const timestamp = now - 5000;
  const token = `${timestamp}.deadbeefc0ffee1234567890`;

  const result = verifyCaptchaSolution({
    userAnswer: "4",
    token,
    honeypot: "",
    currentTime: now,
  });

  assert.strictEqual(result.valid, false, "Un jeton falsifié doit être rejeté.");
  console.log("✅ Test 6 : Jeton falsifié ou corrompu rejeté avec succès.");
}

console.log("\n🎉 TOUS LES TESTS UNITAIRES CAPTCHA SONT VALIDES (6/6 SUCCÈS) !");
