import { getPost, posts } from "@/lib/blog";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Post do blog da Andressa Ceccon Advocacia";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug) ?? posts[0];
  return renderOg({ title: post.title, label: "Blog", photo: post.cover });
}
