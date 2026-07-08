"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Check } from "lucide-react";
import { useSound } from "@/hooks/use-sound";

/**
 * Share-button — copies a URL with the section's hash (#section-id) to the
 * clipboard. Shows a "COPIED" confirmation for 2s. Uses a robust fallback
 * (textarea + execCommand) for non-secure contexts / restricted iframes.
 */
export default function ShareButton({ sectionId }: { sectionId: string }) {
  const [copied, setCopied] = useState(false);
  const { play } = useSound();

  const copy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    // Optimistic visual feedback — the URL hash update is the reliable part
    // (clipboard API may be blocked in restricted iframes, but the hash still
    // updates so the URL is shareable).
    setCopied(true);
    play(ok ? "confirm" : "blip");
    if (typeof window !== "undefined" && window.history.replaceState) {
      window.history.replaceState(null, "", `#${sectionId}`);
    }
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      onMouseEnter={() => play("tick")}
      data-cursor-label={copied ? "copied" : "share"}
      className="group flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B6B6B] transition-colors hover:text-[#1738D5] focus-ring"
      aria-label={`Share link to ${sectionId} section`}
      title="Copy section link"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            className="flex items-center gap-1.5 text-[#1738D5]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="h-3 w-3" aria-hidden />
            <span>copied</span>
          </motion.span>
        ) : (
          <motion.span
            key="share"
            className="flex items-center gap-1.5"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <Link2 className="h-3 w-3 transition-transform group-hover:rotate-12" aria-hidden />
            <span className="hidden sm:inline">share</span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
