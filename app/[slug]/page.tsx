import { getExactSupport } from "@/data/washingtonTable2026";
import {
  washingtonCounties,
  WashingtonCounty,
} from "@/data/washingtonCounties";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, Info, Landmark, Scale } from "lucide-react";
import {
  AdContainerClient as AdContainer,
  AuthoritySidebarClient as AuthoritySidebar,
  AuthorBoxClient as AuthorBox,
  PrintButtonClient as PrintButton,
} from "@/components/ClientDynamic";
import CalculatorSchema from "@/components/CalculatorSchema";
import FAQAccordion from "@/components/FAQAccordion";
import { contentVariants } from "@/lib/contentVariants";
import { getVariantIndices, formatVariant } from "@/lib/getVariant";

type Props = { params: Promise<{ slug: string }> };

// ISR: All slug pages are built on-demand and cached for 30 days.
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
 <div class="bg-indigo-50 p-8 md:p-12 rounded-2xl border border-indigo-100/50 my-16">
 <h3 class="flex items-center gap-2 mt-0 font-bold text-xl"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/></svg> Low-Income Protective Measures</h3>
 <p class="leading-relaxed text-gray-700">For families with a combined monthly income of <strong>${formattedIncome}</strong>, Washington's 2026 guidelines trigger automatic poverty protections. At this level, the standard ${formattedSupport} obligation is often reduced to the statutory minimum of $50 per child.</p>
 <ul class="mt-6 space-y-4 list-disc pl-6 text-gray-700">
 <li><strong>SSR Protection:</strong> The approximately $2,394 reserve is strictly applied.</li>
 <li><strong>Statutory Minimum:</strong> Usually $50/month per child.</li>
 <li><strong>Deviation Probability:</strong> High at the ${formattedIncome} income tier.</li>
 </ul>
 </div>`;
  } else if (income <= 12000) {
    incomeBlock = `
 <div class="bg-gray-50 p-8 md:p-12 rounded-2xl border border-gray-100 my-16">
 <h3 class="flex items-center gap-2 mt-0 font-bold text-xl"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg> Standard Mid-Income Calculation</h3>
 <p class="leading-relaxed text-gray-700">Your ${formattedIncome} income falls within the standard economic schedule. This means the <strong>${formattedSupport}</strong> figure is the presumptive legal standard. In ${countyName}, the court assumes this basic obligation is sufficient for ${childrenText}.</p>
 <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
 <div class="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
 <p class="label-metadata mb-2 text-gray-500">Presumptive Amount</p>
 <p class="text-2xl font-bold text-indigo-600">${formattedSupport}</p>
 </div>
 <div class="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
 <p class="label-metadata mb-2 text-gray-500">Schedule Bracket</p>
 <p class="text-2xl font-bold text-gray-900">Standard Limit</p>
 </div>
 </div>
 </div>`;
  } else {
    incomeBlock = `
 <div class="bg-gray-900 p-8 md:p-12 rounded-2xl my-16 text-white shadow-xl">
 <h3 class="text-white flex items-center gap-2 mt-0 font-bold text-xl"><svg class="w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> High-Income Notice</h3>
 <p class="leading-relaxed text-indigo-50">Because your combined income of <strong>${formattedIncome}</strong> exceeds the $12,000 statutory ceiling, the ${formattedSupport} base is a minimum starting point. Judges in ${locationName} have discretion to increase support proportional to the family's standard of living.</p>
 <p class="mt-6 text-sm italic text-indigo-300">Note: The 45% net income cap remains a vital legal defense.</p>
 </div>`;
  }

  let familyBlock = "";
  if (children >= 3) {
    familyBlock = `
 <div class="bg-indigo-50/50 p-8 md:p-12 rounded-2xl border border-indigo-100/50 my-16">
 <h4 class="text-indigo-950 flex items-center gap-2 mt-0 font-bold text-lg"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 15h6"/><path d="M9 11h6"/><path d="M9 19h1"/></svg> Large Family Analysis</h4>
 <p class="leading-relaxed text-gray-700">Raising ${childrenText} involves 'economies of scale'. The multiplier applied to the base income accounts for shared household costs. While the total of ${formattedSupport} is higher than for one child, the per-child cost is lower, reflecting common shared resources.</p>
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
      q: `How does $${formattedSupport} include health insurance for ${childrenText}?`,
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
    alternates: { canonical: `https://wcssc.site/${slug}` },
    openGraph: {
      title,
      description,
      url: `https://wcssc.site/${slug}`,
      siteName: "WCSSC",
      images: [{ url: "/wcssc-og.jpg", width: 1200, height: 630 }],
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
  <nav
    aria-label="Breadcrumb"
    className="flex mb-8 label-metadata no-print flex-wrap gap-y-2"
  >
    <Link href="/" className="hover:text-indigo-600 transition-colors shrink-0">Home</Link>
    <span className="mx-2 opacity-30 shrink-0">/</span>
    <div className="flex items-center min-w-0">
      <span className="opacity-30 shrink-0 sm:hidden">...</span>
      <span className="mx-2 opacity-30 shrink-0 sm:hidden">/</span>
      <span className="opacity-80 truncate hidden sm:inline">Washington</span>
      {county && (
        <>
          <span className="mx-2 opacity-30 shrink-0 hidden sm:inline">/</span>
          <Link
            href={`/${county.slug}-income-5000-2-children`}
            className="hover:text-indigo-600 transition-colors truncate hidden sm:inline"
          >
            {county.name}
          </Link>
        </>
      )}
      <span className="mx-2 opacity-30 shrink-0">/</span>
      <span className="truncate">${income.toLocaleString()} Calculation</span>
    </div>
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

  const timestamp = `Last Updated: ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;

  const targetCounties = ["king-county", "pierce-county", "snohomish-county", "spokane-county"];
  const siblingCounties = washingtonCounties.filter(
    (c) => targetCounties.includes(c.slug) && c.slug !== county?.slug,
  );

  const keyFigures = [
    { label: "Combined Monthly Net Income", value: formattedIncome, icon: <Calculator className="w-4 h-4" /> },
    { label: "Number of Children", value: children.toString(), icon: <Info className="w-4 h-4" /> },
    { label: "Presumptive Basic Support", value: formattedSupport, icon: <Landmark className="w-4 h-4" /> },
    { label: "Self-Support Reserve (2026)", value: "approximately $2,394", icon: <Scale className="w-4 h-4" /> },
    { label: "Jurisdiction", value: locationName, icon: <Landmark className="w-4 h-4" /> },
  ];

  const internalLinks = [
    { label: `Washington Child Support Glossary`, href: "/glossary" },
    { label: `2026 Editorial Methodology`, href: "/editorial-methodology" },
    { label: `How to File for Support in ${countyName}`, href: `/how-to-file-child-support-washington` },
    { label: `Washington State Courts Directory`, href: "/washington-courts" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        name: "Washington Child Support Schedule Center",
        url: "https://wcssc.site",
        description: `Free 2026 Washington State child support calculator. ${formattedIncome} income, ${children} children.`,
        areaServed: { "@type": "State", name: "Washington" },
        priceRange: "Free",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://wcssc.site" },
          ...(county ? [{ "@type": "ListItem", position: 2, name: county.name, item: `https://wcssc.site/${county.slug}-income-5000-${children}-children` }] : []),
          { "@type": "ListItem", position: county ? 3 : 2, name: `${formattedIncome} Calculation` },
        ],
      },
    ],
  };

  return (
    <main className="flex-1 bg-page relative w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalculatorSchema income={income} childCount={children} county={countyName} url={`https://wcssc.site/${slug}`} resultAmount={supportNum !== null ? supportNum : undefined} />

      <div className="container-wide section-default relative z-10">
        <Breadcrumbs county={county} income={income} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-8">
            <AdContainer slot="top" wordCount={wordCount} />

            <div className="mb-12">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                {formattedIncome} Child Support in <span className="text-indigo-600">{locationName}</span>
              </h1>
            </div>

            <div className="mb-16">
              <div className="card-standard text-center md:py-16">
                <p className="label-metadata mb-8 text-gray-500">2026 Monthly Presumptive Payment</p>
                <div className="mb-8">
                  <span className="text-5xl md:text-6xl font-bold tracking-tighter text-indigo-600">{formattedSupport}</span>
                </div>
                <div className="flex justify-center items-center gap-8 md:gap-16 border-t border-gray-100 pt-8">
                  <div>
                    <p className="label-metadata mb-2 text-gray-400">Net Income</p>
                    <p className="text-xl font-semibold">{formattedIncome}</p>
                  </div>
                  <div className="w-px h-8 bg-gray-200" />
                  <div>
                    <p className="label-metadata mb-2 text-gray-400">Children</p>
                    <p className="text-xl font-semibold">{children}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <PrintButton />
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-4">
                <Landmark className="w-8 h-8 text-indigo-600" /> Key Calculation Figures
              </h2>
              <div className="table-container shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 h-14 label-metadata text-gray-500">Metric</th>
                      <th className="px-6 h-14 label-metadata text-gray-500">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {keyFigures.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 h-14 flex items-center gap-4 text-sm font-medium">
                          <span className="text-indigo-600">{item.icon}</span> {item.label}
                        </td>
                        <td className="px-6 h-14 text-sm text-gray-600">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <article className="prose prose-gray prose-lg max-w-none mb-16">
              <h2 className="text-3xl font-bold">Washington Child Support Guidelines (2026 Updates)</h2>
              <p className="leading-relaxed">{intro}</p>

              <div className="my-16 not-prose">
                <AdContainer slot="mid" wordCount={wordCount} />
              </div>

              <h2 className="text-3xl font-bold">Breakdown of the {formattedIncome} Calculation</h2>
              <p className="leading-relaxed">{calculation}</p>

              <div className="not-prose" dangerouslySetInnerHTML={{ __html: incomeBlock }} />
              <div className="not-prose" dangerouslySetInnerHTML={{ __html: familyBlock }} />

              <h2 className="text-3xl font-bold">The SSR and Low-Income Safeguards</h2>
              <p className="leading-relaxed">{ssr}</p>

              {county && (
                <>
                  <h2 className="text-3xl font-bold">Application in {countyName} Superior Court</h2>
                  <p className="leading-relaxed">
                    While the 2026 economic schedule is uniform statewide, the <strong>{county.court}</strong> handles procedural enforcement. In <strong>{countyName}</strong>, judges may require additional proof of income before finalizing the {formattedSupport} order.
                  </p>
                </>
              )}

              <h2 className="text-3xl font-bold">Calculation Summary & Requirements</h2>
              <p className="leading-relaxed">{conclusion}</p>

              <div className="bg-gray-50 p-8 md:p-12 rounded-2xl border border-gray-100 mt-16 not-prose">
                <p className="label-metadata mb-4 flex items-center gap-2 text-indigo-600">
                  <Scale className="w-6 h-6" /> Accuracy & Legal Status
                </p>
                <p className="text-sm italic text-gray-600 leading-relaxed">{legal}</p>
              </div>

              <p className="label-metadata mt-16 text-gray-400">{timestamp}</p>
            </article>

            <div className="mb-16 p-8 md:p-12 bg-gray-900 rounded-3xl text-center shadow-xl relative overflow-hidden">
              <h3 className="text-3xl text-white mb-8 font-bold">Advanced Estimator Wizard</h3>
              <p className="mb-12 text-lg text-indigo-100 max-w-lg mx-auto leading-relaxed">
                Get a full breakdown using our Washington Child Support Worksheet Wizard. Calculate precise income splits and extraordinary expenses.
              </p>
              <Link href="/worksheet" className="btn-primary w-auto px-8 btn-h-44 inline-flex items-center justify-center gap-4">
                Launch Complete Wizard <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-12">Common Support Questions</h2>
              <FAQAccordion items={dynamicFAQs.map((f) => ({ question: f.q, answer: f.a }))} />
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="hidden lg:block">
              <AuthoritySidebar county={county} />
              <div className="mt-8">
                <AuthorBox />
              </div>
            </div>
            <div className="lg:hidden">
              <details className="bg-white border border-gray-200 rounded-2xl shadow-sm group overflow-hidden">
                <summary className="flex items-center justify-between px-6 h-14 cursor-pointer select-none list-none font-semibold text-gray-900">
                  <span>📚 Resources & Legal Sources</span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </summary>
                <div className="px-6 pb-6 pt-2">
                  <AuthoritySidebar county={county} />
                </div>
              </details>
              <div className="mt-8">
                <AuthorBox />
              </div>
            </div>
          </aside>
        </div>

        <div className="border-t border-gray-100 pt-16 mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {internalLinks.map((link, idx) => (
              <Link key={idx} href={link.href} className="group p-8 bg-white border border-gray-100 rounded-2xl hover:border-indigo-600 hover:shadow-md transition-all">
                <p className="label-metadata mb-4 text-gray-400">Resource</p>
                <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                  {link.label} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                </h4>
              </Link>
            ))}
          </div>

          <h2 className="text-3xl font-bold mb-16 text-center">Explore Related Calculations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-5xl mx-auto">
            <div>
              <h3 className="label-metadata mb-8 text-gray-500 uppercase tracking-widest">Nearby Income Tiers ({countyName})</h3>
              <div className="space-y-6">
                {[-1000, -500, 500, 1000].map((diff) => {
                  const newInc = income + diff;
                  if (newInc <= 0) return null;
                  const pf = county?.slug ? `${county.slug}-income` : "income";
                  const nChildren = children === 1 ? "1-child" : `${children}-children`;
                  return (
                    <Link key={diff} href={`/${pf}-${newInc}-${nChildren}`} className="block p-6 bg-white border border-gray-100 rounded-xl hover:border-indigo-600 hover:shadow-sm transition-all group font-medium text-gray-700">
                      Estimate {formatter.format(newInc)} for {children} {children === 1 ? "Child" : "Children"}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div>
              <h3 className="label-metadata mb-8 text-gray-500 uppercase tracking-widest">Compare Washington Counties</h3>
              <div className="space-y-6">
                {siblingCounties.map((c) => (
                  <Link key={c.slug} href={`/${c.slug}-income-${income}-${children === 1 ? "1-child" : `${children}-children`}`} className="block p-6 bg-white border border-gray-100 rounded-xl hover:border-indigo-600 hover:shadow-sm transition-all group font-medium text-gray-700">
                    {c.name} Child Support for {formattedIncome}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
