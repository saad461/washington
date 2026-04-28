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
 <div class="card card-brand my-12">
 <h3 class="flex items-center gap-2 mt-0 text-h3"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/></svg> Low-Income Protective Measures</h3>
 <p class="text-body">For families with a combined monthly income of <strong>${formattedIncome}</strong>, Washington's 2026 guidelines trigger automatic poverty protections. At this level, the standard ${formattedSupport} obligation is often reduced to the statutory minimum of $50 per child.</p>
 <ul class="mt-6 space-y-2 list-disc pl-6 text-body">
 <li><strong>SSR Protection:</strong> The approximately $2,394 reserve is strictly applied.</li>
 <li><strong>Statutory Minimum:</strong> Usually $50/month per child.</li>
 <li><strong>Deviation Probability:</strong> High at the ${formattedIncome} income tier.</li>
 </ul>
 </div>`;
  } else if (income <= 12000) {
    incomeBlock = `
 <div class="card section-subtle my-12">
 <h3 class="flex items-center gap-2 mt-0 text-h3"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg> Standard Mid-Income Calculation</h3>
 <p class="text-body">Your ${formattedIncome} income falls within the standard economic schedule. This means the <strong>${formattedSupport}</strong> figure is the presumptive legal standard. In ${countyName}, the court assumes this basic obligation is sufficient for ${childrenText}.</p>
 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
 <div class="card !p-6">
 <p class="label mb-2 text-text-muted">Presumptive Amount</p>
 <p class="text-h3 !text-brand">${formattedSupport}</p>
 </div>
 <div class="card !p-6">
 <p class="label mb-2 text-text-muted">Schedule Bracket</p>
 <p class="text-h3">Standard Limit</p>
 </div>
 </div>
 </div>`;
  } else {
    incomeBlock = `
 <div class="card section-inverse my-12 shadow-xl">
 <h3 class="text-white flex items-center gap-2 mt-0 text-h3"><svg class="w-6 h-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> High-Income Notice</h3>
 <p class="text-body !text-white">Because your combined income of <strong>${formattedIncome}</strong> exceeds the $12,000 statutory ceiling, the ${formattedSupport} base is a minimum starting point. Judges in ${locationName} have discretion to increase support proportional to the family's standard of living.</p>
 <p class="mt-6 text-xs italic opacity-70">Note: The 45% net income cap remains a vital legal defense.</p>
 </div>`;
  }

  let familyBlock = "";
  if (children >= 3) {
    familyBlock = `
 <div class="card card-brand my-12">
 <h4 class="flex items-center gap-2 mt-0 text-h4"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 15h6"/><path d="M9 11h6"/><path d="M9 19h1"/></svg> Large Family Analysis</h4>
 <p class="text-body">Raising ${childrenText} involves 'economies of scale'. The multiplier applied to the base income accounts for shared household costs. While the total of ${formattedSupport} is higher than for one child, the per-child cost is lower, reflecting common shared resources.</p>
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
    className="flex mb-8 text-overline no-print flex-wrap gap-y-2"
  >
    <Link href="/" className="hover:text-brand transition-colors shrink-0">Home</Link>
    <span className="mx-2 opacity-30 shrink-0">/</span>
    <div className="flex items-center min-w-0">
      <span className="opacity-80 truncate hidden sm:inline">Washington</span>
      {county && (
        <>
          <span className="mx-2 opacity-30 shrink-0 hidden sm:inline">/</span>
          <Link
            href={`/${county.slug}-income-5000-2-children`}
            className="hover:text-brand transition-colors truncate hidden sm:inline"
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
    { label: `Glossary`, href: "/glossary" },
    { label: `Methodology`, href: "/editorial-methodology" },
    { label: `How to File in ${countyName}`, href: `/how-to-file-child-support-washington` },
    { label: `Courts Directory`, href: "/washington-courts" },
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
    <main className="flex-1 w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalculatorSchema income={income} childCount={children} county={countyName} url={`https://wcssc.site/${slug}`} resultAmount={supportNum !== null ? supportNum : undefined} />

      <div className="container section relative z-10">
        <Breadcrumbs county={county} income={income} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="mb-12">
              <h1 className="text-h1">
                {formattedIncome} Child Support in <span className="text-brand">{locationName}</span>
              </h1>
            </div>

            <div className="mb-16">
              <div className="card card-elevated text-center md:py-16">
                <p className="text-overline mb-8 text-text-muted">2026 Monthly Presumptive Payment</p>
                <div className="mb-8">
                  <span className="text-numeric-lg !text-5xl sm:!text-6xl text-brand">{formattedSupport}</span>
                </div>
                <div className="flex justify-center items-center gap-8 sm:gap-16 border-t border-border-default pt-8">
                  <div>
                    <p className="text-overline mb-2 text-text-muted">Net Income</p>
                    <p className="text-h3">{formattedIncome}</p>
                  </div>
                  <div className="w-px h-8 bg-border-default" />
                  <div>
                    <p className="text-overline mb-2 text-text-muted">Children</p>
                    <p className="text-h3">{children}</p>
                  </div>
                </div>
                <div className="mt-8">
                  <PrintButton />
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-h2 mb-8 flex items-center gap-4">
                <Landmark className="w-8 h-8 text-brand" /> Key Figures
              </h2>
              <div className="table-wrapper">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keyFigures.map((item, idx) => (
                      <tr key={idx}>
                        <td className="flex items-center gap-4">
                          <span className="text-brand">{item.icon}</span> {item.label}
                        </td>
                        <td className="text-text-muted">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <article className="prose max-w-prose mb-16">
              <div className="mb-6 opacity-60 text-xs no-print">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <AdContainer slot="top" />
              <h2 className="text-h2">Washington Child Support Guidelines (2026 Updates)</h2>
              <p className="text-body-lg">{intro}</p>

              <h2 className="text-h2">Breakdown of the {formattedIncome} Calculation</h2>
              <p className="text-body">{calculation}</p>

              <div dangerouslySetInnerHTML={{ __html: incomeBlock }} />
              <div dangerouslySetInnerHTML={{ __html: familyBlock }} />

              <h2 className="text-h2">The SSR and Low-Income Safeguards</h2>
              <p className="text-body">{ssr}</p>
              <AdContainer slot="mid" />

              {county && (
                <>
                  <h2 className="text-h2">Application in {countyName} Superior Court</h2>
                  <p className="text-body">
                    While the 2026 economic schedule is uniform statewide, the <strong>{county.court}</strong> handles procedural enforcement. In <strong>{countyName}</strong>, judges may require additional proof of income before finalizing the {formattedSupport} order.
                  </p>
                </>
              )}

              <h2 className="text-h2">Calculation Summary & Requirements</h2>
              <p className="text-body">{conclusion}</p>

              <div className="card section-subtle mt-16">
                <p className="label mb-4 flex items-center gap-2 text-brand">
                  <Scale className="w-6 h-6" /> Accuracy & Legal Status
                </p>
                <p className="text-sm italic">{legal}</p>
              </div>
            </article>

            <div className="calc-result !p-12 mb-16">
              <h3 className="text-h2 !text-white mb-8">Advanced Estimator Wizard</h3>
              <p className="mb-12 text-body-lg !text-white opacity-80">
                Get a full breakdown using our Washington Child Support Worksheet Wizard. Calculate precise income splits and extraordinary expenses.
              </p>
              <Link href="/worksheet" className="btn btn-secondary btn-lg">
                Launch Complete Wizard <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <section className="mb-16">
              <h2 className="text-h2 mb-12">Common Support Questions</h2>
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
               <AuthoritySidebar county={county} />
               <div className="mt-8">
                <AuthorBox />
              </div>
            </div>
          </aside>
        </div>

        <div className="border-t border-border-default pt-16 mt-16">
          <div className="card-grid-4 mb-24">
            {internalLinks.map((link, idx) => (
              <Link key={idx} href={link.href} className="card group hover:border-brand transition-colors">
                <p className="text-overline mb-4 text-text-muted">Resource</p>
                <h4 className="text-h4 group-hover:text-brand transition-colors flex items-center justify-between">
                  {link.label} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                </h4>
              </Link>
            ))}
          </div>

          <h2 className="text-h2 mb-16 text-center">Explore Related Calculations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-[1000px] mx-auto">
            <div className="space-y-6">
              <h3 className="text-overline mb-4">Nearby Income Tiers</h3>
              {[-1000, -500, 500, 1000].map((diff) => {
                const newInc = income + diff;
                if (newInc <= 0) return null;
                const pf = county?.slug ? `${county.slug}-income` : "income";
                const nChildren = children === 1 ? "1-child" : `${children}-children`;
                return (
                  <Link key={diff} href={`/${pf}-${newInc}-${nChildren}`} className="card !p-4 hover:border-brand block">
                    Estimate {formatter.format(newInc)} for {children} {children === 1 ? "Child" : "Children"}
                  </Link>
                );
              })}
            </div>
            <div className="space-y-6">
              <h3 className="text-overline mb-4">Compare Counties</h3>
              {siblingCounties.map((c) => (
                <Link key={c.slug} href={`/${c.slug}-income-${income}-${children === 1 ? "1-child" : `${children}-children`}`} className="card !p-4 hover:border-brand block">
                  {c.name} Support for {formattedIncome}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
