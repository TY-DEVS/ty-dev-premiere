'use client';

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Clock,
  ShieldCheck,
  Calculator,
  MessageCircle,
  Send,
  Zap,
  Check,
  RotateCcw,
  ChevronDown,
  Loader2,
  FileText,
  User,
  Mail,
  Phone,
  MessageSquare,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/i18n/context";
import { useTenant } from "@/context/tenantContext";
import { sendContactEmailAction } from "@/actions/contact";
import { GoogleReCaptcha } from "./GoogleReCaptcha";
import {
  projectTypes,
  pageTiers,
  simulatorFaq,
} from "@/config/simulatorData";
import { calculateSimulatorEstimate } from "@/lib/simulatorCalc";

export function Simulator() {
  const { tenant } = useTenant();
  const { lang } = useI18n();

  // Référence pour remonter automatiquement en haut du formulaire à chaque changement d'étape
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Wizard State - démarre par défaut sur 1 Page (dès 320 €)
  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<string>("site-vitrine");
  const [selectedPageTier, setSelectedPageTier] = useState<string>("1-page");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedSpeed, setSelectedSpeed] = useState<string>("standard");

  // Fonction pour changer d'étape et remonter immédiatement en haut de page
  const changeStep = (newStep: number) => {
    setStep(newStep);
    setTimeout(() => {
      scrollToTop();
    }, 50);
  };

  useEffect(() => {
    scrollToTop();
  }, [step]);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submittedProposal, setSubmittedProposal] = useState<{
    name: string;
    email: string;
    phone: string;
    budget: string;
    projectTitle: string;
  } | null>(null);

  const {
    currentType,
    currentPageTier,
    currentSpeed,
    activeModulesPool,
    activeSpeedOptions,
    isWebsite,
    isLargeProject,
    isCustomDiscovery,
    estimatedMin,
    estimatedMax,
    estimatedWeeks,
    budgetFormatted,
  } = calculateSimulatorEstimate({
    selectedType,
    selectedPageTier,
    selectedModules,
    selectedSpeed,
    lang,
    tenant,
  });

  // When project type changes, reset modules appropriately
  const handleTypeChange = (typeId: string) => {
    setSelectedType(typeId);
    if (typeId === "site-vitrine") {
      setSelectedPageTier("1-page");
      setSelectedModules([]);
      setSelectedSpeed("standard");
    } else {
      setSelectedModules([]);
      setSelectedSpeed("standard");
    }
  };

  const toggleModule = (id: string) => {
    if (selectedModules.includes(id)) {
      setSelectedModules(selectedModules.filter((m) => m !== id));
    } else {
      setSelectedModules([...selectedModules, id]);
    }
  };

  const handleReset = () => {
    setSelectedType("site-vitrine");
    setSelectedPageTier("1-page");
    setSelectedModules([]);
    setSelectedSpeed("standard");
    setSubmittedProposal(null);
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    changeStep(1);
  };

  // WhatsApp Pre-filled Brief generator
  const selectedModuleNames = selectedModules
    .map((id) => activeModulesPool.find((m) => m.id === id)?.name[lang])
    .filter(Boolean)
    .join(", ");

  const whatsappMessage =
    lang === "fr"
      ? `Bonjour TY Dev, j'ai simulé mon projet sur votre calculateur :
• Type de projet : ${currentType.title.fr}
${isWebsite ? `• Nombre de pages : ${currentPageTier.name.fr}\n` : ""}• Modules choisis (${selectedModules.length}) : ${selectedModuleNames || "Configuration standard"}
• Cadence souhaitée : ${currentSpeed.title.fr} (${estimatedWeeks})
• Estimation : ${budgetFormatted}
J'aimerais échanger avec vous pour obtenir un cadrage technique et un devis précis.`
      : `Hello TY Dev, I calculated my project estimate on your simulator:
• Project type: ${currentType.title.en}
${isWebsite ? `• Page count: ${currentPageTier.name.en}\n` : ""}• Selected features (${selectedModules.length}): ${selectedModuleNames || "Standard setup"}
• Delivery schedule: ${currentSpeed.title.en} (${estimatedWeeks})
• Estimate: ${budgetFormatted}
I would like to discuss this project with your engineers.`;

  const whatsappUrl = `https://wa.me/33759440105?text=${encodeURIComponent(whatsappMessage)}`;

  // Form Submit Handler
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!name.trim()) {
      toast.error(lang === "fr" ? "Veuillez renseigner votre nom et prénom." : "Please enter your name.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      toast.error(lang === "fr" ? "Veuillez saisir une adresse e-mail valide." : "Please provide a valid email address.");
      return;
    }

    if (!phone.trim()) {
      toast.error(lang === "fr" ? "Veuillez renseigner votre numéro de téléphone." : "Please provide your phone number.");
      return;
    }

    if (!recaptchaToken.trim()) {
      toast.error(
        lang === "fr"
          ? "Veuillez cocher la case Google 'Je ne suis pas un robot'."
          : "Please check the Google 'I'm not a robot' box."
      );
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading(lang === "fr" ? "Transmission de votre proposition..." : "Submitting your proposal...");

    try {
      const fullDescription = `
RÉCAPITULATIF DU SIMULATEUR DEVIS TY DEV :
=======================================
- Type de projet : ${currentType.title.fr} (${currentType.title.en})
${isWebsite ? `- Nombre de pages : ${currentPageTier.name.fr}\n` : ""}- Modules sélectionnés (${selectedModules.length}) :
${selectedModules.length > 0 ? selectedModules.map((id) => "  • " + activeModulesPool.find((m) => m.id === id)?.name.fr).join("\n") : "  • Configuration standard"}
- Cadence / Délai souhaité : ${currentSpeed.title.fr} (${estimatedWeeks})
- Estimation budgétaire : ${budgetFormatted}

Précisions du client :
${notes.trim() || "Aucune note additionnelle."}
      `.trim();

      const origin = typeof window !== "undefined" ? window.location.origin : "https://ty-dev.site";

      await sendContactEmailAction({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        type: `[SIMULATEUR] ${currentType.title.fr}`,
        budget: budgetFormatted,
        desc: fullDescription,
        source: `${origin}/simulateur`,
        recaptchaToken,
      });

      toast.success(
        lang === "fr"
          ? "Demande envoyée avec succès ! Notre équipe d'ingénieurs vous répond sous 24h."
          : "Estimate successfully submitted! Our engineering team will follow up within 24h.",
        { id: toastId, duration: 6000 }
      );

      setSubmittedProposal({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        budget: budgetFormatted,
        projectTitle: currentType.title[lang],
      });

      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.message || (lang === "fr" ? "Erreur lors de l'envoi. Veuillez réessayer ou nous contacter sur WhatsApp." : "Error while submitting. Please retry or contact us on WhatsApp."),
        { id: toastId }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={topRef} className="relative scroll-mt-28">
      {/* Visual Progress Bar - Ultra clean & responsive */}
      <div className="max-w-4xl mx-auto mb-4 sm:mb-6 px-1">
        <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono text-muted-foreground mb-2">
          <span className="text-brand font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            {lang === "fr" ? `Étape ${step} sur 4` : `Step ${step} of 4`}
          </span>
          <span className="font-semibold text-foreground/80">
            {step === 1 ? "25%" : step === 2 ? "50%" : step === 3 ? "75%" : "100%"}
          </span>
        </div>
        <div className="w-full bg-surface/60 h-1.5 sm:h-2 rounded-full overflow-hidden border border-border/50 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-brand via-cyan-400 to-emerald-400 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Interactive Container */}
      <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-[32px] bg-gradient-to-br from-surface/60 via-surface/30 to-background border border-border/70 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-brand/10 blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {/* STEP 1: Project Type Selection */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/15 border border-brand/30 text-brand text-xs font-mono font-semibold mb-3">
                  <Calculator size={13} />
                  <span>{lang === "fr" ? "ÉTAPE 1 / 4" : "STEP 1 / 4"}</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  {lang === "fr" ? "Quel type de site ou plateforme souhaitez-vous créer ?" : "What type of website or platform are you creating?"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {lang === "fr"
                    ? "Choisissez la catégorie adaptée pour initialiser un chiffrage logique et cohérent."
                    : "Select the project category to calculate a logical and transparent pricing range."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {projectTypes.map((pt) => {
                  const Icon = pt.icon;
                  const isSelected = selectedType === pt.id;
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => handleTypeChange(pt.id)}
                      className={`text-left p-5 rounded-2xl border transition-all flex flex-col justify-between h-full relative group ${
                        isSelected
                          ? "bg-brand/15 border-brand shadow-[0_0_30px_-5px_oklch(0.6_0.22_265/0.3)] ring-1 ring-brand"
                          : "bg-surface/30 border-border/60 hover:border-brand/40 hover:bg-surface/50"
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div
                            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                              isSelected ? "bg-brand text-white" : "bg-brand/10 text-brand group-hover:scale-105"
                            }`}
                          >
                            <Icon size={22} />
                          </div>
                          <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-brand/15 text-brand font-semibold border border-brand/25">
                            {pt.badge[lang]}
                          </span>
                        </div>

                        <h3 className="font-display font-bold text-base text-foreground mb-1.5">
                          {pt.title[lang]}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {pt.desc[lang]}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="pt-3 mt-3 border-t border-brand/30 flex items-center gap-1.5 text-xs text-brand font-semibold">
                          <Check size={14} />
                          <span>{lang === "fr" ? "Sélectionné" : "Selected"}</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => changeStep(2)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand text-white font-semibold text-sm shadow-[0_0_30px_oklch(0.6_0.22_265/0.4)] hover:shadow-[0_0_50px_oklch(0.6_0.22_265/0.6)] hover:-translate-y-0.5 transition-all"
                >
                  <span>{isWebsite ? (lang === "fr" ? "Pages & Modules du Site" : "Pages & Modules") : (lang === "fr" ? "Fonctionnalités & Modules" : "Features & Modules")}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Pages Count (if Site Vitrine) + Technical Modules Selection */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/15 border border-brand/30 text-brand text-xs font-mono font-semibold mb-3">
                  <Zap size={13} />
                  <span>{lang === "fr" ? "ÉTAPE 2 / 4" : "STEP 2 / 4"}</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  {isWebsite
                    ? (lang === "fr" ? "Combien de pages & quelles options pour votre site ?" : "How many pages & options for your website?")
                    : (lang === "fr" ? "Quels modules techniques souhaitez-vous intégrer ?" : "Which technical capabilities do you need?")}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {isWebsite
                    ? (lang === "fr" ? "Définissez le volume de contenu et cochez les options indispensables." : "Choose your page count tier and check the desired features.")
                    : (lang === "fr" ? "Cochez les briques indispensables pour votre première version en production." : "Select the core modules required for your release.")}
                </p>
              </div>

              {/* SECTION: Page Count Selector for Showcase Websites */}
              {isWebsite && (
                <div className="p-5 sm:p-6 rounded-2xl bg-surface/40 border border-brand/30 space-y-4">
                  <div className="flex items-center gap-2 font-display font-bold text-base text-foreground">
                    <FileText size={18} className="text-brand" />
                    <span>{lang === "fr" ? "Nombre de pages souhaité :" : "Target page count:"}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pageTiers.map((tier) => {
                      const isSelected = selectedPageTier === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setSelectedPageTier(tier.id)}
                          className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between ${
                            isSelected
                              ? "bg-brand/20 border-brand ring-1 ring-brand"
                              : "bg-surface/20 border-border/50 hover:border-brand/40 hover:bg-surface/40"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="font-display font-semibold text-xs sm:text-sm text-foreground">
                              {tier.name[lang]}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {tier.extraCost > 0 ? (
                                <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-brand/15 text-brand font-bold">
                                  +{tier.extraCost} {tenant.currencySymbol}
                                </span>
                              ) : (
                                <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 font-bold">
                                  {lang === "fr" ? "Inclus" : "Included"}
                                </span>
                              )}
                              {isSelected && (
                                <span className="w-4 h-4 rounded-full bg-brand text-white flex items-center justify-center text-[10px]">
                                  <Check size={10} strokeWidth={3} />
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {tier.pagesDetail[lang]}
                          </p>
                          <div className="mt-2 text-[11px] font-mono text-brand">
                            {lang === "fr" ? `Délai estimé : ${tier.weeks}` : `Delivery: ${tier.weeks}`}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION: Technical Modules */}
              <div className="space-y-4">
                <div className="font-display font-bold text-base text-foreground">
                  {isWebsite
                    ? (lang === "fr" ? "Options & fonctionnalités du site :" : "Website features & add-ons:")
                    : (lang === "fr" ? "Modules fonctionnels de l'application :" : "Platform functionality:")}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  {activeModulesPool.map((mod) => {
                    const isChecked = selectedModules.includes(mod.id);
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => toggleModule(mod.id)}
                        className={`text-left p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start gap-3 sm:gap-3.5 ${
                          isChecked
                            ? "bg-brand/15 border-brand shadow-sm ring-1 ring-brand/60"
                            : "bg-surface/30 border-border/50 hover:border-brand/40 hover:bg-surface/40"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                            isChecked ? "bg-brand text-white" : "border border-border/80 bg-surface/80"
                          }`}
                        >
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <h3 className="font-display font-semibold text-xs sm:text-sm text-foreground truncate">
                              {mod.name[lang]}
                            </h3>
                            {mod.cost > 0 ? (
                              <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-brand/15 text-brand font-bold shrink-0">
                                +{mod.cost} {tenant.currencySymbol}
                              </span>
                            ) : (
                              <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 font-bold shrink-0">
                                {lang === "fr" ? "Sur devis" : "Custom"}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {mod.desc[lang]}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => changeStep(1)}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-border/70 bg-surface/40 text-foreground font-semibold text-xs sm:text-sm hover:bg-surface/80 transition-all shrink-0"
                >
                  <ArrowLeft size={15} />
                  <span>{lang === "fr" ? "Retour" : "Back"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => changeStep(3)}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-brand text-white font-semibold text-xs sm:text-sm shadow-[0_0_30px_oklch(0.6_0.22_265/0.4)] hover:shadow-[0_0_50px_oklch(0.6_0.22_265/0.6)] hover:-translate-y-0.5 transition-all text-center"
                >
                  <span>{lang === "fr" ? "Délais & Rythme" : "Schedule & Pace"}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Timeline & Delivery Speed */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/15 border border-brand/30 text-brand text-xs font-mono font-semibold mb-3">
                  <Clock size={13} />
                  <span>{lang === "fr" ? "ÉTAPE 3 / 4" : "STEP 3 / 4"}</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  {lang === "fr" ? "Quelle est votre contrainte de délai ?" : "What is your target launch schedule?"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {lang === "fr"
                    ? "Nos équipes adaptent les plannings pour concrétiser votre mise en ligne en toute sérénité."
                    : "We schedule developer availability to match your go-to-market priorities."}
                </p>
              </div>

              <div className="space-y-3.5">
                {activeSpeedOptions.map((opt) => {
                  const isSelected = selectedSpeed === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedSpeed(opt.id)}
                      className={`w-full text-left p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                        isSelected
                          ? "bg-brand/15 border-brand shadow-sm ring-1 ring-brand"
                          : "bg-surface/30 border-border/50 hover:border-brand/40 hover:bg-surface/40"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                            isSelected ? "border-brand bg-brand text-white" : "border-border/80 bg-surface/60"
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-display font-bold text-base text-foreground">
                              {opt.title[lang]}
                            </h3>
                            <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-brand/20 text-brand font-semibold border border-brand/30">
                              {opt.badge[lang]}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {opt.desc[lang]}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => changeStep(2)}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-border/70 bg-surface/40 text-foreground font-semibold text-xs sm:text-sm hover:bg-surface/80 transition-all shrink-0"
                >
                  <ArrowLeft size={15} />
                  <span>{lang === "fr" ? "Retour" : "Back"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => changeStep(4)}
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full bg-brand text-white font-semibold text-xs sm:text-sm shadow-[0_0_30px_oklch(0.6_0.22_265/0.4)] hover:shadow-[0_0_50px_oklch(0.6_0.22_265/0.6)] hover:-translate-y-0.5 transition-all text-center"
                >
                  <span>
                    {isCustomDiscovery
                      ? (lang === "fr" ? "Consulter Mon Cadrage" : "View My Project Scoping")
                      : (lang === "fr" ? "Calculer Mon Estimation" : "Calculate My Estimate")}
                  </span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Real-Time Results & Double-Channel Lead Capture */}
          {step === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Estimation Header Banner */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand/20 via-surface/80 to-surface/40 border border-brand/40 shadow-xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {isCustomDiscovery ? (
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2.5">
                        <ShieldCheck size={13} />
                        <span>{lang === "fr" ? "Projet d'Envergure • Cadrage Sur-Mesure" : "Enterprise Scope • Bespoke Discovery"}</span>
                      </div>
                      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                        {lang === "fr" ? "Sur Devis & Cadrage Technique Personnalisé" : "Custom Quote & Technical Scoping"}
                      </h2>
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
                        {lang === "fr"
                          ? "Pour un projet d'une telle envergure avec autant de modules et de spécificités, un algorithme de calcul automatique ne peut pas refléter fidèlement la réalité de votre cahier des charges sans étude de vos flux métiers. Nos ingénieurs analysent vos besoins et vous remettent un chiffrage forfaitaire ferme sous 24h sans aucun engagement."
                          : "For an architecture of this scale with advanced requirements, automated calculators cannot substitute for a dedicated engineering review. Our architects assess your functional scope and deliver a firm fixed-price quote under 24 hours."}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground font-medium">
                        <span className="inline-flex items-center gap-1.5 text-foreground">
                          <Clock size={16} className="text-brand" />
                          <strong>{lang === "fr" ? "Délai d'étude :" : "Turnaround:"}</strong> {lang === "fr" ? "Réponse sous 24h" : "Under 24 hours"}
                        </span>
                        <span>•</span>
                        <span className="text-cyan-400 font-mono">
                          {currentType.title[lang]} ({selectedModules.length} {lang === "fr" ? "modules ciblés" : "modules targeted"})
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground">
                        {estimatedMin.toLocaleString(lang === "fr" ? "fr-FR" : "en-US")} {tenant.currencySymbol} — {estimatedMax.toLocaleString(lang === "fr" ? "fr-FR" : "en-US")} {tenant.currencySymbol}{" "}
                        <span className="text-sm font-mono text-muted-foreground font-normal">HT</span>
                      </h2>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-muted-foreground font-medium">
                        <span className="inline-flex items-center gap-1.5 text-foreground">
                          <Clock size={16} className="text-brand" />
                          <strong>{lang === "fr" ? "Délai moyen de livraison :" : "Estimated Delivery:"}</strong> {estimatedWeeks}
                        </span>
                        <span>•</span>
                        <span className="text-cyan-400 font-mono">
                          {currentType.title[lang]} {isWebsite ? `(${currentPageTier.name[lang]})` : ""}
                        </span>
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleReset}
                    className="self-start md:self-center inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border/80 bg-surface/60 text-xs font-mono font-semibold text-muted-foreground hover:text-foreground transition-all shrink-0"
                  >
                    <RotateCcw size={13} />
                    <span>{lang === "fr" ? "Nouvelle simulation" : "New Simulation"}</span>
                  </button>
                </div>

                {/* Trust Guarantee Badges */}
                <div className="mt-6 pt-5 border-t border-border/50 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 size={15} className="shrink-0" />
                    <span>{lang === "fr" ? "Devis ferme sous 24h" : "Formal Quote Under 24h"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-cyan-400">
                    <ShieldCheck size={15} className="shrink-0" />
                    <span>{lang === "fr" ? "Code 100% transféré (IP)" : "100% IP Code Ownership"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand">
                    <CheckCircle2 size={15} className="shrink-0" />
                    <span>{lang === "fr" ? "Audit technique offert" : "Free Tech Architecture Review"}</span>
                  </div>
                </div>
              </div>

              {/* Conversion Block: Two High-Converting Channels */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Channel 1: Instant WhatsApp Dispatch (Direct Contact) */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center mb-4 shadow-lg shadow-[#25D366]/30">
                      <MessageCircle size={24} />
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground">
                      {lang === "fr" ? "Option 1 : Échanger sur WhatsApp" : "Option 1: Chat on WhatsApp"}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                      {isCustomDiscovery
                        ? (lang === "fr"
                            ? "Transmettez vos objectifs et modules sur notre WhatsApp officiel (+33 7 59 44 01 05). Nos ingénieurs évaluent directement votre cadrage."
                            : "Share your high-level scope directly to our official WhatsApp (+33 7 59 44 01 05). Direct engineering conversation.")
                        : (lang === "fr"
                            ? "Envoyez votre récapitulatif complet sur notre WhatsApp officiel (+33 7 59 44 01 05). Un ingénieur TY Dev vous répond en direct."
                            : "Send your complete calculated brief directly to our official WhatsApp (+33 7 59 44 01 05). Fast reply from our engineering team.")}
                    </p>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 w-full py-4 rounded-full bg-[#25D366] text-white font-semibold text-sm shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(37,211,102,0.6)] hover:-translate-y-0.5 transition-all text-center"
                  >
                    <MessageCircle size={18} />
                    <span>
                      {isCustomDiscovery
                        ? (lang === "fr" ? "Demander mon cadrage sur WhatsApp" : "Request Scoping on WhatsApp")
                        : (lang === "fr" ? "Ouvrir mon brief sur WhatsApp" : "Open Brief in WhatsApp")}
                    </span>
                  </a>
                </div>

                {/* Channel 2: Formal Email Proposal Specification Form */}
                <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-surface/40 border border-border/80 shadow-lg relative overflow-hidden backdrop-blur-md">
                  {submittedProposal ? (
                    /* Success State Card */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-4 text-center space-y-4"
                    >
                      <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                        <CheckCircle2 size={36} />
                      </div>

                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-mono font-semibold mb-2">
                          <Check size={13} />
                          <span>{lang === "fr" ? "Proposition transmise" : "Proposal Dispatched"}</span>
                        </div>
                        <h3 className="font-display font-bold text-2xl text-foreground">
                          {lang === "fr" ? "Demande envoyée avec succès !" : "Proposal Sent Successfully!"}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed max-w-md mx-auto">
                          {lang === "fr"
                            ? `Merci ${submittedProposal.name} ! Notre équipe d'ingénieurs a bien enregistré votre demande pour votre ${submittedProposal.projectTitle} (${submittedProposal.budget}).`
                            : `Thank you ${submittedProposal.name}! Our engineering team received your project scope for ${submittedProposal.projectTitle} (${submittedProposal.budget}).`}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-surface/60 border border-border/60 text-xs space-y-1.5 max-w-md mx-auto text-left">
                        <div className="flex items-center gap-2 text-foreground">
                          <Mail size={14} className="text-brand shrink-0" />
                          <span>
                            {lang === "fr" ? "Cadrage technique envoyé à :" : "Technical proposal to:"}{" "}
                            <strong className="text-cyan-400 font-mono">{submittedProposal.email}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground">
                          <Phone size={14} className="text-brand shrink-0" />
                          <span>
                            {lang === "fr" ? "Rappel sous 24h au :" : "Follow-up phone:"}{" "}
                            <strong className="font-mono">{submittedProposal.phone}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-400 pt-1">
                          <Clock size={14} className="shrink-0" />
                          <span>{lang === "fr" ? "Délai de réponse garanti : moins de 24 heures" : "Guaranteed reply: under 24 hours"}</span>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-xs sm:text-sm hover:opacity-95 shadow-md shadow-[#25D366]/20 transition-all"
                        >
                          <MessageCircle size={16} />
                          <span>{lang === "fr" ? "Discuter aussi sur WhatsApp" : "Chat on WhatsApp"}</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            setSubmittedProposal(null);
                            handleReset();
                          }}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border/80 bg-surface/60 text-foreground font-semibold text-xs sm:text-sm hover:bg-surface/90 transition-all"
                        >
                          <RotateCcw size={14} />
                          <span>{lang === "fr" ? "Nouvelle simulation" : "New Simulation"}</span>
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* Interactive Form */
                    <>
                      <div className="mb-4">
                        <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground">
                          {isCustomDiscovery
                            ? (lang === "fr" ? "Demander un cadrage & devis sur-mesure" : "Request Custom Scoping & Quote")
                            : (lang === "fr" ? "Recevoir mon devis officiel par Email" : "Receive Technical Proposal by Email")}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {lang === "fr"
                            ? "Renseignez vos coordonnées ci-dessous pour recevoir une étude de faisabilité et un devis au forfait ferme sous 24h."
                            : "Provide your contact details below to receive a feasibility study and fixed-price contract under 24 hours."}
                        </p>
                      </div>

                      <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div>
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                              <User size={13} className="text-brand" />
                              <span>{lang === "fr" ? "Nom & Prénom *" : "Full Name *"}</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-background/90 border border-border/80 text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                            />
                          </div>

                          <div>
                            <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                              <Phone size={13} className="text-brand" />
                              <span>{lang === "fr" ? "Numéro de Téléphone *" : "Phone Number *"}</span>
                            </label>
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder={lang === "fr" ? "06 12 34 56 78" : "+33 6 12 34 56 78"}
                              className="w-full px-3.5 py-2.5 rounded-xl bg-background/90 border border-border/80 text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                            <Mail size={13} className="text-brand" />
                            <span>{lang === "fr" ? "Adresse E-mail professionnelle *" : "Work Email *"}</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-background/90 border border-border/80 text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
                          />
                        </div>

                        <div>
                          <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground mb-1.5">
                            <MessageSquare size={13} className="text-brand" />
                            <span>
                              {isCustomDiscovery
                                ? (lang === "fr" ? "Détails & spécificités de votre projet *" : "Project specifications & scope *")
                                : (lang === "fr" ? "Détails ou fonctionnalités souhaitées (Optionnel)" : "Project Details (Optional)")}
                            </span>
                          </label>
                          <textarea
                            rows={3}
                            required={isCustomDiscovery}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder={
                              isCustomDiscovery
                                ? (lang === "fr"
                                    ? "Décrivez vos objectifs : volume d'utilisateurs, règles métiers, systèmes à connecter, contraintes de production..."
                                    : "Describe your goals: user scale, business rules, APIs to connect, timeline...")
                                : (lang === "fr"
                                    ? "Décrivez votre projet (ex: date souhaitée de lancement, exemples de sites que vous aimez, fonctionnalités spécifiques...)"
                                    : "Describe your project (e.g. target launch date, inspiration websites, special requirements...)")
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl bg-background/90 border border-border/80 text-foreground text-xs sm:text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 resize-none transition-all"
                          />
                        </div>

                        {/* Module officiel Google reCAPTCHA v2 */}
                        <GoogleReCaptcha
                          onVerify={setRecaptchaToken}
                          onExpire={() => setRecaptchaToken("")}
                        />

                        {/* Privacy & NDA Footnote */}
                        <div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-surface/30 p-2.5 rounded-lg border border-border/40">
                          <Lock size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>
                            {lang === "fr"
                              ? "Confidentialité garantie (Accord de non-divulgation NDA). Zéro spam, réponse garantie sous 24h."
                              : "Strict NDA confidentiality. Zero spam, reply guaranteed under 24 hours."}
                          </span>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-full bg-gradient-to-r from-brand via-brand to-cyan-500 text-white font-semibold text-sm shadow-[0_0_30px_oklch(0.6_0.22_265/0.4)] hover:shadow-[0_0_50px_oklch(0.6_0.22_265/0.6)] hover:-translate-y-0.5 transition-all disabled:opacity-60 cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              <span>{lang === "fr" ? "Transmission en cours..." : "Submitting proposal..."}</span>
                            </>
                          ) : (
                            <>
                              <Send size={18} />
                              <span>{lang === "fr" ? "Recevoir mon devis & proposition sous 24h" : "Receive My Quote & Proposal in 24h"}</span>
                            </>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>

              {/* Back to tweak choices */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => changeStep(2)}
                  className="inline-flex items-center gap-2 text-xs text-brand hover:underline"
                >
                  <ArrowLeft size={14} />
                  <span>{lang === "fr" ? "Modifier mes choix de pages et de modules" : "Modify selected pages and features"}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Simulator FAQ Accordion */}
      <div className="max-w-4xl mx-auto mt-20">
        <div className="text-center mb-10">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-brand mb-2">
            // FAQ TARIFS & DEVIS
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
            {lang === "fr" ? "Questions Fréquentes sur les Tarifs & Délais" : "Frequently Asked Questions About Pricing & Timelines"}
          </h2>
        </div>

        <div className="space-y-3.5">
          {simulatorFaq.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-surface/30 border border-border/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-semibold text-base sm:text-lg text-foreground hover:text-brand transition-colors"
                >
                  <span>{item.q[lang]}</span>
                  <ChevronDown
                    size={18}
                    className={`text-brand shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-4">
                    {item.a[lang]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
