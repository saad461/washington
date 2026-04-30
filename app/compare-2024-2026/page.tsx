import React from 'react';
import { Metadata } from 'next';
import { ComparisonToolClient as ComparisonTool } from '@/components/ClientDynamic';
import CalculatorSchema from '@/components/CalculatorSchema';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
 title: '2024 vs 2026 Child Support Comparison | WCSSC',
 description: 'Compare Washington State child support guidelines for 2024 and 2026. See how the new SSR (approximately $2,394) and expanded economic tables impact your payments.',
 alternates: { canonical: 'https://wcssc.site/compare-2024-2026' },
};

export default function CompareToolPage() {
 return (
  <main className="flex-1 bg-white relative w-full overflow-hidden min-h-screen">
    <CalculatorSchema year={2026} url="https://wcssc.site/compare-2024-2026" />

    {/* ── MINI HERO ────────────────────────────────────────────────────── */}
    <section className="bg-white py-16 md:py-24 relative overflow-hidden border-b border-[var(--color-bg-border)]">
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
      />

      <div className="container-wide relative z-10">
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

    {/* ── COMPARISON TOOL ─────────────────────────────────────────────── */}
    <section className="section-default bg-[var(--color-bg-subtle)]">
      <div className="container-wide">
        <ComparisonTool />
      </div>
    </section>
  </main>
 );
}
