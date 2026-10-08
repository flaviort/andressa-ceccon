import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Satori (next/og) has no bold weight of its own, so the site font ships here.
// Only this folder is read, which keeps build tracing small.
const dir = join(process.cwd(), "src/assets/fonts");

// Cached so image routes prerender at build time under Cache Components.
// Strings cross the cache boundary safely, so files travel as base64.
export async function readAsset(path: string) {
  "use cache";
  return (await readFile(path)).toString("base64");
}

export async function ogFonts() {
  const [regular, semibold] = await Promise.all([
    readAsset(join(dir, "inter-tight-latin-400.woff")),
    readAsset(join(dir, "inter-tight-latin-600.woff")),
  ]);
  return [
    { name: "Inter Tight", data: Buffer.from(regular, "base64"), weight: 400 as const, style: "normal" as const },
    { name: "Inter Tight", data: Buffer.from(semibold, "base64"), weight: 600 as const, style: "normal" as const },
  ];
}
