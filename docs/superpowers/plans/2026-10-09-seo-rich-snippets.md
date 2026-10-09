# Plan d'Implémentation : Rich Snippets & Schémas JSON-LD Manquants

> **Pour l'agent :** Exécution avec validation TypeScript, script de test automatisé et synchronisation sur toutes les branches distantes (`main`, `Raouf`, `raouf`, `ty-dev-tn`).

**Objectif :** Déployer les données structurées Schema.org manquantes (`FAQPage`, `BreadcrumbList`, enrichissement `organizationSchema`) pour activer les résultats enrichis Google (accordéons FAQ, fils d'ariane sémantiques, géolocalisation & devises).

**Architecture :** 
1. Exporter `FAQ_ITEMS` depuis `src/components/site/Faq.tsx` et générer dynamiquement le schéma `FAQPage` dans `src/routes/faq.tsx`.
2. Ajouter le schéma `BreadcrumbList` sur les routes mères : `/faq`, `/portfolio`, `/demos`, `/about`, `/blog`, `/simulateur`, `/legal`.
3. Enrichir le schéma `organizationSchema` dans `src/routes/__root.tsx` (`legalName`, `address`, devises `currenciesAccepted`, paiements, zones géographiques précises).
4. Créer et exécuter le script de test automatisé `scripts/test_seo_schemas.mjs` + validation `npx tsc --noEmit`.
5. Pousser les modifications sur toutes les 4 branches distantes.

---

## Tâches d'implémentation

### Tâche 1 : Schéma `FAQPage` et `BreadcrumbList` sur `/faq`
- **Fichiers :**
  - Modifier : `src/components/site/Faq.tsx` (exporter `FAQ_ITEMS`)
  - Modifier : `src/routes/faq.tsx` (injecter `FAQPage` et `BreadcrumbList`)

### Tâche 2 : Fil d'Ariane (`BreadcrumbList`) sur les routes principales
- **Fichiers :**
  - Modifier : `src/routes/portfolio.tsx`
  - Modifier : `src/routes/demos.tsx`
  - Modifier : `src/routes/about.tsx`
  - Modifier : `src/routes/blog.tsx`
  - Modifier : `src/routes/simulateur.tsx`
  - Modifier : `src/routes/legal.tsx`

### Tâche 3 : Enrichissement du Schéma `organizationSchema` dans `__root.tsx`
- **Fichiers :**
  - Modifier : `src/routes/__root.tsx` (ajouter `legalName`, `address`, `currenciesAccepted`, `paymentAccepted`, `areaServed`, `openingHoursSpecification`)

### Tâche 4 : Tests Automatisés & Vérification TypeScript
- **Fichiers :**
  - Créer : `scripts/test_seo_schemas.mjs`
- **Actions :**
  - Exécuter `node scripts/test_seo_schemas.mjs`
  - Exécuter `npx tsc --noEmit`

### Tâche 5 : Synchronisation Git et Déploiement multi-branches
- **Actions :**
  - Commit des modifications
  - Push sur `main`, `Raouf`, `raouf` et `ty-dev-tn`
