import { createFileRoute, notFound } from "@tanstack/react-router";
import { blogPosts } from "@/data/blogPosts";
import { BlogArticleDetail } from "@/components/site/BlogArticleDetail";
import { CtaStrip } from "@/components/site/CtaStrip";

export const Route = createFileRoute("/blog_/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) {
      throw notFound();
    }
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    return {
      meta: [
        { title: `${loaderData.title.fr} — TY Dev Blog` },
        { name: "description", content: loaderData.summary.fr },
        { property: "og:title", content: loaderData.title.fr },
        { property: "og:description", content: loaderData.summary.fr },
        { property: "og:image", content: loaderData.image },
        { property: "og:type", content: "article" },
      ],
      links: [{ rel: "canonical", href: `/blog/${loaderData.slug}` }],
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
