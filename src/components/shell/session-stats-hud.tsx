"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useSessionStats } from "@/hooks/use-session-stats";
import { useBootStore } from "@/hooks/use-boot";
import { Activity } from "lucide-react";

/**
 * Session Stats HUD — a small fixed widget (top-right, below the status bar)
 * that shows live session activity: systems inspected, case studies opened,
 * side projects visited. Gives the visitor a sense of their exploration
 * progress and reinforces the "product lab workspace" feel.
 *
 * Hidden during preloader. Collapses to icons-only on small screens.
 */
export default function SessionStatsHud() {
  const booted = useBootStore((s) => s.booted);
  const systems = useSessionStats((s) => s.systemsInspected);
  const cases = useSessionStats((s) => s.caseStudiesOpened);
  const projects = useSessionStats((s) => s.sideProjectsVisited);
  const sections = useSessionStats((s) => s.sectionsReached);

  const totalActivity = systems + cases + projects;

  return (
    <AnimatePresence>
      {booted && totalActivity > 0 && (
        <motion.div
          className="pointer-events-none fixed right-3 top-12 z-[72] hidden border border-white/10 bg-[#0A0A0A]/80 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur-md sm:block lg:right-5 lg:top-14"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <div className="mb-1.5 flex items-center gap-1.5 text-[#1738D5]">
            <Activity className="h-2.5 w-2.5" aria-hidden />
            <span className="text-[8px] tracking-[0.3em]">{"// session.log"}</span>
          </div>
          <div className="flex gap-3">
            <Stat label="SYS" value={systems} color="text-[#FFD400]" />
            <Stat label="CASE" value={cases} color="text-[#1738D5]" />
            <Stat label="LAB" value={projects} color="text-[#FFD400]" />
            <Stat label="SEC" value={sections} color="text-[#F4F1EA]/70" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className={`tabular-nums font-bold ${color}`}>{String(value).padStart(2, "0")}</span>
      <span className="text-[7px] text-[#6B6B6B]">{label}</span>
    </div>
  );
}
