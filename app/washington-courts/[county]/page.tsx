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
    <main className="flex-1 w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [{ "@type": "GovernmentOffice", name: county.court, address: { "@type": "PostalAddress", streetAddress: county.courtAddress, addressRegion: "WA", addressCountry: "US" }, telephone: county.clerkPhone, url: county.website }] }) }} />
      <CalculatorSchema county={county.name} url={`https://wcssc.site/washington-courts/${county.slug}`} />

      <section className="bg-white border-b border-border-default">
        <div className="container section text-center">
          <nav className="flex items-center justify-center gap-4 mb-8 text-overline">
            <Link href="/" className="hover:text-brand transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 opacity-30" />
            <Link href="/washington-courts" className="hover:text-brand transition-colors">Courts</Link>
            <ChevronRight className="w-4 h-4 opacity-30" />
            <span className="text-text-primary">{county.name}</span>
          </nav>

          <h1 className="text-display mb-8 max-w-3xl mx-auto">
            Child Support – <span className="text-brand">{county.name}</span>, WA
          </h1>

          <p className="text-body-lg max-w-2xl mx-auto mb-12">
            Official 2026 estimates for {county.name} residents. Based on the Washington Income Shares Model with updated SSR of <strong>approximately $2,394</strong>.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {["SSR: ~$2,394", "2026 Guidelines", "All 39 Counties", "Min: $50/child"].map(tag => (
              <span key={tag} className="badge badge-neutral !px-6 !py-2">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-subtle border-b border-border-default">
        <div className="container section">
          <div className="text-center mb-16">
            <h2 className="text-h2 mb-6">Calculate {county.name} Support</h2>
            <p className="text-body">Enter both parents&apos; net incomes. Based on official RCW 26.19 tables.</p>
          </div>
          <HomeCalculator />
        </div>
      </section>

      <div className="container section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7 space-y-16">
            <article className="prose max-w-none">
              <h2 className="text-h2">Child Support in {county.name}</h2>
              {content.introduction.map((p, i) => <p key={i} className="text-body">{p}</p>)}
            </article>

            <section>
              <h2 className="text-h2 mb-12">Filing Process in {county.name}</h2>
              <div className="grid gap-8">
                {content.filingSteps.map((step, i) => (
                  <div key={i} className="flex gap-8 p-8 card hover:border-brand transition-all">
                    <div className="w-12 h-12 rounded-xl bg-brand text-white flex items-center justify-center font-bold shrink-0">{i + 1}</div>
                    <div>
                      <h4 className="text-h4 !mb-4">{step.step}</h4>
                      <p className="text-body text-sm mb-0">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="badge-warning !p-8 rounded-3xl block">
              <div className="flex items-center gap-4 mb-8">
                <Lightbulb className="w-8 h-8 text-warning" />
                <span className="text-overline !text-warning font-bold">Local Filing Insight</span>
              </div>
              <p className="text-warning text-lg font-medium italic mb-0">{content.localTip}</p>
            </section>

            <section>
              <h2 className="text-h2 mb-12">Common Questions</h2>
              <FAQAccordion items={faqs.map(f => ({ question: f.q, answer: f.a }))} />
            </section>
          </div>

          <aside className="lg:col-span-5 space-y-8">
            <div className="section-inverse p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden lg:sticky lg:top-24">
              <Building2 className="w-12 h-12 text-brand mb-12" />
              <h3 className="text-h3 !text-white mb-12">{county.court}</h3>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-brand shrink-0" />
                  <div>
                    <p className="text-overline !text-white/50 mb-2">Address</p>
                    <p className="text-sm font-medium !text-white mb-0 leading-relaxed">{county.courtAddress}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-brand shrink-0" />
                  <div>
                    <p className="text-overline !text-white/50 mb-2">Clerk Phone</p>
                    <p className="text-sm font-medium !text-white mb-0">{county.clerkPhone}</p>
                  </div>
                </div>
              </div>

              <div className="my-12 h-px bg-white/10" />

              <div className="space-y-4">
                <a href={county.website} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg !bg-white/10 !text-white !border-white/20 w-full">
                  Court Website <ExternalLink className="w-4 h-4" />
                </a>
                <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg w-full">
                  Get Directions <MapPin className="w-4 h-4" />
                </a>
              </div>

              <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10 flex gap-4">
                <Clock className="w-6 h-6 text-warning shrink-0" />
                <p className="text-xs text-white/50 mb-0">Call ahead to verify current clerk hours before visiting {county.seat}.</p>
              </div>
            </div>

            <div className="card !p-8 md:!p-12">
              <h4 className="text-overline mb-8 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Resources</h4>
              <nav className="grid gap-6">
                {[{ href: "/worksheet", label: "2026 Worksheet Wizard" }, { href: "/how-to-file-child-support-washington", label: "Filing Guide" }, { href: "/washington-courts", label: "All WA Courthouses" }].map(link => (
                  <Link key={link.href} href={link.href} className="flex items-center justify-between group py-4 border-b border-border-default last:border-0 hover:text-brand transition-colors">
                    <span className="text-body font-bold">{link.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>

      <footer className="section-subtle border-t border-border-default py-16">
        <div className="container-reading">
          <div className="flex gap-6 p-8 card !bg-white">
            <AlertTriangle className="w-8 h-8 text-text-muted shrink-0" />
            <p className="text-xs text-text-muted leading-relaxed uppercase tracking-widest font-bold mb-0">
              <strong>Legal Disclaimer:</strong> Information for {county.name} is for educational use. The 2026 SSR is approximately $2,394. WCSSC is not a law firm. Consult a family law attorney for advice specific to your case.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
