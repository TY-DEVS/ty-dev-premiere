import { createFileRoute, notFound } from "@tanstack/react-router";
import { teamMembersData } from "@/data/teamData";
import { TeamMemberProfileView } from "@/components/site/TeamMemberProfile";
import { CtaStrip } from "@/components/site/CtaStrip";

export const Route = createFileRoute("/team_/$slug")({
  loader: ({ params }) => {
    const member = teamMembersData[params.slug];
    if (!member) {
      throw notFound();
    }
    return member;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};

    const fullName = `${loaderData.firstName} ${loaderData.lastName}`;
    const title = `${fullName} — ${loaderData.role.fr} | TY Dev`;
    const description = loaderData.tagline.fr;
    const imageUrl = `https://ty-dev.site${loaderData.image}`;
    const pageUrl = `https://ty-dev.site/team/${loaderData.slug}`;

    const sameAs = [loaderData.linkedin, loaderData.github].filter(Boolean);
    const allSkills = loaderData.skillCategories?.flatMap((sc) => sc.skills) || [];

    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${pageUrl}#person`,
      "name": fullName,
      "givenName": loaderData.firstName,
      "familyName": loaderData.lastName,
      "jobTitle": loaderData.role.fr,
      "description": loaderData.bio.fr,
      "image": imageUrl,
      "url": pageUrl,
      "sameAs": sameAs,
      "worksFor": {
        "@type": "Organization",
        "name": "TY Dev",
        "url": "https://ty-dev.site",
      },
      "knowsAbout": allSkills,
    };

    const profilePageSchema = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@id": `${pageUrl}#person`,
      },
      "name": title,
      "description": description,
      "url": pageUrl,
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
          "name": "À Propos",
          "item": "https://ty-dev.site/about",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": fullName,
          "item": pageUrl,
        },
      ],
    };

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: imageUrl },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: pageUrl },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: imageUrl },
      ],
      links: [{ rel: "canonical", href: pageUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(personSchema),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(profilePageSchema),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbSchema),
        },
      ],
    };
  },
  component: TeamMemberPage,
});

function TeamMemberPage() {
  const member = Route.useLoaderData();
  return (
    <>
      <TeamMemberProfileView member={member} />
      <CtaStrip />
    </>
  );
}
