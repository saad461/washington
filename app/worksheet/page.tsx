import { Metadata } from "next";
import { WorksheetWizardClient as WorksheetWizard } from "@/components/ClientDynamic";
import CalculatorSchema from "@/components/CalculatorSchema";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

      {/* WorksheetWizard is the main content */}
      <WorksheetWizard />

      <section className="section-default border-t border-[var(--color-bg-border)] bg-[var(--color-bg-subtle)]">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">

            <header className="mb-12 text-center">
              <span className="eyebrow">Case Example</span>
              <h2 className="mt-2">Example Calculation</h2>
              <p className="text-[var(--color-text-secondary)] text-lg mt-4">Support Scenario: $5,000 Income in King County</p>
            </header>

            <div className="card-standard !p-8 md:!p-10 mb-12 shadow-[var(--shadow-card-md)]">
              <div className="space-y-10">
                <div>
                  <p className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-[0.04em] mb-3">Input Data</p>
                  <p className="text-base text-[var(--color-text-body)]">
                    Combined Net Income: <strong className="text-[var(--color-text-primary)]">$5,000</strong> &nbsp;•&nbsp; Children: <strong className="text-[var(--color-text-primary)]">2</strong> &nbsp;•&nbsp; County: <strong className="text-[var(--color-text-primary)]">King</strong>
                  </p>
                </div>

                <div className="pt-10 border-t border-[var(--color-bg-border-soft)]">
                  <p className="text-[12px] font-medium text-[var(--color-text-secondary)] uppercase tracking-[0.04em] mb-4">Calculated Estimate</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[44px] font-bold text-[var(--color-text-primary)] leading-none">$1,446</span>
                    <span className="text-[13px] font-medium text-[var(--color-text-secondary)]">/ month</span>
                  </div>
                  <p className="text-[13px] font-medium text-[var(--color-text-secondary)] mt-4">Presumptive Basic Support Obligation</p>
                </div>

                <div className="pt-10 border-t border-[var(--color-bg-border-soft)]">
                  <p className="text-[12px] font-bold text-[var(--color-text-secondary)] uppercase tracking-[0.04em] mb-3">Short Explanation</p>
                  <p className="text-[var(--color-text-body)] leading-relaxed">
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
                Read our Editorial Methodology <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
