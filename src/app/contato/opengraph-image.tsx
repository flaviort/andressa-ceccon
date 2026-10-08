import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Contato do escritório Andressa Ceccon Advocacia";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: "Vamos conversar.", label: "Contato · Curitiba e online", photo: "/images/transicao.jpg" });
}
