"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Profile = {
  id: number;
  name: string;
  age: number;
  occupation: string;
  region: string;
  bio: string | null;
};

function DiscoverContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const occupation = searchParams.get("occupation") ?? "";
  const region = searchParams.get("region") ?? "";

  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    if (occupation) params.set("occupation", occupation);
    if (region) params.set("region", region);
    return params.toString();
  }, [occupation, region]);

  useEffect(() => {
    async function fetchProfiles() {
      setLoading(true);
      const response = await fetch(`/api/profiles?${queryString}`, { cache: "no-store" });
      if (response.status === 401) {
        router.push("/login");
        return;
      }
      const data = await response.json();
      setProfiles(data.profiles ?? []);
      setLoading(false);
    }

    fetchProfiles();
  }, [queryString, router]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Discover Matches</h1>
          <p className="text-neutral-700">Filter by occupation and region to find relevant profiles.</p>
        </div>
        <button className="button button-secondary" onClick={logout} type="button">
          Logout
        </button>
      </div>

      <form className="mb-7 grid gap-3 rounded-2xl border border-border bg-surface p-4 md:grid-cols-[1fr_1fr_auto]">
        <input defaultValue={occupation} name="occupation" className="input" placeholder="Occupation (e.g., Police Officer)" />
        <input defaultValue={region} name="region" className="input" placeholder="Region (e.g., Munich)" />
        <button className="button button-primary" type="submit">
          Apply filters
        </button>
      </form>

      {loading ? (
        <p>Loading profiles...</p>
      ) : profiles.length === 0 ? (
        <p>No matches found for the selected filters.</p>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {profiles.map((profile) => (
            <article key={profile.id} className="rounded-2xl border border-border bg-white p-4">
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-sm text-neutral-600">
                {profile.age} years old
              </p>
              <p className="mt-2 text-sm">
                <span className="font-semibold">Occupation:</span> {profile.occupation}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Region:</span> {profile.region}
              </p>
              {profile.bio ? <p className="mt-2 text-sm text-neutral-700">{profile.bio}</p> : null}
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default function DiscoverPage() {
  return (
    <Suspense fallback={<main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-8">Loading...</main>}>
      <DiscoverContent />
    </Suspense>
  );
}
