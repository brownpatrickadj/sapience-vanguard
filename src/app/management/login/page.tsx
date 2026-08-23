"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { attemptClaimProfile } from "@/lib/claim-profile";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";

type Mode = "login" | "signup";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/management";

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    const supabase = createClient();

    try {
      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;

        await attemptClaimProfile();
        router.push(next);
        router.refresh();
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;

        if (data.session) {
          await attemptClaimProfile();
          router.push(next);
          router.refresh();
        } else {
          setNotice(
            "Check your email to confirm your account, then log in below."
          );
          setMode("login");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-6 py-16">
      <Link href="/" className="mb-10">
        <Logo />
      </Link>

      <div className="w-full max-w-sm rounded-2xl border border-line bg-canvas-panel p-8">
        <h1 className="font-display text-xl font-semibold text-ink">
          {mode === "login" ? "Log in to management" : "Create an account"}
        </h1>
        <p className="mt-1.5 text-sm text-ink-muted">
          {mode === "login"
            ? "Access the homepage and careers management dashboard."
            : "You'll need to be invited by an existing admin to gain access after signing up."}
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-line bg-canvas px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-ink">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-line bg-canvas px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {notice && <p className="text-sm text-teal">{notice}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Log in"
              : "Create account"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError("");
            setNotice("");
          }}
          className="mt-6 w-full text-center text-sm text-ink-muted hover:text-ink"
        >
          {mode === "login"
            ? "Need an account? Sign up"
            : "Already have an account? Log in"}
        </button>
      </div>
    </main>
  );
}
