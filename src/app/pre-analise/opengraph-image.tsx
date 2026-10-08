import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Pré-análise previdenciária";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: "Descubra quais regras se aplicam a você.", label: "Pré-análise", photo: "/images/maos.jpg" });
}
