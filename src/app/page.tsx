import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <main className="w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface shadow-xl">
        <section className="grid gap-8 bg-[linear-gradient(120deg,#fdf5e8,white)] px-8 py-12 md:grid-cols-[1.2fr_1fr] md:px-14">
          <div className="space-y-5">
            <p className="inline-block rounded-full bg-surface-strong px-3 py-1 text-sm font-medium">
              CrushCraft
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Find love by occupation and region.
            </h1>
            <p className="max-w-xl text-lg text-neutral-700">
              Looking for a police officer, teacher, nurse, engineer, or someone in another profession?
              CrushCraft helps you discover people by job and location so your search is focused and meaningful.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/register" className="button button-primary">
                Join now
              </Link>
              <Link href="/login" className="button button-secondary">
                Login
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-5">
            <h2 className="mb-4 text-xl font-semibold">How it works</h2>
            <ul className="space-y-3 text-neutral-700">
              <li>1. Create your member profile in less than a minute.</li>
              <li>2. Browse other members based on occupation.</li>
              <li>3. Filter by region to find people near you.</li>
              <li>4. Discover better-aligned matches faster.</li>
            </ul>
          </div>
        </section>
        <footer className="border-t border-border bg-[#fff9ef] px-8 py-4 text-sm text-neutral-700 md:px-14">
          Occupation-focused dating for people who value lifestyle compatibility.
        </footer>
      </main>
    </div>
  );
}
