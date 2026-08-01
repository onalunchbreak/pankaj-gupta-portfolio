"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { HERO } from "@/lib/data";
import { getLenis } from "@/lib/lenis-instance";

const EASE = [0.16, 1, 0.3, 1] as const;

const HERO_TAGS = [
  // Row 1 (top section y: 13% - 24%)
  { label: "CUSTOMER JOURNEY MAPPING", top: "14%", left: "4%", rotate: -4 },
  { label: "PRODUCT STRATEGY", top: "16%", left: "34%", rotate: 3 },
  { label: "APPLIED AI", top: "14%", left: "58%", rotate: -5 },
  { label: "STORYTELLING", top: "17%", left: "76%", rotate: 4 },

  // Row 2 (upper center y: 25% - 38%)
  { label: "PRODUCT ANALYTICS", top: "27%", left: "6%", rotate: 5 },
  { label: "USER RESEARCH", top: "29%", left: "30%", rotate: -3 },
  { label: "OKRs", top: "22%", left: "44%", rotate: -4 },
  { label: "FEATURE PRIORITIZATION", top: "23%", left: "68%", rotate: 2 },
  { label: "DATA SYSTEMS", top: "28%", left: "74%", rotate: -4 },

  // Row 3 (center space y: 40% - 54%)
  { label: "ITERATION", top: "42%", left: "4%", rotate: -6 },
  { label: "PRODUCT DISCOVERY", top: "44%", left: "22%", rotate: 4 },
  { label: "SYSTEM DESIGN", top: "37%", left: "46%", rotate: -2 },
  { label: "UAT", top: "35%", left: "62%", rotate: 6 },
  { label: "STAKEHOLDER MANAGEMENT", top: "45%", left: "66%", rotate: 5 },

  // Row 4 (lower center y: 56% - 70%)
  { label: "RAPID PROTOTYPING", top: "58%", left: "5%", rotate: 3 },
  { label: "METRICS THAT MATTER", top: "57%", left: "28%", rotate: -5 },
  { label: "ROAD MAPPING", top: "52%", left: "46%", rotate: 4 },
  { label: "PRICING STRATEGY", top: "60%", left: "56%", rotate: 4 },
  { label: "A/B TESTING", top: "56%", left: "80%", rotate: -3 },

  // Row 5 (bottom space y: 72% - 86%)
  { label: "GO-TO-MARKET STRATEGY", top: "74%", left: "6%", rotate: -3 },
  { label: "CHURN REDUCTION", top: "68%", left: "18%", rotate: -3 },
  { label: "RETENTION LOOPS", top: "67%", left: "44%", rotate: 3 },
  { label: "CROSS-FUNCTIONAL LEADERSHIP", top: "75%", left: "32%", rotate: 5 },
  { label: "COMPETITIVE ANALYSIS", top: "73%", left: "62%", rotate: -4 },
  { label: "WORKFLOW AUTOMATION", top: "76%", left: "78%", rotate: 3 },
  { label: "MARKETING RESEARCH", top: "84%", left: "70%", rotate: -2 },
];

function useLiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      let hours = d.getHours();
      const minutes = String(d.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const hoursStr = String(hours).padStart(2, "0");
      setTime(`${hoursStr}:${minutes} ${ampm}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const clock = useLiveClock();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset: -20, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="env-blue relative flex min-h-screen w-full flex-col justify-between overflow-hidden px-5 py-10 sm:px-8 sm:py-14"
    >
      {/* ---- L-shaped corner framing marks ---- */}
      <span aria-hidden className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-white/40 sm:left-6 sm:top-6 sm:h-6 sm:w-6" />
      <span aria-hidden className="pointer-events-none absolute right-4 top-4 h-5 w-5 border-r border-t border-white/40 sm:right-6 sm:top-6 sm:h-6 sm:w-6" />
      <span aria-hidden className="pointer-events-none absolute bottom-4 left-4 h-5 w-5 border-b border-l border-white/40 sm:bottom-6 sm:left-6 sm:h-6 sm:w-6" />
      <span aria-hidden className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-white/40 sm:bottom-6 sm:right-6 sm:h-6 sm:w-6" />

      {/* ---- Top metadata bar ---- */}
      <div className="relative z-20 flex w-full items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#F7F4ED]/75 sm:text-[11px] pointer-events-none">
        <motion.span
          className="max-w-[55%] leading-relaxed pointer-events-none pl-2 sm:pl-4"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
        >
          <span className="block text-[12px] sm:text-[14px] font-bold tracking-[0.22em] text-[#F7F4ED]">{HERO.topMeta}</span>
          <span className="inline-block text-[9px] sm:text-[10px] tracking-[0.22em] text-[#F7F4ED]/80 mt-1 px-2 py-0.5 border border-white/20 rounded-full bg-[#1738D5]/30">
            {HERO.topMetaSub}
          </span>
        </motion.span>

        <motion.div
          className="hidden max-w-[42%] text-right leading-relaxed sm:block pointer-events-auto z-20"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
        >
          {(() => {
            const parts = HERO.topLinks.split(" → ");
            const targets = ["best-work", "lab", "contact"];
            return (
              <>
                <span className="block text-[#F7F4ED]/80 select-none">{parts[0]}:</span>
                {parts.slice(1).map((part, index) => {
                  const targetId = targets[index];
                  return (
                    <button
                      key={part}
                      onClick={() => scrollTo(targetId)}
                      className="block w-full text-right text-white hover:text-[#FFD400] transition-colors focus:outline-none focus-ring select-none"
                    >
                      ↓ {part}
                    </button>
                  );
                })}
              </>
            );
          })()}
        </motion.div>
      </div>

      {/* ---- Symmetrically Centered System Time (Absolute positioned per device screen center) ---- */}
      <motion.span
        className="absolute left-1/2 top-3 -translate-x-1/2 z-20 text-center font-mono text-[13px] uppercase tracking-[0.2em] text-[#FFD400] sm:top-6 sm:text-[15px] font-bold pointer-events-none"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.6, ease: EASE }}
      >
        {clock}
      </motion.span>

      {/* ---- Coordinates top-right ---- */}
      <motion.span
        className="pointer-events-none absolute right-6 top-28 rotate-[3deg] select-none font-mono text-[9px] uppercase tracking-[0.18em] text-[#F7F4ED]/75 sm:right-16 sm:top-36 sm:text-[10px] hidden md:block z-20"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
        aria-hidden
      >
        28.6139° N, 77.2090° E
      </motion.span>

      {/* ---- Circular scroll indicator icon ---- */}
      <div
        className="pointer-events-none absolute z-20 flex h-6 w-6 items-center justify-center rounded-full border border-white/40 shadow-sm"
        style={{ top: "66%", left: "74%" }}
      >
        <div className="h-1.5 w-1.5 rounded-full bg-[#FFD400]" />
      </div>

      {/* ---- Expanded Word Cloud Layer (Desktop) ---- */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden hidden lg:block">
        {HERO_TAGS.map((tag, i) => (
          <motion.span
            key={`scatter-${tag.label}`}
            className="pulse-tag absolute cursor-default border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#F7F4ED]/85 bg-[#1738D5]/25 border-white/20 hover:border-[#FFD400] hover:text-[#FFD400] transition-colors select-none pointer-events-auto sm:text-[12px] lg:text-[13px]"
            style={{
              top: tag.top,
              left: tag.left,
              rotate: tag.rotate,
              "--rotate": `${tag.rotate}deg`,
              animationDelay: `${(i % 5) * 0.7}s`,
              animationDuration: `${4 + (i % 3) * 1.2}s`,
            } as any}
            initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.03, duration: 0.5, ease: EASE }}
          >
            {tag.label}
          </motion.span>
        ))}
      </div>

      {/* ---- Expanded Word Cloud Layer (Mobile / Tablet Reflow) ---- */}
      <div className="relative z-10 my-auto flex flex-wrap items-center justify-center gap-2.5 px-2 py-12 lg:hidden">
        {HERO_TAGS.map((tag, i) => (
          <motion.span
            key={`m-${tag.label}`}
            className="pulse-tag cursor-default border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#F7F4ED]/85 bg-[#1738D5]/35 border-white/20 hover:border-[#FFD400] hover:text-[#FFD400] transition-colors select-none sm:text-[11px]"
            style={{
              rotate: tag.rotate * 0.7,
              "--rotate": `${tag.rotate * 0.7}deg`,
            } as any}
            initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.02, duration: 0.4 }}
          >
            {tag.label}
          </motion.span>
        ))}
      </div>

      {/* ---- Scroll cue ---- */}
      <motion.div
        className="pointer-events-none relative z-20 mt-auto flex flex-col items-center gap-2 pt-6 sm:pt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <span className="hand-display text-2xl text-[#F7F4ED] sm:text-3xl">
          {HERO.scrollCta}
        </span>
        <motion.div
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        >
          <ChevronDown className="h-4 w-4 text-[#FFD400]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
