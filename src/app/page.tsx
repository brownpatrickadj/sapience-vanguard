import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Container } from "@/components/site/container";
import { ProjectCard } from "@/components/site/project-card";
import { ButtonLink } from "@/components/ui/button";
import { getPublishedProjects, getSiteContent } from "@/lib/queries";

// Cache the rendered page for 60s instead of hitting Supabase on every
// visitor — homepage content/projects don't change second-to-second, and
// this removes a database round trip from the critical path of every load.
export const revalidate = 60;

export default async function HomePage() {
  const [content, projects] = await Promise.all([
    getSiteContent(),
    getPublishedProjects(),
  ]);

  const hero = content.hero ?? {};
  const mission = content.mission ?? {};
  const about = content.about ?? {};

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="texture-grid absolute inset-0 -z-10" />
          <Container className="flex flex-col items-center text-center">
            <span className="inline-flex items-center rounded-full border border-line bg-canvas-raised px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-accent-bright">
              {hero.eyebrow ?? "Sapience Vanguard"}
            </span>
            <h1 className="mt-7 max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-6xl">
              {hero.headline ??
                "Intelligence software for people who run the show."}
            </h1>
            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-muted">
              {hero.subheadline ??
                "We build tools that put business owners, freelancers, and independent professionals back in the driver's seat."}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href="#projects">
                See what we&apos;re building
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/careers" variant="secondary">
                View open roles
              </ButtonLink>
            </div>
          </Container>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-24 py-4">
          <Container>
            <div className="max-w-2xl">
              <p className="font-mono text-sm font-medium uppercase tracking-widest text-accent-bright">
                Vanguard Systems
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                Five systems. Five operational bottlenecks. One philosophy:
                the operator stays in control.
              </h2>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {projects.length === 0 && (
                <p className="text-sm text-ink-muted">
                  Projects will appear here once published from the
                  management dashboard.
                </p>
              )}
            </div>
          </Container>
        </section>

        {/* Mission */}
        <section id="mission" className="scroll-mt-24 py-28">
          <Container className="flex flex-col items-center text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-accent-bright">
              {mission.title ?? "Our mission"}
            </p>
            <p className="mt-5 max-w-3xl text-balance font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
              {mission.body ??
                "We build the best intelligence software to put business owners, freelancers, and independent professionals in the driver's seat."}
            </p>
            <div className="mt-12 h-px w-16 bg-line" />
            <p className="mt-10 text-xs font-medium uppercase tracking-widest text-ink-faint">
              {about.title ?? "Why we build"}
            </p>
            <p className="mt-4 max-w-2xl text-balance text-base leading-relaxed text-ink-muted">
              {about.body ??
                "Too much software asks the operator to serve the system. We build the opposite."}
            </p>
          </Container>
        </section>

        {/* Careers teaser */}
        <section className="py-4">
          <Container>
            <div className="relative overflow-hidden rounded-3xl border border-line bg-canvas-raised px-8 py-14 text-center sm:px-16">
              <div className="texture-grid absolute inset-0 -z-10 opacity-60" />
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                We&apos;re hiring people who like solving real problems.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-ink-muted">
                Remote-friendly, small teams, and products that ship to
                people who actually use them every day.
              </p>
              <div className="mt-8 flex justify-center">
                <ButtonLink href="/careers">
                  View open roles
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}