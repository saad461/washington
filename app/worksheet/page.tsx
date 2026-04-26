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

      <section className="section-default border-t border-gray-100 bg-gray-50/50">
        <div className="container-wide">
          <div className="container-reading">

            <header className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Example Calculation</h2>
              <h3 className="text-xl text-gray-600 font-medium">Support Scenario: $5,000 Income in King County</h3>
            </header>

            <div className="card-standard p-8 md:p-12 mb-12 shadow-sm border border-gray-200">
              <div className="grid gap-8">
                <div>
                  <p className="label-metadata text-indigo-600 mb-2 tracking-widest uppercase">Input Data</p>
                  <p className="text-lg font-bold text-gray-900">
                    Combined Net Income: $5,000 &nbsp;•&nbsp; Children: 2 &nbsp;•&nbsp; County: King
                  </p>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <p className="label-metadata text-emerald-600 mb-2 tracking-widest uppercase">Calculated Estimate</p>
                  <p className="text-3xl font-bold text-gray-900">$1,155</p>
                  <p className="text-sm text-gray-400 mt-2">Presumptive Basic Support Obligation</p>
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <p className="label-metadata text-gray-400 mb-2 tracking-widest uppercase">Short Explanation</p>
                  <p className="text-gray-600 leading-relaxed">
                    In King County, courts use the standard Washington State economic table. For a combined net income of $5,000 with 2 children, the base presumptive support is $1,155. This amount is split proportionally between parents based on their respective incomes.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 p-8 bg-white border border-gray-100 rounded-3xl">
               <p className="text-gray-600 text-sm m-0">
                Want to know how we arrived at these figures?
              </p>
              <Link
                href="/editorial-methodology"
                className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors inline-flex items-center gap-2 group"
              >
                Read our Editorial Methodology <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
