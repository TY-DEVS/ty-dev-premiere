import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Simple env loader
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

const host = process.env.SMTP_HOST || "83.229.19.107";
const port = parseInt(process.env.SMTP_PORT || "587", 10);
const user = process.env.SMTP_USER || "contact@ty-dev.site";
const pass = process.env.SMTP_PASS || "";
const receivers = process.env.CONTACT_RECEIVER || "contact@ty-dev.site";

console.log("Testing SMTP connection with settings:", { host, port, user, pass: pass ? "****" : "MISSING", receivers });

async function testSmtp() {
  const portsToTest = [
    { host, port: 465, secure: true },
    { host, port: 587, secure: false },
    { host, port: 25, secure: false }
  ];

  for (const config of portsToTest) {
    console.log(`\n--- Testing ${config.host}:${config.port} (secure: ${config.secure}) ---`);
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: { user, pass },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 10000,
    });

    try {
      await transporter.verify();
      console.log(`SUCCESS: SMTP Connection verified on port ${config.port}!`);
      
      console.log("Sending test email to:", receivers);
      const info = await transporter.sendMail({
        from: `"TY DEV Test" <${user}>`,
        to: receivers,
        subject: "Test Mail Verification TY-DEV",
        text: "Ceci est un email de test de vérification du serveur SMTP TY-DEV.",
      });
      console.log("Email sent successfully! MessageID:", info.messageId, "Response:", info.response);
      return;
    } catch (err) {
      console.error(`FAILED on port ${config.port}:`, err.message);
    }
  }
}

testSmtp();
