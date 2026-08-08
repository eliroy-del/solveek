import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "SOLVEEK Digital Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoData = await readFile(join(process.cwd(), "public/solveek-logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

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
          background: "linear-gradient(145deg, #000000 0%, #070B14 55%, #1358FE 140%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <img src={logoSrc} width={280} height={98} alt="SOLVEEK" />
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
