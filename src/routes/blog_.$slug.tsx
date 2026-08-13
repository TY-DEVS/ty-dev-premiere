import { createFileRoute, notFound } from "@tanstack/react-router";
import { getDynamicBlogPosts } from "@/data/blogPosts";
import { BlogArticleDetail } from "@/components/site/BlogArticleDetail";
import { CtaStrip } from "@/components/site/CtaStrip";

export const Route = createFileRoute("/blog_/$slug")({
  loader: ({ params }) => {
    const post = getDynamicBlogPosts().find((p) => p.slug === params.slug);
    if (!post) {
      throw notFound();
    }
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": loaderData.title.fr,
      "description": loaderData.summary.fr,
      "image": [loaderData.image],
      "author": {
        "@type": "Person",
        "name": loaderData.author.name,
        "jobTitle": loaderData.author.role,
      },
      "publisher": {
        "@type": "Organization",
        "name": "TY Dev",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ty-dev.site/logo.jpg",
        },
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://ty-dev.site/blog/${loaderData.slug}`,
      },
    };

    return {
      meta: [
        { title: `${loaderData.title.fr} — TY Dev Blog` },
        { name: "description", content: loaderData.summary.fr },
        { name: "keywords", content: (loaderData.tags || []).join(", ") },
        { property: "og:title", content: loaderData.title.fr },
        { property: "og:description", content: loaderData.summary.fr },
        { property: "og:image", content: loaderData.image },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://ty-dev.site/blog/${loaderData.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: loaderData.title.fr },
        { name: "twitter:description", content: loaderData.summary.fr },
        { name: "twitter:image", content: loaderData.image },
      ],
      links: [{ rel: "canonical", href: `https://ty-dev.site/blog/${loaderData.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(articleSchema),
        },
      ],
    };
  },
  component: BlogArticlePage,
});

function BlogArticlePage() {
  const post = Route.useLoaderData();
  return (
    <>
      <BlogArticleDetail post={post} />
      <CtaStrip />
    </>
  );
}
