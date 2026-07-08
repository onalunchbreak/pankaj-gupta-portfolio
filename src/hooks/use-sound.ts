"use client";
import { useEffect, useRef } from "react";
import { Howl } from "howler";
import { getSfx } from "@/lib/sfx";
import { useMuteStore } from "@/hooks/use-mute";

type SfxName = "tick" | "confirm" | "whoosh" | "blip" | "door";

let howls: Record<SfxName, Howl> | null = null;
function ensureHowls(): Record<SfxName, Howl> | null {
  if (typeof window === "undefined") return null;
  if (howls) return howls;
  const sfx = getSfx();
  howls = {
    tick: new Howl({ src: [sfx.tick], volume: 0.5 }),
    confirm: new Howl({ src: [sfx.confirm], volume: 0.6 }),
    whoosh: new Howl({ src: [sfx.whoosh], volume: 0.5 }),
    blip: new Howl({ src: [sfx.blip], volume: 0.5 }),
    door: new Howl({ src: [sfx.door], volume: 0.7 }),
  };
  return howls;
}

export function useSound() {
  const muted = useMuteStore((s) => s.muted);
  const armed = useMuteStore((s) => s.armed);
  const mutedRef = useRef(muted);
  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  useEffect(() => {
    ensureHowls();
  }, []);

  const play = (name: SfxName) => {
    if (mutedRef.current || !armed) return;
    const h = ensureHowls();
    if (!h) return;
    try {
      h[name].play();
    } catch {
      /* no-op */
    }
  };

  return { play };
}
