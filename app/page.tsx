import { Metadata } from "next";
import Link from "next/link";
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
    <div className="flex-1 flex flex-col items-center px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalculatorSchema url="https://wcssc.site" />

      {/* Decorative blurred backgrounds */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center overflow-hidden z-0" aria-hidden="true">
        <div className="w-[30rem] h-[30rem] bg-indigo-100 rounded-full blur-[80px] opacity-40 absolute top-[-10%] translate-x-[-30%]" />
        <div className="w-[30rem] h-[30rem] bg-blue-100 rounded-full blur-[80px] opacity-40 absolute bottom-[0%] translate-x-[30%]" />
      </div>

      {/* Calculator hero */}
      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col items-center">
        <div className="text-center mb-12 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-indigo-950 to-indigo-900 mb-6 leading-tight drop-shadow-sm px-2">
            Washington Child Support Calculator
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
            Estimate child support payments based on combined income, number of children, and Washington State guidelines.
          </p>
        </div>

        <HomeCalculator />

        {/* ── KEY FIGURES STRIP (SEO & Trust) ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gradient-to-br from-white to-slate-50 border border-slate-200/60 rounded-3xl p-6 md:p-8 mt-12 w-full shadow-sm hover:shadow-md transition-shadow">
          {[
            { label: "2026 SSR", value: "$1,514" },
            { label: "Min Support", value: "$50 / child" },
            { label: "Table Limit", value: "$50,000" },
            { label: "State Law", value: "Washington" },
          ].map((fig, i) => (
            <div key={i} className="text-center">
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-1">{fig.label}</div>
              <div className="text-lg md:text-xl font-black text-slate-800">{fig.value}</div>
            </div>
          ))}
        </div>

        {/* ── BENCHMARK DATA TABLE (AI SEO) ── */}
        <div className="mt-16 w-full" id="benchmark-table">
          <h2 className="text-xl font-black text-slate-900 mb-6 text-center tracking-tight">Washington Child Support Benchmark Estimates</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm bg-white">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">Monthly Income</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">1 Child</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-widest">2 Children</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { income: "$3,000", one: "$400–$600", two: "$700–$900" },
                  { income: "$5,000", one: "$700–$900", two: "$1,000–$1,300" },
                  { income: "$8,000", one: "$1,100–$1,400", two: "$1,400–$1,800" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4 text-base font-bold text-slate-700">{row.income}</td>
                    <td className="px-6 py-4 text-base text-indigo-600 font-bold">{row.one}</td>
                    <td className="px-6 py-4 text-base text-indigo-600 font-bold">{row.two}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── TRUST TEXT (EEAT BOOST) ── */}
        <div className="mt-8 text-center max-w-2xl">
          <p className="text-sm text-slate-600 leading-relaxed italic">
            &quot;These estimates are based on Washington State child support guidelines (2026). Actual support amounts may vary depending on custody arrangements, healthcare costs, and court decisions. Use the calculator above for an accurate estimate.&quot;
          </p>
        </div>

        {/* ── CTA SECTION (CONVERSION) ── */}
        <div className="mt-12 flex justify-center w-full">
          <Link 
            href="/worksheet" 
            className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-black text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 rounded-full shadow-xl shadow-indigo-600/20 transition-all hover:-translate-y-1 active:translate-y-0"
          >
            Calculate Your Exact Support
            <svg 
              className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── AI SEARCH OPTIMIZATION (AEO) ── */}
      <section className="mt-20 max-w-4xl w-full mx-auto px-4 relative z-10">
        <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight text-center">Example Calculation</h2>
        <div className="bg-gradient-to-br from-indigo-50/50 to-white border border-indigo-100/80 rounded-[2rem] p-8 mt-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Calculate child support for $5000 income in King County</h3>
          <p className="mb-2 text-slate-700"><strong>Input:</strong> Combined Monthly Net Income: $5,000 | Children: 2 | County: King County</p>
          <p className="mb-4 text-slate-700"><strong>Output:</strong> Estimated Monthly Basic Support Obligation: $1,155</p>
          <p className="text-slate-600 leading-relaxed text-sm">
            <strong>Short explanation:</strong> In King County, courts use the standard Washington State economic table. For a combined net income of $5,000 with 2 children, the base presumptive support is $1,155. This amount may be split proportionally between parents based on their respective incomes, and may not include extraordinary expenses like healthcare or daycare.
          </p>
        </div>
      </section>
      {/* ── EDUCATIONAL CONTENT (AdSense compliance: 350+ words) ── */}
      <section className="mt-16 max-w-4xl w-full mx-auto px-4 pb-24 relative z-10">

        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight text-center">
          How Washington Child Support Is Calculated
        </h2>

        <div className="text-slate-600 leading-relaxed space-y-4 text-base md:text-lg">
          <p>
            Washington State uses the <strong className="text-slate-800">Income Shares Model</strong> — both parents&apos; monthly net incomes are combined into a single pool, and a proportional share of that pool is dedicated to the children, mirroring what the family would have spent had they remained together.
          </p>
          <p>
            The 2026 economic tables, published by the <strong className="text-slate-800">Administrative Office of the Courts (AOC)</strong>, cover combined monthly net incomes from $0 through $12,000. Above $12,000, family court judges exercise &quot;extrapolative discretion&quot; to determine the final amount. Our calculator provides institutional-grade accuracy for all 39 Washington counties.
          </p>

          <h3 className="text-xl font-black text-slate-900 mt-8 mb-2">The Self-Support Reserve (SSR)</h3>
          <p>
            Washington&apos;s most important low-income protection is the <strong className="text-slate-800">Self-Support Reserve (SSR)</strong>, set at <strong className="text-slate-800">$1,514 per month in 2026</strong>. If the calculated support order would leave the paying parent with less than $1,514 after the payment, the court must deviate downward — often to the statutory minimum of <strong className="text-slate-800">$50 per child per month</strong>.
          </p>

          <h3 className="text-xl font-black text-slate-900 mt-8 mb-2">What the Basic Obligation Covers</h3>
          <p>
            The base transfer payment covers <strong className="text-slate-800">food, basic clothing, and shelter only</strong>. Extraordinary expenses — work-related daycare, health insurance premiums, extracurricular activities, and long-distance transportation — are calculated separately and split proportionally between both parents based on each parent&apos;s income share.
          </p>
          <p>
            Washington also enforces a <strong className="text-slate-800">45% net income cap</strong>: the total child support obligation, including base payments and extraordinary expenses, cannot legally exceed 45% of the paying parent&apos;s monthly net income without explicit court approval for &quot;good cause.&quot;
          </p>

          <h3 className="text-xl font-black text-slate-900 mt-8 mb-2">Judicial Deviations</h3>
          <p>
            While the AOC economic tables provide the presumptive amount, judges can grant a <strong className="text-slate-800">Deviation</strong> upward or downward based on documented &quot;good cause&quot; — including 50/50 shared residential schedules, significant wealth disparities, or obligations to biological children from other relationships.
          </p>
        </div>

        {/* ── HOME FAQS ── */}
        <div className="mt-12 w-full">
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 tracking-tight text-center">Frequently Asked Questions</h3>
          <FAQAccordion items={homeFaqs} />
        </div>

        {/* County quicklinks */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'King County', href: '/king-county-income-5000-2-children' },
            { label: 'Pierce County', href: '/pierce-county-income-5000-2-children' },
            { label: 'Snohomish County', href: '/snohomish-county-income-5000-2-children' },
            { label: 'Spokane County', href: '/spokane-county-income-5000-2-children' },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="block p-4 bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-300 hover:from-white hover:to-indigo-50 transition-all duration-300 text-center shadow-sm hover:shadow-md hover:-translate-y-1 group">
              <span className="text-xs font-black text-indigo-600 uppercase tracking-widest block mb-1">County Guide</span>
              <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{c.label}</span>
            </Link>
          ))}
        </div>

        {/* Blog quicklinks */}
        <div className="mt-10">
          <h3 className="text-lg font-black text-slate-900 mb-6 tracking-tight">Latest Legal Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { label: '2026 WA Guidelines: Complete Handbook', href: '/blog/washington-child-support-guidelines-2026', cat: 'Legal' },
              { label: 'Self-Support Reserve (SSR) Explained', href: '/blog/washington-ssr-self-support-reserve-explained', cat: 'Deep-Dive' },
              { label: 'King County Child Support Rules', href: '/blog/king-county-child-support-rules', cat: 'County Guide' },
            ].map((p) => (
              <Link key={p.href} href={p.href} className="block p-6 bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-2xl hover:border-indigo-300 hover:from-white hover:to-indigo-50 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 group">
                <span className="text-[11px] font-black text-indigo-600 uppercase tracking-widest block mb-2">{p.cat}</span>
                <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors leading-snug">{p.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
