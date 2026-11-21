'use client';

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { TenantProvider } from "@/context/tenantContext";
import { I18nProvider } from "@/i18n/context";
import { type TenantConfig, DEFAULT_TENANT } from "@/config/tenants";
import { type Lang } from "@/i18n/translations";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Toaster } from "sonner";

export function Providers({
  children,
  initialTenant = DEFAULT_TENANT,
  initialLang = "fr",
}: {
  children: ReactNode;
  initialTenant?: TenantConfig;
  initialLang?: Lang;
}) {
  const pathname = usePathname();
  const isKeystatic = pathname?.startsWith("/keystatic");

  if (isKeystatic) {
    return (
      <TenantProvider initialTenant={initialTenant}>
        {children}
        <Toaster richColors position="top-right" />
      </TenantProvider>
    );
  }

  return (
    <TenantProvider initialTenant={initialTenant}>
      <I18nProvider initialLang={initialLang} initialDomainTarget={initialTenant.id}>
        <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ScrollToTop />
          <FloatingWhatsApp />
        </div>
        <Toaster richColors position="top-right" />
      </I18nProvider>
    </TenantProvider>
  );
}
