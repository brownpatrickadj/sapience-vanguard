import Link from "next/link";
import { type ButtonHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-accent text-accent-ink hover:bg-accent-bright",
  secondary:
    "bg-canvas-panel text-ink border border-line hover:border-accent/60 hover:text-accent-bright",
  ghost: "text-ink-muted hover:text-ink",
};

type Variant = keyof typeof variants;

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
