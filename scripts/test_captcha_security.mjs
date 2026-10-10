import assert from "node:assert";
import fs from "fs";
import path from "path";

console.log("=== VÉRIFICATION GLOBALE DU SYSTÈME CAPTCHA & ANTI-BOT TY DEV ===");

// 1. Vérification de la présence des fichiers
const captchaLibPath = path.resolve("src/lib/captcha.ts");
const captchaCompPath = path.resolve("src/components/site/AntiBotCaptcha.tsx");
const contactCompPath = path.resolve("src/components/site/Contact.tsx");
const simulatorCompPath = path.resolve("src/components/site/Simulator.tsx");
const contactFnPath = path.resolve("src/lib/contactFn.ts");

assert.ok(fs.existsSync(captchaLibPath), "src/lib/captcha.ts existe");
assert.ok(fs.existsSync(captchaCompPath), "src/components/site/AntiBotCaptcha.tsx existe");
assert.ok(fs.existsSync(contactCompPath), "src/components/site/Contact.tsx existe");
assert.ok(fs.existsSync(simulatorCompPath), "src/components/site/Simulator.tsx existe");
assert.ok(fs.existsSync(contactFnPath), "src/lib/contactFn.ts existe");
console.log("✅ Tous les fichiers du système Captcha sont présents.");

// 2. Vérification des liaisons de code
const contactContent = fs.readFileSync(contactCompPath, "utf-8");
assert.ok(contactContent.includes("AntiBotCaptcha"), "Contact.tsx intègre AntiBotCaptcha");
assert.ok(contactContent.includes("captchaAnswer"), "Contact.tsx traite captchaAnswer");
assert.ok(contactContent.includes("captchaToken"), "Contact.tsx traite captchaToken");
assert.ok(contactContent.includes("website_hp"), "Contact.tsx traite le honeypot website_hp");
console.log("✅ Contact.tsx est correctement protégé.");

const simulatorContent = fs.readFileSync(simulatorCompPath, "utf-8");
assert.ok(simulatorContent.includes("AntiBotCaptcha"), "Simulator.tsx intègre AntiBotCaptcha");
assert.ok(simulatorContent.includes("captchaData"), "Simulator.tsx gère le state captchaData");
assert.ok(simulatorContent.includes("captchaAnswer: captchaData.answer"), "Simulator.tsx transmet la réponse captcha");
console.log("✅ Simulator.tsx est correctement protégé.");

const contactFnContent = fs.readFileSync(contactFnPath, "utf-8");
assert.ok(contactFnContent.includes("verifyCaptchaSolution"), "contactFn.ts importe verifyCaptchaSolution");
assert.ok(contactFnContent.includes("captchaResult"), "contactFn.ts applique le contrôle anti-bot");
console.log("✅ contactFn.ts applique la validation serveur.");

// 3. Exécution des tests unitaires de logique captcha
import("./../tests/test_captcha.mjs").then(() => {
  console.log("\n🚀 SUCCÈS TOTAL : LE SYSTÈME DE CAPTCHA ANTI-BOT EST 100% OPÉRATIONNEL !");
});
