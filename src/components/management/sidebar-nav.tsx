"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Boxes, Users, Briefcase, LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/management", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/management/content", label: "Homepage content", icon: FileText },
  { href: "/management/projects", label: "Projects", icon: Boxes },
  { href: "/management/careers", label: "Careers", icon: Briefcase },
  { href: "/management/users", label: "Users", icon: Users },
];

export function SidebarNav({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/management/login");
    router.refresh();
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-line-soft bg-canvas-raised">
      <div className="border-b border-line-soft px-6 py-5">
        <span className="font-display text-sm font-semibold text-ink">
          Sapience Vanguard
        </span>
        <p className="mt-0.5 text-xs text-ink-faint">Management</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-accent/15 text-accent-bright"
                  : "text-ink-muted hover:bg-canvas-panel hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-line-soft px-3 py-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-canvas-panel hover:text-ink"
        >
          <ExternalLink className="h-4 w-4" />
          View site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-ink-muted hover:bg-canvas-panel hover:text-ink"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
        <p className="truncate px-3 pt-2 text-xs text-ink-faint">{email}</p>
      </div>
    </aside>
  );
}
