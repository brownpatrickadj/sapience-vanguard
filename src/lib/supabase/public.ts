import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client for public, read-only marketing data (published projects,
 * job openings, site content) — no cookies, no auth session.
 *
 * Deliberately NOT the cookie-aware server client from server.ts: touching
 * cookies() in a Server Component forces Next.js to render that page fully
 * dynamically on every request (no caching possible), even with
 * `export const revalidate` set. These public pages don't need a user's
 * session at all, so this client lets them actually be cached.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}