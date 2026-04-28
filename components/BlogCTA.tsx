import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';

export default function BlogCTA() {
 return (
 <div className="mt-16 sm:mt-24 card section-subtle !p-6 sm:!p-12 text-center relative overflow-hidden group">
 <div className="relative z-10 flex flex-col items-center">
 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 border border-border-default shadow-sm">
 <Calculator className="w-8 h-8 text-brand" />
 </div>

 <h3 className="text-h2 mb-4">
 Calculate Your Child Support
 </h3>

 <p className="text-body-lg mb-8 max-w-xl">
 Get an immediate estimate based on the 2026 Washington State Economic Tables. Our tool accounts for the expanded $50,000 threshold and SSR rules.
 </p>

 <Link
 href="/worksheet"
 className="btn btn-primary btn-lg"
 >
 Calculate Your Child Support
 <ArrowRight className="w-5 h-5 ml-2" />
 </Link>
 </div>
 </div>
 );
}
