import { Metadata } from 'next';
import Link from 'next/link';
import { glossaryTerms } from '@/data/glossary';
import { ChevronRight, BookA } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Washington Child Support Glossary (2026) | Terms Defined',
  description: 'Understand complete legal terms including Self-Support Reserve, Transfer Payment, Deviation, and Imputed Income in the 2026 Washington State Child Support law.',
  alternates: { canonical: 'https://wcssc.site/glossary' },
};

export default function GlossaryIndex() {
  return (
    <main className="flex-1 bg-page relative w-full overflow-hidden">
      <div className="container-wide section-default relative z-10">
        <header className="max-w-3xl mx-auto mb-16 md:mb-24 text-center">
          <div className="inline-flex p-4 bg-indigo-50 text-[var(--color-brand-primary)] rounded-2xl mb-8 shadow-[var(--shadow-card)]">
            <BookA className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            Washington Child Support Glossary (2026)
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
            Understanding family court requires learning a new legal language. We break down complex terms into simple, actionable definitions to help you navigate your 2026 payments.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {glossaryTerms.map((term) => (
            <Link
              key={term.slug}
              href={`/glossary/${term.slug}`}
              className="group card-interactive flex flex-col hover:border-indigo-500"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition-colors">
                  {term.term}
                </h2>
                <div className="p-2 rounded-full bg-[var(--color-bg-subtle)] group-hover:bg-indigo-50 group-hover:text-[var(--color-brand-primary)] transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
              <p className="text-[var(--color-text-secondary)] leading-relaxed line-clamp-3 mb-6">
                {term.definition}
              </p>
              <div className="mt-auto text-[var(--color-brand-primary)] font-bold label-metadata tracking-widest uppercase text-[12px] font-semibold text-[var(--color-text-secondary)]">
                Read full guide
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
