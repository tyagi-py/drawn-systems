import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

/** Tracks the `.dark` class on <html>, kept in sync via ThemeToggle / the boot script. */
export function useIsDarkMode() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
