import type { Metadata } from "next";
import { getPublishedBoards } from "@/lib/boards";
import { BoardGrid } from "@/components/BoardGrid";

export const metadata: Metadata = {
  title: "Boards",
  description: "All published visual boards.",
};

export default function BoardsPage() {
  const boards = getPublishedBoards();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-2xl font-medium">Boards</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Interactive visual boards covering AI, systems, and engineering
        ideas.
      </p>
      <div className="mt-10">
        <BoardGrid boards={boards} />
      </div>
    </main>
  );
}
