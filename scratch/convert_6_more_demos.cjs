const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = `C:\\Users\\Yassine\\.gemini\\antigravity-ide\\brain\\4d522c48-a292-473b-915a-87325b641bf3`;
const targetDir = path.join(__dirname, '..', 'public', 'portfolio');

const newDemos6 = [
  { src: 'riviera_lux_hero_1786375533588.png', dest: 'riviera-lux.demo.ty-dev.site_.webp' },
  { src: 'mmh_compagnie_hero_1786375574673.png', dest: 'mmh-compagnie.demo.ty-dev.site_.webp' },
  { src: 'ms_plomberie_hero_v2_1786375656209.png', dest: 'ms-plomberie-carrelage.demo.ty-dev.site_.webp' },
  { src: 'phonefix_971_hero_1786375692362.png', dest: 'phonefix971.demo.ty-dev.site_.webp' },
  { src: 'pj_graphics_hero_1786375750044.png', dest: 'pj-graphics.demo.ty-dev.site_.webp' },
  { src: 'protech_autocare_hero_1786376011392.png', dest: 'pro-tech-auto-care-detailing.demo.ty-dev.site_.webp' },
];

async function convert() {
  for (const item of newDemos6) {
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
