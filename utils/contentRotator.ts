/**
 * Content Rotator for Programmatic SEO Uniqueness
 * Library of 10 expert legal insights to ensure no two pages share identical content matrices.
 */

export interface LegalInsight {
  title: string;
  content: string;
}

export const INSIGHTS_LIBRARY: LegalInsight[] = [
  {
    title: "Deviation Factors",
    content: "Washington courts may deviate from the standard calculation if there is a significant disparity in parent wealth or if one parent has multiple children from other relationships."
  },
  {
    title: "Tax Credit Impact",
    content: "The federal child tax credit is typically assigned to the custodial parent in WA, but many parents negotiate a rotating year-by-year claiming schedule."
  },
  {
    title: "Split Custody Rules",
    content: "In cases of true split custody (50/50), the court often uses a 'cross-calculation' method to find the net difference between the two obligations."
  },
  {
    title: "Post-Secondary Support",
    content: "Support generally ends at age 18 or high school graduation, but Washington is one of the few states where judges can order support for college or vocational training."
  },
  {
    title: "Overtime & Bonuses",
    content: "Intermittent income like bonuses or commissions must be averaged over 2 years in Washington to determine a fair monthly calculation."
  },
  {
    title: "Step-Parent Income",
    content: "While step-parent income is not included in the 'Base Support' calculation, it can be used as a reason to deviate if it significantly increases the household's wealth."
  },
  {
    title: "Healthcare Premiums",
    content: "The parent providing health insurance for the child receives a credit on the worksheet for the amount of the premium that is actually paid for the child."
  },
  {
    title: "Childcare Expenses",
    content: "Work-related daycare costs are shared on top of the base monthly support amount, partitioned based on each parent's proportional share of income."
  },
  {
    title: "Extraordinary Travel",
    content: "If parents live far apart, the costs for the child to travel for visitation are considered 'Extraordinary Expenses' and are shared proportionally."
  },
  {
    title: "Non-Custodial Deductions",
    content: "Deductions for union dues, mandatory pension contributions, and professional dues are strictly enforced in WA calculation worksheets."
  }
];

/**
 * Deterministically selects 3 unique insights based on the slug.
 */
export function getUniqueInsights(slug: string): LegalInsight[] {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  
  const absHash = Math.abs(hash);
  const selected: LegalInsight[] = [];
  
  // Use different modulo slices to pick 3 distinct items
  selected.push(INSIGHTS_LIBRARY[absHash % 10]);
  selected.push(INSIGHTS_LIBRARY[(absHash + 3) % 10]);
  selected.push(INSIGHTS_LIBRARY[(absHash + 7) % 10]);
  
  return selected;
}
