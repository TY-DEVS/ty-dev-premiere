const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'i18n', 'translations.ts');
let content = fs.readFileSync(filePath, 'utf8');

const targetOrderUrls = [
  'https://amglux-rentals.demo.ty-dev.site/',
  'https://jtb-deco.demo.ty-dev.site/',
  'https://riviera-lux.demo.ty-dev.site/',
  'https://luxury-cleaning-services.demo.ty-dev.site/',
  'https://swiss-elite-conciergerie.demo.ty-dev.site/',
  'https://glazone.ty-dev.site/',
  'https://wim.ty-dev.site/',
  'https://stone-diamond-group.demo.ty-dev.site/'
];

// Helper to sort an array of item objects by targetOrderUrls first, then keep the rest
function sortDemoItems(items) {
  const mapByUrl = new Map();
  items.forEach(item => {
    mapByUrl.set(item.url.trim(), item);
  });

  const ordered = [];
  targetOrderUrls.forEach(url => {
    if (mapByUrl.has(url)) {
      ordered.push(mapByUrl.get(url));
      mapByUrl.delete(url);
    }
  });

  // Add the remaining items
  for (const item of mapByUrl.values()) {
    ordered.push(item);
  }

  return ordered;
}

console.log('Script prepared to reorder demo items.');
