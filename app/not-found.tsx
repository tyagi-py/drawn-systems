import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-6 py-32 text-center">
      <h1 className="text-2xl font-medium">Page not found</h1>
      <p className="mt-2 text-sm text-muted">
        The page or board you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm text-foreground underline underline-offset-4"
      >
        ← Back home
      </Link>
    </main>
  );
}
