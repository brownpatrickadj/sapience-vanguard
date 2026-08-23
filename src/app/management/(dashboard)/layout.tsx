import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SidebarNav } from "@/components/management/sidebar-nav";

export default async function ManagementLayout({
  children,
}: LayoutProps<"/management">) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/management/login");
  }

  const { data: profile } = await supabase
    .from("sv_profiles")
    .select("id, email")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-canvas px-6">
        <div className="max-w-sm rounded-2xl border border-line bg-canvas-panel p-8 text-center">
          <h1 className="font-display text-lg font-semibold text-ink">
            Access pending
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            You&apos;re signed in as <strong className="text-ink">{user.email}</strong>,
            but you haven&apos;t been granted access to the management
            dashboard yet. Ask an existing admin to add your email from the
            Users page.
          </p>
          <form action="/management/login" className="mt-6">
            <a
              href="/management/login"
              className="text-sm font-medium text-accent-bright hover:underline"
            >
              Back to login
            </a>
          </form>
        </div>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen bg-canvas">
      <SidebarNav email={profile.email} />
      <main className="flex-1 overflow-y-auto px-8 py-10 sm:px-12">
        <div className="mx-auto w-full max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
