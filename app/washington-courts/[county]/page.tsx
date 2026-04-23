import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  washingtonCounties,
  WashingtonCounty,
} from "@/data/washingtonCounties";
import { HomeCalculatorClient as HomeCalculator } from "@/components/ClientDynamic";
import {
  Building2,
  ChevronRight,
  Phone,
  MapPin,
  ExternalLink,
  Lightbulb,
  Info,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import CalculatorSchema from "@/components/CalculatorSchema";
import FAQAccordion from "@/components/FAQAccordion";
import { cleanEmDashContent } from "@/lib/textOptimizer";

type Props = { params: Promise<{ county: string }> };

// ISR: Avoid SSG prerendering which crashes client components.
export const dynamicParams = true;
export const revalidate = 2592000;

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county: slug } = await params;
  const county = washingtonCounties.find((c) => c.slug === slug);
  if (!county) return {};

  return {
    title: `Child Support in ${county.name} Washington 2026 | Court Guide & Calculator`,
    description: `Free 2026 child support calculator for ${county.name}, WA. Official SSR (approximately $2,394), income shares model, local ${county.court} filing info, clerk phone & step-by-step guide.`,
    alternates: {
      canonical: `https://wcssc.site/washington-courts/${county.slug}`,
    },
  };
}

// ─── Programmatic Content Generator ──────────────────────────────────────────
function generateCountyContent(county: WashingtonCounty): {
  introduction: string[];
  howItWorks: string[];
  filingProcess: string[];
  localInsightExpanded: string[];
  exampleNarrative: string[];
  conclusion: string[];
  filingSteps: { step: string; detail: string }[];
} {
  // Vary tone and phrasing based on county traits for uniqueness
  const isLargeUrban = [
    "king-county",
    "pierce-county",
    "snohomish-county",
    "spokane-county",
  ].includes(county.slug);
  const isRemote = [
    "ferry-county",
    "garfield-county",
    "wahkiakum-county",
    "pend-oreille-county",
    "douglas-county",
  ].includes(county.slug);
  const isIsland = ["island-county", "san-juan-county"].includes(county.slug);
  const isBorderCounty = ["asotin-county", "walla-walla-county"].includes(
    county.slug,
  );
  const isStateCapital = county.slug === "thurston-county";
  const isBilingual = county.slug === "yakima-county";

  const contextPhrase = isLargeUrban
    ? `As one of Washington's most populous counties, ${county.name} sees a disproportionately high volume of family law filings each year`
    : isRemote
      ? `Though ${county.name} is one of Washington's more rural and geographically vast counties, its residents have equal access to state-mandated child support protections`
      : isIsland
        ? `The unique geographical nature of ${county.name} — accessible by ferry from the mainland — adds an additional logistical consideration when planning family law court appearances`
        : isBorderCounty
          ? `${county.name} sits near the Oregon border, and many families navigating child support here have cross-jurisdictional concerns that require careful handling under Washington's RCW 26.19 statute`
          : isStateCapital
            ? `As the seat of Washington State government in Olympia, ${county.name} is uniquely positioned where the laws governing child support are literally written — yet enforcement happens locally at the county level like everywhere else`
            : isBilingual
              ? `${county.name} has a large Spanish-speaking population, and the local court system proactively provides bilingual facilitator support — a significant advantage for non-English-speaking parents navigating family law`
              : `${county.name} is one of the 39 Washington counties whose residents rely on the Washington State Child Support Schedule (WSCSS) to determine child support obligations`;

  const introduction = [
    `Understanding child support in ${county.name}, Washington requires navigating both uniform state law and specific local court procedures. ${contextPhrase}. Under Washington's Revised Code (RCW 26.19), child support obligations are calculated using an Income Shares Model — a methodology designed to ensure that children receive a level of financial support proportionate to what they would have enjoyed if their parents had remained together.`,
    `In 2026, the Washington State Administrative Office of the Courts (AOC) updated the mandatory child support economic tables that all ${county.name} courts must use. These tables cap at a combined monthly net income of $50,000 and set a firm Self-Support Reserve (SSR) of approximately $2,394 per month — a critical poverty-protection threshold that prevents courts from issuing orders that would impoverish the paying parent.`,
    `This guide provides ${county.name} residents with everything they need: a live 2026 calculator, step-by-step filing instructions for the ${county.court}, local procedural tips, and clear answers to the most common child support questions specific to this county.`,
  ];

  const howItWorks = [
    `Washington's Income Shares Model — the legal framework used in ${county.name} and every county in the state — starts with a simple but powerful premise: both parents are financially responsible for their children. The court determines each parent's monthly net income (gross income minus mandatory deductions like income taxes, Social Security, and state-mandated insurance premiums). These two incomes are added together to form the Combined Monthly Net Income (CMNI).`,
    `Next, the court looks up the applicable basic support obligation from the Washington 2026 economic table based on the CMNI and the number of children. For example, two parents earning a combined $8,000 per month with 2 children would have a presumptive basic support obligation of around $1,600 to $1,700 per month total. This total amount is then divided proportionally based on each parent's share of the combined income.`,
    `Beyond the base obligation, the 2026 guidelines require parents in ${county.name} to proportionally split additional "extraordinary expenses" such as work-related childcare, health insurance premiums for the child, and approved educational costs. These are calculated separately using the same income-share formula. Use our <strong>Extra Expense Splitter</strong> at <a href="/extra-expenses">/extra-expenses</a> to calculate these add-on costs.`,
    `A crucial protection in every ${county.name} child support case is the Self-Support Reserve (SSR). Under 2026 rules, the SSR is set at <strong>approximately $2,394 per month</strong> — equal to 180% of the federal poverty level for a single person. If the paying parent's remaining monthly income after paying child support falls below approximately $2,394, the court must limit the support amount to protect them. The absolute minimum support obligation per child is $50 per month regardless of income.`,
  ];

  const filingProcess = [
    `Filing for child support in ${county.name} is a multi-step legal process that requires submitting several mandatory documents to the ${county.court}. The primary location for filing is ${county.courtAddress}. You can reach the clerk's office at ${county.clerkPhone}. Before showing up, call ahead to confirm current operating hours, as many rural Washington county clerks maintain limited hours.`,
    `The most critical document you must prepare is the <strong>Washington Child Support Worksheet (FL All Family 130)</strong>. This is the official 2026 form that translates your financial data into a presumptive support amount using the AOC economic tables. You can use our free calculator above to prepare your estimates before formally completing the official PDF version.`,
    `Alongside your worksheet, you must file a <strong>Financial Declaration (FL All Family 131)</strong>. This sworn document — signed under penalty of perjury — discloses your complete financial picture: income from all sources, monthly expenses, debts, and assets. Incomplete or misleading financial declarations are one of the leading reasons judges in ${county.name} impute income at a higher rate than what a parent actually earns.`,
    `Once your paperwork is filed and the fee of ${county.filingFee} is paid (fee waivers are available via Form GR 34 for qualifying low-income filers), the other parent must be served via a third-party process server or Sheriff — the petitioner cannot self-serve. A Response to Petition and Response to Motion (FL All Family 120) is then due from the other party within 20 days in ${county.name} if personally served.`,
  ];

  const localInsightExpanded = [
    `Here is a critical local insight for ${county.name} filers: ${county.localTip}`,
    isLargeUrban
      ? `In high-volume counties like ${county.name}, understanding the court's internal workflow can make or break your timeline. Large urban courts often have separate family law commissioners and judge rotations. Motions for temporary support orders may be heard on dedicated "Family Law Motion" days. Showing up without confirming your assigned courtroom and calendar can result in your motion being stricken — losing weeks of progress.`
      : isRemote
        ? `In a rural county like ${county.name}, the logistical challenges of appearing in court are very real. The clerk's office may have only one or two staff members handling all case types. Incomplete packets or missing signatures will likely require you to return in person — a significant burden if you live far from ${county.seat}. The best practice is to call the clerk at ${county.clerkPhone} in advance, describe exactly what you're filing, and ask if there is anything specific they need prepared.`
        : isIsland
          ? `For ${county.name} residents who must take a ferry to reach ${county.seat}, the courts have no blanket policy excusing ferry-related tardiness. You must plan for the earliest reasonable departure. Check Washington State Ferries scheduling at wsdot.wa.gov before any court date. Courts routinely deny continuances for "ferry issues" unless documented by extreme weather.`
          : `Filing properly in ${county.name} means understanding not just the state rules, but also the local courtroom culture. Every county's judge and commissioner has discretionary latitude on procedural compliance. Some counties are known to be stricter about formatting requirements, attachment checklists, and scheduling. Getting these details wrong can delay your case by months even if your underlying math is correct.`,
    `Pro tip: Before submitting your final packet to the ${county.court} clerk, review the Local Family Law Rules (LFLR) published directly on the court's official website at ${county.website}. These county-specific rules cover mandatory formatting requirements, hearing scheduling procedures, and whether a mandatory parenting seminar is required before a hearing is set.`,
  ];

  const exampleNarrative = [
    `To illustrate how the 2026 income shares model applies to a real-world ${county.name} family, consider this scenario: Parent A is a healthcare worker earning $5,000 per month net after taxes and mandatory deductions. Parent B is a part-time retail worker earning $3,000 per month net. They have two children together. Their combined monthly net income (CMNI) is $8,000.`,
    `Referencing the 2026 Washington economic table for $8,000 combined income with 2 children, the presumptive basic support obligation is approximately $1,883 per month. Parent A earns 62.5% of the combined income ($5,000 ÷ $8,000), so Parent A's proportional share is approximately <strong>$1,176.88 per month</strong>. Parent B's 37.5% share equals approximately <strong>$706.12 per month</strong>.`,
    `Now assume the children are in employer-sponsored childcare costing $800 per month, and the children are on Parent B's health insurance plan at a cost of $200 per month — both allowable extraordinary expenses under RCW 26.19.075. These are split proportionally by the same 62.5/37.5 ratio. The final monthly cash transfer payment — typically from the higher-earning Parent A to Parent B — would be calculated by the court considering residential credit, the direction of income flow, and all extraordinary add-ons.`,
    `Neither parent's income in this example falls below the approximately $2,394 SSR threshold, so no adjustments are needed. Had Parent B been earning significantly less, the SSR would have capped the obligation to protect them. Courts at the ${county.court} apply this calculation consistently, though judges retain discretion to deviate from the presumptive amount when compelling extraordinary circumstances are documented and argued effectively.`,
  ];

  const conclusion = [
    `Navigating child support in ${county.name} requires a firm grasp of both statewide law and local court procedures. Washington's Income Shares Model is designed to be fair, transparent, and anchored in economic data — but the process of actually filing, serving, and arguing your case in front of a family law commissioner at the ${county.court} requires careful preparation.`,
    `Start with our free 2026 calculator above to understand your presumptive obligation. Then use the Full Worksheet Wizard to prepare a court-ready document. If you believe a deviation from the presumptive amount is warranted — due to shared residential time, high extraordinary expenses, or unusual financial circumstances — consult with a licensed Washington State family law attorney in ${county.seat} who understands the nuances of ${county.name} family courts.`,
    `This page is updated regularly to reflect the most current 2026 Washington State Child Support Schedule guidelines. Bookmark it as your local reference and share it with other ${county.name} parents who need reliable, accurate family law information.`,
  ];

  const filingSteps = [
    {
      step: "Calculate Your Estimate",
      detail: `Use the free calculator on this page to determine your presumptive 2026 amount based on both parents' net incomes and number of children.`,
    },
    {
      step: "Complete the Worksheet",
      detail: `Fill out the official FL All Family 130 (Child Support Worksheet). Our Pro Wizard generates a print-ready version automatically.`,
    },
    {
      step: "File Your Financial Declaration",
      detail: `Complete FL All Family 131 under oath. Attach 2 years of tax returns and 6 months of recent pay stubs as sealed exhibits.`,
    },
    {
      step: `File at ${county.court}`,
      detail: `Submit your packet to the clerk at ${county.courtAddress}. Pay the filing fee of ${county.filingFee} or request a fee waiver (Form GR 34).`,
    },
    {
      step: "Serve the Other Parent",
      detail: `Have a neutral third party (over 18) serve the filed documents. You cannot serve papers yourself. File the Proof of Service with the clerk.`,
    },
    {
      step: "Attend Your Hearing",
      detail: `Review the local calendar for ${county.name}. Some counties use dedicated Family Law Motion days. Arrive early and bring copies of everything.`,
    },
  ];

  return {
    introduction: introduction.map(cleanEmDashContent),
    howItWorks: howItWorks.map(cleanEmDashContent),
    filingProcess: filingProcess.map(cleanEmDashContent),
    localInsightExpanded: localInsightExpanded.map(cleanEmDashContent),
    exampleNarrative: exampleNarrative.map(cleanEmDashContent),
    conclusion: conclusion.map(cleanEmDashContent),
    filingSteps: filingSteps.map((step) => ({
      ...step,
      detail: cleanEmDashContent(step.detail),
    })),
  };
}

// ─── County Page Component ────────────────────────────────────────────────────
export default async function CountyCourtPage({ params }: Props) {
  const { county: slug } = await params;
  const county = washingtonCounties.find((c) => c.slug === slug);
  if (!county) notFound();

  const content = generateCountyContent(county!);

  // Pick 4 nearby/related counties for internal linking (exclude self)
  const relatedCounties = washingtonCounties
    .filter((c) => c.slug !== county!.slug)
    .slice(0, 5);

  const mapQuery = encodeURIComponent(county!.courtAddress);

  const faqs = [
    {
      q: `Does living in ${county!.name} affect my child support amount?`,
      a: `No. Child support is governed by uniform Washington State law (RCW 26.19). The presumptive amount in ${county!.name} uses the exact same 2026 economic table as every other county in Washington. County of residence only affects where you file and which local court rules apply.`,
    },
    {
      q: "What is the minimum child support in Washington State?",
      a: `The presumptive minimum is $50 per child per month. This floor exists even for very low-income paying parents. In 2026, judges in ${county!.name} may deviate below this minimum only in extraordinary circumstances documented in court findings.`,
    },
    {
      q: `Where do I file child support paperwork in ${county!.name}?`,
      a: `You file your Child Support Worksheet (FL All Family 130) and Financial Declaration (FL All Family 131) with the Clerk of the ${county!.court}, located at ${county!.courtAddress}. The standard filing fee is ${county!.filingFee}. Call the clerk at ${county!.clerkPhone} to confirm current hours before visiting.`,
    },
    {
      q: `What is the Self-Support Reserve (SSR) in 2026?`,
      a: `The Self-Support Reserve is a poverty protection threshold set by the state. In 2026, the SSR is approximately $2,394 per month — equal to 180% of the federal poverty level for a single individual. A ${county!.name} court cannot issue a child support order that leaves the paying parent with less than approximately $2,394 to live on each month.`,
    },
    {
      q: `Can a child support order from ${county!.name} be modified later?`,
      a: `Yes. You may petition the ${county!.court} for a modification if: (1) there has been a substantial change in circumstances such as job loss, disability, or a major income change; or (2) it has been at least 24 months since the last order was entered. The same worksheet process applies for modifications.`,
    },
    {
      q: `What happens if the paying parent refuses to pay in ${county!.name}?`,
      a: `Washington has robust enforcement mechanisms through the Division of Child Support (DCS). Consequences for non-payment include wage garnishment, bank levies, suspension of driver's and professional licenses, passport denial, and contempt of court proceedings at the ${county!.court}. Contact the DCS at 1-800-442-KIDS for enforcement assistance.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GovernmentOffice",
        name: county!.court,
        address: {
          "@type": "PostalAddress",
          streetAddress: county!.courtAddress,
          addressRegion: "WA",
          addressCountry: "US",
        },
        telephone: county!.clerkPhone,
        url: county!.website,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://wcssc.site/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Courts",
            item: "https://wcssc.site/washington-courts",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: county!.name,
            item: `https://wcssc.site/washington-courts/${county!.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="flex-1 bg-[#FDFDFE] w-full font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorSchema
        county={county?.name}
        url={`https://wcssc.site/washington-courts/${county?.slug}`}
      />

      {/* ── 1. HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 section-hero text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 mb-8 label-metadata">
            <Link href="/" className="hover: transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <Link
              href="/washington-courts"
              className="hover: transition-colors"
            >
              Courts
            </Link>
            <ChevronRight className="w-3 h-3 opacity-40" />
            <span>{county!.name}</span>
          </nav>

          <h1 className=" mb-6 leading-[1.05] max-w-3xl mx-auto">
            Child Support Calculator – <span>{county!.name}</span>
            <br className="hidden sm:block" /> Washington <span>(2026)</span>
          </h1>

          <p className="text-body leading-relaxed text-body max-w-3xl mx-auto mb-8">
            Official 2026 child support estimates for {county!.name} residents.
            Based on the Washington State Income Shares Model with the updated
            SSR of <strong>approximately $2,394</strong> and economic tables
            covering incomes up to <strong>$50,000 combined</strong>. File
            locally at the {county!.court}.
          </p>

          {/* Quick stats strip */}
          <div className="inline-flex flex-wrap justify-center gap-4 label-metadata">
            <span className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full">
              SSR: approximately $2,394
            </span>
            <span className="bg-gray-100 px-4 py-2 rounded-full">
              2026 Guidelines
            </span>
            <span className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full">
              All 39 Counties
            </span>
            <span className="bg-amber-50 text-amber-700 px-4 py-2 rounded-full">
              Min: $50 / child
            </span>
          </div>
        </div>
      </section>

      {/* ── 2. CALCULATOR ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className=" mb-2 ">
              Free {county!.name} Child Support Calculator (2026)
            </h2>
            <p className=" text-sm">
              Enter both parents&apos; monthly net incomes below. Results are
              based on the official Washington 2026 economic table.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <HomeCalculator />
          </div>
          <div className="max-w-lg mx-auto mt-8">
            <p className="label-metadata text-center italic">
              Low-income protections may apply below approximately $2,394/month
              (180% of the federal poverty level). Estimates are based on
              Washington State guidelines (RCW 26.19).
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
          <main className="lg:col-span-7 space-y-20">
            {/* A. INTRODUCTION */}
            <section>
              <h2 className=" mb-6 ">
                Child Support in {county!.name}: A 2026 Guide
              </h2>
              {content.introduction.map((para, i) => (
                <p key={i} className=" mb-5 text-body">
                  {para}
                </p>
              ))}
              <p className="text-sm italic mt-4">
                Our estimates are based on the latest 2026 guidelines. Learn
                more about our{" "}
                <Link
                  href="/editorial-methodology"
                  className=" underline hover:text-indigo-800"
                >
                  calculation methodology
                </Link>
                .
              </p>
            </section>

            {/* B. HOW IT WORKS */}
            <section>
              <h2 className=" mb-6 ">
                How Child Support Is Calculated in {county!.name}
              </h2>
              {content.howItWorks.map((para, i) => (
                <p
                  key={i}
                  className=" mb-5 text-body"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}

              {/* 3. KEY FIGURES */}
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm mt-8">
                <div className="bg-gray-900 text-white px-6 py-3 min-h-[48px] flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-400" />
                  <span className="label-metadata ">
                    2026 Key Figures — Statewide
                  </span>
                </div>
                <table className="w-full text-sm border border-gray-100 rounded-xl overflow-hidden">
                  <caption className="sr-only">
                    County Calculation Examples
                  </caption>
                  <tbody>
                    {[
                      ["Legal Model", "Income Shares (RCW 26.19)"],
                      [
                        "Self-Support Reserve (SSR)",
                        "approximately $2,394 / month",
                      ],
                      ["Minimum Support", "$50 per child / month"],
                      [
                        "Economic Table Coverage",
                        "Up to $50,000 combined income",
                      ],
                      ["Guideline Version", "Washington AOC — January 2026"],
                    ].map(([label, value], i) => (
                      <tr
                        key={i}
                        className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-gray-50/50" : "bg-white"}`}
                      >
                        <td className="px-6 py-3  ">{label}</td>
                        <td className="px-6 py-3  text-right">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* C. FILING PROCESS */}
            <section>
              <h2 className=" mb-6 ">
                Step-by-Step Filing Process in {county!.name}
              </h2>
              {content.filingProcess.map((para, i) => (
                <p
                  key={i}
                  className=" mb-5 text-body"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}

              {/* Numbered filing steps */}
              <div className="mt-8 stack-space">
                {content.filingSteps.map((step, i) => (
                  <div
                    key={i}
                    className="flex gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className=" mb-1 ">{step.step}</h4>
                      <p className="text-sm ">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* E. LOCAL INSIGHT EXPANDED */}
            <section>
              <h2 className=" mb-6 ">Local Filing Insights: {county!.name}</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-amber-500 shrink-0" />
                  <span className="text-sm uppercase text-amber-700">
                    Local Expert Tip
                  </span>
                </div>
                {content.localInsightExpanded.map((para, i) => (
                  <p
                    key={i}
                    className="text-amber-900 mb-4 last:mb-0 text-body "
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Required documents list */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className=" mb-5 flex items-center gap-2">
                  <FileText className="w-5 h-5 " />
                  Required Documents for {county!.name}
                </h3>
                <ul className="space-y-3">
                  {[
                    "FL All Family 130 — Child Support Worksheet",
                    "FL All Family 131 — Financial Declaration (signed under penalty of perjury)",
                    "Last 2 years of full Federal and State tax returns (sealed)",
                    "Last 6 months of pay stubs from all employers (sealed)",
                    "Documentation of all extraordinary expenses (childcare receipts, insurance EOBs)",
                    "Proof of Service after the other parent is served",
                  ].map((doc, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm ">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* F. EXAMPLE CALCULATION */}
            <section>
              <h2 className=" mb-6 ">
                Example Calculation for {county!.name} Families
              </h2>
              {content.exampleNarrative.map((para, i) => (
                <p
                  key={i}
                  className=" mb-5 text-body"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}
              {/* Visual calc breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="bg-gray-900 text-white rounded-xl p-5 text-center">
                  <p className="label-metadata mb-2">
                    Parent A Net
                  </p>
                  <p className="text-2xl ">$5,000</p>
                  <p className="label-metadata text-indigo-400 mt-1 ">
                    62.5%
                  </p>
                </div>
                <div className="bg-gray-200 rounded-xl p-5 text-center">
                  <p className="label-metadata mb-2">
                    Parent B Net
                  </p>
                  <p className="text-2xl ">$3,000</p>
                  <p className="label-metadata mt-1 ">
                    37.5%
                  </p>
                </div>
                <div className="bg-indigo-600 text-white rounded-xl p-5 text-center">
                  <p className="label-metadata text-indigo-200 mb-2">
                    2 Children Total
                  </p>
                  <p className="text-2xl ">≈$1,883</p>
                  <p className="label-metadata text-indigo-200 mt-1 ">
                    Presumptive Obligation
                  </p>
                </div>
              </div>
            </section>

            {/* G. FAQs */}
            <section>
              <h2 className=" mb-8 ">
                Frequently Asked Questions — {county!.name}
              </h2>
              <FAQAccordion
                items={faqs.map((f) => ({ question: f.q, answer: f.a }))}
              />
            </section>

            {/* H. CONCLUSION */}
            <section className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
              <h2 className=" mb-5 ">Your Next Steps in {county!.name}</h2>
              {content.conclusion.map((para, i) => (
                <p key={i} className="text-indigo-800 mb-4 last:mb-0">
                  {para}
                </p>
              ))}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Link
                  href="/worksheet"
                  className="flex-1 text-center px-6 py-3 min-h-[48px] bg-indigo-600 text-white rounded-xl hover:bg-gray-100 transition-colors text-sm"
                >
                  Launch Full Worksheet Wizard
                </Link>
                <Link
                  href="/how-to-file-child-support-washington"
                  className="flex-1 text-center px-6 py-3 min-h-[48px] bg-white border border-indigo-200 text-indigo-700 rounded-xl hover:bg-indigo-50 transition-colors text-sm"
                >
                  Read Full Filing Guide
                </Link>
              </div>
            </section>
          </main>

          {/* ── SIDEBAR ───────────────────────────────────────────────────── */}
          <aside className="lg:col-span-5 space-y-8 lg:sticky lg:top-24 lg:self-start">
            {/* D. COURT INFO CARD */}
            <div className="bg-gray-900 text-white rounded-xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl -translate-y-20 translate-x-20 pointer-events-none" />
              <Building2 className="w-8 h-8 text-indigo-400 mb-6" />
              <h3 className=" mb-7 ">{county!.court}</h3>

              <div className="space-y-5 mb-6">
                <div>
                  <p className="label-metadata mb-1">
                    Physical Address
                  </p>
                  <p className="flex items-start gap-2 text-sm ">
                    <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    {county!.courtAddress}
                  </p>
                </div>
                <div>
                  <p className="label-metadata mb-1">
                    Clerk Phone
                  </p>
                  <p className="flex items-center gap-2 text-sm ">
                    <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                    {county!.clerkPhone}
                  </p>
                </div>
                <div>
                  <p className="label-metadata mb-1">
                    Standard Filing Fee
                  </p>
                  <p className="text-sm ">{county!.filingFee}</p>
                </div>
                <div className="flex items-start gap-2 bg-white/5 p-3 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p className="label-metadata ">
                    Call ahead to verify current clerk hours before visiting.
                  </p>
                </div>
              </div>

              <a
                href={county!.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3  bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors text-sm"
              >
                Official Court Website <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* 5. GOOGLE MAP */}
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <div className="bg-gray-800 text-white px-5 py-3 min-h-[48px] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span className="label-metadata ">
                  Courthouse Location
                </span>
              </div>
              <div
                className="relative"
                style={{ paddingBottom: "65%", height: 0 }}
              >
                <iframe
                  title={`${county!.name} Courthouse Map`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute top-0 left-0 w-full h-full border-0"
                />
              </div>
              <div className="bg-gray-50 border-t border-gray-100 p-3 text-center">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label-metadata hover:text-indigo-800 transition-colors flex items-center justify-center gap-1"
                >
                  Open in Google Maps <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* INTERNAL LINKS */}
            <div className="bg-white border border-gray-200 rounded-xl p-7 shadow-sm">
              <h4 className="label-metadata mb-5 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Related Legal Resources
              </h4>
              <nav className="flex flex-col space-y-2.5">
                {[
                  {
                    href: "/worksheet",
                    label: "Official Child Support Worksheet (2026)",
                  },
                  {
                    href: "/extra-expenses",
                    label: "Proportional Expense Splitter",
                  },
                  {
                    href: "/compare-2024-2026",
                    label: "2024 vs 2026 Guidelines Comparison",
                  },
                  {
                    href: "/glossary/self-support-reserve",
                    label: "What is the SSR? (Glossary)",
                  },
                  {
                    href: "/how-to-file-child-support-washington",
                    label: "WA State Filing Guide (Step by Step)",
                  },
                  { href: "/blog", label: "Family Law Guides & Blog" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2 text-sm hover: transition-colors "
                  >
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    {label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* OTHER COUNTIES */}
            <div className="bg-white border border-gray-200 rounded-xl p-7 shadow-sm">
              <h4 className="label-metadata mb-5">
                Other County Guides
              </h4>
              <nav className="flex flex-col space-y-2.5">
                {relatedCounties.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/washington-courts/${c.slug}`}
                    className="flex items-center gap-2 text-sm hover: transition-colors "
                  >
                    <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                    {c.name} Child Support Guide
                  </Link>
                ))}
                <Link
                  href="/washington-courts"
                  className="label-metadata hover:text-indigo-800 mt-2 block"
                >
                  View All 39 Counties →
                </Link>
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* 9. DISCLAIMER */}
      <div className="bg-gray-100 border-t border-gray-200 py-10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
            <p className="label-metadata ">
              <strong>Legal Disclaimer:</strong> This content is for
              informational purposes only and does not constitute legal advice.
              The estimates produced by this calculator are based on the 2026
              Washington State Child Support Schedule published by the
              Administrative Office of the Courts. Actual court-ordered support
              amounts in {county!.name} may differ based on judicial discretion,
              income imputation, deviation requests, residential credit
              calculations, and extraordinary expense adjustments. WCSSC is not
              a law firm and does not provide legal representation. Please
              consult with a licensed Washington State family law attorney for
              advice specific to your circumstances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
