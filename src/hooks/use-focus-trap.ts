"use client";
import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Traps keyboard focus inside the element referenced by `containerRef`
 * while `active` is true. Restores focus to `restoreRef` (if provided)
 * on deactivate.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  restoreRef?: RefObject<HTMLElement | null>
) {
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    previouslyFocused.current = (document.activeElement as HTMLElement) ?? null;

    // focus first focusable
    const focusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement
      );

    const first = focusables()[0];
    if (first) first.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    container.addEventListener("keydown", onKey);
    return () => {
      container.removeEventListener("keydown", onKey);
      // restore focus
      const target = restoreRef?.current ?? previouslyFocused.current;
      if (target && typeof target.focus === "function") {
        target.focus();
      }
    };
  }, [active, containerRef, restoreRef]);
}
