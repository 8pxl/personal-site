// Downsizes + re-encodes images in place so camera exports don't ship as-is.
// next/image resizes per request, but it still has to decode the full source
// on every cache miss, and the originals bloat the repo and deploy.
//
// Usage: node scripts/optimize-images.mjs [dir-or-file ...]
// Defaults to public/photos. Safe to re-run: a file is only rewritten when the
// result is meaningfully smaller, so already-optimized images are left alone.
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const MAX_EDGE = 2560;
const QUALITY = 82;
// Re-encoding an already-optimized JPEG barely shrinks it but still costs
// quality; require a real saving before overwriting.
const MIN_SAVING = 0.15;

const exts = new Set([".jpg", ".jpeg", ".png"]);

function collect(target) {
  const abs = path.resolve(repoRoot, target);
  if (!fs.existsSync(abs)) return [];
  if (fs.statSync(abs).isFile()) return [abs];
  return fs
    .readdirSync(abs, { withFileTypes: true })
    .filter((d) => d.isFile() && exts.has(path.extname(d.name).toLowerCase()))
    .map((d) => path.join(abs, d.name));
}

const targets = process.argv.slice(2);
const files = (targets.length > 0 ? targets : ["public/photos"]).flatMap(collect);

let before = 0;
let after = 0;

for (const file of files) {
  const input = fs.readFileSync(file);
  const isPng = path.extname(file).toLowerCase() === ".png";

  // .rotate() bakes EXIF orientation into the pixels, since metadata
  // (including GPS) is stripped from the output.
  const output = await sharp(input)
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer();

  before += input.length;
  const rel = path.relative(repoRoot, file);
  if (!isPng && output.length > input.length * (1 - MIN_SAVING)) {
    after += input.length;
    console.log(`skip  ${rel}`);
    continue;
  }

  const outFile = isPng ? file.replace(/\.png$/i, ".jpg") : file;
  fs.writeFileSync(outFile, output);
  if (outFile !== file) fs.unlinkSync(file);
  after += output.length;
  const kb = (n) => `${Math.round(n / 1024)}KB`;
  console.log(`wrote ${path.relative(repoRoot, outFile)}  ${kb(input.length)} -> ${kb(output.length)}`);
}

const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(`\n${files.length} files: ${mb(before)}MB -> ${mb(after)}MB`);
