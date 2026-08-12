"use client";
import { useEffect, useState, useRef } from "react";
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
  Move,
  Copy,
  Check,
  RotateCw,
  Maximize2,
  ArrowRightLeft,
  Eye,
  EyeOff,
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

export interface ItemConfig {
  x: number;
  y: number;
  scale: number;
  arrowScale: number;
  arrowRotation: number;
  flipArrow: boolean;
}

export type LayoutState = Record<string, ItemConfig>;

const DEFAULT_LAYOUT: LayoutState = {
  "product-strategy": { x: 0, y: 0, scale: 1, arrowScale: 1, arrowRotation: 0, flipArrow: false },
  "user-research": { x: 0, y: 0, scale: 1, arrowScale: 1, arrowRotation: 0, flipArrow: false },
  "workflow-automation": { x: 0, y: 0, scale: 1, arrowScale: 1, arrowRotation: 0, flipArrow: false },
  "roadmapping": { x: 0, y: 0, scale: 1, arrowScale: 1, arrowRotation: 0, flipArrow: false },
  "applied-ai": { x: 0, y: 0, scale: 1, arrowScale: 1, arrowRotation: 0, flipArrow: false },
  "storytelling": { x: 0, y: 0, scale: 1, arrowScale: 1, arrowRotation: 0, flipArrow: false },
  "product-discovery": { x: 0, y: 0, scale: 1, arrowScale: 1, arrowRotation: 0, flipArrow: false },
  "system-design": { x: 0, y: 0, scale: 1, arrowScale: 1, arrowRotation: 0, flipArrow: false },
};

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const clock = useLiveClock();

  // Master Portrait State
  const [scale, setScale] = useState(100);
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);

  // Live Canvas Editor State
  const [layoutMode, setLayoutMode] = useState(true); // Default active for user customization
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [items, setItems] = useState<LayoutState>(DEFAULT_LAYOUT);

  // Load saved positions on mount
  useEffect(() => {
    try {
      const savedLayout = localStorage.getItem("hero_custom_layout");
      if (savedLayout) {
        setItems(JSON.parse(savedLayout));
      }
      const savedScale = localStorage.getItem("hero_portrait_scale");
      if (savedScale) setScale(Number(savedScale));
      const savedX = localStorage.getItem("hero_portrait_x");
      if (savedX) setXOffset(Number(savedX));
      const savedY = localStorage.getItem("hero_portrait_y");
      if (savedY) setYOffset(Number(savedY));
    } catch {
      // fallback to defaults
    }
  }, []);

  // Save changes to localStorage
  const updateItem = (id: string, partial: Partial<ItemConfig>) => {
    setItems((prev) => {
      const updated = {
        ...prev,
        [id]: { ...(prev[id] || DEFAULT_LAYOUT[id]), ...partial },
      };
      localStorage.setItem("hero_custom_layout", JSON.stringify(updated));
      return updated;
    });
  };

  const resetAllLayout = () => {
    setItems(DEFAULT_LAYOUT);
    localStorage.removeItem("hero_custom_layout");
  };

  const copyLayoutJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(items, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

      {/* ---- MAIN HERO CANVAS (Center Cutout Photo + Dynamic Draggable Flank Pairings) ---- */}
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

        {/* ---- DESKTOP LIVE DRAGGABLE ANNOTATIONS & SKILL TAGS LAYER ---- */}
        <motion.div
          className="absolute inset-0 z-20 hidden lg:block pointer-events-none"
          animate={{ x: tagXOffset, opacity: tagOpacity }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          {/* ==================== LEFT COLUMN (4 DRAGGABLE ITEMS) ==================== */}
          <div className="absolute top-[3%] bottom-[4%] left-[3%] flex w-[36%] flex-col justify-between items-start pointer-events-none">

            {/* Left Pair 1: PRODUCT STRATEGY */}
            {(() => {
              const id = "product-strategy";
              const cfg = items[id] || DEFAULT_LAYOUT[id];
              const isSelected = selectedId === id;
              return (
                <motion.div
                  drag
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    updateItem(id, { x: cfg.x + info.offset.x, y: cfg.y + info.offset.y });
                  }}
                  onClick={() => setSelectedId(id)}
                  style={{ x: cfg.x, y: cfg.y, scale: cfg.scale }}
                  className={`pointer-events-auto relative group flex flex-col items-start gap-1 p-2 rounded-md transition-shadow cursor-grab active:cursor-grabbing ${
                    layoutMode ? "hover:outline hover:outline-1 hover:outline-[#FFD400]/70" : ""
                  } ${isSelected && layoutMode ? "outline outline-2 outline-[#FFD400] bg-black/20 backdrop-blur-xs" : ""}`}
                >
                  <div className="relative flex items-center gap-2">
                    <svg
                      style={{
                        transform: `scale(${cfg.arrowScale}) scaleX(${cfg.flipArrow ? -1 : 1}) rotate(${cfg.arrowRotation}deg)`,
                      }}
                      className="w-20 h-10 text-[#FFD400] shrink-0 transition-transform"
                      viewBox="0 0 80 36"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M 74 18 Q 40 6 10 20" strokeDasharray="4 4" />
                      <path d="M 22 12 L 8 21 L 20 29" strokeWidth="2.5" />
                    </svg>
                    <div className="hand-display text-2xl text-[#F7F4ED] -rotate-2 select-none">
                      I connect the dots <span className="relative inline-block text-white">others miss.<span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FFD400] rounded-full" /></span>
                      <Sparkles className="absolute -top-3 -right-4 h-4 w-4 text-[#FFD400]" />
                    </div>
                  </div>
                  <div className="mt-1 ml-14 -rotate-1">
                    <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] select-none">
                      <Sparkles className="h-3.5 w-3.5 text-[#FFD400]" />
                      <span className="border-b border-[#FFD400] pb-0.5">PRODUCT STRATEGY</span>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* Left Pair 2: USER RESEARCH */}
            {(() => {
              const id = "user-research";
              const cfg = items[id] || DEFAULT_LAYOUT[id];
              const isSelected = selectedId === id;
              return (
                <motion.div
                  drag
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    updateItem(id, { x: cfg.x + info.offset.x, y: cfg.y + info.offset.y });
                  }}
                  onClick={() => setSelectedId(id)}
                  style={{ x: cfg.x, y: cfg.y, scale: cfg.scale }}
                  className={`pointer-events-auto relative group ml-6 flex items-center gap-2 p-2 rounded-md transition-shadow cursor-grab active:cursor-grabbing ${
                    layoutMode ? "hover:outline hover:outline-1 hover:outline-[#FFD400]/70" : ""
                  } ${isSelected && layoutMode ? "outline outline-2 outline-[#FFD400] bg-black/20 backdrop-blur-xs" : ""}`}
                >
                  <div className="rotate-2">
                    <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] select-none">
                      <Search className="h-3.5 w-3.5 text-[#FFD400]" />
                      <span className="border-b border-[#FFD400] pb-0.5">USER RESEARCH</span>
                    </div>
                  </div>

                  <svg
                    style={{
                      transform: `scale(${cfg.arrowScale}) scaleX(${cfg.flipArrow ? -1 : 1}) rotate(${cfg.arrowRotation}deg)`,
                    }}
                    className="w-16 h-8 text-[#FFD400] shrink-0 transition-transform"
                    viewBox="0 0 65 28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M 6 14 Q 34 6 56 16" strokeDasharray="4 4" />
                    <path d="M 44 9 L 58 17 L 46 24" strokeWidth="2.5" />
                  </svg>

                  <div className="hand-display text-2xl text-[#F7F4ED] rotate-2 select-none">
                    small bets,<br />
                    <span className="relative inline-block text-white">big impact.<span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FFD400] rounded-full" /></span>
                  </div>
                </motion.div>
              );
            })()}

            {/* Left Pair 3: WORKFLOW AUTOMATION */}
            {(() => {
              const id = "workflow-automation";
              const cfg = items[id] || DEFAULT_LAYOUT[id];
              const isSelected = selectedId === id;
              return (
                <motion.div
                  drag
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    updateItem(id, { x: cfg.x + info.offset.x, y: cfg.y + info.offset.y });
                  }}
                  onClick={() => setSelectedId(id)}
                  style={{ x: cfg.x, y: cfg.y, scale: cfg.scale }}
                  className={`pointer-events-auto relative group flex flex-col items-start gap-1 p-2 rounded-md transition-shadow cursor-grab active:cursor-grabbing ${
                    layoutMode ? "hover:outline hover:outline-1 hover:outline-[#FFD400]/70" : ""
                  } ${isSelected && layoutMode ? "outline outline-2 outline-[#FFD400] bg-black/20 backdrop-blur-xs" : ""}`}
                >
                  <div className="hand-display text-xl text-[#F7F4ED] -rotate-1 select-none">
                    Fewer clicks,<br />
                    <span className="relative inline-block text-white">same outcome.<span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FFD400] rounded-full" /></span>
                  </div>
                  <div className="ml-8 my-0.5">
                    <svg
                      style={{
                        transform: `scale(${cfg.arrowScale}) scaleX(${cfg.flipArrow ? -1 : 1}) rotate(${cfg.arrowRotation}deg)`,
                      }}
                      className="w-10 h-10 text-[#FFD400] shrink-0 transition-transform"
                      viewBox="0 0 38 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M 18 4 Q 28 20 19 32" strokeDasharray="4 4" />
                      <path d="M 10 22 L 19 34 L 29 23" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="rotate-1">
                    <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] select-none">
                      <Cpu className="h-3.5 w-3.5 text-[#FFD400]" />
                      <span className="border-b border-[#FFD400] pb-0.5">WORKFLOW AUTOMATION</span>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* Left Pair 4: ROADMAPPING */}
            {(() => {
              const id = "roadmapping";
              const cfg = items[id] || DEFAULT_LAYOUT[id];
              const isSelected = selectedId === id;
              return (
                <motion.div
                  drag
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    updateItem(id, { x: cfg.x + info.offset.x, y: cfg.y + info.offset.y });
                  }}
                  onClick={() => setSelectedId(id)}
                  style={{ x: cfg.x, y: cfg.y, scale: cfg.scale }}
                  className={`pointer-events-auto relative group ml-8 flex flex-col items-start gap-1 p-2 rounded-md transition-shadow cursor-grab active:cursor-grabbing ${
                    layoutMode ? "hover:outline hover:outline-1 hover:outline-[#FFD400]/70" : ""
                  } ${isSelected && layoutMode ? "outline outline-2 outline-[#FFD400] bg-black/20 backdrop-blur-xs" : ""}`}
                >
                  <div className="hand-display text-xl text-[#F7F4ED] -rotate-2 select-none">
                    Plans change.<br />
                    <span className="relative inline-block text-white">Direction shouldn't.<span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FFD400] rounded-full" /></span>
                  </div>
                  <div className="ml-8 my-0.5">
                    <svg
                      style={{
                        transform: `scale(${cfg.arrowScale}) scaleX(${cfg.flipArrow ? -1 : 1}) rotate(${cfg.arrowRotation}deg)`,
                      }}
                      className="w-10 h-10 text-[#FFD400] shrink-0 transition-transform"
                      viewBox="0 0 38 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M 18 4 Q 28 20 19 32" strokeDasharray="4 4" />
                      <path d="M 10 22 L 19 34 L 29 23" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="-rotate-2">
                    <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] select-none">
                      <Compass className="h-3.5 w-3.5 text-[#FFD400]" />
                      <span className="border-b border-[#FFD400] pb-0.5">ROADMAPPING</span>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

          </div>

          {/* ==================== RIGHT COLUMN (4 DRAGGABLE ITEMS) ==================== */}
          <div className="absolute top-[3%] bottom-[4%] right-[3%] flex w-[36%] flex-col justify-between items-end text-right pointer-events-none">

            {/* Right Pair 1: APPLIED AI */}
            {(() => {
              const id = "applied-ai";
              const cfg = items[id] || DEFAULT_LAYOUT[id];
              const isSelected = selectedId === id;
              return (
                <motion.div
                  drag
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    updateItem(id, { x: cfg.x + info.offset.x, y: cfg.y + info.offset.y });
                  }}
                  onClick={() => setSelectedId(id)}
                  style={{ x: cfg.x, y: cfg.y, scale: cfg.scale }}
                  className={`pointer-events-auto relative group flex flex-col items-end gap-1 p-2 rounded-md transition-shadow cursor-grab active:cursor-grabbing ${
                    layoutMode ? "hover:outline hover:outline-1 hover:outline-[#FFD400]/70" : ""
                  } ${isSelected && layoutMode ? "outline outline-2 outline-[#FFD400] bg-black/20 backdrop-blur-xs" : ""}`}
                >
                  <div className="relative flex items-center gap-2">
                    <svg
                      style={{
                        transform: `scale(${cfg.arrowScale}) scaleX(${cfg.flipArrow ? -1 : 1}) rotate(${cfg.arrowRotation}deg)`,
                      }}
                      className="w-20 h-10 text-[#FFD400] shrink-0 transition-transform"
                      viewBox="0 0 80 36"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M 6 18 Q 40 6 70 20" strokeDasharray="4 4" />
                      <path d="M 58 12 L 72 21 L 60 29" strokeWidth="2.5" />
                    </svg>
                    <div className="hand-display text-2xl text-[#F7F4ED] -rotate-1 select-none">
                      curious by nature,<br />
                      obsessed with <span className="relative inline-block text-white">value.<span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FFD400] rounded-full" /></span>
                      <span className="ml-2 font-sans text-xl text-[#FFD400]">:)</span>
                    </div>
                  </div>
                  <div className="mt-1 mr-2 rotate-2">
                    <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] select-none">
                      <Star className="h-3.5 w-3.5 fill-[#FFD400] text-[#FFD400]" />
                      <span className="border-b border-[#FFD400] pb-0.5">APPLIED AI</span>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* Right Pair 2: STORYTELLING */}
            {(() => {
              const id = "storytelling";
              const cfg = items[id] || DEFAULT_LAYOUT[id];
              const isSelected = selectedId === id;
              return (
                <motion.div
                  drag
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    updateItem(id, { x: cfg.x + info.offset.x, y: cfg.y + info.offset.y });
                  }}
                  onClick={() => setSelectedId(id)}
                  style={{ x: cfg.x, y: cfg.y, scale: cfg.scale }}
                  className={`pointer-events-auto relative group mr-2 flex flex-col items-end gap-1 p-2 rounded-md transition-shadow cursor-grab active:cursor-grabbing ${
                    layoutMode ? "hover:outline hover:outline-1 hover:outline-[#FFD400]/70" : ""
                  } ${isSelected && layoutMode ? "outline outline-2 outline-[#FFD400] bg-black/20 backdrop-blur-xs" : ""}`}
                >
                  <div className="hand-display text-xl text-[#F7F4ED] rotate-1 select-none">
                    Numbers don't sell themselves.<br />
                    <span className="relative inline-block text-white">Stories do.<span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FFD400] rounded-full" /></span>
                  </div>
                  <div className="mr-8 my-0.5">
                    <svg
                      style={{
                        transform: `scale(${cfg.arrowScale}) scaleX(${cfg.flipArrow ? -1 : 1}) rotate(${cfg.arrowRotation}deg)`,
                      }}
                      className="w-10 h-10 text-[#FFD400] shrink-0 transition-transform"
                      viewBox="0 0 38 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M 20 4 Q 10 20 19 32" strokeDasharray="4 4" />
                      <path d="M 9 22 L 19 34 L 29 23" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="-rotate-1">
                    <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] select-none">
                      <MessageSquare className="h-3.5 w-3.5 text-[#FFD400]" />
                      <span className="border-b border-[#FFD400] pb-0.5">STORYTELLING</span>
                    </div>
                  </div>
                </motion.div>
              );
            })()}

            {/* Right Pair 3: PRODUCT DISCOVERY */}
            {(() => {
              const id = "product-discovery";
              const cfg = items[id] || DEFAULT_LAYOUT[id];
              const isSelected = selectedId === id;
              return (
                <motion.div
                  drag
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    updateItem(id, { x: cfg.x + info.offset.x, y: cfg.y + info.offset.y });
                  }}
                  onClick={() => setSelectedId(id)}
                  style={{ x: cfg.x, y: cfg.y, scale: cfg.scale }}
                  className={`pointer-events-auto relative group flex flex-col items-end gap-1 p-2 rounded-md transition-shadow cursor-grab active:cursor-grabbing ${
                    layoutMode ? "hover:outline hover:outline-1 hover:outline-[#FFD400]/70" : ""
                  } ${isSelected && layoutMode ? "outline outline-2 outline-[#FFD400] bg-black/20 backdrop-blur-xs" : ""}`}
                >
                  <div className="rotate-3">
                    <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] select-none">
                      <Sparkles className="h-3.5 w-3.5 text-[#FFD400]" />
                      <span className="border-b border-[#FFD400] pb-0.5">PRODUCT DISCOVERY</span>
                    </div>
                  </div>
                  <div className="mr-12 my-0.5">
                    <svg
                      style={{
                        transform: `scale(${cfg.arrowScale}) scaleX(${cfg.flipArrow ? -1 : 1}) rotate(${cfg.arrowRotation}deg)`,
                      }}
                      className="w-10 h-10 text-[#FFD400] shrink-0 transition-transform"
                      viewBox="0 0 38 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
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
              );
            })()}

            {/* Right Pair 4: SYSTEM DESIGN */}
            {(() => {
              const id = "system-design";
              const cfg = items[id] || DEFAULT_LAYOUT[id];
              const isSelected = selectedId === id;
              return (
                <motion.div
                  drag
                  dragMomentum={false}
                  onDragEnd={(_, info) => {
                    updateItem(id, { x: cfg.x + info.offset.x, y: cfg.y + info.offset.y });
                  }}
                  onClick={() => setSelectedId(id)}
                  style={{ x: cfg.x, y: cfg.y, scale: cfg.scale }}
                  className={`pointer-events-auto relative group flex flex-col items-end gap-1 p-2 rounded-md transition-shadow cursor-grab active:cursor-grabbing ${
                    layoutMode ? "hover:outline hover:outline-1 hover:outline-[#FFD400]/70" : ""
                  } ${isSelected && layoutMode ? "outline outline-2 outline-[#FFD400] bg-black/20 backdrop-blur-xs" : ""}`}
                >
                  <div className="-rotate-2">
                    <div className="flex items-center gap-2 rounded-sm border border-white/40 bg-transparent px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-[#F7F4ED] backdrop-blur-[2px] shadow-xs hover:border-[#FFD400] hover:text-[#FFD400] select-none">
                      <Settings className="h-3.5 w-3.5 text-[#FFD400]" />
                      <span className="border-b border-[#FFD400] pb-0.5">SYSTEM DESIGN</span>
                    </div>
                  </div>
                  <div className="mr-8 my-1">
                    <svg
                      style={{
                        transform: `scale(${cfg.arrowScale}) scaleX(${cfg.flipArrow ? -1 : 1}) rotate(${cfg.arrowRotation}deg)`,
                      }}
                      className="w-10 h-12 text-[#FFD400] shrink-0 transition-transform"
                      viewBox="0 0 38 48"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M 20 6 Q 10 24 19 38" strokeDasharray="4 4" />
                      <path d="M 9 28 L 19 40 L 29 29" strokeWidth="2.5" />
                    </svg>
                  </div>
                  <div className="hand-display text-xl text-[#F7F4ED] -rotate-1 select-none">
                    scalable architectures,<br />
                    <span className="relative inline-block text-white">zero noise.<span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FFD400] rounded-full" /></span>
                  </div>
                </motion.div>
              );
            })()}

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
          </div>
        </div>
      </div>

      {/* ---- FLOATING VISUAL CANVAS EDITOR TOOLBAR (HUD) ---- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto font-mono">

        {/* Selected Item Control Box (when item is selected) */}
        {selectedId && layoutMode && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="flex flex-col gap-2.5 rounded-lg border border-[#FFD400]/40 bg-[#0A0A0A]/95 p-3.5 text-xs text-[#F7F4ED] shadow-2xl backdrop-blur-md w-72"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-bold text-[#FFD400] uppercase tracking-wider text-[11px]">
                ✦ {selectedId.replace("-", " ")}
              </span>
              <button
                onClick={() => setSelectedId(null)}
                className="text-white/60 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>

            {/* Overall Element Scale */}
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="text-white/70">Overall Size:</span>
              <input
                type="range"
                min="0.6"
                max="1.8"
                step="0.05"
                value={items[selectedId]?.scale ?? 1}
                onChange={(e) => updateItem(selectedId, { scale: parseFloat(e.target.value) })}
                className="w-28 accent-[#FFD400]"
              />
              <span className="w-8 text-right font-bold text-[#FFD400]">
                {((items[selectedId]?.scale ?? 1) * 100).toFixed(0)}%
              </span>
            </div>

            {/* Arrow Scale */}
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="text-white/70">Arrow Size:</span>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.1"
                value={items[selectedId]?.arrowScale ?? 1}
                onChange={(e) => updateItem(selectedId, { arrowScale: parseFloat(e.target.value) })}
                className="w-28 accent-[#FFD400]"
              />
              <span className="w-8 text-right font-bold text-[#FFD400]">
                {(items[selectedId]?.arrowScale ?? 1).toFixed(1)}x
              </span>
            </div>

            {/* Arrow Rotation */}
            <div className="flex items-center justify-between gap-2 text-[11px]">
              <span className="text-white/70">Arrow Angle:</span>
              <input
                type="range"
                min="-180"
                max="180"
                step="5"
                value={items[selectedId]?.arrowRotation ?? 0}
                onChange={(e) => updateItem(selectedId, { arrowRotation: parseInt(e.target.value) })}
                className="w-28 accent-[#FFD400]"
              />
              <span className="w-8 text-right font-bold text-[#FFD400]">
                {items[selectedId]?.arrowRotation ?? 0}°
              </span>
            </div>

            {/* Flip Arrow */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
              <button
                onClick={() => updateItem(selectedId, { flipArrow: !items[selectedId]?.flipArrow })}
                className="flex items-center gap-1.5 rounded border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] hover:border-[#FFD400] hover:text-[#FFD400] transition-colors"
              >
                <ArrowRightLeft className="h-3 w-3" />
                Flip Arrow
              </button>

              <button
                onClick={() => updateItem(selectedId, { x: 0, y: 0, scale: 1, arrowScale: 1, arrowRotation: 0, flipArrow: false })}
                className="text-[10px] text-white/50 hover:text-white underline"
              >
                Reset Item
              </button>
            </div>
          </motion.div>
        )}

        {/* Floating HUD Main Toolbar */}
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#0A0A0A]/90 px-4 py-2 text-xs text-[#F7F4ED] shadow-xl backdrop-blur-md">
          {/* Toggle Edit Mode */}
          <button
            onClick={() => setLayoutMode(!layoutMode)}
            className={`flex items-center gap-2 rounded-full px-3 py-1 font-bold text-[11px] tracking-wider transition-colors ${
              layoutMode
                ? "bg-[#FFD400] text-[#0A0A0A]"
                : "border border-white/30 text-white/80 hover:border-white"
            }`}
          >
            {layoutMode ? <Eye className="h-3.5 w-3.5" /> : <Move className="h-3.5 w-3.5" />}
            {layoutMode ? "DRAG & EDIT: ON" : "DRAG & EDIT: OFF"}
          </button>

          {/* Copy Coordinates JSON */}
          <button
            onClick={copyLayoutJSON}
            title="Copy exact X/Y/Scale/Rotation JSON to clipboard"
            className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] text-white hover:border-[#FFD400] hover:text-[#FFD400] transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "COPIED JSON!" : "COPY JSON"}
          </button>

          {/* Reset All */}
          <button
            onClick={resetAllLayout}
            title="Reset layout to default"
            className="flex items-center gap-1 rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-white/70 hover:text-white hover:border-red-400 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>
      </div>

      {/* ---- Bottom Prompt: GO ON ---- */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center gap-2 py-2 text-center pointer-events-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
      >
        <button
          onClick={() => scrollTo("origin")}
          data-cursor-label="scroll down"
          className="group flex flex-col items-center gap-1 font-mono text-xs uppercase tracking-[0.25em] text-[#F7F4ED] transition-colors hover:text-[#FFD400] focus-ring"
        >
          <span className="font-display text-lg font-bold italic tracking-wide underline underline-offset-4 decoration-[#FFD400] group-hover:no-underline">
            GO ON.
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce text-[#FFD400]" />
        </button>
      </motion.div>
    </section>
  );
}
