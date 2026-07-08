"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { getLenis } from "@/lib/lenis-instance";
import { useSound } from "@/hooks/use-sound";
import { useBootStore } from "@/hooks/use-boot";

/**
 * Scroll-to-top button — appears after the user scrolls past the hero,
 * smooth-scrolls to top via Lenis. Sits bottom-left, above the mute toggle.
 * Hidden during preloader + on touch devices (the native scroll is fine).
 */
export default function ScrollToTop() {
  const booted = useBootStore((s) => s.booted);
  const { play } = useSound();
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    // Show after scrolling past ~1 viewport height
    setVisible(y > window.innerHeight * 0.9);
  });

  const goTop = () => {
    play("confirm");
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {booted && visible && (
        <motion.button
          onClick={goTop}
          onMouseEnter={() => play("tick")}
          data-cursor-label="top"
          className="fixed bottom-16 left-4 z-[77] flex h-9 w-9 items-center justify-center border border-white/15 bg-[#0A0A0A]/70 text-[#F4F1EA]/70 backdrop-blur-md transition-colors hover:border-[#1738D5] hover:text-[#1738D5] focus-ring sm:bottom-20 sm:left-5"
          initial={{ opacity: 0, y: 12, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
