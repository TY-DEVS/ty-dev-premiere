import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { getSiteUrl } from "@/lib/siteConfig";
import { I18nProvider } from "@/i18n/context";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}





const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "TY Dev",
  "alternateName": "TY-DEV International AI & Software Agency",
  "url": "https://ty-dev.site",
  "logo": "https://ty-dev.site/logo.jpg",
  "image": "https://ty-dev.site/logo.jpg",
  "description": "TY Dev concevoit et développe des applications web sur-mesure, plateformes SaaS, automatisations IA et architectures Cloud haute performance pour clients internationaux.",
  "email": "contact@ty-dev.site",
  "knowsAbout": [
    "Artificial Intelligence Agents",
    "SaaS Development",
    "Web Performance & Core Web Vitals",
    "React & Vite Architecture",
    "Cloud DevOps & Infrastructure"
  ],
  "areaServed": [
    { "@type": "Continent", "name": "Europe" },
    { "@type": "Continent", "name": "North America" },
    { "@type": "Continent", "name": "Asia" },
    { "@type": "Country", "name": "Worldwide" }
  ],
  "availableLanguage": [
    { "@type": "Language", "name": "French", "alternateName": "fr" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ],
  "priceRange": "$$"
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "TY Dev",
  "url": "https://ty-dev.site",
  "inLanguage": ["fr", "en"]
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TY Dev — Agence de Développement Web, SaaS & Agents IA" },
      {
        name: "description",
        content:
          "TY Dev crée des plateformes SaaS sur mesure, des automatisations IA et des applications web haute performance. Agence d'ingénierie logicielle pour entreprises ambitieuses.",
      },
      { name: "keywords", content: "agence web, développement saas, agent ia, react, vite, devops, seo, tanstack, architecture logicielle, web agency europe, software agency us" },
      { name: "author", content: "TY Dev" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:site_name", content: "TY Dev" },
      { property: "og:title", content: "TY Dev — Agence de Développement Web, SaaS & Agents IA" },
      {
        property: "og:description",
        content:
          "Plateformes SaaS sur mesure, automatisations IA et applications web haute performance. Conçu pour la croissance mesurable.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ty-dev.site" },
      { property: "og:image", content: "https://ty-dev.site/logo.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:locale:alternate", content: "en_US" },
      { property: "og:locale:alternate", content: "en_GB" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "TY Dev — Agence de Développement Web, SaaS & Agents IA" },
      { name: "twitter:description", content: "Plateformes SaaS sur mesure, automatisations IA et applications web haute performance." },
      { name: "twitter:image", content: "https://ty-dev.site/logo.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://ty-dev.site" },
      { rel: "alternate", hrefLang: "fr", href: "https://ty-dev.site" },
      { rel: "alternate", hrefLang: "en", href: "https://ty-dev.site" },
      { rel: "alternate", hrefLang: "x-default", href: "https://ty-dev.site" },
      { rel: "icon", type: "image/jpeg", href: "/favicon.jpg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(websiteSchema),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <ScrollToTop />
          <FloatingWhatsApp />
        </div>
        <Toaster richColors position="top-right" />
      </I18nProvider>
    </QueryClientProvider>
  );
}
