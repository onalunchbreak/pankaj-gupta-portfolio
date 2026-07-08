"use client";
import { create } from "zustand";

/**
 * Session stats — tracks how many systems the visitor has inspected,
 * case studies opened, and side projects visited during their session.
 * Displayed in the case-close overlay + a small live HUD.
 */
type SessionStats = {
  systemsInspected: number; // work-log experience overlays opened
  caseStudiesOpened: number; // metro step-out deep-dives opened
  sideProjectsVisited: number; // side-project cards inspected
  sectionsReached: number; // distinct sections scrolled into
  reachedSections: Set<string>;
  inspectSystem: () => void;
  openCaseStudy: () => void;
  visitSideProject: () => void;
  reachSection: (id: string) => void;
  reset: () => void;
};

export const useSessionStats = create<SessionStats>((set, get) => ({
  systemsInspected: 0,
  caseStudiesOpened: 0,
  sideProjectsVisited: 0,
  sectionsReached: 0,
  reachedSections: new Set<string>(),
  inspectSystem: () =>
    set((s) => ({ systemsInspected: s.systemsInspected + 1 })),
  openCaseStudy: () =>
    set((s) => ({ caseStudiesOpened: s.caseStudiesOpened + 1 })),
  visitSideProject: () =>
    set((s) => ({ sideProjectsVisited: s.sideProjectsVisited + 1 })),
  reachSection: (id) => {
    const reached = get().reachedSections;
    if (reached.has(id)) return;
    const next = new Set(reached);
    next.add(id);
    set({ reachedSections: next, sectionsReached: next.size });
  },
  reset: () =>
    set({
      systemsInspected: 0,
      caseStudiesOpened: 0,
      sideProjectsVisited: 0,
      sectionsReached: 0,
      reachedSections: new Set<string>(),
    }),
}));
