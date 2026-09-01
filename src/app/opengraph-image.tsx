import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "SOLVEEK — Digital Growth Partner. Build. Connect. Grow.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoBytes = await readFile(
    join(process.cwd(), "public/solveek-logo.png")
  );
  const logoSrc = `data:image/png;base64,${logoBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070b14",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(19,88,254,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(19,88,254,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            bottom: -160,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(19,88,254,0.35) 0%, rgba(19,88,254,0) 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img
            src={logoSrc}
            width={72}
            height={72}
            alt=""
            style={{ objectFit: "contain" }}
          />
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.28em",
              color: "#ffffff",
              fontWeight: 700,
            }}
          >
            SOLVEEK
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              color: "#ffffff",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Build. Connect. Grow.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#9eb0d4",
              maxWidth: 780,
              lineHeight: 1.35,
            }}
          >
            Digital systems for businesses ready to grow.
          </div>
          <div
            style={{
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                height: 10,
                width: 10,
                borderRadius: 9999,
                background: "#1358FE",
              }}
            />
            <div style={{ fontSize: 22, color: "#1358FE", fontWeight: 600 }}>
              Digital Growth Partner
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#6b7a99",
            fontSize: 22,
          }}
        >
          <div>www.solveek.com</div>
          <div>Let&apos;s Talk Growth</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
