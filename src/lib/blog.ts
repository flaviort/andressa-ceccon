import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parsePost, type Post } from "@/lib/blog-parse";

export type { Post };

const DIR = join(process.cwd(), "src/content/blog");

// Read once at module scope. Cache Components treats readFileSync as
// predictable, so the posts land in the static shell at build time. A broken
// post fails the build with the message from parsePost.
export const posts: Post[] = readdirSync(DIR)
  .filter((f) => f.endsWith(".md"))
  .map((f) => parsePost(f.slice(0, -3), readFileSync(join(DIR, f), "utf8")))
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
