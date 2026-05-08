import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';

export default function BlogCTA() {
 return (
 <div className="mt-16 sm:mt-24 bg-[var(--color-bg-subtle)] rounded-2xl p-6 sm:p-12 text-center border border-[var(--color-bg-border-soft)] shadow-[var(--shadow-card)] relative overflow-hidden group">

 <div className="relative z-10 flex flex-col items-center">
 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 border border-[var(--color-bg-border-soft)] shadow-[var(--shadow-card)]">
 <Calculator className="w-8 h-8 " />
 </div>

 <h3 className="text-2xl  md:text-4xl font-semibold mb-4 tracking-tight leading-tight font-heading">
 Calculate Your Exact Child Support
 </h3>

 <p className=" mb-8 max-w-xl text-base leading-relaxed font-medium">
 Get an immediate estimate based on the 2026 Washington State Economic Tables. Our tool accounts for the expanded $50,000 threshold and the $2,394 Self-Support Reserve.
 </p>

 <Link
 href="/worksheet"
 className="btn btn-primary"
 >
 Calculate Your Child Support
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </div>
 );
}
