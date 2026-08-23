"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ApplicationStatus } from "@/lib/types";

export async function upsertJobOpening(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") || "");
  const title = String(formData.get("title") || "").trim();
  if (!title) throw new Error("Job title is required.");

  const record = {
    title,
    department: String(formData.get("department") || "") || null,
    location: String(formData.get("location") || "") || null,
    employment_type: String(formData.get("employment_type") || "") || null,
    description: String(formData.get("description") || "") || null,
    sort_order: Number(formData.get("sort_order") || 0),
    published: formData.get("published") === "on",
  };

  const { error } = id
    ? await supabase.from("sv_job_openings").update(record).eq("id", id)
    : await supabase.from("sv_job_openings").insert(record);

  if (error) throw new Error(error.message);

  revalidatePath("/careers");
  revalidatePath("/management/careers");
}

export async function deleteJobOpening(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");
  if (!id) return;

  const { error } = await supabase.from("sv_job_openings").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/careers");
  revalidatePath("/management/careers");
}

const APPLICATION_STATUSES: ApplicationStatus[] = [
  "new",
  "reviewing",
  "interviewing",
  "rejected",
  "hired",
];

export async function updateApplicationStatus(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "") as ApplicationStatus;

  if (!id || !APPLICATION_STATUSES.includes(status)) return;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("sv_applications")
    .update({ status, reviewed_by: user?.id ?? null })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/management/careers");
}
