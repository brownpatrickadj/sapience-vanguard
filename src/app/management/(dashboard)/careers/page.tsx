import { createClient } from "@/lib/supabase/server";
import {
  JobOpeningForm,
  DeleteJobOpeningButton,
} from "@/components/management/job-opening-form";
import { updateApplicationStatus } from "@/lib/actions/careers";
import type { Application, JobOpening } from "@/lib/types";

const STATUS_OPTIONS: Application["status"][] = [
  "new",
  "reviewing",
  "interviewing",
  "rejected",
  "hired",
];

export default async function CareersManagementPage() {
  const supabase = await createClient();

  const [{ data: jobsData }, { data: applicationsData }] = await Promise.all([
    supabase.from("sv_job_openings").select("*").order("sort_order", { ascending: true }),
    supabase.from("sv_applications").select("*").order("submitted_at", { ascending: false }),
  ]);

  const jobs = (jobsData ?? []) as JobOpening[];
  const applications = (applicationsData ?? []) as Application[];

  const resumeUrls = await Promise.all(
    applications.map(async (application) => {
      if (!application.resume_path) return null;
      const { data } = await supabase.storage
        .from("resumes")
        .createSignedUrl(application.resume_path, 3600);
      return data?.signedUrl ?? null;
    })
  );

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">Careers</h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        Manage open roles and review applications submitted through the
        public careers page.
      </p>

      <section className="mt-10">
        <h2 className="font-medium text-ink">Applications</h2>
        <div className="mt-4 space-y-3">
          {applications.length === 0 && (
            <p className="text-sm text-ink-muted">No applications yet.</p>
          )}
          {applications.map((application, i) => (
            <div
              key={application.id}
              className="rounded-2xl border border-line bg-canvas-panel p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{application.applicant_name}</p>
                  <p className="text-sm text-ink-muted">{application.email}</p>
                  {application.phone && (
                    <p className="text-sm text-ink-muted">{application.phone}</p>
                  )}
                </div>
                <div className="text-right text-xs text-ink-faint">
                  <p>{application.position_title ?? "General application"}</p>
                  <p className="mt-1">
                    {new Date(application.submitted_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {application.cover_note && (
                <p className="mt-3 whitespace-pre-wrap text-sm text-ink-muted">
                  {application.cover_note}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-3">
                {resumeUrls[i] && (
                  <a
                    href={resumeUrls[i]!}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-accent-bright hover:underline"
                  >
                    Download resume
                  </a>
                )}
                <form action={updateApplicationStatus} className="ml-auto flex items-center gap-2">
                  <input type="hidden" name="id" value={application.id} />
                  <select
                    name="status"
                    defaultValue={application.status}
                    className="rounded-lg border border-line bg-canvas px-3 py-1.5 text-xs text-ink focus:border-accent focus:outline-none"
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded-lg border border-line px-3 py-1.5 text-xs text-ink-muted hover:border-accent/60 hover:text-ink"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-medium text-ink">Open roles</h2>
        <div className="mt-4 space-y-4">
          {jobs.map((job) => (
            <details key={job.id} className="group rounded-2xl border border-line bg-canvas-panel">
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-ink">{job.title}</span>
                  {!job.published && (
                    <span className="rounded-full border border-line px-2 py-0.5 text-xs text-ink-faint">
                      Draft
                    </span>
                  )}
                </div>
                <span className="text-xs text-ink-faint group-open:hidden">Edit</span>
              </summary>
              <div className="border-t border-line-soft px-6 py-6">
                <JobOpeningForm job={job} />
                <div className="mt-6 border-t border-line-soft pt-4">
                  <DeleteJobOpeningButton id={job.id} />
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-line p-6">
          <h2 className="font-medium text-ink">Add an opening</h2>
          <div className="mt-4">
            <JobOpeningForm />
          </div>
        </div>
      </section>
    </div>
  );
}
