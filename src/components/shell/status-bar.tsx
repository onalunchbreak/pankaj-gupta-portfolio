"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useActiveSection } from "@/hooks/use-active-section";
import { NAV_ITEMS } from "@/lib/data";

function useClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setT(
        `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function StatusBar() {
  const ids = NAV_ITEMS.map((n) => n.id);
  const active = useActiveSection(ids);
  const clock = useClock();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const activeLabel = NAV_ITEMS.find((n) => n.id === active)?.label.toUpperCase() ?? "…";

  return (
    <div className="fixed inset-x-0 top-0 z-[80] border-b border-white/10 bg-[#0A0A0A]/85 backdrop-blur-md">
      <div className="flex h-9 items-center justify-between px-3 font-mono text-[10px] uppercase tracking-widest text-[#F4F1EA]/70 sm:px-5 sm:text-[11px]">
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 bg-[#FF3B30] blink" />
            SYS.TRACK_ACTIVE
          </span>
          <span className="hidden h-3 w-px bg-white/15 sm:block" />
          <span className="hidden items-center gap-1.5 sm:flex">
            <span className="text-[#FFD400]">●</span>
            LOC: <span className="text-[#F4F1EA]">{activeLabel}</span>
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden sm:inline">VOL.2026</span>
          <span className="hidden h-3 w-px bg-white/15 sm:block" />
          <span className="tabular-nums text-[#F4F1EA]">{clock}</span>
        </div>
      </div>
      {/* scroll progress hairline */}
      <motion.div
        className="h-px origin-left bg-[#FFD400]"
        style={{ scaleX }}
      />
    </div>
  );
}
