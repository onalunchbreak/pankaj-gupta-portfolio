"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBootStore } from "@/hooks/use-boot";

export default function IssueBadge() {
  const [visible, setVisible] = useState(true);
  const booted = useBootStore((s) => s.booted);

  if (!booted || !visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 left-4 z-[78] flex items-center gap-2 rounded-full bg-[#E53935] px-3.5 py-1.5 font-mono text-[11px] font-medium text-white shadow-lg sm:bottom-5 sm:left-5 select-none"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/25 text-[9px] font-bold">
          N
        </span>
        <span>1 Issue</span>
        <button
          onClick={() => setVisible(false)}
          className="ml-1 opacity-70 hover:opacity-100 focus:outline-none cursor-pointer"
          aria-label="Dismiss 1 Issue badge"
        >
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
