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
    <main className="flex-1 w-full">
      <div className="container section relative z-10">
        <header className="max-w-3xl mx-auto mb-16 md:mb-24 text-center">
          <div className="inline-flex p-4 bg-brand-light text-brand rounded-2xl mb-8">
            <BookA className="w-8 h-8" />
          </div>
          <h1 className="text-display mb-8">
            Washington Child Support Glossary
          </h1>
          <p className="text-body-lg">
            Understanding family court requires learning a new legal language. We break down complex terms into simple, actionable definitions.
          </p>
        </header>

        <div className="card-grid-2 max-w-5xl mx-auto">
          {glossaryTerms.map((term) => (
            <Link
              key={term.slug}
              href={`/glossary/${term.slug}`}
              className="group card hover:border-brand flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-h3 group-hover:text-brand transition-colors">
                  {term.term}
                </h2>
                <div className="p-2 rounded-full bg-bg-subtle group-hover:bg-brand group-hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
              <p className="text-body line-clamp-3 mb-6 flex-1">
                {term.definition}
              </p>
              <div className="text-overline !text-brand">
                Read full guide
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
