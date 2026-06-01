"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
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
      name: formData.get("name"),
      age: formData.get("age"),
      occupation: formData.get("occupation"),
      region: formData.get("region"),
      bio: formData.get("bio"),
    };

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Registration failed");
      return;
    }

    router.push("/discover");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-6 py-10">
      <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="mt-2 text-neutral-700">Set up your profile and start matching by occupation.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input className="input" name="email" placeholder="Email" type="email" required />
          <input className="input" name="password" placeholder="Password (min. 8 chars)" type="password" required minLength={8} />
          <input className="input" name="name" placeholder="Name" required />
          <input className="input" name="age" placeholder="Age" type="number" min={18} required />
          <input className="input" name="occupation" placeholder="Occupation (e.g., Police Officer)" required />
          <input className="input" name="region" placeholder="Region (e.g., Berlin)" required />
          <textarea className="input min-h-24" name="bio" placeholder="Short bio (optional)" maxLength={280} />
          {error ? <p className="text-sm text-red-700">{error}</p> : null}
          <button disabled={loading} className="button button-primary w-full" type="submit">
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-sm text-neutral-700">
          Already a member?{" "}
          <Link className="font-semibold underline" href="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
