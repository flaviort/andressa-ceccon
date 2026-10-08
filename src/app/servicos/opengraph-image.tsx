import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Serviços de Direito Previdenciário";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: "Benefícios do INSS para cada fase da vida.", label: "Serviços", photo: "/images/idade.jpg" });
}
