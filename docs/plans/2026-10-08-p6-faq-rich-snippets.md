# Plan d'Implémentation P6 — Données Structurées FAQPage & Rich Snippets Google

## Contexte & Objectifs
L'objectif de la priorité **P6** est d'injecter des données structurées Schema.org JSON-LD de type `FAQPage` sur l'ensemble des pages stratégiques de TY Dev. 
Ces balises permettent à Google d'afficher des **accordéons interactifs dépliables directement dans les résultats de recherche**, augmentant la surface visuelle de TY Dev sur les SERPs et générant un boost immédiat de taux de clic (+30% CTR).

Ce plan consolide également la cohérence multi-domaines (`ty-dev.site`, `ty-dev.tech`, `ty-dev.fr`).

---

## Étapes d'Exécution

### Étape 1 : Balisage FAQPage sur le Simulateur de Devis (`/simulateur`)
- Source de données : `simulatorFaq` (questions sur devis ferme, propriété intellectuelle 100%, jalons de paiement, maintenance 30 jours).
- Fichier : `src/routes/simulateur.tsx`.
- Injection dans `Route.head.scripts` : schéma `@type: "FAQPage"`.

### Étape 2 : Balisage FAQPage sur toutes les pages de Services (`/services/$slug`)
- Source de données : `service.faq` défini pour chaque service dans `src/data/servicesData.ts`.
- Fichier : `src/routes/services_.$slug.tsx`.
- Injection dynamique des questions/réponses du service actif au format Schema.org `FAQPage`.

### Étape 3 : Balisage FAQPage sur la Page Contact (`/contact`)
- Questions stratégiques : consultation sous 24h, garantie de confidentialité (NDA), tarification au forfait, accompagnement.
- Fichier : `src/routes/contact.tsx`.
- Injection dans `Route.head.scripts` : schéma `@type: "FAQPage"`.

### Étape 4 : Balisage FAQPage sur l'Étude de Cas NaviCab (`/projets/navicab`)
- Questions techniques : scalabilité dispatch < 2s, conformité Factur-X, synchronisation 5 portails, transfert de propriété du code.
- Fichier : `src/routes/projets_.navicab.tsx`.
- Injection dans `Route.head.scripts` en complément de `TechArticle`.

### Étape 5 : Harmonisation et Vérification Multi-Domaines (.site, .tech, .fr)
- Vérifier `sameAs` dans `organizationSchema` et `websiteSchema` de `src/routes/__root.tsx`.
- Vérifier `public/llms.txt`.
- Vérifier que les formulaires de contact et calculateurs fonctionnent indépendamment du domaine hôte.

### Étape 6 : Validation Technique Complète
- Compilation TypeScript : `npx tsc --noEmit` (0 erreur requise).
- Test de charge et d'intégrité HTTP : `npm run test:k6` (100% de réussite requise).
- Vérification de la validité du format JSON-LD Schema.org.
