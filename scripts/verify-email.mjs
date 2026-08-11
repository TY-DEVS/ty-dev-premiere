import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Load .env file
const envPath = path.resolve(".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...vals] = trimmed.split("=");
      let val = vals.join("=").trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key.trim()] = val;
    }
  });
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const host = process.env.SMTP_HOST || "83.229.19.107";
const port = parseInt(process.env.SMTP_PORT || "465", 10);
const user = process.env.SMTP_USER || "contact@ty-dev.site";
const pass = (process.env.SMTP_PASS || "mW4@B*NHEPP9szv").replace(/"/g, "");
const rawReceivers = process.env.CONTACT_RECEIVER || "contact@ty-dev.site, benyaalamedyassine24@gmail.com, amine.benammar17@gmail.com";

const receivers = rawReceivers
  .replace(/"/g, "")
  .split(",")
  .map((e) => e.trim())
  .filter((e) => EMAIL_REGEX.test(e));

console.log("=== VÉRIFICATION ENVOI EMAIL & SMTP TY-DEV ===");
console.log("📍 Serveur SMTP Host:", host);
console.log("🔌 Port:", port);
console.log("👤 Utilisateur SMTP:", user);
console.log("📩 Destinataires configurés:", receivers);

async function runVerification() {
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 15000,
  });

  try {
    console.log("\n⏳ Step 1: Verification de la connexion SMTP...");
    await transporter.verify();
    console.log("✅ Succès: Le serveur SMTP répons correctement !");

    console.log("\n⏳ Step 2: Envoi d'un e-mail de test aux destinataires...");
    const info = await transporter.sendMail({
      from: `"TY DEV Verification" <${user}>`,
      to: receivers,
      subject: "🧪 [Vérification System] Test d'envoi Email TY-DEV",
      text: `Test de vérification d'envoi d'email réussi.\nDate/Heure: ${new Date().toISOString()}\nDestinataires: ${receivers.join(", ")}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #ffffff; border-radius: 10px;">
          <h2 style="color: #10b981;">✅ Test d'envoi d'email réussi !</h2>
          <p>Le serveur SMTP de <strong>TY-DEV</strong> fonctionne correctement.</p>
          <ul>
            <li><strong>Serveur:</strong> ${host}:${port}</li>
            <li><strong>Expéditeur:</strong> ${user}</li>
            <li><strong>Destinataires:</strong> ${receivers.join(", ")}</li>
            <li><strong>Date:</strong> ${new Date().toLocaleString("fr-FR")}</li>
          </ul>
        </div>
      `,
    });

    console.log("✅ Succès: E-mail envoyé avec succès !");
    console.log("🆔 MessageID:", info.messageId);
    console.log("📬 Statut serveur:", info.response);
  } catch (error) {
    console.error("❌ ÉCHEC de la vérification:", error.message);
    process.exit(1);
  }
}

runVerification();
