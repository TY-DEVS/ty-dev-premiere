import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";

export const sendContactEmailFn = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string; phone?: string; type: string; budget: string; desc: string; source?: string }) => data)
  .handler(async (ctx) => {
    const { name, email, phone, type, budget, desc, source } = ctx.data;

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "mail.ty-dev.site",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_PORT === "465", 
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
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
