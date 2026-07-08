"use client";
import { create } from "zustand";

type BootState = {
  booted: boolean;
  skip: () => void;
  setBooted: (v: boolean) => void;
};

export const useBootStore = create<BootState>((set) => ({
  booted: false,
  skip: () => set({ booted: true }),
  setBooted: (v) => set({ booted: v }),
}));
