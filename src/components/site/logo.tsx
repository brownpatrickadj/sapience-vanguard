export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Trailing chevrons: a vanguard formation converging into a single point of insight */}
      <path d="M6 34 L18 24 L6 14" stroke="var(--ink-faint)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
      <path d="M15 34 L27 24 L15 14" stroke="var(--accent-bright)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" />
      <path d="M24 34 L36 24 L24 14" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="38.5" cy="24" r="3.2" fill="var(--accent-bright)" />
    </svg>
  );
}

export function Logo({
  className = "",
  markClassName = "h-7 w-7",
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      <span className="font-display font-semibold tracking-tight text-ink leading-none">
        Sapience Vanguard
      </span>
    </span>
  );
}
