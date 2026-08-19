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
