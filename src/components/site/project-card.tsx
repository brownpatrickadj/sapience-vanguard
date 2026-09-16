import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  const accent = project.accent_color || "var(--accent)";

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-canvas-panel p-7 transition-colors hover:border-line/0"
      style={{ ["--card-accent" as string]: accent }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px 220px at 0% 0%, color-mix(in oklab, ${accent} 18%, transparent), transparent 70%)`,
        }}
      />
      <div className="mb-5 flex items-center justify-between">
        <div
          className="h-1.5 w-10 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <div className="flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
          <p
            className="font-mono text-[11px] uppercase tracking-widest text-ink-faint"
            aria-hidden="true"
          >
            SV-{String(project.sort_order).padStart(2, "0")}
          </p>
        </div>
      </div>
      <h3 className="font-display text-xl font-semibold text-ink">
        {project.name}
      </h3>
      {project.tagline && (
        <p
          className="mt-1.5 text-sm font-medium"
          style={{ color: accent }}
        >
          {project.tagline}
        </p>
      )}
      {project.description && (
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">
          {project.description}
        </p>
      )}
      {project.why_text && (
        <div className="mt-5 border-t border-line-soft pt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
            Why we built it
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {project.why_text}
          </p>
        </div>
      )}
    </div>
  );
}