import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllBlogPosts, getBlogPost } from "@/lib/keystatic";
import { BlogArticleDetail } from "@/components/site/BlogArticleDetail";
import { CtaStrip } from "@/components/site/CtaStrip";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  const publishDate = post.date.iso || post.date.fr;
  const title = `${post.title.fr} — TY Dev Blog`;
  const description = post.summary.fr;
  const url = `https://ty-dev.site/blog/${post.slug}`;

  return {
    title,
    description,
    keywords: post.tags || [],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title.fr,
      description,
      images: [{ url: post.image }],
      type: "article",
      url,
      publishedTime: publishDate,
      modifiedTime: publishDate,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.fr,
      description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const publishDate = post.date.iso || post.date.fr;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.fr,
    description: post.summary.fr,
    image: [post.image],
    datePublished: publishDate,
    dateModified: publishDate,
    articleSection: post.category,
    keywords: (post.tags || []).join(", "),
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: `https://ty-dev.site/team/${post.author.slug || "yassine-ben-yaala"}`,
    },
    publisher: {
      "@type": "Organization",
      name: "TY Dev",
      logo: {
        "@type": "ImageObject",
        url: "https://ty-dev.site/logo.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://ty-dev.site/blog/${post.slug}`,
    },
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
        name: "Blog",
        item: "https://ty-dev.site/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title.fr,
        item: `https://ty-dev.site/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogArticleDetail post={post} />
      <CtaStrip />
    </>
  );
}
