import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, '..', 'public', 'icons');

// Create output dir if not exists
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

async function generateIcon(size, filename) {
  // Create SVG with "JGC" text
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FFD700;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size*0.22}" fill="#1E3A5A"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" 
        font-family="Arial, Helvetica, sans-serif" font-weight="bold" 
        font-size="${size*0.35}px" fill="url(#grad)">JGC</text>
</svg>`;

  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(path.join(outputDir, filename));
  console.log(`Generated ${filename} (${size}x${size})`);
}

async function main() {
  // Standard PWA icons
  await generateIcon(192, 'icon-192x192.png');
  await generateIcon(512, 'icon-512x512.png');
  
  // Apple touch icons
  await generateIcon(180, 'apple-touch-icon-180x180.png');
  await generateIcon(152, 'apple-touch-icon-152x152.png');
  await generateIcon(120, 'apple-touch-icon-120x120.png');
  await generateIcon(76, 'apple-touch-icon-76x76.png');
  
  // Favicon (large for conversion)
  await generateIcon(48, 'favicon.png');
  
  console.log('All icons generated successfully!');
}

main().catch(console.error);
