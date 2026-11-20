import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveTenantByHostname } from "@/config/tenants";

export function middleware(request: NextRequest) {
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "";

  const tenant = resolveTenantByHostname(host);

  // Cloner les en-têtes de la requête pour injecter les données tenant
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-tenant-id", tenant.id);
  requestHeaders.set("x-tenant-domain", tenant.domain);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Si l'utilisateur n'a pas encore de préférence de langue explicite en cookie,
  // lui assigner la langue par défaut du domaine (FR pour .fr et .site, EN pour .tech)
  const langCookie = request.cookies.get("tydev_lang");
  if (!langCookie) {
    response.cookies.set("tydev_lang", tenant.defaultLang, {
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Matcher toutes les routes de l'application sauf :
     * - _next/static (fichiers statiques JS/CSS)
     * - _next/image (optimisation d'images Next.js)
     * - favicon.ico, robots.txt, sitemap.xml, feed.xml
     * - extensions d'images et polices
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|feed.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2|ttf|eot)).*)",
  ],
};
