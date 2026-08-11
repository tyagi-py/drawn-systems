import type { AppState, BinaryFiles } from "@excalidraw/excalidraw/types";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/element/types";

/**
 * Metadata for a single board, sourced from content/boards/<slug>/metadata.json.
 */
export type BoardMetadata = {
  title: string;
  description?: string;
  slug: string;
  category?: string;
  published: boolean;
};

/**
 * A discovered, validated board: its metadata plus where its scene file lives.
 */
export type BoardInfo = {
  slug: string;
  metadata: BoardMetadata;
  boardFilePath: string;
};

/**
 * The shape of a raw `.excalidraw` file, treated as JSON. Mirrors Excalidraw's
 * own `ImportedDataState`, since a `.excalidraw` file is not guaranteed to
 * contain only elements — appState and embedded files matter too.
 */
export type ExcalidrawSceneData = {
  type?: string;
  version?: number;
  source?: string;
  elements: readonly ExcalidrawElement[];
  appState?: Partial<AppState>;
  files?: BinaryFiles;
};

export type BoardValidationError = {
  slug: string;
  message: string;
};
