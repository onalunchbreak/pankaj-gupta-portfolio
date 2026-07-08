"use client";
import { useEffect } from "react";
import { getLenis } from "@/lib/lenis-instance";

/**
 * Locks body scroll when `locked` is true. Uses Lenis.stop()/start() if
 * available, plus a CSS fallback that sets overflow hidden on the html
 * element. Restores on unmount/lock-release.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const lenis = getLenis();
    if (lenis) lenis.stop();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      if (lenis) lenis.start();
      document.documentElement.style.overflow = prev;
    };
  }, [locked]);
}
