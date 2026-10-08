import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

/** Black square with the "AC" monogram. Text stays inside the maskable safe zone. */
export async function renderIcon(px: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#010101",
          color: "#fff",
          fontSize: px * 0.42,
          fontWeight: 700,
          letterSpacing: -px * 0.03,
          fontFamily: "Inter Tight",
        }}
      >
        AC
      </div>
    ),
    { width: px, height: px, fonts: await ogFonts() },
  );
}
