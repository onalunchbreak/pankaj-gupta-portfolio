"use client";
import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useCountUp } from "@/hooks/use-count-up";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import ShareButton from "@/components/shell/share-button";

/* ---------- Section shell with consistent index label ---------- */
export function SectionShell({
  id,
  index,
  label,
  children,
  className = "",
}: {
  id: string;
  index?: string;
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 ${className}`}
    >
      {/* Brutalist corner registration marks — printer's crosshairs at the
          section's top corners. Reinforces the editorial-brutalist grid. */}
      <span aria-hidden className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-white/15" />
      <span aria-hidden className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-white/15" />

      {(index || label) && (
        <motion.div
          className="mb-10 flex items-center gap-3 border-b border-white/10 pb-3 font-mono text-[11px] uppercase tracking-widest text-[#6B6B6B] sm:mb-14"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {index && <span className="text-[#FFD400]">{index}</span>}
          {label && <span className="text-[#F4F1EA]/70">{label}</span>}
          <span className="ml-auto hidden h-px flex-1 bg-white/10 sm:block" />
          <span className="hidden sm:inline">{"// mr_onalunchbreak.sys"}</span>
          <ShareButton sectionId={id} />
        </motion.div>
      )}
      {children}
    </section>
  );
}

/* ---------- Word-by-word reveal ---------- */
export function RevealWords({
  text,
  className = "",
  delay = 0,
  stagger = 0.08,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "p" | "h1" | "h2" | "h3" | "blockquote";
}) {
  const words = text.split(" ");
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-top">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/* ---------- Single block reveal ---------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Count up number ---------- */
export function CountUp({
  target,
  suffix = "",
  duration = 1.5,
  className = "",
  display,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
  display?: string;
}) {
  const { ref, display: counted } = useCountUp(target, { duration, suffix });
  const reduced = usePrefersReducedMotion();
  return (
    <span ref={ref} className={className}>
      {display ? (reduced ? display : display) : counted}
    </span>
  );
}
