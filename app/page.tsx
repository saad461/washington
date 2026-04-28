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
    <div className="flex-1 flex flex-col w-full relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorSchema url="https://wcssc.site" />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow">The Modern Standard for</div>
          <h1 className="text-display mb-6">
            <span>Washington Child Support</span>
          </h1>
          <p className="hero-subtitle">
            Precision-engineered for the 2026 AOC economic schedule. Fast,
            private, and 100% compliant with Washington State guidelines.
          </p>
          <HomeCalculator />
        </div>
      </section>

      {/* ── KEY FIGURES ──────────────────────────────────────────────────── */}
      <section className="section section-subtle border-y border-border-default">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "2026 SSR",     value: "~$2,394 / mo"    },
              { label: "Min Support",  value: "$50 / child"      },
              { label: "Table Limit",  value: "$50,000"          },
              { label: "Jurisdiction", value: "Washington State" },
            ].map((fig, i) => (
              <div key={i} className="card text-center">
                <div className="text-overline mb-2">{fig.label}</div>
                <div className="text-h3">{fig.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENCHMARK TABLE ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-12">
              <h2>Benchmark Support Estimates</h2>
              <p className="text-body-lg text-text-muted">
                Standard monthly totals based on the 2026 economic table.
              </p>
            </div>

            <div className="table-wrapper card-elevated">
              <table>
                <thead>
                  <tr>
                    <th>Combined Monthly Net Income</th>
                    <th>1 Child</th>
                    <th>2 Children</th>
                  </tr>
                </thead>
                <tbody>
                  {BENCHMARK_ROWS.map((row, i) => (
                    <tr key={i}>
                      <td className="text-h4">{row.income}</td>
                      <td className="cell-numeric">{row.one}</td>
                      <td className="cell-numeric">{row.two}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center mt-8 text-sm italic">
              These figures are the presumptive basic support obligation from the
              2026 Washington State economic table. Actual court orders may differ
              based on custody arrangements, healthcare costs, and judicial decisions.
            </p>

            <div className="mt-12 flex justify-center">
              <Link href="/worksheet" className="btn btn-primary btn-lg">
                Calculate Exact Support
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ───────────────────────────────────────────────────── */}
      <section className="section section-muted border-y border-border-default">
        <div className="container">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-center mb-12">Real-World Case Study</h2>

            <div className="card card-elevated space-y-8">
              <h3 className="text-center">
                Income Case: ${CASE_STUDY_INCOME.toLocaleString()} Net Monthly
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Net Monthly Income", value: `$${CASE_STUDY_INCOME.toLocaleString()}` },
                  { label: "Number of Children", value: String(CASE_STUDY_CHILDREN)             },
                  { label: "Location",           value: "King County"                           },
                ].map((item, i) => (
                  <div key={i} className="text-center p-6 rounded-lg bg-bg-subtle border border-border-default">
                    <div className="label mb-2">{item.label}</div>
                    <div className="text-h3">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="max-w-sm mx-auto w-full">
                <div className="calc-result">
                  <div className="calc-result-label">Presumptive Base Support</div>
                  <div className="calc-result-amount">{CASE_STUDY_DISPLAY}</div>
                  <div className="calc-result-period">per month</div>
                </div>
              </div>

              <p className="text-body text-center max-w-2xl mx-auto">
                In King County, courts apply the standard Washington economic
                schedule. For a combined net income of ${CASE_STUDY_INCOME.toLocaleString()} with{" "}
                {CASE_STUDY_CHILDREN} children, the presumptive base support is{" "}
                <strong className="text-text-primary">{CASE_STUDY_DISPLAY}</strong> per month. This amount is typically shared
                between parents based on their proportional income share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATIONAL CONTENT ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-center mb-12">Understanding the 2026 Guidelines</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <p className="text-body-lg">
                  Washington State uses the <strong>Income Shares Model</strong>, where both parents&apos;
                  monthly net incomes are combined. A proportional share is
                  dedicated to the children, reflecting what would have been
                  spent if the household remained together.
                </p>

                <div className="card space-y-6">
                  <h3>The 2026 Schedule</h3>
                  <p className="text-sm">
                    The 2026 economic tables, published by the <strong>AOC</strong>, cover combined monthly net incomes
                    from $0 to $50,000.
                  </p>
                  <ul className="space-y-4 list-none p-0">
                    {[
                      "Statutory minimum: $50 per child per month.",
                      "Calculations cover all 39 Washington counties.",
                      "Updated for 2026 economic standards.",
                    ].map((li, i) => (
                      <li key={i} className="flex items-start gap-4 text-sm font-semibold text-text-primary">
                        <span className="w-2 h-2 rounded-full bg-brand mt-2 shrink-0" />
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-12">
                <div className="space-y-4">
                  <h3>The Self-Support Reserve (SSR)</h3>
                  <p className="text-body">
                    Washington&apos;s primary low-income protection is the <strong>SSR</strong>, set at
                    <strong> approximately $2,394 per month for 2026</strong>.
                    If a payment would leave the payer with less than this, the
                    court may deviate the payment downward.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3>The 45% Net Income Cap</h3>
                  <p className="text-body">
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
      <section className="section section-subtle border-y border-border-default">
        <div className="container">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-center mb-12">Common Questions</h2>
            <FAQAccordion items={homeFaqs} />
          </div>
        </div>
      </section>

      {/* ── COUNTY QUICKLINKS ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <h2>County Guides</h2>
            <p className="text-text-muted mt-4">
              Local rules and benchmarks for Washington&apos;s major counties.
            </p>
          </div>
          <div className="card-grid-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "King County",      href: "/king-county-income-5000-2-children"      },
              { label: "Pierce County",    href: "/pierce-county-income-5000-2-children"    },
              { label: "Snohomish County", href: "/snohomish-county-income-5000-2-children" },
              { label: "Spokane County",   href: "/spokane-county-income-5000-2-children"   },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="card group hover:border-brand transition-colors text-center">
                <span className="label mb-2 text-text-muted group-hover:text-brand">County Guide</span>
                <span className="text-h4 group-hover:text-brand">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG QUICKLINKS ──────────────────────────────────────────────── */}
      <section className="section border-t border-border-default">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-6 mb-12">
            <div>
              <h2>Latest Resources</h2>
              <p className="text-text-muted mt-4">
                Legal guides and economic analysis for Washington State.
              </p>
            </div>
            <Link href="/blog" className="btn btn-secondary btn-md">
              View all articles <ChevronRight size={16} />
            </Link>
          </div>

          <div className="card-grid-3">
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
              <Link key={p.href} href={p.href} className="card group flex flex-col hover:border-brand transition-colors">
                <span className="badge badge-brand mb-4 w-fit">{p.cat}</span>
                <div className="flex-1">
                  <h3 className="text-h4 group-hover:text-brand transition-colors">
                    {p.label}
                  </h3>
                </div>
                <div className="mt-8 pt-6 border-t border-border-default flex items-center justify-between">
                  <div className="text-sm font-bold text-text-muted group-hover:text-brand transition-colors">
                    Read Article
                  </div>
                  <div className="w-8 h-8 rounded-full bg-bg-subtle flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-all">
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
