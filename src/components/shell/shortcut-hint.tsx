"use client";
import { motion } from "framer-motion";
import { useBootStore } from "@/hooks/use-boot";

/**
 * Small fixed "?" hint button bottom-right that opens the shortcuts overlay.
 * Pairs with the case-close "READ" button (which sits at the very bottom).
 */
export default function ShortcutHint({
  onOpen,
}: {
  onOpen: () => void;
}) {
  const booted = useBootStore((s) => s.booted);
  if (!booted) return null;

  return (
    <motion.button
      onClick={onOpen}
      data-cursor-label="?"
      className="fixed bottom-4 right-4 z-[78] flex h-9 w-9 items-center justify-center border border-white/15 bg-[#0A0A0A]/70 font-mono text-sm text-[#F4F1EA]/70 backdrop-blur-md transition-colors hover:border-[#FFD400] hover:text-[#FFD400] focus-ring sm:bottom-5 sm:right-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      aria-label="Show keyboard shortcuts (press question mark)"
      title="Keyboard shortcuts (?)"
    >
      ?
    </motion.button>
  );
}
