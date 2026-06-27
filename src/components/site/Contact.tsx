import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Globe,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Send,
} from "lucide-react";
import { useI18n } from "@/i18n/context";
import { Section } from "./Services";

const socials = [
  { Icon: Instagram, href: "https://www.instagram.com/tydev__/", label: "Instagram" },
  { Icon: Linkedin, href: "https://www.linkedin.com/company/ty-devs/", label: "LinkedIn" },
  {
    Icon: Facebook,
    href: "https://www.facebook.com/people/TY-DEV/61581507878160/",
    label: "Facebook",
  },
  { Icon: Twitter, href: "https://x.com/tydev__", label: "X" },
  { Icon: TikTokIcon, href: "https://www.tiktok.com/@tydev__", label: "TikTok" },
  { Icon: Youtube, href: "https://www.youtube.com/@TY-Dev", label: "YouTube" },
];

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.16a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.59z" />
    </svg>
  );
}

export function Contact() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);

  return (
    <Section id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <div className="font-mono text-xs uppercase tracking-wider text-brand mb-4">
            // CONTACT
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t.contact.title}
          </h2>
          <p className="text-muted-foreground text-lg mb-10">{t.contact.subtitle}</p>

          <div className="space-y-2 mb-12">
            <ContactRow Icon={Mail} text="contact@ty-dev.site" href="mailto:contact@ty-dev.site" />
            <ContactRow
              Icon={MessageCircle}
              text="WhatsApp: +33 07 59 44 01 05"
              href="https://wa.me/33759440105"
            />
            <ContactRow
              Icon={Instagram}
              text="@tydev__"
              href="https://www.instagram.com/tydev__/"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-12 h-12 rounded-xl bg-surface/40 border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:bg-brand hover:border-brand hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_oklch(0.6_0.22_265/0.5)] transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            (e.target as HTMLFormElement).reset();
            setTimeout(() => setSent(false), 5000);
          }}
          className="relative lg:col-span-3 p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-[oklch(0.08_0.025_260)] to-[oklch(0.05_0.015_260)] border border-border/50 shadow-2xl space-y-6 overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_right,oklch(0.6_0.22_265/0.4),transparent_60%)]" />
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label={t.contact.form.name} name="name" required />
            <Field label={t.contact.form.email} name="email" type="email" required />
          </div>
          <div className="relative">
            <Field label={t.contact.form.phone} name="phone" type="tel" />
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label={t.contact.form.type}
              name="type"
              options={t.contact.form.typeOptions}
            />
            <SelectField
              label={t.contact.form.budget}
              name="budget"
              options={t.contact.form.budgetOptions}
            />
          </div>
          <div className="relative">
            <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
              {t.contact.form.desc}
            </label>
            <textarea
              name="desc"
              required
              rows={5}
              placeholder={t.contact.form.descPlaceholder}
              className="w-full px-5 py-4 rounded-xl bg-surface/50 border border-border/60 focus:border-brand focus:bg-background focus:ring-4 focus:ring-brand/10 outline-none transition-all duration-300 text-foreground text-sm placeholder:text-muted-foreground/50 resize-none"
            />
          </div>
          <div className="relative pt-2">
            <button
              type="submit"
              className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-brand text-primary-foreground font-semibold shadow-[0_10px_40px_-10px_oklch(0.6_0.22_265/0.5)] transition-all duration-300 hover:shadow-[0_15px_50px_-10px_oklch(0.6_0.22_265/0.7)] hover:-translate-y-1"
            >
              {t.contact.form.submit}
              <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </div>
          {sent && (
            <p className="relative text-sm text-center text-brand font-mono animate-in fade-in slide-in-from-bottom-2">{t.contact.form.success}</p>
          )}
          <p className="relative text-xs text-center text-muted-foreground/60">{t.contact.form.note}</p>
        </motion.form>
      </div>
    </Section>
  );
}

function ContactRow({
  Icon,
  text,
  href,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  text: string;
  href: string;
}) {
  return (
    <a href={href} className="flex items-center gap-4 group p-3 -ml-3 rounded-2xl hover:bg-surface/40 transition-all duration-300">
      <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand transition-transform duration-500 group-hover:scale-110 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_0_20px_oklch(0.6_0.22_265/0.4)]">
        <Icon size={20} />
      </div>
      <span className="text-foreground font-medium group-hover:text-brand transition-colors text-sm md:text-base">{text}</span>
    </a>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full px-5 py-3.5 rounded-xl bg-surface/50 border border-border/60 focus:border-brand focus:bg-background focus:ring-4 focus:ring-brand/10 outline-none transition-all duration-300 text-foreground text-sm"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-wider text-muted-foreground mb-2">
        {label}
      </label>
      <select
        name={name}
        className="w-full px-5 py-3.5 rounded-xl bg-surface/50 border border-border/60 focus:border-brand focus:bg-background focus:ring-4 focus:ring-brand/10 outline-none transition-all duration-300 text-foreground text-sm appearance-none cursor-pointer"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[oklch(0.08_0.025_260)] text-foreground">
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
