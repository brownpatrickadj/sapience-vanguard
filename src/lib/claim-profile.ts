import { createClient } from "@/lib/supabase/client";

/**
 * Best-effort attempt to create the signed-in user's sv_profiles row.
 * Only succeeds if an existing admin has added their email to sv_admin_invites
 * (enforced by RLS, not by this function) — safe to call unconditionally after
 * every login/signup. Failures are swallowed; the caller re-checks access
 * separately by reading sv_profiles.
 */
export async function attemptClaimProfile() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  await supabase.from("sv_profiles").insert({
    id: user.id,
    email: user.email ?? "",
  });
}
