import { ImageResponse } from "next/og";
import { MONOGRAM_A, MONOGRAM_C, MONOGRAM_C_SHIFT, MONOGRAM_RATIO, MONOGRAM_VIEWBOX } from "@/components/ui/logo-paths";

/** Gold "ac" monogram (from the original logotype) on navy, inside the maskable safe zone. */
export async function renderIcon(px: number) {
  const w = px * 0.56;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1b2848" }}>
        <svg viewBox={MONOGRAM_VIEWBOX} width={w} height={w / MONOGRAM_RATIO} fill="#d4c09a">
          <path d={MONOGRAM_A} />
          <path d={MONOGRAM_C} transform={`translate(${MONOGRAM_C_SHIFT} 0)`} />
        </svg>
      </div>
    ),
    { width: px, height: px },
  );
}
