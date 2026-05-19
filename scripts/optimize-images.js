const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directory = 'public/img/';
const targetDirectory = 'public/img/';

async function optimizeImages() {
  try {
    const files = fs.readdirSync(directory);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ext === '.png' || ext === '.jpg' || ext === '.jpeg';
    });

    console.log(`Found ${imageFiles.length} images to optimize.`);

    for (const file of imageFiles) {
      const inputPath = path.join(directory, file);
      const filename = path.parse(file).name;
      const outputPath = path.join(targetDirectory, `${filename}.webp`);

      const stats = fs.statSync(inputPath);
      const beforeSizeKiB = (stats.size / 1024).toFixed(2);

      await sharp(inputPath)
        .resize(800, null, {
          withoutEnlargement: true
        })
        .webp({ quality: 80 })
        .toFile(outputPath);

      const optimizedStats = fs.statSync(outputPath);
      const afterSizeKiB = (optimizedStats.size / 1024).toFixed(2);

      console.log(`Optimized ${file}: ${beforeSizeKiB} KiB -> ${afterSizeKiB} KiB`);

      // Remove the original source file after successful optimization
      fs.unlinkSync(inputPath);
      console.log(`Removed original file: ${file}`);
    }

    console.log('Image optimization complete.');
  } catch (err) {
    console.error('Error optimizing images:', err);
  }
}

optimizeImages();
