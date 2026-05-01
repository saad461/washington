import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, CheckCircle, Calculator, Scale, Shield } from "lucide-react";
import HomeCalculator from "@/components/HomeCalculator";
import HeroCard from "@/components/hero/HeroCard";
import CalculatorSchema from "@/components/CalculatorSchema";
import FAQSchema from "@/components/seo/FAQSchema";
import FAQAccordion from "@/components/FAQAccordion";
import { getSupport } from "@/data/washingtonTable2026";

export const metadata: Metadata = {
  title: {
    absolute: "Washington Child Support Calculator 2026 — Free Instant Estimate | WCSSC"
  },
  description: "Calculate Washington child support in seconds using the official 2026 RCW 26.19 economic tables. Free, private, and updated for EHB 1014 — covers all 39 counties.",
  alternates: { canonical: "https://wcssc.site/" },
};

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
    <div className="flex-1 flex flex-col bg-white relative overflow-hidden w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorSchema url="https://wcssc.site" />
      <FAQSchema faqs={homeFaqs} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        aria-label="Washington Child Support Calculator Hero"
        className="bg-white py-20 lg:py-28 relative overflow-hidden"
      >
        {/* Background Decoration */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left Column */}
            <div className="flex-1 text-center lg:text-left">
              <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
                Free · No Sign-up · 2026 Guidelines
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Washington Child Support Calculator <span className="text-blue-600">2026</span>
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Calculate your exact monthly obligation using the official 2026 RCW 26.19 economic tables.
                Trusted by Washington parents and family law attorneys across all 39 counties.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link
                  href="/#calculator"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-base transition-colors duration-200"
                >
                  Start Free Calculation →
                </Link>
                <Link
                  href="/washington-child-support-guidelines-2026"
                  className="border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 font-medium px-8 py-4 rounded-xl text-base transition-colors duration-200"
                >
                  View 2026 Guidelines
                </Link>
              </div>

              <ul role="list" className="flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start">
                {[
                  "No sign-up required",
                  "Instant results",
                  "Court-accurate 2026 tables"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-sm text-gray-500">
                    <span className="text-green-500 font-bold" aria-hidden="true">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column */}
            <div className="flex-shrink-0 w-full lg:w-96">
              <HeroCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR SECTION ────────────────────────────────────────── */}
      <section className="py-16 md:py-20 w-full bg-white">
        <div className="container-wide">
          <div className="space-y-12">
            <h2 className="text-center">
              Calculate Your Child Support Obligation Instantly
            </h2>
            <div id="calculator" className="scroll-mt-24">
              <HomeCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* ── STAT BAR ────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-[var(--color-bg-subtle)] border-y border-[var(--color-bg-border)] relative">
        <div className="container-wide">
          {/* Desktop view: Single row with dividers */}
          <div className="hidden md:flex items-center bg-[var(--color-bg-subtle)] border border-[var(--color-bg-border)] rounded-[14px] px-7 py-5 divide-x divide-[var(--color-bg-border)]">
            {[
              { label: "2026 SSR",     value: "~$2,394 / mo"    },
              { label: "Min Support",  value: "$50 / child"      },
              { label: "Table Limit",  value: "$50,000"          },
              { label: "Covers All 39 WA Counties", value: "Washington State" },
            ].map((fig, i) => (
              <div key={i} className="flex-1 px-8 text-center flex flex-col items-center justify-center">
                <div className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-[0.03em] mb-1">{fig.label}</div>
                <div className="text-xl font-bold text-[var(--color-text-primary)] leading-tight">{fig.value}</div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet view: 2x2 Grid */}
          <div className="grid md:hidden grid-cols-2 gap-4">
            {[
              { label: "2026 SSR",     value: "~$2,394 / mo"    },
              { label: "Min Support",  value: "$50 / child"      },
              { label: "Table Limit",  value: "$50,000"          },
              { label: "Covers All 39 WA Counties", value: "Washington State" },
            ].map((fig, i) => (
              <div key={i} className="bg-[var(--color-bg-subtle)] border border-[var(--color-bg-border)] rounded-[14px] p-5 text-center flex flex-col items-center justify-center">
                <div className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-[0.03em] mb-1">{fig.label}</div>
                <div className="text-lg font-bold text-[var(--color-text-primary)] leading-tight">{fig.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST & FEATURES ────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 w-full bg-white relative">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto space-y-24">

            {/* Why Washington Families and Attorneys Trust WCSSC */}
            <div>
              <div className="text-center mb-12 space-y-4">
                <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 mx-auto">RCW 26.19 Certified</p>
                <h2>Why Washington Families and Attorneys Trust WCSSC</h2>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                  Unlike generic calculators, WCSSC is engineered to the exact 2026 Washington statutory logic.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  {[
                    "Compliant with RCW 26.19 standards",
                    "Includes Self-Support Reserve (SSR) logic",
                    "Applies the 45% net income safety cap",
                    "Live updates as you adjust inputs",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <CheckCircle size={20} className="text-[var(--color-success)] shrink-0" />
                      <span className="text-base font-semibold text-[var(--color-text-body)]">{text}</span>
                    </div>
                  ))}
                </div>

                <div className="table-container shadow-[var(--shadow-card-md)]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="table-header-cell">Engine Logic</th>
                        <th className="table-header-cell text-center">WCSSC</th>
                        <th className="table-header-cell text-center">Other Calculators</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["2026 SSR Protection","45% Net Income Cap","Parenting Credit","RCW 26.19 Compliant"].map((name, i) => (
                        <tr key={i} className="table-row">
                          <td className="table-body-cell font-semibold">{name}</td>
                          <td className="table-body-cell text-center">
                            <CheckCircle size={20} className="mx-auto text-[var(--color-brand-primary)]" />
                          </td>
                          <td className="table-body-cell text-center">
                            <div className="w-4 h-0.5 bg-[var(--color-bg-border)] mx-auto rounded-full" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="card-standard text-center flex flex-col items-center group">
                <div className="w-12 h-12 bg-[var(--color-brand-primary-light)] text-[var(--color-brand-primary)] rounded-[12px] flex items-center justify-center mb-0 shadow-[var(--shadow-card)] group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-all">
                  <Scale size={24} />
                </div>
                <h3 className="text-[17px] font-semibold text-[var(--color-text-primary)] mt-4 mb-3">Legal Precision</h3>
                <p className="text-[15px] text-[var(--color-text-body)] leading-[1.65] mb-6">
                  Mapped exactly to the 2026 Washington State Economic Tables and statutory updates.
                </p>
                <Link href="/editorial-methodology" className="cta-link mt-auto">
                  View methodology <ChevronRight size={16} />
                </Link>
              </div>

              <div className="card-standard text-center flex flex-col items-center group">
                <div className="w-12 h-12 bg-[var(--color-success-bg)] text-[var(--color-success)] rounded-[12px] flex items-center justify-center mb-0 shadow-[var(--shadow-card)] group-hover:bg-[var(--color-success)] group-hover:text-white transition-all">
                  <Shield size={24} />
                </div>
                <h3 className="text-[17px] font-semibold text-[var(--color-text-primary)] mt-4 mb-3">Privacy First</h3>
                <p className="text-[15px] text-[var(--color-text-body)] leading-[1.65] mb-6">
                  No data is stored. All processing stays local in your browser session for 100% privacy.
                </p>
                <Link href="/privacy" className="cta-link mt-auto">
                  Learn more <ChevronRight size={16} />
                </Link>
              </div>

              <div className="card-standard text-center flex flex-col items-center group sm:col-span-2 md:col-span-1">
                <div className="w-12 h-12 bg-[var(--color-warning-bg)] text-[var(--color-warning)] rounded-[12px] flex items-center justify-center mb-0 shadow-[var(--shadow-card)] group-hover:bg-[var(--color-warning)] group-hover:text-white transition-all">
                  <Calculator size={24} />
                </div>
                <h3 className="text-[17px] font-semibold text-[var(--color-text-primary)] mt-4 mb-3">Worksheet Wizard</h3>
                <p className="text-[15px] text-[var(--color-text-body)] leading-[1.65] mb-6">
                  Generate the mandatory 8-part official PDF worksheet using our advanced automated wizard.
                </p>
                <Link href="/worksheet" className="cta-link mt-auto">
                  Launch Wizard <ChevronRight size={16} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── BENCHMARK TABLE ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 w-full relative bg-[var(--color-bg-subtle)]" id="benchmark-table">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 md:mb-16 space-y-4">
              <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 mx-auto">Updated January 2026</p>
              <h2>2026 Washington Child Support Amounts by Income</h2>
              <p className="text-[var(--color-text-secondary)] text-lg">
                Standard monthly totals based on the 2026 economic table.
              </p>
            </div>

            <div className="table-container shadow-[var(--shadow-card-md)]">
              <table className="w-full text-left border-collapse">
                <caption className="sr-only">
                  Benchmark Child Support Estimates for Washington State 2026
                </caption>
                <thead>
                  <tr>
                    <th className="table-header-cell">Combined Monthly Net Income</th>
                    <th className="table-header-cell">1 Child</th>
                    <th className="table-header-cell">2 Children</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-bg-border-soft)]">
                  {BENCHMARK_ROWS.map((row, i) => (
                    <tr key={i} className="table-row">
                      <td className="table-body-cell font-medium text-[var(--color-text-secondary)]">
                        {/* TODO: link when slug page exists */}
                        {row.income}
                      </td>
                      <td className="table-body-cell font-bold text-[var(--color-text-primary)]">{row.one}</td>
                      <td className="table-body-cell font-bold text-[var(--color-text-primary)]">{row.two}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center mt-8 text-[13px] text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto">
              These figures are the presumptive basic support obligation from the
              2026 Washington State economic table. Actual court orders may differ
              based on custody arrangements, healthcare costs, and judicial decisions.
            </p>

            <div className="mt-12 flex justify-center">
              <Link href="/worksheet" className="btn-primary-lg btn-primary !rounded-full">
                Calculate Exact Support
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ───────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 w-full bg-white relative">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 md:mb-16 space-y-4">
              <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 mx-auto">Real Calculation Example</p>
              <h2 className="text-[var(--color-text-primary)]">
                Real Example: $5,000 Income, 2 Children in Washington State
              </h2>
            </div>

            <div className="card-highlighted shadow-[var(--shadow-card)] space-y-8">
              <h3 className="text-[var(--color-text-primary)] text-center">
                Income Case: ${CASE_STUDY_INCOME.toLocaleString()} Net Monthly
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {[
                  { label: "Net Monthly Income", value: `$${CASE_STUDY_INCOME.toLocaleString()}` },
                  { label: "Number of Children", value: String(CASE_STUDY_CHILDREN)             },
                  { label: "Location",           value: "King County"                           },
                ].map((item, i) => (
                  <div key={i} className="stat-block p-4">
                    <div className="stat-label">{item.label}</div>
                    <div className="stat-value text-[15px] font-semibold">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="max-w-md mx-auto w-full">
                <div className="bg-white border border-[var(--color-brand-primary-mid)] rounded-xl p-8 text-center shadow-sm">
                  <div className="text-[13px] font-medium text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide">
                    Presumptive Base Support
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-text-primary)]">
                    {CASE_STUDY_DISPLAY}
                    <span className="text-lg font-medium text-[var(--color-text-secondary)] ml-2">/ mo</span>
                  </div>
                </div>
              </div>

              <p className="text-base text-[var(--color-text-body)] leading-relaxed text-center max-w-2xl mx-auto">
                In King County, courts apply the standard Washington economic
                schedule. For a combined net income of ${CASE_STUDY_INCOME.toLocaleString()} with{" "}
                {CASE_STUDY_CHILDREN} children, the presumptive base support is{" "}
                <strong className="text-[var(--color-text-primary)] font-bold">{CASE_STUDY_DISPLAY}</strong> per month. This amount is typically shared
                between parents based on their proportional income share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATIONAL CONTENT ──────────────────────────────────────────── */}
      <section className="py-16 md:py-20 w-full relative bg-[var(--color-bg-subtle)] border-y border-[var(--color-bg-border)]">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 md:mb-16 space-y-4">
              <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 mx-auto">2026 EHB 1014 Guidelines</p>
              <h2>How Washington State Calculates Child Support in 2026</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 text-[var(--color-text-body)]">
              <div className="space-y-8">
                <p className="text-lg leading-relaxed">
                  Washington State uses the{" "}
                  <strong className="text-[var(--color-text-primary)] font-bold">Income Shares Model</strong>, where both parents&apos;
                  monthly net incomes are combined. A proportional share is
                  dedicated to the children, reflecting what would have been
                  spent if the household remained together.
                </p>

                <div className="card-standard space-y-6">
                  <h3 className="mb-0">The 2026 Schedule</h3>
                  <p className="text-[var(--color-text-body)]">
                    The 2026 economic tables cover combined monthly net incomes
                    from $0 to $50,000.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Statutory minimum: $50 per child per month.",
                      "Calculations cover all 39 Washington counties.",
                      "Updated for 2026 economic standards.",
                    ].map((li, i) => (
                      <li key={i} className="flex items-start gap-4 text-base">
                        <CheckCircle className="text-[var(--color-success)] w-5 h-5 mt-1 shrink-0" />
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-12 md:space-y-16">
                <div className="space-y-4">
                  <h3 className="text-[var(--color-text-primary)]">The Self-Support Reserve (SSR)</h3>
                  <p className="text-lg leading-relaxed text-[var(--color-text-body)]">
                    Washington&apos;s primary low-income protection is the{" "}
                    <strong className="text-[var(--color-text-primary)] font-bold">SSR</strong>, set at{" "}
                    <strong className="text-[var(--color-text-primary)] font-bold">approximately $2,394 per month for 2026</strong>.
                    If a payment would leave the payer with less than this, the
                    court may deviate the payment downward.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[var(--color-text-primary)]">The 45% Net Income Cap</h3>
                  <p className="text-lg leading-relaxed text-[var(--color-text-body)]">
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
      <section className="py-16 md:py-20 w-full bg-white relative">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 md:mb-16 space-y-4">
              <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 mx-auto">Common Parent Questions</p>
              <h2>Frequently Asked Questions About Washington Child Support</h2>
            </div>
            <FAQAccordion faqs={homeFaqs} />
          </div>
        </div>
      </section>

      {/* ── COUNTY QUICKLINKS ────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 w-full relative bg-[var(--color-bg-subtle)] border-y border-[var(--color-bg-border)]">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 mx-auto">All 39 Washington Counties</p>
            <h2>Child Support Calculators by Washington County</h2>
            <p className="text-[var(--color-text-secondary)] mt-4 text-lg">
              Local rules and benchmarks for Washington&apos;s major counties.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {[
              { label: "King County",      href: "/king-county-income-5000-2-children"      },
              { label: "Pierce County",    href: "/pierce-county-income-5000-2-children"    },
              { label: "Snohomish County", href: "/snohomish-county-income-5000-2-children" },
              { label: "Spokane County",   href: "/spokane-county-income-5000-2-children"   },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="rounded-xl border border-gray-200 p-5 hover:shadow-md transition bg-white group flex flex-col items-start text-left">
                <span className="badge-category mb-3 !bg-blue-50 !text-blue-700">County Guide</span>
                <div className="flex items-center justify-between w-full mt-auto">
                  <span className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition-colors">
                    {c.label}
                  </span>
                  <ChevronRight size={18} className="text-gray-400 group-hover:text-[var(--color-brand-primary)] transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG QUICKLINKS ──────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 w-full bg-white relative">
        <div className="container-wide">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-12 md:mb-16">
            <div>
              <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Legal Guides & Updates</p>
              <h2 className="mt-2">2026 Washington Child Support Guides and Legal Resources</h2>
              <p className="text-[var(--color-text-secondary)] mt-4 text-lg">
                Legal guides and economic analysis for Washington State.
              </p>
            </div>
            <Link
              href="/blog"
              className="btn-tertiary-ghost"
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
                img:   "/img/wa_guidelines_2026.png",
                alt:   "Washington child support guidelines 2026 legal handbook"
              },
              {
                label: "Self-Support Reserve (SSR) Explained",
                href:  "/blog/washington-ssr-self-support-reserve-explained",
                cat:   "Analysis",
                img:   "/img/ssr_explained.png",
                alt:   "Washington self-support reserve 2026 explanation"
              },
              {
                label: "King County Child Support Rules",
                href:  "/blog/king-county-child-support-rules",
                cat:   "Local Rules",
                img:   "/img/king_county_rules.png",
                alt:   "King County child support rules and calculator guide"
              },
            ].map((p) => (
              <Link key={p.href} href={p.href} className="card-standard group flex flex-col !p-0 overflow-hidden">
                <div className="h-40 w-full bg-gray-100 flex items-center justify-center border-b border-gray-100 relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                <span className="badge-category mb-4 w-fit">{p.cat}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition-colors leading-snug">
                    {p.label}
                  </h3>
                </div>
                <div className="mt-8 pt-6 border-t border-[var(--color-bg-border-soft)] flex items-center justify-between">
                  <div className="cta-link">
                    Read Article
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[var(--color-bg-subtle)] flex items-center justify-center group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition-all transform group-hover:translate-x-1 border border-[var(--color-bg-border)]">
                    <ChevronRight size={14} />
                  </div>
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
