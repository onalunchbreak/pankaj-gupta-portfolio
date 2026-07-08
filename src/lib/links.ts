// ============================================================
// LINKS — extracted from the resume PDF annotations.
// All URLs below were programmatically extracted from
// Pankaj Gupta Resume_Latest.pdf. No URLs were fabricated.
// ============================================================

export const links = {
  email: "connectwithguptapankaj@gmail.com",
  linkedin: "https://www.linkedin.com/in/gupta-pankaj/",
  github: "https://github.com/onalunchbreak",
  portfolio: "",
  phone: "+91 8178881059",
  // Company / institution links
  companies: {
    sensehq: "https://www.sensehq.com/",
    cegis: "https://www.cegis.org/",
    cambridgeJbs: "https://www.jbs.cam.ac.uk/",
    bosch: "https://www.bosch-india-softtech.com/",
  },
  // Education links (extracted from resume)
  education: {
    nyu: "https://credentials.engineering.nyu.edu/322c5bd5-2f43-480a-a700-51455fd23aab#acc.bgn0POcz",
    iiitDelhi: "https://drive.google.com/file/d/1SZl9j56rvZ4qW8EcCy_5i6muG25X9Uyu/view?usp=sharing",
    nextLeap: "https://www.linkedin.com/in/gupta-pankaj/details/honors/1635554451885/single-media-viewer/?profileId=ACoAACLgHN8BgAC4xBg9Gm1qV9p5Wfo5FGA6X6s",
  },
  // Achievement / fellowship links (extracted from resume)
  achievements: {
    fatima: "https://www.fatima.institute/",
    amazonML: "https://www.scaler.com/partnerships/amazon#hero",
    teachForIndia: "https://www.teachforindia.org/",
  },
  publications: {
    sepsis: "https://aclanthology.org/2025.acl-srw.7/",
    frenchNER: "https://link.springer.com/chapter/10.1007/978-3-031-28238-6_28",
    transformerNER: "https://ojs.aaai.org/index.php/AAAI/article/view/26958",
    multimodalSentiment: "https://ieeexplore.ieee.org/document/10201711",
  },
  projects: {
    queensGambit: "https://github.com/onalunchbreak/queens-gambit",
    dailyDoseOfAI: "https://ddoai.vercel.app/",
    skillTracer: "https://github.com/onalunchbreak/skilltracer",
    modernDataSolutions:
      "https://www.linkedin.com/in/gupta-pankaj/overlay/certifications/1647646941/multiple-media-viewer/?profileId=ACoAACLgHN8BgAC4xBg9Gm1qV9p5Wfo5FGA6X6s&treasuryMediaId=1635550218439",
  },
} as const;

/**
 * Returns true if a link is available (non-empty).
 * Use this to conditionally render links vs disabled labels.
 */
export function hasLink(url: string | undefined): boolean {
  return Boolean(url && url.trim().length > 0);
}
