"use client";
import { useEffect, useState } from "react";

export type ShortcutDef = {
  keys: string; // display string e.g. "← / →"
  desc: string;
};

export const SHORTCUTS: ShortcutDef[] = [
  { keys: "1 — 7", desc: "Jump to section" },
  { keys: "← / →", desc: "Navigate metro stations" },
  { keys: "M", desc: "Toggle sound" },
  { keys: "?", desc: "Show / hide this panel" },
  { keys: "Esc", desc: "Close any overlay" },
];

/**
 * Global keyboard shortcut hook.
 * - "?" toggles the help overlay (returns `open` state + `toggle`).
 * - "1"–"6" jump to the six nav sections.
 * - "m" toggles mute.
 * - ArrowUp/ArrowDown/ArrowLeft/ArrowRight + konami are handled by callers
 *   via the `onArrow` / `onKonami` callbacks.
 */
export function useKeyboardShortcuts(opts?: {
  onArrow?: (dir: "left" | "right" | "up" | "down") => void;
  onHome?: () => void;
  onEnd?: () => void;
  onKonami?: () => void;
  onToggleMute?: () => void;
  onSectionJump?: (idx: number) => void;
}) {
  const { onArrow, onHome, onEnd, onKonami, onToggleMute, onSectionJump } = opts ?? {};
  const [open, setOpen] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);

  // konami sequence: ↑ ↑ ↓ ↓ ← → ← → B A
  const KONAMI = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      // ignore typing in inputs/textareas
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (target?.isContentEditable) return;

      const k = e.key;

      // "?" opens/closes the help overlay (shift+/ on most layouts)
      if (k === "?" || (k === "/" && e.shiftKey)) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }

      // Esc closes the help overlay (other Esc handlers close their own overlays)
      if (k === "Escape" && open) {
        setOpen(false);
        return;
      }

      // 1-7 → section jump
      if (/^[1-7]$/.test(k) && onSectionJump) {
        e.preventDefault();
        onSectionJump(parseInt(k, 10) - 1);
        return;
      }

      // m → mute toggle
      if (k === "m" || k === "M") {
        onToggleMute?.();
        return;
      }

      // Home / End → metro first / last station
      if (k === "Home") {
        onHome?.();
        return;
      }
      if (k === "End") {
        onEnd?.();
        return;
      }

      // arrows → metro nav (only left/right matter, but pass all)
      if (
        k === "ArrowLeft" ||
        k === "ArrowRight" ||
        k === "ArrowUp" ||
        k === "ArrowDown"
      ) {
        // konami tracking first
        const next = KONAMI[konamiProgress];
        if (k === next) {
          const np = konamiProgress + 1;
          if (np === KONAMI.length) {
            onKonami?.();
            setKonamiProgress(0);
            return;
          }
          setKonamiProgress(np);
          // arrows also bubble to onArrow unless we're mid-konami
          // (keep arrow nav working; konami is a subset that still navigates)
        } else {
          setKonamiProgress(k === KONAMI[0] ? 1 : 0);
        }
        const dir =
          k === "ArrowLeft"
            ? "left"
            : k === "ArrowRight"
              ? "right"
              : k === "ArrowUp"
                ? "up"
                : "down";
        onArrow?.(dir);
        return;
      }

      // b / a for konami tail (after arrows)
      if (k === "b" || k === "a") {
        if (k === KONAMI[konamiProgress]) {
          const np = konamiProgress + 1;
          if (np === KONAMI.length) {
            onKonami?.();
            setKonamiProgress(0);
            return;
          }
          setKonamiProgress(np);
        } else {
          setKonamiProgress(0);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, konamiProgress, onArrow, onHome, onEnd, onKonami, onToggleMute, onSectionJump]);

  return { open, setOpen, konamiProgress };
}
