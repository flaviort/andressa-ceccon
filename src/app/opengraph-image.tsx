import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Andressa Ceccon, advogada previdenciária em Curitiba";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: "Seu direito. Bem planejado.", label: "Advocacia previdenciária · OAB/PR 74.854", photo: "/video/balanca-justica.jpg" });
}
