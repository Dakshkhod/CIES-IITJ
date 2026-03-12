/**
 * Generate circular favicon from logo.jpg
 * Run: node scripts/generate-favicon.mjs
 */
import sharp from 'sharp';
import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const logoPath = join(projectRoot, 'public', 'logo.jpg');
const publicDir = join(projectRoot, 'public');

// Circular mask SVG - creates a circle
const createCircleMask = (size) =>
  Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
    </svg>`
  );

async function generateFavicon() {
  const sizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of sizes) {
    const circular = await sharp(logoPath)
      .resize(size, size)
      .composite([
        {
          input: createCircleMask(size),
          blend: 'dest-in',
        },
      ])
      .png()
      .toBuffer();
    pngBuffers.push(circular);
    const filename = size === 16 ? 'favicon-16x16.png' : size === 32 ? 'favicon-32x32.png' : `favicon-${size}x${size}.png`;
    writeFileSync(join(publicDir, filename), circular);
  }

  // Create favicon.ico
  const toIco = (await import('to-ico')).default;
  const icoBuffer = await toIco(pngBuffers);
  writeFileSync(join(publicDir, 'favicon.ico'), icoBuffer);

  console.log('✅ Favicon generated: public/favicon.ico, public/favicon-16x16.png, etc.');
}

generateFavicon().catch((err) => {
  console.error(err);
  process.exit(1);
});
