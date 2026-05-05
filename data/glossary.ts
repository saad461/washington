export interface GlossaryTerm {
  name: string;
  slug: string;
  category: string;
  definition: string;
  example: string;
  linkLabel: string;
  relatedLinks: { label: string; href: string }[];
  metaTitle: string;
  metaDescription: string;
  h1Title: string;
  ogTitle: string;
  ogDescription: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    name: "Self-Support Reserve (SSR)",
    slug: "self-support-reserve",
    category: "Financial Protection",
    definition: "The Self-Support Reserve (SSR) is a minimum income protection limit set by Washington State to ensure a paying parent is not left impoverished after paying child support. In 2026, the SSR is approximately $2,394 (180% of the federal poverty level).",
    example: "If a non-custodial parent earns $2,000 net income and their calculated child support is $800, paying it would leave them with only $1,200 (below the approximately $2,394 SSR). In this case, the court will likely deviate the payment downward to preserve their basic living needs.",
    linkLabel: "Read SSR Guide",
    relatedLinks: [
      { label: "Check your SSR Eligibility", href: "/worksheet" },
      { label: "Washington Court Directory", href: "/washington-courts" }
    ],
    metaTitle: "What is the Self-Support Reserve (SSR) in WA? | Child Support Glossary | WCSSC",
    metaDescription: "The Self-Support Reserve (SSR) in Washington is $2,394/mo in 2026. Learn how it protects paying parents and affects your child support obligation under RCW 26.19.065.",
    h1Title: "What is the Self-Support Reserve (SSR) in Washington Child Support?",
    ogTitle: "What is the Self-Support Reserve (SSR) in WA? | WCSSC",
    ogDescription: "The Self-Support Reserve (SSR) in Washington is $2,394/mo in 2026. Learn how it protects paying parents and affects your child support obligation under RCW 26.19.065."
  },
  {
    name: "Deviation",
    slug: "deviation",
    category: "Court Adjustments",
    definition: "A deviation is a court-approved adjustment to the standard presumptive child support amount. It allows a judge to increase or decrease the payment based on specific 'good cause' factors not captured in the basic economic tables.",
    example: "A judge grants a downward deviation because the parents have a 50/50 residential split, or an upward deviation because the paying parent possesses significant undocumented wealth.",
    linkLabel: "Read Deviation Guide",
    relatedLinks: [
      { label: "Calculate Base Obligation to Find Deviation Value", href: "/worksheet" }
    ],
    metaTitle: "What is a Child Support Deviation in WA? | Child Support Glossary | WCSSC",
    metaDescription: "A deviation is a court-approved adjustment to Washington's standard child support amount. Learn when courts grant deviations and how to request one under RCW 26.19.075.",
    h1Title: "What is a Child Support Deviation in Washington State?",
    ogTitle: "What is a Child Support Deviation in WA? | WCSSC",
    ogDescription: "A deviation is a court-approved adjustment to Washington's standard child support amount. Learn when courts grant deviations and how to request one under RCW 26.19.075."
  },
  {
    name: "Imputed Income",
    slug: "imputed-income",
    category: "Income Calculation",
    definition: "Imputed income is an estimated income amount assigned by a court to a parent who is voluntarily unemployed, underemployed, or fails to provide sufficient financial documentation.",
    example: "If a software engineer who previously made $150,000 voluntarily quits to work a minimum wage job to avoid child support, the court may impute an income of $150,000 based on their actual earning capacity.",
    linkLabel: "Read Imputed Income Guide",
    relatedLinks: [
      { label: "Calculate Impact of Increased Income", href: "/worksheet" }
    ],
    metaTitle: "What is Imputed Income in WA Child Support? | Child Support Glossary | WCSSC",
    metaDescription: "Imputed income is assigned by a court when a parent is voluntarily unemployed or underemployed. Learn how Washington courts calculate imputed income under RCW 26.19.071.",
    h1Title: "What is Imputed Income in Washington Child Support?",
    ogTitle: "What is Imputed Income in WA Child Support? | WCSSC",
    ogDescription: "Imputed income is assigned by a court when a parent is voluntarily unemployed or underemployed. Learn how Washington courts calculate imputed income under RCW 26.19.071."
  },
  {
    name: "Transfer Payment",
    slug: "transfer-payment",
    category: "Enforcement",
    definition: "The transfer payment is the final, legally enforceable dollar amount that one parent must pay to the other parent each month for child support.",
    example: "After calculating gross income, deductions, and proportional shares on the worksheet, the resulting number—for example, $450—is the official monthly transfer payment.",
    linkLabel: "Read Transfer Payment Guide",
    relatedLinks: [
      { label: "Estimate Your Transfer Payment", href: "/worksheet" }
    ],
    metaTitle: "What is a Child Support Transfer Payment in WA? | Child Support Glossary | WCSSC",
    metaDescription: "The transfer payment is the final monthly amount one parent pays the other for child support in Washington. Learn how it is calculated under RCW 26.19.",
    h1Title: "What is a Child Support Transfer Payment in Washington State?",
    ogTitle: "What is a Child Support Transfer Payment in WA? | WCSSC",
    ogDescription: "The transfer payment is the final monthly amount one parent pays the other for child support in Washington. Learn how it is calculated under RCW 26.19."
  },
  {
    name: "Combined Net Income",
    slug: "combined-net-income",
    category: "Income Calculation",
    definition: "Combined net income is the total sum of both Parent 1 and Parent 2's monthly income after all mandatory state deductions (like taxes, union dues, and L&I) are removed.",
    example: "If Parent A has a net income of $3,000 and Parent B has a net income of $5,000, their 'Combined Net Income' is $8,000. This $8,000 figure is used to look up the base child support obligation on the state economic table.",
    linkLabel: "Read Net Income Guide",
    relatedLinks: [
      { label: "View Support Estimates for $8,000 Income", href: "/income-8000-2-children" }
    ],
    metaTitle: "What is Combined Net Income in WA Child Support? | Child Support Glossary | WCSSC",
    metaDescription: "Combined net income is both parents monthly income after mandatory deductions. It determines your position on Washington's 2026 economic table under RCW 26.19.071.",
    h1Title: "What is Combined Net Income in Washington Child Support?",
    ogTitle: "What is Combined Net Income in WA Child Support? | WCSSC",
    ogDescription: "Combined net income is both parents monthly income after mandatory deductions. It determines your position on Washington's 2026 economic table under RCW 26.19.071."
  },
  {
    name: "Extraordinary Expenses",
    slug: "extraordinary-expenses",
    category: "Proportional Shares",
    definition: "Extraordinary expenses are large, out-of-pocket costs that are NOT covered by the basic child support transfer payment. By Washington law, these must be shared proportionately based on each parent's income percentage.",
    example: "Daycare, health insurance premiums, and long-distance travel expenses for visitation are all considered extraordinary expenses. If Parent A makes 70% of the combined income, they pay 70% of the daycare bill.",
    linkLabel: "Read Extraordinary Expenses Guide",
    relatedLinks: [
      { label: "Calculate Proportional Expense Splits", href: "/extra-expenses" }
    ],
    metaTitle: "What are Extraordinary Expenses in WA Child Support? | Child Support Glossary | WCSSC",
    metaDescription: "Extraordinary expenses are costs not covered by basic child support in Washington including healthcare and daycare. Learn how they are split proportionally under RCW 26.19.080.",
    h1Title: "What are Extraordinary Expenses in Washington Child Support?",
    ogTitle: "What are Extraordinary Expenses in WA Child Support? | WCSSC",
    ogDescription: "Extraordinary expenses are costs not covered by basic child support in Washington including healthcare and daycare. Learn how they are split proportionally under RCW 26.19.080."
  }
];
