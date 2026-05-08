import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  washingtonCounties,
  WashingtonCounty,
  LAST_REVIEWED_DATE,
} from "@/data/washingtonCounties";
import { getCountyPageMeta } from "@/utils/seo";
import {
  HomeCalculatorClient as HomeCalculator,
  CountySidebarClient as CountySidebar
} from "@/components/ClientDynamic";
import {
  Building2,
  ChevronRight,
  Phone,
  MapPin,
  ExternalLink,
  Lightbulb,
  AlertTriangle,
  Clock,
  BookOpen,
  ArrowLeft,
  Scale
} from "lucide-react";
import CalculatorSchema from "@/components/CalculatorSchema";
import ErrorBoundary from "@/components/ErrorBoundary";
import FAQAccordion from "@/components/FAQAccordion";
import { cleanEmDashContent } from "@/lib/textOptimizer";
import RelatedCalculations from "@/components/RelatedCalculations";
import {
  getWebPageSchema,
  getBreadcrumbSchema,
  getCourthouseSchema
} from "@/utils/jsonld";

type Props = { params: Promise<{ county: string }> };

export const dynamicParams = true;
export const revalidate = 2592000;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { county: slug } = await params;
  const county = washingtonCounties.find((c) => c.slug === slug);
  if (!county) return {};

  const baseMeta = getCountyPageMeta({ county });

  return {
    ...baseMeta,
    title: { absolute: `${county.name} Child Support Guide 2026 | Court Info | WSCSS` },
    alternates: {
      canonical: `https://wscss.site/washington-courts/${county.slug}`,
    },
  };
}

function generateCountyContent(county: WashingtonCounty) {
  const isLargeUrban = ["king-county", "pierce-county", "snohomish-county", "spokane-county"].includes(county.slug);
  const isRemote = ["ferry-county", "garfield-county", "wahkiakum-county", "pend-oreille-county", "douglas-county"].includes(county.slug);
  const isIsland = ["island-county", "san-juan-county"].includes(county.slug);
  const isBorderCounty = ["asotin-county", "walla-walla-county"].includes(county.slug);
  const isStateCapital = county.slug === "thurston-county";
  const isBilingual = county.slug === "yakima-county";

  const contextPhrase = isLargeUrban
    ? `As one of Washington's most populous counties, ${county.name} sees a disproportionately high volume of family law filings each year`
    : isRemote
      ? `Though ${county.name} is one of Washington's more rural and geographically vast counties, its residents have equal access to state-mandated child support protections`
      : isIsland
        ? `The unique geographical nature of ${county.name} — accessible by ferry from the mainland — adds an additional logistical consideration`
        : isBorderCounty
          ? `${county.name} sits near the Oregon border, and many families navigating child support here have cross-jurisdictional concerns`
          : isStateCapital
            ? `As the seat of Washington State government in Olympia, ${county.name} is uniquely positioned where the laws governing child support are written`
            : isBilingual
              ? `${county.name} has a large Spanish-speaking population, and the local court system proactively provides bilingual facilitator support`
              : `${county.name} is one of the 39 Washington counties whose residents rely on the Washington State Child Support Schedule (WSCSS)`;

  const introduction = [
    `Understanding child support in ${county.name}, Washington requires navigating both uniform state law and specific local court procedures. ${contextPhrase}. Under Washington's Revised Code (RCW 26.19), child support obligations are calculated using an Income Shares Model — a methodology designed to ensure that children receive a level of financial support proportionate to what they would have enjoyed if their parents had remained together.`,
    `In 2026, the Washington State Administrative Office of the Courts (AOC) updated the mandatory child support economic tables that all ${county.name} courts must use. These tables cap at a combined monthly net income of $50,000 and set a firm Self-Support Reserve (SSR) of approximately $2,394 per month — a critical poverty-protection threshold that prevents courts from issuing orders that would impoverish the paying parent.`,
  ];

  const howItWorks = [
    `Washington's Income Shares Model starts with a simple but powerful premise: both parents are financially responsible for their children. The court determines each parent's monthly net income (gross income minus mandatory deductions like income taxes, Social Security, and state-mandated insurance premiums). These two incomes are added together to form the Combined Monthly Net Income (CMNI).`,
    `Next, the court looks up the applicable basic support obligation from the Washington 2026 economic table based on the CMNI and the number of children. For example, two parents earning a combined $8,000 per month with 2 children would have a presumptive basic support obligation of around $1,883 per month.`,
  ];

  const filingSteps = [
    { step: "Calculate Your Estimate", detail: `Use the free calculator on this page to determine your presumptive 2026 amount based on both parents' net incomes and number of children.` },
    { step: "Complete the Worksheet", detail: `Fill out the official FL All Family 130 (Child Support Worksheet). Our Pro Wizard generates a print-ready version automatically.` },
    { step: "File Your Financial Declaration", detail: `Complete FL All Family 131 under oath. Attach 2 years of tax returns and 6 months of recent pay stubs as sealed exhibits.` },
    { step: `File at ${county.court}`, detail: `Submit your packet to the clerk at ${county.courtAddress}. Pay the filing fee of ${county.filingFee} or request a fee waiver.` },
    { step: "Serve the Other Parent", detail: `Have a neutral third party (over 18) serve the filed documents. File the Proof of Service with the clerk.` },
    { step: "Attend Your Hearing", detail: `Review the local calendar for ${county.name}. Arrive early and bring copies of everything for the judge.` },
  ];

  return {
    introduction: introduction.map(cleanEmDashContent),
    howItWorks: howItWorks.map(cleanEmDashContent),
    filingSteps: filingSteps.map(s => ({ ...s, detail: cleanEmDashContent(s.detail) })),
    localTip: cleanEmDashContent(county.localTip),
  };
}

export default async function CountyCourtPage({ params }: Props) {
  const { county: slug } = await params;
  const county = washingtonCounties.find((c) => c.slug === slug);
  if (!county) notFound();

  const content = generateCountyContent(county);

  return (
    <div className="flex-1 bg-white">
      <CalculatorSchema county={county.name} url={`https://wscss.site/washington-courts/${county.slug}`} />

      {/* 1. MINI HERO */}
      <section className="bg-white py-12 md:py-16 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-wide relative z-10">
          <nav className="breadcrumbs-container mb-8">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link href="/washington-courts" className="breadcrumb-link">Washington</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{county.name}</span>
          </nav>

          <div className="flex flex-col gap-6">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              County Calculator & Guide
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Child Support – <span className="text-blue-600">{county.name}</span>, WA
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Official 2026 estimates for {county.name} residents. Based on the Washington Income Shares Model with updated SSR of <strong className="text-gray-900 font-bold">approximately $2,394</strong>.
            </p>
            <div className="flex flex-wrap gap-3 items-center">
              {["SSR: ~$2,394", "2026 Guidelines", "RCW 26.19 Compliant"].map(tag => (
                <span key={tag} className="badge-meta !px-4 !py-1.5 !rounded-lg !text-[11px] !font-bold !uppercase tracking-wider">{tag}</span>
              ))}
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-2">
                Last Reviewed: {LAST_REVIEWED_DATE}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CALCULATOR SECTION */}
      <section className="section-default bg-[var(--color-bg-subtle)] border-b border-[var(--color-bg-border)]">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 mx-auto">Washington State Compliant Engine</p>
            <h2 className="text-3xl font-bold mb-4">Calculate {county.name} Support</h2>
            <p className="text-[var(--color-text-secondary)] text-lg">Enter both parents&apos; net incomes below to get your 2026 estimate.</p>
          </div>
          <div className="flex flex-col items-center">
            <HomeCalculator />
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT GRID */}
      <section className="section-default bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7 space-y-16">
              {/* A. Intro */}
              <article className="prose prose-gray prose-lg max-w-none text-[var(--color-text-body)]">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[var(--color-text-primary)]">Child Support in {county.name}: A 2026 Guide</h2>
                {content.introduction.map((p, i) => <p key={i} className="leading-relaxed mb-6 text-lg">{p}</p>)}
              </article>

              {/* B. Filing Steps */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-[var(--color-text-primary)]">Filing Process in {county.name}</h2>
                <div className="grid gap-6">
                  {content.filingSteps.map((step, i) => (
                    <div key={i} className="flex gap-6 p-8 bg-white border border-[var(--color-bg-border)] rounded-2xl shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">{i + 1}</div>
                      <div>
                        <h4 className="font-bold text-[var(--color-text-primary)] mb-2">{step.step}</h4>
                        <p className="text-[var(--color-text-body)] text-base leading-relaxed">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* C. Local Insight */}
              <section className="p-8 md:p-10 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <Lightbulb className="w-8 h-8 text-amber-600" />
                  <span className="text-[12px] font-bold text-amber-900 uppercase tracking-widest">Local Filing Insight</span>
                </div>
                <p className="text-amber-900 text-lg font-medium leading-relaxed italic">&ldquo;{county.localNote}&rdquo;</p>
              </section>

              {/* D. FAQs */}
              <section>
                <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Common Parent Questions</p>
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-[var(--color-text-primary)]">Frequently Asked Questions About Washington Child Support</h2>
                <FAQAccordion faqs={county.faqs.map(f => ({ question: f.question, answer: f.answer }))} />
              </section>
            </div>

            {/* 4. SIDEBAR */}
            <aside className="lg:col-span-5 space-y-8">
              <div className="hidden lg:block">
                <ErrorBoundary fallback={<div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-500">Sidebar temporarily unavailable</div>}>
                  <CountySidebar
                    countyName={county.name}
                    countySlug={county.slug}
                    courthouseName={county.court}
                    courthouseAddress={county.courtAddress}
                    courthousePhone={county.clerkPhone}
                    courthousePrimarySeat={county.seat}
                    filingFee={county.filingFeeMax}
                    filingFeeIsRange={county.filingFeeIsRange}
                    courthouseUrl={county.courthouseUrl}
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
                        countyName={county.name}
                        countySlug={county.slug}
                        courthouseName={county.court}
                        courthouseAddress={county.courtAddress}
                        courthousePhone={county.clerkPhone}
                        courthousePrimarySeat={county.seat}
                        filingFee={county.filingFeeMax}
                        filingFeeIsRange={county.filingFeeIsRange}
                        courthouseUrl={county.courthouseUrl}
                      />
                    </ErrorBoundary>
                  </div>
                </details>
              </div>

              {/* Related Links - Keep as they were unique to this page or move inside sidebar?
                  Prompt says: "The main content area of county pages must be completely untouched in terms of content and structure."
                  It also says "replace the existing aside section on county pages with the new CountySidebar component" in my question response.
                  I'll keep them here for now or move them if they fit.
                  Actually, Section 3 of CountySidebar has official authorities.
                  The original county page had a 'Related Links' card.
                  I'll keep the related links below the new sidebar for parity with original structure if it doesn't conflict.
              */}
              <div className="card-standard">
                <p aria-hidden="true" className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-8 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Resources
                </p>
                <nav className="divide-y divide-[var(--color-bg-border-soft)]">
                  {[{ href: "/worksheet", label: `Calculate ${county.name} Support` }, { href: "/how-to-file-child-support-washington", label: "Filing Guide" }, { href: "/washington-courts", label: "All WA Courthouses" }].map(link => (
                    <Link key={link.href} href={link.href} className="flex items-center justify-between group py-5 hover:text-blue-600 transition-colors">
                      <span className="font-semibold text-[var(--color-text-body)] group-hover:text-blue-600 transition-colors">{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-all" />
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 5. RELATED CALCULATIONS */}
      <RelatedCalculations countySlug={county.slug} countyName={county.name} />

      {/* 6. FOOTER DISCLAIMER */}
      <section className="bg-[var(--color-bg-subtle)] border-t border-[var(--color-bg-border)] section-default">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
             <div className="p-8 bg-white border border-gray-200 rounded-3xl shadow-sm">
                <div className="flex gap-6">
                  <AlertTriangle className="w-8 h-8 text-gray-400 shrink-0" />
                  <div>
                    <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                      Legal Disclaimer
                    </p>
                    <p className="text-sm text-[var(--color-text-body)] leading-relaxed">
                      Information for <strong>{county.name}</strong> is for educational use. The 2026 SSR is approximately $2,394. WSCSS is not a law firm and does not provide legal representation. Consult a family law attorney for advice specific to your case.
                    </p>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebPageSchema({
          name: `Child Support in ${county.name}, WA – 2026 Guide & Calculator`,
          description: `Free 2026 child support calculator for ${county.name}, WA. Courthouse address, filing fee (${county.filingFee}), Self-Support Reserve ($2,394), and step-by-step filing guide. RCW 26.19 compliant.`,
          url: `https://wscss.site/washington-courts/${county.slug}`,
          dateModified: "2026-04-09"
        })) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([
          { name: "Home", url: "https://wscss.site" },
          { name: "Washington Courts", url: "https://wscss.site/washington-courts" },
          { name: county.name, url: `https://wscss.site/washington-courts/${county.slug}` }
        ])) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getCourthouseSchema({
          countyName: county.name,
          courthouseName: county.court,
          courthouseAddress: county.courtAddress,
          courthousePhone: county.clerkPhone,
          courthouseUrl: county.courthouseUrl
        })) }}
      />
    </div>
  );
}
