import { Metadata } from 'next';
import Link from 'next/link';
import { glossaryTerms } from '@/data/glossary';
import { ChevronRight, BookA, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Washington Child Support Glossary (2026) | Terms Defined',
  description: 'Understand complete legal terms including Self-Support Reserve, Transfer Payment, Deviation, and Imputed Income in the 2026 Washington State Child Support law.',
  alternates: { canonical: 'https://wcssc.site/glossary' },
};

export default function GlossaryIndex() {
  return (
    <main className="flex-1 bg-white relative w-full overflow-hidden">
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
              Legal Education
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Washington Child Support <span className="text-blue-600">Glossary</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Understanding family court requires learning a new legal language. We break down complex terms into simple, actionable definitions.
            </p>
          </div>
        </div>
      </section>

      {/* ── TERMS GRID ─────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)] relative z-10">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {glossaryTerms.map((term) => (
              <Link
                key={term.slug}
                href={`/glossary/${term.slug}`}
                className="group card-standard flex flex-col hover:border-blue-500"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-blue-600 transition-colors">
                    {term.term}
                  </h2>
                  <div className="p-2 rounded-full bg-[var(--color-bg-subtle)] group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-[var(--color-text-secondary)] leading-relaxed line-clamp-3 mb-6">
                  {term.definition}
                </p>
                <div className="mt-auto text-blue-600 font-bold uppercase text-[12px] tracking-widest">
                  Read full guide
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="section-default bg-white">
        <div className="container-reading text-center">
          <p aria-hidden="true" className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-6 mx-auto">Expert Analysis</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-8">Need Detailed Guidance?</h2>
          <p className="text-lg text-[var(--color-text-body)] mb-12 leading-relaxed">
            Our editorial methodology ensures all definitions and calculations comply with the 2026 Washington State economic tables.
          </p>
          <Link href="/editorial-methodology" className="btn-primary-lg btn-primary !rounded-full">
            Our Methodology
          </Link>
        </div>
      </section>
    </main>
  );
}
