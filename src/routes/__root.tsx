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
import { getAggregateRatingSchema, getReviewsSchemaList } from "@/data/reviewsData";

function NotFoundComponent() {
  return (
    <>
      {/* Empêcher l'indexation des pages 404 par les moteurs de recherche */}
      <meta name="robots" content="noindex, nofollow" />
      <title>404 — Page non trouvée | TY Dev</title>
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-7xl font-bold text-foreground">404</h1>
          <h2 className="mt-4 text-xl font-semibold text-foreground">Page non trouvée</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </>
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
  "legalName": "TY Dev LLC",
  "alternateName": "TY-DEV International AI & Software Agency",
  "url": "https://ty-dev.site",
  "logo": "https://ty-dev.site/logo.jpg",
  "image": "https://ty-dev.site/logo.jpg",
  "description": "TY Dev conçoit et développe des applications web sur-mesure, plateformes SaaS, automatisations IA et architectures Cloud haute performance pour clients internationaux.",
  "email": "contact@ty-dev.site",
  "telephone": "+33 7 59 44 01 05",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "75 E 3rd St",
    "addressLocality": "Sheridan",
    "addressRegion": "WY",
    "postalCode": "82801",
    "addressCountry": "US",
  },
  "sameAs": [
    "https://ty-dev.fr",
    "https://ty-dev.tech",
    "https://www.linkedin.com/company/ty-devs/",
    "https://www.instagram.com/tydev__/",
    "https://x.com/tydev__"
  ],
  "knowsAbout": [
    "Artificial Intelligence Agents",
    "SaaS Development",
    "Web Performance & Core Web Vitals",
    "React & Vite Architecture",
    "Cloud DevOps & Infrastructure"
  ],
  "areaServed": [
    { "@type": "Country", "name": "France" },
    { "@type": "Country", "name": "Tunisia" },
    { "@type": "Country", "name": "Belgium" },
    { "@type": "Country", "name": "Switzerland" },
    { "@type": "Country", "name": "United States" },
    { "@type": "Continent", "name": "Europe" },
    { "@type": "Continent", "name": "North America" },
    { "@type": "Country", "name": "Worldwide" }
  ],
  "currenciesAccepted": "EUR, USD, TND",
  "paymentAccepted": "Credit Card, Stripe, Bank Transfer, Wire Transfer",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "19:00"
    }
  ],
  "availableLanguage": [
    { "@type": "Language", "name": "French", "alternateName": "fr" },
    { "@type": "Language", "name": "English", "alternateName": "en" }
  ],
  "priceRange": "$$",
  "aggregateRating": getAggregateRatingSchema(),
  "review": getReviewsSchemaList(),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "TY Dev",
  "url": "https://ty-dev.site",
  "inLanguage": ["fr", "en"],
  "sameAs": [
    "https://ty-dev.fr",
    "https://ty-dev.tech"
  ]
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TY Dev — Agence SaaS, Applications Web & Agents IA | Devis Sous 24h" },
      {
        name: "description",
        content:
          "Création de plateformes SaaS sur-mesure, intégration d'agents IA et applications web haute performance. Audit d'architecture et devis gratuit sous 24h avec l'agence TY Dev.",
      },
      { name: "keywords", content: "agence saas france, agence web france, developpement saas sur mesure, agence ia, developpement react vite, developpeur saas, devis saas, ty-dev.fr, ty-dev.tech" },
      { name: "author", content: "TY Dev" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:site_name", content: "TY Dev" },
      { property: "og:title", content: "TY Dev — Agence SaaS, Applications Web & Agents IA | Devis Sous 24h" },
      {
        property: "og:description",
        content:
          "Plateformes SaaS sur-mesure, automatisations IA et applications web haute performance. Audit technique et devis sous 24h.",
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
      { name: "twitter:title", content: "TY Dev — Agence SaaS, Applications Web & Agents IA | Devis Sous 24h" },
      {
        name: "twitter:description",
        content:
          "Plateformes SaaS sur-mesure, automatisations IA et applications web haute performance. Audit technique et devis sous 24h.",
      },
      { name: "twitter:image", content: "https://ty-dev.site/logo.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://ty-dev.site" },
      { rel: "alternate", hrefLang: "fr", href: "https://ty-dev.fr" },
      { rel: "alternate", hrefLang: "en", href: "https://ty-dev.tech" },
      { rel: "alternate", hrefLang: "x-default", href: "https://ty-dev.site" },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "TY Dev Blog — Flux RSS",
        href: "https://ty-dev.site/rss.xml",
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48x48.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon-192x192.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preload", as: "style", href: appCss },
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
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var h=window.location.hostname.toLowerCase(),c=document.querySelector('link[rel="canonical"]');if(c){if(h.indexOf('ty-dev.fr')!==-1){c.setAttribute('href','https://ty-dev.fr'+window.location.pathname);}else if(h.indexOf('ty-dev.tech')!==-1){c.setAttribute('href','https://ty-dev.tech'+window.location.pathname);}}}catch(e){}})();`,
          }}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          media="print"
          // @ts-expect-error Permet l'activation asynchrone de la feuille de style sans bloquer le premier rendu HTML
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          />
        </noscript>
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
