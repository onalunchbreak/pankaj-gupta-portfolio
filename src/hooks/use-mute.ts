"use client";
import { create } from "zustand";

type MuteState = {
  muted: boolean;
  armed: boolean; // user has made first gesture → audio unlocked
  toggle: () => void;
  arm: () => void;
};

export const useMuteStore = create<MuteState>((set, get) => ({
  muted: true, // default muted per spec
  armed: false,
  toggle: () => set({ muted: !get().muted }),
  arm: () => {
    if (!get().armed) set({ armed: true, muted: false });
  },
}));
