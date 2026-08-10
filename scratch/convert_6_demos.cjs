const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = `C:\\Users\\Yassine\\.gemini\\antigravity-ide\\brain\\4d522c48-a292-473b-915a-87325b641bf3`;
const targetDir = path.join(__dirname, '..', 'public', 'portfolio');

const newDemos = [
  { src: 'creajardin_74_1786372003456.png', dest: 'creajardin-74.demo.ty-dev.site_.webp' },
  { src: 'mobile_detailing_dr_1786372057487.png', dest: 'mobile-detailing-dr.demo.ty-dev.site_.webp' },
  { src: 'by_zeee_1786372076355.png', dest: 'by-zeee.demo.ty-dev.site_.webp' },
  { src: 'ciel_etoile_95_1786372099851.png', dest: 'ciel-etoile-95.demo.ty-dev.site_.webp' },
  { src: 'clean_strike_unit_1786372117827.png', dest: 'clean-strike-unit.demo.ty-dev.site_.webp' },
  { src: 'clean_tiq_1786372133789.png', dest: 'clean-tiq.demo.ty-dev.site_.webp' },
];

async function convert() {
  for (const item of newDemos) {
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
