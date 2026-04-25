import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import HomeCalculator from "@/components/HomeCalculator";
import CalculatorSchema from "@/components/CalculatorSchema";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "WCSSC — Washington Child Support Calculator 2026",
  description: "Washington's most accurate 2026 child support calculator. Instantly estimate monthly obligations for all 39 counties using the official AOC economic table. Free, fast, court-compliant.",
  alternates: { canonical: "https://wcssc.site/" },
};

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

      {/* Decorative blobs — pointer-events-none, purely visual */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        <div className="w-[32rem] h-[32rem] sm:w-[40rem] sm:h-[40rem] bg-indigo-100/40 rounded-full blur-[100px] absolute -top-[10%] -left-[10%]" />
        <div className="w-[32rem] h-[32rem] sm:w-[40rem] sm:h-[40rem] bg-purple-100/40 rounded-full blur-[100px] absolute -bottom-[10%] -right-[10%]" />
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────
          FIX: was py-20 md:py-32 (128px) — way too tall, doubly so with
          the mb-20 inside. Now py-12 md:py-20 + mb-10 md:mb-14 inside.
          FIX: h1 was hardcoded text-4xl md:text-6xl, bypassing globals
          and jumping 40px→60px with no sm: step. Now uses 3-step scale
          matching global h1 styles (text-3xl sm:text-4xl lg:text-5xl).
      ──────────────────────────────────────────────────────────────────── */}
      <section className="pt-12 pb-0 md:pt-20 w-full relative z-10">
        <div className="container-wide">
          <div className="text-center mb-10 md:mb-14 space-y-4 md:space-y-5">
            <h1 className="text-balance">
              The Modern Standard for{" "}
              <br className="hidden sm:block" />
              <span className="text-gradient">Washington Child Support</span>
            </h1>
            {/* FIX: had px-4 inline on a paragraph — handled by container */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Precision-engineered for the 2026 AOC economic schedule. Fast,
              private, and 100% compliant with Washington State guidelines.
            </p>
          </div>
          <HomeCalculator />
        </div>
      </section>

      {/* ── KEY FIGURES ───────────────────────────────────────────────────
          FIX: was rounded-2xl p-6 hardcoded. Using card-standard now.
          FIX: grid gap-6 is fine; cards scale with card-standard padding.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="section-default w-full bg-[#F1F5F9]/50 border-y border-gray-100 relative z-10">
        <div className="container-wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
            {[
              { label: "2026 SSR",    value: "~$2,394 / mo"    },
              { label: "Min Support", value: "$50 / child"      },
              { label: "Table Limit", value: "$50,000"          },
              { label: "Jurisdiction",value: "Washington State" },
            ].map((fig, i) => (
              <div key={i} className="card-standard text-center">
                <div className="label-metadata mb-2">{fig.label}</div>
                <div className="text-base sm:text-lg md:text-xl font-bold text-heading leading-snug">
                  {fig.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENCHMARK TABLE ───────────────────────────────────────────────
          FIX: px-8 py-6 on td/th forced unnecessary horizontal scroll.
          Now uses .table-header and .table-cell classes (responsive padding).
          FIX: rounded-3xl on the wrapper → using .table-container class.
          FIX: h2 hardcoded text-3xl → let global h2 style apply.
          FIX: CTA button was !h-14 !px-10 !text-lg (all !important overrides).
          Now btn-primary used cleanly; sm:w-auto handles width.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="section-default w-full relative z-10" id="benchmark-table">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12 space-y-3">
              <h2>Benchmark Support Estimates</h2>
              <p className="text-muted text-base sm:text-lg">
                Standard monthly estimates based on the 2026 economic table.
              </p>
            </div>

            <div className="table-container shadow-xl">
              <table className="w-full text-left border-collapse">
                <caption className="sr-only">
                  Benchmark Child Support Estimates for Washington State 2026
                </caption>
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="table-header">Monthly Net Income</th>
                    <th className="table-header">1 Child</th>
                    <th className="table-header">2 Children</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { income: "$3,000", one: "$400–$600",    two: "$700–$900"    },
                    { income: "$5,000", one: "$700–$900",    two: "$1,000–$1,300"},
                    { income: "$8,000", one: "$1,100–$1,400",two: "$1,400–$1,800"},
                  ].map((row, i) => (
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
              These estimates are based on the 2026 Washington State child support
              guidelines. Actual support amounts may vary depending on custody
              arrangements, healthcare costs, and judicial decisions.
            </p>

            <div className="mt-8 flex justify-center">
              <Link href="/worksheet" className="btn-primary w-full sm:w-auto">
                Calculate Exact Support
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ────────────────────────────────────────────────────
          FIX: text-6xl on the dollar figure is 60px — enormous on mobile.
          Now text-4xl sm:text-5xl md:text-6xl (3-step).
          FIX: p-8 md:p-12 on the inner card → p-6 sm:p-8 md:p-12.
          FIX: mb-12 on h2 was too tight on mobile; now mb-8 md:mb-12.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="section-default w-full bg-heading text-white relative z-10">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-white text-center mb-8 md:mb-12">
              Real-World Case Study
            </h2>

            <div className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 backdrop-blur-sm space-y-8 md:space-y-10">
              <h3 className="text-white text-center">
                Income Case: $5,000 Net Monthly
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Net Monthly Income", value: "$5,000"     },
                  { label: "Number of Children", value: "2"          },
                  { label: "Location",           value: "King County"},
                ].map((item, i) => (
                  <div
                    key={i}
                    className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="label-metadata text-white/40 mb-2">{item.label}</div>
                    <div className="text-lg sm:text-xl font-bold text-white">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Result highlight */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl px-6 py-8 sm:px-8 sm:py-10 text-center shadow-2xl ring-1 ring-white/20">
                <div className="label-metadata text-white/70 mb-3">
                  Estimated Base Support
                </div>
                {/* FIX: was text-6xl always — 60px on a 390px phone is huge */}
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white">
                  $1,155
                  <span className="text-base sm:text-lg font-normal ml-2 opacity-60">/ mo</span>
                </div>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed text-center max-w-2xl mx-auto">
                In King County, courts apply the standard Washington economic
                schedule. For a combined net income of $5,000 with 2 children,
                the base presumptive support is $1,155. This amount is typically
                shared between parents based on their proportional income share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATIONAL CONTENT ───────────────────────────────────────────
          FIX: h2 mb-16 (64px) — too large on mobile. Now mb-10 md:mb-16.
          FIX: inner card p-8 rounded-3xl → card-standard (responsive).
          FIX: gap-12 on 2-col grid → gap-8 md:gap-12.
          FIX: h3 hardcoded text-2xl/text-xl → global h3 applies.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="section-default w-full relative z-10">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center mb-10 md:mb-16">
              Understanding the 2026 Guidelines
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-body">
              <div className="space-y-6">
                <p className="text-base sm:text-lg leading-relaxed">
                  Washington State uses the{" "}
                  <strong>Income Shares Model</strong>, where both parents&apos;
                  monthly net incomes are combined. A proportional share is
                  dedicated to the children, reflecting what would have been
                  spent if the household remained together.
                </p>

                {/* FIX: was p-8 rounded-3xl hardcoded — now card-standard */}
                <div className="card-standard space-y-4">
                  <h3>The 2026 Schedule</h3>
                  <p className="text-sm sm:text-base text-muted">
                    The 2026 economic tables, published by the{" "}
                    <strong>AOC</strong>, cover combined monthly net incomes
                    from $0 to $50,000.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Statutory minimum: $50 per child per month.",
                      "Calculations cover all 39 Washington counties.",
                      "Updated for 2026 economic standards.",
                    ].map((li, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-8 md:space-y-10">
                <div className="space-y-3">
                  <h3>The Self-Support Reserve (SSR)</h3>
                  <p className="text-base sm:text-lg leading-relaxed text-muted">
                    Washington&apos;s primary low-income protection is the{" "}
                    <strong>SSR</strong>, set at{" "}
                    <strong>approximately $2,394 per month for 2026</strong>.
                    If a payment would leave the payer with less than this, the
                    court may deviate the payment downward.
                  </p>
                </div>

                <div className="space-y-3">
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

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="section-default w-full bg-[#F1F5F9]/50 border-y border-gray-100 relative z-10">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center mb-8 md:mb-12">Common Questions</h2>
            <FAQAccordion items={homeFaqs} />
          </div>
        </div>
      </section>

      {/* ── COUNTY QUICKLINKS ─────────────────────────────────────────────
          FIX: was rounded-2xl p-6 hardcoded inline on every card.
          Now uses .card-interactive for consistent hover/shadow/radius.
          FIX: gap-6 kept; grid now sm:grid-cols-2 (was missing sm step).
      ──────────────────────────────────────────────────────────────────── */}
      <section className="section-default w-full relative z-10">
        <div className="container-wide">
          <div className="text-center mb-8 md:mb-10">
            <h2>County Guides</h2>
            <p className="text-muted mt-2 text-base">
              Local rules and benchmarks for Washington&apos;s major counties.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
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

      {/* ── BLOG QUICKLINKS ───────────────────────────────────────────────
          FIX: was rounded-3xl p-8 hardcoded — now card-interactive.
          FIX: header mb-12 → mb-8 md:mb-12.
          FIX: "View all" link now also visible on mobile (was hidden md:flex).
      ──────────────────────────────────────────────────────────────────── */}
      <section className="section-default border-t border-gray-100 w-full bg-white relative z-10">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3 mb-8 md:mb-12">
            <div>
              <h2>Latest Resources</h2>
              <p className="text-muted mt-1 text-base">
                Legal guides and economic analysis for Washington State.
              </p>
            </div>
            <Link
              href="/blog"
              className="flex items-center gap-1.5 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors shrink-0 no-underline"
            >
              View all articles <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
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
                <span className="label-metadata text-indigo-600 mb-3">{p.cat}</span>
                <h3 className="text-base sm:text-lg font-bold text-heading group-hover:text-indigo-700 transition-colors leading-snug flex-1">
                  {p.label}
                </h3>
                <div className="mt-5 flex items-center gap-1.5 text-sm font-bold text-muted group-hover:text-indigo-600 transition-colors">
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
