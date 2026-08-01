"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown, Search, Sparkles, Star, Settings, Compass, BarChart2 } from "lucide-react";
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

      {/* ---- Coordinates top-right ---- */}
      <motion.span
        className="pointer-events-none absolute right-6 top-24 rotate-[2deg] select-none font-mono text-[9px] uppercase tracking-[0.18em] text-[#F7F4ED] sm:right-16 sm:top-28 sm:text-[10px] hidden md:block z-20 transform-gpu backface-hidden antialiased"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
        aria-hidden
      >
        <span className="border-b border-[#FFD400]">28.6139° N, 77.2090° E</span>
      </motion.span>

      {/* ---- MAIN HERO CANVAS (Center Cutout Photo + Annotations + Outlined Tags) ---- */}
      <div className="relative z-10 my-auto flex w-full flex-1 items-center justify-center py-2">

        {/* ---- Centered Transparent Cutout Portrait of Pankaj Gupta ---- */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-end max-w-[85vw] sm:max-w-[440px] lg:max-w-[490px]"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="relative w-full h-[52vh] min-h-[390px] max-h-[570px] flex items-end justify-center">
            <Image
              src="/pankaj-hero-cutout.png"
              alt="Pankaj Gupta"
              width={580}
              height={720}
              priority
              className="h-full w-auto object-contain object-bottom select-none pointer-events-none"
            />
          </div>
        </motion.div>

        {/* ---- DESKTOP ANNOTATIONS & OUTLINED TAGS LAYER ---- */}
        <div className="pointer-events-none absolute inset-0 z-20 hidden lg:block">

          {/* === TOP-LEFT: Caption 1 + Arrow === */}
          <motion.div
            className="absolute top-[14%] left-[16%] flex flex-col items-start gap-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative hand-display text-2xl text-[#F7F4ED] -rotate-3 select-none">
              I connect the dots <span className="relative inline-block text-white">others miss.<span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FFD400] rounded-full" /></span>
              <Sparkles className="absolute -top-4 -right-6 h-5 w-5 text-[#FFD400]" />
            </div>

            {/* Dashed arrow terminating in open space */}
            <div className="mt-1 ml-8">
              <svg className="w-14 h-8 text-white/70" viewBox="0 0 50 30" fill="none" stroke="currentColor">
                <path d="M10,8 Q28,20 42,14" strokeDasharray="4 4" strokeWidth="1.5" />
                <polygon points="38,10 46,15 40,21" fill="currentColor" />
              </svg>
            </div>
          </motion.div>

          {/* Upper-Left Tag (Product Strategy) */}
          <motion.div
            className="absolute top-[32%] left-[6%] -rotate-2 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] hover:scale-[1.03] transition-all select-none cursor-default">
              <Sparkles className="h-3.5 w-3.5 text-[#FFD400]" />
              <span className="border-b border-[#FFD400] pb-0.5">PRODUCT STRATEGY</span>
            </div>
          </motion.div>

          {/* === MID-LEFT: Caption 2 + Tag 2 (User Research) + Tag 3 (Roadmapping) === */}
          <motion.div
            className="absolute top-[52%] left-[12%] flex flex-col items-start gap-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="hand-display text-2xl text-[#F7F4ED] rotate-2 select-none">
              small bets,<br />
              <span className="relative inline-block text-white">big impact.<span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FFD400] rounded-full" /></span>
            </div>

            {/* Dashed arrow */}
            <div className="mt-1 ml-12">
              <svg className="w-14 h-8 text-white/70" viewBox="0 0 50 30" fill="none" stroke="currentColor">
                <path d="M8,20 Q24,6 40,15" strokeDasharray="4 4" strokeWidth="1.5" />
                <polygon points="35,10 44,17 37,22" fill="currentColor" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-[70%] left-[6%] rotate-3 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] hover:scale-[1.03] transition-all select-none cursor-default">
              <Search className="h-3.5 w-3.5 text-[#FFD400]" />
              <span className="border-b border-[#FFD400] pb-0.5">USER RESEARCH</span>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-[82%] left-[18%] -rotate-2 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] hover:scale-[1.03] transition-all select-none cursor-default">
              <Compass className="h-3.5 w-3.5 text-[#FFD400]" />
              <span className="border-b border-[#FFD400] pb-0.5">ROADMAPPING</span>
            </div>
          </motion.div>

          {/* === TOP-RIGHT: Tag 4 (Applied AI) + Caption 3 (Curious by nature...) === */}
          <motion.div
            className="absolute top-[16%] right-[20%] rotate-2 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] hover:scale-[1.03] transition-all select-none cursor-default">
              <Star className="h-3.5 w-3.5 fill-[#FFD400] text-[#FFD400]" />
              <span className="border-b border-[#FFD400] pb-0.5">APPLIED AI</span>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-[32%] right-[12%] flex flex-col items-end gap-1 text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="relative hand-display text-2xl text-[#F7F4ED] -rotate-2 select-none">
              curious by nature,<br />
              obsessed with <span className="relative inline-block text-white">value.<span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FFD400] rounded-full" /></span>
              <span className="ml-2 font-sans text-xl text-[#FFD400]">:)</span>
            </div>

            {/* Dashed arrow pointing left toward head */}
            <div className="mt-1 mr-12">
              <svg className="w-16 h-8 text-white/70" viewBox="0 0 60 30" fill="none" stroke="currentColor">
                <path d="M50,8 Q30,22 10,12" strokeDasharray="4 4" strokeWidth="1.5" />
                <polygon points="14,6 5,12 12,18" fill="currentColor" />
              </svg>
            </div>
          </motion.div>

          {/* === MID-RIGHT: Tag 5 (Product Discovery) + Caption 4 (Data > opinion...) + Tag 6 (System Design) === */}
          <motion.div
            className="absolute top-[48%] right-[8%] rotate-3 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] hover:scale-[1.03] transition-all select-none cursor-default">
              <Sparkles className="h-3.5 w-3.5 text-[#FFD400]" />
              <span className="border-b border-[#FFD400] pb-0.5">PRODUCT DISCOVERY</span>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-[64%] right-[16%] flex flex-col items-end gap-1 text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 hand-display text-2xl text-[#F7F4ED] rotate-1 select-none">
              <span>
                data &gt; opinion<br />
                <span className="relative inline-block text-white">always.<span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FFD400] rounded-full" /></span>
              </span>
              <BarChart2 className="h-6 w-6 text-[#FFD400] ml-1" />
            </div>

            {/* Dashed arrow pointing left */}
            <div className="mt-1 mr-8">
              <svg className="w-14 h-8 text-white/70" viewBox="0 0 50 30" fill="none" stroke="currentColor">
                <path d="M42,8 Q24,22 6,15" strokeDasharray="4 4" strokeWidth="1.5" />
                <polygon points="10,9 2,14 9,20" fill="currentColor" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-[80%] right-[10%] -rotate-2 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] hover:scale-[1.03] transition-all select-none cursor-default">
              <Settings className="h-3.5 w-3.5 text-[#FFD400]" />
              <span className="border-b border-[#FFD400] pb-0.5">SYSTEM DESIGN</span>
            </div>
          </motion.div>

        </div>

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
          </div>
        </div>

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
