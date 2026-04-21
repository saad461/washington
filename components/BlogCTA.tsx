import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';

export default function BlogCTA() {
 return (
 <div className="mt-16 sm:mt-24 bg-gray-50 rounded-2xl p-6 sm:p-12 text-center border border-gray-100 shadow-sm relative overflow-hidden group">

 <div className="relative z-10 flex flex-col items-center">
 <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 border border-gray-100 shadow-sm">
 <Calculator className="w-8 h-8 " />
 </div>

 <h3 className="text-2xl md:text-3xl sm:text-3xl md:text-4xl font-semibold mb-4 tracking-tight leading-tight font-heading">
 Calculate Your Exact Child Support
 </h3>

 <p className=" mb-8 max-w-xl text-base leading-relaxed font-medium">
 Get an immediate estimate based on the 2026 Washington State Economic Tables. Our tool accounts for the expanded $50,000 threshold and the approximately $2,394 Self-Support Reserve.
 </p>

 <Link
 href="/worksheet"
 className="inline-flex items-center gap-2 px-6 py-3 min-h-[48px] bg-indigo-600 hover:bg-gray-100 text-white font-medium text-base rounded-xl shadow-sm shadow-indigo-100 transition-all duration-300 hover:-translate-y-1"
 >
 Calculate Your Child Support
 <ArrowRight className="w-5 h-5" />
 </Link>
 </div>
 </div>
 );
}
