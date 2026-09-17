type IconProps = { name: string; accent: string; className?: string };

const shared = {
  fill: "none",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ProductIcon({ name, accent, className = "h-6 w-6" }: IconProps) {
  switch (name) {
    case "Sapience Adjusting":
      return (
        <svg viewBox="0 0 24 24" stroke={accent} className={className} {...shared}>
          <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case "SnapDocs":
      return (
        <svg viewBox="0 0 24 24" stroke={accent} className={className} {...shared}>
          <path d="M4 8a2 2 0 0 1 2-2h1.2l.9-1.5a1 1 0 0 1 .86-.5h4.08a1 1 0 0 1 .86.5L14.8 6H16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" />
          <circle cx="11" cy="13" r="3.2" />
        </svg>
      );
    case "RebelLedger":
      return (
        <svg viewBox="0 0 24 24" stroke={accent} className={className} {...shared}>
          <path d="M5 20V11" />
          <path d="M11 20V5" />
          <path d="M17 20v-8" />
        </svg>
      );
    case "Forge Reports":
      return (
        <svg viewBox="0 0 24 24" stroke={accent} className={className} {...shared}>
          <path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
          <path d="M14 3v4h4" />
          <path d="M9 12.5h6M9 15.5h6M9 18.5h3" />
        </svg>
      );
    case "Wheelhouse":
      return (
        <svg viewBox="0 0 24 24" stroke={accent} className={className} {...shared}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2" />
          <path d="M12 4v4M12 16v4M4 12h4M16 12h4" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" stroke={accent} className={className} {...shared}>
          <path d="M12 3l7 5-2.7 8.5H7.7L5 8l7-5z" />
        </svg>
      );
  }
}