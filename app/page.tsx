import Link from "next/link";
import { getPublishedBoards } from "@/lib/boards";
import { BoardGrid } from "@/components/BoardGrid";

export default function HomePage() {
  const boards = getPublishedBoards();

  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
        <h1 className="text-sm font-semibold tracking-[0.3em] text-muted uppercase">
          Sumit
        </h1>
        <p className="mt-4 text-2xl font-medium sm:text-3xl">
          AI · Systems · Engineering
        </p>
        <p className="mx-auto mt-6 max-w-xl text-balance text-muted">
          A collection of things I explore, understand, and visualize.
        </p>
        <Link
          href="/boards"
          className="mt-10 inline-block rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Explore Boards
        </Link>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <BoardGrid boards={boards.slice(0, 6)} />
      </section>
    </main>
  );
}
