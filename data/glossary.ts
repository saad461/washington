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
    definition: "The Self-Support Reserve (SSR) is a minimum income protection limit set by Washington State to ensure a paying parent is not left impoverished after paying child support. In 2026, the SSR is $2,394 (180% of the federal poverty level).",
    example: "If a non-custodial parent earns $2,000 net income and their calculated child support is $800, paying it would leave them with only $1,200 (below the $2,394 SSR). In this case, the court will likely deviate the payment downward to preserve their basic living needs.",
    linkLabel: "Read SSR Guide",
    relatedLinks: [
      { label: "Check your SSR Eligibility", href: "/worksheet" },
      { label: "Washington Court Directory", href: "/washington-courts" }
    ],
    metaTitle: "Self-Support Reserve (SSR) in WA 2026 | WSCSS",
    metaDescription: "The SSR in Washington is $2,394/month in 2026. Learn how it protects paying parents and affects your child support obligation under RCW 26.19.065.",
    h1Title: "What is the Self-Support Reserve (SSR) in Washington Child Support?",
    ogTitle: "Self-Support Reserve (SSR) in WA 2026 | WSCSS",
    ogDescription: "The SSR in Washington is $2,394/month in 2026. Learn how it protects paying parents and affects child support under RCW 26.19.065.",
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
      { label: "Standard Calculation", href: "/glossary/standard-calculation" },
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
    metaTitle: "Child Support Deviation in Washington | WSCSS",
    metaDescription: "A deviation is a court-approved adjustment to WA's standard child support. Learn when courts grant deviations and request one under RCW 26.19.075.",
    h1Title: "What is a Child Support Deviation in Washington State?",
    ogTitle: "Child Support Deviation in Washington | WSCSS",
    ogDescription: "A deviation is a court-approved adjustment to Washington's standard child support. Learn when courts grant them under RCW 26.19.075.",
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
      { label: "Standard Calculation", href: "/glossary/standard-calculation" },
      { label: "Parenting Time Credit", href: "/glossary/parenting-time-credit" },
      { label: "Support Modification", href: "/glossary/support-modification" }
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
    metaTitle: "Imputed Income in WA Child Support | WSCSS",
    metaDescription: "Imputed income is assigned by a court when a parent is voluntarily unemployed. Learn how courts calculate it under RCW 26.19.071.",
    h1Title: "What is Imputed Income in Washington Child Support?",
    ogTitle: "Imputed Income in WA Child Support | WSCSS",
    ogDescription: "Imputed income is assigned when a parent is voluntarily unemployed. Learn how Washington courts calculate it under RCW 26.19.071.",
    legalDefinition: "RCW 26.19.071(6) states the court shall impute income to a parent when the parent is voluntarily unemployed or voluntarily underemployed. The court determines voluntary status based on assets, employment history, job skills, educational attainment, health, age, criminal record, and local job market conditions.",
    howItWorks: [
      "Courts use this priority order when calculating imputed income:",
      "1. Full-time earnings at current rate of pay",
      "2. Full-time earnings at historical rate of pay based on reliable information",
      "3. Past rate of pay where information is incomplete",
      "4. Earnings of 32 hours per week at minimum wage for parents recently on TANF, recently incarcerated, or recent high school graduates",
      "5. Full-time minimum wage if no earnings history",
      "6. Median net monthly income from US Census Bureau current population reports",
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
      { label: "Gross Monthly Income", href: "/glossary/gross-monthly-income" },
      { label: "Net Monthly Income", href: "/glossary/net-monthly-income" },
      { label: "Voluntary Unemployment", href: "/glossary/voluntary-unemployment" }
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
    metaTitle: "Transfer Payment in WA Child Support | WSCSS",
    metaDescription: "The transfer payment is the final monthly amount one parent pays the other in Washington child support. Learn how it is calculated under RCW 26.19.",
    h1Title: "What is a Child Support Transfer Payment in Washington State?",
    ogTitle: "Transfer Payment in WA Child Support | WSCSS",
    ogDescription: "The transfer payment is the final monthly child support amount in Washington. Learn how it is calculated under RCW 26.19.",
    legalDefinition: "RCW 26.19.011 defines the support transfer payment as the amount of money the court orders one parent to pay another parent or custodian for child support after determination of the standard calculation and any deviations.",
    howItWorks: [
      "The transfer payment is the result of completing all 8 parts of the WSCSS worksheet in order:",
      "Step 1: Look up basic obligation from 2026 economic table (per child amount × number of children)",
      "Step 2: Multiply by each parent's income share percentage",
      "Step 3: Apply SSR check and limitations",
      "Step 4: Add proportional healthcare and daycare shares",
      "Step 5: Subtract direct payment credits",
      "Step 6: Apply any court-approved deviations",
      "Step 7: Result on Line 17 = Transfer Payment",
      "The transfer payment covers basic living expenses only. It does not include health insurance premiums, daycare costs, education expenses, or extraordinary medical costs — these are shared proportionally in addition to the basic transfer payment."
    ],
    fullExample: "P1 net income: $5,800 / P2 net income: $1,000\nCombined: $6,800 / Children: 2\n\nTable lookup at $6,800: $853/child × 2 = $1,706\nP1 income share: 85.29%\nP1 obligation: $1,706 × 85.29% = $1,455\nSSR check: $5,800 - $1,455 = $4,345 > $2,394\nNo SSR reduction needed.\n\nFinal transfer payment: $1,455/mo",
    howItAffects: "The transfer payment is a legally enforceable court order. Non-payment triggers enforcement through Washington's Division of Child Support including wage garnishment, license suspension, tax refund interception, and contempt of court. Payments are typically processed through the Washington State Support Registry unless direct payment is ordered.",
    faqs: [
      { question: "Is the transfer payment the same as child support?", answer: "Yes. Transfer payment is the precise legal term used in RCW 26.19 for the monthly child support amount ordered by the court." },
      { question: "Can the transfer payment be modified?", answer: "Yes. Either parent may petition for modification if there is a substantial change in circumstances — typically defined as a 15% or more change in net income under RCW 26.09.170 or a significant change in the child's needs." },
      { question: "What happens if the transfer payment is not paid?", answer: "DSHS Division of Child Support enforces through wage garnishment, license suspension, bank levy, tax intercept, and contempt of court proceedings. Contact DCS at 1-800-442-5437." }
    ],
    relatedTerms: [
      { label: "Standard Calculation", href: "/glossary/standard-calculation" },
      { label: "Support Modification", href: "/glossary/support-modification" },
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
    metaTitle: "Combined Net Income in WA Child Support | WSCSS",
    metaDescription: "Combined net income is both parents' monthly income after mandatory deductions. It determines your position on WA's 2026 economic table under RCW 26.19.071.",
    h1Title: "What is Combined Net Income in Washington Child Support?",
    ogTitle: "Combined Net Income in WA Child Support | WSCSS",
    ogDescription: "Combined net income is both parents' income after deductions. It determines your position on Washington's 2026 economic table under RCW 26.19.071.",
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
      { label: "Gross Monthly Income", href: "/glossary/gross-monthly-income" },
      { label: "Net Monthly Income", href: "/glossary/net-monthly-income" },
      { label: "Economic Table", href: "/glossary/economic-table" }
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
    metaTitle: "Extraordinary Expenses in WA Child Support | WSCSS",
    metaDescription: "Extraordinary expenses are costs not covered by basic child support in WA, including healthcare and daycare. Learn how they are split proportionally under RCW 26.19.080.",
    h1Title: "What are Extraordinary Expenses in Washington Child Support?",
    ogTitle: "Extraordinary Expenses in WA Child Support | WSCSS",
    ogDescription: "Extraordinary expenses include healthcare and daycare not in basic child support. Learn how they are split proportionally under RCW 26.19.080.",
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
      { label: "Proportional Share", href: "/glossary/proportional-share" },
      { label: "Healthcare Expenses", href: "/glossary/healthcare-expenses" },
      { label: "Daycare Expenses", href: "/glossary/daycare-expenses" }
    ],
    rcw: "RCW 26.19.080"
  },
  {
    name: "Basic Child Support Obligation",
    slug: "basic-child-support-obligation",
    category: "Core Calculation",
    definition: "The basic child support obligation is the monthly amount determined from the 2026 Washington economic table based on both parents combined net income and number of children. It is the starting point for calculating the final transfer payment before any adjustments or credits are applied.",
    example: "A combined net income of $6,000 for two children results in a $795 per-child table value. The basic child support obligation is therefore $1,590.",
    linkLabel: "Read Basic Obligation Guide →",
    relatedLinks: [],
    metaTitle: "Basic Child Support Obligation in Washington | WSCSS",
    metaDescription: "The basic child support obligation is the monthly amount from WA's 2026 economic table based on combined net income and family size under RCW 26.19.020.",
    h1Title: "What is the Basic Child Support Obligation in Washington State?",
    ogTitle: "Basic Child Support Obligation in Washington | WSCSS",
    ogDescription: "The basic obligation is the monthly amount from Washington's 2026 economic table based on combined income and number of children under RCW 26.19.020.",
    legalDefinition: "RCW 26.19.011 defines the basic child support obligation as the monthly child support obligation determined from the economic table based on the parties combined monthly net income and the number of children for whom support is owed.",
    howItWorks: [
      "Step 1: Add both parents net monthly incomes to get combined net income (Line 4).",
      "Step 2: Round combined income to nearest $100.",
      "Step 3: Find the row in the 2026 economic table matching combined net income.",
      "Step 4: Find the column matching number of children.",
      "Step 5: The table value = per child amount.",
      "Step 6: Multiply per child amount by number of children = Basic Child Support Obligation (Line 5)."
    ],
    fullExample: "P1 net income: $4,000\nP2 net income: $2,000\nCombined: $6,000\nChildren: 2\n\nTable at $6,000 / Two Children column: $795/child\nBasic obligation: $795 × 2 = $1,590\n\nThis $1,590 is the basic obligation before income share percentages are applied. Each parent then pays their proportional share of this amount.",
    howItAffects: "The basic obligation is always calculated first. Every other adjustment — income share split, SSR check, healthcare, daycare credits, and deviations — is applied to or on top of this base figure. A higher combined income means a higher basic obligation per child up to the $50,000 table maximum.",
    faqs: [
      { question: "Is the basic obligation the same as the transfer payment?", answer: "No. The basic obligation is the starting point. The final transfer payment is lower after applying income share percentages, SSR limitations, credits, and any deviations." },
      { question: "What if combined income is below $2,200?", answer: "For combined income below $2,200 the obligation is based on the resources and living expenses of each household. The minimum is $50 per child per month." },
      { question: "What if combined income exceeds $50,000?", answer: "The table is presumptive up to $50,000. Above that the court may exceed the maximum with written findings of fact under RCW 26.19.065(3)." }
    ],
    relatedTerms: [
      { label: "Economic Table", href: "/glossary/economic-table" },
      { label: "Combined Net Income", href: "/glossary/combined-net-income" },
      { label: "Standard Calculation", href: "/glossary/standard-calculation" }
    ],
    rcw: "RCW 26.19.011, RCW 26.19.020"
  },
  {
    name: "Income Shares Model",
    slug: "income-shares-model",
    category: "Core Calculation",
    definition: "Washington uses the Income Shares Model to calculate child support. Both parents net incomes are combined and used to look up the basic obligation in the economic table. Each parent then pays their proportional share based on their percentage of combined income.",
    example: "If Parent A earns 60% of the combined income, they are responsible for 60% of the basic support obligation.",
    linkLabel: "Read Income Shares Guide →",
    relatedLinks: [],
    metaTitle: "Income Shares Model in WA Child Support | WSCSS",
    metaDescription: "Washington uses the Income Shares Model where both parents' net incomes are combined to find support. Each parent pays their proportional share under RCW 26.19.",
    h1Title: "What is the Income Shares Model in Washington Child Support?",
    ogTitle: "Income Shares Model in WA Child Support | WSCSS",
    ogDescription: "Washington's Income Shares Model combines both parents' incomes. Each parent pays their proportional share of child support under RCW 26.19.",
    legalDefinition: "RCW 26.19.080(1) states the basic child support obligation derived from the economic table shall be allocated between the parents based on each parent's share of the combined monthly net income.",
    howItWorks: [
      "The model is built on the principle that a child should receive the same proportion of parental income they would have received if the parents lived together. Both parents contribute to the child's support in proportion to their earnings.",
      "Step 1: Calculate combined net income",
      "Step 2: Look up total basic obligation from table",
      "Step 3: Calculate each parent's income share %",
      "Step 4: Multiply obligation by each parent's %",
      "Step 5: The paying parent transfers their share to the receiving parent"
    ],
    fullExample: "P1 net: $6,000 / P2 net: $4,000\nCombined: $10,000\nP1 share: 60% / P2 share: 40%\n\nTable at $10,000 / 2 children: $1,099/child\nBasic obligation: $1,099 × 2 = $2,198\n\nP1 owes: $2,198 × 60% = $1,318.80\nP2 owes: $2,198 × 40% = $879.20\n\nIf P2 is the primary residential parent P1 transfers $1,318.80/mo to P2.",
    howItAffects: "Your income share percentage directly determines your obligation. The higher your income relative to combined income the larger your share. If both parents earn equal income each pays 50% of the basic obligation. This model ensures higher earning parents contribute proportionally more.",
    faqs: [
      { question: "Does Washington use gross or net income for the Income Shares Model?", answer: "Net income only. Gross income minus all mandatory deductions gives net income which is used for the combined income calculation and economic table lookup." },
      { question: "What if one parent has zero income?", answer: "The working parent pays 100% of the basic obligation. However the court may impute income to the non-working parent if they are voluntarily unemployed." },
      { question: "Do both parents always pay support?", answer: "Each parent has an obligation but only one parent typically makes a transfer payment — the one with the higher income share who does not have primary custody." }
    ],
    relatedTerms: [
      { label: "Proportional Share", href: "/glossary/proportional-share" },
      { label: "Combined Net Income", href: "/glossary/combined-net-income" },
      { label: "Basic Child Support Obligation", href: "/glossary/basic-child-support-obligation" }
    ],
    rcw: "RCW 26.19.080(1)"
  },
  {
    name: "Proportional Share",
    slug: "proportional-share",
    category: "Core Calculation",
    definition: "A proportional share is each parent's percentage of the combined net income. This percentage determines each parent's share of the basic obligation and all extraordinary expenses including healthcare and daycare.",
    example: "If the combined net income is $10,000 and Parent A's net income is $7,000, Parent A's proportional share is 70%.",
    linkLabel: "Read Proportional Share Guide →",
    relatedLinks: [],
    metaTitle: "Proportional Share in WA Child Support | WSCSS",
    metaDescription: "Proportional share is each parent's percentage of combined net income in WA child support. It determines each parent's obligation share under RCW 26.19.080.",
    h1Title: "What is Proportional Share in Washington Child Support?",
    ogTitle: "Proportional Share in WA Child Support | WSCSS",
    ogDescription: "Proportional share is each parent's percentage of combined income that determines their child support obligation under RCW 26.19.080.",
    legalDefinition: "RCW 26.19.080(1): The basic child support obligation shall be allocated between the parents based on each parent's share of the combined monthly net income. Line 6 of the WSCSS worksheet records each parent's proportional share.",
    howItWorks: [
      "Formula: Parent share % = Parent net income ÷ Combined net income",
      "Example: P1 net: $7,000 / P2 net: $3,000, Combined: $10,000",
      "P1 share: $7,000 ÷ $10,000 = 70%, P2 share: $3,000 ÷ $10,000 = 30%",
      "Both percentages must always add up to 100%."
    ],
    fullExample: "Combined income: $8,500 / Children: 2\nTable value: $994/child × 2 = $1,988\n\nP1 share 70%: $1,988 × 70% = $1,391.60\nP2 share 30%: $1,988 × 30% = $596.40\n\nHealthcare expenses: $500/mo\nP1 healthcare share: $500 × 70% = $350\nP2 healthcare share: $500 × 30% = $150\n\nThe same percentages apply to every shared expense on the worksheet.",
    howItAffects: "Your proportional share percentage determines your obligation for both basic support and all extraordinary expenses. It is recalculated every time either parent's net income changes. A modification that changes income will change the proportional share percentages for both parents simultaneously.",
    faqs: [
      { question: "Does proportional share change if I get a raise?", answer: "Yes. Any substantial income change of 15% or more can trigger a modification that recalculates both parents' proportional shares and adjusts the transfer payment." },
      { question: "Is proportional share used for healthcare and daycare too?", answer: "Yes. The same Line 6 percentages apply to all extraordinary expenses including healthcare premiums, daycare, education, and long-distance transportation costs." },
      { question: "What if one parent's income changes seasonally?", answer: "Washington uses a monthly average of annual income. Divide annual income by 12 to get the monthly figure used for the proportional share calculation." }
    ],
    relatedTerms: [
      { label: "Income Shares Model", href: "/glossary/income-shares-model" },
      { label: "Combined Net Income", href: "/glossary/combined-net-income" },
      { label: "Extraordinary Expenses", href: "/glossary/extraordinary-expenses" }
    ],
    rcw: "RCW 26.19.080(1)"
  },
  {
    name: "Gross Monthly Income",
    slug: "gross-monthly-income",
    category: "Income Calculation",
    definition: "Gross monthly income includes all income from any source before deductions — wages, salaries, business income, rental income, investment income, pension, Social Security, and unemployment benefits. Washington law requires full disclosure of all income sources under RCW 26.19.071.",
    example: "A parent earning $5,000 in salary and $500 in rental income has a gross monthly income of $5,500.",
    linkLabel: "Read Gross Income Guide →",
    relatedLinks: [],
    metaTitle: "Gross Monthly Income in WA Child Support | WSCSS",
    metaDescription: "Gross monthly income in WA child support includes all income from any source before deductions. Learn what counts and what is excluded under RCW 26.19.071.",
    h1Title: "What is Gross Monthly Income in Washington Child Support?",
    ogTitle: "Gross Monthly Income in WA Child Support | WSCSS",
    ogDescription: "Gross monthly income includes all income before deductions. Learn what counts and what is excluded in Washington child support under RCW 26.19.071.",
    legalDefinition: "RCW 26.19.071(3): Monthly gross income shall include income from any source including salaries, wages, commissions, deferred compensation, overtime, contract-related benefits, income from second jobs, dividends, interest, trust income, severance pay, annuities, capital gains, pension retirement benefits, workers compensation, unemployment benefits, maintenance received, bonuses, Social Security benefits, disability insurance benefits, and income from self-employment.",
    howItWorks: [
      "RCW 26.19.071(4) excludes:",
      "Income of a new spouse or domestic partner.",
      "Income of other adults in the household.",
      "Child support received from other relationships.",
      "Gifts and prizes.",
      "TANF, SSI, and food stamp benefits.",
      "Overtime beyond 40 hours per week averaged over 12 months when used to retire debts."
    ],
    fullExample: "Parent has these monthly income sources:\nSalary: $4,500\nSide business profit: $800\nRental income: $600\nStock dividends: $200\nTotal gross monthly income: $6,100\n\nNew spouse earns $3,000/mo — excluded.\nTANF benefits — excluded.\nChild support received — excluded.\n\nLine 1g of worksheet: $6,100",
    howItAffects: "Gross income is the starting point for calculating net income. Higher gross income generally means higher net income and a larger proportional share of the basic obligation. Courts verify gross income using tax returns from the past two years and current pay stubs.",
    faqs: [
      { question: "Is overtime always included in gross income?", answer: "Generally yes. Overtime beyond 40 hours per week averaged over 12 months may be excluded only when the court finds it was worked specifically to retire past debts and will cease when debts are paid." },
      { question: "What about self-employment income?", answer: "Self-employment gross income minus normal business expenses equals the business income included in gross monthly income. Justification is required for any disputed business expense deductions." },
      { question: "Are bonuses included?", answer: "Yes. Regular bonuses are included in gross monthly income. A one-time nonrecurring bonus may be subject to a deviation request under the nonrecurring income provision." }
    ],
    relatedTerms: [
      { label: "Net Monthly Income", href: "/glossary/net-monthly-income" },
      { label: "Imputed Income", href: "/glossary/imputed-income" },
      { label: "Combined Net Income", href: "/glossary/combined-net-income" }
    ],
    rcw: "RCW 26.19.071(3)"
  },
  {
    name: "Net Monthly Income",
    slug: "net-monthly-income",
    category: "Income Calculation",
    definition: "Net monthly income is gross income after subtracting mandatory deductions including federal and state income taxes, FICA, mandatory union dues, required pension contributions, and state insurance premiums. The 2026 economic table uses net income not gross income.",
    example: "If a parent's gross income is $5,000 and mandatory deductions total $1,200, their net monthly income is $3,800.",
    linkLabel: "Read Net Income Guide →",
    relatedLinks: [],
    metaTitle: "Net Monthly Income in WA Child Support | WSCSS",
    metaDescription: "Net monthly income in Washington child support is gross income minus mandatory deductions. The 2026 economic table uses net - not gross - income under RCW 26.19.071.",
    h1Title: "What is Net Monthly Income in Washington Child Support?",
    ogTitle: "Net Monthly Income in WA Child Support | WSCSS",
    ogDescription: "Net income is gross income minus mandatory deductions. Washington's 2026 economic table uses net income under RCW 26.19.071.",
    legalDefinition: "RCW 26.19.071(5): The following expenses shall be deducted from gross monthly income to calculate net monthly income: federal and state income taxes, FICA, mandatory pension plan payments, mandatory union or professional dues, mandatory state deductions, state industrial insurance premiums, court-ordered maintenance paid, voluntary retirement contributions up to $5,000 per year, and normal business expenses for self-employed persons.",
    howItWorks: [
      "Start with gross monthly income (Line 1g)",
      "Subtract these mandatory deductions:",
      "2a: Federal and state income taxes actually owed",
      "2b: FICA — Social Security 6.2% + Medicare 1.45%",
      "2c: Mandatory state deductions (PFML, LTC)",
      "2d: State industrial insurance premiums",
      "2e: Mandatory union or professional dues",
      "2f: Required pension plan payments",
      "2g: Voluntary retirement up to $416/mo max",
      "2h: Court-ordered maintenance paid",
      "2i: Normal business expenses if self-employed",
      "Result = Net Monthly Income (Line 3)"
    ],
    fullExample: "Gross wages: $5,500\nIncome taxes: -$650\nFICA: -$421\nMandatory state deductions: -$45\nUnion dues: -$80\nNet monthly income: $4,304\n\nThis $4,304 is used for Line 3 of the worksheet and added to the other parent's net income for the combined income total.",
    howItAffects: "Net income is the foundation of the entire calculation. A higher net income means a higher combined income which means a higher table value. It also means a larger income share percentage if your net income is proportionally higher than the other parent's.",
    faqs: [
      { question: "Should I use my actual tax withheld or taxes actually owed?", answer: "Taxes actually owed — not the withholding amount on your pay stub. Use your prior year tax return divided by 12 to estimate monthly tax liability if your income is similar." },
      { question: "Are voluntary 401k contributions deductible?", answer: "Up to $5,000 per year ($416/mo) may be deducted if you have a consistent pattern of contributions in the year before the support order was established." },
      { question: "What if my income varies month to month?", answer: "Use a monthly average. Divide annual total income by 12. For biweekly pay multiply by 26 then divide by 12." }
    ],
    relatedTerms: [
      { label: "Gross Monthly Income", href: "/glossary/gross-monthly-income" },
      { label: "Combined Net Income", href: "/glossary/combined-net-income" },
      { label: "Imputed Income", href: "/glossary/imputed-income" }
    ],
    rcw: "RCW 26.19.071(5)"
  },
  {
    name: "Standard Calculation",
    slug: "standard-calculation",
    category: "Core Calculation",
    definition: "The standard calculation is the presumptive monthly child support amount determined by following the Washington child support schedule exactly. Courts must use this amount unless specific written reasons for deviation are provided under RCW 26.19.035.",
    example: "Completing Lines 1-17 of the worksheet for a parent earning $5,000 results in a standard calculation of $1,446 for two children.",
    linkLabel: "Read Standard Calculation Guide →",
    relatedLinks: [],
    metaTitle: "Standard Calculation in WA Child Support | WSCSS",
    metaDescription: "The standard calculation is the presumptive child support amount in WA from the WSCSS worksheet. Courts must use it unless deviation reasons exist under RCW 26.19.035.",
    h1Title: "What is the Standard Calculation in Washington Child Support?",
    ogTitle: "Standard Calculation in WA Child Support | WSCSS",
    ogDescription: "The standard calculation is Washington's presumptive child support amount. Courts must use it unless deviation reasons exist under RCW 26.19.035.",
    legalDefinition: "RCW 26.19.011: Standard calculation means the presumptive amount of child support owed as determined from the child support schedule before the court considers any reasons for deviation. Courts must state this amount in every child support order under RCW 26.19.035(4).",
    howItWorks: [
      "The standard calculation is the result of completing Lines 1 through 17 of the WSCSS worksheet in order:",
      "Lines 1-4: Income calculation",
      "Line 5: Basic obligation from economic table",
      "Line 6: Proportional income shares",
      "Lines 7-9: Basic obligation after SSR limitations",
      "Lines 10-13: Healthcare and daycare expenses",
      "Line 14: Each parent's expense share",
      "Line 15: Gross child support obligation",
      "Lines 16: Credits for direct payments",
      "Line 17: Standard Calculation = Line 15 - Line 16d"
    ],
    fullExample: "P1 net: $5,000 / P2 net: $0 / 2 children\nLine 5: $723 × 2 = $1,446\nLine 6: P1 100%\nLine 7: $1,446\nLine 8c: SSR check passes (no reduction)\nLine 9: $1,446\nNo healthcare or daycare.\nLine 15: $1,446\nLine 16d: $0\nLine 17 Standard Calculation: $1,446/mo",
    howItAffects: "Every Washington child support order must state the standard calculation even if the court orders a different amount due to deviation. The standard calculation is the baseline the court compares all deviations against. If no deviation is granted the standard calculation is the transfer payment.",
    faqs: [
      { question: "Is the standard calculation always the final transfer payment?", answer: "Not always. If the court approves a deviation the transfer payment will differ from the standard calculation. But the order must always state both amounts — the standard calculation and the actual ordered amount." },
      { question: "Can parents agree to an amount different from the standard calculation?", answer: "Only with court approval. An agreement alone without written findings from the court is not a valid deviation." },
      { question: "How often is the standard calculation reviewed?", answer: "It can be reviewed any time either parent experiences a substantial change in circumstances of 15% or more change in net income under RCW 26.09.170." }
    ],
    relatedTerms: [
      { label: "Transfer Payment", href: "/glossary/transfer-payment" },
      { label: "Deviation", href: "/glossary/deviation" },
      { label: "Basic Child Support Obligation", href: "/glossary/basic-child-support-obligation" }
    ],
    rcw: "RCW 26.19.011, RCW 26.19.035"
  },
  {
    name: "Parenting Time Credit",
    slug: "parenting-time-credit",
    category: "Court Adjustments",
    definition: "A parenting time credit is a deviation that reduces child support when the paying parent has significant residential time with the child. Washington courts reference 25% of the basic obligation when calculating this credit under RCW 26.19.075.",
    example: "A paying parent with the child 35% of the time may receive a credit that reduces their monthly payment from $850 to $743.",
    linkLabel: "Read Parenting Time Credit Guide →",
    relatedLinks: [
      { label: "Calculate with parenting time credit →", href: "/joint-custody-calculator" }
    ],
    metaTitle: "Parenting Time Credit in WA Child Support | WSCSS",
    metaDescription: "Parenting time credit reduces child support in Washington when the paying parent has significant residential time. Learn how courts calculate this deviation under RCW 26.19.075.",
    h1Title: "What is Parenting Time Credit in Washington Child Support?",
    ogTitle: "Parenting Time Credit in WA Child Support | WSCSS",
    ogDescription: "Parenting time credit reduces Washington child support when the paying parent has significant residential time under RCW 26.19.075.",
    legalDefinition: "RCW 26.19.075(1)(d): The court may deviate from the standard calculation if the child spends a significant amount of time with a parent who is obligated to make a support transfer payment. The court shall consider increased expenses to the paying parent and decreased expenses to the receiving parent resulting from the time.",
    howItWorks: [
      "The credit is applied as a percentage reduction to the basic obligation on Line 9 of the worksheet after all SSR limitations are applied. Washington uses 25% of the Line 9 amount as a reference point for this credit though the court exercises full discretion on the amount.",
      "Important: The credit applies to the SSR-reduced Line 9 amount — never to the pre-SSR amount."
    ],
    fullExample: "P1 basic obligation after SSR (Line 9): $850\nP1 has child 35% of the time.\nCourt grants 25% parenting time credit.\n\nCredit: $850 × 25% = $212.50\nAdjusted Line 17: $955 - $212.50 = $742.50\nFinal transfer payment: $743/mo\n\nWithout the credit P1 would pay $955/mo.\nThe credit saves P1 $212/mo.",
    howItAffects: "The credit directly reduces your final transfer payment. However it is not automatic — you must request it and provide evidence of the residential schedule. The court will not grant the credit if it would leave the receiving parent's household with insufficient funds to meet the child's basic needs.",
    faqs: [
      { question: "Is parenting time credit automatic if I have the child 50% of the time?", answer: "No. You must request the deviation in writing with evidence of the actual residential schedule. 50/50 schedules are handled differently and may involve a residential split adjustment." },
      { question: "How much time qualifies as significant?", answer: "Washington law does not define a specific threshold. Courts use discretion based on the residential schedule and evidence of expenses incurred during residential time." },
      { question: "Can the credit be denied?", answer: "Yes. The court may deny the credit if it would leave insufficient funds in the receiving parent's household to meet the child's basic needs." }
    ],
    relatedTerms: [
      { label: "Deviation", href: "/glossary/deviation" },
      { label: "Residential Schedule", href: "/glossary/residential-schedule" },
      { label: "Standard Calculation", href: "/glossary/standard-calculation" }
    ],
    rcw: "RCW 26.19.075(1)(d)"
  },
  {
    name: "Economic Table",
    slug: "economic-table",
    category: "Core Calculation",
    definition: "The economic table is the official Washington State chart used to determine the basic child support obligation per child. It lists combined monthly net incomes from $2,200 to $50,000 against family size from 1 to 5 children. Updated January 1 2026 under RCW 26.19.020.",
    example: "For a combined net income of $7,400, the 2026 table specifies a per-child obligation of $918 for a family with two children.",
    linkLabel: "Read Economic Table Guide →",
    relatedLinks: [],
    metaTitle: "WA Child Support Economic Table 2026 | WSCSS",
    metaDescription: "The 2026 WA economic table determines basic child support per child based on combined net income and family size. Learn how to read and apply it under RCW 26.19.020.",
    h1Title: "What is the Washington Child Support Economic Table 2026?",
    ogTitle: "WA Child Support Economic Table 2026 | WSCSS",
    ogDescription: "The 2026 economic table determines child support per child based on combined income and family size under RCW 26.19.020.",
    legalDefinition: "RCW 26.19.020 establishes the economic table as the child support table for the basic support obligation. The table is presumptive for combined monthly net incomes up to $50,000. It is updated periodically and the 2026 version is effective January 1 2026.",
    howItWorks: [
      "Step 1: Calculate combined monthly net income",
      "Step 2: Round to nearest $100 (round up if last 2 digits are 50+, round down if 49 or less)",
      "Step 3: Find the matching row in the table",
      "Step 4: Find the column for number of children (One Child / Two Children / Three Children / Four Children / Five Children)",
      "Step 5: The circled value = per child amount",
      "Step 6: Multiply by number of children = Total Basic Obligation"
    ],
    fullExample: "Combined net income: $7,350\nRounds to: $7,400 (last two digits 50+)\n\n2026 table at $7,400:\nOne Child: $1,212\nTwo Children: $918 per child\nThree Children: $734 per child\n\nFor 2 children: $918 × 2 = $1,836\nThis is the Total Basic Obligation (Line 5).",
    howItAffects: "The table value determines the size of the entire support calculation. All percentages, SSR checks, and expense shares are applied to this base figure. A $100 difference in combined income can change the table value and therefore the final transfer payment.",
    faqs: [
      { question: "Where can I find the official 2026 economic table?", answer: "The full table is available at courts.wa.gov/forms. Our calculator uses the complete 2026 table for all income levels from $2,200 to $50,000." },
      { question: "What happens if combined income falls between two table rows?", answer: "Round to the nearest $100. If the last two digits are 50 or more round up. If 49 or less round down." },
      { question: "Is the table the same for all 39 Washington counties?", answer: "Yes. All 39 Washington counties use the same 2026 economic table. There are no county-specific variations." }
    ],
    relatedTerms: [
      { label: "Basic Child Support Obligation", href: "/glossary/basic-child-support-obligation" },
      { label: "Combined Net Income", href: "/glossary/combined-net-income" },
      { label: "Income Shares Model", href: "/glossary/income-shares-model" }
    ],
    rcw: "RCW 26.19.020"
  },
  {
    name: "Residential Schedule",
    slug: "residential-schedule",
    category: "Court Adjustments",
    definition: "The residential schedule defines when each parent has the child. It determines which parent is the primary residential parent for child support purposes and may be used to request a parenting time deviation under RCW 26.09.187.",
    example: "A schedule where the child spends 70% of the time with Parent A and 30% with Parent B establishes Parent A as the primary residential parent.",
    linkLabel: "Read Residential Schedule Guide →",
    relatedLinks: [
      { label: "Try Joint Custody Calculator →", href: "/joint-custody-calculator" }
    ],
    metaTitle: "Residential Schedule in WA Child Support | WSCSS",
    metaDescription: "The residential schedule defines when each parent has the child in WA. It affects child support calculations and parenting time deviations under RCW 26.09.187.",
    h1Title: "What is a Residential Schedule in Washington Child Support?",
    ogTitle: "Residential Schedule in WA Child Support | WSCSS",
    ogDescription: "The residential schedule defines when each parent has the child and affects Washington child support calculations under RCW 26.09.187.",
    legalDefinition: "RCW 26.09.187 governs residential schedules in Washington. The schedule determines which parent is the primary residential parent — the parent with whom the child lives the majority of the time. This parent typically receives the transfer payment.",
    howItWorks: [
      "The primary residential parent receives the transfer payment from the other parent. If the paying parent has significant time under the residential schedule they may request a parenting time credit deviation to reduce their transfer payment.",
      "A 50/50 equal residential schedule is handled differently using a residential split adjustment that compares each parent's obligation against the per-child amounts for children in each household."
    ],
    fullExample: "Residential schedule: Child lives with P2 70% of time and P1 30% of time.\nP1 is the paying parent.\n\nP1 requests parenting time credit for 30% time.\nCourt reviews evidence of actual time and expenses incurred during P1's residential time.\nCourt grants 25% downward deviation.\n\nWithout deviation P1 pays $1,200/mo.\nWith deviation P1 pays $900/mo.",
    howItAffects: "A residential schedule that gives the paying parent more time can support a deviation request that meaningfully reduces the transfer payment. Courts require documented evidence of the schedule — a signed parenting plan or court order showing the actual days and times.",
    faqs: [
      { question: "Does a 50/50 schedule eliminate child support?", answer: "Not automatically. Even with equal time the parent with higher income typically still pays support to equalize resources available to the child in each household." },
      { question: "Can the residential schedule be changed after a support order is entered?", answer: "Yes. A substantial change in the residential schedule can be grounds for modifying the child support order." },
      { question: "What is a residential split?", answer: "A residential split is when each parent has at least one child from the relationship living with them primarily. It uses a separate AOC attachment form for calculation." }
    ],
    relatedTerms: [
      { label: "Parenting Time Credit", href: "/glossary/parenting-time-credit" },
      { label: "Deviation", href: "/glossary/deviation" },
      { label: "Support Modification", href: "/glossary/support-modification" }
    ],
    rcw: "RCW 26.09.187"
  },
  {
    name: "Healthcare Expenses",
    slug: "healthcare-expenses",
    category: "Proportional Shares",
    definition: "Monthly healthcare costs for children including insurance premiums, copays, dental, vision, and mental health treatment are not included in the basic child support obligation. They must be shared proportionally based on each parent's income share under RCW 26.19.080.",
    example: "If Parent A makes 65% of the income and the children's healthcare costs are $350, Parent A is responsible for $227.50 of that cost.",
    linkLabel: "Read Healthcare Expenses Guide →",
    relatedLinks: [],
    metaTitle: "Healthcare Expenses in WA Child Support | WSCSS",
    metaDescription: "Healthcare expenses in WA child support include insurance premiums and uninsured medical costs. They are shared proportionally between parents under RCW 26.19.080.",
    h1Title: "What are Healthcare Expenses in Washington Child Support?",
    ogTitle: "Healthcare Expenses in WA Child Support | WSCSS",
    ogDescription: "Healthcare expenses include insurance premiums and medical costs shared proportionally between Washington parents under RCW 26.19.080.",
    legalDefinition: "RCW 26.19.080(2): Healthcare costs are not included in the economic table. Monthly healthcare costs shall be shared by the parents in the same proportion as the basic support obligation. Healthcare costs include medical, dental, orthodontia, vision, chiropractic, mental health treatment, prescription medications, and other similar costs.",
    howItWorks: [
      "Line 10a: Monthly health insurance premium paid for children (not the portion covering the parent or other household members).",
      "Line 10b: Uninsured monthly healthcare expenses paid for children.",
      "Line 10c: Total monthly healthcare expenses (10a + 10b) per parent.",
      "Line 10d: Combined total healthcare expenses.",
      "Line 14: Each parent's share (Line 6 × Line 13).",
      "Line 16a: Credit for expenses paid directly."
    ],
    fullExample: "P1 pays health insurance: $250/mo for children\nP2 pays no insurance\nCombined uninsured costs: $100/mo split equally\n\nLine 10d combined healthcare: $350/mo\nP1 income share: 65% / P2 income share: 35%\n\nP1 owes: $350 × 65% = $227.50\nP2 owes: $350 × 35% = $122.50\n\nP1 paid $250 directly → gets $250 credit\nP1 net additional obligation: $227.50 - $250 = -$22.50 → P2 owes P1 $22.50 adjustment",
    howItAffects: "Healthcare expenses increase total child support beyond the basic transfer payment. The parent who pays insurance directly receives a Line 16a credit. Courts verify insurance premiums — only the portion covering the children is included, not the parent's own coverage.",
    faqs: [
      { question: "How do I calculate the children's share of a family insurance premium?", answer: "Divide the family premium by total number of people covered. Multiply by number of children covered. Only include the children's portion — not the parent's." },
      { question: "What if healthcare costs vary month to month?", answer: "Use a monthly average. Divide the annual total by 12. Document actual costs with receipts or insurance statements." },
      { question: "Can healthcare expenses be modified?", answer: "Yes. If insurance costs change substantially either parent can petition for modification of the healthcare expense allocation." }
    ],
    relatedTerms: [
      { label: "Extraordinary Expenses", href: "/glossary/extraordinary-expenses" },
      { label: "Proportional Share", href: "/glossary/proportional-share" },
      { label: "Daycare Expenses", href: "/glossary/daycare-expenses" }
    ],
    rcw: "RCW 26.19.080(2)"
  },
  {
    name: "Daycare Expenses",
    slug: "daycare-expenses",
    category: "Proportional Shares",
    definition: "Work-related daycare and childcare costs are not included in the basic child support obligation. They are treated as extraordinary expenses and shared proportionally between parents based on their income share percentages under RCW 26.19.080.",
    example: "If daycare costs $800 and Parent A's income share is 70%, Parent A contributes $560 toward the monthly daycare bill.",
    linkLabel: "Read Daycare Expenses Guide →",
    relatedLinks: [],
    metaTitle: "Daycare Expenses in WA Child Support | WSCSS",
    metaDescription: "Daycare expenses in Washington child support are work-related childcare costs shared proportionally between parents. Learn how they are calculated under RCW 26.19.080.",
    h1Title: "What are Daycare Expenses in Washington Child Support?",
    ogTitle: "Daycare Expenses in WA Child Support | WSCSS",
    ogDescription: "Daycare expenses are work-related childcare costs shared proportionally between Washington parents in child support under RCW 26.19.080.",
    legalDefinition: "RCW 26.19.080(3): Daycare and special child rearing expenses such as tuition and long-distance transportation costs to and from the parents for visitation purposes are not included in the economic table. These expenses shall be shared by the parents in the same proportion as the basic child support obligation.",
    howItWorks: [
      "Line 11a: Work-related daycare and childcare",
      "Line 11b: Education expenses including tuition",
      "Line 11c: Long-distance transportation for visitation between parents",
      "Line 11d: Other special child rearing expenses"
    ],
    fullExample: "P2 is the primary parent and pays daycare: $800/mo\nP1 income share: 70% / P2 income share: 30%\n\nLine 12 combined daycare: $800\nP1 owes: $800 × 70% = $560\nP2 owes: $800 × 30% = $240\n\nP2 paid $800 directly → gets $800 Line 16b credit\nP2 net: $240 owed - $800 credit = -$560\nThis $560 credit reduces P2's transfer payment or increases the amount P1 owes.",
    howItAffects: "Daycare expenses can significantly increase the total child support obligation especially for young children. The parent who pays daycare directly receives a full credit on Line 16b. This often results in the higher income parent contributing substantially more to work-related childcare costs.",
    faqs: [
      { question: "Does daycare have to be work-related to qualify?", answer: "Generally yes. The expense must be necessary for the parent to maintain employment or attend school. Discretionary childcare may not qualify without court approval." },
      { question: "What if daycare costs change when a child starts school?", answer: "Either parent can petition for modification when daycare expenses substantially change — for example when a child starts kindergarten and full-time daycare ends." },
      { question: "Are after-school programs included?", answer: "Work-related after-school care typically qualifies. Educational enrichment programs may qualify as education expenses on Line 11b." }
    ],
    relatedTerms: [
      { label: "Healthcare Expenses", href: "/glossary/healthcare-expenses" },
      { label: "Extraordinary Expenses", href: "/glossary/extraordinary-expenses" },
      { label: "Proportional Share", href: "/glossary/proportional-share" }
    ],
    rcw: "RCW 26.19.080(3)"
  },
  {
    name: "Voluntary Unemployment",
    slug: "voluntary-unemployment",
    category: "Income Calculation",
    definition: "A parent is considered voluntarily unemployed if they choose not to work or work below their earning capacity without good cause. Washington courts will impute income to voluntarily unemployed parents based on their work history and local job market under RCW 26.19.071.",
    example: "An accountant who quits their $5,000/mo job to avoid support may be found voluntarily unemployed and have $5,000 in income imputed.",
    linkLabel: "Read Voluntary Unemployment Guide →",
    relatedLinks: [],
    metaTitle: "Voluntary Unemployment in WA Child Support | WSCSS",
    metaDescription: "Voluntary unemployment in Washington child support triggers income imputation by the court. Learn how courts determine voluntary status under RCW 26.19.071.",
    h1Title: "What is Voluntary Unemployment in Washington Child Support?",
    ogTitle: "Voluntary Unemployment in WA Child Support | WSCSS",
    ogDescription: "Voluntary unemployment triggers income imputation in Washington child support. Learn how courts determine voluntary status under RCW 26.19.071.",
    legalDefinition: "RCW 26.19.071(6): The court shall determine whether a parent is voluntarily underemployed or voluntarily unemployed based upon that parent's assets, residence, employment and earnings history, job skills, educational attainment, literacy, health, age, criminal record, dependency court obligations, and other employment barriers, record of seeking work, and the local job market.",
    howItWorks: [
      "What Courts Consider Voluntary: Quitting a job without good cause before or during child support proceedings. Refusing available work in your field. Taking a lower paying job without legitimate reason. Failing to seek work while unemployed. Working part-time when full-time work is available in your field.",
      "What Courts Do Not Consider Voluntary: Layoff or involuntary termination. Inability to work due to documented medical disability. Unemployment due to compliance with court-ordered reunification efforts. A high school student working limited hours. A parent recently released from incarceration actively seeking work."
    ],
    fullExample: "Parent quit a $5,000/mo accounting job three months before the hearing.\nIs not currently employed.\nNo documented medical barrier to work.\nLocal job market shows accounting positions available at $4,500-$5,500/mo.\n\nCourt finds: voluntary unemployment.\nImputes income at historical rate: $5,000/mo.\nThis $5,000 is used in the support calculation regardless of actual current earnings of $0.",
    howItAffects: "If you are found voluntarily unemployed the court uses your imputed income not your actual income. This increases your obligation if you are the paying parent or reduces the other parent's obligation if they are voluntarily unemployed. Imputed income stays until you return to appropriate employment or successfully modify the order.",
    faqs: [
      { question: "Can I avoid imputed income by staying home with children?", answer: "Courts consider all circumstances including childcare responsibilities. A parent staying home may avoid imputation if childcare costs would exceed their earning capacity or if the children's needs require full-time care." },
      { question: "What if I was fired for cause?", answer: "Termination for cause may be treated as voluntary in some cases especially if the court finds the behavior leading to termination was intentional." },
      { question: "How do I prove I am not voluntarily unemployed?", answer: "Document active job search with applications, rejection letters, and recruiter contacts. Provide medical records if disability prevents work." }
    ],
    relatedTerms: [
      { label: "Imputed Income", href: "/glossary/imputed-income" },
      { label: "Gross Monthly Income", href: "/glossary/gross-monthly-income" },
      { label: "Standard Calculation", href: "/glossary/standard-calculation" }
    ],
    rcw: "RCW 26.19.071(6)"
  },
  {
    name: "Support Modification",
    slug: "support-modification",
    category: "Court Process",
    definition: "A support modification is a court-approved change to an existing child support order. In Washington a modification requires showing a substantial change in circumstances — typically a 15% or more change in either parent's net income under RCW 26.09.170.",
    example: "If a parent receives a 30% salary increase, the other parent may petition to modify the support amount based on the new income level.",
    linkLabel: "Read Support Modification Guide →",
    relatedLinks: [],
    metaTitle: "Child Support Modification in Washington | WSCSS",
    metaDescription: "Child support modification in Washington requires a substantial change - typically a 15% income change. Learn the full process under RCW 26.09.170.",
    h1Title: "What is Child Support Modification in Washington State?",
    ogTitle: "Child Support Modification in Washington | WSCSS",
    ogDescription: "Washington child support modification requires a 15% or more change in net income under RCW 26.09.170. Learn the full process under RCW 26.09.170.",
    legalDefinition: "RCW 26.09.170 governs modification of child support orders in Washington. A substantial change in circumstances is required. Washington presumes a substantial change exists when the order would change by 15% or more based on current income.",
    howItWorks: [
      "Income changes: Either parent's income increases or decreases by 15% or more since the last order. A parent loses employment involuntarily. A parent receives a significant promotion or change in employment.",
      "Expense changes: Childcare costs change substantially when a child starts or leaves daycare. Healthcare costs change significantly. A child develops special medical needs.",
      "Residential changes: The residential schedule changes substantially. A child moves to a different primary parent. A child reaches age 18 or graduates high school."
    ],
    fullExample: "Current order entered with P1 earning $4,000/mo.\nP1 gets a promotion and now earns $5,200/mo.\nChange: ($5,200 - $4,000) ÷ $4,000 = 30%.\n30% > 15% threshold → substantial change exists.\n\nNew calculation with $5,200 net income:\nRecalculate all worksheet lines with updated income figures.\nFile petition for modification with new WSCSS worksheet attached.",
    howItAffects: "A successful modification replaces the existing order with a new one. The new order is effective from the date of filing the petition in most cases — not from the date of the hearing. File promptly when circumstances change.",
    faqs: [
      { question: "How often can child support be modified?", answer: "There is no minimum waiting period. A modification can be requested any time there is a substantial change in circumstances. However courts discourage frequent filings without meaningful changes." },
      { question: "Can both parents agree to modify without going to court?", answer: "Yes — a stipulated modification agreed by both parents still requires court approval and a new court order. An informal private agreement is not legally enforceable." },
      { question: "Does modification go back to the date income changed?", answer: "No. Modification is generally effective from the date the petition is filed with the court — not the date income changed. File promptly." }
    ],
    relatedTerms: [
      { label: "Standard Calculation", href: "/glossary/standard-calculation" },
      { label: "Transfer Payment", href: "/glossary/transfer-payment" },
      { label: "Deviation", href: "/glossary/deviation" }
    ],
    rcw: "RCW 26.09.170"
  },
  {
    name: "45% Income Cap",
    slug: "income-cap",
    category: "Limitations",
    definition: "Washington law limits child support to 45% of a parent's net monthly income for all their biological or legal children combined. Courts may exceed this cap only for good cause including substantial wealth or special needs of the children under RCW 26.19.065.",
    example: "A parent earning $3,000/mo net has an income cap of $1,350 for all their children combined.",
    linkLabel: "Read Income Cap Guide",
    relatedLinks: [],
    metaTitle: "45% Income Cap in WA Child Support | WSCSS",
    metaDescription: "Washington limits child support to 45% of a parent's net income for all children combined. Learn when the cap applies and exceptions under RCW 26.19.065.",
    h1Title: "What is the 45% Income Cap in Washington Child Support?",
    ogTitle: "45% Income Cap in WA Child Support | WSCSS",
    ogDescription: "Washington limits child support to 45% of net income for all children combined. Learn when it applies under RCW 26.19.065.",
    legalDefinition: "RCW 26.19.065(1): No parent's child support obligation owed for all of their biological or legal children may exceed 45% of their net income except for good cause shown. Good cause includes substantial wealth, children with special needs, larger families, and daycare expenses.",
    howItWorks: [
      "The cap applies to the total obligation for ALL of a parent's children across all cases not just the children in the current case.",
      "Line 18 of the WSCSS worksheet calculates 45% of each parent's net income as an informational figure for the court to review.",
      "If the total obligation across all cases exceeds 45% the court considers whether to apply the limitation before determining the best interests of the children."
    ],
    fullExample: "P1 net income: $3,000/mo\n45% cap: $3,000 × 45% = $1,350\n\nP1 already pays $600/mo for a child from another relationship.\nAvailable for this case: $1,350 - $600 = $750.\nIf calculated obligation exceeds $750 the court reviews whether to cap at $750.",
    howItAffects: "The cap prevents child support from consuming an unreasonable portion of a parent's income when they have children from multiple relationships. Courts must consider the best interests of all children affected — not just those in the current case.",
    faqs: [
      { question: "Does the 45% cap apply automatically?", answer: "No. The court must consider whether to apply it after reviewing the best interests of the children and circumstances of both households. It is a ceiling not an automatic reduction." },
      { question: "Does the cap include healthcare and daycare?", answer: "The 45% cap applies to basic child support obligations. Healthcare and daycare are extraordinary expenses that may be added separately by the court." },
      { question: "What counts as good cause to exceed the cap?", answer: "Substantial wealth, children with special medical or educational needs, larger families, and significant daycare expenses are specifically listed in RCW 26.19.065 as good cause to exceed the 45% cap." }
    ],
    relatedTerms: [
      { label: "Self-Support Reserve", href: "/glossary/self-support-reserve" },
      { label: "Standard Calculation", href: "/glossary/standard-calculation" },
      { label: "Support Modification", href: "/glossary/support-modification" }
    ],
    rcw: "RCW 26.19.065(1)"
  }
];
