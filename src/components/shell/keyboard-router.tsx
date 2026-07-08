"use client";
import { useState } from "react";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { ShortcutsOverlay, KonamiOverlay } from "@/components/shell/shortcuts-overlay";
import ShortcutHint from "@/components/shell/shortcut-hint";
import { useMuteStore } from "@/hooks/use-mute";
import { useSound } from "@/hooks/use-sound";
import { NAV_ITEMS } from "@/lib/data";
import { getLenis } from "@/lib/lenis-instance";

/**
 * Top-level keyboard router. Wires the global shortcut hook to:
 *  - section jumps (1–6) via Lenis scrollTo
 *  - metro arrow nav via custom `baaz:arrow` window events
 *  - mute toggle (M)
 *  - konami easter egg
 *  - the shortcuts help overlay (?)
 */
export default function KeyboardRouter() {
  const [konamiOpen, setKonamiOpen] = useState(false);
  const toggleMute = useMuteStore((s) => s.toggle);
  const arm = useMuteStore((s) => s.arm);
  const { play } = useSound();

  const { open, setOpen } = useKeyboardShortcuts({
    onArrow: (dir) => {
      window.dispatchEvent(
        new CustomEvent("baaz:arrow", { detail: dir })
      );
    },
    onHome: () => {
      window.dispatchEvent(new CustomEvent("baaz:metro-home"));
    },
    onEnd: () => {
      window.dispatchEvent(new CustomEvent("baaz:metro-end"));
    },
    onSectionJump: (idx) => {
      const item = NAV_ITEMS[idx];
      if (!item) return;
      const el = document.getElementById(item.id);
      if (!el) return;
      play("confirm");
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(el, { offset: -20, duration: 1.1 });
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    onToggleMute: () => {
      arm();
      toggleMute();
      play("tick");
    },
    onKonami: () => {
      setKonamiOpen(true);
      play("door");
    },
  });

  return (
    <>
      <ShortcutHint onOpen={() => setOpen(true)} />
      <ShortcutsOverlay open={open} onClose={() => setOpen(false)} />
      <KonamiOverlay open={konamiOpen} onClose={() => setKonamiOpen(false)} />
    </>
  );
}
