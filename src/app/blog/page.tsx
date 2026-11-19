import type { Metadata } from "next";
import { BlogContent } from "./BlogContent";
import { getAllBlogPosts } from "@/lib/keystatic";

const blogBreadcrumbSchema = {
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
      name: "Blog & Guides Tech",
      item: "https://ty-dev.site/blog",
    },
  ],
};

export const metadata: Metadata = {
  title: "Blog Tech, IA & Architecture SaaS 2026 — Guides & Retours d'Expérience | TY Dev",
  description:
    "Guides approfondis d'architecture logicielle, développement SaaS moderne, intégration d'agents IA, optimisation Web Vitals et Cloud DevOps par les ingénieurs TY Dev.",
  keywords: [
    "blog tech 2026",
    "architecture saas",
    "agent ia tutoriel",
    "react vite optimisation",
    "seo technique",
    "agence dev web",
    "ty-dev.fr",
    "ty-dev.tech",
  ],
  alternates: {
    canonical: "https://ty-dev.site/blog",
  },
  openGraph: {
    title: "Blog Tech, IA & Architecture SaaS 2026 — Guides & Retours d'Expérience | TY Dev",
    description:
      "Guides approfondis d'architecture logicielle, développement SaaS moderne, intégration d'agents IA, optimisation Web Vitals et Cloud DevOps par les ingénieurs TY Dev.",
    url: "https://ty-dev.site/blog",
    images: [{ url: "/logo.jpg" }],
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogBreadcrumbSchema) }}
      />
      <BlogContent posts={posts} />
    </>
  );
}
