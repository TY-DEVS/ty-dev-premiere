"use server";

import nodemailer from "nodemailer";
import { headers } from "next/headers";
import { verifyGoogleRecaptcha } from "@/lib/captcha";
import { resolveTenantByHostname, isStagingEnvironment, type TenantConfig, DEFAULT_TENANT } from "@/config/tenants";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const DEFAULT_HOST = "83.229.19.107";
const DEFAULT_USER = "contact@ty-dev.site";

function getTenantReceivers(tenant: TenantConfig): string[] {
  const envRaw = process.env.CONTACT_RECEIVER ? process.env.CONTACT_RECEIVER.replace(/"/g, "") : "";
  const envList = envRaw
    ? envRaw
        .split(",")
        .map((e) => e.trim())
        .filter((e) => EMAIL_REGEX.test(e))
    : [];

  return Array.from(new Set([...tenant.contact.receivers, ...envList]));
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

  // 0. Résolution du tenant d'après les en-têtes de la requête
  let tenant = DEFAULT_TENANT;
  try {
    const headersList = await headers();
    const host =
      headersList.get("x-tenant-domain") ||
      headersList.get("x-forwarded-host") ||
      headersList.get("host") ||
      "";
    tenant = resolveTenantByHostname(host || source);
  } catch (err) {
    console.warn("[ContactAction] Error reading headers, fallback to default tenant:", err);
  }

  // 1. Vérification Google reCAPTCHA
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
  const user = (process.env.SMTP_USER || tenant.contact.email || DEFAULT_USER).trim();
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

  const receivers = getTenantReceivers(tenant);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; padding: 30px; border-radius: 12px; border: 1px solid #1e293b;">
      <div style="border-bottom: 2px solid #3b82f6; padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="color: #60a5fa; margin: 0; font-size: 22px;">🚀 Nouveau Message de Contact</h2>
        <p style="color: #94a3b8; font-size: 13px; margin: 5px 0 0 0;">
          Marque: <strong>${tenant.brandName}</strong> | Domaine: <strong>${tenant.domain}</strong> | Reçu via: ${source || tenant.seo.canonicalBase}
        </p>
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
          <td style="padding: 8px 0; color: #38bdf8;">${type || "Non spécifié"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #94a3b8;"><strong>Budget estimé:</strong></td>
          <td style="padding: 8px 0; color: #34d399;">${budget || "Non spécifié"}</td>
        </tr>
      </table>
      <div style="background-color: #1e293b; padding: 18px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-bottom: 20px;">
        <h3 style="color: #cbd5e1; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Description du projet :</h3>
        <p style="color: #f1f5f9; line-height: 1.6; white-space: pre-wrap; margin-bottom: 0;">${cleanDesc}</p>
      </div>
      <div style="font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; padding-top: 15px; display: flex; justify-content: space-between;">
        <span>TY Dev Automated Gateway • ${tenant.brandName}</span>
        <span>${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</span>
      </div>
    </div>
  `;

  let lastError: any = null;

  for (const cfg of configsToTry) {
    try {
      const transporter = nodemailer.createTransport({
        host: cfg.host,
        port: cfg.port,
        secure: cfg.secure,
        auth: {
          user,
          pass,
        },
        tls: {
          rejectUnauthorized: false,
        },
        connectionTimeout: 8000,
        greetingTimeout: 5000,
        socketTimeout: 10000,
      });

      const isStag = isStagingEnvironment(tenant.domain);
      const subjectPrefix = isStag ? "[STAGING] " : "";

      const mailOptions = {
        from: `"${tenant.brandName}" <${tenant.contact.email || user}>`,
        to: receivers.join(", "),
        replyTo: cleanEmail,
        subject: `${subjectPrefix}[${tenant.brandName}] Nouveau Contact: ${cleanName} - ${type || "Projet"}`,
        text: `Nouveau message reçu depuis ${tenant.domain} (${tenant.brandName}):\n\nNom: ${cleanName}\nEmail: ${cleanEmail}\nTéléphone: ${cleanPhone || "Non renseigné"}\nType: ${type}\nBudget: ${budget}\n\nDescription:\n${cleanDesc}\n\nSource: ${source || tenant.seo.canonicalBase}`,
        html: htmlContent,
      };

      await transporter.sendMail(mailOptions);
      console.log(`[ContactForm] Email envoyé avec succès via ${cfg.host}:${cfg.port} pour ${tenant.brandName} (${tenant.domain})`);
      return { success: true, message: "Message envoyé avec succès." };
    } catch (err: any) {
      console.warn(`[ContactForm] Échec envoi via port ${cfg.port}:`, err?.message || err);
      lastError = err;
    }
  }

  console.error("[ContactForm] Tous les ports SMTP ont échoué:", lastError);
  throw new Error("Le serveur d'envoi d'e-mails est temporairement indisponible. Veuillez nous contacter directement sur WhatsApp.");
}
