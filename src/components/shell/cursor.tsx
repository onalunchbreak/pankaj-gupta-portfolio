"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: dot follows instantly, ring lags via spring.
 * Grows + changes color on interactive elements.
 *
 * Per user request: NO text labels are rendered inside the cursor.
 * The cursor only changes size + color when hovering interactive
 * elements — the ring grows and turns blue, no labels of any kind.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 35, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 35, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    document.documentElement.classList.add("cursor-none-fine");

    const move = (e: MouseEvent) => {
      setHasMoved(true);
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

  if (!enabled || !hasMoved) return null;

  return (
    <>
      {/* dot — follows instantly, uses mix-blend-difference for visibility on all backgrounds */}
      <motion.div
        className="pointer-events-none fixed z-[100] mix-blend-difference"
        style={{ x, y }}
        aria-hidden
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: hovering ? 5 : 7,
            height: hovering ? 5 : 7,
            opacity: 1,
          }}
          transition={{ duration: 0.18 }}
          style={{ translateX: "-50%", translateY: "-50%" }}
        />
      </motion.div>
      {/* ring — lags via spring, grows + turns blue on interactive hover.
           No mix-blend-difference so the blue color change is clearly visible. */}
      <motion.div
        className="pointer-events-none fixed z-[100]"
        style={{ x: ringX, y: ringY }}
        aria-hidden
      >
        <motion.div
          className="rounded-full border-2"
          animate={{
            width: hovering ? 48 : 32,
            height: hovering ? 48 : 32,
            scale: down ? 0.82 : 1,
            backgroundColor: hovering
              ? "rgba(23,56,213,0.15)"
              : "rgba(255,255,255,0)",
            borderColor: hovering
              ? "rgba(23,56,213,1)"
              : "rgba(255,255,255,0.5)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{ translateX: "-50%", translateY: "-50%" }}
        />
      </motion.div>
    </>
  );
}
