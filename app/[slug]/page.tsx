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
// Removing generateStaticParams avoids SSG prerender of 300+ pages at build time,
// which caused useContext crashes from client components (AdContainer, AuthoritySidebar).
export const dynamicParams = true;
export const revalidate = 2592000; // 30 days ISR cache
// --- Deterministic A/B Testing Engine ---
function getABVariant(slug: string): "A" | "B" {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 2 === 0 ? "A" : "B";
}

function parseSlug(slug: string) {
  // Format: [county-slug]-income-[amount]-[n]-child(ren)
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
  // Format: income-[amount]-[n]-child(ren)
  const genericMatch = slug.match(/^income-(\d+)-(\d+)-(?:child|children)$/);
  if (genericMatch) {
    return {
      county: null,
      income: parseInt(genericMatch[1], 10),
      children: parseInt(genericMatch[2], 10),
    };
  }
  // Legacy fallback (no suffix): [county-slug]-income-[amount]-[n]
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

// --- Content Variation Logic ---
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

  // --- Dynamic Content Blocks ---
  let incomeBlock = "";
  if (income < 2200) {
    incomeBlock = `
 <div class="bg-indigo-50 p-6 md:p-6 rounded-xl border border-indigo-100/50 my-10">
 <h3 class=" flex items-center gap-2 mt-0 "><svg class="w-6 h-6 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/></svg> Low-Income Protective Measures</h3>
 <p class=" ">For families with a combined monthly income of <strong>${formattedIncome}</strong>, Washington's 2026 guidelines trigger automatic poverty protections. At this level, the standard ${formattedSupport} obligation is often reduced to the statutory minimum of $50 per child.</p>
 <ul class=" mt-5 space-y-2 list-disc pl-5 ">
 <li><strong>SSR Protection:</strong> The approximately $2,394 reserve is strictly applied.</li>
 <li><strong>Statutory Minimum:</strong> Usually $50/month per child.</li>
 <li><strong>Deviation Probability:</strong> High at the ${formattedIncome} income tier.</li>
 </ul>
 </div>`;
  } else if (income <= 12000) {
    incomeBlock = `
 <div class="bg-gray-50 p-6 md:p-6 rounded-xl border border-gray-100 my-10">
 <h3 class=" flex items-center gap-2 mt-0 "><svg class="w-6 h-6 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg> Standard Mid-Income Calculation</h3>
 <p class=" ">Your ${formattedIncome} income falls within the standard economic schedule. This means the <strong>${formattedSupport}</strong> figure is the presumptive legal standard. In ${countyName}, the court assumes this basic obligation is sufficient for ${childrenText}.</p>
 <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
 <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
 <p class="label-metadata mb-2 font-sans leading-none">Presumptive Amount</p>
 <p class="text-xl leading-none">${formattedSupport}</p>
 </div>
 <div class="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
 <p class="label-metadata mb-2 font-sans leading-none">Schedule Bracket</p>
 <p class="text-xl leading-none">Standard Limit</p>
 </div>
 </div>
 </div>`;
  } else {
    incomeBlock = `
 <div class="bg-gray-900 p-6 md:p-6 rounded-xl my-10 text-white">
 <h3 class="text-white flex items-center gap-2 mt-0 "><svg class="w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> High-Income Notice</h3>
 <p class=" ">Because your combined income of <strong>${formattedIncome}</strong> exceeds the $12,000 statutory ceiling, the ${formattedSupport} base is a minimum starting point. Judges in ${locationName} have discretion to increase support proportional to the family's standard of living.</p>
 <p class=" mt-4 text-sm italic">Note: The 45% net income cap remains a vital legal defense.</p>
 </div>`;
  }

  let familyBlock = "";
  if (children >= 3) {
    familyBlock = `
 <div class="bg-indigo-50/50 p-6 md:p-6 rounded-xl border border-indigo-100/50 my-10">
 <h4 class="text-indigo-950 flex items-center gap-2 mt-0 "><svg class="w-6 h-6 " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 15h6"/><path d="M9 11h6"/><path d="M9 19h1"/></svg> Large Family Analysis</h4>
 <p class=" ">Raising ${childrenText} involves 'economies of scale'. The multiplier applied to the base income accounts for shared household costs. While the total of ${formattedSupport} is higher than for one child, the per-child cost is lower, reflecting common shared resources.</p>
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
      a: `The underlying economic tables for ${formattedIncome} are the same statewide across Washington. However, ${countyName} Superior Court may have specific local rules regarding how income is verified (such as mandatory tax return lookbacks) and how 'extraordinary expenses' like daycare are split.`,
    },
    {
      q: `What if my ${formattedIncome} income changes significantly?`,
      a: `Child support orders in Washington can be modified if there is a 'substantial change in circumstances,' typically defined as a 10% or greater shift in net income. If your ${formattedIncome} mark drops or increases, you should file a petition for modification in the ${countyName} court system immediately.`,
    },
    {
      q: `How does the 2026 SSR affect my $${income.toLocaleString()} child support order?`,
      a: `The 2026 Self-Support Reserve (SSR) is approximately $2,394. If the parent paying the ${formattedSupport} would be left with less than approximately $2,394 in monthly net income, the court must consider a downward deviation. This is a critical protection for parents at the ${formattedIncome} level to ensure they can maintain their own basic housing and food.`,
    },
    {
      q: `Does $${formattedSupport} include health insurance for ${childrenText}?`,
      a: `No, the ${formattedSupport} basic obligation covers only food, shelter, and basic clothing. Costs for health insurance premiums, uninsured medical expenses, and work-related daycare are added on top of the ${formattedSupport} base and shared proportionally based on the ${formattedIncome} split.`,
    },
  ];
}

// --- SEO & Metadata ---
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

  const description = `Calculate child support in ${county?.name || "Washington"}. Includes 2026 SSR rules (approximately $2,394 limit), Courthouse location (${county?.courtAddress || "WA"}), and low-income protections.`;

  // --- Index Control Logic ---
  // If income is NOT round (1000, 2000, etc), add noindex
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
      images: [
        {
          url: "/wcssc-og.jpg",
          width: 1200,
          height: 630,
          alt: `Washington Child Support Calculator - ${locationText}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}

const Breadcrumbs = ({
  county,
  income,
  childCount,
}: {
  county: { name: string; slug: string } | null;
  income: number;
  childCount: number;
}) => (
  <nav
    aria-label="Breadcrumb"
    className="flex mb-10 label-metadata no-print flex-wrap gap-y-2"
  >
    <Link href="/" className="hover: transition-colors">
      Home
    </Link>
    <span className="mx-3 opacity-30">/</span>
    <span className="opacity-80">Washington</span>
    {county && (
      <>
        <span className="mx-3 opacity-30">/</span>
        <Link
          href={`/${county.slug}-income-5000-${childCount}-${childCount === 1 ? "child" : "children"}`}
          className="hover: transition-colors"
        >
          {county.name}
        </Link>
      </>
    )}
    <span className="mx-3 opacity-30">/</span>
    <span>${income.toLocaleString()} Calculation</span>
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

  // Generate Content via Variation Engine
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

  // Calculate dynamic word count for AdSense compliance
  const totalText = `${intro} ${calculation} ${ssr} ${conclusion} ${incomeBlock} ${familyBlock}`;
  const wordCount = totalText
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const timestamp = `Last Updated: ${new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;

  // Internal Link Logic (+/- $1000 and High-Value Siblings)
  const targetCounties = [
    "king-county",
    "pierce-county",
    "snohomish-county",
    "spokane-county",
  ];
  const siblingCounties = washingtonCounties.filter(
    (c) => targetCounties.includes(c.slug) && c.slug !== county?.slug,
  );

  // Key Figures Table Data
  const keyFigures = [
    {
      label: "Combined Monthly Net Income",
      value: formattedIncome,
      icon: <Calculator className="w-4 h-4" />,
    },
    {
      label: "Number of Children",
      value: children.toString(),
      icon: <Info className="w-4 h-4" />,
    },
    {
      label: "Presumptive Basic Support",
      value: formattedSupport,
      icon: <Landmark className="w-4 h-4" />,
    },
    {
      label: "Self-Support Reserve (2026)",
      value: "approximately $2,394",
      icon: <Scale className="w-4 h-4" />,
    },
    {
      label: "Jurisdiction",
      value: locationName,
      icon: <Landmark className="w-4 h-4" />,
    },
  ];

  // Internal Links with Keyword Rich Anchor Text
  const internalLinks = [
    { label: `Washington Child Support Glossary`, href: "/glossary" },
    { label: `2026 Editorial Methodology`, href: "/editorial-methodology" },
    {
      label: `How to File for Support in ${countyName}`,
      href: `/how-to-file-child-support-washington`,
    },
    { label: `Washington State Courts Directory`, href: "/washington-courts" },
  ];

  // JSON-LD Generation
  const canonicalUrl = `https://wcssc.site/${slug}`;
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://wcssc.site",
    },
    ...(county
      ? [
          {
            "@type": "ListItem",
            position: 2,
            name: county.name,
            item: `https://wcssc.site/${county.slug}-income-5000-${children}-${children === 1 ? "child" : "children"}`,
          },
        ]
      : []),
    {
      "@type": "ListItem",
      position: county ? 3 : 2,
      name: `${formattedIncome} Calculation`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        "@id": "https://wcssc.site",
        name: "Washington Child Support Schedule Center",
        url: "https://wcssc.site",
        description: `Free 2026 Washington State child support calculator. ${formattedIncome} income, ${children} ${children === 1 ? "child" : "children"}.`,
        areaServed: {
          "@type": "State",
          name: "Washington",
          addressCountry: "US",
        },
        priceRange: "Free",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@wcssc.site",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
      },
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        url: canonicalUrl,
        name: `${formattedIncome} Child Support ${county ? `in ${county.name}` : "in Washington"} (2026)`,
        isPartOf: { "@id": "https://wcssc.site" },
      },
    ],
  };

  return (
    <div className="flex-1 flex flex-col items-center bg-white relative w-full overflow-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorSchema
        income={income}
        childCount={children}
        county={countyName}
        url={canonicalUrl}
        resultAmount={supportNum !== null ? supportNum : undefined}
      />

      {/* Background Gradients (Hardware Accelerated) */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div className="absolute top-0 right-0 w-[65rem] h-[65rem] bg-indigo-50/40 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-40" />
        <div className="absolute bottom-0 left-0 w-[55rem] h-[55rem] bg-emerald-50/30 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 opacity-40" />
      </div>

      <div className="max-w-7xl w-full mx-auto z-10 relative px-4 sm:px-6 section-default lg:py-24">
        <Breadcrumbs county={county} income={income} childCount={children} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20">
          <div className="lg:col-span-8">
            <AdContainer slot="top" wordCount={wordCount} />

            <div className="mb-10 md:mb-14">
              <h1 className=" mb-6 md:mb-8 leading-[1.15] md:leading-[1.1] ">
                {formattedIncome}{" "}
                <span className=" block sm:inline">Child Support</span> in{" "}
                <span className=" underline decoration-indigo-200 underline-offset-8 decoration-4">
                  {locationName}
                </span>
              </h1>
            </div>

            {/* Result Header Card */}
            <div className="mb-16">
              <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-12 text-center relative overflow-hidden">
                <p className="label-metadata mb-10">
                  2026 Monthly Presumptive Payment
                </p>

                <div className="mb-10">
                  <span className="text-3xl ">
                    {formattedSupport}
                  </span>
                </div>

                <div className="flex justify-center items-center gap-12 border-t border-gray-50 pt-10">
                  <div className="text-center">
                    <p className="label-metadata mb-2">
                      Net Income
                    </p>
                    <p className="text-lg ">{formattedIncome}</p>
                  </div>
                  <div className="w-px h-10 bg-gray-100" aria-hidden="true" />
                  <div className="text-center">
                    <p className="label-metadata mb-2">
                      Children
                    </p>
                    <p className="text-lg ">{children}</p>
                  </div>
                </div>

                <div className="mt-12">
                  <PrintButton />
                </div>
              </div>
            </div>

            {/* Key Figures Table */}
            <div className="mb-12 md:mb-20">
              <h2 className=" mb-8 flex items-center gap-3 ">
                <Landmark className=" w-6 h-6" /> Key Calculation Figures
              </h2>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse border border-gray-100 rounded-xl overflow-hidden">
                  <caption className="sr-only">
                    Support Calculation Breakdown
                  </caption>
                  <caption className="sr-only">
                    Detailed Child Support Metric Figures for $
                    {income.toLocaleString()} monthly income
                  </caption>
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-3 min-h-[48px] label-metadata ">
                        Metric
                      </th>
                      <th className="px-6 py-3 min-h-[48px] label-metadata ">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {keyFigures.map((item, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-3 min-h-[48px] flex items-center gap-3 text-sm">
                          <span className="text-indigo-600 opacity-70">
                            {item.icon}
                          </span>{" "}
                          {item.label}
                        </td>
                        <td className="px-6 py-3 min-h-[48px] text-sm">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* --- LONG FORM SEO CONTENT --- */}
            <article className="prose prose-gray prose-lg max-w-none mb-20 ">
              <h2 className="text-3xl ">
                Washington Child Support Guidelines (2026 Updates)
              </h2>
              <p>{intro}</p>

              <div className="my-10 not-prose">
                <AdContainer slot="mid" wordCount={wordCount} />
              </div>

              <h2 className="text-3xl ">
                Breakdown of the {formattedIncome} Calculation
              </h2>
              <p>{calculation}</p>

              <div
                className="not-prose"
                dangerouslySetInnerHTML={{ __html: incomeBlock }}
              />
              <div
                className="not-prose"
                dangerouslySetInnerHTML={{ __html: familyBlock }}
              />

              <h2 className="text-3xl ">The SSR and Low-Income Safeguards</h2>
              <p>{ssr}</p>
              <p className="text-sm italic mt-4 ">
                Low-income protections may apply below approximately
                $2,394/month (180% of the federal poverty level). Estimates are
                based on Washington State guidelines (RCW 26.19).
              </p>

              {county && (
                <>
                  <h2 className="text-3xl ">
                    Application in {countyName} Superior Court
                  </h2>
                  <p>
                    While the 2026 economic schedule is uniform statewide, the{" "}
                    <strong>{county.court}</strong> handles procedural
                    enforcement. In <strong>{countyName}</strong>, judges may
                    require additional proof of income before finalizing the{" "}
                    {formattedSupport} order. Local rules also dictate how
                    daycare and health insurance premiums are shared
                    proportionally.
                  </p>
                </>
              )}

              <h2 className="text-3xl ">Calculation Summary & Requirements</h2>
              <p>{conclusion}</p>

              <div className="bg-gray-50 p-6 md:p-6 rounded-xl border border-gray-100 mt-12 not-prose">
                <p className="label-metadata mb-4 flex items-center gap-2">
                  <Scale className="w-4 h-4 " /> Accuracy & Legal Status
                </p>
                <p className="text-sm italic ">{legal}</p>
              </div>

              <p className="label-metadata mt-12">
                {timestamp}
              </p>
            </article>

            {/* CTA SECTION */}
            <div className="my-8 md:my-12 text-center text-sm ">
              Want to see our methodology? Review our{" "}
              <Link
                href="/editorial-methodology"
                className=" hover:text-indigo-800 transition-colors underline underline-offset-4"
              >
                2026 calculation standards
              </Link>
              .
            </div>

            <div className="my-20 p-6 md:p-14 bg-gray-900 rounded-2xl text-center shadow-sm relative overflow-hidden">
              <h3 className="text-3xl text-white mb-6 ">
                Advanced Estimator Wizard
              </h3>
              <p className=" mb-10 text-lg max-w-lg mx-auto ">
                Get a full breakdown using our Washington Child Support
                Worksheet Wizard. Calculate precise income splits and
                extraordinary expenses.
              </p>
              <Link
                href="/worksheet"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 min-h-[48px] text-base text-white hover:bg-gray-100 transition-all shadow-sm active:scale-95"
              >
                Launch Complete Wizard <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
            </div>

            {/* DYNAMIC FAQS */}
            <section className="mb-24">
              <h2 className="text-3xl mb-10 ">Common Support Questions</h2>
              <FAQAccordion
                items={dynamicFAQs.map((f) => ({ question: f.q, answer: f.a }))}
              />
            </section>
          </div>

          {/* --- SIDEBAR (Desktop only — mobile gets inline collapsed resources below) --- */}
          <div className="hidden lg:block lg:col-span-4">
            <AuthoritySidebar county={county} />
            <AuthorBox />
          </div>

          {/* --- MOBILE SIDEBAR (collapsed resources section) --- */}
          <div className="lg:hidden col-span-1 mt-6 md:mt-8">
            <details className="bg-white border border-gray-100 rounded-xl shadow-sm group">
              <summary className="flex items-center justify-between px-6 py-3 min-h-[48px] cursor-pointer min-h-[48px] text-sm select-none list-none">
                <span>📚 Resources &amp; Legal Sources</span>
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
              <div className="px-6 pb-6">
                <AuthoritySidebar county={county} />
              </div>
            </details>
            <AuthorBox />
          </div>
        </div>

        {/* --- INTERNAL LINKING MATRIX --- */}
        <div className="border-t border-gray-100 pt-12 md:pt-20 mt-6 md:mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {internalLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="group p-6 bg-white border border-gray-100 rounded-xl hover:border-indigo-600 transition-all shadow-sm"
              >
                <p className="label-metadata mb-3">
                  Resource
                </p>
                <h4 className=" group-hover: transition-colors flex items-center gap-2 text-sm leading-snug">
                  {link.label}{" "}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
              </Link>
            ))}
          </div>

          <h2 className=" mb-12 text-center ">Explore Related Calculations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Same County ±$1000 */}
            <div>
              <h3 className="label-metadata mb-8">
                Nearby Income Tiers ({countyName})
              </h3>
              <div className="stack-space">
                {[-1000, -500, +500, +1000].map((diff) => {
                  const newInc = income + diff;
                  if (newInc <= 0) return null;
                  const pf = county?.slug ? `${county.slug}-income` : "income";
                  const nChildren =
                    children === 1 ? "1-child" : `${children}-children`;
                  const formattedNewInc = formatter.format(newInc);
                  return (
                    <Link
                      key={diff}
                      href={`/${pf}-${newInc}-${nChildren}`}
                      prefetch={false}
                      className="block p-5 bg-white border border-gray-100 rounded-xl hover:border-indigo-600 transition-all group shadow-sm text-sm"
                    >
                      <span className=" group-hover: transition-colors">
                        Estimate {formattedNewInc} for {children}{" "}
                        {children === 1 ? "Child" : "Children"}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Sibling Counties Same Income */}
            <div>
              <h3 className="label-metadata mb-8">
                Compare Washington Counties
              </h3>
              <div className="stack-space">
                {siblingCounties.map((c) => {
                  const nChildren =
                    children === 1 ? "1-child" : `${children}-children`;
                  return (
                    <Link
                      key={c.slug}
                      href={`/${c.slug}-income-${income}-${nChildren}`}
                      prefetch={false}
                      className="block p-5 bg-white border border-gray-100 rounded-xl hover:border-indigo-600 transition-all group shadow-sm text-sm"
                    >
                      <span className=" group-hover: transition-colors">
                        {c.name} Child Support for {formattedIncome}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
