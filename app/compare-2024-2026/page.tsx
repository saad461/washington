import React from 'react';
import { Metadata } from 'next';
import { ComparisonToolClient as ComparisonTool } from '@/components/ClientDynamic';
import CalculatorSchema from '@/components/CalculatorSchema';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: { absolute: "2024 vs 2026 WA Child Support Changes | WSCSS" },
  description: "Compare Washington child support guidelines 2024 vs 2026. SSR increased to $2,394, economic table expanded to $50,000, and PFML deductions now included.",
  alternates: { canonical: 'https://wscss.site/compare-2024-2026' },
  openGraph: {
    title: "2024 vs 2026 WA Child Support Changes | WSCSS",
    description: "Key 2026 changes: SSR increased to $2,394, economic table expanded to $50,000, PFML deductions added. Compare with the 2024 schedule.",
    url: "https://wscss.site/compare-2024-2026",
    type: "article",
    siteName: "WSCSS — Washington State Child Support Schedule",
    images: [{ url: "https://wscss.site/wscss-og.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "2024 vs 2026 WA Child Support Changes | WSCSS",
    description: "2026 changes: SSR $2,394, table expanded to $50,000, PFML deductions now included.",
    images: ["https://wscss.site/wscss-og.webp"],
  },
};

const COMPARISON_FACTORS = [
  { factor: "Self-Support Reserve", v2024: "$2,258/mo", v2026: "$2,394/mo", changed: true },
  { factor: "Economic Table Limit", v2024: "$12,000", v2026: "$50,000", changed: true },
  { factor: "Minimum Support", v2024: "$50 per child per month", v2026: "$50 per child per month", changed: false },
  { factor: "Income Cap", v2024: "45%", v2026: "45%", changed: false },
  { factor: "PFML Deductions", v2024: "Not included", v2026: "Included", changed: true },
];

export default function CompareToolPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "2024 vs 2026 Washington State Child Support Schedule Comparison",
    "description": "Detailed comparison of key changes between the 2024 and 2026 Washington State Child Support Schedule including SSR increase, economic table expansion, and PFML deductions",
    "url": "https://wscss.site/compare-2024-2026",
    "datePublished": "2026-01-01",
    "dateModified": "2026-04-09",
    "author": {
      "@type": "Organization",
      "name": "WSCSS Editorial & Legal Team",
      "url": "https://wscss.site"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WSCSS — Washington State Child Support Schedule",
      "url": "https://wscss.site",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wscss.site/wscss-og.webp",
        "width": 1200,
        "height": 630
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://wscss.site/wscss-og.webp",
      "width": 1200,
      "height": 630
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://wscss.site/compare-2024-2026"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://wscss.site/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "2024 vs 2026 Child Support Schedule Comparison",
        "item": "https://wscss.site/compare-2024-2026"
      }
    ]
  };

  return (
    <div className="flex-1 bg-white relative w-full overflow-hidden min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CalculatorSchema year={2026} url="https://wscss.site/compare-2024-2026" />

      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white pt-8 pb-16 lg:pt-12 lg:pb-24 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-wide relative z-10 text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Calculator
          </Link>

          <div className="flex flex-col gap-6">
            <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Guideline Comparison
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              2024 vs <span className="text-blue-600">2026 Guidelines</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Compare Washington State child support guidelines. See how the new SSR ($2,394) and expanded 2026 economic tables impact your monthly estimates.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: Key Changes Summary Table ────────────────────────── */}
      <section className="py-12 border-b border-gray-100 bg-white">
        <div className="container-wide">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">
            What Changed
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Key Changes from 2024 to 2026
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 text-sm font-semibold text-gray-600 border-b border-gray-200">
                    Factor
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600 border-b border-gray-200">
                    2024 Schedule
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-blue-600 border-b border-gray-200">
                    2026 Schedule
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FACTORS.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="p-4 text-sm text-gray-900 border-b border-gray-100">
                      {row.factor}
                    </td>
                    <td className={`p-4 text-sm border-b border-gray-100 ${row.changed ? 'text-gray-500 italic' : 'text-gray-700'}`}>
                      {row.v2024}
                    </td>
                    <td className={`p-4 text-sm border-b border-gray-100 ${row.changed ? 'text-blue-700 font-semibold' : 'text-gray-500 italic'}`}>
                      {row.v2026}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Impact Calculator ────────────────────────────────── */}
      <section className="bg-[var(--color-bg-subtle)]">
        <div className="container-wide py-12">
          <ComparisonTool />
        </div>
      </section>

      {/* ── SECTION 3: Detailed Analysis ────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container-reading">
          <div className="prose prose-gray prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What the 2026 Changes Mean for Washington Parents</h2>
            <p className="mb-12">
              The most significant change in the 2026 Washington State Child Support Schedule is the dramatic expansion of the economic table from a maximum combined income of $12,000 to $50,000 per month. Under the 2024 schedule parents earning above $12,000 combined had no clear table guidance and courts used judicial discretion. The 2026 table gives clear presumptive amounts for every $100 increment all the way to $50,000 combined net income — eliminating ambiguity for higher-earning families and giving attorneys a definitive starting point.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Self-Support Reserve Increase</h3>
            <p className="mb-12">
              The Self-Support Reserve increased from $2,258 per month in 2024 to $2,394 per month in 2026 — an increase of $136 per month. This means paying parents at lower income levels are protected from a slightly higher floor. If your income situation triggers SSR protection your obligation may be slightly lower in 2026 than it was under the 2024 schedule. The SSR is recalculated annually based on 180% of the federal poverty guideline for a one-person family under RCW 26.19.065(2)(b).
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">PFML Deductions Now Formally Included</h3>
            <p className="mb-12">
              The 2026 schedule formally includes Washington State Paid Family and Medical Leave (PFML) premiums as a mandatory deduction from gross income when calculating net monthly income. This was not explicitly included in the 2024 schedule. Depending on your PFML premium amount this may slightly reduce your net income and therefore your child support obligation. PFML is entered on Line 2c of the official WSCSS worksheet alongside the long-term services and supports trust program premium.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Minimum Support Unchanged</h3>
            <p className="mb-12">
              The $50 per child per month support obligation remains unchanged from 2024 to 2026. Washington courts cannot order less than this amount except in extraordinary circumstances with specific written court findings under RCW 26.19.065(2)(a). The minimum applies even when the SSR check would otherwise reduce the obligation below $50 per child per month.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">When Does the 2026 Schedule Apply?</h3>
            <p className="mb-12">
              The 2026 schedule applies to all new child support orders entered on or after January 1 2026. Existing orders entered under the 2024 schedule remain in effect until a court approves a modification. A substantial change in circumstances — typically a 15% or more change in either parent&apos;s net income under RCW 26.09.170 — is required to petition for modification to the 2026 schedule values. Courts will not automatically update your order — you must file a modification petition.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Use This Comparison</h3>
            <p className="mb-8">
              The table above shows the key differences between the 2024 and 2026 schedules. To find your specific child support amount under the 2026 schedule use the free WSCSS calculator or complete the official 8-part AOC worksheet. Both tools use the full 2026 economic table covering combined incomes from $2,200 to $50,000 per month.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: CTA ──────────────────────────────────────────────── */}
      <section className="py-12 text-center bg-white border-t border-gray-100">
        <div className="container-wide">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Ready to Calculate Your 2026 Obligation?
          </h2>
          <div className="flex gap-4 justify-center">
            <a href="/" className="btn btn-primary">
              Use the Calculator
            </a>
            <a href="/worksheet" className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-blue-300 transition-colors">
              Full Worksheet Wizard
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
