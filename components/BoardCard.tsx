import Link from "next/link";
import type { BoardInfo } from "@/types/board";

type BoardCardProps = {
  board: BoardInfo;
};

export function BoardCard({ board }: BoardCardProps) {
  const { title, description, category } = board.metadata;

  return (
    <Link
      href={`/boards/${board.slug}`}
      className="group flex flex-col justify-between gap-6 rounded-lg border border-border p-6 transition-colors hover:border-foreground"
    >
      <div className="space-y-2">
        {category ? (
          <span className="text-xs tracking-wide text-muted uppercase">
            {category}
          </span>
        ) : null}
        <h3 className="text-lg font-medium text-foreground">{title}</h3>
        {description ? (
          <p className="line-clamp-3 text-sm text-muted">{description}</p>
        ) : null}
      </div>
      <span className="text-sm text-foreground opacity-70 transition-opacity group-hover:opacity-100">
        View board →
      </span>
    </Link>
  );
}
