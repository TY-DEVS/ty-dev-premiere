export interface ClientReviewSchema {
  authorName: string;
  reviewBody: string;
  ratingValue: number;
  datePublished: string;
  projectUrl?: string;
  instagramUrl?: string;
}

export const aggregateRatingConfig = {
  ratingValue: "4.9",
  bestRating: "5",
  worstRating: "1",
  ratingCount: "28",
  reviewCount: "10",
};

export const clientReviewsData: ClientReviewSchema[] = [
  {
    authorName: "Sol SPC Pro",
    reviewBody:
      "Merci à TY Dev pour mon site web, qui reflète un travail de haute qualité parfaitement adapté à mes besoins. Ce résultat a été possible grâce à votre patience et votre professionnalisme !",
    ratingValue: 5,
    datePublished: "2026-03-10",
    projectUrl: "https://solspcpro.fr",
    instagramUrl: "https://www.instagram.com/p/DblyPFoDnbc/",
  },
  {
    authorName: "AB Performance",
    reviewBody:
      "Équipe très professionnelle, réactivité exemplaire et livraison dans les temps. Hautement recommandé pour le développement web et SaaS.",
    ratingValue: 5,
    datePublished: "2026-03-02",
    projectUrl: "https://ab-performance.ch",
    instagramUrl: "https://www.instagram.com/p/DYZUp8Fgr7H/",
  },
  {
    authorName: "RB Car Tech",
    reviewBody:
      "Un grand merci à TY Dev pour leur dévouement et leur professionnalisme dans la conception de notre plateforme. Recommandé sans hésiter.",
    ratingValue: 5,
    datePublished: "2026-02-18",
    projectUrl: "https://rbcartech-carplay.ch",
    instagramUrl: "https://www.instagram.com/p/DWi0fpAgIkS/",
  },
  {
    authorName: "AA Motors",
    reviewBody:
      "Superbe réalisation pour notre vitrine automobile. Excellente communication et respect total du cahier des charges.",
    ratingValue: 5,
    datePublished: "2026-02-12",
    projectUrl: "https://aa-motors.fr",
    instagramUrl: "https://www.instagram.com/p/DTQxenZDu-8/",
  },
  {
    authorName: "Bukowina Elite Car",
    reviewBody:
      "Travail d'excellence. Rapidité et efficacité maximales. Je recommande à 100%, les meilleurs ingénieurs dans leur domaine.",
    ratingValue: 5,
    datePublished: "2026-02-05",
    projectUrl: "https://luxurycartransport24.com",
    instagramUrl: "https://www.instagram.com/p/DRXVoeMAHiG/",
  },
  {
    authorName: "Palermo's Cleaning",
    reviewBody:
      "Merci pour la création de notre site web ! Une équipe disponible, à l'écoute et très professionnelle. Le site correspond exactement à nos attentes.",
    ratingValue: 5,
    datePublished: "2026-01-20",
    projectUrl: "https://www.PalermosCleaning.com",
    instagramUrl: "https://www.instagram.com/p/DQSfM3PCNrw/",
  },
  {
    authorName: "Structiba BTP",
    reviewBody:
      "Excellente prestation pour notre entreprise de bâtiment. Interface moderne, fluide et génération de devis efficace.",
    ratingValue: 5,
    datePublished: "2026-01-14",
    projectUrl: "https://structiba.fr/",
    instagramUrl: "https://www.instagram.com/p/DPLzS3OiBgt/",
  },
  {
    authorName: "ClimaBat 34",
    reviewBody:
      "Plateforme web livrée avec succès et très rapide. Nos clients nous trouvent facilement et le design est très soigné.",
    ratingValue: 5,
    datePublished: "2026-01-08",
    projectUrl: "https://www.climabat34.fr",
    instagramUrl: "https://www.instagram.com/p/DPEhfquCLfN/",
  },
];

export function getAggregateRatingSchema() {
  return {
    "@type": "AggregateRating",
    ratingValue: aggregateRatingConfig.ratingValue,
    bestRating: aggregateRatingConfig.bestRating,
    worstRating: aggregateRatingConfig.worstRating,
    ratingCount: aggregateRatingConfig.ratingCount,
    reviewCount: aggregateRatingConfig.reviewCount,
  };
}

export function getReviewsSchemaList() {
  return clientReviewsData.map((rev) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: rev.authorName,
    },
    datePublished: rev.datePublished,
    reviewBody: rev.reviewBody,
    reviewRating: {
      "@type": "Rating",
      ratingValue: rev.ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
  }));
}
