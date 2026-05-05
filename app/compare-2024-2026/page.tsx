import React from 'react';
import { Metadata } from 'next';
import { ComparisonToolClient as ComparisonTool } from '@/components/ClientDynamic';
import CalculatorSchema from '@/components/CalculatorSchema';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: '2024 vs 2026 Child Support Comparison | WSCSS',
  description: 'Compare Washington State child support guidelines for 2024 and 2026. See how the new SSR (approximately $2,394) and expanded economic tables impact your payments.',
  alternates: { canonical: 'https://wscss.site/compare-2024-2026' },
};

const COMPARISON_FACTORS = [
  { factor: "Self-Support Reserve", v2024: "~$2,258/mo", v2026: "~$2,394/mo", changed: true },
  { factor: "Economic Table Limit", v2024: "$12,000", v2026: "$50,000", changed: true },
  { factor: "Minimum Support", v2024: "$50/child", v2026: "$50/child", changed: false },
  { factor: "Income Cap", v2024: "45%", v2026: "45%", changed: false },
  { factor: "PFML Deductions", v2024: "Not included", v2026: "Included", changed: true },
];

export default function CompareToolPage() {
  return (
    <div className="flex-1 bg-white relative w-full overflow-hidden min-h-screen">
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
              Compare Washington State child support guidelines. See how the new SSR (approximately $2,394) and expanded 2026 economic tables impact your monthly estimates.
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

      {/* ── SECTION 3: CTA ──────────────────────────────────────────────── */}
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
