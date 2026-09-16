import { createPublicClient } from "@/lib/supabase/public";
import type { JobOpening, Project, SiteContent } from "@/lib/types";

export async function getSiteContent(): Promise<Record<string, Record<string, string>>> {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("sv_site_content").select("key, value");

  if (error || !data) return {};

  return Object.fromEntries(
    (data as Pick<SiteContent, "key" | "value">[]).map((row) => [row.key, row.value])
  );
}

export async function getPublishedProjects(): Promise<Project[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("sv_projects")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data as Project[];
}

export async function getPublishedJobOpenings(): Promise<JobOpening[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("sv_job_openings")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  if (error || !data) return [];
  return data as JobOpening[];
}