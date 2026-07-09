"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: dot follows instantly, ring lags via spring.
 * Grows + changes color on interactive elements.
 *
 * Per user request: NO text labels are rendered inside the cursor.
 * The cursor only changes size + color when hovering interactive
 * elements — no section names, no "on a lunchbreak", no labels.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 35, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 35, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    document.documentElement.classList.add("cursor-none-fine");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest(
        'a, button, [role="button"], [data-cursor], input, textarea, select'
      );
      setHovering(Boolean(interactive));
    };
    const downH = () => setDown(true);
    const upH = () => setDown(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", downH);
    window.addEventListener("mouseup", upH);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", downH);
      window.removeEventListener("mouseup", upH);
      document.documentElement.classList.remove("cursor-none-fine");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* dot — follows instantly */}
      <motion.div
        className="pointer-events-none fixed z-[100] mix-blend-difference"
        style={{ x, y }}
        aria-hidden
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: hovering ? 6 : 7,
            height: hovering ? 6 : 7,
            opacity: hovering ? 0.9 : 1,
          }}
          transition={{ duration: 0.18 }}
          style={{ translateX: "-50%", translateY: "-50%" }}
        />
      </motion.div>
      {/* ring — lags via spring, grows + turns blue on interactive hover */}
      <motion.div
        className="pointer-events-none fixed z-[100] mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        aria-hidden
      >
        <motion.div
          className="rounded-full border"
          animate={{
            width: hovering ? 44 : 30,
            height: hovering ? 44 : 30,
            scale: down ? 0.82 : 1,
            backgroundColor: hovering
              ? "rgba(23,56,213,0.12)"
              : "rgba(255,255,255,0)",
            borderColor: hovering
              ? "rgba(23,56,213,0.9)"
              : "rgba(255,255,255,0.7)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{ translateX: "-50%", translateY: "-50%" }}
        />
      </motion.div>
    </>
  );
}
