"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CASE_CLOSE } from "@/lib/data";
import { getLenis } from "@/lib/lenis-instance";

function Typewriter({ text }: { text: string }) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 95);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span>
      {out}
      <span className="blink">_</span>
    </span>
  );
}

export default function CaseCloseOverlay() {
  const [nearBottom, setNearBottom] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const check = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const remaining = max - window.scrollY;
      setNearBottom(remaining < 240);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    // also re-check periodically in case lenis smooth scroll delays layout
    const id = setInterval(check, 400);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      clearInterval(id);
    };
  }, []);

  const close = () => {
    setOpen(false);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Esc closes the open overlay
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <AnimatePresence>
        {nearBottom && !open && (
          <motion.button
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 z-[78] flex items-center gap-3 border border-[#FFD400]/40 bg-[#0A0A0A]/80 px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-[#F4F1EA] backdrop-blur-md transition-colors hover:border-[#FFD400] focus-ring sm:bottom-7 sm:right-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.5 }}
            data-cursor-label="READ"
          >
            <span className="h-1.5 w-1.5 bg-[#FFD400] blink" />
            <span className="text-[#FFD400]">▸</span>
            <span>
              <Typewriter text={CASE_CLOSE.button} />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[150] flex cursor-pointer flex-col justify-between bg-[#0A0A0A]/97 p-6 backdrop-blur-md sm:p-10"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            data-cursor-label="close"
            role="dialog"
            aria-modal="true"
            aria-label="Close case"
          >
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#FF3B30]">
              <span className="mr-2 inline-block h-2 w-2 bg-[#FF3B30] blink" />
              {CASE_CLOSE.title}
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <motion.h2
                className="font-display text-5xl font-bold tracking-tighter text-[#F4F1EA] sm:text-8xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {CASE_CLOSE.subtitle}
              </motion.h2>
              <motion.p
                className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-[#6B6B6B]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {CASE_CLOSE.hint}
              </motion.p>
              <motion.div
                className="mt-10 border border-[#FFD400] px-8 py-3 font-mono text-sm uppercase tracking-widest text-[#FFD400]"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                [ ESC / CLICK ]
              </motion.div>
            </div>

            <div className="text-right font-mono text-[10px] uppercase tracking-widest text-[#6B6B6B]">
              case // bajkamal-singh · closed · {new Date().getFullYear()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
