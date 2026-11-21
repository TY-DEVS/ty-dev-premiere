import {
  ProjectType,
  PageTier,
  FeatureModule,
  SpeedOption,
  showcaseModules,
  softwareModules,
  enterpriseModules,
  websiteSpeeds,
  softwareSpeeds,
  enterpriseSpeeds,
  projectTypes,
  pageTiers,
} from "@/config/simulatorData";
import { type Lang } from "@/i18n/translations";
import { type TenantConfig } from "@/config/tenants";

export interface SimulatorCalculationParams {
  selectedType: string;
  selectedPageTier: string;
  selectedModules: string[];
  selectedSpeed: string;
  lang: Lang;
  tenant: TenantConfig;
}

export interface SimulatorCalculationResult {
  currentType: ProjectType;
  currentPageTier: PageTier;
  currentSpeed: SpeedOption;
  activeModulesPool: FeatureModule[];
  activeSpeedOptions: SpeedOption[];
  isWebsite: boolean;
  isLargeProject: boolean;
  isCustomDiscovery: boolean;
  estimatedMin: number;
  estimatedMax: number;
  estimatedWeeks: string;
  budgetFormatted: string;
}

export function calculateSimulatorEstimate(
  params: SimulatorCalculationParams
): SimulatorCalculationResult {
  const { selectedType, selectedPageTier, selectedModules, selectedSpeed, lang, tenant } = params;

  const currentType = projectTypes.find((t) => t.id === selectedType) || projectTypes[0];
  const isLargeProject = !!currentType.isLargeProject;
  const isWebsite = !!currentType.isWebsite;

  const activeModulesPool = isWebsite
    ? showcaseModules
    : isLargeProject
    ? enterpriseModules
    : softwareModules;

  const activeSpeedOptions = isWebsite
    ? websiteSpeeds
    : isLargeProject
    ? enterpriseSpeeds
    : softwareSpeeds;

  const currentPageTier = pageTiers.find((p) => p.id === selectedPageTier) || pageTiers[0];
  const currentSpeed = activeSpeedOptions.find((s) => s.id === selectedSpeed) || activeSpeedOptions[0];

  const modulesCost = selectedModules.reduce((acc, modId) => {
    const mod = activeModulesPool.find((m) => m.id === modId);
    return acc + (mod ? mod.cost : 0);
  }, 0);

  const pageCost = isWebsite ? currentPageTier.extraCost : 0;
  const rawMin = Math.round((currentType.minBase + pageCost + modulesCost) * currentSpeed.multiplier);
  const rawMax = Math.round((currentType.maxBase + pageCost + modulesCost * 1.2) * currentSpeed.multiplier);

  const isCustomDiscovery =
    isLargeProject ||
    selectedModules.length >= 5 ||
    (!isWebsite && rawMin >= 2200);

  const roundFactor = isWebsite ? 10 : 50;
  const estimatedMin = Math.round(rawMin / roundFactor) * roundFactor;
  const estimatedMax = Math.round(rawMax / roundFactor) * roundFactor;

  const estimatedWeeks = isCustomDiscovery
    ? (lang === "fr" ? "Cadrage sous 24h • Devis sur-mesure" : "24h Discovery • Tailored Quote")
    : (isWebsite ? currentPageTier.weeks : currentSpeed.badge[lang]);

  const budgetFormatted = isCustomDiscovery
    ? (lang === "fr" ? "Sur devis personnalisé après cadrage technique (Grand Projet)" : "Custom quote upon technical discovery (Enterprise Scope)")
    : `${estimatedMin.toLocaleString(lang === "fr" ? "fr-FR" : "en-US")} ${tenant.currencySymbol} - ${estimatedMax.toLocaleString(lang === "fr" ? "fr-FR" : "en-US")} ${tenant.currencySymbol} HT`;

  return {
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
  };
}
