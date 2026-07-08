"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

function reducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Scroll-triggered count-up using framer-motion's animate().
 * Renders the final value if reduced-motion is preferred.
 */
export function useCountUp(
  target: number,
  options?: { duration?: number; suffix?: string; decimals?: number }
) {
  const { duration = 1.5, suffix = "", decimals = 0 } = options ?? {};
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const [display, setDisplay] = useState(() => {
    if (reducedMotion()) {
      const val =
        decimals > 0 ? target.toFixed(decimals) : target.toLocaleString("en-IN");
      return val + suffix;
    }
    return "0" + suffix;
  });

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion()) return; // final value already set during init
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        const val =
          decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN");
        setDisplay(val + suffix);
      },
    });
    return () => controls.stop();
  }, [inView, target, duration, suffix, decimals]);

  return { ref, display };
}
