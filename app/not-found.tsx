"use client";

import Link from 'next/link';
import { Calculator, ArrowLeft, Search } from 'lucide-react';

/**
 * 404 - Not Found Page
 * Provides a SaaS-grade UX to recover users when they hit an invalid county or income slug.
 */
export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#FDFDFE] px-6 text-center py-20 relative overflow-hidden">
      {/* Background Gradients (Hardware Accelerated) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 w-[40rem] h-[40rem] bg-indigo-50/60 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 will-change-transform transform-gpu opacity-40" />
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-indigo-600/30 rotate-3 animate-bounce-slow">
          <Calculator className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight italic">Page Not Found</h1>
        <p className="text-slate-500 font-serif leading-relaxed mb-12 italic text-lg decoration-indigo-100 underline-offset-4 underline">
          &quot;The requested calculation or county guide could not be located in our 2026 database. Most likely the income or county slug was formatted incorrectly.&quot;
        </p>

        <div className="space-y-4">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 text-white font-black rounded-[2rem] shadow-xl hover:bg-slate-800 transition-all hover:-translate-y-1 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-indigo-400" />
            Back to Calculator
          </Link>
          
          <Link 
            href="/worksheet" 
            className="flex items-center justify-center gap-3 w-full py-5 bg-white border border-slate-100 text-slate-900 font-bold rounded-[2rem] shadow-sm hover:shadow-md transition-all"
          >
            <Search className="w-5 h-5 text-indigo-400" />
            Use Worksheet Pro Wizard
          </Link>

          <Link 
            href="/blog" 
            className="flex items-center justify-center gap-3 w-full py-5 bg-indigo-50 text-indigo-600 font-bold rounded-[2rem] hover:bg-indigo-100 transition-all"
          >
            <Calculator className="w-5 h-5 opacity-40" />
            Read Legal Guides & Blog
          </Link>
        </div>

        <div className="mt-16 text-xs font-black uppercase tracking-[0.4em] text-slate-500 opacity-60">
          Official 2026 WA State Guidelines Index
        </div>
      </div>
    </div>
  );
}

// Custom animation in CSS (via tailwind or global.css if needed, but standard bounce-slow works here)
