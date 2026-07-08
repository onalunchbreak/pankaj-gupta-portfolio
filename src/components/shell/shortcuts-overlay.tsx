"use client";
import { motion, AnimatePresence } from "framer-motion";
import { SHORTCUTS } from "@/hooks/use-keyboard-shortcuts";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ShortcutsOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[170] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
          data-cursor-label="close"
        >
          <div className="absolute inset-0 bg-[#0A0A0A]/85 backdrop-blur-md" aria-hidden />

          <motion.div
            className="relative z-10 w-full max-w-lg border border-[#FFD400]/40 bg-[#0E0E0E]"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3 sm:px-6">
              <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em]">
                <span className="inline-block h-2 w-2 bg-[#FFD400] blink" />
                <span className="text-[#FFD400]">{"// KEYBINDINGS.SYS"}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#6B6B6B] transition-colors hover:text-[#FFD400] focus-ring"
                aria-label="Close shortcuts"
                data-cursor-label="close"
              >
                [ esc ]
              </button>
            </div>

            {/* list */}
            <ul className="divide-y divide-white/5">
              {SHORTCUTS.map((s, i) => (
                <motion.li
                  key={s.keys}
                  className="flex items-center justify-between gap-4 px-5 py-3 sm:px-6"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.04, duration: 0.4, ease: EASE }}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#6B6B6B]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-mono text-sm text-[#F4F1EA]/85">
                    {s.desc}
                  </span>
                  <kbd className="shrink-0 border border-white/15 bg-[#0A0A0A] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-[#FFD400]">
                    {s.keys}
                  </kbd>
                </motion.li>
              ))}
            </ul>

            {/* footer */}
            <div className="border-t border-white/10 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.3em] text-[#6B6B6B] sm:px-6">
              <span className="text-[#FFD400]">●</span> press <span className="text-[#F4F1EA]">?</span> anywhere to summon this panel
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Konami / GOD'S PLAN easter egg ---------- */
export function KonamiOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[180] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onClose}
          data-cursor-label="close"
          role="dialog"
          aria-modal="true"
          aria-label="God's plan unlocked"
        >
          {/* rotating accent rays */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            aria-hidden
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 h-[180vh] w-[2px] origin-top -translate-x-1/2"
                style={{
                  transform: `rotate(${(360 / 16) * i}deg)`,
                  background:
                    i % 2 === 0
                      ? "linear-gradient(to bottom, rgba(255,212,0,0.12), transparent 60%)"
                      : "transparent",
                }}
              />
            ))}
          </motion.div>

          <motion.p
            className="relative font-mono text-xs uppercase tracking-[0.4em] text-[#FFD400]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {"// SEQUENCE ACCEPTED"}
          </motion.p>

          <motion.h2
            className="relative mt-4 font-display text-6xl font-bold tracking-tighter text-[#F4F1EA] sm:text-9xl"
            initial={{ opacity: 0, scale: 0.7, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
          >
            GOD&apos;S PLAN
          </motion.h2>

          <motion.p
            className="relative mt-6 max-w-md px-6 text-center font-mono text-sm leading-relaxed text-[#F4F1EA]/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            You found the hidden track. If you ever write a book on how you see
            creativity, it will have infinite pages — and you&apos;ll still be
            figuring it out.
          </motion.p>

          <motion.p
            className="relative mt-10 font-mono text-[10px] uppercase tracking-[0.4em] text-[#6B6B6B]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            click anywhere to return to the case
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
