import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    posts: collection({
      label: 'Articles de Blog',
      slugField: 'slug',
      path: 'content/posts/*/',
      format: { data: 'json' },
      schema: {
        slug: fields.slug({ name: { label: 'Identifiant URL (Slug)' } }),
        title_fr: fields.text({ label: 'Titre (Français)' }),
        title_en: fields.text({ label: 'Titre (Anglais)' }),
        summary_fr: fields.text({ label: 'Résumé (Français)', multiline: true }),
        summary_en: fields.text({ label: 'Résumé (Anglais)', multiline: true }),
        category: fields.text({ label: 'Catégorie' }),
        date_fr: fields.text({ label: 'Date affichée (FR)' }),
        date_en: fields.text({ label: 'Date affichée (EN)' }),
        date_iso: fields.text({ label: 'Date ISO (YYYY-MM-DD)' }),
        author_name: fields.text({ label: "Nom de l'auteur" }),
        author_role: fields.text({ label: "Rôle de l'auteur" }),
        author_avatar: fields.text({ label: "Avatar de l'auteur (URL)" }),
        author_slug: fields.text({ label: 'Slug profil auteur' }),
        image: fields.text({ label: 'Image principale (URL)' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags' }),
        content_fr: fields.markdoc({ label: 'Contenu complet (Français)' }),
        content_en: fields.markdoc({ label: 'Contenu complet (Anglais)' }),
      },
    }),
  },
});
