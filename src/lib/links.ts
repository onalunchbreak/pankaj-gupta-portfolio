// ============================================================
// LINKS — extracted from resume PDF annotations.
// No URLs have been fabricated. Missing links are omitted
// (empty string) and rendered as non-clickable text.
// ============================================================

export const links = {
  email: "connectwithguptapankaj@gmail.com",
  linkedin: "",
  github: "",
  portfolio: "",
  publications: {
    sepsis: "",
    frenchNER: "",
    transformerNER: "",
    multimodalSentiment: "",
  },
  projects: {
    queensGambit: "",
    dailyDoseOfAI: "",
    skillTracer: "",
    modernDataSolutions: "",
  },
} as const;

/**
 * Returns true if a link is available (non-empty).
 * Use this to conditionally render links vs disabled labels.
 */
export function hasLink(url: string | undefined): boolean {
  return Boolean(url && url.trim().length > 0);
}
