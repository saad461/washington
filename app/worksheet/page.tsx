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

      <WorksheetWizard />

      <section className="section section-subtle border-t border-border-default">
        <div className="container">
          <div className="container-reading">

            <header className="mb-12">
              <h2 className="text-h2 !mb-4">Example Calculation</h2>
              <h3 className="text-h3 !text-text-muted">Support Scenario: $5,000 Income in King County</h3>
            </header>

            <div className="card !p-8 md:!p-12 mb-12 shadow-sm">
              <div className="grid gap-8">
                <div>
                  <p className="text-overline mb-2">Input Data</p>
                  <p className="text-body-lg font-bold !text-text-primary mb-0">
                    Combined Net Income: $5,000 &nbsp;•&nbsp; Children: 2 &nbsp;•&nbsp; County: King
                  </p>
                </div>

                <div className="pt-8 border-t border-border-default">
                  <p className="text-overline !text-success mb-2">Calculated Estimate</p>
                  <p className="text-numeric-lg !text-3xl">$1,446</p>
                  <p className="text-xs text-text-muted mt-2">Presumptive Basic Support Obligation</p>
                </div>

                <div className="pt-8 border-t border-border-default">
                  <p className="text-overline !text-text-muted mb-2">Short Explanation</p>
                  <p className="text-body mb-0">
                    In King County, courts use the standard Washington State economic table. For a combined net income of $5,000 with 2 children, the base presumptive support is $1,446. This amount is split proportionally between parents based on their respective incomes.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 p-8 card !bg-white">
               <p className="text-body text-sm mb-0">
                Want to know how we arrived at these figures?
              </p>
              <Link
                href="/editorial-methodology"
                className="btn btn-ghost btn-sm"
              >
                Read our Methodology <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
