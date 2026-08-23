"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function upsertProject(formData: FormData) {
  const supabase = await createClient();

  const id = String(formData.get("id") || "");
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Project name is required.");

  const record = {
    name,
    slug: slugify(String(formData.get("slug") || name)),
    tagline: String(formData.get("tagline") || "") || null,
    description: String(formData.get("description") || "") || null,
    why_text: String(formData.get("why_text") || "") || null,
    accent_color: String(formData.get("accent_color") || "") || null,
    sort_order: Number(formData.get("sort_order") || 0),
    published: formData.get("published") === "on",
  };

  const { error } = id
    ? await supabase.from("sv_projects").update(record).eq("id", id)
    : await supabase.from("sv_projects").insert(record);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/management/projects");
}

export async function deleteProject(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");
  if (!id) return;

  const { error } = await supabase.from("sv_projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/management/projects");
}
