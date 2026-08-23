import { createClient } from "@/lib/supabase/server";
import { updateSiteContent } from "@/lib/actions/content";
import { Button } from "@/components/ui/button";
import type { SiteContent } from "@/lib/types";

export default async function ContentPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("sv_site_content").select("key, value");

  const content = Object.fromEntries(
    ((data ?? []) as Pick<SiteContent, "key" | "value">[]).map((row) => [row.key, row.value])
  ) as Record<string, Record<string, string>>;

  const hero = content.hero ?? {};
  const mission = content.mission ?? {};
  const about = content.about ?? {};

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink">
        Homepage content
      </h1>
      <p className="mt-1.5 text-sm text-ink-muted">
        Edit the hero, mission, and &quot;why we build&quot; copy shown on
        the public homepage.
      </p>

      <form action={updateSiteContent} className="mt-10 space-y-10">
        <section className="rounded-2xl border border-line bg-canvas-panel p-6">
          <h2 className="font-medium text-ink">Hero</h2>
          <div className="mt-4 space-y-4">
            <Field
              label="Eyebrow"
              name="hero_eyebrow"
              defaultValue={hero.eyebrow}
            />
            <Field
              label="Headline"
              name="hero_headline"
              defaultValue={hero.headline}
              textarea
            />
            <Field
              label="Subheadline"
              name="hero_subheadline"
              defaultValue={hero.subheadline}
              textarea
            />
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-canvas-panel p-6">
          <h2 className="font-medium text-ink">Mission</h2>
          <div className="mt-4 space-y-4">
            <Field
              label="Section label"
              name="mission_title"
              defaultValue={mission.title}
            />
            <Field
              label="Mission statement"
              name="mission_body"
              defaultValue={mission.body}
              textarea
            />
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-canvas-panel p-6">
          <h2 className="font-medium text-ink">Why we build</h2>
          <div className="mt-4 space-y-4">
            <Field
              label="Section label"
              name="about_title"
              defaultValue={about.title}
            />
            <Field
              label="Body"
              name="about_body"
              defaultValue={about.body}
              textarea
            />
          </div>
        </section>

        <Button type="submit">Save changes</Button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  textarea,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  textarea?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          defaultValue={defaultValue}
          rows={3}
          className="mt-2 w-full resize-none rounded-lg border border-line bg-canvas px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
        />
      ) : (
        <input
          id={name}
          name={name}
          defaultValue={defaultValue}
          className="mt-2 w-full rounded-lg border border-line bg-canvas px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
        />
      )}
    </div>
  );
}
