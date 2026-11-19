import type { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import "../styles.css";
import { Providers } from "./providers";
import { getAggregateRatingSchema, getReviewsSchemaList } from "@/data/reviewsData";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ty-dev.site"),
  title: {
    default: "TY Dev — Agence SaaS, Applications Web & Agents IA | Devis Sous 24h",
    template: "%s | TY Dev",
  },
  description:
    "Création de plateformes SaaS sur-mesure, intégration d'agents IA et applications web haute performance. Audit d'architecture et devis gratuit sous 24h avec l'agence TY Dev.",
  keywords: [
    "agence saas france",
    "agence web france",
    "developpement saas sur mesure",
    "agence ia",
    "developpement react vite",
    "developpeur saas",
    "devis saas",
    "ty-dev.fr",
    "ty-dev.tech",
  ],
  authors: [{ name: "TY Dev", url: "https://ty-dev.site" }],
  creator: "TY Dev",
  publisher: "TY Dev",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://ty-dev.site",
    languages: {
      fr: "https://ty-dev.fr",
      en: "https://ty-dev.tech",
      "x-default": "https://ty-dev.site",
    },
    types: {
      "application/rss+xml": "https://ty-dev.site/feed.xml",
    },
  },
  openGraph: {
    siteName: "TY Dev",
    title: "TY Dev — Agence SaaS, Applications Web & Agents IA | Devis Sous 24h",
    description:
      "Plateformes SaaS sur-mesure, automatisations IA et applications web haute performance. Audit technique et devis sous 24h.",
    url: "https://ty-dev.site",
    images: [{ url: "/logo.jpg", width: 1200, height: 630, alt: "TY Dev" }],
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US", "en_GB"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TY Dev — Agence SaaS, Applications Web & Agents IA | Devis Sous 24h",
    description:
      "Plateformes SaaS sur-mesure, automatisations IA et applications web haute performance. Audit technique et devis sous 24h.",
    images: ["/logo.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "TY Dev",
  legalName: "TY Dev LLC",
  alternateName: "TY-DEV International AI & Software Agency",
  url: "https://ty-dev.site",
  logo: "https://ty-dev.site/logo.jpg",
  image: "https://ty-dev.site/logo.jpg",
  description:
    "TY Dev conçoit et développe des applications web sur-mesure, plateformes SaaS, automatisations IA et architectures Cloud haute performance pour clients internationaux.",
  email: "contact@ty-dev.site",
  telephone: "+33 7 59 44 01 05",
  address: {
    "@type": "PostalAddress",
    streetAddress: "75 E 3rd St",
    addressLocality: "Sheridan",
    addressRegion: "WY",
    postalCode: "82801",
    addressCountry: "US",
  },
  sameAs: [
    "https://ty-dev.fr",
    "https://ty-dev.tech",
    "https://www.linkedin.com/company/ty-devs/",
    "https://www.instagram.com/tydev__/",
    "https://x.com/tydev__",
  ],
  knowsAbout: [
    "Artificial Intelligence Agents",
    "SaaS Development",
    "Web Performance & Core Web Vitals",
    "React & Next.js Architecture",
    "Cloud DevOps & Infrastructure",
  ],
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Tunisia" },
    { "@type": "Country", name: "Belgium" },
    { "@type": "Country", name: "Switzerland" },
    { "@type": "Country", name: "United States" },
    { "@type": "Continent", name: "Europe" },
    { "@type": "Continent", name: "North America" },
    { "@type": "Country", name: "Worldwide" },
  ],
  currenciesAccepted: "EUR, USD, TND",
  paymentAccepted: "Credit Card, Stripe, Bank Transfer, Wire Transfer",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  availableLanguage: [
    { "@type": "Language", name: "French", alternateName: "fr" },
    { "@type": "Language", name: "English", alternateName: "en" },
  ],
  priceRange: "$$",
  aggregateRating: getAggregateRatingSchema(),
  review: getReviewsSchemaList(),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TY Dev",
  url: "https://ty-dev.site",
  inLanguage: ["fr", "en"],
  sameAs: ["https://ty-dev.fr", "https://ty-dev.tech"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var h=window.location.hostname.toLowerCase(),c=document.querySelector('link[rel="canonical"]');if(c){if(h.indexOf('ty-dev.fr')!==-1){c.setAttribute('href','https://ty-dev.fr'+window.location.pathname);}else if(h.indexOf('ty-dev.tech')!==-1){c.setAttribute('href','https://ty-dev.tech'+window.location.pathname);}}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
