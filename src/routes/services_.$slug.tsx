import { createFileRoute, notFound } from "@tanstack/react-router";
import { getServiceBySlug } from "@/data/servicesData";
import { ServiceDetail } from "@/components/site/ServiceDetail";
import { CtaStrip } from "@/components/site/CtaStrip";

export const Route = createFileRoute("/services_/$slug")({
  loader: ({ params }) => {
    const service = getServiceBySlug(params.slug);
    if (!service) {
      throw notFound();
    }
    return service;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": loaderData.title.fr,
      "serviceType": loaderData.title.fr,
      "provider": {
        "@type": "Organization",
        "name": "TY Dev",
        "url": "https://ty-dev.site",
        "logo": "https://ty-dev.site/logo.jpg",
      },
      "description": loaderData.subtitle.fr,
      "areaServed": [
        { "@type": "Continent", "name": "Europe" },
        { "@type": "Continent", "name": "North America" },
        { "@type": "Continent", "name": "Asia" },
        { "@type": "Country", "name": "Worldwide" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": loaderData.title.fr,
        "itemListElement": loaderData.deliverables.map((d, i) => ({
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": d.fr,
          },
          "position": i + 1,
        })),
      },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://ty-dev.site",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://ty-dev.site/services",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": loaderData.title.fr,
          "item": `https://ty-dev.site/services/${loaderData.slug}`,
        },
      ],
    };

    const faqSchema =
      loaderData.faq && loaderData.faq.length > 0
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": loaderData.faq.map((item) => ({
              "@type": "Question",
              "name": item.question.fr,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer.fr,
              },
            })),
          }
        : null;

    const scripts: Array<{ type: string; children: string }> = [
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(breadcrumbSchema),
      },
    ];

    if (faqSchema) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify(faqSchema),
      });
    }

    return {
      meta: [
        { title: `${loaderData.title.fr} — Services TY Dev` },
        { name: "description", content: loaderData.subtitle.fr },
        { name: "keywords", content: `${loaderData.techStack.join(", ")}, ty-dev.site, ty-dev.fr, ty-dev.tech` },
        { property: "og:title", content: `${loaderData.title.fr} — TY Dev` },
        { property: "og:description", content: loaderData.subtitle.fr },
        { property: "og:image", content: "https://ty-dev.site/logo.jpg" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `https://ty-dev.site/services/${loaderData.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: `${loaderData.title.fr} — TY Dev` },
        { name: "twitter:description", content: loaderData.subtitle.fr },
        { name: "twitter:image", content: "https://ty-dev.site/logo.jpg" },
      ],
      links: [{ rel: "canonical", href: `https://ty-dev.site/services/${loaderData.slug}` }],
      scripts,
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const service = Route.useLoaderData();
  return (
    <>
      <ServiceDetail service={service} />
      <CtaStrip />
    </>
  );
}
