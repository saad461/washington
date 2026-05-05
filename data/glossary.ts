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
  // Part 2 additions:
  legalDefinition: string;
  howItWorks: string[];
  fullExample: string;
  howItAffects: string;
  faqs: { question: string; answer: string }[];
  relatedTerms: { label: string; href: string }[];
  rcw: string;
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
    ogDescription: "The Self-Support Reserve (SSR) in Washington is $2,394/mo in 2026. Learn how it protects paying parents and affects your child support obligation under RCW 26.19.065.",
    legalDefinition: "RCW 26.19.065(2)(b) states the basic support obligation of the parent making the transfer payment shall not reduce their net income below the self-support reserve of 180% of the federal poverty level for a one-person family. In 2026 this amount is $2,394 per month.",
    howItWorks: [
      "When a parent's calculated child support obligation would leave them with less than $2,394 per month after paying, the obligation is automatically reduced. The SSR does not eliminate the obligation entirely — the minimum payment is still $50 per child per month regardless of income.",
      "The SSR applies only to the basic support obligation. Healthcare premiums, daycare costs, and extraordinary expenses are calculated separately and may be added on top of the SSR-reduced amount.",
      "The SSR is recalculated annually based on the federal poverty guideline. The 2026 value of $2,394 replaces the previous 2025 value of $2,347.50. Always confirm the current SSR at courts.wa.gov before filing."
    ],
    fullExample: "Parent 1 net income: $2,800/mo\nChildren: 1\nCalculated obligation from table: $652\n\nSSR check:\n$2,800 - $652 = $2,148\n$2,148 is below SSR of $2,394 → SSR applies\nAdjusted obligation: $2,800 - $2,394 = $406/mo\n\nMinimum floor check:\n$50 × 1 child = $50\n$406 > $50 → use $406\n\nFinal transfer payment: $406/mo",
    howItAffects: "If your net income minus your calculated obligation falls below $2,394 your payment will be reduced to Payer Net Income minus $2,394. The higher your income relative to the obligation the less likely SSR applies. SSR most commonly affects lower income paying parents with high table obligations relative to their earnings.",
    faqs: [
      { question: "Does the SSR apply to both parents?", answer: "The SSR check applies to whichever parent is making the transfer payment. If the paying parent's net income is above $2,394 plus their obligation the SSR does not reduce their payment." },
      { question: "Can the court ignore the SSR?", answer: "Yes in limited circumstances. If the custodial parent's household would be left with insufficient funds to meet the children's basic needs the court may require payment below the SSR with written findings of fact." },
      { question: "Does the SSR include healthcare and daycare?", answer: "No. The SSR protection applies only to the basic support obligation on Line 9 of the worksheet. Healthcare and daycare shares are calculated separately on Lines 10-14 and added after the SSR check." }
    ],
    relatedTerms: [
      { label: "Transfer Payment", href: "/glossary/transfer-payment" },
      { label: "Standard Calculation", href: "/glossary" },
      { label: "Deviation", href: "/glossary/deviation" }
    ],
    rcw: "RCW 26.19.065(2)(b)"
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
    ogDescription: "A deviation is a court-approved adjustment to Washington's standard child support amount. Learn when courts grant deviations and how to request one under RCW 26.19.075.",
    legalDefinition: "RCW 26.19.075 permits the court to deviate from the standard calculation when specific factors exist. The court must enter written findings specifying reasons for any deviation. Agreement of the parties alone is not sufficient reason for deviation under RCW 26.19.075(5).",
    howItWorks: [
      "Deviations can go in either direction — upward meaning the paying parent pays more than the standard calculation, or downward meaning they pay less.",
      "Common reasons courts grant upward deviations: The paying parent has substantial wealth or assets beyond their income. The child has special medical, educational, or psychological needs. Extraordinary expenses exist that the basic table does not capture.",
      "Common reasons courts grant downward deviations: The paying parent has significant residential time with the child. The paying parent has extraordinary debt not voluntarily incurred. The paying parent supports children from other relationships. Income used in the calculation is nonrecurring such as a one-time bonus.",
      "A deviation must be requested in writing, supported by evidence, and approved by the court with written findings. Courts cannot accept an incomplete deviation request."
    ],
    fullExample: "Standard calculation result: $1,200/mo\nPaying parent has child 35% of the time.\nCourt grants downward deviation of 25%.\n\nDeviation credit: $1,200 × 25% = $300\nAdjusted transfer payment: $1,200 - $300 = $900/mo\n\nThe court enters written findings documenting the residential time and expense evidence supporting the $300 deviation.",
    howItAffects: "A deviation directly increases or decreases your final Line 17 transfer payment. The standard calculation is always determined first — the court cannot consider deviation reasons until the standard calculation is established. Deviations are not guaranteed and require compelling written evidence.",
    faqs: [
      { question: "Can parents agree to a deviation without court approval?", answer: "No. All deviations must be approved by the court with written findings of fact. A private agreement between parents without court approval is not a legally enforceable deviation." },
      { question: "Is a deviation permanent?", answer: "No. Either parent can request modification of a deviation if circumstances change substantially. Deviations are reviewed at the same time as any support modification." },
      { question: "How much can a court deviate from the standard calculation?", answer: "There is no fixed limit. The court exercises full discretion based on the best interests of the children and the circumstances of both parents. Deviations must be supported by specific written findings." }
    ],
    relatedTerms: [
      { label: "Standard Calculation", href: "/glossary" },
      { label: "Parenting Time Credit", href: "/glossary" },
      { label: "Support Modification", href: "/glossary" }
    ],
    rcw: "RCW 26.19.075"
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
    ogDescription: "Imputed income is assigned by a court when a parent is voluntarily unemployed or underemployed. Learn how Washington courts calculate imputed income under RCW 26.19.071.",
    legalDefinition: "RCW 26.19.071(6) states the court shall impute income to a parent when the parent is voluntarily unemployed or voluntarily underemployed. The court determines voluntary status based on assets, employment history, job skills, educational attainment, health, age, criminal record, and local job market conditions.",
    howItWorks: [
      "Courts use this priority order when calculating imputed income:",
      "1. Full-time earnings at current rate of pay\n2. Full-time earnings at historical rate of pay based on reliable information\n3. Past rate of pay where information is incomplete\n4. Earnings of 32 hours per week at minimum wage for parents recently on TANF, recently incarcerated, or recent high school graduates\n5. Full-time minimum wage if no earnings history\n6. Median net monthly income from US Census Bureau current population reports",
      "A court cannot impute income to a parent who is gainfully employed full-time unless the court specifically finds they are purposely underemployed to reduce their child support obligation."
    ],
    fullExample: "Parent 2 voluntarily quit their $4,000/mo job before the child support hearing.\n\nCourt review finds:\n- Parent 2 has 10 years experience as an accountant\n- Local job market shows available accounting positions\n- No medical or disability barrier to employment\n\nCourt imputes income at historical rate: $4,000/mo\nThis imputed amount is used in the combined net income calculation regardless of current earnings.",
    howItAffects: "Imputed income increases the non-working parent's share of the combined net income. This reduces the working parent's income share percentage and therefore reduces their proportional obligation. Conversely if income is imputed to the paying parent it increases their obligation.",
    faqs: [
      { question: "Can income be imputed if I was laid off involuntarily?", answer: "Typically no. Involuntary unemployment due to layoff, illness, or disability is not voluntary unemployment. However the court may impute income if you are not actively seeking new employment." },
      { question: "How long does imputed income apply?", answer: "Until you return to work at an appropriate level or successfully petition for modification showing changed circumstances and genuine job search efforts." },
      { question: "Can I challenge imputed income?", answer: "Yes. Present evidence of active job search, health limitations, childcare barriers, or other genuine employment obstacles. The court weighs all evidence before imputing income." }
    ],
    relatedTerms: [
      { label: "Gross Monthly Income", href: "/glossary" },
      { label: "Net Monthly Income", href: "/glossary" },
      { label: "Voluntary Unemployment", href: "/glossary" }
    ],
    rcw: "RCW 26.19.071(6)"
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
    ogDescription: "The transfer payment is the final monthly amount one parent pays the other for child support in Washington. Learn how it is calculated under RCW 26.19.",
    legalDefinition: "RCW 26.19.011 defines the support transfer payment as the amount of money the court orders one parent to pay another parent or custodian for child support after determination of the standard calculation and any deviations.",
    howItWorks: [
      "The transfer payment is the result of completing all 8 parts of the WSCSS worksheet in order:",
      "Step 1: Look up basic obligation from 2026 economic table (per child amount × number of children)\nStep 2: Multiply by each parent's income share percentage\nStep 3: Apply SSR check and limitations\nStep 4: Add proportional healthcare and daycare shares\nStep 5: Subtract direct payment credits\nStep 6: Apply any court-approved deviations\nStep 7: Result on Line 17 = Transfer Payment",
      "The transfer payment covers basic living expenses only. It does not include health insurance premiums, daycare costs, education expenses, or extraordinary medical costs — these are shared proportionally in addition to the basic transfer payment."
    ],
    fullExample: "P1 net income: $5,800 / P2 net income: $1,000\nCombined: $6,800 / Children: 2\n\nTable lookup at $6,800: $853/child × 2 = $1,706\nP1 income share: 85.29%\nP1 obligation: $1,706 × 85.29% = $1,455\nSSR check: $5,800 - $1,455 = $4,345 > $2,394\nNo SSR reduction needed.\n\nFinal transfer payment: $1,455/mo",
    howItAffects: "The transfer payment is a legally enforceable court order. Non-payment triggers enforcement through Washington's Division of Child Support including wage garnishment, license suspension, tax refund interception, and contempt of court. Payments are typically processed through the Washington State Support Registry unless direct payment is ordered.",
    faqs: [
      { question: "Is the transfer payment the same as child support?", answer: "Yes. Transfer payment is the precise legal term used in RCW 26.19 for the monthly child support amount ordered by the court." },
      { question: "Can the transfer payment be modified?", answer: "Yes. Either parent may petition for modification if there is a substantial change in circumstances — typically defined as a 15% or more change in either parent's income or a significant change in the child's needs." },
      { question: "What happens if the transfer payment is not paid?", answer: "DSHS Division of Child Support enforces through wage garnishment, license suspension, bank levy, tax intercept, and contempt of court proceedings. Contact DCS at 1-800-442-5437." }
    ],
    relatedTerms: [
      { label: "Standard Calculation", href: "/glossary" },
      { label: "Support Modification", href: "/glossary" },
      { label: "Extraordinary Expenses", href: "/glossary/extraordinary-expenses" }
    ],
    rcw: "RCW 26.19.011"
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
    ogDescription: "Combined net income is both parents monthly income after mandatory deductions. It determines your position on Washington's 2026 economic table under RCW 26.19.071.",
    legalDefinition: "RCW 26.19.071 requires both parents to disclose all income sources. Combined monthly net income is calculated by adding both parents net monthly incomes after all mandatory deductions are subtracted from gross income. It is entered on Line 4 of the WSCSS worksheet.",
    howItWorks: [
      "Step 1 — Calculate each parent's gross income: Include all sources: wages, salaries, business income, rental income, investment income, pension, Social Security, unemployment benefits, and maintenance received.",
      "Step 2 — Subtract mandatory deductions per parent: Federal and state income taxes actually owed. FICA: Social Security 6.2% plus Medicare 1.45%. Mandatory state deductions including paid family and medical leave and long-term care premiums. Mandatory union or professional dues. Required pension plan payments. Court-ordered maintenance actually paid.",
      "Step 3 — Add both parents net incomes: P1 net income + P2 net income = Combined net income",
      "Step 4 — Round to nearest $100 for table lookup: Round down if last two digits are 49 or less. Round up if last two digits are 50 or more. Example: $5,480 rounds up to $5,500. Example: $5,449 rounds down to $5,400."
    ],
    fullExample: "P1 gross wages: $6,000\nP1 deductions: income tax $700 + FICA $459 = $1,159\nP1 net income: $4,841\n\nP2 gross wages: $2,000\nP2 deductions: FICA $153\nP2 net income: $1,847\n\nCombined net income: $4,841 + $1,847 = $6,688\nRounds to $6,700 for table lookup.\nTable at $6,700 / 2 children: $842/child × 2 = $1,684",
    howItAffects: "Combined net income determines which row of the 2026 economic table applies to your case. Higher combined income generally means a higher basic obligation per child. The table covers combined incomes from $2,200 to $50,000 per month. Above $50,000 the court may exceed the maximum presumptive amount with written findings.",
    faqs: [
      { question: "Is a new spouse's income included in combined net income?", answer: "No. Only the income of the two parents of the children in this case is included. New spouse or domestic partner income is disclosed separately but not included in the calculation." },
      { question: "What if one parent is self-employed?", answer: "Business income after normal business expenses is included. Self-employed parents also deduct self-employment taxes at 15.3% of net self-employment income." },
      { question: "What if combined income exceeds $50,000?", answer: "The economic table is presumptive up to $50,000 combined net income. Above that the court may order support exceeding the table maximum with written findings of fact under RCW 26.19.065(3)." }
    ],
    relatedTerms: [
      { label: "Gross Monthly Income", href: "/glossary" },
      { label: "Net Monthly Income", href: "/glossary" },
      { label: "Economic Table", href: "/glossary" }
    ],
    rcw: "RCW 26.19.071"
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
    ogDescription: "Extraordinary expenses are costs not covered by basic child support in Washington including healthcare and daycare. Learn how they are split proportionally under RCW 26.19.080.",
    legalDefinition: "RCW 26.19.080(2)(3) states healthcare expenses and daycare and special child rearing expenses are not included in the economic table. These expenses shall be shared by the parents in the same proportion as the basic support obligation based on each parent's income share percentage.",
    howItWorks: [
      "Extraordinary expenses are added to the basic support obligation on the WSCSS worksheet and then shared proportionally. The parent who pays the expense directly to the provider receives a credit on Line 16 of the worksheet.",
      "Healthcare expenses that qualify: Monthly health insurance premiums for children. Uninsured medical, dental, and vision costs. Mental health treatment and counseling. Prescription medications. Orthodontia and chiropractic care.",
      "Daycare and special expenses that qualify: Work-related childcare and daycare costs. Private school tuition and educational expenses. Long-distance transportation for visitation. Special therapy or counseling costs.",
      "Expenses that do NOT qualify: Ordinary day-to-day costs like food, clothing, and school supplies are assumed to be covered by the basic transfer payment and cannot be added as extraordinary expenses."
    ],
    fullExample: "P1 income share: 70% / P2 income share: 30%\nP1 pays health insurance: $300/mo\nP2 pays daycare: $600/mo\nTotal extraordinary expenses: $900/mo\n\nEach parent's share:\nP1 owes: $900 × 70% = $630\nP2 owes: $900 × 30% = $270\n\nCredits applied:\nP1 paid $300 directly → gets $300 credit\nP2 paid $600 directly → gets $600 credit\n\nNet adjustment to transfer payment:\nP1 additional obligation: $630 - $300 = $330\nP2 additional obligation: $270 - $600 = -$330\n(P2's credit exceeds their share — reduces P2's transfer to minimum $50)",
    howItAffects: "Extraordinary expenses increase the total obligation beyond the basic table amount. The parent with the higher income share pays more of these costs. Credits ensure parents are not double-paying for expenses they already cover directly.",
    faqs: [
      { question: "Who gets the credit for expenses paid?", answer: "The parent who pays the expense directly to the provider receives the credit on Line 16 of the WSCSS worksheet reducing their net transfer payment by that amount." },
      { question: "What if we disagree on whether an expense qualifies?", answer: "The court has discretion to determine the necessity and reasonableness of all expenses in excess of the basic obligation under RCW 26.19.080(4). Submit documentation of the expense for court review." },
      { question: "Can extraordinary expenses be modified?", answer: "Yes. Either parent can request modification if documented expenses change substantially. The same modification process applies as for the basic transfer payment." }
    ],
    relatedTerms: [
      { label: "Proportional Share", href: "/glossary" },
      { label: "Healthcare Expenses", href: "/glossary" },
      { label: "Daycare Expenses", href: "/glossary" }
    ],
    rcw: "RCW 26.19.080"
  }
];
