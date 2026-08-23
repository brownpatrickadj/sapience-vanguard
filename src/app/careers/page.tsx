import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Container } from "@/components/site/container";
import { ApplyForm } from "@/components/site/apply-form";
import { getPublishedJobOpenings } from "@/lib/queries";

export const metadata = {
  title: "Careers | Sapience Vanguard",
};

export default async function CareersPage() {
  const jobs = await getPublishedJobOpenings();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 py-20">
        <Container className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-widest text-accent-bright">
            Careers
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            Build the tools that put people in the driver&apos;s seat.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            We&apos;re a small, remote-friendly team shipping intelligence
            software across insurance, operations, and finance. If that
            sounds like your kind of problem, we&apos;d like to hear from
            you.
          </p>

          {jobs.length > 0 && (
            <div className="mt-14">
              <h2 className="font-display text-xl font-semibold text-ink">
                Open roles
              </h2>
              <p className="mt-1 text-sm text-ink-muted">
                {jobs.length} open {jobs.length === 1 ? "position" : "positions"}.
                Select one below when you apply.
              </p>
            </div>
          )}

          <div className="mt-10 rounded-3xl border border-line bg-canvas-raised p-6 sm:p-10">
            <h2 className="font-display text-xl font-semibold text-ink">
              Apply
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Tell us a bit about yourself and attach your resume.
            </p>
            <div className="mt-8">
              <ApplyForm jobs={jobs} />
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
