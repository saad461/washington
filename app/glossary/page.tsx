import { Metadata } from 'next';
import Link from 'next/link';
import { glossaryTerms } from '@/data/glossary';
import { ChevronRight, BookA, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: {
    absolute: "Washington Child Support Glossary 2026 — Key Legal Terms Explained | WCSSC"
  },
  description: "Plain-language definitions of Washington State child support terms including SSR, imputed income, deviation, transfer payment, and more. Updated for 2026 RCW 26.19 guidelines.",
  alternates: { canonical: 'https://wcssc.site/glossary' },
};

export default function GlossaryIndex() {
  return (
    <div className="flex-1 bg-white relative w-full overflow-hidden pb-32">
      {/* ── MINI HERO ────────────────────────────────────────────────────── */}
      <section className="bg-white pt-8 pb-16 lg:pt-12 lg:pb-24 relative overflow-hidden border-b border-[var(--color-bg-border)]">
        <div
          aria-hidden="true"
          className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-blue-50 to-transparent pointer-events-none hidden lg:block"
        />

        <div className="container-wide relative z-10 text-left">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap justify-start">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-900 font-medium" aria-current="page">
                Glossary
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2" aria-hidden="true">
              Legal Terms Explained
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Washington Child Support Glossary 2026
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Plain-language definitions of key terms used in Washington State child support calculations and court filings.
            </p>
          </div>
        </div>
      </section>

      {/* ── TERMS GRID ─────────────────────────────────────────────────── */}
      <section className="section-default bg-[var(--color-bg-subtle)] relative z-10 py-10 border-b border-gray-100">
        <div className="container-wide">
          <div className="space-y-4 max-w-3xl mx-auto">
            {glossaryTerms.map((term) => (
              <article
                key={term.slug}
                className="p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all duration-200 bg-white"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-lg font-bold text-gray-900">
                    {term.name}
                  </h2>
                  <span className="flex-shrink-0 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                    {term.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {term.definition}
                </p>
                <Link
                  href={`/glossary/${term.slug}`}
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {term.linkLabel}
                  <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="section-default bg-white py-10 border-b border-gray-100 last:border-0">
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
    </div>
  );
}
