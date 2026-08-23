import { upsertProject, deleteProject } from "@/lib/actions/projects";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/types";

export function ProjectForm({ project }: { project?: Project }) {
  return (
    <form action={upsertProject} className="space-y-4">
      {project && <input type="hidden" name="id" value={project.id} />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Name" name="name" defaultValue={project?.name} required />
        <TextField
          label="Slug"
          name="slug"
          defaultValue={project?.slug}
          placeholder="auto-generated from name if left blank"
        />
      </div>
      <TextField label="Tagline" name="tagline" defaultValue={project?.tagline ?? ""} />
      <TextArea
        label="Description"
        name="description"
        defaultValue={project?.description ?? ""}
      />
      <TextArea
        label="Why we built it"
        name="why_text"
        defaultValue={project?.why_text ?? ""}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TextField
          label="Accent color"
          name="accent_color"
          defaultValue={project?.accent_color ?? "#5b7cfa"}
        />
        <TextField
          label="Sort order"
          name="sort_order"
          type="number"
          defaultValue={String(project?.sort_order ?? 0)}
        />
        <div className="flex items-end pb-2.5">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              name="published"
              defaultChecked={project?.published ?? true}
              className="h-4 w-4 rounded border-line bg-canvas accent-accent"
            />
            Published
          </label>
        </div>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" className="text-sm">
          {project ? "Save changes" : "Add project"}
        </Button>
      </div>
    </form>
  );
}

export function DeleteProjectButton({ id }: { id: string }) {
  return (
    <form action={deleteProject}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-sm text-red-400 hover:text-red-300"
      >
        Delete project
      </button>
    </form>
  );
}

function TextField({
  label,
  name,
  defaultValue,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-lg border border-line bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        rows={3}
        className="mt-2 w-full resize-none rounded-lg border border-line bg-canvas px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
      />
    </div>
  );
}
