# Plan d'Implémentation P5 : Études de Cas Approfondies & Preuve de ROI

> **Objectif :** Transformer les réalisations concrètes de TY Dev (notamment la plateforme SaaS NaviCab) en une machine de conversion et d'autorité SEO, grâce à des métriques de ROI chiffrées, un comparatif Avant/Après, des données structurées Schema.org d'élite et un maillage interne stratégique vers le simulateur de devis.

## Tâche 1 : Enrichissement de la page d'Étude de Cas NaviCab (`src/routes/projets_.navicab.tsx`)
- [ ] Injecter les balises Schema.org JSON-LD (`SoftwareApplication` & `TechArticle`).
- [ ] Ajouter une section percutante de **KPIs & Métriques ROI chiffrées** :
  - `< 2s` : Temps de dispatching radar aux chauffeurs
  - `99.99%` : Uptime garanti en production 24/7
  - `5` : Portails web & mobiles interconnectés
  - `-45%` : De temps de gestion pour les répartiteurs
  - `100%` : Facturation et exports automatisés (Factur-X & CPAM)
- [ ] Ajouter une section comparative **« Défi Métier vs Solution Ingénierie TY Dev »** (Avant / Après).
- [ ] Ajouter un bloc de conversion direct avec double CTA :
  - Bouton 1 : « Estimer un projet similaire sur notre simulateur » -> `/simulateur`
  - Bouton 2 : « Discuter de votre architecture sur WhatsApp » -> WhatsApp direct

## Tâche 2 : Maillage Interne SEO (Internal Linking)
- [ ] Ajouter une mise en avant vers `/projets/navicab` dans `/services/saas-transport-logistique`.
- [ ] Ajouter une mention et lien contextuel dans l'article de blog No-Code vs Sur-Mesure.
- [ ] Ajouter un badge « Étude de cas détaillée » dans `Portfolio.tsx` pour lier directement à la page.

## Tâche 3 : Sitemap & k6 Load Test
- [ ] Vérifier la présence de `/projets/navicab` dans `public/sitemap.xml`.
- [ ] Ajouter `/projets/navicab` dans `tests/k6_load_test.js`.

## Tâche 4 : Vérification et Tests
- [ ] `npx tsc --noEmit` avec 0 erreur.
- [ ] Exécution de `npm run test:k6`.
- [ ] Validation responsive sur mobile et desktop.
