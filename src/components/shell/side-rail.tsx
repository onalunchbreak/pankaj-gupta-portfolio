"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useBootStore } from "@/hooks/use-boot";

export default function SideRail() {
  const booted = useBootStore((s) => s.booted);
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const pct = useTransform(p, (v) => Math.round(v * 100));

  const [pctStr, setPctStr] = useState("0");
  useEffect(() => {
    const unsub = pct.on("change", (v) => setPctStr(String(v)));
    return () => unsub();
  }, [pct]);

  return (
    <motion.aside
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-screen w-[34px] flex-col items-center justify-between border-r border-white/10 bg-[#0A0A0A]/40 py-5 lg:flex"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: booted ? 1 : 0, x: booted ? 0 : -20 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden
    >
      {/* top: name rotated */}
      <div className="flex flex-1 items-center justify-center">
        <span
          className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.35em] text-[#F4F1EA]/55"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Pankaj Gupta <span className="text-[#1738D5]">AKA</span> Mr. Onalunchbreak
        </span>
      </div>

      {/* middle: tagline rotated */}
      <div className="flex flex-1 items-center justify-center">
        <span
          className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.3em] text-[#6B6B6B]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          PRODUCT × AI × SYSTEMS
        </span>
      </div>

      {/* bottom: you've inspected X% */}
      <div className="flex flex-1 items-center justify-center">
        <span
          className="whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-[#F4F1EA]/70"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          you&rsquo;ve inspected{" "}
          <span className="font-bold text-[#1738D5] tabular-nums">{pctStr.padStart(2, "0")}%</span>
        </span>
      </div>
    </motion.aside>
  );
}
