"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { useBootStore } from "@/hooks/use-boot";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { PRELOADER } from "@/lib/data";

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
  const [bootIdx, setBootIdx] = useState(0);
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
      duration: 2.5,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => finish(),
    });
    return () => controls.stop();
  }, [reduced]);

  // Cycle through boot sequence lines
  useEffect(() => {
    if (done) return;
    const id = setInterval(() => {
      setBootIdx((i) => (i + 1) % PRELOADER.bootSequence.length);
    }, 350);
    return () => clearInterval(id);
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col bg-[#0A0A0A] text-[#F4F1EA]"
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

          {/* top bar: clock */}
          <div className="relative z-10 flex items-start justify-between p-5 font-mono text-[11px] uppercase tracking-widest sm:p-7">
            <span className="opacity-60">PANKAJ_GUPTA // boot.sys</span>
            <span className="opacity-80">{clock} IST</span>
          </div>

          {/* center: counter + boot sequence + statement */}
          <div className="relative z-10 flex flex-1 flex-col justify-center px-5 sm:px-10">
            <div className="font-mono text-[13px] uppercase tracking-[0.3em] text-[#1738D5]">
              <span className="text-[#FFD400]">●</span> {PRELOADER.bootSequence[0]}
            </div>
            {/* cycling boot line */}
            <div className="mt-2 h-5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={bootIdx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block"
                >
                  {"> "}loading: {PRELOADER.bootSequence[bootIdx + 1]}
                  <span className="blink">_</span>
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="mt-4 font-display text-[14vw] font-bold leading-none tracking-tighter sm:text-[10vw]">
              {String(count).padStart(3, "0")}
              <span className="text-[#1738D5]">%</span>
            </div>
            {/* statement reveal */}
            <div className="mt-8 max-w-3xl">
              <p className="font-display text-xl font-bold leading-tight sm:text-3xl">
                {PRELOADER.statement.map((w, i) => (
                  <motion.span
                    key={i}
                    className="mr-[0.28em] inline-block"
                    initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: 0.4 + i * 0.3,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {w}
                  </motion.span>
                ))}
              </p>
            </div>
            {/* margin microcopy */}
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B]">
              {PRELOADER.marginMicrocopy[0]} <span className="text-[#1738D5]">·</span> {PRELOADER.marginMicrocopy[1]}
            </div>
          </div>

          {/* progress bar */}
          <div className="relative z-10 mx-5 mb-3 h-px overflow-hidden bg-white/10 sm:mx-10">
            <motion.div
              className="h-full bg-[#1738D5]"
              style={{ width: `${count}%` }}
            />
          </div>

          {/* bottom: skip */}
          <div className="relative z-10 flex items-end justify-between p-5 font-mono text-[11px] uppercase tracking-widest sm:p-7">
            <span className="opacity-50">v.2026 · portfolio · still building</span>
            <button
              onClick={() => {
                setCount(100);
                finish();
                skip();
              }}
              className="group flex items-center gap-2 border border-white/20 px-3 py-2 transition-colors hover:border-[#1738D5] hover:text-[#1738D5] focus-ring"
              data-cursor-label="skip"
            >
              <span>{PRELOADER.skip}</span>
              <span className="inline-block transition-transform group-hover:translate-x-1">↦</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
