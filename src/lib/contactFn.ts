import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";

export const sendContactEmailFn = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string; phone?: string; type: string; budget: string; desc: string; source?: string }) => data)
  .handler(async (ctx) => {
    const { name, email, phone, type, budget, desc, source } = ctx.data;
    try {
      const transporter = nodemailer.createTransport({
        host: "83.229.19.107", // Force direct IP to bypass Cloudflare and Coolify env issues
        port: 465, // Using 465 because VPS providers often block port 587 outbound
        secure: true, 
        auth: {
          user: process.env.SMTP_USER || "contact@ty-dev.site",
          pass: process.env.SMTP_PASS?.replace(/"/g, ""), // Automatically remove quotes if they accidentally put them in Coolify
        },
        tls: {
            rejectUnauthorized: false
        }
      });

      const mailOptions = {
        from: process.env.SMTP_USER || "contact@ty-dev.site",
        to: "contact@ty-dev.fr, benyaalamedyassine24@gmail.com, webmarketpro77@gmail.com, amine.benammar17@gmail.com",
        replyTo: email,
        subject: `Nouveau Contact: ${name} - ${type}`,
        text: `
Nouveau message depuis le formulaire de contact:

Source du contact: ${source || "Non définie"}

Nom: ${name}
Email: ${email}
Téléphone: ${phone || "Non renseigné"}
Type de Projet: ${type}
Budget: ${budget}

Description:
${desc}
        `,
      };

      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error("Failed to send email:", error);
      // We throw a generic error so we don't leak SMTP errors to the client
      throw new Error("Failed to send email");
    }
  });
