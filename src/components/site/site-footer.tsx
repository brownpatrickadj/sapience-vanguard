import Link from "next/link";
import { Logo } from "./logo";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line-soft/80">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Intelligence software for people who run the show. Built for
            business owners, freelancers, and independent professionals.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
          <div className="flex flex-col gap-3">
            <span className="font-medium text-ink">Company</span>
            <Link href="/#mission" className="text-ink-muted hover:text-ink">
              Why we build
            </Link>
            <Link href="/#projects" className="text-ink-muted hover:text-ink">
              Projects
            </Link>
            <Link href="/careers" className="text-ink-muted hover:text-ink">
              Careers
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-medium text-ink">Team</span>
            <Link
              href="/management/login"
              className="text-ink-muted hover:text-ink"
            >
              Log in
            </Link>
          </div>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-line-soft/80 py-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <span>&copy; {new Date().getFullYear()} Sapience Vanguard. All rights reserved.</span>
      </Container>
    </footer>
  );
}
