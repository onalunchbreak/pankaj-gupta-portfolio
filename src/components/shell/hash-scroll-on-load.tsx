"use client";
import { useEffect } from "react";
import { getLenis } from "@/lib/lenis-instance";
import { useBootStore } from "@/hooks/use-boot";

/**
 * On first load (after preloader completes), if the URL has a #hash matching
 * a section id, smooth-scroll to that section. This makes shared section URLs
 * land the visitor at the right place.
 */
export default function HashScrollOnLoad() {
  const booted = useBootStore((s) => s.booted);

  useEffect(() => {
    if (!booted) return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const el = document.getElementById(hash);
    if (!el) return;
    // Small delay so Lenis is ready
    const t = setTimeout(() => {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(el, { offset: -20, duration: 1.2 });
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
    return () => clearTimeout(t);
  }, [booted]);

  return null;
}
