const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const brainDir = `C:\\Users\\Yassine\\.gemini\\antigravity-ide\\brain\\4d522c48-a292-473b-915a-87325b641bf3`;
const targetDir = path.join(__dirname, '..', 'public', 'portfolio');

const newDemos8 = [
  { src: 'dream_luxury_transfers_1786372695421.png', dest: 'dream-luxury-transfers.demo.ty-dev.site_.webp' },
  { src: 'drivehub_spark_1786372797295.png', dest: 'drivehub-spark.demo.ty-dev.site_.webp' },
  { src: 'eclatautobyomarjee_1786372830916.png', dest: 'eclatautobyomarjee.demo.ty-dev.site_.webp' },
  { src: 'gd_gentleman_driver_1786372912638.png', dest: 'gd-gentleman-driver.demo.ty-dev.site_.webp' },
  { src: 'gr_pro_1786372989006.png', dest: 'gr-pro.demo.ty-dev.site_.webp' },
  { src: 'gsn_renov_1786373057892.png', dest: 'gsn-renov.demo.ty-dev.site_.webp' },
  { src: 'gsn_renovation_1786373142924.png', dest: 'gsn-renovation.demo.ty-dev.site_.webp' },
  { src: 'id_cars_detailing_1786373221927.png', dest: 'id-cars-detailing.demo.ty-dev.site_.webp' },
];

async function convert() {
  for (const item of newDemos8) {
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
