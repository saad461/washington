import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';

export default function BlogCTA() {
  return (
    <div className="mt-16 sm:mt-24 bg-gradient-to-br from-gray-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden group">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors duration-700"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-blue-500/20 transition-colors duration-700"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner backdrop-blur-md border border-white/10">
          <Calculator className="w-8 h-8 text-indigo-300" />
        </div>
        
        <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 tracking-tight leading-tight font-heading">
          Calculate Your Exact Child Support
        </h2>
        
        <p className="text-gray-300 mb-8 max-w-xl text-sm sm:text-base leading-relaxed">
          Get an immediate estimate based on the 2026 Washington State Economic Tables. Our tool accounts for the expanded $50,000 threshold and the $1,514 Self-Support Reserve.
        </p>
        
        <Link 
          href="/worksheet" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest text-sm rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 font-heading"
        >
          Calculate Your Child Support
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
