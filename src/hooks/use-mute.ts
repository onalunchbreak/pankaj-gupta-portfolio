"use client";
import { create } from "zustand";

const STORAGE_KEY = "baaz-sound-pref";

type MuteState = {
  muted: boolean;
  armed: boolean; // user has made first gesture → audio unlocked
  toggle: () => void;
  arm: () => void;
  setMuted: (v: boolean) => void;
};

function readStored(): boolean | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "muted") return true;
    if (v === "unmuted") return false;
    return null;
  } catch {
    return null;
  }
}

function writeStored(muted: boolean) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, muted ? "muted" : "unmuted");
  } catch {
    /* no-op */
  }
}

// Default muted per spec; honor stored preference if present.
const stored = readStored();

export const useMuteStore = create<MuteState>((set, get) => ({
  muted: stored === null ? true : stored, // default muted; persist preference
  armed: false,
  toggle: () => {
    const next = !get().muted;
    writeStored(next);
    set({ muted: next });
  },
  setMuted: (v) => {
    writeStored(v);
    set({ muted: v });
  },
  arm: () => {
    if (!get().armed) {
      // On first arm, respect the stored preference (don't force unmute).
      const pref = readStored();
      set({ armed: true, muted: pref === null ? false : pref });
    }
  },
}));
