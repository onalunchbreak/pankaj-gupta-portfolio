"use client";
import { useEffect, useState } from "react";
import CommandPalette from "@/components/shell/command-palette";

/**
 * Top-level keyboard router.
 * Manages global Command Palette (⌘K / Ctrl+K).
 */
export default function KeyboardRouter() {
  const [cmdOpen, setCmdOpen] = useState(false);

  // ⌘K / Ctrl+K toggles the command palette
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <CommandPalette
      key={cmdOpen ? "open" : "closed"}
      open={cmdOpen}
      onClose={() => setCmdOpen(false)}
    />
  );
}
