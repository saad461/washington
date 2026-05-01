import { Metadata } from "next";
import WorksheetWizard from "@/components/WorksheetWizard";
import CalculatorSchema from "@/components/CalculatorSchema";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronRight, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: {
    absolute: "Washington Child Support Worksheet 2026 — Free Online Generator | WCSSC",
  },
  description:
    "Complete the official 8-part Washington State child support worksheet online. Auto-calculates all figures using 2026 RCW 26.19 economic tables. Free for all 39 Washington counties. No sign-up needed.",
  keywords: [
    "Washington child support worksheet",
    "Washington child support worksheet 2026",
    "WA child support worksheet calculator",
    "RCW 26.19 worksheet",
    "AOC child support worksheet 2026",
    "child support worksheet Washington State online",
  ],
  openGraph: {
    title: "Washington Child Support Worksheet 2026 | WCSSC",
    description:
      "Complete the official 8-part AOC child support worksheet online — free, instant, 2026 compliant.",
    url: "https://wcssc.site/worksheet",
    type: "website",
    siteName: "WCSSC",
  },
};

export default function WorksheetPage() {
  return (
    <div className="flex-1 w-full bg-white">
      <CalculatorSchema url="https://wcssc.site/worksheet" />

      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-16 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-wide relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6">
            <ArrowLeft size={16} />
            Back to Calculator
          </Link>

          <div className="flex flex-col gap-4">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Free · Official AOC Format · 2026 Guidelines
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Washington State <span className="text-blue-600">Child Support Worksheet 2026</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Complete the official 8-part AOC child support worksheet online. Auto-calculates all figures using the 2026 RCW 26.19 economic tables — free for all 39 Washington counties.
            </p>
          </div>
        </div>
      </section>

      {/* WorksheetWizard is the main content */}
      <WorksheetWizard />

      {/* ── EXAMPLE SECTION ──────────────────────────────────────────────── */}
      <section className="section-default border-t border-[var(--color-bg-border)] bg-[var(--color-bg-subtle)]">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">

            <header className="mb-12 text-center">
              <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 mx-auto">
                Real Calculation Example
              </p>
              <h2 className="mt-2">Real Calculation Example: $5,000 Income, 2 Children in King County</h2>
            </header>

            <div className="card-standard !p-8 md:!p-10 mb-12 shadow-[var(--shadow-card-md)]">
              <div className="space-y-10">
                <div>
                  <p className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">Input Data</p>
                  <p className="text-base text-[var(--color-text-body)]">
                    Combined Net Income: <strong className="text-[var(--color-text-primary)] font-bold">$5,000</strong> &nbsp;•&nbsp; Children: <strong className="text-[var(--color-text-primary)] font-bold">2</strong> &nbsp;•&nbsp; County: <strong className="text-[var(--color-text-primary)] font-bold">King</strong>
                  </p>
                </div>

                <div className="pt-10 border-t border-[var(--color-bg-border-soft)]">
                  <p className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-4">Calculated Estimate</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[44px] font-bold text-[var(--color-text-primary)] leading-none">$1,446</span>
                    <span className="text-lg font-medium text-[var(--color-text-secondary)]">/ month</span>
                  </div>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-4">Presumptive Basic Support Obligation</p>
                </div>

                <div className="pt-10 border-t border-[var(--color-bg-border-soft)]">
                  <p className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">Logic Applied</p>
                  <p className="text-[var(--color-text-body)] leading-relaxed text-lg">
                    In King County, courts use the standard Washington State economic table. For a combined net income of $5,000 with 2 children, the base presumptive support is $1,446. This amount is split proportionally between parents based on their respective incomes.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 bg-white border border-[var(--color-bg-border)] rounded-2xl">
               <p className="text-[var(--color-text-secondary)] text-sm m-0">
                Want to know how we arrived at these figures?
              </p>
              <Link
                href="/editorial-methodology"
                className="cta-link !font-bold"
              >
                Read our Editorial Methodology <ChevronRight size={16} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── SEO CONTENT SECTION ────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-100">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2" aria-hidden="true">
          About This Tool
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Washington State Child Support Worksheet — 8-Part 2026 Official Format
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          This wizard generates the official Washington State child support worksheet as required by RCW 26.19 and the
          2026 Administrative Office of the Courts (AOC) guidelines. Complete all 8 parts to produce a court-ready
          calculation for any Washington county.
        </p>

        <ul className="space-y-4">
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 1</span>
            <span className="text-gray-600 text-sm">
              <strong>Income</strong> — Gross monthly wages, business income, maintenance received, and imputed income
              for both parents
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 2</span>
            <span className="text-gray-600 text-sm">
              <strong>Basic Child Support Obligation</strong> — Calculate the presumptive basic support amount from the
              2026 Washington State economic table based on combined net monthly income and number of children
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 3</span>
            <span className="text-gray-600 text-sm">
              <strong>Healthcare, Daycare & Education</strong> — Enter monthly health insurance premiums for the
              children, work-related daycare costs, and approved extraordinary educational expenses paid by either
              parent
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 4</span>
            <span className="text-gray-600 text-sm">
              <strong>Gross Child Support Obligation</strong> — Combine the basic support obligation with additional
              expenses to determine the total gross child support obligation before credits are applied
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 5</span>
            <span className="text-gray-600 text-sm">
              <strong>Child Support Credits</strong> — Apply credits for health insurance paid directly, daycare costs
              paid directly to the provider, and other qualifying payments made outside the transfer payment
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 6</span>
            <span className="text-gray-600 text-sm">
              <strong>Standard Calculation & Presumptive Amount</strong> — Determine each parent's proportional share of
              the gross obligation and calculate the final presumptive monthly transfer payment amount
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 7</span>
            <span className="text-gray-600 text-sm">
              <strong>Additional Informational Factors</strong> — Document existing child support obligations for other
              children, secondary families, and other relevant financial factors for the court record
            </span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="text-blue-600 font-bold text-sm shrink-0 mt-0.5">Part 8</span>
            <span className="text-gray-600 text-sm">
              <strong>Additional Factors for Court</strong> — Include any requests for deviation from the presumptive
              amount, special circumstances, extraordinary expenses, or other factors requiring judicial consideration
            </span>
          </li>
        </ul>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-xl">
          <p className="text-sm text-amber-800">
            <strong>Legal Note:</strong> This wizard produces estimates based on the 2026 Washington State Child Support
            Schedule. All calculations are estimates only. Final orders are determined by a Washington State court.
          </p>
        </div>
      </section>
    </div>
  );
}
