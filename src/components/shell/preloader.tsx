"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { useBootStore } from "@/hooks/use-boot";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { PRELOADER } from "@/lib/data";

const PIKACHU_FRAMES = [
  "/images/pikachu-side-frame-1.png",
  "/images/pikachu-side-frame-2.png",
  "/images/pikachu-side-frame-3.png",
  "/images/pikachu-side-frame-4.png",
];

function PikachuRunner({
  size,
  frameSpeed,
  showTrail,
}: {
  size: number;
  frameSpeed: number;
  showTrail: boolean;
}) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % PIKACHU_FRAMES.length);
    }, frameSpeed);
    return () => clearInterval(timer);
  }, [frameSpeed]);

  // Shadow width proportional to size
  const shadowWidth = Math.round(size * 0.7);
  const shadowHeight = Math.max(4, Math.round(size * 0.04));

  return (
    <div className="relative flex flex-col items-center justify-center py-2">
      <div className="relative flex items-center justify-center">
        {/* Speed lines on the trailing side */}
        {showTrail && (
          <div className="pointer-events-none absolute -bottom-1 -left-10 flex flex-col gap-1.5 opacity-75 sm:-left-16">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-0.5 rounded-full bg-[#FFD400]"
                animate={{
                  width: [`${Math.round(size * 0.25)}px`, `${Math.round(size * 0.08)}px`, "0px"],
                  x: [0, -Math.round(size * 0.3)],
                  opacity: [0.9, 0.3, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: (frameSpeed * 4) / 1000,
                  delay: i * (frameSpeed / 1000),
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}

        {/* Clean Vector Pikachu Side Profile Run Frame */}
        <div
          className="relative select-none flex items-center justify-center transition-all duration-150"
          style={{
            height: `${size}px`,
            width: `${Math.round(size * 1.5)}px`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PIKACHU_FRAMES[frameIndex]}
            alt="Pikachu Running"
            className="h-full w-full object-contain drop-shadow-[0_0_20px_rgba(255,212,0,0.25)]"
          />
        </div>
      </div>

      {/* Ground contact shadow */}
      <motion.div
        animate={{
          scaleX: [1, 0.8, 1],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: (frameSpeed * 3) / 1000,
          ease: "easeInOut",
        }}
        style={{
          width: `${shadowWidth}px`,
          height: `${shadowHeight}px`,
        }}
        className="mt-1 rounded-full bg-black/70 blur-[3px]"
      />
    </div>
  );
}

const STATUS_LINES = [
  "SHIPPING SOMETHING... · PROBABLY OVER-SCOPED",
  "WRITING A PRD... · WILL PIVOT BY FRIDAY",
  "TALKING TO USERS... · ALLEGEDLY",
  "ALIGNING STAKEHOLDERS... · STILL NOT ALIGNED",
  "ESTIMATING TIMELINE... · ADD BUFFER, THEN DOUBLE IT",
  "RUNNING A SPRINT... · LOTS OF BACKLOG TO SCOPE OUT",
  "DEFINING SUCCESS METRICS... · AFTER LAUNCH, IDEALLY BEFORE",
];

const emptySubscribe = () => () => {};

function useClientMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function useLiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, "0");
      const m = String(d.getMinutes()).padStart(2, "0");
      const s = String(d.getSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Preloader() {
  const [count, setCount] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 100
      : 0
  );
  const [done, setDone] = useState(false);
  const isMounted = useClientMounted();
  const [statusLine] = useState(() => {
    return STATUS_LINES[Math.floor(Math.random() * STATUS_LINES.length)];
  });

  // Interactive Live Tuning State
  const [size, setSize] = useState(130);
  const [frameSpeed, setFrameSpeed] = useState(100);
  const [showTrail, setShowTrail] = useState(true);
  const [isFrozen, setIsFrozen] = useState(true); // Test mode: keeps loader visible for experimentation

  const setBooted = useBootStore((s) => s.setBooted);
  const skip = useBootStore((s) => s.skip);
  const reduced = usePrefersReducedMotion();
  const clock = useLiveClock();

  const finish = () => {
    setDone(true);
    setTimeout(() => setBooted(true), 1100);
  };

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => finish(), 300);
      return () => clearTimeout(t);
    }
    if (isFrozen) {
      // In freeze test mode, don't auto-dismiss
      return;
    }
    const controls = animate(count, 100, {
      duration: 3.8,
      ease: "easeInOut",
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => finish(),
    });
    return () => controls.stop();
  }, [reduced, isFrozen, count]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-[#0A0A0A] text-[#F4F1EA]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-full bg-[#1738D5]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: done ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{ originY: 1 }}
          />

          {/* top bar: username + clock + test banner */}
          <div className="relative z-10 flex items-start justify-between p-4 font-mono text-[11px] uppercase tracking-widest sm:p-7">
            <div className="flex items-center gap-2">
              <span className="opacity-60">PANKAJ GUPTA</span>
              <span className="hidden sm:inline-block rounded bg-[#FFD400]/20 px-2 py-0.5 text-[9px] font-semibold text-[#FFD400]">
                EXPERIMENT MODE
              </span>
            </div>
            <span className="opacity-80">{clock} IST</span>
          </div>

          {/* center: Side-Profile Running Pikachu loader + dynamic status line */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-10">
            <PikachuRunner
              size={size}
              frameSpeed={frameSpeed}
              showTrail={showTrail}
            />

            <div className="mt-4 sm:mt-6 min-h-[1.5rem] font-mono text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] text-white/80">
              {isMounted && statusLine && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="inline-block"
                >
                  {statusLine.includes("·") ? (
                    <>
                      {statusLine.split("·")[0]}
                      <span className="text-[#1738D5]">·</span>
                      {statusLine.split("·")[1]}
                    </>
                  ) : (
                    statusLine
                  )}
                </motion.span>
              )}
            </div>

            {/* LIVE TUNING SLIDERS & CONTROLS */}
            <div className="mt-6 w-full max-w-lg rounded-xl border border-white/15 bg-black/80 p-4 backdrop-blur-md text-left shadow-2xl">
              <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-mono text-[10px] font-semibold tracking-wider text-[#FFD400] uppercase">
                  ⚙️ Live Loader Controls
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFrozen(!isFrozen)}
                    className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase transition-colors ${
                      isFrozen
                        ? "bg-[#FFD400] text-black font-bold"
                        : "border border-white/20 text-white/70 hover:text-white"
                    }`}
                  >
                    {isFrozen ? "⏸ Frozen for Tuning" : "▶ Running Auto-Dismiss"}
                  </button>
                </div>
              </div>

              {/* Size Slider */}
              <div className="mb-3">
                <div className="flex items-center justify-between font-mono text-[11px] text-white/80 mb-1">
                  <span>Pikachu Size</span>
                  <span className="text-[#FFD400] font-bold">{size}px</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="260"
                  step="5"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-[#FFD400]"
                />
                <div className="mt-1.5 flex gap-1.5">
                  {[
                    { label: "Compact (90px)", val: 90 },
                    { label: "Medium (130px)", val: 130 },
                    { label: "Large (180px)", val: 180 },
                    { label: "Hero (240px)", val: 240 },
                  ].map((p) => (
                    <button
                      key={p.val}
                      onClick={() => setSize(p.val)}
                      className={`flex-1 rounded border px-1.5 py-0.5 text-center font-mono text-[9px] transition-all ${
                        size === p.val
                          ? "border-[#FFD400] bg-[#FFD400]/20 text-[#FFD400]"
                          : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speed Slider */}
              <div>
                <div className="flex items-center justify-between font-mono text-[11px] text-white/80 mb-1">
                  <span>Running Speed (Frame Delay)</span>
                  <span className="text-[#FFD400] font-bold">
                    {frameSpeed}ms ({Math.round(1000 / (frameSpeed * 4))} cycles/s)
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="220"
                  step="10"
                  value={frameSpeed}
                  onChange={(e) => setFrameSpeed(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-[#FFD400]"
                />
                <div className="mt-1.5 flex gap-1.5">
                  {[
                    { label: "Sprint (60ms)", val: 60 },
                    { label: "Fast Run (90ms)", val: 90 },
                    { label: "Normal (120ms)", val: 120 },
                    { label: "Jog (160ms)", val: 160 },
                  ].map((p) => (
                    <button
                      key={p.val}
                      onClick={() => setFrameSpeed(p.val)}
                      className={`flex-1 rounded border px-1.5 py-0.5 text-center font-mono text-[9px] transition-all ${
                        frameSpeed === p.val
                          ? "border-[#FFD400] bg-[#FFD400]/20 text-[#FFD400]"
                          : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speed Trail Toggle */}
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[11px]">
                <span className="text-white/70">Wind / Speed Trail Lines</span>
                <button
                  onClick={() => setShowTrail(!showTrail)}
                  className={`rounded px-2.5 py-0.5 text-[10px] uppercase font-semibold transition-colors ${
                    showTrail
                      ? "bg-[#FFD400]/20 text-[#FFD400] border border-[#FFD400]"
                      : "bg-white/10 text-white/50 border border-white/10"
                  }`}
                >
                  {showTrail ? "ON" : "OFF"}
                </button>
              </div>
            </div>
          </div>

          {/* bottom: progress bar + skip / enter site */}
          <div className="relative z-10 flex flex-col">
            <div className="mx-5 mb-3 h-px overflow-hidden bg-white/10 sm:mx-10">
              <motion.div
                className="h-full bg-[#1738D5]"
                style={{ width: `${isFrozen ? 100 : count}%` }}
              />
            </div>

            <div className="flex items-end justify-between p-4 font-mono text-[11px] uppercase tracking-widest sm:p-7">
              <span className="text-[10px] text-white/40">
                Tweak sliders to find your perfect size & speed
              </span>
              <button
                onClick={() => {
                  setCount(100);
                  finish();
                  skip();
                }}
                className="group flex items-center gap-2 border border-white/20 px-3 py-2 transition-colors hover:border-[#1738D5] hover:text-[#1738D5] focus-ring"
                data-cursor-label="enter"
              >
                <span>ENTER PORTFOLIO</span>
                <span className="inline-block transition-transform group-hover:translate-x-1">↦</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
