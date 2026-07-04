import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Building2, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal Information — TY Dev LLC" },
      {
        name: "description",
        content: "Legal information and company details for TY Dev LLC.",
      },
      { property: "og:title", content: "Legal Information — TY Dev LLC" },
      {
        property: "og:description",
        content: "Legal information and company details for TY Dev LLC.",
      },
    ],
    links: [{ rel: "canonical", href: "/legal" }],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Legal Information
            </h1>
            <p className="text-muted-foreground text-lg">
              Company details and registered information
            </p>
          </div>

          <div className="space-y-8">
            {/* Company Name */}
            <Section icon={Building2} title="Limited Liability Company">
              <InfoBlock label="Company Name" value="TY Dev LLC" />
            </Section>

            {/* Registered Agent */}
            <Section icon={MapPin} title="Registered Agent">
              <InfoBlock
                label="Registered Agent"
                value="WY Commercial Registered Agent LLC"
              />
              <InfoBlock
                label="Agent Address"
                value={
                  <>
                    75 E 3rd St
                    <br />
                    Sheridan, WY 82801
                  </>
                }
              />
            </Section>

            {/* Company Addresses */}
            <Section icon={MapPin} title="Company Addresses">
              <InfoBlock
                label="Mailing Address"
                value={
                  <>
                    75 E 3rd St Ste 7
                    <br />
                    Sheridan, WY 82801
                  </>
                }
              />
              <InfoBlock
                label="Principal Office"
                value={
                  <>
                    75 E 3rd St Ste 7
                    <br />
                    Sheridan, WY 82801
                  </>
                }
              />
            </Section>

            {/* Contact */}
            <Section icon={Mail} title="Contact Information">
              <InfoBlock
                label="Email"
                value={
                  <a
                    href="mailto:contact@ty-dev.tech"
                    className="text-brand hover:underline"
                  >
                    contact@ty-dev.tech
                  </a>
                }
              />
            </Section>

            {/* State Registration */}
            <Section icon={Building2} title="State Registration">
              <InfoBlock
                label="Registered With"
                value={
                  <>
                    Wyoming Secretary of State
                    <br />
                    Herschler Bldg East, Ste.100 & 101
                    <br />
                    Cheyenne, WY 82002-0020
                    <br />
                    Ph. 307-777-7311
                  </>
                }
              />
            </Section>
          </div>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 p-6 rounded-2xl bg-surface/40 border border-border"
          >
            <p className="text-sm text-muted-foreground text-center">
              © 2026 TY Dev LLC. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 md:p-8 rounded-2xl bg-surface/40 border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
          <Icon size={20} strokeWidth={2} />
        </div>
        <h2 className="font-display text-xl font-semibold">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function InfoBlock({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-sm font-mono text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className="text-foreground leading-relaxed">{value}</div>
    </div>
  );
}
