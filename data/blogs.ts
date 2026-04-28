export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  updatedAt?: string;
  author: string;
  featured: boolean;
  category: string;
  readTime: string;
  image: { url: string; alt: string; width: number; height: number; };
  faqs: { question: string; answer: string }[];
}

export const blogs: BlogPost[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // BLOG 1, FEATURED
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: "2026 Washington State Child Support Guidelines: The Complete Handbook",
    slug: "washington-child-support-guidelines-2026",
    category: "Legal Guide",
    readTime: "14 min",
    excerpt: "Everything you need to know about Washington's 2026 child support schedule, including exactly what changed, how the economic tables work, and what you can expect in court.",
    metaTitle: "2026 WA Child Support Guidelines | The Complete Parent Handbook",
    metaDescription: "Master the 2026 Washington Child Support Schedule. Expert breakdown of the updated economic tables, SSR thresholds (approximately $2,394), shared custody rules, and extraordinary expenses.",
    author: "WCSSC Editorial Team",
    createdAt: "2026-01-05",
    updatedAt: "2026-04-09",
    featured: true,
    image: { url: "/img/wa_guidelines_2026.png", alt: "2026 Washington State Child Support Guidelines Handbook", width: 1200, height: 630 },
    content: `
      <div class="card card-brand mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 !text-brand list-disc ml-6 mt-2">
          <li>The 2026 economic table increased by approximately 4.2% across most income brackets</li>
          <li>The Self-Support Reserve (SSR) is firmly set at <strong>approximately $2,394 per month</strong></li>
          <li>Combined income table now covers up to $50,000/month before judicial extrapolation</li>
          <li>The 45% net income cap still hard-limits total child support obligations</li>
          <li>Shared parenting time (50/50) can trigger a deviation, but it's not automatic</li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This guide is based on Washington State's 2026 guidelines. It provides educational estimates, not legal advice. Consult a licensed WA family law attorney for your specific situation.</p>

      <p class="mb-4">If you've recently been served with child support paperwork, or you're the one filing, you're probably staring at a bunch of legal jargon wondering how anyone is supposed to make sense of this. You're not alone. Every January, Washington State updates its child support schedule, and 2026 brought some meaningful changes that affect tens of thousands of families across the state.</p>

      <div class='table-wrapper my-6'><table><thead><tr><th>Factor</th><th>Value (2026)</th></tr></thead><tbody><tr><td>Self Support Reserve</td><td class='font-bold text-brand'>approximately $2,394</td></tr><tr class='bg-surface-subtle'><td>Economic Table Limit</td><td class='font-bold text-brand'>$50,000</td></tr><tr><td>Minimum Support</td><td class='font-bold text-brand'>$50 per child</td></tr></tbody></table></div><p class="mb-4">This guide walks you through everything that matters: what actually changed in 2026, how the math works, what the courts are required to do, and where you have room to push back. We'll talk about real numbers, real situations, and what to realistically expect when you walk into a King County courtroom or log into Pierce County's e-filing system.</p>

       <h2 class="mt-12 mb-6">What Actually Changed in January 2026</h2>
      <p class="mb-4">Washington's child support schedule is reviewed on a staggered cycle, and January 1, 2026 brought a revision that affected several key numbers. The most important changes:</p>

       <ul class="list-disc pl-6 space-y-4 mb-8">
        <li><strong>The economic table increased by roughly 4.2%</strong> across most combined income tiers. That means if you had a $600/month obligation in 2024, it might be closer to $625 now. The adjustment reflects updated cost-of-living data and the rising cost of raising children in Washington.</li>
        <li><strong>The Self-Support Reserve rose to approximately $2,394/month.</strong> This is the minimum the paying parent must be left with after paying child support. It went up from the prior year, providing slightly more protection for lower-income obligors.</li>
        <li><strong>The income table now natively covers up to $50,000 in combined monthly net income</strong> before judges have to start improvising. Previously this was capped lower, and high-earner cases required more judicial discretion at earlier thresholds.</li>
        <li><strong>The 45% net income cap remains unchanged.</strong> Your total child support obligation, base payment plus all split extraordinary expenses, cannot exceed 45% of your adjusted net monthly income without the court making a specific "good cause" finding.</li>
      </ul>

      <p class="mb-4">To verify any of these figures directly, you can visit the <a href="https://www.dshs.wa.gov/esa/division-child-support" target="_blank" rel="nofollow">Washington State DSHS Division of Child Support</a> or the <a href="https://www.courts.wa.gov/" target="_blank" rel="nofollow">Washington Courts website</a>, which publishes the official economic tables.</p>

      <div class='table-wrapper my-6'><table><thead><tr><th>Category</th><th>Details in 2026</th></tr></thead><tbody><tr><td>Standard Table Limit</td><td class='font-bold'>$50,000 Combined Monthly Net</td></tr><tr class='bg-surface-subtle'><td>Max Obligation</td><td class='font-bold text-brand'>45% of Net Income</td></tr></tbody></table></div> <h2 class="mt-12 mb-6">The Income Shares Model, How Washington Actually Calculates Support</h2>
      <p class="mb-4">Washington uses what's called the <strong>Income Shares Model</strong>, and the core idea behind it is actually pretty fair: children should receive the same proportion of their parents' income that they would have gotten if the family had stayed together.</p>

      <p class="mb-4">So instead of just looking at what the non-custodial parent earns, Washington combines <em>both</em> parents' monthly net incomes into a single pool, looks up a basic support obligation from the economic table, and then splits that obligation between the parents proportionally. If you earn 60% of the combined income, you're responsible for 60% of the obligation.</p>

      <p class="mb-4">Here's what that looks like in practice. Let's say Parent A nets $4,500 per month after taxes and mandatory deductions, and Parent B nets $2,500. Their combined income is $7,000. For two children at $7,000 combined income, the 2026 economic table would show a basic support obligation of approximately $1,450 per month. Parent A, who earns 64% of the total, would be responsible for about $928. Parent B would be responsible for $522. The parent who has the children less of the time pays their share as a transfer payment to the other parent.</p>

      <p class="mb-4">Want to check your own numbers? Use our <a href="/">Washington child support calculator</a> to run the estimate instantly, or the <a href="/worksheet">Professional Worksheet Wizard</a> for the full 8-part breakdown.</p>

       <h2 class="mt-12 mb-6">Step-by-Step: How "Monthly Net Income" Is Calculated</h2>
      <p class="mb-4">Before you can use the table at all, you need to figure out each parent's monthly net income, and that's not as simple as looking at your take-home pay. Washington defines net income in a specific way under <strong>RCW 26.19.071</strong>.</p>

      <p class="mb-4">You start with gross income, everything that counts, including wages, salaries, overtime (averaged historically, not just one big month), bonuses, commissions, self-employment income, rental income, Social Security benefits, unemployment, and even some worker's compensation payments.</p>

      <p class="mb-4">From gross income, you subtract only specific, legally-allowed deductions:</p>
       <ul class="list-disc pl-6 space-y-4 mb-8">
        <li>Federal and state income taxes (based on the actual tax filing status)</li>
        <li>FICA (Social Security and Medicare contributions)</li>
        <li>Mandatory pension contributions required as a condition of employment</li>
        <li>Union dues</li>
        <li>State industrial insurance (L&amp;I)</li>
        <li>Health insurance premiums paid for the children</li>
        <li>Voluntary retirement contributions are <em>not</em> deductible</li>
        <li>Credit card debt, car payments, and personal loans are <em>not</em> deductible</li>
      </ul>

      <p class="mb-4">This distinction trips people up constantly. Just because you have a large car payment or credit card balance doesn't mean the court reduces your support obligation. Only the specific deductions listed in RCW 26.19 count.</p>

       <h2 class="mt-12 mb-6">The Self-Support Reserve: Your Floor, Not Your Ceiling</h2>
      <p class="mb-4">One of the most important protections in Washington child support law is the Self-Support Reserve, currently set at <strong>approximately $2,394 per month in 2026</strong>. The legislature's reasoning is straightforward: you can't help your children if you've been driven into poverty yourself.</p>

      <p class="mb-4">Here's how it works: before finalizing any support order, the court performs an SSR check. If the calculated support amount would leave the paying parent with less than approximately $2,394 after making the payment, the court <em>must</em> reduce the obligation, often all the way down to the statutory minimum of <strong>$50 per child per month</strong>.</p>

      <p class="mb-4">For example, imagine a parent who nets $1,900 per month. The standard table might generate a support obligation of $550. But $1,900 minus $550 leaves only $1,350, which is below the approximately $2,394 SSR. In this case, the court would need to reduce the payment, likely to $50 per child. If there are two children, that's $100/month rather than $550.</p>

      <p class="mb-4">Read our full deep-dive on this topic: <a href="/blog/washington-ssr-self-support-reserve-explained">Understanding the approximately $2,394 Self-Support Reserve in 2026</a>.</p>

       <h2 class="mt-12 mb-6">What the Basic Support Amount Does, and Doesn't, Cover</h2>
      <p class="mb-4">Here's something a lot of parents don't realize until they're already in court: the basic transfer payment shown on the economic table only covers <strong>food, ordinary clothing, and shelter</strong>. That's it.</p>

      <p class="mb-4">Everything else, what the law calls "extraordinary expenses", is calculated separately and paid on top of the base amount, split proportionally between both parents. These include:</p>
       <ul class="list-disc pl-6 space-y-4 mb-8">
        <li><strong>Work-related childcare</strong>, daycare, after-school programs, and summer camps that allow a parent to work. In Seattle, this alone can easily run $2,000–$2,500/month.</li>
        <li><strong>Health insurance premiums</strong>, the actual cost of covering the children on either parent's medical plan</li>
        <li><strong>Uninsured medical, dental, and vision expenses</strong>, copays, prescriptions, orthodontics</li>
        <li><strong>Long-distance transportation costs</strong>, if one parent moves, the travel costs for visitation are split</li>
        <li><strong>Educational expenses</strong>, private school tuition or special education costs, if ordered</li>
      </ul>

      <p class="mb-4">If daycare runs $1,800/month and Parent A is responsible for 60% of extraordinary expenses, they pay an additional $1,080 on top of their base transfer payment. That can significantly change the total picture. Use our <a href="/worksheet">Worksheet Wizard</a> to calculate both base and extraordinary expense totals at once.</p>

       <h2 class="mt-12 mb-6">Judicial Deviations: When the Table Isn't the Final Answer</h2>
      <p class="mb-4">The economic table gives the <em>presumptive</em> amount, the starting point. But Washington judges and commissioners have the authority to deviate from that amount when there's good cause. Deviations can go up or down.</p>

      <p class="mb-4">The most common reasons courts grant a downward deviation:</p>
       <ul class="list-disc pl-6 space-y-4 mb-8">
        <li><strong>Substantially equal residential time</strong>, if the child spends close to 50% of nights with each parent, there's less need for a large transfer payment because both parents are absorbing direct costs</li>
        <li><strong>Obligor has other biological children</strong> who are also receiving court-ordered support</li>
        <li><strong>Non-recurring income</strong>, a large bonus or inheritance that inflated income in one year</li>
        <li><strong>Child receiving Social Security benefits</strong> based on a parent's disability account</li>
      </ul>

      <p class="mb-4">Upward deviations are less common but happen when the child has special medical needs, unusual educational expenses, or when the custodial parent can document that the baseline amount genuinely doesn't cover actual costs given the family's previous standard of living.</p>

       <h2 class="mt-12 mb-6">A Note on County-Level Differences</h2>
      <p class="mb-4">The economic tables are statewide, the math is the same whether you're in King County or Garfield County. But the <em>procedure</em> for filing and enforcing that order varies significantly by county. King County has strict local rules (LFLR 10) requiring detailed financial declarations. Rural counties may have informal commissioner hearings that move much faster.</p>

      <p class="mb-4">Check your specific county's calculation profile: <a href="/king-county-income-5000-2-children">King County</a> | <a href="/pierce-county-income-5000-2-children">Pierce County</a> | <a href="/snohomish-county-income-5000-2-children">Snohomish County</a></p>

       <h2 class="mt-12 mb-6">The Bottom Line</h2>
      <p class="mb-4">Navigating Washington's child support system is genuinely complicated, there are layers of calculations, exceptions, and local rules that can catch you off guard. But understanding the core framework (Income Shares Model, SSR protection, 45% cap, extraordinary expenses) gives you a real foundation before you walk into any courthouse or attorney's office.</p>
      <p class="mb-4">Use our <a href="/">free calculator</a> to get a baseline estimate before your case starts, and consider downloading a copy of your estimated worksheet to bring to mediation. Being prepared with real numbers on your side is one of the most valuable things you can do.</p>
    <div class="mt-8 mb-8 card section-subtle"><h3 class="font-bold text-text-primary mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class="font-bold text-brand hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><a href="/income-5000-2-children" class="font-bold text-brand hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class="font-bold text-brand hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class="font-bold text-brand hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-xs  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="mt-6 calc-result"><strong>👉 Calculate Your Exact Child Support</strong><br/>Use our <a href="/worksheet" class="underline text-white font-bold">Child Support Calculator</a></div>`,
    faqs: [
      {
        question: "When did the 2026 Washington child support tables take effect?",
        answer: "The updated 2026 economic tables became effective January 1, 2026, following the biennial legislative review. They reflect updated cost-of-living data and increased the SSR to approximately $2,394/month."
      },
      {
        question: "What is the maximum combined income covered by the standard table?",
        answer: "The 2026 table covers combined monthly net income up to $50,000. Above that threshold, courts use 'extrapolative discretion', analyzing actual lifestyle, spending history, and specific needs rather than a published table figure."
      },
      {
        question: "Can I modify my child support order if I lose my job or get a significant raise?",
        answer: "Yes. Either parent can petition for modification when there's a 'substantial change in circumstances', typically a sustained income change of 10% or more, or when two full years have passed. The change generally must be long-term, not temporary. File your petition as fast as possible; arrears accrued before you file cannot be retroactively waived."
      },
      {
        question: "Does the 45% cap protect me if the base amount seems too high?",
        answer: "Yes. Washington law limits the total child support obligation, base payment plus your share of extraordinary expenses, to 45% of your monthly net income, unless the court makes a specific 'good cause' finding to exceed that. If your calculation is approaching or exceeding 45%, bring it to the court's attention explicitly."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOG 2
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: "Filing for Child Support in King County: A Step-by-Step Guide",
    slug: "filing-child-support-king-county-guide",
    category: "County Guide",
    readTime: "11 min",
    excerpt: "A practical, step-by-step guide to filing a child support petition in King County, including which courthouse handles your case, the forms you need, and what actually happens at your first hearing.",
    metaTitle: "Filing Child Support in King County | Step-by-Step 2026 Roadmap",
    metaDescription: "Step-by-step guide to filing for child support in King County, WA. Covers Seattle vs. Kent courthouse routing, required forms, e-filing, and what to expect at your first hearing.",
    author: "WCSSC Editorial Team",
    createdAt: "2026-02-12",
    updatedAt: "2026-04-09",
    featured: false,
    image: { url: "/img/king_county_guide.png", alt: "Filing Child Support in King County Washington State", width: 1200, height: 630 },
    content: `
      <div class="card card-brand mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 !text-brand list-disc ml-6 mt-2">
          <li>Your case goes to Seattle OR Kent courthouse, determined by your residential ZIP code</li>
          <li>Washington's FL All Family form series handles all standard child support filings</li>
          <li>E-filing is available 24/7 and strongly recommended for efficiency</li>
          <li>If you receive public assistance, the Prosecuting Attorney's office may assist for free</li>
          <li>Uncontested cases typically resolve in 4–6 weeks; contested cases can take 3–6 months</li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This is a procedural guide based on 2026 King County local rules. It is not legal advice. For complex situations, consult a licensed Washington family law attorney.</p>

      <p class="mb-4">King County is Washington's largest judicial district, and its family court system is busy. If you've never navigated it before, knowing exactly what to expect, which building to go to, which forms to fill out, what the clerk will ask for, saves enormous time and frustration. Let's walk through it step by step.</p>

      <div class='table-wrapper my-6'><table><thead><tr><th>Item</th><th>Current Washington Standard</th></tr></thead><tbody><tr><td>Self Support Reserve</td><td class='font-bold text-brand'>approximately $2,394</td></tr><tr class='bg-surface-subtle'><td>Economic Table Limit</td><td class='font-bold text-brand'>$50,000</td></tr><tr><td>Minimum Support</td><td class='font-bold text-brand'>$50 per child</td></tr></tbody></table></div><p class="mb-4">First, before you even think about the courthouse: run your estimated support amount through our <a href="/king-county-income-5000-2-children">King County child support calculator</a>. Walking into court with a realistic figure in hand puts you in a genuinely stronger position at every stage of this process.</p>

       <h2 class="mt-12 mb-6">1. Seattle or Kent? Which Courthouse Handles Your Case</h2>
      <p class="mb-4">King County's Superior Court operates across two main locations, and routing is determined by <strong>where the responding parent lives</strong> (typically the non-custodial parent), not where you live.</p>

       <ul class="list-disc pl-6 space-y-4 mb-8">
        <li><strong>King County Courthouse, Seattle:</strong> 516 Third Avenue, Seattle, WA 98104. This handles cases in north and central King County, including Seattle, Bellevue, Kirkland, Redmond, Mercer Island, and Renton.</li>
        <li><strong>Maleng Regional Justice Center, Kent:</strong> 401 Fourth Avenue North, Kent, WA 98032. This handles south King County: Auburn, Federal Way, Kent, Enumclaw, Black Diamond, and similar areas.</li>
      </ul>

      <p class="mb-4">If you're unsure which venue applies to your case, call the King County Superior Court Clerk at (206) 477-0400 or check the <a href="https://kingcounty.gov/courts/superior-court.aspx" target="_blank" rel="nofollow">King County Superior Court website</a>. Getting this wrong means your case gets transferred, which adds weeks to your timeline.</p>

      <div class='table-wrapper my-6'><table><thead><tr><th>King County Court</th><th>Location</th><th>Handles</th></tr></thead><tbody><tr><td>Seattle Courthouse</td><td>516 Third Ave</td><td>North/Central King County</td></tr><tr class='bg-surface-subtle'><td>Maleng Regional Justice Center</td><td>401 Fourth Ave N, Kent</td><td>South King County</td></tr></tbody></table></div> <h2 class="mt-12 mb-6">2. The Forms You'll Need</h2>
      <p class="mb-4">Washington uses a standardized set of family law forms called the <strong>FL All Family series</strong>, most of which are free to download from the Washington Courts website. For a standard child support petition, you'll typically need:</p>

       <ul class="list-disc pl-6 space-y-4 mb-8">
        <li><strong>FL All Family 130</strong>, Petition for Child Support (the main filing document)</li>
        <li><strong>FL All Family 131</strong>, Child Support Order (what the court signs)</li>
        <li><strong>FL All Family 132</strong>, Child Support Worksheets (the income calculations)</li>
        <li><strong>FL All Family 101</strong>, Summons (notifies the other parent)</li>
        <li><strong>King County Case Assignment Designation</strong>, a local form that routes your case to Seattle or Kent</li>
      </ul>

      <p class="mb-4">If you're modifying an existing order rather than creating a new one, you'll use FL All Family 422 (Petition to Modify Child Support) and updated Worksheets. Make sure you're using the 2026 versions.</p>

       <h2 class="mt-12 mb-6">3. Calculating and Filing Your Support Worksheets</h2>
      <p class="mb-4">The most common reason filings get sent back or delayed is incomplete or incorrect support worksheets. King County commissioners see hundreds of these and have little patience for math errors or missing income documentation.</p>

      <p class="mb-4">Before you file, gather: your last two months of pay stubs, your most recent federal tax return (both forms W-2 and 1040), documentation of any self-employment income, proof of health insurance costs for the children, and any childcare invoices. The other parent's income information will eventually need to be exchanged through discovery if they don't voluntarily disclose it.</p>

      <p class="mb-4">Use our <a href="/worksheet">Professional Worksheet Wizard</a> to generate properly formatted support worksheets that match what King County courts expect. Print the output, sign it, and attach it to your petition.</p>

       <h2 class="mt-12 mb-6">4. Filing at the Clerk's Office (or E-Filing)</h2>
      <p class="mb-4">King County strongly encourages e-filing through the Washington Courts TurboCourt system. You can file 24 hours a day from home, pay filing fees by credit card, and get a confirmation immediately. The standard filing fee for a new family law case is approximately <strong>$314</strong>, though this may be waived if you qualify for an In Forma Pauperis (IFP) fee waiver based on low income.</p>

      <p class="mb-4">If you're filing in person, document windows at the Seattle courthouse are open Monday–Friday from 8:30 AM to 4:30 PM. Arrive early, the clerk's office can get backed up, and if you arrive after 4:00 PM they may not process same-day.</p>

       <h2 class="mt-12 mb-6">5. Serving the Other Parent</h2>
      <p class="mb-4">After you file, you must legally notify ("serve") the other parent. In King County, the most common methods are:</p>
       <ul class="list-disc pl-6 space-y-4 mb-8">
        <li><strong>King County Sheriff's process service</strong>, ~$85 fee; reliable and creates an official record</li>
        <li><strong>Certified adult (not a party to the case) personal service</strong>, a friend, relative, or private process server physically hands the documents to the other parent</li>
        <li><strong>Certified mail</strong>, the other parent must sign the return receipt personally</li>
      </ul>
      <p class="mb-4">You'll receive a "Return of Service" form to file with the court proving the other parent was served. Without this, your case cannot move forward.</p>

       <h2 class="mt-12 mb-6">6. The Role of the Prosecuting Attorney's Office</h2>
      <p class="mb-4">If you currently receive TANF (public assistance) or Medicaid, the <strong>King County Prosecuting Attorney's Family Support Division</strong> will often open a child support case on your behalf automatically, working in coordination with <a href="https://www.dshs.wa.gov/esa/division-child-support" target="_blank" rel="nofollow">DSHS</a>. This service is free, though the state retains any support collected to offset public assistance costs.</p>

      <p class="mb-4">If you don't receive public assistance but want agency help, DSHS's Division of Child Support (DCS) can also open a case, though they prioritize public-assistance cases and response times vary.</p>

       <h2 class="mt-12 mb-6">7. What Happens at Your First Court Date</h2>
      <p class="mb-4">For uncontested cases, where both parents agree on the support amount, you may be able to present a stipulated order and get it signed without a contested hearing. Commissioners approve these quickly if the worksheets are complete and the math checks out.</p>

      <p class="mb-4">For contested cases, your first court date is typically a scheduling conference or an Order to Show Cause hearing. The commissioner will set deadlines for financial disclosure, issue temporary orders (which take effect immediately), and schedule a follow-up hearing if needed. <strong>Temporary orders are critical</strong>, they're the support amount that applies from the day they're issued until the final order.</p>

       <h2 class="mt-12 mb-6">8. Modifying an Existing King County Order</h2>
      <p class="mb-4">If you have an older support order and your income has changed by more than 10%, or two full years have passed, you can petition for a modification. The process is similar to the original filing but uses the FL 422 family of forms.</p>

       <h2 class="mt-12 mb-6">Wrapping Up</h2>
      <p class="mb-4">Filing for child support in King County takes preparation, correct paperwork, and a clear understanding of which building your case belongs in. The process isn't fast, but going in with complete, accurate worksheets and the right forms significantly reduces delays. Take 10 minutes with our <a href="/">calculator</a> now, that one step costs nothing, but it might save you from the most common mistakes families make in King County court.</p>
    <div class="mt-8 mb-8 card section-subtle"><h3 class="font-bold text-text-primary mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class="font-bold text-brand hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><a href="/income-5000-2-children" class="font-bold text-brand hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class="font-bold text-brand hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class="font-bold text-brand hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-xs  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="mt-6 calc-result"><strong>👉 Calculate Your Exact Child Support</strong><br/>Use our <a href="/worksheet" class="underline text-white font-bold">Child Support Calculator</a></div>`,
    faqs: [
      {
        question: "How long does it take to get a child support order in King County?",
        answer: "Uncontested cases, where both parents agree, often resolve in 4 to 6 weeks. Contested cases requiring a hearing can take 3 to 6 months depending on how backed up the court calendar is. Temporary orders are usually issued at the first hearing, so support payments begin relatively quickly even in contested situations."
      },
      {
        question: "What is the filing fee for child support in King County?",
        answer: "The standard filing fee for a new family law case is approximately $314. If your income is below a certain threshold, you can apply for a fee waiver (In Forma Pauperis) by completing FL All Family 001. The clerk's office can give you the current waiver eligibility guidelines."
      },
      {
        question: "Do I need a lawyer to file for child support in King County?",
        answer: "You don't legally need a lawyer, and many parents handle straightforward cases themselves. However, if income is complex (self-employment, stock options, multiple jobs), if there are significant daycare or healthcare costs to allocate, or if the other parent has an attorney, hiring one significantly improves your outcome."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOG 3
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: "Understanding the approximately $2,394 Self-Support Reserve (SSR) in 2026",
    slug: "washington-ssr-self-support-reserve-explained",
    category: "Calculation Guide",
    readTime: "10 min",
    excerpt: "A plain-English deep dive into the 2026 Self-Support Reserve, what it is, how the math actually works at different income levels, and what happens when your support obligation hits the floor.",
    metaTitle: "WA Self-Support Reserve (SSR) Explained | 2026 Guide",
    metaDescription: "What is the WA Child Support SSR? Plain-English guide to how the approximately $2,394 monthly floor protects low-income parents, with real math examples at different income levels.",
    author: "WCSSC Editorial Team",
    createdAt: "2026-03-20",
    updatedAt: "2026-04-09",
    featured: false,
    image: { url: "/img/ssr_explained.png", alt: "Washington State Self-Support Reserve SSR Explained 2026", width: 1200, height: 630 },
    content: `
      <div class="card card-brand mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 !text-brand list-disc ml-6 mt-2">
          <li>The 2026 SSR is set at <strong>approximately $2,394 per month (net income)</strong></li>
          <li>The SSR applies to the <em>paying parent's</em> income only, not combined income</li>
          <li>When SSR kicks in, the obligation typically drops to the $50/child minimum</li>
          <li>The SSR works alongside (not instead of) the 45% income cap</li>
          <li>Verify the current SSR at <a href="https://www.dshs.wa.gov/esa/division-child-support" target="_blank" rel="nofollow">dshs.wa.gov</a></li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This article explains Washington State's 2026 SSR guidelines for educational purposes. For legal advice on your specific situation, consult a licensed WA family law attorney.</p>

      <p class="mb-4">If you're a low-income parent facing a child support order in Washington State, the Self-Support Reserve might be your most important legal protection, and one that a surprising number of people going through this process have never heard of.</p>

      <div class='table-wrapper my-6'><table><thead><tr><th>Guideline Factor</th><th>2026 Amount</th></tr></thead><tbody><tr><td>Self Support Reserve</td><td class='font-bold text-brand'>approximately $2,394</td></tr><tr class='bg-surface-subtle'><td>Economic Table Limit</td><td class='font-bold text-brand'>$50,000</td></tr><tr><td>Minimum Support</td><td class='font-bold text-brand'>$50 per child</td></tr></tbody></table></div><p class="mb-4">In simple terms: Washington law says <em>you can't be forced into poverty to pay child support</em>. The SSR is the mechanism that enforces that principle. Set at <strong>approximately $2,394 per month in 2026</strong>, it represents the absolute minimum income the paying parent must be left with after making their monthly payment. If the standard calculation would leave you with less than that, the court <em>must</em> reduce your obligation, often dramatically.</p>

       <h2 class="mt-12 mb-6">1. What Exactly Is the Self-Support Reserve?</h2>
      <p class="mb-4">The SSR is not an income threshold that determines whether you pay at all. It's a floor that limits <em>how much</em> you pay. It's calculated based on your individual net monthly income, the amount you actually take home after taxes, FICA, mandatory deductions, and any other legally-allowable subtractions under RCW 26.19.</p>

      <p class="mb-4">Think of it as a test the court runs on every order: <em>"After this parent pays child support, will they have at least approximately $2,394 left to survive on?"</em> If the answer is no, the court cannot approve the standard calculated amount. It has to reduce the payment until the parent retains approximately $2,394, or cap it at the $50 per child per month statutory minimum.</p>

      <div class='table-wrapper my-6'><table><thead><tr><th>Monthly Net Income</th><th>Support Order Impact</th></tr></thead><tbody><tr><td>Below approximately $2,394</td><td class='font-bold'>Reduction applied (often to $50/child)</td></tr><tr class='bg-surface-subtle'><td>Above approximately $2,394</td><td class='font-bold text-brand'>Standard obligation applies</td></tr></tbody></table></div> <h2 class="mt-12 mb-6">2. Real Math: Three Income Scenarios</h2>
      <p class="mb-4">Let's look at how the SSR actually plays out at three different income levels for a parent supporting one child:</p>

       <h3 class="mt-8 mb-4">Scenario A: $1,800/month net income</h3>
      <p class="mb-4">Suppose the income shares calculation generates a standard support obligation of $450/month. But $1,800 minus $450 = $1,350, which is below the approximately $2,394 SSR. In this case, the court would reduce the obligation. Since $1,800 is already below the approximately $2,394 SSR floor, the order would likely be reduced to the $50 minimum.</p>

       <h3 class="mt-8 mb-4">Scenario B: $2,200/month net income</h3>
      <p class="mb-4">At $2,200, if the calculated obligation is $400: $2,200 - $400 = $1,800 (below approximately $2,394). Now the SSR kicks in and the obligation must be reduced. The court would likely order a payment that keeps the parent at the approximately $2,394 level, or the $50/child minimum if necessary.</p>

       <h3 class="mt-8 mb-4">Scenario C: $3,500/month net income</h3>
      <p class="mb-4">At $3,500, you're comfortably above the SSR. The SSR isn't actively reducing your payment, but the 45% net income cap still applies. Your total child support burden (base plus extraordinary expenses) cannot exceed $1,575/month (45% of $3,500) without the court making a specific finding.</p>

      <p class="mb-4">You can see exactly how these calculations work for your actual income using our <a href="/">Washington child support calculator</a>.</p>

       <h2 class="mt-12 mb-6">3. The $50 Per Child Minimum</h2>
      <p class="mb-4">Even when the SSR calculation brings the obligation down dramatically, Washington maintains a presumptive floor of <strong>$50 per child per month</strong>. This means no matter how low your income, you are expected to contribute something toward your children's support. For two children that's $100/month; for three, $150/month.</p>

       <h2 class="mt-12 mb-6">4. The SSR vs. the 45% Cap</h2>
      <p class="mb-4">The SSR and the 45% cap are separate but related protections that work together:</p>
       <ul class="list-disc pl-6 space-y-4 mb-8">
        <li><strong>The SSR</strong> asks: after paying, will you have at least approximately $2,394? It primarily protects low-income parents.</li>
        <li><strong>The 45% cap</strong> asks: is this payment more than 45% of your net income? It primarily protects middle-income parents.</li>
      </ul>
      <p class="mb-4">A parent earning $4,000/month is comfortably above the SSR but could hit the 45% cap ($1,800 maximum) if they have multiple children and high daycare and healthcare costs.</p>

       <h2 class="mt-12 mb-6">5. Does the SSR Apply to Support Modifications?</h2>
      <p class="mb-4">Yes, absolutely. If you were paying based on an older order established before the SSR was raised, or before your income dropped, you may now be entitled to a reduction. If your current income is hovering near the approximately $2,394 threshold, it's worth running a fresh calculation.</p>

       <h2 class="mt-12 mb-6">The Bottom Line</h2>
      <p class="mb-4">The Self-Support Reserve exists because the legislature recognized that destroying a parent's ability to survive doesn't serve anyone. If your income puts you near that approximately $2,394 line, know your rights, document your income carefully, and ask the court to apply the SSR explicitly. It's not a loophole, it's the law.</p>
    <div class="mt-8 mb-8 card section-subtle"><h3 class="font-bold text-text-primary mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class="font-bold text-brand hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><a href="/income-5000-2-children" class="font-bold text-brand hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class="font-bold text-brand hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class="font-bold text-brand hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-xs  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="mt-6 calc-result"><strong>👉 Calculate Your Exact Child Support</strong><br/>Use our <a href="/worksheet" class="underline text-white font-bold">Child Support Calculator</a></div>`,
    faqs: [
      {
        question: "Is the SSR calculated on gross or net income?",
        answer: "Net income, the amount you actually take home after taxes, FICA, mandatory pension contributions, and other legally-allowed deductions under RCW 26.19.071. Gross income before deductions is not the relevant number for SSR calculations."
      },
      {
        question: "Can a judge ignore the SSR even if my income is below it?",
        answer: "The SSR is a presumptive floor under Washington law, meaning courts are required to apply it. However, judges have some discretion in edge cases, for instance, if the court has reason to believe you're underreporting income or are voluntarily underemployed."
      },
      {
        question: "Does the SSR apply to both parents?",
        answer: "The SSR specifically protects the obligor, the parent who is making payments. It's applied to that parent's net income to determine whether the calculated support amount leaves them with at least approximately $2,394."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOG 4
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: "Washington State Child Support Calculation Guide for 2026",
    slug: "child-support-calculation-washington-2026",
    category: "Calculation Guide",
    readTime: "13 min",
    excerpt: "A complete, step-by-step walkthrough of exactly how Washington State calculates child support in 2026, with a worked example using real numbers from start to finish.",
    metaTitle: "2026 Washington Child Support Calculation | Step-by-Step Guide",
    metaDescription: "Learn exactly how child support is calculated in Washington State in 2026. Includes a complete worked example: gross income, deductions, proportional shares, and extraordinary expenses.",
    author: "WCSSC Editorial Team",
    createdAt: "2026-04-08",
    updatedAt: "2026-04-09",
    featured: false,
    image: { url: "/img/calculation_guide.png", alt: "Washington State Child Support Calculation Guide 2026", width: 1200, height: 630 },
    content: `
      <div class="card card-brand mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 !text-brand list-disc ml-6 mt-2">
          <li>Washington uses the Income Shares Model, both parents' incomes matter</li>
          <li>Only specific deductions reduce gross income; personal debt doesn't count</li>
          <li>Combined income up to $50,000/month is covered by the standard 2026 table</li>
          <li>Daycare and healthcare are added <em>on top of</em> the base obligation, split proportionally</li>
          <li>Run a complete calculation using our <a href="/worksheet">Worksheet Wizard</a></li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This guide explains Washington State's 2026 child support calculation methodology for educational purposes. It is not legal advice.</p>

      <p class="mb-4">Ask most people how child support is calculated and you'll get a shrug or a vague answer about "following a formula." The truth is, there's a very specific, legally-mandated process that Washington courts follow, and once you understand it, a lot of the confusion and anxiety around child support goes away.</p>

      <div class='table-wrapper my-6'><table><thead><tr><th>Calculation Metric</th><th>2026 Value</th></tr></thead><tbody><tr><td>Self Support Reserve</td><td class='font-bold text-brand'>approximately $2,394</td></tr><tr class='bg-surface-subtle'><td>Economic Table Limit</td><td class='font-bold text-brand'>$50,000</td></tr><tr><td>Minimum Support</td><td class='font-bold text-brand'>$50 per child</td></tr></tbody></table></div><p class="mb-4">This guide walks through the entire calculation from beginning to end, with a real worked example so you can follow along with your own numbers.</p>

       <h2 class="mt-12 mb-6">The Foundation: Washington's Income Shares Model</h2>
      <p class="mb-4">Washington operates on the <strong>Income Shares Model</strong>. The philosophical core of this model is that children should receive the same percentage of parental income they would have received if their parents had stayed together.</p>

      <p class="mb-4">In practical terms, this means Washington doesn't just look at what the non-custodial parent earns. It looks at <em>both</em> parents' incomes, combines them, determines what percentage each parent contributes, and then makes each parent responsible for that same percentage of the children's total costs.</p>

      <div class='table-wrapper my-6'><table><thead><tr><th>Calculation Phase</th><th>Description</th></tr></thead><tbody><tr><td>Combined Net Income</td><td>Both parents' incomes minus allowed deductions</td></tr><tr class='bg-surface-subtle'><td>Extraordinary Expenses</td><td>Daycare and health insurance added proportionally</td></tr></tbody></table></div> <h2 class="mt-12 mb-6">Step 1: Determine Each Parent's Gross Monthly Income</h2>
      <p class="mb-4">Washington defines gross income broadly. It includes virtually everything you receive:</p>
       <ul class="list-disc pl-6 space-y-4 mb-8">
        <li>Wages, salaries, commissions, and tips</li>
        <li>Overtime (averaged over a 12-month period)</li>
        <li>Self-employment income (net of legitimate business expenses)</li>
        <li>Rental income</li>
        <li>Unemployment compensation</li>
        <li>Disability and workers' compensation benefits</li>
      </ul>

       <h2 class="mt-12 mb-6">Step 2: Calculate Monthly Net Income</h2>
      <p class="mb-4">From gross income, you subtract only the legally-permitted deductions under <strong>RCW 26.19.071</strong>:</p>
       <ul class="list-disc pl-6 space-y-4 mb-8">
        <li>Federal income taxes based on actual filing status</li>
        <li>FICA taxes (Social Security 6.2% + Medicare 1.45%)</li>
        <li>Mandatory pension or retirement contributions</li>
        <li>Union dues actually paid</li>
        <li>Health and dental insurance premiums paid for the <em>children</em></li>
      </ul>

       <h2 class="mt-12 mb-6">Step 3: Look Up the Basic Support Obligation</h2>
      <p class="mb-4">Once you have both parents' monthly net incomes, add them together. Then look up the corresponding amount in the 2026 Washington Child Support Economic Table based on the number of children.</p>

       <h2 class="mt-12 mb-6">Step 4: Calculate Each Parent's Proportional Share</h2>
      <p class="mb-4">Now divide. If Parent A earns $4,500 net and Parent B earns $2,500 net, combined is $7,000. Parent A's share is 64.3%. Parent B's share is 35.7%.</p>

       <h2 class="mt-12 mb-6">Step 5: Add Extraordinary Expenses</h2>
      <p class="mb-4">The basic obligation covers only food, ordinary clothing, and shelter. Everything else (daycare, healthcare premiums) is calculated separately and split proportionally.</p>

       <h2 class="mt-12 mb-6">Conclusion</h2>
      <p class="mb-4">The calculation process is actually quite logical once you see it laid out step by step. Run your specific numbers through our <a href="/">quick calculator</a> now, then use the <a href="/worksheet">Professional Wizard</a> to generate the complete worksheet.</p>
    <div class="mt-8 mb-8 card section-subtle"><h3 class="font-bold text-text-primary mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class="font-bold text-brand hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><a href="/income-5000-2-children" class="font-bold text-brand hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class="font-bold text-brand hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class="font-bold text-brand hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-xs  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="mt-6 calc-result"><strong>👉 Calculate Your Exact Child Support</strong><br/>Use our <a href="/worksheet" class="underline text-white font-bold">Child Support Calculator</a></div>`,
    faqs: [
      {
        question: "When does child support end in Washington State?",
        answer: "Generally, child support ends when the child turns 18 OR graduates high school, whichever is later, but no later than age 19."
      },
      {
        question: "Does my new partner's income affect my child support?",
        answer: "Generally no. Washington does not include a new spouse's or domestic partner's income in the core calculation."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOG 5
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: "Minimum Child Support in Washington State: The Low-Income Parent Guide",
    slug: "minimum-child-support-washington-low-income",
    category: "Policy Update",
    readTime: "11 min",
    excerpt: "If your income is low or you've lost your job, here's what Washington law actually requires, including the $50 minimum, the SSR protection, imputed income risks, and how to get a legitimate reduction.",
    metaTitle: "Minimum Child Support in WA | Low-Income Parent Guide 2026",
    metaDescription: "Struggling to afford child support in Washington State? Learn how minimum orders work, the approximately $2,394 SSR limit, imputed income rules, and the right way to petition for a reduction.",
    author: "WCSSC Editorial Team",
    createdAt: "2026-04-09",
    updatedAt: "2026-04-09",
    featured: false,
    image: { url: "/img/low_income_guide.png", alt: "Minimum Child Support Low Income Washington State Guide", width: 1200, height: 630 },
    content: `
      <div class="card card-brand mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 !text-brand list-disc ml-6 mt-2">
          <li>The presumptive minimum is <strong>$50 per child per month</strong></li>
          <li>The 2026 SSR (approximately $2,394) legally requires a downward deviation</li>
          <li>Arrears cannot be waived retroactively, file modification petitions immediately</li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This guide is for educational purposes. Consult a licensed Washington family law attorney for advice specific to your case.</p>

       <h2 class="mt-12 mb-6">1. The Absolute Minimum: $50 Per Child Per Month</h2>
      <p class="mb-4">Washington law establishes a <strong>presumptive minimum of $50 per child per month</strong> under RCW 26.19.065. This is the floor beneath which no court-ordered support obligation can go in normal circumstances.</p>

       <h2 class="mt-12 mb-6">2. How the SSR Forces a Reduction</h2>
      <p class="mb-4">The <strong>Self-Support Reserve of approximately $2,394/month</strong> is what makes the $50 minimum relevant. If the calculated support amount would leave the paying parent with less than approximately $2,394, the obligation must be reduced.</p>

       <h2 class="mt-12 mb-6">3. The Danger of Quitting Your Job: Imputed Income</h2>
      <p class="mb-4">Under <strong>RCW 26.19.071(6)</strong>, if the court determines a parent is <strong>voluntarily underemployed</strong>, the court can "impute" income at the level the parent could reasonably earn.</p>

       <h2 class="mt-12 mb-6">Final Thoughts</h2>
      <p class="mb-4">Washington has built meaningful protections for parents who genuinely can't afford full support obligations. Run your numbers through the <a href="/">quick calculator</a> now to see if the SSR might apply to you.</p>
    <div class="mt-8 mb-8 card section-subtle"><h3 class="font-bold text-text-primary mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class="font-bold text-brand hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><a href="/income-5000-2-children" class="font-bold text-brand hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class="font-bold text-brand hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class="font-bold text-brand hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-xs  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="mt-6 calc-result"><strong>👉 Calculate Your Exact Child Support</strong><br/>Use our <a href="/worksheet" class="underline text-white font-bold">Child Support Calculator</a></div>`,
    faqs: [
      {
        question: "Can I go to jail if I genuinely can't afford child support?",
        answer: "Not for simple inability to pay. Washington courts distinguish between parents who can't pay and parents who willfully refuse to pay."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOG 6
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: "King County Child Support Rules: 2026 Local Guidelines Explained",
    slug: "king-county-child-support-rules",
    category: "County Guide",
    readTime: "11 min",
    excerpt: "King County has specific local family law rules that supplement state law, and ignoring them can derail your case. Here's what you need to know about LFLR 10, financial declarations, and high-income Seattle cases.",
    metaTitle: "King County Child Support Rules | 2026 Local Guidelines Explained",
    metaDescription: "Navigating family law in Seattle or Kent? Learn the King County child support local rules, LFLR 10 requirements, financial declarations, and how high-income cases differ in 2026.",
    author: "WCSSC Editorial Team",
    createdAt: "2026-04-09",
    updatedAt: "2026-04-09",
    featured: false,
    image: { url: "/img/king_county_rules.png", alt: "King County Child Support Rules and Local Guidelines 2026", width: 1200, height: 630 },
    content: `
      <div class="card card-brand mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 !text-brand list-disc ml-6 mt-2">
          <li>LFLR 10 requires comprehensive financial declarations, more detailed than state forms</li>
          <li>Seattle vs. Kent courthouse routing depends on the responding parent's ZIP code</li>
          <li>Tech worker income (RSUs, bonuses, stock options) is treated as gross income</li>
          <li>Seattle daycare often exceeds $2,000/month, split proportionally</li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This guide covers King County local family law rules as of 2026. Consult a licensed Washington family law attorney for guidance specific to your case.</p>

       <h2 class="mt-12 mb-6">1. LFLR 10: Washington's Most Demanding Financial Disclosure</h2>
      <p class="mb-4">Under <strong>Local Family Law Rule 10 (LFLR 10)</strong>, every party in a King County family law case must file a comprehensive Financial Declaration with mandatory attachments (tax returns, pay stubs, bank statements).</p>

       <h2 class="mt-12 mb-6">2. Seattle vs. Kent: Knowing Your Courthouse</h2>
      <p class="mb-4">King County's two family court locations handle different geographic zones. Routing is based on the <strong>responding party's</strong> ZIP code.</p>

       <h2 class="mt-12 mb-6">3. High-Income Cases</h2>
      <p class="mb-4">King County family courts routinely deal with tech worker income. RSUs and bonuses are generally included in the gross income calculation.</p>

       <h2 class="mt-12 mb-6">Conclusion</h2>
      <p class="mb-4">King County doesn't cut corners on financial disclosure. Get your documentation together and run your numbers through the <a href="/worksheet">Worksheet Wizard</a> today.</p>
    <div class="mt-8 mb-8 card section-subtle"><h3 class="font-bold text-text-primary mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class="font-bold text-brand hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><a href="/income-5000-2-children" class="font-bold text-brand hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class="font-bold text-brand hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class="font-bold text-brand hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-xs  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="mt-6 calc-result"><strong>👉 Calculate Your Exact Child Support</strong><br/>Use our <a href="/worksheet" class="underline text-white font-bold">Child Support Calculator</a></div>`,
    faqs: [
      {
        question: "Can I request a deviation because the cost of living in Seattle is high?",
        answer: "Generally, no. The statewide economic table is applied uniformly across all 39 counties."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOG 7
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: "What Happens If Child Support Is Not Paid in Washington State?",
    slug: "what-happens-if-child-support-is-not-paid-washington",
    category: "Legal Guide",
    readTime: "12 min",
    excerpt: "Missing child support payments in Washington triggers a cascade of serious enforcement actions, from wage garnishment to license suspension and contempt of court.",
    metaTitle: "Unpaid Child Support in WA | 2026 Penalties & Enforcement Guide",
    metaDescription: "What happens if child support is not paid in Washington State? Learn about wage garnishment, 12% interest on arrears, license suspension, and passport denial.",
    author: "WCSSC Editorial Team",
    createdAt: "2026-04-09",
    updatedAt: "2026-04-09",
    featured: false,
    image: { url: "/wcssc-og.webp", alt: "Consequences of Unpaid Child Support in Washington State", width: 1200, height: 630 },
    content: `
      <div class="card card-brand mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 !text-brand list-disc ml-6 mt-2">
          <li>Income withholding order sent to your employer</li>
          <li>12% annual interest accrues on arrears</li>
          <li>Driver's and professional license suspension</li>
          <li>Federal tax refunds are automatically intercepted</li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This guide explains Washington State enforcement mechanisms for educational purposes. Consult a licensed WA family law attorney if you are facing enforcement actions.</p>

       <h2 class="mt-12 mb-6">1. Income Withholding Orders (IWOs)</h2>
      <p class="mb-4">DCS can send an Income Withholding Order directly to your employer, requiring them to deduct support from your paycheck.</p>

       <h2 class="mt-12 mb-6">2. 12% Annual Interest on Arrears</h2>
      <p class="mb-4">Washington charges 12% simple annual interest on unpaid child support. These debts have <strong>no statute of limitations</strong> in Washington.</p>

       <h2 class="mt-12 mb-6">Conclusion</h2>
      <p class="mb-4">Washington's enforcement system is designed to make avoidance expensive. If you can't pay, file a modification petition immediately. Don't wait.</p>
    <div class="mt-8 mb-8 card section-subtle"><h3 class="font-bold text-text-primary mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class="font-bold text-brand hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><a href="/income-5000-2-children" class="font-bold text-brand hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class="font-bold text-brand hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class="font-bold text-brand hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-xs  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="mt-6 calc-result"><strong>👉 Calculate Your Exact Child Support</strong><br/>Use our <a href="/worksheet" class="underline text-white font-bold">Child Support Calculator</a></div>`,
    faqs: [
      {
        question: "Can I deny visitation because they're not paying?",
        answer: "No. Under Washington law, child support and parenting time are separate legal issues."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOG 8
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: "How Courts Decide Child Support in Washington State",
    slug: "how-courts-decide-child-support-washington",
    category: "Legal Guide",
    readTime: "12 min",
    excerpt: "What actually happens when a Washington judge or commissioner decides your child support order, from the mandatory worksheet process to how income is verified.",
    metaTitle: "How Courts Decide Child Support in Washington | A 2026 Legal Guide",
    metaDescription: "Curious how courts decide child support in Washington State? Learn how commissioners use the Income Shares Model, verify income, and handle extraordinary expenses.",
    author: "WCSSC Editorial Team",
    createdAt: "2026-04-09",
    updatedAt: "2026-04-09",
    featured: false,
    image: { url: "/wcssc-og.webp", alt: "How Washington State Courts Decide Child Support Orders", width: 1200, height: 630 },
    content: `
      <div class="card card-brand mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 !text-brand list-disc ml-6 mt-2">
          <li>Most cases are decided by commissioners, not judges</li>
          <li>Courts are required by law to complete worksheets for every case</li>
          <li>Income disputes are resolved with documented evidence (tax returns, pay stubs)</li>
          <li>Deviations require documented "good cause" written findings</li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This article describes WA child support court proceedings for educational purposes. Consult a licensed WA family law attorney for guidance on your case.</p>

       <h2 class="mt-12 mb-6">1. Commissioner or Judge?</h2>
      <p class="mb-4">In Washington, most child support hearings are handled by <strong>Court Commissioners</strong>. Disagreements can be reviewed by a judge via a Motion for Revision within 10 days.</p>

       <h2 class="mt-12 mb-6">2. The Mandatory Worksheet Process</h2>
      <p class="mb-4">Washington law requires every court to use the standard economic table and complete the official child support worksheets before entering any order.</p>

       <h2 class="mt-12 mb-6">Conclusion</h2>
      <p class="mb-4">Washington courts follow a rigid, legally-mandated process. Run your numbers through the <a href="/worksheet">Worksheet Wizard</a> to be prepared for your hearing.</p>
    <div class="mt-8 mb-8 card section-subtle"><h3 class="font-bold text-text-primary mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class="font-bold text-brand hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><a href="/income-5000-2-children" class="font-bold text-brand hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class="font-bold text-brand hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class="font-bold text-brand hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-xs  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="mt-6 calc-result"><strong>👉 Calculate Your Exact Child Support</strong><br/>Use our <a href="/worksheet" class="underline text-white font-bold">Child Support Calculator</a></div>`,
    faqs: [
      {
        question: "Can both parents agree to zero support?",
        answer: "Courts are generally resistant to $0 support orders. A judge may approve it only if income levels are genuinely identical and expenses are perfectly balanced."
      }
    ]
  }
];
