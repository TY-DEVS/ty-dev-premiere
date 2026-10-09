import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Blog } from "@/components/site/Blog";
import { CtaStrip } from "@/components/site/CtaStrip";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog Tech, IA & Architecture SaaS 2026 — Guides & Retours d'Expérience | TY Dev" },
      {
        name: "description",
        content:
          "Guides approfondis d'architecture logicielle, développement SaaS moderne, intégration d'agents IA, optimisation Web Vitals et Cloud DevOps par les ingénieurs TY Dev.",
      },
      {
        name: "keywords",
        content:
          "blog tech 2026, architecture saas, agent ia tutoriel, react vite optimisation, seo technique, agence dev web, ty-dev.fr, ty-dev.tech",
      },
      { property: "og:title", content: "Blog Tech, IA & Architecture SaaS 2026 — Guides & Retours d'Expérience | TY Dev" },
      {
        property: "og:description",
        content:
          "Guides approfondis d'architecture logicielle, développement SaaS moderne, intégration d'agents IA, optimisation Web Vitals et Cloud DevOps par les ingénieurs TY Dev.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ty-dev.site/blog" },
      { property: "og:image", content: "https://ty-dev.site/logo.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Blog Tech, IA & Architecture SaaS 2026 — Guides & Retours d'Expérience | TY Dev" },
      {
        name: "twitter:description",
        content:
          "Guides approfondis d'architecture logicielle, développement SaaS moderne, intégration d'agents IA, optimisation Web Vitals et Cloud DevOps par les ingénieurs TY Dev.",
      },
      { name: "twitter:image", content: "https://ty-dev.site/logo.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://ty-dev.site/blog" }],
  }),
  component: BlogListPage,
});

function BlogListPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow="// 06 — BLOG & TECH INSIGHTS"
        crumb={(t.nav as any).blog || "Blog"}
        title={lang === "fr" ? "Expertise technique &" : "Technical expertise &"}
        accent={lang === "fr" ? "analyses d'ingénierie." : "engineering insights."}
        subtitle={
          lang === "fr"
            ? "Découvrez nos guides, retours d'expérience et meilleures pratiques pour concevoir des applications web & SaaS haute performance."
            : "Explore our in-depth guides, architectural benchmarks, and best practices for high-performance SaaS applications."
        }
      />
      <Blog isPage={true} />
      <CtaStrip />
    </>
  );
}
