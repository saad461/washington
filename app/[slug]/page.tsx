import { getExactSupport } from "@/data/washingtonTable2026";
import {
  washingtonCounties,
  WashingtonCounty,
} from "@/data/washingtonCounties";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Info, Landmark, Scale, ChevronRight, MapPin } from "lucide-react";
import {
  AdContainerClient as AdContainer,
  AuthoritySidebarClient as AuthoritySidebar,
  AuthorBoxClient as AuthorBox,
  PrintButtonClient as PrintButton,
} from "@/components/ClientDynamic";
import ErrorBoundary from "@/components/ErrorBoundary";
import CalculatorSchema from "@/components/CalculatorSchema";
import FAQAccordion from "@/components/FAQAccordion";
import { contentVariants } from "@/lib/contentVariants";
import { getVariantIndices, formatVariant } from "@/lib/getVariant";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = true;
export const revalidate = 2592000; // 30 days ISR cache

function getABVariant(slug: string): "A" | "B" {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 2 === 0 ? "A" : "B";
}

function parseSlug(slug: string) {
  const countyMatch = slug.match(
    /^(.+)-income-(\d+)-(\d+)-(?:child|children)$/,
  );
  if (countyMatch) {
    const county =
      washingtonCounties.find((c) => c.slug === countyMatch[1]) || null;
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
    const county =
      washingtonCounties.find((c) => c.slug === legacyCountyMatch[1]) || null;
    return {
      county,
      income: parseInt(legacyCountyMatch[2], 10),
      children: parseInt(legacyCountyMatch[3], 10),
    };
  }
  return { county: null, income: 5000, children: 1 };
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
 <p class="leading-relaxed text-lg text-gray-700 mt-4">For families with a combined monthly income of <strong>${formattedIncome}</strong>, Washington's 2026 guidelines trigger automatic poverty protections. At this level, the standard ${formattedSupport} obligation is often reduced to the statutory minimum of $50 per child.</p>
 <ul class="mt-8 space-y-4 text-gray-600">
 <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-blue-600"></span><strong>SSR Protection:</strong> Approximately $2,394 reserve is strictly applied.</li>
 <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-blue-600"></span><strong>Statutory Minimum:</strong> Usually $50/month per child.</li>
 <li class="flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-blue-600"></span><strong>Deviation Probability:</strong> High at the ${formattedIncome} tier.</li>
 </ul>
 </div>`;
  } else if (income <= 12000) {
    incomeBlock = `
 <div class="p-8 bg-gray-50 border border-gray-200 rounded-3xl my-12 shadow-sm">
 <h3 class="flex items-center gap-3 mt-0 font-bold text-2xl text-gray-900">Standard Mid-Income Calculation</h3>
 <p class="leading-relaxed text-lg text-gray-600 mt-4">Your ${formattedIncome} income falls within the standard economic schedule. This means the <strong>${formattedSupport}</strong> figure is the presumptive legal standard.</p>
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
 <p class="leading-relaxed text-lg text-amber-800 mt-4">Because your combined income of <strong>${formattedIncome}</strong> exceeds the $12,000 statutory ceiling, the ${formattedSupport} base is a minimum starting point. Judges in ${locationName} have discretion to increase support proportional to the family's standard of living.</p>
 <p class="mt-6 text-sm italic text-amber-600 font-medium">Note: The 45% net income cap remains a vital legal defense.</p>
 </div>`;
  }

  let familyBlock = "";
  if (children >= 3) {
    familyBlock = `
 <div class="p-8 bg-blue-600 rounded-3xl my-12 shadow-xl relative overflow-hidden">
 <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32 pointer-events-none"></div>
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
      a: `Child support orders in Washington can be modified if there is a 'substantial change in circumstances,' typically defined as a 10% or greater shift in net income. If your income changes, you should file a petition for modification in the ${countyName} court system.`,
    },
    {
      q: `How does the 2026 SSR affect my $${income.toLocaleString()} child support order?`,
      a: `The 2026 Self-Support Reserve (SSR) is approximately $2,394. If the parent paying support would be left with less than this amount in monthly net income, the court must consider a downward deviation.`,
    },
    {
      q: `Does the ${formattedSupport} include health insurance for ${childrenText}?`,
      a: `No, the ${formattedSupport} basic obligation covers only food, shelter, and basic clothing. Costs for health insurance premiums and work-related daycare are shared proportionally on top of the base.`,
    },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { county, income } = parseSlug(slug);
  const variant = getABVariant(slug);
  const locationText = county ? `in ${county.name}` : "in Washington";
  const formattedAmt = formatter.format(income);

  const title =
    variant === "A"
      ? `${formattedAmt} Income Child Support ${locationText} (2026 Calculator)`
      : `How Much is Child Support for ${formattedAmt} Income ${locationText}? (2026 Estimate)`;

  const description = `Calculate child support in ${county?.name || "Washington"}. Includes 2026 SSR rules (approximately $2,394 limit), Courthouse location, and low-income protections.`;

  const isRoundIncome = income % 1000 === 0;
  const robots = isRoundIncome ? "index, follow" : "noindex, follow";

  return {
    title,
    description,
    robots,
    alternates: { canonical: `https://wscss.site/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://wscss.site/${slug}`,
      siteName: "WSCSS",
      images: [{ url: "/wscss-og.jpg", width: 1200, height: 630 }],
      locale: "en_US",
      type: "website",
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
  const { county, income, children } = parseSlug(slug);
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

  const totalText = `${intro} ${calculation} ${ssr} ${conclusion} ${incomeBlock} ${familyBlock}`;
  const wordCount = totalText.split(/\s+/).filter((word) => word.length > 0).length;

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
    { label: "Self-Support Reserve (2026)", value: "approximately $2,394", icon: <Scale className="w-4 h-4" />, isSSR: true },
    { label: "Jurisdiction", value: locationName, icon: <Landmark className="w-4 h-4" /> },
  ];

  const internalLinks = [
    { label: `Washington Child Support Glossary`, href: "/glossary" },
    { label: `2026 Editorial Methodology`, href: "/editorial-methodology" },
    { label: `How to File for Support`, href: `/how-to-file-child-support-washington` },
    { label: `Washington State Courts Directory`, href: "/washington-courts" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        name: "Washington State Child Support Schedule",
        url: "https://wscss.site",
        description: `Free 2026 Washington State child support calculator. ${formattedIncome} income, ${children} children.`,
        areaServed: { "@type": "State", name: "Washington" },
        priceRange: "Free",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://wscss.site" },
          ...(county ? [{ "@type": "ListItem", position: 2, name: county.name, item: `https://wscss.site/${county.slug}-income-5000-${children}-children` }] : []),
          { "@type": "ListItem", position: county ? 3 : 2, name: `${formattedIncome} Calculation` },
        ],
      },
    ],
  };

  return (
    <div className="flex-1 bg-white relative w-full overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalculatorSchema income={income} childCount={children} county={countyName} url={`https://wscss.site/${slug}`} resultAmount={supportNum !== null ? supportNum : undefined} />

      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white pt-8 pb-12 lg:pt-12 lg:pb-16 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-wide relative z-10">
          <Breadcrumbs county={county} income={income} />

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
      <section className="section-default bg-[var(--color-bg-subtle)]">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-8">
              <div className="pb-10 mb-10 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                <AdContainer slot="top" wordCount={wordCount} />
              </div>

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

                <div className="my-16 not-prose">
                  <AdContainer slot="mid" wordCount={wordCount} />
                </div>

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

                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-12">{timestamp}</p>
              </article>

              <div className="pb-10 mb-10 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                <div className="bg-blue-600 p-8 md:p-12 text-center shadow-2xl rounded-3xl relative overflow-hidden border border-blue-100">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32 pointer-events-none" />
                  <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-100 mb-2 relative z-10">
                    Full Worksheet Tool
                  </p>
                  <h3 className="text-3xl text-white mb-6 font-bold relative z-10">Advanced Estimator Wizard</h3>
                  <p className="mb-10 text-lg text-blue-50 max-w-lg mx-auto leading-relaxed relative z-10">
                    Get a full breakdown using our Washington Child Support Worksheet Wizard. Calculate precise income splits and extraordinary expenses.
                  </p>
                  <Link href="/worksheet" className="btn btn-primary btn-primary-lg !bg-white !text-blue-600 hover:!bg-blue-50 relative z-10">
                    Launch Complete Wizard <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              <section className="pb-10 mb-10 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                <div className="flex flex-col mb-8">
                  <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
                    Common Parent Questions
                  </p>
                  <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions About Washington Child Support</h2>
                </div>
                <FAQAccordion faqs={dynamicFAQs.map((f) => ({ question: f.q, answer: f.a }))} />
              </section>
            </div>

            <aside className="lg:col-span-4 space-y-4">
              <div className="hidden lg:block space-y-4">
                <ErrorBoundary fallback={<div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-500">Legal resources temporarily unavailable</div>}>
                  <AuthoritySidebar county={county} />
                </ErrorBoundary>
                <ErrorBoundary fallback={<div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-500">Editorial info unavailable</div>}>
                  <AuthorBox />
                </ErrorBoundary>
              </div>
              <div className="lg:hidden space-y-4">
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
                      <AuthoritySidebar county={county} />
                    </ErrorBoundary>
                  </div>
                </details>
                <ErrorBoundary>
                  <AuthorBox />
                </ErrorBoundary>
              </div>
              <div className="not-print">
                 <PrintButton />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── RELATED SECTION ─────────────────────────────────────────────── */}
      <section className="section-default bg-white border-t border-gray-100">
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
    </div>
  );
}
