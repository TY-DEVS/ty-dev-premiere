import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = './public/portfolio';
const files = fs.readdirSync(dir);

async function processImages() {
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.JPG')) {
      const input = path.join(dir, file);
      const outputName = file.replace(/\.(png|jpg|JPG)$/, '.webp');
      const output = path.join(dir, outputName);
      console.log(`Converting ${file} to ${outputName}`);
      
      await sharp(input)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(output);
      
      console.log(`Done converting ${file}`);
    }
  }
}

processImages().catch(console.error);
