import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { servicesData, getServiceBySlug } from "@/data/servicesData";
import { ServiceDetail } from "@/components/site/ServiceDetail";
import { CtaStrip } from "@/components/site/CtaStrip";
import { getAggregateRatingSchema } from "@/data/reviewsData";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = `${service.title.fr} — Services Ingénierie TY Dev`;
  const description = service.subtitle.fr;
  const url = `https://ty-dev.site/services/${service.slug}`;

  return {
    title,
    description,
    keywords: [
      service.title.fr,
      "services dev web",
      "saas sur mesure",
      "ty dev",
      "architecture logicielle",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: "/logo.jpg" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.jpg"],
    },
  };
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title.fr,
    serviceType: service.title.fr,
    provider: {
      "@type": "Organization",
      name: "TY Dev",
      url: "https://ty-dev.site",
      logo: "https://ty-dev.site/logo.jpg",
    },
    description: service.subtitle.fr,
    areaServed: [
      { "@type": "Continent", name: "Europe" },
      { "@type": "Continent", name: "North America" },
      { "@type": "Continent", name: "Asia" },
      { "@type": "Country", name: "Worldwide" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title.fr,
      itemListElement: service.deliverables.map((d, i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: d.fr,
        },
        position: i + 1,
      })),
    },
    aggregateRating: getAggregateRatingSchema(),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://ty-dev.site",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://ty-dev.site/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title.fr,
        item: `https://ty-dev.site/services/${service.slug}`,
      },
    ],
  };

  const faqSchema =
    service.faq && service.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faq.map((item) => ({
            "@type": "Question",
            name: item.question.fr,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer.fr,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ServiceDetail service={service} />
      <CtaStrip />
    </>
  );
}
