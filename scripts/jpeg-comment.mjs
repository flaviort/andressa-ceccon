#!/usr/bin/env node
// Reads and writes the image origin kept in the JPEG comment (COM segment).
// Usage: npm run tag-image -- public/images/blog/foo.jpg "Pexels 1234567 (https://www.pexels.com/photo/1234567/), Pexels License. Resized."
import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const COM = 0xfe;
const SOS = 0xda;

function segments(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error("O arquivo não é um JPEG.");
  const list = [];
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) throw new Error("JPEG inválido.");
    while (buf[i + 1] === 0xff) i++; // fill bytes
    const marker = buf[i + 1];
    if (marker === SOS) return { list, rest: i };
    const end = i + 2 + buf.readUInt16BE(i + 2);
    list.push({ marker, start: i, end });
    i = end;
  }
  throw new Error("JPEG sem dados de imagem.");
}

export function readJpegComments(buf) {
  return segments(buf)
    .list.filter((s) => s.marker === COM)
    .map((s) => buf.subarray(s.start + 4, s.end).toString("utf8"));
}

export function setJpegSource(buf, text) {
  const { list, rest } = segments(buf);
  const keep = list.filter(
    (s) => !(s.marker === COM && buf.subarray(s.start + 4, s.end).toString("utf8").startsWith("Source:")),
  );
  const payload = Buffer.from(`Source: ${text}`, "utf8");
  const header = Buffer.from([0xff, COM, 0, 0]);
  header.writeUInt16BE(payload.length + 2, 2);
  return Buffer.concat([
    buf.subarray(0, 2),
    ...keep.map((s) => buf.subarray(s.start, s.end)),
    header,
    payload,
    buf.subarray(rest),
  ]);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [file, text] = process.argv.slice(2);
  if (!file || !text) {
    console.error('Uso: npm run tag-image -- <arquivo.jpg> "<origem da imagem>"');
    process.exit(1);
  }
  writeFileSync(file, setJpegSource(readFileSync(file), text));
  console.log(`Origem gravada em ${file}.`);
}
