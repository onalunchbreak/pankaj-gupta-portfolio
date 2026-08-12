"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useBootStore } from "@/hooks/use-boot";
import { useActiveSection } from "@/hooks/use-active-section";
import { NAV_ITEMS } from "@/lib/data";

// Sections with light (paper) backgrounds need dark rail text.
const LIGHT_BG_SECTIONS = new Set([
  "origin",
  "research",
  "achievements",
]);

export default function SideRail() {
  const booted = useBootStore((s) => s.booted);
  const ids = NAV_ITEMS.map((n) => n.id);
  const active = useActiveSection(ids);
  const { scrollYProgress } = useScroll();
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const pct = useTransform(p, (v) => Math.round(v * 100));

  const [pctStr, setPctStr] = useState("0");
  useEffect(() => {
    const unsub = pct.on("change", (v) => setPctStr(String(v)));
    return () => unsub();
  }, [pct]);

  // Adapt rail colors to the active section's background.
  const onLightBg = LIGHT_BG_SECTIONS.has(active);
  const nameText = onLightBg ? "text-[#1a1a1a]/85" : "text-[#F4F1EA]/85";
  const taglineText = onLightBg ? "text-[#1a1a1a]/75" : "text-[#A3A3A3]";
  const progressText = onLightBg ? "text-[#1a1a1a]/90" : "text-[#F4F1EA]/90";
  const railBg = onLightBg ? "bg-[#F4F1EA]/40" : "bg-[#0A0A0A]/40";
  const railBorder = onLightBg ? "border-[#1a1a1a]/10" : "border-white/10";

  return (
    <motion.aside
      className={`pointer-events-none fixed left-0 top-0 z-[70] hidden h-screen w-[34px] flex-col items-center justify-between border-r py-5 transition-colors duration-500 lg:flex ${railBg} ${railBorder}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: booted ? 1 : 0, x: booted ? 0 : -20 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden
    >
      {/* top: name rotated */}
      <div className="flex flex-1 items-center justify-center">
        <span
          className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.35em] transition-colors duration-500 ${nameText}`}
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Pankaj Gupta <span className="text-[#1738D5]">·</span> PORTFOLIO
        </span>
      </div>

      {/* middle: tagline rotated */}
      <div className="flex flex-1 items-center justify-center">
        <span
          className={`whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.3em] transition-colors duration-500 ${taglineText}`}
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          PRODUCT × AI × SYSTEMS
        </span>
      </div>

      {/* bottom: you've inspected X% */}
      <div className="flex flex-1 items-center justify-center">
        <span
          className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] transition-colors duration-500 ${progressText}`}
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          you&rsquo;ve inspected{" "}
          <span className="font-bold text-[#1738D5] tabular-nums">{pctStr.padStart(2, "0")}%</span>
        </span>
      </div>
    </motion.aside>
  );
}
