import { Metadata } from 'next';
import Link from 'next/link';
import { glossaryTerms } from '@/data/glossary';
import { ArrowRight, BookA } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Washington Child Support Glossary (2026) | Terms Defined',
  description: 'Understand complete legal terms including Self-Support Reserve, Transfer Payment, Deviation, and Imputed Income in the 2026 Washington State Child Support law.',
  alternates: { canonical: 'https://wcssc.site/glossary' },
};

export default function GlossaryIndex() {
  return (
    <div className="flex-1 bg-white relative w-full overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto mb-20 text-center">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-8">
            <BookA className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 mb-6 font-heading leading-tight">
            Washington Child Support Glossary (2026)
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Understanding family court requires learning a new legal language. We break down complex terms into simple, actionable definitions to help you navigate your 2026 payments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {glossaryTerms.map((term) => (
            <Link 
              key={term.slug}
              href={`/glossary/${term.slug}`}
              className="block p-8 bg-white border border-gray-100 rounded-2xl hover:border-indigo-200 transition-all group shadow-sm hover:shadow-md active:scale-[0.99]"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors font-heading">
                    {term.term}
                  </h2>
                  <p className="text-gray-500 leading-relaxed font-medium line-clamp-3 text-sm">
                    {term.definition}
                  </p>
                </div>
                <div className="p-2 text-gray-300 group-hover:text-indigo-600 transition-colors shrink-0">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
