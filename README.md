# Sapience Vanguard — homepage, careers, and management dashboard

A Next.js 16 (App Router, TypeScript, Tailwind v4) site backed by Supabase
(Postgres + Auth + Storage), built for the "Business" Supabase project
(`gjrlgbgemnygdpwpocrq`).

## What's here

- **`/`** — public homepage: hero, projects showcase (pulled from the
  `sv_projects` table), mission/"why we build" section, careers teaser.
- **`/careers`** — open roles (from `sv_job_openings`) plus an application
  form that uploads a resume to a private Supabase Storage bucket and
  inserts a row into `sv_applications`.
- **`/management/login`** — email/password login (and self-serve signup) for
  the management dashboard.
- **`/management`** — auth-gated dashboard (only for users with a
  `sv_profiles` row): dashboard stats, homepage content editor, projects
  CRUD, job openings + applications review (with resume downloads and
  status updates), and a Users page to invite/remove other admins.

All database tables are prefixed `sv_` to stay clearly separate from the
project's other (`pr_`) billing tables. Every table has Row Level Security
enabled — see the migrations already applied to the `Business` Supabase
project for the exact policies.

## Getting access to the management dashboard (first admin)

There's no separate "service role" secret required for day-to-day use.
Instead, an allowlist table (`sv_admin_invites`) controls who's allowed to
claim a management account:

1. An existing admin adds an email on the **Users** page (or, for the very
   first admin, it's seeded directly in the database — ask whoever set this
   up if you don't have access yet).
2. That person visits `/management/login`, clicks **Sign up**, and creates
   an account with that exact email.
3. On first login, the account automatically "claims" its admin profile —
   no manual SQL required after the initial seed.

## Local development

```bash
npm install
cp .env.local.example .env.local   # already filled in as .env.local in this delivery
npm run dev
```

Required env vars (see `.env.local.example`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` — **optional**, not required by any current
  feature (kept as an escape hatch in `src/lib/supabase/server-admin.ts` for
  future admin-only features that need to bypass RLS, e.g. bulk user
  imports). Safe to leave blank.

## Deploying

This is a standard Next.js App Router project — it deploys to Netlify or
Vercel with zero extra config beyond setting the two `NEXT_PUBLIC_*` env
vars above in the hosting provider's dashboard. A Netlify project named
**sapience-vanguard** has already been created under your "Adjuster" team
(`https://app.netlify.com/projects/sapience-vanguard`) with those env vars
set — the deploy upload hit a transient `403` from Netlify's API when this
was built, so the project exists but has no deploy yet. The easiest way to
finish it:

- Push this code to a GitHub repo and connect it to that Netlify project
  (Site settings → Build & deploy → Link repository), **or**
- Run `netlify deploy --build --prod` from this directory with the Netlify
  CLI once you're logged in.

## Notes on content

Project descriptions, the mission statement, and the generic job openings
were drafted for this build and are fully editable from
`/management/content`, `/management/projects`, and `/management/careers` —
nothing is hardcoded.
