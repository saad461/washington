import { getExactSupport } from '@/data/washingtonTable2026';
import { washingtonCounties, WashingtonCounty } from '@/data/washingtonCounties';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Calculator, Info, Landmark, Scale } from 'lucide-react';
import { 
  AdContainerClient as AdContainer, 
  AuthoritySidebarClient as AuthoritySidebar, 
  AuthorBoxClient as AuthorBox,
  PrintButtonClient as PrintButton 
} from '@/components/ClientDynamic';
import CalculatorSchema from '@/components/CalculatorSchema';
import { contentVariants } from '@/lib/contentVariants';
import { getVariantIndices, formatVariant } from '@/lib/getVariant';

type Props = { params: Promise<{ slug: string }> };

// ISR: All slug pages are built on-demand and cached for 30 days.
// Removing generateStaticParams avoids SSG prerender of 300+ pages at build time,
// which caused useContext crashes from client components (AdContainer, AuthoritySidebar).
export const dynamicParams = true;
export const revalidate = 2592000; // 30 days ISR cache
// --- Deterministic A/B Testing Engine ---
function getABVariant(slug: string): 'A' | 'B' {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 2 === 0 ? 'A' : 'B';
}

function parseSlug(slug: string) {
  // Format: [county-slug]-income-[amount]-[n]-child(ren)
  const countyMatch = slug.match(/^(.+)-income-(\d+)-(\d+)-(?:child|children)$/);
  if (countyMatch) {
    const county = washingtonCounties.find(c => c.slug === countyMatch[1]) || null;
    return { county, income: parseInt(countyMatch[2], 10), children: parseInt(countyMatch[3], 10) };
  }
  // Format: income-[amount]-[n]-child(ren)
  const genericMatch = slug.match(/^income-(\d+)-(\d+)-(?:child|children)$/);
  if (genericMatch) {
    return { county: null, income: parseInt(genericMatch[1], 10), children: parseInt(genericMatch[2], 10) };
  }
  // Legacy fallback (no suffix): [county-slug]-income-[amount]-[n]
  const legacyCountyMatch = slug.match(/^(.+)-income-(\d+)-(\d+)$/);
  if (legacyCountyMatch) {
    const county = washingtonCounties.find(c => c.slug === legacyCountyMatch[1]) || null;
    return { county, income: parseInt(legacyCountyMatch[2], 10), children: parseInt(legacyCountyMatch[3], 10) };
  }
  return { county: null, income: 5000, children: 1 };
}

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

// --- Content Variation Logic ---
function generateDynamicContent(slug: string, income: number, children: number, county: WashingtonCounty | null) {
  const formattedIncome = formatter.format(income);
  const supportNum = getExactSupport(income, children);
  const formattedSupport = supportNum !== null ? formatter.format(supportNum) : "Court Discretion";
  const childrenText = children === 1 ? 'one child' : `${children} children`;
  const countyName = county ? county.name : "Washington";
  const locationName = county ? `${county.name}, WA` : "Washington State";

  const { introIndex, calcIndex, ssrIndex, conclusionIndex, legalIndex } = getVariantIndices(slug);
  
  const values = { formattedIncome, formattedSupport, childrenText, countyName, locationName };

  const intro = formatVariant(contentVariants.introductions[introIndex], values);
  const calculation = formatVariant(contentVariants.calculations[calcIndex], values);
  const ssr = formatVariant(contentVariants.ssrExplanations[ssrIndex], values);
  const conclusion = formatVariant(contentVariants.conclusions[conclusionIndex], values);
  const legal = formatVariant(contentVariants.legalDisclaimers[legalIndex], values);

  // --- Dynamic Content Blocks ---
  let incomeBlock = "";
  if (income < 2200) {
    incomeBlock = `
      <div class="bg-blue-50 p-8 rounded-3xl border border-blue-100 my-8">
        <h3 class="text-blue-900 flex items-center gap-2 mt-0"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/></svg> Low-Income Protective Measures</h3>
        <p class="text-blue-800">For families with a combined monthly income of <strong>${formattedIncome}</strong>, Washington's 2026 guidelines trigger automatic poverty protections. At this level, the standard ${formattedSupport} obligation is often reduced to the statutory minimum of $50 per child. The court's primary goal is to ensure the payer doesn't fall below the self-support reserve floor while still providing a baseline contribution for ${childrenText}.</p>
        <ul class="text-blue-800 mt-4 space-y-2">
          <li><strong>SSR Protection:</strong> The $1,514 reserve is strictly enforced.</li>
          <li><strong>Mandatory Minimum:</strong> Usually $50/month per child.</li>
          <li><strong>Deviation Chance:</strong> Extremely high at the ${formattedIncome} tier.</li>
        </ul>
      </div>`;
  } else if (income <= 12000) {
    incomeBlock = `
      <div class="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 my-8">
        <h3 class="text-emerald-900 flex items-center gap-2 mt-0"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg> Standard Mid-Income Calculation</h3>
        <p class="text-emerald-800">Your ${formattedIncome} income falls within the standard economic schedule of Washington. This means the <strong>${formattedSupport}</strong> figure is the presumptive legal standard. In ${countyName}, the court assumes this amount is sufficient to cover the basic needs of ${childrenText} without causing undue financial strain on either household. This calculation is the most common and predictable in the 2026 system.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div class="bg-white/50 p-4 rounded-xl border border-emerald-200">
            <p class="text-[10px] font-black uppercase text-emerald-600 mb-1">Presumptive Amount</p>
            <p class="text-xl font-black text-emerald-900">${formattedSupport}</p>
          </div>
          <div class="bg-white/50 p-4 rounded-xl border border-emerald-200">
            <p class="text-[10px] font-black uppercase text-emerald-600 mb-1">Income Bracket</p>
            <p class="text-xl font-black text-emerald-900">Standard ($2,200 - $12,000)</p>
          </div>
        </div>
      </div>`;
  } else {
    incomeBlock = `
      <div class="bg-purple-50 p-8 rounded-3xl border border-purple-100 my-8">
        <h3 class="text-purple-900 flex items-center gap-2 mt-0"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> High-Income Extrapolation Notice</h3>
        <p class="text-purple-800">Because your combined income of <strong>${formattedIncome}</strong> exceeds the $12,000 statutory ceiling, the ${formattedSupport} base is merely a starting point. In ${locationName}, judges have 'extrapolative discretion' to increase support based on your family's actual standard of living. For ${childrenText}, this often includes consideration of private schooling, premium extracurriculars, and high-value housing costs not captured in standard tables.</p>
        <p class="text-purple-800 mt-4 italic font-medium">Note: At ${formattedIncome}, the 45% net income cap remains a vital legal defense against excessive orders.</p>
      </div>`;
  }

  let familyBlock = "";
  if (children >= 3) {
    familyBlock = `
      <div class="bg-amber-50 p-8 rounded-3xl border border-amber-100 my-8">
        <h4 class="text-amber-900 flex items-center gap-2 mt-0 font-black"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 15h6"/><path d="M9 11h6"/><path d="M9 19h1"/></svg> Large Family Multiplier Analysis</h4>
        <p class="text-amber-800">Raising ${childrenText} on a ${formattedIncome} income involves significant 'economies of scale' in the eyes of Washington law. The 2026 schedule applies a specific multiplier to the ${formattedIncome} base to account for shared housing and utility costs. While the total obligation of ${formattedSupport} is higher than for a single child, the 'per-child' cost is actually lower, reflecting the shared resources of a larger household.</p>
      </div>`;
  }

  return { intro, calculation, ssr, conclusion, legal, incomeBlock, familyBlock };
}

function generateDynamicFAQs(income: number, children: number, countyName: string, formattedIncome: string, formattedSupport: string) {
  const childrenText = children === 1 ? 'one child' : `${children} children`;
  return [
    {
      q: `How much child support for ${childrenText} at $${income.toLocaleString()} income in Washington?`,
      a: `For a combined net income of ${formattedIncome}, the 2026 Washington State presumptive basic support obligation for ${childrenText} is ${formattedSupport}. This figure is the starting point used by judges in ${countyName} to ensure children's needs are met proportional to parental income.`
    },
    {
      q: `Is the $${income.toLocaleString()} calculation different in ${countyName} than other counties?`,
      a: `The underlying economic tables for ${formattedIncome} are the same statewide across Washington. However, ${countyName} Superior Court may have specific local rules regarding how income is verified (such as mandatory tax return lookbacks) and how 'extraordinary expenses' like daycare are split.`
    },
    {
      q: `What if my ${formattedIncome} income changes significantly?`,
      a: `Child support orders in Washington can be modified if there is a 'substantial change in circumstances,' typically defined as a 10% or greater shift in net income. If your ${formattedIncome} mark drops or increases, you should file a petition for modification in the ${countyName} court system immediately.`
    },
    {
      q: `How does the 2026 SSR affect my $${income.toLocaleString()} child support order?`,
      a: `The 2026 Self-Support Reserve (SSR) is $1,514. If the parent paying the ${formattedSupport} would be left with less than $1,514 in monthly net income, the court must consider a downward deviation. This is a critical protection for parents at the ${formattedIncome} level to ensure they can maintain their own basic housing and food.`
    },
    {
      q: `Does $${formattedSupport} include health insurance for ${childrenText}?`,
      a: `No, the ${formattedSupport} basic obligation covers only food, shelter, and basic clothing. Costs for health insurance premiums, uninsured medical expenses, and work-related daycare are added on top of the ${formattedSupport} base and shared proportionally based on the ${formattedIncome} split.`
    }
  ];
}

// --- SEO & Metadata ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { county, income } = parseSlug(slug);
  const variant = getABVariant(slug);
  const locationText = county ? `in ${county.name}` : "in Washington";
  const formattedAmt = formatter.format(income);

  const title = variant === 'A'
    ? `${formattedAmt} Income Child Support ${locationText} (2026 Calculator)`
    : `How Much is Child Support for ${formattedAmt} Income ${locationText}? (2026 Estimate)`;

  const description = `Calculate child support in ${county?.name || 'Washington'}. Includes 2026 SSR rules ($1,514 limit), Courthouse location (${county?.courtAddress || 'WA'}), and low-income protections.`;

  // --- Index Control Logic ---
  // If income is NOT round (1000, 2000, etc), add noindex
  const isRoundIncome = income % 1000 === 0;
  const robots = isRoundIncome ? "index, follow" : "noindex, follow";

  return {
    title, description,
    robots,
    alternates: { canonical: `https://wcssc.site/${slug}` },
    openGraph: {
      title, description,
      url: `https://wcssc.site/${slug}`, siteName: 'WCSSC',
      images: [{ url: '/wcssc-og.jpg', width: 1200, height: 630, alt: `Washington Child Support Calculator - ${locationText}` }],
      locale: 'en_US', type: 'website',
    }
  };
}

const Breadcrumbs = ({ county, income, childCount }: { county: { name: string; slug: string } | null; income: number; childCount: number }) => (
  <nav aria-label="Breadcrumb" className="flex mb-12 text-xs font-black uppercase tracking-widest text-slate-500 no-print flex-wrap gap-y-2">
    <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link><span className="mx-2 opacity-30">/</span><span className="opacity-60">Washington</span>
    {county && (
      <><span className="mx-2 opacity-30">/</span><Link href={`/${county.slug}-income-5000-${childCount}-${childCount === 1 ? 'child' : 'children'}`} className="hover:text-indigo-600 transition-colors">{county.name}</Link></>
    )}
    <span className="mx-2 opacity-30">/</span><span className="text-slate-900">${income.toLocaleString()} Calculation</span>
  </nav>
);

export default async function ProgrammaticSEOPage({ params }: Props) {
  const { slug } = await params;
  const { county, income, children } = parseSlug(slug);
  const supportNum = getExactSupport(income, children);

  const formattedIncome = formatter.format(income);
  const formattedSupport = supportNum !== null ? formatter.format(supportNum) : "Court Discretion";
  const locationName = county ? `${county.name}, WA` : "Washington State";
  const countyName = county ? county.name : "Washington";

  // Generate Content via Variation Engine
  const { intro, calculation, ssr, conclusion, legal, incomeBlock, familyBlock } = generateDynamicContent(slug, income, children, county);
  const dynamicFAQs = generateDynamicFAQs(income, children, countyName, formattedIncome, formattedSupport);

  // Calculate dynamic word count for AdSense compliance
  const totalText = `${intro} ${calculation} ${ssr} ${conclusion} ${incomeBlock} ${familyBlock}`;
  const wordCount = totalText.split(/\s+/).filter(word => word.length > 0).length;

  const timestamp = `Last Updated: ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;

  // Internal Link Logic (+/- $1000 and High-Value Siblings)
  const targetCounties = ['king-county', 'pierce-county', 'snohomish-county', 'spokane-county'];
  const siblingCounties = washingtonCounties.filter(c => targetCounties.includes(c.slug) && c.slug !== county?.slug);

  // Key Figures Table Data
  const keyFigures = [
    { label: "Combined Monthly Net Income", value: formattedIncome, icon: <Calculator className="w-4 h-4" /> },
    { label: "Number of Children", value: children.toString(), icon: <Info className="w-4 h-4" /> },
    { label: "Presumptive Basic Support", value: formattedSupport, icon: <Landmark className="w-4 h-4" /> },
    { label: "Self-Support Reserve (2026)", value: "$1,514", icon: <Scale className="w-4 h-4" /> },
    { label: "Jurisdiction", value: locationName, icon: <Landmark className="w-4 h-4" /> },
  ];

  // Internal Links with Keyword Rich Anchor Text
  const internalLinks = [
    { label: `Washington Child Support Glossary`, href: "/glossary" },
    { label: `2026 Editorial Methodology`, href: "/editorial-methodology" },
    { label: `How to File for Support in ${countyName}`, href: `/how-to-file-child-support-washington` },
    { label: `Washington State Courts Directory`, href: "/washington-courts" },
  ];

  // JSON-LD Generation
  const faqSchemaElements = dynamicFAQs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": { "@type": "Answer", "text": faq.a }
  }));

  const canonicalUrl = `https://wcssc.site/${slug}`;
  const breadcrumbItems = [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://wcssc.site" },
    ...(county ? [{ "@type": "ListItem", "position": 2, "name": county.name, "item": `https://wcssc.site/${county.slug}-income-5000-${children}-${children === 1 ? 'child' : 'children'}` }] : []),
    { "@type": "ListItem", "position": county ? 3 : 2, "name": `${formattedIncome} Calculation` }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": faqSchemaElements
      },
      {
        "@type": "FinancialService",
        "@id": "https://wcssc.site",
        "name": "Washington Child Support Schedule Center",
        "url": "https://wcssc.site",
        "description": `Free 2026 Washington State child support calculator. ${formattedIncome} income, ${children} ${children === 1 ? 'child' : 'children'}.`,
        "areaServed": {
          "@type": "State",
          "name": "Washington",
          "addressCountry": "US"
        },
        "priceRange": "Free",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "support@wcssc.site"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      },
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "name": `${formattedIncome} Child Support ${county ? `in ${county.name}` : 'in Washington'} (2026)`,
        "isPartOf": { "@id": "https://wcssc.site" }
      }
    ]
  };

  return (
    <div className="flex-1 flex flex-col items-center bg-[#FDFDFE] relative w-full overflow-hidden font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalculatorSchema income={income} childCount={children} county={countyName} url={canonicalUrl} resultAmount={supportNum !== null ? supportNum : undefined} />

      {/* Background Gradients (Hardware Accelerated) */}
      <div className="absolute inset-0 pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-0 right-0 w-[65rem] h-[65rem] bg-indigo-50/40 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 opacity-40" />
        <div className="absolute bottom-0 left-0 w-[55rem] h-[55rem] bg-emerald-50/30 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 opacity-40" />
      </div>

      <div className="max-w-7xl w-full mx-auto z-10 relative px-6 py-20 lg:py-24">
        <Breadcrumbs county={county} income={income} childCount={children} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <AdContainer slot="top" wordCount={wordCount} />

            <div className="mb-14">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-slate-900 mb-8 drop-shadow-sm leading-[1.05]">
                {formattedIncome} <span className="text-indigo-600 block sm:inline">Child Support</span> in <span className="text-slate-900 underline decoration-indigo-500/20 underline-offset-8">{locationName}</span>
              </h1>
            </div>

            {/* Result Header Card */}
            <div className="mb-16">
              <div className="w-full bg-white rounded-[3rem] shadow-2xl shadow-indigo-900/10 border border-slate-100 p-12 text-center relative overflow-hidden">
                <p className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-8">Estimated 2026 Monthly Payment</p>
                <div className="inline-flex py-8 px-16 bg-slate-900 rounded-[3rem] text-white shadow-xl mb-8">
                  <p className={`font-black tracking-tighter leading-none ${supportNum === null ? 'text-2xl' : 'text-5xl md:text-7xl'}`}>
                    {supportNum !== null && <span className="text-3xl text-indigo-400 align-top mr-2">$</span>}
                    {formattedSupport.replace('$', '')}
                  </p>
                </div>
                <div className="flex justify-center gap-8">
                  <div className="text-center"><p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Combined</p><p className="text-sm font-black">{formattedIncome}</p></div>
                  <div className="text-center"><p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Children</p><p className="text-sm font-black">{children}</p></div>
                </div>

                <PrintButton />
              </div>
            </div>

            {/* Key Figures Table */}
            <div className="mb-16">
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 tracking-tight">
                <Landmark className="text-indigo-600" /> Key Calculation Figures for {formattedIncome}
              </h2>
              <div className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                  <caption className="sr-only">Monthly Support Estimate for {formattedIncome} {county ? `in ${county.name}` : 'in Washington'}</caption>
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-4 sm:px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest">Metric</th>
                      <th className="px-4 sm:px-6 py-4 text-xs font-black uppercase text-slate-500 tracking-widest">Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {keyFigures.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-4 sm:px-6 py-4 flex items-center gap-3 font-bold text-slate-700 text-sm">
                          <span className="text-indigo-500">{item.icon}</span> {item.label}
                        </td>
                        <td className="px-4 sm:px-6 py-4 font-black text-slate-900 text-sm">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* --- LONG FORM SEO CONTENT (800-1200+ Words) --- */}
            <article className="prose prose-lg max-w-none text-slate-600 mb-16">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Introduction: Washington State Child Support Guidelines</h2>
              <p className="leading-relaxed">{intro}</p>

              <div className="my-10 not-prose">
                <AdContainer slot="mid" wordCount={wordCount} />
              </div>

              <h2 className="text-3xl font-black text-slate-900 tracking-tight">How the {formattedIncome} Tier is Calculated</h2>
              <p className="leading-relaxed">{calculation}</p>

              <div dangerouslySetInnerHTML={{ __html: incomeBlock }} />
              <div dangerouslySetInnerHTML={{ __html: familyBlock }} />

              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Self-Support Reserve and Poverty Floor Safeguards</h2>
              <p className="leading-relaxed">{ssr}</p>

              {county && (
                <>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Local Context: {countyName} Family Court Rules</h2>
                  <p className="leading-relaxed">
                    While the 2026 economic tables are uniform across the state, the <strong>{county.court}</strong> in {county.seat} handles procedural enforcement of your {formattedIncome} calculation. In <strong>{countyName}</strong>, commissioners may require specific financial documentation to verify your income pool before finalizing the {formattedSupport} order. Local family law rules often dictate how daycare and healthcare expenses are added to the basic obligation.
                  </p>
                </>
              )}

              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Final Considerations and Next Steps</h2>
              <p className="leading-relaxed">{conclusion}</p>

              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mt-12 not-prose">
                <p className="text-xs text-slate-600 font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                  <Scale className="w-4 h-4" /> Legal Disclaimer
                </p>
                <p className="text-sm text-slate-600 italic leading-relaxed">{legal}</p>
              </div>

              <p className="text-xs text-slate-500 font-bold tracking-widest uppercase mt-12">{timestamp}</p>
            </article>

            {/* CTA SECTION */}
            <div className="my-8 text-center text-sm font-medium text-slate-500">
              Curious how we derived these numbers? Review our <Link href="/editorial-methodology" className="text-indigo-600 underline hover:text-indigo-800 transition-colors">calculation methodology</Link> based on Washington state guidelines.
            </div>

            <div className="my-20 p-12 bg-indigo-600 rounded-[3rem] text-center shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <h3 className="text-3xl font-black text-white mb-6">Use Full Calculator</h3>
              <p className="text-indigo-100 mb-10 font-medium text-lg max-w-lg mx-auto">Get a full breakdown using our Washington Child Support Worksheet Wizard. Calculate precise splits, deductions, and extraordinary expenses instantly.</p>
              <Link href="/worksheet" className="inline-flex items-center justify-center rounded-[2rem] bg-white px-10 py-5 text-sm font-black text-indigo-900 hover:bg-slate-50 transition-all shadow-xl active:scale-95 uppercase tracking-widest">
                Open Worksheet Wizard <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
            </div>

            {/* DYNAMIC FAQS */}
            <section className="mb-20">
              <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight text-indigo-900">Legal FAQs for {formattedIncome} Tier</h2>
              <div className="space-y-4">
                {dynamicFAQs.map((faq, i) => (
                  <div key={i} className="p-8 bg-white rounded-[2rem] border border-slate-100 hover:border-indigo-500 transition-all">
                    <p className="font-black text-slate-900 text-lg mb-3 flex items-start gap-4">
                      <span className="w-8 h-8 rounded-full bg-slate-900 shrink-0 flex items-center justify-center text-[10px] text-white font-black mt-1">Q</span>
                      <span className="leading-tight">{faq.q}</span>
                    </p>
                    <p className="text-slate-600 font-medium leading-relaxed pl-12">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* --- SIDEBAR (Desktop only — mobile gets inline collapsed resources below) --- */}
          <div className="hidden lg:block lg:col-span-4">
            <AuthoritySidebar county={county} />
            <AuthorBox />
          </div>

          {/* --- MOBILE SIDEBAR (collapsed resources section) --- */}
          <div className="lg:hidden col-span-1 mt-8">
            <details className="bg-white border border-slate-100 rounded-2xl shadow-sm">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer min-h-[48px] text-sm font-bold text-slate-700">
                <span>📚 Resources & Legal Sources</span>
                <svg className="w-5 h-5 text-slate-400 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </summary>
              <div className="px-6 pb-6">
                <AuthoritySidebar county={county} />
              </div>
            </details>
            <AuthorBox />
          </div>
        </div>

        {/* --- INTERNAL LINKING MATRIX --- */}
        <div className="border-t border-slate-200 pt-20 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            {internalLinks.map((link, idx) => (
              <Link key={idx} href={link.href} className="group p-6 bg-white border border-slate-100 rounded-3xl hover:border-indigo-600 transition-all shadow-sm">
                <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">Resource</p>
                <h4 className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                  {link.label} <ArrowRight className="w-4 h-4" />
                </h4>
              </Link>
            ))}
          </div>

          <h2 className="text-2xl font-black text-slate-900 mb-12 text-center tracking-tight">Explore More Washington Calculations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Same County ±$1000 */}
            <div>
              <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-6">Nearby Income Tiers ({countyName})</h3>
              <div className="space-y-3">
                {[-1000, -500, +500, +1000].map(diff => {
                  const newInc = income + diff;
                  if (newInc <= 0) return null;
                  const pf = county?.slug ? `${county.slug}-income` : "income";
                  const nChildren = children === 1 ? '1-child' : `${children}-children`;
                  const formattedNewInc = formatter.format(newInc);
                  return (
                    <Link key={diff} href={`/${pf}-${newInc}-${nChildren}`} prefetch={false} className="block p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-600 transition-all text-center group">
                      <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                        Calculate {formattedNewInc} Support for {children} {children === 1 ? 'Child' : 'Children'}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Sibling Counties Same Income */}
            <div>
              <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-6">Compare Washington Counties</h3>
              <div className="space-y-3">
                {siblingCounties.map(c => {
                  const nChildren = children === 1 ? '1-child' : `${children}-children`;
                  return (
                    <Link key={c.slug} href={`/${c.slug}-income-${income}-${nChildren}`} prefetch={false} className="block p-4 bg-white border border-slate-100 rounded-2xl hover:border-indigo-600 transition-all text-center group">
                      <span className="font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
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
