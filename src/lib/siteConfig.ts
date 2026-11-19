export function getSiteUrl(): string {
  if (typeof process !== "undefined" && process.env) {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
      return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    }
    if (process.env.SITE_URL) {
      return process.env.SITE_URL.replace(/\/$/, "");
    }
  }
  return "https://ty-dev.site";
}

export const SITE_URL = getSiteUrl();
