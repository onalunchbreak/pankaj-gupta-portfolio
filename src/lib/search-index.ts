"use client";
import { NAV_ITEMS, METRO_STATIONS, EXPERIENCES, RESEARCH, LAB } from "@/lib/data";

export type SearchEntry = {
  id: string;
  label: string;
  sub: string;
  type: "section" | "station" | "experience" | "paper" | "project";
  target: string; // element id to scroll to
  keywords: string;
};

/**
 * Build a flat searchable index of all navigable destinations in the portfolio.
 * Used by the command palette (⌘K).
 */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  // Sections
  NAV_ITEMS.forEach((item) => {
    entries.push({
      id: `section-${item.id}`,
      label: item.label,
      sub: "Section",
      type: "section",
      target: item.id,
      keywords: item.label.toLowerCase(),
    });
  });

  // Metro stations
  METRO_STATIONS.forEach((station) => {
    entries.push({
      id: `station-${station.id}`,
      label: station.name,
      sub: `Station · ${station.theme}`,
      type: "station",
      target: "best-work",
      keywords: `${station.name} ${station.theme} ${station.role} ${station.tag}`.toLowerCase(),
    });
  });

  // Work experiences
  EXPERIENCES.forEach((exp) => {
    entries.push({
      id: `exp-${exp.id}`,
      label: exp.company,
      sub: `Experience · ${exp.role}`,
      type: "experience",
      target: "work-log",
      keywords: `${exp.company} ${exp.role} ${exp.systemType.join(" ")}`.toLowerCase(),
    });
  });

  // Research papers
  RESEARCH.papers.forEach((paper) => {
    entries.push({
      id: `paper-${paper.id}`,
      label: paper.title,
      sub: `Paper · ${paper.venue} ${paper.year}`,
      type: "paper",
      target: "research",
      keywords: `${paper.title} ${paper.venue} ${paper.domain.join(" ")} ${paper.supervisor}`.toLowerCase(),
    });
  });

  // Side projects
  LAB.sideProjects.forEach((project) => {
    entries.push({
      id: `project-${project.id}`,
      label: project.name,
      sub: `Side Project · ${project.status}`,
      type: "project",
      target: "lab",
      keywords: `${project.name} ${project.desc} ${project.categories.join(" ")}`.toLowerCase(),
    });
  });

  return entries;
}

/**
 * Simple fuzzy filter: matches if every char of the query appears in order
 * in the entry's keyword string (subsequence match). Ranks by match position
 * + whether the match starts at a word boundary.
 */
export function filterEntries(entries: SearchEntry[], query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return entries.slice(0, 8); // show top 8 by default

  const scored = entries
    .map((entry) => {
      const haystack = entry.keywords;
      let qi = 0;
      let score = 0;
      let lastMatch = -1;
      for (let i = 0; i < haystack.length && qi < q.length; i++) {
        if (haystack[i] === q[qi]) {
          // word-boundary bonus
          if (i === 0 || haystack[i - 1] === " ") score += 5;
          // proximity bonus (closer to start = better)
          if (lastMatch === -1) score += Math.max(0, 20 - i);
          score += 1;
          lastMatch = i;
          qi++;
        }
      }
      if (qi < q.length) return null; // not all query chars matched
      return { entry, score };
    })
    .filter((x): x is { entry: SearchEntry; score: number } => x !== null);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 8).map((s) => s.entry);
}
