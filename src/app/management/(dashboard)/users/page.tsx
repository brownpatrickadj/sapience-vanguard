import { createClient } from "@/lib/supabase/server";
import { inviteAdmin, revokeInvite, removeAdmin } from "@/lib/actions/users";
import { Button } from "@/components/ui/button";
import type { Profile } from "@/lib/types";

export default async function UsersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: profilesData }, { data: invitesData }] = await Promise.all([
    supabase.from("sv_profiles").select("*").order("created_at", { ascending: true }),
    supabase.from("sv_admin_invites").select("email, created_at").order("created_at", { ascending: false }),
  ]);

  const profiles = (profilesData ?? []) as Profile[];
  const invites = invitesData ?? [];
  const pendingInvites = invites.filter(
    (invite) => !profiles.some((p) => p.email.toLowerCase() === invite.email.toLowerCase())
  );

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Users</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        Everyone listed here can log in and manage the homepage, projects,
        and careers content.
      </p>

      <section className="mt-10">
        <h2 className="font-medium text-ink">Admins</h2>
        <div className="mt-4 space-y-2">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex items-center justify-between rounded-xl border border-line bg-canvas-panel px-5 py-3"
            >
              <div>
                <p className="text-sm text-ink">{profile.email}</p>
                {profile.id === user?.id && (
                  <p className="text-xs text-ink-faint">This is you</p>
                )}
              </div>
              {profile.id !== user?.id && (
                <form action={removeAdmin}>
                  <input type="hidden" name="id" value={profile.id} />
                  <button
                    type="submit"
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove access
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-medium text-ink">Pending invites</h2>
        <p className="mt-1 text-xs text-ink-faint">
          Invited people gain access as soon as they sign up (or first log
          in, if they already have an account) with this email.
        </p>
        <div className="mt-4 space-y-2">
          {pendingInvites.length === 0 && (
            <p className="text-sm text-ink-muted">No pending invites.</p>
          )}
          {pendingInvites.map((invite) => (
            <div
              key={invite.email}
              className="flex items-center justify-between rounded-xl border border-line bg-canvas-panel px-5 py-3"
            >
              <p className="text-sm text-ink">{invite.email}</p>
              <form action={revokeInvite}>
                <input type="hidden" name="email" value={invite.email} />
                <button
                  type="submit"
                  className="text-xs text-ink-muted hover:text-ink"
                >
                  Revoke
                </button>
              </form>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-dashed border-line p-6">
        <h2 className="font-medium text-ink">Invite someone</h2>
        <form action={inviteAdmin} className="mt-4 flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[220px]">
            <label htmlFor="email" className="text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-lg border border-line bg-canvas px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
              placeholder="teammate@sapiencevanguard.com"
            />
          </div>
          <Button type="submit" className="text-sm">
            Send invite
          </Button>
        </form>
      </section>
    </div>
  );
}
