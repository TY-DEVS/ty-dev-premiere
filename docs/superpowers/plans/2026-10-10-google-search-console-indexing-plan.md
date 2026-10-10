# Plan d'Action : Inspection & Indexation des 5 Pages Clés dans Google Search Console

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Faire explorer et indexer immédiatement par Googlebot les 5 pages à plus forte valeur commerciale de TY Dev via Google Search Console pour capter des requêtes décisionnelles sous 48h.

**Architecture:** Validation technique préalable en direct des 5 URLs (HTTP 200, Canonical, Robots `index, follow`, Schemas JSON-LD sans erreur), génération d'un script d'automatisation et de diagnostic `scripts/gsc_inspection_prep.mjs`, et exécution de la procédure d'inspection GSC.

**Tech Stack:** Google Search Console, TanStack Start, Node.js, Schema.org JSON-LD.

---

## 🎯 Les 5 Pages Clés Ciblées pour l'Indexation Prioritaire

1. **Page d'Accueil (Hub & Marque)** :
   - `https://ty-dev.site/` & `https://ty-dev.fr/`
   - *Intention de recherche :* "Agence web SaaS", "Agence IA France", "TY Dev"
2. **Le Simulateur de Devis (Aimant à conversion B2B)** :
   - `https://ty-dev.site/simulateur` & `https://ty-dev.fr/simulateur`
   - *Intention de recherche :* "Simulateur devis saas", "Prix création application web", "Estimation budget MVP"
3. **Service SaaS & MVP (Cœur de métier)** :
   - `https://ty-dev.site/services/saas-sur-mesure`
   - *Intention de recherche :* "Développement SaaS sur mesure", "Création MVP 4 semaines"
4. **Service Agents IA & LLM (Haute valeur ajoutée)** :
   - `https://ty-dev.site/services/integration-ia-llm`
   - *Intention de recherche :* "Développement agent IA", "Intégration LLM entreprise", "RAG application"
5. **Étude de Cas NaviCab (Preuve d'autorité & ROI)** :
   - `https://ty-dev.site/projets/navicab`
   - *Intention de recherche :* "Application dispatching taxi", "Temps réel WebSockets SaaS", "Étude de cas SaaS transport"

---

## 📋 Tâches d'Exécution

### Task 1: Audit Technique en Direct des 5 Pages Clés (Pré-requis Googlebot)

**Files:**
- Create: `scripts/gsc_inspection_prep.mjs`
- Test: Exécution du script pour vérifier les 5 URLs en direct sur le web

- [ ] **Step 1: Créer le script de diagnostic `scripts/gsc_inspection_prep.mjs`**
  Le script teste en temps réel sur les serveurs en ligne :
  - Le code statut HTTP (doit être 200 OK strict).
  - La présence de la balise `<meta name="robots" content="index, follow">`.
  - La balise `<link rel="canonical">` correcte.
  - La présence dans `public/sitemap.xml`.
  - La validité des schémas JSON-LD.
- [ ] **Step 2: Exécuter `node scripts/gsc_inspection_prep.mjs` et s'assurer que 100% des 5 URLs sont validées pour Googlebot.**

### Task 2: Déclaration des Propriétés & Procédure d'Inspection Google Search Console

- [ ] **Step 1: Vérifier la propriété dans Google Search Console**
  - Propriété Domaine `sc-domain:ty-dev.site` et/ou Préfixe d'URL `https://ty-dev.site/` et `https://ty-dev.fr/`.
- [ ] **Step 2: Soumettre le Sitemap XML**
  - Renseigner `https://ty-dev.site/sitemap.xml` dans l'onglet *Sitemaps*.
- [ ] **Step 3: Lancer l'Inspection d'URL pour chacune des 5 pages**
  - Entrer l'URL dans la barre de recherche supérieure GSC.
  - Cliquer sur **"Tester l'URL en direct"** (vérifie le rendu Googlebot en direct).
  - Cliquer sur **"Demander une indexation"**.

### Task 3: Suivi & Validation Post-Indexation

- [ ] **Step 1: Vérifier après 48h l'indexation dans Google via la commande `site:`**
  - Tester `site:ty-dev.site` et `site:ty-dev.fr` sur Google.
