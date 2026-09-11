const fs = require('node:fs');
const path = require('node:path');
const { parseArgs } = require('node:util');
const sharp = require('sharp');

const USAGE =
  'Usage: pnpm optimize-images <file|dir>... --out <dir> [--width 1600] [--quality 80] [--portrait]';
const EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const PORTRAIT_RATIO = 9 / 16;

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    out: { type: 'string' },
    width: { type: 'string', default: '1600' },
    quality: { type: 'string', default: '80' },
    portrait: { type: 'boolean', default: false },
  },
});

if (!values.out || positionals.length === 0) {
  console.error(USAGE);
  process.exit(1);
}

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

const inputs = positionals
  .flatMap((input) =>
    fs.statSync(input).isDirectory()
      ? fs.readdirSync(input).map((name) => path.join(input, name))
      : [input]
  )
  .filter((file) => EXTENSIONS.has(path.extname(file).toLowerCase()));

async function optimize(file) {
  let image = sharp(file);

  // Center-crop to 9:16 so wide renders can serve as mobile hero images.
  if (values.portrait) {
    const { width, height } = await image.metadata();
    const cropWidth =
      width / height > PORTRAIT_RATIO
        ? Math.round(height * PORTRAIT_RATIO)
        : width;
    const cropHeight =
      width / height > PORTRAIT_RATIO
        ? height
        : Math.round(width / PORTRAIT_RATIO);
    image = image.extract({
      left: Math.round((width - cropWidth) / 2),
      top: Math.round((height - cropHeight) / 2),
      width: cropWidth,
      height: cropHeight,
    });
  }

  const outFile = path.join(values.out, `${path.parse(file).name}.webp`);
  const info = await image
    .resize({ width: Number(values.width), withoutEnlargement: true })
    .webp({ quality: Number(values.quality) })
    .toFile(outFile);

  console.log(
    `${path.basename(file)} -> ${outFile}  ${info.width}x${info.height}  ${kb(fs.statSync(file).size)} -> ${kb(info.size)}`
  );
}

fs.mkdirSync(values.out, { recursive: true });

(async () => {
  for (const file of inputs) {
    await optimize(file);
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
