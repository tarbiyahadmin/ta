/**
 * Optimize local photography + textures for production.
 *
 * Reads sources from:
 *   - src/assets/mqi-images/* (raw camera photos)
 *   - src/assets/grain.jpg
 *   - src/assets/arabic.svg, icon.svg
 *
 * Writes optimized outputs to:
 *   - src/assets/images/photos/{name}-w{width}.webp
 *   - src/assets/images/textures/grain.webp
 *   - src/assets/images/svg/*.svg (SVGO)
 *   - src/assets/images/manifest.json (sizes + metadata)
 *
 * Usage: node scripts/optimize-images.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { optimize as optimizeSvg } from "svgo";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sourcePhotosDir = path.join(root, "src", "assets", "mqi-images");
const outRoot = path.join(root, "src", "assets", "images");
const outPhotos = path.join(outRoot, "photos");
const outTextures = path.join(outRoot, "textures");
const outSvg = path.join(outRoot, "svg");

/** Responsive breakpoints matching site usage (hero / editorial / cards). */
const PHOTO_WIDTHS = [400, 700, 1200, 1800];
const WEBP_QUALITY = 86;

/** Sources kept as masters but not emitted into production image set. */
const SKIP_PHOTO_SOURCES = new Set(["IMG_8961.jpeg", "IMG_8991.jpeg"]);

const PHOTO_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"]);

function slugify(filename) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
}

async function ensureDirs() {
  await fs.mkdir(outPhotos, { recursive: true });
  await fs.mkdir(outTextures, { recursive: true });
  await fs.mkdir(outSvg, { recursive: true });
}

async function fileSize(filePath) {
  try {
    const s = await fs.stat(filePath);
    return s.size;
  } catch {
    return 0;
  }
}

async function optimizePhotos() {
  const entries = await fs.readdir(sourcePhotosDir);
  const photos = entries.filter(
    (f) => PHOTO_EXTS.has(path.extname(f).toLowerCase()) && !SKIP_PHOTO_SOURCES.has(f),
  );
  const results = [];

  for (const file of photos) {
    const inputPath = path.join(sourcePhotosDir, file);
    const before = await fileSize(inputPath);
    const slug = slugify(file);
    const image = sharp(inputPath, { failOn: "none" }).rotate();
    const meta = await image.metadata();
    const intrinsicW = meta.width ?? 0;
    const intrinsicH = meta.height ?? 0;

    const variants = [];
    for (const width of PHOTO_WIDTHS) {
      const targetW = Math.min(width, intrinsicW || width);
      const outName = `${slug}-w${width}.webp`;
      const outPath = path.join(outPhotos, outName);
      const pipeline = sharp(inputPath, { failOn: "none" })
        .rotate()
        .resize({
          width: targetW,
          withoutEnlargement: true,
          fit: "inside",
        })
        .webp({ quality: WEBP_QUALITY, effort: 6 });

      const info = await pipeline.toFile(outPath);
      variants.push({
        width,
        path: `photos/${outName}`,
        bytes: info.size,
        outWidth: info.width,
        outHeight: info.height,
      });
    }

    const after = variants.reduce((sum, v) => sum + v.bytes, 0);
    results.push({
      source: file,
      slug,
      beforeBytes: before,
      afterBytes: after,
      intrinsicWidth: intrinsicW,
      intrinsicHeight: intrinsicH,
      variants,
    });

    const beforeMb = (before / 1024 / 1024).toFixed(2);
    const afterKb = (after / 1024).toFixed(1);
    console.log(`✓ ${file}  ${beforeMb} MB → ${afterKb} KB (all widths)`);
  }

  return results;
}

async function optimizeGrain() {
  const inputPath = path.join(root, "src", "assets", "grain.jpg");
  const before = await fileSize(inputPath);
  const outPath = path.join(outTextures, "grain.webp");

  // Small seamless-ish tile — large enough to avoid obvious repeat, small enough for CSS backgrounds
  const info = await sharp(inputPath, { failOn: "none" })
    .resize({ width: 256, height: 256, fit: "cover" })
    .webp({ quality: 55, effort: 6 })
    .toFile(outPath);

  console.log(
    `✓ grain.jpg  ${(before / 1024 / 1024).toFixed(2)} MB → ${(info.size / 1024).toFixed(1)} KB`,
  );

  return { beforeBytes: before, afterBytes: info.size, path: "textures/grain.webp", width: info.width, height: info.height };
}

async function optimizeArabicSvg() {
  const file = "arabic.svg";
  const inputPath = path.join(root, "src", "assets", file);
  const before = await fileSize(inputPath);
  if (!before) return null;

  const raw = await fs.readFile(inputPath, "utf8");
  const { data } = optimizeSvg(raw, {
    multipass: true,
    plugins: ["preset-default"],
  });
  const outPath = path.join(outSvg, file);
  await fs.writeFile(outPath, data, "utf8");
  const after = Buffer.byteLength(data, "utf8");
  console.log(`✓ ${file}  ${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB`);
  return { source: file, beforeBytes: before, afterBytes: after, path: `svg/${file}` };
}

/**
 * icon.svg embeds a ~2000×2000 PNG as base64 — rasterize to small WebP logos instead.
 */
async function optimizeLogo() {
  const inputPath = path.join(root, "src", "assets", "icon.svg");
  const before = await fileSize(inputPath);
  if (!before) return null;

  const widths = [128, 256];
  const variants = [];
  for (const width of widths) {
    const outName = `logo-w${width}.webp`;
    const outPath = path.join(outSvg, outName);
    const info = await sharp(inputPath, { failOn: "none" })
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 90, effort: 6 })
      .toFile(outPath);
    variants.push({ width, path: `svg/${outName}`, bytes: info.size });
  }

  const after = variants.reduce((s, v) => s + v.bytes, 0);
  console.log(
    `✓ icon.svg → logo webp  ${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB`,
  );
  return {
    source: "icon.svg",
    beforeBytes: before,
    afterBytes: after,
    path: "svg/logo-w256.webp",
    variants,
  };
}

async function optimizeSvgs() {
  const results = [];
  const arabic = await optimizeArabicSvg();
  if (arabic) results.push(arabic);
  const logo = await optimizeLogo();
  if (logo) results.push(logo);
  return results;
}

async function writeManifest({ photos, grain, svgs }) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    photoWidths: PHOTO_WIDTHS,
    webpQuality: WEBP_QUALITY,
    photos: Object.fromEntries(
      photos.map((p) => [
        p.slug,
        {
          source: p.source,
          intrinsicWidth: p.intrinsicWidth,
          intrinsicHeight: p.intrinsicHeight,
          variants: p.variants,
        },
      ]),
    ),
    grain,
    svgs,
    totals: {
      photosBefore: photos.reduce((s, p) => s + p.beforeBytes, 0),
      photosAfter: photos.reduce((s, p) => s + p.afterBytes, 0),
      grainBefore: grain.beforeBytes,
      grainAfter: grain.afterBytes,
      svgBefore: svgs.reduce((s, x) => s + x.beforeBytes, 0),
      svgAfter: svgs.reduce((s, x) => s + x.afterBytes, 0),
    },
  };

  const outPath = path.join(outRoot, "manifest.json");
  await fs.writeFile(outPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`\nWrote ${path.relative(root, outPath)}`);

  const t = manifest.totals;
  const photoSave = ((1 - t.photosAfter / t.photosBefore) * 100).toFixed(1);
  console.log(
    `\nPhotos: ${(t.photosBefore / 1024 / 1024).toFixed(1)} MB → ${(t.photosAfter / 1024 / 1024).toFixed(2)} MB (−${photoSave}%)`,
  );
  console.log(
    `Grain:  ${(t.grainBefore / 1024 / 1024).toFixed(2)} MB → ${(t.grainAfter / 1024).toFixed(1)} KB`,
  );
  console.log(`SVGs:  ${(t.svgBefore / 1024).toFixed(1)} KB → ${(t.svgAfter / 1024).toFixed(1)} KB`);
}

async function main() {
  console.log("Optimizing local images…\n");
  await ensureDirs();
  const photos = await optimizePhotos();
  const grain = await optimizeGrain();
  const svgs = await optimizeSvgs();
  await writeManifest({ photos, grain, svgs });
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
