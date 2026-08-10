const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = `C:\\Users\\Yassine\\.gemini\\antigravity-ide\\brain\\4d522c48-a292-473b-915a-87325b641bf3`;
const targetDir = path.join(__dirname, '..', 'public', 'portfolio');

const srcPath = path.join(brainDir, 'wim_1786377900434.png');
const destPath = path.join(targetDir, 'wim.ty-dev.site_.webp');

async function convert() {
  if (fs.existsSync(srcPath)) {
    await sharp(srcPath)
      .webp({ quality: 85 })
      .toFile(destPath);
    console.log(`Converted wim_1786377900434.png -> wim.ty-dev.site_.webp`);
  } else {
    console.error(`Source file not found: ${srcPath}`);
  }
}

convert().catch(console.error);
