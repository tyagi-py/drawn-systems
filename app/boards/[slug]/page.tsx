import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBoardScene, getPublishedBoardBySlug, getPublishedBoards } from "@/lib/boards";
import { ExcalidrawViewer } from "@/components/ExcalidrawViewer";

type BoardPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublishedBoards().map((board) => ({ slug: board.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: BoardPageProps): Promise<Metadata> {
  const { slug } = await params;
  const board = getPublishedBoardBySlug(slug);

  if (!board) {
    return { title: "Board not found" };
  }

  return {
    title: board.metadata.title,
    description: board.metadata.description,
  };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { slug } = await params;
  const board = getPublishedBoardBySlug(slug);

  if (!board) {
    notFound();
  }

  let scene;
  try {
    scene = getBoardScene(board);
  } catch {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-xl font-medium">This board can&apos;t be displayed</h1>
        <p className="mt-2 text-sm text-muted">
          The board file for &quot;{board.metadata.title}&quot; could not be
          read. Please check back later.
        </p>
        <Link
          href="/boards"
          className="mt-6 inline-block text-sm text-foreground underline underline-offset-4"
        >
          ← Back to boards
        </Link>
      </main>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-border px-6">
        <Link
          href="/boards"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Boards
        </Link>
        <span className="text-sm font-medium">{board.metadata.title}</span>
      </div>

      <div className="min-h-0 flex-1">
        <ExcalidrawViewer scene={scene} />
      </div>

      <div className="shrink-0 border-t border-border px-6 py-4">
        <h1 className="text-base font-medium">{board.metadata.title}</h1>
        {board.metadata.description ? (
          <p className="mt-1 text-sm text-muted">
            {board.metadata.description}
          </p>
        ) : null}
        {board.metadata.category ? (
          <p className="mt-2 text-xs tracking-wide text-muted uppercase">
            {board.metadata.category}
          </p>
        ) : null}
      </div>
    </div>
  );
}
