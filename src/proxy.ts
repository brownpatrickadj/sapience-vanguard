import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

/**
 * Optimistic auth check only: bounces signed-out visitors away from /management
 * before rendering. The real authorization check (is this user an admin, via
 * sv_profiles) happens in the management layout itself — Proxy is not a full
 * session/authorization solution per Next.js's own guidance.
 */
export function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Only the management dashboard needs a session check on every request —
  // the public marketing pages (/, /careers) don't, and running this on
  // every page load adds an extra network round trip to Supabase before
  // the page can even start rendering, which was the main cause of slow
  // page loads.
  matcher: ["/management/:path*"],
};