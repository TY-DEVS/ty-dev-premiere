const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = `C:\\Users\\Yassine\\.gemini\\antigravity-ide\\brain\\4d522c48-a292-473b-915a-87325b641bf3`;
const targetDir = path.join(__dirname, '..', 'public', 'portfolio');

const newDemos5 = [
  { src: 'stone_diamond_1786376267598.png', dest: 'stone-diamond-group.demo.ty-dev.site_.webp' },
  { src: 'swiss_elite_conciergerie_1786376291557.png', dest: 'swiss-elite-conciergerie.demo.ty-dev.site_.webp' },
  { src: 'swiss_habitat_1786376342521.png', dest: 'swiss-habitat.demo.ty-dev.site_.webp' },
  { src: 'sylvester_mobile_detailing_1786376358731.png', dest: 'sylvester-mobile-detailing.ty-dev.site_.webp' },
  { src: 'glazone_1786376375061.png', dest: 'glazone.ty-dev.site_.webp' },
];

async function convert() {
  for (const item of newDemos5) {
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
