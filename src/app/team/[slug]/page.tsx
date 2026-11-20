import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { teamMembersData } from "@/data/teamData";
import { TeamMemberProfileView } from "@/components/site/TeamMemberProfile";
import { CtaStrip } from "@/components/site/CtaStrip";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(teamMembersData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMembersData[slug];
  if (!member) return {};

  const fullName = `${member.firstName} ${member.lastName}`;
  const title = `${fullName} — ${member.role.fr} | TY Dev`;
  const description = member.tagline.fr;
  const imageUrl = `https://ty-dev.site${member.image}`;
  const pageUrl = `https://ty-dev.site/team/${member.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl }],
      type: "profile",
      url: pageUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function TeamMemberPage({ params }: Props) {
  const { slug } = await params;
  const member = teamMembersData[slug];

  if (!member) {
    notFound();
  }

  const fullName = `${member.firstName} ${member.lastName}`;
  const title = `${fullName} — ${member.role.fr} | TY Dev`;
  const description = member.tagline.fr;
  const imageUrl = `https://ty-dev.site${member.image}`;
  const pageUrl = `https://ty-dev.site/team/${member.slug}`;

  const sameAs = [member.linkedin, member.github].filter(Boolean);
  const allSkills = member.skillCategories?.flatMap((sc) => sc.skills) || [];

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${pageUrl}#person`,
    name: fullName,
    givenName: member.firstName,
    familyName: member.lastName,
    jobTitle: member.role.fr,
    description: member.bio.fr,
    image: imageUrl,
    url: pageUrl,
    sameAs: sameAs,
    worksFor: {
      "@type": "Organization",
      name: "TY Dev",
      url: "https://ty-dev.site",
    },
    knowsAbout: allSkills,
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@id": `${pageUrl}#person`,
    },
    name: title,
    description: description,
    url: pageUrl,
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
        name: "À Propos",
        item: "https://ty-dev.site/about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: fullName,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TeamMemberProfileView member={member} />
      <CtaStrip />
    </>
  );
}
