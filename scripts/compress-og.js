const sharp = require('sharp');
const path = require('path');

const src = path.join(__dirname, '..', 'public', 'wcssc-og.png');
const dest = path.join(__dirname, '..', 'public', 'wcssc-og-compressed.jpg');

sharp(src)
  .resize(1200, 630, { fit: 'cover' })
  .jpeg({ quality: 82, progressive: true })
  .toFile(dest)
  .then(info => {
    console.log('Compressed OG image:', info);
    // Now replace original with compressed version as PNG
    const fs = require('fs');
    // Keep original as backup, rename compressed to main OG
    fs.renameSync(src, path.join(__dirname, '..', 'public', 'wcssc-og-original.png'));
    // Also create a WebP version
    return sharp(dest)
      .toFile(path.join(__dirname, '..', 'public', 'wcssc-og.webp'))
      .then(webpInfo => {
        console.log('WebP version:', webpInfo);
        // Rename jpg to png path for backward compat
        fs.copyFileSync(dest, src.replace('.png', '.jpg'));
        console.log('Done! Original backed up as wcssc-og-original.png');
      });
  })
  .catch(err => console.error('Error:', err));
