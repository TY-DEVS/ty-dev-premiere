export function getSiteUrl(): string {
  if (typeof process !== "undefined" && process.env && process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/$/, "");
  }
  if (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL.replace(/\/$/, "");
  }
  return "https://ty-dev.site";
}

export const SITE_URL = getSiteUrl();
