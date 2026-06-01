"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Login failed");
      return;
    }

    const next = searchParams.get("next");
    router.push(next || "/discover");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-6 py-10">
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-neutral-700">Login to discover people by profession and region.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input className="input" name="email" placeholder="Email" type="email" required />
          <input className="input" name="password" placeholder="Password" type="password" required />
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          <button disabled={loading} className="button button-primary w-full" type="submit">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm text-neutral-700">
          New here?{" "}
          <Link className="font-semibold underline" href="/register">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-6 py-10">Loading...</main>}>
      <LoginContent />
    </Suspense>
  );
}
