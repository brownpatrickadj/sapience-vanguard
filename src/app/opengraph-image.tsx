import { ImageResponse } from "next/og";

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
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0a0b0c",
          backgroundImage:
            "radial-gradient(1100px 550px at 15% -10%, rgba(255,90,31,0.14), transparent 60%), radial-gradient(900px 500px at 100% 10%, rgba(255,90,31,0.07), transparent 55%)",
          padding: "0 96px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 44 }}>
          <svg width="52" height="52" viewBox="0 0 48 48" fill="none">
            <path
              d="M6 34 L18 24 L6 14"
              stroke="#5c6063"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
            />
            <path
              d="M15 34 L27 24 L15 14"
              stroke="#ff7a45"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.8"
            />
            <path
              d="M24 34 L36 24 L24 14"
              stroke="#ff5a1f"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="38.5" cy="24" r="3.2" fill="#ff7a45" />
          </svg>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#f1efe8" }}>
            Sapience Vanguard
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#f1efe8",
            maxWidth: 980,
          }}
        >
          Software should learn the business.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#ff5a1f",
            maxWidth: 980,
            marginBottom: 36,
          }}
        >
          Not the other way around.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#9a9d9f", maxWidth: 760 }}>
          Intelligence software for business owners, freelancers, and independent professionals.
        </div>
      </div>
    ),
    { ...size }
  );
}