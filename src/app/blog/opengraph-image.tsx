import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Blog de Direito Previdenciário da Andressa Ceccon Advocacia";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: "Blog", label: "Direito previdenciário", photo: "/images/calculos.jpg" });
}
