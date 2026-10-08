import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ogFonts, readAsset } from "@/lib/og-fonts";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Shared 1200x630 share card: page photo under a dark overlay, wordmark,
 * mono label and a bold title. `photo` is a path inside /public.
 */
export async function renderOg({
  title,
  label,
  photo,
  position = "center",
}: {
  title: string;
  label: string;
  photo: string;
  /** CSS object-position for the photo crop. */
  position?: string;
}) {
  const [data, fonts] = await Promise.all([readAsset(join(process.cwd(), "public", photo)), ogFonts()]);
  const src = `data:image/jpeg;base64,${data}`;
  const size = title.length > 34 ? 76 : 96;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#010101", fontFamily: "Inter Tight" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover", objectPosition: position, width: 1200, height: 630 }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(1,1,1,0.55) 0%, rgba(1,1,1,0.35) 40%, rgba(1,1,1,0.92) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: 64,
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", fontSize: 26, letterSpacing: 2, textTransform: "uppercase" }}>
            <b>Andressa</b>
            <span>Ceccon</span>
            <span style={{ margin: "0 16px", opacity: 0.5 }}>|</span>
            <b>AC</b>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 22, letterSpacing: 3, textTransform: "uppercase", opacity: 0.7, marginBottom: 20 }}>{label}</span>
            <span style={{ fontSize: size, fontWeight: 700, letterSpacing: -4, lineHeight: 0.92, maxWidth: 1000 }}>{title}</span>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
