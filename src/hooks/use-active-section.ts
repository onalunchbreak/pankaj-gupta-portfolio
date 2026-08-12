"use client";
import { useEffect, useState } from "react";
import { getLenis } from "@/lib/lenis-instance";

/**
 * Robust, viewport-center coverage section tracker.
 * Determines active section based on which element covers the viewport 35% reading focus line.
 * Guarantees zero false-positive highlights when scrolling up or down through tall/short sections.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (!ids || ids.length === 0) return;

    const checkActiveSection = () => {
      const vCenter = window.innerHeight * 0.35;

      // 1. Top region check (Hero & Table of Contents before Origin)
      const originEl = document.getElementById("origin");
      if (originEl) {
        const originRect = originEl.getBoundingClientRect();
        if (originRect.top > vCenter && ids.includes("hero")) {
          setActive("hero");
          return;
        }
      } else if (window.scrollY < 300 && ids.includes("hero")) {
        setActive("hero");
        return;
      }

      // 2. Viewport reference focus line (35% from the top of screen)
      let matchedId = "";

      for (const id of ids) {
        if (id === "hero") continue;
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        // Check if 35% viewport focus line falls inside section bounds
        if (rect.top <= vCenter && rect.bottom >= vCenter) {
          matchedId = id;
          break;
        }
      }

      // 3. Fallback: pick section whose top is closest to vCenter among sections above vCenter
      if (!matchedId) {
        let candidate = "";
        let maxTop = -Infinity;
        for (const id of ids) {
          if (id === "hero") continue;
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= vCenter && rect.top > maxTop) {
            maxTop = rect.top;
            candidate = id;
          }
        }
        matchedId = candidate || ids[0] || "hero";
      }

      if (matchedId) {
        setActive(matchedId);
      }
    };

    // Initial check on mount
    checkActiveSection();

    // Listen to window scroll & resize events
    window.addEventListener("scroll", checkActiveSection, { passive: true });
    window.addEventListener("resize", checkActiveSection, { passive: true });

    // Attach to Lenis scroll instance if active
    const lenis = getLenis();
    if (lenis) {
      lenis.on("scroll", checkActiveSection);
    }

    return () => {
      window.removeEventListener("scroll", checkActiveSection);
      window.removeEventListener("resize", checkActiveSection);
      if (lenis) {
        lenis.off("scroll", checkActiveSection);
      }
    };
  }, [ids]);

  return active;
}
