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
  AlertTriangle,
  Clock,
  BookOpen,
} from "lucide-react";
import CalculatorSchema from "@/components/CalculatorSchema";
import FAQAccordion from "@/components/FAQAccordion";
import { cleanEmDashContent } from "@/lib/textOptimizer";

type Props = { params: Promise<{ county: string }> };

export const dynamicParams = true;
export const revalidate = 2592000;

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
  const mapQuery = encodeURIComponent(county.courtAddress);

  const faqs = [
    { q: `Does living in ${county.name} affect my child support amount?`, a: `No. Child support is governed by uniform Washington State law (RCW 26.19). The presumptive amount in ${county.name} uses the exact same 2026 economic table as every other county.` },
    { q: "What is the minimum child support in Washington State?", a: `The presumptive minimum is $50 per child per month. In 2026, judges in ${county.name} may deviate below this only in extraordinary circumstances.` },
    { q: `Where do I file paperwork in ${county.name}?`, a: `You file with the Clerk of the ${county.court}, located at ${county.courtAddress}. The standard filing fee is ${county.filingFee}.` },
    { q: `What is the Self-Support Reserve (SSR) in 2026?`, a: `In 2026, the SSR is approximately $2,394 per month. A ${county.name} court cannot issue a child support order that leaves the paying parent with less than this amount.` },
  ];

  return (
    <main className="flex-1 bg-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "GovernmentOffice", name: county.court, address: { "@type": "PostalAddress", streetAddress: county.courtAddress, addressRegion: "WA", addressCountry: "US" }, telephone: county.clerkPhone, url: county.website }] }) }} />
      <CalculatorSchema county={county.name} url={`https://wcssc.site/washington-courts/${county.slug}`} />

      {/* 1. HERO */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-wide section-default text-center">
          <nav className="flex items-center justify-center gap-4 mb-8 label-metadata">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 opacity-30" />
            <Link href="/washington-courts" className="hover:text-indigo-600 transition-colors">Courts</Link>
            <ChevronRight className="w-4 h-4 opacity-30" />
            <span className="text-gray-900">{county.name}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 max-w-3xl mx-auto">
            Child Support Calculator – <span className="text-indigo-600">{county.name}</span>, WA (2026)
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-12">
            Official 2026 estimates for {county.name} residents. Based on the Washington Income Shares Model with updated SSR of <strong>approximately $2,394</strong>.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {["SSR: ~$2,394", "2026 Guidelines", "All 39 Counties", "Min: $50/child"].map(tag => (
              <span key={tag} className="px-6 py-2 bg-gray-50 border border-gray-100 rounded-full label-metadata text-gray-600">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CALCULATOR SECTION */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="container-wide section-default">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Calculate {county.name} Support</h2>
            <p className="text-gray-600">Enter both parents&apos; net incomes. Based on official RCW 26.19 tables.</p>
          </div>
          <div className="flex flex-col items-center">
            <HomeCalculator />
          </div>
          <p className="mt-12 text-center text-sm italic text-gray-500 max-w-lg mx-auto">
            Low-income protections may apply below approximately $2,394/month. Estimates are for educational purposes.
          </p>
        </div>
      </section>

      {/* 3. MAIN CONTENT GRID */}
      <div className="container-wide section-default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-16 md:space-y-24">
            {/* A. Intro */}
            <article className="prose prose-gray prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-8">Child Support in {county.name}: A 2026 Guide</h2>
              {content.introduction.map((p, i) => <p key={i} className="leading-relaxed mb-6">{p}</p>)}
            </article>

            {/* B. Filing Steps */}
            <section>
              <h2 className="text-3xl font-bold mb-12">Filing Process in {county.name}</h2>
              <div className="grid gap-8">
                {content.filingSteps.map((step, i) => (
                  <div key={i} className="flex gap-8 p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-indigo-200 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">{i + 1}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-4">{step.step}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* C. Local Insight */}
            <section className="p-8 bg-amber-50 border border-amber-200 rounded-3xl">
              <div className="flex items-center gap-4 mb-8">
                <Lightbulb className="w-8 h-8 text-amber-600" />
                <span className="label-metadata text-amber-800 font-bold">Local Filing Insight</span>
              </div>
              <p className="text-amber-900 text-lg leading-relaxed">{content.localTip}</p>
            </section>

            {/* D. FAQs */}
            <section>
              <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
              <FAQAccordion items={faqs.map(f => ({ question: f.q, answer: f.a }))} />
            </section>
          </div>

          {/* 4. SIDEBAR */}
          <aside className="lg:col-span-5 space-y-8">
            <div className="bg-gray-900 text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden lg:sticky lg:top-24">
              <Building2 className="w-12 h-12 text-indigo-400 mb-12" />
              <h3 className="text-2xl font-bold mb-12">{county.court}</h3>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-indigo-400 shrink-0" />
                  <div>
                    <p className="label-metadata text-gray-400 mb-2">Address</p>
                    <p className="text-sm font-medium leading-relaxed">{county.courtAddress}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-indigo-400 shrink-0" />
                  <div>
                    <p className="label-metadata text-gray-400 mb-2">Clerk Phone</p>
                    <p className="text-sm font-medium">{county.clerkPhone}</p>
                  </div>
                </div>
              </div>

              <div className="my-12 h-px bg-white/10" />

              <div className="space-y-4">
                <a href={county.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full h-14 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-all">
                  Court Website <ExternalLink className="w-4 h-4" />
                </a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full h-14 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20">
                  Get Directions <MapPin className="w-4 h-4" />
                </a>
              </div>

              <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10 flex gap-4">
                <Clock className="w-6 h-6 text-amber-400 shrink-0" />
                <p className="text-xs text-gray-400 leading-relaxed">Call ahead to verify current clerk hours before visiting {county.seat}.</p>
              </div>
            </div>

            {/* Related Links */}
            <div className="card-standard p-8 md:p-12">
              <h4 className="label-metadata text-gray-400 mb-8 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Resources</h4>
              <nav className="grid gap-6">
                {[{ href: "/worksheet", label: "2026 Worksheet Wizard" }, { href: "/how-to-file-child-support-washington", label: "Filing Guide" }, { href: "/washington-courts", label: "All WA Courthouses" }].map(link => (
                  <Link key={link.href} href={link.href} className="flex items-center justify-between group py-4 border-b border-gray-50 last:border-0 hover:text-indigo-600 transition-colors">
                    <span className="font-medium">{link.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>

      {/* 5. FOOTER DISCLAIMER */}
      <footer className="bg-gray-50 border-t border-gray-100 py-16 md:py-24">
        <div className="container-reading">
          <div className="flex gap-6 p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
            <AlertTriangle className="w-8 h-8 text-gray-400 shrink-0" />
            <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-widest font-semibold">
              <strong>Legal Disclaimer:</strong> Information for {county.name} is for educational use. The 2026 SSR is approximately $2,394. WCSSC is not a law firm. Consult a family law attorney for advice specific to your case.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
