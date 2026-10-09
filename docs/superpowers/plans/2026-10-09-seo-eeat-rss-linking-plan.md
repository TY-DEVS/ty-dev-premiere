# Plan d'Implémentation : SEO E-E-A-T, Flux RSS, Maillage Blog & Métadonnées

> **Pour l'agent :** Exécution rigoureuse avec validation TypeScript/Vite, enrichissement des tests automatisés (`scripts/test_seo_schemas.mjs`) et synchronisation sur les 3 branches (`main`, `Raouf`, `ty-dev-tn`).

**Objectif :** Finaliser les axes d'amélioration SEO et de conversion en déployant les schémas d'autorité E-E-A-T (`Person` / `ProfilePage`), la syndication RSS automatique pour Googlebot, le maillage interne profond d'articles connexes vers les services, et les métadonnées OpenGraph enrichies.

---

## Architecture des interventions

### Tâche 1 : Données structurées E-E-A-T (`Person` & `ProfilePage` & `BreadcrumbList`) sur `/team/$slug`
- **Fichier à modifier :** `src/routes/team_.$slug.tsx`
- **Détails :**
  - Injecter dans `Route.head` les balises `scripts` avec :
    - `Person` : `name`, `jobTitle`, `image`, `url`, `worksFor` (TY Dev), `sameAs` (profils LinkedIn et GitHub), `alumniOf`, `knowsAbout` (technologies maîtrisées).
    - `ProfilePage` : `@type: ProfilePage`, `mainEntity: { @id: ... }`.
    - `BreadcrumbList` : Accueil (`https://ty-dev.site`) ➔ Équipe (`https://ty-dev.site/about#team`) ➔ Profil (`https://ty-dev.site/team/$slug`).

### Tâche 2 : Métadonnées OpenGraph Article complètes sur `/blog/$slug`
- **Fichier à modifier :** `src/routes/blog_.$slug.tsx`
- **Détails :**
  - Ajouter dans `Route.head.meta` :
    - `article:published_time` (date de publication ISO)
    - `article:modified_time` (date de modification ISO)
    - `article:author` (nom de l'auteur)
    - `article:section` (catégorie de l'article)
    - `article:tag` (mots-clés / tags de l'article)
  - Permet une indexation et un affichage optimal dans Google Discover et les flux d'actualités.

### Tâche 3 : Maillage Interne "Articles Connexes & Service Relié" dans `BlogArticleDetail.tsx`
- **Fichier à modifier :** `src/components/site/BlogArticleDetail.tsx`
- **Détails :**
  - Calculer automatiquement 2 à 3 articles connexes partageant la même catégorie ou des tags communs.
  - Détecter le service commercial associé au thème de l'article (ex: SaaS ➔ `/services/saas-sur-mesure`, Refonte Web ➔ `/services/refonte-performance`, etc.) et afficher une carte d'appel à l'action contextuelle avant le pied de page.
  - Réduit le taux de rebond et transfère l'autorité SEO du blog directement vers les pages de vente / devis.

### Tâche 4 : Générateur de flux RSS 2.0 standardisé (`public/rss.xml`)
- **Fichiers à créer / modifier :**
  - Créer `scripts/generate_rss.mjs` : extrait tous les articles depuis `src/data/blogPosts.ts` et produit un fichier `public/rss.xml` conforme à la norme RSS 2.0 (titres, slugs, dates RFC-822, catégories, descriptions).
  - Modifier `package.json` : intégrer `node scripts/generate_rss.mjs` dans le script `build` et créer un script direct `"blog:rss"`.
  - Modifier `src/routes/__root.tsx` : déclarer la balise de découverte automatique du flux dans `<head>` :
    `<link rel="alternate" type="application/rss+xml" title="TY Dev Blog — Flux RSS" href="https://ty-dev.site/rss.xml" />`.

### Tâche 5 : Enrichissement des tests automatisés (`scripts/test_seo_schemas.mjs`)
- **Fichier à modifier :** `scripts/test_seo_schemas.mjs`
- **Détails :**
  - Ajouter le test du schéma `Person` / `ProfilePage` sur `/team/$slug`.
  - Ajouter le test des balises OpenGraph Article sur `/blog/$slug`.
  - Ajouter le test de génération et validité du fichier `public/rss.xml` et de son lien dans `__root.tsx`.
  - Exécuter `npm run test:seo`.

### Tâche 6 : Validation de compilation et synchronisation multi-branches
- **Actions :**
  - Exécuter `npm run build` et vérifier le code de sortie 0.
  - Commit des modifications sur `main`.
  - Fusion (fast-forward) sur `Raouf` et `ty-dev-tn`.
  - Vérification de la stricte parité entre les 3 branches.
