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

function PikachuRunner() {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    // 90ms fast run cycle
    const timer = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % PIKACHU_FRAMES.length);
    }, 90);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center py-2">
      {/* Clean Vector Pikachu Side Profile Run Frame: 90px on all screens */}
      <div className="relative h-[90px] w-[135px] select-none flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={PIKACHU_FRAMES[frameIndex]}
          alt="Pikachu Running"
          className="h-full w-full object-contain drop-shadow-[0_0_20px_rgba(255,212,0,0.25)]"
        />
      </div>

      {/* Ground contact shadow */}
      <motion.div
        animate={{
          scaleX: [1, 0.8, 1],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.27,
          ease: "easeInOut",
        }}
        className="mt-1 h-1.5 w-20 rounded-full bg-black/70 blur-[2.5px]"
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
    const controls = animate(0, 100, {
      duration: 3.5,
      ease: "easeInOut",
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => finish(),
    });
    return () => controls.stop();
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-[#0A0A0A] text-[#F4F1EA] modal-cursor-restore"
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

          {/* top bar: username + clock */}
          <div className="relative z-10 flex items-start justify-between p-5 font-mono text-[11px] uppercase tracking-widest sm:p-7">
            <span className="opacity-60">PANKAJ GUPTA</span>
            <span className="opacity-80">{clock} IST</span>
          </div>

          {/* center: Side-Profile Running Pikachu loader + dynamic status line */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center sm:px-10">
            <PikachuRunner />

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
          </div>

          {/* bottom: progress bar + skip */}
          <div className="relative z-10 flex flex-col">
            <div className="mx-5 mb-3 h-px overflow-hidden bg-white/10 sm:mx-10">
              <motion.div
                className="h-full bg-[#1738D5]"
                style={{ width: `${count}%` }}
              />
            </div>

            <div className="flex items-end justify-end p-5 font-mono text-[11px] uppercase tracking-widest sm:p-7">
              <button
                onClick={() => {
                  setCount(100);
                  finish();
                  skip();
                }}
                className="group flex items-center gap-2 border border-white/20 px-3 py-2 transition-colors hover:border-[#1738D5] hover:text-[#1738D5] focus-ring cursor-pointer"
                data-cursor-label="skip"
              >
                <span>{PRELOADER.skip}</span>
                <span className="inline-block transition-transform group-hover:translate-x-1">↦</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
