const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = `C:\\Users\\Yassine\\.gemini\\antigravity-ide\\brain\\4d522c48-a292-473b-915a-87325b641bf3`;
const targetDir = path.join(__dirname, '..', 'public', 'portfolio');

const newDemos9 = [
  { src: 'inside_car_hero_1786373579291.png', dest: 'inside-car.demo.ty-dev.site_.webp' },
  { src: 'jrackz_autosales_hero_1786373636071.png', dest: 'jrackzautosales.demo.ty-dev.site_.webp' },
  { src: 'jtb_deco_hero_1786373666545.png', dest: 'jtb-deco.demo.ty-dev.site_.webp' },
  { src: 'km_nettoyage_hero_1786373728324.png', dest: 'km-nettoyage.demo.ty-dev.site_.webp' },
  { src: 'knights_detailing_hero_1786374658384.png', dest: 'knightsdetailing.demo.ty-dev.site_.webp' },
  { src: 'light_luxury_hero_1786374723876.png', dest: 'light-luxery.demo.ty-dev.site_.webp' },
  { src: 'lustra_auto_hero_1786374744571.png', dest: 'lustra-auto.demo.ty-dev.site_.webp' },
  { src: 'pristine_luxury_hero_1786374767969.png', dest: 'luxury-cleaning-services.demo.ty-dev.site_.webp' },
  { src: 'magic_clean_hero_1786374804695.png', dest: 'magic-clean-auto.demo.ty-dev.site_.webp' },
];

async function convert() {
  for (const item of newDemos9) {
    const srcPath = path.join(brainDir, item.src);
    const destPath = path.join(targetDir, item.dest);

    if (fs.existsSync(srcPath)) {
      await sharp(srcPath)
        .webp({ quality: 85 })
        .toFile(destPath);
      console.log(`Converted ${item.src} -> ${item.dest}`);
    } else {
      console.error(`Source file not found: ${srcPath}`);
    }
  }
}

convert().catch(console.error);
