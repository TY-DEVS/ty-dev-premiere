import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/context";
import { Linkedin, User, ArrowRight } from "lucide-react";

export function Team() {
  const { t, lang } = useI18n();

  return (
    <section id="team" className="relative w-full py-24 sm:py-32 overflow-hidden bg-background">
      {/* Background elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {t.team.title}
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto">
              {t.team.subtitle}
            </p>
          </motion.div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {(t.team.members as any[]).map((member, i) => {
            const memberSlug = member.slug || member.firstName.toLowerCase().replace(/\s+/g, "-");
            return (
              <motion.div
                key={member.firstName + member.lastName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col items-center text-center p-4 sm:p-8 w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.35rem)] rounded-[20px] sm:rounded-[32px] bg-surface/50 border border-border/50 hover:bg-surface hover:border-brand/40 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Avatar / Photo Container */}
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full mb-4 sm:mb-6 bg-gradient-to-br from-[oklch(0.12_0.02_260)] to-[oklch(0.08_0.02_260)] border border-border/80 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-500">
                  <Link
                    to="/team/$slug"
                    params={{ slug: memberSlug }}
                    className="w-full h-full rounded-full overflow-hidden block relative select-none"
                    aria-label={`Profil de ${member.firstName} ${member.lastName}`}
                  >
                    {member.image ? (
                      <>
                        <img
                          src={member.image}
                          alt={member.firstName}
                          className={`w-full h-full object-cover transition-all duration-700 opacity-90 group-hover:opacity-100 select-none pointer-events-none ${member.imagePosition || "object-center"}`}
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                          onDragStart={(e) => e.preventDefault()}
                        />
                        {/* Protection overlay against right-click save / drag */}
                        <div 
                          className="absolute inset-0 z-10 bg-transparent select-none" 
                          onContextMenu={(e) => e.preventDefault()} 
                          onDragStart={(e) => e.preventDefault()} 
                        />
                      </>
                    ) : (
                      <span className="w-full h-full flex items-center justify-center font-display text-2xl sm:text-4xl font-bold text-foreground/80 tracking-tighter">
                        {(member.firstName[0] + member.lastName[0]).toUpperCase()}
                      </span>
                    )}
                  </Link>

                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-xl border-[3px] sm:border-4 border-background hover:scale-110 hover:shadow-[#0A66C2]/30 hover:shadow-2xl transition-all duration-300 z-10"
                      aria-label={`LinkedIn de ${member.firstName}`}
                    >
                      <Linkedin size={14} fill="currentColor" className="stroke-none sm:w-[18px] sm:h-[18px]" />
                    </a>
                  )}
                </div>

                {/* Member Info & Name Link */}
                <Link
                  to="/team/$slug"
                  params={{ slug: memberSlug }}
                  className="flex flex-col items-center w-full text-inherit no-underline"
                >
                  <h3 className="font-display text-[15px] sm:text-2xl font-semibold mb-1 sm:mb-2 group-hover:text-brand transition-colors leading-tight">
                    <span className="block">{member.firstName}</span>
                    <span className="block text-foreground/80">{member.lastName}</span>
                  </h3>
                  <p className="text-[9px] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest leading-relaxed mt-1 sm:mt-2 mb-4">
                    {member.role}
                  </p>

                  {/* Profile link button */}
                  <div className="mt-auto pt-2 inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-brand group-hover:translate-x-0.5 transition-all">
                    <span>{lang === "fr" ? "Voir le profil" : "View Profile"}</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

