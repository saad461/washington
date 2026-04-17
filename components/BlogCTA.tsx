import Link from 'next/link';
import { ArrowRight, Calculator } from 'lucide-react';

export default function BlogCTA() {
  return (
    <div className="mt-16 sm:mt-24 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2rem] p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden group">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-colors duration-700"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 group-hover:bg-blue-500/20 transition-colors duration-700"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner backdrop-blur-md border border-white/10">
          <Calculator className="w-8 h-8 text-indigo-300" />
        </div>
        
        <h3 className="text-2xl sm:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
          Calculate Your Exact Child Support
        </h3>
        
        <p className="text-slate-300 mb-8 max-w-xl text-sm sm:text-base leading-relaxed">
          Get an immediate estimate based on the 2026 Washington State Economic Tables. Our tool accounts for the expanded $50,000 threshold and the $1,514 Self-Support Reserve.
        </p>
        
        <Link 
          href="/worksheet" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white font-black uppercase tracking-widest text-sm rounded-xl shadow-[0_0_40px_-10px_rgba(99,102,241,0.6)] hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.8)] transition-all duration-300 hover:-translate-y-1"
        >
          Calculate Your Child Support
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
