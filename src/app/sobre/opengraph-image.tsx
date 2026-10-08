import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = "Dra. Andressa Ceccon em seu escritório";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ title: "Dra. Andressa Ceccon", label: "O escritório", photo: "/images/andressa.jpg", position: "center 18%" });
}
