import assert from "node:assert";

// Simulation et tests directs de verifyGoogleRecaptcha
const GOOGLE_TEST_SECRET_KEY = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";

async function verifyGoogleRecaptcha(params) {
  const { token, honeypot, remoteIp, secretKey = GOOGLE_TEST_SECRET_KEY } = params;

  if (honeypot && String(honeypot).trim().length > 0) {
    return { valid: false, reason: "Détection de soumission automatisée (honeypot)." };
  }

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

    const data = await response.json();

    if (data.success) {
      return { valid: true, hostname: data.hostname };
    }

    return {
      valid: false,
      reason: "La validation Google reCAPTCHA a échoué. Veuillez cocher à nouveau la case.",
    };
  } catch (error) {
    return {
      valid: false,
      reason: "Erreur de communication avec le service Google reCAPTCHA.",
    };
  }
}

async function runTests() {
  console.log("=== Tests de Sécurité Google reCAPTCHA v2 TY Dev ===");

  // 1. Test Appel officiel avec jeton Google
  {
    const result = await verifyGoogleRecaptcha({
      token: "valid-test-response",
      honeypot: "",
    });
    assert.strictEqual(result.valid, true, "L'appel de test officiel Google doit renvoyer valid: true.");
    console.log("✅ Test 1 : Validation avec les serveurs officiels Google reCAPTCHA réussie.");
  }

  // 2. Test Blocage Honeypot
  {
    const result = await verifyGoogleRecaptcha({
      token: "valid-test-response",
      honeypot: "https://spambot.ru",
    });
    assert.strictEqual(result.valid, false, "Un honeypot rempli doit être bloqué sans appeler Google.");
    assert.ok(result.reason.includes("honeypot"), "Le motif doit mentionner le honeypot.");
    console.log("✅ Test 2 : Blocage automatique des robots par honeypot réussi.");
  }

  // 3. Test Jeton Vide / Non Coché
  {
    const result = await verifyGoogleRecaptcha({
      token: "",
      honeypot: "",
    });
    assert.strictEqual(result.valid, false, "Un token vide doit être rejeté.");
    assert.ok(result.reason.includes("robot"), "Le message doit demander de cocher la case.");
    console.log("✅ Test 3 : Rejet d'un formulaire sans case cochée réussi.");
  }

  // 4. Test Clé Secrète Invalide
  {
    const result = await verifyGoogleRecaptcha({
      token: "some-token",
      honeypot: "",
      secretKey: "invalid_secret_key",
    });
    assert.strictEqual(result.valid, false, "Une clé invalide doit renvoyer un échec.");
    console.log("✅ Test 4 : Échec de validation avec clé invalide détecté par Google.");
  }

  console.log("\n🎉 TOUS LES TESTS GOOGLE RECAPTCHA SONT VALIDES (4/4 SUCCÈS) !");
}

runTests();
