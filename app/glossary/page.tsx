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
 <div className="container-wide section-default  relative z-10">
 <div className="max-w-3xl mx-auto mb-20 text-center">
 <div className="inline-flex p-3 bg-indigo-50 rounded-xl mb-8">
 <BookA className="w-8 h-8" />
 </div>
 <h1 className=" mb-6 ">
 Washington Child Support Glossary (2026)
 </h1>
 <p className="text-body leading-relaxed text-body max-w-2xl mx-auto ">
 Understanding family court requires learning a new legal language. We break down complex terms into simple, actionable definitions to help you navigate your 2026 payments.
 </p>
 </div>

 <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
 {glossaryTerms.map((term) => (
 <Link
 key={term.slug}
 href={`/glossary/${term.slug}`}
 className="block p-6 bg-white border border-gray-100 rounded-xl hover:border-indigo-200 transition-all group shadow-sm hover:shadow-sm active:scale-[0.99]"
 >
 <div className="flex justify-between items-start gap-4">
 <div>
 <h2 className=" mb-3 group-hover: transition-colors ">
 {term.term}
 </h2>
 <p className=" line-clamp-3 text-sm">
 {term.definition}
 </p>
 </div>
 <div className="p-2 group-hover: transition-colors shrink-0">
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
