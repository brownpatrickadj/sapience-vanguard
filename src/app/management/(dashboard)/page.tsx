import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ManagementHomePage() {
  const supabase = await createClient();

  const [projects, jobs, newApplications, admins] = await Promise.all([
    supabase.from("sv_projects").select("id", { count: "exact", head: true }).eq("published", true),
    supabase.from("sv_job_openings").select("id", { count: "exact", head: true }).eq("published", true),
    supabase.from("sv_applications").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("sv_profiles").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Published projects", value: projects.count ?? 0, href: "/management/projects" },
    { label: "Open roles", value: jobs.count ?? 0, href: "/management/careers" },
    { label: "New applications", value: newApplications.count ?? 0, href: "/management/careers" },
    { label: "Admins", value: admins.count ?? 0, href: "/management/users" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Dashboard</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        A quick look at what&apos;s live on the homepage right now.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-line bg-canvas-panel p-6 transition-colors hover:border-accent/50"
          >
            <p className="text-3xl font-semibold text-ink">{stat.value}</p>
            <p className="mt-1.5 text-sm text-ink-muted">{stat.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
