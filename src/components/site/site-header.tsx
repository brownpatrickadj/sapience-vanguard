import Link from "next/link";
import { Logo } from "./logo";
import { Container } from "./container";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#mission", label: "Why we build" },
  { href: "/careers", label: "Careers" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-soft/80 bg-canvas/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/management/login"
          className="inline-flex items-center rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-accent/60 hover:text-ink"
        >
          Log in
        </Link>
      </Container>
    </header>
  );
}
