"use client";
import { useEffect } from "react";
import { useMuteStore } from "@/hooks/use-mute";

/**
 * Arms the audio system on the first user gesture (per autoplay policy).
 * Also listens for a custom "sfx" event so any component can fire SFX
 * without importing the hook (useful inside GSAP callbacks).
 */
export default function SoundManager() {
  const arm = useMuteStore((s) => s.arm);

  useEffect(() => {
    const gestures = ["pointerdown", "keydown", "touchstart"];
    const onGesture = () => arm();
    gestures.forEach((g) => window.addEventListener(g, onGesture, { once: true }));
    return () => {
      gestures.forEach((g) => window.removeEventListener(g, onGesture));
    };
  }, [arm]);

  return null;
}
