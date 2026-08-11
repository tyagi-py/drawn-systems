"use client";

import "@excalidraw/excalidraw/index.css";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";
import type { ExcalidrawSceneData } from "@/types/board";
import { useIsDarkMode } from "@/hooks/useIsDarkMode";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false },
);

type ExcalidrawViewerProps = {
  scene: ExcalidrawSceneData;
};

export function ExcalidrawViewer({ scene }: ExcalidrawViewerProps) {
  const isDark = useIsDarkMode();
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Runs after the Excalidraw class component has actually committed/mounted
  // (unlike the excalidrawAPI ref callback, which can fire earlier and
  // trigger a "setState on unmounted component" warning). The extra rAF
  // delay waits for Excalidraw's own ResizeObserver to measure the canvas,
  // since fitToViewport needs real dimensions, not the initial placeholder.
  useEffect(() => {
    if (!excalidrawAPI) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        excalidrawAPI.scrollToContent(undefined, {
          fitToViewport: true,
          animate: false,
        });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [excalidrawAPI]);

  function handleFitToContent() {
    excalidrawAPI?.scrollToContent(undefined, {
      fitToViewport: true,
      animate: true,
    });
  }

  function handleFullscreen() {
    containerRef.current?.requestFullscreen();
  }

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full bg-background [&_.excalidraw]:h-full [&_.main-menu-trigger]:hidden!"
    >
      <Excalidraw
        excalidrawAPI={setExcalidrawAPI}
        initialData={{
          elements: scene.elements,
          appState: scene.appState,
          files: scene.files,
        }}
        viewModeEnabled
        zenModeEnabled={false}
        theme={isDark ? "dark" : "light"}
        UIOptions={{
          canvasActions: {
            export: false,
            loadScene: false,
            saveToActiveFile: false,
            toggleTheme: false,
            clearCanvas: false,
            changeViewBackgroundColor: false,
          },
        }}
      />
      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
        <button
          type="button"
          onClick={handleFitToContent}
          aria-label="Fit board to view"
          className="rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground shadow-sm transition-colors hover:bg-foreground hover:text-background"
        >
          Fit to content
        </button>
        <button
          type="button"
          onClick={handleFullscreen}
          aria-label="View board fullscreen"
          className="rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground shadow-sm transition-colors hover:bg-foreground hover:text-background"
        >
          Fullscreen
        </button>
      </div>
    </div>
  );
}
