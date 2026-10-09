# Plan d'Exécution : Maîtrise des 6 Piliers SEO & Performance 95+

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Porter le système SEO de TY Dev à l'excellence absolue (10/10) en débloquant la Performance Mobile (Core Web Vitals 95+ sur PageSpeed) et en pérennisant les 6 piliers (Schémas JSON-LD, Indexabilité, E-E-A-T, Maillage interne SXO, Médias WebP et Vitesse).

**Architecture:** Approche chirurgicale front-end : élimination des ressources bloquantes au premier rendu (Google Fonts asynchrone), déblocage immédiat du LCP sur le titre H1 (zéro masquage d'opacité initial), accélération GPU pure des animations CSS (remplacement de `box-shadow` par `scale/opacity`), code splitting des chunks Vite (`lucide-react`, `framer-motion`), et intégration dans la suite de tests automatisés.

**Tech Stack:** React 19, Vite, TanStack Router / Start, Tailwind CSS, Framer Motion, Schema.org JSON-LD, PageSpeed Insights / Lighthouse 13.5.

**Spec:** [docs/superpowers/plans/2026-10-09-seo-6-piliers-plan.md](file:///c:/Users/Yassine/Desktop/tydev%20v1/ty-dev-premiere/docs/superpowers/plans/2026-10-09-seo-6-piliers-plan.md)

## Global Constraints
- Toujours répondre et documenter en français.
- Ne jamais dégrader le design existant ni casser l'esthétique premium (Dark mode, glassmorphism, fluidité).
- Garantir le passage de 100% des tests de validation SEO existants (58/58 succès).
- Synchronisation obligatoire sur les 3 branches distantes (`main`, `ty-dev-tn`, `raouf`).

---

### Task 1: Pilier 6 (Performance Mobile) — Google Fonts Non-Bloquant & Découverte DNS

**Files:**
- Modify: `src/routes/__root.tsx:218-230`
- Test: `scripts/test_seo_schemas.mjs`

**Interfaces:**
- Produces: Polices chargées en mode asynchrone non bloquant pour le parseur HTML sans retarder le FCP (First Contentful Paint).

- [ ] **Step 1: Modifier `src/routes/__root.tsx` pour rendre le chargement des polices asynchrone**
  Remplacer le `<link rel="stylesheet">` bloquant pour Google Fonts par un lien préchargé avec permutation asynchrone (`media="print"` devenant `media="all"` au chargement, et fallback `<noscript>` pour compatibilité maximale sans bloquer le rendu initial).
- [ ] **Step 2: Vérifier que le build Vite et le rendu SSR intègrent correctement les balises**
- [ ] **Step 3: Exécuter `npm run test:seo`**

---

### Task 2: Pilier 6 (Performance Mobile) — Déblocage LCP sur le H1 & Accélération GPU des Animations

**Files:**
- Modify: `src/components/site/Hero.tsx:32-48, 109-116`
- Modify: `src/styles.css:127-141`
- Test: `scripts/test_seo_schemas.mjs`

**Interfaces:**
- Consumes: Composant `Hero.tsx` et styles `@keyframes pulse-dot`.
- Produces: Le texte H1 "We Build Software That Scales..." s'affiche dès la 1ère milliseconde sans `opacity: 0` masquant le LCP ; `pulse-dot` est 100% calculé sur le GPU.

- [ ] **Step 1: Éliminer le masquage LCP dans `src/components/site/Hero.tsx`**
  Modifier `WordReveal` pour que les mots ne soient pas initialisés à `opacity: 0` bloquante pour Lighthouse. Conserver l'animation fluide de montée tout en laissant le texte visible immédiatement pour le LCP (Largest Contentful Paint).
- [ ] **Step 2: Supprimer les filtres `filter: blur(6px)` sur les animations critiques de démarrage**
  Remplacer `filter: blur` par de simples transitions de position `y` et d'opacité accélérées matériellement par le GPU.
- [ ] **Step 3: Réécrire l'animation `@keyframes pulse-dot` dans `src/styles.css`**
  Remplacer l'animation de `box-shadow` (recalcul CPU coûteux) par un pseudo-élément animé via `transform: scale()` et `opacity` (100% composité GPU).
- [ ] **Step 4: Valider visuellement dans le navigateur que le pulse et le Hero restent superbes et fluides**

---

### Task 3: Pilier 6 & 4 (Performance & SXO) — Code-Splitting Vite & Optimisation du Bundle Client

**Files:**
- Modify: `vite.config.ts`
- Test: `npm run build`

**Interfaces:**
- Produces: Séparation des dépendances lourdes (`lucide-react`, `framer-motion`) en chunks dédiés et isolés du bundle initial `index.js`.

- [ ] **Step 1: Configurer `vite.config.ts` avec `manualChunks` dans `rollupOptions`**
  Définir des chunks séparés pour `vendor-motion` (`framer-motion`) et `vendor-lucide` (`lucide-react`) afin d'alléger le parsing initial sur mobile.
- [ ] **Step 2: Lancer `npm run build` et analyser la taille des fichiers générés**
- [ ] **Step 3: Vérifier que le serveur de dev tourne sans régression**

---

### Task 4: Piliers 1, 2, 3 & 5 — Consolidation Automatisée & Enrichissement des Tests SEO

**Files:**
- Modify: `scripts/test_seo_schemas.mjs`
- Test: `npm run test:seo`

**Interfaces:**
- Produces: Suite de tests enrichie validant la non-régression des 6 piliers (Schémas, Sitemaps, RSS, WebP, Hreflang, Polices non bloquantes, LCP optimisé).

- [ ] **Step 1: Ajouter des tests automatisés dans `scripts/test_seo_schemas.mjs`**
  Vérifier la conformité de l'animation `pulse-dot` (GPU), la présence des balises de polices non-bloquantes et la présence de `llms.txt`.
- [ ] **Step 2: Exécuter `npm run test:seo` et constater que tous les tests passent avec 100% de succès**

---

### Task 5: Validation Finale, Mesure de Performance & Push sur les 3 Branches

**Files:**
- Git: `main`, `ty-dev-tn`, `raouf`

- [ ] **Step 1: Exécuter le build de production complet (`npm run build`)**
- [ ] **Step 2: Commiter les optimisations avec un message conventionnel clair**
- [ ] **Step 3: Pousser sur les 3 branches distantes (`main`, `ty-dev-tn`, `raouf`/`Raouf`)**
- [ ] **Step 4: Vérifier la synchronisation avec `git ls-remote --heads origin`**
