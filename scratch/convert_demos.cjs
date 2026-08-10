const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = `C:\\Users\\Yassine\\.gemini\\antigravity-ide\\brain\\4d522c48-a292-473b-915a-87325b641bf3`;
const targetDir = path.join(__dirname, '..', 'public', 'portfolio');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const demos = [
  { src: 'amglux_rentals_1786369231899.png', dest: 'amglux-rentals.demo.ty-dev.site_.webp' },
  { src: 'automoto_detailing_1786369218302.png', dest: 'automoto-detailing.demo.ty-dev.site_.webp' },
  { src: 'azx_detailing_1786369311813.png', dest: 'azx-detailing.demo.ty-dev.site_.webp' },
  { src: 'brillautomaison83_1786369333785.png', dest: 'brillautomaison83.demo.ty-dev.site_.webp' },
  { src: 'autoliefern_1786369361880.png', dest: 'autoliefern.demo.ty-dev.site_.webp' },
];

async function convert() {
  for (const item of demos) {
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
