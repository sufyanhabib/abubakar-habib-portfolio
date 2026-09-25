import { useState, useEffect, useRef, useCallback } from "react";

export interface UseActiveSectionObserverOptions {
  /**
   * Pixels from the top of the viewport representing the active reading line.
   * Useful when sticky navbars obscure the top of the viewport.
   * @default 100
   */
  headerOffset?: number;

  /**
   * Custom rootMargin for the IntersectionObserver.
   * @default "-15% 0px -40% 0px"
   */
  rootMargin?: string;

  /**
   * Multi-threshold array to catch subtle intersections across both tall and short sections.
   * @default [0, 0.1, 0.25, 0.5, 0.75, 1.0]
   */
  threshold?: number | number[];

  /**
   * Debounce delay in milliseconds to prevent UI jitter during rapid flick scrolls.
   * @default 50
   */
  debounceMs?: number;

  /**
   * Distance in pixels from the bottom of the page to trigger bottom-of-page fallback.
   * Ensures short final sections like #contact activate reliably.
   * @default 70
   */
  bottomThreshold?: number;

  /**
   * Default active section if none matches or when at the very summit of the page.
   * @default null
   */
  defaultSection?: string | null;

  /**
   * Optional custom scroll container. Defaults to window / viewport.
   */
  root?: Element | Document | null;
}

export interface UseActiveSectionObserverReturn {
  activeSection: string | null;
  setActiveSection: (id: string | null) => void;
  scrollToSection: (id: string, options?: { behavior?: ScrollBehavior; offset?: number }) => void;
}

/**
 * Normalizes an ID or href string to a clean DOM ID.
 * Strips leading '#' and whitespace.
 */
export function normalizeSectionId(rawId: string): string {
  return rawId.trim().replace(/^#/, "");
}

/**
 * Finds a DOM element matching an ID safely, supporting case-insensitive
 * fallbacks and data-section-id attributes.
 */
export function findSectionElement(rawId: string): HTMLElement | null {
  const cleanId = normalizeSectionId(rawId);
  if (!cleanId) return null;

  // 1. Direct getElementById (fastest)
  const directMatch = document.getElementById(cleanId);
  if (directMatch) return directMatch;

  // 2. Case-insensitive ID lookup via CSS attribute selector
  try {
    const caseInsensitiveMatch = document.querySelector<HTMLElement>(`[id="${cleanId}" i]`);
    if (caseInsensitiveMatch) return caseInsensitiveMatch;
  } catch {
    // Ignore selector syntax issues if any
  }

  // 3. Fallback: data-section-id attribute
  try {
    const dataSectionMatch = document.querySelector<HTMLElement>(`[data-section-id="${cleanId}" i]`);
    if (dataSectionMatch) return dataSectionMatch;
  } catch {
    // Ignore selector syntax issues if any
  }

  // 4. Exhaustive search across all <section> tags
  const allSections = document.querySelectorAll("section");
  const targetLower = cleanId.toLowerCase();
  for (let i = 0; i < allSections.length; i++) {
    const sec = allSections[i];
    if (sec.id && sec.id.toLowerCase() === targetLower) {
      return sec;
    }
  }

  return null;
}

/**
 * Production-ready custom React hook for precise ScrollSpy and Active Navigation State.
 *
 * Features:
 * - Robust DOM ID mapping (case-insensitivity, leading hash stripping, data attributes)
 * - Calibrated IntersectionObserver + bounding box calculation for tall vs short sections
 * - Bottom-of-page edge case fallback (activates final section such as #contact)
 * - Top-of-page edge case handling
 * - MutationObserver to automatically discover lazy-loaded / asynchronously mounted sections
 * - Throttled & debounced updates to prevent UI thrashing during rapid scrolling
 * - Programmatic smooth scroll helper with navbar offset compensation
 */
export function useActiveSectionObserver(
  sectionIds: string[],
  options: UseActiveSectionObserverOptions = {}
): UseActiveSectionObserverReturn {
  const {
    headerOffset = 100,
    rootMargin = "-15% 0px -40% 0px",
    threshold = [0, 0.1, 0.25, 0.5, 0.75, 1.0],
    debounceMs = 50,
    bottomThreshold = 70,
    defaultSection = null,
    root = null,
  } = options;

  const [activeSection, setActiveSection] = useState<string | null>(defaultSection);

  // Keep latest activeSection in ref to prevent stale closures
  const activeSectionRef = useRef<string | null>(activeSection);
  activeSectionRef.current = activeSection;

  // Lock to avoid scroll observer overriding state during programmatic scroll
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimerRef = useRef<number | null>(null);

  // Debounce timer and animation frame refs
  const debounceTimerRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  // Cached DOM elements
  const elementsMapRef = useRef<Map<string, HTMLElement>>(new Map());

  // Function to commit active section with debouncing
  const commitActiveSection = useCallback(
    (newId: string | null, immediate = false) => {
      if (isProgrammaticScrollRef.current) return;
      if (activeSectionRef.current === newId) return;

      if (immediate || debounceMs <= 0) {
        if (debounceTimerRef.current) {
          window.clearTimeout(debounceTimerRef.current);
          debounceTimerRef.current = null;
        }
        activeSectionRef.current = newId;
        setActiveSection(newId);
        return;
      }

      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = window.setTimeout(() => {
        if (!isProgrammaticScrollRef.current && activeSectionRef.current !== newId) {
          activeSectionRef.current = newId;
          setActiveSection(newId);
        }
      }, debounceMs);
    },
    [debounceMs]
  );

  // Calculate the active section based on DOM geometry
  const calculateActiveSection = useCallback(() => {
    if (isProgrammaticScrollRef.current) return;
    if (sectionIds.length === 0) return;

    // 1. Bottom-of-Page Edge Case Check
    // When the user has scrolled to or near the bottom of the page,
    // the last section (e.g. #contact) may not be tall enough to reach the top reading line.
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    );

    const isAtBottom = scrollY + windowHeight >= documentHeight - bottomThreshold;
    if (isAtBottom) {
      // Find the last registered section that exists in the DOM
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = normalizeSectionId(sectionIds[i]);
        const el = elementsMapRef.current.get(id) || findSectionElement(id);
        if (el) {
          commitActiveSection(id, true);
          return;
        }
      }
    }

    // 2. Top-of-Page Edge Case Check
    // If scrolled to the summit (e.g. top hero area)
    if (scrollY < 60) {
      const firstId = normalizeSectionId(sectionIds[0]);
      commitActiveSection(firstId === "hero" ? firstId : defaultSection, true);
      return;
    }

    // 3. Precise Viewport Geometry Calculation
    // We define a "reading line" offset from the top of the viewport (below the navbar).
    const readingLine = headerOffset;
    let candidateId: string | null = null;
    let maxVisibleRatio = -1;

    for (const rawId of sectionIds) {
      const id = normalizeSectionId(rawId);
      const el = elementsMapRef.current.get(id) || findSectionElement(id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      const elementHeight = rect.height;

      // Check if this section spans across the reading line
      // (rect.top <= readingLine and rect.bottom > readingLine)
      if (rect.top <= readingLine && rect.bottom > readingLine) {
        candidateId = id;
        break; // Active section found spanning the reading threshold
      }

      // Fallback ratio calculation for sections between boundaries or partially visible
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(windowHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const visibleRatio = elementHeight > 0 ? visibleHeight / Math.min(windowHeight, elementHeight) : 0;

      if (visibleRatio > maxVisibleRatio && visibleRatio > 0.15) {
        maxVisibleRatio = visibleRatio;
        candidateId = id;
      }
    }

    if (candidateId) {
      commitActiveSection(candidateId);
    }
  }, [sectionIds, headerOffset, bottomThreshold, defaultSection, commitActiveSection]);

  // Set up observers and event listeners
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Refresh elements map
    const updateElementsMap = () => {
      elementsMapRef.current.clear();
      sectionIds.forEach((rawId) => {
        const id = normalizeSectionId(rawId);
        const el = findSectionElement(id);
        if (el) {
          elementsMapRef.current.set(id, el);
        }
      });
    };

    updateElementsMap();

    // IntersectionObserver instance
    const observerOptions: IntersectionObserverInit = {
      root: root || null,
      rootMargin,
      threshold,
    };

    const observer = new IntersectionObserver(() => {
      // Whenever intersection triggers, recalculate active section using rAF
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        calculateActiveSection();
      });
    }, observerOptions);

    // Observe all resolved elements
    const observeAll = () => {
      updateElementsMap();
      elementsMapRef.current.forEach((el) => {
        try {
          observer.observe(el);
        } catch {
          // Ignore observe errors if detached
        }
      });
    };

    observeAll();

    // MutationObserver to detect dynamically mounted / lazy-loaded sections
    const mutationObserver = new MutationObserver(() => {
      // If DOM changed, re-query missing elements and observe
      observeAll();
      calculateActiveSection();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Scroll listener with requestAnimationFrame throttling
    const handleScroll = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        calculateActiveSection();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial calculation
    calculateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      observer.disconnect();
      mutationObserver.disconnect();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (programmaticScrollTimerRef.current) clearTimeout(programmaticScrollTimerRef.current);
    };
  }, [sectionIds, rootMargin, threshold, root, calculateActiveSection]);

  // Programmatic scroll helper with fixed navbar compensation
  const scrollToSection = useCallback(
    (rawId: string, scrollOptions?: { behavior?: ScrollBehavior; offset?: number }) => {
      const id = normalizeSectionId(rawId);
      const el = elementsMapRef.current.get(id) || findSectionElement(id);
      if (!el) return;

      const behavior = scrollOptions?.behavior ?? "smooth";
      const customOffset = scrollOptions?.offset ?? headerOffset;

      // Lock observer during smooth scroll transition
      isProgrammaticScrollRef.current = true;
      commitActiveSection(id, true);

      const targetY = el.getBoundingClientRect().top + window.scrollY - customOffset + 4;

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior,
      });

      if (programmaticScrollTimerRef.current) {
        clearTimeout(programmaticScrollTimerRef.current);
      }

      programmaticScrollTimerRef.current = window.setTimeout(() => {
        isProgrammaticScrollRef.current = false;
        calculateActiveSection();
      }, 850);
    },
    [headerOffset, commitActiveSection, calculateActiveSection]
  );

  return {
    activeSection,
    setActiveSection: (id) => commitActiveSection(id, true),
    scrollToSection,
  };
}
