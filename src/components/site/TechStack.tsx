import { useI18n } from "@/i18n/context";
import { Section, SectionHeader } from "./Services";

const stack = [
  "React", "Next.js", "Node.js", "TypeScript", "Python", "Supabase",
  "PostgreSQL", "MongoDB", "AWS", "Docker", "Stripe", "OpenAI",
  "Tailwind CSS", "GraphQL", "Redis", "Vercel", "Firebase",
];

export function TechStack() {
  const { t } = useI18n();
  const doubled = [...stack, ...stack];
  return (
    <Section className="overflow-hidden">
      <SectionHeader title={t.tech.title} subtitle={t.tech.subtitle} />
      <div className="relative mt-14 -mx-6 lg:-mx-10">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex gap-4 animate-marquee w-max">
          {doubled.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface/40 border border-border backdrop-blur-sm whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              <span className="font-mono text-sm text-foreground">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
