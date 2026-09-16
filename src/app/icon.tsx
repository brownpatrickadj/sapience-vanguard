import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0b0c",
          borderRadius: 14,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
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
      </div>
    ),
    { ...size }
  );
}