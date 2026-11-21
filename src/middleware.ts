import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { resolveTenantByHostname } from "@/config/tenants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protection de Keystatic CMS en production (Basic Auth + Token)
  if (
    process.env.NODE_ENV === "production" &&
    (pathname.startsWith("/keystatic") || pathname.startsWith("/api/keystatic"))
  ) {
    const validUser = process.env.KEYSTATIC_ADMIN_USER || "admin";
    const validPassword =
      process.env.KEYSTATIC_ADMIN_PASSWORD ||
      process.env.BLOG_ADMIN_TOKEN ||
      "tydev_blog_admin_secret_key_2026";

    const authHeader = request.headers.get("authorization");
    const tokenParam = request.nextUrl.searchParams.get("token");
    const authCookie = request.cookies.get("tydev_cms_auth")?.value;

    let isAuthenticated = false;

    if (authCookie === validPassword || tokenParam === validPassword) {
      isAuthenticated = true;
    } else if (authHeader && authHeader.startsWith("Basic ")) {
      try {
        const base64Credentials = authHeader.split(" ")[1];
        const credentials = atob(base64Credentials);
        const [username, ...pwdParts] = credentials.split(":");
        const password = pwdParts.join(":");
        if (username === validUser && password === validPassword) {
          isAuthenticated = true;
        }
      } catch {
        isAuthenticated = false;
      }
    }

    if (!isAuthenticated) {
      return new NextResponse(
        "Authentification requise pour accéder au CMS TY Dev.",
        {
          status: 401,
          headers: {
            "WWW-Authenticate": 'Basic realm="TY Dev Keystatic Admin"',
          },
        }
      );
    }
  }

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

  // Si authentifié via token URL, enregistrer le cookie de session CMS
  const tokenParam = request.nextUrl.searchParams.get("token");
  const validPassword =
    process.env.KEYSTATIC_ADMIN_PASSWORD ||
    process.env.BLOG_ADMIN_TOKEN ||
    "tydev_blog_admin_secret_key_2026";
  if (tokenParam === validPassword) {
    response.cookies.set("tydev_cms_auth", validPassword, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
  }

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
