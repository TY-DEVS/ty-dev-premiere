import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const DEFAULT_HOST = "83.229.19.107";
const DEFAULT_USER = "contact@ty-dev.site";
const DEFAULT_PASS = "mW4@B*NHEPP9szv";
const DEFAULT_RECEIVERS = "contact@ty-dev.site, benyaalamedyassine24@gmail.com, amine.benammar17@gmail.com";

function getSmtpTransporter(port: number = 465) {
  const host = (process.env.SMTP_HOST || DEFAULT_HOST).trim();
  const user = (process.env.SMTP_USER || DEFAULT_USER).trim();
  const pass = (process.env.SMTP_PASS || DEFAULT_PASS).replace(/"/g, "").trim();

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
    connectionTimeout: 10000,
    greetingTimeout: 8000,
  });
}

async function sendMailWithFallback(mailOptions: nodemailer.SendMailOptions) {
  const host = (process.env.SMTP_HOST || DEFAULT_HOST).trim();
  const user = (process.env.SMTP_USER || DEFAULT_USER).trim();
  const pass = (process.env.SMTP_PASS || DEFAULT_PASS).replace(/"/g, "").trim();
  const envPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : null;

  const configsToTry = envPort
    ? [
        { host, port: envPort, secure: envPort === 465 },
        { host, port: 465, secure: true },
        { host, port: 587, secure: false },
      ]
    : [
        { host, port: 465, secure: true },
        { host, port: 587, secure: false },
      ];

  let lastError: any = null;

  for (const config of configsToTry) {
    try {
      console.log(`[ContactForm] Attempting SMTP via ${config.host}:${config.port} (secure: ${config.secure})...`);
      const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: { user, pass },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 8000,
        greetingTimeout: 5000,
      });

      const info = await transporter.sendMail(mailOptions);
      console.log(`[ContactForm] SUCCESS via port ${config.port}! MessageID: ${info.messageId}`);
      return info;
    } catch (err: any) {
      console.warn(`[ContactForm] Warning: SMTP attempt failed on port ${config.port}: ${err?.message || err}`);
      lastError = err;
    }
  }

  throw lastError || new Error("Tous les ports SMTP (465, 587) ont échoué.");
}

function parseReceivers(): string[] {
  const raw = process.env.CONTACT_RECEIVER || DEFAULT_RECEIVERS;
  const cleaned = raw.replace(/"/g, "");
  const list = cleaned
    .split(",")
    .map((e) => e.trim())
    .filter((e) => EMAIL_REGEX.test(e));

  if (list.length === 0) {
    return DEFAULT_RECEIVERS.split(",").map((e) => e.trim());
  }

  return list;
}

export const sendContactEmailFn = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string; phone?: string; type: string; budget: string; desc: string; source?: string }) => data)
  .handler(async (ctx) => {
    const { name, email, phone, type, budget, desc, source } = ctx.data;

    // 1. Strict email verification
    const cleanEmail = (email || "").trim();
    const cleanName = (name || "").trim();
    const cleanDesc = (desc || "").trim();
    const cleanPhone = (phone || "").trim();

    if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
      console.warn(`[ContactForm] Rejected invalid sender email: "${email}"`);
      throw new Error("L'adresse e-mail saisie est invalide. Veuillez vérifier votre saisie.");
    }

    if (!cleanName || cleanName.length < 2) {
      throw new Error("Veuillez renseigner un nom valide (au moins 2 caractères).");
    }

    if (!cleanDesc || cleanDesc.length < 5) {
      throw new Error("Veuillez décrire votre projet de manière plus détaillée.");
    }

    try {
      const receivers = parseReceivers();
      const senderUser = (process.env.SMTP_USER || DEFAULT_USER).trim();

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; padding: 30px; border-radius: 12px; border: 1px solid #1e293b;">
          <div style="border-bottom: 2px solid #3b82f6; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="color: #60a5fa; margin: 0; font-size: 22px;">🚀 Nouveau Message de Contact</h2>
            <p style="color: #94a3b8; font-size: 13px; margin: 5px 0 0 0;">Reçu via: ${source || "https://ty-dev.site"}</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; width: 140px;"><strong>Nom complet:</strong></td>
              <td style="padding: 8px 0; color: #ffffff;">${cleanName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;"><strong>Email de contact:</strong></td>
              <td style="padding: 8px 0; color: #60a5fa;"><a href="mailto:${cleanEmail}" style="color: #60a5fa; text-decoration: underline;">${cleanEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;"><strong>Téléphone:</strong></td>
              <td style="padding: 8px 0; color: #ffffff;">${cleanPhone || "Non renseigné"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;"><strong>Type de projet:</strong></td>
              <td style="padding: 8px 0; color: #f59e0b;"><strong>${type || "Non précisé"}</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8;"><strong>Budget estimé:</strong></td>
              <td style="padding: 8px 0; color: #10b981;"><strong>${budget || "Non précisé"}</strong></td>
            </tr>
          </table>
          <div style="background-color: #1e293b; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h3 style="margin-top: 0; color: #94a3b8; font-size: 14px; text-transform: uppercase;">Message / Description du Projet:</h3>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; font-size: 14px;">${cleanDesc}</p>
          </div>
          <div style="margin-top: 25px; pt: 15px; border-top: 1px solid #1e293b; text-align: center; color: #64748b; font-size: 12px;">
            Message envoyé automatiquement depuis le site TY DEV
          </div>
        </div>
      `;

      const textContent = `
Nouveau message depuis le formulaire de contact TY-DEV:

Source: ${source || "Non définie"}
Nom: ${cleanName}
Email: ${cleanEmail}
Téléphone: ${cleanPhone || "Non renseigné"}
Type de Projet: ${type}
Budget: ${budget}

Description du projet:
${cleanDesc}
      `;

      const mailOptions = {
        from: `"TY DEV Site" <${senderUser}>`,
        to: receivers,
        replyTo: cleanEmail,
        subject: `[Formulaire Site] ${cleanName} - ${type || "Nouveau projet"}`,
        text: textContent,
        html: htmlContent,
      };

      const info = await sendMailWithFallback(mailOptions);
      console.log(`[ContactForm] Email successfully sent to [${receivers.join(", ")}]. MessageID: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (error: any) {
      console.error("[ContactForm] Error sending email:", error);
      throw new Error(`Échec de l'envoi du message: ${error?.message || "Erreur serveur SMTP"}`);
    }
  });

export const verifyEmailSmtpFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const transporter = getSmtpTransporter(465);
    await transporter.verify();
    const receivers = parseReceivers();
    return {
      status: "ok",
      receivers,
      message: "Connexion SMTP vérifiée avec succès.",
    };
  } catch (error: any) {
    console.error("[SMTP Verification] Failed:", error);
    return {
      status: "error",
      message: error?.message || "Erreur de vérification SMTP",
    };
  }
});
