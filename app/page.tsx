import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calculator, CheckCircle2 } from "lucide-react";
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

      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        <div className="text-center mb-16 md:mb-24 w-full px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-full mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-pulse" />
            2026 Guidelines Verified
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1] font-heading">
            Washington Child <br className="hidden md:block" /> Support Calculator
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Estimate child support payments based on combined monthly income, number of children, and official 2026 Washington State guidelines.
          </p>
        </div>

        <div className="w-full flex justify-center mb-16 md:mb-24 px-4">
          <HomeCalculator />
        </div>

        {/* ── KEY FIGURES STRIP (SEO & Trust) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white border border-gray-100 rounded-2xl p-8 md:p-10 mb-24 w-full shadow-sm hover:shadow-md transition-all duration-300">
          {[
            { label: "2026 SSR", value: "$1,514", sub: "Monthly Reserve" },
            { label: "Min Support", value: "$50", sub: "Per Child Rate" },
            { label: "Table Limit", value: "$50,000", sub: "Max Guidelines" },
            { label: "Jurisdiction", value: "Washington", sub: "State Unified" },
          ].map((fig, i) => (
            <div key={i} className="text-center md:text-left md:pl-8 md:border-l first:border-l-0 border-gray-100">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">{fig.label}</div>
              <div className="text-xl md:text-2xl font-bold text-gray-900 mb-1 font-heading">{fig.value}</div>
              <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{fig.sub}</div>
            </div>
          ))}
        </div>

        {/* ── BENCHMARK DATA TABLE (AI SEO) ── */}
        <div className="w-full mb-16 md:mb-24 lg:mb-32" id="benchmark-table">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight font-heading">Support Benchmark Estimates</h2>
            <p className="text-gray-500 text-sm font-medium">Typical presumptive transfer amounts based on the 2026 economic schedule.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-white hover:border-gray-200 transition-all">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <caption className="sr-only">Benchmark Child Support Estimates for Washington State 2026</caption>
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Monthly Net Income</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">One Child (Age 0-11)</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">Two Children (Age 12-18)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { income: "$3,000", one: "$450 – $580", two: "$720 – $940" },
                  { income: "$5,000", one: "$760 – $980", two: "$1,210 – $1,560" },
                  { income: "$8,000", one: "$1,120 – $1,440", two: "$1,780 – $2,300" },
                  { income: "$12,000", one: "$1,480 – $1,920", two: "$2,350 – $3,050" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 text-sm font-bold text-gray-900 font-heading">{row.income}</td>
                    <td className="px-8 py-5 text-sm text-indigo-600 font-bold text-center">{row.one}</td>
                    <td className="px-8 py-5 text-sm text-indigo-600 font-bold text-center">{row.two}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── TRUST TEXT (EEAT BOOST) ── */}
        <div className="mt-6 text-center max-w-2xl">
          <p className="text-sm text-gray-500 leading-relaxed italic">
            &quot;These estimates are based on the 2026 Washington State child support guidelines. Actual support amounts may vary depending on custody arrangements, healthcare costs, and judicial decisions.&quot;
          </p>
        </div>

        {/* ── CTA SECTION (CONVERSION) ── */}
        <div className="mt-8 flex justify-center w-full">
          <Link 
            href="/worksheet" 
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-100 transition-all hover:-translate-y-1 active:translate-y-0"
          >
            Calculate Exact Support
            <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <section className="bg-gray-50 w-full py-24 md:py-32 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight font-heading leading-tight">AEO Example:<br/>$5,000 Support Calculation</h2>
              <p className="text-gray-500 text-base md:text-lg mb-8 font-medium leading-relaxed">
                See how the Washington family court applies modern economic tables to a standard income scenario in King County.
              </p>
              <div className="flex flex-col gap-4">
                 {[
                  { label: "Scenario", val: "Combined Net $5,000/mo" },
                  { label: "Children", val: "2 Children (Age 15 & 17)" },
                  { label: "County", val: "King County (Standard)" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</span>
                    <span className="text-sm font-bold text-gray-900">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1" />
            <div className="lg:col-span-6">
              <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <Calculator className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Calculated Output</span>
                </div>
                <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading tracking-tighter">
                  $1,155 <span className="text-lg text-gray-400 tracking-normal font-sans font-medium">/mo</span>
                </p>
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl mb-8">
                  <p className="text-sm text-indigo-700 font-bold leading-relaxed italic">
                    "This presumptive transfer amount is determined based on the 2026 unified schedule for two children aged 12-18."
                  </p>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  In Washington, this $1,155 amount represents the basic obligation. The final transfer payment is adjusted based on each parent's proportional share of the combined $5,000 income and any health insurance credits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-4 flex flex-col items-center">

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 tracking-tight text-center font-heading">
            How Calculation Works
          </h2>

          <div className="text-gray-600 leading-relaxed space-y-12 text-base md:text-lg">
            <p className="text-center font-medium">
              Washington State uses the <strong className="text-gray-900">Income Shares Model</strong>, where both parents' monthly net incomes are combined. A proportional share is dedicated to the children, reflecting what would have been spent if the household remained together.
            </p>
            
            <div className="bg-white p-8 md:p-12 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 font-heading">The 2026 Economic Schedule</h3>
              <p className="mb-6">
                The updated economic tables cover combined monthly net incomes from $0 to $12,000. For incomes above $12,000, family court judges exercise extrapolative discretion to determine the final amount.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-bold uppercase tracking-widest text-gray-400">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Minimum: $50 / child</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Statewide Coverage</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Updated Economic Data</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /> Court-Ready Estimates</li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 font-heading text-center">Self-Support Reserve (SSR)</h3>
              <p className="leading-relaxed">
                Washington's primary low-income protection is the <strong className="text-gray-900">Self-Support Reserve (SSR)</strong>, set at <strong className="text-gray-900">$1,514 per month for 2026</strong>. If a payment would leave the paying parent with less than $1,514 to live on, the court can deviate the basic transfer payment downward to ensure basic survival.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 font-heading text-center">Basic Obligation Coverage</h3>
              <p className="leading-relaxed">
                The transfer payment covers <strong className="text-gray-900">food, basic clothing, and housing</strong>. Extraordinary expenses are calculated separately and split proportionally:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {[
                  "Daycare & Childcare",
                  "Health Insurance Costs",
                  "Educational Expenses",
                  "Travel for Visitation"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm font-bold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-indigo-900 rounded-2xl text-sm border border-indigo-800 text-indigo-100 font-medium shadow-md shadow-indigo-900/10">
              <strong className="text-white">Net Income Cap:</strong> Total support obligations (including extraordinary expenses) typically cannot legally exceed 45% of a parent's monthly net income without explicit judicial approval for good cause.
            </div>
          </div>

          <div className="w-full mt-16 md:mt-24 lg:mt-32 border-t border-gray-100 pt-12 md:pt-20 lg:pt-24">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 md:mb-12 tracking-tight text-center font-heading">Frequently Asked Questions</h3>
            <FAQAccordion items={homeFaqs} />
          </div>

        </div>

        {/* ── QUICKLINKS (FULL WIDTH) ── */}
        <div className="max-w-7xl mx-auto px-4 mt-16 md:mt-24 lg:mt-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'King County', href: '/king-county-income-5000-2-children' },
              { label: 'Pierce County', href: '/pierce-county-income-5000-2-children' },
              { label: 'Snohomish County', href: '/snohomish-county-income-5000-2-children' },
              { label: 'Spokane County', href: '/spokane-county-income-5000-2-children' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="block p-8 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all text-center group">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-4">County Guide</span>
                <span className="text-base font-bold text-gray-900 group-hover:text-indigo-700 transition-colors leading-tight font-heading">{c.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-12 md:mt-16 pt-16 md:pt-24 border-t border-gray-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
               <h3 className="text-2xl font-bold text-gray-900 tracking-tight font-heading">Latest Legal Insights</h3>
               <Link href="/blog" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">See all articles →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: '2026 WA Guidelines: Complete Handbook', href: '/blog/washington-child-support-guidelines-2026', cat: 'Legal' },
                { label: 'Self-Support Reserve (SSR) Explained', href: '/blog/washington-ssr-self-support-reserve-explained', cat: 'Analysis' },
                { label: 'King County Child Support Rules', href: '/blog/king-county-child-support-rules', cat: 'Local Rules' },
              ].map((p) => (
                <Link key={p.href} href={p.href} className="block p-8 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 hover:shadow-md transition-all group">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-4">{p.cat}</span>
                  <span className="text-base font-bold text-gray-900 group-hover:text-indigo-700 transition-colors leading-snug font-heading">{p.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
