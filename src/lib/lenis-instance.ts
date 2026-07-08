"use client";
import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}
export function getLenis(): Lenis | null {
  return instance;
}
