export interface GlossaryTerm {
  term: string;
  slug: string;
  definition: string;
  example: string;
  relatedLinks: { label: string; href: string }[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Self-Support Reserve (SSR)",
    slug: "self-support-reserve",
    definition: "The Self-Support Reserve (SSR) is a minimum income protection limit set by Washington State to ensure a paying parent is not left impoverished after paying child support. In 2026, the SSR is approximately $2,394 (180% of the federal poverty level).",
    example: "If a non-custodial parent earns $2,000 net income and their calculated child support is $800, paying it would leave them with only $1,200 (below the approximately $2,394 SSR). In this case, the court will likely deviate the payment downward to preserve their basic living needs.",
    relatedLinks: [
      { label: "Check your SSR Eligibility", href: "/worksheet" },
      { label: "King County Support Filing", href: "/washington-courts/king-county" }
    ]
  },
  {
    term: "Deviation",
    slug: "deviation",
    definition: "A deviation is a court-approved adjustment to the standard presumptive child support amount. It allows a judge to increase or decrease the payment based on specific 'good cause' factors not captured in the basic economic tables.",
    example: "A judge grants a downward deviation because the parents have a 50/50 residential split, or an upward deviation because the paying parent possesses significant undocumented wealth.",
    relatedLinks: [
      { label: "Calculate Base Obligation to Find Deviation Value", href: "/worksheet" }
    ]
  },
  {
    term: "Imputed Income",
    slug: "imputed-income",
    definition: "Imputed income is an estimated income amount assigned by a court to a parent who is voluntarily unemployed, underemployed, or fails to provide sufficient financial documentation.",
    example: "If a software engineer who previously made $150,000 voluntarily quits to work a minimum wage job to avoid child support, the court may impute an income of $150,000 based on their actual earning capacity.",
    relatedLinks: [
      { label: "Calculate Impact of Increased Income", href: "/worksheet" }
    ]
  },
  {
    term: "Transfer Payment",
    slug: "transfer-payment",
    definition: "The transfer payment is the final, legally enforceable dollar amount that one parent must pay to the other parent each month for child support.",
    example: "After calculating gross income, deductions, and proportional shares on the worksheet, the resulting number—for example, $450—is the official monthly transfer payment.",
    relatedLinks: [
      { label: "Estimate Your Transfer Payment", href: "/worksheet" }
    ]
  },
  {
    term: "Combined Net Income",
    slug: "combined-net-income",
    definition: "Combined net income is the total sum of both Parent 1 and Parent 2's monthly income after all mandatory state deductions (like taxes, union dues, and L&I) are removed.",
    example: "If Parent A has a net income of $3,000 and Parent B has a net income of $5,000, their 'Combined Net Income' is $8,000. This $8,000 figure is used to look up the base child support obligation on the state economic table.",
    relatedLinks: [
      { label: "View Support Estimates for $8,000 Income", href: "/income-8000-2-children" }
    ]
  },
  {
    term: "Extraordinary Expenses",
    slug: "extraordinary-expenses",
    definition: "Extraordinary expenses are large, out-of-pocket costs that are NOT covered by the basic child support transfer payment. By Washington law, these must be shared proportionately based on each parent's income percentage.",
    example: "Daycare, health insurance premiums, and long-distance travel expenses for visitation are all considered extraordinary expenses. If Parent A makes 70% of the combined income, they pay 70% of the daycare bill.",
    relatedLinks: [
      { label: "Calculate Proportional Expense Splits", href: "/extra-expenses" }
    ]
  }
];
