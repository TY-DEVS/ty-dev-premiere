import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { Blog } from "@/components/site/Blog";
import { CtaStrip } from "@/components/site/CtaStrip";
import { useI18n } from "@/i18n/context";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & Engineering Insights — TY Dev | Agence Web & SaaS" },
      {
        name: "description",
        content:
          "Analyses techniques, guides d'architecture logicielle, optimisation SEO, design systems et cybersécurité publiés par l'équipe d'ingénieurs TY Dev.",
      },
      {
        name: "keywords",
        content:
          "blog tech, architecture logicielle, SEO web vitals, design systems, cybersécurité SaaS, agence web TY Dev, microservices, serverless",
      },
      { property: "og:title", content: "Blog & Engineering Insights — TY Dev | Agence Web & SaaS" },
      {
        property: "og:description",
        content:
          "Analyses techniques, guides d'architecture logicielle, optimisation SEO, design systems et cybersécurité publiés par l'équipe d'ingénieurs TY Dev.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogListPage,
});

function BlogListPage() {
  const { t, lang } = useI18n();
  return (
    <>
      <PageHeader
        eyebrow="// 05 — BLOG & TECH INSIGHTS"
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
