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
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
