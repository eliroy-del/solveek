"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCrmBrowserClient } from "@/lib/supabase/crm-browser";

/** Map short usernames to Supabase Auth emails. */
function resolveLoginIdentifier(value: string) {
  const trimmed = value.trim().toLowerCase();
  if (trimmed === "solveek") return "solveek@solveek.com";
  return trimmed;
}

export default function CrmLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const email = resolveLoginIdentifier(identifier);
    const supabase = createCrmBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Could not sign in. Check your username and password.");
      setLoading(false);
      return;
    }

    router.push("/crm");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lift">
        <p className="font-heading text-xs font-semibold tracking-[0.16em] text-royal">
          SOLVEEK CRM
        </p>
        <h1 className="mt-2 font-heading text-2xl text-navy">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Invite-only access for the Solveek growth operations team.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-navy">
              Username or email
            </span>
            <input
              type="text"
              required
              autoComplete="username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="h-11 w-full rounded-lg border border-border px-3 outline-none ring-royal focus:ring-2"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-navy">Password</span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-lg border border-border px-3 outline-none ring-royal focus:ring-2"
            />
          </label>

          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-royal text-sm font-semibold text-white transition-colors hover:bg-navy disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
