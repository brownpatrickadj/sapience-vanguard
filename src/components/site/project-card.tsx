"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, X } from "lucide-react";
import type { Project } from "@/lib/types";
import { ProductIcon } from "@/components/site/product-icon";

const PRODUCT_IMAGES: Record<string, string> = {
  "sapience-adjusting": "/products/sapience-adjusting.jpg",
  "snapdocs": "/products/snapdocs.jpg",
  "rebelledger": "/products/rebelledger.jpg",
  "adjuster-report-builder": "/products/adjuster-report-builder.jpg",
  "valet-portal": "/products/valet-portal.jpg",
};

type Story = { photo: string; caption: string; sell: string };

const PRODUCT_STORIES: Record<string, Story> = {
  "sapience-adjusting": {
    photo: "/products/photo/sapience-adjusting.jpg",
    caption:
      "A field adjuster photographs storm damage on a customer's porch — the same walk-through that used to mean an hour of separate notes, now one continuous record.",
    sell:
      "That walk-through is where most claims lose time — a photo here, a measurement there, all of it re-typed later into a report nobody reads carefully until it's too late. Sapience Adjusting turns the inspection itself into the record: photos, notes, and measurements stay attached to the claim from the first step onto the property, so nothing gets lost in translation between the field and the file.",
  },
  "snapdocs": {
    photo: "/products/photo/snapdocs.jpg",
    caption:
      "A receipt gets photographed at the counter, the instant it changes hands — not stuffed in a pocket to deal with later.",
    sell:
      "Every business collects paper it never quite files — receipts, invoices, intake forms, the stuff that piles up because entering it by hand is nobody's job. SnapDocs turns the camera you already have into the front door for that paperwork: point, capture, and the document becomes usable data immediately, whatever kind of business it's for.",
  },
  "rebelledger": {
    photo: "/products/photo/rebelledger.jpg",
    caption:
      "End of day, receipts on the desk. Reconciling used to be a Sunday-night chore — now it's ten minutes with the register still warm.",
    sell:
      "Most small-business owners do their books after everyone else has gone home, working from memory and a pile of receipts. RebelLedger is built for that moment — it turns the day's transactions into clean books without requiring an accounting background, so closing out a day takes minutes instead of becoming a weekend project.",
  },
  "adjuster-report-builder": {
    photo: "/products/photo/adjuster-report-builder.jpg",
    caption:
      "Notes scrawled on-site get turned into a finished report before the truck leaves the lot.",
    sell:
      "The gap between what happened on-site and what ends up in a finished document is where most professionals lose their evenings. Forge Reports closes that gap — turn photos, notes, and data straight into a polished report, in whatever format the job calls for: a formatted document, a spreadsheet, or a client-ready presentation.",
  },
  "valet-portal": {
    photo: "/products/photo/valet-portal.jpg",
    caption:
      "A dispatcher and a technician run through the day's jobs before the trucks roll out.",
    sell:
      "Running a team means the whole day can go sideways over one missed handoff — a job nobody confirmed, a schedule nobody double-checked. Wheelhouse puts people, jobs, schedules, and assets on one screen, so the morning huddle takes five minutes instead of turning into a scramble.",
  },
};

export function ProjectCard({ project }: { project: Project }) {
  const accent = project.accent_color || "var(--accent)";
  const [open, setOpen] = useState(false);
  const image = PRODUCT_IMAGES[project.slug];
  const story = PRODUCT_STORIES[project.slug];

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
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-canvas-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {image ? (
              <div className="relative aspect-[16/10] w-full bg-canvas-raised">
                <Image
                  src={image}
                  alt={`${project.name} — ${project.tagline || "product preview"}`}
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
            ) : (
              <div className="flex items-start justify-between gap-4 p-7 pb-0">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-soft bg-canvas-raised"
                  style={{ boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${accent} 20%, transparent)` }}
                >
                  <ProductIcon name={project.name} accent={accent} />
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="shrink-0 text-ink-faint hover:text-ink"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            <div className="p-7">
              <h3 className="font-display text-2xl font-semibold text-ink">
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

              {story && (
                <div className="mt-6 overflow-hidden rounded-xl border border-line-soft">
                  <div className="relative aspect-[16/10] w-full bg-canvas-raised">
                    <Image
                      src={story.photo}
                      alt={story.caption}
                      fill
                      sizes="(min-width: 640px) 448px, 90vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-canvas-raised px-5 py-4">
                    <p className="text-xs italic leading-relaxed text-ink-muted">
                      {story.caption}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-ink">
                      {story.sell}
                    </p>
                  </div>
                </div>
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
