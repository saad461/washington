import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import HomeCalculator from "@/components/HomeCalculator";
import CalculatorSchema from "@/components/CalculatorSchema";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "WCSSC — Washington Child Support Calculator 2026",
  description: "Washington's most accurate 2026 child support calculator. Instantly estimate monthly obligations for all 39 counties using the official AOC economic table. Free, fast, court-compliant.",
  alternates: { canonical: 'https://wcssc.site/' },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "WCSSC — Washington Child Support Schedule Center",
    "url": "https://wcssc.site",
    "description": "Washington's most accurate 2026 child support calculator."
  };

  const homeFaqs = [
    {
      question: "What is the minimum child support in Washington state?",
      answer: "The statutory minimum child support in Washington is $50 per child per month. Judges may deviate below this amount in extraordinary circumstances only, to ensure the paying parent’s self-support reserve is protected."
    },
    {
      question: "How is Washington child support calculated in 2026?",
      answer: "Washington uses an Income Shares Model. Both parents' net incomes are calculated and combined. The total presumptive support obligation is derived from the state's 2026 economic table and then split proportionally between the parents based on their percentage of the combined income."
    },
    {
      question: "What is the Self-Support Reserve (SSR) for 2026?",
      answer: "The 2026 Self-Support Reserve (SSR) is $1,514 per month. This low-income protection ensures that a paying parent is not left with less than $1,514 to live on after making a basic child support payment."
    },
    {
      question: "Does child support cover extraordinary expenses like daycare?",
      answer: "No, the basic child support obligation covers only food, shelter, and basic clothing. Extraordinary expenses, such as work-related daycare, health insurance premiums, and approved educational costs, are apportioned separately based on the parents' proportional share of income."
    }
  ];

  return (
    <div className="flex-1 flex flex-col items-center px-4 py-12 md:py-20 sm:px-6 lg:px-8 bg-white relative overflow-hidden w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalculatorSchema url="https://wcssc.site" />

      {/* Decorative blurred backgrounds */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center overflow-hidden z-0" aria-hidden="true">
        <div className="w-[30rem] h-[30rem] bg-indigo-100 rounded-full blur-[80px] opacity-40 absolute top-[-10%] translate-x-[-30%]" />
        <div className="w-[30rem] h-[30rem] bg-blue-100 rounded-full blur-[80px] opacity-40 absolute bottom-[0%] translate-x-[30%]" />
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center">
        <div className="text-center mb-16 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6 leading-tight font-heading px-2">
            Washington Child Support Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Estimate child support payments based on combined monthly income, number of children, and official 2026 Washington State guidelines.
          </p>
        </div>

        <HomeCalculator />

        {/* ── KEY FIGURES STRIP (SEO & Trust) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 mt-12 w-full shadow-sm">
          {[
            { label: "2026 SSR", value: "$1,514" },
            { label: "Min Support", value: "$50 / child" },
            { label: "Table Limit", value: "$50,000" },
            { label: "State Law", value: "Washington" },
          ].map((fig, i) => (
            <div key={i} className="text-center">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">{fig.label}</div>
              <div className="text-lg md:text-xl font-bold text-gray-900">{fig.value}</div>
            </div>
          ))}
        </div>

        {/* ── BENCHMARK DATA TABLE (AI SEO) ── */}
        <div className="mt-20 w-full" id="benchmark-table">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center tracking-tight font-heading">Washington Child Support Benchmark Estimates</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <caption className="sr-only">Benchmark Child Support Estimates for Washington State 2026</caption>
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">Monthly Income</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">1 Child</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">2 Children</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { income: "$3,000", one: "$400–$600", two: "$700–$900" },
                  { income: "$5,000", one: "$700–$900", two: "$1,000–$1,300" },
                  { income: "$8,000", one: "$1,100–$1,400", two: "$1,400–$1,800" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-700">{row.income}</td>
                    <td className="px-6 py-4 text-sm text-indigo-600 font-bold">{row.one}</td>
                    <td className="px-6 py-4 text-sm text-indigo-600 font-bold">{row.two}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── TRUST TEXT (EEAT BOOST) ── */}
        <div className="mt-8 text-center max-w-2xl">
          <p className="text-sm text-gray-500 leading-relaxed italic">
            &quot;These estimates are based on the 2026 Washington State child support guidelines. Actual support amounts may vary depending on custody arrangements, healthcare costs, and judicial decisions.&quot;
          </p>
        </div>

        {/* ── CTA SECTION (CONVERSION) ── */}
        <div className="mt-12 flex justify-center w-full">
          <Link 
            href="/worksheet" 
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-100 transition-all hover:-translate-y-1 active:translate-y-0"
          >
            Calculate Exact Support
            <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* ── AI SEARCH OPTIMIZATION (AEO) ── */}
      <section className="mt-28 max-w-4xl w-full mx-auto px-4 relative z-10 font-sans">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight text-center font-heading">Example Calculation</h2>
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 md:p-10 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-8 font-heading text-center">How much is child support for $5,000 income?</h3>

          <div className="mb-8">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4 text-center">Scenario</div>
            <div className="grid grid-cols-3 gap-1 md:gap-4 bg-white border border-gray-100 rounded-xl p-3 md:p-6 shadow-sm">
              {[
                { label: "Monthly Income", value: "$5,000" },
                { label: "Children", value: "2" },
                { label: "County", value: "King" },
              ].map((item, i) => (
                <div key={i} className="text-center flex flex-col justify-center">
                  <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-gray-500 mb-1 leading-tight">{item.label}</div>
                  <div className="text-sm md:text-lg font-bold text-gray-900">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-600 rounded-xl p-6 text-center mb-8 shadow-md shadow-indigo-100">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-200 mb-1">Estimated Basic Support</div>
            <div className="text-3xl font-bold text-white tracking-tight">$1,155<span className="text-sm font-medium text-indigo-200 ml-1">/ mo</span></div>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm text-center max-w-2xl mx-auto">
            In King County, courts apply the standard Washington economic schedule. For a combined net income of $5,000 with 2 children, the base presumptive support is $1,155. This amount is typically shared between parents based on their proportional income share.
          </p>
        </div>
      </section>

      {/* ── EDUCATIONAL CONTENT (AdSense compliance: 350+ words) ── */}
      <section className="mt-20 max-w-4xl w-full mx-auto px-4 pb-24 relative z-10 font-sans">

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 tracking-tight text-center font-heading">
          How Washington Child Support Is Calculated
        </h2>

        <div className="text-gray-700 leading-relaxed space-y-8 text-base md:text-lg">
          <p>
            Washington State uses the <strong className="text-gray-900">Income Shares Model</strong>, where both parents&apos; monthly net incomes are combined. A proportional share is dedicated to the children, reflecting what would have been spent if the household remained together.
          </p>
          
          <div className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">The 2026 Economic Schedule</h3>
            <p className="mb-4">
              The 2026 economic tables, published by the <strong className="text-gray-900">Administrative Office of the Courts (AOC)</strong>, cover combined monthly net incomes from $0 to $12,000. For incomes above $12,000, family court judges exercise extrapolative discretion to determine the final amount.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>Statutory minimum: $50 per child per month.</li>
              <li>Calculations cover all 39 Washington counties.</li>
              <li>Data is updated for 2026 economic standards.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 font-heading">The Self-Support Reserve (SSR)</h3>
            <p>
              Washington&apos;s primary low-income protection is the <strong className="text-gray-900">Self-Support Reserve (SSR)</strong>, which is set at <strong className="text-gray-900">$1,514 per month for 2026</strong>. If a payment would leave the paying parent with less than $1,514 to live on, the court can deviate the basic transfer payment downward.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 font-heading">What the Basic Obligation Covers</h3>
            <p>
              The transfer payment covers <strong className="text-gray-900">food, basic clothing, and housing</strong>. Extraordinary expenses are calculated separately and split proportionally:
            </p>
            <ul className="list-disc pl-6 space-y-3 font-medium">
              <li>Work-related daycare and childcare</li>
              <li>Health insurance premiums and medical costs</li>
              <li>Approved educational and extracurricular expenses</li>
              <li>Long-distance transportation for visitation</li>
            </ul>
          </div>

          <p className="bg-indigo-50 p-4 rounded-xl text-sm border border-indigo-100 text-indigo-900 font-medium">
            <strong>Net Income Cap:</strong> Total support obligations (including extraordinary expenses) typically cannot legally exceed 45% of a parent&apos;s monthly net income without explicit judicial approval for good cause.
          </p>
        </div>


        {/* ── HOME FAQS ── */}
        <div className="mt-20 w-full">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 tracking-tight text-center font-heading">Frequently Asked Questions</h3>
          <FAQAccordion items={homeFaqs} />
        </div>

        {/* County quicklinks */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'King County', href: '/king-county-income-5000-2-children' },
            { label: 'Pierce County', href: '/pierce-county-income-5000-2-children' },
            { label: 'Snohomish County', href: '/snohomish-county-income-5000-2-children' },
            { label: 'Spokane County', href: '/spokane-county-income-5000-2-children' },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="block p-5 bg-white border border-gray-100 rounded-xl hover:border-indigo-200 hover:bg-gray-50 transition-all text-center shadow-sm group">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] block mb-2">County Guide</span>
              <span className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors leading-tight">{c.label}</span>
            </Link>
          ))}
        </div>

        {/* Blog quicklinks */}
        <div className="mt-16 border-t border-gray-100 pt-16">
          <h3 className="text-xl font-bold text-gray-900 mb-8 tracking-tight font-heading">Latest Legal Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: '2026 WA Guidelines: Complete Handbook', href: '/blog/washington-child-support-guidelines-2026', cat: 'Legal' },
              { label: 'Self-Support Reserve (SSR) Explained', href: '/blog/washington-ssr-self-support-reserve-explained', cat: 'Analysis' },
              { label: 'King County Child Support Rules', href: '/blog/king-county-child-support-rules', cat: 'Local Rules' },
            ].map((p) => (
              <Link key={p.href} href={p.href} className="block p-6 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 hover:bg-gray-50 transition-all shadow-sm group">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] block mb-3">{p.cat}</span>
                <span className="text-sm font-bold text-gray-800 group-hover:text-indigo-700 transition-colors leading-snug">{p.label}</span>
              </Link>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
