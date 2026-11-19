"use server";

import nodemailer from "nodemailer";
import { verifyGoogleRecaptcha } from "@/lib/captcha";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const DEFAULT_HOST = "83.229.19.107";
const DEFAULT_USER = "contact@ty-dev.site";

function parseReceivers(): string[] {
  const defaultList = [
    "contact@ty-dev.site",
    "benyaalamedyassine24@gmail.com",
    "amine.benammar17@gmail.com",
    "support@ty-dev.site",
  ];
  const envRaw = process.env.CONTACT_RECEIVER ? process.env.CONTACT_RECEIVER.replace(/"/g, "") : "";
  const envList = envRaw
    ? envRaw
        .split(",")
        .map((e) => e.trim())
        .filter((e) => EMAIL_REGEX.test(e))
    : [];

  return Array.from(new Set([...defaultList, ...envList]));
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  type: string;
  budget: string;
  desc: string;
  source?: string;
  recaptchaToken?: string;
  website_hp?: string;
}

export async function sendContactEmailAction(data: ContactFormData) {
  const { name, email, phone, type, budget, desc, source, recaptchaToken, website_hp } = data;

  // 1. Google reCAPTCHA verification
  const captchaResult = await verifyGoogleRecaptcha({
    token: recaptchaToken,
    honeypot: website_hp,
  });

  if (!captchaResult.valid) {
    console.warn(`[reCAPTCHA Shield] Rejet soumission (${email || "inconnu"}): ${captchaResult.reason}`);
    throw new Error(captchaResult.reason || "Veuillez cocher la case Google 'Je ne suis pas un robot'.");
  }

  // 2. Strict fields verification
  const cleanEmail = (email || "").trim();
  const cleanName = (name || "").trim();
  const cleanDesc = (desc || "").trim();
  const cleanPhone = (phone || "").trim();

  if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
    throw new Error("L'adresse e-mail saisie est invalide. Veuillez vérifier votre saisie.");
  }
  if (!cleanName || cleanName.length < 2) {
    throw new Error("Veuillez renseigner un nom valide (au moins 2 caractères).");
  }
  if (!cleanDesc || cleanDesc.length < 5) {
    throw new Error("Veuillez décrire votre projet de manière plus détaillée.");
  }

  const host = (process.env.SMTP_HOST || DEFAULT_HOST).trim();
  const user = (process.env.SMTP_USER || DEFAULT_USER).trim();
  const pass = (process.env.SMTP_PASS || "").replace(/"/g, "").trim();
  const envPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : null;

  if (!pass) {
    console.warn("[ContactForm] Warning: SMTP_PASS is not set in environment variables.");
  }

  const configsToTry = envPort
    ? [
        { host, port: envPort, secure: envPort === 465 },
        { host, port: 587, secure: false },
        { host, port: 465, secure: true },
      ]
    : [
        { host, port: 587, secure: false },
        { host, port: 465, secure: true },
      ];

  const receivers = parseReceivers();

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

  let lastError: any = null;

  for (const config of configsToTry) {
    try {
      const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: pass ? { user, pass } : undefined,
        tls: { rejectUnauthorized: false },
        connectionTimeout: 10000,
        greetingTimeout: 8000,
        socketTimeout: 10000,
      });

      const info = await transporter.sendMail({
        from: `"TY DEV Site" <${user}>`,
        to: receivers,
        replyTo: cleanEmail,
        subject: `[Formulaire Site] ${cleanName} - ${type || "Nouveau projet"}`,
        text: textContent,
        html: htmlContent,
      });

      console.log(`[ContactForm] SUCCESS via SMTP port ${config.port}! MessageID: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } catch (err: any) {
      console.warn(`[ContactForm] Warning: SMTP port ${config.port} failed: ${err?.message || err}`);
      lastError = err;
    }
  }

  throw lastError || new Error("Le serveur SMTP n'a pas répondu sur les ports configurés.");
}
