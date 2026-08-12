"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ChevronDown,
  Search,
  Sparkles,
  Star,
  Settings,
  Compass,
  BarChart2,
  SlidersHorizontal,
  RotateCcw,
  MessageSquare,
  Cpu,
} from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { HERO } from "@/lib/data";
import { getLenis } from "@/lib/lenis-instance";

const EASE = [0.16, 1, 0.3, 1] as const;

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

  // Interactive Live Scale, X-Position & Y-Position Controls
  const [scale, setScale] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hero_portrait_scale");
      if (saved) return Number(saved);
    }
    return 100;
  });

  const [xOffset, setXOffset] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hero_portrait_x");
      if (saved) return Number(saved);
    }
    return 0;
  });

  const [yOffset, setYOffset] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("hero_portrait_y");
      if (saved) return Number(saved);
    }
    return 0;
  });

  const [showControls, setShowControls] = useState(false);

  const updateScale = (val: number) => {
    setScale(val);
    localStorage.setItem("hero_portrait_scale", String(val));
  };

  const updateX = (val: number) => {
    setXOffset(val);
    localStorage.setItem("hero_portrait_x", String(val));
  };

  const updateY = (val: number) => {
    setYOffset(val);
    localStorage.setItem("hero_portrait_y", String(val));
  };

  const resetControls = () => {
    setScale(100);
    setXOffset(0);
    setYOffset(0);
    localStorage.removeItem("hero_portrait_scale");
    localStorage.removeItem("hero_portrait_x");
    localStorage.removeItem("hero_portrait_y");
  };

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

  // Dynamic reverse parallax offset for surrounding elements
  const tagXOffset = -xOffset * 0.75;
  const tagOpacity = Math.max(0.15, 1 - Math.abs(xOffset) / 550);

  return (
    <section
      id="hero"
      className="env-blue relative flex min-h-screen w-full flex-col justify-between overflow-hidden px-5 py-8 sm:px-8 sm:py-12 select-none"
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
          <span className="block text-[12px] sm:text-[14px] font-bold tracking-[0.22em] text-[#F7F4ED]">
            {HERO.topMeta}
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
                      className="block w-full text-right text-white hover:text-[#FFD400] transition-colors focus:outline-none focus-ring select-none cursor-pointer"
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

      {/* ---- Symmetrically Centered System Time ---- */}
      <motion.span
        className="absolute left-1/2 top-3 -translate-x-1/2 z-20 text-center font-mono text-[13px] uppercase tracking-[0.2em] text-[#FFD400] sm:top-6 sm:text-[15px] font-bold pointer-events-none"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.6, ease: EASE }}
      >
        {clock}
      </motion.span>

      {/* ---- MAIN HERO CANVAS (Center Cutout Photo + Symmetrical Tag & Caption Pairings) ---- */}
      <div className="relative z-10 my-auto flex w-full flex-1 items-center justify-center py-1">

        {/* ---- Centered Cutout Portrait of Pankaj Gupta (UNTOUCHED) ---- */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-end w-full max-w-[680px] lg:max-w-[820px] -mt-8 sm:-mt-12 mb-2 origin-bottom pointer-events-none"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, scale: scale / 100, x: xOffset, y: yOffset }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          <div className="relative w-full h-[72vh] min-h-[500px] max-h-[760px] flex items-end justify-center">
            <Image
              src="/pankaj-hero-cutout.png"
              alt="Pankaj Gupta"
              width={1000}
              height={1200}
              priority
              className="h-full w-auto object-contain object-bottom select-none pointer-events-none transform-gpu"
            />
          </div>
        </motion.div>

        {/* ---- DESKTOP ORGANIC ANNOTATIONS & SKILL TAGS (Expressive Directional Sketchbook Flow) ---- */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 hidden lg:block"
          animate={{ x: tagXOffset, opacity: tagOpacity }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >

          {/* ==================== LEFT COLUMN ==================== */}
          <div className="absolute top-[3%] bottom-[4%] left-[4%] flex w-[33%] flex-col justify-between items-start pointer-events-none">

            {/* Left Pair 1: Arrow points FROM Pankaj (center) OUTWARDS to "I connect the dots others miss." */}
            <motion.div
              className="flex flex-col items-start gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative flex items-center gap-2">
                {/* Arrow pointing FROM Pankaj (center) OUTWARD LEFT to quote */}
                <svg className="w-20 h-10 text-[#FFD400] shrink-0" viewBox="0 0 80 36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 74 18 Q 40 6 10 20" strokeDasharray="4 4" />
                  <path d="M 22 12 L 8 21 L 20 29" strokeWidth="2.5" />
                </svg>
                <div className="hand-display text-2xl text-[#F7F4ED] -rotate-2 select-none">
                  I connect the dots <span className="relative inline-block text-white">others miss.<span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FFD400] rounded-full" /></span>
                  <Sparkles className="absolute -top-3 -right-4 h-4 w-4 text-[#FFD400]" />
                </div>
              </div>
              <div className="mt-1 ml-14 pointer-events-auto -rotate-1">
                <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] hover:scale-[1.03] transition-all select-none cursor-default">
                  <Sparkles className="h-3.5 w-3.5 text-[#FFD400]" />
                  <span className="border-b border-[#FFD400] pb-0.5">PRODUCT STRATEGY</span>
                </div>
              </div>
            </motion.div>

            {/* Left Pair 2: USER RESEARCH chip -> Arrow points RIGHTWARD to "small bets, big impact." (shifted closer to Pankaj) */}
            <motion.div
              className="ml-6 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.42, duration: 0.6 }}
            >
              <div className="pointer-events-auto rotate-2">
                <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] hover:scale-[1.03] transition-all select-none cursor-default">
                  <Search className="h-3.5 w-3.5 text-[#FFD400]" />
                  <span className="border-b border-[#FFD400] pb-0.5">USER RESEARCH</span>
                </div>
              </div>

              {/* Hand-drawn arrow from USER RESEARCH pointing right to quote */}
              <svg className="w-16 h-8 text-[#FFD400] shrink-0" viewBox="0 0 65 28" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 6 14 Q 34 6 56 16" strokeDasharray="4 4" />
                <path d="M 44 9 L 58 17 L 46 24" strokeWidth="2.5" />
              </svg>

              <div className="hand-display text-2xl text-[#F7F4ED] rotate-2 select-none">
                small bets,<br />
                <span className="relative inline-block text-white">big impact.<span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FFD400] rounded-full" /></span>
              </div>
            </motion.div>

            {/* Left Pair 3: "Fewer clicks, same outcome." -> Direct arrow down to WORKFLOW AUTOMATION chip */}
            <motion.div
              className="flex flex-col items-start gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.54, duration: 0.6 }}
            >
              <div className="hand-display text-xl text-[#F7F4ED] -rotate-1 select-none">
                Fewer clicks,<br />
                <span className="relative inline-block text-white">same outcome.<span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FFD400] rounded-full" /></span>
              </div>
              <div className="ml-8 my-0.5">
                <svg className="w-10 h-10 text-[#FFD400] shrink-0" viewBox="0 0 38 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 18 4 Q 28 20 19 32" strokeDasharray="4 4" />
                  <path d="M 10 22 L 19 34 L 29 23" strokeWidth="2.5" />
                </svg>
              </div>
              <div className="pointer-events-auto rotate-1">
                <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] hover:scale-[1.03] transition-all select-none cursor-default">
                  <Cpu className="h-3.5 w-3.5 text-[#FFD400]" />
                  <span className="border-b border-[#FFD400] pb-0.5">WORKFLOW AUTOMATION</span>
                </div>
              </div>
            </motion.div>

            {/* Left Pair 4: Shifted slightly rightward (closer to Pankaj), arrow pointing to ROADMAPPING */}
            <motion.div
              className="ml-8 flex flex-col items-start gap-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
            >
              <div className="hand-display text-xl text-[#F7F4ED] -rotate-2 select-none">
                Plans change.<br />
                <span className="relative inline-block text-white">Direction shouldn't.<span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FFD400] rounded-full" /></span>
              </div>
              <div className="ml-8 my-0.5">
                <svg className="w-10 h-10 text-[#FFD400] shrink-0" viewBox="0 0 38 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 18 4 Q 28 20 19 32" strokeDasharray="4 4" />
                  <path d="M 10 22 L 19 34 L 29 23" strokeWidth="2.5" />
                </svg>
              </div>
              <div className="pointer-events-auto -rotate-2">
                <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] hover:scale-[1.03] transition-all select-none cursor-default">
                  <Compass className="h-3.5 w-3.5 text-[#FFD400]" />
                  <span className="border-b border-[#FFD400] pb-0.5">ROADMAPPING</span>
                </div>
              </div>
            </motion.div>
          </div>


          {/* ==================== RIGHT COLUMN ==================== */}
          <div className="absolute top-[3%] bottom-[4%] right-[4%] flex w-[33%] flex-col justify-between items-end text-right pointer-events-none">

            {/* Right Pair 1: Arrow points FROM Pankaj's head (doodle lines) OUTWARD to "curious by nature, obsessed with value. :)" */}
            <motion.div
              className="flex flex-col items-end gap-1 text-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              <div className="relative flex items-center gap-2">
                {/* Arrow coming from Pankaj's head pointing OUTWARD RIGHT to quote */}
                <svg className="w-20 h-10 text-[#FFD400] shrink-0" viewBox="0 0 80 36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 6 18 Q 40 6 70 20" strokeDasharray="4 4" />
                  <path d="M 58 12 L 72 21 L 60 29" strokeWidth="2.5" />
                </svg>
                <div className="hand-display text-2xl text-[#F7F4ED] -rotate-1 select-none">
                  curious by nature,<br />
                  obsessed with <span className="relative inline-block text-white">value.<span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FFD400] rounded-full" /></span>
                  <span className="ml-2 font-sans text-xl text-[#FFD400]">:)</span>
                </div>
              </div>
              <div className="mt-1 mr-2 pointer-events-auto rotate-2">
                <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] hover:scale-[1.03] transition-all select-none cursor-default">
                  <Star className="h-3.5 w-3.5 fill-[#FFD400] text-[#FFD400]" />
                  <span className="border-b border-[#FFD400] pb-0.5">APPLIED AI</span>
                </div>
              </div>
            </motion.div>

            {/* Right Pair 2: "Numbers don't sell themselves. Stories do." placed ABOVE STORYTELLING chip */}
            <motion.div
              className="mr-2 flex flex-col items-end gap-1 text-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.48, duration: 0.6 }}
            >
              <div className="hand-display text-xl text-[#F7F4ED] rotate-1 select-none">
                Numbers don't sell themselves.<br />
                <span className="relative inline-block text-white">Stories do.<span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FFD400] rounded-full" /></span>
              </div>
              {/* Arrow pointing down from quote to STORYTELLING chip */}
              <div className="mr-8 my-0.5">
                <svg className="w-10 h-10 text-[#FFD400] shrink-0" viewBox="0 0 38 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 20 4 Q 10 20 19 32" strokeDasharray="4 4" />
                  <path d="M 9 22 L 19 34 L 29 23" strokeWidth="2.5" />
                </svg>
              </div>
              <div className="pointer-events-auto -rotate-1">
                <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] hover:scale-[1.03] transition-all select-none cursor-default">
                  <MessageSquare className="h-3.5 w-3.5 text-[#FFD400]" />
                  <span className="border-b border-[#FFD400] pb-0.5">STORYTELLING</span>
                </div>
              </div>
            </motion.div>

            {/* Right Pair 3: PRODUCT DISCOVERY chip ON TOP, "data > opinion, always." BELOW it, Arrow pointing UPWARDS to tag */}
            <motion.div
              className="flex flex-col items-end gap-1 text-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.58, duration: 0.6 }}
            >
              <div className="pointer-events-auto rotate-3">
                <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] hover:scale-[1.03] transition-all select-none cursor-default">
                  <Sparkles className="h-3.5 w-3.5 text-[#FFD400]" />
                  <span className="border-b border-[#FFD400] pb-0.5">PRODUCT DISCOVERY</span>
                </div>
              </div>
              {/* Arrow pointing UPWARDS from quote to PRODUCT DISCOVERY tag */}
              <div className="mr-12 my-0.5">
                <svg className="w-10 h-10 text-[#FFD400] shrink-0" viewBox="0 0 38 40" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 19 36 Q 10 20 20 8" strokeDasharray="4 4" />
                  <path d="M 10 17 L 20 5 L 29 16" strokeWidth="2.5" />
                </svg>
              </div>
              <div className="flex items-center gap-2 hand-display text-2xl text-[#F7F4ED] rotate-1 select-none">
                <span>
                  data &gt; opinion<br />
                  <span className="relative inline-block text-white">always.<span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FFD400] rounded-full" /></span>
                </span>
                <BarChart2 className="h-6 w-6 text-[#FFD400] ml-1" />
              </div>
            </motion.div>

            {/* Right Pair 4: SYSTEM DESIGN chip on TOP -> Arrow points DOWNWARDS to "scalable architectures, zero noise." below */}
            <motion.div
              className="flex flex-col items-end gap-1 text-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.68, duration: 0.6 }}
            >
              <div className="pointer-events-auto -rotate-2">
                <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] hover:scale-[1.03] transition-all select-none cursor-default">
                  <Settings className="h-3.5 w-3.5 text-[#FFD400]" />
                  <span className="border-b border-[#FFD400] pb-0.5">SYSTEM DESIGN</span>
                </div>
              </div>
              {/* Hand-drawn arrow pointing downwards from chip to quote */}
              <div className="mr-8 my-1">
                <svg className="w-10 h-12 text-[#FFD400] shrink-0" viewBox="0 0 38 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 20 6 Q 10 24 19 38" strokeDasharray="4 4" />
                  <path d="M 9 28 L 19 40 L 29 29" strokeWidth="2.5" />
                </svg>
              </div>
              <div className="hand-display text-xl text-[#F7F4ED] -rotate-1 select-none">
                scalable architectures,<br />
                <span className="relative inline-block text-white">zero noise.<span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FFD400] rounded-full" /></span>
              </div>
            </motion.div>

          </div>

        </motion.div>

        {/* ---- MOBILE / TABLET REFLOW ---- */}
        <div className="relative z-20 mt-6 flex flex-col items-center gap-4 text-center lg:hidden px-4">
          <div className="hand-display text-xl text-[#F7F4ED]">
            I connect the dots <span className="border-b-2 border-[#FFD400]">others miss.</span>
          </div>
          <div className="hand-display text-xl text-[#F7F4ED]">
            curious by nature, obsessed with <span className="border-b-2 border-[#FFD400]">value. :)</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-2">
            <span className="flex items-center gap-1.5 rounded-sm border border-white/40 px-3 py-1 font-mono text-[10px] uppercase text-white">
              <Sparkles className="h-3 w-3 text-[#FFD400]" />
              <span className="border-b border-[#FFD400]">PRODUCT STRATEGY</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-sm border border-white/40 px-3 py-1 font-mono text-[10px] uppercase text-white">
              <Star className="h-3 w-3 text-[#FFD400] fill-[#FFD400]" />
              <span className="border-b border-[#FFD400]">APPLIED AI</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-sm border border-white/40 px-3 py-1 font-mono text-[10px] uppercase text-white">
              <Search className="h-3 w-3 text-[#FFD400]" />
              <span className="border-b border-[#FFD400]">USER RESEARCH</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-sm border border-white/40 px-3 py-1 font-mono text-[10px] uppercase text-white">
              <Sparkles className="h-3 w-3 text-[#FFD400]" />
              <span className="border-b border-[#FFD400]">PRODUCT DISCOVERY</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-sm border border-white/40 px-3 py-1 font-mono text-[10px] uppercase text-white">
              <Compass className="h-3 w-3 text-[#FFD400]" />
              <span className="border-b border-[#FFD400]">ROADMAPPING</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-sm border border-white/40 px-3 py-1 font-mono text-[10px] uppercase text-white">
              <Settings className="h-3 w-3 text-[#FFD400]" />
              <span className="border-b border-[#FFD400]">SYSTEM DESIGN</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-sm border border-white/40 px-3 py-1 font-mono text-[10px] uppercase text-white">
              <MessageSquare className="h-3 w-3 text-[#FFD400]" />
              <span className="border-b border-[#FFD400]">STORYTELLING</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-sm border border-white/40 px-3 py-1 font-mono text-[10px] uppercase text-white">
              <Cpu className="h-3 w-3 text-[#FFD400]" />
              <span className="border-b border-[#FFD400]">WORKFLOW AUTOMATION</span>
            </span>
          </div>
        </div>

      </div>

      {/* ---- INTERACTIVE LIVE PORTRAIT RESIZER & PANNER HUD (Image resizer label) ---- */}
      <div className="fixed bottom-4 right-16 z-[80] pointer-events-auto">
        {showControls ? (
          <motion.div
            className="flex flex-col gap-2 rounded-md border border-white/20 bg-[#0A0A0A]/90 p-3 font-mono text-[11px] text-white shadow-2xl backdrop-blur-md w-64"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5 font-bold text-[#FFD400]">
              <span className="flex items-center gap-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>IMAGE RESIZER</span>
              </span>
              <button
                onClick={() => setShowControls(false)}
                className="text-white/60 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scale Control */}
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex justify-between text-[10px] text-white/80">
                <span>SCALE:</span>
                <span className="font-bold text-[#FFD400]">{scale}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={scale}
                onChange={(e) => updateScale(Number(e.target.value))}
                className="w-full accent-[#FFD400] cursor-pointer"
              />
            </div>

            {/* X-Offset Control (Reverse Parallax Shift) */}
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex justify-between text-[10px] text-white/80">
                <span>POSITION (X):</span>
                <span className="font-bold text-[#FFD400]">{xOffset}px</span>
              </div>
              <input
                type="range"
                min="-600"
                max="600"
                value={xOffset}
                onChange={(e) => updateX(Number(e.target.value))}
                className="w-full accent-[#FFD400] cursor-pointer"
              />
            </div>

            {/* Y-Offset Control */}
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex justify-between text-[10px] text-white/80">
                <span>POSITION (Y):</span>
                <span className="font-bold text-[#FFD400]">{yOffset}px</span>
              </div>
              <input
                type="range"
                min="-80"
                max="60"
                value={yOffset}
                onChange={(e) => updateY(Number(e.target.value))}
                className="w-full accent-[#FFD400] cursor-pointer"
              />
            </div>

            {/* Reset Button */}
            <button
              onClick={resetControls}
              className="mt-2 flex items-center justify-center gap-1.5 rounded border border-white/20 bg-white/10 py-1 text-[10px] uppercase hover:bg-white/20 transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" /> Reset Default
            </button>
          </motion.div>
        ) : (
          <button
            onClick={() => setShowControls(true)}
            className="flex items-center gap-1.5 rounded border border-white/20 bg-[#0A0A0A]/80 px-2.5 py-1.5 font-mono text-[10px] uppercase text-[#F7F4ED] backdrop-blur-md hover:border-[#FFD400] hover:text-[#FFD400] transition-colors shadow-lg cursor-pointer"
            title="Open Image Resizer Controls"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#FFD400]" />
            <span className="hidden sm:inline">Image resizer</span>
          </button>
        )}
      </div>

      {/* ---- Scroll cue ---- */}
      <motion.div
        className="pointer-events-none relative z-20 mt-auto flex flex-col items-center gap-2 pt-4 sm:pt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <span className="hand-display text-2xl text-[#F7F4ED] sm:text-3xl border-b-2 border-[#FFD400] pb-0.5 select-none">
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
