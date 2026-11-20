import { resolveTenantByHostname, DEFAULT_TENANT } from "@/config/tenants";

export function getSiteUrl(hostname?: string): string {
  if (hostname) {
    const tenant = resolveTenantByHostname(hostname);
    return tenant.seo.canonicalBase;
  }
  if (typeof process !== "undefined" && process.env) {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    }
    if (process.env.SITE_URL) {
      return process.env.SITE_URL.replace(/\/$/, "");
    }
  }
  return DEFAULT_TENANT.seo.canonicalBase;
}

export const SITE_URL = getSiteUrl();
