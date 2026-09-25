import { useState, useEffect, useRef } from "react";

export interface CursorState {
  x: number;
  y: number;
  isVisible: boolean;
  isHovered: boolean;
  isPressed: boolean;
  targetType: "link" | "button" | "water-capsule" | "interactive" | "default";
  isTouchDevice: boolean;
}

/**
 * Custom hook tracking user mouse coordinates with requestAnimationFrame
 * for zero-latency, buttery-smooth 60/120Hz tracking.
 * 
 * Features:
 * - Hardware accelerated rAF throttling
 * - Interactive element detection (links, buttons, WATER RELEASE capsule)
 * - Mobile touch device suppression (pointer: coarse)
 * - Window boundary detection (mouseleave / mouseenter)
 */
export function useKunaiCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    x: -100,
    y: -100,
    isVisible: false,
    isHovered: false,
    isPressed: false,
    targetType: "default",
    isTouchDevice: false,
  });

  const posRef = useRef({ x: -100, y: -100 });
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // 1. Detect touch devices to avoid phantom cursors on mobile / tablets
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isTouch) {
      setCursorState((prev) => ({ ...prev, isTouchDevice: true }));
      return;
    }

    // 2. High-performance mouse tracking using requestAnimationFrame
    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(() => {
          setCursorState((prev) => ({
            ...prev,
            x: posRef.current.x,
            y: posRef.current.y,
            isVisible: true,
          }));
          rafIdRef.current = null;
        });
      }
    };

    // 3. Event delegation to detect hover on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check for specific WATER RELEASE capsule or jutsu buttons
      const waterElement = target.closest<HTMLElement>(
        '#elemental-cache-water-release-btn, [data-capsule="water"], [data-nature="water"], [aria-label*="Water"]'
      );

      if (waterElement || target.textContent?.toLowerCase().includes("water release")) {
        setCursorState((prev) => ({
          ...prev,
          isHovered: true,
          targetType: "water-capsule",
        }));
        return;
      }

      // Check for standard interactive elements
      const interactiveElement = target.closest<HTMLElement>(
        'a, button, [role="button"], input, select, textarea, [data-interactive], .cursor-pointer'
      );

      if (interactiveElement) {
        const isLink = interactiveElement.tagName === "A";
        setCursorState((prev) => ({
          ...prev,
          isHovered: true,
          targetType: isLink ? "link" : "button",
        }));
      } else {
        setCursorState((prev) => ({
          ...prev,
          isHovered: false,
          targetType: "default",
        }));
      }
    };

    // 4. Click interaction tracking
    const handleMouseDown = () => {
      setCursorState((prev) => ({ ...prev, isPressed: true }));
    };

    const handleMouseUp = () => {
      setCursorState((prev) => ({ ...prev, isPressed: false }));
    };

    // 5. Window boundary detection
    const handleMouseLeave = () => {
      setCursorState((prev) => ({ ...prev, isVisible: false }));
    };

    const handleMouseEnter = () => {
      setCursorState((prev) => ({ ...prev, isVisible: true }));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return cursorState;
}
