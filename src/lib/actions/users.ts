"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function inviteAdmin(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!email) throw new Error("Email is required.");

  const { error } = await supabase
    .from("sv_admin_invites")
    .insert({ email, invited_by: user.id });

  if (error && !error.message.includes("duplicate")) throw new Error(error.message);

  revalidatePath("/management/users");
}

export async function revokeInvite(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") || "");
  if (!email) return;

  const { error } = await supabase.from("sv_admin_invites").delete().eq("email", email);
  if (error) throw new Error(error.message);

  revalidatePath("/management/users");
}

export async function removeAdmin(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");
  if (!id) return;

  const { error } = await supabase.from("sv_profiles").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/management/users");
}
