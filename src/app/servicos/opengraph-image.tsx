import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Serviços de Direito Previdenciário";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: "Um direito para cada etapa da vida.", label: "Serviços", photo: "/images/idade.jpg" });
}
