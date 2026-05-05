"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, CheckCircle, Calculator, Scale, Shield, MapPin, Calendar } from "lucide-react";
import HomeCalculator from "@/components/HomeCalculator";
import FAQAccordion from "@/components/FAQAccordion";
import { getSupport } from "@/data/washingtonTable2026";

function formatSupport(income: number, children: number): string {
  const val = getSupport(income, children);
  if (val === null) return "—";
  return `$${val.toLocaleString()}`;
}

const BENCHMARK_ROWS = [1500, 3000, 5000, 8000, 10000, 15000].map((income) => ({
  value: income,
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

interface HomeClientProps {
  homeFaqs: { question: string; answer: string }[];
}

export default function HomeClient({ homeFaqs }: HomeClientProps) {
  const [selectedCounty, setSelectedCounty] = useState("");

  return (
    <div className="flex-1 flex flex-col bg-white relative overflow-hidden w-full">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        aria-label="Washington Child Support Calculator Hero"
        className="bg-white pt-8 pb-0 lg:pt-12 lg:pb-0 relative overflow-hidden"
      >
        {/* Background Decoration */}
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Hero Content */}
            <div className="flex-1 text-left">
              <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
                Free · No Sign-up · 2026 Guidelines
              </p>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Washington Child Support Calculator <span className="text-blue-600">2026</span>
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-2xl">
                Calculate your exact monthly obligation using the official 2026 RCW 26.19 economic tables.
                Trusted by Washington parents and family law attorneys across all 39 counties.
              </p>

              <div className="flex flex-col items-start gap-4 mb-8">
                <Link
                  href="/#calculator"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-blue-200 active:scale-[0.98] w-full sm:w-auto text-center"
                >
                  Start Free Calculation →
                </Link>
                <Link
                  href="/blog/washington-child-support-guidelines-2026"
                  className="text-gray-500 hover:text-blue-600 font-medium text-base transition-colors duration-200"
                >
                  View 2026 Guidelines
                </Link>
              </div>

              <ul role="list" className="flex flex-wrap gap-x-6 gap-y-2 justify-start">
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
          </div>
        </div>
      </section>

      {/* ── CALCULATOR SECTION ────────────────────────────────────────── */}
      <section className="py-0 w-full bg-white">
        <div className="container-wide">
          <div className="flex flex-col">
            <h2 className="text-center mt-[32px] mb-[16px] scroll-mt-24" id="calculator-heading">
              Calculate Your Child Support Obligation Instantly
            </h2>
            <div id="calculator" className="scroll-mt-24 mb-[32px]">
              <HomeCalculator
                selectedCounty={selectedCounty}
                setSelectedCounty={setSelectedCounty}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── STAT BAR ────────────────────────────────────────────────────── */}
      <section className="py-[32px] bg-[var(--color-bg-subtle)] border-y border-[var(--color-bg-border)] relative">
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
      <section className="py-[40px] md:py-[64px] w-full bg-white relative">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto space-y-24">

            {/* Why Washington Families and Attorneys Trust WSCSS */}
            <div>
              <div className="text-center mb-12 space-y-4">
                <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 mx-auto">RCW 26.19 Compliant</p>
                <h2>Why Washington Families and Attorneys Trust WSCSS</h2>
                <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                  Unlike generic calculators, WSCSS is engineered to the exact 2026 Washington statutory logic.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
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
                        <th className="table-header-cell text-center">WSCSS</th>
                        <th className="table-header-cell text-center">Other Calculators</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["2026 SSR Protection","45% Net Income Cap","Parenting Credit","RCW 26.19 Compliant"].map((name, i) => (
                        <tr key={i} className="table-row">
                          <td className="table-body-cell font-semibold">{name}</td>
                          <td className="table-body-cell text-center">
                            <div className="flex items-center justify-center gap-1.5 text-[var(--color-brand-primary)]">
                              <CheckCircle size={20} />
                              <span className="text-[11px] font-bold">✓</span>
                            </div>
                          </td>
                          <td className="table-body-cell text-center">
                            <div className="flex items-center justify-center gap-1.5 text-gray-400">
                              <div className="w-4 h-0.5 bg-gray-300 rounded-full" />
                              <span className="text-[11px] font-bold">✗</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
        </div>
      </section>

      {/* ── BENCHMARK TABLE ──────────────────────────────────────────────── */}
      <section className="py-[40px] md:py-[64px] w-full relative bg-[var(--color-bg-subtle)]" id="benchmark-table">
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
                    <tr
                      key={i}
                      className="table-row cursor-pointer hover:bg-blue-50 transition-colors group"
                      onClick={() => {
                        const p1Input = document.getElementById("parent1-income") as HTMLInputElement;
                        const childSelect = document.getElementById("children-count") as HTMLSelectElement;
                        if (p1Input) {
                          p1Input.value = String(row.value);
                          // Trigger react state update
                          const event = new Event('input', { bubbles: true });
                          p1Input.dispatchEvent(event);
                          p1Input.focus();
                        }
                        if (childSelect) {
                          childSelect.value = "2";
                          const event = new Event('change', { bubbles: true });
                          childSelect.dispatchEvent(event);
                        }
                        document.getElementById("calculator-heading")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <td className="table-body-cell font-medium text-blue-600 group-hover:underline">
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
      <section className="py-[40px] md:py-[64px] w-full bg-white relative">
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
      <section className="py-[40px] md:py-[64px] w-full relative bg-[var(--color-bg-subtle)] border-y border-[var(--color-bg-border)]">
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
      <section className="py-[40px] md:py-[64px] w-full bg-white relative">
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
      <section className="py-[40px] md:py-[64px] w-full relative bg-[var(--color-bg-subtle)] border-y border-[var(--color-bg-border)]">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 mx-auto">Major Washington Counties</p>
            <h2>Child Support Calculators by Washington County</h2>
            <p className="text-[var(--color-text-secondary)] mt-4 text-lg">
              Local rules and benchmarks for Washington&apos;s major counties.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-12">
            {[
              {
                label: "King County",
                slug: "king-county",
                href: "/king-county-income-5000-2-children",
                desc: "Seattle metro · Highest volume of cases"
              },
              {
                label: "Pierce County",
                slug: "pierce-county",
                href: "/pierce-county-income-5000-2-children",
                desc: "Tacoma area · Second largest county"
              },
              {
                label: "Snohomish County",
                slug: "snohomish-county",
                href: "/snohomish-county-income-5000-2-children",
                desc: "Everett area · Growing caseload"
              },
              {
                label: "Spokane County",
                slug: "spokane-county",
                href: "/spokane-county-income-5000-2-children",
                desc: "Eastern WA · Different local benchmarks"
              },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className={`rounded-xl border border-l-4 p-5 hover:shadow-md transition bg-white group flex flex-col items-start text-left relative ${
                  selectedCounty === c.slug
                    ? "border-blue-500 border-l-blue-600 ring-2 ring-blue-500/10"
                    : "border-gray-200 border-l-blue-400"
                }`}
              >
                {selectedCounty === c.slug && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">
                    Your county
                  </span>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-600"><MapPin size={16} /></span>
                  <span className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-blue-600 transition-colors">
                    {c.label}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-4 font-medium leading-relaxed">
                  {c.desc}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-50 w-full flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Benchmark</span>
                    <span className="text-[11px] font-bold text-gray-700">$1,446/mo</span>
                  </div>
                  <div className="text-[9px] text-gray-400">$5,000 income · 2 children</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/washington-courts" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1">
              View all 39 counties <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BLOG QUICKLINKS ──────────────────────────────────────────────── */}
      <section className="py-[40px] md:py-[64px] w-full bg-white relative">
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
                <div className="flex items-center justify-between mb-4">
                  <span className="badge-category w-fit">{p.cat}</span>
                  <span className="text-[11px] font-bold text-gray-400 flex items-center gap-1">
                    <Calendar size={12} />
                    Updated: April 2026
                  </span>
                </div>
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
