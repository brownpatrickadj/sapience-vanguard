"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateSiteContent(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated.");

  const entries: Array<{ key: string; value: Record<string, string> }> = [
    {
      key: "hero",
      value: {
        eyebrow: String(formData.get("hero_eyebrow") ?? ""),
        headline: String(formData.get("hero_headline") ?? ""),
        subheadline: String(formData.get("hero_subheadline") ?? ""),
      },
    },
    {
      key: "mission",
      value: {
        title: String(formData.get("mission_title") ?? ""),
        body: String(formData.get("mission_body") ?? ""),
      },
    },
    {
      key: "about",
      value: {
        title: String(formData.get("about_title") ?? ""),
        body: String(formData.get("about_body") ?? ""),
      },
    },
  ];

  for (const entry of entries) {
    const { error } = await supabase
      .from("sv_site_content")
      .upsert(
        { key: entry.key, value: entry.value, updated_by: user.id, updated_at: new Date().toISOString() },
        { onConflict: "key" }
      );
    if (error) throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath("/management/content");
}
