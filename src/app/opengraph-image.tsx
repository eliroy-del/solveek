import { ImageResponse } from "next/og";

export const alt = "SOLVEEK Digital Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(145deg, #081B33 0%, #0A2342 50%, #0057D9 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #0057D9, #00C2FF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            S
          </div>
          SOLVEEK
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 58, fontWeight: 700, letterSpacing: -2, lineHeight: 1.1 }}>
            We bring great ideas to life.
          </div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.75)", maxWidth: 820 }}>
            Website design, social media, e-commerce, SaaS products, and digital growth systems.
          </div>
        </div>
      </div>
    ),
    size
  );
}
