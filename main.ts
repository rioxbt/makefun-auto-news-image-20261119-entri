// Sum up 19 November's world news in one image — make.fun bounty news-image-20261119.
//
// Node 22, standard library only, no network. The entry image lives beside this
// file as entry.png (1024x1024 PNG, well under the 1 MiB cap); this program
// writes those bytes to /output/entry.png, the one path the grader reads. It
// copies fixed bytes, so the two grading runs stay byte-identical.
//
// It first checks the bytes against the competition gate (a whole PNG or JPEG,
// at most 1 MiB, at most 1024x1024), so a bad image names its reason here rather
// than scoring 0 silently. The check only reads the file: the bytes written are
// exactly the source bytes, unchanged.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const MAX_BYTES = 1048576; // 1 MiB
const MAX_SIDE = 1024; // pixels per side

// Tell the two whole-image formats apart by their first bytes, and read a PNG's
// width and height from its IHDR chunk (bytes 16..24) the way the gate does.
function describeImage(bytes) {
  const isPng = bytes.length >= 24 &&
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47;
  if (isPng) {
    return { format: 'PNG', width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  }
  const isJpeg = bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (isJpeg) return { format: 'JPEG', width: null, height: null };
  return null;
}

const sourceDir = dirname(fileURLToPath(import.meta.url));
const imagePath = join(sourceDir, 'entry.png');
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const targetPath = join(outputDir, 'entry.png');

const image = readFileSync(imagePath);
const described = describeImage(image);

if (!described) throw new Error('entry.png is not a whole PNG or JPEG');
if (image.length > MAX_BYTES) throw new Error(`entry.png is ${image.length} bytes, over 1 MiB`);
for (const side of [described.width, described.height]) {
  if (side !== null && side > MAX_SIDE) throw new Error(`entry.png is ${side}px on a side, over ${MAX_SIDE}px`);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(targetPath, image);

const sha256 = createHash('sha256').update(image).digest('hex');
const size = described.width ? `${described.width}x${described.height}` : 'size in file';
console.log(`${described.format} ${size}, ${image.length} bytes, sha256 ${sha256} -> ${targetPath}`);
