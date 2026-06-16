import { getExactSupport, washingtonSupportTable2026 } from "@/data/washingtonTable2026";
import {
  washingtonCounties,
  WashingtonCounty,
} from "@/data/washingtonCounties";
import { getIncomePageMeta } from "@/utils/seo";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calculator, Info, Landmark, Scale, ChevronRight, MapPin } from "lucide-react";
import {
  CountySidebarClient as CountySidebar,
  PrintButtonClient as PrintButton,
} from "@/components/ClientDynamic";
import PrintReport from "@/components/calculator/PrintReport";
import ErrorBoundary from "@/components/ErrorBoundary";
import CalculatorSchema from "@/components/CalculatorSchema";
import FAQAccordion from "@/components/FAQAccordion";
import { getBreadcrumbSchema } from "@/utils/jsonld";
import { contentVariants } from "@/lib/contentVariants";
import { getVariantIndices, formatVariant } from "@/lib/getVariant";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;
export const revalidate = 2592000; // 30 days ISR cache

function parseSlug(slug: string) {
  const countyMatch = slug.match(
    /^(.+)-income-(\d+)-(\d+)-(?:child|children)$/,
  );
  if (countyMatch) {
    const county = washingtonCounties.find((c) => c.slug === countyMatch[1]);
    if (!county) return null;
    return {
      county,
      income: parseInt(countyMatch[2], 10),
      children: parseInt(countyMatch[3], 10),
    };
  }
  const genericMatch = slug.match(/^income-(\d+)-(\d+)-(?:child|children)$/);
  if (genericMatch) {
    return {
      county: null,
      income: parseInt(genericMatch[1], 10),
      children: parseInt(genericMatch[2], 10),
    };
  }
  const legacyCountyMatch = slug.match(/^(.+)-income-(\d+)-(\d+)$/);
  if (legacyCountyMatch) {
    const county = washingtonCounties.find((c) => c.slug === legacyCountyMatch[1]);
    if (!county) return null;
    return {
      county,
      income: parseInt(legacyCountyMatch[2], 10),
      children: parseInt(legacyCountyMatch[3], 10),
    };
  }
  return null;
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function generateDynamicContent(
  slug: string,
  income: number,
  children: number,
  county: WashingtonCounty | null,
) {
  const formattedIncome = formatter.format(income);
  const result = getExactSupport(income, children);
  const supportNum = result.status === "calculated" ? result.totalSupport : null;
  const formattedSupport =
    supportNum !== null ? formatter.format(supportNum) : "Court Discretion";
  const childrenText = children === 1 ? "one child" : `${children} children`;
  const countyName = county ? county.name : "Washington";
  const locationName = county ? `${county.name}, WA` : "Washington State";

  const { introIndex, calcIndex, ssrIndex, conclusionIndex, legalIndex } =
    getVariantIndices(slug);

  const values = {
    formattedIncome,
    formattedSupport,
    childrenText,
    countyName,
    locationName,
  };

  const intro = formatVariant(
    contentVariants.introductions[introIndex],
    values,
  );
  const calculation = formatVariant(
    contentVariants.calculations[calcIndex],
    values,
  );
  const ssr = formatVariant(contentVariants.ssrExplanations[ssrIndex], values);
  const conclusion = formatVariant(
    contentVariants.conclusions[conclusionIndex],
    values,
  );
  const legal = formatVariant(
    contentVariants.legalDisclaimers[legalIndex],
    values,
  );

  let incomeBlock = "";
  if (income < 2200) {
    incomeBlock = `
 <div class="p-8 bg-blue-50 border border-blue-100 rounded-3xl my-12 shadow-sm">
 <h3 class="flex items-center gap-3 mt-0 font-bold text-2xl text-blue-600">Low-Income Protective Measures</h3>
 <p class="leading-relaxed text-lg text-gray-700 mt-4">For families with a combined monthly income of <strong>${formattedIncome}</strong>, Washington's 2026 guidelines trigger automatic poverty protections. At this level, the standard ${formattedSupport} obligation is often reduced to the statutory minimum of $50 per child per month. Want a complete breakdown including deviations and expenses? <a href='/worksheet' class='text-blue-600 hover:underline font-bold'>Calculate your full worksheet</a></p>
 <ul class="mt-8 space-y-4 text-gray-600">
 <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-blue-600"></span><strong>SSR Protection:</strong> Approximately $2,394 reserve is strictly applied.</li>
 <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-blue-600"></span><strong>Statutory Minimum:</strong> Usually $50 per child per month.</li>
 <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-blue-600"></span><strong>Deviation Probability:</strong> High at the ${formattedIncome} tier.</li>
 </ul>
 </div>`;
  } else if (income <= 12000) {
    incomeBlock = `
 <div class="p-8 bg-gray-50 border border-gray-200 rounded-3xl my-12 shadow-sm">
 <h3 class="flex items-center gap-3 mt-0 font-bold text-2xl text-gray-900">Standard Mid-Income Calculation</h3>
 <p class="leading-relaxed text-lg text-gray-600 mt-4">Your ${formattedIncome} income falls within the standard economic schedule. This means the <strong>${formattedSupport}</strong> figure is the presumptive legal standard. Want a complete breakdown including deviations and expenses? <a href='/worksheet' class='text-blue-600 hover:underline font-bold'>Calculate your full worksheet</a></p>
 <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
 <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
 <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Presumptive Amount</p>
 <p class="text-3xl font-bold text-blue-600">${formattedSupport}</p>
 </div>
 <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
 <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Schedule Bracket</p>
 <p class="text-3xl font-bold text-gray-900">Standard Limit</p>
 </div>
 </div>
 </div>`;
  } else {
    incomeBlock = `
 <div class="p-8 bg-amber-50 border border-amber-200 rounded-3xl my-12 shadow-sm">
 <h3 class="flex items-center gap-3 mt-0 font-bold text-2xl text-amber-900">High-Income Notice</h3>
 <p class="leading-relaxed text-lg text-amber-800 mt-4">Because your combined income of <strong>${formattedIncome}</strong> exceeds the $12,000 statutory ceiling, the ${formattedSupport} base is a minimum starting point. Judges in ${locationName} have discretion to increase support proportional to the family's standard of living. Want a complete breakdown including deviations and expenses? <a href='/worksheet' class='text-blue-600 hover:underline font-bold'>Calculate your full worksheet</a></p>
 <p class="mt-6 text-sm italic text-amber-600 font-medium">Note: The 45% net income cap remains a vital legal defense.</p>
 </div>`;
  }

  let familyBlock = "";
  if (children >= 3) {
    familyBlock = `
 <div class="p-8 bg-blue-600 rounded-3xl my-12 shadow-xl relative overflow-hidden">
 <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32 pointer-events-none no-print"></div>
 <h4 class="text-white flex items-center gap-3 mt-0 font-bold text-2xl relative z-10">Large Family Analysis</h4>
 <p class="leading-relaxed text-blue-50 text-lg mt-4 relative z-10">Raising ${childrenText} involves 'economies of scale'. The multiplier applied to the base income accounts for shared household costs. While the total of ${formattedSupport} is higher than for one child, the per-child cost is lower, reflecting common shared resources.</p>
 </div>`;
  }

  return {
    intro,
    calculation,
    ssr,
    conclusion,
    legal,
    incomeBlock,
    familyBlock,
  };
}

function generateDynamicFAQs(
  income: number,
  children: number,
  countyName: string,
  formattedIncome: string,
  formattedSupport: string,
) {
  const childrenText = children === 1 ? "one child" : `${children} children`;
  return [
    {
      q: `How much child support for ${childrenText} at $${income.toLocaleString()} income in Washington?`,
      a: `For a combined net income of ${formattedIncome}, the 2026 Washington State presumptive basic support obligation for ${childrenText} is ${formattedSupport}. This figure is the starting point used by judges in ${countyName} to ensure children's needs are met proportional to parental income.`,
    },
    {
      q: `Is the $${income.toLocaleString()} calculation different in ${countyName} than other counties?`,
      a: `The underlying economic tables for ${formattedIncome} are the same statewide across Washington. However, ${countyName} Superior Court may have specific local rules regarding how income is verified and how 'extraordinary expenses' like daycare are split.`,
    },
    {
      q: `What if my ${formattedIncome} income changes significantly?`,
      a: `Child support orders in Washington can be modified if there is a 'substantial change in circumstances,' typically defined as a 15% or more change in net income under RCW 26.09.170. If your income changes, you should file a petition for modification in the ${countyName} court system.`,
    },
    {
      q: `How does the 2026 SSR affect my $${income.toLocaleString()} child support order?`,
      a: `The 2026 Self-Support Reserve (SSR) is $2,394. If the parent paying support would be left with less than this amount in monthly net income, the court must consider a downward deviation.`,
    },
    {
      q: `Does the ${formattedSupport} include health insurance for ${childrenText}?`,
      a: `No, the ${formattedSupport} basic obligation covers only food, shelter, and basic clothing. Costs for health insurance premiums and work-related daycare are shared proportionally on top of the base.`,
    },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { county, income, children } = parsed;

  const supportResult = getExactSupport(income, children);
  const amount = supportResult.status === "calculated" ? supportResult.totalSupport : 0;

  const seoMeta = getIncomePageMeta({
    county,
    income,
    children,
    amount,
    slug,
  });

  const isRoundIncome = income % 100 === 0 && income <= 50000;
  const robots = isRoundIncome ? "index, follow" : "noindex, follow";

  return {
    ...seoMeta,
    robots,
    openGraph: {
      ...seoMeta.openGraph,
      url: `https://wscss.site/${slug}`,
    },
  };
}

const Breadcrumbs = ({
  county,
  income,
}: {
  county: { name: string; slug: string } | null;
  income: number;
}) => (
  <nav aria-label="Breadcrumb" className="mb-8">
    <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
      <li>
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
      </li>
      <li aria-hidden="true">/</li>
      <li>
        <Link href="/washington-courts" className="hover:text-blue-600">
          Washington
        </Link>
      </li>
      {county && (
        <>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/washington-courts/${county.slug}`}
              className="hover:text-blue-600"
            >
              {county.name}
            </Link>
          </li>
        </>
      )}
      <li aria-hidden="true">/</li>
      <li className="text-gray-900 font-medium" aria-current="page">
        ${income.toLocaleString()} Calculation
      </li>
    </ol>
  </nav>
);

export default async function ProgrammaticSEOPage({ params }: Props) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { county, income, children } = parsed;
  const result = getExactSupport(income, children);
  const supportNum = result.status === "calculated" ? result.totalSupport : null;

  const formattedIncome = formatter.format(income);
  const formattedSupport =
    supportNum !== null ? formatter.format(supportNum) : "Court Discretion";
  const locationName = county ? `${county.name}, WA` : "Washington State";
  const countyName = county ? county.name : "Washington";

  const {
    intro,
    calculation,
    ssr,
    conclusion,
    legal,
    incomeBlock,
    familyBlock,
  } = generateDynamicContent(slug, income, children, county);
  const dynamicFAQs = generateDynamicFAQs(
    income,
    children,
    countyName,
    formattedIncome,
    formattedSupport,
  );

  const childrenText = children === 1 ? "one child" : `${children} children`;

  // Section 4 & 5 Logic
  const getSafeSupport = (inc: number, kids: number) => {
    const res = getExactSupport(inc, kids);
    if (res.status === "calculated") return res.totalSupport;
    if (res.status === "above_maximum") return res.tableMaxTotal;
    return 0;
  };

  const s1_val = getSafeSupport(income, 1);
  const s2_val = getSafeSupport(income, 2);
  const cur_val = supportNum ?? getSafeSupport(income, children);

  const s4_support_1_child = formatter.format(s1_val);
  const s4_support_2_children = formatter.format(s2_val);
  const s4_per_child = children > 0 ? formatter.format(cur_val / children) : "$0";
  const s4_difference = formatter.format(Math.abs(s2_val - s1_val));
  const s4_percentage = s1_val > 0 ? Math.round(((s2_val / s1_val) - 1) * 100) : 0;

  const table = washingtonSupportTable2026;
  const curIdx = table.findIndex(e => e.income === income);
  const prevE = curIdx > 0 ? table[curIdx - 1] : null;
  const nextE = curIdx !== -1 && curIdx < table.length - 1 ? table[curIdx + 1] : null;

  const childKey = Math.max(1, Math.min(children, 5)) as 1 | 2 | 3 | 4 | 5;
  const prevInc = prevE?.income;
  const prevSup = prevE ? formatter.format(prevE.familyTotal[childKey] * children) : null;
  const nextInc = nextE?.income;
  const nextSup = nextE ? formatter.format(nextE.familyTotal[childKey] * children) : null;

  const cSlug = county?.slug;
  const cPart = children === 1 ? "1-child" : `${children}-children`;
  const prevL = prevInc ? (cSlug ? `/${cSlug}-income-${prevInc}-${cPart}` : `/income-${prevInc}-${cPart}`) : null;
  const nextL = nextInc ? (cSlug ? `/${cSlug}-income-${nextInc}-${cPart}` : `/income-${nextInc}-${cPart}`) : null;

  if (!county && process.env.NODE_ENV === 'development') {
    console.warn('County name is null on calculation page — check slug data');
  }

  const timestamp = `Last Updated: ${county?.lastUpdated || "April 9, 2026"}`;

  const targetCounties = ["king-county", "pierce-county", "snohomish-county", "spokane-county"];
  const siblingCounties = washingtonCounties.filter(
    (c) => targetCounties.includes(c.slug) && c.slug !== county?.slug,
  );

  const keyFigures = [
    { label: "Combined Monthly Net Income", value: formattedIncome, icon: <Calculator className="w-4 h-4" /> },
    { label: "Number of Children", value: children.toString(), icon: <Info className="w-4 h-4" /> },
    { label: "Presumptive Basic Support", value: formattedSupport, icon: <Landmark className="w-4 h-4" /> },
    { label: "Self-Support Reserve (2026)", value: "$2,394", icon: <Scale className="w-4 h-4" />, isSSR: true },
    { label: "Jurisdiction", value: locationName, icon: <Landmark className="w-4 h-4" /> },
  ];

  const internalLinks = [
    { label: `Washington Child Support Glossary`, href: "/glossary" },
    { label: `2026 Editorial Methodology`, href: "/editorial-methodology" },
    { label: `How to File for Support`, href: `/how-to-file-child-support-washington` },
    { label: `Washington State Courts Directory`, href: "/washington-courts" },
  ];

  return (
    <div className="flex-1 bg-white relative w-full overflow-x-hidden">
      <CalculatorSchema income={income} childCount={children} county={countyName} url={`https://wscss.site/${slug}`} resultAmount={supportNum !== null ? supportNum : undefined} />

      <div>
        {/* ── MINI HERO ────────────────────────────────────────────────────── */}
        <section className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 relative overflow-hidden border-b border-[var(--color-bg-border)] no-print">
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
          />

          <div className="container-wide relative z-10">
            <div className="no-print">
              <Breadcrumbs county={county} income={income} />
            </div>

            <div className="flex flex-col gap-8 text-left">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                {formattedIncome} Support in <span className="text-blue-600">{locationName}</span>
              </h1>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">2026 Presumptive Payment</span>
                <div className="flex items-baseline gap-4">
                  <span className="text-6xl md:text-8xl font-bold tracking-tight text-gray-900">{formattedSupport}</span>
                  <span className="text-xl font-bold text-gray-400">/ mo</span>
                </div>
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-2">{timestamp}</p>
              </div>

              <div className="flex gap-12 pt-8 border-t border-gray-100">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Net Income</span>
                  <span className="text-2xl font-bold text-gray-900">{formattedIncome}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Children</span>
                  <span className="text-2xl font-bold text-gray-900">{children}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTENT SECTION ─────────────────────────────────────────────── */}
        <section className="section-default bg-[var(--color-bg-subtle)] no-print">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              <div className="lg:col-span-8">
                <div className="pb-10 mb-10 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                <div className="flex flex-col mb-8">
                  <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
                    2026 Data · {countyName}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <Landmark className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 id="key-figures" className="scroll-mt-24 text-2xl md:text-3xl font-bold text-gray-900">Key Calculation Figures</h2>
                  </div>
                </div>
                <div className="table-container shadow-xl bg-white overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="table-header-cell">Metric</th>
                        <th className="table-header-cell text-right">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {keyFigures.map((item, idx) => (
                        <tr key={idx} className="table-row">
                          <td className="table-body-cell font-medium flex items-center gap-4">
                            <span className="text-blue-500">{item.icon}</span> {item.label}
                          </td>
                          <td className="table-body-cell font-bold text-gray-900 text-right">
                            {item.isSSR ? (
                              <span className="badge-warning !bg-amber-100 !text-amber-700 !px-4 !py-1 !rounded-full !text-xs">{item.value}</span>
                            ) : item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <article className="prose prose-gray prose-lg max-w-none text-gray-700 pb-10 mb-10 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                <div className="flex flex-col not-prose">
                  <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
                    Official Guidelines
                  </p>
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">Washington Child Support Guidelines (2026 Updates)</h2>
                </div>
                <p className="text-lg leading-relaxed">{intro}</p>

                <div className="flex flex-col not-prose">
                  <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
                    Step by Step
                  </p>
                  <h2 id="breakdown" className="scroll-mt-24 text-3xl font-bold text-gray-900 mb-8">Breakdown of the {formattedIncome} Calculation</h2>
                </div>
                <p className="text-lg leading-relaxed">{calculation}</p>

                <div className="not-prose" dangerouslySetInnerHTML={{ __html: incomeBlock }} />
                <div className="not-prose" dangerouslySetInnerHTML={{ __html: familyBlock }} />

                <div className="flex flex-col not-prose">
                  <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
                    Low-Income Protection
                  </p>
                  <h2 id="ssr-info" className="scroll-mt-24 text-3xl font-bold text-gray-900 mb-8">The SSR and Low-Income Safeguards</h2>
                </div>
                <p className="text-lg leading-relaxed">{ssr}</p>

                {/* Section 1: County Filing Block */}
                {county && (
                  <div className="my-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Filing in {countyName} Superior Court</h3>
                    <p className="text-lg leading-relaxed">
                      In {county.name} Superior Court, located in {county.seat}, child support
                      orders based on a {formattedIncome} combined income are filed with the
                      {county.court} clerk at {county.courtAddress}. Filing fees in
                      {county.name} are {county.filingFee}. Once filed, the presumptive
                      {formattedSupport}/mo order for {childrenText} becomes the baseline
                      unless either parent requests a deviation hearing.
                    </p>
                  </div>
                )}

                {/* Section 2: Income Bracket Context Block */}
                <div className="my-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Income Bracket Context</h3>
                  <p className="text-lg leading-relaxed">
                    {income < 3500 && (
                      <>At {formattedIncome}/mo, this household falls in the lower income bracket of Washington's 2026 schedule — below the state median of $7,114/mo. At this level, SSR protections and low-income deviations are more likely to influence the final order than the presumptive {formattedSupport} figure.</>
                    )}
                    {income >= 3500 && income <= 10000 && (
                      <>At {formattedIncome}/mo, this household sits within Washington's standard mid-range bracket on the 2026 schedule, near the state median of $7,114/mo. The presumptive {formattedSupport} for {childrenText} is typically applied as-is at this level, with fewer deviations than lower or higher income tiers.</>
                    )}
                    {income > 10000 && (
                      <>At {formattedIncome}/mo, this household falls in the upper income bracket of Washington's 2026 schedule — above the state median of $7,114/mo. At this level, courts have wider discretion to order above the presumptive {formattedSupport}, particularly for lifestyle-based deviation arguments in {countyName}.</>
                    )}
                  </p>
                </div>

                {/* Section 3: Deviation Likelihood Block */}
                <div className="my-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Deviation Likelihood in {countyName}</h3>
                  <p className="text-lg leading-relaxed">
                    {income < 2200 && (
                      <>Deviation requests are very common at the {formattedIncome} income level in {countyName}. Because {formattedSupport} at this tier frequently conflicts with the $2,394 SSR floor, judges routinely reduce orders to the $50/child statutory minimum. Parents at this income level should come prepared with full financial documentation.</>
                    )}
                    {income >= 2200 && income <= 12000 && (
                      <>At the {formattedIncome} level, deviation requests are less common but still possible in {countyName}. The most frequent grounds are extraordinary healthcare costs, shared custody arrangements, or documented debts. The presumptive {formattedSupport} is upheld in the majority of standard cases at this income tier.</>
                    )}
                    {income > 12000 && (
                      <>High-income deviation arguments are frequently raised in {countyName} at the {formattedIncome} level. Since the schedule caps at $12,000 combined net income, the {formattedSupport} figure is a floor — not a ceiling. Attorneys often argue for upward deviations based on the children's established standard of living and available parental resources.</>
                    )}
                  </p>
                </div>

                {/* Section 4: Children-Specific Insight Block */}
                <div className="my-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Children-Specific Insight</h3>
                  <p className="text-lg leading-relaxed">
                    {children === 1 && (
                      <>For {childrenText} at {formattedIncome}/mo, the {formattedSupport} obligation reflects Washington's base rate. Parents adding a second child to the order would see this figure rise to {s4_support_2_children} — an increase of {s4_difference} — reflecting the additional resources required under the 2026 schedule.</>
                    )}
                    {children === 2 && (
                      <>The {formattedSupport} for {childrenText} at {formattedIncome}/mo reflects Washington's standard two-child rate. Compared to a one-child order ({s4_support_1_child}) at the same income, the second child adds {s4_difference}/mo — a {s4_percentage}% increase rather than a full doubling, reflecting shared household costs.</>
                    )}
                    {children >= 3 && (
                      <>For {childrenText} at {formattedIncome}/mo, Washington's 2026 schedule applies an economies-of-scale reduction. The {formattedSupport} total works out to {s4_per_child}/mo per child — compared to {s4_support_1_child} for one child at the same income. This reflects shared costs like housing and utilities that don't scale linearly with each additional child.</>
                    )}
                  </p>
                </div>

                {/* Section 5: Related Income Tiers Block */}
                <div className="my-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Related Income Tiers</h3>
                  <p className="text-lg leading-relaxed">
                    {nextInc && nextSup && (
                      <>Parents earning slightly more than {formattedIncome} — at <Link href={nextL || "#"} className="text-blue-600 hover:underline">{formatter.format(nextInc)}/mo</Link> — would face a presumptive order of {nextSup}/mo for {childrenText} in Washington. </>
                    )}
                    {prevInc && prevSup && (
                      <>Those earning slightly less at <Link href={prevL || "#"} className="text-blue-600 hover:underline">{formatter.format(prevInc)}/mo</Link> would owe {prevSup}/mo. </>
                    )}
                    These neighboring brackets help illustrate how Washington's 2026 schedule scales support incrementally with income.
                  </p>
                </div>

                {county && (
                  <>
                    <div className="flex flex-col not-prose">
                      <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
                        Local Court Process
                      </p>
                      <h2 className="text-3xl font-bold text-gray-900 mb-8">Application in {countyName} Superior Court</h2>
                    </div>
                    <p className="text-lg leading-relaxed">
                      While the 2026 economic schedule is uniform statewide, the <strong>{county.court}</strong> handles procedural enforcement. In <strong>{countyName}</strong>, judges may require additional proof of income before finalizing the {formattedSupport} order.
                    </p>
                  </>
                )}

                <div className="flex flex-col not-prose">
                  <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
                    Summary
                  </p>
                  <h2 id="summary" className="scroll-mt-24 text-3xl font-bold text-gray-900 mb-8">Calculation Summary & Requirements</h2>
                </div>
                <p className="text-lg leading-relaxed">{conclusion}</p>

                <div className="flex gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 my-6 not-prose">
                  <Info aria-hidden="true" className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800 mb-1">
                      Accuracy & Legal Status
                    </p>
                    <p className="text-sm text-amber-700">
                      {legal}
                    </p>
                  </div>
                </div>
              </article>

                <div className="pb-10 mb-10 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0 no-print">
                  <div className="bg-blue-600 p-8 md:p-12 text-center shadow-2xl rounded-3xl relative overflow-hidden border border-blue-100">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32 pointer-events-none no-print" />
                    <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-100 mb-2 relative z-10">
                      Full Worksheet Tool
                    </p>
                    <h3 className="text-3xl text-white mb-6 font-bold relative z-10">Advanced Estimator Wizard</h3>
                    <p className="mb-10 text-lg text-blue-50 max-w-lg mx-auto leading-relaxed relative z-10">
                      Get a full breakdown using our Washington Child Support Worksheet Wizard. Calculate precise income splits and extraordinary expenses.
                    </p>
                    <Link href="/worksheet" className="btn btn-primary btn-primary-lg !bg-white !text-blue-600 hover:!bg-blue-50 relative z-10">
                      Adjust for {countyName} — Try Different Income <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>

                <section className="pb-10 mb-10 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0 no-print">
                  <div className="flex flex-col mb-8">
                    <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
                      Common Parent Questions
                    </p>
                    <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions About Washington Child Support</h2>
                  </div>
                  <FAQAccordion faqs={dynamicFAQs.map((f) => ({ question: f.q, answer: f.a }))} />
                </section>
              </div>

              <aside className="lg:col-span-4 space-y-4 no-print">
                <div className="hidden lg:block">
                  <ErrorBoundary fallback={<div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-500">Sidebar temporarily unavailable</div>}>
                    <CountySidebar
                      countyName={countyName}
                      countySlug={county?.slug || "washington"}
                      courthouseName={county?.court || "Washington Superior Court"}
                      courthouseAddress={county?.courtAddress || "Official AOC Guidelines"}
                      courthousePhone={county?.clerkPhone || "(360) 753-3365"}
                      courthousePrimarySeat={county?.seat || "Olympia"}
                      filingFee={county?.filingFeeMax || 314}
                      filingFeeIsRange={county?.filingFeeIsRange}
                      courthouseUrl={county?.courthouseUrl}
                      presumptiveAmount={supportNum || 0}
                      combinedIncome={income}
                      numberOfChildren={children}
                      lastUpdated={county?.lastUpdated || "April 9, 2026"}
                    />
                  </ErrorBoundary>
                </div>
                <div className="lg:hidden">
                  <details className="bg-white border border-gray-200 rounded-2xl shadow-sm group overflow-hidden">
                    <summary className="flex items-center justify-between px-6 h-14 cursor-pointer select-none list-none font-bold text-gray-900">
                      <span className="flex items-center gap-2">
                        <Scale size={18} className="text-blue-600" /> Resources & Legal Sources
                      </span>
                      <svg
                        className="w-5 h-5 transition-transform duration-300 group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </summary>
                    <div className="px-6 pb-6 pt-2">
                      <ErrorBoundary>
                        <CountySidebar
                          countyName={countyName}
                          countySlug={county?.slug || "washington"}
                          courthouseName={county?.court || "Washington Superior Court"}
                          courthouseAddress={county?.courtAddress || "Official AOC Guidelines"}
                          courthousePhone={county?.clerkPhone || "(360) 753-3365"}
                          courthousePrimarySeat={county?.seat || "Olympia"}
                          filingFee={county?.filingFeeMax || 314}
                          filingFeeIsRange={county?.filingFeeIsRange}
                          courthouseUrl={county?.courthouseUrl}
                          presumptiveAmount={supportNum || 0}
                          combinedIncome={income}
                          numberOfChildren={children}
                          lastUpdated={county?.lastUpdated || "April 9, 2026"}
                        />
                      </ErrorBoundary>
                    </div>
                  </details>
                </div>
                <div>
                   <PrintButton countySlug={county?.slug || "washington"} income={income} children={children} />
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>

      {/* ── PRINT-ONLY BREAKDOWN ────────────────────────────────────────── */}
      <PrintReport
        caseContext={[
          { label: "Combined Monthly Net Income:", value: formattedIncome },
          { label: "Number of Children:", value: children },
          { label: "Location:", value: locationName },
        ]}
        calculationBase={[
          { label: "Presumptive Support:", value: formattedSupport },
          { label: "Schedule Bracket:", value: income > 50000 ? "Above Max" : "Standard 2026" },
          { label: "Self-Support Reserve (2026):", value: "$2,394" },
        ]}
        analysisTitle="Estimate Analysis"
        analysisItems={[
          { label: "Presumptive Basic Support Obligation", value: formattedSupport },
          {
            label: "Basis of Estimate",
            value: "",
            isBold: true,
            description: `Based on the combined monthly net income of ${formattedIncome}, the 2026 Washington State economic schedule identifies a presumptive base support amount of ${formattedSupport} per month for ${children} ${children === 1 ? 'child' : 'children'}.`
          },
        ]}
        assumptions="This calculation is based on the official 2026 Washington State Child Support Schedule (RCW 26.19). It assumes all income entered is net monthly income (gross wages minus taxes and mandatory deductions)."
        disclaimerText="This document provides an estimate only and does not constitute legal advice or a binding court order. Actual support obligations are determined by a judge based on the full Child Support Worksheet, which may include healthcare costs, daycare expenses, other children, and specific judicial findings."
      />

      {/* ── RELATED SECTION ─────────────────────────────────────────────── */}
      <section className="section-default bg-white border-t border-gray-100 no-print">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {internalLinks.map((link, idx) => (
              <Link key={idx} href={link.href} className="group card-standard !p-8 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Resource</p>
                <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                  {link.label} <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                </h4>
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center mb-8">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
              More Calculations
            </p>
            <h2 className="text-4xl font-bold text-center text-gray-900">Explore Related Calculations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-5xl mx-auto">
            <div className="p-10 bg-[var(--color-bg-subtle)] rounded-3xl border border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-8">Nearby Income Tiers</h3>
              <div className="flex flex-wrap gap-3">
                {[-1000, -500, 500, 1000].map((diff) => {
                  const newInc = income + diff;
                  if (newInc <= 0) return null;
                  const pf = county?.slug ? `${county.slug}-income` : "income";
                  const nChildren = children === 1 ? "1-child" : `${children}-children`;
                  return (
                    <Link
                      key={diff}
                      href={`/${pf}-${newInc}-${nChildren}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                    >
                      Estimate {formatter.format(newInc)} for {children}{" "}
                      {children === 1 ? "Child" : "Children"} →
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="p-10 bg-[var(--color-bg-subtle)] rounded-3xl border border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-8">Compare Washington Counties</h3>
              <div className="flex flex-wrap gap-3">
                {siblingCounties.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}-income-${income}-${children === 1 ? "1-child" : `${children}-children`}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                  >
                    <MapPin
                      size={14}
                      className="text-gray-400 flex-shrink-0"
                      aria-hidden="true"
                    />
                    {c.name} Support for {formattedIncome}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([
          { name: "Home", url: "https://wscss.site" },
          { name: "Washington", url: "https://wscss.site/washington-courts" },
          ...(county ? [{ name: county.name, url: `https://wscss.site/washington-courts/${county.slug}` }] : []),
          { name: `${formattedIncome} Calculation`, url: `https://wscss.site/${slug}` }
        ])) }}
      />
    </div>
  );
}
