import http from 'k6/http';
import { check, sleep } from 'k6';

// k6 Load Test Configuration for TY Dev
export const options = {
  stages: [
    { duration: '3s', target: 5 },   // Montée en charge progressive à 5 utilisateurs simultanés
    { duration: '12s', target: 12 }, // Charge soutenue à 12 utilisateurs simultanés
    { duration: '3s', target: 0 },   // Descente
  ],
  thresholds: {
    // 99% des requêtes doivent réussir (0 erreur HTTP)
    http_req_failed: ['rate<0.01'],
    // 95% des requêtes sous 3500ms en mode dev sans bundling production
    http_req_duration: ['p(95)<3500'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';

export default function () {
  const routes = [
    { url: `${BASE_URL}/`, name: 'Home' },
    { url: `${BASE_URL}/services`, name: 'Services Hub' },
    { url: `${BASE_URL}/services/saas-transport-logistique`, name: 'P1: Transport & Logistique' },
    { url: `${BASE_URL}/services/saas-immobilier-conciergerie`, name: 'P1: PropTech & Conciergerie' },
    { url: `${BASE_URL}/services/saas-e-commerce-b2b`, name: 'P1: E-Commerce B2B' },
    { url: `${BASE_URL}/blog`, name: 'Blog Index' },
    { url: `${BASE_URL}/blog/cout-mvp-saas-tarifs-budget-guide-complet-2026`, name: 'P7: Coût MVP SaaS' },
    { url: `${BASE_URL}/blog/developpement-saas-sur-mesure-vs-no-code-bubble-flutterflow-2026`, name: 'P4: SaaS vs No-Code' },
    { url: `${BASE_URL}/blog/agence-tech-france-vs-offshore-comparatif-couts-qualite-2026`, name: 'P4: Agence France vs Offshore' },
    { url: `${BASE_URL}/portfolio`, name: 'Portfolio Hub' },
    { url: `${BASE_URL}/projets/navicab`, name: 'P5: Case Study NaviCab' },
    { url: `${BASE_URL}/contact`, name: 'Contact' },
    { url: `${BASE_URL}/simulateur`, name: 'P2: Simulateur Devis' },
    { url: `${BASE_URL}/sitemap.xml`, name: 'Sitemap XML' },
  ];

  // Pick a random route per iteration to simulate realistic user browsing
  const target = routes[Math.floor(Math.random() * routes.length)];
  const res = http.get(target.url, {
    headers: {
      'User-Agent': 'k6-load-test-tydev/1.0',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
    },
  });

  check(res, {
    [`${target.name} status is 200`]: (r) => r.status === 200,
    [`${target.name} response time < 3500ms`]: (r) => r.timings.duration < 3500,
    [`${target.name} has content`]: (r) => r.body && r.body.length > 500,
  });

  sleep(0.5);
}
