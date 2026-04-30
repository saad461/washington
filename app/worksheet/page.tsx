import { Metadata } from "next";
import { WorksheetWizardClient as WorksheetWizard } from "@/components/ClientDynamic";
import CalculatorSchema from "@/components/CalculatorSchema";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ChevronRight, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Worksheet Pro Wizard — 2026 WA Official Child Support | WCSSC",
  description:
    "Complete the official 8-part Washington State Child Support Worksheet online. Real-time calculations for both parents using 2026 AOC guidelines. Free, accurate, court-ready.",
  alternates: { canonical: "https://wcssc.site/worksheet" },
  openGraph: {
    title: "Worksheet Pro Wizard — 2026 WA Child Support",
    description:
      "Step-by-step 2026 Washington Child Support Worksheet. Covers all 8 mandatory parts: income, deductions, net income, proportional share, and final transfer payment.",
    url: "https://wcssc.site/worksheet",
    siteName: "WCSSC",
    images: [{ url: "/wcssc-og.jpg", width: 1200, height: 630, alt: "WCSSC Worksheet Pro Wizard" }],
    locale: "en_US",
    type: "website",
  },
};

export default function WorksheetPage() {
  return (
    <main className="flex-1 w-full bg-white">
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
              Pro Worksheet Wizard
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
              Official Washington State <span className="text-blue-600">Worksheet Generator</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Complete the mandatory 8-part 2026 child support worksheet online. Our wizard performs all calculations automatically for any Washington county.
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
              <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2 mx-auto">Case Example</p>
              <h2 className="mt-2">How it Works: Real Scenario</h2>
              <p className="text-[var(--color-text-secondary)] text-lg mt-4">Support Scenario: $5,000 Combined Income in King County</p>
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
    </main>
  );
}
