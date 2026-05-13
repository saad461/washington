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
  keywords?: string;
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
    metaTitle: "WA Child Support Guidelines 2026 - Handbook | WSCSS",
    metaDescription: "Everything you need to know about Washington's 2026 child support schedule including what changed, how the economic tables work, and what to expect in court.",
    author: "WSCSS Editorial Team",
    createdAt: "2026-04-09",
    updatedAt: "2026-04-09",
    featured: true,
    image: { url: "/img/wa_guidelines_2026.webp", alt: "2026 Washington State Child Support Guidelines Handbook", width: 1200, height: 630 },
    content: `
      <div class="bg-[var(--color-brand-primary-light)] p-4 rounded-xl mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 text-indigo-800 list-disc ml-6 mt-2">
          <li>The 2026 economic table increased by approximately 4.2% across most income brackets</li>
          <li>The Self-Support Reserve (SSR) is firmly set at <strong>$2,394 per month</strong></li>
          <li>Combined income table now covers up to $50,000/month before judicial extrapolation</li>
          <li>The 45% net income cap still hard-limits total child support obligations</li>
          <li>Shared parenting time (50/50) can trigger a deviation, but it's not automatic</li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This guide is based on Washington State's 2026 guidelines. It provides educational estimates, not legal advice. Consult a licensed WA family law attorney for your specific situation.</p>

      <p class="mb-4">If you've recently been served with child support paperwork, or you're the one filing, you're probably staring at a bunch of legal jargon wondering how anyone is supposed to make sense of this. You're not alone. Every January, Washington State updates its child support schedule, and 2026 brought some meaningful changes that affect tens of thousands of families across the state.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-brand-primary-light)] border-y border-[var(--color-brand-primary-mid)]'><th class='py-3 px-4 text-sm font-medium '>Factor</th><th class='py-3 px-4 text-sm font-medium '>Value (2026)</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Self Support Reserve</td><td class='py-3 px-4 text-sm font-medium '>$2,394</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>Economic Table Limit</td><td class='py-3 px-4 text-sm font-medium '>$50,000</td></tr><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Minimum Support</td><td class='py-3 px-4 text-sm font-medium '>$50 per child per month</td></tr></tbody></table></div><p class="mb-4">This guide walks you through everything that matters: what actually changed in 2026, how the math works, what the courts are required to do, and where you have room to push back. We'll talk about real numbers, real situations, and what to realistically expect when you walk into a King County courtroom or log into Pierce County's e-filing system.</p>

       <h2 class="mt-12 mb-6">What Actually Changed in January 2026</h2>
      <p class="mb-4">Washington's child support schedule is reviewed on a staggered cycle, and January 1, 2026 brought a revision that affected several key numbers. The most important changes:</p>

       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><strong>The economic table increased by roughly 4.2%</strong> across most combined income tiers. That means if you had a $600/month obligation in 2024, it might be closer to $625 now. The adjustment reflects updated cost-of-living data and the rising cost of raising children in Washington.</li>
        <li><strong>The Self-Support Reserve rose to $2,394/month.</strong> This is the minimum the paying parent must be left with after paying child support. It went up from the prior year, providing slightly more protection for lower-income obligors.</li>
        <li><strong>The income table now natively covers up to $50,000 in combined monthly net income</strong> before judges have to start improvising. Previously this was capped lower, and high-earner cases required more judicial discretion at earlier thresholds.</li>
        <li><strong>The 45% net income cap remains unchanged.</strong> Your total child support obligation, base payment plus all split extraordinary expenses, cannot exceed 45% of your adjusted net monthly income without the court making a specific "good cause" finding.</li>
      </ul>

      <p class="mb-4">To verify any of these figures directly, you can visit the <a href="https://www.dshs.wa.gov/esa/division-child-support" target="_blank" rel="nofollow">Washington State DSHS Division of Child Support</a> or the <a href="https://www.courts.wa.gov/" target="_blank" rel="nofollow">Washington Courts website</a>, which publishes the official economic tables.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-warning-bg)] border-y border-[var(--color-warning-border)]'><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Category</th><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Details in 2026</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Standard Table Limit</td><td class='py-3 px-4 text-sm font-medium '>$50,000 Combined Monthly Net</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>Max Obligation</td><td class='py-3 px-4 text-sm font-medium '>45% of Net Income</td></tr></tbody></table></div> <h2 class="mt-12 mb-6">The Income Shares Model, How Washington Actually Calculates Support</h2>
      <p class="mb-4">Washington uses what's called the <strong>Income Shares Model</strong>, and the core idea behind it is actually pretty fair: children should receive the same proportion of their parents' income that they would have gotten if the family had stayed together.</p>

      <p class="mb-4">So instead of just looking at what the non-custodial parent earns, Washington combines <em>both</em> parents' monthly net incomes into a single pool, looks up a basic support obligation from the economic table, and then splits that obligation between the parents proportionally. If you earn 60% of the combined income, you're responsible for 60% of the obligation.</p>

      <p class="mb-4">Here's what that looks like in practice. Let's say Parent A nets $4,500 per month after taxes and mandatory deductions, and Parent B nets $2,500. Their combined income is $7,000. For two children at $7,000 combined income, the 2026 economic table would show a basic support obligation of $1,450 per month. Parent A, who earns 64% of the total, would be responsible for about $928. Parent B would be responsible for $522. The parent who has the children less of the time pays their share as a transfer payment to the other parent.</p>

      <p class="mb-4">Want to check your own numbers? Use our <a href="/">Washington child support calculator</a> to run the estimate instantly, or the <a href="/worksheet">Professional Worksheet Wizard</a> for the full 8-part breakdown.</p>

       <h2 class="mt-12 mb-6">1. Seattle or Kent? Which Courthouse Handles Your Case</h2>
      <p class="mb-4">King County's Superior Court operates across two main locations, and routing is determined by <strong>where the responding parent lives</strong> (typically the non-custodial parent), not where you live.</p>

       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><strong>King County Courthouse, Seattle:</strong> 516 Third Avenue, Seattle, WA 98104. This handles cases in north and central King County, including Seattle, Bellevue, Kirkland, Redmond, Mercer Island, and Renton.</li>
        <li><strong>Maleng Regional Justice Center, Kent:</strong> 401 Fourth Avenue North, Kent, WA 98032. This handles south King County: Auburn, Federal Way, Kent, Enumclaw, Black Diamond, and similar areas.</li>
      </ul>

      <p class="mb-4">If you're unsure which venue applies to your case, call the King County Superior Court Clerk at (206) 477-0400 or check the <a href="https://kingcounty.gov/courts/superior-court.aspx" target="_blank" rel="nofollow">King County Superior Court website</a>. Getting this wrong means your case gets transferred, which adds weeks to your timeline.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-warning-bg)] border-y border-[var(--color-warning-border)]'><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>King County Court</th><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Location</th><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Handles</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Seattle Courthouse</td><td class='py-3 px-4 text-sm font-medium '>516 Third Ave</td><td class='py-3 px-4 text-sm font-medium '>North/Central King County</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>Maleng Regional Justice Center</td><td class='py-3 px-4 text-sm font-medium '>401 Fourth Ave N, Kent</td><td class='py-3 px-4 text-sm font-medium '>South King County</td></tr></tbody></table></div> <h2 class="mt-12 mb-6">2. The Forms You'll Need</h2>
      <p class="mb-4">Washington uses a standardized set of family law forms called the <strong>FL All Family series</strong>, most of which are free to download from the Washington Courts website. For a standard child support petition, you'll typically need:</p>

       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><strong>FL All Family 130</strong>, Petition for Child Support (the main filing document)</li>
        <li><strong>FL All Family 131</strong>, Child Support Order (what the court signs)</li>
        <li><strong>FL All Family 132</strong>, Child Support Worksheets (the income calculations, our <a href="/worksheet">Worksheet Wizard</a> generates this automatically)</li>
        <li><strong>FL All Family 101</strong>, Summons (notifies the other parent)</li>
        <li><strong>King County Case Assignment Designation</strong>, a local form that routes your case to Seattle or Kent (find it on the King County court website)</li>
      </ul>

      <p class="mb-4">If you're modifying an existing order rather than creating a new one, you'll use FL All Family 422 (Petition to Modify Child Support) and updated Worksheets. Make sure you're using the 2026 versions, forms are updated periodically and using an outdated version can cause your filing to be rejected.</p>

       <h2 class="mt-12 mb-6">3. Calculating and Filing Your Support Worksheets</h2>
      <p class="mb-4">The most common reason filings get sent back or delayed is incomplete or incorrect support worksheets. King County commissioners see hundreds of these and have little patience for math errors or missing income documentation.</p>

      <p class="mb-4">Before you file, gather: your last two months of pay stubs, your most recent federal tax return (both forms W-2 and 1040), documentation of any self-employment income, proof of health insurance costs for the children, and any childcare invoices. The other parent's income information will eventually need to be exchanged through discovery if they don't voluntarily disclose it.</p>

      <p class="mb-4">Use our <a href="/worksheet">Professional Worksheet Wizard</a> to generate properly formatted support worksheets that match what King County courts expect. Print the output, sign it, and attach it to your petition.</p>

       <h2 class="mt-12 mb-6">4. Filing at the Clerk's Office (or E-Filing)</h2>
      <p class="mb-4">King County strongly encourages e-filing through the Washington Courts TurboCourt system. You can file 24 hours a day from home, pay filing fees by credit card, and get a confirmation immediately. The standard filing fee for a new family law case is <strong>$314</strong>, though this may be waived if you qualify for an In Forma Pauperis (IFP) fee waiver based on low income.</p>

      <p class="mb-4">If you're filing in person, document windows at the Seattle courthouse are open Monday–Friday from 8:30 AM to 4:30 PM. Arrive early, the clerk's office can get backed up, and if you arrive after 4:00 PM they may not process same-day.</p>

       <h2 class="mt-12 mb-6">5. Serving the Other Parent</h2>
      <p class="mb-4">After you file, you must legally notify ("serve") the other parent. In King County, the most common methods are:</p>
       <ul class="list-disc pl-6 space-y-6 mb-8">
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

      <p class="mb-4">For contested cases, your first court date is typically a scheduling conference or an Order to Show Cause hearing. The commissioner will set deadlines for financial disclosure, issue temporary orders (which take effect immediately), and schedule a follow-up hearing if needed. <strong>Temporary orders are critical</strong>, they're the support amount that applies from the day they're issued until the final order, so getting them calculated correctly matters immediately.</p>

       <h2 class="mt-12 mb-6">8. Modifying an Existing King County Order</h2>
      <p class="mb-4">If you have an older support order and your income has changed by more than 15% under RCW 26.09.170, or two full years have passed, you can petition for a modification. The process is similar to the original filing but uses the FL 422 family of forms. If your combined income is now around <a href="/king-county-income-7000-2-children">$7,000/month</a>, run a new estimate first so you know whether a modification is worth pursuing.</p>

       <h2 class="mt-12 mb-6">Related Reading</h2>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><a href="/blog/king-county-child-support-rules">King County Child Support Local Rules: The LFLR 10 Deep Dive</a></li>
        <li><a href="/blog/washington-child-support-guidelines-2026">2026 WA State Guidelines: Complete Handbook</a></li>
        <li><a href="/blog/child-support-calculation-washington-2026">WA Child Support Calculation: Step-by-Step Guide</a></li>
      </ul>

       <h2 class="mt-12 mb-6">Wrapping Up</h2>
      <p class="mb-4">Filing for child support in King County takes preparation, correct paperwork, and a clear understanding of which building your case belongs in. The process isn't fast, but going in with complete, accurate worksheets and the right forms significantly reduces delays. Take 10 minutes with our <a href="/">calculator</a> now, that one step costs nothing, but it might save you from the most common mistakes families make in King County court.</p>
    <div class="mt-8 mb-8 p-6 bg-[var(--color-bg-subtle)] rounded-2xl border border-[var(--color-bg-border-soft)]"><h3 class="font-semibold text-[var(--color-text-body)] mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class=" hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><!-- TODO: restore when /income-5000-2-children page is created --><a href="/king-county-income-5000-2-children" class=" hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class=" hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class=" hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-sm  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">  <div>    <p class="font-semibold text-gray-900 text-base mb-1">      Calculate Your Exact Child Support    </p>    <p class="text-sm text-gray-500">      Free · 2026 RCW 26.19 Guidelines · All 39 Washington Counties    </p>  </div>  <a href="/worksheet"    class="btn btn-primary whitespace-nowrap">    Start Calculation →  </a></div>`,
    faqs: [
      {
        question: "When did the 2026 Washington child support tables take effect?",
        answer: "The updated 2026 economic tables became effective January 1, 2026, following the biennial legislative review. They reflect updated cost-of-living data and increased the SSR to $2,394/month."
      },
      {
        question: "What is the maximum combined income covered by the standard table?",
        answer: "The 2026 table covers combined monthly net income up to $50,000. Above that threshold, courts use 'extrapolative discretion', analyzing actual lifestyle, spending history, and specific needs rather than a published table figure."
      },
      {
        question: "Can I modify my child support order if I lose my job or get a significant raise?",
        answer: "Yes. Either parent can petition for modification when there's a 'substantial change in circumstances', typically a sustained income change of 15% or more under RCW 26.09.170, or when two full years have passed. The change generally must be long-term, not temporary. File your petition as fast as possible; arrears accrued before you file cannot be retroactively waived."
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
    metaTitle: "Filing Child Support in King County 2026 | WSCSS",
    metaDescription: "Step-by-step guide to filing a child support petition in King County including which courthouse handles your case and what happens at your first hearing.",
    author: "WSCSS Editorial Team",
    createdAt: "2026-04-28",
    updatedAt: "2026-04-28",
    featured: false,
    image: { url: "/img/king_county_guide.webp", alt: "Filing Child Support in King County Washington State", width: 1200, height: 630 },
    content: `
      <div class="bg-[var(--color-brand-primary-light)] p-4 rounded-xl mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 text-indigo-800 list-disc ml-6 mt-2">
          <li>Your case goes to Seattle OR Kent courthouse, determined by your residential ZIP code</li>
          <li>Washington's FL All Family form series handles all standard child support filings</li>
          <li>E-filing is available 24/7 and strongly recommended for efficiency</li>
          <li>If you receive public assistance, the Prosecuting Attorney's office may assist for free</li>
          <li>Uncontested cases typically resolve in 4–6 weeks; contested cases can take 3–6 months</li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This is a procedural guide based on 2026 King County local rules. It is not legal advice. For complex situations, consult a licensed Washington family law attorney.</p>

      <p class="mb-4">King County is Washington's largest judicial district, and its family court system is busy. If you've never navigated it before, knowing exactly what to expect, which building to go to, which forms to fill out, what the clerk will ask for, saves enormous time and frustration. Let's walk through it step by step.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-brand-primary-light)] border-y border-[var(--color-brand-primary-mid)]'><th class='py-3 px-4 text-sm font-medium '>Item</th><th class='py-3 px-4 text-sm font-medium '>Current Washington Standard</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Self Support Reserve</td><td class='py-3 px-4 text-sm font-medium '>$2,394</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>Economic Table Limit</td><td class='py-3 px-4 text-sm font-medium '>$50,000</td></tr><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Minimum Support</td><td class='py-3 px-4 text-sm font-medium '>$50 per child per month</td></tr></tbody></table></div><p class="mb-4">First, before you even think about the courthouse: run your estimated support amount through our <a href="/king-county-income-5000-2-children">King County child support calculator</a>. Walking into court with a realistic figure in hand puts you in a genuinely stronger position at every stage of this process.</p>

       <h2 class="mt-12 mb-6">1. Seattle or Kent? Which Courthouse Handles Your Case</h2>
      <p class="mb-4">King County's Superior Court operates across two main locations, and routing is determined by <strong>where the responding parent lives</strong> (typically the non-custodial parent), not where you live.</p>

       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><strong>King County Courthouse, Seattle:</strong> 516 Third Avenue, Seattle, WA 98104. This handles cases in north and central King County, including Seattle, Bellevue, Kirkland, Redmond, Mercer Island, and Renton.</li>
        <li><strong>Maleng Regional Justice Center, Kent:</strong> 401 Fourth Avenue North, Kent, WA 98032. This handles south King County: Auburn, Federal Way, Kent, Enumclaw, Black Diamond, and similar areas.</li>
      </ul>

      <p class="mb-4">If you're unsure which venue applies to your case, call the King County Superior Court Clerk at (206) 477-0400 or check the <a href="https://kingcounty.gov/courts/superior-court.aspx" target="_blank" rel="nofollow">King County Superior Court website</a>. Getting this wrong means your case gets transferred, which adds weeks to your timeline.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-warning-bg)] border-y border-[var(--color-warning-border)]'><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>King County Court</th><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Location</th><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Handles</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Seattle Courthouse</td><td class='py-3 px-4 text-sm font-medium '>516 Third Ave</td><td class='py-3 px-4 text-sm font-medium '>North/Central King County</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>Maleng Regional Justice Center</td><td class='py-3 px-4 text-sm font-medium '>401 Fourth Ave N, Kent</td><td class='py-3 px-4 text-sm font-medium '>South King County</td></tr></tbody></table></div> <h2 class="mt-12 mb-6">2. The Forms You'll Need</h2>
      <p class="mb-4">Washington uses a standardized set of family law forms called the <strong>FL All Family series</strong>, most of which are free to download from the Washington Courts website. For a standard child support petition, you'll typically need:</p>

       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><strong>FL All Family 130</strong>, Petition for Child Support (the main filing document)</li>
        <li><strong>FL All Family 131</strong>, Child Support Order (what the court signs)</li>
        <li><strong>FL All Family 132</strong>, Child Support Worksheets (the income calculations, our <a href="/worksheet">Worksheet Wizard</a> generates this automatically)</li>
        <li><strong>FL All Family 101</strong>, Summons (notifies the other parent)</li>
        <li><strong>King County Case Assignment Designation</strong>, a local form that routes your case to Seattle or Kent (find it on the King County court website)</li>
      </ul>

      <p class="mb-4">If you're modifying an existing order rather than creating a new one, you'll use FL All Family 422 (Petition to Modify Child Support) and updated Worksheets. Make sure you're using the 2026 versions, forms are updated periodically and using an outdated version can cause your filing to be rejected.</p>

       <h2 class="mt-12 mb-6">3. Calculating and Filing Your Support Worksheets</h2>
      <p class="mb-4">The most common reason filings get sent back or delayed is incomplete or incorrect support worksheets. King County commissioners see hundreds of these and have little patience for math errors or missing income documentation.</p>

      <p class="mb-4">Before you file, gather: your last two months of pay stubs, your most recent federal tax return (both forms W-2 and 1040), documentation of any self-employment income, proof of health insurance costs for the children, and any childcare invoices. The other parent's income information will eventually need to be exchanged through discovery if they don't voluntarily disclose it.</p>

      <p class="mb-4">Use our <a href="/worksheet">Professional Worksheet Wizard</a> to generate properly formatted support worksheets that match what King County courts expect. Print the output, sign it, and attach it to your petition.</p>

       <h2 class="mt-12 mb-6">4. Filing at the Clerk's Office (or E-Filing)</h2>
      <p class="mb-4">King County strongly encourages e-filing through the Washington Courts TurboCourt system. You can file 24 hours a day from home, pay filing fees by credit card, and get a confirmation immediately. The standard filing fee for a new family law case is <strong>$314</strong>, though this may be waived if you qualify for an In Forma Pauperis (IFP) fee waiver based on low income.</p>

      <p class="mb-4">If you're filing in person, document windows at the Seattle courthouse are open Monday–Friday from 8:30 AM to 4:30 PM. Arrive early, the clerk's office can get backed up, and if you arrive after 4:00 PM they may not process same-day.</p>

       <h2 class="mt-12 mb-6">5. Serving the Other Parent</h2>
      <p class="mb-4">After you file, you must legally notify ("serve") the other parent. In King County, the most common methods are:</p>
       <ul class="list-disc pl-6 space-y-6 mb-8">
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

      <p class="mb-4">For contested cases, your first court date is typically a scheduling conference or an Order to Show Cause hearing. The commissioner will set deadlines for financial disclosure, issue temporary orders (which take effect immediately), and schedule a follow-up hearing if needed. <strong>Temporary orders are critical</strong>, they're the support amount that applies from the day they're issued until the final order, so getting them calculated correctly matters immediately.</p>

       <h2 class="mt-12 mb-6">8. Modifying an Existing King County Order</h2>
      <p class="mb-4">If you have an older support order and your income has changed by more than 15% under RCW 26.09.170, or two full years have passed, you can petition for a modification. The process is similar to the original filing but uses the FL 422 family of forms. If your combined income is now around <a href="/king-county-income-7000-2-children">$7,000/month</a>, run a new estimate first so you know whether a modification is worth pursuing.</p>

       <h2 class="mt-12 mb-6">Related Reading</h2>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><a href="/blog/king-county-child-support-rules">King County Child Support Local Rules: The LFLR 10 Deep Dive</a></li>
        <li><a href="/blog/washington-child-support-guidelines-2026">2026 WA State Guidelines: Complete Handbook</a></li>
        <li><a href="/blog/child-support-calculation-washington-2026">WA Child Support Calculation: Step-by-Step Guide</a></li>
      </ul>

       <h2 class="mt-12 mb-6">Wrapping Up</h2>
      <p class="mb-4">Filing for child support in King County takes preparation, correct paperwork, and a clear understanding of which building your case belongs in. The process isn't fast, but going in with complete, accurate worksheets and the right forms significantly reduces delays. Take 10 minutes with our <a href="/">calculator</a> now, that one step costs nothing, but it might save you from the most common mistakes families make in King County court.</p>
    <div class="mt-8 mb-8 p-6 bg-[var(--color-bg-subtle)] rounded-2xl border border-[var(--color-bg-border-soft)]"><h3 class="font-semibold text-[var(--color-text-body)] mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class=" hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><!-- TODO: restore when /income-5000-2-children page is created --><a href="/king-county-income-5000-2-children" class=" hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class=" hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class=" hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-sm  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">  <div>    <p class="font-semibold text-gray-900 text-base mb-1">      Calculate Your Exact Child Support    </p>    <p class="text-sm text-gray-500">      Free · 2026 RCW 26.19 Guidelines · All 39 Washington Counties    </p>  </div>  <a href="/worksheet"    class="btn btn-primary whitespace-nowrap">    Start Calculation →  </a></div>`,
    faqs: [
      {
        question: "How long does it take to get a child support order in King County?",
        answer: "Uncontested cases, where both parents agree, often resolve in 4 to 6 weeks. Contested cases requiring a hearing can take 3 to 6 months depending on how backed up the court calendar is. Temporary orders are usually issued at the first hearing, so support payments begin relatively quickly even in contested situations."
      },
      {
        question: "What is the filing fee for child support in King County?",
        answer: "The standard filing fee for a new family law case is $314. If your income is below a certain threshold, you can apply for a fee waiver (In Forma Pauperis) by completing FL All Family 001. The clerk's office can give you the current waiver eligibility guidelines."
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
    title: "Understanding the $2,394 Self-Support Reserve (SSR) in 2026",
    slug: "washington-ssr-self-support-reserve-explained",
    category: "Calculation Guide",
    readTime: "10 min",
    excerpt: "A plain-English deep dive into the 2026 Self-Support Reserve, what it is, how the math actually works at different income levels, and what happens when your support obligation hits the floor.",
    metaTitle: "WA Self-Support Reserve $2,394 2026 | WSCSS",
    metaDescription: "The SSR in Washington is $2,394/month in 2026. Learn how it protects paying parents under RCW 26.19.065.",
    author: "WSCSS Editorial Team",
    createdAt: "2026-04-19",
    updatedAt: "2026-04-19",
    featured: false,
    image: { url: "/img/ssr_explained.webp", alt: "Washington State Self-Support Reserve SSR Explained 2026", width: 1200, height: 630 },
    content: `
      <div class="bg-[var(--color-brand-primary-light)] p-4 rounded-xl mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 text-indigo-800 list-disc ml-6 mt-2">
          <li>The 2026 SSR is set at <strong>$2,394 per month (net income)</strong></li>
          <li>The SSR applies to the <em>paying parent's</em> income only, not combined income</li>
          <li>When SSR kicks in, the obligation typically drops to the $50 per child per month</li>
          <li>The SSR works alongside (not instead of) the 45% income cap</li>
          <li>Verify the current SSR at <a href="https://www.dshs.wa.gov/esa/division-child-support" target="_blank" rel="nofollow">dshs.wa.gov</a></li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This article explains Washington State's 2026 SSR guidelines for educational purposes. For legal advice on your specific situation, consult a licensed WA family law attorney.</p>

      <p class="mb-4">If you're a low-income parent facing a child support order in Washington State, the Self-Support Reserve might be your most important legal protection, and one that a surprising number of people going through this process have never heard of.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-brand-primary-light)] border-y border-[var(--color-brand-primary-mid)]'><th class='py-3 px-4 text-sm font-medium '>Guideline Factor</th><th class='py-3 px-4 text-sm font-medium '>2026 Amount</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Self Support Reserve</td><td class='py-3 px-4 text-sm font-medium '>$2,394</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>Economic Table Limit</td><td class='py-3 px-4 text-sm font-medium '>$50,000</td></tr><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Minimum Support</td><td class='py-3 px-4 text-sm font-medium '>$50 per child per month</td></tr></tbody></table></div><p class="mb-4">In simple terms: Washington law says <em>you can't be forced into poverty to pay child support</em>. The SSR is the mechanism that enforces that principle. Set at <strong>$2,394 per month in 2026</strong>, it represents the absolute minimum income the paying parent must be left with after making their monthly payment. If the standard calculation would leave you with less than that, the court <em>must</em> reduce your obligation, often dramatically.</p>

       <h2 class="mt-12 mb-6">1. What Exactly Is the Self-Support Reserve?</h2>
      <p class="mb-4">The SSR is not an income threshold that determines whether you pay at all. It's a floor that limits <em>how much</em> you pay. It's calculated based on your individual net monthly income, the amount you actually take home after taxes, FICA, mandatory deductions, and any other legally-allowable subtractions under RCW 26.19.</p>

      <p class="mb-4">Think of it as a test the court runs on every order: <em>"After this parent pays child support, will they have at least $2,394 left to survive on?"</em> If the answer is no, the court cannot approve the standard calculated amount. It has to reduce the payment until the parent retains $2,394, or cap it at the $50 per child per month statutory minimum.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-warning-bg)] border-y border-[var(--color-warning-border)]'><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Monthly Net Income</th><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Support Order Impact</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Below $2,394</td><td class='py-3 px-4 text-sm font-medium '>Reduction applied (often to $50 per child per month)</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>$2,394 - $2,500</td><td class='py-3 px-4 text-sm font-medium '>Standard obligation, unless 45% cap hits</td></tr></tbody></table></div> <h2 class="mt-12 mb-6">2. Real Math: Three Income Scenarios</h2>
      <p class="mb-4">Let's look at how the SSR actually plays out at three different income levels for a parent supporting one child:</p>

       <h3 class="mt-8 mb-4">Scenario A: $1,800/month net income</h3>
      <p class="mb-4">Suppose the income shares calculation generates a standard support obligation of $450/month. But $1,800 minus $450 = $1,350, which is below the $2,394 SSR. In this case, the court would reduce the obligation. Since $1,800 - $2,394 = $286 remaining "room", less than the standard obligation, the order would likely be reduced to $286, or down to the $50 per child per month if even that leaves insufficient funds. The court has discretion in exactly where to land, but the SSR floor is mandatory.</p>

       <h3 class="mt-8 mb-4">Scenario B: $2,200/month net income</h3>
      <p class="mb-4">At $2,200, if the calculated obligation is $400: $2,200 - $400 = $1,800 remaining, which does clear the $2,394 SSR. The standard obligation holds. However, if the income drops, say, to $1,900, recalculate: $1,900 - $400 = $1,500 (below $2,394). Now the SSR kicks in and the obligation must be reduced.</p>

       <h3 class="mt-8 mb-4">Scenario C: $3,500/month net income</h3>
      <p class="mb-4">At $3,500, you're comfortably above the SSR no matter what the basic obligation is. The SSR isn't actively reducing your payment, but the 45% net income cap still applies. Your total child support burden (base plus extraordinary expenses) cannot exceed $1,575/month (45% of $3,500) without the court making a specific finding.</p>

      <p class="mb-4">You can see exactly how these calculations work for your actual income using our <a href="/">Washington child support calculator</a>.</p>

       <h2 class="mt-12 mb-6">3. The $50 Per Child Minimum, The Absolute Floor Beneath the Floor</h2>
      <p class="mb-4">Even when the SSR calculation brings the obligation down dramatically, Washington maintains a presumptive floor of <strong>$50 per child per month</strong>. This means no matter how low your income, you are expected to contribute something toward your children's support. For two children that's $100/month; for three, $150/month. It's rarely waived entirely, though in genuine cases of extreme poverty, courts have discretion.</p>

       <h2 class="mt-12 mb-6">4. The SSR vs. the 45% Cap, Two Different Protections</h2>
      <p class="mb-4">The SSR and the 45% cap are separate but related protections that work together:</p>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><strong>The SSR</strong> asks: after paying, will you have at least $2,394? It primarily protects low-income parents.</li>
        <li><strong>The 45% cap</strong> asks: is this payment more than 45% of your net income? It primarily protects middle-income parents who would otherwise face very high total obligations once extraordinary expenses are added.</li>
      </ul>
      <p class="mb-4">A parent earning $4,000/month is comfortably above the SSR but could hit the 45% cap ($1,800 maximum) if they have multiple children and high daycare and healthcare costs. Both protections must be checked in every case.</p>

       <h2 class="mt-12 mb-6">5. Does the SSR Apply to Support Modifications?</h2>
      <p class="mb-4">Yes, absolutely. If you were paying based on an older order established before the SSR was raised, or before your income dropped, you may now be entitled to a reduction. If your current income is hovering near the $2,394 threshold, it's worth running a fresh calculation and potentially filing a Petition to Modify Child Support.</p>

      <p class="mb-4">Remember: you can only get a modification from the date you file, not retroactively from when your income changed. If you lost your job three months ago and haven't filed yet, those three months of accrued payments won't be forgiven even if your income clearly triggered the SSR. File immediately when your situation changes.</p>

       <h2 class="mt-12 mb-6">6. How to Raise the SSR in Court</h2>
      <p class="mb-4">If you believe the SSR applies to your situation, you need to bring it to the court's attention explicitly, don't assume the commissioner will apply it automatically. Make sure your financial worksheet documents your adjusted net income accurately, and specifically note in your declaration that the calculated obligation, if applied, would leave you below the $2,394 SSR. Provide your pay stubs and tax documents to prove your income is what you claim.</p>

      <p class="mb-4">If you're appearing without an attorney and the opposing party pushes back on your income claims, be ready to explain how you calculated your net income under RCW 26.19.071, the court responds well to people who've done their homework.</p>

       <h2 class="mt-12 mb-6">Related Reading</h2>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><a href="/blog/minimum-child-support-washington-low-income">Minimum Child Support for Low-Income Parents in Washington</a></li>
        <li><a href="/blog/child-support-calculation-washington-2026">Full Calculation Walkthrough: Step-by-Step for 2026</a></li>
        <li><a href="/blog/washington-child-support-guidelines-2026">2026 WA Guidelines: Complete Handbook</a></li>
      </ul>

       <h2 class="mt-12 mb-6">The Bottom Line</h2>
      <p class="mb-4">The Self-Support Reserve exists because the legislature recognized that destroying a parent's ability to survive doesn't serve anyone, not the children, not the courts, and not society. If your income puts you near that $2,394 line, know your rights, document your income carefully, and ask the court to apply the SSR explicitly. It's not a loophole, it's the law.</p>
    <div class="mt-8 mb-8 p-6 bg-[var(--color-bg-subtle)] rounded-2xl border border-[var(--color-bg-border-soft)]"><h3 class="font-semibold text-[var(--color-text-body)] mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class=" hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><!-- TODO: restore when /income-5000-2-children page is created --><a href="/income-5000-2-children" class=" hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class=" hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class=" hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-sm  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">  <div>    <p class="font-semibold text-gray-900 text-base mb-1">      Calculate Your Exact Child Support    </p>    <p class="text-sm text-gray-500">      Free · 2026 RCW 26.19 Guidelines · All 39 Washington Counties    </p>  </div>  <a href="/worksheet"    class="btn btn-primary whitespace-nowrap">    Start Calculation →  </a></div>`,
    faqs: [
      {
        question: "Is the SSR calculated on gross or net income?",
        answer: "Net income, the amount you actually take home after taxes, FICA, mandatory pension contributions, and other legally-allowed deductions under RCW 26.19.071. Gross income before deductions is not the relevant number for SSR calculations."
      },
      {
        question: "Can a judge ignore the SSR even if my income is below it?",
        answer: "The SSR is a presumptive floor under Washington law, meaning courts are required to apply it. However, judges have some discretion in edge cases, for instance, if the court has reason to believe you're underreporting income or are voluntarily underemployed. Imputed income could effectively raise the calculated baseline above $2,394 even if your actual take-home is lower."
      },
      {
        question: "Does the SSR apply to both parents?",
        answer: "The SSR specifically protects the obligor, the parent who is making payments. It's applied to that parent's net income to determine whether the calculated support amount leaves them with at least $2,394. The custodial parent's income is used in the proportional shares calculation but the SSR test is only applied to the paying parent's side."
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
    metaTitle: "WA Child Support Calculation Guide 2026 | WSCSS",
    metaDescription: "Complete step-by-step walkthrough of exactly how Washington calculates child support in 2026 with a worked example using real numbers.",
    author: "WSCSS Editorial Team",
    createdAt: "2026-04-14",
    updatedAt: "2026-04-14",
    featured: false,
    image: { url: "/img/calculation_guide.webp", alt: "Washington State Child Support Calculation Guide 2026", width: 1200, height: 630 },
    content: `
      <div class="bg-[var(--color-brand-primary-light)] p-4 rounded-xl mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 text-indigo-800 list-disc ml-6 mt-2">
          <li>Washington uses the Income Shares Model, both parents' incomes matter</li>
          <li>Only specific deductions reduce gross income; personal debt doesn't count</li>
          <li>Combined income up to $50,000/month is covered by the standard 2026 table</li>
          <li>Daycare and healthcare are added <em>on top of</em> the base obligation, split proportionally</li>
          <li>Run a complete calculation using our <a href="/worksheet">Worksheet Wizard</a></li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This guide explains Washington State's 2026 child support calculation methodology for educational purposes. It is not legal advice.</p>

      <p class="mb-4">Ask most people how child support is calculated and you'll get a shrug or a vage answer about "following a formula." The truth is, there's a very specific, legally-mandated process that Washington courts follow, and once you understand it, a lot of the confusion and anxiety around child support goes away.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-brand-primary-light)] border-y border-[var(--color-brand-primary-mid)]'><th class='py-3 px-4 text-sm font-medium '>Calculation Metric</th><th class='py-3 px-4 text-sm font-medium '>2026 Value</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Self Support Reserve</td><td class='py-3 px-4 text-sm font-medium '>$2,394</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>Economic Table Limit</td><td class='py-3 px-4 text-sm font-medium '>$50,000</td></tr><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Minimum Support</td><td class='py-3 px-4 text-sm font-medium '>$50 per child per month</td></tr></tbody></table></div><p class="mb-4">This guide walks through the entire calculation from beginning to end, with a real worked example so you can follow along with your own numbers. By the end, you'll understand exactly where every dollar of a support order comes from, and what you can and can't change about it.</p>

       <h2 class="mt-12 mb-6">The Foundation: Washington's Income Shares Model</h2>
      <p class="mb-4">Washington operates on the <strong>Income Shares Model</strong>, which is used by the majority of U.S. states. The philosophical core of this model is that children should receive the same percentage of parental income they would have received if their parents had stayed together.</p>

      <p class="mb-4">In practical terms, this means Washington doesn't just look at what the non-custodial parent earns. It looks at <em>both</em> parents' incomes, combines them, determines what percentage each parent contributes, and then makes each parent responsible for that same percentage of the children's total costs.</p>

      <p class="mb-4">Official rules are published by the Washington <a href="https://www.courts.wa.gov/" target="_blank" rel="nofollow">Administrative Office of the Courts</a> and codified in <strong>RCW 26.19</strong>.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-warning-bg)] border-y border-[var(--color-warning-border)]'><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Calculation Phase</th><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Description</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Combined Net Income</td><td class='py-3 px-4 text-sm font-medium '>Both parents' incomes minus allowed deductions</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>Extraordinary Expenses</td><td class='py-3 px-4 text-sm font-medium '>Daycare and health insurance added proportionally</td></tr></tbody></table></div> <h2 class="mt-12 mb-6">Step 1: Determine Each Parent's Gross Monthly Income</h2>
      <p class="mb-4">Washington defines gross income broadly. It includes virtually everything you receive:</p>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li>Wages, salaries, commissions, and tips</li>
        <li>Overtime (but averaged over a 12-month period, not just a banner month)</li>
        <li>Self-employment income (gross revenue minus legitimate business expenses)</li>
        <li>Rental income (after maintenance costs)</li>
        <li>Unemployment compensation</li>
        <li>Disability and workers' compensation benefits</li>
        <li>Social Security or pension benefits paid on behalf of the children are credited against the obligation</li>
      </ul>

      <p class="mb-4">What's <em>not</em> included: income of a new spouse or domestic partner, public assistance benefits like TANF or food stamps, and certain means-tested Social Security payments.</p>

       <h2 class="mt-12 mb-6">Step 2: Calculate Monthly Net Income</h2>
      <p class="mb-4">From gross income, you subtract only the legally-permitted deductions under <strong>RCW 26.19.071</strong>:</p>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li>Federal income taxes based on actual filing status</li>
        <li>State income taxes (Washington has none, but other state withholding may apply)</li>
        <li>FICA taxes (Social Security 6.2% + Medicare 1.45%)</li>
        <li>Medicare surcharge if applicable</li>
        <li>Mandatory pension or retirement contributions <em>required by the employer</em> as a condition of employment (not voluntary 401k contributions)</li>
        <li>Union dues actually paid</li>
        <li>State industrial insurance (L&I) premiums</li>
        <li>Health and dental insurance premiums paid for the <em>children</em></li>
        <li>Actual payments on court-ordered child support or maintenance for <em>other</em> children</li>
      </ul>

      <p class="mb-4"><strong>Not deductible:</strong> credit cards, car loans, student loans, voluntary retirement contributions, personal health insurance (only the children's portion), or any debt not listed above. Courts hear arguments about debt obligations regularly and rarely grant credit for them.</p>

       <h2 class="mt-12 mb-6">Step 3: Look Up the Basic Support Obligation</h2>
      <p class="mb-4">Once you have both parents' monthly net incomes, add them together, that's your <strong>combined monthly net income</strong>. Then look up the corresponding amount in the 2026 Washington Child Support Economic Table based on the number of children.</p>

      <p class="mb-4">For example, at a combined income of $7,000/month for two children, the 2026 table shows a basic obligation of $1,440/month. This is the total amount, not what either parent pays individually. That comes next.</p>

      <p class="mb-4">Use our <a href="/">calculator</a> to look this up instantly for your specific income and child count.</p>

       <h2 class="mt-12 mb-6">Step 4: Calculate Each Parent's Proportional Share</h2>
      <p class="mb-4">Now divide. If Parent A earns $4,500 net and Parent B earns $2,500 net, combined is $7,000. Parent A's share: $4,500 ÷ $7,000 = 64.3%. Parent B's share: 35.7%.</p>

      <p class="mb-4">Each parent is responsible for their percentage of the basic obligation. Parent A owes 64.3% × $1,440 = <strong>$926/month</strong>. Parent B owes 35.7% × $1,440 = <strong>$514/month</strong>.</p>

      <p class="mb-4">The parent with fewer residential days typically pays their share as a <em>transfer payment</em> to the other parent. If Parent A has the children 70% of the time, Parent B makes the monthly transfer payment of $514.</p>

       <h2 class="mt-12 mb-6">Step 5: Add Extraordinary Expenses</h2>
      <p class="mb-4">The basic obligation covers only food, ordinary clothing, and shelter. Everything else is calculated separately:</p>

       <h3 class="mt-8 mb-4">Work-Related Childcare</h3>
      <p class="mb-4">Say daycare costs $1,600/month. That cost is split according to the same 64.3/35.7 proportional split: Parent A owes $1,029, Parent B owes $571. These amounts go through the same payment system as the base support amount, they're not optional and don't disappear if a parent thinks childcare is "too expensive."</p>

       <h3 class="mt-8 mb-4">Health Insurance Premiums</h3>
      <p class="mb-4">The cost of the children's health insurance is added to the worksheet and split proportionally. Whoever pays the premium gets credited for it; the other parent's share is factored into their transfer obligation.</p>

       <h3 class="mt-8 mb-4">Uninsured Medical Expenses</h3>
      <p class="mb-4">Copays, prescription costs, orthodontics, these are split proportionally and typically paid within 30 days of the expense being incurred.</p>

       <h2 class="mt-12 mb-6">Step 6: Apply the SSR and 45% Cap Checks</h2>
      <p class="mb-4">Before the order is finalized, the court performs two safety checks:</p>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><strong>SSR Check:</strong> Will the paying parent retain at least $2,394/month after this payment? If not, the obligation must be reduced.</li>
        <li><strong>45% Cap Check:</strong> Does the total obligation (base + extraordinary expenses) exceed 45% of the paying parent's net income? If yes, there needs to be a "good cause" finding for the court to approve it.</li>
      </ul>

       <h2 class="mt-12 mb-6">A Complete Worked Example</h2>
      <p class="mb-4">Let's pull this all together. Parent A nets $5,000/month. Parent B nets $3,000/month. Two children. Monthly daycare is $1,800.</p>
       <ol class="list-decimal pl-6 space-y-6 mb-8">
        <li>Combined income: $8,000</li>
        <li>Basic obligation at $8,000 / 2 children (from 2026 table): ~$1,560</li>
        <li>Parent A's share (62.5%): $975</li>
        <li>Parent B's share (37.5%): $585</li>
        <li>Parent A pays daycare: 62.5% × $1,800 = $1,125</li>
        <li>Parent B pays daycare: 37.5% × $1,800 = $675</li>
        <li>SSR check: $5,000 - $975 transfer = $4,025 remaining. Passes.</li>
        <li>45% check: $975 = 19.5% of $5,000. Passes.</li>
      </ol>
      <p class="mb-4">If Parent B (the lower earner) has the children less often and is making the transfer payment: $585 base + credit for their $675 daycare share = complex math best handled by our <a href="/worksheet">Worksheet Wizard</a>, which automatically handles these calculations.</p>

       <h2 class="mt-12 mb-6">Related Articles</h2>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><a href="/blog/washington-ssr-self-support-reserve-explained">SSR: The $2,394 Floor Explained</a></li>
        <li><a href="/blog/how-courts-decide-child-support-washington">How Courts Decide Your Final Order</a></li>
        <li><a href="/blog/washington-child-support-guidelines-2026">2026 Guidelines: The Complete Handbook</a></li>
      </ul>

       <h2 class="mt-12 mb-6">Conclusion</h2>
      <p class="mb-4">The calculation process is actually quite logical once you see it laid out step by step. Knowing the math before you go to court is one of the most practical advantages you can have, it tells you exactly what to fight for and what to accept. Run your specific numbers through our <a href="/">quick calculator</a> now, then use the <a href="/worksheet">Professional Wizard</a> to generate the complete worksheet.</p>
    <div class="mt-8 mb-8 p-6 bg-[var(--color-bg-subtle)] rounded-2xl border border-[var(--color-bg-border-soft)]"><h3 class="font-semibold text-[var(--color-text-body)] mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class=" hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><!-- TODO: restore when /income-5000-2-children page is created --><a href="/income-5000-2-children" class=" hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class=" hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class=" hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-sm  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">  <div>    <p class="font-semibold text-gray-900 text-base mb-1">      Calculate Your Exact Child Support    </p>    <p class="text-sm text-gray-500">      Free · 2026 RCW 26.19 Guidelines · All 39 Washington Counties    </p>  </div>  <a href="/worksheet"    class="btn btn-primary whitespace-nowrap">    Start Calculation →  </a></div>`,
    faqs: [
      {
        question: "Can I stop paying child support if my ex won't let me see my children?",
        answer: "No. Under Washington law, child support and residential time (visitation) are completely separate legal issues. Withholding support because of denied visitation puts you at risk of contempt of court, wage garnishment, and license suspension. The correct remedy for denied visitation is a motion to enforce your parenting plan, not stopping payments."
      },
      {
        question: "When does child support end in Washington State?",
        answer: "Generally, child support ends when the child turns 18 OR graduates high school, whichever is later, but no later than age 19. Support can continue beyond that if the child has a disability requiring ongoing support, but that requires a separate court order."
      },
      {
        question: "Does my new partner's income affect my child support?",
        answer: "Generally no. Washington does not include a new spouse's or domestic partner's income in the core calculation. However, if you've dramatically reduced your own work hours because your new partner is supporting your household, the court may impute income to you at the level you would otherwise earn."
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
    excerpt: "If your income is low or you've lost your job, here's what Washington law actually requires, including the $50 per child per month, the SSR protection, imputed income risks, and how to get a legitimate reduction.",
    metaTitle: "Minimum Child Support WA Low Income 2026 | WSCSS",
    metaDescription: "If your income is low or you lost your job, here is what Washington law requires including the $50 per child per month, SSR protection, and imputed income risks.",
    author: "WSCSS Editorial Team",
    createdAt: "2026-04-24",
    updatedAt: "2026-04-24",
    featured: false,
    image: { url: "/img/low_income_guide.webp", alt: "Minimum Child Support Low Income Washington State Guide", width: 1200, height: 630 },
    content: `
      <div class="bg-[var(--color-brand-primary-light)] p-4 rounded-xl mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 text-indigo-800 list-disc ml-6 mt-2">
          <li>The presumptive minimum is <strong>$50 per child per month</strong></li>
          <li>The 2026 SSR ($2,394) legally requires a downward deviation if your income is too low</li>
          <li>Quitting your job to avoid support is dangerous, courts will impute income</li>
          <li>Arrears cannot be waived retroactively, file a modification petition immediately if your income drops</li>
          <li>DSHS can garnish unemployment benefits, they count as gross income</li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This guide is for educational purposes. It does not constitute legal advice. Consult a licensed Washington family law attorney for advice specific to your case.</p>

      <p class="mb-4">Getting a child support order when you're already struggling financially is one of the most stressful legal experiences in Washington. If you're working minimum wage, dealing with job loss, or facing a sudden income drop, understanding how Washington's minimum support rules actually work, and what you can do, is critical.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-brand-primary-light)] border-y border-[var(--color-brand-primary-mid)]'><th class='py-3 px-4 text-sm font-medium '>Key Metric</th><th class='py-3 px-4 text-sm font-medium '>2026 Standard</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Self Support Reserve</td><td class='py-3 px-4 text-sm font-medium '>$2,394</td></tr><tr class='border-b border(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>Economic Table Limit</td><td class='py-3 px-4 text-sm font-medium '>$50,000</td></tr><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Minimum Support</td><td class='py-3 px-4 text-sm font-medium '>$50 per child per month</td></tr></tbody></table></div><p class="mb-4">The good news: Washington law has built-in protections for genuinely low-income parents. The hard news: the courts take a very dim view of parents who try to game the system by artificially reducing their income. Let's talk through both realities.</p>

       <h2 class="mt-12 mb-6">1. The Absolute Minimum: $50 Per Child Per Month</h2>
      <p class="mb-4">Washington law establishes a <strong>presumptive minimum of $50 per child per month</strong> under RCW 26.19.065. This is the floor beneath which no court-ordered support obligation can go in normal circumstances. For one child, that's $50/month. For three children, that's $150/month. It's not optional, and it's extremely rare for a court to waive it entirely.</p>

      <p class="mb-4">This minimum applies when the Self-Support Reserve calculation brings the obligation down dramatically, when a parent's income is so low that the regular formula would leave them destitute. In those cases, the court ordinarily reduces the obligation to the $50 per child per month baseline rather than following the standard table amount.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-warning-bg)] border-y border-[var(--color-warning-border)]'><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Income Level</th><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Likely Minimum Support</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Under SSR ($2,394)</td><td class='py-3 px-4 text-sm font-medium '>$50 per child per month</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>Zero Income (Voluntary)</td><td class='py-3 px-4 text-sm font-medium '>Imputed income at minimum wage</td></tr></tbody></table></div> <h2 class="mt-12 mb-6">2. How the SSR Forces a Reduction</h2>
      <p class="mb-4">The <strong>Self-Support Reserve of $2,394/month</strong> is what makes the $50 per child per month relevant for most low-income cases. Here's the chain of events:</p>
       <ol class="list-decimal pl-6 space-y-6 mb-8">
        <li>The income shares calculation produces a standard obligation, say, $380/month</li>
        <li>The court checks: does $380 leave the paying parent with at least $2,394?</li>
        <li>If the parent nets only $1,700/month, then $1,700 - $380 = $1,320, below $2,394</li>
        <li>The obligation must be reduced, typically to $50 per child per month</li>
      </ol>

      <p class="mb-4">This isn't discretionary, the SSR check is required by law. If you believe the SSR applies to your situation, document your net income thoroughly and bring it to the court's attention directly. Don't assume the commissioner will run the check without you raising it.</p>

       <h2 class="mt-12 mb-6">3. The Danger of Quitting Your Job: Imputed Income</h2>
      <p class="mb-4">This is where a lot of people make a devastating mistake. You might think: "If I quit my job or go part-time, my income drops to zero and my support drops with it." That's not how Washington works.</p>

      <p class="mb-4">Under <strong>RCW 26.19.071(6)</strong>, if the court determines a parent is <strong>voluntarily underemployed</strong>, meaning they've chosen to work less than they're capable of, the court can "impute" income at the level the parent could reasonably earn. DSHS and courts pursue this aggressively through the <a href="https://www.dshs.wa.gov/esa/division-child-support" target="_blank" rel="nofollow">Division of Child Support</a>.</p>

      <p class="mb-4">At minimum, courts will impute income at Washington State's current minimum wage for full-time work (40 hours/week). If your work history shows you were earning $4,500/month for years and you suddenly claim to be making $800/month after your separation, expect serious scrutiny.</p>

      <p class="mb-4">Legitimate reasons income has actually dropped, a medical condition, documented job loss, industry-wide layoffs, are evaluated differently. The key is documentation: medical records, termination letters, a severance agreement, unemployment records. If you can prove the income reduction is genuine and not voluntary, the court adjusts accordingly.</p>

       <h2 class="mt-12 mb-6">4. Real Scenarios at Different Income Levels</h2>

       <h3 class="mt-8 mb-4">If you earn $1,400/month net:</h3>
      <p class="mb-4">You're below the $2,394 SSR. The court cannot impose even the $50 per child per month if that would leave you under $2,394, though practically, courts often do order the minimum even in these cases, on the theory that $50 per child per month keeps the obligation alive while recognizing genuine hardship. You have real grounds to argue for zero temporarily with a review hearing in 90 days.</p>

       <h3 class="mt-8 mb-4">If you earn $2,000/month net:</h3>
      <p class="mb-4">At $2,000/month, you have $486 above the SSR ($2,000 - $2,394 = $486). If the standard calculation generates a $600 obligation, the court would reduce it to fit within that $486 ceiling, likely ordering around $200-$250/month after the SSR test. Still substantial for a tight budget, but far less than the standard amount.</p>

       <h3 class="mt-8 mb-4">If you earn $2,800/month net:</h3>
      <p class="mb-4">You're above the SSR, but the 45% cap still applies. Your maximum total obligation (base + extraordinary expenses) is $1,260/month (45% of $2,800). If two children plus daycare costs would push your obligation beyond $1,260, the court needs to make a specific finding. At <a href="/pierce-county-income-3000-2-children">this income range</a>, the standard table typically applies without SSR intervention.</p>

       <h2 class="mt-12 mb-6">5. How to File for a Low-Income Deviation</h2>
      <p class="mb-4">If you believe your income triggers the SSR protection, you need to formally request a deviation, it won't happen automatically. Include these steps:</p>
       <ol class="list-decimal pl-6 space-y-6 mb-8">
        <li>File your FL All Family 132 Worksheets with your accurate net income documented</li>
        <li>Attach your last 3 pay stubs and most recent federal tax return</li>
        <li>In your declaration, explicitly cite that the standard obligation would leave you below the $2,394 SSR</li>
        <li>Calculate the maximum amount you can pay while retaining $2,394 and propose that as your obligation</li>
        <li>If you can't calculate this accurately, use our <a href="/worksheet">Worksheet Wizard</a> to get the right numbers</li>
      </ol>

       <h2 class="mt-12 mb-6">6. If You Fall Behind: Act Immediately</h2>
      <p class="mb-4">If your income has already dropped and you're accruing arrears, the most important thing is to file a modification petition immediately. Arrears that accumulate before the filing date <em>cannot be retroactively waived</em>, they are permanent debts. Every day you wait is another day of accruing arrearage at Washington's <strong>12% annual interest rate</strong>.</p>

      <p class="mb-4">Also critical: unemployment benefits are gross income under Washington law and can be garnished by DSHS. Even while on unemployment, you're expected to be making payments, at least the minimum amount. Don't assume unemployment creates an automatic pause in your obligation.</p>

       <h2 class="mt-12 mb-6">Related Articles</h2>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><a href="/blog/washington-ssr-self-support-reserve-explained">Understanding the $2,394 Self-Support Reserve</a></li>
        <li><a href="/blog/what-happens-if-child-support-is-not-paid-washington">What Happens If Child Support Is Not Paid</a></li>
        <li><a href="/blog/washington-child-support-guidelines-2026">2026 Guidelines: Complete Handbook</a></li>
      </ul>

       <h2 class="mt-12 mb-6">Final Thoughts</h2>
      <p class="mb-4">Washington has built meaningful protections for parents who genuinely can't afford full support obligations. The SSR exists for a real reason. But those protections only work if you show up, document your income accurately, and formally ask the court to apply them. Silence and avoidance are the most expensive choices a low-income parent in this situation can make.</p>
    <div class="mt-8 mb-8 p-6 bg-[var(--color-bg-subtle)] rounded-2xl border border-[var(--color-bg-border-soft)]"><h3 class="font-semibold text-[var(--color-text-body)] mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class=" hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><!-- TODO: restore when /income-5000-2-children page is created --><a href="/income-5000-2-children" class=" hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class=" hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class=" hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-sm  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">  <div>    <p class="font-semibold text-gray-900 text-base mb-1">      Calculate Your Exact Child Support    </p>    <p class="text-sm text-gray-500">      Free · 2026 RCW 26.19 Guidelines · All 39 Washington Counties    </p>  </div>  <a href="/worksheet"    class="btn btn-primary whitespace-nowrap">    Start Calculation →  </a></div>`,
    faqs: [
      {
        question: "Can I go to jail if I genuinely can't afford child support?",
        answer: "Not for simple inability to pay. Washington courts distinguish between parents who can't pay and parents who willfully refuse to pay despite having the ability. If you're genuinely destitute and made reasonable efforts to lower your order, the risk of jail is very low. However, if you're hiding income, have assets you're not reporting, or are willfully ignoring the order, contempt of court, which can include jail time, becomes a real possibility."
      },
      {
        question: "Do I still owe child support while receiving unemployment benefits?",
        answer: "Yes. Unemployment compensation is defined as gross income under RCW 26.19.071, and DSHS can request an income withholding order directly with the Employment Security Department. Your unemployment benefit can be garnished automatically. The appropriate response if your income has genuinely dropped is to file a modification petition, not to stop paying and wait."
      },
      {
        question: "Does Washington ever forgive past-due child support (arrears)?",
        answer: "No. Washington State child support arrears are permanent debts that survive bankruptcy (with narrow exceptions), grow at 12% annual interest, and have no statute of limitations. Once owed, they're owed permanently until paid. The only exception is if the custodial parent voluntarily agrees to forgive some or all arrears in a formal written agreement approved by the court, DSHS cannot forgive arrears on government-assigned cases."
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
    metaTitle: "King County Child Support Rules 2026 | WSCSS",
    metaDescription: "King County has specific local family law rules that supplement state law. What you need to know about LFLR 10, financial declarations, and high-income cases.",
    author: "WSCSS Editorial Team",
    createdAt: "2026-05-01",
    updatedAt: "2026-05-01",
    featured: false,
    image: { url: "/img/king_county_rules.webp", alt: "King County Child Support Rules and Local Guidelines 2026", width: 1200, height: 630 },
    content: `
      <div class="bg-[var(--color-brand-primary-light)] p-4 rounded-xl mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 text-indigo-800 list-disc ml-6 mt-2">
          <li>LFLR 10 requires comprehensive financial declarations, more detailed than state forms</li>
          <li>Seattle vs. Kent courthouse routing depends on the responding parent's ZIP code</li>
          <li>Tech worker income (RSUs, bonuses, stock options) is treated as gross income</li>
          <li>Seattle daycare often exceeds $2,000/month, this is always split proportionally</li>
          <li>Family court commissioners handle most initial hearings, not judges</li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This guide covers King County local family law rules as of 2026. It is educational information, not legal advice. Consult a licensed Washington family law attorney for guidance specific to your case.</p>

      <p class="mb-4">If you've read Washington's state child support guidelines and assumed that's all you need to know before walking into a King County courtroom, you're about to be surprised. King County operates under a supplemental set of Local Family Law Rules (LFLR) that add requirements layered on top of state law, and commissioners there enforce them with far less patience for non-compliance than you'd encounter in a smaller county.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-brand-primary-light)] border-y border-[var(--color-brand-primary-mid)]'><th class='py-3 px-4 text-sm font-medium '>Guideline</th><th class='py-3 px-4 text-sm font-medium '>2026 Rule</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Self Support Reserve</td><td class='py-3 px-4 text-sm font-medium '>$2,394</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>Economic Table Limit</td><td class='py-3 px-4 text-sm font-medium '>$50,000</td></tr><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Minimum Support</td><td class='py-3 px-4 text-sm font-medium '>$50 per child per month</td></tr></tbody></table></div><p class="mb-4">King County also sees a disproportionate number of high-income cases, tech workers at Amazon, Microsoft, and Boeing, professionals with complex compensation packages, and dual-income households where both parents earn well above the state average. These cases present unique calculation challenges that the standard table handles differently here than anywhere else in Washington.</p>

      <p class="mb-4">Before diving into the local rules, check your income scenario using our <a href="/king-county-income-5000-2-children">King County child support calculator</a>.</p>

       <h2 class="mt-12 mb-6">1. LFLR 10: Washington's Most Demanding Financial Disclosure Requirement</h2>
      <p class="mb-4">Under <strong>Local Family Law Rule 10 (LFLR 10)</strong>, every party in a King County family law case involving children must file a comprehensive <strong>Financial Declaration</strong> using the state form <strong>FL All Family 131</strong>, supplemented by King County's specific attachment requirements.</p>

      <p class="mb-4">Your financial declaration must be accompanied by:</p>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li>Last 2 complete federal tax returns (both W-2s and 1040s)</li>
        <li>Last 3 consecutive pay stubs</li>
        <li>12 months of bank statements (checking and savings) if self-employed or if income verification is contested</li>
        <li>Brokerage or investment statements if RSUs, dividends, or capital gains are claimed as income</li>
        <li>Any existing child support orders for other children</li>
        <li>Documentation of childcare costs actually paid (invoices or receipts, not estimates)</li>
        <li>Health insurance premium documentation</li>
      </ul>

      <p class="mb-4">Commissioners in King County have seen every trick in the book. Submitting a declaration without full documentation, or with numbers that don't reconcile with the supporting documents, is treated as a credibility issue, not just a procedural one. When the court doesn't trust your income disclosure, it imputes income at a much higher level, and you end up worse off than if you'd disclosed everything upfront.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-warning-bg)] border-y border-[var(--color-warning-border)]'><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Compensation Type</th><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>King County Treatment</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>RSUs (Tech Workers)</td><td class='py-3 px-4 text-sm font-medium '>Counted as gross income upon vesting</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>Seattle Daycare</td><td class='py-3 px-4 text-sm font-medium '>Split proportionally (often $2000+/mo)</td></tr></tbody></table></div> <h2 class="mt-12 mb-6">2. Seattle vs. Kent: Knowing Your Courthouse</h2>
      <p class="mb-4">King County's two family court locations handle different geographic zones, and filing in the wrong one doesn't just cause an inconvenient transfer, it delays your case by weeks.</p>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><strong>King County Courthouse (Seattle):</strong> 516 Third Avenue, Seattle, WA 98104. Hours: M–F 8:30 AM–4:30 PM. Phone: (206) 477-0400. Handles North/Central King County ZIP codes.</li>
        <li><strong>Maleng Regional Justice Center (Kent):</strong> 401 Fourth Avenue North, Kent, WA 98032. Hours: M–F 8:00 AM–4:30 PM. Phone: (253) 372-7300. Handles South King County ZIP codes.</li>
      </ul>
      <p class="mb-4">Routing is based on the <strong>responding party's</strong> place of residence, usually where the non-moving parent lives. The <a href="https://kingcounty.gov/courts/superior-court.aspx" target="_blank" rel="nofollow">King County Superior Court website</a> has a ZIP code lookup tool if you're unsure.</p>

       <h2 class="mt-12 mb-6">3. High-Income Cases: Tech Workers, RSUs, and Bonus Income</h2>
      <p class="mb-4">King County's family courts routinely deal with tech worker income that doesn't fit neatly into the standard pay stub + W-2 model. Here's how the most common compensation elements are treated:</p>

       <h3 class="mt-8 mb-4">Restricted Stock Units (RSUs)</h3>
      <p class="mb-4">RSUs that vest during the calculation period are counted as income in the year they vest, they're reported on your W-2 in box 1 just like wages. If your annual RSU vesting is $60,000, that's $5,000/month added to your gross income. Courts see this on your tax return and will include it unless you can show it was non-recurring.</p>

       <h3 class="mt-8 mb-4">Annual Bonuses</h3>
      <p class="mb-4">Year-end bonuses are averaged over 12 months and added to the monthly income calculation. If you received $24,000 in bonuses over the past year, that's $2,000/month additional gross income. Claiming a bonus was "one-time" is difficult unless you provide documentation showing it was project-based and non-repeating.</p>

       <h3 class="mt-8 mb-4">Income Above $50,000 Combined</h3>
      <p class="mb-4">When combined monthly net income exceeds $50,000, the standard table ends and judicial discretion kicks in. The court uses the table's top-tier amount as a starting point and may add a percentage of income above that threshold. High-income King County cases with two attorneys often involve significant litigation over exactly what the "lifestyle standard" was during the marriage.</p>

       <h2 class="mt-12 mb-6">4. Daycare in Seattle: It Changes Everything</h2>
      <p class="mb-4">Full-time infant and toddler daycare in Seattle regularly costs between $2,000 and $2,800 per month per child, among the highest in the country. This is added to the child support worksheet as a work-related childcare expense and split proportionally between both parents.</p>

      <p class="mb-4">If you're the parent with 60% of the combined income and daycare is $2,400/month, your share is $1,440, on top of your base transfer payment. The total obligation can easily reach $2,000+ when daycare is factored in for a Seattle-based case, even at a moderate income level.</p>

      <p class="mb-4">This is exactly why worksheets matter so much in King County. The base support number from the economic table is rarely the whole story. Run your <a href="/worksheet">full worksheet</a> to see what daycare and healthcare actually do to your total obligation.</p>

       <h2 class="mt-12 mb-6">5. Commissioners vs. Judges in King County Family Court</h2>
      <p class="mb-4">Most initial hearings, temporary orders, and uncontested support orders in King County are handled by <strong>Court Commissioners</strong>, judicial officers with full authority to enter binding orders. A Superior Court judge reviews commissioner decisions only if a party files a Motion for Revision within 10 days.</p>

      <p class="mb-4">Commissioners run fast, efficient hearings. They expect you to show up with complete documentation, know your numbers, and be ready to state your position concisely. Showing up with incomplete financial declarations, vage income estimates, or an inability to explain your child support worksheet will result in an unfavorable temporary order that can be very difficult to undo.</p>

       <h2 class="mt-12 mb-6">Related Articles</h2>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><a href="/blog/filing-child-support-king-county-guide">Filing For Child Support in King County: Step-by-Step</a></li>
        <li><a href="/blog/washington-child-support-guidelines-2026">2026 WA State Guidelines: Complete Handbook</a></li>
        <li><a href="/blog/child-support-calculation-washington-2026">Full Calculation Walkthrough: Step-by-Step</a></li>
      </ul>

       <h2 class="mt-12 mb-6">Conclusion</h2>
      <p class="mb-4">King County doesn't cut corners on financial disclosure, and neither should you. The most common outcome for parents who walk in underprepared is a temporary order that's either too high or too low, and those temporary orders can take months to correct. Get your documentation together, run your numbers through the <a href="/worksheet">Worksheet Wizard</a>, and show up knowing exactly what you owe and why.</p>
    <div class="mt-8 mb-8 p-6 bg-[var(--color-bg-subtle)] rounded-2xl border border-[var(--color-bg-border-soft)]"><h3 class="font-semibold text-[var(--color-text-body)] mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class=" hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><!-- TODO: restore when /income-5000-2-children page is created --><a href="/income-5000-2-children" class=" hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class=" hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class=" hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-sm  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">  <div>    <p class="font-semibold text-gray-900 text-base mb-1">      Calculate Your Exact Child Support    </p>    <p class="text-sm text-gray-500">      Free · 2026 RCW 26.19 Guidelines · All 39 Washington Counties    </p>  </div>  <a href="/worksheet"    class="btn btn-primary whitespace-nowrap">    Start Calculation →  </a></div>`,
    faqs: [
      {
        question: "Can I request a deviation in King County because the cost of living in Seattle is so high?",
        answer: "Generally, no. The statewide economic table is applied uniformly across all 39 Washington counties, King County does not have a separate higher table to reflect Seattle's cost of living. However, the high cost of childcare in Seattle does get factored in as an extraordinary expense, which significantly increases the real total obligation beyond what the base table shows."
      },
      {
        question: "Do I file in Seattle or Kent if we both live in different parts of King County?",
        answer: "Routing is based on the responding party's (non-moving parent's) place of residence, not the petitioner's. If the responding parent lives in Renton, that's typically the Seattle courthouse. If they're in Auburn or Federal Way, that's typically the Kent courthouse. When in doubt, call the clerk at (206) 477-0400 before filing."
      },
      {
        question: "What happens if I fail to file a proper financial declaration under LFLR 10?",
        answer: "The commissioner can impute your income at whatever rate they find reasonable, often significantly higher than your actual income, and enter a temporary order based on that imputed amount. Getting that order revised requires a subsequent hearing, which takes time. In King County, failing to properly disclose income often results in worse outcomes than full disclosure would have."
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
    excerpt: "Missing child support payments in Washington triggers a cascade of serious enforcement actions, from wage garnishment on day one to passport denial, license suspension, and contempt of court. Here's what happens and what you can do.",
    metaTitle: "Child Support Not Paid in Washington? | WSCSS",
    metaDescription: "Missing child support in Washington triggers wage garnishment, license suspension, passport denial, and contempt of court. Here is what happens and what to do.",
    author: "WSCSS Editorial Team",
    createdAt: "2026-05-07",
    updatedAt: "2026-05-07",
    featured: false,
    image: { url: "/wscss-og.webp", alt: "Consequences of Unpaid Child Support in Washington State", width: 1200, height: 630 },
    content: `
      <div class="bg-[var(--color-brand-primary-light)] p-4 rounded-xl mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 text-indigo-800 list-disc ml-6 mt-2">
          <li>⚠ Income withholding order sent to your employer, can happen within days of missed payment</li>
          <li>⚠ 12% annual interest accrues on every dollar of arrearage, compounding quickly</li>
          <li>⚠ Driver's license, professional licenses, and passports can all be suspended</li>
          <li>⚠ Federal tax refunds are automatically intercepted when arrears exceed $150</li>
          <li>⚠ Contempt of court can result in fines and, in willful cases, jail time</li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This guide explains Washington State enforcement mechanisms for educational purposes. It is not legal advice. If you are facing enforcement actions, consult a licensed Washington family law attorney immediately.</p>

      <p class="mb-4">If you're behind on child support in Washington State, whether intentionally or because life threw something unexpected at you, you need to understand exactly what enforcement mechanisms are coming your way and how fast they move. Washington is one of the more aggressive states when it comes to child support enforcement, largely because <a href="https://www.dshs.wa.gov/esa/division-child-support" target="_blank" rel="nofollow">DSHS's Division of Child Support (DCS)</a> is staffed specifically to pursue non-payers.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-brand-primary-light)] border-y border-[var(--color-brand-primary-mid)]'><th class='py-3 px-4 text-sm font-medium '>Core Standard</th><th class='py-3 px-4 text-sm font-medium '>2026 Threshold</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Self Support Reserve</td><td class='py-3 px-4 text-sm font-medium '>$2,394</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>Economic Table Limit</td><td class='py-3 px-4 text-sm font-medium '>$50,000</td></tr><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Minimum Support</td><td class='py-3 px-4 text-sm font-medium '>$50 per child per month</td></tr></tbody></table></div><p class="mb-4">The goal of this guide isn't to scare you, it's to help you understand the full picture so you can make the smartest possible decisions. Sometimes that's fighting the order. Sometimes it's getting back on track. Either way, knowledge is your most valuable tool right now.</p>

       <h2 class="mt-12 mb-6">1. The First Response: Income Withholding Orders (IWOs)</h2>
      <p class="mb-4">In Washington, virtually every child support order automatically comes with an <strong>Income Withholding Order (IWO)</strong>, also called an earnings withholding order. This is a legal mandate sent directly to your employer requiring them to deduct support payments from your paycheck and send the money to DCS before you ever see it.</p>

      <p class="mb-4">Most parents on standard payroll never even miss a payment because the IWO handles it automatically. The problem comes when you change jobs, which is why DCS maintains a <strong>New Hire Registry</strong>. Every employer in Washington is required to report new hires, and when your name comes up, DCS matches it to any open support orders and sends a new IWO to your new employer, usually within 2 weeks.</p>

      <p class="mb-4">If you're self-employed, DCS can issue an IWO to your clients or to financial institutions where you maintain business accounts. The enforcement net is wide, and there are very few employment situations that successfully evade it long-term.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-warning-bg)] border-y border-[var(--color-warning-border)]'><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Violation/Arrearage</th><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Enforcement Action</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Missed payments</td><td class='py-3 px-4 text-sm font-medium '>Income Withholding Order (Wage Garnishment)</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>&gt;$1,000 Arrears</td><td class='py-3 px-4 text-sm font-medium '>Driver's license suspension</td></tr><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>&gt;$2,500 Arrears</td><td class='py-3 px-4 text-sm font-medium '>Passport denial/revocation</td></tr></tbody></table></div> <h2 class="mt-12 mb-6">2. The Financial Trap: 12% Annual Interest on Arrears</h2>
      <p class="mb-4">This is the part that catches parents completely off guard. Washington charges <strong>12% simple annual interest</strong> on unpaid child support. Let's put that in real numbers.</p>

      <p class="mb-4">Suppose you miss $600/month in payments for 12 months. After one year, you owe $7,200 in principal. But Washington's 12% interest rate means that $7,200 is accruing $864 in interest per year, about $72 per month just in interest. Miss two years of payments, and your principal is $14,400, with growing interest on top of that. After five years, a parent who stopped paying $600/month can easily owe $25,000–$30,000 when interest is calculated.</p>

      <p class="mb-4">These debts have <strong>no statute of limitations</strong> in Washington. DCS can pursue arrears 20 years after your youngest child turns 18. There is no escape route except paying what's owed.</p>

       <h2 class="mt-12 mb-6">3. License Suspensions: Driver's and Professional</h2>
      <p class="mb-4">Under Washington law, DCS has the authority to suspend your driver's license if you're more than 6 months behind on child support payments or owe more than $1,000 in arrears. The process is administrative, you receive a notice, and if you don't respond within 20 days, the license is suspended without a court hearing.</p>

      <p class="mb-4">But driver's licenses are just the beginning. DCS can also certify you to the relevant licensing boards for suspension of:</p>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li>Professional licenses (attorneys, doctors, nurses, realtors, contractors)</li>
        <li>Business licenses</li>
        <li>Commercial Driver's Licenses (CDL)</li>
        <li>Hunting and fishing licenses</li>
      </ul>

      <p class="mb-4">For many professions, license suspension is functionally a career-ending event that makes it literally impossible to earn the income to pay the support obligation. Courts recognize this paradox, which is why many enforcement actions include a "payment plan to maintain license" option. But you must proactively contact DCS and set that up, it won't happen automatically.</p>

       <h2 class="mt-12 mb-6">4. Passport Denial and Revocation</h2>
      <p class="mb-4">Once you owe more than $2,500 in child support arrears, DCS can certify you to the federal government for <strong>passport denial or revocation</strong>. The U.S. State Department will not issue or renew your passport until the arrearage is resolved.</p>

      <p class="mb-4">This is purely administrative, no court hearing, no appeal process before it happens. If you have international travel for work, are planning a vacation, or need to visit family abroad, discovering your passport is denied at the border is both humiliating and logistically catastrophic. Don't let it get to this point.</p>

       <h2 class="mt-12 mb-6">5. Federal Tax Intercept Program</h2>
      <p class="mb-4">If your federal tax refund is coming, and you owe more than $150 in child support arrears (or $500 if the custodial parent is not on public assistance), the <strong>Federal Tax Refund Offset Program</strong> will automatically redirect your entire refund, up to the full amount owed, to DCS. You'll receive a notice afterward.</p>

      <p class="mb-4">The interception happens before you see a dime. If your new spouse's income contributed to the refund, they can file an "Injured Spouse" claim with the IRS to recover their portion, but it takes months and requires documentation.</p>

       <h2 class="mt-12 mb-6">6. Contempt of Court: The Nuclear Option</h2>
      <p class="mb-4">When administrative tools aren't working, usually because a parent is hiding income, working under the table, or actively avoiding payments, DCS or the custodial parent can file a <strong>Contempt of Court motion</strong>. The non-paying parent is brought before a judge to explain why they haven't complied with the court order.</p>

      <p class="mb-4">If you can't show the court that (a) you didn't have the ability to pay, or (b) you've made a good-faith effort to pay as much as you could, the consequences can include:</p>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li>Fines of up to $1,000 per violation</li>
        <li>Payment of the other party's attorney's fees</li>
        <li>Community service hours</li>
        <li>Jail time of up to 6 months</li>
      </ul>

      <p class="mb-4">Courts generally don't want to jail parents, jailed parents can't earn money to pay support. But for deliberate and sustained non-payment by parents who clearly have income, judges do impose incarceration. Washington courts consider this a tool of last resort, not a punishment, but that distinction matters a lot less when you're sitting in a cell.</p>

       <h2 class="mt-12 mb-6">7. What You Can Actually Do If You Fall Behind</h2>
      <p class="mb-4">If your income has genuinely changed and you're struggling, the single most important step is to <strong>file a Petition to Modify your support order immediately</strong>. Don't wait. Don't hope it'll work itself out. Every day you wait is another day of arrears accruing at 12% interest that you can never claw back.</p>

      <p class="mb-4">Use our <a href="/worksheet">Worksheet Wizard</a> to calculate what your support should be at your new income level. Then file the modification petition and ask for a temporary order modification at the first available hearing. If your income drop is documented and legitimate, courts move reasonably quickly on temporary orders.</p>

      <p class="mb-4">You can also contact DCS directly to set up a payment plan on existing arrears. DCS would rather receive something consistently each month than go through the expense of license suspension and court proceedings.</p>

       <h2 class="mt-12 mb-6">Related Reading</h2>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><a href="/blog/minimum-child-support-washington-low-income">Minimum Support for Low-Income Parents: Your Options</a></li>
        <li><a href="/blog/washington-ssr-self-support-reserve-explained">The SSR: Protection for Genuinely Low-Income Obligors</a></li>
        <li><a href="/blog/how-courts-decide-child-support-washington">How Washington Courts Decide Your Support Order</a></li>
      </ul>

       <h2 class="mt-12 mb-6">Final Thoughts</h2>
      <p class="mb-4">Washington's child support enforcement system is designed to make avoidance expensive and difficult. The 12% interest rate and no statute of limitations mean unpaid support just keeps growing. The most expensive thing you can do is nothing. Run your current numbers through our <a href="/">calculator</a>, determine whether you're overpaying or underpaying, and if there's a problem, file a modification today, not next month.</p>
    <div class="mt-8 mb-8 p-6 bg-[var(--color-bg-subtle)] rounded-2xl border border-[var(--color-bg-border-soft)]"><h3 class="font-semibold text-[var(--color-text-body)] mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class=" hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><!-- TODO: restore when /income-5000-2-children page is created --><a href="/income-5000-2-children" class=" hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class=" hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class=" hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-sm  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">  <div>    <p class="font-semibold text-gray-900 text-base mb-1">      Calculate Your Exact Child Support    </p>    <p class="text-sm text-gray-500">      Free · 2026 RCW 26.19 Guidelines · All 39 Washington Counties    </p>  </div>  <a href="/worksheet"    class="btn btn-primary whitespace-nowrap">    Start Calculation →  </a></div>`,
    faqs: [
      {
        question: "Does unpaid child support in Washington affect my credit score?",
        answer: "Yes. DCS reports past-due balances to major credit bureaus once the arrearage reaches certain thresholds. A negative child support entry can significantly damage your credit score, affecting your ability to get a mortgage, car loan, or rental housing. This is another reason to address arrears proactively rather than letting them grow."
      },
      {
        question: "Can I deny my ex visitation because they're not paying support?",
        answer: "No. Washington law treats child support and parenting time (visitation) as completely separate legal issues. The children's right to see both parents is independent of the financial obligation. Withholding visitation in retaliation for non-payment is a violation of your parenting plan and can result in court sanctions against you, even if you're the one who hasn't been paid."
      },
      {
        question: "How far behind do I have to be before DCS suspends my driver's license?",
        answer: "DCS can pursue license suspension once you're 6 months past due OR owe more than $1,000 in arrears, whichever triggers first. However, you receive notice before suspension and have 20 days to respond. If you establish a payment plan within that window, you can often avoid suspension. Contact DCS as early as possible if you're falling behind."
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
    excerpt: "What actually happens when a Washington judge or commissioner decides your child support order, from the mandatory worksheet process to how income is verified and what deviation standards really look like.",
    metaTitle: "How Courts Decide Child Support in WA 2026 | WSCSS",
    metaDescription: "What actually happens when a Washington judge decides your child support order including how income is verified and what deviation standards look like.",
    author: "WSCSS Editorial Team",
    createdAt: "2026-05-04",
    updatedAt: "2026-05-04",
    featured: false,
    image: { url: "/wscss-og.webp", alt: "How Washington State Courts Decide Child Support Orders", width: 1200, height: 630 },
    content: `
      <div class="bg-[var(--color-brand-primary-light)] p-4 rounded-xl mb-8">
<strong>Key Takeaways (2026)</strong>
<ul class="space-y-2 text-indigo-800 list-disc ml-6 mt-2">
          <li>Most cases are decided by commissioners, not judges, but both have full authority</li>
          <li>Courts are required by law to complete worksheets before finalizing any order</li>
          <li>Income disputes are resolved with pay stubs, tax returns, and bank statements</li>
          <li>Deviations from the guideline amount require documented "good cause"</li>
          <li>Temporary orders take effect immediately, get them right from the start</li>
        </ul>
      </div>
      <p class="text-sm italic  mb-6">Disclaimer: This article describes Washington State child support court proceedings for educational purposes. It is not legal advice. Consult a licensed WA family law attorney for guidance on your specific case.</p>

      <p class="mb-4">Most people going through a child support case have an image of a formal courtroom, a gavel, and a black-robed judge making pronouncements from a raised bench. The reality is usually much less dramatic, and much more math-heavy. Understanding what actually happens in a Washington family court hearing can eliminate a lot of anxiety and help you show up prepared.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-brand-primary-light)] border-y border-[var(--color-brand-primary-mid)]'><th class='py-3 px-4 text-sm font-medium '>Legal Metric</th><th class='py-3 px-4 text-sm font-medium '>2026 Benchmark</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Self Support Reserve</td><td class='py-3 px-4 text-sm font-medium '>$2,394</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>Economic Table Limit</td><td class='py-3 px-4 text-sm font-medium '>$50,000</td></tr><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Minimum Support</td><td class='py-3 px-4 text-sm font-medium '>$50 per child per month</td></tr></tbody></table></div><p class="mb-4">Before your hearing, it's worth running your estimated obligation through our <a href="/">calculator</a> and our <a href="/worksheet">Worksheet Wizard</a>. Walking into court knowing your numbers is one of the most practical advantages you can have.</p>

       <h2 class="mt-12 mb-6">1. Commissioner or Judge, Who's Actually Deciding Your Case?</h2>
      <p class="mb-4">In Washington, most child support hearings are handled by <strong>Court Commissioners</strong> rather than Superior Court Judges. Commissioners are appointed judicial officers with full authority to establish, modify, and enforce child support orders. They're not junior judges, their orders carry exactly the same legal weight.</p>

      <p class="mb-4">The practical difference: commissioners run high volumes of cases efficiently and expect you to be thoroughly prepared. A commissioner who hears 15 child support cases in a morning doesn't have patience for incomplete financial declarations, missing worksheets, or vague answers about income. They run the math, check the law, and issue orders quickly.</p>

      <p class="mb-4">If a party disagrees with a commissioner's ruling, they can file a <strong>Motion for Revision</strong> to a Superior Court judge within 10 days. The judge reviews the commissioner's decision de novo (fresh), meaning they can change it entirely, but also that you need strong grounds, not just dissatisfaction with the outcome.</p>

      <p class="mb-4">Most WA family law matters are governed by the <a href="https://www.courts.wa.gov/" target="_blank" rel="nofollow">Washington Courts</a> uniform rules, with county-level local rules layered on top.</p>

      <div class='overflow-x-auto'><table class='w-full'><caption class='sr-only'>Financial Data Table</caption><thead><tr class='bg-[var(--color-warning-bg)] border-y border-[var(--color-warning-border)]'><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Decision Factor</th><th class='py-3 px-4 text-sm font-medium text-[var(--color-highlight)]'>Court Protocol</th></tr></thead><tbody><tr class='border-b border-[var(--color-bg-border-soft)]'><td class='py-3 px-4 text-sm '>Income Verification</td><td class='py-3 px-4 text-sm font-medium '>Based on W-2, pay stubs, and tax returns</td></tr><tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'><td class='py-3 px-4 text-sm '>Deviations</td><td class='py-3 px-4 text-sm font-medium '>Requires specific "good cause" written findings</td></tr></tbody></table></div> <h2 class="mt-12 mb-6">2. The Mandatory Worksheet Process</h2>
      <p class="mb-4">Washington law, specifically <strong>RCW 26.19.020</strong>, requires every court to use the standard economic table and complete the official child support worksheets before entering any order. This isn't optional, and courts can't skip it even for "simple" cases.</p>

      <p class="mb-4">The worksheets come in three parts:</p>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><strong>Worksheet 1:</strong> Calculates each parent's gross and net monthly income, documents all deductions, and establishes the combined monthly net income</li>
        <li><strong>Worksheet 2:</strong> Applies the economic table to find the basic support obligation and calculates each parent's proportional share</li>
        <li><strong>Worksheet 3:</strong> Adds extraordinary expenses (childcare, medical insurance, uninsured medical, other approved expenses) and calculates the final transfer payment</li>
      </ul>

      <p class="mb-4">If both parents submit conflicting worksheets, which happens in contested cases, the commissioner works through the discrepancies. The areas of dispute are almost always income amounts and extraordinary expense totals. Everything else is standardized math.</p>

       <h2 class="mt-12 mb-6">3. How Courts Verify Income</h2>
      <p class="mb-4">This is where contested hearings get most contentious. Each party is expected to disclose income honestly, but when there's a reason to doubt the disclosure, courts have powerful fact-finding tools.</p>

       <h3 class="mt-8 mb-4">For W-2 Employees</h3>
      <p class="mb-4">Pay stubs from the last 2–3 months plus the prior year's W-2 and tax return are the starting point. The court calculates your monthly income by averaging the pay stubs for regular income, then separately considering bonus and overtime history from the prior year.</p>

       <h3 class="mt-8 mb-4">For Self-Employed Parents</h3>
      <p class="mb-4">Self-employed income is the most contested category in Washington family court. The court starts with Schedule C or Schedule SE from the federal tax return. Then it decides which business expenses are legitimate deductions under RCW 26.19 versus personal expenses run through the business. Courts regularly add back expenses like depreciation on personal vehicles, meals, travel, and home office deductions that may be technically valid on taxes but don't reflect actual cash expenditure.</p>

       <h3 class="mt-8 mb-4">When Income Is Disputed or Hidden</h3>
      <p class="mb-4">If there are serious questions about whether a parent is hiding income, running cash businesses, being paid under the table, or having lifestyle evidence suggesting income much higher than declared, the court can order formal discovery: bank statements, credit card records, business finances, even real estate and investment records. <strong>Imputed income</strong> can be applied if the court finds a parent is voluntarily working below their capacity.</p>

       <h2 class="mt-12 mb-6">4. What Counts as "Extraordinary" Expenses</h2>
      <p class="mb-4">The base support amount covers ordinary costs: food, routine clothing, and shelter. Everything beyond that is "extraordinary" and goes through a separate calculation. Courts are fairly consistent about what qualifies:</p>

       <h3 class="mt-8 mb-4">Always Included:</h3>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li>Work-related childcare, daycare, before/after school programs that enable the parent to work</li>
        <li>Health, vision, and dental insurance premiums for the children specifically</li>
        <li>Uninsured medical, dental, and therapy expenses exceeding the standard deductible</li>
        <li>Long-distance travel costs directly related to the parenting schedule</li>
      </ul>

       <h3 class="mt-8 mb-4">Sometimes Included:</h3>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li>Private school tuition, only if previously agreed to by both parents or ordered by the court</li>
        <li>Special education costs not covered by public school</li>
        <li>Specific extracurricular activities, rarely included unless they were part of the child's prior lifestyle and the family can clearly afford them</li>
      </ul>

       <h2 class="mt-12 mb-6">5. When Do Courts Grant Deviations?</h2>
      <p class="mb-4">A deviation means the court orders a different amount than what the worksheets produce. They're not common, but they happen when there's documented justification. Under <strong>RCW 26.19.075</strong>, courts can deviate based on:</p>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><strong>Substantially equal residential time</strong>, when the child spends roughly equal time with both parents, each absorbing direct costs, a lower transfer payment makes sense</li>
        <li><strong>Non-recurring income</strong>, if a large bonus inflated one year's income but won't repeat, the court may average it differently</li>
        <li><strong>Prior support obligations</strong>, existing court-ordered support for other children can justify a downward deviation</li>
        <li><strong>Children who are self-supporting</strong>, relatively rare, but possible for older teenagers with significant jobs</li>
        <li><strong>Significant assets</strong>, when one parent has a trust fund or substantial investment income not reflected in their employment income</li>
        <li><strong>Debt incurred for the benefit of both parents</strong>, documented marital debt being paid entirely by one parent</li>
      </ul>

      <p class="mb-4">Courts require specific written findings for every deviation. "It just seems high" is not good cause. Documentary evidence, financial declarations, and specific statutory citations are expected.</p>

       <h2 class="mt-12 mb-6">6. What a Typical Hearing Looks Like</h2>
      <p class="mb-4">For most uncontested or lightly-contested cases, a child support hearing runs 15–30 minutes. The commissioner has reviewed your filed worksheets beforehand. You'll present your financial declarations, confirm the income figures, and the commissioner will work through any disputed numbers briefly before entering the order.</p>

      <p class="mb-4">For contested hearings, where both parties dispute income or extraordinary expenses, the hearing can run 1–2 hours. Each party presents documents, the commissioner asks direct questions, and occasionally requests additional documentation before ruling. You're not giving speeches about your relationship or your feelings about the other parent. This is a math and documentation exercise, not an emotional hearing.</p>

       <h2 class="mt-12 mb-6">Related Articles</h2>
       <ul class="list-disc pl-6 space-y-6 mb-8">
        <li><a href="/blog/child-support-calculation-washington-2026">Child Support Calculation: Step-by-Step Walkthrough</a></li>
        <li><a href="/blog/washington-child-support-guidelines-2026">2026 Guidelines: Complete Handbook</a></li>
        <li><a href="/blog/filing-child-support-king-county-guide">Filing in King County: Step-by-Step Guide</a></li>
      </ul>

       <h2 class="mt-12 mb-6">Conclusion</h2>
      <p class="mb-4">Washington courts don't improvise child support. They follow a rigid, legally-mandated process using standardized worksheets and the 2026 economic table. Your best preparation is accurate income documentation, completed worksheets, and a clear understanding of what extraordinary expenses you're including and why. Use our <a href="/worksheet">Worksheet Wizard</a> to generate complete, court-ready worksheets before your hearing, and walk in knowing exactly what the math says.</p>
    <div class="mt-8 mb-8 p-6 bg-[var(--color-bg-subtle)] rounded-2xl border border-[var(--color-bg-border-soft)]"><h3 class="font-semibold text-[var(--color-text-body)] mb-4">Calculate Your Obligations</h3><ul class="space-y-2"><li><a href="/worksheet" class=" hover:underline">Calculate your exact support using the Professional Worksheet</a></li><li><!-- TODO: restore when /income-5000-2-children page is created --><a href="/king-county-income-5000-2-children" class=" hover:underline">See real example for $5,000 income and 2 children</a></li><li><a href="/king-county-income-6000-1-child" class=" hover:underline">View King County example for $6,000 income</a></li><li><a href="/pierce-county-income-4000-2-children" class=" hover:underline">See Pierce County example at $4,000 income</a></li></ul></div><p class="text-sm  mt-8 italic">For official state resources and documentation, please visit the <a href="https://www.dshs.wa.gov" rel="nofollow" class=" hover:underline">Washington DSHS</a> or the <a href="https://www.courts.wa.gov" rel="nofollow" class=" hover:underline">Washington Courts</a> homepage.</p><div class="my-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">  <div>    <p class="font-semibold text-gray-900 text-base mb-1">      Calculate Your Exact Child Support    </p>    <p class="text-sm text-gray-500">      Free · 2026 RCW 26.19 Guidelines · All 39 Washington Counties    </p>  </div>  <a href="/worksheet"    class="btn btn-primary whitespace-nowrap">    Start Calculation →  </a></div>`,
    faqs: [
      {
        question: "Can I stop paying child support if my ex won't let me see my children?",
        answer: "No. Under Washington law, child support and residential time (visitation) are completely separate legal issues. Withholding support because of denied visitation puts you at risk of contempt of court, wage garnishment, and license suspension. The correct remedy for denied visitation is a motion to enforce your parenting plan, not stopping payments."
      },
      {
        question: "When does child support end in Washington State?",
        answer: "Generally, child support ends when the child turns 18 OR graduates high school, whichever is later, but no later than age 19. Support can continue beyond that if the child has a disability requiring ongoing support, but that requires a separate court order."
      },
      {
        question: "Does my new partner's income affect my child support?",
        answer: "Generally no. Washington does not include a new spouse's or domestic partner's income in the core calculation. However, if you've dramatically reduced your own work hours because your new partner is supporting your household, the court may impute income to you at the level you would otherwise earn."
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // BLOG 9
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: "How to Calculate Child Support in Washington State (2026 Guide)",
    slug: "how-to-calculate-child-support-washington-state",
    category: "Washington State Guide · 2026",
    keywords: "child support calculator wa, washington state child support calculator, wa child support schedule, wscss",
    readTime: "8 min",
    excerpt: "Learn exactly how to calculate child support in Washington State using the official WSCSS formula. Includes income, custody, and worksheet examples for 2026.",
    metaTitle: "How to Calculate Child Support in Washington State (2026 Guide)",
    metaDescription: "Learn exactly how to calculate child support in Washington State using the official WSCSS formula. Includes income, custody, and worksheet examples for 2026.",
    author: "WSCSS Editorial Team",
    createdAt: "2026-05-13",
    updatedAt: "2026-05-13",
    featured: false,
    image: { url: "/wscss-og.webp", alt: "How to Calculate Child Support in Washington State (2026 Guide)", width: 1200, height: 630 },
    content: `
      <div class="bg-[var(--color-bg-subtle)] p-6 rounded-2xl border border-[var(--color-bg-border-soft)] mb-8">
        <p class="text-sm italic">This is for informational purposes only. Child support orders are set by a court. Always consult a family law attorney.</p>
      </div>

      <p class="mb-4">Child support in Washington uses the WSCSS (Washington State Child Support Schedule) formula under RCW 26.19. Both parents' net incomes are used. This guide explains the full process step by step.</p>

      <div class="mt-8 mb-8 p-6 bg-[var(--color-bg-subtle)] rounded-2xl border border-[var(--color-bg-border-soft)]">
        <h2 class="text-lg font-bold mb-4">Table of Contents</h2>
        <ul class="space-y-2">
          <li><a href="#what-is-the-wa-child-support-schedule" class="text-blue-600 hover:underline">1. What Is the WA Child Support Schedule?</a></li>
          <li><a href="#who-pays-child-support-in-washington" class="text-blue-600 hover:underline">2. Who Pays Child Support in Washington?</a></li>
          <li><a href="#how-is-child-support-calculated" class="text-blue-600 hover:underline">3. How Is Child Support Calculated?</a></li>
          <li><a href="#step-by-step-calculation" class="text-blue-600 hover:underline">4. Step-by-Step Calculation</a></li>
          <li><a href="#sample-income-support-table-1-child" class="text-blue-600 hover:underline">5. Sample Income & Support Table</a></li>
          <li><a href="#when-can-courts-deviate-from-the-formula" class="text-blue-600 hover:underline">6. When Can Courts Deviate from the Formula?</a></li>
        </ul>
      </div>

      <h2 id="what-is-the-wa-child-support-schedule" class="mt-12 mb-6">What Is the WA Child Support Schedule?</h2>
      <ul class="list-disc pl-6 space-y-2 mb-8">
        <li>Established under RCW 26.19</li>
        <li>Income shares model</li>
        <li>Both parents' incomes factored in</li>
        <li>Reflects what parents would spend if together</li>
      </ul>

      <h2 id="who-pays-child-support-in-washington" class="mt-12 mb-6">Who Pays Child Support in Washington?</h2>
      <ul class="list-disc pl-6 space-y-2 mb-8">
        <li>Non-residential parent typically pays</li>
        <li>Even 50/50 custody may still require payment</li>
        <li>Depends on income differences</li>
      </ul>

      <h2 id="how-is-child-support-calculated" class="mt-12 mb-6">How Is Child Support Calculated?</h2>
      <div class="bg-[var(--color-bg-subtle)] p-6 rounded-xl border border-[var(--color-bg-border-soft)] font-mono text-sm mb-8 whitespace-pre-wrap">Combined Net Income = Parent 1 Net Income + Parent 2 Net Income
Basic Support Obligation = From WSCSS Table (based on combined income + number of children)
Each Parent's Share = (Their Net Income ÷ Combined Net Income) × BSO
Transfer payment = Non-residential parent's share</div>

      <h2 id="step-by-step-calculation" class="mt-12 mb-6">Step-by-Step Calculation</h2>

      <h3 class="mt-8 mb-4">Step 1 — Calculate Each Parent's Gross Monthly Income</h3>
      <p class="mb-4">Include wages, salaries, tips, bonuses, self-employment, rental income, Social Security. Exclude TANF and SSI.</p>

      <h3 class="mt-8 mb-4">Step 2 — Determine Net Monthly Income</h3>
      <p class="mb-4">Deduct: federal/state taxes, FICA, mandatory union dues, mandatory pension, court-ordered support for other children. Do NOT deduct voluntary expenses.</p>

      <h3 class="mt-8 mb-4">Step 3 — Add Both Net Incomes Together</h3>
      <p class="mb-4">This gives the Combined Monthly Net Income used in the WSCSS table.</p>

      <h3 class="mt-8 mb-4">Step 4 — Look Up the Basic Support Obligation</h3>
      <p class="mb-4">Find the income row and number-of-children column in the WSCSS table.</p>

      <h3 class="mt-8 mb-4">Step 5 — Calculate Each Parent's Proportional Share</h3>
      <p class="mb-4">Each parent's net ÷ combined net × BSO = their share. Non-residential parent's share = transfer payment.</p>

      <h3 class="mt-8 mb-4">Step 6 — Add Additional Expenses</h3>
      <p class="mb-4">Child care, health insurance premiums, and extraordinary medical expenses are split proportionally on top of the base amount.</p>

      <h2 id="sample-income-support-table-1-child" class="mt-12 mb-6">Sample Income & Support Table (1 Child)</h2>
      <div class='overflow-x-auto mb-4'>
        <table class='w-full'>
          <caption class='sr-only'>Sample Income & Support Table</caption>
          <thead>
            <tr class='bg-[var(--color-brand-primary-light)] border-y border-[var(--color-brand-primary-mid)]'>
              <th class='py-3 px-4 text-left text-sm font-medium'>Combined Net Monthly Income</th>
              <th class='py-3 px-4 text-left text-sm font-medium'>BSO (1 Child)</th>
              <th class='py-3 px-4 text-left text-sm font-medium'>BSO (2 Children)</th>
              <th class='py-3 px-4 text-left text-sm font-medium'>BSO (3 Children)</th>
            </tr>
          </thead>
          <tbody>
            <tr class='border-b border-[var(--color-bg-border-soft)]'>
              <td class='py-3 px-4 text-sm'>$1,000</td>
              <td class='py-3 px-4 text-sm font-medium'>$252</td>
              <td class='py-3 px-4 text-sm font-medium'>$349</td>
              <td class='py-3 px-4 text-sm font-medium'>$396</td>
            </tr>
            <tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'>
              <td class='py-3 px-4 text-sm'>$2,000</td>
              <td class='py-3 px-4 text-sm font-medium'>$401</td>
              <td class='py-3 px-4 text-sm font-medium'>$556</td>
              <td class='py-3 px-4 text-sm font-medium'>$631</td>
            </tr>
            <tr class='border-b border-[var(--color-bg-border-soft)]'>
              <td class='py-3 px-4 text-sm'>$3,000</td>
              <td class='py-3 px-4 text-sm font-medium'>$515</td>
              <td class='py-3 px-4 text-sm font-medium'>$713</td>
              <td class='py-3 px-4 text-sm font-medium'>$809</td>
            </tr>
            <tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'>
              <td class='py-3 px-4 text-sm'>$4,000</td>
              <td class='py-3 px-4 text-sm font-medium'>$612</td>
              <td class='py-3 px-4 text-sm font-medium'>$847</td>
              <td class='py-3 px-4 text-sm font-medium'>$961</td>
            </tr>
            <tr class='border-b border-[var(--color-bg-border-soft)]'>
              <td class='py-3 px-4 text-sm'>$5,000</td>
              <td class='py-3 px-4 text-sm font-medium'>$697</td>
              <td class='py-3 px-4 text-sm font-medium'>$966</td>
              <td class='py-3 px-4 text-sm font-medium'>$1,096</td>
            </tr>
            <tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'>
              <td class='py-3 px-4 text-sm'>$6,000</td>
              <td class='py-3 px-4 text-sm font-medium'>$770</td>
              <td class='py-3 px-4 text-sm font-medium'>$1,067</td>
              <td class='py-3 px-4 text-sm font-medium'>$1,210</td>
            </tr>
            <tr class='border-b border-[var(--color-bg-border-soft)]'>
              <td class='py-3 px-4 text-sm'>$7,000</td>
              <td class='py-3 px-4 text-sm font-medium'>$844</td>
              <td class='py-3 px-4 text-sm font-medium'>$1,169</td>
              <td class='py-3 px-4 text-sm font-medium'>$1,326</td>
            </tr>
            <tr class='border-b border-[var(--color-bg-border-soft)] bg-[var(--color-bg-subtle)]/50'>
              <td class='py-3 px-4 text-sm'>$8,000</td>
              <td class='py-3 px-4 text-sm font-medium'>$908</td>
              <td class='py-3 px-4 text-sm font-medium'>$1,258</td>
              <td class='py-3 px-4 text-sm font-medium'>$1,426</td>
            </tr>
            <tr class='border-b border-[var(--color-bg-border-soft)]'>
              <td class='py-3 px-4 text-sm'>$10,000</td>
              <td class='py-3 px-4 text-sm font-medium'>$1,013</td>
              <td class='py-3 px-4 text-sm font-medium'>$1,404</td>
              <td class='py-3 px-4 text-sm font-medium'>$1,591</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-sm italic mb-8">These are approximate figures. Use the official WSCSS table or our calculator for accurate numbers.</p>

      <h2 id="when-can-courts-deviate-from-the-formula" class="mt-12 mb-6">When Can Courts Deviate from the Formula?</h2>
      <p class="mb-4">Courts can deviate when standard amount would be unjust. Reasons include:</p>
      <ul class="list-disc pl-6 space-y-2 mb-8">
        <li>Significant residential time with non-custodial parent</li>
        <li>Special needs of the child</li>
        <li>Tax benefits received by a parent</li>
        <li>Non-recurring income (bonuses, inheritances)</li>
        <li>Income of a new spouse (considered but not directly counted)</li>
      </ul>
      <p class="mb-4">Any deviation must be written in the order with explanation.</p>
    `,
    faqs: [
      {
        question: "Does 50/50 custody eliminate child support in Washington?",
        answer: "Not automatically. Even with equal residential time, if one parent earns significantly more, they may still owe support. The WSCSS formula accounts for shared custody, often reducing but not eliminating support."
      },
      {
        question: "What income is used for self-employed parents?",
        answer: "Gross income minus legitimate business expenses. Courts can impute income if a parent appears underemployed or hiding income."
      },
      {
        question: "How long does child support last in Washington?",
        answer: "Until the child turns 18 or graduates high school — whichever is later — but no later than age 19. Can continue longer for special needs."
      },
      {
        question: "Can child support be modified?",
        answer: "Yes, if there is a substantial change in circumstances — significant income change, custody change, or change in child's needs."
      },
      {
        question: "What is the WSCSS worksheet?",
        answer: "The official document showing courts how child support was calculated. Required to be filed with every child support order."
      }
    ]
  }
];
