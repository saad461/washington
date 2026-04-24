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
      answer: "The statutory minimum child support in Washington is statutory minimum. Judges may deviate below this amount in extraordinary circumstances only, to ensure the paying parent’s self-support reserve is protected."
    },
    {
      question: "How is Washington child support calculated in 2026?",
      answer: "Washington uses an Income Shares Model. Both parents' net incomes are calculated and combined. The total presumptive support obligation is derived from the state's 2026 economic table and then split proportionally between the parents based on their percentage of the combined income."
    },
    {
      question: "What is the Self-Support Reserve (SSR) for 2026?",
      answer: "The 2026 Self-Support Reserve (SSR) is approximately $2,394 per month. This low-income protection ensures that a paying parent is not left with less than approximately $2,394 to live on after making a basic child support payment."
    },
    {
      question: "Does child support cover extraordinary expenses like daycare?",
      answer: "No, the basic child support obligation covers only food, shelter, and basic clothing. Extraordinary expenses, such as work-related daycare, health insurance premiums, and approved educational costs, are apportioned separately based on the parents' proportional share of income."
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] relative overflow-hidden w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CalculatorSchema url="https://wcssc.site" />

      {/* Decorative blurred backgrounds */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center overflow-hidden z-0" aria-hidden="true">
        <div className="w-[40rem] h-[40rem] bg-indigo-100/50 rounded-full blur-[120px] absolute top-[-10%] left-[-10%]" />
        <div className="w-[40rem] h-[40rem] bg-purple-100/50 rounded-full blur-[120px] absolute bottom-[-10%] right-[-10%]" />
      </div>

      {/* ── HERO SECTION ── */}
      <section className="py-20 md:py-32 w-full relative z-10">
        <div className="container-wide">
          <div className="text-center mb-20 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-heading text-center tracking-tight leading-[1.1]">
              The Modern Standard for <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Washington Child Support</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto px-4">
              Precision-engineered for the 2026 AOC economic schedule. Fast, private, and 100% compliant with Washington State guidelines.
            </p>
          </div>
          <HomeCalculator />
        </div>
      </section>

      {/* ── KEY FIGURES STRIP ── */}
      <section className="section-default w-full bg-[#F1F5F9]/50 border-y border-gray-100 relative z-10">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[
              { label: "2026 SSR", value: "approximately $2,394" },
              { label: "Min Support", value: "$50 / child" },
              { label: "Table Limit", value: "$50,000" },
              { label: "Jurisdiction", value: "Washington" },
            ].map((fig, i) => (
              <div key={i} className="bg-white border border-gray-200/50 rounded-2xl p-6 shadow-sm text-center">
                <div className="label-metadata mb-2">{fig.label}</div>
                <div className="text-lg md:text-xl font-bold text-heading">{fig.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENCHMARK DATA TABLE ── */}
      <section className="section-default w-full relative z-10" id="benchmark-table">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-heading mb-4 text-center tracking-tight">Benchmark Support Estimates</h2>
            <p className="text-center text-muted mb-12 text-lg">Standard monthly estimates based on the 2026 economic table.</p>

            <div className="overflow-x-auto rounded-3xl border border-gray-200 shadow-xl bg-white">
              <table className="w-full text-left border-collapse">
                <caption className="sr-only">Benchmark Child Support Estimates for Washington State 2026</caption>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-8 py-5 label-metadata">Monthly Net Income</th>
                    <th className="px-8 py-5 label-metadata">1 Child</th>
                    <th className="px-8 py-5 label-metadata">2 Children</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { income: "$3,000", one: "$400–$600", two: "$700–$900" },
                    { income: "$5,000", one: "$700–$900", two: "$1,000–$1,300" },
                    { income: "$8,000", one: "$1,100–$1,400", two: "$1,400–$1,800" },
                  ].map((row, i) => (
                    <tr key={i} className="odd:bg-white even:bg-gray-50/30 hover:bg-indigo-50/50 transition-colors">
                      <td className="px-8 py-6 text-base font-bold text-heading">{row.income}</td>
                      <td className="px-8 py-6 text-base font-medium text-body">{row.one}</td>
                      <td className="px-8 py-6 text-base font-medium text-body">{row.two}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── TRUST TEXT (EEAT BOOST) ── */}
            <div className="text-center mt-12">
              <p className="text-sm text-muted italic leading-relaxed max-w-2xl mx-auto">
                &quot;These estimates are based on the 2026 Washington State child support guidelines. Actual support amounts may vary depending on custody arrangements, healthcare costs, and judicial decisions.&quot;
              </p>
            </div>

            {/* ── CTA SECTION (CONVERSION) ── */}
            <div className="mt-12 flex justify-center w-full">
              <Link
                href="/worksheet"
                className="btn-primary w-full md:w-auto !h-14 !px-10 !text-lg"
              >
                Calculate Exact Support
                <ChevronRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXAMPLE CALCULATION ── */}
      <section className="section-default w-full bg-heading text-white relative z-10">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center tracking-tight">Real-World Case Study</h2>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm space-y-10">
              <h3 className="text-2xl font-bold text-white text-center">Income Case: $5,000 Net Monthly</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Net Monthly Income", value: "$5,000" },
                  { label: "Number of Children", value: "2" },
                  { label: "Location", value: "King County" },
                ].map((item, i) => (
                  <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-2">{item.label}</div>
                    <div className="text-xl font-bold text-white">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl px-8 py-10 text-center shadow-2xl ring-1 ring-white/20">
                <div className="text-[10px] uppercase font-bold tracking-widest text-white/70 mb-2">Estimated Base Support</div>
                <div className="text-6xl font-bold tracking-tighter">$1,155<span className="text-lg font-normal ml-2 opacity-60">/ mo</span></div>
              </div>

              <p className="text-lg text-white/70 leading-relaxed text-center max-w-2xl mx-auto">
                In King County, courts apply the standard Washington economic schedule. For a combined net income of $5,000 with 2 children, the base presumptive support is $1,155. This amount is typically shared between parents based on their proportional income share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATIONAL CONTENT ── */}
      <section className="section-default w-full relative z-10">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-heading mb-16 text-center tracking-tight">
              Understanding the 2026 Guidelines
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-body">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  Washington State uses the <strong>Income Shares Model</strong>, where both parents&apos; monthly net incomes are combined. A proportional share is dedicated to the children, reflecting what would have been spent if the household remained together.
                </p>
                <div className="p-8 bg-white border border-gray-200 rounded-3xl shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-heading">The 2026 Schedule</h3>
                  <p className="text-base text-muted">
                    The 2026 economic tables, published by the <strong>AOC</strong>, cover combined monthly net incomes from $0 to $50,000.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Statutory minimum: statutory minimum.",
                      "Calculations cover all 39 Washington counties.",
                      "Updated for 2026 economic standards."
                    ].map((li, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-10">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-heading">The Self-Support Reserve (SSR)</h3>
                  <p className="text-lg leading-relaxed text-muted">
                    Washington&apos;s primary low-income protection is the <strong>SSR</strong>, set at <strong>approximately $2,394 per month for 2026</strong>. If a payment would leave the payer with less than this, the court may deviate the payment downward.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-heading">The 45% Net Income Cap</h3>
                  <p className="text-lg leading-relaxed text-muted">
                    Total support obligations typically cannot legally exceed 45% of a parent&apos;s monthly net income without explicit judicial approval for good cause.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOME FAQS ── */}
      <section className="section-default w-full bg-[#F1F5F9]/50 border-y border-gray-100 relative z-10">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-heading mb-12 text-center tracking-tight">Common Questions</h2>
            <FAQAccordion items={homeFaqs} />
          </div>
        </div>
      </section>

      {/* ── COUNTY QUICKLINKS ── */}
      <section className="section-default w-full relative z-10">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[
              { label: 'King County', href: '/king-county-income-5000-2-children' },
              { label: 'Pierce County', href: '/pierce-county-income-5000-2-children' },
              { label: 'Snohomish County', href: '/snohomish-county-income-5000-2-children' },
              { label: 'Spokane County', href: '/spokane-county-income-5000-2-children' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-indigo-200 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-md transition-all text-center group">
                <span className="label-metadata block mb-2">County Guide</span>
                <span className="text-sm font-bold text-heading group-hover:text-indigo-700 transition-colors">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG QUICKLINKS ── */}
      <section className="section-default border-t border-gray-100 w-full bg-white relative z-10">
        <div className="container-wide">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-heading tracking-tight">Latest Resources</h2>
              <p className="text-muted mt-2">Legal guides and economic analysis for Washington State.</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-indigo-600 font-bold hover:underline">
              View all articles <ChevronRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: '2026 WA Guidelines: Complete Handbook', href: '/blog/washington-child-support-guidelines-2026', cat: 'Legal' },
              { label: 'Self-Support Reserve (SSR) Explained', href: '/blog/washington-ssr-self-support-reserve-explained', cat: 'Analysis' },
              { label: 'King County Child Support Rules', href: '/blog/king-county-child-support-rules', cat: 'Local Rules' },
            ].map((p) => (
              <Link key={p.href} href={p.href} className="bg-[#F8FAFC] border border-gray-200 rounded-3xl p-8 shadow-sm hover:border-indigo-200 hover:bg-white hover:-translate-y-1 hover:shadow-xl transition-all group">
                <span className="label-metadata block mb-4 text-indigo-600">{p.cat}</span>
                <h3 className="text-lg font-bold text-heading group-hover:text-indigo-700 transition-colors leading-snug">{p.label}</h3>
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-muted group-hover:text-indigo-600">
                  Read Article <ChevronRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
