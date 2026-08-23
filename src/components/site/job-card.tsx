import type { JobOpening } from "@/lib/types";

export function JobCard({
  job,
  selected,
  onSelect,
}: {
  job: JobOpening;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl border px-5 py-4 text-left transition-colors ${
        selected
          ? "border-accent bg-canvas-raised"
          : "border-line bg-canvas-panel hover:border-line/60"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-medium text-ink">{job.title}</span>
        {job.employment_type && (
          <span className="shrink-0 rounded-full border border-line px-2.5 py-0.5 text-xs text-ink-muted">
            {job.employment_type}
          </span>
        )}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-faint">
        {job.department && <span>{job.department}</span>}
        {job.location && <span>{job.location}</span>}
      </div>
      {job.description && (
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          {job.description}
        </p>
      )}
    </button>
  );
}
