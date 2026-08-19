import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { TeamMemberProfile as MemberProfileType } from "@/data/teamData";
import { 
  Linkedin, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  ExternalLink, 
  ArrowLeft,
  User,
  CheckCircle2,
  Award,
  Quote,
  Globe
} from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface TeamMemberProfileProps {
  member: MemberProfileType;
}

export function TeamMemberProfileView({ member }: TeamMemberProfileProps) {
  const { lang } = useI18n();

  const isFr = lang === "fr";
  const roleText = isFr ? member.role.fr : member.role.en;
  const taglineText = isFr ? member.tagline.fr : member.tagline.en;
  const bioText = isFr ? member.bio.fr : member.bio.en;

  // Schema.org Person metadata
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: `${member.firstName} ${member.lastName}`,
    jobTitle: roleText,
    worksFor: {
      "@type": "Organization",
      name: "TY Dev",
      url: "https://ty-dev.site",
    },
    image: `https://ty-dev.site${member.image}`,
    sameAs: member.linkedin ? [member.linkedin] : [],
  };

  return (
    <div className="relative min-h-screen bg-background pt-28 pb-20 sm:pt-36 sm:pb-32 overflow-hidden">
      {/* Inject Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* Decorative Glow Backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container relative mx-auto px-4 md:px-6 z-10 max-w-6xl">
        {/* Back navigation link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            to="/about"
            hash="team"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-brand transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{isFr ? "Retour à l'équipe" : "Back to Team"}</span>
          </Link>
        </motion.div>

        {/* Profile Hero Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-6 sm:p-10 bg-surface/60 border border-border/60 backdrop-blur-xl shadow-2xl overflow-hidden mb-12"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
            {/* Profile Picture (Protected against save / copy / drag) */}
            <div className="relative shrink-0">
              <div 
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-brand/40 shadow-xl shadow-brand/10 bg-surface relative group select-none"
                onContextMenu={(e) => e.preventDefault()}
              >
                <img
                  src={member.image}
                  alt={`${member.firstName} ${member.lastName}`}
                  className={`w-full h-full object-cover select-none pointer-events-none ${member.imagePosition || "object-center"}`}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                {/* Transparent anti-copy overlay */}
                <div 
                  className="absolute inset-0 z-20 bg-transparent select-none" 
                  onContextMenu={(e) => e.preventDefault()} 
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
              <span className="absolute -bottom-2 -right-2 px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider bg-brand text-brand-foreground rounded-full shadow-lg z-30">
                {member.firstName === "Mohamed Yassine" ? "CEO & Dev" : "Team"}
              </span>
            </div>

            {/* Main Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold uppercase tracking-widest shadow-sm">
                    <User className="w-3.5 h-3.5" />
                    <span>{roleText}</span>
                  </div>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                  {member.firstName} <span className="text-brand">{member.lastName}</span>
                </h1>
                {member.location && (
                  <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-muted-foreground mt-2 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-brand" />
                    <span>{member.location}</span>
                  </div>
                )}
              </div>

              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
                {taglineText}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center md:justify-start gap-3 pt-2 w-full">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0A66C2] text-white text-sm font-medium hover:bg-[#0A66C2]/90 transition-all shadow-md hover:shadow-lg w-full sm:w-auto"
                  >
                    <Linkedin className="w-4 h-4 fill-current stroke-none" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#24292e] hover:bg-[#1b1f23] text-white text-sm font-medium transition-all shadow-md hover:shadow-lg border border-slate-700/80 hover:border-slate-500 w-full sm:w-auto group"
                  >
                    <GithubIcon className="w-4 h-4 fill-current" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(member.email)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border/80 text-foreground text-sm font-medium hover:bg-surface-hover hover:border-brand/50 transition-all shadow-sm w-full sm:w-auto"
                  >
                    <Mail className="w-4 h-4 text-brand" />
                    <span>{isFr ? "Envoyer un email (Gmail)" : "Send Email (Gmail)"}</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                )}
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand text-brand-foreground text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-brand/20 w-full sm:w-auto"
                >
                  <span>{isFr ? "Lancer un projet avec TY Dev" : "Start a Project with TY Dev"}</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio Section */}
        {bioText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-5 sm:p-8 bg-surface/40 border border-border/50 mb-8 sm:mb-12 backdrop-blur-sm"
          >
            <h2 className="font-display text-lg sm:text-xl font-bold mb-3 flex items-center gap-2 text-foreground">
              <User className="w-5 h-5 text-brand" />
              <span>{isFr ? "À propos" : "About"}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
              {bioText}
            </p>
          </motion.div>
        )}

        {/* Quote / Philosophy Section */}
        {member.quote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-brand/10 via-surface/50 to-surface/30 border border-brand/20 mb-8 sm:mb-12 relative overflow-hidden shadow-sm"
          >
            <div className="flex items-start gap-3.5">
              <Quote className="w-7 h-7 text-brand shrink-0 opacity-80 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand block mb-1">
                  {isFr ? "Philosophie & Vision" : "Work Philosophy"}
                </span>
                <p className="text-foreground italic text-sm sm:text-base font-display font-medium leading-relaxed">
                  "{isFr ? member.quote.fr : member.quote.en}"
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column: Experience & Education */}
          <div className="lg:col-span-2 space-y-10 sm:space-y-12">
            {/* Professional Experience */}
            {member.experiences.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-brand/10 text-brand">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold">
                      {isFr ? "Expérience Professionnelle" : "Professional Experience"}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {isFr ? "Parcours et réalisations clés" : "Key roles and milestones"}
                    </p>
                  </div>
                </div>

                <div className="relative border-l-2 border-border/60 ml-3 sm:ml-4 pl-5 sm:pl-8 space-y-6 sm:space-y-8">
                  {member.experiences.map((exp, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline Node dot */}
                      <span className="absolute -left-[27px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-brand bg-background group-hover:bg-brand transition-colors" />

                      <div className="bg-surface/50 border border-border/50 rounded-2xl p-5 sm:p-6 hover:border-brand/30 transition-all duration-300">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-brand/10 text-brand text-xs font-mono font-semibold">
                            {exp.period}
                          </span>
                          {exp.location && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {exp.location}
                            </span>
                          )}
                        </div>

                        <h3 className="font-display text-lg font-bold text-foreground">
                          {isFr ? exp.role.fr : exp.role.en}
                        </h3>
                        <p className="text-sm font-medium text-brand mb-3">
                          {exp.company}
                        </p>

                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {isFr ? exp.description.fr : exp.description.en}
                        </p>

                        {/* Technologies badges */}
                        {exp.technologies && exp.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                            {exp.technologies.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 rounded-lg bg-surface text-foreground/80 border border-border/60 text-[11px] font-mono"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* References */}
                        {exp.references && exp.references.length > 0 && (
                          <div className="mt-3 text-xs flex flex-wrap items-center gap-2 text-muted-foreground">
                            <span className="font-semibold text-foreground/80">
                              {isFr ? "Projets / Références :" : "References:"}
                            </span>
                            {exp.references.map((ref, rIdx) => (
                              <a
                                key={rIdx}
                                href={`https://${ref}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-brand hover:underline font-mono"
                              >
                                {ref}
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Education */}
            {member.education.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold">
                        {isFr ? "Éducation & Diplômes" : "Education & Degrees"}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        {isFr ? "Parcours académique et diplômes d'État" : "Academic background & certifications"}
                      </p>
                    </div>
                  </div>
                  {member.educationLevel && (
                    <span className="px-3 py-1 rounded-xl bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-mono font-bold">
                      {isFr ? member.educationLevel.fr : member.educationLevel.en}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {member.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-surface/40 border border-border/50 hover:border-blue-400/30 transition-all"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-mono font-semibold text-blue-400">
                          {edu.period}
                        </span>
                        <h3 className="font-display text-base font-bold text-foreground">
                          {isFr ? edu.degree.fr : edu.degree.en}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {edu.institution} {edu.location && `• ${edu.location}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Certifications */}
            {member.certifications && member.certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-brand/10 text-brand">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold">
                      {isFr ? "Certifications Professionnelles" : "Professional Certifications"}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {isFr ? "Accréditations officielles et certifications d'expertise" : "Official credentials & certifications"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {member.certifications.map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-surface/50 border border-brand/30 hover:border-brand transition-all shadow-sm"
                    >
                      <div className="space-y-1">
                        <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                          <Award className="w-4 h-4 text-brand shrink-0" />
                          <span>{cert.title}</span>
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {cert.issuer} {cert.id && `• ID: ${cert.id}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar Column: Skills & Info */}
          <div className="space-y-8">
            {/* Skills */}
            {member.skillCategories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl p-6 bg-surface/50 border border-border/50 backdrop-blur-md"
              >
                <div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-4">
                  <Code2 className="w-5 h-5 text-brand" />
                  <h2 className="font-display text-xl font-bold">
                    {isFr ? "Compétences" : "Technical Skills"}
                  </h2>
                </div>

                <div className="space-y-6">
                  {member.skillCategories.map((cat, idx) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {isFr ? cat.category.fr : cat.category.en}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-surface border border-border/70 text-xs font-medium text-foreground hover:border-brand/40 transition-colors"
                          >
                            <CheckCircle2 className="w-3 h-3 text-brand" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Languages Spoken */}
            {member.languages && member.languages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl p-6 bg-surface/50 border border-border/50 backdrop-blur-md"
              >
                <div className="flex items-center gap-2 mb-4 border-b border-border/50 pb-3">
                  <Globe className="w-5 h-5 text-brand" />
                  <h2 className="font-display text-xl font-bold">
                    {isFr ? "Langues Parlées" : "Languages"}
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {member.languages.map((langItem, lIdx) => (
                    <span
                      key={lIdx}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-surface border border-border/70 text-xs font-medium text-foreground hover:border-brand/40 transition-colors shadow-sm"
                    >
                      <span className="w-2 h-2 rounded-full bg-brand" />
                      <span>{langItem}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quick Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-6 bg-gradient-to-br from-brand/10 via-surface/60 to-surface/80 border border-brand/20 text-center space-y-4"
            >
              <h3 className="font-display text-lg font-bold">
                {isFr ? "Un projet en tête ?" : "Have a project in mind?"}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isFr
                  ? "Collaborons pour concevoir la solution idéale pour votre entreprise."
                  : "Let's collaborate to build the ideal solution for your business."}
              </p>
              <Link
                to="/contact"
                className="inline-block w-full py-2.5 px-4 rounded-xl bg-brand text-brand-foreground font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-md"
              >
                {isFr ? "Discuter avec l'équipe" : "Get in Touch"}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
