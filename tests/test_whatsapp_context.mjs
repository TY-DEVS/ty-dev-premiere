import { getContextualWhatsAppConfig, buildContextualWhatsAppUrl, OFFICIAL_WHATSAPP_PHONE } from '../src/lib/whatsappContext.ts';

const testCases = [
  {
    path: '/simulateur',
    expectedTooltipFr: 'Échanger sur mon estimation (WhatsApp)',
    expectedSnippetFr: 'simulateur de devis en ligne',
  },
  {
    path: '/blog/cout-mvp-saas-tarifs-budget-guide-complet-2026',
    expectedTooltipFr: 'Échanger sur mon MVP SaaS (WhatsApp)',
    expectedSnippetFr: 'MVP SaaS en 2026',
  },
  {
    path: '/blog/architecture-microservices-serverless-2026',
    expectedTooltipFr: 'Question sur un projet (WhatsApp)',
    expectedSnippetFr: 'publication technique sur votre blog',
  },
  {
    path: '/services/integration-ia-llm',
    expectedTooltipFr: 'Projet Agents IA & LLM (WhatsApp)',
    expectedSnippetFr: 'Agents IA, LLM et RAG',
  },
  {
    path: '/services/saas-sur-mesure',
    expectedTooltipFr: 'Cadrage SaaS sur-mesure (WhatsApp)',
    expectedSnippetFr: 'plateforme SaaS sur-mesure',
  },
  {
    path: '/services/devops-cloud-infrastructure',
    expectedTooltipFr: 'Conseil DevOps & Cloud (WhatsApp)',
    expectedSnippetFr: 'DevOps & Cloud Infrastructure',
  },
  {
    path: '/services/saas-transport-logistique',
    expectedTooltipFr: 'Projet Mobilité & Transport (WhatsApp)',
    expectedSnippetFr: 'SaaS Transport & Dispatching',
  },
  {
    path: '/projets/navicab',
    expectedTooltipFr: 'Échanger sur le projet NaviCab',
    expectedSnippetFr: 'NaviCab',
  },
  {
    path: '/team/yassine-ben-yaala',
    expectedTooltipFr: 'Contacter Yassine (WhatsApp)',
    expectedSnippetFr: 'Mohamed Yassine',
  },
  {
    path: '/contact',
    expectedTooltipFr: 'Réponse directe sous 15 min',
    expectedSnippetFr: 'cadrer notre projet et obtenir un devis',
  },
  {
    path: '/',
    expectedTooltipFr: 'Discutons de votre projet (WhatsApp)',
    expectedSnippetFr: 'application web / SaaS',
  },
];

console.log('🧪 Lancement des tests de validation du WhatsApp Contextuel Dynamique...\n');

let allPassed = true;

for (const tc of testCases) {
  const configFr = getContextualWhatsAppConfig(tc.path, 'fr');
  const configEn = getContextualWhatsAppConfig(tc.path, 'en');
  const urlFr = buildContextualWhatsAppUrl(tc.path, 'fr');

  const tooltipMatches = configFr.tooltip === tc.expectedTooltipFr;
  const messageMatches = configFr.message.includes(tc.expectedSnippetFr);
  const urlValid = urlFr.startsWith(`https://wa.me/${OFFICIAL_WHATSAPP_PHONE}?text=`) && urlFr.includes(encodeURIComponent(configFr.message));

  if (tooltipMatches && messageMatches && urlValid) {
    console.log(`✅ [SUCCÈS] Page "${tc.path}":`);
    console.log(`   Tooltip: "${configFr.tooltip}"`);
    console.log(`   Message FR: "${configFr.message.slice(0, 65)}..."`);
    console.log(`   Message EN: "${configEn.message.slice(0, 65)}..."`);
  } else {
    allPassed = false;
    console.error(`❌ [ÉCHEC] Page "${tc.path}" :`);
    console.error(`   Expected Tooltip: "${tc.expectedTooltipFr}", Got: "${configFr.tooltip}"`);
    console.error(`   Snippet in Message: ${messageMatches}`);
  }
  console.log('---');
}

if (allPassed) {
  console.log('\n🎉 TOUS LES 11 TESTS ONT RÉUSSI À 100% SANS AUCUNE ERREUR !');
  process.exit(0);
} else {
  console.error('\n⚠️ Des tests ont échoué.');
  process.exit(1);
}
