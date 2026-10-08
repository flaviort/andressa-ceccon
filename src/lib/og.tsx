import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ANDRESSA_PATHS, CECCON_PATHS, WORDMARK_RATIO, WORDMARK_VIEWBOX } from "@/components/ui/logo-paths";
import { ogFonts, readAsset } from "@/lib/og-fonts";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const NAVY = "#1b2848";
const GOLD = "#d4c09a";
const IVORY = "#f8f6f1";

/**
 * Shared 1200x630 share card in the site palette: page photo under a navy
 * wash, the original logotype, gold tracked label and a semibold title.
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
  const size = title.length > 34 ? 72 : 88;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: NAVY, fontFamily: "Inter Tight" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          width={1200}
          height={630}
          style={{ position: "absolute", inset: 0, objectFit: "cover", objectPosition: position, width: 1200, height: 630, opacity: 0.45 }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, rgba(18,27,51,0.95) 0%, rgba(27,40,72,0.75) 55%, rgba(27,40,72,0.35) 100%)",
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
            color: IVORY,
          }}
        >
          <svg viewBox={WORDMARK_VIEWBOX} width={300} height={300 / WORDMARK_RATIO} fill={IVORY}>
            {[...ANDRESSA_PATHS, ...CECCON_PATHS].map((d) => (
              <path key={d.slice(0, 24)} d={d} />
            ))}
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 20, letterSpacing: 5, textTransform: "uppercase", color: GOLD, marginBottom: 24 }}>{label}</span>
            <span style={{ fontWeight: 600, fontSize: size, lineHeight: 0.98, letterSpacing: -3, maxWidth: 980 }}>
              {title}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
