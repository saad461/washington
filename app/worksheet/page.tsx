import { Metadata } from "next";
import { WorksheetWizardClient as WorksheetWizard } from "@/components/ClientDynamic";
import CalculatorSchema from "@/components/CalculatorSchema";
import Link from "next/link";

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
    /*
     * FIX: was bg-white with no overflow guard — on mobile, wide wizard
     * content can cause horizontal scroll. overflow-x-hidden prevents that.
     */
    <div className="flex-1 w-full bg-white overflow-x-hidden">
      <CalculatorSchema url="https://wcssc.site/worksheet" />

      {/* WorksheetWizard is the main content — no wrapper needed here */}
      <WorksheetWizard />

      {/* ── AEO / Example Calculation Section ─────────────────────────────
          FIX: was max-w-7xl mx-auto px-4 section-default sm:px-6 lg:px-8
          — padding props were split across two elements redundantly, and
          section-default was on the outer div while max-w-3xl was inner.
          Now: use container-wide on outer + container-reading on inner,
          which is exactly what those classes are designed for.

          FIX: h2 was text-3xl mb-8 with no font-bold or font-heading —
          looked unstyled. Now uses global h2 via the element directly.

          FIX: h3 had no size or weight classes — rendered as default body
          text size. Now uses global h3.

          FIX: label-metadata on the methodology link row made the whole
          line tiny uppercase text. That class is for metadata labels only,
          not for a sentence + link. Replaced with normal body text.

          FIX: the info card used p-6 rounded-xl — now card-standard for
          consistency. mb-10 → mb-8.
      ──────────────────────────────────────────────────────────────────── */}
      <section className="section-default border-t border-gray-100">
        <div className="container-wide">
          <div className="container-reading !mx-auto !px-0">

            <div className="space-y-4 mb-8">
              <h2>Example Calculation</h2>
              <h3>Support Scenario: $5,000 Income in King County</h3>
            </div>

            <div className="card-standard mb-8 space-y-4">
              <p>
                <strong className="text-heading">Input:</strong>{" "}
                Combined Monthly Net Income: $5,000 &nbsp;|&nbsp; Children: 2 &nbsp;|&nbsp; County: King County
              </p>
              <p>
                <strong className="text-heading">Output:</strong>{" "}
                Estimated Monthly Basic Support Obligation: $1,155
              </p>
              <p className="text-sm text-muted leading-relaxed pt-2 border-t border-gray-100">
                <strong className="text-body">Short explanation:</strong>{" "}
                In King County, courts use the standard Washington State economic
                table. For a combined net income of $5,000 with 2 children, the
                base presumptive support is $1,155. This amount may be split
                proportionally between parents based on their respective incomes,
                and may not include extraordinary expenses like healthcare or
                daycare.
              </p>
            </div>

            {/* Methodology link — plain body text, not label-metadata */}
            <p className="text-sm text-muted">
              Want to know how we arrived at these figures?{" "}
              <Link
                href="/editorial-methodology"
                className="text-indigo-600 font-semibold underline underline-offset-4 decoration-indigo-200 hover:text-indigo-700 hover:decoration-indigo-400 transition-colors"
              >
                Read our Editorial Methodology
              </Link>
            </p>

          </div>
        </div>
      </section>
    </div>
  );
}
