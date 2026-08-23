import { createClient } from "@/lib/supabase/server";
import { ProjectForm, DeleteProjectButton } from "@/components/management/project-form";
import type { Project } from "@/lib/types";

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("sv_projects")
    .select("*")
    .order("sort_order", { ascending: true });

  const projects = (data ?? []) as Project[];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Projects</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        Manage the projects shown on the homepage. Unpublished projects stay
        hidden from the public site.
      </p>

      <div className="mt-10 space-y-4">
        {projects.map((project) => (
          <details
            key={project.id}
            className="group rounded-2xl border border-line bg-canvas-panel"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: project.accent_color ?? "#5b7cfa" }}
                />
                <span className="font-medium text-ink">{project.name}</span>
                {!project.published && (
                  <span className="rounded-full border border-line px-2 py-0.5 text-xs text-ink-faint">
                    Draft
                  </span>
                )}
              </div>
              <span className="text-xs text-ink-faint group-open:hidden">
                Edit
              </span>
            </summary>
            <div className="border-t border-line-soft px-6 py-6">
              <ProjectForm project={project} />
              <div className="mt-6 border-t border-line-soft pt-4">
                <DeleteProjectButton id={project.id} />
              </div>
            </div>
          </details>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-line p-6">
        <h2 className="font-medium text-ink">Add a project</h2>
        <div className="mt-4">
          <ProjectForm />
        </div>
      </div>
    </div>
  );
}
