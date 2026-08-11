import type { BoardInfo } from "@/types/board";
import { BoardCard } from "@/components/BoardCard";

type BoardGridProps = {
  boards: BoardInfo[];
};

export function BoardGrid({ boards }: BoardGridProps) {
  if (boards.length === 0) {
    return (
      <p className="text-sm text-muted">
        No boards published yet. Check back soon.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {boards.map((board) => (
        <BoardCard key={board.slug} board={board} />
      ))}
    </div>
  );
}
