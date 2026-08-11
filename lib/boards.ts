import fs from "node:fs";
import path from "node:path";
import type {
  BoardInfo,
  BoardMetadata,
  BoardValidationError,
  ExcalidrawSceneData,
} from "@/types/board";

const CONTENT_DIR = path.join(process.cwd(), "content", "boards");
const METADATA_FILENAME = "metadata.json";
const BOARD_FILENAME = "board.excalidraw";

export class BoardValidationException extends Error {
  constructor(slug: string, message: string) {
    super(`[${slug}] ${message}`);
    this.name = "BoardValidationException";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Validates raw JSON against the BoardMetadata shape. `dirSlug` is the
 * containing directory name, which doubles as the canonical URL slug — the
 * metadata's own "slug" field must match it, catching stale copy-pasted
 * metadata when a board directory is duplicated.
 */
export function validateBoardMetadata(
  data: unknown,
  dirSlug: string,
): BoardMetadata {
  if (!isRecord(data)) {
    throw new BoardValidationException(
      dirSlug,
      "metadata.json must contain a JSON object",
    );
  }

  const { title, description, slug, category, published } = data;

  if (typeof title !== "string" || title.trim() === "") {
    throw new BoardValidationException(
      dirSlug,
      'missing required string field "title"',
    );
  }
  if (typeof slug !== "string" || slug.trim() === "") {
    throw new BoardValidationException(
      dirSlug,
      'missing required string field "slug"',
    );
  }
  if (slug !== dirSlug) {
    throw new BoardValidationException(
      dirSlug,
      `"slug" ("${slug}") must match its directory name ("${dirSlug}")`,
    );
  }
  if (typeof published !== "boolean") {
    throw new BoardValidationException(
      dirSlug,
      'missing required boolean field "published"',
    );
  }
  if (description !== undefined && typeof description !== "string") {
    throw new BoardValidationException(
      dirSlug,
      '"description" must be a string when present',
    );
  }
  if (category !== undefined && typeof category !== "string") {
    throw new BoardValidationException(
      dirSlug,
      '"category" must be a string when present',
    );
  }

  return { title, description, slug, category, published };
}

function readBoardDirectories(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

/**
 * Scans content/boards, validating every board directory found (published or
 * not). Used both by the app (which filters to published boards) and by the
 * standalone `npm run validate` script (which reports every error found).
 */
export function getAllBoardsResult(): {
  boards: BoardInfo[];
  errors: BoardValidationError[];
} {
  const boards: BoardInfo[] = [];
  const errors: BoardValidationError[] = [];
  const seenSlugs = new Set<string>();

  for (const dirSlug of readBoardDirectories()) {
    const boardDir = path.join(CONTENT_DIR, dirSlug);
    const metadataPath = path.join(boardDir, METADATA_FILENAME);
    const boardFilePath = path.join(boardDir, BOARD_FILENAME);

    try {
      if (!fs.existsSync(metadataPath)) {
        throw new BoardValidationException(
          dirSlug,
          `missing ${METADATA_FILENAME}`,
        );
      }

      let raw: unknown;
      try {
        raw = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
      } catch {
        throw new BoardValidationException(
          dirSlug,
          `${METADATA_FILENAME} contains invalid JSON`,
        );
      }

      const metadata = validateBoardMetadata(raw, dirSlug);

      if (!fs.existsSync(boardFilePath)) {
        throw new BoardValidationException(
          dirSlug,
          `missing ${BOARD_FILENAME}`,
        );
      }

      try {
        const scene = JSON.parse(fs.readFileSync(boardFilePath, "utf-8"));
        if (!isRecord(scene) || !Array.isArray(scene.elements)) {
          throw new Error('must be a JSON object with an "elements" array');
        }
      } catch (err) {
        const reason = err instanceof Error ? err.message : "unknown error";
        throw new BoardValidationException(
          dirSlug,
          `${BOARD_FILENAME} is invalid: ${reason}`,
        );
      }

      if (seenSlugs.has(metadata.slug)) {
        throw new BoardValidationException(
          dirSlug,
          `duplicate slug "${metadata.slug}"`,
        );
      }
      seenSlugs.add(metadata.slug);

      boards.push({ slug: metadata.slug, metadata, boardFilePath });
    } catch (err) {
      if (err instanceof BoardValidationException) {
        errors.push({ slug: dirSlug, message: err.message });
      } else {
        errors.push({
          slug: dirSlug,
          message: err instanceof Error ? err.message : "unknown error",
        });
      }
    }
  }

  return { boards, errors };
}

/** All published boards, sorted by title. Used by the homepage and /boards. */
export function getPublishedBoards(): BoardInfo[] {
  const { boards } = getAllBoardsResult();
  return boards
    .filter((board) => board.metadata.published)
    .sort((a, b) => a.metadata.title.localeCompare(b.metadata.title));
}

/** A single published board by slug, or null if missing / unpublished. */
export function getPublishedBoardBySlug(slug: string): BoardInfo | null {
  return getPublishedBoards().find((board) => board.slug === slug) ?? null;
}

/**
 * Reads and parses a board's .excalidraw scene file. Only ever called with a
 * BoardInfo returned from getPublishedBoard(s), which has already confirmed
 * the file exists and parses to an object with an elements array.
 */
export function getBoardScene(board: BoardInfo): ExcalidrawSceneData {
  const raw = fs.readFileSync(board.boardFilePath, "utf-8");
  const parsed = JSON.parse(raw) as ExcalidrawSceneData;
  return {
    type: parsed.type,
    version: parsed.version,
    source: parsed.source,
    elements: parsed.elements ?? [],
    appState: parsed.appState,
    files: parsed.files,
  };
}
