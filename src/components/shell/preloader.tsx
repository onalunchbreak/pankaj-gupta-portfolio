"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { useBootStore } from "@/hooks/use-boot";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { PRELOADER_WORDS } from "@/lib/data";

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
  const setBooted = useBootStore((s) => s.setBooted);
  const skip = useBootStore((s) => s.skip);
  const reduced = usePrefersReducedMotion();
  const clock = useLiveClock();

  // counter 00→100
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

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col bg-[#0A0A0A] text-[#F4F1EA]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* split layers for slide-up reveal */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-full bg-[#FFD400]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: done ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            style={{ originY: 1 }}
          />

          {/* top bar: clock */}
          <div className="relative z-10 flex items-start justify-between p-5 font-mono text-[11px] uppercase tracking-widest sm:p-7">
            <span className="opacity-60">baaz // boot.sys</span>
            <span className="opacity-80">{clock} IST</span>
          </div>

          {/* center: counter + staggered words */}
          <div className="relative z-10 flex flex-1 flex-col justify-center px-5 sm:px-10">
            <div className="font-mono text-[13px] uppercase tracking-[0.3em] text-[#FFD400]">
              loading manifest
            </div>
            <div className="mt-4 font-display text-[14vw] font-bold leading-none tracking-tighter sm:text-[10vw]">
              {String(count).padStart(3, "0")}
              <span className="text-[#FFD400]">%</span>
            </div>
            <div className="mt-8 max-w-3xl">
              <p className="font-display text-2xl font-bold leading-tight sm:text-4xl">
                {PRELOADER_WORDS.map((w, i) => (
                  <motion.span
                    key={i}
                    className="mr-[0.28em] inline-block"
                    initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: 0.25 + i * 0.22,
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {w}
                  </motion.span>
                ))}
              </p>
            </div>
          </div>

          {/* progress bar */}
          <div className="relative z-10 mx-5 mb-3 h-px overflow-hidden bg-white/10 sm:mx-10">
            <motion.div
              className="h-full bg-[#FFD400]"
              style={{ width: `${count}%` }}
            />
          </div>

          {/* bottom: skip */}
          <div className="relative z-10 flex items-end justify-between p-5 font-mono text-[11px] uppercase tracking-widest sm:p-7">
            <span className="opacity-50">v.2026 · delhi</span>
            <button
              onClick={() => {
                setCount(100);
                finish();
                skip();
              }}
              className="group flex items-center gap-2 border border-white/20 px-3 py-2 transition-colors hover:border-[#FFD400] hover:text-[#FFD400] focus-ring"
              data-cursor-label="skip"
            >
              <span>Skip Animation</span>
              <span className="inline-block transition-transform group-hover:translate-x-1">↦</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
