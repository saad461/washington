import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import HomeCalculator from "@/components/HomeCalculator";
import CalculatorSchema from "@/components/CalculatorSchema";
import FAQAccordion from "@/components/FAQAccordion";
import { getSupport } from "@/data/washingtonTable2026";

export const metadata: Metadata = {
  title: "WCSSC — Washington Child Support Calculator 2026",
  description: "Washington's most accurate 2026 child support calculator. Instantly estimate monthly obligations for all 39 counties using the official AOC economic table. Free, fast, court-compliant.",
  alternates: { canonical: "https://wcssc.site/" },
};

// ─── Live benchmark data driven from the actual 2026 economic table ───────────
// FIX: was hardcoded strings like "$700–$900" — now real values from getSupport().
// If the table ever updates, these numbers update automatically.
function formatSupport(income: number, children: number): string {
  const val = getSupport(income, children);
  if (val === null) return "—";
  return `$${val.toLocaleString()}`;
}

const BENCHMARK_ROWS = [3000, 5000, 8000].map((income) => ({
  income: `$${income.toLocaleString()}`,
  one:    formatSupport(income, 1),
  two:    formatSupport(income, 2),
}));

// ─── Case study constants — driven from table so they stay accurate ───────────
// FIX: was hardcoded $1,155 which was wrong. Real value: getSupport(5000, 2) = $1,446.
const CASE_STUDY_INCOME   = 5000;
const CASE_STUDY_CHILDREN = 2;
const CASE_STUDY_SUPPORT  = getSupport(CASE_STUDY_INCOME, CASE_STUDY_CHILDREN);
const CASE_STUDY_DISPLAY  = CASE_STUDY_SUPPORT !== null
  ? `$${CASE_STUDY_SUPPORT.toLocaleString()}`
  : "—";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WCSSC — Washington Child Support Schedule Center",
    url: "https://wcssc.site",
    description: "Washington's most accurate 2026 child support calculator.",
  };

  const homeFaqs = [
    {
      question: "What is the minimum child support in Washington state?",
      answer: "The statutory minimum child support in Washington is $50 per child per month. Judges may deviate below this amount in extraordinary circumstances only, to ensure the paying parent's self-support reserve is protected.",
    },
    {
      question: "How is Washington child support calculated in 2026?",
      answer: "Washington uses an Income Shares Model. Both parents' net incomes are calculated and combined. The total presumptive support obligation is derived from the state's 2026 economic table and then split proportionally between the parents based on their percentage of the combined income.",
    },
    {
      question: "What is the Self-Support Reserve (SSR) for 2026?",
      answer: "The 2026 Self-Support Reserve (SSR) is approximately $2,394 per month. This low-income protection ensures that a paying parent is not left with less than approximately $2,394 to live on after making a basic child support payment.",
    },
    {
      question: "Does child support cover extraordinary expenses like daycare?",
      answer: "No, the basic child support obligation covers only food, shelter, and basic clothing. Extraordinary expenses, such as work-related daycare, health insurance premiums, and approved educational costs, are apportioned separately based on the parents' proportional share of income.",
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] relative overflow-hidden w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorSchema url="https://wcssc.site" />

      {/* Decorative blobs */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="w-[32rem] h-[32rem] sm:w-[40rem] sm:h-[40rem] bg-indigo-100/40 rounded-full blur-[100px] absolute -top-[10%] -left-[10%]" />
        <div className="w-[32rem] h-[32rem] sm:w-[40rem] sm:h-[40rem] bg-purple-100/40 rounded-full blur-[100px] absolute -bottom-[10%] -right-[10%]" />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="pt-12 lg:pt-20 w-full relative">
        <div className="container-wide">
          <div className="text-center mb-8 md:mb-16 space-y-6">
            <h1 className="text-balance">
              The Modern Standard for{" "}
              <br className="hidden sm:block" />
              <span className="text-gradient">Washington Child Support</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Precision-engineered for the 2026 AOC economic schedule. Fast,
              private, and 100% compliant with Washington State guidelines.
            </p>
          </div>
          <HomeCalculator />
        </div>
      </section>

      {/* ── KEY FIGURES ──────────────────────────────────────────────────── */}
      <section className="section-alt w-full border-y border-gray-100 relative">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 w-full">
            {[
              { label: "2026 SSR",     value: "~$2,394 / mo"    },
              { label: "Min Support",  value: "$50 / child"      },
              { label: "Table Limit",  value: "$50,000"          },
              { label: "Jurisdiction", value: "Washington State" },
            ].map((fig, i) => (
              <div key={i} className="card-standard text-center flex flex-col items-center justify-center h-full">
                <div className="label-metadata mb-2 text-indigo-500">{fig.label}</div>
                <div className="text-base sm:text-lg md:text-xl font-bold text-heading leading-snug">
                  {fig.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENCHMARK TABLE ──────────────────────────────────────────────── */}
      <section className="section-default w-full relative" id="benchmark-table">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12 md:mb-16 space-y-4">
              <h2>Benchmark Support Estimates</h2>
              <p className="text-muted text-base sm:text-lg">
                Standard monthly totals based on the 2026 economic table.
              </p>
            </div>

            <div className="table-container shadow-xl border border-gray-200">
              <table className="w-full text-left border-collapse">
                <caption className="sr-only">
                  Benchmark Child Support Estimates for Washington State 2026
                </caption>
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="table-header">Combined Monthly Net Income</th>
                    <th className="table-header">1 Child</th>
                    <th className="table-header">2 Children</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* FIX: rows are now driven from getSupport() — always accurate */}
                  {BENCHMARK_ROWS.map((row, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-cell font-bold text-heading">{row.income}</td>
                      <td className="table-cell font-medium">{row.one}</td>
                      <td className="table-cell font-medium">{row.two}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center mt-8 text-sm text-muted italic leading-relaxed max-w-2xl mx-auto">
              These figures are the presumptive basic support obligation from the
              2026 Washington State economic table. Actual court orders may differ
              based on custody arrangements, healthcare costs, and judicial decisions.
            </p>

            <div className="mt-12 flex justify-center">
              <Link href="/worksheet" className="btn-primary w-full sm:w-fit px-8 h-14">
                Calculate Exact Support
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ───────────────────────────────────────────────────── */}
      <section className="section-alt w-full border-y border-gray-100 relative">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-heading text-center mb-12 md:mb-16">
              Real-World Case Study
            </h2>

            <div className="card-standard shadow-xl space-y-8 md:space-y-12">
              <h3 className="text-heading text-center">
                Income Case: ${CASE_STUDY_INCOME.toLocaleString()} Net Monthly
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
                {[
                  { label: "Net Monthly Income", value: `$${CASE_STUDY_INCOME.toLocaleString()}` },
                  { label: "Number of Children", value: String(CASE_STUDY_CHILDREN)             },
                  { label: "Location",           value: "King County"                           },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="text-center p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gray-50/50 border border-gray-100"
                  >
                    <div className="label-metadata text-muted mb-2">{item.label}</div>
                    <div className="text-lg font-bold text-heading">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Result highlight — REDESIGNED to look less like a button, more like a clean data card */}
              <div className="max-w-sm mx-auto w-full">
                <div className="bg-white border-2 border-indigo-600 rounded-2xl p-8 text-center shadow-lg relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-100 transition-colors" />
                  <div className="relative z-10">
                    <div className="label-metadata text-indigo-600 mb-2">
                      Presumptive Base Support
                    </div>
                    <div className="text-4xl sm:text-5xl font-bold tracking-tight text-heading">
                      {CASE_STUDY_DISPLAY}
                      <span className="text-base sm:text-lg font-medium text-muted ml-2">/ month</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-body leading-relaxed text-center max-w-2xl mx-auto">
                In King County, courts apply the standard Washington economic
                schedule. For a combined net income of ${CASE_STUDY_INCOME.toLocaleString()} with{" "}
                {CASE_STUDY_CHILDREN} children, the presumptive base support is{" "}
                <strong className="text-heading">{CASE_STUDY_DISPLAY}</strong> per month. This amount is typically shared
                between parents based on their proportional income share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATIONAL CONTENT ──────────────────────────────────────────── */}
      <section className="section-default w-full relative border-b border-gray-100">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-center mb-12 md:mb-16">
              Understanding the 2026 Guidelines
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 text-body">
              <div className="space-y-8">
                <p className="text-base sm:text-lg leading-relaxed">
                  Washington State uses the{" "}
                  <strong>Income Shares Model</strong>, where both parents&apos;
                  monthly net incomes are combined. A proportional share is
                  dedicated to the children, reflecting what would have been
                  spent if the household remained together.
                </p>

                <div className="card-standard space-y-6">
                  <h3>The 2026 Schedule</h3>
                  <p className="text-sm sm:text-base text-muted">
                    The 2026 economic tables, published by the{" "}
                    <strong>AOC</strong>, cover combined monthly net incomes
                    from $0 to $50,000.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Statutory minimum: $50 per child per month.",
                      "Calculations cover all 39 Washington counties.",
                      "Updated for 2026 economic standards.",
                    ].map((li, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 mt-2 shrink-0" />
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-12 md:space-y-16">
                <div className="space-y-4">
                  <h3>The Self-Support Reserve (SSR)</h3>
                  <p className="text-base sm:text-lg leading-relaxed text-muted">
                    Washington&apos;s primary low-income protection is the{" "}
                    <strong>SSR</strong>, set at{" "}
                    <strong>approximately $2,394 per month for 2026</strong>.
                    If a payment would leave the payer with less than this, the
                    court may deviate the payment downward.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3>The 45% Net Income Cap</h3>
                  <p className="text-base sm:text-lg leading-relaxed text-muted">
                    Total support obligations typically cannot legally exceed 45%
                    of a parent&apos;s monthly net income without explicit
                    judicial approval for good cause.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="section-alt w-full border-y border-gray-100 relative">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-center mb-12 md:mb-16">Common Questions</h2>
            <FAQAccordion items={homeFaqs} />
          </div>
        </div>
      </section>

      {/* ── COUNTY QUICKLINKS ────────────────────────────────────────────── */}
      <section className="section-default w-full relative">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <h2>County Guides</h2>
            <p className="text-muted mt-4 text-base">
              Local rules and benchmarks for Washington&apos;s major counties.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 w-full">
            {[
              { label: "King County",      href: "/king-county-income-5000-2-children"      },
              { label: "Pierce County",    href: "/pierce-county-income-5000-2-children"    },
              { label: "Snohomish County", href: "/snohomish-county-income-5000-2-children" },
              { label: "Spokane County",   href: "/spokane-county-income-5000-2-children"   },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="card-interactive text-center group">
                <span className="label-metadata block mb-2">County Guide</span>
                <span className="text-sm font-bold text-heading group-hover:text-indigo-700 transition-colors">
                  {c.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG QUICKLINKS ──────────────────────────────────────────────── */}
      <section className="section-default border-t border-gray-100 w-full bg-white relative">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-12 md:mb-16">
            <div>
              <h2>Latest Resources</h2>
              <p className="text-muted mt-4 text-base">
                Legal guides and economic analysis for Washington State.
              </p>
            </div>
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors shrink-0 no-underline px-6 h-12 rounded-xl bg-gray-50 border border-gray-100"
            >
              View all articles <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                label: "2026 WA Guidelines: Complete Handbook",
                href:  "/blog/washington-child-support-guidelines-2026",
                cat:   "Legal",
              },
              {
                label: "Self-Support Reserve (SSR) Explained",
                href:  "/blog/washington-ssr-self-support-reserve-explained",
                cat:   "Analysis",
              },
              {
                label: "King County Child Support Rules",
                href:  "/blog/king-county-child-support-rules",
                cat:   "Local Rules",
              },
            ].map((p) => (
              <Link key={p.href} href={p.href} className="card-interactive group flex flex-col">
                <span className="badge badge-indigo !h-[22px] !text-[11px] mb-4 w-fit">{p.cat}</span>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-heading group-hover:text-indigo-700 transition-colors leading-snug">
                    {p.label}
                  </h3>
                </div>
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-sm font-bold text-muted group-hover:text-indigo-600 transition-colors">
                    Read Article
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:translate-x-1 border border-gray-100">
                    <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
