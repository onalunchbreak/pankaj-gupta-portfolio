"use client";
import { useEffect } from "react";
import { useSessionStats } from "@/hooks/use-session-stats";
import { NAV_ITEMS } from "@/lib/data";

/**
 * Invisible tracker that marks sections as "reached" in the session stats
 * when they scroll into view. Renders nothing — purely a side-effect hook.
 * Uses the same IntersectionObserver pattern as the nav active-section
 * tracker, but fires once per section (reach tracking, not active tracking).
 */
export default function SectionReachTracker() {
  const reachSection = useSessionStats((s) => s.reachSection);

  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reachSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -20% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [reachSection]);

  return null;
}
