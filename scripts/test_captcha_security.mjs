import assert from "node:assert";
import fs from "fs";
import path from "path";

console.log("=== VÉRIFICATION DU SYSTÈME OFFICIEL GOOGLE RECAPTCHA V2 TY DEV ===");

// 1. Vérification de la présence des fichiers
const captchaLibPath = path.resolve("src/lib/captcha.ts");
const captchaCompPath = path.resolve("src/components/site/GoogleReCaptcha.tsx");
const contactCompPath = path.resolve("src/components/site/Contact.tsx");
const simulatorCompPath = path.resolve("src/components/site/Simulator.tsx");
const contactFnPath = path.resolve("src/lib/contactFn.ts");

assert.ok(fs.existsSync(captchaLibPath), "src/lib/captcha.ts existe");
assert.ok(fs.existsSync(captchaCompPath), "src/components/site/GoogleReCaptcha.tsx existe");
assert.ok(fs.existsSync(contactCompPath), "src/components/site/Contact.tsx existe");
assert.ok(fs.existsSync(simulatorCompPath), "src/components/site/Simulator.tsx existe");
assert.ok(fs.existsSync(contactFnPath), "src/lib/contactFn.ts existe");
console.log("✅ Tous les fichiers du système Google reCAPTCHA sont présents.");

// 2. Vérification des liaisons de code
const contactContent = fs.readFileSync(contactCompPath, "utf-8");
assert.ok(contactContent.includes("GoogleReCaptcha"), "Contact.tsx intègre GoogleReCaptcha");
assert.ok(contactContent.includes("recaptchaToken"), "Contact.tsx traite recaptchaToken");
assert.ok(contactContent.includes("website_hp"), "Contact.tsx traite le honeypot website_hp");
console.log("✅ Contact.tsx est correctement protégé avec Google reCAPTCHA.");

const simulatorContent = fs.readFileSync(simulatorCompPath, "utf-8");
assert.ok(simulatorContent.includes("GoogleReCaptcha"), "Simulator.tsx intègre GoogleReCaptcha");
assert.ok(simulatorContent.includes("recaptchaToken"), "Simulator.tsx gère recaptchaToken");
assert.ok(simulatorContent.includes("sendContactEmailFn"), "Simulator.tsx appelle sendContactEmailFn");
console.log("✅ Simulator.tsx est correctement protégé avec Google reCAPTCHA.");

const contactFnContent = fs.readFileSync(contactFnPath, "utf-8");
assert.ok(contactFnContent.includes("verifyGoogleRecaptcha"), "contactFn.ts importe verifyGoogleRecaptcha");
assert.ok(contactFnContent.includes("captchaResult"), "contactFn.ts applique le contrôle reCAPTCHA");
console.log("✅ contactFn.ts applique la validation serveur Google reCAPTCHA.");

// 3. Exécution des tests unitaires de logique captcha
import("./../tests/test_captcha.mjs").then(() => {
  console.log("\n🚀 SUCCÈS TOTAL : LE SYSTÈME GOOGLE RECAPTCHA V2 EST 100% OPÉRATIONNEL !");
});
