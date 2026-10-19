import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/Logo";
import { site } from "@/config/site";

export const alt = `${site.name} — independent, human-led shopping guidance`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          color: "#F7F7F7",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <LogoMark size={60} />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>Assisted Shopping</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            Not sure what to buy?
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#FF6A00" }}>
            Talk to a real person.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#B8B8B8" }}>
          <div>Independent, paid shopping guidance</div>
          <div>Not affiliated with any retailer</div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 14, background: "#FF6A00" }} />
      </div>
    ),
    size,
  );
}
