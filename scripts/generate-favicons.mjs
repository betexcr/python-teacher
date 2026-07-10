import sharp from 'sharp';
import fs from 'fs';

const src = 'public/mascot.png';

const jobs = [
  { out: 'public/favicon-16.png', size: 16, bg: { r: 13, g: 17, b: 23, alpha: 1 } },
  { out: 'public/favicon-32.png', size: 32, bg: { r: 13, g: 17, b: 23, alpha: 1 } },
  { out: 'public/apple-touch-icon.png', size: 180, bg: { r: 13, g: 17, b: 23, alpha: 1 } },
  { out: 'public/icon-192.png', size: 192, bg: { r: 13, g: 17, b: 23, alpha: 1 } },
  { out: 'public/icon-512.png', size: 512, bg: { r: 13, g: 17, b: 23, alpha: 1 } },
];

for (const job of jobs) {
  await sharp(src)
    .resize(job.size, job.size, { fit: 'contain', background: job.bg })
    .png({ compressionLevel: 9 })
    .toFile(job.out);
  console.log(job.out, fs.statSync(job.out).size);
}

const png16 = await sharp(src)
  .resize(16, 16, { fit: 'contain', background: { r: 13, g: 17, b: 23, alpha: 1 } })
  .png()
  .toBuffer();
const png32 = await sharp(src)
  .resize(32, 32, { fit: 'contain', background: { r: 13, g: 17, b: 23, alpha: 1 } })
  .png()
  .toBuffer();

function icoFromPngs(pngs, dims) {
  const count = pngs.length;
  const headerSize = 6 + 16 * count;
  let offset = headerSize;
  const entries = [];
  for (let i = 0; i < count; i++) {
    entries.push({ w: dims[i], size: pngs[i].length, offset });
    offset += pngs[i].length;
  }
  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(count, 4);
  for (let i = 0; i < count; i++) {
    const e = entries[i];
    const o = 6 + i * 16;
    buf.writeUInt8(e.w >= 256 ? 0 : e.w, o);
    buf.writeUInt8(e.w >= 256 ? 0 : e.w, o + 1);
    buf.writeUInt8(0, o + 2);
    buf.writeUInt8(0, o + 3);
    buf.writeUInt16LE(1, o + 4);
    buf.writeUInt16LE(32, o + 6);
    buf.writeUInt32LE(e.size, o + 8);
    buf.writeUInt32LE(e.offset, o + 12);
    pngs[i].copy(buf, e.offset);
  }
  return buf;
}

fs.writeFileSync('public/favicon.ico', icoFromPngs([png16, png32], [16, 32]));
console.log('public/favicon.ico', fs.statSync('public/favicon.ico').size);
console.log('favicon set ready');
