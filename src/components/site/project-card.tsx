"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import type { Project } from "@/lib/types";
import { ProductIcon } from "@/components/site/product-icon";

const PRODUCT_IMAGES: Record<string, string> = {
  "sapience-adjusting": "/products/sapience-adjusting.png",
  "snapdocs": "/products/snapdocs.png",
  "rebelledger": "/products/rebelledger.png",
  "adjuster-report-builder": "/products/adjuster-report-builder.png",
  "valet-portal": "/products/valet-portal.png",
};

export function ProjectCard({ project }: { project: Project }) {
  const accent = project.accent_color || "var(--accent)";
  const [open, setOpen] = useState(false);
  const image = PRODUCT_IMAGES[project.slug];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-canvas-panel text-left transition-colors hover:border-line/0"
        style={{ ["--card-accent" as string]: accent }}
      >
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px 220px at 0% 0%, color-mix(in oklab, ${accent} 18%, transparent), transparent 70%)`,
          }}
        />
        {image ? (
          <>
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-canvas-raised">
              <Image
                src={image}
                alt={`${project.name} — ${project.tagline || "product preview"}`}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-line-soft px-6 py-4">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line-soft bg-canvas-raised"
                style={{ boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${accent} 20%, transparent)` }}
              >
                <ProductIcon name={project.name} accent={accent} className="h-4.5 w-4.5" />
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors group-hover:text-ink">
                See what it does
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col p-7">
            <div
              className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-line-soft bg-canvas-raised"
              style={{ boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${accent} 20%, transparent)` }}
            >
              <ProductIcon name={project.name} accent={accent} />
            </div>
            <h3 className="font-display text-xl font-semibold text-ink">
              {project.name}
            </h3>
            {project.tagline && (
              <p className="mt-1.5 text-sm font-medium" style={{ color: accent }}>
                {project.tagline}
              </p>
            )}
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors group-hover:text-ink">
              See what it does
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-canvas-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {image && (
              <div className="relative aspect-[16/10] w-full bg-canvas-raised">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 512px, 100vw"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-ink backdrop-blur hover:bg-black/80"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="p-7">
              <div className="flex items-start justify-between gap-4">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-soft bg-canvas-raised"
                  style={{ boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${accent} 20%, transparent)` }}
                >
                  <ProductIcon name={project.name} accent={accent} />
                </div>
                {!image && (
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="shrink-0 text-ink-faint hover:text-ink"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                {project.name}
              </h3>
              {project.tagline && (
                <p className="mt-1.5 text-sm font-medium" style={{ color: accent }}>
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
              <p className="mt-6 text-xs text-ink-faint">
                A dedicated {project.name} site — with a full walkthrough, demo,
                and free trial — is on the way.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}