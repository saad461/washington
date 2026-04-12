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
    <div className="flex-1 bg-[#FDFDFE] relative w-full overflow-hidden font-sans">
      <div className="max-w-4xl mx-auto px-6 py-20 lg:py-24 relative z-10">
        <div className="mb-16 text-center">
          <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-2xl mb-6">
            <BookA className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 drop-shadow-sm leading-tight">
            Washington Child Support Glossary (2026)
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Navigating family court means learning a completely new legal language. We&apos;ve broken down the most important terms—like Self-Support Reserve (SSR) and Income Deviation—into simple, actionable definitions to help you accurately estimate your 2026 payments.
          </p>
        </div>

        <div className="grid gap-6">
          {glossaryTerms.map((term) => (
            <Link 
              key={term.slug}
              href={`/glossary/${term.slug}`}
              className="block p-8 bg-white border border-slate-100 rounded-3xl hover:border-indigo-400 hover:shadow-xl hover:shadow-indigo-900/5 transition-all group"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {term.term}
                  </h2>
                  <p className="text-slate-600 leading-relaxed font-medium line-clamp-2">
                    {term.definition}
                  </p>
                </div>
                <div className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0 mt-1">
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
