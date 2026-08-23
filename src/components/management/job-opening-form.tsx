import { upsertJobOpening, deleteJobOpening } from "@/lib/actions/careers";
import { Button } from "@/components/ui/button";
import type { JobOpening } from "@/lib/types";

export function JobOpeningForm({ job }: { job?: JobOpening }) {
  return (
    <form action={upsertJobOpening} className="space-y-4">
      {job && <input type="hidden" name="id" value={job.id} />}
      <TextField label="Title" name="title" defaultValue={job?.title} required />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TextField label="Department" name="department" defaultValue={job?.department ?? ""} />
        <TextField label="Location" name="location" defaultValue={job?.location ?? ""} />
        <TextField
          label="Employment type"
          name="employment_type"
          defaultValue={job?.employment_type ?? ""}
          placeholder="Full-time, Contract..."
        />
      </div>
      <TextArea label="Description" name="description" defaultValue={job?.description ?? ""} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TextField
          label="Sort order"
          name="sort_order"
          type="number"
          defaultValue={String(job?.sort_order ?? 0)}
        />
        <div className="flex items-end pb-2.5">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              name="published"
              defaultChecked={job?.published ?? true}
              className="h-4 w-4 rounded border-line bg-canvas accent-accent"
            />
            Published
          </label>
        </div>
      </div>
      <Button type="submit" className="text-sm">
        {job ? "Save changes" : "Add opening"}
      </Button>
    </form>
  );
}

export function DeleteJobOpeningButton({ id }: { id: string }) {
  return (
    <form action={deleteJobOpening}>
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="text-sm text-red-400 hover:text-red-300">
        Delete opening
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
