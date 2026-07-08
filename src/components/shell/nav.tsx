"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "@/hooks/use-active-section";
import { useSound } from "@/hooks/use-sound";
import { useBootStore } from "@/hooks/use-boot";
import { NAV_ITEMS } from "@/lib/data";
import { getLenis } from "@/lib/lenis-instance";

export default function Nav() {
  const ids = NAV_ITEMS.map((n) => n.id);
  const active = useActiveSection(ids);
  const { play } = useSound();
  const booted = useBootStore((s) => s.booted);

  const go = (id: string) => {
    play("confirm");
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
    <AnimatePresence>
      {booted && (
        <motion.nav
          className="fixed right-0 top-1/2 z-[75] hidden -translate-y-1/2 flex-col items-end gap-1 pr-4 xl:flex"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Section navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                onMouseEnter={() => play("tick")}
                data-cursor-label={isActive ? "here" : "go"}
                className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest transition-colors focus-ring"
              >
                <span
                  className={`h-px transition-all duration-300 ${
                    isActive ? "w-8 bg-[#FFD400]" : "w-4 bg-white/25 group-hover:w-7 group-hover:bg-[#FFD400]"
                  }`}
                />
                <span
                  className={`transition-colors ${
                    isActive
                      ? "text-[#FFD400]"
                      : "text-[#F4F1EA]/55 group-hover:text-[#F4F1EA]"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
