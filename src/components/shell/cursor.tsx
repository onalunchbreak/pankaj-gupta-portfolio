"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: dot follows instantly, ring lags via spring.
 * Grows on interactive elements; supports contextual labels via
 * data-cursor-label attribute on hover targets.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
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
        'a, button, [role="button"], [data-cursor], input, textarea, select, [data-cursor-label]'
      );
      if (interactive) {
        setHovering(true);
        const l = interactive.getAttribute("data-cursor-label");
        setLabel(l);
      } else {
        setHovering(false);
        setLabel(null);
      }
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
      {/* dot */}
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
            opacity: 1,
          }}
          transition={{ duration: 0.18 }}
          style={{ translateX: "-50%", translateY: "-50%" }}
        />
      </motion.div>
      {/* ring */}
      <motion.div
        className="pointer-events-none fixed z-[100] mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        aria-hidden
      >
        <motion.div
          className="flex items-center justify-center rounded-full border border-white/80"
          animate={{
            width: label ? 84 : hovering ? 44 : 30,
            height: label ? 84 : hovering ? 44 : 30,
            scale: down ? 0.82 : 1,
            backgroundColor: label ? "rgba(255,212,0,0.95)" : "rgba(255,255,255,0)",
            borderColor: label ? "rgba(255,212,0,0.95)" : "rgba(255,255,255,0.8)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          style={{ translateX: "-50%", translateY: "-50%" }}
        >
          {label && (
            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-black">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
