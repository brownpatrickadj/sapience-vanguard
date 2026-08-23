import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Privileged Supabase client using the SERVICE ROLE key. Bypasses Row Level Security.
 * Server-only — never import this from a Client Component or expose the key to the browser.
 * Used for: inviting/listing management users. Requires SUPABASE_SERVICE_ROLE_KEY to be set;
 * throws clearly if it isn't, rather than silently failing.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Add it to .env.local (Supabase dashboard -> " +
        "Project Settings -> API -> service_role key) to enable user management."
    );
  }

  return createSupabaseClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
