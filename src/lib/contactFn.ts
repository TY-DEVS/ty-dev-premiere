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
    connectionTimeout: 4000,
    greetingTimeout: 3000,
  });
}

async function sendMailWithFallback(mailOptions: {
  from: string;
  to: string[];
  replyTo: string;
  subject: string;
  text: string;
  html: string;
}) {
  const host = (process.env.SMTP_HOST || DEFAULT_HOST).trim();
  const user = (process.env.SMTP_USER || DEFAULT_USER).trim();
  const pass = (process.env.SMTP_PASS || DEFAULT_PASS).replace(/"/g, "").trim();

  // 1. Try Resend HTTPS API if RESEND_API_KEY is present
  if (process.env.RESEND_API_KEY?.trim()) {
    try {
      console.log("[ContactForm] Attempting HTTPS delivery via Resend API...");
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY.trim()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "TY DEV <onboarding@resend.dev>",
          to: mailOptions.to,
          reply_to: mailOptions.replyTo,
          subject: mailOptions.subject,
          html: mailOptions.html,
          text: mailOptions.text,
        }),
      });
      if (res.ok) {
        const data: any = await res.json();
        console.log(`[ContactForm] SUCCESS via Resend HTTPS API! ID: ${data.id}`);
        return { messageId: data.id };
      }
    } catch (e: any) {
      console.warn("[ContactForm] Resend API failed:", e?.message);
    }
  }

  // 2. Try Brevo HTTPS API if BREVO_API_KEY is present
  if (process.env.BREVO_API_KEY?.trim()) {
    try {
      console.log("[ContactForm] Attempting HTTPS delivery via Brevo API...");
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY.trim(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "TY DEV Site", email: user },
          to: mailOptions.to.map((e) => ({ email: e })),
          replyTo: { email: mailOptions.replyTo },
          subject: mailOptions.subject,
          htmlContent: mailOptions.html,
          textContent: mailOptions.text,
        }),
      });
      if (res.ok) {
        const data: any = await res.json();
        console.log(`[ContactForm] SUCCESS via Brevo HTTPS API! MessageID: ${data.messageId}`);
        return { messageId: data.messageId };
      }
    } catch (e: any) {
      console.warn("[ContactForm] Brevo API failed:", e?.message);
    }
  }

  // 3. Try Direct SMTP TCP Ports (465 SSL, 587 STARTTLS) with short timeout (4s)
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
        connectionTimeout: 4000, // 4 seconds max per port
        greetingTimeout: 3000,
        socketTimeout: 5000,
      });

      const info = await transporter.sendMail(mailOptions);
      console.log(`[ContactForm] SUCCESS via SMTP port ${config.port}! MessageID: ${info.messageId}`);
      return info;
    } catch (err: any) {
      console.warn(`[ContactForm] Warning: SMTP port ${config.port} failed on server: ${err?.message || err}`);
      lastError = err;
    }
  }

  // 4. Send Webhook notification as ultimate safety fallback if DISCORD_WEBHOOK_URL is configured
  if (process.env.DISCORD_WEBHOOK_URL?.trim()) {
    try {
      await fetch(process.env.DISCORD_WEBHOOK_URL.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: `🚨 **Nouveau message de contact TY-DEV** (Backup Webhook)\nDe: ${mailOptions.replyTo}\nSujet: ${mailOptions.subject}\nContenu:\n${mailOptions.text}`,
        }),
      });
    } catch (_) {}
  }

  throw (
    lastError ||
    new Error(
      "Le serveur de votre hébergeur web bloque les connexions SMTP (ports 465/587). Veuillez débloquer les ports SMTP sur votre VPS ou ajouter RESEND_API_KEY."
    )
  );
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
      throw new Error(error?.message || "Erreur lors de l'envoi de l'e-mail.");
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
