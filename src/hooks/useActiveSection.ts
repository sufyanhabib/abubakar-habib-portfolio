import { useActiveSectionObserver, UseActiveSectionObserverOptions } from "./useActiveSectionObserver";

/**
 * Backward-compatible hook wrapper for useActiveSection.
 * Returns the active section ID string (or null).
 */
export function useActiveSection(
  sectionIds: string[],
  optionsOrRootId?: IntersectionObserverInit | string | UseActiveSectionObserverOptions
): string | null {
  let hookOptions: UseActiveSectionObserverOptions = {
    headerOffset: 90,
    rootMargin: "-15% 0px -40% 0px",
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
    debounceMs: 40,
    bottomThreshold: 60,
  };

  if (typeof optionsOrRootId === "string") {
    const root = document.getElementById(optionsOrRootId);
    if (root) {
      hookOptions.root = root;
    }
  } else if (optionsOrRootId && typeof optionsOrRootId === "object") {
    hookOptions = { ...hookOptions, ...optionsOrRootId };
  }

  const { activeSection } = useActiveSectionObserver(sectionIds, hookOptions);
  return activeSection;
}

export { useActiveSectionObserver };
